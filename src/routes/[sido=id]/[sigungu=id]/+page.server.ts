import { error } from '@sveltejs/kit';
import type { Data } from '../[sigungu=id].json/+server';
import { convertDate, convertTime } from './convert';

export const prerender = true;

export const load = async ({
	fetch,
	params: { sido, sigungu },
	url: { pathname },
	locals: { lastModified }
}) => {
	const response = await fetch(`${pathname}.json`);

	if (!response.ok) throw error(response.status);

	const data = (await response.json()) as Data;

	const schedules = data.schedules.map((schedule, index) => {
		const ED_YMD = convertDate(schedule.ED_YMD);
		const EDU_ST_TM = convertTime(schedule.EDU_ST_TM);
		const EDU_END_TM = convertTime(schedule.EDU_END_TM);
		return {
			...schedule,
			ED_YMD,
			EDU_ST_TM,
			EDU_END_TM,
			EDU_LOCAL_ID: `${sido}-${sigungu}-${index}`,
			DATE: new Date(`${ED_YMD}T${EDU_ST_TM}:00.000+0900`)
		};
	});

	return { ...data, schedules, lastModified };
};
