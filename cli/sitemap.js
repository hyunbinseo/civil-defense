// @ts-check

import 'dotenv/config';

const { PUBLIC_DOMAIN } = process.env;
if (!PUBLIC_DOMAIN) throw new Error('PUBLIC_DOMAIN environment variable is not found.');

const response = await fetch(`https://www.google.com/ping?sitemap=${PUBLIC_DOMAIN}/sitemap.xml`);
if (!response.ok) throw new Error(response.status.toString());

console.log('Sitemap has been submitted. Please check the Search Console.');
console.log(
	`https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3A${PUBLIC_DOMAIN.replace(
		'https://',
		''
	)}`
);
