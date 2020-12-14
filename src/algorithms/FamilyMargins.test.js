import FamilyMargins from './FamilyMargins';

function getMargins(margins) {
  var result = [];
  margins.loop(this, function (level, left, right) {
    result[level] = [left, right];
  })
  return result;
}


test('loop - loop of levels in FamilyMargins object', () => {
  var margins = new FamilyMargins();
  margins.add(20, 0);
  margins.add(30, 0);
  margins.add(10, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-5, 5],
    [-15, 15],
    [-10, 10]
  ];

  expect(result).toEqual(expectedResult);
});

test('getDistanceTo - left margins are deeper than right', () => {
  var margins = new FamilyMargins();
  margins.add(8, 0);
  margins.add(10, 0);
  margins.add(40, 0);
  margins.add(60, 0);
  margins.add(80, 0);

  var margins2 = new FamilyMargins();
  margins2.add(80, 1);
  margins2.add(120, 1);
  margins2.add(20, 1);

  expect(margins.getDistanceTo(margins2)).toBe(40);
});

test('getDistanceTo - right margins are deeper than left', () => {
  var margins = new FamilyMargins();
  margins.add(80, 0);
  margins.add(120, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(8, 1);
  margins2.add(10, 1);
  margins2.add(40, 1);
  margins2.add(60, 1);
  margins2.add(80, 1);

  expect(margins.getDistanceTo(margins2)).toBe(40);
});

test('getDistanceTo - left margins are empty', () => {
  var margins = new FamilyMargins();

  var margins2 = new FamilyMargins();
  margins2.add(80, 1);

  expect(margins.getDistanceTo(margins2)).toBe(null);
});

test('merge - left margins are deeper than right', () => {
  var margins = new FamilyMargins();
  margins.add(8, 0);
  margins.add(10, 0);
  margins.add(40, 0);
  margins.add(60, 0);
  margins.add(80, 0);

  var margins2 = new FamilyMargins();
  margins2.add(80, 1);
  margins2.add(120, 1);
  margins2.add(20, 1);

  margins.merge(margins2, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-70, 70],
    [-60, 120],
    [-50, 100],
    [-35, -25],
    [-34, -26]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - right margins are deeper than left', () => {
  var margins = new FamilyMargins();
  margins.add(80, 0);
  margins.add(120, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(8, 1);
  margins2.add(10, 1);
  margins2.add(40, 1);
  margins2.add(60, 1);
  margins2.add(80, 1);

  margins.merge(margins2, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-70, 70],
    [-120, 60],
    [-100, 50],
    [25, 35],
    [26, 34]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - right margins are deeper than left and interval is added', () => {
  var margins = new FamilyMargins();
  margins.add(80, 0);
  margins.add(120, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(8, 1);
  margins2.add(10, 1);
  margins2.add(40, 1);
  margins2.add(60, 1);
  margins2.add(80, 1);

  margins.merge(margins2, 20);

  var result = getMargins(margins);

  var expectedResult = [
    [-80, 80],
    [-130, 70],
    [-110, 60],
    [35, 45],
    [36, 44]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - 3 elements side by side', () => {
  var margins = new FamilyMargins();
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(20, 1);

  var margins3 = new FamilyMargins();
  margins3.add(30, 2);

  const merged = new FamilyMargins();

  merged.merge(margins, 10);
  merged.merge(margins2, 10);
  merged.merge(margins3, 10);

  var result = getMargins(merged);

  var expectedResult = [
    [-45, 45]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - 3 families having 2 generations side by side', () => {
  var margins = new FamilyMargins();
  margins.add(10, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(20, 1);
  margins2.add(20, 1);

  var margins3 = new FamilyMargins();
  margins3.add(20, 2);
  margins3.add(30, 2);

  margins.merge(margins2, 10);
  margins.merge(margins3, 10);

  var result = getMargins(margins);

  var expectedResult = [
    [-45, 45],
    [-40, 40]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - family having 2 generations with family having one generation only', () => {
  var margins = new FamilyMargins();
  margins.add(50, 0);
  margins.add(50, 0);

  var margins2 = new FamilyMargins();
  margins2.add(50, 1);

  margins.merge(margins2, 20);

  var result = getMargins(margins);

  var expectedResult = [
    [-60, 60],
    [-60, -10]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - empty family with non empty', () => {
  var margins = new FamilyMargins();

  var margins2 = new FamilyMargins();
  margins2.add(20, 0);
  margins2.add(20, 0);

  margins.merge(margins2);

  var result = getMargins(margins);

  var expectedResult = [
    [-10, 10],
    [-10, 10]
  ];

  expect(result).toEqual(expectedResult);
});

test('merge - non empty family with empty', () => {
  var margins = new FamilyMargins();
  margins.add(20, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();


  var expectedResult = [
    [-10, 10],
    [-10, 10]
  ];

  margins.merge(new FamilyMargins());

  var result = getMargins(margins);

  expect(result).toEqual(expectedResult);
});

test('attach - one family to another', () => {
  var margins = new FamilyMargins();
  margins.add(10, 0);

  var margins2 = new FamilyMargins();
  margins2.add(10, 1);

  margins.attach(margins2, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-5, 15]
  ];

  expect(result).toEqual(expectedResult);
});

test('attach - left margins are deeper than right', () => {
  var margins = new FamilyMargins();
  margins.add(8, 0);
  margins.add(10, 0);
  margins.add(40, 0);
  margins.add(60, 0);
  margins.add(80, 0);

  var margins2 = new FamilyMargins();
  margins2.add(80, 1);
  margins2.add(120, 1);
  margins2.add(20, 1);

  margins.attach(margins2, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-40, 100],
    [-30, 150],
    [-20, 130],
    [-5, 5],
    [-4, 4]
  ];
  expect(result).toEqual(expectedResult);
});

test('attach - right margins are deeper than left', () => {
  var margins = new FamilyMargins();
  margins.add(80, 0);
  margins.add(120, 0);
  margins.add(20, 0);

  var margins2 = new FamilyMargins();
  margins2.add(8, 1);
  margins2.add(10, 1);
  margins2.add(40, 1);
  margins2.add(60, 1);
  margins2.add(80, 1);

  margins.attach(margins2, 0);

  var result = getMargins(margins);

  var expectedResult = [
    [-10, 130],
    [-60, 120],
    [-40, 110],
    [85, 95],
    [86, 94]
  ];

  expect(result).toEqual(expectedResult);
});

test('attach - single generation family to empty family with positive interval', () => {
  var margins = new FamilyMargins();

  var margins2 = new FamilyMargins();
  margins2.add(10, 0);

  margins.attach(margins2, 20);

  var result = getMargins(margins);

  var expectedResult = [
    [15, 25]
  ];

  expect(result).toEqual(expectedResult);
});

test('attach - single generation family to empty family with negative interval', () => {
  var margins = new FamilyMargins();

  var margins2 = new FamilyMargins();
  margins2.add(10, 0);

  margins.attach(margins2, -20);

  var result = getMargins(margins);

  var expectedResult = [
    [-25, -15]
  ];

  expect(result).toEqual(expectedResult);
});

test('attach - rombus', () => {
  var a = new FamilyMargins();
  var b = new FamilyMargins();
  b.add(10, 0);

  a.attach(b, 5);
  a.add(10, 0);

  var c = new FamilyMargins();
  c.attach(b, -5);
  c.add(10, 1);

  var d = new FamilyMargins();
  d.merge(a);
  d.merge(c);
  d.add(10, 0);

  var result = getMargins(d);

  var expectedResult = [
    [-5, 5],
    [-10, 10],
    [-5, 5]
  ];

  expect(result).toEqual(expectedResult);
});

test('attach - X', () => {
  var d = new FamilyMargins();
  d.add(10, 0);

  var e = new FamilyMargins();
  e.add(10, 0);

  d.merge(e);
  d.add(10, 0);

  var a = new FamilyMargins();
  a.attach(d, 5);
  a.add(10, 0);

  var b = new FamilyMargins();
  b.attach(d, -5);
  b.add(10, 1);

  a.merge(b);

  var result = getMargins(a);

  var expectedResult = [
    [-10, 10],
    [-5, 5],
    [-10, 10]
  ];

  expect(result).toEqual(expectedResult);
});
