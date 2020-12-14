import TreeLevels from './TreeLevels';

function getTreeLevels(levels) {
  var treeLevels = TreeLevels();
  for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
    var level = levels[levelIndex];
    for (var index = 0, len = level.length; index < len; index += 1) {
      treeLevels.addItem(levelIndex, level[index], { id: level[index] });
    }
  }
  return treeLevels;
};

var items = [
  [1],
  [2, 3],
  [4, 5, 6],
  [],
  [7, 8, 9, 10]
];

test('isEmpty function returns true for empty structure', () => {
  var treeLevels = TreeLevels();
  expect(treeLevels.isEmpty()).toBe(true);
});

test('isEmpty function returns false for none empty structure', () => {
  var treeLevels = TreeLevels();
  treeLevels.addlevel(1, "Level 1");
  expect(treeLevels.isEmpty()).toBe(false);
});

test('hasLevel function', () => {
  var treeLevels = TreeLevels();
  treeLevels.addlevel(1, "Level 1");
  expect(treeLevels.hasLevel(1)).toBe(true);
});

test('hasLevel function test for 2 levels contexts', () => {
  var treeLevels = TreeLevels();
  treeLevels.addlevel(1, "Level 1");
  treeLevels.addlevel(2, "Level 2");
  expect(treeLevels.hasLevel(1) && treeLevels.hasLevel(2)).toBe(true);
});

test('hasItem function checkes item presence in structure', () => {
  var treeLevels = TreeLevels();
  treeLevels.addItem(1, 100, { name: "Item 1 Name", descriptions: "Item 1 Description" });
  expect(treeLevels.hasItem(100)).toBe(true);
});

test('loopLevels function indexes levels', () => {
  var treeLevels = getTreeLevels(items);
  var result = [];
  treeLevels.loopLevels(this, function (index, level) {
    result.push(index);
  })
  expect(result).toEqual([0, 1, 2, 4]);
});

test('loopLevelsReversed function indexes levels in reversed order', () => {
  var treeLevels = getTreeLevels(items);
  var result = [];
  treeLevels.loopLevelsReversed(this, function (index, level) {
    result.push(index);
  })
  expect(result).toEqual([4, 2, 1, 0]);
});

test('loopLevelItems function loops items of the level', () => {
  var treeLevels = getTreeLevels(items);
  var result = [];
  treeLevels.loopLevelItems(this, 2, function (itemid, context, position) {
    result.push([itemid, context.id, position]);
  })
  expect(result).toEqual( [
    [4, 4, 0],
    [5, 5, 1],
    [6, 6, 2]
  ]);
});

test('getLevelIndex function returns index of items level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getLevelIndex(6)).toBe(2);
});

test('getItemPosition function returns item position at level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getItemPosition(8)).toBe(1);
});

test('getItemAtPosition function returns item at given level position', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getItemAtPosition(2, 1)).toBe(5);
});

test('getPrevItem function returns previous item at the level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getPrevItem(5)).toBe(4);
});

test('getPrevItem function returns null for the first item of the level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getPrevItem(7)).toBe(undefined);
});

test('getNextItem function returns next item at the level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getNextItem(5)).toBe(6);
});

test('getNextItem function returns null for the last item of the level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getNextItem(10)).toBe(undefined);
});

test('getLevelLength function returns 0 for omitted level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getLevelLength(3)).toBe(0);
});

test('getLevelLength function returns number of items at the level', () => {
  var treeLevels = getTreeLevels(items);
  expect(treeLevels.getLevelLength(4)).toBe(4);
});

var items2 = [
  [1],
  [2, 3, 5],
  [4, 5, 6],
  [5],
  [7, 8, 9, 5, 10]
];

test('getLevelIndex function returns index of items start level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getLevelIndex(5)).toBe(1);
});

test('getEndLevelIndex function returns index of items end level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getEndLevelIndex(5)).toBe(4);
});

test('getItemPosition function returns item position at start level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getItemPosition(5)).toBe(2);
});

test('getItemPosition function returns item position at middle level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getItemPosition(5, 2)).toBe(1);
});

test('getItemPosition function returns item position at end level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getItemPosition(5, 4)).toBe(3);
});

test('getItemAtPosition function returns item at given level position', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getItemAtPosition(2, 1)).toBe(5);
});

test('getPrevItem function returns previous item at the items start level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getPrevItem(5)).toBe(3);
});

test('getPrevItem function returns previous item at the items middle level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getPrevItem(5, 2)).toBe(4);
});

test('getPrevItem function returns previous item at the items end level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getPrevItem(5, 4)).toBe(9);
});

test('getNextItem function returns next item at the items start level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getNextItem(5)).toBe(undefined);
});

test('getNextItem function returns next item at the items middle level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getNextItem(5, 2)).toBe(6);
});

test('getNextItem function returns next item at the items end level', () => {
  var treeLevels = getTreeLevels(items2);
  expect(treeLevels.getNextItem(5, 4)).toBe(10);
});

test('loopItems function loops items in structure', () => {
  var treeLevels = getTreeLevels([
    [1],
    [2, 3],
    [4, 5, 6],
    [],
    [7, 8, 9, 10]
  ]);

  var result = [];
  treeLevels.loopItems(this, function (itemid, item, position, levelIndex, level) {
    result.push([itemid, position, levelIndex]);
  })

  var expectedResult = [
    [1, 0, 0],
    [2, 0, 1], [3, 1, 1],
    [4, 0, 2], [5, 1, 2], [6, 2, 2],
    [7, 0, 4], [8, 1, 4], [9, 2, 4], [10, 3, 4]
  ];
  expect(result).toEqual(expectedResult);
});

test('binarySearch function returns nearest item at the level', () => {
  var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

  var result = treeLevels.binarySearch(this, 0, function (itemid) {
    return 4.2 - itemid;
  })
  expect(result).toBe(4);
});

test('binarySearch function returns first item of collection for item beyond the left margin', () => {
  var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

  var result = treeLevels.binarySearch(this, 0, function (itemid) {
    return 0 - itemid;
  })
  expect(result).toBe(1);
});

test('binarySearch function returns the last item of collection for item beyond the last item', () => {
  var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

  var result = treeLevels.binarySearch(this, 0, function (itemid) {
    return 15 - itemid;
  })
  expect(result).toBe(10);
});

test('loopFromItem function returns items up to the end of level starting from item', () => {
  var treeLevels = getTreeLevels([
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 12, 4, 5, 6]
  ]);

  var result = [];

  treeLevels.loopFromItem(this, 12, false, function (itemid, item) {
    result.push([itemid, item.id]);
  });

  var expectedResult = [
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16]
  ];
  expect(result).toEqual(expectedResult);
});

test('loopFromItem function returns items up to the end of level starting from item', () => {
  var treeLevels = getTreeLevels([
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 12, 4, 5, 6]
  ]);

  var result = [];

  treeLevels.loopFromItem(this, 12, false, function (itemid, item) {
    result.push(itemid);
  }, 1);

  expect(result).toEqual([4, 5, 6]);
});

test('loopFromItem function returns items up to the start of the level starting from item', () => {
  var treeLevels = getTreeLevels([
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 12, 3, 4, 5, 6]
  ]);

  var result = [];

  treeLevels.loopFromItem(this, 12, true, function (itemid, item) {
    result.push([itemid, item.id]);
  });

  var expectedResult = [
    [11, 11],
    [10, 10],
    [9, 9],
    [8, 8],
    [7, 7]
  ];

  expect(result).toEqual(expectedResult);
});

test('loopFromItem function returns items up to the start of the level starting from item', () => {
  var treeLevels = getTreeLevels([
    [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 12, 3, 4, 5, 6]
  ]);

  var result = [];

  treeLevels.loopFromItem(this, 12, true, function (itemid, item) {
    result.push(itemid);
  }, 1);

  expect(result).toEqual([2, 1]);
});

test('loopLevelsFromItem function returns level indexes above the item starting for the immidiate level above', () => {
  var treeLevels = getTreeLevels([
    [1],
    [2, 3],
    [4, 5, 6],
    [5],
    [7, 8, 9, 10],
    [11, 12, 13],
    [14]
  ]);

  var result = [];
  treeLevels.loopLevelsFromItem(this, 5, false, function (levelIndex, level) {
    result.push(levelIndex);
  });

  var expectedResult = [1, 0];

  expect(result).toEqual(expectedResult);
});

test('loopLevelsFromItem function returns level indexes below the item starting for the immidiate level below', () => {
  var treeLevels = getTreeLevels([
    [1],
    [2, 3],
    [4, 5, 6],
    [5],
    [7, 8, 9, 10],
    [11, 12, 13],
    [14]
  ]);

  var result = [];
  treeLevels.loopLevelsFromItem(this, 5, true, function (levelIndex, level) {
    result.push(levelIndex);
  });

  var expectedResult = [4, 5, 6];

  expect(result).toEqual(expectedResult);
});

test('loopMerged function returns merged levels into one collection by weight', () => {
  var treeLevels = getTreeLevels([
    [1, 6, 9],
    [2, 3, 5, 8],
    [4, 5],
    [],
    [7, 10]
  ]);

  var result = [];
  treeLevels.loopMerged(this, function (itemid) {
    return itemid;
  }, function (itemid, item) {
    result.push(itemid);
  });

  var expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  expect(result).toEqual(expectedResult);
});

test('clone function returns copy of existing structure', () => {
  var expectedResult = [
    [1, 6, 9],
    [2, 3, 8],
    [4, 5],
    [7, 10]
  ];
  var treeLevels = getTreeLevels(expectedResult).clone();


  var result = [];
  treeLevels.loopLevels(this, function (index, level) {
    var levelItems = [];
    treeLevels.loopLevelItems(this, index, function (itemid, context, position) {
      levelItems.push(itemid);
    })
    result.push(levelItems);
  })

  expect(result).toEqual(expectedResult);
});