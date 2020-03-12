QUnit.module('OptionsReaders - ArrayReader');

QUnit.test("primitives.common.ArrayReader - Reads Array of non distinct values and varifies that it has or has no changes.", function (assert) {
  var reader = new primitives.common.ArrayReader(new primitives.common.ValueReader(["string", "number"], true), false);

  var context = { isChanged: false, hash: {} };

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