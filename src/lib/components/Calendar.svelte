<table>
	<thead>
		<tr>
			<th>일</th>
			<th>월</th>
			<th>화</th>
			<th>수</th>
			<th>목</th>
			<th>금</th>
			<th>토</th>
		</tr>
	</thead>
	<tbody>
		<slot />
	</tbody>
</table>

<style>
	tr:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}
	th {
		color: rgb(107 114 128);
		text-align: end;
	}
	th:first-child {
		color: #ef4444;
	}
</style>
