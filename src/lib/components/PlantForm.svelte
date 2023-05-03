<script lang="ts">
	import PlantPhotoUpload from '$lib/components/PlantPhotoUpload.svelte';
	import PreferencesRadioGroup from '$lib/components/PreferencesRadioGroup.svelte';
	import { ForbidLine, Save2Line } from 'svelte-remixicon';
	import type { Plant } from '$lib/types';
	import { Timestamp } from 'firebase/firestore';

	export let plant: Plant;

	const plantTypes = [
		{ value: 'cactus', label: '🌵 Cactus' },
		{ value: 'succulent', label: '🌿 Succulent' },
		{ value: 'herb', label: '🌱 Herb' },
		{ value: 'tree', label: '🌲 Tree' },
		{ value: 'flower', label: '🌹 Flower' },
		{ value: 'bonsai', label: '🌳 Bonsai' }
	];

	let plantPhoto: File;
	const plantData: Plant = {
		photo_url: plant?.photo_url ?? '',
		temperature: plant?.temperature ?? '',
		type: plant?.type ?? '',
		humidity: plant?.humidity ?? '',
		light_levels: plant?.light_levels ?? '',
		name: plant?.name ?? '',
		species_name: plant?.species_name ?? '',
		location: plant?.location ?? '',
		id: plant?.id ?? '',
		created: plant?.created ?? Timestamp.now()
	};
</script>

<div class="flex flex-row justify-center flex-wrap gap-10">
	<div class="flex flex-col gap-3 w-2/3 md:w-1/4">
		<PlantPhotoUpload bind:plantPhoto loadedPhoto={plantData.photo_url} />
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
			<button type="button" class="btn variant-filled flex-1">
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
