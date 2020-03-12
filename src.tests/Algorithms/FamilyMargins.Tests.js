QUnit.module('Algorithms - FamilyMargins structure helps to calculate space and place family siblings side by side');

QUnit.test("primitives.common.FamilyMargins", function (assert) {

  function getMargins(margins) {
    var result = [];
    margins.loop(this, function (level, left, right) {
      result[level] = [left, right];
    })
    return result;
  }

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(20, 0);
    margins.add(30, 0);
    margins.add(10, 0);

    var result = getMargins(margins);

    var expectedResult = [
      [-5, 5],
      [-15, 15],
      [-10, 10]
    ];

    assert.deepEqual(result, expectedResult, "loop of levels in FamilyMargins object");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(8, 0);
    margins.add(10, 0);
    margins.add(40, 0);
    margins.add(60, 0);
    margins.add(80, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(80, 1);
    margins2.add(120, 1);
    margins2.add(20, 1);

    assert.equal(margins.getDistanceTo(margins2), 40, "getDistanceTo - left margins are deeper than right");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(80, 0);
    margins.add(120, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(8, 1);
    margins2.add(10, 1);
    margins2.add(40, 1);
    margins2.add(60, 1);
    margins2.add(80, 1);

    assert.equal(margins.getDistanceTo(margins2), 40, "getDistanceTo - right margins are deeper than left");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(80, 1);

    assert.equal(margins.getDistanceTo(margins2), null, "getDistanceTo - left margins are empty");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(8, 0);
    margins.add(10, 0);
    margins.add(40, 0);
    margins.add(60, 0);
    margins.add(80, 0);

    var margins2 = new primitives.common.FamilyMargins();
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

    assert.deepEqual(result, expectedResult, "merge - left margins are deeper than right");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(80, 0);
    margins.add(120, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
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

    assert.deepEqual(result, expectedResult, "merge - right margins are deeper than left");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(80, 0);
    margins.add(120, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
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

    assert.deepEqual(result, expectedResult, "merge - right margins are deeper than left and interval is added");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(20, 1);

    var margins3 = new primitives.common.FamilyMargins();
    margins3.add(30, 2);

    merged = new primitives.common.FamilyMargins();

    merged.merge(margins, 10);
    merged.merge(margins2, 10);
    merged.merge(margins3, 10);

    var result = getMargins(merged);

    var expectedResult = [
      [-45, 45]
    ];

    assert.deepEqual(result, expectedResult, "merge - 3 elements side by side");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(10, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(20, 1);
    margins2.add(20, 1);

    var margins3 = new primitives.common.FamilyMargins();
    margins3.add(20, 2);
    margins3.add(30, 2);

    margins.merge(margins2, 10);
    margins.merge(margins3, 10);

    var result = getMargins(margins);

    var expectedResult = [
      [-45, 45],
      [-40, 40]
    ];

    assert.deepEqual(result, expectedResult, "merge - 3 families having 2 generations side by side");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(50, 0);
    margins.add(50, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(50, 1);

    margins.merge(margins2, 20);

    var result = getMargins(margins);

    var expectedResult = [
      [-60, 60],
      [-60, -10]
    ];

    assert.deepEqual(result, expectedResult, "merge - family having 2 generations with family having one generation only");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(20, 0);
    margins2.add(20, 0);

    margins.merge(margins2);

    var result = getMargins(margins);

    var expectedResult = [
      [-10, 10],
      [-10, 10]
    ];

    assert.deepEqual(result, expectedResult, "merge - empty family with non empty");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(20, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();


    var expectedResult = [
      [-10, 10],
      [-10, 10]
    ];

    margins.merge(new primitives.common.FamilyMargins());

    var result = getMargins(margins);

    assert.deepEqual(result, expectedResult, "merge - non empty family with empty");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(10, 0);

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(10, 1);

    margins.attach(margins2, 0);

    var result = getMargins(margins);

    var expectedResult = [
      [-5, 15]
    ];

    assert.deepEqual(result, expectedResult, "attach - one family to another");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(8, 0);
    margins.add(10, 0);
    margins.add(40, 0);
    margins.add(60, 0);
    margins.add(80, 0);

    var margins2 = new primitives.common.FamilyMargins();
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

    assert.deepEqual(result, expectedResult, "attach - left margins are deeper than right");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();
    margins.add(80, 0);
    margins.add(120, 0);
    margins.add(20, 0);

    var margins2 = new primitives.common.FamilyMargins();
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

    assert.deepEqual(result, expectedResult, "attach - right margins are deeper than left");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(10, 0);

    margins.attach(margins2, 20);

    var result = getMargins(margins);

    var expectedResult = [
      [15, 25]
    ];

    assert.deepEqual(result, expectedResult, "attach - single generation family to empty family with positive interval");
  })();

  (function () {
    var margins = new primitives.common.FamilyMargins();

    var margins2 = new primitives.common.FamilyMargins();
    margins2.add(10, 0);

    margins.attach(margins2, -20);

    var result = getMargins(margins);

    var expectedResult = [
      [-25, -15]
    ];

    assert.deepEqual(result, expectedResult, "attach - single generation family to empty family with negative interval");
  })();

  (function () {
    var a = new primitives.common.FamilyMargins();
    var b = new primitives.common.FamilyMargins();
    b.add(10, 0);

    a.attach(b, 5);
    a.add(10, 0);

    var c = new primitives.common.FamilyMargins();
    c.attach(b, -5);
    c.add(10, 1);

    var d = new primitives.common.FamilyMargins();
    d.merge(a);
    d.merge(c);
    d.add(10, 0);

    var result = getMargins(d);

    var expectedResult = [
      [-5, 5],
      [-10, 10],
      [-5, 5]
    ];

    assert.deepEqual(result, expectedResult, "attach - rombus");
  })();

  (function () {
    var d = new primitives.common.FamilyMargins();
    d.add(10, 0);

    var e = new primitives.common.FamilyMargins();
    e.add(10, 0);

    d.merge(e);
    d.add(10, 0);

    var a = new primitives.common.FamilyMargins();
    a.attach(d, 5);
    a.add(10, 0);

    var b = new primitives.common.FamilyMargins();
    b.attach(d, -5);
    b.add(10, 1);

    a.merge(b);

    var result = getMargins(a);

    var expectedResult = [
      [-10, 10],
      [-5, 5],
      [-10, 10]
    ];

    assert.deepEqual(result, expectedResult, "attach - X");
  })();
});
