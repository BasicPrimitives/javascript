import ValueReader from './ValueReader';
import ArrayReader from './ArrayReader';
import ObjectReader from './ObjectReader';

test('Compare current empty array to array having some items. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to array having the some shuffled items. Has no changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    true,
    "name"
  );

  var context = { isChanged: false, hash: {} };

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

  expect(!context.isChanged).toBe(true);
});

test('Compare current array to array having the some items with duplicates. Has no changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    true,
    "name"
  );

  var context = { isChanged: false, hash: {} };

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

  expect(!context.isChanged).toBe(true);
});

test('Compare current array to array having duplicate items and one new item. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    true,
    "name"
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to array having missing items. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    true,
    "name"
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to new empty array. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    true,
    "name"
  );

  var context = { isChanged: false, hash: {} };

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

  context.isChanged = false;

  var items = [

  ];

  var result = reader.read(result, items, "items", context);

  expect(context.isChanged).toBe(true);
});

test('Compare current empty array to array having some items. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to array having the some shuffled items. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to array having some duplicates. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to array having one new item. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});


test('Compare current array to array having missing item. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  expect(context.isChanged).toBe(true);
});

test('Compare current array to new empty array. Has changes', () => {
  var reader = new ArrayReader(
    new ObjectReader({
      name: new ValueReader(["string", "number"], false),
      description: new ValueReader(["string"], true)
    }),
    false
  );

  var context = { isChanged: false, hash: {} };

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

  context.isChanged = false;

  var items = [

  ];

  var result = reader.read(result, items, "items", context);

  expect(context.isChanged).toBe(true);
});
