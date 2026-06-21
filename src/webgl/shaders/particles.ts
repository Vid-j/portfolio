export const particleVertexShader = /* glsl */ `
precision mediump float;

attribute vec2 a_pos;
attribute float a_life;
attribute float a_type;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_click;
uniform vec3 u_col;
uniform float u_morphT;

varying float v_life;
varying float v_type;
varying float v_dist;
varying vec3 v_col;

void main() {
  vec2 pos = a_pos;

  vec2 toMouse = u_mouse - pos;
  float d = length(toMouse);
  float f = u_click > 0.5 ? -1.6 : 0.5;
  float falloff = 1.0 / (1.0 + d * d * 14.0);
  pos += toMouse * f * falloff * 0.05;

  vec2 clip = (pos * 2.0 - 1.0) * vec2(1.0, -1.0);

  v_life = a_life;
  v_type = a_type;
  v_dist = d;
  v_col = u_col;

  float prox = 1.0 + (1.0 - clamp(d * 2.5, 0.0, 1.0)) * 2.2;
  float base = 1.6 + a_type * 1.2;
  gl_PointSize = base * prox * a_life * clamp(u_res.x / 1400.0, 0.5, 2.0);
  gl_Position = vec4(clip, 0.0, 1.0);
}
`;

export const particleFragmentShader = /* glsl */ `
precision mediump float;

varying float v_life;
varying float v_type;
varying float v_dist;
varying vec3 v_col;

uniform float u_time;
uniform float u_click;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;

  float glitchStrength = 0.15 + 0.1 * sin(u_time * 3.0 + v_type * 10.0);
  vec3 col;
  col.r = v_col.r * (1.0 + glitchStrength * v_type);
  col.g = v_col.g;
  col.b = v_col.b * (1.0 + glitchStrength * (1.0 - v_type));

  float glow = pow(1.0 - smoothstep(0.0, 0.5, r), 1.9);
  float flicker = 0.88 + 0.12 * sin(u_time * 9.0 + v_type * 20.0);

  float flash = u_click * (1.0 - clamp(v_dist * 4.0, 0.0, 1.0)) * 0.6;
  col += vec3(flash);

  gl_FragColor = vec4(col * glow * flicker, glow * v_life * 0.88);
}
`;
