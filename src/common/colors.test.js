import { highestContrast } from './colors';

test('highestContrast - White on black has higher contrast than yellow on black', () => {
    expect(highestContrast("black", "white", "yellow")).toBe("white");
});