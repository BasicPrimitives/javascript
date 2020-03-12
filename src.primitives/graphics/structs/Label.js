primitives.common.Label = function () {
  this.text = null;
  this.position = null; // primitives.common.Rect
  this.weight = 0;

  this.isActive = true;
  this.labelType = primitives.common.LabelType.Regular;

  this.labelOrientation = primitives.text.TextOrientationType.Horizontal;
  this.horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
  this.verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;

  this.parent = primitives.common.Rect.prototype;
  this.parent.constructor.apply(this, arguments);
};

primitives.common.Label.prototype = new primitives.common.Rect();
