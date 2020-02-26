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
