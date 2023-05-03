<script lang="ts">
	import {
		DropLine,
		BardLine,
		ScissorsLine,
		PlantLine,
		BubbleChartLine,
		Save2Line,
		ForbidLine
	} from 'svelte-remixicon';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function cancelEvent() {
		dispatch('cancelButtonclick');
	}
	const taskTypes = [
		{ value: 1, label: 'Watering', icon: DropLine },
		{ value: 2, label: 'Fertilizing', icon: BardLine },
		{ value: 3, label: 'Pruning', icon: ScissorsLine },
		{ value: 4, label: 'Repotting', icon: PlantLine },
		{ value: 5, label: 'Cleaning', icon: BubbleChartLine }
	];

	let selectedTaskType: number;
	let selectedFrequencyType: string;
</script>

<div class="flex flex-col gap-3">
	<label class="label">
		<span>Type</span>
		<div class="flex items-center gap-3">
			<svelte:component this={taskTypes[selectedTaskType - 1]?.icon} class="h-6 w-6" />
			<select class="select" bind:value={selectedTaskType}>
				{#each taskTypes as taskType}
					<option value={taskType.value}>{taskType.label}</option>
				{/each}
			</select>
		</div>
	</label>

	<label class="label">
		<span>Short description</span>
		<input class="input" type="text" placeholder="Water the soil, prune the branches, etc." />
	</label>
	<label class="label">
		<span>Frequency</span>
		<div class="space-y-2">
			<label class="flex items-center space-x-2">
				<input
					class="radio"
					type="radio"
					checked
					name="radio-direct"
					value="everyday"
					bind:group={selectedFrequencyType}
				/>
				<p>Everyday</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="radio"
					type="radio"
					name="radio-direct"
					value="custom"
					bind:group={selectedFrequencyType}
				/>
				<p>Once every custom amount of days</p>
			</label>
			{#if selectedFrequencyType === 'custom'}
				<label class="flex items-center gap-3">
					<input class="input" type="number" placeholder="3" />
					<p>days</p>
				</label>
			{/if}
		</div>
	</label>
	<!-- time -->
	<label class="label">
		<span>Time</span>
		<div class="flex items-center gap-3">
			<input class="input" type="time" />
		</div>

		<div class="flex gap-3 flex-wrap pt-4">
			<button type="button" class="btn variant-filled flex-1">
				<span><Save2Line class="h-6 w-6" /></span>
				<span>Save task</span>
			</button>
			<button type="button" class="btn variant-filled flex-1" on:click={cancelEvent}>
				<span><ForbidLine class="h-6 w-6" /></span>
				<span>Cancel</span>
			</button>
		</div>
	</label>
</div>
