QUnit.module('Algorithms - SpatialIndex');

QUnit.test("primitives.common.SpatialIndex", function (assert) {
  function findCrossedRectangles(placements, frame) {
    var result = [];

    for (var index = 0; index < placements.length; index += 1) {
      var placement = placements[index];

      if (placement.overlaps(frame)) {
        result.push(placement.context.id);
      }
    }

    return result;
  }

  function GetPlacementMarker(placement, label, color) {
    var div = jQuery("<div></div>");

    div.append(label);
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
      opacity: 0.6
    });

    return div;
  }

  function ShowLayout(fixture, placements, frame, title) {
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

      var div = GetPlacementMarker(placement, context.id, context.isHighlighted ? "blue" : "grey");
      placeholder.append(div);
    }

    var placement = new primitives.common.Rect(frame);
    placement.translate(-offsetX, -offsetY);
    var div = GetPlacementMarker(placement, index, "red");
    placeholder.append(div);

    fixture.append(placeholder);
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

  function getSpatialIndex(sizes, rectangles) {
    var result = primitives.common.SpatialIndex(sizes);
    for (var index = 0; index < rectangles.length; index += 1) {
      var rect = rectangles[index];
      rect.context = {
        id: index,
        isHighlighted: false
      };
      result.addRect(rect);
    }
    return result;
  }

  function getSizes(items) {
    var result = [];
    var hash = {};
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var size = Math.max(item.width, item.height);
      if (!hash.hasOwnProperty(size)) {
        hash[size] = true;
        result.push(size);
      }
    }
    return result;
  }

  function TestLayout(title, items, selection, hidden) {

    console.time('getRectangles');
    var placements = getRectangles(items);
    console.timeEnd('getRectangles')

    console.time('getSpatialIndex');
    var spatialIndex = getSpatialIndex(getSizes(placements), placements);
    console.timeEnd('getSpatialIndex');

    console.time('loopArea');

    var result = [];
    spatialIndex.loopArea(this, selection, function (rect) {
      result.push(rect.context.id);

      rect.context.isHighlighted = true;
    });

    console.timeEnd('loopArea');

    if (!hidden) {
      ShowLayout(jQuery("#qunit-fixture"), placements, selection, title);

      //ShowLayout(jQuery("#qunit-fixture"), spatialIndex.getPositions(selection), selection, title);

      jQuery("#qunit-fixture").css({
        position: "relative",
        left: "0px",
        top: "0px",
        height: "Auto"
      });



    }

    console.time('findCrossedRectangles');

    var expectedResult = findCrossedRectangles(placements, selection);

    console.timeEnd('findCrossedRectangles');

    console.time('sort');
    result.sort();
    expectedResult.sort();

    assert.ok(spatialIndex.validate(), "Spatial index should pass validation");
    assert.deepEqual(result, expectedResult, title);

    console.timeEnd('sort');
  };

  TestLayout("Spatial Index should bounding rectangle", [
    [0, 0, 100, 100]
  ], new primitives.common.Rect(10, 10, 80, 80));

  TestLayout("Spatial Index should bounded rectangle", [
    [10, 10, 80, 80]
  ], new primitives.common.Rect(0, 0, 100, 100));

  TestLayout("Spatial Index should touched rectangle", [
    [0, 0, 40, 40]
  ], new primitives.common.Rect(40, 0, 40, 40));

  TestLayout("Spatial Index should not return non overlapping rectangle", [
    [0, 0, 40, 40]
  ], new primitives.common.Rect(45, 0, 40, 40));

  TestLayout("Multi-layer test case", [
    [0, 0, 40, 280],
    [60, 0, 100, 100],
    [180, 0, 40, 40],
    [180, 60, 40, 40],
    [240, 0, 40, 40],
    [300, 0, 40, 40],
    [240, 60, 40, 40],
    [300, 60, 40, 100],
    [360, 0, 100, 100],
    [480, 0, 40, 40],
    [540, 0, 40, 40],
    [600, 0, 80, 100],
    [480, 60, 40, 140],
    [540, 140, 60, 60],
    [620, 140, 60, 60],
    [60, 120, 160, 160],
    [240, 180, 60, 60],
    [320, 180, 60, 60],
    [400, 180, 60, 60],
    [620, 220, 20, 20],
    [660, 220, 20, 20],
    [240, 260, 20, 20],
    [280, 260, 340, 20],
    [640, 260, 40, 20]
  ], new primitives.common.Rect(100, 80, 220, 100));

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 50) {
      for (var y = 0; y < 1000; y += 50) {
        testData.push([x, y, 40, 40]);
      }
    }

    TestLayout("Matrix nesting test", testData, new primitives.common.Rect(710, 210, 200, 700));
  })();

  (function () {
    var testData = [];
    for (var x = 0; x < 1000; x += 10) {
      for (var y = 0; y < 1000; y += 10) {
        testData.push([x, y, 2, 2]);
      }
    }

    TestLayout("Matrix performance test", testData, new primitives.common.Rect(710, 210, 20, 70), true);
  })();
});