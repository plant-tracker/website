<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { AddBoxLine, PlantLine } from 'svelte-remixicon';

	import { auth, firestore } from '$lib/firebase/init';
	import { collectionStore, userStore } from '$lib/firebase';

	const user = userStore(auth);
	const userPlants = collectionStore(firestore, `users/${$user?.uid}/plants`);

	userPlants.subscribe((plants) => {
		console.log(plants);
	});
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
		{#each $userPlants as plant}
			<div
				class="card card-hover flex flex-row items-center bg-neutral-100 shadow-lg rounded-lg overflow-hidden h-full"
			>
				<div class="w-1/3 bg-cover bg-center p-3">
					<Avatar src={plant.photo_url} width="w-full" rounded="rounded-full" />
				</div>
				<div class="w-2/3 p-4">
					<h2 class="font-bold text-2xl mb-2">{plant.name}</h2>
					<p class="font-semibold text-xs mb-2">{plant.species_name}</p>
					<div class="flex items-center text-sm">
						<svg class="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
							<path
								d="M12 1.75c-4.93 0-8.91 3.98-8.91 8.91 0 7.1 8.91 14.34 8.91 14.34s8.91-7.23 8.91-14.34c0-4.93-3.98-8.91-8.91-8.91zm0 12.66c-2.07 0-3.75-1.68-3.75-3.75s1.68-3.75 3.75-3.75 3.75 1.68 3.75 3.75-1.68 3.75-3.75 3.75z"
							/>
							<path d="M0 0h24v24H0z" fill="none" />
						</svg>
						<p>{plant.location}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
