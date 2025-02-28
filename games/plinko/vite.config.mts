import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { sentryVitePlugin } from "@sentry/vite-plugin"
import { globSync } from 'glob'

export default defineConfig(({ mode }) => {
  const isLocal = mode === 'development'
  console.log(`mode:${mode}`)
  return {
    publicDir: resolve(__dirname, 'public'),
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    build: {
     /* lib: {
        entry: 'src/main.js',
        name: 'Game',
        formats: ['umd'],
        fileName: 'game',
      },*/
      chunkSizeWarningLimit: 160,
      emptyOutDir: true,
      manifest: 'manifest.json',
      minify: 'esbuild',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
        },
        output: {
          // entryFileNames: 'static/js/game.js',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1) || ''
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img'
            } else if (/ttf|woff|woff2/i.test(extType)) {
              extType = 'media'
            } else if (/css/i.test(extType)) {
              extType = 'css'
            }
            return `static/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'static/js/[hash].js',
          compact: true,
          sourcemap: true,
          dir: resolve(__dirname, 'dist'),
        },
      },
    },
    envPrefix :'VITE_',
    envDir : resolve(__dirname),
    define: !isLocal ? {
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify('production'),
    } : {},
    plugins: [react(),
      sentryVitePlugin({
        org: "apis-46",
        project: "game-plinko-frontend",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: { filesToDeleteAfterUpload: globSync('dist/static/js/*.map') }
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    root: resolve(__dirname, 'src'),
    server: {
      hmr: {
        clientPort: Number(process.env.VITE_SERVER_HMR_CLIENT_PORT) || 3001,
        port: Number(process.env.VITE_SERVER_HMR_PORT) || 3001,
      },
      host: true,
      port: Number(process.env.PORT) || 3000,
      strictPort: true,
    },
  }
})
