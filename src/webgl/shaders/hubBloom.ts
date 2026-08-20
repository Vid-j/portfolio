export const hubBloomVertexShader = /* glsl */ `
precision mediump float;

attribute vec2 a_pos;
varying vec2 v_uv;

void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

export function hubBloomFragmentShader(maxSteps: number): string {
  return /* glsl */ `
precision mediump float;

varying vec2 v_uv;

uniform vec2 u_res;
uniform vec2 u_mouse; // normalized [0..1]
uniform float u_time;
uniform float u_pulse;

const float PETALS = 6.0;

float hash21(vec2 p) {
  // Deterministic hash in [0..1)
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 hash22(vec2 p) {
  float x = dot(p, vec2(127.1, 311.7));
  float y = dot(p, vec2(269.5, 183.3));
  return fract(sin(vec2(x, y)) * 43758.5453123);
}

// Simple Worley / cellular distance
float worley(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float minD = 10.0;
  for (int oy = -1; oy <= 1; oy++) {
    for (int ox = -1; ox <= 1; ox++) {
      vec2 g = vec2(float(ox), float(oy));
      vec2 o = hash22(i + g);
      vec2 r = g + o - f;
      minD = min(minD, dot(r, r));
    }
  }
  return sqrt(minD);
}

float helixDist(vec2 p, float bloom) {
  float helixFreq = mix(10.0, 16.0, bloom);
  float amp = mix(0.085, 0.205, bloom);
  float t = p.y * helixFreq + u_time * 0.9;

  float x1 = amp * sin(t);
  float x2 = -x1;

  float tube = mix(0.018, 0.010, bloom);
  float d1 = abs(p.x - x1) - tube;
  float d2 = abs(p.x - x2) - tube;

  // Clamp to non-negative so we can raymarch as "distance to glow surface".
  return max(min(d1, d2), 0.0);
}

float petalRadius(float ang, float bloom) {
  float pet = pow(abs(cos(ang * PETALS)), 1.65);

  // Slight organic wobble along bloom.
  float wobble = 0.86 + 0.14 * cos(ang * 3.0 + u_time * 0.35);

  float r0 = mix(0.17, 0.52, bloom);
  return r0 * (0.54 + 0.46 * pet) * wobble;
}

float petalDist(vec2 p, float bloom) {
  float r = length(p);
  float ang = atan(p.y, p.x);

  float pr = petalRadius(ang, bloom);
  float shellT = mix(0.032, 0.017, bloom);

  // Distance to the petal "shell".
  return max(abs(r - pr) - shellT, 0.0);
}

float sceneDist(vec3 p, float bloom, vec2 mouseNdc) {
  // Subtle cursor attractor warp while unwinding.
  vec2 q = p.xy - mouseNdc * 0.09 * (1.0 - bloom);

  float dHelix = helixDist(q, bloom);
  float dPetal = petalDist(q, bloom);
  float d = mix(dHelix, dPetal, bloom);

  float zThick = mix(0.22, 0.06, bloom);
  float dZ = max(abs(p.z) - zThick, 0.0);

  return max(d, dZ);
}

vec3 palette(float bloom, float tipMask) {
  vec3 core = vec3(0.20, 1.00, 0.78); // cyan/teal
  vec3 tip = vec3(0.82, 0.25, 1.00); // magenta/violet
  vec3 deep = vec3(0.02, 0.03, 0.07);

  float t = bloom * (0.35 + 0.65 * tipMask);
  return mix(deep, mix(core, tip, 0.75), t);
}

void main() {
  vec2 uv = v_uv * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  vec2 mouseNdc = u_mouse * 2.0 - 1.0;
  mouseNdc.x *= u_res.x / u_res.y;

  // Bloom progress: closer to center = wound helix; farther = bloomed petals.
  float distToCenter = length(mouseNdc);
  float bloom = smoothstep(0.05, 0.92, distToCenter);

  vec3 ro = vec3(0.0, 0.0, -2.1);
  vec3 rd = normalize(vec3(uv, 1.8));

  float t = 0.0;
  float minD = 1000.0;
  vec3 p = ro;

  for (int i = 0; i < ${maxSteps}; i++) {
    p = ro + rd * t;
    float d = sceneDist(p, bloom, mouseNdc);
    minD = min(minD, d);

    if (d < 0.0016) break;
    t += max(d, 0.002) * 0.82;
    if (t > 5.0) break;
  }

  // Soft glow around the distance field.
  float glow = exp(-minD * 18.0);

  // Cursor lighting influence.
  float light = 1.0 / (1.0 + dot(uv - mouseNdc, uv - mouseNdc) * 14.0);

  // Velocity pulse: rolling ripple that boosts emission.
  float ripple = sin(length(uv - mouseNdc) * 12.0 - u_time * 5.0 + glow * 3.0);
  float pulseBoost = 1.0 + u_pulse * ripple * 0.35;

  // Tip mask based on petal angular projection.
  float ang = atan(p.y, p.x);
  float tipMask = pow(abs(cos(ang * PETALS)), 1.65);

  // Cellular/vein texture, masked to the "shell" regions.
  float cell = worley(p.xy * vec2(14.0, 10.0) + vec2(u_time * 0.06, -u_time * 0.05));
  float vein = exp(-cell * 11.5);

  // Emissive mask: switch from helix emphasis to petal shell emphasis.
  float dHelix = helixDist(p.xy, bloom);
  float dPetal = petalDist(p.xy, bloom);
  float helixMask = exp(-dHelix * 220.0);
  float petalMask = exp(-dPetal * 160.0);
  float veinMask = mix(helixMask, petalMask, bloom);

  vec3 col = palette(bloom, tipMask);

  // Deep-sea background + emissive layer.
  vec3 baseCol = vec3(0.02, 0.03, 0.08);
  col = baseCol + col * glow * (0.55 + 0.85 * light) * pulseBoost;

  // Bioluminescent veins mostly in petals.
  vec3 veinCol = mix(vec3(0.15, 0.65, 1.0), vec3(0.82, 0.25, 1.0), 0.65);
  col += veinCol * glow * vein * veinMask * (0.28 + 0.95 * bloom);

  // Subtle vignette.
  float vign = smoothstep(1.25, 0.15, length(uv));
  col *= 0.78 + 0.22 * vign;

  // Soft tonemap.
  col = col / (1.0 + col);
  col = pow(col, vec3(0.92));

  gl_FragColor = vec4(col, 1.0);
}
`;
}

