import Point from './Point';
import { SegmentType } from '../../enums';

export default function QuadraticArcSegment(arg0, arg1, arg2, arg3) {
  this.x = null;
  this.y = null;

  this.cpX = null;
  this.cpY = null;

  switch (arguments.length) {
    case 2:
      this.x = arg1.x;
      this.y = arg1.y;
      this.cpX = arg0.x;
      this.cpY = arg0.y;
      break;
    case 4:
      this.cpX = arg0;
      this.cpY = arg1;
      this.x = arg2;
      this.y = arg3;
      break;
    default:
      break;
  }

  this.segmentType = SegmentType.QuadraticArc;
};

QuadraticArcSegment.prototype.clone = function () {
  return new QuadraticArcSegment(this.cpX, this.cpY, this.x, this.y);
};

QuadraticArcSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.cpX, this.cpY, 0);
    onItem.call(thisArg, this.x, this.y, 1);
  }
};

QuadraticArcSegment.prototype.setPoint = function (point, index) {
  switch (index) {
    case 0:
      this.cpX = point.x;
      this.cpY = point.y;
      break;
    case 1:
      this.x = point.x;
      this.y = point.y;
      break;
  }
};

QuadraticArcSegment.prototype.getEndPoint = function () {
  return this;
};

QuadraticArcSegment.prototype.invert = function (endPoint) {
  this.x = endPoint.x;
  this.y = endPoint.y;
};

QuadraticArcSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transformPoints(self.x, self.y, self.cpX, self.cpY, forward, self, function (x, y, cpX, cpY) {
    self.x = x;
    self.y = y;
    self.cpX = cpX;
    self.cpY = cpY;
  });//ignore jslint
};

QuadraticArcSegment.prototype.trim = function (prevEndPoint, offset) {
  var time = 0.5,
    endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time),
    time2 = 0.1,
    endPoint2 = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time2);

  time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
  endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time);

  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

QuadraticArcSegment.prototype.offsetPoint = function (firstX, firstY, controlX, controlY, secondX, secondY, time) {
  return new Point((1 - time) * (1 - time) * firstX + 2 * (1 - time) * time * controlX + time * time * secondX,
    (1 - time) * (1 - time) * firstY + 2 * (1 - time) * time * controlY + time * time * secondY);
};