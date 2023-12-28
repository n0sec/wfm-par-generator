<script lang="ts">
	import { copyToClipboard } from '$lib/util';
	import { fade } from 'svelte/transition';

	export let copied: boolean = false;
	export let elementToCopy: HTMLElement;
</script>

{#if !copied}
	<button
		class="btn btn-ghost btn-sm rounded-sm absolute top-0 right-2"
		on:click={() => {
			copyToClipboard(elementToCopy)
				.then(() => {
					copied = true;
					setTimeout(() => {
						copied = false;
					}, 2000);
				})
				.catch((err) => {
					console.error(err);
				});
		}}
		transition:fade={{ duration: 200 }}
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M7 7h10V5h2v14H5V5h2z"
			/></svg
		>
	</button>
{:else}
	<span class="text-success absolute top-0 right-2 text-sm" transition:fade={{ duration: 200 }}
		><svg xmlns="http://www.w3.org/2000/svg" class="w-[16px] h-[16px] inline" viewBox="0 0 24 24"
			><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" /></svg
		> Text copied!</span
	>
{/if}
