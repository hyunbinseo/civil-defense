import { dev } from '$app/environment';
import { isSidoId, sidoData, sigunguData } from '$lib/regions';
import { error, json } from '@sveltejs/kit';
import {
	generateRequest,
	trimEducationSchedule,
	type EducationSchedule,
	type FullEducationSchedule,
	type ResponseBody
} from '../[sigungu=id]';
import type { RequestHandler } from './$types';
import sample from './sample.json' assert { type: 'json' };

export const prerender = true;

export type Data = {
	targets: string[];
	schedules: EducationSchedule[];
	regionText: string;
};

const createJsonResponse = (data: Data) => json(data);

export const GET = (async ({ params, fetch }) => {
	const t0 = performance.now();

	const sidoId = Number(params.sido);
	const sigunguId = Number(params.sigungu);

	if (!isSidoId(sidoId) || !(sigunguId in sigunguData[sidoId])) throw error(404);

	const regionText = `${sidoData.get(sidoId)} ${sigunguData[sidoId][sigunguId]}`;

	if (dev) return createJsonResponse({ ...sample, regionText });

	const baseText = `✓ fetching ${regionText} - `;
	const baseTextLength = baseText.length + regionText.replace(/ /g, '').length;

	process.stdout.write(baseText);

	const updateTerminal = (content: string) => {
		process.stdout.cursorTo(baseTextLength);
		process.stdout.clearLine(1);
		process.stdout.write(content);
	};

	const educationTargetSet = new Set<string>();
	const scheduleSet = new Set<string>();

	const addToSet = (scheduleList: Array<FullEducationSchedule>) => {
		for (const schedule of scheduleList) {
			// API can respond with [{}], instead of [].
			if (Object.keys(schedule).length === 0) continue;
			educationTargetSet.add(schedule.EDU_TGT_SE_NM);
			const trimmed = trimEducationSchedule(schedule);
			const stringified = JSON.stringify(trimmed);
			scheduleSet.add(stringified);
		}
	};

	updateTerminal('1/?');

	const initialResponse = await fetch(generateRequest(params, 1));

	if (!initialResponse.ok) throw error(initialResponse.status);

	const {
		eduShcList,
		rtnResult: { totCnt, pageSize } // pageSize can be 0
	} = (await initialResponse.json()) as ResponseBody;

	if (!eduShcList || !totCnt) return createJsonResponse({ targets: [], schedules: [], regionText });

	addToSet(eduShcList);

	for (let i = 2; i <= pageSize; i += 1) {
		updateTerminal(`${i}/${pageSize}`);

		const response = await fetch(generateRequest(params, i));

		if (!response.ok) throw error(response.status);

		const { eduShcList } = (await response.json()) as ResponseBody;

		if (eduShcList) addToSet(eduShcList);
	}

	const targets = (() => {
		const value = '신편대원';
		const deleted = educationTargetSet.delete(value);
		const array = Array.from(educationTargetSet).sort();
		if (deleted) array.unshift(value);
		return array;
	})();

	const schedules = eval(`[${Array.from(scheduleSet).join(',')}]`) as Array<EducationSchedule>;

	const t1 = performance.now();

	updateTerminal(`${Math.round(t1 - t0)}ms\n`);

	return createJsonResponse({ targets, schedules, regionText });
}) satisfies RequestHandler;
