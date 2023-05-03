<script lang="ts">
	import { page } from '$app/stores';
	import PlantCard from '$lib/components/PlantCard.svelte';
	import PlantPreferencesCard from '$lib/components/PlantPreferencesCard.svelte';
	import TaskForm from '$lib/components/TaskForm.svelte';
	import { auth, docStore, firestore, userStore } from '$lib/firebase';
	import type { Plant } from '$lib/types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { MenuAddLine, DeleteBinLine, Edit2Line, PlantLine } from 'svelte-remixicon';

	const id = $page.params.id;
	const user = userStore(auth);
	const plant = docStore<Plant>(firestore, `users/${$user?.uid}/plants/${id}`);

	let taskForm: boolean = false;
</script>

<AppBar class="sticky top-0">
	<svelte:fragment slot="lead"><PlantLine class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Plant information</h3>
</AppBar>
<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<div class="flex flex-col sm:flex-row justify-center flex-wrap gap-10">
		<div class="flex flex-col gap-3 flex-1">
			<h3>General</h3>
			{#if $plant}
				<div>
					<PlantCard {id} plant={$plant} />
				</div>
				<span> Creation date: {$plant.created.toDate().toDateString()}</span>
				<div class="flex flex-col gap-2">
					<h4>Preferences</h4>
					<PlantPreferencesCard plant={$plant} />
				</div>
				<div class="flex flex-col gap-2">
					<h4>Actions</h4>
					<div class="flex flex-wrap gap-3">
						<a href="{id}/edit" class="btn variant-filled flex-1">
							<span><Edit2Line class="h-6 w-6" /></span>
							<span>Edit plant</span>
						</a>
						<button type="button" class="btn variant-filled flex-1">
							<span><DeleteBinLine class="h-6 w-6" /></span>
							<span>Delete plant</span>
						</button>
					</div>
				</div>
			{:else if $plant === undefined}
				<p>Loading...</p>
			{:else}
				<p>Plant not found</p>
			{/if}
		</div>
		<div class="flex flex-col gap-3 flex-1">
			<h3>Tasks</h3>
			{#if taskForm}
				<TaskForm on:cancelButtonclick={() => (taskForm = false)} />
			{:else}
				<button type="button" class="btn variant-filled" on:click={() => (taskForm = true)}>
					<span><MenuAddLine class="h-6 w-6" /></span>
					<span>Add task</span>
				</button>
			{/if}
		</div>
	</div>
</div>
