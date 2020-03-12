QUnit.module('Algorithms - TreeLevels is collection of collections structure');

QUnit.test("primitives.common.TreeLevels", function (assert) {
  function getTreeLevels(levels) {
    var treeLevels = primitives.common.TreeLevels();
    for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
      var level = levels[levelIndex];
      for (var index = 0, len = level.length; index < len; index += 1) {
        treeLevels.addItem(levelIndex, level[index], { id: level[index] });
      }
    }
    return treeLevels;
  };

  (function () {
    var treeLevels = primitives.common.TreeLevels();
    assert.ok(treeLevels.isEmpty(), "isEmpty function returns true for empty structure");
  })();

  (function () {
    var treeLevels = primitives.common.TreeLevels();
    treeLevels.addlevel(1, "Level 1");
    assert.notOk(treeLevels.isEmpty(), "isEmpty function returns false for none empty structure");
  })();

  (function () {
    var treeLevels = primitives.common.TreeLevels();
    treeLevels.addlevel(1, "Level 1");
    assert.ok(treeLevels.hasLevel(1), "hasLevel function");
  })();

  (function () {
    var treeLevels = primitives.common.TreeLevels();
    treeLevels.addlevel(1, "Level 1");
    treeLevels.addlevel(2, "Level 2");
    assert.ok(treeLevels.hasLevel(1) && treeLevels.hasLevel(2), "hasLevel function test for 2 levels contexts");
  })();

  (function () {
    var treeLevels = primitives.common.TreeLevels();
    treeLevels.addItem(1, 100, { name: "Item 1 Name", descriptions: "Item 1 Description" });
    assert.ok(treeLevels.hasItem(100), "hasItem function checkes item presence in structure");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [1],
      [2, 3],
      [4, 5, 6],
      [],
      [7, 8, 9, 10]
    ]);

    var result = [];
    treeLevels.loopLevels(this, function (index, level) {
      result.push(index);
    })
    assert.deepEqual(result, [0, 1, 2, 4], "loopLevels function indexes levels");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [1],
      [2, 3],
      [4, 5, 6],
      [],
      [7, 8, 9, 10]
    ]);

    var result = [];
    treeLevels.loopLevelsReversed(this, function (index, level) {
      result.push(index);
    })
    assert.deepEqual(result, [4, 2, 1, 0], "loopLevelsReversed function indexes levels in reversed order");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [1],
      [2, 3],
      [4, 5, 6],
      [],
      [7, 8, 9, 10]
    ]);

    var result = [];
    treeLevels.loopLevelItems(this, 2, function (itemid, context, position) {
      result.push([itemid, context.id, position]);
    })

    var expectedResult = [
      [4, 4, 0],
      [5, 5, 1],
      [6, 6, 2]
    ];
    assert.deepEqual(result, expectedResult, "loopLevelItems function loops items of the level");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [1],
      [2, 3],
      [4, 5, 6],
      [],
      [7, 8, 9, 10]
    ]);

    assert.equal(treeLevels.getLevelIndex(6), 2, "getLevelIndex function returns index of items level");
    assert.equal(treeLevels.getItemPosition(8), 1, "getItemPosition function returns item position at level");
    assert.equal(treeLevels.getItemAtPosition(2, 1), 5, "getItemAtPosition function returns item at given level position");
    assert.equal(treeLevels.getPrevItem(5), 4, "getPrevItem function returns previous item at the level");
    assert.equal(treeLevels.getPrevItem(7), null, "getPrevItem function returns null for the first item of the level");
    assert.equal(treeLevels.getNextItem(5), 6, "getNextItem function returns next item at the level");
    assert.equal(treeLevels.getNextItem(10), null, "getNextItem function returns null for the last item of the level");
    assert.equal(treeLevels.getLevelLength(3), 0, "getLevelLength function returns 0 for omitted level");
    assert.equal(treeLevels.getLevelLength(4), 4, "getLevelLength function returns number of items at the level");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [1],
      [2, 3, 5],
      [4, 5, 6],
      [5],
      [7, 8, 9, 5, 10]
    ]);

    assert.equal(treeLevels.getLevelIndex(5), 1, "getLevelIndex function returns index of items start level");
    assert.equal(treeLevels.getEndLevelIndex(5), 4, "getEndLevelIndex function returns index of items end level");

    assert.equal(treeLevels.getItemPosition(5), 2, "getItemPosition function returns item position at start level");
    assert.equal(treeLevels.getItemPosition(5, 2), 1, "getItemPosition function returns item position at middle level");
    assert.equal(treeLevels.getItemPosition(5, 4), 3, "getItemPosition function returns item position at end level");

    assert.equal(treeLevels.getItemAtPosition(2, 1), 5, "getItemAtPosition function returns item at given level position");

    assert.equal(treeLevels.getPrevItem(5), 3, "getPrevItem function returns previous item at the items start level");
    assert.equal(treeLevels.getPrevItem(5, 2), 4, "getPrevItem function returns previous item at the items middle level");
    assert.equal(treeLevels.getPrevItem(5, 4), 9, "getPrevItem function returns previous item at the items end level");

    assert.equal(treeLevels.getNextItem(5), null, "getNextItem function returns next item at the items start level");
    assert.equal(treeLevels.getNextItem(5, 2), 6, "getNextItem function returns next item at the items middle level");
    assert.equal(treeLevels.getNextItem(5, 4), 10, "getNextItem function returns next item at the items end level");
  })();

  (function () {
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
    assert.deepEqual(result, expectedResult, "loopItems function loops items in structure");
  })();

  (function () {
    var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

    var result = treeLevels.binarySearch(this, 0, function (itemid) {
      return 4.2 - itemid;
    })

    assert.deepEqual(result, 4, "binarySearch function returns nearest item at the level");
  })();

  (function () {
    var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

    var result = treeLevels.binarySearch(this, 0, function (itemid) {
      return 0 - itemid;
    })

    assert.deepEqual(result, 1, "binarySearch function returns first item of collection for item beyond the left margin");
  })();

  (function () {
    var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

    var result = treeLevels.binarySearch(this, 0, function (itemid) {
      return 15 - itemid;
    })

    assert.deepEqual(result, 10, "binarySearch function returns the last item of collection for item beyond the last item");
  })();

  (function () {
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

    assert.deepEqual(result, expectedResult, "loopFromItem function returns items up to the end of level starting from item");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      [1, 2, 12, 4, 5, 6]
    ]);

    var result = [];

    treeLevels.loopFromItem(this, 12, false, function (itemid, item) {
      result.push(itemid);
    }, 1);

    assert.deepEqual(result, [4, 5, 6], "loopFromItem function returns items up to the end of level starting from item");
  })();

  (function () {
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

    assert.deepEqual(result, expectedResult, "loopFromItem function returns items up to the start of the level starting from item");
  })();

  (function () {
    var treeLevels = getTreeLevels([
      [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      [1, 2, 12, 3, 4, 5, 6]
    ]);

    var result = [];

    treeLevels.loopFromItem(this, 12, true, function (itemid, item) {
      result.push(itemid);
    }, 1);

    assert.deepEqual(result, [2, 1], "loopFromItem function returns items up to the start of the level starting from item");
  })();

  (function () {
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

    assert.deepEqual(result, expectedResult, "loopLevelsFromItem function returns level indexes above the item starting for the immidiate level above");
  })();

  (function () {
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

    assert.deepEqual(result, expectedResult, "loopLevelsFromItem function returns level indexes below the item starting for the immidiate level below");
  })();

  (function () {
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

    assert.deepEqual(result, expectedResult, "loopMerged function returns merged levels into one collection by weight");
  })();

  (function () {
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


    assert.deepEqual(result, expectedResult, "clone function returns copy of existing structure");
  })();
});