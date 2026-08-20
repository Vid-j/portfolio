import '../styles/sketchbook.css';
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

const scroll = initScroll();
initReveals(scroll.lenis);
