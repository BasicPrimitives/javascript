import Family from './Family';

function getFamily(items) {
  var family = Family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }
  return family;
}

test('groupBy - Function groups nodes having single common parent and child', () => {

  var family = getFamily([
    { id: 1 },
    { id: 2, parents: [1] },
    { id: 3, parents: [1] },
    { id: 4, parents: [1] },
    { id: 5, parents: [1] },
    { id: 6, parents: [1] },
    { id: 7, parents: [1] },
    { id: 8, parents: [1] },
  ]);

  var result = [];
  family.groupBy(this, 2, function (parents, children, nodes) {
    result.push({
      parents,
      children,
      nodes: nodes.map(items => items[0].id)
    })
  });

  var expectedResult = [
    { parents: ["1"], children: [], nodes: ["2", "3", "4", "5", "6", "7", "8"] }
  ];
  expect(result).toEqual(expectedResult);
});

test('groupBy - Function should group nodes sharing the same child together', () => {

  var family = getFamily([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8, parents: [1, 2, 3, 4, 5, 6, 7] }
  ]);

  var result = [];
  family.groupBy(this, 2, function (parents, children, nodes) {
    result.push({
      parents,
      children,
      nodes: nodes.map(items => items[0].id)
    })
  });

  var expectedResult = [
    { parents: [], children: ["8"], nodes: ["1", "2", "3", "4", "5", "6", "7"] }
  ];
  expect(result).toEqual(expectedResult);
});


test('groupBy - Function should group nodes sharing the same parent and child together', () => {

  var family = getFamily([
    { id: 1 },
    { id: 2, parents: [1] },
    { id: 3, parents: [1] },
    { id: 4, parents: [1] },
    { id: 5, parents: [1] },
    { id: 6, parents: [1] },
    { id: 7, parents: [1] },
    { id: 8, parents: [1] },
    { id: 9, parents: [2, 3, 4, 5, 6, 7, 8] },
  ]);

  var result = [];
  family.groupBy(this, 2, function (parents, children, nodes) {
    result.push({
      parents,
      children,
      nodes: nodes.map(items => items[0].id)
    })
  });

  var expectedResult = [
    { parents: ["1"], children: ["9"], nodes: ["2", "3", "4", "5", "6", "7", "8"] }
  ];
  expect(result).toEqual(expectedResult);
});

test('groupBy - General case test', () => {

  var family = getFamily([
    { id: 1, parents: [] },
    { id: 2, parents: [1] },
    { id: 3, parents: [1] },
    { id: 4, parents: [1] },
    { id: 5, parents: [1] },
    { id: 6, parents: [1] },
    { id: 7, parents: [1] },
    { id: 8, parents: [1] },
    { id: 9, parents: [1] },
    { id: 10, parents: [1] },
    { id: 11, parents: [1] },
    { id: 12, parents: [1] },
    { id: 13, parents: [1] },
    { id: 14, parents: [1] },
    { id: 15, parents: [1] },
    { id: 16, parents: [1] },
    { id: 17, parents: [1] },
    { id: 18, parents: [1] },
    { id: 19, parents: [1] },
    { id: 20, parents: [1] },

    { id: 21, parents: [5] },
    { id: 22, parents: [5] },
    { id: 23, parents: [5] },
    { id: 24, parents: [5] },
    { id: 25, parents: [5] },
    { id: 26, parents: [5] },

    { id: 27, parents: [26] },
    { id: 28, parents: [26] },
    { id: 29, parents: [26] },
    { id: 30, parents: [26] },
    { id: 31, parents: [26, 9] },
  ]);

  var result = [];
  family.groupBy(this, 2, function (parents, children, nodes) {
    result.push({
      parents,
      children,
      nodes: nodes.map(items => items[0].id)
    })
  });

  var expectedResult = [
    { parents: ["1"], children: [], nodes: ["2", "3", "4", "6", "7", "8", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"] },
    { parents: ["5"], children: [], nodes: ["21", "22", "23", "24", "25"] },
    { parents: ["26"], children: [], nodes: ["27", "28", "29", "30"] }
  ];
  expect(result).toEqual(expectedResult);
});