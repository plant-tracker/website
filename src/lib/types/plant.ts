import type { Timestamp } from 'firebase/firestore';

export interface Plant {
	id: string;
	name: string;
	species_name: string;
	type: string;
	location: string;
	humidity: string;
	temperature: string;
	light_levels: string;
	photo_url: string;
	created: Timestamp;
}

enum Humidity {
	"Low",
	"Medium",
	"High"
}

enum Temperature {
	"Cold",
	"Medium",
	"Warm",
}

enum LightLevel {
	"Low",
	"Medium",
	"High",
}
