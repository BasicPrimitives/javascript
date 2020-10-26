QUnit.module('Graphics - Structs - Rect');

QUnit.test("primitives.common.Rect - 2D rectangle structure defined by top left corner and size", function (assert) {

  var rect = new primitives.common.Rect(10, 20, 40, 20);

  assert.equal(rect.getProjectionPoint({x:11, y:21}), null, "Projection is not found");
  assert.ok(rect.getProjectionPoint({x:30, y:0}).equalTo({x: 30, y: 20}), "Center of the top edge.");
  assert.ok(rect.getProjectionPoint({x:60, y:30}).equalTo({x: 50, y: 30}), "Center of the right edge.");
  assert.ok(rect.getProjectionPoint({x:30, y:50}).equalTo({x: 30, y: 40}), "Center of the bottom edge.");
  assert.ok(rect.getProjectionPoint({x:0, y:30}).equalTo({x: 10, y: 30}), "Center of the left edge.");
  assert.ok(rect.getProjectionPoint({x:70, y:50}).equalTo({x: 50, y: 40}), "Bottom right corner.");
  assert.ok(rect.getProjectionPoint({x:50, y:70}).equalTo({x: 35, y: 40}), "Bottom edge point.");
});
