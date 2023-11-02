import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const postBuild = () => ({
  name: 'postbuild-commands',
  closeBundle: async () => {
    console.log('[closeBundle]');
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  // customLogger,
  server: {
    port: 8081,
    open: false,
    cors: true,
  },
  plugins: [react(), dts(), postBuild()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'VERTC-design-system',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
