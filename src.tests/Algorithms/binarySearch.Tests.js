QUnit.module('Algorithms - Binary Search Function');

QUnit.test("primitives.common.binarySearch -  Search sorted list of elements for nearest item.", function (assert) {
  var items = [
    new primitives.common.Point(10, 10),
    new primitives.common.Point(15, 10),
    new primitives.common.Point(16, 10),
    new primitives.common.Point(20, 10),
    new primitives.common.Point(50, 10),
    new primitives.common.Point(100, 10),
    new primitives.common.Point(140, 10)
  ];

  var result = primitives.common.binarySearch(items, function (item, offset) {
    return 4 - item.x;
  });

  assert.equal(result.item.x, 10, "Search for item beyound left boundary of the collection should return leftmost item.");

  result = primitives.common.binarySearch(items, function (item, offset) {
    return 200 - item.x;
  });

  assert.equal(result.item.x, 140, "Search for item beyound right boundary of the collection should return the rightmost item.");

  result = primitives.common.binarySearch(items, function (item, offset) {
    return 60 - item.x;
  });

  assert.equal(result.item.x, 50, "Function should find item nearest to 60.");

  result = primitives.common.binarySearch(items, function (item, offset) {
    return 90 - item.x;
  });

  assert.equal(result.item.x, 100, "Function should item nearest 90.");
});