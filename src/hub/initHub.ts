import { initEmailCaptureForm } from './EmailCaptureForm';
import { createHubBloomScene } from '../webgl/createHubBloomScene';

export function initHub(): void {
  initEmailCaptureForm();

  const canvas = document.getElementById('hub-bloom-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  try {
    createHubBloomScene(canvas);
  } catch (err) {
    console.warn('Hub bloom WebGL background unavailable:', err);
  }
}
