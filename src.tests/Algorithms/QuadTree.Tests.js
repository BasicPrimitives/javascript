QUnit.module('Algorithms - QuadTree');

QUnit.test("primitives.common.QuadTree", function (assert) {

  function findCrossedPoints(points, frame) {
    var result = [];

    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];

      if (frame.contains(point)) {
        result.push(point.context.id);
      }
    }

    return result;
  }

  function GetPlacementMarker(placement, label, color) {
    var div = jQuery("<div></div>");

    //div.append(label);
    div.css(placement.getCSS());
    div.css({
      "background": color,
      visibility: "visible",
      position: "absolute",
      font: "Areal",
      "font-size": "12px",
      "border-style": "solid",
      "border-color": "black",
      "border-width": "2px",
      opacity: 0.5
    });

    return div;
  }

  function ShowLayout(fixture, placements, points, frame, title) {
    var titlePlaceholder = jQuery("<div style='visibility:visible; position: relative; line-height: 40px; text-align: left; font: Areal; font-size: 14px; width: 640px; height:40px;'></div>");
    titlePlaceholder.append(title);
    fixture.append(titlePlaceholder);

    var offsetX = null;
    var offsetY = null;
    var space = new primitives.common.Rect();
    for (var index = 0; index < placements.length; index += 1) {
      var placement = placements[index];

      offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
      offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

      space.addRect(placement);
    }
    space.addRect(frame);
    offsetX = offsetX == null ? frame.x : Math.min(offsetX, frame.x);
    offsetY = offsetY == null ? frame.y : Math.min(offsetY, frame.y);

    //-------------------------------------------------------------------------
    var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
    placeholder.css({
      width: space.width,
      height: space.height
    });
    for (var index = 0; index < placements.length; index += 1) {
      var placement = placements[index];
      var context = placement.context;
      var placement = new primitives.common.Rect(placements[index]);
      placement.translate(-offsetX, -offsetY);

      var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "grey" : "white");
      placeholder.append(div);
    }

    //-------------------------------------------------------------------------

    var placement = new primitives.common.Rect(frame);
    placement.translate(-offsetX, -offsetY);
    var div = GetPlacementMarker(placement, index, "red");
    placeholder.append(div);

    //-------------------------------------------------------------------------

    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      var context = point.context;
      var placement = new primitives.common.Rect(point.x - 2, point.y - 2, 4, 4);
      placement.translate(-offsetX, -offsetY);

      var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "blue" : "grey");
      placeholder.append(div);
    }

    var placement = new primitives.common.Rect(frame);
    placement.translate(-offsetX, -offsetY);
    var div = GetPlacementMarker(placement, index, "red");
    placeholder.append(div);


    fixture.append(placeholder);
  }

  function getPoints(items) {
    var result = [];
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var point = new primitives.common.Point(item[0], item[1]);
      point.context = index;
      result.push(point);
    }
    return result;
  }

  function getQuadTree(points) {
    var result = primitives.common.QuadTree(2);
    for (var index = 0; index < points.length; index += 1) {
      var point = points[index];
      point.context = {
        id: index,
        isHighlighted: false
      };
      result.addPoint(point);
    }
    return result;
  }

  function TestLayout(title, items, selection, hidden) {

    console.time('getPoints');
    var points = getPoints(items);
    console.timeEnd('getPoints')

    console.time('getQuadTree');
    var quadTree = getQuadTree(points);
    console.timeEnd('getQuadTree');

    console.time('loopArea');
    var result = [];
    quadTree.loopArea(this, selection, function (point) {
      result.push(point.context.id);

      point.context.isHighlighted = true;
    });
    console.timeEnd('loopArea');

    if (!hidden) {
      ShowLayout(jQuery("#qunit-fixture"), quadTree.getPositions(selection), points, selection, title);

      jQuery("#qunit-fixture").css({
        position: "relative",
        left: "0px",
        top: "0px",
        height: "Auto"
      });
    }

    console.time('findCrossedPoints');

    var expectedResult = findCrossedPoints(points, selection);

    console.timeEnd('findCrossedPoints');

    console.time('result');
    result.sort();
    expectedResult.sort();

    assert.ok(quadTree.validate(), "Quad tree structure should pass validation");
    assert.deepEqual(result, expectedResult, title);

    console.timeEnd('result');

    console.log("found = " + result.length);
  };

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 10) {
      testData.push([x, x]);
    }

    TestLayout("NW to SE diagonal points test", testData, new primitives.common.Rect(600, 600, 40, 40), false);
  })();

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 10) {
      testData.push([x, 1000 - x]);
    }

    TestLayout("SW to NE diagonal points test", testData, new primitives.common.Rect(690, 250, 40, 40), false);
  })();

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 10) {
      testData.push([x, 512]);
    }

    TestLayout("W to E horizontal points test", testData, new primitives.common.Rect(690, 500, 40, 40), false);
  })();

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 10) {
      for (var y = 0; y < 1000; y += 10) {
        testData.push([x, y]);
      }
    }

    TestLayout("10K Matrix performance test", testData, new primitives.common.Rect(690, 500, 140, 140), true);
  })();
});
