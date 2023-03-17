import type { EducationSchedule } from '$routes/api/[sido]/[sigungu]';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api' + url.pathname);
	if (!response.ok) throw error(500);
	return {
		list: (await response.json()) as EducationSchedule
	};
};
