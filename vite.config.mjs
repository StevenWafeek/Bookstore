import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  plugins: [
    react({
      babel: {
        presets: [['@babel/preset-react', { runtime: 'automatic' }]],
      },
    }),
  ],
});
