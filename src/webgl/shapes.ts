export type Point2D = { x: number; y: number };

export interface ShapeDef {
  name: string;
  gen: (n: number) => Point2D[];
  color: [number, number, number];
}

export function sampleButterfly(n: number): Point2D[] {
  const pts: Point2D[] = [];
  for (let i = 0; i < n * 0.55; i++) {
    const t = (i / (n * 0.55)) * Math.PI * 2;
    const r = Math.abs(Math.sin(2 * t)) * (0.28 + 0.06 * Math.cos(4 * t));
    const side = Math.random() < 0.5 ? 1 : -1;
    const spread = 0.85 + Math.random() * 0.3;
    pts.push({
      x: 0.5 + side * Math.cos(t) * r * spread,
      y: 0.5 - Math.sin(t) * r * 0.8,
    });
  }
  for (let i = 0; i < n * 0.3; i++) {
    const t = (i / (n * 0.3)) * Math.PI * 2;
    const r = Math.abs(Math.sin(t)) * 0.16;
    const side = Math.random() < 0.5 ? 1 : -1;
    pts.push({
      x: 0.5 + side * Math.cos(t) * r * 1.1,
      y: 0.52 + Math.abs(Math.sin(t)) * r * 1.2,
    });
  }
  for (let i = 0; i < n * 0.15; i++) {
    const t = i / (n * 0.15);
    pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.012, y: 0.35 + t * 0.3 });
  }
  return pts;
}

export function sampleFlower(n: number): Point2D[] {
  const pts: Point2D[] = [];
  const PETALS = 6;
  for (let i = 0; i < n * 0.82; i++) {
    const t = (i / (n * 0.82)) * Math.PI * 2;
    const petal = Math.floor((t / (Math.PI * 2)) * PETALS);
    const localT = (t / (Math.PI * 2)) * PETALS - petal;
    const petalAngle = (petal / PETALS) * Math.PI * 2;
    const petalR = Math.sin(localT * Math.PI) * (0.28 + Math.random() * 0.06);
    const jitter = (Math.random() - 0.5) * 0.02;
    pts.push({
      x: 0.5 + Math.cos(petalAngle) * petalR + jitter,
      y: 0.5 + Math.sin(petalAngle) * petalR * 1.05 + jitter,
    });
  }
  for (let i = 0; i < n * 0.18; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.045;
    pts.push({ x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r });
  }
  return pts;
}

export function sampleSphere(n: number): Point2D[] {
  const pts: Point2D[] = [];
  for (let i = 0; i < n; i++) {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const yy = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - yy * yy);
    const theta = golden * i;
    const px = Math.cos(theta) * radius;
    const pz = Math.sin(theta) * radius;
    const fov = 2.2;
    const z = pz * 0.5 + 0.5;
    const scale = fov / (fov + z);
    const jitter = (Math.random() - 0.5) * 0.018;
    pts.push({
      x: 0.5 + px * 0.3 * scale + jitter,
      y: 0.5 + yy * 0.3 * scale + jitter,
    });
  }
  return pts;
}

export function sampleFace(n: number): Point2D[] {
  const pts: Point2D[] = [];
  for (let i = 0; i < n * 0.25; i++) {
    const t = (i / (n * 0.25)) * Math.PI * 2;
    const rx = 0.18 + (Math.random() - 0.5) * 0.012;
    const ry = 0.24 + (Math.random() - 0.5) * 0.012;
    pts.push({ x: 0.5 + Math.cos(t) * rx, y: 0.42 + Math.sin(t) * ry });
  }
  for (let s = -1; s <= 1; s += 2) {
    for (let i = 0; i < n * 0.08; i++) {
      const t = (i / (n * 0.08)) * Math.PI * 2;
      pts.push({
        x: 0.5 + s * 0.07 + Math.cos(t) * 0.038,
        y: 0.4 + Math.sin(t) * 0.018 * 0.7,
      });
    }
  }
  for (let i = 0; i < n * 0.05; i++) {
    const t = i / (n * 0.05);
    pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.022, y: 0.44 + t * 0.1 });
  }
  for (let i = 0; i < n * 0.1; i++) {
    const t = (i / (n * 0.1)) * Math.PI;
    pts.push({
      x: 0.5 + Math.cos(t) * 0.06 * (i < n * 0.05 ? 1 : -1),
      y: 0.57 + Math.sin(t) * 0.022,
    });
  }
  for (let i = 0; i < n * 0.15; i++) {
    pts.push({
      x: 0.5 + (Math.random() - 0.5) * 0.3,
      y: 0.18 + Math.random() * 0.08,
    });
  }
  for (let i = 0; i < n * 0.12; i++) {
    const t = i / (n * 0.12);
    pts.push({
      x: 0.5 + (Math.random() - 0.5) * 0.22,
      y: 0.67 + t * 0.1,
    });
  }
  const rem = n - pts.length;
  for (let i = 0; i < rem; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.22;
    pts.push({ x: 0.5 + Math.cos(a) * r, y: 0.45 + Math.sin(a) * r });
  }
  return pts;
}

export function sampleDNA(n: number): Point2D[] {
  const pts: Point2D[] = [];
  for (let i = 0; i < n * 0.45; i++) {
    const t = i / (n * 0.45);
    const y = 0.1 + t * 0.8;
    const x = 0.5 + Math.sin(t * Math.PI * 7) * 0.2;
    pts.push({ x: x + (Math.random() - 0.5) * 0.012, y });
  }
  for (let i = 0; i < n * 0.45; i++) {
    const t = i / (n * 0.45);
    const y = 0.1 + t * 0.8;
    const x = 0.5 - Math.sin(t * Math.PI * 7) * 0.2;
    pts.push({ x: x + (Math.random() - 0.5) * 0.012, y });
  }
  for (let i = 0; i < n * 0.1; i++) {
    const t = i / (n * 0.1);
    const steps = Math.floor(t * 14);
    const yy = 0.1 + (steps / 14) * 0.8;
    pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.38, y: yy + (Math.random() - 0.5) * 0.01 });
  }
  return pts;
}

export const SHAPES: ShapeDef[] = [
  { name: 'BUTTERFLY', gen: sampleButterfly, color: [0.25, 1.0, 0.78] },
  { name: 'FLOWER', gen: sampleFlower, color: [0.31, 0.8, 0.77] },
  { name: 'SPHERE', gen: sampleSphere, color: [0.5, 0.85, 1.0] },
  { name: 'PORTRAIT', gen: sampleFace, color: [0.88, 0.34, 0.99] },
  { name: 'HELIX', gen: sampleDNA, color: [1.0, 0.7, 0.25] },
];

export function buildShapePoints(num: number): [number, number][][] {
  return SHAPES.map((shape) => {
    const pts = shape.gen(num);
    while (pts.length < num) {
      pts.push(pts[Math.floor(Math.random() * pts.length)]);
    }
    return pts.slice(0, num).map((p) => [
      Math.max(0.02, Math.min(0.98, p.x)),
      Math.max(0.02, Math.min(0.98, p.y)),
    ] as [number, number]);
  });
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
