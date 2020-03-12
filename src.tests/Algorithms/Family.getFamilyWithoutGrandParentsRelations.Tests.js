QUnit.module('Algorithms - Family class, getFamilyWithoutGrandParentsRelations function tests');

QUnit.test("primitives.common.family.getFamilyWithoutGrandParentsRelations - eliminates relations directly connecting grad parents with grand children.", function (assert) {
  function getFamily(items) {
    var family = primitives.common.family();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      family.add(item.parents, item.id, item);
    }
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
  };

  (function () {
    var family = getFamily([
      { id: 1 },
      { id: 2, parents: [1] },
      { id: 3, parents: [1, 2] },
      { id: 4, parents: [1, 2, 3] }
    ]);

    var familyWithoutGrandParentsRelations = family.getFamilyWithoutGrandParentsRelations();
    assert.ok(familyWithoutGrandParentsRelations.validate(), "Result family structure should pass validation");

    var result = getLevels(familyWithoutGrandParentsRelations);
    var expected = [
      { id: "1", children: ["2"] },
      { id: "2", children: ["3"] },
      { id: "3", children: ["4"] },
      { id: "4" }
    ];

    assert.deepEqual(result, expected, "Should return linked list connections without shot custs between generations");
  })();

  (function () {
    var family = getFamily([
      { id: '1', parents: [] },
      { id: '2', parents: [] },
      { id: '3', parents: ['1', '2'] },
      { id: '4', parents: ['1', '2', '3'] },
      { id: '5', parents: ['3'] }
    ]);

    var familyWithoutGrandParentsRelations = family.getFamilyWithoutGrandParentsRelations();
    assert.ok(familyWithoutGrandParentsRelations.validate(), "Result family structure should pass validation");

    var result = getLevels(familyWithoutGrandParentsRelations);
    var expected = [
      { "id": "1", "children": ["3"] },
      { "id": "2", "children": ["3"] },
      { "id": "3", "children": ["4", "5"] },
      { "id": "4" },
      { "id": "5" }
    ];

    assert.deepEqual(result, expected, "Element 4 should break connectors to parents 1 and 2");
  })();

  (function () {
    var family = getFamily([
      { id: '1', parents: [] },
      { id: '2', parents: ['1'] },
      { id: '3', parents: ['2'] }
    ]);

    var familyWithoutGrandParentsRelations = family.getFamilyWithoutGrandParentsRelations();
    assert.ok(familyWithoutGrandParentsRelations.validate(), "Result family structure should pass validation");

    var result = getLevels(familyWithoutGrandParentsRelations);
    var expected = [
      { "id": "1", "children": ["2"], },
      { "id": "2", "children": ["3"], },
      { "id": "3" }
    ];

    assert.deepEqual(result, expected, "Element 4 should break connectors to parents 1 and 2");
  })();
});

