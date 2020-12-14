import Pile from './Pile';

function getPile(items) {
  var pile = Pile();
  for (var index = 0, len = items.length; index < len; index += 1) {
    var item = items[index];
    pile.add(item[0], item[1], item);
  }
  return pile;
}

test('Pile should have two rows', () => {
    const items = [[1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14]];
    const pile = getPile(items);
    var result = {};
    var pileHeight = pile.resolve(this, function (from, to, context, offset) {
      if (!result.hasOwnProperty(offset)) {
        result[offset] = [];
      }
      result[offset].push(context);
    });
    expect(pileHeight).toBe(2);

    expect(result).toEqual({
      "0": [[2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14]],
      "1": [[1, 3], [3, 5], [5, 7], [7, 9], [9, 11], [11, 13]]
    });
});

test('Pile should have 6 rows', () => {
  const items = [
    [5, 10], [10, 15],
    [12.5, 13], [13, 14.5],
    [1, 10], [12, 14],
    [5, 13],
    [2, 7], [8, 10], [12, 14],
    [12, 13], [13.5, 15]
  ];
  const pile = getPile(items);
  var result = {};
  var pileHeight = pile.resolve(this, function (from, to, context, offset) {
    if (!result.hasOwnProperty(offset)) {
      result[offset] = [];
    }
    result[offset].push(context);
  });
  expect(pileHeight).toBe(6);

  expect(result).toEqual({
    "0": [[2, 7], [8, 10], [12.5, 13], [13.5, 15]],
    "1": [[5, 10], [12, 13], [13, 14.5]],
    "2": [[1, 10], [12, 14]],
    "3": [[12, 14]],
    "4": [[10, 15]],
    "5": [[5, 13]]
  });
});

test('Pile should have 2 rows', () => {
  const items = [
    [70, 90], [70, 80],
    [10, 20], [30, 40],
    [36, 65], [50, 60],
    [10, 35]
  ];
  const pile = getPile(items);
  var result = {};
  var pileHeight = pile.resolve(this, function (from, to, context, offset) {
    if (!result.hasOwnProperty(offset)) {
      result[offset] = [];
    }
    result[offset].push(context);
  });
  expect(pileHeight).toBe(2);

  expect(result).toEqual({
    "0": [[10, 20], [30, 40], [50, 60], [70, 80]],
    "1": [[10, 35], [36, 65], [70, 90]]
  });
});

