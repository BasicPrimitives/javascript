import mergeSort from './mergeSort';

test('Merged sort multiple arrays', () => {
  const arrays = [
    [1, 5, 9, 13, 17],
    [0, 2, 4, 6, 8, 10],
    [3, 7, 11],
    [],
    [18, 19, 20]
  ];

  const result = mergeSort(arrays);

  let expectedResult = [];
  for (var index = 0; index < arrays.length; index += 1) {
    var array1 = arrays[index];

    expectedResult = expectedResult.concat(array1);
  }
  expectedResult.sort(function (a, b) {
    return a - b;
  });

  expect(result).toEqual(expectedResult);
});


test('Merged sort multiple arrays ignoring duplicates', () => {
  const arrays = [
    [1, 1, 5, 9, 9, 13, 17, 17],
    [0, 0, 2, 4, 6, 6, 8, 10]
  ];

  const result = mergeSort(arrays, null, true);

  expect(result).toEqual([0, 1, 2, 4, 5, 6, 8, 9, 10, 13, 17]);
});

test('Merged sort single array', () => {
  const arrays = [
    [1, 5, 9, 13, 17]
  ];

  const result = mergeSort(arrays);

  expect(result).toEqual(arrays[0]);
});

test('Merged sort single array ignoring duplicates', () => {
  const arrays = [
    [1, 1, 5, 9, 9, 9, 13, 17, 17, 18, 18, 18, 18]
  ];

  const result = mergeSort(arrays, null, true);

  expect(result).toEqual([1, 5, 9, 13, 17, 18]);
});

test('Merged sort multiple arrays of objects', () => {
  const arrays = [
    [{ weight: 1 }, { weight: 5 }, { weight: 9 }, { weight: 13 }, { weight: 17 }],
    [{ weight: 2 }, { weight: 4 }, { weight: 6 }, { weight: 8 }, { weight: 10 }],
    [{ weight: 3 }, { weight: 7 }, { weight: 11 }],
    [],
    [{ weight: 18 }, { weight: 19 }, { weight: 20 }]
  ];

  const result = mergeSort(arrays, function (item) { return item.weight; });

  let expectedResult = [];
  for (var index = 0; index < arrays.length; index += 1) {
    var array1 = arrays[index];

    expectedResult = expectedResult.concat(array1);
  }
  expectedResult.sort(function (a, b) {
    return a.weight - b.weight;
  });

  expect(result).toEqual(expectedResult);
});

