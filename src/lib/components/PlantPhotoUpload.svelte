<script lang="ts">
	import { auth, firestore, storage, userStore } from '$lib/firebase';
	import { showToast } from '$lib/toastWrapper';
	import { FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	import {
		StorageError,
		getDownloadURL,
		getStorage,
		ref,
		uploadBytes,
		uploadBytesResumable
	} from 'firebase/storage';
	import { ContractUpDownLine, ImageAddLine } from 'svelte-remixicon';

	export let loadedPhoto: string;
	let progress: number = 0;
	let plantPhoto: File;
	const user = userStore(auth);

	async function onChangeHandler(e: Event): Promise<void> {
		const target = e.target as HTMLInputElement;

		if (target.files) {
			plantPhoto = target.files[0];
			try {
				const storageRef = ref(storage, `users/${$user?.uid}/${Date.now()}-${plantPhoto.name}`);
				const uploadTask = uploadBytesResumable(storageRef, plantPhoto);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					},
					(error: StorageError) => {
						showToast("Couldn't upload the photo", 'error');
					},
					async () => {
						const fileURL = await getDownloadURL(storageRef);
						loadedPhoto = fileURL;
						progress = 0;
						showToast('Photo uploaded', 'success');
					}
				);
			} catch (error) {
				showToast("Couldn't upload the photo", 'error');
				loadedPhoto = '';
			}
		}
	}
</script>

<FileDropzone
	accept="image/*"
	class="aspect-square truncate"
	name="plantPhoto"
	on:change={onChangeHandler}
	bind:plantPhoto
>
	<div slot="lead" class="flex justify-center {loadedPhoto || progress !== 0 ? 'hidden' : 'flex'}">
		<ImageAddLine class="h-12 w-12" />
	</div>
	<svelte:fragment slot="message">
		{#if progress > 0 && progress <= 100}
			<div class="relative">
				<img
					class="w-full h-full object-cover filter blur-md"
					src={URL.createObjectURL(plantPhoto)}
					alt="Uploading plant"
				/>
				<div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					<ProgressRadial value={progress.valueOf()}>{progress.toFixed(2)}%</ProgressRadial>
				</div>
			</div>
		{:else if loadedPhoto}
			<img src={loadedPhoto} alt="Your plant" />
		{:else}
			Upload plant photo
		{/if}
	</svelte:fragment>
	<span class={loadedPhoto || progress !== 0 ? 'hidden' : 'block'} slot="meta">PNG, JPG, GIF</span>
</FileDropzone>
