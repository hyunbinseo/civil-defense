<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTarget: string;

	$: filteredSchedules = data.schedules.filter(
		({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget
	);
</script>

<div class="sticky top-0 bg-white p-6">
	<span>연차</span>
	<select bind:value={selectedTarget}>
		{#each data.targets as target}
			<option>{target}</option>
		{/each}
	</select>
</div>

<div class="flex-1 space-y-6 overflow-y-auto p-6 pt-0">
	{#each filteredSchedules as schedule}
		<ul>
			<li>날짜: {schedule.ED_YMD}</li>
			<li>문의: {schedule.TEL_NO}</li>
			<li>날짜: {schedule.ED_YMD}</li>
			<li>시작: {schedule.EDU_ST_TM}</li>
			<li>종료: {schedule.EDU_END_TM}</li>
			<li>주소: {schedule.EDU_PLC_RDN_ADDR}</li>
			<li>건물: {schedule.EDU_PLC_BOTTOM}</li>
		</ul>
	{/each}
</div>
