import TreeLevels from './TreeLevels';

function getTreeLevels(levels) {
  var treeLevels = TreeLevels();
  for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
    var level = levels[levelIndex];
    if (!treeLevels.hasLevel(levelIndex)) {
      treeLevels.addlevel(levelIndex, {});
    }
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

test('loopLevels function indexes levels', () => {
  var treeLevels = getTreeLevels(items);
  var reversed = treeLevels.getReversedTreeLevels();
  var result = [];
  reversed.loopLevels(this, function (index, level) {
    var levelItems = [];
    reversed.loopLevelItems(this, index, function (itemid, context, position) {
      levelItems.push(itemid);
    });
    result.push(levelItems);
  })
  var expectedResult = [
    [7, 8, 9, 10],
    [],
    [4, 5, 6],
    [2, 3],
    [1]
  ];
  expect(result).toEqual(expectedResult);
});
