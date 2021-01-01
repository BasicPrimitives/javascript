import { VerticalAlignmentType, HorizontalAlignmentType, LineType }  from '../enums';

export function getTextAlign(alignment) {
  var result = null;
  switch (alignment) {
    case HorizontalAlignmentType.Center:
      result = "center";
      break;
    case HorizontalAlignmentType.Left:
      result = "left";
      break;
    case HorizontalAlignmentType.Right:
      result = "right";
      break;
  }
  return result;
}

export function getVerticalAlignment(alignment) {
  var result = null;
  switch (alignment) {
    case VerticalAlignmentType.Middle:
      result = "middle";
      break;
    case VerticalAlignmentType.Top:
      result = "top";
      break;
    case VerticalAlignmentType.Bottom:
      result = "bottom";
      break;
  }
  return result;
}

export function getBorderStyle(lineType) {
  var result = null;
  switch (lineType) {
    case LineType.Solid:
      result = "solid";
      break;
    case LineType.Dotted:
      result = "dotted";
      break;
    case LineType.Dashed:
      result = "dashed";
      break;
  }
  return result;
}