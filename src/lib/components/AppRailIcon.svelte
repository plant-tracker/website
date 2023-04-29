<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let src: typeof SvelteComponent;
	export let classList = 'h-8 w-8';
</script>

<svelte:component this={src} class={classList} />
