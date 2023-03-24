<script lang="ts">
	import { page } from '$app/stores';
	import { generateList } from '$lib/region';
	import './app.css';
</script>

<div class="flex flex-1 flex-col bg-white sm:max-w-screen-sm">
	<header class="p-6">
		<h1>{new Date().getFullYear()}년도 민방위 교육 일정</h1>
	</header>
	<div class="flex flex-1 overflow-hidden">
		<!-- Column: Select Region -->
		<div
			class="flex flex-col max-sm:flex-1 sm:w-64"
			class:max-sm:hidden={$page.url.pathname !== '/'}
		>
			<div class="sticky top-0 bg-white p-6">지역</div>
			<div class="flex-1 overflow-y-auto p-6 pt-0">
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
			</div>
		</div>
		<!-- Column -->
		<div class="flex flex-1 flex-col" class:max-sm:hidden={$page.url.pathname === '/'}>
			<slot />
		</div>
	</div>
</div>
