/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DOMAIN: string;
	readonly VITE_NOW: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
