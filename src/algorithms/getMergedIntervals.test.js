import getMergedIntervals from './getMergedIntervals';
import Interval from '../graphics/structs/Interval';

function getIntervals(items) {
  var result = [];

  for(var index = 0; index < items.length; index+=1) {
    var item = items[index];
    result.push( new Interval(item[0], item[1], item[2]));
  }

  return result;
}

test('getMergedIntervals - function should merge all intervals into one', () => {
  const items = [
    [1, 10, "Second"],
    [2, 20, "Third"],
    [3, 30, "Toronto"],
    [4, 40, "NY"],
    [5, 50, "Seoul"],
    [6, 60, "Maple"],
    [7, 70, "Vaughan"],
    [8, 80, "Redmond"]
  ];

  var result = [];
  getMergedIntervals(this, getIntervals(items), function(interval) {
    result.push(interval);
  })

  expect(result).toEqual([
    {
      from: 1,
      to: 80,
      context: "Second"
    }
  ]);
});

test('getMergedIntervals - function should merge all intervals into one and preserve first item context', () => {
  const items = [
    [8, 80, "Redmond"],
    [2, 20, "Third"],
    [4, 40, "NY"],
    [6, 60, "Maple"],
    [3, 30, "Toronto"],
    [7, 70, "Vaughan"],
    [5, 50, "Seoul"],
    [1, 10, "Second"]
  ];

  var result = [];
  getMergedIntervals(this, getIntervals(items), function(interval) {
    result.push(interval);
  })

  expect(result).toEqual([
    {
      from: 1,
      to: 80,
      context: "Redmond"
    }
  ]);
});

test('getMergedIntervals - function should merge all intervals into two intervals', () => {
  const items = [
    [20, 20, "Third"],
    [8, 40, "Redmond"],
    [55, 65, "Vaughan"],
    [40, 40, "NY"],
    [50, 60, "Toronto"],
    [8, 8, "Maple"],
    [52, 57, "Seoul"]
  ];

  var result = [];
  getMergedIntervals(this, getIntervals(items), function(interval) {
    result.push(interval);
  })

  expect(result).toEqual([
    {
      from: 8,
      to: 40,
      context: "Third"
    },
    {
      from: 50,
      to: 65,
      context: "Vaughan"
    }
  ]);
});

test('getMergedIntervals - function should merge connected intervals', () => {
  const items = [
    [20, 40, "Redmond"],
    [20, 20, "Third"],
    [40, 60, "Vaughan"]
  ];

  var result = [];
  getMergedIntervals(this, getIntervals(items), function(interval) {
    result.push(interval);
  })

  expect(result).toEqual([
    {
      from: 20,
      to: 60,
      context: "Redmond"
    }
  ]);
});