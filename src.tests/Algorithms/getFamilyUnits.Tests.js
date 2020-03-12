QUnit.module('Algorithms - getFamilyUnits');

QUnit.test("primitives.common.getFamilyUnits - Group family into family units for alignment.", function (assert) {

  function getFamily(items) {
    var family = primitives.common.family();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      family.add(item.parents, item.id, item);
    }
    return family;
  }

  (function () {
    var family = getFamily([
      { id: 'A', parents: [] },
      { id: 'K', parents: [] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['A'] },
      { id: 'D', parents: ['A'] },
      { id: 'E', parents: [] },
      { id: 'F', parents: ['K'] },
      { id: 'L', parents: ['K'] },
      { id: 'M', parents: ['K'] },
      { id: 'G', parents: ['B'] },
      { id: 'H', parents: ['D', 'E', 'F'] },
      { id: 'I', parents: ['M'] },
      { id: 'J', parents: ['M'] },
      { id: 'N', parents: ['G'] },
      { id: 'O', parents: ['G'] },
      { id: 'Q', parents: ['H'] },
      { id: 'R', parents: ['H'] },
      { id: 'S', parents: ['H'] },
      { id: 'T', parents: ['I', 'J'] },
      { id: 'P', parents: ['O', 'Q'] },
      { id: 'U', parents: ['S', 'T'] }
    ]);

    var familyUnitsById = primitives.common.getFamilyUnits(family);

    var result = [];
    for (var familyId in familyUnitsById) {
      var familyUnits = familyUnitsById[familyId];
      for (var index = 0; index < familyUnits.length; index += 1) {
        var familyUnit = familyUnits[index];
        result[familyUnit.id] = { id: familyUnit.id, parents: familyUnit.parents.items, children: familyUnit.children.items };
      }
    }

    var expected = [
      { id: 0, parents: ["A"], children: ["B", "C", "D"] },
      { id: 1, parents: ["K"], children: ["F", "L", "M"] },
      { id: 2, parents: ["B"], children: ["G"] },
      { id: 3, parents: ["D", "E", "F"], children: ["H"] },
      { id: 4, parents: ["M"], children: ["I", "J"] },
      { id: 5, parents: ["G"], children: ["N", "O"] },
      { id: 6, parents: ["H"], children: ["Q", "R", "S"] },
      { id: 7, parents: ["I", "J"], children: ["T"] },
      { id: 8, parents: ["O", "Q"], children: ["P"] },
      { id: 9, parents: ["S", "T"], children: ["U"] }
    ];

    assert.deepEqual(result, expected, "getFamilyUnits function creates layout family units out of family structure");
  })();

  (function () {
    var family = getFamily([
      { id: '6', parents: [] },
      { id: '5', parents: ['6'] },
      { id: '2', parents: ['6'] },
      { id: '1', parents: ['6'] },
      { id: '7', parents: ['1', '2'] }
    ]);

    var familyUnitsById = primitives.common.getFamilyUnits(family);

    var result = [];
    for (var familyId in familyUnitsById) {
      var familyUnits = familyUnitsById[familyId];
      for (var index = 0; index < familyUnits.length; index += 1) {
        var familyUnit = familyUnits[index];
        result[familyUnit.id] = { id: familyUnit.id, parents: familyUnit.parents.items, children: familyUnit.children.items };
      }
    }

    var expected = [
      { id: 0, parents: ["1", "2"], children: ["7"] },
      { id: 1, parents: ["6"], children: ["1", "2", "5"] }
    ];

    assert.deepEqual(result, expected, "getFamilyUnits bottom family misses unit 5");
  })();
});