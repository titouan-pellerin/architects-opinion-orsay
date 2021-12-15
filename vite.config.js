import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: '8080',
    https: false,
    open: true,
  },
  // resolve: {
  //   alias: [
  //     { find: '@js', replacement: '/src/js' },
  //     { find: '@styles', replacement: '/src/styles' },
  //     { find: '@glsl', replacement: '/src/glsl' },
  //     { find: '@assets', replacement: '/src/assets' },
  //   ],
  // },
});
