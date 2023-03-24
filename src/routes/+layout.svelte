<script lang="ts">
	import { page } from '$app/stores';
	import { generateList } from '$lib/region';
	import './app.css';

	const now = new Date(); // Rendered time in SSG
	const heading = `${now.getFullYear()}년도 민방위 교육 일정`;
</script>

<svelte:head>
	<title>{$page.data.regionText || '지역 선택'} - {heading}</title>
</svelte:head>

<div class="flex flex-1 flex-col bg-white sm:max-w-screen-sm">
	<header class="mt-6 flex flex-col-reverse p-6">
		<h1 class="mt-1 text-xl font-bold sm:text-2xl">{heading}</h1>
		<div class="flex">
			<h2 class="text-lg sm:text-xl">
				{$page.data.regionText || '지역을 선택해주세요.'}
			</h2>
			<a
				href="/"
				class:max-sm:block={$page.url.pathname !== '/'}
				class="my-auto ml-2 hidden rounded bg-white py-1 px-2 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>변경</a
			>
		</div>
	</header>
	<div class="flex flex-1 overflow-hidden">
		<!-- Column: Select Region -->
		<div
			class="flex flex-col max-sm:flex-1 sm:w-64"
			class:max-sm:hidden={$page.url.pathname !== '/'}
		>
			<div class="flex-1 overflow-y-auto p-6">
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
