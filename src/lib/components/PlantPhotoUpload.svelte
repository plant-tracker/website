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
	import { ImageAddLine } from 'svelte-remixicon';

	export let plantPhoto: File;
	export let loadedPhoto: string;
	let progress = 0;
	const user = userStore(auth);

	async function onChangeHandler(e: Event): Promise<void> {
		const target = e.target as HTMLInputElement;

		if (target.files) {
			plantPhoto = target.files[0];

			try {
				const storageRef = ref(storage, `users/${$user?.uid}/${plantPhoto.name}`);
				const uploadTask = uploadBytesResumable(storageRef, plantPhoto);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					},
					(error) => {
						showToast("Couldn't upload the photo", 'error');
					},
					async () => {
						const fileURL = await getDownloadURL(storageRef);
						loadedPhoto = fileURL;
						showToast('Photo uploaded', 'success');
					}
				);
			} catch (error) {
				showToast("Couldn't upload the photo", 'error');
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
	<div slot="lead" class="flex justify-center {plantPhoto || loadedPhoto ? 'hidden' : 'flex'}">
		<ImageAddLine class="h-12 w-12" />
	</div>
	<svelte:fragment slot="message">
		{#if loadedPhoto}
			<img src={loadedPhoto} alt="Your plant" />
		{:else if progress}
			<ProgressRadial value={progress.valueOf()}>{progress.toFixed(2)}%</ProgressRadial>
		{:else}
			Upload plant photo
		{/if}
	</svelte:fragment>
	<span class={plantPhoto || loadedPhoto ? 'hidden' : 'block'} slot="meta">PNG, JPG, GIF</span>
</FileDropzone>
