import FamilyNormalizer from './FamilyNormalizer';
import { GroupByType } from '../../../enums';
import Family from '../../../algorithms/Family';

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
  var family = Family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }

  var maximumFamItemId = 100;

  var familyNormalizer = new FamilyNormalizer(true);
  familyNormalizer.normalize({ groupByType: GroupByType.Parents, alignBylevels: false }, family, maximumFamItemId);

  return getLevels(family);
}

test("Function should add extra invisible items between nodes having gaps between levels", () => {
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

  expect(levels).toEqual(expectedLevels);
});
