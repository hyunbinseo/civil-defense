import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// TODO: Implement build end notification.
// Reference https://github.com/sveltejs/kit/discussions/9939

export default defineConfig(() => ({ plugins: [sveltekit()] }));
