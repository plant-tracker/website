<script lang="ts">
	import PlantForm from '$lib/components/PlantForm.svelte';
	import PlantPhotoUpload from '$lib/components/PlantPhotoUpload.svelte';
	import PreferencesRadioGroup from '$lib/components/PreferencesRadioGroup.svelte';
	import type { Plant } from '$lib/types';
	import { AppBar, FileDropzone } from '@skeletonlabs/skeleton';
	import { AddBoxLine, Forbid2Line, ForbidLine, ImageAddLine, Save2Line } from 'svelte-remixicon';

	let plant: Plant;
</script>

<AppBar class="sticky top-0 z-30">
	<svelte:fragment slot="lead"><AddBoxLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Add plant</h3>
</AppBar>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<PlantForm {plant} />
</div>
