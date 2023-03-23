<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import { generateMatrix } from './matrix';

	const padNumber = (number: number) => number.toString().padStart(2, '0');
</script>

<Calendar>
	{@const year = 2023}
	{@const month = 3}
	{#each generateMatrix(year, month) as week}
		<tr>
			{#each week as day}
				<td>
					{#if day}
						<div>
							<time datetime="{year}-{padNumber(month)}-{padNumber(day)}">{day}</time>
						</div>
					{/if}
				</td>
			{/each}
		</tr>
	{/each}
</Calendar>

<style>
	td {
		color: rgb(156 163 175);
	}
	td:first-child {
		color: #f87171;
	}
	td > div {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
