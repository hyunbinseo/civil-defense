export const generateMatrix = (year: number, month: number) => {
	const dates = [new Date(year, month - 1, 1), new Date(year, month, 0)];

	for (const date of dates) if (date.toString() === 'Invalid Date') throw TypeError();

	const startDay = dates[0].getDay();
	const endDate = dates[1].getDate();

	const week = new Array(7).fill(0);

	const matrix: Array<number[]> = [];

	matrix.push(week.map((v, index) => (index >= startDay ? index - startDay + 1 : v)));

	for (let i = 8 - startDay; i <= endDate; i += 7) {
		matrix.push(week.map((v, index) => (i + index <= endDate ? i + index : v)));
	}

	return matrix;
};
