import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyTarget = (() => {
    const rawBase = env.VITE_API_BASE_URL
    if (!rawBase) return 'http://43.201.250.206:8000'
    try {
      return new URL(rawBase).origin
    } catch {
      return rawBase
    }
  })()

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
