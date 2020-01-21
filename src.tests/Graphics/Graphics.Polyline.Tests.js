QUnit.module('Graphics - offset polyline.');

QUnit.test("primitives.common.Graphics.polyline", function (assert) {
  function ShowLayout(fixture, width, height, title, onDraw) {
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
    onDraw(graphics);
    graphics.end();
  }

  function getPolyline(points, color) {
    var paletteItem = new primitives.common.PaletteItem({
      lineColor: color,
      lineWidth: "2",
      lineType: primitives.common.LineType.Solid,
      opacity: 1
    });

    var polyline = new primitives.common.Polyline(paletteItem);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var segmentType = point[0];
      switch (segmentType) {
        case "M": {
          var x = point[1];
          var y = point[2];
          polyline.addSegment(new primitives.common.MoveSegment(x, y));
        }
          break;
        case "L": {
          var x = point[1];
          var y = point[2];
          polyline.addSegment(new primitives.common.LineSegment(x, y));
        }
          break;
        case "Q": {
          var cpX = point[1];
          var cpY = point[2];
          var x = point[3];
          var y = point[4];
          polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
        }
          break;
        case "C": {
          var cpX = point[1];
          var cpY = point[2];
          var cpX2 = point[3];
          var cpY2 = point[4];
          var x = point[5];
          var y = point[6];
          polyline.addSegment(new primitives.common.CubicArcSegment(cpX, cpY, cpX2, cpY2, x, y));
        }
          break;
      }
    }
    return polyline;
  }

  function TestLayout(title, points) {
    var polyline = getPolyline(points, "#000000");
    var offsetPolylinePlus = polyline.getOffsetPolyine(20);
    var offsetPolylineMinus = polyline.getOffsetPolyine(-20);
    ShowLayout(jQuery("#qunit-fixture"), 800, 200, title, function (graphics) {
      graphics.polyline(polyline);
      offsetPolylinePlus.paletteItem.lineColor = "red";
      graphics.polyline(offsetPolylinePlus);
      offsetPolylineMinus.paletteItem.lineColor = "green";
      graphics.polyline(offsetPolylineMinus);
    });

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    assert.ok(true, title);
  };

  TestLayout("Offset cubic segment", [
    ["M", 50, 100], ["C", 50, 50, 150, 50, 150, 150]
  ]);

  TestLayout("Offset quadratic segment", [
    ["M", 50, 150], ["Q", 500, 125, 350, 200]
  ]);

  TestLayout("Offset quadratic segments", [
    ["M", 100, 50], ["Q", 150, 50, 150, 100], ["Q", 150, 150, 100, 150], ["Q", 50, 150, 50, 100], ["L", 100, 50]
  ]);

  TestLayout("Simple vertical segment", [
    ["M", 100, 50], ["L", 100, 150]
  ]);

  TestLayout("Offset square angle", [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150]
  ]);

  TestLayout("Offset square", [
    ["M", 50, 50], ["L", 150, 50], ["L", 150, 150], ["L", 50, 150], ["L", 50, 50]
  ]);

  TestLayout("Offset rhombus", [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150], ["L", 50, 100], ["L", 100, 50]
  ]);

});