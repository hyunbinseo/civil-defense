<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import Card from './Card.svelte';

	export let data: PageData;

	let list: HTMLDivElement;
	let selectedTarget = '';

	beforeNavigate(() => (selectedTarget = ''));

	$: filteredSchedules = !selectedTarget
		? []
		: data.schedules.filter(({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget);
</script>

<div class="flex h-full flex-col space-y-6 overflow-y-hidden">
	<!-- The focus outline is trimmed in iOS Safari. -->
	<select
		bind:value={selectedTarget}
		on:change={() => (list.scrollTop = 0)}
		class="appearance-none border bg-transparent p-4"
		class:text-red-700={!selectedTarget}
		class:border-red-700={!selectedTarget}
	>
		<option value="" disabled>연차를 선택해주세요.</option>
		{#each data.targets as target}
			<option value={target}>{target === '신편대원' ? '민방위대 편입 1년차 대원' : target}</option>
		{/each}
	</select>

	{#if selectedTarget.match(/[3-5]/)}
		<p class="border border-red-700 p-4 text-red-700" transition:slide|local>
			3년 차 이상은 사이버 교육으로 진행되며, 반드시 본인이 속한 지자체의 안내에 따라 이수하셔야
			합니다. (타 시군구 교육 참여 불가)
		</p>
	{/if}

	{#if filteredSchedules.length}
		<div bind:this={list} class="flex-1 overflow-y-auto">
			<div class="mb-6 flex flex-col divide-y border">
				{#each filteredSchedules as schedule}
					<Card {schedule} />
				{/each}
			</div>
		</div>
	{/if}
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
