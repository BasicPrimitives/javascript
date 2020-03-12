QUnit.module('Algorithms - RMQ - Range Minimum Query');

QUnit.test("primitives.common.RMQ", function (assert) {
  function getRangeMinimum(items, from, to) {
    var result = items[from];
    for (var index = from + 1; index <= to; index += 1) {
      if (items[index] < result) {
        result = items[index];
      }
    }
    return result;
  }

  (function () {
    var items = [
      53, 24, 44, 59, 43, 91, 39, 37, 33, 78,
      32, 34, 93, 88, 76, 74, 63, 99, 86, 47,
      84, 83, 67, 17, 14, 60, 11, 46, 89, 12,
      96, 73, 57, 1, 58, 48, 80, 13, 19, 40,
      20, 82, 29, 2, 100, 77, 35, 36, 56, 5,
      7, 97, 4, 95, 75, 66, 21, 31, 69, 54,
      30, 79, 68, 52, 62, 61, 28, 23, 41, 42,
      8, 27, 45, 3, 90, 26, 22, 71, 38, 98,
      94, 49, 9, 64, 72, 25, 50, 81, 16, 87,
      15, 51, 10, 92, 6, 55, 18, 65, 70, 85
    ];
    var rmq = primitives.common.RMQ(items);

    assert.equal(rmq.getRangeMinimum(0, 15), getRangeMinimum(items, 0, 15), "getRangeMinimum test from 0 to 15");
    assert.equal(rmq.getRangeMinimum(45, 99), getRangeMinimum(items, 45, 100), "getRangeMinimum test from 45 to 100");
    assert.equal(rmq.getRangeMinimum(0, 99), getRangeMinimum(items, 0, 100), "getRangeMinimum test from 0 to 100");
    assert.equal(rmq.getRangeMinimum(8, 8), getRangeMinimum(items, 8, 8), "getRangeMinimum test from 8 to 8");
    assert.equal(rmq.getRangeMinimum(50, 51), getRangeMinimum(items, 50, 51), "getRangeMinimum test from 50 to 51");
    assert.equal(rmq.getRangeMinimum(1, 98), getRangeMinimum(items, 1, 99), "getRangeMinimum test from 1 to 99");
    assert.equal(rmq.getRangeMinimum(32, 65), getRangeMinimum(items, 32, 65), "getRangeMinimum test from 32 to 65");
  })();
});