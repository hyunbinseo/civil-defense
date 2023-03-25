<script lang="ts">
	import { page } from '$app/stores';
	import { generateList } from '$lib/region';
	import { onMount } from 'svelte';
	import './app.css';

	onMount(() => {
		// When the result page is accessed directly, the corresponding anchor should be shown.
		const anchor = document.querySelector(`[href='${$page.url.pathname}']`);
		const details = anchor?.closest('details');
		if (anchor && details) {
			details.open = true;
			anchor.scrollIntoView();
		}
	});

	const now = new Date(); // Rendered time in SSG
	const heading = `${now.getFullYear()}년도 민방위 교육 일정`;
</script>

<svelte:head>
	<title>{$page.data.regionText || '지역 선택'} - {heading}</title>
</svelte:head>

<div class="flex flex-1 flex-col bg-white p-6 pb-0 sm:max-w-screen-sm">
	<header class="mt-6 flex flex-col-reverse">
		<h1 class="mt-1 text-2xl font-bold">{heading}</h1>
		<div class="flex">
			<h2 class="text-xl">
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
	<div class="mt-8 flex flex-1 gap-x-6 overflow-hidden">
		<!-- Column: Select Region -->
		<div
			class="flex flex-col max-sm:flex-1 sm:w-60"
			class:max-sm:hidden={$page.url.pathname !== '/'}
		>
			<div class="max-sm:text-md flex-1 overflow-y-auto">
				<div class="mb-6 divide-y border">
					{#each generateList() as { sido: [sidoId, sidoText], sigungu }}
						<details>
							<summary>{sidoText}</summary>
							<ul>
								{#each sigungu as [sigunguId, sigunguText]}
									{@const href = `/${sidoId}/${sigunguId}`}
									<li>
										<a {href} class:text-indigo-700={href === $page.url.pathname}>
											{sidoText}
											{sigunguText}
										</a>
									</li>
								{/each}
							</ul>
						</details>
					{/each}
				</div>
			</div>
		</div>
		<!-- Column -->
		<div class="flex flex-1 flex-col" class:max-sm:hidden={$page.url.pathname === '/'}>
			<slot />
		</div>
	</div>
</div>

<style>
	details[open] summary {
		background-color: rgb(243 244 246);
		position: sticky;
		top: -1px;
	}
	details summary,
	details ul {
		padding: 1rem;
	}
	details ul li:not(:first-child) {
		margin-top: 1rem;
	}
	details ul li a {
		scroll-margin-top: 4.5rem;
	}
</style>
