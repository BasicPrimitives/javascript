import { Colors, AnnotationType } from './enums';

test('Enumeration is readable by name', () => {
    expect(Colors.Aqua).toEqual("#00ffff");
    expect(AnnotationType.Background).toEqual(4);
});