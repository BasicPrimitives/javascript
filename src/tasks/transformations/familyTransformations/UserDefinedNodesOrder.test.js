import UserDefinedNodesOrder from './UserDefinedNodesOrder';
import { AdviserPlacementType } from '../../../enums';

test("Item 2 on the right of item 1", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("Item 2 on the left of item 1", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("Items 2 -> 1 <- 3", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 3, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("(4 -> 2 <- 5) -> 1 <- (6 -> 3 <- 7)", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 3, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 4, relativeItem: 2, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 5, relativeItem: 2, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 6, relativeItem: 3, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 7, relativeItem: 3, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});


test("Group 2: (4 -> 2 <- 5), Group 3: (6 -> 3 <- 7)", () => {
  var items = [
    { id: 2 },
    { id: 3 },
    { id: 4, relativeItem: 2, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 5, relativeItem: 2, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 6, relativeItem: 3, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 7, relativeItem: 3, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("Positions test: 1 <- 3, 2", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 2 },
    { id: 3, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("Positions test: 2, 3 -> 1", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 2 },
    { id: 3, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("1 <- 2 <- 3 <- 4 <- 5", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 3, relativeItem: 2, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 4, relativeItem: 3, placementType: AdviserPlacementType.Right, position: 1 },
    { id: 5, relativeItem: 4, placementType: AdviserPlacementType.Right, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("5 -> 4 -> 3 -> 2 -> 1", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 3, relativeItem: 2, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 4, relativeItem: 3, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 5, relativeItem: 4, placementType: AdviserPlacementType.Left, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});

test("5 -> 4 -> 3 -> 2 -> 1", () => {
  var items = [
    { id: 1 },
    { id: 2, relativeItem: 1, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 3, relativeItem: 2, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 4, relativeItem: 3, placementType: AdviserPlacementType.Left, position: 1 },
    { id: 5, relativeItem: 4, placementType: AdviserPlacementType.Left, position: 1 }
  ];

  var userDefinedNodesOrder = new UserDefinedNodesOrder();
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

  expect(results).toEqual(expectedResult);
});