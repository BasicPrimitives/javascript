QUnit.module('Algorithms - Get Liniar Breaks for Collection of values Function');

QUnit.test("primitives.common.getLiniarBreaks", function (assert) {
  var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 300, 400, 9900, 10000];

  var result = primitives.common.getLiniarBreaks(values);

  var expectedResult = [8, 11, 13];

  assert.deepEqual(result, expectedResult, "Liniar breaks for 3 sequances havin 10x and 100x difference");

  var values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  var result = primitives.common.getLiniarBreaks(values);

  var expectedResult = [2, 5, 8];

  assert.deepEqual(result, expectedResult, "Liniar breaks for 3 distinct numbers");

  var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 200, 300];

  var result = primitives.common.getLiniarBreaks(values);

  var expectedResult = [3, 8, 11];

  assert.deepEqual(result, expectedResult, "Liniar breaks for 2 sequances having 10x difference");
});