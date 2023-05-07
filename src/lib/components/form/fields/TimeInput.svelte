<script lang="ts">
	import type { Validator } from '$lib/components/form/validators/validator';

	export let label: string;
	export let validators: Validator[];
	export let value: string;
	export let placeholder: string;

	$: {
		value, (errorMessage = '');
	}
	let errorMessage = '';

	function validate() {
		try {
			validators.forEach((validator) => {
				validator.validate(value);
			});
			errorMessage = '';
		} catch (error: any) {
			errorMessage = error.message;
		}
	}
</script>

<label class="label">
	<span>{label}</span>
	<input
		class="input"
		type="time"
		bind:value
		on:input={validate}
		on:blur={validate}
		{placeholder}
	/>
	{#if errorMessage}
		<p class="text-error-500 text-xs">{errorMessage}</p>
	{/if}
</label>
