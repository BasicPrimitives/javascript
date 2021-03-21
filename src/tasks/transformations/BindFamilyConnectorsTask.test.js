import BindFamilyConnectorsTask from './BindFamilyConnectorsTask';
import Family from '../../algorithms/Family';

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

  var task = new BindFamilyConnectorsTask({ getLogicalFamily: () => family, getMaximumId: () => maximumFamItemId });
  task.process();

  return getLevels(task.getLogicalFamily());
}

test("Function should bundle cross relations into single node", () => {
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

  expect(levels).toEqual(expectedLevels);
});

test("Function eliminates many to many relations between nodes", () => {
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
  ];

  expect(levels).toEqual(expectedLevels);
});
