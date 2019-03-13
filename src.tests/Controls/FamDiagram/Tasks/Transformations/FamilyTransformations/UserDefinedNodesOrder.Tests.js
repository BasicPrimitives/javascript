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