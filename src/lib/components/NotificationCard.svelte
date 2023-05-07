<script lang="ts">
	export let body: string;
	export let title: string;
	export let type: string = 'other';

	import { taskTypes } from '$lib/types/taskTypes';
	import { DeleteBinLine } from 'svelte-remixicon';
</script>

<div class="card flex flex-row p-3 gap-3 items-center w-full max-w-xl">
	<svelte:component this={taskTypes.find((t) => t.value === type)?.icon} class="h-16 w-16" />
	<div class="flex flex-col gap-2 w-full">
		<h2>{body}</h2>
		<span>
			{title}
		</span>
	</div>
	<div class="flex justify-end">
		<button class="btn btn-primary"><DeleteBinLine class="h-8 w-8" /></button>
	</div>
</div>
