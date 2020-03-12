QUnit.module('Graphics - Structs - Vector');

QUnit.test("primitives.common.Vector - 2D vector defined with 2 2D points", function (assert) {

  var p1 = new primitives.common.Point(1, 1),
    p2 = new primitives.common.Point(9, 7),

    v1 = new primitives.common.Vector({ x: 1, y: 1 }, { x: 5, y: 5 }),
    v2 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 12, y: 12 }),
    v3 = new primitives.common.Vector({ x: 12, y: 12 }, { x: 7, y: 7 }),
    v4 = new primitives.common.Vector({ x: 12, y: 12 }, { x: 1, y: 12 }),
    v5 = new primitives.common.Vector({ x: 5, y: 5 }, { x: 5, y: 20 }),
    v6 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 20, y: 7 }),
    v7 = new primitives.common.Vector({ x: 7, y: 7 }, { x: 7, y: 7 }),

    v8 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 10 }), new primitives.common.Point({ x: 10, y: 100 })),
    v9 = new primitives.common.Vector(new primitives.common.Point({ x: 20, y: 10 }), new primitives.common.Point({ x: 20, y: 100 })),

    v10 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 10 }), new primitives.common.Point({ x: 200, y: 10 })),
    v11 = new primitives.common.Vector(new primitives.common.Point({ x: 10, y: 40 }), new primitives.common.Point({ x: 200, y: 40 })),

    v12 = new primitives.common.Vector(new primitives.common.Point({ x: 100, y: 100 }), new primitives.common.Point({ x: 50, y: 50 })),
    v13 = new primitives.common.Vector(new primitives.common.Point({ x: 99, y: 101 }), new primitives.common.Point({ x: 49, y: 51 })),
    v14 = new primitives.common.Vector(new primitives.common.Point({ x: 101, y: 99 }), new primitives.common.Point({ x: 51, y: 49 }));

  assert.equal(p1.distanceTo(p2), 10, "Distance between two points.");

  assert.equal(v1.relateTo(v2), primitives.common.VectorRelationType.Collinear, "Vectors are colinear.");
  assert.equal(v1.relateTo(v3), primitives.common.VectorRelationType.Opposite, "Vectors are opposite.");
  assert.equal(v1.relateTo(v4), primitives.common.VectorRelationType.None, "Vectors have intersection.");
  assert.equal(v5.relateTo(v6), primitives.common.VectorRelationType.None, "Vectors have intersection.");
  assert.equal(v6.relateTo(v7), primitives.common.VectorRelationType.Null, "One of the vectors is null.");

  v8.offset(10);
  assert.ok(v8.equalTo(v9), "Vertical vector offset to the right.");

  v10.offset(-30);
  assert.ok(v10.equalTo(v11), "Horizontal vector offset to the left.");

  v12.offset(Math.sqrt(2));
  assert.ok(v12.equalTo(v13), "Diagonal vector offset to the left. From (" + v12.from.x + ", " + v12.from.y + "), To (" + v12.to.x + ", " + v12.to.y + ")");

  v12.offset(-2 * Math.sqrt(2));
  assert.ok(v12.equalTo(v14), "Diagonal vector offset to the left. From (" + v12.from.x + ", " + v12.from.y + "), To (" + v12.to.x + ", " + v12.to.y + ")");
});
