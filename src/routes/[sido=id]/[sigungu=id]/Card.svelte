<script context="module" lang="ts">
	const collapseFns = new Set<() => void>();

	export const collapseAll = () => {
		for (const collapseFn of collapseFns) collapseFn();
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { EducationSchedule } from '.';
	import { convertDate, convertDay, convertTime } from './convert';

	export let schedule: EducationSchedule;
	export let hideTarget: boolean;
	export let expanded = false;

	onMount(() => {
		collapseFns.add(() => (expanded = false));
	});

	const date = convertDate(schedule.ED_YMD);
	const startTime = convertTime(schedule.EDU_ST_TM);
	const endTime = convertTime(schedule.EDU_END_TM);
	const address = schedule.EDU_PLC_RDN_ADDR?.replace(/ \(.+동\)$/, '');
	const telHref = `tel:+82${schedule.TEL_NO.substring(1).replace(/-/g, '')}`;
</script>

<button
	on:click={() => {
		if (!expanded) collapseAll();
		expanded = !expanded;
	}}
	class:shadow-inner={expanded}
	aria-label={!expanded ? '추가 정보 펼치기' : '추가 정보 숨기기'}
>
	<div>
		{#if !hideTarget}
			<div>{schedule.EDU_TGT_SE_NM.replace('민방위대 편입 ', '')}</div>
		{/if}
		<time datetime={date}>
			<strong>{date.replace(/-/g, '/')} ({convertDay(date)})</strong>
		</time>
		<div>
			<time datetime={startTime}>{startTime}</time>-<time datetime={endTime}>{endTime}</time>
		</div>
		{#if expanded}
			<div class="collapsed" transition:slide|local>
				<div class="address">
					{#if address}
						<a
							on:click|stopPropagation
							href={encodeURI(`https://map.naver.com/v5/search/${address}`)}
							target="_blank"
						>
							{address}
						</a>
					{/if}
					<span>{schedule.EDU_PLC_BOTTOM}</span>
				</div>
				<div>
					담당 공무원: <a on:click|stopPropagation href={telHref}>{schedule.TEL_NO}</a>
				</div>
			</div>
		{/if}
	</div>
	<svg
		class:rotate-180={expanded}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="3"
		stroke="currentColor"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
	</svg>
</button>

<style>
	button {
		width: 100%;
		text-align: left;
		padding: 1rem;
		display: flex;
		column-gap: 1rem;
	}
	button > div:first-child {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	svg {
		margin: 0.315rem 0.315rem 0 0;
		width: 0.875rem;
		transition: transform 400ms;
	}
	a {
		text-decoration: underline;
		text-decoration-color: #6b7280;
		text-underline-offset: 3px;
	}
	.collapsed > * {
		padding-top: 1rem;
	}
	.address {
		word-break: keep-all;
	}
</style>
