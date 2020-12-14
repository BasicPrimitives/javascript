import Rect from './Rect';
import { LabelType, TextOrientationType, HorizontalAlignmentType, VerticalAlignmentType } from '../../enums';

export default function Label() {
  this.text = null;
  this.position = null; // Rect
  this.weight = 0;

  this.isActive = true;
  this.labelType = LabelType.Regular;

  this.labelOrientation = TextOrientationType.Horizontal;
  this.horizontalAlignmentType = HorizontalAlignmentType.Center;
  this.verticalAlignmentType = VerticalAlignmentType.Bottom;

  this.parent = Rect.prototype;
  this.parent.constructor.apply(this, arguments);
};

Label.prototype = new Rect();
