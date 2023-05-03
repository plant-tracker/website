<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let name: string;
	export let select: string;
	export let options: string[];
</script>

<RadioGroup>
	{#each options as option}
		<div class="flex-1">
			<RadioItem bind:group={select} {name} value={option}>{option}</RadioItem>
		</div>
	{/each}
</RadioGroup>
