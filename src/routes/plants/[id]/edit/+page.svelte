<script lang="ts">
	import { page } from '$app/stores';
	import PlantForm from '$lib/components/PlantForm.svelte';
	import { auth, docStore, firestore, userStore } from '$lib/firebase';
	import type { Plant } from '$lib/types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { PlantLine } from 'svelte-remixicon';

	const id = $page.params.id;
	const user = userStore(auth);
	const plant = docStore<Plant>(firestore, `users/${$user?.uid}/plants/${id}`);
</script>

<AppBar class="sticky top-0 z-30">
	<svelte:fragment slot="lead"><PlantLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Editing {$plant?.name ?? ''}</h3>
</AppBar>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	{#if $plant}
		<PlantForm plant={{ ...$plant, id }} />
	{:else if $plant === undefined}
		<p class="flex items-center justify-center">Loading...</p>
	{:else}
		<p>Plant not found</p>
	{/if}
</div>
