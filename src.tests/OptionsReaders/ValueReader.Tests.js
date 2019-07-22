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

