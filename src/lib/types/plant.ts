export interface Plant {
	id: string;
	name: string;
	species_name: string;
	type: string;
	location: string;
	humidity: Humidity;
	temperature: Temperature;
	light_levels: LightLevel;
	photo_url: string;
	created: Date;
}

enum Humidity {
	Low,
	Medium,
	High
}

enum Temperature {
	Cold,
	Moderate,
	Warm
}

enum LightLevel {
	Low,
	Medium,
	High
}
