<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { ImageAddLine } from 'svelte-remixicon';

	export let plantPhoto: File;

	function onChangeHandler(e: Event): void {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			plantPhoto = target.files[0];
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
	<div slot="lead" class="flex justify-center {plantPhoto ? 'hidden' : 'flex'}">
		<ImageAddLine class="h-12 w-12" />
	</div>
	<svelte:fragment slot="message">
		{#if plantPhoto}
			<img src={URL.createObjectURL(plantPhoto)} alt="Your plant" />
		{:else}
			Upload plant photo
		{/if}
	</svelte:fragment>
	<span class={plantPhoto ? 'hidden' : 'block'} slot="meta">PNG, JPG, GIF</span>
</FileDropzone>
