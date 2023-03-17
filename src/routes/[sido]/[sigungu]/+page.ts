import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api' + url.pathname);
	if (!response.ok) throw error(500);
	return await response.json();
};
