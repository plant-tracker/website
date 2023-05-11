<script lang="ts">
	import type { Validator } from '$lib/components/form/validators/validator';

	export let label: string;
	export let validators: Validator[];
	export let value: string;
	export let placeholder: string;
	export let type: 'text' | 'password' | 'email' = 'text';

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
	{#if type === 'password'}
		<input class="input" type="password" bind:value on:change={validate} {placeholder} />
	{:else if type === 'email'}
		<input class="input" type="email" bind:value on:change={validate} {placeholder} />
	{:else}
		<input
			class="input"
			type="text"
			bind:value
			on:input={validate}
			on:blur={validate}
			{placeholder}
		/>
	{/if}

	{#if errorMessage}
		<p class="text-error-500 text-xs">{errorMessage}</p>
	{/if}
</label>
