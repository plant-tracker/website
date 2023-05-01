<script lang="ts">
	import { page } from '$app/stores';
	import PlantCard from '$lib/components/PlantCard.svelte';
	import PlantPreferencesCard from '$lib/components/PlantPreferencesCard.svelte';
	import { auth, docStore, firestore, userStore } from '$lib/firebase';
	import type { Plant } from '$lib/types';

	const id = $page.params.id;
	const user = userStore(auth);
	const plant = docStore<Plant>(firestore, `users/${$user?.uid}/plants/${id}`);
</script>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<div class="flex flex-col justify-center items-center">
		{#if $plant}
			<PlantCard plant={$plant} />
			<span>Creation date: {$plant.created}</span>
			<PlantPreferencesCard plant={$plant} />
		{:else if $plant === undefined}
			<p>Loading...</p>
		{:else}
			<p>Plant not found</p>
		{/if}
	</div>
</div>
