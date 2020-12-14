import Point from './Point';
import MoveSegment from './MoveSegment';
import { SegmentType } from '../../enums';

export default function LineSegment() {
  this.parent = MoveSegment.prototype;
  this.parent.constructor.apply(this, arguments);

  this.segmentType = SegmentType.Line;
};

LineSegment.prototype = new MoveSegment();

LineSegment.prototype.clone = function () {
  return new LineSegment(this);
};

LineSegment.prototype.trim = function (prevEndPoint, offset) {
  var endPoint = this.offsetPoint(this, prevEndPoint, offset);
  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

LineSegment.prototype.offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new Point(first);
  } else {
    result = new Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};