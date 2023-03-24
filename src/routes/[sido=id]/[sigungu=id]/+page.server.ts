import { dev } from '$app/environment';
import { isSidoId, sidoData, sigunguData } from '$lib/region';
import { error } from '@sveltejs/kit';
import {
	generateRequest,
	trimEducationSchedule,
	type EducationSchedule,
	type FullEducationSchedule,
	type ResponseBody
} from '.';
import type { PageServerLoad } from './$types';
import sample from './sample.json' assert { type: 'json' };

export const prerender = true;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const sidoId = Number(params.sido);
	const sigunguId = Number(params.sigungu);

	if (!isSidoId(sidoId) || !(sigunguId in sigunguData[sidoId])) throw error(404);

	const regionText = `${sidoData.get(sidoId)} ${sigunguData[sidoId][sigunguId]}`;

	if (dev) return { ...sample, regionText };

	const educationTargetSet = new Set<string>();
	const scheduleSet = new Set<string>();

	const addToSet = (scheduleList: FullEducationSchedule[]) => {
		for (const schedule of scheduleList) {
			educationTargetSet.add(schedule.EDU_TGT_SE_NM);
			const trimmed = trimEducationSchedule(schedule);
			const stringified = JSON.stringify(trimmed);
			scheduleSet.add(stringified);
		}
	};

	const initialResponse = await fetch(generateRequest(params, 1));

	if (!initialResponse.ok) throw error(500);

	const {
		eduShcList,
		rtnResult: { pageSize }
	} = (await initialResponse.json()) as ResponseBody;

	addToSet(eduShcList);

	if (pageSize > 1) {
		for (let i = 1; i < pageSize + 1; i += 1) {
			const response = await fetch(generateRequest(params, i));

			if (!response.ok) throw error(500);

			const { eduShcList } = (await response.json()) as ResponseBody;

			addToSet(eduShcList);
		}
	}

	const targets = (() => {
		const value = '신편대원';
		const deleted = educationTargetSet.delete(value);
		const targets = Array.from(educationTargetSet).sort();
		if (deleted) targets.unshift(value);
		return targets;
	})();

	const schedules = eval(
		`[${Array.from(scheduleSet)
			.map((value, index) => value.replace(/}$/, `,"LOCAL_ID":${index}}`))
			.join(',')}]`
	) as Array<EducationSchedule>;

	return { targets, schedules, regionText };
};
