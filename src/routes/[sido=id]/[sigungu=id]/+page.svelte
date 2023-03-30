<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import Card from './Card.svelte';

	export let data: PageData;

	let list: HTMLDivElement;
	let selectedTarget = '';

	afterNavigate(async () => {
		list.scrollTop = 0;

		const validTarget = data.schedules.some(
			({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget
		);

		if (!validTarget) selectedTarget = '';
	});

	$: filteredSchedules = !selectedTarget
		? data.schedules
		: data.schedules.filter(({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget);

	$: message = !data.targets.length
		? '등록된 교육 일정이 없습니다. 국민 재난 안전 포털을 확인해 보시기 바랍니다.'
		: selectedTarget.match(/[3-5]/)
		? '3년 차 이상은 사이버 교육으로 진행되며, 반드시 본인이 속한 지자체의 안내에 따라 이수하셔야 합니다. (타 시군구 교육 참여 불가)'
		: '';
</script>

<!-- Cannot use gap-y-*, since it breaks the slide transition. -->
<div class="flex h-full flex-col overflow-y-hidden">
	<!-- The focus outline is trimmed in iOS Safari. -->
	<select
		bind:value={selectedTarget}
		on:change={() => (list.scrollTop = 0)}
		disabled={!data.targets.length}
		class="mb-3 appearance-none border bg-transparent p-4"
	>
		<option value="">연차를 선택해주세요.</option>
		{#each data.targets as target}
			<option value={target}>{target === '신편대원' ? '민방위대 편입 1년차 대원' : target}</option>
		{/each}
	</select>

	{#if message}
		<p class="border border-red-700 p-4 text-red-700" transition:slide|local>
			{message}
		</p>
	{/if}

	<div bind:this={list} class="mt-3 flex-1 overflow-y-auto">
		{#if filteredSchedules.length}
			<ul class="mb-6 flex flex-col divide-y border">
				{#each filteredSchedules as schedule, index (schedule.EDU_LOCAL_ID)}
					<li>
						<Card {schedule} expanded={index === 0} hideTarget={!!selectedTarget} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
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
