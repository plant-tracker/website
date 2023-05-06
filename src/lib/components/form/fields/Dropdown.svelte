<script lang="ts">
	export let label: string;
	export let select: string;
	export let options: { value: string; label: string }[];
</script>

<label class="label">
	<span>{label}</span>
	<select class="select" bind:value={select}>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>
