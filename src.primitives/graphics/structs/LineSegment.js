primitives.common.LineSegment = function () {
  this.parent = primitives.common.MoveSegment.prototype;
  this.parent.constructor.apply(this, arguments);

  this.segmentType = primitives.common.SegmentType.Line;
};

primitives.common.LineSegment.prototype = new primitives.common.MoveSegment();

primitives.common.LineSegment.prototype.clone = function () {
  return new primitives.common.LineSegment(this);
};

primitives.common.LineSegment.prototype.trim = function (prevEndPoint, offset) {
  var endPoint = this.offsetPoint(this, prevEndPoint, offset);
  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

primitives.common.LineSegment.prototype.offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new primitives.common.Point(first);
  } else {
    result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};