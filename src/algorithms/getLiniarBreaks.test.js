import getLiniarBreaks from './getLiniarBreaks'

test('Liniar breaks for 3 sequences havin 10x and 100x difference', () => {
  expect(getLiniarBreaks([1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 300, 400, 9900, 10000])).toEqual([8, 11, 13]);
});

test('Liniar breaks for 3 distinct numbers', () => {
  expect(getLiniarBreaks([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([2, 5, 8]);
});

test('Liniar breaks for 2 sequences having 10x difference', () => {
  expect(getLiniarBreaks([1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 200, 300])).toEqual([3, 8, 11]);
});