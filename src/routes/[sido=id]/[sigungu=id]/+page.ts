import { error } from '@sveltejs/kit';
import type { Data } from '../[sigungu=id].json/+server';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch, url: { pathname } }) => {
	const response = await fetch(`${pathname}.json`);

	if (!response.ok) throw error(response.status);

	return (await response.json()) as Data;
};
