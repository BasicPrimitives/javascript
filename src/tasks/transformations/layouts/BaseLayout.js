import { Visibility, AdviserPlacementType, OrientationType } from '../../../enums';
import Size from '../../../graphics/structs/Size';
import Rect from '../../../graphics/structs/Rect';

export default function BaseLayout(params, options) {
  this._children = {};

  if (this.params != null) {
    for (var key in this.params) {
      if (this.params.hasOwnProperty(key) && params.hasOwnProperty(key)) {
        this.params[key] = params[key];
      }
    }
  }

  if (this.options != null) {
    for (key in this.options) {
      if (this.options.hasOwnProperty(key) && options.hasOwnProperty(key)) {
        this.options[key] = options[key];
      }
    }

    this.options.shifts = this.getShifts(this.options);
    this.options.intervals = this.getIntervals(this.options);
  }
};

BaseLayout.prototype.add = function (treeItemId, layout) {
  this._children[treeItemId] = layout;
};

BaseLayout.prototype.getLayout = function (treeItemId) {
  return this._children[treeItemId] || null;
};

BaseLayout.prototype.getShifts = function (options) {
  var result = [];
  result[Visibility.Normal] = options.normalLevelShift;
  result[Visibility.Dot] = options.dotLevelShift;
  result[Visibility.Line] = options.lineLevelShift;
  result[Visibility.Invisible] = options.lineLevelShift;
  return result;
};

BaseLayout.prototype.getIntervals = function (options) {
  var result = [];
  result[Visibility.Normal] = options.normalItemsInterval;
  result[Visibility.Dot] = options.dotItemsInterval;
  result[Visibility.Line] = options.lineItemsInterval;
  result[Visibility.Invisible] = options.lineItemsInterval;
  return result;
};

BaseLayout.prototype.getItemSize = function (visibility, isCursor, treeItemTemplate, options) {
  var templateConfig,
    size,
    contentPosition;

  switch (visibility) {
    case Visibility.Normal:
      templateConfig = treeItemTemplate.template.templateConfig;
      size = new Size(templateConfig.itemSize);
      contentPosition = new Rect(0, 0, size.width, size.height);
      if (isCursor) {
        size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
        size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
        contentPosition.x = templateConfig.cursorPadding.left;
        contentPosition.y = templateConfig.cursorPadding.top;
      }
      if (treeItemTemplate.hasSelectorCheckbox) {
        size.height += options.checkBoxPanelSize;
      }
      if (treeItemTemplate.hasButtons) {
        size.width += options.buttonsPanelSize;
        switch (options.groupTitlePlacementType) {
          case AdviserPlacementType.Right:
            contentPosition.x += options.buttonsPanelSize;
            break;
        }
      }
      if (treeItemTemplate.hasGroupTitle) {
        size.width += options.groupTitlePanelSize;
        switch (options.groupTitlePlacementType) {
          case AdviserPlacementType.Right:
            break;
          default:
            contentPosition.x += options.groupTitlePanelSize;
            break;
        }
      }
      break;
    case Visibility.Dot:
      templateConfig = treeItemTemplate.template.templateConfig;
      size = new Size(templateConfig.minimizedItemSize);
      break;
    case Visibility.Line:
    case Visibility.Invisible:
      size = new Size();
      break;
  }

  switch (options.orientationType) {
    case OrientationType.Left:
    case OrientationType.Right:
      size.invert();
      break;
  }

  return {
    actualSize: size,
    contentPosition: contentPosition
  };
};