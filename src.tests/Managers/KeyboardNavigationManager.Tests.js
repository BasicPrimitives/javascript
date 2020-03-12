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