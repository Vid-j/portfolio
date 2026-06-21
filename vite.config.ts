import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/portfolio/',
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
