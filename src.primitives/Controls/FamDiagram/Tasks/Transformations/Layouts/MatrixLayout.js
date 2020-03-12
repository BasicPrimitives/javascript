primitives.famdiagram.MatrixLayout = function (params, options) {
  this.params = {
    items: [], // primitives.orgdiagram.OrgItem used properties: isVisible
    isItemSelected: null,
    cursorItemId: null,
    getTemplateParams: null, //primitives.orgdiagram.TemplateParams
    hideParentConnection: false,
    hideChildrenConnection: false
  };

  this.options = {
    verticalAlignment: primitives.common.VerticalAlignmentType.Middle,
    orientationType: primitives.common.OrientationType.Top,
    arrowsDirection: primitives.common.GroupByType.None,
    linesWidth: 1,
    checkBoxPanelSize: 24,
    buttonsPanelSize: 28,
    groupTitlePanelSize: 24,
    groupTitlePlacementType: primitives.common.AdviserPlacementType.Left,
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 1,
    lineItemsInterval: 2,
    maximumColumnsInMatrix: 6
  };

  this.data = {
    treeItemsPositions: {},
    columns: [],
    rows: []
  };

  this.parent = primitives.common.BaseLayout.prototype;
  this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.MatrixLayout.prototype = new primitives.common.BaseLayout();

primitives.famdiagram.MatrixLayout.prototype.Column = function () {
  this.depth = 0;
  this.offset = 0;
  this.leftPadding = 0;
  this.rightPadding = 0;
};

primitives.famdiagram.MatrixLayout.prototype.Row = function () {
  this.depth = 0;
  this.offset = 0;
  this.horizontalConnectorsDepth = 0;
  this.minimalDepth = null;
  this.dotsDepth = null;
};

primitives.famdiagram.MatrixLayout.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
  return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};

primitives.famdiagram.MatrixLayout.prototype.measure = function (visibility) {
  var data = {
    treeItemsPositions: {},
    columns: [],
    rows: []
  };

  this.measureItems(data, this.params, this.options, visibility);
  this.measureColumns(data, this.params, this.options);
  this.measureRows(data, this.params, this.options);

  this.data = data;

  return this.getLayoutSize(data);
};

primitives.famdiagram.MatrixLayout.prototype.measureItems = function (data, params, options, visibility) {
  for (var index = 0, len = params.items.length; index < len; index += 1) {
    var treeItem = params.items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = new primitives.orgdiagram.TreeItemPosition();

    var treeItemVisibility = params.isItemSelected(treeItemId) ? primitives.common.Visibility.Normal : (!treeItem.isVisible ? primitives.common.Visibility.Invisible : primitives.common.Visibility.Auto),
      treeItemtemplate = params.getTemplateParams(treeItemId);

    var actualVisibility = (treeItemVisibility === primitives.common.Visibility.Auto) ? visibility : treeItemVisibility;
    var size = this.getItemSize(actualVisibility, params.cursorItemId == treeItemId, treeItemtemplate, options);
    treeItemPosition.actualVisibility = actualVisibility;
    treeItemPosition.actualSize = size.actualSize;
    treeItemPosition.contentPosition = size.contentPosition;

    data.treeItemsPositions[treeItemId] = treeItemPosition;
  }
};

primitives.famdiagram.MatrixLayout.prototype.measureColumns = function (data, params, options) {
  var column,
    index, len,
    maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, params.items.length);
  for (index = 0, len = params.items.length; index < len; index += 1) {
    var treeItem = params.items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = data.treeItemsPositions[treeItemId];

    var horizontalPadding = options.intervals[treeItemPosition.actualVisibility] / 2;
    treeItemPosition.leftPadding = horizontalPadding;
    treeItemPosition.rightPadding = horizontalPadding;

    var columnIndex = index % maximumColumns;
    column = data.columns[columnIndex];
    if (column == null) {
      column = new this.Column();
      data.columns[columnIndex] = column;
    }
    var itemWidth = treeItemPosition.leftPadding + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;
    column.depth = Math.max(column.depth, itemWidth);
  }

  var arrowTipLength = options.linesWidth * 8;


  var offset = 0;
  for (index = 0, len = data.columns.length; index < len; index += 1) {
    column = data.columns[index];


    if (index % 2 == 0) {
      switch (options.arrowsDirection) {
        case primitives.common.GroupByType.Parents:
          column.leftPadding = params.hideChildrenConnection ? 0 : arrowTipLength;
          column.rightPadding = 0;
          break;
        case primitives.common.GroupByType.Children:
          column.leftPadding = 0;
          column.rightPadding = params.hideParentConnection ? 0 : arrowTipLength;
          break;
      }
    } else {
      switch (options.arrowsDirection) {
        case primitives.common.GroupByType.Parents:
          column.leftPadding = 0;
          column.rightPadding = params.hideChildrenConnection ? 0 : arrowTipLength;
          break;
        case primitives.common.GroupByType.Children:
          column.leftPadding = params.hideParentConnection ? 0 : arrowTipLength;
          column.rightPadding = 0;
          break;
      }
    }

    column.offset = offset + column.leftPadding + column.depth / 2;

    offset = column.offset + column.depth / 2 + column.rightPadding;
  }
};

primitives.famdiagram.MatrixLayout.prototype.measureRows = function (data, params, options) {
  var index, len,
    row,
    maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, params.items.length);
  for (index = 0, len = params.items.length; index < len; index += 1) {
    var treeItem = params.items[index];
    var treeItemId = treeItem.id;
    var treeItemPosition = data.treeItemsPositions[treeItemId];

    var rowIndex = Math.floor(index / maximumColumns);
    var verticalPadding = options.shifts[treeItemPosition.actualVisibility] / 2;

    row = data.rows[rowIndex];
    if (row == null) {
      row = new this.Row();
      data.rows[rowIndex] = row;
    }
    row.depth = Math.max(row.depth, verticalPadding + treeItemPosition.actualSize.height + verticalPadding);

    switch (treeItemPosition.actualVisibility) {
      case primitives.common.Visibility.Dot:
      case primitives.common.Visibility.Line:
      case primitives.common.Visibility.Invisible:
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
      case primitives.common.VerticalAlignmentType.Top:
        row.horizontalConnectorsDepth = row.minimalDepth / 2.0;
        break;
      case primitives.common.VerticalAlignmentType.Middle:
        row.horizontalConnectorsDepth = row.depth / 2.0;
        break;
      case primitives.common.VerticalAlignmentType.Bottom:
        row.horizontalConnectorsDepth = row.depth - row.minimalDepth / 2.0;
        break;
    }
  }
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutSize = function (data) {
  return new primitives.common.Rect(0, 0, Math.round(this.getLayoutWidth(data)), Math.round(this.getLayoutHeight(data)));
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutWidth = function (data) {
  var result = 0,
    length = data.columns.length;
  if (length > 0) {
    var lastColumn = data.columns[length - 1];
    result = lastColumn.offset + lastColumn.depth / 2 + lastColumn.rightPadding;
  }
  return result;
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutHeight = function (data) {
  var result = 0,
    length = data.rows.length;
  if (length > 0) {
    var lastRow = data.rows[length - 1];
    result = lastRow.offset + lastRow.depth / 2;
  }
  return result;
};

primitives.famdiagram.MatrixLayout.prototype.arrange = function (thisArg, parentPosition, onItemPositioned) {
  if (onItemPositioned != null) {
    var maximumColumns = this.getMatrixWidth(this.options.maximumColumnsInMatrix, this.params.items.length);
    for (var index = 0, len = this.params.items.length; index < len; index += 1) {
      var treeItem = this.params.items[index],
        treeItemId = treeItem.id;

      var columnIndex = index % maximumColumns;
      var column = this.data.columns[columnIndex];

      var rowIndex = Math.floor(index / maximumColumns);
      var row = this.data.rows[rowIndex];

      var treeItemPosition = this.data.treeItemsPositions[treeItemId];

      var actualPosition = this.getItemPosition(treeItemPosition.actualVisibility, column, row, treeItemPosition.actualSize, this.options);
      actualPosition.translate(parentPosition.x, parentPosition.y);

      treeItemPosition.actualPosition = actualPosition;
      treeItemPosition.horizontalConnectorsShift = parentPosition.y + row.offset - row.depth / 2 + row.horizontalConnectorsDepth,
        treeItemPosition.leftMedianOffset = column.depth / 2 + column.leftPadding;
      treeItemPosition.rightMedianOffset = column.depth / 2 + column.rightPadding;
      treeItemPosition.topConnectorShift = row.depth / 2;
      treeItemPosition.bottomConnectorShift = row.depth / 2;

      onItemPositioned.call(thisArg, treeItemId, treeItemPosition);
    }
  }
};

primitives.famdiagram.MatrixLayout.prototype.getItemPosition = function (visibility, column, row, size, options) {
  var itemShift = 0;

  switch (visibility) {
    case primitives.common.Visibility.Normal:
      switch (options.verticalAlignment) {
        case primitives.common.VerticalAlignmentType.Top:
          itemShift = 0;
          break;
        case primitives.common.VerticalAlignmentType.Middle:
          itemShift = (row.depth - size.height) / 2.0;
          break;
        case primitives.common.VerticalAlignmentType.Bottom:
          itemShift = row.depth - size.height;
          break;
      }
      break;
    case primitives.common.Visibility.Dot:
    case primitives.common.Visibility.Line:
    case primitives.common.Visibility.Invisible:
      itemShift = row.horizontalConnectorsDepth - size.height / 2.0;
      break;
  }

  return new primitives.common.Rect(column.offset - size.width / 2, row.offset - row.depth / 2 + itemShift, size.width, size.height);
};