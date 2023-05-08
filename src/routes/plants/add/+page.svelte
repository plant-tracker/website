<script lang="ts">
	import PlantForm from '$lib/components/PlantForm.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AddBoxLine } from 'svelte-remixicon';
</script>

<AppBar class="sticky top-0 z-30">
	<svelte:fragment slot="lead"><AddBoxLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Add plant</h3>
</AppBar>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<PlantForm />
</div>
