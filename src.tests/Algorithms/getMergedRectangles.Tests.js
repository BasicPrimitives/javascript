QUnit.module('Algorithms - Get merged rectangles. This method merges multiple rectangles into a single polyline object.');

QUnit.test("primitives.common.getMergedRectangles", function (assert) {
  function ShowLayout(fixture, polyline, width, height, title) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var graphicsDiv = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    graphicsDiv.css({
      width: width,
      height: height
    });

    var placeholder = jQuery("<div class='placeholder'></div>");
    placeholder.css({
      width: width,
      height: height
    });
    graphicsDiv.append(placeholder);

    fixture.append(graphicsDiv);

    var graphics = primitives.common.createGraphics(primitives.common.GraphicsType.SVG, placeholder[0]);
    graphics.begin();
    graphics.resize("placeholder", width, height);
    graphics.activate("placeholder");
    graphics.polyline(polyline);
    graphics.end();
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
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: "#000000",
      lineWidth: "2",
      fillColor: "#faebd7",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    primitives.common.getMergedRectangles(this, rects, function (points) {
      for (var index = 0, len = points.length; index < len; index += 1) {
        var point = points[index];
        if (index == 0) {
          polyline.addSegment(new primitives.common.MoveSegment(point.x, point.y));
        } else {
          polyline.addSegment(new primitives.common.LineSegment(point.x, point.y));
        }
      }
    });

    var size = getSize(rects);

    ShowLayout(jQuery("#qunit-fixture"), polyline, size.width, size.height, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Merge single rectangle", [
    [0, 0, 100, 100]
  ]);

  TestLayout("Merge two disconnected rectangles", [
    [0, 0, 80, 80],
    [100, 0, 80, 80]
  ]);

  TestLayout("Merge two aligned disconnected rectangles", [
    [0, 0, 80, 80],
    [80, 100, 80, 80]
  ]);

  TestLayout("Merge two aligned disconnected rectangles", [
    [0, 100, 80, 80],
    [80, 0, 80, 80]
  ]);

  TestLayout("Merge two overlapping rectangles", [
    [0, 0, 100, 100],
    [50, 50, 100, 100]
  ]);

  TestLayout("Merge two overlapping rectangles", [
    [0, 50, 100, 100],
    [50, 0, 100, 100]
  ]);

  TestLayout("Merge E shape rectangles", [
    [0, 0, 50, 350],
    [50, 0, 50, 50],
    [50, 100, 50, 50],
    [50, 200, 50, 50],
    [50, 300, 50, 50]
  ]);

  TestLayout("Merge E shape rectangles", [
    [50, 0, 50, 350],
    [0, 0, 50, 50],
    [0, 100, 50, 50],
    [0, 200, 50, 50],
    [0, 300, 50, 50]
  ]);


  TestLayout("Merge 5 rectangles 2", [
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

  TestLayout("Dumbbell", [
    [0, 0, 60, 60],
    [80, 0, 60, 60],
    [50, 20, 40, 20]
  ]);
});