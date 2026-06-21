import '../styles/thoughts.css';
import { initBackToHome, initEnterTransition } from '../motion/routeTransitions';
import { renderThoughts } from './renderThoughts';

document.documentElement.classList.add('js-ready');

const app = document.getElementById('app');
if (!app) {
  throw new Error('#app not found');
}

app.innerHTML = renderThoughts();
initBackToHome('thoughts');
initEnterTransition('thoughts');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
    el.classList.add('is-visible');
  });
} else {
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('is-visible');
  });
}
