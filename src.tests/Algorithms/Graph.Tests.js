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

	//function getGreedyGrowSequence(startNode, graph, treeLevels) {
	//	var sequence = [];
	//	var margins = {};
	//	graph.getMinimumWeightGrowthSequence(this,
	//		startNode,
	//		function (edge, fromItem, toItem) {
	//			var level = treeLevels.getLevelIndex(toItem);
	//			var position = treeLevels.getItemPosition(toItem);
	//			if (!margins.hasOwnProperty(level)) {
	//				return 0;
	//			} else {
	//				var margin = margins[level];
	//				if (position < margin.left) {
	//					return (margin.left - position);
	//				}
	//				if (position > margin.right) {
	//					return (position - margin.right);
	//				}
	//				return Math.min(position - margin.left, margin.right - position);
	//			}
	//		},
	//		function (item) {
	//			var level = treeLevels.getLevelIndex(item);
	//			var position = treeLevels.getItemPosition(item);
	//			if (!margins.hasOwnProperty(level)) {
	//				margins[level] = {
	//					left: position,
	//					right: position
	//				};
	//			} else {
	//				var margin = margins[level];
	//				margin.left = Math.min(position, margin.left);
	//				margin.right = Math.max(position, margin.right);
	//			}
	//			return sequence.push(item);
	//		}
	//	);
	//	return sequence;
	//}

	//(function () {
	//	var graph = getGraph([
	//		{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
	//		{ from: 'B', to: 'G' },
	//		{ from: 'D', to: 'H' },
	//		{ from: 'E', to: 'H' },
	//		{ from: 'F', to: 'H' },
	//		{ from: 'K', to: 'F' }, { from: 'K', to: 'L' }, { from: 'K', to: 'M' },
	//		{ from: 'M', to: 'I' }, { from: 'M', to: 'J' },
	//		{ from: 'I', to: 'T' }, { from: 'J', to: 'T' },
	//		{ from: 'H', to: 'Q' }, { from: 'H', to: 'R' }, { from: 'H', to: 'S' },
	//		{ from: 'G', to: 'N' }, { from: 'G', to: 'O' },
	//		{ from: 'O', to: 'P' }, { from: 'Q', to: 'P' },
	//		{ from: 'S', to: 'U' }, { from: 'T', to: 'U' }
	//	]);

	//	var treeLevels = getTreeLevels([
	//		['A', 'K'],
	//		['B', 'C', 'D', 'E', 'F', 'L', 'M'],
	//		['G', 'H', 'I', 'J'],
	//		['N', 'O', 'Q', 'R', 'S', 'T'],
	//		['P', 'U']
	//	]);

	//	var sequence = getGreedyGrowSequence('K', graph, treeLevels);

	//	var expected = ["K", "M", "J", "T", "U", "L", "F", "I", "S", "H", "E", "D", "R", "Q", "A", "P", "C", "B", "O", "G", "N"];
	//	assert.deepEqual(sequence, expected, "getMinimumWeightGrowthSequence function test of graph traversing sequence starting from node K greedy grows to left side");
	//})();

	//(function () {
	//	var graph = getGraph([
	//		{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'A', to: 'D' },
	//		{ from: 'B', to: 'G' },
	//		{ from: 'D', to: 'H' },
	//		{ from: 'E', to: 'H' },
	//		{ from: 'F', to: 'H' },
	//		{ from: 'K', to: 'F' }, { from: 'K', to: 'L' }, { from: 'K', to: 'M' },
	//		{ from: 'M', to: 'I' }, { from: 'M', to: 'J' },
	//		{ from: 'I', to: 'T' }, { from: 'J', to: 'T' },
	//		{ from: 'H', to: 'Q' }, { from: 'H', to: 'R' }, { from: 'H', to: 'S' },
	//		{ from: 'G', to: 'N' }, { from: 'G', to: 'O' },
	//		{ from: 'O', to: 'P' }, { from: 'Q', to: 'P' },
	//		{ from: 'S', to: 'U' }, { from: 'T', to: 'U' }
	//	]);

	//	var treeLevels = getTreeLevels([
	//		['A', 'K'],
	//		['B', 'C', 'D', 'E', 'F', 'L', 'M'],
	//		['G', 'H', 'I', 'J'],
	//		['N', 'O', 'Q', 'R', 'S', 'T'],
	//		['P', 'U']
	//	]);

	//	var sequence = getGreedyGrowSequence('A', graph, treeLevels);

	//	var expected = ["A", "D", "H", "S", "U", "C", "B", "E", "F", "R", "Q", "T", "G", "K", "P", "I", "J", "O", "N", "L", "M"];
	//	assert.deepEqual(sequence, expected, "getMinimumWeightGrowthSequence function test of graph traversing sequence starting from node A greedy grows to both sides");
	//})();
});