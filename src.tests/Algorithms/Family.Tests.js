QUnit.module('Algorithms - Family');

QUnit.test("primitives.common.family - Closure based family data structure.", function (assert) {

  var items = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, parents: [1, 2, 3], name: "4" },
    { id: 5, parents: [1, 2, 3], name: "5" },
    { id: 6, parents: [4], name: "6" },
    { id: 7, parents: [4, 5], name: "7" },
    { id: 8, parents: [5], name: "8" },
    { id: 9, parents: [6], name: "9" },
    { id: 10, parents: [7], name: "10" },
    { id: 11, parents: [8], name: "11" }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(topoSorted, expectedTopoSorted, "Function loopTopo returned following items");

  var topoSorted = [];
  family.loopTopoReversed(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["9", "10", "11", "6", "7", "8", "4", "5", "1", "2", "3"];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(topoSorted, expectedTopoSorted, "Function loopTopoReveresed should return following items");


  var levels = [];
  family.loopChildren(this, 4, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });

  var expected = [["6", "7"], ["9", "10"]];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expected, "Function loopChildren for item 4 should return");


  var levels = [];
  family.loopParents(this, 11, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expected = [["8"], ["5"], ["1", "2", "3"]];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expected, "Function loopParents for item 11 should return following items");

  assert.equal(family.node(100), null, "Node 100 does not exists.");
  assert.equal(family.node(6).name, "6", "Item 6 has name 6.");

  assert.ok(family.hasCommonChild([4, 5]), "Items 4 and 5 have common child.");
  assert.ok(!family.hasCommonChild([2, 3]), "Items 2 and 3 have no common child, because they are not unique parents for exisiting shared child.");
  assert.ok(!family.hasCommonChild([10, 11]), "Items 10 and 11 have no common or any child.");


  var bundleItem1 = { id: 12, name: "12" }
  family.bundleParents(4, [2, 3], bundleItem1.id, bundleItem1);

  var bundleItem2 = { id: 13, name: "13" }
  family.bundleChildren(5, [7, 8], bundleItem2.id, bundleItem2);

  var levels = [];
  family.loopLevels(this, true, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expected = [["1", "3", "2"], ["5", "12"], ["13", "4"], ["8", "6", "7"], ["11", "9", "10"]];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expected, "Function loopLevels top aligned should return following items");

  var items2 = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3", parents: [2] },
    { id: 4, name: "4", parents: [1, 3] },
    { id: 5, name: "5", parents: [4, 9] },
    { id: 6, name: "6", parents: [5] },
    { id: 7, name: "7", parents: [6, 8] },
    { id: 8, name: "8", parents: [4] },
    { id: 9, name: "9" }
  ];

  var family2 = primitives.common.family();
  for (var index = 0; index < items2.length; index += 1) {
    var item = items2[index];
    family2.add(item.parents, item.id, item);
  }

  var levels = [];
  family2.loopLevels(this, true, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expectedLevels = [["2"], ["1", "3"], ["4", "9"], ["5", "8"], ["6"], ["7"]];
  assert.ok(family2.validate(), "Family structure validation");
  assert.deepEqual(levels, expectedLevels, "Function loopLevels top aligned should return following items");


  var items3 = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3", parents: [1] },
    { id: 4, name: "4", parents: [1, 2] },
    { id: 5, name: "5", parents: [2] },
    { id: 6, name: "6", parents: [3] },
    { id: 7, name: "7", parents: [5] },
    { id: 8, name: "8", parents: [6] },
    { id: 9, name: "9", parents: [7] },
    { id: 10, name: "10", parents: [8] },
    { id: 11, name: "11", parents: [10] },
    { id: 12, name: "12", parents: [4] },
    { id: 13, name: "13", parents: [11, 12] },
    { id: 14, name: "14", parents: [12, 15] },
    { id: 15, name: "15", parents: [9] },
    { id: 16, name: "16", parents: [12] },
    { id: 17, name: "17", parents: [16] },
    { id: 18, name: "18", parents: [17] }
  ];

  var family3 = primitives.common.family();
  for (var index = 0; index < items3.length; index += 1) {
    var item = items3[index];
    family3.add(item.parents, item.id, item);
  }

  var levels = [];
  family3.loopLevels(this, true, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expectedLevels = [["1", "2"], ["3", "4", "5"], ["6", "12", "7"], ["8", "16", "9"], ["10", "17", "15"], ["11", "18", "14"], ["13"]];
  assert.ok(family3.validate(), "Family structure validation");
  assert.deepEqual(levels, expectedLevels, "Function loopLevels top aligned should return following items");

  var levels = [];
  family3 = family3.clone();
  family3.loopLevels(this, false, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });

  var expected = [["1"], ["3", "2"], ["6", "5"], ["8", "7"], ["10", "9", "4"], ["11", "12", "15"], ["13", "16", "14"], ["17"], ["18"]];
  assert.ok(family3.validate(), "Family structure validation");
  assert.deepEqual(levels, expected, "Function loopLevels should return following items for cloned family");

});

QUnit.test("primitives.common.family.loopTopo -  Family structure topological sorting.", function (assert) {

  var items = [
    { id: "D", name: "D" },
    { id: "C", name: "C", parents: ["D"] },
    { id: "F", name: "F", parents: ["D"] },
    { id: "B", name: "B", parents: ["C", "F"] },
    { id: "E", name: "E", parents: ["C", "F"] },
    { id: "A", name: "A", parents: ["B", "E"] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["D", "C", "F", "B", "E", "A"];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(topoSorted, expectedTopoSorted, "loopTopo function");

  var items = [
    { id: "A", name: "A" },
    { id: "A2", name: "A2" },
    { id: "C", name: "C", parents: ["B"] },
    { id: "B", name: "B", parents: ["A"] },
    { id: "C2", name: "C2", parents: ["B2"] },
    { id: "B2", name: "B2", parents: ["A2"] },
    { id: "G", name: "G", parents: ["B", "A", "B2", "A2"] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["A", "A2", "B", "B2", "C", "C2", "G"];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(topoSorted, expectedTopoSorted, "loopTopo function");


  var items = [
    { id: "A", name: "A" },
    { id: "A2", name: "A2" },
    { id: "C", name: "C", parents: ["B"] },
    { id: "B", name: "B", parents: ["A"] },
    { id: "C2", name: "C2", parents: ["B2"] },
    { id: "B2", name: "B2", parents: ["A2"] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["A", "A2", "B", "B2", "C", "C2"];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(topoSorted, expectedTopoSorted, "loopTopo function test for two disconnected families");

});

QUnit.test("primitives.common.family.optimizeReferences - Common nodes grouping into bundle for family visual redability. Check that targets stay the same after groupping of common targets between nodes of layer.", function (assert) {
  function testOptimizedItems(sourceItems, family) {
    var result = true;

    for (var key in sourceItems) {
      var sourceChildren = sourceItems[key];

      var resultChildren = [];
      var resultHash = {};
      family.loopChildren(this, key, function (itemid, item, levelIndex) {
        if (!item.isBundle && !resultHash.hasOwnProperty(itemid)) {
          resultHash[itemid] = true;
          resultChildren.push(itemid);
        }
      });

      sourceChildren.sort();
      resultChildren.sort();

      if (sourceChildren.join(',') != resultChildren.join(',')) {
        var result = false;
        break;
      }
    }

    return result;
  };

  function getOptimizedFamily(sourceItems) {
    var maximum = 100;
    var family = primitives.common.family();

    var children = {};

    for (var parent in sourceItems) {
      var items = sourceItems[parent];
      for (var index = 0; index < items.length; index += 1) {
        if (!children.hasOwnProperty(items[index])) {
          children[items[index]] = [];
        }
        children[items[index]].push(parent);
      }
    }

    for (var child in children) {
      family.add(children[child], child, {});
    }

    for (var parent in sourceItems) {
      if (children[parent] == null)
        family.add(null, parent, {});
    }

    family.optimizeReferences(function () {
      maximum += 1;
      return { id: maximum, isBundle: true };
    });

    return family;
  }

  function getLevels(family) {
    var levels = [];
    family.loopLevels(this, true, function (itemid, item, level) {
      var newItem = { id: itemid };
      var children = [];
      family.loopChildren(this, itemid, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
          return family.BREAK;
        }
        children.push(itemid);
      });
      if (children.length > 0) {
        newItem.children = children;
      }
      levels.push(newItem);
    });
    return levels;
  }

  var sourceItems = {
    A: [1, 2, 3, 4],
    B: [1, 2, 3, 4],
    C: [1, 2, 3, 4]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["101"] },
  { "id": "C", "children": ["101"] },
  { "id": "B", "children": ["101"] },
  { "id": "101", "children": ["1", "2", "3", "4"] },
  { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }
  ];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expectedResults, "Full bundle 3 by 4.");


  var sourceItems = {
    A: [1, 2, 3, 4],
    B: [1, 2, 3],
    C: [3, 4, 5]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["101", "102"] },
  { "id": "B", "children": ["101"] },
  { "id": "C", "children": ["5", "102"] },
  { "id": "101", "children": ["1", "2", "3"] },
  { "id": "102", "children": ["3", "4"] },
  { "id": "5" }, { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }];
  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "Nested item and parent together overlap with 3d item optimization test.");
  assert.deepEqual(levels, expectedResults, "Nested item and parent together overlap with 3d item optimization consistency test.");

  var sourceItems = {
    A: [0, 1, 2],
    B: [1, 2, 3],
    C: [2, 3, 4],
    D: [3, 4, 5],
    E: [4, 5, 6]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["0", "101"] },
  { "id": "B", "children": ["101", "102"] },
  { "id": "C", "children": ["102", "103"] },
  { "id": "D", "children": ["103", "104"] },
  { "id": "E", "children": ["6", "104"] },
  { "id": "0" },
  { "id": "101", "children": ["1", "2"] },
  { "id": "102", "children": ["2", "3"] },
  { "id": "103", "children": ["3", "4"] },
  { "id": "104", "children": ["4", "5"] },
  { "id": "6" }, { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }, { "id": "5" }];

  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "Chained 5 elements having 3 target items. Every item overlaps its neighbours with 2 shared items. Optimization test.");
  assert.deepEqual(levels, expectedResults, "Chained 5 elements having 3 target items. Every item overlaps its neighbours with 2 shared items. Optimization consistency test.");

  var sourceItems = {
    A: [0, 1, 2, 3],
    B: [2, 3, 4, 5],
    C: [3, 4, 5, 6],
    D: [4, 5, 6, 7]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["0", "1", "101"] },
  { "id": "B", "children": ["101", "102"] },
  { "id": "C", "children": ["102", "103"] },
  { "id": "D", "children": ["7", "103"] },
  { "id": "0" }, { "id": "1" },
  { "id": "101", "children": ["2", "3"] },
  { "id": "102", "children": ["3", "104"] },
  { "id": "103", "children": ["6", "104"] },
  { "id": "7" }, { "id": "2" }, { "id": "3" }, { "id": "6" },
  { "id": "104", "children": ["4", "5"] },
  { "id": "4" }, { "id": "5" }]

  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "Chained 4 elements having 4 target items. Every item overlaps its neighbours with 2 shared items. Optimization test.");
  assert.deepEqual(levels, expectedResults, "Chained 4 elements having 4 target items. Every item overlaps its neighbours with 2 shared items. Optimization consistency test.");

  var sourceItems = {
    A: [1, 2, 3, 4, 5, 6, 7, 8],
    B: [1, 2, 3, 4, 5],
    C: [1, 2, 3, 4, 5],
    D: [4, 5, 6, 7],
    E: [4, 6, 7]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["8", "101", "102"] },
  { "id": "C", "children": ["101"] },
  { "id": "B", "children": ["101"] },
  { "id": "D", "children": ["102"] },
  { "id": "8" },
  { "id": "101", "children": ["1", "2", "3", "4", "5"] },
  { "id": "102", "children": ["5", "103"] },
  { "id": "E", "children": ["103"] },
  { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "5" },
  { "id": "103", "children": ["4", "6", "7"] },
  { "id": "4" }, { "id": "6" }, { "id": "7" }];

  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "One item containing all other items. Duplicates. Overlapping sub item. Optimization test.");
  assert.deepEqual(levels, expectedResults, "One item containing all other items. Duplicates. Overlapping sub item. Optimization consistency test.");

  var sourceItems = {
    A: [0, 1, 2, 3, 4],
    B: [0, 1, 2, 3],
    C: [0, 1, 2],
    D: [0, 1],
    E: [0]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["4", "101"] },
  { "id": "B", "children": ["101"] },
  { "id": "4" },
  { "id": "101", "children": ["3", "102"] },
  { "id": "C", "children": ["102"] },
  { "id": "3" },
  { "id": "102", "children": ["2", "103"] },
  { "id": "D", "children": ["103"] },
  { "id": "2" },
  { "id": "103", "children": ["0", "1"] },
  { "id": "E", "children": ["0"] },
  { "id": "0" }, { "id": "1" }];

  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "Nesting 5 items. Optimization test.");
  assert.deepEqual(levels, expectedResults, "Nesting 5 items. Optimization consistency test.");

  var sourceItems = {
    A: [0, 1, 2, 3],
    B: [1, 2, 3],
    C: [2, 3, 4],
    D: [5, 6, 7, 8],
    E: [5, 6, 7],
    F: [6, 7, 9]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["0", "101"] },
  { "id": "B", "children": ["101"] },
  { "id": "D", "children": ["8", "103"] },
  { "id": "E", "children": ["103"] },
  { "id": "0" },
  { "id": "101", "children": ["1", "102"] },
  { "id": "C", "children": ["4", "102"] },
  { "id": "8" },
  { "id": "103", "children": ["5", "104"] },
  { "id": "F", "children": ["9", "104"] },
  { "id": "1" },
  { "id": "102", "children": ["2", "3"] },
  { "id": "4" }, { "id": "5" },
  { "id": "104", "children": ["6", "7"] },
  { "id": "9" }, { "id": "2" }, { "id": "3" }, { "id": "6" }, { "id": "7" }]

  assert.ok(family.validate(), "Family structure validation");
  assert.ok(testOptimizedItems(sourceItems, family), "Test 2 non-connected clusters of items. All items reference the same target items via group items. Optimization test.");
  assert.deepEqual(levels, expectedResults, "Test 2 non-connected clusters of items. All items reference the same target items via group items. Optimization consistency test.");


  var sourceItems = {
    A: ["B", "D", "D2"],
    B: ["C", "D", "D2"],
    C: [],
    A2: ["B2", "D", "D2"],
    B2: ["C2", "D", "D2"],
    C2: [],
    D: [],
    D2: []
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["101", "B"] },
  { "id": "A2", "children": ["101", "B2"] },
  { "id": "B", "children": ["101", "C"] },
  { "id": "B2", "children": ["101", "C2"] },
  { "id": "C" },
  { "id": "101", "children": ["D", "D2"] },
  { "id": "C2" },
  { "id": "D" }, { "id": "D2" }];

  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expectedResults, "Test regrouping of items belonging to several layers. Optimization consistency test.");
});

QUnit.test("primitives.common.family.adopt - Adopt existing item to multiple existing parents in structure.", function (assert) {
  function getLevels(family) {
    var levels = [];
    family.loopLevels(this, true, function (itemid, item, level) {
      var newItem = { id: itemid };
      var children = [];
      family.loopChildren(this, itemid, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
          return family.BREAK;
        }
        children.push(itemid);
      });
      if (children.length > 0) {
        newItem.children = children;
      }
      levels.push(newItem);
    });
    return levels;
  }

  var items = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6, parents: [2, 3, 4] }, { id: 7 },
    { id: 8, parents: [1, 2, 3, 4, 5, 6, 7] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var result = [];
  family.adopt([1, 2, 3], 5);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5", "8"] },
  { "id": "3", "children": ["5", "6", "8"] },
  { "id": "2", "children": ["5", "6", "8"] },
  { "id": "4", "children": ["6", "8"] },
  { "id": "5", "children": ["8"] },
  { "id": "6", "children": ["8"] },
  { "id": "7", "children": ["8"] },
  { "id": "8" }];
  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(levels, expectedResults, "Check adopted item.");
});

QUnit.test("primitives.common.family - nodes and relations removal.", function (assert) {
  function getLevels(family) {
    var levels = [];
    family.loopLevels(this, true, function (itemid, item, level) {
      var newItem = { id: itemid };
      var children = [];
      family.loopChildren(this, itemid, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
          return family.BREAK;
        }
        children.push(itemid);
      });
      if (children.length > 0) {
        newItem.children = children;
      }
      levels.push(newItem);
    });
    return levels;
  }

  var items = [
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  assert.ok(family.validate(), "Check that family is valid before item removal.");

  family.removeNode(4);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2", "children": ["5"] },
  { "id": "5", "children": ["6", "7", "8"] },
  { "id": "6" }, { "id": "7" }, { "id": "8" }
  ];
  assert.ok(family.validate(), "Family structure validation after item removal");
  assert.deepEqual(levels, expectedResults, "Check item removal.");

  family.removeRelation(5, 2);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2" },
  { "id": "5", "children": ["6", "7", "8"] },
  { "id": "6" }, { "id": "7" }, { "id": "8" }
  ];
  assert.ok(family.validate(), "Family structure validation after relation removal");
  assert.deepEqual(levels, expectedResults, "Check child/parent relation removal");

  family.removeRelation(5, 6);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2" }, { "id": "6" },
  { "id": "5", "children": ["7", "8"] },
  { "id": "7" }, { "id": "8" }
  ];
  assert.ok(family.validate(), "Family structure validation after relation removal");
  assert.deepEqual(levels, expectedResults, "Check parent/child relation removal resulting in new orphant item 6 creation.");


  family.removeNode(1);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "2" }, { "id": "3", "children": ["5"] }, { "id": "6" }, { "id": "5", "children": ["7", "8"] }, { "id": "7" }, { "id": "8" }];
  assert.ok(family.validate(), "Family structure validation after orphant 1 removal");
  assert.deepEqual(levels, expectedResults, "Check orphant 1 removal");
});

QUnit.test("primitives.common.family.eliminateManyToMany - This method removes Many To Many relations via adding new bundle nodes.", function (assert) {
  var maximum = 100;

  function testOptimizedItems(sourceItems, family) {
    var result = true;

    for (var key in sourceItems) {
      var sourceChildren = sourceItems[key];

      var resultChildren = [];
      family.loopChildren(this, key, function (itemid, item, levelIndex) {
        if (!item.isBundle) {
          resultChildren.push(itemid);
        }
      });

      sourceChildren.sort();
      resultChildren.sort();

      if (sourceChildren.join(',') != resultChildren.join(',')) {
        var result = false;
        break;
      }
    }

    return result;
  };

  function getOptimizedFamily(sourceItems) {
    var family = primitives.common.family();

    var children = {};

    for (var parent in sourceItems) {
      var items = sourceItems[parent];
      for (var index = 0; index < items.length; index += 1) {
        if (!children.hasOwnProperty(items[index])) {
          children[items[index]] = [];
        }
        children[items[index]].push(parent);
      }
    }

    for (var child in children) {
      family.add(children[child], child, {});
    }

    for (var parent in sourceItems) {
      if (children[parent] == null)
        family.add(null, parent, {});
    }

    family.eliminateManyToMany(function () {
      maximum += 1;
      return { id: maximum, isBundle: true };
    });

    return family;
  }

  function getLevels(family) {
    var levels = [];
    family.loopLevels(this, true, function (itemid, item, level) {
      var newItem = { id: itemid };
      var children = [];
      family.loopChildren(this, itemid, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
          return family.BREAK;
        }
        children.push(itemid);
      });
      if (children.length > 0) {
        newItem.children = children;
      }
      levels.push(newItem);
    });
    return levels;
  }

  function validate(family) {
    var result = true;
    family.loop(this, function (itemid, item) {
      item.childrenLength = 0;
      family.loopChildren(this, itemid, function (childid, child, levelIndex) {
        if (levelIndex > 0) {
          return family.BREAK;
        }
        parent.childrenLength += 1;
      });

      item.parentsLength = 0;
      family.loopParents(this, itemid, function (parentid, parent, levelIndex) {
        parent.parentsLength += 1;
        return family.SKIP;
      });
    });

    family.loop(this, function (itemid, item) {
      if (item.childrenLength > 1) {
        family.loopChildren(this, itemid, function (childid, child, levelIndex) {
          if (levelIndex > 0) {
            return family.BREAK;
          }
          if (child.parentsLength > 1) {
            result = false;
          }
        });
      }
    });
    return result;
  }

  var sourceItems = {
    A: [1, 2, 3],
    B: [2, 4],
    C: [3, 5],
    D: [6]
  };
  var family = getOptimizedFamily(sourceItems);
  var levels = getLevels(family);
  var expectedResults = [{ "id": "A", "children": ["1", "101", "102"] },
  { "id": "B", "children": ["4", "103"] },
  { "id": "C", "children": ["5", "104"] },
  { "id": "D", "children": ["6"] },
  { "id": "1" },
  { "id": "101", "children": ["2"] },
  { "id": "102", "children": ["3"] },
  { "id": "103", "children": ["2"] },
  { "id": "4" },
  { "id": "104", "children": ["3"] },
  { "id": "5" }, { "id": "6" }, { "id": "2" }, { "id": "3" }
  ];

  assert.ok(testOptimizedItems(sourceItems, family), "Family structure optimization test after many to many relations removal");
  assert.ok(family.validate() && validate(family), "Family structure validation after many to many relations removal");
  assert.deepEqual(levels, expectedResults, "Eliminate many to many relations from family");
});


QUnit.test("primitives.common.family.findLargestRoot -  Finds sub-tree having largest number of nodes.", function (assert) {

  var items = [
    { id: 12 },
    { id: 11, parents: [12] },
    { id: 14 },
    { id: 13, parents: [14] },
    { id: 8 },
    { id: 9, parents: [8] },
    { id: 10, parents: [8] },
    { id: 1 },
    { id: 2, parents: [1, 13] },
    { id: 3, parents: [1, 13] },
    { id: 6, parents: [3] },
    { id: 7, parents: [3] },
    { id: 4, parents: [2, 11] },
    { id: 5, parents: [2] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var extractionFamily = family.clone();
  var families = [];
  var grandParent;
  while ((grandParent = extractionFamily.findLargestRoot()) != null) {
    var members = [];
    extractionFamily.removeNode(grandParent);
    family.loopChildren(this, grandParent, function (itemid, item, levelIndex) {
      if (extractionFamily.node(itemid) != null) {
        members.push(itemid);
        extractionFamily.removeNode(itemid);
      }
    });

    families.push({ root: grandParent, members: members });
  };

  var expected = [{ "root": "14", "members": ["13", "2", "3", "4", "5", "6", "7"] },
  { "root": "8", "members": ["9", "10"] },
  { "root": "12", "members": ["11"] },
  { "root": "1", "members": [] }];

  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(families, expected, "findLargestRoot function test");
});

QUnit.test("primitives.common.family.loopRoots -  Loop sub-trees by size from smallest to largest.", function (assert) {

  var items = [
    { id: 12 },
    { id: 11, parents: [12] },
    { id: 14 },
    { id: 13, parents: [14] },
    { id: 8 },
    { id: 9, parents: [8] },
    { id: 10, parents: [8] },
    { id: 1 },
    { id: 2, parents: [1, 13] },
    { id: 3, parents: [1, 13] },
    { id: 6, parents: [3] },
    { id: 7, parents: [3] },
    { id: 4, parents: [2, 11] },
    { id: 5, parents: [2] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var members = [];
  family.loopRoots(this, function (itemid, item) {
    members.push(itemid);
  });

  var expected = ["8", "12", "1", "14"];

  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(members, expected, "loopRoots function test");

  assert.equal(family.countParents(2), 2, "Item 2 has 2 parent nodes.");
  assert.equal(family.countChildren(12), 1, "Item 12 has 1 child node.");
  assert.equal(family.countParents(1), 0, "Item 1 has no parents.");
  assert.equal(family.countChildren(9), 0, "Item 9 has no children.");
  assert.equal(family.firstChild(12), "11", "Item 12 has first child 11.");
  assert.equal(family.firstParent(13), "14", "Item 13 has first parent 14.");
});

QUnit.test("primitives.common.family.loopNeighbours -  Loop neighbouring parents & children.", function (assert) {

  var items = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6, parents: [1, 2] }, { id: 7, parents: [3, 4] }, { id: 8, parents: [4] },
    { id: 9, parents: [5, 6, 7] }, { id: 10, parents: [6, 7] }, { id: 11, parents: [6, 7, 8] },
    { id: 12, parents: [9] }, { id: 13, parents: [9, 10, 11] }, { id: 14, parents: [9, 10, 11] }, { id: 15, parents: [11] },
    { id: 16, parents: [12, 13] }, { id: 17, parents: [13] }, { id: 18, parents: [14] }, { id: 19, parents: [14] }
  ];

  var family = primitives.common.family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var result = [];
  family.loopNeighbours(this, 10, function (itemid, item, level) {
    result.push(itemid);

    return true;
  });

  var expected = ["13", "9", "10", "11", "14", "6", "7"];

  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(result, expected, "loopNeighbours function test");

  var result = [];
  family.loopNeighbours(this, 10, function (itemid, item, level) {
    result.push(itemid);

    if (itemid != "13" && itemid != "7") {
      return true;
    }
  });

  var expected = ["13", "9", "10", "11", "14", "16", "12", "17", "6", "7", "3", "4", "8"];

  assert.ok(family.validate(), "Family structure validation");
  assert.deepEqual(result, expected, "loopNeighbours function test");

});
