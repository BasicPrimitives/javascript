import SortedList from './SortedList';

function getSortedList(items) {
  var sortedList = SortedList();

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

test('Small left rotation test on addition', () => {
  expect(addAndRemove([3, 7, 8])).toBe(true);
});

test('Small right rotation test on addition', () => {
  expect(addAndRemove([3, 2, 1])).toBe(true);
});

test('Big left rotation test on addition', () => {
  expect(addAndRemove([3, 1, 7, 0, 2, 10, 9, 8])).toBe(true);
});

test('Big right rotation test on addition', () => {
  expect(addAndRemove([6, 4, 8, 7, 9, 1, 2])).toBe(true);
});

test('Small left rotation test on removal', () => {
  expect(addAndRemove([3, 2, 4, 1], [4])).toBe(true);
});

test('Small right rotation test on removal', () => {
  expect(addAndRemove([3, 2, 4, 5], [2])).toBe(true);
});

test('Big left rotation test on removal', () => {
  expect(addAndRemove([3, 2, 7, 1, 5, 8, 4, 6], [1])).toBe(true);
});

test('Big right rotation test on removal', () => {
  expect(addAndRemove([6, 2, 7, 1, 4, 8, 3, 5], [8])).toBe(true);
});

test('Small left rotation test on removal', () => {
  expect(addAndRemove([-4, -3, -2, -1, 0, 1, 2, 3, 4], [-3, 0])).toBe(true);
});

test('Small right rotation test on removal', () => {
  expect(addAndRemove([4, 3, 2, 1, 0, -1, -2, -3, -4], [3, 0])).toBe(true);
});


test('loopForward should return all added values ordered', () => {
  var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

  var sortedList = getSortedList(items);

  var result = [];
  sortedList.loopForward(this, null, function (value) {
    result.push(value);
  });

  items.sort(function (a, b) { return a - b; });
  expect(sortedList.validate()).toBe(true);
  expect(result).toEqual(items);
});

test('loopForward should return all items from the given item including it', () => {
  var items = [0, 60, 180, 220, 260];

  var sortedList = getSortedList(items);

  var result = [];
  sortedList.loopForward(this, 180, function (value) {
    result.push(value);
  });
  expect(result).toEqual([180, 220, 260]);
});


test('loopBackward should return all items from the given item including it', () => {
  var items = [0, 60, 180, 220, 260];

  var sortedList = getSortedList(items);

  var result = [];
  sortedList.loopBackward(this, 180, function (value) {
    result.push(value);
  });
  expect(result).toEqual([180, 60, 0]);
});

test('loopBackward should return all values in reversed order', () => {
  var items = [100, 50, 150, 25, 75, 125, 175, 12, 37, 63, 87, 113, 137, 163, 187];

  var sortedList = getSortedList(items);

  var result = [];
  sortedList.loopBackward(this, null, function (value) {
    result.push(value);
  });

  items.sort(function (a, b) { return b - a; });
  expect(sortedList.validate()).toBe(true);
  expect(result).toEqual(items);
});

test('SortedList should return all odd items', () => {
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
  expect(sortedList.validate()).toBe(true);
  expect(result).toEqual(expected);
});


test('Performance test for regular array search and remove elements', () => {
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
  expect(items).toEqual(expected);
});