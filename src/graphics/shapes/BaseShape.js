import Rect from '../structs/Rect';
import Point from '../structs/Point';
import { PlacementType } from '../../enums';

export default function BaseShape() {

};


BaseShape.prototype._getLabelPosition = function (x, y, width, height, labelWidth, labelHeight, labelOffset, labelPlacement) {
  var result = null;
  switch (labelPlacement) {
    case PlacementType.Top:
      result = new Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.TopRight:
      result = new Rect(x + width - labelWidth, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.TopLeft:
      result = new Rect(x, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.Right:
      result = new Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case PlacementType.RightTop:
      result = new Rect(x + width + labelOffset, y, labelWidth, labelHeight);
      break;
    case PlacementType.RightBottom:
      result = new Rect(x + width + labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.BottomRight:
      result = new Rect(x + width - labelWidth, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case PlacementType.BottomLeft:
      result = new Rect(x, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case PlacementType.Left:
      result = new Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case PlacementType.LeftTop:
      result = new Rect(x - labelWidth - labelOffset, y, labelWidth, labelHeight);
      break;
    case PlacementType.LeftBottom:
      result = new Rect(x - labelWidth - labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.Auto: //ignore jslint
    case PlacementType.Bottom: //ignore jslint
    default: //ignore jslint
      result = new Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
      break;
  }
  return result;
};

BaseShape.prototype._betweenPoint = function (first, second) {
  return new Point((first.x + second.x) / 2, (first.y + second.y) / 2);
};

BaseShape.prototype._offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new Point(first);
  } else {
    result = new Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};