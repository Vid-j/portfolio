import './styles/hub.css';
import { renderHub } from './hub/renderHub';
import { initHub } from './hub/initHub';

document.documentElement.classList.add('js-ready');

const app = document.getElementById('app');
if (!app) {
  throw new Error('#app not found');
}

app.innerHTML = renderHub();
initHub();
