/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_NOW: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
