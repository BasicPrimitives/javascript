import ValueReader from './ValueReader';
import ArrayReader from './ArrayReader';

test('Compare current empty array to array having some items. Has changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), false);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Compare current array to the same array again. No changes.', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), false);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);

  expect(!context.isChanged).toBe(true);
});

test('Remove one item from source collection and compare again. Has changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), false);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 2, 2, 3, 5, 4, 1], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Swap two values in source collection and compare again. Has changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), false);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 2, 3, 2, 4, 5, 4, 1], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Compare current array having items to new empty array. Has changes.', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), false);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(result, [1, 2, 2, 3, 4, 5, 4, 1], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Compare current empty array to array having some items. Has changes.', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4, 5], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Compare current array to the same array again, but having shuffled items. No changes.', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4, 5], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [5, 1, 3, 2, 4], "items", context);

  expect(!context.isChanged).toBe(true);
});


test('Remove one item from source collection and compare again. Has changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4, 5], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 2, 3, 4], "items", context);

  expect(context.isChanged).toBe(true);
});

test('Swap two values in source collection and compare again. Has no changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 3, 2, 4], "items", context);

  expect(!context.isChanged).toBe(true);
});

test('Add 2 duplicates into source collection and compare again. Has no changes', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [1, 3, 3, 2, 4, 4], "items", context);

  expect(!context.isChanged).toBe(true);
});

test('Compare current array having items to new empty array. Has changes.', () => {
  var reader = new ArrayReader(new ValueReader(["string", "number"], true), true);
  var context = { isChanged: false, hash: {} };
  var target = [];
  var result = reader.read(result, [1, 2, 3, 4], "items", context);
  context.isChanged = false;
  var result = reader.read(result, [], "items", context);

  expect(context.isChanged).toBe(true);
});