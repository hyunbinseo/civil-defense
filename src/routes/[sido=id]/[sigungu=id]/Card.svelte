<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { EducationSchedule } from '.';
	import { convertDate, convertDay, convertTime } from './convert';

	export let schedule: EducationSchedule;

	let expanded = false;

	const date = convertDate(schedule.ED_YMD);
	const startTime = convertTime(schedule.EDU_ST_TM);
	const endTime = convertTime(schedule.EDU_END_TM);
	const address = schedule.EDU_PLC_RDN_ADDR.replace(/ \(.+동\)$/, '');
	const telHref = `tel:+82${schedule.TEL_NO.substring(1).replace(/-/g, '')}`;
</script>

<button on:click={() => (expanded = !expanded)}>
	<div class="flex">
		<div class="flex-1">
			<div class="font-bold">
				<time datetime={date}>{date.replace(/-/g, '/')} ({convertDay(date)})</time>
			</div>
			<div>
				<time datetime={startTime}>{startTime}</time>-<time datetime={endTime}>{endTime}</time>
			</div>
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
	</div>

	{#if expanded}
		<div class="collapsed" transition:slide|local>
			<div class="address">
				<a href={encodeURI(`https://map.naver.com/v5/search/${address}`)} target="_blank">
					{address}
				</a>
				<span>{schedule.EDU_PLC_BOTTOM}</span>
			</div>
			<div>
				민방위 담당자: <a href={telHref}>{schedule.TEL_NO}</a>
			</div>
		</div>
	{/if}
</button>

<style>
	button {
		user-select: text;
		padding: 1rem;
		text-align: left;
	}
	svg {
		margin-right: 0.325rem;
		width: 0.875rem;
		transition: transform 400ms;
	}
	a {
		text-decoration: underline;
		text-decoration-color: #6b7280;
		text-underline-offset: 3px;
	}
	.collapsed {
		font-size: 0.9rem;
	}
	.collapsed > * {
		padding-top: 0.75rem;
	}
	.address {
		display: flex;
		flex-direction: column;
	}
</style>
