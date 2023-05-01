<script lang="ts">
	import type { Plant } from '$lib/types';
	import { DropLine, LightbulbLine, TempHotLine } from 'svelte-remixicon';

	export let plant: Plant;
</script>

<section class="flex flex-row flex-wrap items-center justify-center gap-3">
	<div class="badge variant-filled flex-1 text-lg !bg-blue-400 !text-black">
		<DropLine />
		<span>{plant.humidity}</span>
	</div>
	<div class="badge variant-filled flex-1 text-lg !bg-yellow-300 !text-black">
		<LightbulbLine />
		<span>{plant.light_levels}</span>
	</div>
	<div class="badge variant-filled flex-1 text-lg !bg-amber-500 !text-black">
		<TempHotLine />
		<span>{plant.temperature}</span>
	</div>
</section>
