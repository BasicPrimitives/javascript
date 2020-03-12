QUnit.module('Algorithms - LinkedHashItems');

QUnit.test("primitives.common.LinkedHashItems -  Add and iterate items in linked hash items collection.", function (assert) {
  var items = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' }
  ];

  var linkedHashItems = new primitives.common.LinkedHashItems();
  for (var index = 0; index < items.length; index++) {
    var item = items[index];
    linkedHashItems.add(item.id, item);
  };

  var result = [];
  linkedHashItems.iterate(function (item) {
    result.push(item);
  });
  assert.deepEqual(items, result, "Forward iteration returned correct items!");

  var reversedResult = [],
    reversedItems = items.slice(0);
  reversedItems.reverse();

  linkedHashItems.iterateBack(function (item) {
    reversedResult.push(item);
  });
  assert.deepEqual(reversedItems, reversedResult, "Back iteration returned correct items!");

  linkedHashItems.remove(3);
  items.splice(2, 1);
  assert.deepEqual(items, linkedHashItems.toArray(), "Removed item. Passed!");

  linkedHashItems.remove(1);
  items.splice(0, 1);
  assert.deepEqual(items, linkedHashItems.toArray(), "Remove first item. Passed!");

  linkedHashItems.remove(6);
  items.splice(3, 1);
  assert.deepEqual(items, linkedHashItems.toArray(), "Remove last item. Passed!");

  linkedHashItems.empty();
  assert.deepEqual([], linkedHashItems.toArray(), "Remove all items. Passed!");
});