QUnit.module('Graphics.Shapes.MergedRectangles - Render Merged rectangles.');

QUnit.test("primitives.common.MergedRectangles", function (assert) {
  function ShowLayout(fixture, rects, size, title) {
    jQuery(document).ready(function () {
      var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
      titlePlaceholder.append(title);
      fixture.append(titlePlaceholder);

      var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
      graphicsDiv.css({
        width: size.width,
        height: size.height
      });

      var placeholder = jQuery("<div class='placeholder'></div>");
      placeholder.css({
        width: size.width,
        height: size.height
      });
      graphicsDiv.append(placeholder);

      fixture.append(graphicsDiv);

      var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
      graphics.begin();
      graphics.resize("placeholder", size.width, size.height);
      graphics.activate("placeholder");

      var transform = new primitives.common.Transform();
      transform.setOrientation(primitives.common.OrientationType.Top);
      transform.size = new primitives.common.Size(size);


      var mergedRectangles = new primitives.common.MergedRectangles(graphics);
      mergedRectangles.lineWidth = 2;
      mergedRectangles.opacity = 1;
      mergedRectangles.fillColor = "#faebd7";
      mergedRectangles.lineType = primitives.common.LineType.Solid;
      mergedRectangles.borderColor = "#000000";
      mergedRectangles.transform = transform;
      mergedRectangles.draw(rects);

      graphics.end();
    });
  }

  function getSize(rects) {
    var result = new primitives.common.Rect(0, 0, 0, 0);
    for (var index = 0; index < rects.length; index += 1) {
      var rect = rects[index];
      result.addRect(rect);
    }
    return result;
  }

  function getRectangles(items) {
    var result = [];
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var rect = new primitives.common.Rect(item[0], item[1], item[2], item[3]);
      rect.context = index;
      result.push(rect);
    }
    return result;
  }

  function TestLayout(title, items) {
    var rects = getRectangles(items);
    var size = getSize(rects);

    ShowLayout(jQuery("#qunit-fixture"), rects, size, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Merge 5 rectangles", [
    [0, 0, 100, 100],
    [150, 0, 100, 100],
    [0, 150, 100, 100],
    [150, 150, 100, 100],
    [50, 50, 150, 150]
  ]);

  TestLayout("Window", [
    [100, 0, 150, 150],
    [100, 200, 150, 150],
    [0, 100, 150, 150],
    [200, 100, 150, 150]
  ]);

  TestLayout("Window 2", [
    [0, 0, 150, 50],
    [0, 50, 50, 50],
    [100, 50, 50, 50],
    [0, 100, 150, 50],
    [0, 150, 50, 50],
    [100, 150, 50, 50],
    [0, 200, 150, 50]
  ]);
});