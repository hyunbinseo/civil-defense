<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTarget: string;

	$: filteredSchedules = data.schedules.filter(
		({ EDU_TGT_SE_NM }) => EDU_TGT_SE_NM === selectedTarget
	);
</script>

<span>연차를 선택해주세요.</span>

<select bind:value={selectedTarget}>
	{#each data.targets as target}
		<option>{target}</option>
	{/each}
</select>

{#each filteredSchedules as schedule}
	<pre>{JSON.stringify(schedule, null, 2)}</pre>
{/each}
