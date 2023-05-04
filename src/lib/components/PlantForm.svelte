<script lang="ts">
	import PlantPhotoUpload from '$lib/components/PlantPhotoUpload.svelte';
	import PreferencesRadioGroup from '$lib/components/PreferencesRadioGroup.svelte';
	import { ForbidLine, Save2Line } from 'svelte-remixicon';
	import type { Plant } from '$lib/types';
	import {
		DocumentReference,
		Timestamp,
		addDoc,
		collection,
		doc,
		setDoc
	} from 'firebase/firestore';
	import { auth, docStore, firestore, userStore } from '$lib/firebase';
	import { goto } from '$app/navigation';

	export let plant: Plant;

	const user = userStore(auth);
	const plantTypes = [
		{ value: 'cactus', label: '🌵 Cactus' },
		{ value: 'succulent', label: '🌿 Succulent' },
		{ value: 'herb', label: '🌱 Herb' },
		{ value: 'tree', label: '🌲 Tree' },
		{ value: 'flower', label: '🌹 Flower' },
		{ value: 'bonsai', label: '🌳 Bonsai' }
	];

	let plantPhoto: File;

	async function savePlant() {
		if (plant) {
			await setDoc(doc(firestore, `users/${$user?.uid}/plants/`, plantData.id), plantData, {
				merge: true
			});
			console.log('Plant updated successfully!');
		} else {
			const newPlantRef = await addDoc(collection(firestore, `users/${$user?.uid}/plants`), {
				...plantData,
				created: Timestamp.now()
			});
			console.log('New plant created with ID: ', newPlantRef.id);
			goto(`/plants/${newPlantRef.id}`);
		}
	}

	const plantData: Plant = plant ?? {
		name: '',
		type: '',
		species_name: '',
		temperature: '',
		humidity: '',
		light_levels: '',
		location: ''
	};
</script>

<div class="flex flex-row justify-center flex-wrap gap-10">
	<div class="flex flex-col gap-3 w-2/3 md:w-1/4">
		<PlantPhotoUpload bind:plantPhoto loadedPhoto={plantData?.photo_url} />
	</div>
	<div class="flex flex-col gap-3 w-full md:w-2/5">
		<h3>General</h3>
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				bind:value={plantData.name}
				placeholder="Franek, Czarek, etc."
			/>
		</label>
		<label class="label">
			<span>Type</span>
			<select class="select" size="3" bind:value={plantData.type}>
				{#each plantTypes as plantType}
					<option value={plantType.value}>{plantType.label}</option>
				{/each}
			</select>
		</label>
		<label class="label">
			<span>Species</span>
			<input
				class="input"
				type="text"
				bind:value={plantData.species_name}
				placeholder="Monstera deliciosa"
			/>
		</label>
		<label class="label">
			<span>Location</span>
			<input class="input" type="text" bind:value={plantData.location} placeholder="Living Room" />
		</label>
		<h3>Preferences</h3>
		<span>Temperature</span>
		<PreferencesRadioGroup
			bind:select={plantData.temperature}
			name="temperature"
			options={['Cold', 'Medium', 'Warm']}
		/>
		<span>Light</span>
		<PreferencesRadioGroup
			bind:select={plantData.light_levels}
			name="light"
			options={['Low', 'Medium', 'High']}
		/>
		<span>Humidity</span>
		<PreferencesRadioGroup
			bind:select={plantData.humidity}
			name="humidity"
			options={['Low', 'Medium', 'High']}
		/>

		<div class="flex gap-3 flex-wrap pt-4">
			<button type="button" class="btn variant-filled flex-1" on:click={savePlant}>
				<span><Save2Line class="h-6 w-6" /></span>
				<span>Save plant</span>
			</button>
			<a href="./" class="btn variant-filled flex-1">
				<span><ForbidLine class="h-6 w-6" /></span>
				<span>Cancel</span>
			</a>
		</div>
	</div>
</div>
