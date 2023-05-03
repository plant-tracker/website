<script lang="ts">
	import PlantPhotoUpload from '$lib/components/PlantPhotoUpload.svelte';
	import PreferencesRadioGroup from '$lib/components/PreferencesRadioGroup.svelte';
	import { AppBar, FileDropzone } from '@skeletonlabs/skeleton';
	import { AddBoxLine, Forbid2Line, ForbidLine, ImageAddLine, Save2Line } from 'svelte-remixicon';

	let plantPhoto: File;
	let temperature: string;
	let humidity: string;
	let light: string;

	const plantTypes = [
		{ value: '1', label: '🌵 Cactus' },
		{ value: '2', label: '🌿 Succulent' },
		{ value: '3', label: '🌱 Herb' },
		{ value: '4', label: '🌳 Tree' },
		{ value: '5', label: '🌹 Flower' }
	];
</script>

<AppBar class="sticky top-0">
	<svelte:fragment slot="lead"><AddBoxLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Add plant</h3>
</AppBar>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<div class="flex flex-row justify-center flex-wrap gap-10">
		<div class="flex flex-col gap-3 w-2/3 md:w-1/4">
			<PlantPhotoUpload bind:plantPhoto />
		</div>
		<div class="flex flex-col gap-3 w-full md:w-2/5">
			<h3>General</h3>
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" placeholder="Franek, Czarek, etc." />
			</label>
			<label class="label">
				<span>Type</span>
				<select class="select" size="3">
					{#each plantTypes as plantType}
						<option value={plantType.value}>{plantType.label}</option>
					{/each}
				</select>
			</label>
			<label class="label">
				<span>Species</span>
				<input class="input" type="text" placeholder="Monstera deliciosa" />
			</label>
			<label class="label">
				<span>Location</span>
				<input class="input" type="text" placeholder="Living Room" />
			</label>
			<h3>Preferences</h3>
			<span>Temperature</span>
			<PreferencesRadioGroup
				bind:select={temperature}
				name="temperature"
				options={['Low', 'Medium', 'High']}
			/>
			<span>Light</span>
			<PreferencesRadioGroup bind:select={light} name="light" options={['Low', 'Medium', 'High']} />
			<span>Humidity</span>
			<PreferencesRadioGroup
				bind:select={humidity}
				name="humidity"
				options={['Low', 'Medium', 'High']}
			/>

			<div class="flex gap-3 flex-wrap pt-4">
				<button type="button" class="btn variant-filled flex-1">
					<span><Save2Line class="h-6 w-6" /></span>
					<span>Save plant</span>
				</button>
				<button type="button" class="btn variant-filled flex-1">
					<span><ForbidLine class="h-6 w-6" /></span>
					<span>Cancel</span>
				</button>
			</div>
		</div>
	</div>
	<!--<div class="pt-10 flex justify-end" />-->
</div>
