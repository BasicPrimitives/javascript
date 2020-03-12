primitives.common.Marker = function () {

};

primitives.common.Marker.Markers = {};

primitives.common.Marker.DrawCircle = function (polyline, position) {
  var quarter = Math.min(position.width / 2.0, position.height / 2.0);
  position = new primitives.common.Rect(position.horizontalCenter() - quarter, position.verticalCenter() - quarter, quarter * 2.0, quarter * 2.0);
  primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawRectangle = function (polyline, position) {
  polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.x, position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawOval = function (polyline, position) {
  var cpX, cpY;
  cpX = (position.width / 2) * 0.5522848;
  cpY = (position.height / 2) * 0.5522848;
  polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new primitives.common.CubicArcSegment(position.x, position.verticalCenter() - cpY, position.horizontalCenter() - cpX, position.y, position.horizontalCenter(), position.y));
  polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() + cpX, position.y, position.right(), position.verticalCenter() - cpY, position.right(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.CubicArcSegment(position.right(), position.verticalCenter() + cpY, position.horizontalCenter() + cpX, position.bottom(), position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() - cpX, position.bottom(), position.x, position.verticalCenter() + cpY, position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawTriangle = function (polyline, position) {
  polyline.addSegment(new primitives.common.MoveSegment(position.left(), position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawCrossOut = function (polyline, position) {
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawRhombus = function (polyline, position) {
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.left(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.verticalCenter()));
  polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
};

primitives.common.Marker.DrawWedge = function (polyline, position) {
  polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new primitives.common.LineSegment(position.left(), position.y));
  polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
};

primitives.common.Marker.DrawFramedOval = function (polyline, position) {
  primitives.common.Marker.DrawRectangle(polyline, position);
  primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawFramedTriangle = function (polyline, position) {
  primitives.common.Marker.DrawRectangle(polyline, position);
  primitives.common.Marker.DrawTriangle(polyline, position);
};

primitives.common.Marker.DrawFramedWedge = function (polyline, position) {
  primitives.common.Marker.DrawRectangle(polyline, position);
  primitives.common.Marker.DrawWedge(polyline, position);
};

primitives.common.Marker.DrawFramedRhombus = function (polyline, position) {
  primitives.common.Marker.DrawRectangle(polyline, position);
  primitives.common.Marker.DrawRhombus(polyline, position);
};

primitives.common.Marker.DrawNone = function (polyline, position) {

};

primitives.common.Marker.Markers[primitives.common.ShapeType.Circle] = primitives.common.Marker.DrawCircle;
primitives.common.Marker.Markers[primitives.common.ShapeType.Rectangle] = primitives.common.Marker.DrawRectangle;
primitives.common.Marker.Markers[primitives.common.ShapeType.Oval] = primitives.common.Marker.DrawOval;
primitives.common.Marker.Markers[primitives.common.ShapeType.Triangle] = primitives.common.Marker.DrawTriangle;
primitives.common.Marker.Markers[primitives.common.ShapeType.CrossOut] = primitives.common.Marker.DrawCrossOut;
primitives.common.Marker.Markers[primitives.common.ShapeType.Rhombus] = primitives.common.Marker.DrawRhombus;
primitives.common.Marker.Markers[primitives.common.ShapeType.Wedge] = primitives.common.Marker.DrawWedge;
primitives.common.Marker.Markers[primitives.common.ShapeType.FramedOval] = primitives.common.Marker.DrawFramedOval;
primitives.common.Marker.Markers[primitives.common.ShapeType.FramedTriangle] = primitives.common.Marker.DrawFramedTriangle;
primitives.common.Marker.Markers[primitives.common.ShapeType.FramedWedge] = primitives.common.Marker.DrawFramedWedge;
primitives.common.Marker.Markers[primitives.common.ShapeType.FramedRhombus] = primitives.common.Marker.DrawFramedRhombus;
primitives.common.Marker.Markers[primitives.common.ShapeType.None] = primitives.common.Marker.DrawNone;

primitives.common.Marker.prototype.draw = function (polylinesBuffer, shapeType, position, paletteItem) {
  var polyline;

  // If you need to create custom multi-color marker type
  // create color palette object for every fragment 
  // than request polyline of that that palette style 
  // add fragment into received polyline
  polyline = polylinesBuffer.getPolyline(paletteItem);
  primitives.common.Marker.Markers[shapeType](polyline, position);
};

