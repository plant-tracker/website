<script lang="ts">
	import PlantPhotoUpload from '$lib/components/PlantPhotoUpload.svelte';
	import { ForbidLine, RefreshLine, Save2Line } from 'svelte-remixicon';
	import type { Plant } from '$lib/types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import TextInputField from './form/fields/TextInput.svelte';
	import type { Validator } from '$lib/components/form/validators/validator';
	import { RequiredValidator } from '$lib/components/form/validators/required';
	import RadioInput from './form/fields/RadioInput.svelte';
	import Dropdown from './form/fields/Dropdown.svelte';
	import { showToast } from '$lib/toastWrapper';
	import { Timestamp, collection, doc, increment, updateDoc, writeBatch } from 'firebase/firestore';
	import { auth, firestore, userStore } from '$lib/firebase';
	import { goto } from '$app/navigation';

	export let plant: Plant | undefined = undefined;
	const user = userStore(auth);
	let saving: boolean = false;
	class PlantFields {
		name: string = '';
		species_name: string = '';
		type: string = 'cactus';
		location: string = '';
		humidity: string = 'medium';
		temperature: string = 'medium';
		light_levels: string = 'medium';
		photo_url: string = '';
	}

	let plantFormData: PlantFields = plant ? { ...plant } : new PlantFields();

	const plantTypes = [
		{ value: 'cactus', label: '🌵 Cactus' },
		{ value: 'succulent', label: '🌿 Succulent' },
		{ value: 'herb', label: '🌱 Herb' },
		{ value: 'tree', label: '🌲 Tree' },
		{ value: 'flower', label: '🌹 Flower' },
		{ value: 'bonsai', label: '🌳 Bonsai' },
		{ value: 'fern', label: '🌿 Fern' },
		{ value: 'other', label: '🌼 Other' }
	];

	function reset() {
		plantFormData = plant ? { ...plant } : new PlantFields();
	}

	let fieldValidators: { [key: string]: Validator[] } = {
		name: [new RequiredValidator()],
		species_name: [new RequiredValidator()],
		location: [new RequiredValidator()]
	};

	async function savePlant() {
		try {
			Object.keys(fieldValidators).forEach((key) => {
				fieldValidators[key].forEach((validator) => {
					validator.validate(plantFormData[key as keyof PlantFields]);
				});
			});
		} catch (error: any) {
			showToast('Please, fill in all fields.', 'error');
			return;
		}

		let batch = writeBatch(firestore);
		const userDocRef = doc(firestore, `users/${$user?.uid}`);
		saving = true;

		try {
			if (plant) {
				const plantDocRef = doc(firestore, `users/${$user?.uid}/plants`, plant.id);
				await updateDoc(plantDocRef, { ...plantFormData });
				goto(`/plants/${plant.id}`);
			} else {
				const newPlantDocRef = doc(collection(firestore, `users/${$user?.uid}/plants`));
				batch.set(newPlantDocRef, { ...plantFormData, created: Timestamp.now() });

				batch.update(userDocRef, { total_plants: increment(1) });

				await batch.commit();
				goto(`/plants`);
			}
			showToast('Plant saved successfully.', 'success');
		} catch (firebaseError: any) {
			showToast(`Error saving plant: ${firebaseError.message}`, 'error');
		}
		saving = false;
	}
</script>

<div class="flex flex-row justify-center flex-wrap gap-10">
	<div class="flex flex-col gap-3 w-2/3 md:w-1/4">
		<PlantPhotoUpload bind:loadedPhoto={plantFormData.photo_url} />
	</div>
	<div class="flex flex-col gap-3 w-full md:w-2/5">
		<h3>General</h3>
		<TextInputField
			label="Name"
			placeholder="Franek, Czarek, etc."
			bind:value={plantFormData.name}
			validators={fieldValidators.name}
		/>
		<TextInputField
			label="Species"
			placeholder="Monstera deliciosa"
			bind:value={plantFormData.species_name}
			validators={fieldValidators.species_name}
		/>
		<Dropdown label="Type" options={plantTypes} bind:select={plantFormData.type} />
		<TextInputField
			label="Location"
			placeholder="Living Room"
			bind:value={plantFormData.location}
			validators={[new RequiredValidator()]}
		/>
		<h3>Preferences</h3>
		<RadioInput
			bind:select={plantFormData.temperature}
			label="Temperature"
			options={['Cold', 'Medium', 'Warm']}
		/>
		<RadioInput
			bind:select={plantFormData.humidity}
			label="Humidity"
			options={['Low', 'Medium', 'High']}
		/>
		<RadioInput
			bind:select={plantFormData.light_levels}
			label="Light"
			options={['Low', 'Medium', 'High']}
		/>
		<div class="flex gap-3 flex-wrap pt-4">
			<button
				type="button"
				class="btn variant-filled flex-1"
				on:click={savePlant}
				disabled={saving}
			>
				<span><Save2Line class="h-6 w-6" /></span>
				<span>Save</span>
			</button>
			<button type="button" on:click={reset} class="btn variant-filled flex-1">
				<span><RefreshLine class="h-6 w-6" /></span>
				<span>Reset</span>
			</button>
			<a href="./" class="btn variant-filled flex-1">
				<span><ForbidLine class="h-6 w-6" /></span>
				<span>Cancel</span>
			</a>
		</div>
	</div>
</div>
