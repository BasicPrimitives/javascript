

/* /Algorithms/binarySearch.Tests.js*/
QUnit.module('Algorithms - Binary Search Function');

QUnit.test("primitives.common.binarySearch -  Search sorted list of elements for nearest item.", function (assert) {
	var items = [
		new primitives.common.Point(10, 10),
		new primitives.common.Point(15, 10),
		new primitives.common.Point(16, 10),
		new primitives.common.Point(20, 10),
		new primitives.common.Point(50, 10),
		new primitives.common.Point(100, 10),
		new primitives.common.Point(140, 10)
	];

	var result = primitives.common.binarySearch(items, function (item, offset) {
		return 4 - item.x;
	});

	assert.equal(result.item.x, 10, "Search for item beyound left boundary of the collection should return leftmost item.");

	result = primitives.common.binarySearch(items, function (item, offset) {
		return 200 - item.x;
	});

	assert.equal(result.item.x, 140, "Search for item beyound right boundary of the collection should return the rightmost item.");

	result = primitives.common.binarySearch(items, function (item, offset) {
		return 60 - item.x;
	});

	assert.equal(result.item.x, 50, "Function should find item nearest to 60.");

	result = primitives.common.binarySearch(items, function (item, offset) {
		return 90 - item.x;
	});

	assert.equal(result.item.x, 100, "Function should item nearest 90.");
});

/* /Algorithms/Family.getFamilyWithoutGrandParentsRelations.Tests.js*/
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
			{ "id": "3"}
		];

		assert.deepEqual(result, expected, "Element 4 should break connectors to parents 1 and 2");
	})();
});



/* /Algorithms/Family.getPlanarFamily.Tests.js*/
QUnit.module('Algorithms - Family class, getPlanarFamily function tests');

QUnit.test("primitives.common.family.getPlanarFamily - Function eliminates some relations in family, so they don;t cross each other.", function (assert) {
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

	function getTreeLevels(levels) {
		var treeLevels = primitives.common.TreeLevels();
		for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
			var level = levels[levelIndex];
			for (var index = 0, len = level.length; index < len; index += 1) {
				treeLevels.addItem(levelIndex, level[index], {});
			}
		}
		return treeLevels;
	};

	(function () {
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5, parents: [1] },
			{ id: 6, parents: [1] },
			{ id: 7, parents: [2, 3] },
			{ id: 8, parents: [4] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2, 3, 4],
			[5, 6, 7, 8]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = getLevels(family);
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should return the same family structure without changes");
	})();

	(function () {
		// Test elimination of edge in two intersecting hierarchies
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3, parents: [1] },
			{ id: 4, parents: [2] },
			{ id: 5, parents: [1] },
			{ id: 6, parents: [2] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2],
			[3, 4, 5, 6]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = [{ "id": "1", "children": ["3", "5"] }, { "id": "2", "children": ["6"] }, { "id": "3" }, { "id": "5" }, { "id": "6" }];
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should break edge 1-5");
	})();

	(function () {
		// Test elimination of edge in two intersecting hierarchies
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3, parents: [1] },
			{ id: 4, parents: [2] },
			{ id: 5, parents: [2] },
			{ id: 6, parents: [1] },
			{ id: 7, parents: [2] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2],
			[3, 4, 5, 6, 7]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = [{ "id": "1", "children": ["3"] }, { "id": "2", "children": ["4", "5", "7"] }, { "id": "3" }, { "id": "4" }, { "id": "5" }, { "id": "7" }];
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should break edge 1-6 because it cross 2 other relations");
	})();

	(function () {
		// Test elimination of edge in two intersecting hierarchies
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5, parents: [1, 2, 3] },
			{ id: 6, parents: [2, 3, 4] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2, 3, 4],
			[5, 6]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = [{ "id": "1", "children": ["5"] }, { "id": "2", "children": ["5", "6"] }, { "id": "4", "children": ["6"] }, { "id": "3", "children": ["6"] }, { "id": "5" }, { "id": "6" }];
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should break edge 3-5");
	})();

	(function () {
		// Test elimination of edge in two intersecting hierarchies
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5, parents: [1, 2, 3] },
			{ id: 6, parents: [1, 3, 4] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2, 3, 4],
			[5, 6]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = [{ "id": "1", "children": ["5"] }, { "id": "3", "children": ["5", "6"] }, { "id": "2", "children": ["5"] }, { "id": "4", "children": ["6"] }, { "id": "5" }, { "id": "6" }];
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should break edge 1-6 because it crosses 2 relations");
	})();

	(function () {
		// Test elimination of edge should create orphant in the second level of children
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5, parents: [4] },
			{ id: 6, parents: [1] },
			{ id: 7, parents: [2] },
			{ id: 8, parents: [3] }
		]);

		var treeLevels = getTreeLevels([
			[1, 2, 3, 4],
			[5, 6, 7, 8]
		]);

		var planarFamily = family.getPlanarFamily(treeLevels);

		var expectedResult = [{ "id": "1", "children": ["6"] }, { "id": "2", "children": ["7"] }, { "id": "3", "children": ["8"] }, { "id": "6" }, { "id": "7" }, { "id": "8" }];
		var result = getLevels(planarFamily);
		assert.ok(planarFamily.validate(), "Family structure should pass internal structure validation");
		assert.deepEqual(result, expectedResult, "Function should make item 5 orphant");
	})();
});

/* /Algorithms/Family.groupBy.Tests.js*/
QUnit.module('Algorithms - Family class, groupBy function tests');

QUnit.test("primitives.common.family.groupBy - Function groups nodes having single common parent and child.", function (assert) {
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
			{ id: 1 },
			{ id: 2, parents: [1] },
			{ id: 3, parents: [1] },
			{ id: 4, parents: [1] },
			{ id: 5, parents: [1] },
			{ id: 6, parents: [1] },
			{ id: 7, parents: [1] },
			{ id: 8, parents: [1] },
		]);

		var result = [];
		var planarFamily = family.groupBy(this, 2, function (parentid, childid, nodes) {
			result.push({
				parent: parentid,
				child: childid,
				nodes: nodes
			})
		});

		var expectedResult = [
			{ parent: "1", child: null, nodes: ["2", "3", "4", "5", "6", "7", "8"] }
		];
		assert.deepEqual(result, expectedResult, "Function should group nodes sharing the same parent together");
	})();

	(function () {
		var family = getFamily([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
			{ id: 7 },
			{ id: 8, parents: [1, 2, 3, 4, 5, 6, 7] }
		]);

		var result = [];
		var planarFamily = family.groupBy(this, 2, function (parentid, childid, nodes) {
			result.push({
				parent: parentid,
				child: childid,
				nodes: nodes
			})
		});

		var expectedResult = [
			{ parent: null, child: "8", nodes: ["1", "2", "3", "4", "5", "6", "7"] }
		];
		assert.deepEqual(result, expectedResult, "Function should group nodes sharing the same child together");
	})();

	(function () {
		var family = getFamily([
			{ id: 1 },
			{ id: 2, parents: [1] },
			{ id: 3, parents: [1] },
			{ id: 4, parents: [1] },
			{ id: 5, parents: [1] },
			{ id: 6, parents: [1] },
			{ id: 7, parents: [1] },
			{ id: 8, parents: [1] },
			{ id: 9, parents: [2, 3, 4, 5, 6, 7, 8] },
		]);

		var result = [];
		var planarFamily = family.groupBy(this, 2, function (parentid, childid, nodes) {
			result.push({
				parent: parentid,
				child: childid,
				nodes: nodes
			})
		});

		var expectedResult = [
			{ parent: "1", child: "9", nodes: ["2", "3", "4", "5", "6", "7", "8"] }
		];
		assert.deepEqual(result, expectedResult, "Function should group nodes sharing the same parent and child together");
	})();

	(function () {
		var family = getFamily([
		{ id: 1, parents: [] },
		{ id: 2, parents: [1] },
		{ id: 3, parents: [1] },
		{ id: 4, parents: [1] },
		{ id: 5, parents: [1] },
		{ id: 6, parents: [1] },
		{ id: 7, parents: [1] },
		{ id: 8, parents: [1] },
		{ id: 9, parents: [1] },
		{ id: 10, parents: [1] },
		{ id: 11, parents: [1] },
		{ id: 12, parents: [1] },
		{ id: 13, parents: [1] },
		{ id: 14, parents: [1] },
		{ id: 15, parents: [1] },
		{ id: 16, parents: [1] },
		{ id: 17, parents: [1] },
		{ id: 18, parents: [1] },
		{ id: 19, parents: [1] },
		{ id: 20, parents: [1] },

		{ id: 21, parents: [5] },
		{ id: 22, parents: [5] },
		{ id: 23, parents: [5] },
		{ id: 24, parents: [5] },
		{ id: 25, parents: [5] },
		{ id: 26, parents: [5] },

		{ id: 27, parents: [26] },
		{ id: 28, parents: [26] },
		{ id: 29, parents: [26] },
		{ id: 30, parents: [26] },
		{ id: 31, parents: [26, 9] },
		]);

		var result = [];
		var planarFamily = family.groupBy(this, 2, function (parentid, childid, nodes) {
			result.push({
				parent: parentid,
				child: childid,
				nodes: nodes
			})
		});

		var expectedResult = [
			{ parent: "1", child: null, nodes: ["2", "3", "4", "6", "7", "8", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"] },
			{ parent: "5", child: null, nodes: ["21", "22", "23", "24", "25"] },
			{ parent: "26", child: null, nodes: ["27", "28", "29", "30"] }
		];
		assert.deepEqual(result, expectedResult, "General case test");
	})();
});

/* /Algorithms/Family.Tests.js*/
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


/* /Algorithms/FamilyAlignment.Tests.js*/
QUnit.module('Algorithms - FamilyAlignment calculate distances between nodes in family accounting for space for children and parents');

QUnit.test("primitives.common.FamilyAlignment - Horizontal alignment of family nodes.", function (assert) {

	function getFamily(items) {
		var family = primitives.common.family();
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			family.add(item.parents, item.id, item);
		}
		return family;
	}

	function getTreeLevels(levels) {
		var treeLevels = primitives.common.TreeLevels();
		for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
			var level = levels[levelIndex];
			for (var index = 0, len = level.length; index < len; index += 1) {
				treeLevels.addItem(levelIndex, level[index], {});
			}
		}
		return treeLevels;
	};

	function getPlacements(treeLevels, familyAlignment, isBig) {
		var placements = {};

		treeLevels.loopLevels(this, function (levelIndex, level) {
			treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
				var nodeOffset = familyAlignment.getOffset(nodeid);
				if (isBig == null || isBig.hasOwnProperty(nodeid)) {
					placements[nodeid] = new primitives.common.Rect(nodeOffset - 25, levelIndex * 50, 50, 40);
				} else {
					placements[nodeid] = new primitives.common.Rect(nodeOffset - 1, levelIndex * 50, 2, 40);
				}
			})
		});

		return placements;
	}

	function countPlacementsOverlaps(treeLevels, placements) {
		var result = 0;

		treeLevels.loopLevels(this, function (levelIndex, level) {
			treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
				if (position > 0) {
					var prevNodeId = treeLevels.getItemAtPosition(levelIndex, position - 1);
					var prevPlacement = placements[prevNodeId];
					var nodePlacement = placements[nodeid];

					if (prevPlacement.overlaps(nodePlacement)) {
						result += 1;
					}
				}
			})
		});

		return result;
	}

	function GetPlacementMarker(placement, label, color) {
		var div = jQuery("<div></div>");

		div.append(label);
		div.css(placement.getCSS());
		div.css({
			"background": color,
			visibility: "visible",
			position: "absolute",
			font: "Areal",
			"font-size": "12px",
			"border-style": "solid",
			"border-color": "black",
			"border-width": "2px"
		});

		return div;
	}

	function ShowLayout(fixture, placements, title) {
		var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
		titlePlaceholder.append(title);
		fixture.append(titlePlaceholder);

		var offsetX = null;
		var offsetY = null;
		var space = new primitives.common.Rect();
		for (var key in placements) {
			if (placements.hasOwnProperty(key)) {
				var placement = placements[key];

				offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
				offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

				space.addRect(placement);
			}
		}

		var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
		placeholder.css({
			width: space.width,
			height: space.height
		});
		for (var key in placements) {
			if (placements.hasOwnProperty(key)) {
				var placement = new primitives.common.Rect(placements[key]);
				placement.translate(-offsetX, -offsetY);

				var div = GetPlacementMarker(placement, key, "grey");
				placeholder.append(div);
			}
		}

		
		fixture.append(placeholder);
	}

	function TestLayout(title, familyItems, treeLevelsItems, sized) {
		var family = getFamily(familyItems);
		var treeLevels = getTreeLevels(treeLevelsItems);

		var isBig = null;
		if (sized != null) {
			isBig = {};
			for (var index = 0; index < sized.length; index += 1) {
				isBig[sized[index]] = true;
			}
		}

		var familyAlignment = new primitives.common.FamilyAlignment(this, family, treeLevels, function (nodeid, node) {
			if (isBig == null || isBig.hasOwnProperty(nodeid)) {
				return 6 + 50 + 6;
			} else {
				return 6 + 2 + 6;
			}
		});

		var placements = getPlacements(treeLevels, familyAlignment, isBig);

		ShowLayout(jQuery("#qunit-fixture"), placements, title);

		jQuery("#qunit-fixture").css({
			position: "relative",
			left: "0px",
			top: "0px",
			height: "Auto"
		});

		var result = countPlacementsOverlaps(treeLevels, placements);

		assert.equal(result, 0, title);
	};

	(function () {
		TestLayout("Empty family layout", [
			{}
		], [
			[]
		]);
	})();


	(function () {
		TestLayout("Single node family layout", [
			{ id: 'A', parents: [] }
		], [
			['A']
		]);
	})();

	(function () {
		TestLayout("Side by side 2 families where the left one starts one generation below", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: ['1'] }
		], [
			['1'],
			['2', '3']
		]);
	})();

	(function () {
		TestLayout("Side by side families", [
			{ id: '1', parents: [] },
			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '2', parents: [] },
			{ id: '5', parents: ['2'] },
			{ id: '6', parents: ['2'] }
		], [
			['1', '2'],
			['3', '4', '5', '6']
		]);
	})();

	(function () {
		TestLayout("Internal orphan family", [
			{ id: '1', parents: [] },

			{ id: '2', parents: ['1'] },
			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '5', parents: ['2', '3'] },
			{ id: '6', parents: [] },
			{ id: '7', parents: ['4'] },
			{ id: '8', parents: ['4'] },
			{ id: '9', parents: ['6'] },
			{ id: '10', parents: ['6'] },
			{ id: '11', parents: ['5', '7', '8'] }
		], [
			['1'],
			['2', '3', '6', '4'],
			['5', '9', '10', '7', '8'],
			['11']
		]);
	})();

	(function () {
		TestLayout("Side by side and upside-down families", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: [] },
			{ id: '4', parents: ['1'] },
			{ id: '5', parents: ['1'] },
			{ id: '6', parents: ['2', '3'] }
		], [
			['1', '2', '3'],
			['4', '5', '6']
		]);
	})();

	(function () {
		TestLayout("Family diagram horizontal alignment with multiple cycles", [
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
		], [
				['A', 'K'],
				['B', 'C', 'D', 'E', 'F', 'L', 'M'],
				['G', 'H', 'I', 'J'],
				['N', 'O', 'Q', 'R', 'S', 'T'],
				['P', 'U']
		]);
	})();

	(function () {
		TestLayout("Family diagram large rombus alignment", [
				{ id: 'A2', parents: [] },
				{ id: 'A', parents: ['A2'] },
				{ id: 'B', parents: ['A'] },
				{ id: 'C', parents: ['A'] },
				{ id: 'D', parents: ['A'] },
				{ id: 'E', parents: ['B', 'C', 'D'] },
				{ id: 'A1', parents: ['A2'] },
				{ id: 'B1', parents: ['A1'] },
				{ id: 'C1', parents: ['A1'] },
				{ id: 'D1', parents: ['A1'] },
				{ id: 'E1', parents: ['B1', 'C1', 'D1'] },
				{ id: 'E2', parents: ['E', 'E1'] },
		], [
				['A2'],
				['A', 'A1'],
				['B', 'C', 'D', 'B1', 'C1', 'D1'],
				['E', 'E1'],
				['E2']
		]);
	})();

	(function () {
		TestLayout("Small Sand clock family layout", [
			{ id: 'A', parents: [] },
			{ id: 'B', parents: [] },
			{ id: 'C', parents: ['A', 'B'] },
			{ id: 'D', parents: ['C'] },
			{ id: 'E', parents: ['C'] }
		], [
			['A', 'B'],
			['C'],
			['D', 'E']
		]);
	})();

	(function () {
		TestLayout("Small Rombus family layout", [
			{ id: 'A', parents: [] },
			{ id: 'B', parents: ['A'] },
			{ id: 'C', parents: ['A'] },
			{ id: 'D', parents: ['B', 'C'] }
		], [
			['A'],
			['B', 'C'],
			['D']
		]);
	})();

	(function () {
		TestLayout("Regular tree family layout", [
			{ id: 'A', parents: [] },
			{ id: 'B', parents: ['A'] },
			{ id: 'C', parents: ['A'] },
			{ id: 'D', parents: ['B'] },
			{ id: 'E', parents: ['B'] },
			{ id: 'F', parents: ['C'] },
			{ id: 'G', parents: ['C'] }
		], [
			['A'],
			['B', 'C'],
			['D', 'E', 'F', 'G']
		]);
	})();

	(function () {
		TestLayout("Upside-down tree family layout", [
			{ id: 'A', parents: [] },
			{ id: 'B', parents: [] },
			{ id: 'C', parents: [] },
			{ id: 'D', parents: [] },
			{ id: 'E', parents: ['A', 'B'] },
			{ id: 'F', parents: ['C', 'D'] },
			{ id: 'G', parents: ['E', 'F'] }
		], [
			['A', 'B', 'C', 'D'],
			['E', 'F'],
			['G']
		]);
	})();

	(function () {
		TestLayout("2 Cross Relations Demo family layout", [
			{ id: '2', parents: [] },
			{ id: '1', parents: [] },
			{ id: '8', parents: ['2'] },
			{ id: '6', parents: ['2'] },
			{ id: '7', parents: ['2'] },
			{ id: '5', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '3', parents: ['1'] },
			{ id: '12', parents: ['8'] },
			{ id: '11', parents: ['7', '5'] },
			{ id: '10', parents: ['4'] },
			{ id: '9', parents: ['3'] }
		], [
			['2', '1'],
			['8', '6', '7', '5', '4', '3'],
			['12', '11', '10', '9']
		]);
	})();

	(function () {
		TestLayout("Family unit overlaps node between parents", [
			{ id: '6', parents: [] },
			{ id: '5', parents: ['6'] },
			{ id: '2', parents: ['6'] },
			{ id: '1', parents: [] },
			{ id: '7', parents: ['1', '2'] },
			{ id: '3', parents: ['7'] },
			{ id: '4', parents: ['7'] }
		], [
			['6'],
			['1', '5', '2'],
			['7'],
			['3', '4']
		]);
	})();

	(function () {
		TestLayout("Family unit overlaps node between children", [
			{ id: '3', parents: [] },
			{ id: '4', parents: [] },
			{ id: '7', parents: ['3', '4'] },
			{ id: '1', parents: ['7'] },
			{ id: '5', parents: [] },
			{ id: '2', parents: ['7'] },
			{ id: '6', parents: ['5', '2'] }
		], [
			['3', '4'],
			['7'],
			['1', '5', '2'],
			['6']
		]);
	})();

	(function () {
		TestLayout("Cycle 2", [
			{ id: '1', parents: [] },
			{ id: '2', parents: ['1'] },
			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '5', parents: ['1'] },
			{ id: '6', parents: ['1'] },
			{ id: '7', parents: ['1'] },
			{ id: '8', parents: ['1'] },
			{ id: '9', parents: ['1'] },
			{ id: '10', parents: ['1'] },

			{ id: '11', parents: ['9'] },
			{ id: '12', parents: ['9'] },
			{ id: '13', parents: ['9'] },
			{ id: '14', parents: ['9'] },
			{ id: '15', parents: ['9'] },
			{ id: '16', parents: ['9'] },
			{ id: '17', parents: ['10'] },

			{ id: '18', parents: ['11'] },
			{ id: '19', parents: [] },
			{ id: '20', parents: [] },
			{ id: '21', parents: [] },
			{ id: '22', parents: [] },
			{ id: '23', parents: [] },
			{ id: '24', parents: [] },
			{ id: '25', parents: ['17'] },

			{ id: '26', parents: ['18', '19', '20', '21', '22', '23', '24', '25'] }
		], [
			['1'],
			['2', '3', '4', '5', '6', '7', '8', '9', '10'],
			['11', '12', '13', '14', '15', '16', '17'],
			['18', '19', '20', '21', '22', '23', '24', '25'],
			['26']
		]);
	})();

	(function () {
		TestLayout("Large sandclock", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: [] },
			{ id: '4', parents: [] },
			{ id: '5', parents: ['1', '2'] },
			{ id: '6', parents: ['3', '4'] },
			{ id: '7', parents: ['5', '6'] },
			{ id: '8', parents: ['7'] },
			{ id: '9', parents: ['7'] },
			{ id: '10', parents: ['8'] },
			{ id: '11', parents: ['8'] },
			{ id: '12', parents: ['9'] },
			{ id: '13', parents: ['9'] }
		], [
			['1', '2', '3', '4'],
			['5', '6'],
			['7'],
			['8', '9'],
			['10', '11', '12', '13']
		]);
	})();

	(function () {
		TestLayout("Fance layout", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },

			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '5', parents: ['2'] },
			{ id: '6', parents: ['2'] },

			{ id: '7', parents: ['3'] },
			{ id: '8', parents: ['4', '5'] },
			{ id: '9', parents: ['6'] },

			{ id: '10', parents: ['7'] },
			{ id: '11', parents: ['8'] },
			{ id: '12', parents: ['8'] },
			{ id: '13', parents: ['9'] },

			{ id: '14', parents: ['10', '11'] },
			{ id: '15', parents: ['12', '13'] }
		], [
			['1', '2'],
			['3', '4', '5', '6'],
			['7', '8', '9'],
			['10', '11', '12', '13'],
			['14', '15']
		]);
	})();

	(function () {
		TestLayout("Wave layout", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: [] },
			{ id: '4', parents: [] },

			{ id: '5', parents: ['1'] },
			{ id: '6', parents: ['1'] },
			{ id: '7', parents: ['2'] },
			{ id: '8', parents: ['2'] },
			{ id: '9', parents: ['3'] },
			{ id: '10', parents: ['3'] },
			{ id: '11', parents: ['4'] },

			{ id: '12', parents: ['5'] },
			{ id: '13', parents: ['6', '7'] },
			{ id: '14', parents: ['8', '9'] },
			{ id: '15', parents: ['10', '11'] }
		], [
			['1', '2', '3', '4'],
			['5', '6', '7', '8', '9', '10', '11'],
			['12', '13', '14', '15']
		]);
	})();

	(function () {
		TestLayout("Skewed rombus layout", [
			{ id: '1', parents: ['1'] },
			{ id: '2', parents: ['1'] },
			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },
			{ id: '5', parents: ['1'] },
			{ id: '6', parents: ['1'] },

			{ id: '7', parents: ['2'] },
			{ id: '8', parents: ['2'] },
			{ id: '9', parents: ['2'] },
			{ id: '10', parents: ['6'] },
			{ id: '11', parents: ['6'] },

			{ id: '12', parents: ['7'] },
			{ id: '13', parents: [] },
			{ id: '14', parents: [] },
			{ id: '15', parents: [] },
			{ id: '16', parents: ['11'] },

			{ id: '17', parents: ['12', '13'] },
			{ id: '18', parents: ['14', '15', '16'] },

			{ id: '19', parents: ['17', '18'] }
		], [
			['1'],
			['2', '3', '4', '5', '6'],
			['7', '8', '9', '10', '11'],
			['12', '13', '14', '15', '16'],
			['17', '18'],
			['19']
		]);
	})();

	(function () {
		TestLayout("3 Cross Relations Test Layout", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: [] },
			{ id: '4', parents: [] },
			{ id: '5', parents: [] },

			{ id: '6', parents: ['1', '2'] },
			{ id: '7', parents: ['3'] },
			{ id: '8', parents: ['4'] },
			{ id: '9', parents: ['4'] },
			{ id: '10', parents: ['5'] },


			{ id: '11', parents: ['6'] },
			{ id: '12', parents: ['7', '8'] },
			{ id: '13', parents: ['9', '10'] },

			{ id: '14', parents: ['11'] },
			{ id: '15', parents: ['11'] },
			{ id: '16', parents: ['12'] },
			{ id: '17', parents: ['12'] },
			{ id: '18', parents: ['12'] },
			{ id: '19', parents: ['13'] },
			{ id: '20', parents: ['13'] },

			{ id: '21', parents: ['14'] },
			{ id: '22', parents: ['15', '16'] },
			{ id: '23', parents: ['20'] },

			{ id: '24', parents: ['21'] },
			{ id: '25', parents: ['21'] },
			{ id: '26', parents: ['22'] },
			{ id: '27', parents: ['22'] },
			{ id: '28', parents: ['23'] },
			{ id: '29', parents: ['23'] }
		], [
			['1', '2', '3', '4', '5'],
			['6', '7', '8', '9', '10'],
			['11', '12', '13'],
			['14', '15', '16', '17', '18', '19', '20'],
			['21', '22', '23'],
			['24', '25', '26', '27', '28', '29']
		]);
	})();

	(function () {
		TestLayout("Skipped Members Test Layout", [
			{ id: '1', parents: [] },
			{ id: '2', parents: [] },
			{ id: '3', parents: [] },
			{ id: '4', parents: [] },
			{ id: '5', parents: [] },
			{ id: '6', parents: [] },

			{ id: '7', parents: ['1', '2'] },
			{ id: '8', parents: ['3', '4'] },
			{ id: '9', parents: ['5', '6'] },

			{ id: '10', parents: ['7'] },
			{ id: '11', parents: ['7'] },
			{ id: '12', parents: ['8'] },
			{ id: '13', parents: ['8'] },
			{ id: '14', parents: ['9'] },
			{ id: '15', parents: ['9'] },

			{ id: '16', parents: ['10'] },
			{ id: '17', parents: ['11'] },
			{ id: '18', parents: ['11'] },
			{ id: '19', parents: ['12'] },
			{ id: '20', parents: ['13'] },
			{ id: '21', parents: ['13'] },
			{ id: '22', parents: ['14'] },
			{ id: '23', parents: ['14'] },
			{ id: '241', parents: ['15'] },

			{ id: '24', parents: ['17'] },
			{ id: '25', parents: ['18'] },
			{ id: '26', parents: ['19', '20'] },
			{ id: '27', parents: ['21'] },
			{ id: '28', parents: ['22'] },
			{ id: '29', parents: ['23', '241'] },

			{ id: '30', parents: ['24'] },
			{ id: '31', parents: ['25'] },
			{ id: '32', parents: ['26'] },
			{ id: '33', parents: ['26'] },
			{ id: '34', parents: ['27'] },
			{ id: '35', parents: ['28'] },
			{ id: '36', parents: ['29'] },

			{ id: '37', parents: ['30'] },
			{ id: '38', parents: ['31', '32'] },
			{ id: '39', parents: ['34'] },
			{ id: '40', parents: ['35'] },
			{ id: '41', parents: ['36'] },

		], [
			['1', '2', '3', '4', '5', '6'],
			['7', '8', '9'],
			['10', '11', '12', '13', '14', '15'],
			['16', '17', '18', '19', '20', '21', '22', '23', '241'],
			['24', '25', '26', '27', '28', '29'],
			['30', '31', '32', '33', '34', '35', '36'],
			['37', '38', '39', '40', '41']
		], [
			'1', '2', '3', '4', '5', '6', '11', '13', '14', '37', '38', '39', '40', '41'
		]);
	})();

	(function () {
		TestLayout("Left spiral layout", [
			{ id: '1', parents: [] },

			{ id: '2', parents: ['1'] },
			{ id: '3', parents: [] },
			{ id: '4', parents: ['1'] },

			{ id: '5', parents: ['2'] },
			{ id: '6', parents: ['3'] },
			{ id: '7', parents: [] },
			{ id: '8', parents: ['3'] },

			{ id: '9', parents: ['5'] },
			{ id: '10', parents: ['6'] },
			{ id: '11', parents: ['7'] },
			{ id: '12', parents: ['7'] },
			{ id: '13', parents: ['8'] },

			{ id: '14', parents: ['9'] },
			{ id: '15', parents: ['10', '12'] },
			{ id: '16', parents: ['13'] },

			{ id: '17', parents: ['14', '16'] }
		], [
			['1'],
			['2', '3', '4'],
			['5', '6', '7', '8'],
			['9', '10', '11', '12', '13'],
			['14', '15', '16'],
			['17']
		]);
	})();

	(function () {
		TestLayout("Right spiral layout", [
			{ id: '1', parents: [] },

			{ id: '2', parents: ['1'] },
			{ id: '3', parents: [] },
			{ id: '4', parents: ['1'] },

			{ id: '5', parents: ['3'] },
			{ id: '6', parents: [] },
			{ id: '7', parents: ['3'] },
			{ id: '8', parents: ['4'] },

			{ id: '9', parents: ['5'] },
			{ id: '10', parents: ['6'] },
			{ id: '11', parents: ['6'] },
			{ id: '12', parents: ['7'] },
			{ id: '13', parents: ['8'] },

			{ id: '14', parents: ['9'] },
			{ id: '15', parents: ['10', '12'] },
			{ id: '16', parents: ['13'] },

			{ id: '17', parents: ['14', '16'] }
		], [
			['1'],
			['2', '3', '4'],
			['5', '6', '7', '8'],
			['9', '10', '11', '12', '13'],
			['14', '15', '16'],
			['17']
		]);
	})();

	(function () {
		TestLayout("Alignment of items having variable width", [
			{ id: '1', parents: [] },

			{ id: '2', parents: ['1'] },
			{ id: '3', parents: ['1'] },
			{ id: '4', parents: ['1'] },

			{ id: '6', parents: ['2'] },
			{ id: '7', parents: ['3', '4'] }
		], [
			['1'],
			['2', '3', '4'],
			['6', '7']
		], [
			'1', '4', '6', '7'
		]);
	})();
});

/* /Algorithms/FamilyMargins.Tests.js*/
QUnit.module('Algorithms - FamilyMargins structure helps to calculate space and place family siblings side by side');

QUnit.test("primitives.common.FamilyMargins", function (assert) {

	function getMargins(margins) {
		var result = [];
		margins.loop(this, function (level, left, right) {
			result[level] = [left, right];
		})
		return result;
	}

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(20, 0);
		margins.add(30, 0);
		margins.add(10, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-5, 5],
			[-15, 15],
			[-10, 10]
		];

		assert.deepEqual(result, expectedResult, "loop of levels in FamilyMargins object");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(8, 0);
		margins.add(10, 0);
		margins.add(40, 0);
		margins.add(60, 0);
		margins.add(80, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(80, 1);
		margins2.add(120, 1);
		margins2.add(20, 1);

		assert.equal(margins.getDistanceTo(margins2), 40, "getDistanceTo - left margins are deeper than right");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(80, 0);
		margins.add(120, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(8, 1);
		margins2.add(10, 1);
		margins2.add(40, 1);
		margins2.add(60, 1);
		margins2.add(80, 1);

		assert.equal(margins.getDistanceTo(margins2), 40, "getDistanceTo - right margins are deeper than left");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(80, 1);

		assert.equal(margins.getDistanceTo(margins2), null, "getDistanceTo - left margins are empty");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(8, 0);
		margins.add(10, 0);
		margins.add(40, 0);
		margins.add(60, 0);
		margins.add(80, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(80, 1);
		margins2.add(120, 1);
		margins2.add(20, 1);

		margins.merge(margins2, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-70, 70],
			[-60, 120],
			[-50, 100],
			[-35, -25],
			[-34, -26]
		];

		assert.deepEqual(result, expectedResult, "merge - left margins are deeper than right");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(80, 0);
		margins.add(120, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(8, 1);
		margins2.add(10, 1);
		margins2.add(40, 1);
		margins2.add(60, 1);
		margins2.add(80, 1);

		margins.merge(margins2, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-70, 70],
			[-120, 60],
			[-100, 50],
			[25, 35],
			[26, 34]
		];

		assert.deepEqual(result, expectedResult, "merge - right margins are deeper than left");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(80, 0);
		margins.add(120, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(8, 1);
		margins2.add(10, 1);
		margins2.add(40, 1);
		margins2.add(60, 1);
		margins2.add(80, 1);

		margins.merge(margins2, 20);

		var result = getMargins(margins);

		var expectedResult = [
			[-80, 80],
			[-130, 70],
			[-110, 60],
			[35, 45],
			[36, 44]
		];

		assert.deepEqual(result, expectedResult, "merge - right margins are deeper than left and interval is added");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(20, 1);

		var margins3 = new primitives.common.FamilyMargins();
		margins3.add(30, 2);

		merged = new primitives.common.FamilyMargins();

		merged.merge(margins, 10);
		merged.merge(margins2, 10);
		merged.merge(margins3, 10);

		var result = getMargins(merged);

		var expectedResult = [
			[-45, 45]
		];

		assert.deepEqual(result, expectedResult, "merge - 3 elements side by side");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(10, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(20, 1);
		margins2.add(20, 1);

		var margins3 = new primitives.common.FamilyMargins();
		margins3.add(20, 2);
		margins3.add(30, 2);

		margins.merge(margins2, 10);
		margins.merge(margins3, 10);

		var result = getMargins(margins);

		var expectedResult = [
			[-45, 45],
			[-40, 40]
		];

		assert.deepEqual(result, expectedResult, "merge - 3 families having 2 generations side by side");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(50, 0);
		margins.add(50, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(50, 1);

		margins.merge(margins2, 20);

		var result = getMargins(margins);

		var expectedResult = [
			[-60, 60],
			[-60, -10]
		];

		assert.deepEqual(result, expectedResult, "merge - family having 2 generations with family having one generation only");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(20, 0);
		margins2.add(20, 0);

		margins.merge(margins2);

		var result = getMargins(margins);

		var expectedResult = [
			[-10, 10],
			[-10, 10]
		];

		assert.deepEqual(result, expectedResult, "merge - empty family with non empty");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(20, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();


		var expectedResult = [
			[-10, 10],
			[-10, 10]
		];

		margins.merge(new primitives.common.FamilyMargins());

		var result = getMargins(margins);

		assert.deepEqual(result, expectedResult, "merge - non empty family with empty");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(10, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(10, 1);

		margins.attach(margins2, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-5, 15]
		];

		assert.deepEqual(result, expectedResult, "attach - one family to another");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(8, 0);
		margins.add(10, 0);
		margins.add(40, 0);
		margins.add(60, 0);
		margins.add(80, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(80, 1);
		margins2.add(120, 1);
		margins2.add(20, 1);

		margins.attach(margins2, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-40, 100],
			[-30, 150],
			[-20, 130],
			[-5, 5],
			[-4, 4]
		];

		assert.deepEqual(result, expectedResult, "attach - left margins are deeper than right");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();
		margins.add(80, 0);
		margins.add(120, 0);
		margins.add(20, 0);

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(8, 1);
		margins2.add(10, 1);
		margins2.add(40, 1);
		margins2.add(60, 1);
		margins2.add(80, 1);

		margins.attach(margins2, 0);

		var result = getMargins(margins);

		var expectedResult = [
			[-10, 130],
			[-60, 120],
			[-40, 110],
			[85, 95],
			[86, 94]
		];

		assert.deepEqual(result, expectedResult, "attach - right margins are deeper than left");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(10, 0);

		margins.attach(margins2, 20);

		var result = getMargins(margins);

		var expectedResult = [
			[15, 25]
		];

		assert.deepEqual(result, expectedResult, "attach - single generation family to empty family with positive interval");
	})();

	(function () {
		var margins = new primitives.common.FamilyMargins();

		var margins2 = new primitives.common.FamilyMargins();
		margins2.add(10, 0);

		margins.attach(margins2, -20);

		var result = getMargins(margins);

		var expectedResult = [
			[-25, -15]
		];

		assert.deepEqual(result, expectedResult, "attach - single generation family to empty family with negative interval");
	})();

	(function () {
		var a = new primitives.common.FamilyMargins();
		var b = new primitives.common.FamilyMargins();
		b.add(10, 0);

		a.attach(b, 5);
		a.add(10, 0);

		var c = new primitives.common.FamilyMargins();
		c.attach(b, -5);
		c.add(10, 1);

		var d = new primitives.common.FamilyMargins();
		d.merge(a);
		d.merge(c);
		d.add(10, 0);

		var result = getMargins(d);

		var expectedResult = [
			[-5, 5],
			[-10, 10],
			[-5, 5]
		];

		assert.deepEqual(result, expectedResult, "attach - rombus");
	})();

	(function () {
		var d = new primitives.common.FamilyMargins();
		d.add(10, 0);

		var e = new primitives.common.FamilyMargins();
		e.add(10, 0);

		d.merge(e);
		d.add(10, 0);

		var a = new primitives.common.FamilyMargins();
		a.attach(d, 5);
		a.add(10, 0);

		var b = new primitives.common.FamilyMargins();
		b.attach(d, -5);
		b.add(10, 1);

		a.merge(b);

		var result = getMargins(a);

		var expectedResult = [
			[-10, 10],
			[-5, 5],
			[-10, 10]
		];

		assert.deepEqual(result, expectedResult, "attach - X");
	})();
});


/* /Algorithms/FibonacciHeap.Tests.js*/
QUnit.module('Algorithms - Fibonacci Heap');

QUnit.test("primitives.common.FibonacciHeap -  Closure based priority queue structure based on fibonacci heap algorithm.", function (assert) {
	var items = [
		[10, 1, "First"],
		[1, 10, "Second"],
		[2, 20, "Third"],
		[3, 30, "Toronto"],
		[4, 40, "NY"],
		[5, 50, "Seoul"],
		[6, 60, "Maple"],
		[7, 70, "Vaughan"],
		[8, 80, "Redmond"]
	];

	var queue = primitives.common.FibonacciHeap(false);
	for (var index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		queue.add(item[0], item[1], item[2]);
	}

	var result = [];
	var item = null;
	while ((item = queue.extractRoot()) != null) {
		result.push([item.key, item.priority, item.item]);
		queue.validate();
	}

	var expectedItems = [
		[10, 1, "First"],
		[1, 10, "Second"],
		[2, 20, "Third"],
		[3, 30, "Toronto"],
		[4, 40, "NY"],
		[5, 50, "Seoul"],
		[6, 60, "Maple"],
		[7, 70, "Vaughan"],
		[8, 80, "Redmond"]
	];
	assert.deepEqual(result, expectedItems, "Structure should return sorted items");


	var items = [
	[10, 1, "First"],
	[1, 10, "Second"],
	[2, 20, "Third"],
	[3, 30, "Toronto"],
	[4, 40, "NY"],
	[5, 50, "Seoul"],
	[6, 60, "Maple"],
	[7, 70, "Vaughan"],
	[8, 80, "Redmond"]
	];

	var queue = primitives.common.FibonacciHeap(false);
	for (var index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		queue.add(item[0], item[1], item[2]);
	}

	queue.extractRoot()
	queue.validate();

	queue.setPriority(8, 1);
	queue.validate();

	var result = [];
	var item = null;
	while ((item = queue.extractRoot()) != null) {
		result.push([item.key, item.priority, item.item]);
		queue.validate();
	}

	var expectedItems = [
		[8, 1, "Redmond"],
		[1, 10, "Second"],
		[2, 20, "Third"],
		[3, 30, "Toronto"],
		[4, 40, "NY"],
		[5, 50, "Seoul"],
		[6, 60, "Maple"],
		[7, 70, "Vaughan"]
	];
	assert.deepEqual(result, expectedItems, "Structure should return item #1 first");

});


/* /Algorithms/getCrossingRectangles.Tests.js*/
QUnit.module('Algorithms - Get crossing rectangles. This method finds rectangles having sides intersections. It does not finds completly ovellaped rectangles. This method is used for searching overlaped lables.');

QUnit.test("primitives.common.getCrossingRectangles", function (assert) {
	function GetPlacementMarker(placement, label, color) {
		var div = jQuery("<div></div>");

		div.append(label);
		div.css(placement.getCSS());
		div.css({
			"background": color,
			visibility: "visible",
			position: "absolute",
			font: "Areal",
			"font-size": "12px",
			"border-style": "solid",
			"border-color": "black",
			"border-width": "2px",
			"opacity": "0.5"
		});

		return div;
	}

	function ShowLayout(fixture, rects, width, height, title) {
		var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
		titlePlaceholder.append(title);
		fixture.append(titlePlaceholder);

		var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
		placeholder.css({
			width: width,
			height: height
		});
		for (var index = 0; index < rects.length; index += 1) {
			var rect = rects[index];
			var label = rect.context;

			var div = GetPlacementMarker(rect, label, "grey");
			placeholder.append(div);
		}

		fixture.append(placeholder);
	}

	function getSize(rects) {
		var result = new primitives.common.Rect(0, 0, 0, 0);
		for (var index = 0; index < rects.length; index += 1) {
			var rect = rects[index];
			result.addRect(rect);
		}
		return result;
	}

	function getRectangles(items) {
		var result = [];
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
			rect.context = index;
			result.push(rect);
		}
		return result;
	}

	function getCrossingRectangles(rects) {
		var result = [];
		for (var index = 0, len = rects.length; index < len - 1; index += 1) {
			var firstRect = rects[index];
			for (var index2 = index + 1; index2 < len; index2 += 1) {
				secondRect = rects[index2];

				if (firstRect.overlaps(secondRect)) {
					result.push([index, index2]);
				}
			}
		}
		return result;
	}

	function TestLayout(title, items) {
		var rects = getRectangles(items);
		var paletteItem = new primitives.common.PaletteItem({
			lineColor: "#000000",
			lineWidth: "2",
			fillColor: "#faebd7",
			lineType: primitives.common.LineType.Solid,
			opacity: 1
		});

		var result = [];
		primitives.common.getCrossingRectangles(this, rects, function (rect1, rect2) {
			var crossing = [rect1.context, rect2.context];
			crossing.sort(function (a, b) { return a - b;});
			result.push(crossing);

			if (rect1.context == rect2.context) {
				throw "Self crossing is not considered as a valid result";
			}
		});
		result.sort(function (a, b) {
			if (a[0] == b[0]) {
				return a[1] - b[1];
			} else {
				return a[0] - b[0];
			}
		});

		var size = getSize(rects);
		ShowLayout(jQuery("#qunit-fixture"), rects, size.width, size.height, title);

		jQuery("#qunit-fixture").css({
			position: "relative",
			left: "0px",
			top: "0px",
			height: "Auto"
		});

		var expected = getCrossingRectangles(rects);
		assert.deepEqual(result, expected, title);
	};

	TestLayout("Single rectangle", [
		[0, 0, 100, 100]
	]);

	TestLayout("Two disconnected rectangles", [
		[0, 0, 80, 80],
		[100, 0, 80, 80]
	]);

	TestLayout("Two aligned disconnected rectangles", [
		[0, 0, 80, 80],
		[80, 100, 80, 80]
	]);

	TestLayout("Two aligned disconnected rectangles", [
		[0, 100, 80, 80],
		[80, 0, 80, 80]
	]);

	TestLayout("Two overlapping rectangles", [
	[0, 0, 100, 100],
	[50, 50, 100, 100]
	]);

	TestLayout("Two overlapping rectangles", [
		[0, 50, 100, 100],
		[50, 0, 100, 100]
	]);

	TestLayout("E shape rectangles on right", [
		[0, 0, 50, 350],
		[50, 0, 50, 50],
		[50, 100, 50, 50],
		[50, 200, 50, 50],
		[50, 300, 50, 50]
	]);

	TestLayout("E shape rectangles on left", [
		[50, 0, 50, 350],
		[0, 0, 50, 50],
		[0, 100, 50, 50],
		[0, 200, 50, 50],
		[0, 300, 50, 50]
	]);


	TestLayout("5 rectangles", [
		[0, 0, 100, 100],
		[150, 0, 100, 100],
		[0, 150, 100, 100],
		[150, 150, 100, 100],
		[50, 50, 150, 150]
	]);

	TestLayout("Window", [
		[100, 0, 150, 150],
		[100, 200, 150, 150],
		[0, 100, 150, 150],
		[200, 100, 150, 150]
	]);

	TestLayout("Window 2", [
		[0, 0, 150, 50],
		[0, 50, 50, 50],
		[100, 50, 50, 50],
		[0, 100, 150, 50],
		[0, 150, 50, 50],
		[100, 150, 50, 50],
		[0, 200, 150, 50]
	]);

	TestLayout("Dumbbell", [
		[0, 0, 60, 60],
		[80, 0, 60, 60],
		[50, 20, 40, 20]
	]);

	TestLayout("Horizontal overlay", [
		[0, 0, 60, 60],
		[10, 0, 60, 60],
		[20, 0, 60, 60],
		[30, 0, 60, 60],
		[40, 0, 60, 60],
		[50, 0, 60, 60]
	]);

	TestLayout("Vertical overlay", [
	[0, 0, 60, 60],
	[0, 10, 60, 60],
	[0, 20, 60, 60],
	[0, 30, 60, 60],
	[0, 40, 60, 60],
	[0, 50, 60, 60]
	]);

	function TestPerformance(title, items, useBruteForce) {

		var rects = getRectangles(items);

		if (useBruteForce) {
			getCrossingRectangles(rects);
		} else {
			var result = [];
			primitives.common.getCrossingRectangles(this, rects, function (rect1, rect2) {
				result.push([rect1.context, rect2.context]);
			});
		}
		assert.ok(true, title);
	};

	var demoLabels = [[28, 5, 154, 130], [220, 8, 120, 124], [506, 65, 100, 10], [788, 65, 100, 10], [950, 65, 100, 10], [950, 76, 100, 10], [1062, 76, 100, 10], [1062, 87, 100, 10],
		[1062, 98, 100, 10], [950, 90.75, 100, 10], [950, 105.5, 100, 10], [1062, 105.5, 100, 10], [950, 116.5, 100, 10], [950, 127.5, 100, 10], [788, 138.5, 100, 10], [950, 138.5, 100, 10],
		[950, 149.5, 100, 10], [950, 160.5, 100, 10], [950, 171.5, 100, 10], [950, 182.5, 100, 10], [788, 193.5, 100, 10], [950, 193.5, 100, 10], [950, 204.5, 100, 10], [950, 215.5, 100, 10],
		[788, 226.5, 100, 10], [950, 226.5, 100, 10], [1062, 226.5, 100, 10], [950, 237.5, 100, 10], [1062, 237.5, 100, 10], [1062, 248.5, 100, 10], [1062, 259.5, 100, 10], [950, 267, 100, 10],
		[1062, 267, 100, 10], [788, 278, 100, 10], [950, 278, 100, 10], [788, 289, 100, 10], [788, 300, 100, 10], [788, 311, 100, 10], [950, 311, 100, 10], [950, 322, 100, 10],
		[950, 333, 100, 10], [378, 262, 244, 144], [788, 329, 100, 10], [788, 340.5, 100, 10], [950, 340.5, 100, 10], [950, 351.5, 100, 10], [788, 351.5, 100, 10],
		[788, 362.5, 100, 10], [378, 416, 244, 144], [788, 483, 100, 10], [950, 483, 100, 10], [788, 494, 100, 10], [950, 494, 100, 10], [1062, 494, 100, 10],
		[950, 505, 100, 10], [950, 516, 100, 10], [950, 527, 100, 10], [788, 534.5, 100, 10], [950, 534.5, 100, 10], [950, 545.5, 100, 10], [1062, 545.5, 100, 10],
		[950, 556.5, 100, 10], [788, 567.5, 100, 10], [950, 567.5, 100, 10], [788, 578.5, 100, 10], [788, 589.5, 100, 10], [506, 597, 100, 10], [788, 597, 100, 10],
		[950, 597, 100, 10], [1062, 597, 100, 10], [1062, 608, 100, 10], [950, 615.5, 100, 10], [1062, 615.5, 100, 10], [1062, 626.5, 100, 10], [1062, 637.5, 100, 10],
		[950, 648.5, 100, 10], [1062, 648.5, 100, 10], [1062, 659.5, 100, 10], [950, 659.5, 100, 10], [950, 670.5, 100, 10], [950, 681.5, 100, 10], [950, 692.5, 100, 10],
		[950, 703.5, 100, 10], [1062, 703.5, 100, 10], [1062, 714.5, 100, 10], [1062, 725.5, 100, 10], [788, 722, 100, 10], [950, 722, 100, 10], [950, 733, 100, 10],
		[1062, 733, 100, 10], [788, 744, 100, 10], [950, 744, 100, 10], [950, 755, 100, 10], [950, 766, 100, 10], [1062, 766, 100, 10], [950, 777, 100, 10], [950, 788, 100, 10],
		[788, 799, 100, 10], [950, 799, 100, 10], [950, 810, 100, 10], [950, 821, 100, 10], [1062, 821, 100, 10], [950, 832, 100, 10], [1062, 832, 100, 10], [1062, 843, 100, 10],
		[1062, 854, 100, 10], [1062, 865, 100, 10], [1174, 865, 100, 10], [950, 843, 100, 10], [788, 872.5, 100, 10], [950, 872.5, 100, 10], [1062, 872.5, 100, 10],
		[1062, 883.5, 100, 10], [1174, 883.5, 100, 10], [1174, 894.5, 100, 10], [1062, 894.5, 100, 10], [950, 883.5, 100, 10], [950, 894.5, 100, 10], [950, 905.5, 100, 10],
		[1062, 905.5, 100, 10], [1062, 916.5, 100, 10], [950, 927.5, 100, 10], [1062, 927.5, 100, 10], [1062, 938.5, 100, 10], [1062, 949.5, 100, 10], [1062, 960.5, 100, 10],
		[1062, 971.5, 100, 10], [1062, 982.5, 100, 10], [1062, 993.5, 100, 10], [1062, 1004.5, 100, 10], [1062, 1015.5, 100, 10], [1062, 1026.5, 100, 10], [950, 1037.5, 100, 10],
		[1062, 1037.5, 100, 10], [950, 1048.5, 100, 10], [1062, 1048.5, 100, 10], [1062, 1059.5, 100, 10], [950, 1059.5, 100, 10], [788, 883.5, 100, 10], [506, 1070.5, 100, 10],
		[788, 1070.5, 100, 10], [950, 1070.5, 100, 10], [788, 1081.5, 100, 10], [788, 1092.5, 100, 10], [950, 1092.5, 100, 10], [788, 1103.5, 100, 10], [506, 1114.5, 100, 10],
		[788, 1114.5, 100, 10], [950, 1114.5, 100, 10], [950, 1125.5, 100, 10], [950, 1136.5, 100, 10], [950, 1147.5, 100, 10], [950, 1158.5, 100, 10], [788, 1166, 100, 10],
		[950, 1166, 100, 10], [950, 1177, 100, 10], [950, 1188, 100, 10], [788, 1199, 100, 10], [950, 1199, 100, 10], [788, 1210, 100, 10], [950, 1210, 100, 10], [950, 1221, 100, 10],
		[950, 1232, 100, 10], [788, 1243, 100, 10], [950, 1243, 100, 10], [1062, 1243, 100, 10], [1062, 1254, 100, 10], [950, 1261.5, 100, 10], [1062, 1261.5, 100, 10], [950, 1272.5, 100, 10],
		[950, 1283.5, 100, 10], [1062, 1283.5, 100, 10], [1062, 1294.5, 100, 10], [788, 1294.5, 100, 10], [950, 1294.5, 100, 10], [788, 1305.5, 100, 10], [506, 1125.5, 100, 10],
		[506, 1136.5, 100, 10], [220, 1256, 120, 124], [506, 1313, 100, 10], [788, 1313, 100, 10], [378, 1328.5, 244, 144], [788, 1395.5, 100, 10], [788, 1406.5, 100, 10],
		[950, 1406.5, 100, 10], [950, 1417.5, 100, 10], [950, 1428.5, 100, 10], [950, 1439.5, 100, 10], [788, 1417.5, 100, 10], [378, 1482.5, 244, 144], [788, 1549.5, 100, 10],
		[950, 1549.5, 100, 10], [950, 1560.5, 100, 10], [788, 1560.5, 100, 10], [506, 1632, 100, 10], [788, 1632, 100, 10], [788, 1643, 100, 10], [788, 1654, 100, 10],
		[506, 1661.5, 100, 10], [788, 1661.5, 100, 10], [950, 1661.5, 100, 10], [1062, 1661.5, 100, 10], [950, 1672.5, 100, 10], [950, 1683.5, 100, 10], [950, 1694.5, 100, 10],
		[950, 1705.5, 100, 10], [950, 1716.5, 100, 10], [1062, 1716.5, 100, 10], [788, 1724, 100, 10], [950, 1724, 100, 10], [950, 1735, 100, 10], [788, 1746, 100, 10], [950, 1746, 100, 10],
		[950, 1757, 100, 10], [950, 1768, 100, 10], [950, 1779, 100, 10], [950, 1790, 100, 10], [788, 1757, 100, 10], [506, 1779, 100, 10], [788, 1779, 100, 10], [788, 1790, 100, 10],
		[788, 1801, 100, 10], [950, 1801, 100, 10], [950, 1812, 100, 10], [950, 1823, 100, 10], [950, 1834, 100, 10], [788, 1812, 100, 10], [506, 1845, 100, 10], [788, 1845, 100, 10],
		[950, 1845, 100, 10], [950, 1856, 100, 10], [788, 1856, 100, 10], [788, 1867, 100, 10], [950, 1867, 100, 10], [788, 1878, 100, 10], [788, 1889, 100, 10], [220, 1832, 120, 124],
		[506, 1889, 100, 10], [506, 1900, 100, 10], [788, 1900, 100, 10], [788, 1911, 100, 10], [788, 1922, 100, 10], [506, 1911, 100, 10], [506, 1922, 100, 10], [506, 1933, 100, 10],
		[506, 1944, 100, 10], [506, 1955, 100, 10], [506, 1966, 100, 10], [506, 1977, 100, 10], [506, 1988, 100, 10], [506, 1999, 100, 10], [220, 1966, 120, 124], [506, 2023, 100, 10],
		[788, 2023, 100, 10], [950, 2023, 100, 10], [950, 2034, 100, 10], [950, 2045, 100, 10], [788, 2052.5, 100, 10], [950, 2052.5, 100, 10], [788, 2063.5, 100, 10], [788, 2074.5, 100, 10],
		[788, 2085.5, 100, 10], [788, 2096.5, 100, 10], [506, 2104, 100, 10], [788, 2104, 100, 10], [788, 2115, 100, 10], [788, 2126, 100, 10], [788, 2137, 100, 10], [950, 2137, 100, 10],
		[788, 2148, 100, 10], [788, 2159, 100, 10], [506, 2137, 100, 10], [506, 2170, 100, 10], [788, 2170, 100, 10], [788, 2181, 100, 10], [788, 2192, 100, 10],
		[378, 2185.5, 244, 144], [788, 2252.5, 100, 10], [788, 2263.5, 100, 10], [788, 2274.5, 100, 10], [950, 2274.5, 100, 10], [950, 2285.5, 100, 10], [950, 2296.5, 100, 10],
		[788, 2304, 100, 10], [950, 2304, 100, 10], [950, 2315, 100, 10], [788, 2315, 100, 10], [788, 2326, 100, 10], [788, 2337, 100, 10], [788, 2348, 100, 10], [950, 2348, 100, 10],
		[788, 2359, 100, 10], [788, 2370, 100, 10], [440, 2339.5, 120, 124], [788, 2396.5, 100, 10], [950, 2396.5, 100, 10], [660, 2412, 244, 144], [950, 2479, 100, 10],
		[1062, 2479, 100, 10], [1062, 2490, 100, 10], [1062, 2501, 100, 10], [1062, 2512, 100, 10], [1062, 2523, 100, 10], [950, 2504.75, 100, 10], [950, 2530.5, 100, 10],
		[1062, 2530.5, 100, 10], [1062, 2541.5, 100, 10], [950, 2541.5, 100, 10], [950, 2552.5, 100, 10], [1062, 2552.5, 100, 10], [1062, 2563.5, 100, 10], [1062, 2574.5, 100, 10],
		[1062, 2585.5, 100, 10], [1062, 2596.5, 100, 10], [1062, 2607.5, 100, 10], [950, 2563.5, 100, 10], [788, 2571, 100, 10], [950, 2571, 100, 10], [950, 2582, 100, 10],
		[950, 2593, 100, 10], [950, 2604, 100, 10], [950, 2615, 100, 10], [950, 2626, 100, 10], [950, 2637, 100, 10], [1062, 2637, 100, 10], [788, 2582, 100, 10], [506, 2490.875, 100, 10],
		[506, 2523.75, 100, 10], [506, 2556.625, 100, 10], [506, 2589.5, 100, 10], [788, 2589.5, 100, 10], [506, 2600.5, 100, 10], [220, 2551, 120, 124], [506, 2608, 100, 10],
		[506, 2619, 100, 10], [788, 2619, 100, 10], [788, 2630, 100, 10], [788, 2641, 100, 10], [378, 2634.5, 244, 144], [788, 2701.5, 100, 10], [788, 2712.5, 100, 10],
		[506, 2784, 100, 10], [788, 2784, 100, 10], [788, 2795, 100, 10], [950, 2795, 100, 10], [788, 2806, 100, 10], [788, 2817, 100, 10], [788, 2828, 100, 10], [506, 2795, 100, 10],
		[220, 2685, 120, 124], [220, 2819, 120, 124], [506, 2876, 100, 10], [788, 2876, 100, 10], [950, 2876, 100, 10], [950, 2887, 100, 10], [950, 2898, 100, 10], [950, 2909, 100, 10],
		[788, 2887, 100, 10], [788, 2898, 100, 10], [788, 2909, 100, 10], [788, 2920, 100, 10], [506, 2931, 100, 10], [788, 2931, 100, 10], [950, 2931, 100, 10], [1062, 2931, 100, 10],
		[1062, 2942, 100, 10], [950, 2949.5, 100, 10], [1062, 2949.5, 100, 10], [1062, 2960.5, 100, 10], [1062, 2971.5, 100, 10], [950, 2982.5, 100, 10], [1062, 2982.5, 100, 10],
		[1062, 2993.5, 100, 10], [1062, 3004.5, 100, 10], [1062, 3015.5, 100, 10], [950, 3026.5, 100, 10], [1062, 3026.5, 100, 10], [1062, 3037.5, 100, 10], [1062, 3048.5, 100, 10],
		[1062, 3059.5, 100, 10], [950, 3048.5, 100, 10], [950, 3070.5, 100, 10], [1062, 3070.5, 100, 10], [1062, 3081.5, 100, 10], [1062, 3092.5, 100, 10], [950, 3103.5, 100, 10],
		[1062, 3103.5, 100, 10], [950, 3114.5, 100, 10], [1062, 3114.5, 100, 10], [1062, 3125.5, 100, 10], [788, 3122, 100, 10], [950, 3122, 100, 10], [950, 3133, 100, 10],
		[950, 3144, 100, 10], [950, 3155, 100, 10], [950, 3166, 100, 10], [950, 3177, 100, 10], [788, 3188, 100, 10], [950, 3188, 100, 10], [950, 3199, 100, 10], [788, 3210, 100, 10],
		[950, 3210, 100, 10], [1062, 3210, 100, 10], [1062, 3221, 100, 10], [1062, 3232, 100, 10], [1062, 3243, 100, 10], [950, 3250.5, 100, 10], [1062, 3250.5, 100, 10], [1062, 3261.5, 100, 10],
		[1062, 3272.5, 100, 10], [1062, 3283.5, 100, 10], [1062, 3294.5, 100, 10], [950, 3305.5, 100, 10], [1062, 3305.5, 100, 10], [1062, 3316.5, 100, 10], [1062, 3327.5, 100, 10],
		[1062, 3338.5, 100, 10], [1062, 3349.5, 100, 10], [950, 3360.5, 100, 10], [1062, 3360.5, 100, 10], [1062, 3371.5, 100, 10], [1062, 3382.5, 100, 10], [1062, 3393.5, 100, 10],
		[1062, 3404.5, 100, 10], [1062, 3415.5, 100, 10], [950, 3377, 100, 10], [950, 3393.5, 100, 10], [950, 3410, 100, 10], [950, 3426.5, 100, 10], [1062, 3426.5, 100, 10],
		[788, 3285.8333333333335, 100, 10], [788, 3361.6666666666665, 100, 10], [788, 3437.5, 100, 10], [950, 3437.5, 100, 10], [950, 3448.5, 100, 10], [506, 3459.5, 100, 10],
		[788, 3459.5, 100, 10], [950, 3459.5, 100, 10], [788, 3470.5, 100, 10], [788, 3481.5, 100, 10], [950, 3481.5, 100, 10], [788, 3492.5, 100, 10], [950, 3492.5, 100, 10],
		[1062, 3492.5, 100, 10], [1062, 3503.5, 100, 10], [950, 3503.5, 100, 10], [788, 3511, 100, 10], [950, 3511, 100, 10], [788, 3522, 100, 10], [506, 3533, 100, 10], [788, 3533, 100, 10],
		[788, 3544, 100, 10], [950, 3544, 100, 10], [950, 3555, 100, 10], [950, 3566, 100, 10], [950, 3577, 100, 10], [950, 3588, 100, 10], [950, 3599, 100, 10], [788, 3606.5, 100, 10],
		[950, 3606.5, 100, 10], [1062, 3606.5, 100, 10], [1062, 3617.5, 100, 10], [1062, 3628.5, 100, 10], [1062, 3639.5, 100, 10], [1062, 3650.5, 100, 10], [1062, 3661.5, 100, 10],
		[1062, 3672.5, 100, 10], [1062, 3683.5, 100, 10], [1062, 3694.5, 100, 10], [950, 3654.25, 100, 10], [950, 3702, 100, 10], [1062, 3702, 100, 10], [1062, 3713, 100, 10],
		[1062, 3724, 100, 10], [1062, 3735, 100, 10], [1062, 3746, 100, 10], [1062, 3757, 100, 10], [950, 3768, 100, 10], [1062, 3768, 100, 10], [950, 3779, 100, 10],
		[1062, 3779, 100, 10], [1062, 3790, 100, 10], [788, 3790, 100, 10], [950, 3790, 100, 10], [950, 3801, 100, 10], [788, 3812, 100, 10], [950, 3812, 100, 10], [1062, 3812, 100, 10],
		[950, 3823, 100, 10], [1062, 3823, 100, 10], [950, 3834, 100, 10], [950, 3845, 100, 10], [950, 3856, 100, 10], [1062, 3856, 100, 10], [950, 3867, 100, 10], [1062, 3867, 100, 10],
		[1174, 3867, 100, 10], [950, 3878, 100, 10], [788, 3889, 100, 10], [950, 3889, 100, 10], [1062, 3889, 100, 10], [950, 3900, 100, 10], [1062, 3900, 100, 10], [1062, 3911, 100, 10],
		[1062, 3922, 100, 10], [1062, 3933, 100, 10], [1062, 3944, 100, 10], [950, 3911, 100, 10], [950, 3922, 100, 10], [788, 3933, 100, 10], [950, 3933, 100, 10], [950, 3944, 100, 10],
		[788, 3944, 100, 10], [788, 3955, 100, 10], [950, 3955, 100, 10], [1062, 3955, 100, 10], [1062, 3966, 100, 10], [1062, 3977, 100, 10], [1062, 3988, 100, 10], [1062, 3999, 100, 10],
		[1062, 4010, 100, 10], [1062, 4021, 100, 10], [1062, 4032, 100, 10], [1062, 4043, 100, 10], [1174, 4043, 100, 10], [950, 4050.5, 100, 10], [1062, 4050.5, 100, 10], [1062, 4061.5, 100, 10],
		[950, 4072.5, 100, 10], [1062, 4072.5, 100, 10], [1174, 4072.5, 100, 10], [950, 4083.5, 100, 10], [1062, 4083.5, 100, 10], [1062, 4094.5, 100, 10], [1062, 4105.5, 100, 10],
		[1062, 4116.5, 100, 10], [1062, 4127.5, 100, 10], [1062, 4138.5, 100, 10], [1062, 4149.5, 100, 10], [1062, 4160.5, 100, 10], [1062, 4171.5, 100, 10], [1062, 4182.5, 100, 10],
		[1062, 4193.5, 100, 10], [1062, 4204.5, 100, 10], [950, 4215.5, 100, 10], [1062, 4215.5, 100, 10], [1062, 4226.5, 100, 10], [1062, 4237.5, 100, 10], [1062, 4248.5, 100, 10],
		[950, 4237.5, 100, 10], [950, 4259.5, 100, 10], [1062, 4259.5, 100, 10], [1062, 4270.5, 100, 10], [1062, 4281.5, 100, 10], [1062, 4292.5, 100, 10], [1062, 4303.5, 100, 10],
		[1062, 4314.5, 100, 10], [1062, 4325.5, 100, 10], [1062, 4336.5, 100, 10], [1062, 4347.5, 100, 10], [1062, 4358.5, 100, 10], [1062, 4369.5, 100, 10], [950, 4270.5, 100, 10],
		[950, 4281.5, 100, 10], [950, 4292.5, 100, 10], [788, 4167.75, 100, 10], [788, 4380.5, 100, 10], [950, 4380.5, 100, 10], [1062, 4380.5, 100, 10], [950, 4391.5, 100, 10],
		[950, 4402.5, 100, 10], [950, 4413.5, 100, 10], [1062, 4413.5, 100, 10], [950, 4424.5, 100, 10], [950, 4435.5, 100, 10], [788, 4391.5, 100, 10], [506, 4435.5, 100, 10],
		[788, 4435.5, 100, 10], [788, 4446.5, 100, 10], [950, 4446.5, 100, 10], [950, 4457.5, 100, 10], [1062, 4457.5, 100, 10], [950, 4468.5, 100, 10], [788, 4479.5, 100, 10],
		[950, 4479.5, 100, 10], [788, 4490.5, 100, 10], [506, 4501.5, 100, 10], [788, 4501.5, 100, 10], [950, 4501.5, 100, 10], [950, 4512.5, 100, 10], [950, 4523.5, 100, 10],
		[950, 4534.5, 100, 10], [950, 4545.5, 100, 10], [950, 4556.5, 100, 10], [950, 4567.5, 100, 10], [950, 4578.5, 100, 10], [950, 4589.5, 100, 10], [788, 4597, 100, 10],
		[950, 4597, 100, 10], [1062, 4597, 100, 10], [950, 4608, 100, 10], [950, 4619, 100, 10], [950, 4630, 100, 10], [950, 4641, 100, 10], [1062, 4641, 100, 10], [950, 4652, 100, 10],
		[1062, 4652, 100, 10], [950, 4663, 100, 10], [950, 4674, 100, 10], [950, 4685, 100, 10], [788, 4696, 100, 10], [950, 4696, 100, 10], [950, 4707, 100, 10], [788, 4707, 100, 10],
		[788, 4718, 100, 10], [950, 4718, 100, 10], [788, 4729, 100, 10], [950, 4729, 100, 10], [950, 4740, 100, 10], [950, 4751, 100, 10], [950, 4762, 100, 10], [950, 4773, 100, 10],
		[950, 4784, 100, 10], [1062, 4784, 100, 10], [1062, 4795, 100, 10], [1062, 4806, 100, 10], [950, 4795, 100, 10], [788, 4806, 100, 10], [950, 4806, 100, 10], [788, 4817, 100, 10],
		[788, 4828, 100, 10], [788, 4839, 100, 10], [788, 4850, 100, 10], [788, 4861, 100, 10], [788, 4872, 100, 10], [506, 4883, 100, 10], [788, 4883, 100, 10], [788, 4894, 100, 10],
		[788, 4905, 100, 10], [788, 4916, 100, 10], [788, 4927, 100, 10], [788, 4938, 100, 10], [788, 4949, 100, 10], [788, 4960, 100, 10], [788, 4971, 100, 10], [506, 4982, 100, 10],
		[788, 4982, 100, 10], [950, 4982, 100, 10], [1062, 4982, 100, 10], [950, 4993, 100, 10], [950, 5004, 100, 10], [788, 4993, 100, 10], [788, 5004, 100, 10], [788, 5015, 100, 10],
		[950, 5015, 100, 10], [950, 5026, 100, 10], [950, 5037, 100, 10], [788, 5029.75, 100, 10], [788, 5044.5, 100, 10], [950, 5044.5, 100, 10], [788, 5055.5, 100, 10],
		[788, 5066.5, 100, 10], [950, 5066.5, 100, 10], [788, 5077.5, 100, 10], [950, 5077.5, 100, 10], [950, 5088.5, 100, 10], [1062, 5088.5, 100, 10], [506, 5088.5, 100, 10],
		[788, 5088.5, 100, 10], [788, 5099.5, 100, 10], [950, 5099.5, 100, 10], [788, 5110.5, 100, 10], [950, 5110.5, 100, 10], [788, 5121.5, 100, 10], [950, 5121.5, 100, 10],
		[950, 5132.5, 100, 10], [950, 5143.5, 100, 10], [788, 5136.25, 100, 10], [788, 5151, 100, 10], [950, 5151, 100, 10], [950, 5162, 100, 10], [788, 5173, 100, 10], [950, 5173, 100, 10],
		[950, 5184, 100, 10], [950, 5195, 100, 10], [788, 5184, 100, 10], [788, 5195, 100, 10], [788, 5206, 100, 10], [788, 5217, 100, 10], [788, 5228, 100, 10], [506, 5099.5, 100, 10],
		[220, 5178.5, 120, 124], [506, 5235.5, 100, 10], [788, 5235.5, 100, 10], [506, 5246.5, 100, 10], [506, 5257.5, 100, 10], [506, 5268.5, 100, 10], [788, 5268.5, 100, 10],
		[506, 5279.5, 100, 10], [506, 5290.5, 100, 10], [506, 5301.5, 100, 10], [506, 5312.5, 100, 10], [506, 5323.5, 100, 10]];

	TestPerformance("Performance of getCrossingRectangles", demoLabels, false);
	TestPerformance("Performance of brute force test function", demoLabels, true);
});

/* /Algorithms/getFamilyLoops.Tests.js*/
QUnit.module('Algorithms - getFamilyLoops');

QUnit.test("primitives.common.getFamilyLoops - Find optimal set of loops.", function (assert) {

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
      { id: 'A', parents: ['D', 'E', 'F', 'I'] },
      { id: 'B', parents: ['A'] },
      { id: 'C', parents: ['B'] },
      { id: 'D', parents: ['C'] },
      { id: 'E', parents: ['C'] },
      { id: 'F', parents: ['C'] },

      { id: 'F', parents: ['D'] },
      { id: 'L', parents: ['F'] },
      { id: 'M', parents: ['L'] },
      { id: 'G', parents: ['L'] },
      { id: 'H', parents: ['F', 'L', 'M'] },
      { id: 'I', parents: ['J'] },
      { id: 'J', parents: ['N'] },
      { id: 'N', parents: ['O'] }
    ]);

    var result = primitives.common.getFamilyLoops(family);

    var expected = [new primitives.common.Edge("A", "B")];

    assert.deepEqual(result, expected, "getFamilyLoops function finds optimal set of loops in family structure");
  })();

  (function () {
    var family = getFamily([
      { id: 'A', parents: ['G', 'K', 'L'] },
      { id: 'M', parents: ['G', 'K', 'L'] },
      { id: 'N', parents: ['G', 'K', 'L'] },

      { id: 'B', parents: ['A'] },
      { id: 'O', parents: ['M', 'N'] },
      { id: 'P', parents: ['N', 'M'] },

      { id: 'C', parents: ['B'] },
      { id: 'D', parents: ['B'] },
      { id: 'Q', parents: ['O', 'P'] },
      { id: 'R', parents: ['O', 'P'] },

      { id: 'E', parents: ['C'] },
      { id: 'F', parents: ['D'] },
      { id: 'Z', parents: ['Q', 'R'] },

      { id: 'G', parents: ['E'] },
      { id: 'K', parents: ['F'] },
      { id: 'L', parents: ['Z'] }
    ]);

    var result = primitives.common.getFamilyLoops(family);

    var expected = [new primitives.common.Edge("A", "B"), new primitives.common.Edge("Z", "L")];

    assert.deepEqual(result, expected, "getFamilyLoops function finds optimal set of loops in family structure");
  })();

  (function () {
    var family = getFamily([
      { id: 'A', parents: ['Z'] },
      { id: 'M', parents: ['Z'] },
      { id: 'N', parents: ['Z'] },

      { id: 'B', parents: ['A'] },
      { id: 'O', parents: ['M', 'N'] },
      { id: 'P', parents: ['N', 'M'] },

      { id: 'C', parents: ['B'] },
      { id: 'D', parents: ['B'] },
      { id: 'Q', parents: ['O', 'P'] },
      { id: 'R', parents: ['O', 'P'] }
    ]);

    var result = primitives.common.getFamilyLoops(family);

    var expected = [];

    assert.deepEqual(result, expected, "getFamilyLoops function returns empty array for DAG family structure");
  })();
});

/* /Algorithms/getFamilyUnits.Tests.js*/
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

/* /Algorithms/getLiniarBreaks.Tests.js*/
QUnit.module('Algorithms - Get Liniar Breaks for Collection of values Function');

QUnit.test("primitives.common.getLiniarBreaks", function (assert) {
	var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 300, 400, 9900, 10000];

	var result = primitives.common.getLiniarBreaks(values);

	var expectedResult = [8, 11, 13];

	assert.deepEqual(result, expectedResult, "Liniar breaks for 3 sequances havin 10x and 100x difference");

	var values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	var result = primitives.common.getLiniarBreaks(values);

	var expectedResult = [2, 5, 8];

	assert.deepEqual(result, expectedResult, "Liniar breaks for 3 distinct numbers");

	var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 200, 300];

	var result = primitives.common.getLiniarBreaks(values);

	var expectedResult = [3, 8, 11];

	assert.deepEqual(result, expectedResult, "Liniar breaks for 2 sequances having 10x difference");
});

/* /Algorithms/getMergedRectangles.Tests.js*/
QUnit.module('Algorithms - Get merged rectangles. This method merges multiple rectangles into a single polyline object.');

QUnit.test("primitives.common.getMergedRectangles", function (assert) {
  function ShowLayout(fixture, polyline, width, height, title) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    graphicsDiv.css({
      width: width,
      height: height
    });

    var placeholder = jQuery("<div class='placeholder'></div>");
    placeholder.css({
      width: width,
      height: height
    });
    graphicsDiv.append(placeholder);

    fixture.append(graphicsDiv);

    var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
    graphics.begin();
    graphics.resize("placeholder", width, height);
    graphics.activate("placeholder");
    graphics.polyline(polyline);
    graphics.end();
  }

  function getSize(rects) {
    var result = new primitives.common.Rect(0, 0, 0, 0);
    for (var index = 0; index < rects.length; index += 1) {
      var rect = rects[index];
      result.addRect(rect);
    }
    return result;
  }

  function getRectangles(items) {
    var result = [];
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
      rect.context = index;
      result.push(rect);
    }
    return result;
  }

  function TestLayout(title, items) {
    var rects = getRectangles(items);
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: "#000000",
      lineWidth: "2",
      fillColor: "#faebd7",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    primitives.common.getMergedRectangles(this, rects, function (points) {
      for (var index = 0, len = points.length; index < len; index += 1) {
        var point = points[index];
        if (index == 0) {
          polyline.addSegment(new primitives.common.MoveSegment(point.x, point.y));
        } else {
          polyline.addSegment(new primitives.common.LineSegment(point.x, point.y));
        }
      }
    });

    var size = getSize(rects);

    ShowLayout(jQuery("#qunit-fixture"), polyline, size.width, size.height, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Merge single rectangle", [
    [0, 0, 100, 100]
  ]);

  TestLayout("Merge two disconnected rectangles", [
    [0, 0, 80, 80],
    [100, 0, 80, 80]
  ]);

  TestLayout("Merge two aligned disconnected rectangles", [
    [0, 0, 80, 80],
    [80, 100, 80, 80]
  ]);

  TestLayout("Merge two aligned disconnected rectangles", [
    [0, 100, 80, 80],
    [80, 0, 80, 80]
  ]);

  TestLayout("Merge two overlapping rectangles", [
    [0, 0, 100, 100],
    [50, 50, 100, 100]
  ]);

  TestLayout("Merge two overlapping rectangles", [
    [0, 50, 100, 100],
    [50, 0, 100, 100]
  ]);

  TestLayout("Merge E shape rectangles", [
    [0, 0, 50, 350],
    [50, 0, 50, 50],
    [50, 100, 50, 50],
    [50, 200, 50, 50],
    [50, 300, 50, 50]
  ]);

  TestLayout("Merge E shape rectangles", [
    [50, 0, 50, 350],
    [0, 0, 50, 50],
    [0, 100, 50, 50],
    [0, 200, 50, 50],
    [0, 300, 50, 50]
  ]);


  TestLayout("Merge 5 rectangles 2", [
    [0, 0, 100, 100],
    [150, 0, 100, 100],
    [0, 150, 100, 100],
    [150, 150, 100, 100],
    [50, 50, 150, 150]
  ]);

  TestLayout("Window", [
    [100, 0, 150, 150],
    [100, 200, 150, 150],
    [0, 100, 150, 150],
    [200, 100, 150, 150]
  ]);

  TestLayout("Window 2", [
    [0, 0, 150, 50],
    [0, 50, 50, 50],
    [100, 50, 50, 50],
    [0, 100, 150, 50],
    [0, 150, 50, 50],
    [100, 150, 50, 50],
    [0, 200, 150, 50]
  ]);

  TestLayout("Dumbbell", [
    [0, 0, 60, 60],
    [80, 0, 60, 60],
    [50, 20, 40, 20]
  ]);
});

/* /Algorithms/getMinimumCrossingRows.Tests.js*/
QUnit.module('Algorithms - Get minimum set of rows crossing all rectangles. This structure is needed for keyboard arrow keys navigation across random set of rectangles.');

function countPlacementsCrossings(placements, rows) {
	var result = 0;

	for (var index = 0; index < placements.length; index += 1) {
		var placement = placements[index];

		for (var index2 = 0; index2 < rows.length; index2 += 1) {
			var row = rows[index2];
			if (placement.y <= row && placement.bottom() >= row) {
				result += 1;
				break;
			}
		}
	}

	return result;
}

function GetPlacementMarker(placement, label, color) {
	var div = jQuery("<div></div>");

	div.append(label);
	div.css(placement.getCSS());
	div.css({
		"background": color,
		visibility: "visible",
		position: "absolute",
		font: "Areal",
		"font-size": "12px",
		"border-style": "solid",
		"border-color": "black",
		"border-width": "2px"
	});

	return div;
}

function ShowLayout(fixture, placements, rows, title) {
	var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
	titlePlaceholder.append(title);
	fixture.append(titlePlaceholder);

	var offsetX = null;
	var offsetY = null;
	var space = new primitives.common.Rect();
	for (var index = 0; index < placements.length; index+=1) {
		var placement = placements[index];

		offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
		offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

		space.addRect(placement);
	}

	var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
	placeholder.css({
		width: space.width,
		height: space.height
	});
	for (var index = 0; index < placements.length; index += 1) {
		var placement = placements[index];
		var label = placement.context;
		var placement = new primitives.common.Rect(placements[index]);
		placement.translate(-offsetX, -offsetY);

		var div = GetPlacementMarker(placement, label, "grey");
		placeholder.append(div);
	}

	for (var index = 0; index < rows.length; index += 1) {
		var row = rows[index];
		var placement = new primitives.common.Rect(0, row, space.width, 1);
		placement.translate(-offsetX, -offsetY);

		var div = GetPlacementMarker(placement, index, "red");
		placeholder.append(div);
	}

	fixture.append(placeholder);
}

function getRectangles(items) {
	var result = [];
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
		rect.context = index;
		result.push(rect);
	}
	return result;
}

QUnit.test("primitives.common.getMinimumCrossingRows", function (assert) {
	function TestLayout(title, items) {
		var placements = getRectangles(items);
		var rows = [];
		primitives.common.getMinimumCrossingRows(this, placements, function (row) {
			rows.push(row);
		});

		ShowLayout(jQuery("#qunit-fixture"), placements, rows, title);

		jQuery("#qunit-fixture").css({
			position: "relative",
			left: "0px",
			top: "0px",
			height: "Auto"
		});

		var result = countPlacementsCrossings(placements, rows);

		assert.equal(result, placements.length, title);
	};

	TestLayout("Basic test case", [
		[0, 0, 200, 50],
		[300, 30, 200, 50],
		[600, 45, 200, 50],
		[10, 55, 200, 50],
		[310, 90, 200, 50]
	]);

	TestLayout("Multi-layer test case", [
		[0, 0, 40, 280],
		[60, 0, 100, 100],
		[180, 0, 40, 40],
		[180, 60, 40, 40],
		[240, 0, 40, 40],
		[300, 0, 40, 40],
		[240, 60, 40, 40],
		[300, 60, 40, 100],
		[360, 0, 100, 100],
		[480, 0, 40, 40],
		[540, 0, 40, 40],
		[600, 0, 80, 100],
		[480, 60, 40, 140],
		[540, 140, 60, 60],
		[620, 140, 60, 60],
		[60, 120, 160, 160],
		[240, 180, 60, 60],
		[320, 180, 60, 60],
		[400, 180, 60, 60],
		[620, 220, 20, 20],
		[660, 220, 20, 20],
		[240, 260, 20, 20],
		[280, 260, 340, 20],
		[640, 260, 40, 20]
	]);

	TestLayout("Nested block test case", [
		[220, 0, 120, 80],
		[0, 100, 120, 80],
		[0, 200, 120, 80],
		[400, 100, 120, 80],
		[400, 200, 120, 80],
		[160, 100, 40, 40],
		[220, 100, 40, 40],
		[280, 100, 40, 40],
		[340, 100, 40, 40],
		[160, 160, 40, 40],
		[220, 160, 40, 40],
		[280, 160, 40, 40],
		[340, 160, 40, 40],
		[160, 220, 40, 40],
		[220, 220, 40, 40],
		[280, 220, 40, 40],
		[340, 220, 40, 40]
	]);
});

/* /Algorithms/Graph.Tests.js*/
QUnit.module('Algorithms - Graph');

QUnit.test("primitives.common.graph -  Closure based graph data structure.", function (assert) {

  function getGraph(items) {
    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }
    return graph;
  }

  function getTreeLevels(levels) {
    var treeLevels = primitives.common.TreeLevels();
    for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
      var level = levels[levelIndex];
      for (var index = 0, len = level.length; index < len; index += 1) {
        treeLevels.addItem(levelIndex, level[index], {});
      }
    }
    return treeLevels;
  };

  (function () {
    var items = [
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 3, weight: 1 },
      { from: 1, to: 5, weight: 2 },
      { from: 2, to: 3, weight: 3 },
      { from: 3, to: 4, weight: 1 },
      { from: 3, to: 5, weight: 2 },
      { from: 4, to: 5, weight: 2 }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var tree = graph.getSpanningTree(items[0].from, function (edge) {
      return edge.weight;
    })

    var children = [];
    tree.loopLevels(this, function (nodeid, node, level) {
      if (children[level] == null) {
        children[level] = { level: level, items: [] };
      }
      children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
    });
    var expectedChildren = [{ "level": 0, "items": [{ "id": "1", "parent": null }] }, { "level": 1, "items": [{ "id": "5", "parent": "1" }] }, { "level": 2, "items": [{ "id": "3", "parent": "5" }, { "id": "4", "parent": "5" }] }, { "level": 3, "items": [{ "id": "2", "parent": "3" }] }];

    assert.deepEqual(children, expectedChildren, "getSpanningTree function test");
  })();

  (function () {
    var items = [
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 3, weight: 1 },
      { from: 1, to: 5, weight: 2 },
      { from: 2, to: 3, weight: 3 },
      { from: 3, to: 4, weight: 1 },
      { from: 3, to: 5, weight: 2 },
      { from: 4, to: 5, weight: 2 }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }
    var sequence = [];
    graph.getTotalWeightGrowthSequence(this,
      function (edge) { return edge.weight; },
      function (item) { return sequence.push(item); }
    );
    var expectedsequence = ["3", "2", "1", "5", "4"];

    assert.deepEqual(sequence, expectedsequence, "getTotalWeightGrowthSequence function test");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'E' }, { from: 'C', to: 'D' },
      { from: 'D', to: 'F' }, { from: 'D', to: 'J' },
      { from: 'E', to: 'Z' },
      { from: 'Z', to: 'F' },
      { from: 'J', to: 'D' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var expectedConnectionPath = ['J', 'D', 'C', 'E'];

    var connectionPath = null;
    graph.getShortestPath(this, 'E', ['J'], null, function (path) {
      connectionPath = path;
    });

    assert.deepEqual(connectionPath, expectedConnectionPath, "getShortestPath function test for Not weighted edges");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'E', weight: 100 }, { from: 'C', to: 'D', weight: 100 },
      { from: 'D', to: 'F', weight: 50 }, { from: 'D', to: 'J' },
      { from: 'E', to: 'F', weight: 100 },
      { from: 'J', to: 'D' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var expectedConnectionPath = ['J', 'D', 'A', 'B', 'E'];

    var connectionPath = [];
    graph.getShortestPath(this, 'E', ['J'], function (edge, fromItem, toItem) {
      return edge.weight || 1;
    }, function (path) {
      connectionPath = path;
    });

    assert.deepEqual(connectionPath, expectedConnectionPath, "getShortestPath function test for weighted edges");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B', weight: -1 }, { from: 'B', to: 'C', weight: -1 }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var expectedConnectionPath = [];

    var connectionPath = [];
    graph.getShortestPath(this, 'A', ['C'], function (edge, fromItem, toItem) {
      return edge.weight;
    }, function (path) {
      connectionPath = path;
    });

    assert.deepEqual(connectionPath, expectedConnectionPath, "getShortestPath function test for no path");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
      { from: 'B', to: 'G' },
      { from: 'D', to: 'H' },
      { from: 'E', to: 'H' },
      { from: 'F', to: 'H' },
      { from: 'K', to: 'F' }, { from: 'K', to: 'L' }, { from: 'K', to: 'M' },
      { from: 'M', to: 'I' }, { from: 'M', to: 'J' },
      { from: 'I', to: 'T' }, { from: 'J', to: 'T' },
      { from: 'H', to: 'Q' }, { from: 'H', to: 'R' }, { from: 'H', to: 'S' },
      { from: 'G', to: 'N' }, { from: 'G', to: 'O' },
      { from: 'O', to: 'P' }, { from: 'Q', to: 'P' },
      { from: 'S', to: 'U' }, { from: 'T', to: 'U' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var expected = [];
    var processed = {};
    jQuery.each(items, function (index, item) {
      if (!processed.hasOwnProperty(item.from)) {
        expected.push(item.from);
        processed[item.from] = true;
      }
      if (!processed.hasOwnProperty(item.to)) {
        expected.push(item.to);
        processed[item.to] = true;
      }
    });
    expected.sort();

    var result = [];
    graph.loopNodes(this, 'K', function (itemid) {
      result.push(itemid);
    });

    result.sort();

    assert.deepEqual(result, expected, "loopNodes function test. Loop all accessable nodes starting from node K");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'D', to: 'J' },
      { from: 'E', to: 'Z' },
      { from: 'F', to: 'Z' },
      { from: 'J', to: 'Z' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var connectionPath = graph.dfsPath(this, 'A', 'Z', function (from, to) {
      return true;
    });

    var valid = (connectionPath.length >= 2)
      && (connectionPath[0] == "A")
      && (connectionPath[connectionPath.length - 1] == "Z");
    for (var index = 0; index < connectionPath.length - 1; index += 1) {
      if (!graph.edge(connectionPath[index], connectionPath[index + 1])) {
        valid = false;
      }
    }

    assert.ok(valid, "dfsPath finds any available path between A and Z");
  })();

  (function () {
    var items = [
      { from: 'A', to: 'B' },
      { from: 'J', to: 'Z' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var connectionPath = graph.dfsPath(this, 'A', 'Z', function (from, to) {
      return true;
    });

    assert.ok(connectionPath.length == 0, "dfsPath cannot find path between A and Z");
  })();

  (function () {
    var items = [
      { from: 'S', to: 'A' },
      { from: 'S', to: 'C' },
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'D' },
      { from: 'B', to: 'T' },
      { from: 'D', to: 'T' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var levelGraph = graph.getLevelGraph(this, 'S', function (from, to, edge) {
      return (edge.from == from);
    });

    var valid = levelGraph.hasNode('A')
      && levelGraph.hasNode('T')
      && levelGraph.edge('A', 'C') == null
      && levelGraph.edge('D', 'B') == null;

    assert.ok(valid, "getLevelGraph returns level graph starting from A");
  })();

  (function () {
    var items = [
      { from: 'S', to: 'A' },
      { from: 'S', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'T' },
      { from: 'D', to: 'T' }
    ];

    var graph = primitives.common.graph();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      graph.addEdge(item.from, item.to, item);
    }

    var result = false;
    graph.dfsLoop(this, 'S', function (from, to, edge) {
      return (edge.from == from);
    }, function (nodeid) {
      if (nodeid == "T") {
        result = true;
        return true;
      };
    });

    assert.ok(result, "dfsLoop searches graph nodes using depth first order");
  })();
});


/* /Algorithms/LCA.Tests.js*/
QUnit.module('Algorithms - LCA - Lowest Common Ancestor');

QUnit.test("primitives.common.LCA", function (assert) {
	function getTree(items) {
		var tree = primitives.common.tree();
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			tree.add(item.parent, item.id, item);
		}
		return tree;
	}

	(function () {
		var tree = getTree([
			{ id: 0, parent: null, name: "0" },
			{ id: 1, parent: 0, name: "1" },
			{ id: 2, parent: 1, name: "2" },
			{ id: 3, parent: 1, name: "3" },
			{ id: 4, parent: 0, name: "4" },
			{ id: 5, parent: 4, name: "5" },
			{ id: 6, parent: 4, name: "6" },
			{ id: 7, parent: 6, name: "6" },
			{ id: 8, parent: 7, name: "8" },
			{ id: 9, parent: 3, name: "9" },
			{ id: 10, parent: 9, name: "10" }
		]);

		var lca = primitives.common.LCA(tree);

		assert.equal(lca.getLowestCommonAncestor(2, 3), 1, "getLowestCommonAncestor test for nodes 2 and 3");
		assert.equal(lca.getLowestCommonAncestor(9, 10), 9, "getLowestCommonAncestor test for nodes 9 and 10");
		assert.equal(lca.getLowestCommonAncestor(10, 9), 9, "getLowestCommonAncestor test for nodes 10 and 9");
		assert.equal(lca.getLowestCommonAncestor(5, 8), 4, "getLowestCommonAncestor test for nodes 5 and 8");
		assert.equal(lca.getLowestCommonAncestor(10, 8), 0, "getLowestCommonAncestor test for nodes 10 and 8");
		assert.equal(lca.getLowestCommonAncestor(0, 8), 0, "getLowestCommonAncestor test for nodes 0 and 8");
	})();
});

/* /Algorithms/LinkedHashItems.Tests.js*/
QUnit.module('Algorithms - LinkedHashItems');

QUnit.test("primitives.common.LinkedHashItems -  Add and iterate items in linked hash items collection.", function (assert) {
	var items = [
		{ id: 1, name: 'A' },
		{ id: 2, name: 'B' },
		{ id: 3, name: 'C' },
		{ id: 4, name: 'D' },
		{ id: 5, name: 'E' },
		{ id: 6, name: 'F' }
	];

	var linkedHashItems = new primitives.common.LinkedHashItems();
	for (var index = 0; index < items.length; index++) {
		var item = items[index];
		linkedHashItems.add(item.id, item);
	};

	var result = [];
	linkedHashItems.iterate(function (item) {
		result.push(item);
	});
	assert.deepEqual(items, result, "Forward iteration returned correct items!");

	var reversedResult = [],
		reversedItems = items.slice(0);
	reversedItems.reverse();

	linkedHashItems.iterateBack(function (item) {
		reversedResult.push(item);
	});
	assert.deepEqual(reversedItems, reversedResult, "Back iteration returned correct items!");

	linkedHashItems.remove(3);
	items.splice(2, 1);
	assert.deepEqual(items, linkedHashItems.toArray(), "Removed item. Passed!");

	linkedHashItems.remove(1);
	items.splice(0, 1);
	assert.deepEqual(items, linkedHashItems.toArray(), "Remove first item. Passed!");

	linkedHashItems.remove(6);
	items.splice(3, 1);
	assert.deepEqual(items, linkedHashItems.toArray(), "Remove last item. Passed!");

	linkedHashItems.empty();
	assert.deepEqual([], linkedHashItems.toArray(), "Remove all items. Passed!");
});

/* /Algorithms/mergeSort.Tests.js*/
QUnit.module('Algorithms - Merge collections Function');

QUnit.test("primitives.common.mergeSort", function (assert) {
	var arrays = [
		[1, 5, 9, 13, 17],
		[0, 2, 4, 6, 8, 10],
		[3, 7, 11],
		[],
		[18, 19, 20]
	];

	var result = primitives.common.mergeSort(arrays);

	var expectedResult = [];
	for (var index = 0; index < arrays.length; index += 1) {
		var array1 = arrays[index];

		expectedResult = expectedResult.concat(array1);
	}
	expectedResult.sort(function (a, b) {
		return a - b;
	});

	assert.deepEqual(result, expectedResult, "Merged sort multiple arrays!");

	arrays = [
		[1, 1, 5, 9, 9, 13, 17, 17],
		[0, 0, 2, 4, 6, 6, 8, 10]
	];

	result = primitives.common.mergeSort(arrays, null, true);

	expectedResult = [0, 1, 2, 4, 5, 6, 8, 9, 10, 13, 17];

	assert.deepEqual(result, expectedResult, "Merged sort multiple arrays ignoring duplicates!");

	arrays = [
		[1, 5, 9, 13, 17],
	];

	var result = primitives.common.mergeSort(arrays);

	var expectedResult = [];
	for (var index = 0; index < arrays.length; index += 1) {
		var array1 = arrays[index];

		expectedResult = expectedResult.concat(array1);
	}
	expectedResult.sort(function (a, b) {
		return a - b;
	});

	assert.deepEqual(result, expectedResult, "Merged sort single array!");

	arrays = [
		[1, 1, 5, 9, 9, 9, 13, 17, 17, 18, 18, 18, 18]
	];

	result = primitives.common.mergeSort(arrays, null, true);

	expectedResult = [1, 5, 9, 13, 17, 18];

	assert.deepEqual(result, expectedResult, "Merged sort single array ignoring duplicates!");

	arrays = [
		[{ weight: 1 }, { weight: 5 }, { weight: 9 }, { weight: 13 }, { weight: 17 }],
		[{ weight: 2 }, { weight: 4 }, { weight: 6 }, { weight: 8 }, { weight: 10 }],
		[{ weight: 3 }, { weight: 7 }, { weight: 11 }],
		[],
		[{ weight: 18 }, { weight: 19 }, { weight: 20 }]
	];

	var result = primitives.common.mergeSort(arrays, function (item) { return item.weight; });

	var expectedResult = [];
	for (var index = 0; index < arrays.length; index += 1) {
		var array1 = arrays[index];

		expectedResult = expectedResult.concat(array1);
	}
	expectedResult.sort(function (a, b) {
		return a.weight - b.weight;
	});

	assert.deepEqual(result, expectedResult, "Merged sort multiple arrays of objects!");
});


/* /Algorithms/Pile.Tests.js*/
QUnit.module('Algorithms - Pile Of Segments');

QUnit.test("primitives.common.pile -  Closure based segments pile data structure. Sorts and stack segments on top of each other so they occupy minimum space.", function (assert) {
	var items = [
		[1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14]
	];

	var pile = primitives.common.pile();
	for (var index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		pile.add(item[0], item[1], item);
	}

	var result = {};
	var pileHeight = pile.resolve(this, function (from, to, context, offset) {
		if (!result.hasOwnProperty(offset)) {
			result[offset] = [];
		}
		result[offset].push(context);
	});
	assert.equal(pileHeight, 2, "Pile should have two rows.");

	var expectedItems = {
		"0": [[2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14]],
		"1": [[1, 3], [3, 5], [5, 7], [7, 9], [9, 11], [11, 13]]
	};
	assert.deepEqual(result, expectedItems, "Function resolve should group segments into two rows");

	var items = [
		[5, 10], [10, 15],
		[12.5, 13], [13, 14.5],
		[1, 10], [12, 14],
		[5, 13],
		[2, 7], [8, 10], [12, 14],
		[12, 13], [13.5, 15]
	];

	var pile = primitives.common.pile();
	for (var index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		pile.add(item[0], item[1], item);
	}

	var result = {};
	var pileHeight = pile.resolve(this, function (from, to, context, offset) {
		if (!result.hasOwnProperty(offset)) {
			result[offset] = [];
		}
		result[offset].push(context);
	});
	assert.equal(pileHeight, 6, "Pile should have 6 rows.");

	var expectedItems = {
		"0": [[2, 7], [8, 10], [12.5, 13], [13.5, 15]],
		"1": [[5, 10], [12, 13], [13, 14.5]],
		"2": [[1, 10], [12, 14]],
		"3": [[12, 14]],
		"4": [[10, 15]],
		"5": [[5, 13]]
	};
	assert.deepEqual(result, expectedItems, "Function resolve should group segments into 6 rows");

	var items = [
		[70, 90], [70, 80],
		[10, 20], [30, 40],
		[36, 65], [50, 60],
		[10, 35]
	];

	var pile = primitives.common.pile();
	for (var index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		pile.add(item[0], item[1], item);
	}

	var result = {};
	var pileHeight = pile.resolve(this, function (from, to, context, offset) {
		if (!result.hasOwnProperty(offset)) {
			result[offset] = [];
		}
		result[offset].push(context);
	});
	assert.equal(pileHeight, 2, "Pile should have 2 rows.");

	var expectedItems = {
		"0": [[10, 20], [30, 40], [50, 60], [70, 80]],
		"1": [[10, 35], [36, 65], [70, 90]]
	};
	assert.deepEqual(result, expectedItems, "Items should stack on top of each other in 2 layes");
});


/* /Algorithms/QuadTree.Tests.js*/
QUnit.module('Algorithms - QuadTree');

QUnit.test("primitives.common.QuadTree", function (assert) {

	function findCrossedPoints(points, frame) {
		var result = [];

		for (var index = 0; index < points.length; index += 1) {
			var point = points[index];

			if (frame.contains(point)) {
				result.push(point.context.id);
			}
		}

		return result;
	}

	function GetPlacementMarker(placement, label, color) {
		var div = jQuery("<div></div>");

		//div.append(label);
		div.css(placement.getCSS());
		div.css({
			"background": color,
			visibility: "visible",
			position: "absolute",
			font: "Areal",
			"font-size": "12px",
			"border-style": "solid",
			"border-color": "black",
			"border-width": "2px",
			opacity: 0.5
		});

		return div;
	}

	function ShowLayout(fixture, placements, points, frame, title) {
		var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
		titlePlaceholder.append(title);
		fixture.append(titlePlaceholder);

		var offsetX = null;
		var offsetY = null;
		var space = new primitives.common.Rect();
		for (var index = 0; index < placements.length; index += 1) {
			var placement = placements[index];

			offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
			offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

			space.addRect(placement);
		}
		space.addRect(frame);
		offsetX = offsetX == null ? frame.x : Math.min(offsetX, frame.x);
		offsetY = offsetY == null ? frame.y : Math.min(offsetY, frame.y);

		//-------------------------------------------------------------------------
		var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
		placeholder.css({
			width: space.width,
			height: space.height
		});
		for (var index = 0; index < placements.length; index += 1) {
			var placement = placements[index];
			var context = placement.context;
			var placement = new primitives.common.Rect(placements[index]);
			placement.translate(-offsetX, -offsetY);

			var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "grey" : "white");
			placeholder.append(div);
		}
		
		//-------------------------------------------------------------------------

		var placement = new primitives.common.Rect(frame);
		placement.translate(-offsetX, -offsetY);
		var div = GetPlacementMarker(placement, index, "red");
		placeholder.append(div);

		//-------------------------------------------------------------------------

		for (var index = 0; index < points.length; index += 1) {
			var point = points[index];
			var context = point.context;
			var placement = new primitives.common.Rect(point.x - 2, point.y - 2, 4, 4);
			placement.translate(-offsetX, -offsetY);

			var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "blue" : "grey");
			placeholder.append(div);
		}

		var placement = new primitives.common.Rect(frame);
		placement.translate(-offsetX, -offsetY);
		var div = GetPlacementMarker(placement, index, "red");
		placeholder.append(div);


		fixture.append(placeholder);
	}

	function getPoints(items) {
		var result = [];
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			var point = new primitives.common.Point(item[0], item[1]);
			point.context = index;
			result.push(point);
		}
		return result;
	}

	function getQuadTree(points) {
		var result = primitives.common.QuadTree(2);
		for (var index = 0; index < points.length; index += 1) {
			var point = points[index];
			point.context = {
				id: index,
				isHighlighted: false
			};
			result.addPoint(point);
		}
		return result;
	}

	function TestLayout(title, items, selection, hidden) {

		console.time('getPoints');
		var points = getPoints(items);
		console.timeEnd('getPoints')

		console.time('getQuadTree');
		var quadTree = getQuadTree(points);
		console.timeEnd('getQuadTree');

		console.time('loopArea');
		var result = [];
		quadTree.loopArea(this, selection, function (point) {
			result.push(point.context.id);

			point.context.isHighlighted = true;
		});
		console.timeEnd('loopArea');

		if (!hidden) {
			ShowLayout(jQuery("#qunit-fixture"), quadTree.getPositions(selection), points, selection, title);

			jQuery("#qunit-fixture").css({
				position: "relative",
				left: "0px",
				top: "0px",
				height: "Auto"
			});
		}

		console.time('findCrossedPoints');

		var expectedResult = findCrossedPoints(points, selection);

		console.timeEnd('findCrossedPoints');

		console.time('result');
		result.sort();
		expectedResult.sort();

		assert.ok(quadTree.validate(), "Quad tree structure should pass validation");
		assert.deepEqual(result, expectedResult, title);

		console.timeEnd('result');

		console.log("found = " + result.length);
	};

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 10) {
			testData.push([x, x]);
		}

		TestLayout("NW to SE diagonal points test", testData, new primitives.common.Rect(600, 600, 40, 40), false);
	})();

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 10) {
			testData.push([x, 1000 - x]);
		}

		TestLayout("SW to NE diagonal points test", testData, new primitives.common.Rect(690, 250, 40, 40), false);
	})();

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 10) {
			testData.push([x, 512]);
		}

		TestLayout("W to E horizontal points test", testData, new primitives.common.Rect(690, 500, 40, 40), false);
	})();

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 10) {
			for (var y = 0; y < 1000; y += 10) {
				testData.push([x, y]);
			}
		}

		TestLayout("10K Matrix performance test", testData, new primitives.common.Rect(690, 500, 140, 140), true);
	})();
});


/* /Algorithms/RMQ.Tests.js*/
QUnit.module('Algorithms - RMQ - Range Minimum Query');

QUnit.test("primitives.common.RMQ", function (assert) {
	function getRangeMinimum(items, from, to) {
		var result = items[from];
		for (var index = from + 1; index <= to; index += 1) {
			if (items[index] < result) {
				result = items[index];
			}
		}
		return result;
	}

	(function () {
		var items = [
			53, 24, 44, 59, 43, 91, 39, 37, 33, 78,
			32, 34, 93, 88, 76, 74, 63, 99, 86, 47,
			84, 83, 67, 17, 14, 60, 11, 46, 89, 12,
			96, 73, 57, 1, 58, 48, 80, 13, 19, 40,
			20, 82, 29, 2, 100, 77, 35, 36, 56, 5,
			7, 97, 4, 95, 75, 66, 21, 31, 69, 54,
			30, 79, 68, 52, 62, 61, 28, 23, 41, 42,
			8, 27, 45, 3, 90, 26, 22, 71, 38, 98,
			94, 49, 9, 64, 72, 25, 50, 81, 16, 87,
			15, 51, 10, 92, 6, 55, 18, 65, 70, 85
		];
		var rmq = primitives.common.RMQ(items);

		assert.equal(rmq.getRangeMinimum(0, 15), getRangeMinimum(items, 0, 15), "getRangeMinimum test from 0 to 15");
		assert.equal(rmq.getRangeMinimum(45, 99), getRangeMinimum(items, 45, 100), "getRangeMinimum test from 45 to 100");
		assert.equal(rmq.getRangeMinimum(0, 99), getRangeMinimum(items, 0, 100), "getRangeMinimum test from 0 to 100");
		assert.equal(rmq.getRangeMinimum(8, 8), getRangeMinimum(items, 8, 8), "getRangeMinimum test from 8 to 8");
		assert.equal(rmq.getRangeMinimum(50, 51), getRangeMinimum(items, 50, 51), "getRangeMinimum test from 50 to 51");
		assert.equal(rmq.getRangeMinimum(1, 98), getRangeMinimum(items, 1, 99), "getRangeMinimum test from 1 to 99");
		assert.equal(rmq.getRangeMinimum(32, 65), getRangeMinimum(items, 32, 65), "getRangeMinimum test from 32 to 65");
	})();
});

/* /Algorithms/SortedList.Tests.js*/
QUnit.module('Algorithms - SortedList - AVL binary search tree collection implementation.');

QUnit.test("primitives.common.SortedList", function (assert) {
	function getSortedList(items) {
		var sortedList = primitives.common.SortedList();

		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			sortedList.add(item);
		}

		return sortedList;
	};

	function removeItems(sortedList, items) {
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			sortedList.remove(item);
		}
	};

	function addAndRemove(addValues, removeValues) {
		var sortedList = getSortedList(addValues);
		if (removeValues != null) {
			removeItems(sortedList, removeValues);
		}
		return sortedList.validate();
	}

	(function () {
		assert.ok(addAndRemove([3, 7, 8]), "Small left rotation test on addition.");
		assert.ok(addAndRemove([3, 2, 1]), "Small right rotation test on addition.");
		assert.ok(addAndRemove([3, 1, 7, 0, 2, 10, 9, 8]), "Big left rotation test on addition.");
		assert.ok(addAndRemove([6, 4, 8, 7, 9, 1, 2]), "Big right rotation test on addition.");
		assert.ok(addAndRemove([3, 2, 4, 1], [4]), "Small left rotation test on removal.");
		assert.ok(addAndRemove([3, 2, 4, 5], [2]), "Small right rotation test on removal.");
		assert.ok(addAndRemove([3, 2, 7, 1, 5, 8, 4, 6], [1]), "Big left rotation test on removal.");
		assert.ok(addAndRemove([6, 2, 7, 1, 4, 8, 3, 5], [8]), "Big right rotation test on removal.");
		assert.ok(addAndRemove([-4, -3, -2, -1, 0, 1, 2, 3, 4], [-3, 0]), "Small left rotation test on removal.");
		assert.ok(addAndRemove([4, 3, 2, 1, 0, -1, -2, -3, -4], [3, 0]), "Small right rotation test on removal.");
	})();

	(function() {
		var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

		var sortedList = getSortedList(items);

		var result = [];
		sortedList.loopForward(this, null, function (value) {
			result.push(value);
		});

		items.sort(function (a, b) { return a - b; });

		assert.ok(sortedList.validate(), "Sorted list validated.");
		assert.deepEqual(result, items, "loopForward should return all added values ordered.");
	})();

	(function () {
		var items = [0, 60, 180, 220, 260];

		var sortedList = getSortedList(items);

		var result = [];
		sortedList.loopForward(this, 180, function (value) {
			result.push(value);
		});

		assert.deepEqual(result, [180, 220, 260], "loopForward should return all items from the given item including it.");
	})();

	(function () {
		var items = [0, 60, 180, 220, 260];

		var sortedList = getSortedList(items);

		var result = [];
		sortedList.loopBackward(this, 180, function (value) {
			result.push(value);
		});

		assert.deepEqual(result, [180, 60, 0], "loopBackward should return all items from the given item including it.");
	})();

	(function () {
		var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

		var sortedList = getSortedList(items);

		var result = [];
		sortedList.loopBackward(this, null, function (value) {
			result.push(value);
		});

		items.sort(function (a, b) { return b - a; });

		assert.ok(sortedList.validate(), "Sorted list validated.");
		assert.deepEqual(result, items, "loopBackward should return all values in reversed order.");
	})();

	(function () {
		var count = 100;
		var items = [];
		for (var index = -count; index <= count; index += 1) {
			items.push(index);
		}

		var sortedList = getSortedList(items);

		var expected = [];
		for (var index = -count; index <= count; index += 1) {
			if (index % 2 != 0) {
				sortedList.remove(index);
			} else {
				expected.push(index);
			}
		}

		var result = [];
		sortedList.loopForward(this, null, function (value) {
			result.push(value);
		});


		assert.ok(sortedList.validate(), "Sorted list validated.");
		assert.deepEqual(result, expected, "SortedList should return all odd items # " + result.length);
	})();

	(function () {
		var count = 100;
		var items = [];
		for (var index = -count; index <= count; index += 1) {
			items.push(index);
		}

		var expected = []
		for (var index = -count; index <= count; index += 1) {
			if (index % 2 != 0) {
				var itemIndex = items.indexOf(index);
				items.splice(itemIndex, 1);
			} else {
				expected.push(index);
			}
		}
		assert.deepEqual(items, expected, "Performance test for regular array search and remove elements #" + items.length);
	})();
});

/* /Algorithms/SpatialIndex.Tests.js*/
QUnit.module('Algorithms - SpatialIndex');

QUnit.test("primitives.common.SpatialIndex", function (assert) {
	function findCrossedRectangles(placements, frame) {
		var result = [];

		for (var index = 0; index < placements.length; index += 1) {
			var placement = placements[index];

			if (placement.overlaps(frame)) {
				result.push(placement.context.id);
			}
		}

		return result;
	}

	function GetPlacementMarker(placement, label, color) {
		var div = jQuery("<div></div>");

		div.append(label);
		div.css(placement.getCSS());
		div.css({
			"background": color,
			visibility: "visible",
			position: "absolute",
			font: "Areal",
			"font-size": "12px",
			"border-style": "solid",
			"border-color": "black",
			"border-width": "2px",
			opacity: 0.6
		});

		return div;
	}

	function ShowLayout(fixture, placements, frame, title) {
		var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
		titlePlaceholder.append(title);
		fixture.append(titlePlaceholder);

		var offsetX = null;
		var offsetY = null;
		var space = new primitives.common.Rect();
		for (var index = 0; index < placements.length; index += 1) {
			var placement = placements[index];

			offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
			offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

			space.addRect(placement);
		}
		space.addRect(frame);
		offsetX = offsetX == null ? frame.x : Math.min(offsetX, frame.x);
		offsetY = offsetY == null ? frame.y : Math.min(offsetY, frame.y);

		var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
		placeholder.css({
			width: space.width,
			height: space.height
		});
		for (var index = 0; index < placements.length; index += 1) {
			var placement = placements[index];
			var context = placement.context;
			var placement = new primitives.common.Rect(placements[index]);
			placement.translate(-offsetX, -offsetY);

			var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "blue" : "grey");
			placeholder.append(div);
		}

		var placement = new primitives.common.Rect(frame);
		placement.translate(-offsetX, -offsetY);
		var div = GetPlacementMarker(placement, index, "red");
		placeholder.append(div);

		fixture.append(placeholder);
	}

	function getRectangles(items) {
		var result = [];
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
			rect.context = index;
			result.push(rect);
		}
		return result;
	}

	function getSpatialIndex(sizes, rectangles) {
		var result = primitives.common.SpatialIndex(sizes);
		for (var index = 0; index < rectangles.length; index += 1) {
			var rect = rectangles[index];
			rect.context = {
				id: index,
				isHighlighted: false
			};
			result.addRect(rect);
		}
		return result;
	}

	function getSizes(items) {
		var result = [];
		var hash = {};
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			var size = Math.max(item.width, item.height);
			if (!hash.hasOwnProperty(size)) {
				hash[size] = true;
				result.push(size);
			}
		}
		return result;
	}

	function TestLayout(title, items, selection, hidden) {

		console.time('getRectangles');
		var placements = getRectangles(items);
		console.timeEnd('getRectangles')

		console.time('getSpatialIndex');
		var spatialIndex = getSpatialIndex(getSizes(placements), placements);
		console.timeEnd('getSpatialIndex');

		console.time('loopArea');
		
		var result = [];
		spatialIndex.loopArea(this, selection, function (rect) {
			result.push(rect.context.id);

			rect.context.isHighlighted = true;
		});

		console.timeEnd('loopArea');

		if (!hidden) {
			ShowLayout(jQuery("#qunit-fixture"), placements, selection, title);

			//ShowLayout(jQuery("#qunit-fixture"), spatialIndex.getPositions(selection), selection, title);

			jQuery("#qunit-fixture").css({
				position: "relative",
				left: "0px",
				top: "0px",
				height: "Auto"
			});

			

		}

		console.time('findCrossedRectangles');

		var expectedResult = findCrossedRectangles(placements, selection);

		console.timeEnd('findCrossedRectangles');

		console.time('sort');
		result.sort();
		expectedResult.sort();

		assert.ok(spatialIndex.validate(), "Spatial index should pass validation");
		assert.deepEqual(result, expectedResult, title);

		console.timeEnd('sort');
	};

	TestLayout("Spatial Index should bounding rectangle", [
		[0, 0, 100, 100]
	], new primitives.common.Rect(10, 10, 80, 80));

	TestLayout("Spatial Index should bounded rectangle", [
	[10, 10, 80, 80]
	], new primitives.common.Rect(0, 0, 100, 100));

	TestLayout("Spatial Index should touched rectangle", [
		[0, 0, 40, 40]
	], new primitives.common.Rect(40, 0, 40, 40));

	TestLayout("Spatial Index should not return non overlapping rectangle", [
	[0, 0, 40, 40]
	], new primitives.common.Rect(45, 0, 40, 40));

	TestLayout("Multi-layer test case", [
		[0, 0, 40, 280],
		[60, 0, 100, 100],
		[180, 0, 40, 40],
		[180, 60, 40, 40],
		[240, 0, 40, 40],
		[300, 0, 40, 40],
		[240, 60, 40, 40],
		[300, 60, 40, 100],
		[360, 0, 100, 100],
		[480, 0, 40, 40],
		[540, 0, 40, 40],
		[600, 0, 80, 100],
		[480, 60, 40, 140],
		[540, 140, 60, 60],
		[620, 140, 60, 60],
		[60, 120, 160, 160],
		[240, 180, 60, 60],
		[320, 180, 60, 60],
		[400, 180, 60, 60],
		[620, 220, 20, 20],
		[660, 220, 20, 20],
		[240, 260, 20, 20],
		[280, 260, 340, 20],
		[640, 260, 40, 20]
	], new primitives.common.Rect(100, 80, 220, 100));

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 50) {
			for (var y = 0; y < 1000; y += 50) {
				testData.push([x, y, 40, 40]);
			}
		}

		TestLayout("Matrix nesting test", testData, new primitives.common.Rect(710, 210, 200, 700));
	})();

	(function () {
		var testData = [];
		for (var x = 0; x < 1000; x += 10) {
			for (var y = 0; y < 1000; y += 10) {
				testData.push([x, y, 2, 2]);
			}
		}

		TestLayout("Matrix performance test", testData, new primitives.common.Rect(710, 210, 20, 70), true);
	})();
});

/* /Algorithms/Tree.Tests.js*/
QUnit.module('Algorithms - Tree');
QUnit.test("primitives.common.tree -  Closure based tree data structure.", function (assert) {
	var items = [
		{ id: 0, parent: null, name: "0" },
		{ id: 1, parent: 0, name: "1" },
		{ id: 2, parent: 1, name: "2" },
		{ id: 3, parent: 1, name: "3" },
		{ id: 4, parent: 0, name: "4" },
		{ id: 5, parent: 4, name: "5" },
		{ id: 6, parent: 4, name: "6" },
		{ id: 7, parent: 6, name: "6" },
		{ id: 8, parent: 7, name: "8" },
		{ id: 9, parent: 3, name: "9" },
		{ id: 10, parent: 9, name: "10" }
	];

	var tree = primitives.common.tree();
	assert.notOk(tree.hasNodes(), "hasNodes returns false for empty tree.");

	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		tree.add(item.parent, item.id, item);
	}

	assert.ok(tree.hasNodes(), "hasNodes returns true for non-empty tree.");

	var postOrderSequence = [];
	tree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
		postOrderSequence.push(nodeid);
	});
	var expectedChildren = [2, 10, 9, 3, 1, 5, 8, 7, 6, 4, 0];
	assert.deepEqual(postOrderSequence, expectedChildren, "Post order sequence test");

	var preOrderSequence = [];
	tree.loopPreOrder(this, function (nodeid, node) {
		preOrderSequence.push(nodeid);
	});
	var expectedChildren = [0, 1, 2, 3, 9, 10, 4, 5, 6, 7, 8];
	assert.deepEqual(preOrderSequence, expectedChildren, "Pre order sequence test");

	var eulerWalkSequence = [];
	var eulerWalkLevels = [];
	tree.loopEulerWalk(this, function (nodeid, node, level) {
		eulerWalkSequence.push(nodeid);
		eulerWalkLevels.push(level);
	});
	var expectedSequence = [0, 1, 2, 1, 3, 9, 10, 9, 3, 1, 0, 4, 5, 4, 6, 7, 8, 7, 6, 4, 0];
	var expectedLevels = [0, 1, 2, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 1, 2, 3, 4, 3, 2, 1, 0];
	assert.deepEqual(eulerWalkSequence, expectedSequence, "loopEulerWalk - returns tree nodes in Euler Walk sequence");
	assert.deepEqual(eulerWalkLevels, expectedLevels, "loopEulerWalk - returns tree nodes with correct levels");

	var pairs = [];
	tree.zipUp(this, 8, 10, function (firstNodeId, firstParentId, secondNodeid, secondParentId) {
		pairs.push([firstNodeId, secondNodeid]);
	});
	var expectedPairs = [[8, 10], [7, 9], [6, 3], [4, 1]];
	assert.deepEqual(pairs, expectedPairs, "Function zipUp should return pairs of parent items up to the root including initial items");


	var parents = [];
	tree.loopParents(this, 8, function (parentid, parent) {
		parents.push(parentid);
	});

	var expectedItems = [7, 6, 4, 0];
	assert.deepEqual(parents, expectedItems, "Function loopParents should return parent items up to the root");

	var rootItems = [];
	tree.loopLevels(this, function (nodeid, node, levelid) {
		if (levelid > 0) {
			return tree.BREAK;
		}
		rootItems.push(nodeid);
	});
	assert.deepEqual(rootItems, [0], "Function loopLevels should break loop on BREAK.");

	var levels = [];
	tree.loopLevels(this, function (nodeid, node, levelid) {
		if (levels[levelid] == null) {
			levels[levelid] = [nodeid];
		} else {
			levels[levelid].push(nodeid);
		}
	});

	assert.deepEqual(levels, [[0], [1, 4], [2, 3, 5, 6], [9, 7], [10, 8]], "loopLevels function test");

	assert.equal(tree.parent(0), null, "Parent of 0 item is null.");
	assert.equal(tree.node(100), null, "Node 100 does not exists.");
	assert.equal(tree.parent(6).id, 4, "Parent of item 6 is 4.");


	var children = [];
	tree.loopChildren(this, 4, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [5, 6], "loopChildren function test for item 4");

	tree.adopt(3, 10);
	var children = [];
	tree.loopChildren(this, 3, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [9, 10], "Item 3 should contain adopted item 10");

	var children = [];
	tree.loopChildren(this, 9, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [], "Item 9 should have no children");

	var items = [
		{ id: 1, name: "1" },
		{ id: 2, name: "2" },
		{ id: 3, name: "3" },
		{ id: 4, parent: 100, name: "4" },
		{ id: 5, parent: 101, name: "5" },
		{ id: 6, parent: 102, name: "6" },
		{ id: 7, parent: 4, name: "7" },
		{ id: 8, parent: 5, name: "8" },
		{ id: 9, parent: 6, name: "9" },
		{ id: 10, parent: 7, name: "10" },
		{ id: 11, parent: 8, name: "11" },
		{ id: 12, parent: 9, name: "12" }
	];

	var tree2 = primitives.common.tree();
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		tree2.add(item.parent, item.id, item);
	}

	var nodes = [];
	tree2.loopLevels(this, function (nodeid, node, levelIndex) {
		if (nodeid != 1) {
			nodes.push(nodeid);
		}
	});

	for (var index = 0; index < nodes.length; index += 1) {
		var itemid = nodes[index];
		tree2.adopt(1, itemid);
	}

	var children = [];
	tree2.loopChildren(this, 1, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [4, 5, 6, 2, 3, 7, 8, 9, 10, 11, 12], "Item 1 should have adopted all children");

	var children = [];
	tree2.loopChildrenRange(this, 1, 3, 8, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [2, 3, 7, 8, 9, 10], "Item 1 children in range from 3 to 8");

	var children = [];
	tree2.loopChildrenRange(this, 1, 8, 3, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [10, 9, 8, 7, 3, 2], "Item 1 children in range from 8 to 3");

	var children = [];
	tree2.loopChildrenRange(this, 1, 8, 100, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [10, 11, 12], "Item 1 children in range from 8 to 100");

	var children = [];
	tree2.loopChildrenRange(this, 1, 3, -1, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [2, 6, 5, 4], "Item 1 children in range from 3 to -1");

	var children = [];
	tree2.loopChildrenReversed(this, 1, function (nodeid, node) {
		children.push(nodeid);
	});
	assert.deepEqual(children, [12, 11, 10, 9, 8, 7, 3, 2, 6, 5, 4], "Reversed children of item 1");

	var items = [
		{ id: 1 },
		{ id: 2, parent: 1 },
		{ id: 3, parent: 1 },
		{ id: 4, parent: 1 }
	];

	var tree = primitives.common.tree();
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		tree.add(item.parent, item.id, item);
	}

	assert.equal(tree.getChild(1, 0).id, 2, "getChild returns node 2 for parent 1 at 0 position.");
	assert.equal(tree.getChild(1, 2).id, 4, "getChild returns node 4 for parent 1 at 2 position.");
	assert.equal(tree.getChild(1, 3), null, "getChild returns null child for parent 1 at 3 position.");

	tree.insert(1, 100, {});
	tree.insert(4, 400, {});

	var children = [];
	tree.loopLevels(this, function (nodeid, node, level) {
		if (children[level] == null) {
			children[level] = { level: level, items: [] };
		}
		children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
	});
	var expectedChildren = [{ "level": 0, "items": [{ "id": 1, "parent": null }] },
		{ "level": 1, "items": [{ "id": 100, "parent": 1 }] },
		{ "level": 2, "items": [{ "id": 2, "parent": 100 }, { "id": 3, "parent": 100 }, { "id": 4, "parent": 100 }] },
		{ "level": 3, "items": [{ "id": 400, "parent": 4 }] }
	];
	assert.deepEqual(children, expectedChildren, "insert function should change tree to the 3 level structure");


	var items = [
		{ id: 1 },
		{ id: 10 },
		{ id: 2, parent: 1 },
		{ id: 3, parent: 1 },
		{ id: 4, parent: 1 },
		{ id: 11, parent: 10 },
		{ id: 12, parent: 10 }
	];

	var tree = primitives.common.tree();
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		tree.add(item.parent, item.id, item);
	}

	tree.moveChildren(1, 10);

	var children = [];
	tree.loopLevels(this, function (nodeid, node, level) {
		if (children[level] == null) {
			children[level] = { level: level, items: [] };
		}
		children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
	});
	var expectedChildren = [{ "level": 0, "items": [{ "id": 1, "parent": null }, { "id": 10, "parent": null }] },
		{ "level": 1, "items": [{ "id": 11, "parent": 10 }, { "id": 12, "parent": 10 }, { "id": 2, "parent": 10 }, { "id": 3, "parent": 10 }, { "id": 4, "parent": 10 }] }
	];

	assert.deepEqual(children, expectedChildren, "moveChildren function test");
});


/* /Algorithms/TreeLevels.Tests.js*/
QUnit.module('Algorithms - TreeLevels is collection of collections structure');

QUnit.test("primitives.common.TreeLevels", function (assert) {
	function getTreeLevels(levels) {
		var treeLevels = primitives.common.TreeLevels();
		for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
			var level = levels[levelIndex];
			for (var index = 0, len = level.length; index < len; index += 1) {
				treeLevels.addItem(levelIndex, level[index], { id: level[index] });
			}
		}
		return treeLevels;
	};

	(function () {
		var treeLevels = primitives.common.TreeLevels();
		assert.ok(treeLevels.isEmpty(), "isEmpty function returns true for empty structure");
	})();

	(function () {
		var treeLevels = primitives.common.TreeLevels();
		treeLevels.addlevel(1, "Level 1");
		assert.notOk(treeLevels.isEmpty(), "isEmpty function returns false for none empty structure");
	})();

	(function () {
		var treeLevels = primitives.common.TreeLevels();
		treeLevels.addlevel(1, "Level 1");
		assert.ok(treeLevels.hasLevel(1), "hasLevel function");
	})();

	(function () {
		var treeLevels = primitives.common.TreeLevels();
		treeLevels.addlevel(1, "Level 1");
		treeLevels.addlevel(2, "Level 2");
		assert.ok(treeLevels.hasLevel(1) && treeLevels.hasLevel(2), "hasLevel function test for 2 levels contexts");
	})();

	(function () {
		var treeLevels = primitives.common.TreeLevels();
		treeLevels.addItem(1, 100, { name: "Item 1 Name", descriptions: "Item 1 Description" });
		assert.ok(treeLevels.hasItem(100), "hasItem function checkes item presence in structure");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[],
			[7, 8, 9, 10]
		]);

		var result = [];
		treeLevels.loopLevels(this, function (index, level) {
			result.push(index);
		})
		assert.deepEqual(result, [0, 1, 2, 4], "loopLevels function indexes levels");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[],
			[7, 8, 9, 10]
		]);

		var result = [];
		treeLevels.loopLevelsReversed(this, function (index, level) {
			result.push(index);
		})
		assert.deepEqual(result, [4, 2, 1, 0], "loopLevelsReversed function indexes levels in reversed order");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[],
			[7, 8, 9, 10]
		]);

		var result = [];
		treeLevels.loopLevelItems(this, 2, function (itemid, context, position) {
			result.push([itemid, context.id, position]);
		})

		var expectedResult = [
			[4, 4, 0],
			[5, 5, 1],
			[6, 6, 2]
		];
		assert.deepEqual(result, expectedResult, "loopLevelItems function loops items of the level");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[],
			[7, 8, 9, 10]
		]);

		assert.equal(treeLevels.getLevelIndex(6), 2, "getLevelIndex function returns index of items level");
		assert.equal(treeLevels.getItemPosition(8), 1, "getItemPosition function returns item position at level");
		assert.equal(treeLevels.getItemAtPosition(2, 1), 5, "getItemAtPosition function returns item at given level position");
		assert.equal(treeLevels.getPrevItem(5), 4, "getPrevItem function returns previous item at the level");
		assert.equal(treeLevels.getPrevItem(7), null, "getPrevItem function returns null for the first item of the level");
		assert.equal(treeLevels.getNextItem(5), 6, "getNextItem function returns next item at the level");
		assert.equal(treeLevels.getNextItem(10), null, "getNextItem function returns null for the last item of the level");
		assert.equal(treeLevels.getLevelLength(3), 0, "getLevelLength function returns 0 for omitted level");
		assert.equal(treeLevels.getLevelLength(4), 4, "getLevelLength function returns number of items at the level");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3, 5],
			[4, 5, 6],
			[5],
			[7, 8, 9, 5, 10]
		]);

		assert.equal(treeLevels.getLevelIndex(5), 1, "getLevelIndex function returns index of items start level");
		assert.equal(treeLevels.getEndLevelIndex(5), 4, "getEndLevelIndex function returns index of items end level");

		assert.equal(treeLevels.getItemPosition(5), 2, "getItemPosition function returns item position at start level");
		assert.equal(treeLevels.getItemPosition(5, 2), 1, "getItemPosition function returns item position at middle level");
		assert.equal(treeLevels.getItemPosition(5, 4), 3, "getItemPosition function returns item position at end level");

		assert.equal(treeLevels.getItemAtPosition(2, 1), 5, "getItemAtPosition function returns item at given level position");

		assert.equal(treeLevels.getPrevItem(5), 3, "getPrevItem function returns previous item at the items start level");
		assert.equal(treeLevels.getPrevItem(5, 2), 4, "getPrevItem function returns previous item at the items middle level");
		assert.equal(treeLevels.getPrevItem(5, 4), 9, "getPrevItem function returns previous item at the items end level");

		assert.equal(treeLevels.getNextItem(5), null, "getNextItem function returns next item at the items start level");
		assert.equal(treeLevels.getNextItem(5, 2), 6, "getNextItem function returns next item at the items middle level");
		assert.equal(treeLevels.getNextItem(5, 4), 10, "getNextItem function returns next item at the items end level");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[],
			[7, 8, 9, 10]
		]);

		var result = [];
		treeLevels.loopItems(this, function (itemid, item, position, levelIndex, level) {
			result.push([itemid, position, levelIndex]);
		})

		var expectedResult = [
		  [1, 0, 0],
		  [2, 0, 1], [3, 1, 1],
		  [4, 0, 2], [5, 1, 2], [6, 2, 2],
		  [7, 0, 4], [8, 1, 4], [9, 2, 4], [10, 3, 4]
		];
		assert.deepEqual(result, expectedResult, "loopItems function loops items in structure");
	})();

	(function () {
		var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

		var result = treeLevels.binarySearch(this, 0, function (itemid) {
			return 4.2 - itemid;
		})

		assert.deepEqual(result, 4, "binarySearch function returns nearest item at the level");
	})();

	(function () {
		var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

		var result = treeLevels.binarySearch(this, 0, function (itemid) {
			return 0 - itemid;
		})

		assert.deepEqual(result, 1, "binarySearch function returns first item of collection for item beyond the left margin");
	})();

	(function () {
		var treeLevels = getTreeLevels([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);

		var result = treeLevels.binarySearch(this, 0, function (itemid) {
			return 15 - itemid;
		})

		assert.deepEqual(result, 10, "binarySearch function returns the last item of collection for item beyond the last item");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
			[1, 2, 12, 4, 5, 6]
		]);

		var result = [];

		treeLevels.loopFromItem(this, 12, false, function (itemid, item) {
			result.push([itemid, item.id]);
		});

		var expectedResult = [
			[13, 13],
			[14, 14],
			[15, 15],
			[16, 16]
		];

		assert.deepEqual(result, expectedResult, "loopFromItem function returns items up to the end of level starting from item");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
			[1, 2, 12, 4, 5, 6]
		]);

		var result = [];

		treeLevels.loopFromItem(this, 12, false, function (itemid, item) {
			result.push(itemid);
		}, 1);

		assert.deepEqual(result, [4, 5, 6], "loopFromItem function returns items up to the end of level starting from item");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
			[1, 2, 12, 3, 4, 5, 6]
		]);

		var result = [];

		treeLevels.loopFromItem(this, 12, true, function (itemid, item) {
			result.push([itemid, item.id]);
		});

		var expectedResult = [
			[11, 11],
			[10, 10],
			[9, 9],
			[8, 8],
			[7, 7]
		];

		assert.deepEqual(result, expectedResult, "loopFromItem function returns items up to the start of the level starting from item");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
			[1, 2, 12, 3, 4, 5, 6]
		]);

		var result = [];

		treeLevels.loopFromItem(this, 12, true, function (itemid, item) {
			result.push(itemid);
		}, 1);

		assert.deepEqual(result, [2, 1], "loopFromItem function returns items up to the start of the level starting from item");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[5],
			[7, 8, 9, 10],
			[11, 12, 13],
			[14]
		]);

		var result = [];
		treeLevels.loopLevelsFromItem(this, 5, false, function (levelIndex, level) {
			result.push(levelIndex);
		});

		var expectedResult = [1, 0];

		assert.deepEqual(result, expectedResult, "loopLevelsFromItem function returns level indexes above the item starting for the immidiate level above");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1],
			[2, 3],
			[4, 5, 6],
			[5],
			[7, 8, 9, 10],
			[11, 12, 13],
			[14]
		]);

		var result = [];
		treeLevels.loopLevelsFromItem(this, 5, true, function (levelIndex, level) {
			result.push(levelIndex);
		});

		var expectedResult = [4, 5, 6];

		assert.deepEqual(result, expectedResult, "loopLevelsFromItem function returns level indexes below the item starting for the immidiate level below");
	})();

	(function () {
		var treeLevels = getTreeLevels([
			[1, 6, 9],
			[2, 3, 5, 8],
			[4, 5],
			[],
			[7, 10]
		]);

		var result = [];
		treeLevels.loopMerged(this, function (itemid) {
			return itemid;
		}, function (itemid, item) {
			result.push(itemid);
		});

		var expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		assert.deepEqual(result, expectedResult, "loopMerged function returns merged levels into one collection by weight");
	})();

	(function () {
		var expectedResult = [
			[1, 6, 9],
			[2, 3, 8],
			[4, 5],
			[7, 10]
		];
		var treeLevels = getTreeLevels(expectedResult).clone();


		var result = [];
		treeLevels.loopLevels(this, function (index, level) {
			var levelItems = [];
			treeLevels.loopLevelItems(this, index, function (itemid, context, position) {
				levelItems.push(itemid);
			})
			result.push(levelItems);
		})


		assert.deepEqual(result, expectedResult, "clone function returns copy of existing structure");
	})();
});

/* /Cases/common/helpers.js*/
(function () {

	var namespace = function (name) {
		var namespaces = name.split('.'),
			namespace = window,
			index;
		for (index = 0; index < namespaces.length; index += 1) {
			namespace = namespace[namespaces[index]] = namespace[namespaces[index]] || {};
		}
		return namespace;
	};

	namespace("primitives.helpers.tests");

}());

primitives.helpers.tests.CreateFearture = function () {
	var $fixture = document.getElementById("qunit-fixture");
	$fixture.appendChild(primitives.common.JsonML.toHTML(["div",
		{
			id: "basicdiagram",
			style: {
				width: "640px",
				height: "480px",
				borderStyle: "dotted",
				borderWidth: "1px"
			}
		}
	]));

	primitives.common.JsonML.applyStyles(document.getElementById("qunit-fixture"), {
		position: "relative",
		left: "0px",
		top: "0px",
		height: "Auto"
	});
};


primitives.helpers.tests.CreateOrgDiagram = function(options){
	return primitives.orgdiagram.Control(document.getElementById("basicdiagram"), options);
};

primitives.helpers.tests.CreateFamDiagram = function (options) {
	return primitives.famdiagram.Control(document.getElementById("basicdiagram"), options);
};

primitives.helpers.tests.getPosition = function (element) {
	var offset = primitives.common.getElementOffset(element);
	var size = primitives.common.getInnerSize(element);
	return new primitives.common.Rect(offset.left, offset.top, size.width, size.height);
};

primitives.helpers.tests.getItemsPlacements = function (control, items) {
	// Find items placements
	var itemsPlacements = {};
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		var id = item.hasOwnProperty("id") ? item.id : item;
		control.setOption("highlightItem", id);
		control.update(primitives.common.UpdateMode.PositonHighlight);
		var highlight = document.getElementsByClassName("bp-highlight-frame")[0];
		var placement = primitives.helpers.tests.getPosition(highlight);
		itemsPlacements[id] = placement;
	}
	return itemsPlacements;
};



/* /Cases/CaseFirstOrganizationalChart.Tests.js*/
QUnit.module('Cases');
QUnit.test("First organizational chart", function (assert) {
	function getItemsTitles(control, items) {
		// Collect available titles
		var positions = [];
		var elements = document.getElementsByClassName("bp-title");
		for (var index = 0; index < elements.length; index += 1) {
			var element = elements[index];
			var position = primitives.helpers.tests.getPosition(element);
			positions.push({
				position: position,
				title: element.textContent
			});
		}

		var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

		var result = {};
		for (var index = 0; index < items.length; index += 1) {
			var id = items[index].id;
			var placement = itemsPlacements[id];

			result[id] = 0;
			for (var bIndex = 0; bIndex < positions.length; bIndex += 1) {
				var position = positions[bIndex].position;

				if (placement.contains(position)) {
					result[id] = positions[bIndex].title;
				}
			}
		}
		return result;
	}

	primitives.helpers.tests.CreateFearture();

	var options = new primitives.orgdiagram.Config();

	var items = [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: "samples/images/photos/a.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			image: "samples/images/photos/c.png"
		})
	];

	options.items = items;
	options.cursorItem = 0;
	options.hasSelectorCheckbox = primitives.common.Enabled.True;

	var control = primitives.helpers.tests.CreateOrgDiagram(options);

	var result = getItemsTitles(control, items);

	var expectedResult = {};
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		expectedResult[item.id] = item.title;
	}
	assert.deepEqual(result, expectedResult, "Items contain correct titles.")
});

/* /Cases/CaseInactiveFamilyItems.Tests.js*/
QUnit.module('Cases');
QUnit.test("Inactive Family Items", function (assert) {
	function getItemsTitles(control, items) {
		// Collect available titles
		var positions = [];
		var elements = document.getElementsByClassName("bp-title");
		for (var index = 0; index < elements.length; index += 1) {
			var element = elements[index];
			var position = primitives.helpers.tests.getPosition(element);
			positions.push({
				position: position,
				title: element.textContent
			});
		}

		var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

		var result = {};
		for (var index = 0; index < items.length; index += 1) {
			var id = items[index];
			var placement = itemsPlacements[id];

			result[id] = 0;
			for (var bIndex = 0; bIndex < positions.length; bIndex += 1) {
				var position = positions[bIndex].position;

				if (placement.contains(position)) {
					result[id] = positions[bIndex].title;
				}
			}
		}
		return result;
	}

	function getInactiveItemTemplate() {
		var result = new primitives.famdiagram.TemplateConfig();
		result.name = "InactiveItemTemplate";
		result.isActive = false;
		return result;
	}

	primitives.helpers.tests.CreateFearture();

	var options = new primitives.famdiagram.Config();

	var items = [
		new primitives.famdiagram.ItemConfig({
			id: 0,
			parents: null,
			title: "Scott Aasrud",
			description: "Cursor Item",
			image: "samples/images/photos/a.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 1,
			parents: null,
			title: "Scott Aasrud 2",
			description: "Spouse of cursor item",
			image: "samples/images/photos/a.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 2,
			parents: [0, 1],
			templateName: "InactiveItemTemplate",
			title: "Finance",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 3,
			parents: [2],
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 4,
			parents: [0, 1],
			templateName: "InactiveItemTemplate",
			title: "Sales",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 5,
			parents: [4],
			title: "Fritz Stuger",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 6,
			parents: [0, 1],
			templateName: "InactiveItemTemplate",
			title: "Operations",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 7,
			parents: [6],
			title: "Brad Whitt",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 8,
			parents: [0, 1],
			templateName: "InactiveItemTemplate",
			title: "IT",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 9,
			parents: [8],
			title: "Ted Whitt",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.famdiagram.ItemConfig({
			id: 19,
			parents: [8],
			title: "Ted Whitt 2",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		{
			id: 20,
			parents: [3],
			description: "VP, Security Technology Unit (STU)",
			image: "samples/images/photos/c.png",
			title: "Robert Morgan"
		},
		{
			id: 21,
			parents: [3],
			description: "GM, Software Serviceability",
			image: "samples/images/photos/c.png",
			title: "Ida Benefield"
		},
		{
			id: 22,
			parents: [5],
			description: "GM, Core Operating System Test",
			image: "samples/images/photos/c.png",
			title: "Vada Duhon"
		},
		{
			id: 23,
			parents: [5],
			description: "GM, Global Platform Technologies and Services",
			image: "samples/images/photos/c.png",
			title: "William Loyd"
		},
		{
			id: 24,
			parents: [7],
			description: "Sr. VP, NAME & Personal Services Division",
			image: "samples/images/photos/c.png",
			title: "Craig Blue"
		},
		{
			id: 25,
			parents: [7],
			description: "VP, NAME Communications Services and Member Platform",
			image: "samples/images/photos/c.png",
			title: "Joel Crawford"
		},
		{
			id: 26,
			parents: [9],
			description: "VP & CFO, NAME",
			image: "samples/images/photos/c.png",
			title: "Barbara Lang"
		},
		{
			id: 27,
			parents: [9],
			description: "VP, NAME Operations",
			image: "samples/images/photos/c.png",
			title: "Barbara Faulk"
		},
		{
			id: 28,
			parents: [19],
			description: "VP, NAME Global Sales & Marketing", 
			image: "samples/images/photos/c.png",
			title: "Stewart Williams"
		},
		{
			id: 29,
			parents: [19],
			description: "Sr. VP, NAME Information Services & Merchant Platform",
			image: "samples/images/photos/c.png",
			title: "Robert Lemieux"
		}
	];

	options.items = items;
	options.cursorItem = 0;
	options.neighboursSelectionMode = primitives.common.NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses;
	options.templates = [getInactiveItemTemplate()];
	options.hasSelectorCheckbox = primitives.common.Enabled.False;
	options.normalLevelShift = 20;
	options.dotLevelShift = 20;
	options.lineLevelShift = 10;
	options.normalItemsInterval = 10;
	options.dotItemsInterval = 10;
	options.lineItemsInterval = 4;

	var control = primitives.helpers.tests.CreateFamDiagram(options);

	var itemsToCheck = [0, 1, 3, 5, 7, 9, 19];
	var result = getItemsTitles(control, itemsToCheck);

	var itemsToCheckHash = {};
	for(var index = 0; index < itemsToCheck.length; index+=1) {
		itemsToCheckHash[itemsToCheck[index]] = true;
	}

	var expectedResult = {};
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		if (itemsToCheckHash.hasOwnProperty(item.id)) {
			expectedResult[item.id] = item.title;
		}
	}
	assert.deepEqual(result, expectedResult, "Children of inactive items have normal size.")
});

/* /Cases/CaseInactiveItems.Tests.js*/
QUnit.module('Cases');
QUnit.test("Inactive Organizational Chart Items", function (assert) {
	function getItemsTitles(control, items) {
		// Collect available titles
		var positions = [];
		var elements = document.getElementsByClassName("bp-title");
		for (var index = 0; index < elements.length; index += 1) {
			var element = elements[index];
			var position = primitives.helpers.tests.getPosition(element);
			positions.push({
				position: position,
				title: element.textContent
			});
		}

		var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

		var result = {};
		for (var index = 0; index < items.length; index += 1) {
			var id = items[index];
			var placement = itemsPlacements[id];

			result[id] = 0;
			for (var bIndex = 0; bIndex < positions.length; bIndex += 1) {
				var position = positions[bIndex].position;

				if (placement.contains(position)) {
					result[id] = positions[bIndex].title;
				}
			}
		}
		return result;
	}

	function getInactiveItemTemplate() {
		var result = new primitives.orgdiagram.TemplateConfig();
		result.name = "InactiveItemTemplate";
		result.isActive = false;
		return result;
	}

	primitives.helpers.tests.CreateFearture();

	var options = new primitives.orgdiagram.Config();

	var items = [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parents: null,
			title: "Scott Aasrud",
			description: "Cursor Item",
			image: "samples/images/photos/a.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			templateName: "InactiveItemTemplate",
			title: "Finance",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 3,
			parent: 2,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 4,
			parent: 0,
			templateName: "InactiveItemTemplate",
			title: "Sales",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 5,
			parent: 4,
			title: "Fritz Stuger",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 6,
			parent: 0,
			templateName: "InactiveItemTemplate",
			title: "Operations",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 7,
			parent: 6,
			title: "Brad Whitt",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 8,
			parent: 0,
			templateName: "InactiveItemTemplate",
			title: "IT",
			itemTitleColor: "Green",
			description: "Item has inactive template",
			image: "samples/images/photos/i.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 9,
			parent: 8,
			title: "Ted Whitt",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 19,
			parent: 8,
			title: "Ted Whitt 2",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		{
			id: 20,
			parent: 3,
			description: "VP, Security Technology Unit (STU)",
			image: "samples/images/photos/c.png",
			title: "Robert Morgan"
		},
		{
			id: 21,
			parent: 3,
			description: "GM, Software Serviceability",
			image: "samples/images/photos/c.png",
			title: "Ida Benefield"
		},
		{
			id: 22,
			parent: 5,
			description: "GM, Core Operating System Test",
			image: "samples/images/photos/c.png",
			title: "Vada Duhon"
		},
		{
			id: 23,
			parent: 5,
			description: "GM, Global Platform Technologies and Services",
			image: "samples/images/photos/c.png",
			title: "William Loyd"
		},
		{
			id: 24,
			parent: 7,
			description: "Sr. VP, NAME & Personal Services Division",
			image: "samples/images/photos/c.png",
			title: "Craig Blue"
		},
		{
			id: 25,
			parent: 7,
			description: "VP, NAME Communications Services and Member Platform",
			image: "samples/images/photos/c.png",
			title: "Joel Crawford"
		},
		{
			id: 26,
			parent: 9,
			description: "VP & CFO, NAME",
			image: "samples/images/photos/c.png",
			title: "Barbara Lang"
		},
		{
			id: 27,
			parent: 9,
			description: "VP, NAME Operations",
			image: "samples/images/photos/c.png",
			title: "Barbara Faulk"
		},
		{
			id: 28,
			parent: 19,
			description: "VP, NAME Global Sales & Marketing", 
			image: "samples/images/photos/c.png",
			title: "Stewart Williams"
		},
		{
			id: 29,
			parent: 19,
			description: "Sr. VP, NAME Information Services & Merchant Platform",
			image: "samples/images/photos/c.png",
			title: "Robert Lemieux"
		}
	];

	options.items = items;
	options.cursorItem = 0;
	options.templates = [getInactiveItemTemplate()];
	options.hasSelectorCheckbox = primitives.common.Enabled.False;
	options.normalLevelShift = 20;
	options.dotLevelShift = 20;
	options.lineLevelShift = 10;
	options.normalItemsInterval = 10;
	options.dotItemsInterval = 10;
	options.lineItemsInterval = 4;

	var control = primitives.helpers.tests.CreateOrgDiagram(options);

	var itemsToCheck = [0, 3, 5, 7, 9, 19];
	var result = getItemsTitles(control, itemsToCheck);

	var itemsToCheckHash = {};
	for(var index = 0; index < itemsToCheck.length; index+=1) {
		itemsToCheckHash[itemsToCheck[index]] = true;
	}

	var expectedResult = {};
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		if (itemsToCheckHash.hasOwnProperty(item.id)) {
			expectedResult[item.id] = item.title;
		}
	}
	assert.deepEqual(result, expectedResult, "Children of inactive items have normal size.")
});

/* /Cases/hasButtons.Tests.js*/
QUnit.module('Cases');
QUnit.test("hasButtons", function (assert) {
	function getButtonsCount(items) {
		// Collect available buttons
		var buttonsPositions = [];
		var buttons = document.getElementsByClassName("bp-button");
		for (var index = 0; index < buttons.length; index += 1) {
			var position = primitives.helpers.tests.getPosition(buttons[index]);
			buttonsPositions.push(position);
		}

		var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

		var result = {};
		for (var index = 0; index < items.length; index += 1) {
			var id = items[index].id;
			var placement = itemsPlacements[id];

			result[id] = 0;
			for (var bIndex = 0; bIndex < buttonsPositions.length; bIndex += 1) {
				var position = buttonsPositions[bIndex];

				if (placement.contains(position)) {
					result[id] += 1;
				}
			}
		}
		return result;
	}

	primitives.helpers.tests.CreateFearture();

	var options = new primitives.orgdiagram.Config();

	var items = [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: "samples/images/photos/a.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			image: "samples/images/photos/c.png"
		})
	];

	var buttons = [];
	buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", "Delete"));
	buttons.push(new primitives.orgdiagram.ButtonConfig("properties", "ui-icon-gear", "Info"));
	buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));

	options.items = items;
	options.buttons = buttons;
	options.cursorItem = 0;
	options.hasButtons = primitives.common.Enabled.True;

	var control = primitives.helpers.tests.CreateOrgDiagram(options);

	var result = getButtonsCount(items);

	assert.deepEqual(result, { "0": 3, "1": 3, "2": 3 }, "Every item should contain 3 buttons.");

	control.setOptions({
		items: items,
		buttons: buttons,
		cursorItem: 0,
		hasButtons: primitives.common.Enabled.Auto
	});
	control.update();

	var result = getButtonsCount(items);

	assert.deepEqual(result, { "0": 3, "1": 0, "2": 0 }, "Only cursor item should contain 3 buttons.");

	control.setOptions({
		items: items,
		buttons: buttons,
		cursorItem: 2,
		hasButtons: primitives.common.Enabled.Auto
	});
	control.update();

	var result = getButtonsCount(items);

	assert.deepEqual(result, { "0": 0, "1": 0, "2": 3 }, "Only new cursor item should contain 3 buttons.");

	control.setOptions({
		items: items,
		buttons: buttons,
		cursorItem: 2,
		hasButtons: primitives.common.Enabled.False
	});
	control.update();

	var result = getButtonsCount(items);

	assert.deepEqual(result, { "0": 0, "1": 0, "2": 0 }, "Buttons should be hidden.");
});

/* /Cases/hasSelectorCheckbox.Tests.js*/
QUnit.module('Cases');
QUnit.test("hasSelectorCheckbox", function (assert) {
	primitives.helpers.tests.CreateFearture();

	var options = new primitives.orgdiagram.Config();
	var items = [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: "samples/images/photos/a.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			image: "samples/images/photos/c.png"
		})
	];

	options.items = items;
	options.cursorItem = 0;
	options.hasSelectorCheckbox = primitives.common.Enabled.True;

	var control = primitives.helpers.tests.CreateOrgDiagram(options);

	var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
	var result = [];
	for (var index = 0; index < checkboxes.length; index += 1) {
		var id = checkboxes[index].getAttribute("data-id");
		result.push(id);
	}
	assert.deepEqual(result, ["0", "1", "2"], "Chart should contain 3 selection check boxes.")

	control.setOptions({
		hasSelectorCheckbox: primitives.common.Enabled.Auto
	});
	control.update();

	var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
	var result = [];
	for (var index = 0; index < checkboxes.length; index += 1) {
		var id = checkboxes[index].getAttribute("data-id");
		result.push(id);
	}
	assert.deepEqual(result, ["0"], "Chart should contain selection check box only for cursor item.")

	control.setOptions({
		cursorItem: "2"
	});
	control.update();

	var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
	var result = [];
	for (var index = 0; index < checkboxes.length; index += 1) {
		var id = checkboxes[index].getAttribute("data-id");
		result.push(id);
	}
	assert.deepEqual(result, ["2"], "If cursor item changed then selection check box should be shown for selected cursor item.")

	control.setOptions({
		hasSelectorCheckbox: primitives.common.Enabled.False,
		cursorItem: "2"
	});
	control.update();

	var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
	assert.equal(checkboxes.length, 0, "If checboxes disabled, chart should not contain them.")
});

/* /Cases/selectCheckBoxLabel.Tests.js*/
QUnit.module('Cases');
QUnit.test("selectCheckBoxLabel", function (assert) {
	primitives.helpers.tests.CreateFearture();

	var options = new primitives.orgdiagram.Config();
	var items = [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: "samples/images/photos/a.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: "samples/images/photos/b.png"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			image: "samples/images/photos/c.png"
		})
	];

	options.items = items;
	options.cursorItem = 2;
	options.selectCheckBoxLabel = "custom";
	options.hasSelectorCheckbox = primitives.common.Enabled.True;

	var control = primitives.helpers.tests.CreateOrgDiagram(options);

	var checkboxes = document.getElementsByClassName("bp-selectiontext");
	var result = [];
	for (var index = 0; index < checkboxes.length; index += 1) {
		var id = checkboxes[index].textContent;
		result.push(id);
	}
	assert.deepEqual(result, ["custom", "custom", "custom"], "Custom slection checkbox label test.")

});

/* /Common/Functions.Tests.js*/
QUnit.module('Common - Functions');

QUnit.test("primitives.common.isEmptyObject - test for empty object.", function (assert) {
	assert.ok(primitives.common.isEmptyObject({}), "Object is empty returns true");
	assert.notOk(primitives.common.isEmptyObject({ a: 1000 }), "Object is not empty returns false");
});

QUnit.test("primitives.common.isNullOrEmpty - test for empty string.", function (assert) {
	assert.ok(primitives.common.isNullOrEmpty(""), "String is empty returns true");
	assert.ok(primitives.common.isNullOrEmpty(null), "String is null returns true");
	assert.notOk(primitives.common.isNullOrEmpty("Some string"), "String is not empty returns false");
});

QUnit.test("primitives.common.indexOf - test for object position.", function (assert) {
	assert.equal(primitives.common.indexOf([{ a: 2 }, { a: 5 }, { a: 3 }, { a: 10 }, { a: 8 }, { a: 4 }], { a: 3 }, function (a, b) { return a.a == b.a; }), 2, "Object");
	assert.equal(primitives.common.indexOf([2, 5, 3, 10, 8, 4, 1], 3), 2, "Integer");
	assert.equal(primitives.common.indexOf([2, 5, 3, 10, 8, 4, 1], 24), -1, "Integer was not found");
});

QUnit.test("primitives.common.compareArrays - compare non-object non-sorted arrays.", function (assert) {
	assert.ok(primitives.common.compareArrays([], []), "Empty arrays are equal");
	assert.notOk(primitives.common.compareArrays([1], []), "First array is empty and second is not. Arrays are not equal");
	assert.notOk(primitives.common.compareArrays([], [1]), "First array is not empty and second is empty. Arrays are not equal");
	assert.ok(primitives.common.compareArrays([1, 1, 1, 2, 2, 3, 3, 3, 3], [1, 2, 3, 1, 2, 3, 1, 3, 3]), "Compare equal non sorted arrays having duplicates. Arrays are equal");
	assert.ok(primitives.common.compareArrays(['A', 'B', 'AB', 'AC'], ['AC', 'AB', 'A', 'B']), "Compare equal non sorted arrays having no duplicates. Arrays are equal");
	assert.notOk(primitives.common.compareArrays([1, 2, 3, 4, 4, 5, 6, 7, 8], [1, 2, 3, 4, 4, 4, 5, 6, 7, 8]), "Compare non-equal non-sorted arrays having the same values but different number of duplicates. Arrays are not equal");
});

QUnit.test("primitives.common.highestContrast - test for highest contrast background color.", function (assert) {
	assert.equal(primitives.common.highestContrast("black", "white", "yellow"), "white", "White on black has higher contrast than yellow on black");
});

/* /Controls/FamDiagram/models/EdgeItem.Tests.js*/
QUnit.module('FamDiagram - Models - EdgeItem');

QUnit.test("primitives.famdiagram.EdgeItem", function (assert) {

	var edge = new primitives.famdiagram.EdgeItem(1, 1, 2, 2);

	assert.equal(edge.getNear(1), 1, "Near 1 is 1");
	assert.equal(edge.getNear(2), 2, "Near 2 is 2");
	assert.equal(edge.getFar(1), 2, "Far of 1 is 2");
	assert.equal(edge.getFar(2), 1, "Far of 2 is 1");

	edge.setNear(1, 100);
	edge.setFar(1, 200);

	assert.equal(edge.getNear(1), 100, "Near 1 is 100");
	assert.equal(edge.getNear(2), 200, "Near 2 is 200");
	assert.equal(edge.getFar(1), 200, "Far of 1 is 200");
	assert.equal(edge.getFar(2), 100, "Far of 2 is 100");

	edge.setNear(2, 2000);
	edge.setFar(2, 1000);

	assert.equal(edge.getNear(1), 1000, "Near 1 is 1000");
	assert.equal(edge.getNear(2), 2000, "Near 2 is 2000");
	assert.equal(edge.getFar(1), 2000, "Far of 1 is 2000");
	assert.equal(edge.getFar(2), 1000, "Far of 2 is 1000");
});

/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/FamilyNormalizer.Tests.js*/
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

/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/UserDefinedNodesOrder.Tests.js*/
QUnit.module('FamDiagram - Tasks - Transformations - UserDefinedNodesOrder');

QUnit.test("primitives.famdiagram.UserDefinedNodesOrder -  Transforms nodes relations into sequences of nodes positions.", function (assert) {
  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1"
      },
      position: {
        "1": 0,
        "2": 1
      }
    }
    assert.deepEqual(results, expectedResult, "Item 2 on the right of item 1");
  })();

  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1"
      },
      position: {
        "1": 1,
        "2": 0
      }
    }
    assert.deepEqual(results, expectedResult, "Item 2 on the left of item 1");
  })();

  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 3, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1"
      },
      position: {
        "1": 1,
        "2": 0,
        "3": 2
      }
    }
    assert.deepEqual(results, expectedResult, "Items 2 -> 1 <- 3");
  })();

  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 3, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 4, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 5, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 6, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 7, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "1",
        "5": "1",
        "6": "1",
        "7": "1"
      },
      position: {
        "1": 3,
        "2": 1,
        "3": 5,
        "4": 0,
        "5": 2,
        "6": 4,
        "7": 6
      }
    }
    assert.deepEqual(results, expectedResult, "(4 -> 2 <- 5) -> 1 <- (6 -> 3 <- 7)");
  })();

  (function () {
    var items = [
      { id: 2 },
      { id: 3 },
      { id: 4, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 5, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 6, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 7, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "2": "2",
        "3": "3",
        "4": "2",
        "5": "2",
        "6": "3",
        "7": "3"
      },
      position: {
        "2": 1,
        "3": 1,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 2
      }
    }
    assert.deepEqual(results, expectedResult, "Group 2: (4 -> 2 <- 5), Group 3: (6 -> 3 <- 7)");
  })();

  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 2 },
      { id: 3, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1"
      },
      position: {
        "1": 0,
        "2": 2,
        "3": 1
      }
    }
    assert.deepEqual(results, expectedResult, "Positions test: 1 <- 3, 2");
  })();

  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 2 },
      { id: 3, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1"
      },
      position: {
        "1": 2,
        "2": 0,
        "3": 1
      }
    }
    assert.deepEqual(results, expectedResult, "Positions test: 2, 3 -> 1");
  })();
  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 3, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 4, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Right, position: 1 },
      { id: 5, relativeItem: 4, placementType: primitives.common.AdviserPlacementType.Right, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "1",
        "5": "1"
      },
      position: {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        "5": 4
      }
    }
    assert.deepEqual(results, expectedResult, "1 <- 2 <- 3 <- 4 <- 5");
  })();
  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 3, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 4, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 5, relativeItem: 4, placementType: primitives.common.AdviserPlacementType.Left, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "1",
        "5": "1"
      },
      position: {
        "1": 4,
        "2": 3,
        "3": 2,
        "4": 1,
        "5": 0
      }
    }
    assert.deepEqual(results, expectedResult, "5 -> 4 -> 3 -> 2 -> 1");
  })();
  (function () {
    var items = [
      { id: 1 },
      { id: 2, relativeItem: 1, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 3, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 4, relativeItem: 3, placementType: primitives.common.AdviserPlacementType.Left, position: 1 },
      { id: 5, relativeItem: 4, placementType: primitives.common.AdviserPlacementType.Left, position: 1 }
    ];

    var userDefinedNodesOrder = new primitives.famdiagram.UserDefinedNodesOrder();
    var results = userDefinedNodesOrder.getUserDefinedPositions(items);

    var expectedResult = {
      group: {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "1",
        "5": "1"
      },
      position: {
        "1": 4,
        "2": 3,
        "3": 2,
        "4": 1,
        "5": 0
      }
    }
    assert.deepEqual(results, expectedResult, "5 -> 4 -> 3 -> 2 -> 1");
  })();
});

/* /Graphics/Shapes/MergedRectangles.Tests.js*/
QUnit.module('Graphics.Shapes.MergedRectangles - Render Merged rectangles.');

QUnit.test("primitives.common.MergedRectangles", function (assert) {
  function ShowLayout(fixture, rects, size, title) {
    jQuery(document).ready(function () {
      var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
      titlePlaceholder.append(title);
      fixture.append(titlePlaceholder);

      var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
      graphicsDiv.css({
        width: size.width,
        height: size.height
      });

      var placeholder = jQuery("<div class='placeholder'></div>");
      placeholder.css({
        width: size.width,
        height: size.height
      });
      graphicsDiv.append(placeholder);

      fixture.append(graphicsDiv);

      var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
      graphics.begin();
      graphics.resize("placeholder", size.width, size.height);
      graphics.activate("placeholder");

      var transform = new primitives.common.Transform();
      transform.setOrientation(primitives.common.OrientationType.Top);
      transform.size = new primitives.common.Size(size);


      var mergedRectangles = new primitives.common.MergedRectangles(graphics);
      mergedRectangles.lineWidth = 2;
      mergedRectangles.opacity = 1;
      mergedRectangles.fillColor = "#faebd7";
      mergedRectangles.lineType = primitives.common.LineType.Solid;
      mergedRectangles.borderColor = "#000000";
      mergedRectangles.transform = transform;
      mergedRectangles.draw(rects);

      graphics.end();
    });
  }

  function getSize(rects) {
    var result = new primitives.common.Rect(0, 0, 0, 0);
    for (var index = 0; index < rects.length; index += 1) {
      var rect = rects[index];
      result.addRect(rect);
    }
    return result;
  }

  function getRectangles(items) {
    var result = [];
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
      rect.context = index;
      result.push(rect);
    }
    return result;
  }

  function TestLayout(title, items) {
    var rects = getRectangles(items);
    var size = getSize(rects);

    ShowLayout(jQuery("#qunit-fixture"), rects, size, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Merge 5 rectangles", [
    [0, 0, 100, 100],
    [150, 0, 100, 100],
    [0, 150, 100, 100],
    [150, 150, 100, 100],
    [50, 50, 150, 150]
  ]);

  TestLayout("Window", [
    [100, 0, 150, 150],
    [100, 200, 150, 150],
    [0, 100, 150, 150],
    [200, 100, 150, 150]
  ]);

  TestLayout("Window 2", [
    [0, 0, 150, 50],
    [0, 50, 50, 50],
    [100, 50, 50, 50],
    [0, 100, 150, 50],
    [0, 150, 50, 50],
    [100, 150, 50, 50],
    [0, 200, 150, 50]
  ]);
});

/* /Graphics/Structs/Matrix.Tests.js*/
QUnit.module('Graphics - Structs - Matrix');

QUnit.test("primitives.common.Matrix - 2 by 2 matrix", function (assert) {

	var m = new primitives.common.Matrix(6, 2, 5, 3);

	assert.equal(m.determinant(), 8, "Check determinant.");
});


/* /Graphics/Structs/Polyline.Tests.js*/
QUnit.module('Graphics - Structs - Polyline');

QUnit.test("primitives.common.Polyline - Various itteration functions over polyline segments", function (assert) {

	var polyline = new primitives.common.Polyline();
	polyline.addSegment(new primitives.common.MoveSegment(20, 20));
	polyline.addSegment(new primitives.common.LineSegment(100, 20));
	polyline.addSegment(new primitives.common.LineSegment(100, 100));
	polyline.addSegment(new primitives.common.LineSegment(20, 100));
	polyline.addSegment(new primitives.common.LineSegment(20, 20));

	var result = [];
	polyline.loop(this, function (segment) {
		result.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected1 = [{ "segmentType": 1, "x": 20, "y": 20 },
		{ "segmentType": 0, "x": 100, "y": 20 },
		{ "segmentType": 0, "x": 100, "y": 100 },
		{ "segmentType": 0, "x": 20, "y": 100 },
		{ "segmentType": 0, "x": 20, "y": 20 }
	];

	assert.deepEqual(result, expected1, "loop - Loop polyline segments function test");

	var result = [];
	polyline.loopReversed(this, function (segment) {
		result.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected2 = [
		{ "segmentType": 0, "x": 20, "y": 20 },
		{ "segmentType": 0, "x": 20, "y": 100 },
		{ "segmentType": 0, "x": 100, "y": 100 },
		{ "segmentType": 0, "x": 100, "y": 20 },
		{ "segmentType": 1, "x": 20, "y": 20 }
	];

	assert.deepEqual(result, expected2, "loopReversed - Loop in reversed order polyline segments function test");


	var polyline2 = new primitives.common.Polyline();
	polyline2.addSegment(new primitives.common.MoveSegment(200, 200));
	polyline2.addSegment(new primitives.common.LineSegment(1000, 200));
	polyline2.addSegment(new primitives.common.MoveSegment(1000, 200)); // this segment is redundant
	polyline2.addSegment(new primitives.common.LineSegment(1000, 1000));

	polyline2.optimizeMoveSegments();

	var result = [];
	polyline2.loop(this, function (segment) {
		result.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});

	var expected3 = [{ "segmentType": 1, "x": 200, "y": 200 },
		{ "segmentType": 0, "x": 1000, "y": 200 },
		{ "segmentType": 0, "x": 1000, "y": 1000 }
	];

	assert.deepEqual(result, expected3, "optimizeMoveSegments - Optimize polyline move segments function test");

	polyline2.mergeTo(polyline);

	var result = [];
	polyline.loop(this, function (segment) {
		result.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});

	var expected4 = expected1.concat(expected3);

	assert.deepEqual(result, expected4, "mergeTo - Merge one polyline segments into another function test");

	assert.equal(polyline.length(), expected4.length, "length - Polyline length function test");

	var polyline3 = new primitives.common.Polyline();
	polyline3.addSegment(new primitives.common.MoveSegment(20, 20));
	polyline3.addSegment(new primitives.common.LineSegment(100, 20));

	var polyline4 = new primitives.common.Polyline();
	polyline3.addSegment(new primitives.common.MoveSegment(20, 20));
	polyline3.addSegment(new primitives.common.LineSegment(20, 100));

	polyline3.addInverted(polyline4);

	var result4 = [];
	polyline3.loop(this, function (segment) {
		result4.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});

	var expected4 = [
		{ "segmentType": 1, "x": 20, "y": 20 },
		{ "segmentType": 0, "x": 100, "y": 20 },
		{ "segmentType": 1, "x": 20, "y": 20 },
		{ "segmentType": 0, "x": 20, "y": 100 }
	];

	assert.deepEqual(result4, expected4, "addInverted - Add inverted polyline segments function test");

});

QUnit.test("primitives.common.Polyline - Polyline offset function test.", function (assert) {

	var polyline = new primitives.common.Polyline();
	polyline.addSegment(new primitives.common.MoveSegment(20, 20));
	polyline.addSegment(new primitives.common.LineSegment(100, 20));
	polyline.addSegment(new primitives.common.LineSegment(100, 100));
	polyline.addSegment(new primitives.common.LineSegment(20, 100));
	polyline.addSegment(new primitives.common.LineSegment(20, 20));

	var offsetPolyline = polyline.getOffsetPolyine(10);

	var result = [];
	offsetPolyline.loop(this, function (segment) {
		result.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected1 = [{ "segmentType": 1, "x": 10, "y": 10 },
		{ "segmentType": 0, "x": 110, "y": 10 },
		{ "segmentType": 0, "x": 110, "y": 110 },
		{ "segmentType": 0, "x": 10, "y": 110 },
		{ "segmentType": 0, "x": 10, "y": 10 }
	];

	assert.deepEqual(result, expected1, "Offset closed square perimiter. It should keep start and end point of the result offset polyline together.");

	var polyline2 = new primitives.common.Polyline();
	polyline2.addSegment(new primitives.common.MoveSegment(20, 20));
	polyline2.addSegment(new primitives.common.LineSegment(60, 20));
	polyline2.addSegment(new primitives.common.LineSegment(60, 60));
	polyline2.addSegment(new primitives.common.LineSegment(60, 20));
	polyline2.addSegment(new primitives.common.LineSegment(120, 20));

	var offsetPolyline2 = polyline2.getOffsetPolyine(-10);

	var result2 = [];
	offsetPolyline2.loop(this, function (segment) {
		result2.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected2 = [{ "segmentType": 1, "x": 20, "y": 30 },
		{ "segmentType": 0, "x": 50, "y": 30 },
		{ "segmentType": 0, "x": 50, "y": 70 },
		{ "segmentType": 0, "x": 70, "y": 70 },
		{ "segmentType": 0, "x": 70, "y": 30 },
		{ "segmentType": 0, "x": 120, "y": 30 }
	];

	assert.deepEqual(result2, expected2, "Offset snake polyline");

	var polyline3 = new primitives.common.Polyline();
	polyline3.addSegment(new primitives.common.MoveSegment(50, 50));
	polyline3.addSegment(new primitives.common.LineSegment(100, 50));
	polyline3.addSegment(new primitives.common.LineSegment(50, 50));

	var offsetPolyline3 = polyline3.getOffsetPolyine(10);

	var result3 = [];
	offsetPolyline3.loop(this, function (segment) {
		result3.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected3 = [{ "segmentType": 1, "x": 40, "y": 40 },
		{ "segmentType": 0, "x": 110, "y": 40 },
		{ "segmentType": 0, "x": 110, "y": 60 },
		{ "segmentType": 0, "x": 40, "y": 60 },
		{ "segmentType": 0, "x": 40, "y": 40 }
	];

	assert.deepEqual(result3, expected3, "Offset closed empty polyline");

	var polyline4 = new primitives.common.Polyline();
	polyline4.addSegment(new primitives.common.MoveSegment(80, 40));
	polyline4.addSegment(new primitives.common.LineSegment(40, 40));
	polyline4.addSegment(new primitives.common.LineSegment(40, 50));
	polyline4.addSegment(new primitives.common.LineSegment(40, 60));
	polyline4.addSegment(new primitives.common.LineSegment(80, 60));
	polyline4.addSegment(new primitives.common.LineSegment(160, 60));
	polyline4.addSegment(new primitives.common.LineSegment(160, 50));
	polyline4.addSegment(new primitives.common.LineSegment(160, 40));
	polyline4.addSegment(new primitives.common.LineSegment(80, 40));

	var offsetPolyline4 = polyline4.getOffsetPolyine(-10);

	var result4 = [];
	offsetPolyline4.loop(this, function (segment) {
		result4.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected4 = [{ "segmentType": 1, "x": 80, "y": 30 },
		{ "segmentType": 0, "x": 30, "y": 30 },
		{ "segmentType": 0, "x": 30, "y": 50 },
		{ "segmentType": 0, "x": 30, "y": 70 },
		{ "segmentType": 0, "x": 80, "y": 70 },
		{ "segmentType": 0, "x": 170, "y": 70 },
		{ "segmentType": 0, "x": 170, "y": 50 },
		{ "segmentType": 0, "x": 170, "y": 30 },
		{ "segmentType": 0, "x": 80, "y": 30 },
	];

	assert.deepEqual(result4, expected4, "Offset polyline vertical and horizontal collinear segments");


	var polyline5 = new primitives.common.Polyline();
	polyline5.addSegment(new primitives.common.MoveSegment(60, 40));
	polyline5.addSegment(new primitives.common.LineSegment(40, 40));
	polyline5.addSegment(new primitives.common.LineSegment(40, 200));
	polyline5.addSegment(new primitives.common.LineSegment(120, 200));
	polyline5.addSegment(new primitives.common.MoveSegment(120, 160));
	polyline5.addSegment(new primitives.common.LineSegment(60, 160));
	polyline5.addSegment(new primitives.common.LineSegment(60, 60));
	polyline5.addSegment(new primitives.common.LineSegment(180, 60));
	polyline5.addSegment(new primitives.common.LineSegment(180, 160));
	polyline5.addSegment(new primitives.common.LineSegment(120, 160));
	polyline5.addSegment(new primitives.common.MoveSegment(120, 200));
	polyline5.addSegment(new primitives.common.LineSegment(200, 200));
	polyline5.addSegment(new primitives.common.LineSegment(200, 40));
	polyline5.addSegment(new primitives.common.LineSegment(60, 40));

	var offsetPolyline5 = polyline5.getOffsetPolyine(-10);

	var result5 = [];
	offsetPolyline5.loop(this, function (segment) {
		result5.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected5 = [{ "segmentType": 1, "x": 60, "y": 30 },
		{ "segmentType": 0, "x": 30, "y": 30 },
		{ "segmentType": 0, "x": 30, "y": 210 },
		{ "segmentType": 0, "x": 120, "y": 210 },
		{ "segmentType": 1, "x": 120, "y": 150 },
		{ "segmentType": 0, "x": 70, "y": 150 },
		{ "segmentType": 0, "x": 70, "y": 70 },
		{ "segmentType": 0, "x": 170, "y": 70 },
		{ "segmentType": 0, "x": 170, "y": 150 },
		{ "segmentType": 0, "x": 120, "y": 150 },
		{ "segmentType": 1, "x": 120, "y": 210 },
		{ "segmentType": 0, "x": 210, "y": 210 },
		{ "segmentType": 0, "x": 210, "y": 30 },
		{ "segmentType": 0, "x": 60, "y": 30 }
	];

	assert.deepEqual(result5, expected5, "Offset polyline having internal loop formed with move segments");

	var polyline6 = new primitives.common.Polyline();
	polyline6.addSegment(new primitives.common.MoveSegment(100, 50));
	polyline6.addSegment(new primitives.common.LineSegment(50, 100));
	polyline6.addSegment(new primitives.common.LineSegment(100, 150));
	polyline6.addSegment(new primitives.common.LineSegment(150, 100));
	polyline6.addSegment(new primitives.common.LineSegment(100, 50));

	var offsetPolyline6 = polyline6.getOffsetPolyine(Math.sqrt(2));

	var result6 = [];
	offsetPolyline6.loop(this, function (segment) {
		result6.push({
			segmentType: segment.segmentType,
			x: segment.x,
			y: segment.y
		});
	});
	var expected6 = [{ "segmentType": 1, "x": 100, "y": 52 },
		{ "segmentType": 0, "x": 52, "y": 100 },
		{ "segmentType": 0, "x": 100, "y": 148 },
		{ "segmentType": 0, "x": 148, "y": 100 },
		{ "segmentType": 0, "x": 100, "y": 52 }
	];

	assert.deepEqual(result6, expected6, "Offset closed rombus perimiter");

	var polyline6 = new primitives.common.Polyline();
	polyline6.addSegment(new primitives.common.MoveSegment(100, 50));
	polyline6.addSegment(new primitives.common.QuadraticArcSegment(50, 50, 50, 100));
	polyline6.addSegment(new primitives.common.QuadraticArcSegment(50, 150, 100, 150));
	polyline6.addSegment(new primitives.common.QuadraticArcSegment(150, 150, 150, 100));
	polyline6.addSegment(new primitives.common.QuadraticArcSegment(150, 50, 100, 50));

	var offsetPolyline6 = polyline6.getOffsetPolyine(-10);

	var result6 = [];
	offsetPolyline6.loop(this, function (segment) {
		result6.push({
			segmentType: segment.segmentType,
			cpX: segment.cpX,
			cpY: segment.cpY,
			x: segment.x,
			y: segment.y
		});
	});
	var expected6 = [{ "segmentType": 1, "x": 100, "y": 40, "cpX": undefined, "cpY": undefined },
		{ "segmentType": 2, "cpX": 40, "cpY": 40, "x": 40, "y": 100 },
		{ "segmentType": 2, "cpX": 40, "cpY": 160, "x": 100, "y": 160 },
		{ "segmentType": 2, "cpX": 160, "cpY": 160, "x": 160, "y": 100 },
		{ "segmentType": 2, "cpX": 160, "cpY": 40, "x": 100, "y": 40 }
	];

	assert.deepEqual(result6, expected6, "Offset quadratic arc segment");

	var polyline7 = new primitives.common.Polyline();
	polyline7.addSegment(new primitives.common.MoveSegment(100, 50));
	polyline7.addSegment(new primitives.common.CubicArcSegment(50, 50, 50, 150, 100, 150));
	polyline7.addSegment(new primitives.common.CubicArcSegment(150, 150, 150, 50, 100, 50));

	var offsetPolyline7 = polyline7.getOffsetPolyine(-10);

	var result7 = [];
	offsetPolyline7.loop(this, function (segment) {
		result7.push({
			segmentType: segment.segmentType,
			cpX1: segment.cpX1,
			cpY1: segment.cpY1,
			cpX2: segment.cpX2,
			cpY2: segment.cpY2,
			x: segment.x,
			y: segment.y
		});
	});
	var expected7 = [{"segmentType": 1, "x": 100, "y": 40, "cpX1": undefined, "cpX2": undefined, "cpY1": undefined, "cpY2": undefined },
		{ "segmentType": 3, "cpX1": 40, "cpY1": 40, "cpX2": 40, "cpY2": 160, "x": 100, "y": 160 },
		{ "segmentType": 3, "cpX1": 160, "cpY1": 160, "cpX2": 160, "cpY2": 40, "x": 100, "y": 40 }
	];

	assert.deepEqual(result7, expected7, "Offset cubic arc segment");
});


/* /Graphics/Structs/Vector.Tests.js*/
QUnit.module('Graphics - Structs - Vector');

QUnit.test("primitives.common.Vector - 2D vector defined with 2 2D points", function (assert) {

	var p1 = new primitives.common.Point(1, 1),
		p2 = new primitives.common.Point(9, 7),

		v1 = new primitives.common.Vector({ x: 1, y: 1 }, { x: 5, y: 5 }),
		v2 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 12, y: 12 }),
		v3 = new primitives.common.Vector({ x: 12, y: 12 }, { x: 7, y: 7 }),
		v4 = new primitives.common.Vector({ x: 12, y: 12 }, { x: 1, y: 12 }),
		v5 = new primitives.common.Vector({ x: 5, y: 5 }, { x: 5, y: 20 }),
		v6 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 20, y: 7 }),
		v7 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 7, y: 7 }),

		v8 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 10 }), new primitives.common.Point({ x: 10, y: 100 })),
		v9 = new primitives.common.Vector(new primitives.common.Point({ x: 20, y: 10 }), new primitives.common.Point({ x: 20, y: 100 })),

		v10 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 10 }), new primitives.common.Point({ x: 200, y: 10 })),
		v11 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 40 }), new primitives.common.Point({ x: 200, y: 40 })),

		v12 = new primitives.common.Vector(new primitives.common.Point({ x: 100, y: 100 }), new primitives.common.Point({ x: 50, y: 50 })),
		v13 = new primitives.common.Vector(new primitives.common.Point({ x: 99, y: 101 }), new primitives.common.Point({ x: 49, y: 51 })),
		v14 = new primitives.common.Vector(new primitives.common.Point({ x: 101, y: 99 }), new primitives.common.Point({ x: 51, y: 49 }));

	assert.equal(p1.distanceTo(p2), 10, "Distance between two points.");

	assert.equal(v1.relateTo(v2), primitives.common.VectorRelationType.Collinear, "Vectors are colinear.");
	assert.equal(v1.relateTo(v3), primitives.common.VectorRelationType.Opposite, "Vectors are opposite.");
	assert.equal(v1.relateTo(v4), primitives.common.VectorRelationType.None, "Vectors have intersection.");
	assert.equal(v5.relateTo(v6), primitives.common.VectorRelationType.None, "Vectors have intersection.");
	assert.equal(v6.relateTo(v7), primitives.common.VectorRelationType.Null, "One of the vectors is null.");

	v8.offset(10);
	assert.ok(v8.equalTo(v9), "Vertical vector offset to the right.");

	v10.offset(-30);
	assert.ok(v10.equalTo(v11), "Horizontal vector offset to the left.");

	v12.offset(Math.sqrt(2));
	assert.ok(v12.equalTo(v13), "Diagonal vector offset to the left. From (" + v12.from.x + ", " + v12.from.y + "), To (" + v12.to.x + ", " + v12.to.y + ")");

	v12.offset(-2 * Math.sqrt(2));
	assert.ok(v12.equalTo(v14), "Diagonal vector offset to the left. From (" + v12.from.x + ", " + v12.from.y + "), To (" + v12.to.x + ", " + v12.to.y + ")");
});


/* /Graphics/Graphics.Polyline.Tests.js*/
QUnit.module('Graphics - offset polyline.');

QUnit.test("primitives.common.Graphics.polyline", function (assert) {
  function ShowLayout(fixture, width, height, title, onDraw) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    graphicsDiv.css({
      width: width,
      height: height
    });

    var placeholder = jQuery("<div class='placeholder'></div>");
    placeholder.css({
      width: width,
      height: height
    });
    graphicsDiv.append(placeholder);

    fixture.append(graphicsDiv);

    var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
    graphics.begin();
    graphics.resize("placeholder", width, height);
    graphics.activate("placeholder");
    onDraw(graphics);
    graphics.end();
  }

  function getPolyline(points, color) {
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: color,
      lineWidth: "2",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var segmentType = point[0];
      switch (segmentType) {
        case "M": {
          var x = point[1];
          var y = point[2];
          polyline.addSegment(new primitives.common.MoveSegment(x, y));
        }
          break;
        case "L": {
          var x = point[1];
          var y = point[2];
          polyline.addSegment(new primitives.common.LineSegment(x, y));
        }
          break;
        case "Q": {
          var cpX = point[1];
          var cpY = point[2];
          var x = point[3];
          var y = point[4];
          polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
        }
          break;
        case "C": {
          var cpX = point[1];
          var cpY = point[2];
          var cpX2 = point[3];
          var cpY2 = point[4];
          var x = point[5];
          var y = point[6];
          polyline.addSegment(new primitives.common.CubicArcSegment(cpX, cpY, cpX2, cpY2, x, y));
        }
          break;
      }
    }
    return polyline;
  }

  function TestLayout(title, points) {
    var polyline = getPolyline(points, "#000000");
    var offsetPolylinePlus = polyline.getOffsetPolyine(20);
    var offsetPolylineMinus = polyline.getOffsetPolyine(-20);
    ShowLayout(jQuery("#qunit-fixture"), 800, 200, title, function (graphics) {
      graphics.polyline(polyline);
      offsetPolylinePlus.paletteItem.lineColor = "red";
      graphics.polyline(offsetPolylinePlus);
      offsetPolylineMinus.paletteItem.lineColor = "green";
      graphics.polyline(offsetPolylineMinus);
    });

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Offset cubic segment", [
    ["M", 50, 100], ["C", 50, 50, 150, 50, 150, 150]
  ]);

  TestLayout("Offset quadratic segment", [
    ["M", 50, 150], ["Q", 500, 125, 350, 200]
  ]);

  TestLayout("Offset quadratic segments", [
    ["M", 100, 50], ["Q", 150, 50, 150, 100], ["Q", 150, 150, 100, 150], ["Q", 50, 150, 50, 100], ["L", 100, 50]
  ]);

  TestLayout("Simple vertical segment", [
    ["M", 100, 50], ["L", 100, 150]
  ]);

  TestLayout("Offset square angle", [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150]
  ]);

  TestLayout("Offset square", [
    ["M", 50, 50], ["L", 150, 50], ["L", 150, 150], ["L", 50, 150], ["L", 50, 50]
  ]);

  TestLayout("Offset rhombus", [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150], ["L", 50, 100], ["L", 100, 50]
  ]);

});

/* /Graphics/Graphics.Tests.js*/
QUnit.module('Graphics - test basic graphics.');

QUnit.test("primitives.common.Graphics", function (assert) {
  function ShowLayout(fixture, polyline, width, height, title) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    graphicsDiv.css({
      width: width,
      height: height
    });

    var placeholder = jQuery("<div class='placeholder'></div>");
    placeholder.css({
      width: width,
      height: height
    });
    graphicsDiv.append(placeholder);

    fixture.append(graphicsDiv);

    var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
    graphics.begin();
    graphics.resize("placeholder", width, height);
    graphics.activate("placeholder");
    graphics.polyline(polyline);
    graphics.end();
  }

  function getPolyline(points) {
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: "#000000",
      lineWidth: "2",
      fillColor: "#faebd7",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var segmentType = point[0];
      var x = point[1];
      var y = point[2];
      var cpX = point[3];
      var cpY = point[4];
      switch (segmentType) {
        case "M":
          polyline.addSegment(new primitives.common.MoveSegment(x, y));
          break;
        case "L":
          polyline.addSegment(new primitives.common.LineSegment(x, y));
          break;
        case "Q":
          polyline.addSegment(new primitives.common.QuadraticArcSegment(x, y, cpX, cpY));
          break;

      }
    }
    return polyline;
  }

  function getSize(points) {
    var result = new primitives.common.Size(0, 0);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var x = point[1];
      var y = point[2];
      result.width = Math.max(result.width, x);
      result.height = Math.max(result.height, y);
    }
    return result;
  }

  function TestLayout(title, points) {
    var polyline = getPolyline(points);
    var size = getSize(points);
    ShowLayout(jQuery("#qunit-fixture"), polyline, size.width, size.height, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Draw polyline", [
    ["M", 0, 0], ["L", 200, 100]
  ]);

  TestLayout("Draw shape", [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 100], ["L", 0, 100], ["L", 0, 0]
  ]);

  TestLayout("Draw shape having island", [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 200], ["L", 0, 200], ["L", 0, 0],
    ["M", 50, 50], ["L", 50, 150], ["L", 150, 150], ["L", 150, 50], ["L", 50, 50]
  ]);
});

/* /Managers/KeyboardNavigationManager.Tests.js*/
QUnit.module('Managers - KeyboardNavigationManager');

function getKeyboardNavigationManager(items) {
	var result = primitives.common.KeyboardNavigationManager();
	for (var index = 0; index < items.length; index += 1) {
		var item = items[index];
		result.addRect(new primitives.common.Rect(item[0], item[1], item[2], item[3]), index);
	}
	return result;
}

QUnit.test("primitives.common.KeyboardNavigationManager - This structure helps to navigate with arrow keys between randomly placed rectangles", function (assert) {
	var layout1 = [
			[0, 0, 40, 280],
			[60, 0, 100, 100],
			[180, 0, 40, 40],
			[180, 60, 40, 40],
			[240, 0, 40, 40],
			[300, 0, 40, 40],
			[240, 60, 40, 40],
			[300, 60, 40, 100],
			[360, 0, 100, 100],
			[480, 0, 40, 40],
			[540, 0, 40, 40],
			[600, 0, 80, 100],
			[480, 60, 40, 140],
			[540, 140, 60, 60],
			[620, 140, 60, 60],
			[60, 120, 160, 160],
			[240, 180, 60, 60],
			[320, 180, 60, 60],
			[400, 180, 60, 60],
			[620, 220, 20, 20],
			[660, 220, 20, 20],
			[240, 260, 20, 20],
			[280, 260, 340, 20],
			[640, 260, 40, 20]
	];

	var layout2 = [
		[220, 0, 120, 80],
		[0, 100, 120, 80],
		[0, 200, 120, 80],
		[400, 100, 120, 80],
		[400, 200, 120, 80],
		[160, 100, 40, 40],
		[220, 100, 40, 40],
		[280, 100, 40, 40],
		[340, 100, 40, 40],
		[160, 160, 40, 40],
		[220, 160, 40, 40],
		[280, 160, 40, 40],
		[340, 160, 40, 40],
		[160, 220, 40, 40],
		[220, 220, 40, 40],
		[280, 220, 40, 40],
		[340, 220, 40, 40]
	];

	function testSequence(items, cursorItem, steps) {
		var manager = getKeyboardNavigationManager(items);
		var result = [];
		for (var index = 0, len = steps.length; index < len; index += 1) {
			var direction = steps[index];

			switch (direction) {
				case primitives.common.OrientationType.Top:
					cursorItem = manager.getItemAbove(cursorItem);
					result.push(cursorItem);
					break;
				case primitives.common.OrientationType.Bottom:
					cursorItem = manager.getItemBelow(cursorItem);
					result.push(cursorItem);
					break;
				case primitives.common.OrientationType.Left:
					cursorItem = manager.getItemOnLeft(cursorItem);
					result.push(cursorItem);
					break;
				case primitives.common.OrientationType.Right:
					cursorItem = manager.getItemOnRight(cursorItem);
					result.push(cursorItem);
					break;
			}
		}
		return result;
	}

	(function () {
		var manager = getKeyboardNavigationManager(layout1);

		var result = manager.getNavigationLevels();

		var expectedResult = [
			[0, 1, 2, 4, 5, 8, 9, 10, 11],
			[0, 1, 3, 6, 7, 8, 12, 11],
			[0, 15, 16, 17, 18, 12, 13, 14],
			[0, 15, 16, 17, 18, 19, 20],
			[0, 15, 21, 22, 23]
		];

		assert.deepEqual(result, expectedResult, "getNavigationLevels validation function");
	})();

	(function () {
		var result = testSequence(layout1, 0, [primitives.common.OrientationType.Right]);
		assert.deepEqual(result, [1], "getItemOnRight function");
	})();

	(function () {
		var result = testSequence(layout1, 11, [primitives.common.OrientationType.Left]);
		assert.deepEqual(result, [10], "getItemOnLeft function");
	})();

	(function () {
		var result = testSequence(layout1, 3, [primitives.common.OrientationType.Bottom]);
		assert.deepEqual(result, [15], "getItemBelow function");
	})();

	(function () {
		var result = testSequence(layout1, 7, [primitives.common.OrientationType.Top]);
		assert.deepEqual(result, [5], "getItemAbove function");
	})();

	(function () {
		var result = testSequence(layout2, 3, [primitives.common.OrientationType.Top]);
		assert.deepEqual(result, [0], "getItemAbove function should return nearest item at the row above on the left");
	})();

	(function () {
		var result = testSequence(layout1, 13, [primitives.common.OrientationType.Top]);
		assert.deepEqual(result, [11], "getItemAbove function should return nearest item on the right");
	})();

	(function () {
		var result = testSequence(layout1, 4, [primitives.common.OrientationType.Top]);
		assert.deepEqual(result, [4], "getItemAbove function should return the item it gets if it belongs to top row");
	})();

	(function () {
		var result = testSequence(layout1, 21, [
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Right
		]);
		assert.deepEqual(result, [15, 21], "Navigation into multi-row item and back should return cursor to original item");
	})();

	(function () {
		var result = testSequence(layout1, 21, [
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Right,
			primitives.common.OrientationType.Right
		]);
		assert.deepEqual(result, [15, 0, 15, 21], "Navigation into multi-row item and back should return cursor to original item");
	})();

	(function () {
		var result = testSequence(layout1, 18, [
			primitives.common.OrientationType.Right,
			primitives.common.OrientationType.Right,
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Left
		]);
		assert.deepEqual(result, [12, 13, 12, 18], "Navigation across multi-row item and back should return cursor to original item");
	})();

	(function () {
		var result = testSequence(layout1, 12, [
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Top,
			primitives.common.OrientationType.Right
		]);
		assert.deepEqual(result, [8, 8, 9], "Navigation along multi-row item up should move cursor to its top row");
	})();

	(function () {
		var result = testSequence(layout1, 1, [
			primitives.common.OrientationType.Left,
			primitives.common.OrientationType.Bottom,
			primitives.common.OrientationType.Right,
			primitives.common.OrientationType.Right
		]);
		assert.deepEqual(result, [0, 0, 15, 21], "Navigation along multi-row item down should move cursor to its bottom row");
	})();
});

/* /Managers/TaskManager.Tests.js*/
QUnit.module('Managers - TaskManager');

QUnit.test("primitives.common.TaskManager - This structure helps to process controls data dependencies", function (assert) {

	var taskManager = primitives.common.TaskManager();
	taskManager.addDependency('options', { value: 12 });
	taskManager.addTask('add', ['options'], function (options) { 
		var result = 0;
		return {
			process: function () { result = options.value + 1; return true; },
			getValue: function () { return options.value + 1; }
		}
	});
	taskManager.addTask('multiply', ['add'], function (add) {
		var result = 0;
		return {
			process: function () { result = add.getValue() * 2; return true; },
			getValue: function () { return result; }
		}
	});

	taskManager.process('add', false);

	var result = taskManager.getTask('multiply');

	assert.equal(result.getValue(), 26, "Task manager processed all dependencies.");
});

/* /OptionsReaders/ArrayReader.Tests.js*/
QUnit.module('OptionsReaders - ArrayReader');

QUnit.test("primitives.common.ArrayReader - Reads Array of non distinct values and varifies that it has or has no changes.", function (assert) {
	var reader = new primitives.common.ArrayReader(new primitives.common.ValueReader(["string", "number"], true), false);

	var context = {isChanged: false, hash: {}};

	var target = [];

	var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);

	assert.ok(context.isChanged, "Compare current empty array to array having some items. Has changes");

	context.isChanged = false;

	var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);

	assert.ok(!context.isChanged, "Compare current array to the same array again. No changes.");

	context.isChanged = false;

	var result = reader.read(result, [1, 2, 2, 3, 5, 4, 1], "items", context);

	assert.ok(context.isChanged, "Remove one item from source collection and compare again. Has changes");

	context.isChanged = false;

	var result = reader.read(result, [1, 2, 3, 2, 5, 4, 1], "items", context);

	assert.ok(context.isChanged, "Swap two values in source collection and compare again. Has changes");

	context.isChanged = false;

	var result = reader.read(result, [], "items", context);

	assert.ok(context.isChanged, "Compare current array having items to new empty array. Has changes.");
});

QUnit.test("primitives.common.ArrayReader - Reads Array of distinct values and varifies that it has or has no changes.", function (assert) {
	var reader = new primitives.common.ArrayReader(new primitives.common.ValueReader(["string", "number"], true), true);

	var context = { isChanged: false, hash: {} };

	var target = [];

	var result = reader.read(result, [1, 2, 3, 4, 5], "items", context);

	assert.ok(context.isChanged, "Compare current empty array to array having some items. Has changes");

	context.isChanged = false;

	var result = reader.read(result, [5, 1, 3, 2, 4], "items", context);

	assert.ok(!context.isChanged, "Compare current array to the same array again, but having shuffled items. No changes.");

	context.isChanged = false;

	var result = reader.read(result, [1, 2, 3, 4], "items", context);

	assert.ok(context.isChanged, "Remove one item from source collection and compare again. Has changes");

	context.isChanged = false;

	var result = reader.read(result, [1, 3, 2, 4], "items", context);

	assert.ok(!context.isChanged, "Swap two values in source collection and compare again. Has no changes");

	context.isChanged = false;

	var result = reader.read(result, [1, 3, 3, 2, 4, 4], "items", context);

	assert.ok(!context.isChanged, "Add 2 duplicates into source collection and compare again. Has no changes");

	context.isChanged = false;

	var result = reader.read(result, [], "items", context);

	assert.ok(context.isChanged, "Compare current array having items to new empty array. Has changes.");
});

QUnit.test("primitives.common.ArrayReader - Reads Array of distinct objects and varifies that it has or has no changes.", function (assert) {
	var reader = new primitives.common.ArrayReader(
		new primitives.common.ObjectReader({
			name: new primitives.common.ValueReader(["string", "number"], false),
			description: new primitives.common.ValueReader(["string"], true)
		}),
		true,
		"name"
	);

	var context = { isChanged: false, hash: {} };

	var target = [];

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 2, descriptions: "2" },
		{ name: 3, descriptions: "3" },
		{ name: 4, descriptions: "4" },
		{ name: 5, descriptions: "5" },
		{ name: 6, descriptions: "6" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current empty array to array having some items. Has changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(!context.isChanged, "Compare current array to array having the some shuffled items. Has no changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" },
		{ name: 1, descriptions: "1" },
		{ name: 2, descriptions: "2" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(!context.isChanged, "Compare current array to array having the some items with duplicates. Has no changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" },
		{ name: 1, descriptions: "1" },
		{ name: 10, descriptions: "10" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having duplicate items and one new item. Has changes");

	context.isChanged = false;

	var items = [
	{ name: 0, descriptions: "0" },
	{ name: 1, descriptions: "1" },
	{ name: 5, descriptions: "5" },
	{ name: 2, descriptions: "2" },
	{ name: 4, descriptions: "4" },
	{ name: 3, descriptions: "3" },
	{ name: 1, descriptions: "1" },
	{ name: 10, descriptions: "10" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having missing items. Has changes");

	context.isChanged = false;

	var items = [
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to new empty array. Has changes");
});

QUnit.test("primitives.common.ArrayReader - Reads Array of non distinct objects and varifies that it has or has no changes.", function (assert) {
	var reader = new primitives.common.ArrayReader(
		new primitives.common.ObjectReader({
			name: new primitives.common.ValueReader(["string", "number"], false),
			description: new primitives.common.ValueReader(["string"], true)
		}),
		false
	);

	var context = { isChanged: false, hash: {} };

	var target = [];

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 2, descriptions: "2" },
		{ name: 3, descriptions: "3" },
		{ name: 4, descriptions: "4" },
		{ name: 5, descriptions: "5" },
		{ name: 6, descriptions: "6" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current empty array to array having some items. Has changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having the some shuffled items. Has changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having the some items with duplicates. Has changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" },
		{ name: 3, descriptions: "7" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having one new item. Has changes");

	context.isChanged = false;

	var items = [
		{ name: 0, descriptions: "0" },
		{ name: 1, descriptions: "1" },
		{ name: 5, descriptions: "5" },
		{ name: 2, descriptions: "2" },
		{ name: 4, descriptions: "4" },
		{ name: 6, descriptions: "6" },
		{ name: 3, descriptions: "3" },
		{ name: 3, descriptions: "7" }
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to array having missing item. Has changes");

	context.isChanged = false;

	var items = [
	];

	var result = reader.read(result, items, "items", context);

	assert.ok(context.isChanged, "Compare current array to new empty array. Has changes");
});

/* /OptionsReaders/ValueReader.Tests.js*/
QUnit.module('OptionsReaders - ValueReader');

QUnit.test("primitives.common.ValueReader - Reads primitive or object value and varifies that it has or has no changes.", function (assert) {

  (function () {
    var reader = new primitives.common.ValueReader(["string"], true);
    var context = { isChanged: false, hash: {} };
    var result = reader.read("Some message", "Some message", "name", context);
    assert.ok(!context.isChanged, "Value is not changed.");
    assert.equal(result, "Some message", "Reader returns source value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string"], false, "welcome");
    var context = { isChanged: false, hash: {} };
    var result = reader.read("Some message", null, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.equal(result, "welcome", "Reader returns default value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string"], true);
    var context = { isChanged: false, hash: {} };
    var result = reader.read("Some message", null, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.equal(result, null, "Reader returns source null value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string"], true);
    var context = { isChanged: false, hash: {} };
    var result = reader.read(null, null, "name", context);
    assert.ok(!context.isChanged, "Value is not changed.");
    assert.equal(result, null, "Reader returns source null value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["number"], false, 10);
    var context = { isChanged: false, hash: {} };
    var result = reader.read(1, "1", "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.equal(result, 10, "Reader returns defaul 10 value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["number"], false, 10);
    var context = { isChanged: false, hash: {} };
    var result = reader.read(1, 5, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.equal(result, 5, "Reader returns source 5 value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["number"], false, 10);
    var context = { isChanged: false, hash: {} };
    var result = reader.read(5, 5, "name", context);
    assert.ok(!context.isChanged, "Value is not changed.");
    assert.equal(result, 5, "Reader returns source 5 value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string", "object"], true);
    var context = { isChanged: false, hash: {} };
    var result = reader.read({ color: "red" }, null, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.equal(result, null, "Reader returns source null value")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string", "object"], false, { color: "blue" });
    var context = { isChanged: false, hash: {} };
    var result = reader.read({ color: "red" }, null, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.deepEqual(result, { color: "blue" }, "Reader returns default object")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string", "object"], false, { color: "blue" });
    var context = { isChanged: false, hash: {} };
    var result = reader.read({ color: "red" }, { color: "green" }, "name", context);
    assert.ok(context.isChanged, "Value is changed.");
    assert.deepEqual(result, { color: "green" }, "Reader returns source object")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["string", "object"], false, { color: "blue" });
    var context = { isChanged: false, hash: {} };
    var result = reader.read({ color: "green" }, { color: "green" }, "name", context);
    assert.ok(!context.isChanged, "Value is not changed.");
    assert.deepEqual(result, { color: "green" }, "Reader returns source object")
  })();

  (function () {
    var reader = new primitives.common.ValueReader(["object"], true);
    var context = { isChanged: false, hash: {} };
    var target = { color: "green" };
    target.parent = target; // Cycle
    var source = { color: "green" };
    source.parent = source; // Cycle
    var result = reader.read(target, source, "name", context);
    assert.ok(!context.isChanged, "Value is not changed.");
    assert.deepEqual(result, source, "Reader should ignore cycles in JSON object");
  })();
});

