primitives.common.BaseShape = function () {

};


primitives.common.BaseShape.prototype._getLabelPosition = function (x, y, width, height, labelWidth, labelHeight, labelOffset, labelPlacement) {
  var result = null;
  switch (labelPlacement) {
    case primitives.common.PlacementType.Top:
      result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.TopRight:
      result = new primitives.common.Rect(x + width - labelWidth, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.TopLeft:
      result = new primitives.common.Rect(x, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Right:
      result = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.RightTop:
      result = new primitives.common.Rect(x + width + labelOffset, y, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.RightBottom:
      result = new primitives.common.Rect(x + width + labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.BottomRight:
      result = new primitives.common.Rect(x + width - labelWidth, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.BottomLeft:
      result = new primitives.common.Rect(x, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Left:
      result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.LeftTop:
      result = new primitives.common.Rect(x - labelWidth - labelOffset, y, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.LeftBottom:
      result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Auto: //ignore jslint
    case primitives.common.PlacementType.Bottom: //ignore jslint
    default: //ignore jslint
      result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
      break;
  }
  return result;
};

primitives.common.BaseShape.prototype._betweenPoint = function (first, second) {
  return new primitives.common.Point((first.x + second.x) / 2, (first.y + second.y) / 2);
};

primitives.common.BaseShape.prototype._offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new primitives.common.Point(first);
  } else {
    result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};