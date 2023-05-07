<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AddBoxLine, PlantLine } from 'svelte-remixicon';
	import type { Plant } from '$lib/types';
	import { collectionStore, userStore, auth, firestore } from '$lib/firebase';
	import PlantCard from '$lib/components/PlantCard.svelte';

	const user = userStore(auth);
	const userPlants = collectionStore<Plant>(firestore, `users/${$user?.uid}/plants`);

	let filteredPlants: Plant[] = [];

	$: filteredPlants = $userPlants;
	$: uniquePlantTypes = Array.from(new Set($userPlants.map((plant) => plant.type)));

	function filterPlants(plantType: string) {
		filteredPlants = $userPlants.filter((plant) => plant.type === plantType);
	}
</script>

<AppBar class="sticky top-0 z-30">
	<svelte:fragment slot="lead"><PlantLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h6>{$userPlants.length}/50</h6>
	<h3>Your plants</h3>
	<svelte:fragment slot="trail">
		<a href="/plants/add" class="btn btn-md variant-filled">
			<span><AddBoxLine class="h-6 w-6" /></span>
			<span class="hidden sm:flex">Add plant</span>
		</a>
	</svelte:fragment>
</AppBar>

<div class="container mx-auto max-w-screen-lg p-4 md:p-10">
	<button on:click={() => (filteredPlants = $userPlants)} class="btn btn-md variant-filled">
		All
	</button>
	{#each uniquePlantTypes as plantType}
		<button on:click={() => filterPlants(plantType)} class="btn btn-md mr-2 mb-2">
			{plantType}
		</button>
	{/each}
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
		{#each filteredPlants as plant (plant.id)}
			<PlantCard id={plant.id} {plant} />
		{/each}
	</div>
</div>
