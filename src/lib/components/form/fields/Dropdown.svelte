<script lang="ts">
	export let label: string;
	export let select: string;
	export let options: { value: string; label: string }[];
	export let icon: any = null;
</script>

<label class="label">
	<span>{label}</span>
	<div class="flex items-center gap-3">
		{#if icon}
			<svelte:component this={icon} class="h-6 w-6" />
		{/if}
		<select class="select" bind:value={select}>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
</label>
