import ValueReader from './ValueReader';

test('Reader returns source value', () => {
  var reader = new ValueReader(["string"], true);
  var context = { isChanged: false, hash: {} };
  var result = reader.read("Some message", "Some message", "name", context);

  expect(!context.isChanged).toBe(true);
  expect(result).toBe("Some message");
});

test('Reader returns default value', () => {
  var reader = new ValueReader(["string"], false, "welcome");
  var context = { isChanged: false, hash: {} };
  var result = reader.read("Some message", null, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toBe("welcome");
});

test('Reader returns source null value', () => {
  var reader = new ValueReader(["string"], true);
  var context = { isChanged: false, hash: {} };
  var result = reader.read("Some message", null, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toBe(null);
});

test('Reader returns source null value', () => {
  var reader = new ValueReader(["string"], true);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(null, null, "name", context);

  expect(!context.isChanged).toBe(true);
  expect(result).toBe(null);
});

test('Reader returns defaul 10 value', () => {
  var reader = new ValueReader(["number"], false, 10);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(1, "1", "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toBe(10);
});

test('Reader returns source 5 value', () => {
  var reader = new ValueReader(["number"], false, 10);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(1, 5, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toBe(5);
});

test('Reader returns source 5 value (2)', () => {
  var reader = new ValueReader(["number"], false, 10);
  var context = { isChanged: false, hash: {} };
  var result = reader.read(5, 5, "name", context);

  expect(!context.isChanged).toBe(true);
  expect(result).toBe(5);
});

test('Reader returns source null value (2)', () => {
  var reader = new ValueReader(["string", "object"], true);
  var context = { isChanged: false, hash: {} };
  var result = reader.read({ color: "red" }, null, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toBe(null);
});

test('Reader returns default object', () => {
  var reader = new ValueReader(["string", "object"], false, { color: "blue" });
  var context = { isChanged: false, hash: {} };
  var result = reader.read({ color: "red" }, null, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toEqual({ color: "blue" });
});

test('Reader returns source object', () => {
  var reader = new ValueReader(["string", "object"], false, { color: "blue" });
  var context = { isChanged: false, hash: {} };
  var result = reader.read({ color: "red" }, { color: "green" }, "name", context);

  expect(context.isChanged).toBe(true);
  expect(result).toEqual({ color: "green" });
});

test('Reader returns source object (2)', () => {
  var reader = new ValueReader(["string", "object"], false, { color: "blue" });
  var context = { isChanged: false, hash: {} };
  var result = reader.read({ color: "green" }, { color: "green" }, "name", context);

  expect(!context.isChanged).toBe(true);
  expect(result).toEqual({ color: "green" });
});

test('Reader should ignore cycles in JSON object', () => {
  var reader = new ValueReader(["object"], true);
  var context = { isChanged: false, hash: {} };
  var target = { color: "green" };
  target.parent = target; // Cycle
  var source = { color: "green" };
  source.parent = source; // Cycle
  var result = reader.read(target, source, "name", context);

  expect(!context.isChanged).toBe(true);
  expect(result).toEqual(source);
});