import {
	BubbleChartLine,
	DropLine,
	PlantLine,
	ScissorsLine,
	SparklingLine
} from 'svelte-remixicon';

export const taskTypes = [
	{ value: 'watering', label: 'Watering', icon: DropLine },
	{ value: 'fertilizing', label: 'Fertilizing', icon: SparklingLine },
	{ value: 'pruning', label: 'Pruning', icon: ScissorsLine },
	{ value: 'repotting', label: 'Repotting', icon: PlantLine },
	{ value: 'cleaning', label: 'Cleaning', icon: BubbleChartLine },
	{ value: 'other', label: 'Other', icon: SparklingLine }
];
