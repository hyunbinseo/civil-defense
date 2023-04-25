<script lang="ts">
	import { dev, version } from '$app/environment';
	import { page } from '$app/stores';
	import Octocat from '$lib/Octocat.svelte';
	import { generateList } from '$lib/regions';
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

	const heading = `${import.meta.env.VITE_YEAR}년도 민방위 교육 일정`;

	$: title = [$page.data.regionText, heading].filter((v) => v).join(' - ');

	const description =
		'행정안전부에서 제공하는 전국 민방위 교육 일정입니다. 소집 교육은 어디서든 이수할 수 있으므로, 지자체별 일정을 참고해 꼭 참여하시기 바랍니다.';

	const messages = [
		`행정안전부의 '국민 재난 안전 포털'에 등록된 전국 민방위 교육 일정을 정기적으로 불러와 제공하는 공익 목적의 개인 웹사이트입니다.`,
		'민방위 소집 교육은 타 시⋅군⋅구에서도 이수할 수 있습니다. 신분증을 지참해 방문하시기 바랍니다. 별도의 변경 신청은 필요 없습니다.'
	];

	const builtAt = new Date(Number(version));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<div class="relative flex flex-1 flex-col bg-white p-6 pb-0 sm:max-w-screen-sm">
	<a
		href="https://github.com/hyunbinseo/civil-defense#readme"
		aria-label="GitHub 저장소"
		class="absolute right-0 top-0"
	>
		<Octocat />
	</a>
	<header class="mt-6 flex flex-col-reverse">
		<h1 class="mt-1 text-2xl font-bold">{heading}</h1>
		<div class="flex items-center">
			<h2 class="text-xl">
				{$page.data.regionText || '지역을 선택해주세요.'}
			</h2>
			<a
				href="/"
				class:max-sm:block={$page.url.pathname !== '/'}
				class="ml-2 hidden border bg-white px-2 py-1 text-xs hover:bg-gray-50">지역 변경</a
			>
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
			<p class="mt-2 text-sm">
				<time datetime={builtAt.toISOString()}>{builtAt.toLocaleString()}</time> 갱신
			</p>
		</header>
		<div class="mt-7 space-y-4">
			{#each messages as message}
				<label class="flex items-center gap-x-4">
					<input required type="checkbox" class="text-indigo-600" />
					<p class="leading-6">{message}</p>
				</label>
			{/each}
		</div>
		<button class="mt-8 w-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white hover:bg-indigo-700">
			확인했습니다.
		</button>
	</form>
</dialog>

<style>
	details summary {
		cursor: pointer;
	}
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
		display: block;
		scroll-margin-top: 4.5rem;
	}
	dialog::backdrop {
		backdrop-filter: blur(8px) brightness(0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
</style>
