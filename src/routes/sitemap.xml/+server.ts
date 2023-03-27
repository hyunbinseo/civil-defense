import { sidoData, sigunguData } from '$lib/regions';
import * as Eta from 'eta';
import type { RequestHandler } from './$types';
import template from './template.xml?raw';

export const prerender = true;

export const GET = (async () => {
	const lastmod = import.meta.env.VITE_NOW.substring(0, 10);
	const locations: string[] = [];

	for (const [sidoId] of sidoData) {
		for (const sigunguId of Object.keys(sigunguData[sidoId])) {
			locations.push(`${import.meta.env.VITE_DOMAIN}/${sidoId}/${sigunguId}`);
		}
	}

	return new Response(await Eta.render(template, { lastmod, locations }), {
		headers: { 'Content-Type': 'application/xml' }
	});
}) satisfies RequestHandler;
