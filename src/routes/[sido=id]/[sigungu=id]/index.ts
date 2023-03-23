const yyyymmdd = new Date()
	.toLocaleString('ko-KR', {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
	.replace(/[\s.]/g, '');

export const generateRequest = (
	{ sigungu, sido }: { sigungu: string; sido: string },
	pageIndex = 1
) =>
	new Request('https://www.safekorea.go.kr/idsiSFK/sfk/cs/cvi/edtr/selectEduSchList2.do', {
		headers: {
			accept: 'application/json',
			'content-type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify({
			selectList: {
				pageIndex,
				q_area_cd_2: sigungu,
				q_area_cd_1: sido,
				q_strdate: yyyymmdd,
				q_enddate: `${yyyymmdd.substring(0, 4)}1231`,
				searchDate1: yyyymmdd,
				searchDate2: `${yyyymmdd.substring(0, 4)}1231`,
				searchGb: '',
				firstIndex: '1',
				lastIndex: '1',
				pageSize: 4,
				pageUnit: '10',
				recordCountPerPage: '10',
				sbscrbSttus: '',
				searchCondition: '',
				search_val: '',
				search_key: '',
				searchCdKey: '',
				parntsBdongCd: '',
				emgncContactNtwkSeCd: '2',
				orgSeCd: '02',
				q_area_cd_3: '',
				q_onefour: '',
				hdaySe: '',
				edcTgtSeCd: '',
				cvdpyCpsCode: '',
				cvdEduSeCode: '',
				edYmd: '',
				edSno: '',
				rdn_code: ''
			}
		}),
		method: 'POST'
	});

export type FullEducationSchedule = {
	edcBeginTime: string;
	edcSeNm: string;
	TEL_NO: string;
	EDU_ST_TM: string;
	CVDPY_CPS_CODE: string;
	ROW_NO: string;
	EDU_PLC_RDN_ADDR: string;
	CVD_EDU_SE_NM: string;
	EDU_PLC: string;
	edcTgtSeNm: string;
	EDU_END_TM: string;
	edcEndTime: string;
	edcntrAdres: string;
	edcntrRdnmadr: string;
	CVD_EDU_SE_CODE: string;
	EDU_TGT_SE_NM: string;
	EDU_TGT_SE_CODE: string;
	ED_YMD: string;
	EDU_PLC_TOP: string;
	edcDe: string;
	EDU_PLC_ADDR: string;
	ED_SNO: string;
	edcntrNm: string;
	EDU_PLC_BOTTOM: string;
};

export type ResponseBody = {
	eduShcList: Array<FullEducationSchedule>;
	rtnResult: {
		totCnt: number;
		pageSize: number;
	};
};

export type EducationSchedule = Pick<
	FullEducationSchedule,
	| 'TEL_NO'
	| 'ED_YMD'
	| 'EDU_ST_TM'
	| 'EDU_END_TM'
	| 'EDU_PLC_RDN_ADDR'
	| 'EDU_PLC_BOTTOM'
	| 'CVD_EDU_SE_NM'
	| 'EDU_TGT_SE_NM'
> & { LOCAL_ID: number };

export const trimEducationSchedule = ({
	TEL_NO,
	ED_YMD,
	EDU_ST_TM,
	EDU_END_TM,
	EDU_PLC_RDN_ADDR,
	EDU_PLC_BOTTOM,
	CVD_EDU_SE_NM,
	EDU_TGT_SE_NM
}: FullEducationSchedule) => ({
	TEL_NO,
	ED_YMD,
	EDU_ST_TM,
	EDU_END_TM,
	EDU_PLC_RDN_ADDR,
	EDU_PLC_BOTTOM,
	CVD_EDU_SE_NM,
	EDU_TGT_SE_NM
});
