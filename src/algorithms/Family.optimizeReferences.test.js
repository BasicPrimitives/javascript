import Family from './Family';

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
  
test('optimizeReferences - Full bundle 3 by 4', () => {
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

    expect(family.validate()).toBe(true);
    expect(levels).toEqual(expectedResults);
});
 
test('optimizeReferences - Nested item and parent together overlap with 3d item optimization test', () => {
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
      { "id": "5" }, { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});
  
test('optimizeReferences - Chained 5 elements having 3 target items. Every item overlaps its neighbours with 2 shared items. Optimization test.', () => {
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
      { "id": "6" }, { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }, { "id": "5" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});
  
test('optimizeReferences - Chained 4 elements having 4 target items. Every item overlaps its neighbours with 2 shared items. Optimization test.', () => {
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
        { "id": "4" }, { "id": "5" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});

test('optimizeReferences - One item containing all other items. Duplicates. Overlapping sub item. Optimization test.', () => {
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
        { "id": "4" }, { "id": "6" }, { "id": "7" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});

test('optimizeReferences - Nesting 5 items. Optimization test', () => {
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
        { "id": "0" }, { "id": "1" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});
  
test('optimizeReferences - Test 2 non-connected clusters of items. All items reference the same target items via group items. Optimization test.', () => {
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
        { "id": "9" }, { "id": "2" }, { "id": "3" }, { "id": "6" }, { "id": "7" }
    ];

    expect(family.validate()).toBe(true);
    expect(testOptimizedItems(sourceItems, family)).toBe(true);
    expect(levels).toEqual(expectedResults);
});

 
test('optimizeReferences - Test regrouping of items belonging to several layers. Optimization consistency test.', () => {
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
        { "id": "D" }, { "id": "D2" }
    ];

    expect(family.validate()).toBe(true);
    expect(levels).toEqual(expectedResults);
});  