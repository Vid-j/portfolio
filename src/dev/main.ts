import '../styles/sketchbook.css';
import { createScene } from '../webgl/createScene';
import { initScroll } from '../motion/initScroll';
import { initReveals } from '../motion/initReveals';
import { initBackToHome, initEnterTransition } from '../motion/routeTransitions';
import { renderDevPage, initMobileNav } from '../ui/renderDevPage';

document.documentElement.classList.add('js-ready');

const app = document.getElementById('app');
if (!app) {
  throw new Error('#app not found');
}

app.innerHTML = renderDevPage();
initMobileNav();
initBackToHome('dev');
initEnterTransition('dev');

const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null;
if (canvas) {
  try {
    const webgl = createScene(canvas);
    const scroll = initScroll();

    scroll.lenis?.on('scroll', () => {
      webgl.setScroll(scroll.lenis?.scroll ?? 0);
    });

    initReveals(scroll.lenis);
  } catch (err) {
    console.warn('WebGL background unavailable:', err);
    initReveals(null);
  }
} else {
  initReveals(null);
}
