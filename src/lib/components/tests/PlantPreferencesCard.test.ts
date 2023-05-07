import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import PlantPreferencesCard from '../PlantPreferencesCard.svelte';

import type { Plant } from '$lib/types';
import { Timestamp } from 'firebase/firestore';

describe('PlantDetails', () => {
    const customPlant: Plant = {
        id: '1',
        name: 'Planty',
        species_name: 'Ficus elastica',
        type: 'Tree',
        location: 'Living room',
        humidity: 'High',
        temperature: 'Warm',
        light_levels: 'Bright',
        photo_url: 'https://example.com/planty.jpg',
        created: Timestamp.now(),
    };

    it('should render the correct plant details', () => {
        const { getByText } = render(PlantPreferencesCard, { props: { plant: customPlant } });
        const humidity = getByText('High');
        const lightLevels = getByText('Bright');
        const temperature = getByText('Warm');

        expect(humidity).to.exist;
        expect(lightLevels).to.exist;
        expect(temperature).to.exist;
    });
});