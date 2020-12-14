import Family from './Family';

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

function getFamily(items) {
  var family = Family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }
  return family;
}


test('loopTopo', () => {
  const family = getFamily(items);
  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  expect(family.validate()).toBe(true);
  expect(topoSorted).toEqual(expectedTopoSorted);
});

test('loopTopoReveresed', () => {
  const family = getFamily(items);
  var topoSorted = [];
  family.loopTopoReversed(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["9", "10", "11", "6", "7", "8", "4", "5", "1", "2", "3"];
  expect(family.validate()).toBe(true);
  expect(topoSorted).toEqual(expectedTopoSorted);
});


test('Function loopChildren for item 4 should return', () => {
  const family = getFamily(items);
  var levels = [];
  family.loopChildren(this, 4, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });

  var expected = [["6", "7"], ["9", "10"]];
  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expected);
});

test('Function loopParents for item 11 should return following items', () => {
  const family = getFamily(items);
  var levels = [];
  family.loopParents(this, 11, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expected = [["8"], ["5"], ["1", "2", "3"]];
  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expected);
});

test('Node 100 does not exists', () => {
  const family = getFamily(items);
  expect(family.node(100)).toBe(undefined);
});

test('Item 6 has name 6', () => {
  const family = getFamily(items);
  expect(family.node(6).name).toBe("6");
});

test('Items 4 and 5 have common child', () => {
  const family = getFamily(items);
  expect(family.hasCommonChild([4, 5])).toBe(true);
});

test('Items 2 and 3 have no common child, because they are not unique parents for exisiting shared child', () => {
  const family = getFamily(items);
  expect(!family.hasCommonChild([2, 3])).toBe(true);
});

test('Items 10 and 11 have no common or any child', () => {
  const family = getFamily(items);
  expect(!family.hasCommonChild([10, 11])).toBe(true);
});

test('Function loopLevels top aligned should return following items', () => {
  const family = getFamily(items);
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
  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expected);
});

test('Function loopLevels top aligned should return following items', () => {
  const family = getFamily([
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3", parents: [2] },
    { id: 4, name: "4", parents: [1, 3] },
    { id: 5, name: "5", parents: [4, 9] },
    { id: 6, name: "6", parents: [5] },
    { id: 7, name: "7", parents: [6, 8] },
    { id: 8, name: "8", parents: [4] },
    { id: 9, name: "9" }
  ]);
  var levels = [];
  family.loopLevels(this, true, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expectedLevels = [["2"], ["1", "3"], ["4", "9"], ["5", "8"], ["6"], ["7"]];
  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expectedLevels);
});

test('Function loopLevels top aligned should return following items', () => {
  const family = getFamily([
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
  ]);
  var levels = [];
  family.loopLevels(this, true, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });
  var expectedLevels = [["1", "2"], ["3", "4", "5"], ["6", "12", "7"], ["8", "16", "9"], ["10", "17", "15"], ["11", "18", "14"], ["13"]];
  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expectedLevels);
});

test('Function loopLevels should return following items for cloned family', () => {
  const family = getFamily([
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
  ]);
  var levels = [];
  const family3 = family.clone();
  family3.loopLevels(this, false, function (itemid, item, level) {
    levels[level] = levels[level] || [];
    levels[level].push(itemid);
  });

  var expected = [["1"], ["3", "2"], ["6", "5"], ["8", "7"], ["10", "9", "4"], ["11", "12", "15"], ["13", "16", "14"], ["17"], ["18"]];
  expect(family3.validate()).toBe(true);
  expect(levels).toEqual(expected);
});

test('loopTopo function', () => {
  const family = getFamily([
    { id: "D", name: "D" },
    { id: "C", name: "C", parents: ["D"] },
    { id: "F", name: "F", parents: ["D"] },
    { id: "B", name: "B", parents: ["C", "F"] },
    { id: "E", name: "E", parents: ["C", "F"] },
    { id: "A", name: "A", parents: ["B", "E"] }
  ]);
  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["D", "C", "F", "B", "E", "A"];

  expect(family.validate()).toBe(true);
  expect(topoSorted).toEqual(expectedTopoSorted);
});

test('loopTopo function', () => {
  const family = getFamily([
    { id: "A", name: "A" },
    { id: "A2", name: "A2" },
    { id: "C", name: "C", parents: ["B"] },
    { id: "B", name: "B", parents: ["A"] },
    { id: "C2", name: "C2", parents: ["B2"] },
    { id: "B2", name: "B2", parents: ["A2"] },
    { id: "G", name: "G", parents: ["B", "A", "B2", "A2"] }
  ]);
  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["A", "A2", "B", "B2", "C", "C2", "G"];

  expect(family.validate()).toBe(true);
  expect(topoSorted).toEqual(expectedTopoSorted);
});

test('loopTopo function test for two disconnected families', () => {
  const family = getFamily([
    { id: "A", name: "A" },
    { id: "A2", name: "A2" },
    { id: "C", name: "C", parents: ["B"] },
    { id: "B", name: "B", parents: ["A"] },
    { id: "C2", name: "C2", parents: ["B2"] },
    { id: "B2", name: "B2", parents: ["A2"] }
  ]);
  var topoSorted = [];
  family.loopTopo(this, function (itemid, item, position) {
    topoSorted.push(itemid);
  });

  var expectedTopoSorted = ["A", "A2", "B", "B2", "C", "C2"];

  expect(family.validate()).toBe(true);
  expect(topoSorted).toEqual(expectedTopoSorted);
});


test('adopt - Check adopted item', () => {
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

  var family = Family();
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

  expect(family.validate()).toBe(true);
  expect(levels).toEqual(expectedResults);
});

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

test('removeNode - Check item removal', () => {
  const family = getFamily([
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ]);
  family.removeNode(4);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2", "children": ["5"] },
    { "id": "5", "children": ["6", "7", "8"] },
    { "id": "6" }, { "id": "7" }, { "id": "8" }
  ];

  expect(family.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});


test('removeRelation - Check child/parent relation removal', () => {
  const family = getFamily([
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ]);
  family.removeNode(4);
  family.removeRelation(5, 2);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2" },
    { "id": "5", "children": ["6", "7", "8"] },
    { "id": "6" }, { "id": "7" }, { "id": "8" }
  ];

  expect(family.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});

test('removeRelation - Check parent/child relation removal resulting in new orphant item 6 creation', () => {
  const family = getFamily([
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ]);
  family.removeNode(4);
  family.removeRelation(5, 2);
  family.removeRelation(5, 6);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5"] }, { "id": "2" }, { "id": "6" },
    { "id": "5", "children": ["7", "8"] },
    { "id": "7" }, { "id": "8" }
  ];

  expect(family.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});
  
test('removeNode - Check orphant 1 removal', () => {
  const family = getFamily([
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ]);
  family.removeNode(4);
  family.removeRelation(5, 2);
  family.removeRelation(5, 6);
  family.removeNode(1);

  var levels = getLevels(family);
  var expectedResults = [{ "id": "2" }, { "id": "3", "children": ["5"] }, { "id": "6" }, { "id": "5", "children": ["7", "8"] }, { "id": "7" }, { "id": "8" }];

  expect(family.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});
  
test('findLargestRoot -  Finds sub-tree having largest number of nodes', () => {
  const family = getFamily([
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
  ]);
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
    { "root": "1", "members": [] }
  ];

  expect(family.validate()).toBe(true); 
  expect(families).toEqual(expected);
});

const items2 = [
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

test('loopRoots -  Loop sub-trees by size from smallest to largest', () => {
  const family = getFamily(items2);
  var members = [];
  family.loopRoots(this, function (itemid, item) {
    members.push(itemid);
  });

  var expected = ["8", "12", "1", "14"];

  expect(family.validate()).toBe(true); 
  expect(members).toEqual(expected);
});

test('countParents -  Item 2 has 2 parent nodes', () => {
  const family = getFamily(items2);
  expect(family.countParents(2)).toBe(2);
});

test('countChildren -  Item 12 has 1 child node', () => {
  const family = getFamily(items2);
  expect(family.countChildren(12)).toBe(1);
});

test('countParents -  Item 1 has no parents', () => {
  const family = getFamily(items2);
  expect(family.countParents(1)).toBe(0);
});

test('countChildren -  Item 9 has no children', () => {
  const family = getFamily(items2);
  expect(family.countChildren(9)).toBe(0);
});

test('firstChild -  Item 12 has first child 11', () => {
  const family = getFamily(items2);
  expect(family.firstChild(12)).toBe("11");
});

test('firstParent -  Item 13 has first parent 14', () => {
  const family = getFamily(items2);
  expect(family.firstParent(13)).toBe("14");
});
