import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// https://developers.cloudflare.com/workers/platform/sites/start-from-worker/

addEventListener('fetch', (event) => {
	event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
	try {
		return await getAssetFromKV(event);
	} catch (e) {
		return Response.redirect('/', 302);
	}
}
