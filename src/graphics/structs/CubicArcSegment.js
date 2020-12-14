import Point from './Point';
import { SegmentType } from '../../enums';


export default function CubicArcSegment(arg0, arg1, arg2, arg3, arg4, arg5) {
  this.parent = Point.prototype;

  this.x = null;
  this.y = null;

  this.cpX1 = null;
  this.cpY1 = null;

  this.cpX2 = null;
  this.cpY2 = null;

  switch (arguments.length) {
    case 3:
      this.parent.constructor.apply(this, [arg2.x, arg2.y]);
      this.cpX1 = arg0.x;
      this.cpY1 = arg0.y;
      this.cpX2 = arg1.x;
      this.cpY2 = arg1.y;
      break;
    case 6:
      this.parent.constructor.apply(this, [arg4, arg5]);
      this.cpX1 = arg0;
      this.cpY1 = arg1;
      this.cpX2 = arg2;
      this.cpY2 = arg3;
      break;
    default:
      break;
  }

  this.segmentType = SegmentType.CubicArc;
};

CubicArcSegment.prototype = new Point();

CubicArcSegment.prototype.clone = function () {
  return new CubicArcSegment(this.cpX1, this.cpY1, this.cpX2, this.cpY2, this.x, this.y);
};

CubicArcSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.cpX1, this.cpY1, 0);
    onItem.call(thisArg, this.cpX2, this.cpY2, 1);
    onItem.call(thisArg, this.x, this.y, 2);
  }
};

CubicArcSegment.prototype.setPoint = function (point, index) {
  switch (index) {
    case 0:
      this.cpX1 = point.x;
      this.cpY1 = point.y;
      break;
    case 1:
      this.cpX2 = point.x;
      this.cpY2 = point.y;
      break;
    case 2:
      this.x = point.x;
      this.y = point.y;
      break;
  }
};

CubicArcSegment.prototype.getEndPoint = function () {
  return this;
};

CubicArcSegment.prototype.invert = function (endPoint) {
  var tempX = this.cpX1,
    tempY = this.cpY1;
  this.x = endPoint.x;
  this.y = endPoint.y;
  this.cpX1 = this.cpX2;
  this.cpY1 = this.cpY2;
  this.cpX2 = tempX;
  this.cpY2 = tempY;
};

CubicArcSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transform3Points(self.x, self.y, self.cpX1, self.cpY1, self.cpX2, self.cpY2, forward, self, function (x, y, cpX1, cpY1, cpX2, cpY2) {
    self.x = x;
    self.y = y;
    self.cpX1 = cpX1;
    self.cpY1 = cpY1;
    self.cpX2 = cpX2;
    self.cpY2 = cpY2;
  });//ignore jslint
};

CubicArcSegment.prototype.trim = function (prevEndPoint, offset) {
  var time = 0.5,
    endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time),
    time2 = 0.1,
    endPoint2 = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time2);

  time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
  endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time);

  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

CubicArcSegment.prototype.offsetPoint = function (x, y, cpX1, cpY1, cpX2, cpY2, x2, y2, time) {
  return new Point(
    (1 - time) * (1 - time) * (1 - time) * x + 3 * (1 - time) * (1 - time) * time * cpX1 + 3 * (1 - time) * time * time * cpX2 + time * time * time * x2,
    (1 - time) * (1 - time) * (1 - time) * y + 3 * (1 - time) * (1 - time) * time * cpY1 + 3 * (1 - time) * time * time * cpY2 + time * time * time * y2
  );
};