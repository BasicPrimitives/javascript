import binarySearch from './binarySearch';

var items = [
  { x: 10, y: 10 },
  { x: 15, y: 10 },
  { x: 16, y: 10 },
  { x: 20, y: 10 },
  { x: 50, y: 10 },
  { x: 100, y: 10 },
  { x: 140, y: 10 }
];

test('Search for item beyound left boundary of the collection should return leftmost item.', () => {
  const result = binarySearch(items, function (item, offset) {
    return 4 - item.x;
  });
  expect(result.item.x).toBe(10);
});

test('Search for item beyound right boundary of the collection should return the rightmost item.', () => {
  const result = binarySearch(items, function (item, offset) {
    return 200 - item.x;
  });
  expect(result.item.x).toBe(140);
});

test('Function should find item nearest to 60', () => {
  const result = binarySearch(items, function (item, offset) {
    return 60 - item.x;
  });
  expect(result.item.x).toBe(50);
});

test('Function should item nearest 90', () => {
  const result = binarySearch(items, function (item, offset) {
    return 90 - item.x;
  });
  expect(result.item.x).toBe(100);
});
