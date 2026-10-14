import { resolve } from 'path';

export default {
  root: 'src/',

  server: {
    allowedHosts: ['wdd330-block5-team6-sleepoutside.onrender.com'],
  },

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        encounter: resolve(__dirname, 'src/encounter/index.html'),
        loot: resolve(__dirname, 'src/loot/index.html'),
      },
    },
  },
};