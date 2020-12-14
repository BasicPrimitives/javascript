import KeyboardNavigationManager from './KeyboardNavigationManager';
import Rect from '../graphics/structs/Rect';
import { OrientationType } from '../enums';

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

function getKeyboardNavigationManager(items) {
  var result = KeyboardNavigationManager();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    result.addRect(new Rect(item[0], item[1], item[2], item[3]), index);
  }
  return result;
}

function testSequence(items, cursorItem, steps) {
  var manager = getKeyboardNavigationManager(items);
  var result = [];
  for (var index = 0, len = steps.length; index < len; index += 1) {
    var direction = steps[index];

    switch (direction) {
      case OrientationType.Top:
        cursorItem = manager.getItemAbove(cursorItem);
        result.push(cursorItem);
        break;
      case OrientationType.Bottom:
        cursorItem = manager.getItemBelow(cursorItem);
        result.push(cursorItem);
        break;
      case OrientationType.Left:
        cursorItem = manager.getItemOnLeft(cursorItem);
        result.push(cursorItem);
        break;
      case OrientationType.Right:
        cursorItem = manager.getItemOnRight(cursorItem);
        result.push(cursorItem);
        break;
    }
  }
  return result;
}

test('getNavigationLevels validation function', () => {
  var manager = getKeyboardNavigationManager(layout1);

  var result = manager.getNavigationLevels();

  var expectedResult = [
    [0, 1, 2, 4, 5, 8, 9, 10, 11],
    [0, 1, 3, 6, 7, 8, 12, 11],
    [0, 15, 16, 17, 18, 12, 13, 14],
    [0, 15, 16, 17, 18, 19, 20],
    [0, 15, 21, 22, 23]
  ];

  expect(result).toEqual(expectedResult);
});

test('getItemOnRight function', () => {
  var result = testSequence(layout1, 0, [OrientationType.Right]);
  expect(result).toEqual([1]);
});

test('getItemOnLeft function', () => {
  var result = testSequence(layout1, 11, [OrientationType.Left]);
  expect(result).toEqual([10]);
});

test('getItemBelow function', () => {
  var result = testSequence(layout1, 3, [OrientationType.Bottom]);
  expect(result).toEqual([15]);
});

test('getItemBelow function', () => {
  var result = testSequence(layout1, 7, [OrientationType.Top]);
  expect(result).toEqual([5]);
});

test('getItemAbove function should return nearest item at the row above on the left', () => {
  var result = testSequence(layout2, 3, [OrientationType.Top]);
  expect(result).toEqual([0]);
});

test('getItemAbove function should return nearest item on the right', () => {
  var result = testSequence(layout1, 13, [OrientationType.Top]);
  expect(result).toEqual([11]);
});

test('getItemAbove function should return the item it gets if it belongs to top row', () => {
  var result = testSequence(layout1, 4, [OrientationType.Top]);
  expect(result).toEqual([4]);
});

test('Navigation into multi-row item and back should return cursor to original item', () => {
  var result = testSequence(layout1, 21, [
    OrientationType.Left,
    OrientationType.Right
  ]);
  expect(result).toEqual([15, 21]);
});

test('Navigation into multi-row item and back should return cursor to original item', () => {
  var result = testSequence(layout1, 21, [
    OrientationType.Left,
    OrientationType.Left,
    OrientationType.Right,
    OrientationType.Right
  ]);
  expect(result).toEqual([15, 0, 15, 21]);
});

test('Navigation across multi-row item and back should return cursor to original item', () => {
  var result = testSequence(layout1, 18, [
    OrientationType.Right,
    OrientationType.Right,
    OrientationType.Left,
    OrientationType.Left
  ]);
  expect(result).toEqual([12, 13, 12, 18]);
});

test('Navigation along multi-row item up should move cursor to its top row', () => {
  var result = testSequence(layout1, 12, [
    OrientationType.Left,
    OrientationType.Top,
    OrientationType.Right
  ]);
  expect(result).toEqual([8, 8, 9]);
});

test('Navigation along multi-row item down should move cursor to its bottom row', () => {
  var result = testSequence(layout1, 1, [
    OrientationType.Left,
    OrientationType.Bottom,
    OrientationType.Right,
    OrientationType.Right
  ]);
  expect(result).toEqual([0, 0, 15, 21]);
});
