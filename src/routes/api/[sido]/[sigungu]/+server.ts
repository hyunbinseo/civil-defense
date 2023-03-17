import { sigungu } from '$lib/region';
import { error, json } from '@sveltejs/kit';
import { selectList } from '.';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, fetch }) => {
	if (
		!(params.sido in sigungu) ||
		!(params.sigungu in sigungu[params.sido as unknown as keyof typeof sigungu])
	)
		throw error(404);

	const fullYear = new Date().getFullYear();

	const response = await fetch(
		'https://www.safekorea.go.kr/idsiSFK/sfk/cs/cvi/edtr/selectEduSchList2.do',
		{
			headers: {
				accept: 'application/json',
				'content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
				selectList: {
					...selectList,
					pageIndex: 1,
					q_area_cd_2: params.sigungu,
					q_area_cd_1: params.sido,
					q_strdate: `${fullYear}0101`,
					q_enddate: `${fullYear}1231`,
					searchDate1: `${fullYear}0101`,
					searchDate2: `${fullYear}1231`
				}
			}),
			method: 'POST'
		}
	);

	if (!response.ok) throw error(500);

	return json(await response.json());
}) satisfies RequestHandler;
