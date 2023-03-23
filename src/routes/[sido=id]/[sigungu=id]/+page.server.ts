import { dev } from '$app/environment';
import { isSidoId, sigungu } from '$lib/region';
import { error } from '@sveltejs/kit';
import {
	generateRequest,
	trimEducationSchedule,
	type EducationSchedule,
	type ResponseBody
} from '.';
import type { PageServerLoad } from './$types';
import sample from './sample.json' assert { type: 'json' };

export const prerender = true;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const sidoId = Number(params.sido);

	if (!isSidoId(sidoId) || !(params.sigungu in sigungu[sidoId])) throw error(404);

	if (dev) return { list: sample };

	const initialResponse = await fetch(generateRequest(params, 1));

	if (!initialResponse.ok) throw error(500);

	const {
		eduShcList,
		rtnResult: { pageSize }
	} = (await initialResponse.json()) as ResponseBody;

	const list: EducationSchedule[] = eduShcList.map(trimEducationSchedule);

	if (pageSize > 1) {
		for (let i = 1; i < pageSize + 1; i += 1) {
			const response = await fetch(generateRequest(params, i));

			if (!response.ok) throw error(500);

			const { eduShcList } = (await response.json()) as ResponseBody;

			list.push(...eduShcList.map(trimEducationSchedule));
		}
	}

	return { list };
};
