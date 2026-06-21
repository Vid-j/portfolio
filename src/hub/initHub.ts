import { initEmailCaptureForm } from './EmailCaptureForm';
import { initEnterTransition, initHubDestinations } from '../motion/routeTransitions';

export function initHub(): void {
  initEmailCaptureForm();
  initHubDestinations();
  initEnterTransition('hub');
}
