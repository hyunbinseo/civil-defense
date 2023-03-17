import { sigungu } from '$lib/region';
import { error, json } from '@sveltejs/kit';
import {
	generateRequest,
	trimEducationSchedule,
	type EducationSchedule,
	type ResponseBody
} from '.';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, fetch }) => {
	if (
		!(params.sido in sigungu) ||
		!(params.sigungu in sigungu[params.sido as unknown as keyof typeof sigungu])
	)
		throw error(404);

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

	return json(list);
}) satisfies RequestHandler;