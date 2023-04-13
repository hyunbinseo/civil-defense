import { sidoData, sigunguData } from '$lib/regions';
import { Liquid } from 'liquidjs';
import type { RequestHandler } from './$types';
import template from './template.liquid?raw';

const domain = import.meta.env.VITE_DOMAIN;
const engine = new Liquid();
const lastmod = import.meta.env.VITE_NOW.substring(0, 10);

export const prerender = true;

export const GET = (async () => {
	const pathnames = ['/'];

	for (const [sidoId] of sidoData) {
		for (const sigunguId of Object.keys(sigunguData[sidoId])) {
			pathnames.push(`/${sidoId}/${sigunguId}`);
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n${await engine.render(
		engine.parse(template),
		{ domain, lastmod, pathnames }
	)}`;

	return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}) satisfies RequestHandler;
