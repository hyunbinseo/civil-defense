import { version } from '$app/environment';
import { PUBLIC_DOMAIN } from '$env/static/public';
import { sigunguData } from '$lib/regions';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET = (async () => {
	const pathnames = Object.entries(sigunguData).flatMap(([sidoId, sigunguData]) =>
		Object.keys(sigunguData).map((sigunguId) => `/${sidoId}/${sigunguId}`)
	);

	pathnames.push('/');

	const lastmod = new Date(Number(version)).toISOString().substring(0, 10);

	const urls = pathnames
		.map((path) => `<url><loc>${PUBLIC_DOMAIN}${path}</loc><lastmod>${lastmod}</lastmod></url>`)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

	return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}) satisfies RequestHandler;
