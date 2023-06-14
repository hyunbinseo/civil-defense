import { writeFileSync } from 'node:fs';

const url = (relativePath: `/${string}`) =>
	`https://www.safekorea.go.kr/idsiSFK/neo/ext/json/arcd/hd${relativePath}`;

const sidoResponse = await fetch(url('/hd_sido.json'));

const sidoArray = (await sidoResponse.json()) as Array<{
	FLL_ORG_NM: string;
	ORG_ACCTO_STEP_SE_CD: string;
	UPPER_ORG_CD: string;
	ORG_CD: string;
	ARCD: string;
	ORG_NM: string;
}>;

const sidoData = sidoArray.map(({ ORG_CD, FLL_ORG_NM }) => [Number(ORG_CD), FLL_ORG_NM]);

const sigunguData: Record<number, Record<number, string>> = {};

for (const [sidoId] of sidoData) {
	if (sidoId === 5690000) {
		sigunguData[sidoId] = { 5690000: '세종시' };
		continue;
	}

	const sggResponse = await fetch(url(`/${sidoId}/hd_sgg.json`));

	const sggArray = (await sggResponse.json()) as Array<{
		FLL_ORG_NM: string;
		ORG_ACCTO_STEP_SE_CD: string;
		UPPER_ORG_CD: string;
		ORG_CD: string;
		ARCD: string;
		ORG_NM: string;
	}>;

	sigunguData[sidoId] = sggArray.reduce(
		(acc, { ORG_CD, ORG_NM }) => ({ ...acc, [ORG_CD]: ORG_NM }),
		{}
	);
}

writeFileSync('sido.json', JSON.stringify(sidoData));
writeFileSync('sigungu.json', JSON.stringify(sigunguData));

export {};
