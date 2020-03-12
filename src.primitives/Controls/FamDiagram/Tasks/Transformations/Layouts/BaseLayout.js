primitives.common.BaseLayout = function (params, options) {
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

primitives.common.BaseLayout.prototype.add = function (treeItemId, layout) {
  this._children[treeItemId] = layout;
};

primitives.common.BaseLayout.prototype.getLayout = function (treeItemId) {
  return this._children[treeItemId] || null;
};

primitives.common.BaseLayout.prototype.getShifts = function (options) {
  var result = [];
  result[primitives.common.Visibility.Normal] = options.normalLevelShift;
  result[primitives.common.Visibility.Dot] = options.dotLevelShift;
  result[primitives.common.Visibility.Line] = options.lineLevelShift;
  result[primitives.common.Visibility.Invisible] = options.lineLevelShift;
  return result;
};

primitives.common.BaseLayout.prototype.getIntervals = function (options) {
  var result = [];
  result[primitives.common.Visibility.Normal] = options.normalItemsInterval;
  result[primitives.common.Visibility.Dot] = options.dotItemsInterval;
  result[primitives.common.Visibility.Line] = options.lineItemsInterval;
  result[primitives.common.Visibility.Invisible] = options.lineItemsInterval;
  return result;
};

primitives.common.BaseLayout.prototype.getItemSize = function (visibility, isCursor, treeItemTemplate, options) {
  var templateConfig,
    size,
    contentPosition;

  switch (visibility) {
    case primitives.common.Visibility.Normal:
      templateConfig = treeItemTemplate.template.templateConfig;
      size = new primitives.common.Size(templateConfig.itemSize);
      contentPosition = new primitives.common.Rect(0, 0, size.width, size.height);
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
          case primitives.common.AdviserPlacementType.Right:
            contentPosition.x += options.buttonsPanelSize;
            break;
        }
      }
      if (treeItemTemplate.hasGroupTitle) {
        size.width += options.groupTitlePanelSize;
        switch (options.groupTitlePlacementType) {
          case primitives.common.AdviserPlacementType.Right:
            break;
          default:
            contentPosition.x += options.groupTitlePanelSize;
            break;
        }
      }
      break;
    case primitives.common.Visibility.Dot:
      templateConfig = treeItemTemplate.template.templateConfig;
      size = new primitives.common.Size(templateConfig.minimizedItemSize);
      break;
    case primitives.common.Visibility.Line:
    case primitives.common.Visibility.Invisible:
      size = new primitives.common.Size();
      break;
  }

  switch (options.orientationType) {
    case primitives.common.OrientationType.Left:
    case primitives.common.OrientationType.Right:
      size.invert();
      break;
  }

  return {
    actualSize: size,
    contentPosition: contentPosition
  };
};