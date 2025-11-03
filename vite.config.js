// vite.config.js
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

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
      input: { main: './index.html' },
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
