QUnit.module('Common - Functions');

QUnit.test("primitives.common.isEmptyObject - test for empty object.", function (assert) {
  assert.ok(primitives.common.isEmptyObject({}), "Object is empty returns true");
  assert.notOk(primitives.common.isEmptyObject({ a: 1000 }), "Object is not empty returns false");
});

QUnit.test("primitives.common.isNullOrEmpty - test for empty string.", function (assert) {
  assert.ok(primitives.common.isNullOrEmpty(""), "String is empty returns true");
  assert.ok(primitives.common.isNullOrEmpty(null), "String is null returns true");
  assert.notOk(primitives.common.isNullOrEmpty("Some string"), "String is not empty returns false");
});

QUnit.test("primitives.common.indexOf - test for object position.", function (assert) {
  assert.equal(primitives.common.indexOf([{ a: 2 }, { a: 5 }, { a: 3 }, { a: 10 }, { a: 8 }, { a: 4 }], { a: 3 }, function (a, b) { return a.a == b.a; }), 2, "Object");
  assert.equal(primitives.common.indexOf([2, 5, 3, 10, 8, 4, 1], 3), 2, "Integer");
  assert.equal(primitives.common.indexOf([2, 5, 3, 10, 8, 4, 1], 24), -1, "Integer was not found");
});

QUnit.test("primitives.common.compareArrays - compare non-object non-sorted arrays.", function (assert) {
  assert.ok(primitives.common.compareArrays([], []), "Empty arrays are equal");
  assert.notOk(primitives.common.compareArrays([1], []), "First array is empty and second is not. Arrays are not equal");
  assert.notOk(primitives.common.compareArrays([], [1]), "First array is not empty and second is empty. Arrays are not equal");
  assert.ok(primitives.common.compareArrays([1, 1, 1, 2, 2, 3, 3, 3, 3], [1, 2, 3, 1, 2, 3, 1, 3, 3]), "Compare equal non sorted arrays having duplicates. Arrays are equal");
  assert.ok(primitives.common.compareArrays(['A', 'B', 'AB', 'AC'], ['AC', 'AB', 'A', 'B']), "Compare equal non sorted arrays having no duplicates. Arrays are equal");
  assert.notOk(primitives.common.compareArrays([1, 2, 3, 4, 4, 5, 6, 7, 8], [1, 2, 3, 4, 4, 4, 5, 6, 7, 8]), "Compare non-equal non-sorted arrays having the same values but different number of duplicates. Arrays are not equal");
});

QUnit.test("primitives.common.highestContrast - test for highest contrast background color.", function (assert) {
  assert.equal(primitives.common.highestContrast("black", "white", "yellow"), "white", "White on black has higher contrast than yellow on black");
});