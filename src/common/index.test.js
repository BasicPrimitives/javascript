import {isEmptyObject, isNullOrEmpty, compareArrays } from './index';

test('isEmptyObject - Object is empty returns true', () => {
    expect(isEmptyObject({})).toBe(true);
});

test('isEmptyObject - Object is not empty returns false', () => {
    expect(isEmptyObject({ a: 1000 })).toBe(false);
});

test('isNullOrEmpty - String is empty returns true', () => {
    expect(isNullOrEmpty("")).toBe(true);
});

test('isNullOrEmpty - String is null returns true', () => {
    expect(isNullOrEmpty(null)).toBe(true);
});

test('isNullOrEmpty - String is not empty returns false', () => {
    expect(isNullOrEmpty("Some string")).toBe(false);
});

test('compareArrays - Empty arrays are equal', () => {
    expect(compareArrays([], [])).toBe(true);
});

test('compareArrays - First array is empty and second is not. Arrays are not equal', () => {
    expect(compareArrays([1], [])).toBe(false);
});

test('compareArrays - First array is not empty and second is empty. Arrays are not equal', () => {
    expect(compareArrays([], [1])).toBe(false);
});

test('compareArrays - Compare equal non sorted arrays having duplicates. Arrays are equal', () => {
    expect(compareArrays([1, 1, 1, 2, 2, 3, 3, 3, 3], [1, 2, 3, 1, 2, 3, 1, 3, 3])).toBe(true);
});

test('compareArrays - Compare equal non sorted arrays having no duplicates. Arrays are equal', () => {
    expect(compareArrays(['A', 'B', 'AB', 'AC'], ['AC', 'AB', 'A', 'B'])).toBe(true);
});

test('compareArrays - Compare non-equal non-sorted arrays having the same values but different number of duplicates. Arrays are not equal', () => {
    expect(compareArrays([1, 2, 3, 4, 4, 5, 6, 7, 8], [1, 2, 3, 4, 4, 4, 5, 6, 7, 8])).toBe(false);
});