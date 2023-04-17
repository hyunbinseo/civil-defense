/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DOMAIN: string;
	readonly VITE_YEAR: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
