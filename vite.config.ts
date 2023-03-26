import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

process.env.VITE_NOW = new Date().toISOString();

export default defineConfig({
	plugins: [sveltekit()]
});
