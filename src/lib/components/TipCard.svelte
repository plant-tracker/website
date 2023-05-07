<script lang="ts">
	import logo_smile from '$lib/assets/vectors/logo_smile.svg';
	export let tipType: string = 'other';
	import typesJson from '$lib/assets/plant_types.json';

	interface PlantTypeInfo {
		name: string;
		description: string;
	}

	const plantTypes: { [key: string]: PlantTypeInfo } = typesJson.PlantType;

	function getPlantTypeInfo(tip: string): PlantTypeInfo {
		return plantTypes[tip] || plantTypes['other'];
	}

	const { name, description } = getPlantTypeInfo(tipType);
</script>

<div class="card flex flex-row p-2 gap-2">
	<img alt="Smiling Planti" src={logo_smile} class="w-16 h-16" />
	<div class="flex flex-col gap-2">
		<span>{name}</span>
		<span>
			{description}
		</span>
	</div>
</div>
