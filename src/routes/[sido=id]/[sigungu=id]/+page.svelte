<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTarget: string;

	$: filteredSchedules = data.schedules.filter(
		({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget
	);
</script>

<!-- The focus outline is trimmed in iOS Safari. -->
<select bind:value={selectedTarget} class="appearance-none border bg-transparent p-4">
	{#each data.targets as target}
		<option value={target}>{target === '신편대원' ? '민방위대 편입 1년차 대원' : target}</option>
	{/each}
</select>

<div class="mt-6 flex-1 space-y-6 overflow-y-auto">
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

<style>
	select {
		/* chevron-up-down, https://heroicons.com/ */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='rgb(17,24,39)'%0A%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E");
		background-origin: content-box;
		background-repeat: no-repeat;
		background-position-x: 100%;
	}
</style>
