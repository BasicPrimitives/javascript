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

function getLevels(family) {
  var levels = [];
  family.loopLevels(this, true, function (itemid, item, level) {
    var newItem = { id: itemid };
    var parents = [];
    family.loopParents(this, itemid, function (itemid, item, levelIndex) {
      if (levelIndex > 0) {
        return family.BREAK;
      }
      parents.push(itemid);
    });
    if (parents.length > 0) {
      newItem.parents = parents;
    }
    levels.push(newItem);
  });
  return levels;
}

test('getReversedFamily -Trivial', () => {
  const family = getFamily([
    { id: 1 }, { id: 2, parents: [1]}
  ]);
  const reversedFamily = family.getReversedFamily();


  var levels = getLevels(reversedFamily);
  var expectedResults = [{"id": "2"}, {"id": "1", "parents": ["2"] }];

  expect(reversedFamily.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});

test('getReversedFamily - Less trivial', () => {
  const family = getFamily([
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4, parents: [1, 2, 3] }, { id: 5, parents: [1, 2, 3] },
    { id: 6, parents: [4, 5] }, { id: 7, parents: [4, 5] }, { id: 8, parents: [4, 5] }
  ]);
  const reversedFamily = family.getReversedFamily();


  var levels = getLevels(reversedFamily);
  var expectedResults = [
    { "id": "6" }, { "id": "8" }, { "id": "7" },
    { "id": "4", "parents": ["6", "7", "8"] }, { "id": "5", "parents": ["6", "7", "8"] },
    { "id": "1", "parents": ["4", "5"] }, { "id": "2", "parents": ["4", "5"] }, { "id": "3", "parents": ["4", "5"] }
  ];

  expect(reversedFamily.validate()).toBe(true); 
  expect(levels).toEqual(expectedResults);
});