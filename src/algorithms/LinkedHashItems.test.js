import LinkedHashItems from './LinkedHashItems';

var items = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'F' }
];

function getLinkedHashItems(items) {
  var linkedHashItems = new LinkedHashItems();
  for (var index = 0; index < items.length; index++) {
    var item = items[index];
    linkedHashItems.add(item.id, item);
  };
  return linkedHashItems;
}

test('LinkedHashItems - Forward iteration returned correct items', () => {
    const linkedHashItems = getLinkedHashItems(items);
    const result = [];
    linkedHashItems.iterate(function (item) {
      result.push(item);
    });
    expect(items).toEqual(result);
});


test('LinkedHashItems - Forward items iteration', () => {
  const linkedHashItems = getLinkedHashItems(items);
  const result = [];
  linkedHashItems.iterate(function (item) {
    result.push(item);
  });
  expect(items).toEqual(result);
});

test('LinkedHashItems - Backward items iteration', () => {
  const linkedHashItems = getLinkedHashItems(items);
  const reversedResult = [],
    reversedItems = items.slice(0);
  reversedItems.reverse();

  linkedHashItems.iterateBack(function (item) {
    reversedResult.push(item);
  });
  expect(reversedItems).toEqual(reversedResult);
});  

test('LinkedHashItems - Removed item', () => {
  const linkedHashItems = getLinkedHashItems(items);
  linkedHashItems.remove(3);
  
  const modifiedItems = items.slice(0);
  modifiedItems.splice(2, 1);
  
  expect(modifiedItems).toEqual(linkedHashItems.toArray());
}); 

test('LinkedHashItems - Remove first item', () => {
  const linkedHashItems = getLinkedHashItems(items);
  linkedHashItems.remove(1);

  const modifiedItems = items.slice(0);
  modifiedItems.splice(0, 1);

  expect(modifiedItems).toEqual(linkedHashItems.toArray());
});

test('LinkedHashItems - Remove last item', () => {
  const linkedHashItems = getLinkedHashItems(items);
  linkedHashItems.remove(6);

  const modifiedItems = items.slice(0);
  modifiedItems.splice(5, 1);

  expect(modifiedItems).toEqual(linkedHashItems.toArray());
});

test('LinkedHashItems - Remove last item', () => {
  const linkedHashItems = getLinkedHashItems(items);
  linkedHashItems.empty();

  expect([]).toEqual(linkedHashItems.toArray());
});