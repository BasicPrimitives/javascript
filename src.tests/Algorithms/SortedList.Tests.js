QUnit.module('Algorithms - SortedList - AVL binary search tree collection implementation.');

QUnit.test("primitives.common.SortedList", function (assert) {
  function getSortedList(items) {
    var sortedList = primitives.common.SortedList();

    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      sortedList.add(item);
    }

    return sortedList;
  };

  function removeItems(sortedList, items) {
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      sortedList.remove(item);
    }
  };

  function addAndRemove(addValues, removeValues) {
    var sortedList = getSortedList(addValues);
    if (removeValues != null) {
      removeItems(sortedList, removeValues);
    }
    return sortedList.validate();
  }

  (function () {
    assert.ok(addAndRemove([3, 7, 8]), "Small left rotation test on addition.");
    assert.ok(addAndRemove([3, 2, 1]), "Small right rotation test on addition.");
    assert.ok(addAndRemove([3, 1, 7, 0, 2, 10, 9, 8]), "Big left rotation test on addition.");
    assert.ok(addAndRemove([6, 4, 8, 7, 9, 1, 2]), "Big right rotation test on addition.");
    assert.ok(addAndRemove([3, 2, 4, 1], [4]), "Small left rotation test on removal.");
    assert.ok(addAndRemove([3, 2, 4, 5], [2]), "Small right rotation test on removal.");
    assert.ok(addAndRemove([3, 2, 7, 1, 5, 8, 4, 6], [1]), "Big left rotation test on removal.");
    assert.ok(addAndRemove([6, 2, 7, 1, 4, 8, 3, 5], [8]), "Big right rotation test on removal.");
    assert.ok(addAndRemove([-4, -3, -2, -1, 0, 1, 2, 3, 4], [-3, 0]), "Small left rotation test on removal.");
    assert.ok(addAndRemove([4, 3, 2, 1, 0, -1, -2, -3, -4], [3, 0]), "Small right rotation test on removal.");
  })();

  (function () {
    var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

    var sortedList = getSortedList(items);

    var result = [];
    sortedList.loopForward(this, null, function (value) {
      result.push(value);
    });

    items.sort(function (a, b) { return a - b; });

    assert.ok(sortedList.validate(), "Sorted list validated.");
    assert.deepEqual(result, items, "loopForward should return all added values ordered.");
  })();

  (function () {
    var items = [0, 60, 180, 220, 260];

    var sortedList = getSortedList(items);

    var result = [];
    sortedList.loopForward(this, 180, function (value) {
      result.push(value);
    });

    assert.deepEqual(result, [180, 220, 260], "loopForward should return all items from the given item including it.");
  })();

  (function () {
    var items = [0, 60, 180, 220, 260];

    var sortedList = getSortedList(items);

    var result = [];
    sortedList.loopBackward(this, 180, function (value) {
      result.push(value);
    });

    assert.deepEqual(result, [180, 60, 0], "loopBackward should return all items from the given item including it.");
  })();

  (function () {
    var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

    var sortedList = getSortedList(items);

    var result = [];
    sortedList.loopBackward(this, null, function (value) {
      result.push(value);
    });

    items.sort(function (a, b) { return b - a; });

    assert.ok(sortedList.validate(), "Sorted list validated.");
    assert.deepEqual(result, items, "loopBackward should return all values in reversed order.");
  })();

  (function () {
    var count = 100;
    var items = [];
    for (var index = -count; index <= count; index += 1) {
      items.push(index);
    }

    var sortedList = getSortedList(items);

    var expected = [];
    for (var index = -count; index <= count; index += 1) {
      if (index % 2 != 0) {
        sortedList.remove(index);
      } else {
        expected.push(index);
      }
    }

    var result = [];
    sortedList.loopForward(this, null, function (value) {
      result.push(value);
    });


    assert.ok(sortedList.validate(), "Sorted list validated.");
    assert.deepEqual(result, expected, "SortedList should return all odd items # " + result.length);
  })();

  (function () {
    var count = 100;
    var items = [];
    for (var index = -count; index <= count; index += 1) {
      items.push(index);
    }

    var expected = []
    for (var index = -count; index <= count; index += 1) {
      if (index % 2 != 0) {
        var itemIndex = items.indexOf(index);
        items.splice(itemIndex, 1);
      } else {
        expected.push(index);
      }
    }
    assert.deepEqual(items, expected, "Performance test for regular array search and remove elements #" + items.length);
  })();
});