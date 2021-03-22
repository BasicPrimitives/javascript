import Rect from '../../../graphics/structs/Rect';
import { VerticalAlignmentType, Visibility, GroupByType, AdviserPlacementType } from '../../../enums';
import TreeItemPosition from '../../../models/TreeItemPosition';

export default function MatrixLayout(items, hideParentConnection, hideChildrenConnection) {
  this.items = items;
  this.hideParentConnection = hideParentConnection;
  this.hideChildrenConnection = hideChildrenConnection;

  this.data = {
    columns: [],
    rows: []
  };
};

MatrixLayout.prototype.loop = function (thisArg, onItem) {
  if(onItem != null) {
    for(var index = 0, len = this.items.length; index < len; index+=1) {
      var item = this.items[index];

      onItem.call(thisArg, item, 0);
    }
  }
};

MatrixLayout.prototype.Column = function () {
  this.depth = 0;
  this.offset = 0;
  this.leftPadding = 0;
  this.rightPadding = 0;
  this.layoutDirection = AdviserPlacementType.Left;
};

MatrixLayout.prototype.Row = function () {
  this.depth = 0;
  this.offset = 0;
  this.horizontalConnectorsDepth = 0;
  this.minimalDepth = null;
  this.dotsDepth = null;
};

MatrixLayout.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
  return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};

MatrixLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
  var data = {
    columns: [],
    rows: []
  };

  this.measureColumns(data, this.items, treeItemsPositions, options);
  this.measureRows(data, this.items, treeItemsPositions, options);

  this.data = data;

  var treeItemPosition = new TreeItemPosition();
  treeItemPosition.actualVisibility = Visibility.Invisible;
  treeItemPosition.actualSize = this.getLayoutSize(data);
  return treeItemPosition;
};

MatrixLayout.prototype.measureColumns = function (data, items, treeItemsPositions, options) {
  var column,
    index, len,
    maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, items.length);
  for (index = 0, len = items.length; index < len; index += 1) {
    var treeItem = items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = treeItemsPositions[treeItemId];

    var horizontalPadding = options.intervals[treeItemPosition.actualVisibility] / 2;

    var columnIndex = index % maximumColumns;
    column = data.columns[columnIndex];
    if (column == null) {
      column = new this.Column();
      column.layoutDirection = columnIndex % 2 ? AdviserPlacementType.Right : AdviserPlacementType.Left;
      data.columns[columnIndex] = column;
    }
    var itemWidth = horizontalPadding + treeItemPosition.actualSize.width + horizontalPadding;
    column.depth = Math.max(column.depth, itemWidth);
  }

  var arrowTipLength = options.linesWidth * 8;


  var offset = 0;
  for (index = 0, len = data.columns.length; index < len; index += 1) {
    column = data.columns[index];


    if (index % 2 == 0) {
      switch (options.arrowsDirection) {
        case GroupByType.Parents:
          column.leftPadding = this.hideChildrenConnection ? 0 : arrowTipLength;
          column.rightPadding = 0;
          break;
        case GroupByType.Children:
          column.leftPadding = 0;
          column.rightPadding = this.hideParentConnection ? 0 : arrowTipLength;
          break;
      }
    } else {
      switch (options.arrowsDirection) {
        case GroupByType.Parents:
          column.leftPadding = 0;
          column.rightPadding = this.hideChildrenConnection ? 0 : arrowTipLength;
          break;
        case GroupByType.Children:
          column.leftPadding = this.hideParentConnection ? 0 : arrowTipLength;
          column.rightPadding = 0;
          break;
      }
    }

    column.offset = offset + column.leftPadding + column.depth / 2;

    offset = column.offset + column.depth / 2 + column.rightPadding;
  }
};

MatrixLayout.prototype.measureRows = function (data, items, treeItemsPositions, options) {
  var index, len,
    row,
    maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, items.length);
  for (index = 0, len = items.length; index < len; index += 1) {
    var treeItem = items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = treeItemsPositions[treeItemId];

    var rowIndex = Math.floor(index / maximumColumns);
    var verticalPadding = options.shifts[treeItemPosition.actualVisibility] / 2;

    row = data.rows[rowIndex];
    if (row == null) {
      row = new this.Row();
      data.rows[rowIndex] = row;
    }
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
  }

  var offset = 0;
  for (index = 0, len = data.rows.length; index < len; index += 1) {
    row = data.rows[index];

    row.offset = offset + row.depth / 2;
    offset = row.offset + row.depth / 2;

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
  }
};

MatrixLayout.prototype.getLayoutSize = function (data) {
  return new Rect(0, 0, Math.round(this.getLayoutWidth(data)), Math.round(this.getLayoutHeight(data)));
};

MatrixLayout.prototype.getLayoutWidth = function (data) {
  var result = 0,
    length = data.columns.length;
  if (length > 0) {
    var lastColumn = data.columns[length - 1];
    result = lastColumn.offset + lastColumn.depth / 2 + lastColumn.rightPadding;
  }
  return result;
};

MatrixLayout.prototype.getLayoutHeight = function (data) {
  var result = 0,
    length = data.rows.length;
  if (length > 0) {
    var lastRow = data.rows[length - 1];
    result = lastRow.offset + lastRow.depth / 2;
  }
  return result;
};

MatrixLayout.prototype.arrange = function (thisArg, parentPosition, layoutDirection, treeItemsPositions, options, onItemPositioned) {
  if (onItemPositioned != null) {
    var maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, this.items.length);
    for (var index = 0, len = this.items.length; index < len; index += 1) {
      var treeItem = this.items[index],
        treeItemId = treeItem.id;

      var columnIndex = index % maximumColumns;
      var column = this.data.columns[columnIndex];

      var rowIndex = Math.floor(index / maximumColumns);
      var row = this.data.rows[rowIndex];

      var treeItemPosition = treeItemsPositions[treeItemId];

      var actualPosition = this.getItemPosition(treeItemPosition.actualVisibility, column, row, treeItemPosition.actualSize, options.verticalAlignment);
      actualPosition.translate(parentPosition.x, parentPosition.y);

      treeItemPosition = {
        ...treeItemPosition,
        actualPosition,
        horizontalConnectorsShift: parentPosition.y + row.offset - row.depth / 2 + row.horizontalConnectorsDepth,
        leftMedianOffset: column.depth / 2 + column.leftPadding,
        rightMedianOffset: column.depth / 2 + column.rightPadding,
        topConnectorShift: row.depth / 2,
        bottomConnectorShift: row.depth / 2
      };      

      onItemPositioned.call(thisArg, treeItemId, treeItemPosition, column.layoutDirection);
    }
  }
};

MatrixLayout.prototype.getItemPosition = function (visibility, column, row, size, verticalAlignment) {
  var itemShift = 0;

  switch (visibility) {
    case Visibility.Normal:
      switch (verticalAlignment) {
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

  return new Rect(column.offset - size.width / 2, row.offset - row.depth / 2 + itemShift, size.width, size.height);
};