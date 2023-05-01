<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AddBoxLine, PlantLine } from 'svelte-remixicon';
	import type { Plant } from '$lib/types';
	import { collectionStore, userStore, auth, firestore } from '$lib/firebase';
	import PlantCard from '$lib/components/PlantCard.svelte';

	const user = userStore(auth);
	const userPlants = collectionStore<Plant>(firestore, `users/${$user?.uid}/plants`);
</script>

<AppBar class="sticky top-0">
	<svelte:fragment slot="lead"><PlantLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Your plants</h3>
	<h6>{$userPlants.length}/50</h6>
	<svelte:fragment slot="trail">
		<button type="button" class="btn btn-md variant-filled">
			<span><AddBoxLine class="h-6 w-6" /></span>
			<span class="hidden sm:flex">Add plant</span>
		</button>
	</svelte:fragment>
</AppBar>
<div class="container mx-auto max-w-screen-lg p-4 md:p-10">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
		{#each $userPlants as plant (plant.id)}
			<PlantCard id={plant.id} {plant} />
		{/each}
	</div>
</div>
