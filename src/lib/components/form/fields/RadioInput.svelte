<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let label: string;
	export let select: string;
	export let options: string[];
</script>

<span>{label}</span>
<RadioGroup>
	{#each options as option}
		<div class="flex-1">
			<RadioItem bind:group={select} name={label} value={option.toLowerCase()}>{option}</RadioItem>
		</div>
	{/each}
</RadioGroup>
