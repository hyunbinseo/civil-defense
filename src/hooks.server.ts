import { version } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	event.locals.lastModified = new Date(Number(version));
	return resolve(event);
};
