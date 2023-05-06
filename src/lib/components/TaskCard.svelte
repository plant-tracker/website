<script lang="ts">
	import {
		Calendar2Line,
		DeleteBin2Line,
		DeleteBinLine,
		DropFill,
		DropLine,
		SkipRightLine,
		TimeLine
	} from 'svelte-remixicon';
</script>

<div class="card p-4 flex flex-row items-center gap-2">
	<div class="flex flex-col w-full gap-2">
		<div class="flex flex-row gap-2 items-center">
			<DropLine class="h-6 w-6" />
			<h4>Prune the branches</h4>
		</div>
		<div class="flex flex-row gap-2 flex-wrap">
			<span class="badge variant-filled flex flex-row gap-1"
				><Calendar2Line class="w-4 h-4" />every 10 days</span
			>
			<span class="badge variant-filled flex flex-row gap-1"><TimeLine class="w-4 h-4" />10:00</span
			>
			<span class="badge variant-filled flex flex-row gap-1"
				><SkipRightLine class="w-4 h-4" />in 9 minutes</span
			>
		</div>
	</div>
	<div class="flex justify-end">
		<button type="button" class="btn btn-icon variant-filled"
			><DeleteBinLine class="h-6 w-6" /></button
		>
	</div>
</div>
