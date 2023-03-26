export const convertDate = (date: string) =>
	`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

const dayText = ['일', '월', '화', '수', '목', '금', '토'];

export const convertDay = (date: string) => dayText[new Date(date).getDay()];

export const convertTime = (time: string) => `${time.substring(0, 2)}:${time.substring(2, 4)}`;
