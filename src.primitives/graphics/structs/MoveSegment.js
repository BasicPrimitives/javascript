primitives.common.MoveSegment = function () {
  this.parent = primitives.common.Point.prototype;
  this.parent.constructor.apply(this, arguments);
  this.segmentType = primitives.common.SegmentType.Move;
};

primitives.common.MoveSegment.prototype = new primitives.common.Point();

primitives.common.MoveSegment.prototype.clone = function () {
  return new primitives.common.MoveSegment(this);
};

primitives.common.MoveSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.x, this.y, 0);
  }
};

primitives.common.MoveSegment.prototype.setPoint = function (point, index) {
  this.x = point.x;
  this.y = point.y;
};

primitives.common.MoveSegment.prototype.getEndPoint = function () {
  return this;
};

primitives.common.MoveSegment.prototype.invert = function (endPoint) {
  this.x = endPoint.x;
  this.y = endPoint.y;
};

primitives.common.MoveSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transformPoint(self.x, self.y, forward, self, function (x, y) {
    self.x = x;
    self.y = y;
  });//ignore jslint
};
