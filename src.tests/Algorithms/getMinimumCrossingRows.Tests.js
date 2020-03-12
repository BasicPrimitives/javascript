QUnit.module('Algorithms - Get minimum set of rows crossing all rectangles. This structure is needed for keyboard arrow keys navigation across random set of rectangles.');

function countPlacementsCrossings(placements, rows) {
  var result = 0;

  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];

    for (var index2 = 0; index2 < rows.length; index2 += 1) {
      var row = rows[index2];
      if (placement.y <= row && placement.bottom() >= row) {
        result += 1;
        break;
      }
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
    "border-width": "2px"
  });

  return div;
}

function ShowLayout(fixture, placements, rows, title) {
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

  var placeholder = jQuery("<div style='visibility:visible; position: relative; font: Areal; font-size: 12px;'></div>");
  placeholder.css({
    width: space.width,
    height: space.height
  });
  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];
    var label = placement.context;
    var placement = new primitives.common.Rect(placements[index]);
    placement.translate(-offsetX, -offsetY);

    var div = GetPlacementMarker(placement, label, "grey");
    placeholder.append(div);
  }

  for (var index = 0; index < rows.length; index += 1) {
    var row = rows[index];
    var placement = new primitives.common.Rect(0, row, space.width, 1);
    placement.translate(-offsetX, -offsetY);

    var div = GetPlacementMarker(placement, index, "red");
    placeholder.append(div);
  }

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

QUnit.test("primitives.common.getMinimumCrossingRows", function (assert) {
  function TestLayout(title, items) {
    var placements = getRectangles(items);
    var rows = [];
    primitives.common.getMinimumCrossingRows(this, placements, function (row) {
      rows.push(row);
    });

    ShowLayout(jQuery("#qunit-fixture"), placements, rows, title);

    jQuery("#qunit-fixture").css({
      position: "relative",
      left: "0px",
      top: "0px",
      height: "Auto"
    });

    var result = countPlacementsCrossings(placements, rows);

    assert.equal(result, placements.length, title);
  };

  TestLayout("Basic test case", [
    [0, 0, 200, 50],
    [300, 30, 200, 50],
    [600, 45, 200, 50],
    [10, 55, 200, 50],
    [310, 90, 200, 50]
  ]);

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
  ]);

  TestLayout("Nested block test case", [
    [220, 0, 120, 80],
    [0, 100, 120, 80],
    [0, 200, 120, 80],
    [400, 100, 120, 80],
    [400, 200, 120, 80],
    [160, 100, 40, 40],
    [220, 100, 40, 40],
    [280, 100, 40, 40],
    [340, 100, 40, 40],
    [160, 160, 40, 40],
    [220, 160, 40, 40],
    [280, 160, 40, 40],
    [340, 160, 40, 40],
    [160, 220, 40, 40],
    [220, 220, 40, 40],
    [280, 220, 40, 40],
    [340, 220, 40, 40]
  ]);
});