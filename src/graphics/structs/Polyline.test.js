import Polyline from './Polyline';
import MoveSegment from './MoveSegment';
import LineSegment from './LineSegment';
import QuadraticArcSegment from './QuadraticArcSegment';
import CubicArcSegment from './CubicArcSegment';

test('loop - Loop polyline segments function test', () => {
  var polyline = new Polyline();
  polyline.addSegment(new MoveSegment(20, 20));
  polyline.addSegment(new LineSegment(100, 20));
  polyline.addSegment(new LineSegment(100, 100));
  polyline.addSegment(new LineSegment(20, 100));
  polyline.addSegment(new LineSegment(20, 20));

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

  expect(result).toEqual(expected1);
});

test('loopReversed - Loop in reversed order polyline segments function test', () => {
  var polyline = new Polyline();
  polyline.addSegment(new MoveSegment(20, 20));
  polyline.addSegment(new LineSegment(100, 20));
  polyline.addSegment(new LineSegment(100, 100));
  polyline.addSegment(new LineSegment(20, 100));
  polyline.addSegment(new LineSegment(20, 20));

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

  expect(result).toEqual(expected2);
});

test('optimizeMoveSegments - Optimize polyline move segments function test', () => {
  var polyline2 = new Polyline();
  polyline2.addSegment(new MoveSegment(200, 200));
  polyline2.addSegment(new LineSegment(1000, 200));
  polyline2.addSegment(new MoveSegment(1000, 200)); // this segment is redundant
  polyline2.addSegment(new LineSegment(1000, 1000));

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

  expect(result).toEqual(expected3);
});

test('mergeTo - Merge one polyline segments into another function test', () => {
  var polyline = new Polyline();
  polyline.addSegment(new MoveSegment(20, 20));
  polyline.addSegment(new LineSegment(100, 20));
  polyline.addSegment(new LineSegment(100, 100));
  polyline.addSegment(new LineSegment(20, 100));
  polyline.addSegment(new LineSegment(20, 20));

  var polyline2 = new Polyline();
  polyline2.addSegment(new MoveSegment(200, 200));
  polyline2.addSegment(new LineSegment(1000, 200));
  polyline2.addSegment(new MoveSegment(1000, 200)); // this segment is redundant
  polyline2.addSegment(new LineSegment(1000, 1000));

  polyline2.optimizeMoveSegments();

  polyline2.mergeTo(polyline);

  var result = [];
  polyline.loop(this, function (segment) {
    result.push({
      segmentType: segment.segmentType,
      x: segment.x,
      y: segment.y
    });
  });

  var expected4 = [{ "segmentType": 1, "x": 20, "y": 20 },
    { "segmentType": 0, "x": 100, "y": 20 },
    { "segmentType": 0, "x": 100, "y": 100 },
    { "segmentType": 0, "x": 20, "y": 100 },
    { "segmentType": 0, "x": 20, "y": 20 },
    { "segmentType": 1, "x": 200, "y": 200 },
    { "segmentType": 0, "x": 1000, "y": 200 },
    { "segmentType": 0, "x": 1000, "y": 1000 }
  ];

  expect(result).toEqual(expected4);
  expect(polyline.length()).toBe(expected4.length);
});

test('addInverted - Add inverted polyline segments function test', () => {
  var polyline3 = new Polyline();
  polyline3.addSegment(new MoveSegment(20, 20));
  polyline3.addSegment(new LineSegment(100, 20));

  var polyline4 = new Polyline();
  polyline3.addSegment(new MoveSegment(20, 20));
  polyline3.addSegment(new LineSegment(20, 100));

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

  expect(result4).toEqual(expected4);
});

test('getOffsetPolyine - Offset closed square perimeter. It should keep start and end point of the result offset polyline together', () => {
  var polyline = new Polyline();
  polyline.addSegment(new MoveSegment(20, 20));
  polyline.addSegment(new LineSegment(100, 20));
  polyline.addSegment(new LineSegment(100, 100));
  polyline.addSegment(new LineSegment(20, 100));
  polyline.addSegment(new LineSegment(20, 20));

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

  expect(result).toEqual(expected1);
});

test('getOffsetPolyine - Offset snake polyline', () => {
  var polyline2 = new Polyline();
  polyline2.addSegment(new MoveSegment(20, 20));
  polyline2.addSegment(new LineSegment(60, 20));
  polyline2.addSegment(new LineSegment(60, 60));
  polyline2.addSegment(new LineSegment(60, 20));
  polyline2.addSegment(new LineSegment(120, 20));

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

  expect(result2).toEqual(expected2);
});

test('getOffsetPolyine - Offset closed empty polyline', () => {
  var polyline3 = new Polyline();
  polyline3.addSegment(new MoveSegment(50, 50));
  polyline3.addSegment(new LineSegment(100, 50));
  polyline3.addSegment(new LineSegment(50, 50));

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

  expect(result3).toEqual(expected3);
});

test('getOffsetPolyine - Offset polyline vertical and horizontal collinear segments', () => {
  var polyline4 = new Polyline();
  polyline4.addSegment(new MoveSegment(80, 40));
  polyline4.addSegment(new LineSegment(40, 40));
  polyline4.addSegment(new LineSegment(40, 50));
  polyline4.addSegment(new LineSegment(40, 60));
  polyline4.addSegment(new LineSegment(80, 60));
  polyline4.addSegment(new LineSegment(160, 60));
  polyline4.addSegment(new LineSegment(160, 50));
  polyline4.addSegment(new LineSegment(160, 40));
  polyline4.addSegment(new LineSegment(80, 40));

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

  expect(result4).toEqual(expected4);
});

test('getOffsetPolyine - Offset polyline having internal loop formed with move segments', () => {
  var polyline5 = new Polyline();
  polyline5.addSegment(new MoveSegment(60, 40));
  polyline5.addSegment(new LineSegment(40, 40));
  polyline5.addSegment(new LineSegment(40, 200));
  polyline5.addSegment(new LineSegment(120, 200));
  polyline5.addSegment(new MoveSegment(120, 160));
  polyline5.addSegment(new LineSegment(60, 160));
  polyline5.addSegment(new LineSegment(60, 60));
  polyline5.addSegment(new LineSegment(180, 60));
  polyline5.addSegment(new LineSegment(180, 160));
  polyline5.addSegment(new LineSegment(120, 160));
  polyline5.addSegment(new MoveSegment(120, 200));
  polyline5.addSegment(new LineSegment(200, 200));
  polyline5.addSegment(new LineSegment(200, 40));
  polyline5.addSegment(new LineSegment(60, 40));

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

  expect(result5).toEqual(expected5);
});

test('getOffsetPolyine - Offset closed rombus perimeter', () => {
  var polyline6 = new Polyline();
  polyline6.addSegment(new MoveSegment(100, 50));
  polyline6.addSegment(new LineSegment(50, 100));
  polyline6.addSegment(new LineSegment(100, 150));
  polyline6.addSegment(new LineSegment(150, 100));
  polyline6.addSegment(new LineSegment(100, 50));

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

  expect(result6).toEqual(expected6);
});

test('getOffsetPolyine - Offset quadratic arc segment', () => {
  var polyline6 = new Polyline();
  polyline6.addSegment(new MoveSegment(100, 50));
  polyline6.addSegment(new QuadraticArcSegment(50, 50, 50, 100));
  polyline6.addSegment(new QuadraticArcSegment(50, 150, 100, 150));
  polyline6.addSegment(new QuadraticArcSegment(150, 150, 150, 100));
  polyline6.addSegment(new QuadraticArcSegment(150, 50, 100, 50));

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

  expect(result6).toEqual(expected6);
});

test('getOffsetPolyine - Offset cubic arc segment', () => {
  var polyline7 = new Polyline();
  polyline7.addSegment(new MoveSegment(100, 50));
  polyline7.addSegment(new CubicArcSegment(50, 50, 50, 150, 100, 150));
  polyline7.addSegment(new CubicArcSegment(150, 150, 150, 50, 100, 50));

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


  expect(result7).toEqual(expected7);
});
