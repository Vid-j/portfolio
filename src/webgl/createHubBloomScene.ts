import { hubBloomVertexShader, hubBloomFragmentShader } from './shaders/hubBloom';

export interface HubBloomScene {
  dispose: () => void;
}

const VERT_SRC = hubBloomVertexShader;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, fragSrc: string): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');

  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERT_SRC));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragSrc));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  }

  return program;
}

export function createHubBloomScene(canvas: HTMLCanvasElement): HubBloomScene {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  // Keep fragment shader work bounded for mobile.
  const maxSteps = reducedMotion ? 18 : isMobile ? 22 : 34;

  const glCtx = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!glCtx) throw new Error('WebGL not supported');
  const gl: WebGLRenderingContext = glCtx;

  const program = createProgram(gl, hubBloomFragmentShader(maxSteps));
  gl.useProgram(program);

  const quad = new Float32Array([
    -1, -1, //
    1, -1, //
    -1, 1, //
    -1, 1, //
    1, -1, //
    1, 1, //
  ]);

  const buffer = gl.createBuffer();
  if (!buffer) throw new Error('Failed to create quad buffer');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 2 * 4, 0);

  const uRes = gl.getUniformLocation(program, 'u_res');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uPulse = gl.getUniformLocation(program, 'u_pulse');
  if (!uRes || !uMouse || !uTime || !uPulse) throw new Error('Missing shader uniforms');

  gl.disable(gl.DEPTH_TEST);

  let running = true;
  let rafId = 0;
  let drawRafId = 0;

  const mouse = { x: 0.5, y: 0.15 };
  let pulse = 0;

  let lastT = performance.now();
  let simTime = 0;

  const lastPointer = { x: mouse.x, y: mouse.y, t: performance.now() };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function onPointerMove(e: PointerEvent) {
    const now = performance.now();
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const dx = x - lastPointer.x;
    const dy = y - lastPointer.y;
    const dt = Math.max(0.001, (now - lastPointer.t) / 1000);
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    // Convert pointer velocity to a decaying “gene expression” pulse.
    // Tuned for normalized coordinates.
    if (!reducedMotion) {
      pulse = Math.min(1, pulse + speed * 0.025);
    }

    lastPointer.x = x;
    lastPointer.y = y;
    lastPointer.t = now;

    mouse.x = x;
    mouse.y = y;

    if (reducedMotion && drawRafId === 0) {
      drawRafId = requestAnimationFrame(() => {
        drawRafId = 0;
        draw();
      });
    }
  }

  const onPointerMoveBound = (e: PointerEvent) => onPointerMove(e);

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMoveBound, { passive: true });

  function draw() {
    gl.clearColor(0.02, 0.03, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uTime, simTime);
    gl.uniform1f(uPulse, pulse);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function render(now: number) {
    if (!running) return;
    rafId = requestAnimationFrame(render);

    const dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;

    simTime += dt;
    pulse *= Math.pow(0.86, dt * 60);

    draw();
  }

  if (reducedMotion) {
    // Render a static bloom (time/pulse locked) and only update when the user moves the cursor.
    simTime = 0;
    pulse = 0;
    draw();
  } else {
    rafId = requestAnimationFrame(render);
  }

  return {
    dispose() {
      running = false;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(drawRafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMoveBound);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

