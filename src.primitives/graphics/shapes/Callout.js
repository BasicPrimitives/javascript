primitives.common.Callout = function (graphics) {
  this.m_graphics = graphics;

  this.pointerPlacement = primitives.common.PlacementType.Auto;
  this.cornerRadius = "10%";
  this.offset = 0;
  this.opacity = 1;
  this.lineWidth = 1;
  this.pointerWidth = "10%";
  this.borderColor = primitives.common.Colors.Black;
  this.lineType = primitives.common.LineType.Solid;
  this.fillColor = primitives.common.Colors.LightGray;

  this.m_map = [[primitives.common.PlacementType.TopLeft, primitives.common.PlacementType.Left, primitives.common.PlacementType.BottomLeft],
  [primitives.common.PlacementType.Top, null, primitives.common.PlacementType.Bottom],
  [primitives.common.PlacementType.TopRight, primitives.common.PlacementType.Right, primitives.common.PlacementType.BottomRight]
  ];
};

primitives.common.Callout.prototype = new primitives.common.BaseShape();

primitives.common.Callout.prototype.draw = function (snapPoint, position) {
  position = new primitives.common.Rect(position).offset(this.offset);

  var pointA = new primitives.common.Point(position.x, position.y),
    pointB = new primitives.common.Point(position.right(), position.y),
    pointC = new primitives.common.Point(position.right(), position.bottom()),
    pointD = new primitives.common.Point(position.left(), position.bottom()),
    snapPoints = [null, null, null, null, null, null, null, null],
    points = [pointA, pointB, pointC, pointD],
    radius = this.m_graphics.getPxSize(this.cornerRadius, Math.min(pointA.distanceTo(pointB), pointB.distanceTo(pointC))),
    placementType,
    point,
    index,
    attr,
    linePaletteItem,
    buffer,
    polyline;

  attr = {};
  if (this.fillColor !== null) {
    attr.fillColor = this.fillColor;
    attr.opacity = this.opacity;
  }
  if (this.lineColor !== null) {
    attr.lineColor = this.borderColor;
  }
  attr.lineWidth = this.lineWidth;
  attr.lineType = this.lineType;

  linePaletteItem = new primitives.common.PaletteItem(attr);
  buffer = new primitives.common.PolylinesBuffer();
  polyline = buffer.getPolyline(linePaletteItem);

  if (snapPoint !== null) {
    placementType = (this.pointerPlacement === primitives.common.PlacementType.Auto) ? this._getPlacement(snapPoint, pointA, pointC) : this.pointerPlacement;
    if (placementType !== null) {
      snapPoints[placementType] = snapPoint;
    }
  }

  for (index = 0; index < points.length; index += 1) {
    this._drawSegment(polyline, points[0], points[1], points[2], this.pointerWidth, radius, snapPoints[1], snapPoints[2]);
    point = points.shift();
    points.push(point);
    point = snapPoints.shift();
    snapPoints.push(point);
    point = snapPoints.shift();
    snapPoints.push(point);
  }

  this.m_graphics.polylinesBuffer(buffer);
};

primitives.common.Callout.prototype._getPlacement = function (point, point1, point2) {
  var row = null,
    column = null;
  if (point.x < point1.x) {
    row = 0;
  }
  else if (point.x > point2.x) {
    row = 2;
  }
  else {
    row = 1;
  }
  if (point.y < point1.y) {
    column = 0;
  }
  else if (point.y > point2.y) {
    column = 2;
  }
  else {
    column = 1;
  }
  return this.m_map[row][column];
};

primitives.common.Callout.prototype._drawSegment = function (polyline, pointA, pointB, pointC, base, radius, sideSnapPoint, cornerSnapPoint) {
  var pointA1 = this._offsetPoint(pointA, pointB, radius),
    pointB1 = this._offsetPoint(pointB, pointA, radius),
    pointB2 = this._offsetPoint(pointB, pointC, radius),
    pointS,
    pointS1,
    pointS2;

  base = this.m_graphics.getPxSize(base, pointA.distanceTo(pointB) / 2.0);

  if (polyline.length() === 0) {
    polyline.addSegment(new primitives.common.MoveSegment(pointA1));
  }
  if (sideSnapPoint !== null) {
    pointS = this._betweenPoint(pointA, pointB);
    pointS1 = this._offsetPoint(pointS, pointA, base);
    pointS2 = this._offsetPoint(pointS, pointB, base);
    polyline.addSegment(new primitives.common.LineSegment(pointS1));
    polyline.addSegment(new primitives.common.LineSegment(sideSnapPoint));
    polyline.addSegment(new primitives.common.LineSegment(pointS2));
  }

  polyline.addSegment(new primitives.common.LineSegment(pointB1));
  if (cornerSnapPoint !== null) {
    polyline.addSegment(new primitives.common.LineSegment(cornerSnapPoint));
    polyline.addSegment(new primitives.common.LineSegment(pointB2));
  }
  else {
    polyline.addSegment(new primitives.common.QuadraticArcSegment(pointB, pointB2));
  }
};
