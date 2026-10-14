import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Removed root: 'src/' so Vite defaults to the project root directory

  server: {
    host: '0.0.0.0', // Exposes the port to Render's load balancer network
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: ['://onrender.com'],
  },

  build: {
    outDir: 'dist', // Builds straight into a root /dist folder
    emptyOutDir: true, // Cleans the folder before rebuilding
    rollupOptions: {
      input: {
        // Corrected absolute file paths relative to the project root
        main: resolve(__dirname, 'index.html'),
        encounter: resolve(__dirname, 'src/encounter/index.html'),
        loot: resolve(__dirname, 'src/loot/index.html'),
      },
    },
  },
});
