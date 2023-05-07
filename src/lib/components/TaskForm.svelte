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
	import TimeInput from './form/fields/TimeInput.svelte';
	import TextInput from './form/fields/TextInput.svelte';
	import type { Validator } from './form/validators/validator';
	import { RequiredValidator } from './form/validators/required';
	import Dropdown from './form/fields/Dropdown.svelte';
	import NumberInput from './form/fields/NumberInput.svelte';
	import { TaskIntervalValidator } from './form/validators/taskInterval';
	import { taskTypes } from '$lib/types/taskTypes';

	const dispatch = createEventDispatcher();

	function cancelEvent() {
		dispatch('cancelButtonclick');
	}

	class TaskFields {
		type = 'watering';
		description = '';
		interval = 1;
		time = '';
	}

	let fieldValidators: { [key: string]: Validator[] } = {
		type: [new RequiredValidator()],
		description: [new RequiredValidator()],
		interval: [new TaskIntervalValidator()],
		time: [new RequiredValidator()]
	};

	let taskFormData = new TaskFields();
	let customInterval = false;
</script>

<div class="flex flex-col gap-3">
	<Dropdown
		label="Type"
		icon={taskTypes[taskTypes.findIndex((taskType) => taskType.value === taskFormData.type)].icon}
		options={taskTypes}
		bind:select={taskFormData.type}
	/>
	<TextInput
		label="Short description"
		placeholder="Water the soil, prune the branches, etc."
		bind:value={taskFormData.description}
		validators={fieldValidators.description}
	/>

	<div class="flex flex-wrap gap-3">
		<label class="label flex-1">
			<span>Frequency</span>
			<div class="space-y-2">
				<label class="flex items-center space-x-2">
					<input
						class="radio"
						type="radio"
						name="radio-direct"
						checked
						value={false}
						bind:group={customInterval}
					/>
					<p>Everyday</p>
				</label>
				<label class="flex items-center space-x-2">
					<input
						class="radio"
						type="radio"
						name="radio-direct"
						bind:group={customInterval}
						value={true}
					/>
					<p>Custom interval</p>
				</label>
				{#if customInterval}
					<div class="flex flex-row gap-3 items-center">
						<NumberInput
							label=""
							placeholder="3"
							bind:value={taskFormData.interval}
							validators={fieldValidators.interval}
						/>
						<span>days</span>
					</div>
				{/if}
			</div>
		</label>
		<div class="label flex-1">
			<TimeInput
				label="Time"
				placeholder="00:00"
				bind:value={taskFormData.time}
				validators={fieldValidators.time}
			/>
		</div>
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
</div>
