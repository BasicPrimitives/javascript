import Rect from '../structs/Rect';
import MoveSegment from '../structs/MoveSegment';
import LineSegment from '../structs/LineSegment';
import CubicArcSegment from '../structs/CubicArcSegment';
import { ShapeType } from '../../enums';

export default function Marker() {

};

Marker.Markers = {};

Marker.DrawCircle = function (polyline, position) {
  var quarter = Math.min(position.width / 2.0, position.height / 2.0);
  position = new Rect(position.horizontalCenter() - quarter, position.verticalCenter() - quarter, quarter * 2.0, quarter * 2.0);
  Marker.DrawOval(polyline, position);
};

Marker.DrawRectangle = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.x, position.y));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new LineSegment(position.x, position.bottom()));
  polyline.addSegment(new LineSegment(position.x, position.verticalCenter()));
};

Marker.DrawOval = function (polyline, position) {
  var cpX, cpY;
  cpX = (position.width / 2) * 0.5522848;
  cpY = (position.height / 2) * 0.5522848;
  polyline.addSegment(new MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new CubicArcSegment(position.x, position.verticalCenter() - cpY, position.horizontalCenter() - cpX, position.y, position.horizontalCenter(), position.y));
  polyline.addSegment(new CubicArcSegment(position.horizontalCenter() + cpX, position.y, position.right(), position.verticalCenter() - cpY, position.right(), position.verticalCenter()));
  polyline.addSegment(new CubicArcSegment(position.right(), position.verticalCenter() + cpY, position.horizontalCenter() + cpX, position.bottom(), position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new CubicArcSegment(position.horizontalCenter() - cpX, position.bottom(), position.x, position.verticalCenter() + cpY, position.x, position.verticalCenter()));
};

Marker.DrawTriangle = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.left(), position.bottom()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.bottom()));
};

Marker.DrawCrossOut = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.x, position.y));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.left(), position.bottom()));
};

Marker.DrawRhombus = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.bottom()));
};

Marker.DrawWedge = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.y));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
};

Marker.DrawFramedOval = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawOval(polyline, position);
};

Marker.DrawFramedTriangle = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawTriangle(polyline, position);
};

Marker.DrawFramedWedge = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawWedge(polyline, position);
};

Marker.DrawFramedRhombus = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawRhombus(polyline, position);
};

Marker.DrawNone = function (polyline, position) {

};

Marker.Markers[ShapeType.Circle] = Marker.DrawCircle;
Marker.Markers[ShapeType.Rectangle] = Marker.DrawRectangle;
Marker.Markers[ShapeType.Oval] = Marker.DrawOval;
Marker.Markers[ShapeType.Triangle] = Marker.DrawTriangle;
Marker.Markers[ShapeType.CrossOut] = Marker.DrawCrossOut;
Marker.Markers[ShapeType.Rhombus] = Marker.DrawRhombus;
Marker.Markers[ShapeType.Wedge] = Marker.DrawWedge;
Marker.Markers[ShapeType.FramedOval] = Marker.DrawFramedOval;
Marker.Markers[ShapeType.FramedTriangle] = Marker.DrawFramedTriangle;
Marker.Markers[ShapeType.FramedWedge] = Marker.DrawFramedWedge;
Marker.Markers[ShapeType.FramedRhombus] = Marker.DrawFramedRhombus;
Marker.Markers[ShapeType.None] = Marker.DrawNone;

Marker.prototype.draw = function (polylinesBuffer, shapeType, position, paletteItem) {
  var polyline;

  // If you need to create custom multi-color marker type
  // create color palette object for every fragment 
  // than request polyline of that that palette style 
  // add fragment into received polyline
  polyline = polylinesBuffer.getPolyline(paletteItem);
  Marker.Markers[shapeType](polyline, position);
};

