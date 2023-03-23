<script lang="ts">
	import { generateList } from '$lib/region';
</script>

{#each generateList() as { sido: [sidoId, sidoText], sigungu }}
	<details>
		<summary>{sidoText}</summary>
		<ul>
			{#each sigungu as [sigunguId, sigunguText]}
				<li>
					<a href="/{sidoId}/{sigunguId}">{sidoText} {sigunguText}</a>
				</li>
			{/each}
		</ul>
	</details>
{/each}
