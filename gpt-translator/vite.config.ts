// vite.config.ts - Add debug logs to see what env is loaded
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // ← ADD THESE DEBUG LOGS (they print in your terminal when server starts)
  console.log('🔍 Loaded env variables:', env)
  console.log('🔑 VITE_OPENAI_API_KEY:', env.VITE_OPENAI_API_KEY || 'MISSING/UNDEFINED!')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/openai': {
          target: 'https://api.openai.com/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openai/, ''),
          secure: true,
          headers: {
            Authorization: `Bearer ${"sk-...ckEA"}`,
          },
        },
      },
    },
  }
})