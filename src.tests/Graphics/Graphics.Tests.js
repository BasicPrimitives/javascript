QUnit.module('Graphics - test basic graphics.');

QUnit.test("primitives.common.Graphics", function (assert) {
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

  function getPolyline(points) {
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: "#000000",
      lineWidth: "2",
      fillColor: "#faebd7",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var segmentType = point[0];
      var x = point[1];
      var y = point[2];
      var cpX = point[3];
      var cpY = point[4];
      switch (segmentType) {
        case "M":
          polyline.addSegment(new primitives.common.MoveSegment(x, y));
          break;
        case "L":
          polyline.addSegment(new primitives.common.LineSegment(x, y));
          break;
        case "Q":
          polyline.addSegment(new primitives.common.QuadraticArcSegment(x, y, cpX, cpY));
          break;

      }
    }
    return polyline;
  }

  function getSize(points) {
    var result = new primitives.common.Size(0, 0);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var x = point[1];
      var y = point[2];
      result.width = Math.max(result.width, x);
      result.height = Math.max(result.height, y);
    }
    return result;
  }

  function TestLayout(title, points) {
    var polyline = getPolyline(points);
    var size = getSize(points);
    ShowLayout(jQuery("#qunit-fixture"), polyline, size.width, size.height, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Draw polyline", [
    ["M", 0, 0], ["L", 200, 100]
  ]);

  TestLayout("Draw shape", [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 100], ["L", 0, 100], ["L", 0, 0]
  ]);

  TestLayout("Draw shape having island", [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 200], ["L", 0, 200], ["L", 0, 0],
    ["M", 50, 50], ["L", 50, 150], ["L", 150, 150], ["L", 150, 50], ["L", 50, 50]
  ]);
});