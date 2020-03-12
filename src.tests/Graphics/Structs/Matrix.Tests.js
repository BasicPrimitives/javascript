QUnit.module('Graphics - Structs - Matrix');

QUnit.test("primitives.common.Matrix - 2 by 2 matrix", function (assert) {

  var m = new primitives.common.Matrix(6, 2, 5, 3);

  assert.equal(m.determinant(), 8, "Check determinant.");
});
