/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMetaEnv {
  readonly VITE_SERVER_API: string
  readonly VITE_SERVER_SOCKET: string
  readonly VITE_SOME_KEY: string
  // more env variables...
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMeta {
  readonly env: ImportMetaEnv
}
