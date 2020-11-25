QUnit.module('Graphics - Structs - Size');

QUnit.test("primitives.common.Size - 2D size structure defined by width and height", function (assert) {

  var size = new primitives.common.Size(10, 20);

  assert.equal(size.space(), 200, "Square size");
  assert.deepEqual(size.getCSS(), {"width": "10px", "height": "20px"}, "Size conversion to width and height CSS properties");

  var size1 = new primitives.common.Size(10, 40);
  var size2 = new primitives.common.Size(50, 30);

  size1.maxSize(size2);

  assert.ok(size1.width == 50 && size1.height == 40, "Maximum size");

  size1 = new primitives.common.Size(10, 40);
  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  size1.addThickness(thickness);

  assert.ok(size1.width == 14 && size1.height == 46, "Added padding");

  size1 = new primitives.common.Size(10, 40);
  thickness = new primitives.common.Thickness(1, 2, 3, 4);
  size1.removeThickness(thickness);

  assert.ok(size1.width == 6 && size1.height == 34, "Removed padding");
});
