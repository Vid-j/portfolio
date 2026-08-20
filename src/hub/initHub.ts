import { initEmailCaptureForm } from './EmailCaptureForm';
import { initEnterTransition, initHubDestinations } from '../motion/routeTransitions';
import { createHubBloomScene } from '../webgl/createHubBloomScene';

export function initHub(): void {
  initEmailCaptureForm();
  initHubDestinations();
  initEnterTransition('hub');

  const canvas = document.getElementById('hub-bloom-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  try {
    createHubBloomScene(canvas);
  } catch (err) {
    console.warn('Hub bloom WebGL background unavailable:', err);
  }
}
