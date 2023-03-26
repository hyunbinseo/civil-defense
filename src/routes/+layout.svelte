<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { generateList } from '$lib/region';
	import { onMount } from 'svelte';
	import './app.css';

	let dialog: HTMLDialogElement;

	onMount(() => {
		if (!dev) dialog.showModal();

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

	const modalMessages = [
		`본 웹사이트는 '행정안전부'에서 운영하는 '국민 재난 안전 포털'에 등록된 민방위 교육 일정을 불러와 제공하는 개인 웹사이트입니다.`,
		'민방위 소집 교육은 전국 어디서든 이수할 수 있습니다. 별도의 변경 신청 없이, 신분증과 통지서를 챙겨서 교육장을 방문하면 됩니다.'
	];
</script>

<svelte:head>
	<title>{$page.data.regionText || '지역 선택'} - {heading}</title>
</svelte:head>

<div class="flex flex-1 flex-col bg-white p-6 pb-0 sm:max-w-screen-sm">
	<header class="mt-6 flex flex-col-reverse">
		<h1 class="mt-1 text-2xl font-bold">{heading}</h1>
		<div class="flex items-center">
			<h2 class="text-xl">
				{$page.data.regionText || '지역을 선택해주세요.'}
			</h2>
			<a
				href="/"
				class:max-sm:block={$page.url.pathname !== '/'}
				class="ml-2 hidden border bg-white py-1 px-2 text-xs hover:bg-gray-50"
			>
				변경
			</a>
		</div>
	</header>
	<div class="mt-8 flex flex-1 gap-x-6 overflow-y-hidden">
		<!-- Column: Select Region -->
		<div
			class="overflow-y-auto max-sm:flex-1 sm:w-60"
			class:max-sm:hidden={$page.url.pathname !== '/'}
		>
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
		<!-- Column -->
		<div class="flex-1" class:max-sm:hidden={$page.url.pathname === '/'}>
			<slot />
		</div>
	</div>
</div>

<dialog bind:this={dialog} class="max-w-sm p-6" on:cancel|preventDefault>
	<form method="dialog">
		<header class="mt-1">
			<h1 class="text-2xl font-bold">필수 안내 사항</h1>
			<p class="mt-1 text-sm">{now.toLocaleDateString()}에 최종 갱신되었습니다.</p>
		</header>
		<div class="mt-7 space-y-4">
			{#each modalMessages as textContent}
				<label class="flex items-center gap-x-4">
					<input required type="checkbox" class="text-indigo-600" />
					<p class="leading-6">{textContent}</p>
				</label>
			{/each}
		</div>
		<button class="mt-8 w-full bg-indigo-600 py-2.5 px-3.5 text-sm text-white hover:bg-indigo-700">
			확인했습니다.
		</button>
	</form>
</dialog>

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
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.7);
	}
</style>
