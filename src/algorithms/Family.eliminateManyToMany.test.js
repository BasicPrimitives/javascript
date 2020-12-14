import Family from './Family';

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
  var family = Family();

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
      child.childrenLength += 1;
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

test('eliminateManyToMany - Eliminate many to many relations from family', () => {
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
  
    expect(family.validate() && validate(family)).toBe(true); 
    expect(testOptimizedItems(sourceItems, family)).toBe(true); 
    expect(levels).toEqual(expectedResults);
});