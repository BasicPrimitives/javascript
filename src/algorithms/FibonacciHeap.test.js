import FibonacciHeap from './FibonacciHeap';

function getFibonacciHeap(items, isMaximum) {
  var queue = FibonacciHeap(isMaximum);
  for (var index = 0, len = items.length; index < len; index += 1) {
    var item = items[index];
    queue.add(item[0], item[1], item[2]);
  }
  return queue;
}

test('FibonacciHeap - Structure should return sorted items', () => {
  const items = [
    [10, 1, "First"],
    [1, 10, "Second"],
    [2, 20, "Third"],
    [3, 30, "Toronto"],
    [4, 40, "NY"],
    [5, 50, "Seoul"],
    [6, 60, "Maple"],
    [7, 70, "Vaughan"],
    [8, 80, "Redmond"]
  ];
  const queue = getFibonacciHeap(items, false);
  const result = [];
  let item = null;
  while ((item = queue.extractRoot()) != null) {
    result.push([item.key, item.priority, item.item]);
    queue.validate();
  }
  expect(result).toEqual([
    [10, 1, "First"],
    [1, 10, "Second"],
    [2, 20, "Third"],
    [3, 30, "Toronto"],
    [4, 40, "NY"],
    [5, 50, "Seoul"],
    [6, 60, "Maple"],
    [7, 70, "Vaughan"],
    [8, 80, "Redmond"]
  ]);
});

test('FibonacciHeap - Structure should return item #1 first', () => {
  const items = [
    [10, 1, "First"],
    [1, 10, "Second"],
    [2, 20, "Third"],
    [3, 30, "Toronto"],
    [4, 40, "NY"],
    [5, 50, "Seoul"],
    [6, 60, "Maple"],
    [7, 70, "Vaughan"],
    [8, 80, "Redmond"]
  ];
  const queue = getFibonacciHeap(items, false);

  queue.extractRoot()
  queue.validate();

  queue.setPriority(8, 1);
  queue.validate();

  var result = [];
  let item = null;
  while ((item = queue.extractRoot()) != null) {
    result.push([item.key, item.priority, item.item]);
    queue.validate();
  }
  expect(result).toEqual([
    [8, 1, "Redmond"],
    [1, 10, "Second"],
    [2, 20, "Third"],
    [3, 30, "Toronto"],
    [4, 40, "NY"],
    [5, 50, "Seoul"],
    [6, 60, "Maple"],
    [7, 70, "Vaughan"]
  ]);
});

