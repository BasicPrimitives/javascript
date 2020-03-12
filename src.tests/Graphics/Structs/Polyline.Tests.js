QUnit.module('Graphics - Structs - Polyline');

QUnit.test("primitives.common.Polyline - Various itteration functions over polyline segments", function (assert) {

  var polyline = new primitives.common.Polyline();
  polyline.addSegment(new primitives.common.MoveSegment(20, 20));
  polyline.addSegment(new primitives.common.LineSegment(100, 20));
  polyline.addSegment(new primitives.common.LineSegment(100, 100));
  polyline.addSegment(new primitives.common.LineSegment(20, 100));
  polyline.addSegment(new primitives.common.LineSegment(20, 20));

  var result = [];
  polyline.loop(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected1 = [{ "segmentType": 1, "x": 20, "y": 20 },
  { "segmentType": 0, "x": 100, "y": 20 },
  { "segmentType": 0, "x": 100, "y": 100 },
  { "segmentType": 0, "x": 20, "y": 100 },
  { "segmentType": 0, "x": 20, "y": 20 }
  ];

  assert.deepEqual(result, expected1, "loop - Loop polyline segments function test");

  var result = [];
  polyline.loopReversed(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected2 = [
    { "segmentType": 0, "x": 20, "y": 20 },
    { "segmentType": 0, "x": 20, "y": 100 },
    { "segmentType": 0, "x": 100, "y": 100 },
    { "segmentType": 0, "x": 100, "y": 20 },
    { "segmentType": 1, "x": 20, "y": 20 }
  ];

  assert.deepEqual(result, expected2, "loopReversed - Loop in reversed order polyline segments function test");


  var polyline2 = new primitives.common.Polyline();
  polyline2.addSegment(new primitives.common.MoveSegment(200, 200));
  polyline2.addSegment(new primitives.common.LineSegment(1000, 200));
  polyline2.addSegment(new primitives.common.MoveSegment(1000, 200)); // this segment is redundant
  polyline2.addSegment(new primitives.common.LineSegment(1000, 1000));

  polyline2.optimizeMoveSegments();

  var result = [];
  polyline2.loop(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });

  var expected3 = [{ "segmentType": 1, "x": 200, "y": 200 },
  { "segmentType": 0, "x": 1000, "y": 200 },
  { "segmentType": 0, "x": 1000, "y": 1000 }
  ];

  assert.deepEqual(result, expected3, "optimizeMoveSegments - Optimize polyline move segments function test");

  polyline2.mergeTo(polyline);

  var result = [];
  polyline.loop(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });

  var expected4 = expected1.concat(expected3);

  assert.deepEqual(result, expected4, "mergeTo - Merge one polyline segments into another function test");

  assert.equal(polyline.length(), expected4.length, "length - Polyline length function test");

  var polyline3 = new primitives.common.Polyline();
  polyline3.addSegment(new primitives.common.MoveSegment(20, 20));
  polyline3.addSegment(new primitives.common.LineSegment(100, 20));

  var polyline4 = new primitives.common.Polyline();
  polyline3.addSegment(new primitives.common.MoveSegment(20, 20));
  polyline3.addSegment(new primitives.common.LineSegment(20, 100));

  polyline3.addInverted(polyline4);

  var result4 = [];
  polyline3.loop(this, function (segment) {
    result4.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });

  var expected4 = [
    { "segmentType": 1, "x": 20, "y": 20 },
    { "segmentType": 0, "x": 100, "y": 20 },
    { "segmentType": 1, "x": 20, "y": 20 },
    { "segmentType": 0, "x": 20, "y": 100 }
  ];

  assert.deepEqual(result4, expected4, "addInverted - Add inverted polyline segments function test");

});

QUnit.test("primitives.common.Polyline - Polyline offset function test.", function (assert) {

  var polyline = new primitives.common.Polyline();
  polyline.addSegment(new primitives.common.MoveSegment(20, 20));
  polyline.addSegment(new primitives.common.LineSegment(100, 20));
  polyline.addSegment(new primitives.common.LineSegment(100, 100));
  polyline.addSegment(new primitives.common.LineSegment(20, 100));
  polyline.addSegment(new primitives.common.LineSegment(20, 20));

  var offsetPolyline = polyline.getOffsetPolyine(10);

  var result = [];
  offsetPolyline.loop(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected1 = [{ "segmentType": 1, "x": 10, "y": 10 },
  { "segmentType": 0, "x": 110, "y": 10 },
  { "segmentType": 0, "x": 110, "y": 110 },
  { "segmentType": 0, "x": 10, "y": 110 },
  { "segmentType": 0, "x": 10, "y": 10 }
  ];

  assert.deepEqual(result, expected1, "Offset closed square perimiter. It should keep start and end point of the result offset polyline together.");

  var polyline2 = new primitives.common.Polyline();
  polyline2.addSegment(new primitives.common.MoveSegment(20, 20));
  polyline2.addSegment(new primitives.common.LineSegment(60, 20));
  polyline2.addSegment(new primitives.common.LineSegment(60, 60));
  polyline2.addSegment(new primitives.common.LineSegment(60, 20));
  polyline2.addSegment(new primitives.common.LineSegment(120, 20));

  var offsetPolyline2 = polyline2.getOffsetPolyine(-10);

  var result2 = [];
  offsetPolyline2.loop(this, function (segment) {
    result2.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected2 = [{ "segmentType": 1, "x": 20, "y": 30 },
  { "segmentType": 0, "x": 50, "y": 30 },
  { "segmentType": 0, "x": 50, "y": 70 },
  { "segmentType": 0, "x": 70, "y": 70 },
  { "segmentType": 0, "x": 70, "y": 30 },
  { "segmentType": 0, "x": 120, "y": 30 }
  ];

  assert.deepEqual(result2, expected2, "Offset snake polyline");

  var polyline3 = new primitives.common.Polyline();
  polyline3.addSegment(new primitives.common.MoveSegment(50, 50));
  polyline3.addSegment(new primitives.common.LineSegment(100, 50));
  polyline3.addSegment(new primitives.common.LineSegment(50, 50));

  var offsetPolyline3 = polyline3.getOffsetPolyine(10);

  var result3 = [];
  offsetPolyline3.loop(this, function (segment) {
    result3.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected3 = [{ "segmentType": 1, "x": 40, "y": 40 },
  { "segmentType": 0, "x": 110, "y": 40 },
  { "segmentType": 0, "x": 110, "y": 60 },
  { "segmentType": 0, "x": 40, "y": 60 },
  { "segmentType": 0, "x": 40, "y": 40 }
  ];

  assert.deepEqual(result3, expected3, "Offset closed empty polyline");

  var polyline4 = new primitives.common.Polyline();
  polyline4.addSegment(new primitives.common.MoveSegment(80, 40));
  polyline4.addSegment(new primitives.common.LineSegment(40, 40));
  polyline4.addSegment(new primitives.common.LineSegment(40, 50));
  polyline4.addSegment(new primitives.common.LineSegment(40, 60));
  polyline4.addSegment(new primitives.common.LineSegment(80, 60));
  polyline4.addSegment(new primitives.common.LineSegment(160, 60));
  polyline4.addSegment(new primitives.common.LineSegment(160, 50));
  polyline4.addSegment(new primitives.common.LineSegment(160, 40));
  polyline4.addSegment(new primitives.common.LineSegment(80, 40));

  var offsetPolyline4 = polyline4.getOffsetPolyine(-10);

  var result4 = [];
  offsetPolyline4.loop(this, function (segment) {
    result4.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected4 = [{ "segmentType": 1, "x": 80, "y": 30 },
  { "segmentType": 0, "x": 30, "y": 30 },
  { "segmentType": 0, "x": 30, "y": 50 },
  { "segmentType": 0, "x": 30, "y": 70 },
  { "segmentType": 0, "x": 80, "y": 70 },
  { "segmentType": 0, "x": 170, "y": 70 },
  { "segmentType": 0, "x": 170, "y": 50 },
  { "segmentType": 0, "x": 170, "y": 30 },
  { "segmentType": 0, "x": 80, "y": 30 },
  ];

  assert.deepEqual(result4, expected4, "Offset polyline vertical and horizontal collinear segments");


  var polyline5 = new primitives.common.Polyline();
  polyline5.addSegment(new primitives.common.MoveSegment(60, 40));
  polyline5.addSegment(new primitives.common.LineSegment(40, 40));
  polyline5.addSegment(new primitives.common.LineSegment(40, 200));
  polyline5.addSegment(new primitives.common.LineSegment(120, 200));
  polyline5.addSegment(new primitives.common.MoveSegment(120, 160));
  polyline5.addSegment(new primitives.common.LineSegment(60, 160));
  polyline5.addSegment(new primitives.common.LineSegment(60, 60));
  polyline5.addSegment(new primitives.common.LineSegment(180, 60));
  polyline5.addSegment(new primitives.common.LineSegment(180, 160));
  polyline5.addSegment(new primitives.common.LineSegment(120, 160));
  polyline5.addSegment(new primitives.common.MoveSegment(120, 200));
  polyline5.addSegment(new primitives.common.LineSegment(200, 200));
  polyline5.addSegment(new primitives.common.LineSegment(200, 40));
  polyline5.addSegment(new primitives.common.LineSegment(60, 40));

  var offsetPolyline5 = polyline5.getOffsetPolyine(-10);

  var result5 = [];
  offsetPolyline5.loop(this, function (segment) {
    result5.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected5 = [{ "segmentType": 1, "x": 60, "y": 30 },
  { "segmentType": 0, "x": 30, "y": 30 },
  { "segmentType": 0, "x": 30, "y": 210 },
  { "segmentType": 0, "x": 120, "y": 210 },
  { "segmentType": 1, "x": 120, "y": 150 },
  { "segmentType": 0, "x": 70, "y": 150 },
  { "segmentType": 0, "x": 70, "y": 70 },
  { "segmentType": 0, "x": 170, "y": 70 },
  { "segmentType": 0, "x": 170, "y": 150 },
  { "segmentType": 0, "x": 120, "y": 150 },
  { "segmentType": 1, "x": 120, "y": 210 },
  { "segmentType": 0, "x": 210, "y": 210 },
  { "segmentType": 0, "x": 210, "y": 30 },
  { "segmentType": 0, "x": 60, "y": 30 }
  ];

  assert.deepEqual(result5, expected5, "Offset polyline having internal loop formed with move segments");

  var polyline6 = new primitives.common.Polyline();
  polyline6.addSegment(new primitives.common.MoveSegment(100, 50));
  polyline6.addSegment(new primitives.common.LineSegment(50, 100));
  polyline6.addSegment(new primitives.common.LineSegment(100, 150));
  polyline6.addSegment(new primitives.common.LineSegment(150, 100));
  polyline6.addSegment(new primitives.common.LineSegment(100, 50));

  var offsetPolyline6 = polyline6.getOffsetPolyine(Math.sqrt(2));

  var result6 = [];
  offsetPolyline6.loop(this, function (segment) {
    result6.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });
  var expected6 = [{ "segmentType": 1, "x": 100, "y": 52 },
  { "segmentType": 0, "x": 52, "y": 100 },
  { "segmentType": 0, "x": 100, "y": 148 },
  { "segmentType": 0, "x": 148, "y": 100 },
  { "segmentType": 0, "x": 100, "y": 52 }
  ];

  assert.deepEqual(result6, expected6, "Offset closed rombus perimiter");

  var polyline6 = new primitives.common.Polyline();
  polyline6.addSegment(new primitives.common.MoveSegment(100, 50));
  polyline6.addSegment(new primitives.common.QuadraticArcSegment(50, 50, 50, 100));
  polyline6.addSegment(new primitives.common.QuadraticArcSegment(50, 150, 100, 150));
  polyline6.addSegment(new primitives.common.QuadraticArcSegment(150, 150, 150, 100));
  polyline6.addSegment(new primitives.common.QuadraticArcSegment(150, 50, 100, 50));

  var offsetPolyline6 = polyline6.getOffsetPolyine(-10);

  var result6 = [];
  offsetPolyline6.loop(this, function (segment) {
    result6.push({
      segmentType: segment.segmentType,
      cpX: segment.cpX,
      cpY: segment.cpY,
      x: segment.x,
      y: segment.y
    });
  });
  var expected6 = [{ "segmentType": 1, "x": 100, "y": 40, "cpX": undefined, "cpY": undefined },
  { "segmentType": 2, "cpX": 40, "cpY": 40, "x": 40, "y": 100 },
  { "segmentType": 2, "cpX": 40, "cpY": 160, "x": 100, "y": 160 },
  { "segmentType": 2, "cpX": 160, "cpY": 160, "x": 160, "y": 100 },
  { "segmentType": 2, "cpX": 160, "cpY": 40, "x": 100, "y": 40 }
  ];

  assert.deepEqual(result6, expected6, "Offset quadratic arc segment");

  var polyline7 = new primitives.common.Polyline();
  polyline7.addSegment(new primitives.common.MoveSegment(100, 50));
  polyline7.addSegment(new primitives.common.CubicArcSegment(50, 50, 50, 150, 100, 150));
  polyline7.addSegment(new primitives.common.CubicArcSegment(150, 150, 150, 50, 100, 50));

  var offsetPolyline7 = polyline7.getOffsetPolyine(-10);

  var result7 = [];
  offsetPolyline7.loop(this, function (segment) {
    result7.push({
      segmentType: segment.segmentType,
      cpX1: segment.cpX1,
      cpY1: segment.cpY1,
      cpX2: segment.cpX2,
      cpY2: segment.cpY2,
      x: segment.x,
      y: segment.y
    });
  });
  var expected7 = [{ "segmentType": 1, "x": 100, "y": 40, "cpX1": undefined, "cpX2": undefined, "cpY1": undefined, "cpY2": undefined },
  { "segmentType": 3, "cpX1": 40, "cpY1": 40, "cpX2": 40, "cpY2": 160, "x": 100, "y": 160 },
  { "segmentType": 3, "cpX1": 160, "cpY1": 160, "cpX2": 160, "cpY2": 40, "x": 100, "y": 40 }
  ];

  assert.deepEqual(result7, expected7, "Offset cubic arc segment");
});
