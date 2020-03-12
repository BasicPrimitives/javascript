QUnit.module('FamDiagram - Tasks - Transformations - FamilyNormalizer');

QUnit.test("primitives.famdiagram.FamilyNormalizer -  Bundles references, eliminates many to many relations, fills nodes into gaps between levels via addding invisible items.", function (assert) {
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

  function normalizeLogicalFamilyTask(items) {
    var family = primitives.common.family();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      family.add(item.parents, item.id, item);
    }

    var maximumFamItemId = 100;

    var familyNormalizer = new primitives.famdiagram.FamilyNormalizer(true);
    maximumId = familyNormalizer.normalize({ groupByType: primitives.common.GroupByType.Parents, alignBylevels: false }, family, maximumFamItemId);

    return getLevels(family);
  }

  var items = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, parents: [1, 2], name: "3" },
    { id: 4, parents: [1, 2], name: "4" },
    { id: 5, parents: [1, 2], name: "5" },
    { id: 6, parents: [1, 2], name: "6" }
  ];

  var levels = normalizeLogicalFamilyTask(items);

  var expectedLevels = [{ "id": "1", "children": ["101"] },
  { "id": "2", "children": ["101"] },
  { "id": "101", "children": ["3", "4", "5", "6"] },
  { "id": "3" },
  { "id": "4" },
  { "id": "5" },
  { "id": "6" }
  ];

  assert.deepEqual(levels, expectedLevels, "Function should bundle cross relations into single node");


  var items = [
    { id: 1, name: "1" },
    { id: 2, parents: [1], name: "2" },
    { id: 7, parents: [1], name: "7" },
    { id: 3, parents: [2], name: "3" },
    { id: 4, parents: [3], name: "4" },
    { id: 5, parents: [4], name: "5" },
    { id: 6, parents: [5, 7], name: "6" }
  ];

  var levels = normalizeLogicalFamilyTask(items);

  var expectedLevels = [
    { "id": "1", "children": ["2", "7"] },
    { "id": "2", "children": ["3"] },
    { "id": "7", "children": ["103"] },
    { "id": "3", "children": ["4"] },
    { "id": "103", "children": ["102"] },
    { "id": "4", "children": ["5"] },
    { "id": "102", "children": ["101"] },
    { "id": "5", "children": ["6"] },
    { "id": "101", "children": ["6"] },
    { "id": "6" }
  ];

  assert.deepEqual(levels, expectedLevels, "Function should add extra invisible items between nodes having gaps between levels");

  var items = [
    { id: 1, name: "1" },
    { id: 2, parents: [1], name: "2" },
    { id: 3, parents: [1, 4], name: "3" },
    { id: 4, name: "4" }
  ];

  var levels = normalizeLogicalFamilyTask(items);

  var expectedLevels = [
    { "id": "1", "children": ["2", "101"] },
    { "id": "2" },
    { "id": "101", "children": ["3"] },
    { "id": "4", "children": ["3"] },
    { "id": "3" }
  ]

  assert.deepEqual(levels, expectedLevels, "Function eliminates many to many relations between nodes");
});