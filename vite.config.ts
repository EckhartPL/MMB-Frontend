import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default (config) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 3000,
      strictPort: true,
    },
    plugins: [
      react(),
      eslint()
    ],
    resolve: {
      alias: {
        '@backendTypes': path.resolve(__dirname, process.env.VITE_BACKEND_TYPES_PATH),
      }
    }
  })
}