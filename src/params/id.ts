import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^\d{7}$/.test(param);
}) satisfies ParamMatcher;
