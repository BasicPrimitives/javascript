import Point from './Point';
import { SegmentType } from '../../enums';

export default function MoveSegment() {
  this.parent = Point.prototype;
  this.parent.constructor.apply(this, arguments);
  this.segmentType = SegmentType.Move;
};

MoveSegment.prototype = new Point();

MoveSegment.prototype.clone = function () {
  return new MoveSegment(this);
};

MoveSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.x, this.y, 0);
  }
};

MoveSegment.prototype.setPoint = function (point, index) {
  this.x = point.x;
  this.y = point.y;
};

MoveSegment.prototype.getEndPoint = function () {
  return this;
};

MoveSegment.prototype.invert = function (endPoint) {
  this.x = endPoint.x;
  this.y = endPoint.y;
};

MoveSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transformPoint(self.x, self.y, forward, self, function (x, y) {
    self.x = x;
    self.y = y;
  });//ignore jslint
};
