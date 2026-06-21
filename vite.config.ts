import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// GitHub Pages project sites live at /portfolio/; Vercel serves from domain root.
// Override anytime with VITE_BASE_PATH (e.g. VITE_BASE_PATH=/portfolio/ npm run build)
const base = process.env.VITE_BASE_PATH ?? (process.env.VERCEL ? '/' : '/portfolio/');

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dev: resolve(__dirname, 'dev.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        thoughts: resolve(__dirname, 'thoughts.html'),
      },
    },
  },
});
