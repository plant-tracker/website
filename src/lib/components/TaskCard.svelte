<script lang="ts">
	import {
		Calendar2Line,
		DeleteBinLine,
		DropLine,
		SkipRightLine,
		TimeLine
	} from 'svelte-remixicon';
	import type { Task } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let task: Task;

	const dispatch = createEventDispatcher();

	function deleteTask() {
		dispatch('deleteButtonClick', task);
	}
</script>

<div class="card p-4 flex flex-row items-center gap-2">
	<div class="flex flex-col w-full gap-2">
		<div class="flex flex-row gap-2 items-center">
			<DropLine class="h-6 w-6" />
			<h4>{task.description}</h4>
		</div>
		<div class="flex flex-row gap-2 flex-wrap">
			<span class="badge variant-filled flex flex-row gap-1"
				><Calendar2Line class="w-4 h-4" />every {task.frequency} day/s</span
			>
			<span class="badge variant-filled flex flex-row gap-1"
				><TimeLine class="w-4 h-4" />{task.time}
			</span>
		</div>
	</div>
	<div class="flex justify-end">
		<button type="button" class="btn btn-icon variant-filled"
			><DeleteBinLine class="h-6 w-6" on:click={deleteTask} /></button
		>
	</div>
</div>
