import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TipCard from '../TipCard.svelte';

describe('TipCard', () => {
    it('should render the correct plant type name and description', () => {
        const plantType = 'bonsai';
        const { getByText } = render(TipCard, { props: { tipType: plantType } });
        const name = getByText('Bonsai');
        const description = getByText('Bonsai trees require regular pruning and care to maintain their small size and unique shape. Consider using specialized bonsai soil, fertilizer, and tools to help your bonsai thrive.');

        expect(name).to.exist;
        expect(description).to.exist;
    });
});