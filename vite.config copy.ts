import { defineConfig } from 'vite'
import path from 'path'

import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
// https://vitejs.dev/config/

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable_icon.png'],
  manifest: {
    name: 'Pixainova',
    short_name: 'Pixai',
    description: 'I am a simple vite app',
    lang: 'es-Es',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        purpose: 'maskable',
        sizes: '3300x3300',
        src: 'maskable_icon.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '48x48',
        src: 'maskable_icon_x48.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '72x72',
        src: 'maskable_icon_x72.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '96x96',
        src: 'maskable_icon_x96.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '128x128',
        src: 'maskable_icon_x128.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '192x192',
        src: 'maskable_icon_x192.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '384x384',
        src: 'maskable_icon_x384.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: 'maskable_icon_x512.png',
        type: 'image/png',
      },
    ],
    theme_color: '#d32f2f',
    background_color: '#fff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: '/',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
