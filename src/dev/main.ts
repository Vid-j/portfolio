import '../styles/sketchbook.css';
import { initScroll } from '../motion/initScroll';
import { initReveals } from '../motion/initReveals';
import { initNavSpy } from '../motion/initNavSpy';
import { renderDevPage, initMobileNav } from '../ui/renderDevPage';

document.documentElement.classList.add('js-ready');

const app = document.getElementById('app');
if (!app) {
  throw new Error('#app not found');
}

app.innerHTML = renderDevPage();
initMobileNav();
initNavSpy();

const scroll = initScroll();
initReveals(scroll.lenis);
