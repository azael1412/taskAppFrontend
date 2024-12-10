/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BRAND_NAME: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_THEME_COLOR: string
  readonly VITE_LANG: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
