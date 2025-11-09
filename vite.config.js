// vite.config.js
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        index: resolve(__dirname, 'index/index.html'),
        error: resolve(__dirname, 'error/index.html'),
        'project-options-institute': resolve(__dirname, 'project/options-institute/index.html'),
        'project-maven-wave': resolve(__dirname, 'project/maven-wave/index.html'),
        'project-naked-juice': resolve(__dirname, 'project/naked-juice/index.html'),
        'project-collective': resolve(__dirname, 'project/collective/index.html'),
        'project-bp': resolve(__dirname, 'project/bp/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  publicDir: 'public',
  plugins: [
    glsl({
      include: /\.(glsl|vs|fs)$/i,
      warnDuplicatedImports: false,
      compress: false,
    }),
  ],
});
