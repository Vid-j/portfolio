import { buildShapePoints, easeInOut, SHAPES } from './shapes';
import { particleFragmentShader, particleVertexShader } from './shaders/particles';

export interface WebGLScene {
  dispose: () => void;
  setScroll: (scroll: number) => void;
}

const MORPH_DUR = 2.2;
const HOLD_DUR = 6.0;
const STRIDE = 4;
const BYTES = 4;

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

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');
  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, particleVertexShader));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, particleFragmentShader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

export function createScene(canvas: HTMLCanvasElement): WebGLScene {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const NUM = isMobile ? 3500 : 7000;

  const glCtx = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!glCtx) throw new Error('WebGL not supported');
  const gl: WebGLRenderingContext = glCtx;

  const program = createProgram(gl);
  gl.useProgram(program);

  const shapePts = buildShapePoints(NUM);

  const posX = new Float32Array(NUM);
  const posY = new Float32Array(NUM);
  const velX = new Float32Array(NUM);
  const velY = new Float32Array(NUM);
  const tgtX = new Float32Array(NUM);
  const tgtY = new Float32Array(NUM);
  const pLife = new Float32Array(NUM);
  const pType = new Float32Array(NUM);
  const gpuData = new Float32Array(NUM * STRIDE);

  function setTargetShape(idx: number) {
    const pts = shapePts[idx];
    const order = Array.from({ length: NUM }, (_, i) => i).sort(() => Math.random() - 0.5);
    for (let i = 0; i < NUM; i++) {
      tgtX[order[i]] = pts[i][0];
      tgtY[order[i]] = pts[i][1];
    }
  }

  const firstPts = shapePts[0];
  for (let i = 0; i < NUM; i++) {
    posX[i] = Math.random();
    posY[i] = Math.random();
    velX[i] = (Math.random() - 0.5) * 0.002;
    velY[i] = (Math.random() - 0.5) * 0.002;
    tgtX[i] = firstPts[i][0];
    tgtY[i] = firstPts[i][1];
    pLife[i] = 0.4 + Math.random() * 0.6;
    pType[i] = Math.random();
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, gpuData, gl.DYNAMIC_DRAW);

  const stride = STRIDE * BYTES;
  const aPos = gl.getAttribLocation(program, 'a_pos');
  const aLife = gl.getAttribLocation(program, 'a_life');
  const aType = gl.getAttribLocation(program, 'a_type');

  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aLife);
  gl.enableVertexAttribArray(aType);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, stride, 0);
  gl.vertexAttribPointer(aLife, 1, gl.FLOAT, false, stride, 2 * BYTES);
  gl.vertexAttribPointer(aType, 1, gl.FLOAT, false, stride, 3 * BYTES);

  const uRes = gl.getUniformLocation(program, 'u_res');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uClick = gl.getUniformLocation(program, 'u_click');
  const uCol = gl.getUniformLocation(program, 'u_col');
  const uMorphT = gl.getUniformLocation(program, 'u_morphT');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  let shapeIdx = 0;
  let nextShapeIdx = 1;
  let phase: 'hold' | 'morph' = 'hold';
  let holdTimer = 0;
  let morphTimer = 0;
  let currentCol = [...SHAPES[0].color] as [number, number, number];
  let targetCol = [...SHAPES[0].color] as [number, number, number];

  const mouse = { x: 0.5, y: 0.5, down: false };
  let clickDecay = 0;
  let simTime = 0;
  let lastT = performance.now();
  let scrollY = 0;
  let rafId = 0;
  let running = true;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function startMorph() {
    nextShapeIdx = (shapeIdx + 1) % SHAPES.length;
    setTargetShape(nextShapeIdx);
    targetCol = [...SHAPES[nextShapeIdx].color];
    phase = 'morph';
    morphTimer = 0;
  }

  function onPointerMove(clientX: number, clientY: number) {
    mouse.x = clientX / window.innerWidth;
    mouse.y = clientY / window.innerHeight;
  }

  const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
  const onMouseDown = () => { mouse.down = true; };
  const onMouseUp = () => { mouse.down = false; };
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  function render(now: number) {
    if (!running) return;
    rafId = requestAnimationFrame(render);

    const dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;
    simTime += dt;

    if (mouse.down) clickDecay = 1.0;
    else clickDecay *= 0.9;

    const scrollOffset = scrollY * 0.00015;

    if (!reducedMotion) {
      if (phase === 'hold') {
        holdTimer += dt;
        if (holdTimer > HOLD_DUR) {
          holdTimer = 0;
          startMorph();
        }
      } else {
        morphTimer += dt;
        const p = easeInOut(Math.min(morphTimer / MORPH_DUR, 1));
        for (let c = 0; c < 3; c++) {
          currentCol[c] = currentCol[c] + (targetCol[c] - currentCol[c]) * p;
        }
        if (morphTimer >= MORPH_DUR) {
          shapeIdx = nextShapeIdx;
          phase = 'hold';
        }
      }
    }

    const spring = phase === 'morph' ? 0.055 : 0.018;
    const damp = phase === 'morph' ? 0.78 : 0.88;

    for (let i = 0; i < NUM; i++) {
      const dx = tgtX[i] - posX[i];
      const dy = tgtY[i] - scrollOffset - posY[i];
      velX[i] = (velX[i] + dx * spring) * damp;
      velY[i] = (velY[i] + dy * spring) * damp;
      if (!reducedMotion) {
        velX[i] += (Math.random() - 0.5) * 0.0004;
        velY[i] += (Math.random() - 0.5) * 0.0004;
      }
      posX[i] += velX[i];
      posY[i] += velY[i];

      const b = i * STRIDE;
      gpuData[b] = posX[i];
      gpuData[b + 1] = posY[i];
      gpuData[b + 2] = pLife[i];
      gpuData[b + 3] = pType[i];
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, gpuData);

    gl.clearColor(0.02, 0.02, 0.032, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uTime, simTime);
    gl.uniform1f(uClick, clickDecay);
    gl.uniform3f(uCol, currentCol[0], currentCol[1], currentCol[2]);
    gl.uniform1f(
      uMorphT,
      phase === 'morph' ? Math.min(morphTimer / MORPH_DUR, 1) : 1,
    );

    gl.drawArrays(gl.POINTS, 0, NUM);
  }

  rafId = requestAnimationFrame(render);

  return {
    setScroll(value: number) {
      scrollY = value;
    },
    dispose() {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
