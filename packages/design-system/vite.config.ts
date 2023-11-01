import path from 'path';
import { LogOptions, createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const logger = createLogger();
const customLogger = {
  ...logger,
  info: (msg: string, options?: LogOptions) => {
    logger.info('Hi! I was inserted.\n' + msg, options);
  },
};

const myPlugin = () => ({
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
  plugins: [react(), dts(), myPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'VERTC-design-system',
    },
  },
});
