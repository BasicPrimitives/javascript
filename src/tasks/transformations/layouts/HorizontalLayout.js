import Rect from '../../../graphics/structs/Rect';
import { VerticalAlignmentType, Visibility, GroupByType, AdviserPlacementType } from '../../../enums';
import TreeItemPosition from '../../../models/TreeItemPosition';

export default function HorizontalLayout(items, hideParentConnection, hideChildrenConnection) {
  this.items = items;
  this.hideParentConnection = hideParentConnection;
  this.hideChildrenConnection = hideChildrenConnection;

  this.data = {
    columns: [],
    row: null
  };
};

HorizontalLayout.prototype.loop = function (thisArg, onItem) {
  if(onItem != null) {
    for(var index = 0, len = this.items.length; index < len; index+=1) {
      var item = this.items[index];

      onItem.call(thisArg, item, 0);
    }
  }
};

HorizontalLayout.prototype.Column = function () {
  this.depth = 0;
  this.offset = 0;
  this.parentsPadding = 0;
  this.childrenPadding = 0;
};

HorizontalLayout.prototype.Row = function () {
  this.depth = 0;
  this.offset = 0;
  this.horizontalConnectorsDepth = 0;
  this.minimalDepth = null;
  this.dotsDepth = null;
};

HorizontalLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
  var data = {
    columns: [],
    row: null
  };

  this.measureColumns(data, this.items, treeItemsPositions, options);
  this.measureRow(data, this.items, treeItemsPositions, options);

  this.data = data;

  var treeItemPosition = new TreeItemPosition();
  treeItemPosition.actualVisibility = Visibility.Invisible;
  treeItemPosition.actualSize = this.getLayoutSize(data);
  return treeItemPosition;
};

HorizontalLayout.prototype.measureColumns = function (data, items, treeItemsPositions, options) {
  var column;
  var offset = 0;
  var arrowTipLength = options.linesWidth * 8;

  for(var index = 0; index < items.length; index+=1) {
    var treeItem = items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = treeItemsPositions[treeItemId];

    column = data.columns[index];
    if (column == null) {
      column = new this.Column();
      data.columns[index] = column;
    }
    column.depth = treeItemPosition.actualSize.width;
    var padding = options.intervals[treeItemPosition.actualVisibility] / 2;
    if(index != 0) {
      column.parentsPadding = padding;
    }
    if(index != items.length - 1) {
      column.childrenPadding = padding;
    }

    switch (options.arrowsDirection) {
      case GroupByType.Parents:
        if(index != items.length - 1) {
          column.childrenPadding += this.hideChildrenConnection ? 0 : arrowTipLength;
        }
        break;
      case GroupByType.Children:
        if(index != 0) {
          column.parentsPadding += this.hideParentConnection ? 0 : arrowTipLength;
        }
        break;
    }

    column.offset = offset + column.parentsPadding + column.depth / 2;

    offset = column.offset + column.depth / 2 + column.childrenPadding;
  }
};

HorizontalLayout.prototype.measureRow = function (data, items, treeItemsPositions, options) {
  data.row = new this.Row();
  var row = data.row;
  for(var index = 0; index < items.length; index+=1) {
    var treeItem = items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = treeItemsPositions[treeItemId];

    var verticalPadding = options.shifts[treeItemPosition.actualVisibility] / 2;

    row.depth = Math.max(row.depth, verticalPadding + treeItemPosition.actualSize.height + verticalPadding);

    switch (treeItemPosition.actualVisibility) {
      case Visibility.Dot:
      case Visibility.Line:
      case Visibility.Invisible:
        row.dotsDepth = !row.dotsDepth ? treeItemPosition.actualSize.height : Math.min(row.dotsDepth, treeItemPosition.actualSize.height);
        break;
      default:
        row.minimalDepth = !row.minimalDepth ? treeItemPosition.actualSize.height : Math.min(row.minimalDepth, treeItemPosition.actualSize.height);
        break;
    }

    row.offset = row.depth / 2;

    if (row.minimalDepth == null) {
      row.minimalDepth = row.depth;
    }
    if (row.dotsDepth != null && row.dotsDepth > row.minimalDepth) {
      row.minimalDepth = row.dotsDepth;
    }

    switch (options.verticalAlignment) {
      case VerticalAlignmentType.Top:
        row.horizontalConnectorsDepth = row.minimalDepth / 2.0;
        break;
      case VerticalAlignmentType.Middle:
        row.horizontalConnectorsDepth = row.depth / 2.0;
        break;
      case VerticalAlignmentType.Bottom:
        row.horizontalConnectorsDepth = row.depth - row.minimalDepth / 2.0;
        break;
    }
  };
};

HorizontalLayout.prototype.getLayoutSize = function (data) {
  var width = 0,
    length = data.columns.length;
  if (length > 0) {
    var lastColumn = data.columns[length - 1];
    width = lastColumn.offset + lastColumn.depth / 2 + lastColumn.childrenPadding;
  }
  var height = data.row.offset + data.row.depth / 2;

  return new Rect(0, 0, Math.round(width), Math.round(height));
};

HorizontalLayout.prototype.arrange = function (thisArg, parentPosition, layoutDirection, treeItemsPositions, options, onItemPositioned) {
  if (onItemPositioned != null) {
    for(var index = 0; index < this.items.length; index+=1) {
      var treeItem = this.items[index];
      var treeItemId = treeItem.id;

      var column = this.data.columns[index];
      var row = this.data.row;

      var treeItemPosition = treeItemsPositions[treeItemId];

      var offset = column.offset;
      if(layoutDirection == AdviserPlacementType.Left) {
        offset = parentPosition.width - column.offset;
      } 

      var actualPosition = this.getItemPosition(treeItemPosition.actualVisibility, offset, row, treeItemPosition.actualSize, options);
      actualPosition.translate(parentPosition.x, parentPosition.y);

      treeItemPosition = {
        ...treeItemPosition,
        actualPosition,
        horizontalConnectorsShift: parentPosition.y + row.offset - row.depth / 2 + row.horizontalConnectorsDepth,
        leftMedianOffset: column.depth / 2 + (layoutDirection == AdviserPlacementType.Left ? column.childrenPadding : column.parentsPadding),
        rightMedianOffset: column.depth / 2 + (layoutDirection == AdviserPlacementType.Left ? column.parentsPadding : column.childrenPadding),
        topConnectorShift: row.depth / 2,
        bottomConnectorShift: row.depth / 2
      }; 

      onItemPositioned.call(thisArg, treeItemId, treeItemPosition);
    };
  }
};

HorizontalLayout.prototype.getItemPosition = function (visibility, offset, row, size, options) {
  var itemShift = 0;

  switch (visibility) {
    case Visibility.Normal:
      switch (options.verticalAlignment) {
        case VerticalAlignmentType.Top:
          itemShift = 0;
          break;
        case VerticalAlignmentType.Middle:
          itemShift = (row.depth - size.height) / 2.0;
          break;
        case VerticalAlignmentType.Bottom:
          itemShift = row.depth - size.height;
          break;
      }
      break;
    case Visibility.Dot:
    case Visibility.Line:
    case Visibility.Invisible:
      itemShift = row.horizontalConnectorsDepth - size.height / 2.0;
      break;
  }

  return new Rect(offset - size.width / 2, row.offset - row.depth / 2 + itemShift, size.width, size.height);
};