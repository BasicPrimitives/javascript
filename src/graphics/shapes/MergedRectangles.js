import BaseShape from './BaseShape';
import Polyline from '../structs/Polyline';
import PaletteItem from '../structs/PaletteItem';
import MoveSegment from '../structs/MoveSegment';
import LineSegment from '../structs/LineSegment';
import { LineType } from '../../enums';
import getMergedRectangles from '../../algorithms/getMergedRectangles';

export default function MergedRectangles(graphics) {
  this.graphics = graphics;
  this.transform = null;

  this.lineWidth = 1;
  this.opacity = 1;
  this.fillColor = null;
  this.lineType = LineType.Solid;
  this.borderColor = null;
};

MergedRectangles.prototype = new BaseShape();

MergedRectangles.prototype.draw = function (rects) {
  var paletteItem = new PaletteItem({
    lineColor: this.borderColor,
    lineWidth: this.lineWidth,
    fillColor: this.fillColor,
    lineType: this.lineType,
    opacity: this.opacity
  }),
    polyline = new Polyline(paletteItem);

  getMergedRectangles(this, rects, function (points) {
    for (var index = 0, len = points.length; index < len; index += 1) {
      var point = points[index];
      if (index == 0) {
        polyline.addSegment(new MoveSegment(point.x, point.y));
      } else {
        polyline.addSegment(new LineSegment(point.x, point.y));
      }
    }
  });

  polyline.transform(this.transform, true);

  this.graphics.polyline(polyline);
};