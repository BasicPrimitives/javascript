import Vector from './Vector';
import Point from './Point';
import { VectorRelationType } from '../../enums';

test('Vector - Distance between two points', () => {
  var p1 = new Point(1, 1),
    p2 = new Point(9, 7);
  expect(p1.distanceTo(p2)).toBe(10);
});

test('Vector - Vectors are colinear', () => {
  var v1 = new Vector({ x: 1, y: 1 }, { x: 5, y: 5 });
  var v2 = new Vector({ x: 7, y: 7 }, { x: 12, y: 12 });
  expect(v1.relateTo(v2)).toBe(VectorRelationType.Collinear);
});

test('Vector - Vectors are opposite', () => {
  var v1 = new Vector({ x: 1, y: 1 }, { x: 5, y: 5 });
  var v3 = new Vector({ x: 12, y: 12 }, { x: 7, y: 7 });
  expect(v1.relateTo(v3)).toBe(VectorRelationType.Opposite);
});

test('Vector - Vectors have intersection', () => {
  var v1 = new Vector({ x: 1, y: 1 }, { x: 5, y: 5 });
  var v4 = new Vector({ x: 12, y: 12 }, { x: 1, y: 12 });
  expect(v1.relateTo(v4)).toBe(VectorRelationType.None);
});

test('Vector - Vectors have intersection 2', () => {
  var v5 = new Vector({ x: 5, y: 5 }, { x: 5, y: 20 });
  var v6 = new Vector({ x: 7, y: 7 }, { x: 20, y: 7 });
  expect(v5.relateTo(v6)).toBe(VectorRelationType.None);
});

test('Vector - One of the vectors is null', () => {
  var v6 = new Vector({ x: 7, y: 7 }, { x: 20, y: 7 });
  var v7 = new Vector({ x: 7, y: 7 }, { x: 7, y: 7 });
  expect(v6.relateTo(v7)).toBe(VectorRelationType.Null);
});

test('Vector - Vertical vector offset to the right', () => {
  var v8 = new Vector(new Point({ x: 10, y: 10 }), new Point({ x: 10, y: 100 }));
  var v9 = new Vector(new Point({ x: 20, y: 10 }), new Point({ x: 20, y: 100 }));
  v8.offset(10);
  expect(v8.equalTo(v9)).toBe(true);
});

test('Vector - Horizontal vector offset to the left', () => {
  var v10 = new Vector(new Point({ x: 10, y: 10 }), new Point({ x: 200, y: 10 }));
  var v11 = new Vector(new Point({ x: 10, y: 40 }), new Point({ x: 200, y: 40 }));
  v10.offset(-30);
  expect(v10.equalTo(v11)).toBe(true);
});

test('Vector - Diagonal vector offset to the left', () => {
  var v12 = new Vector(new Point({ x: 100, y: 100 }), new Point({ x: 50, y: 50 }));
  var v13 = new Vector(new Point({ x: 99, y: 101 }), new Point({ x: 49, y: 51 }));
  v12.offset(Math.sqrt(2));
  expect(v12.equalTo(v13)).toBe(true);
});

test('Vector - Diagonal vector offset to the left 2', () => {
  var v12 = new Vector(new Point({ x: 100, y: 100 }), new Point({ x: 50, y: 50 }));
  var v14 = new Vector(new Point({ x: 101, y: 99 }), new Point({ x: 51, y: 49 }));
  v12.offset(-1 * Math.sqrt(2));
  expect(v12).toEqual(v14);
  expect(v12.equalTo(v14)).toBe(true);
});

