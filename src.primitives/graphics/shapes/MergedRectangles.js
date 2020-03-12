primitives.common.MergedRectangles = function (graphics) {
  this.graphics = graphics;
  this.transform = null;

  this.lineWidth = 1;
  this.opacity = 1;
  this.fillColor = null;
  this.lineType = primitives.common.LineType.Solid;
  this.borderColor = null;
};

primitives.common.MergedRectangles.prototype = new primitives.common.BaseShape();

primitives.common.MergedRectangles.prototype.draw = function (rects) {
  var paletteItem = new primitives.common.PaletteItem({
    lineColor: this.borderColor,
    lineWidth: this.lineWidth,
    fillColor: this.fillColor,
    lineType: this.lineType,
    opacity: this.opacity
  }),
    polyline = new primitives.common.Polyline(paletteItem),
    offset = this.lineWidth / 2;

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

  polyline.transform(this.transform, true);

  this.graphics.polyline(polyline);
};