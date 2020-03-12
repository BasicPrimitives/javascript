primitives.orgdiagram.AlignDiagramTask = function (orientationOptionTask, itemsSizesOptionTask, visualTreeOptionTask, scaleOptionTask,
  currentControlSizeTask, activeItemsTask, itemsPositionsTask, isFamilyChartMode) {
  var _data = {
    treeItemsPositions: {}, // primitives.orgdiagram.TreeItemPosition();
    panelSize: null // primitives.common.Rect();
  },
    _activeItems,
    _treeItemsPositions,

    _options,
    _orientationOptions,
    _visualTreeOptions,
    _scaleOptions,
    _spatialIndex,
    _keyboardNavigationManager;

  function process() {
    var placeholderSize = new primitives.common.Size(itemsPositionsTask.getContentSize()),
      panelSize = new primitives.common.Size(currentControlSizeTask.getOptimalPanelSize());

    _spatialIndex = null;
    _keyboardNavigationManager = null;

    _activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};
    _treeItemsPositions = itemsPositionsTask.getItemsPositions();

    _options = itemsSizesOptionTask.getOptions();
    _orientationOptions = orientationOptionTask.getOptions();
    _visualTreeOptions = visualTreeOptionTask.getOptions();
    _scaleOptions = scaleOptionTask.getOptions();

    switch (_orientationOptions.orientationType) {
      case primitives.common.OrientationType.Left:
      case primitives.common.OrientationType.Right:
        panelSize.invert();
        break;
    }

    panelSize.scale(1.0 / _scaleOptions.scale);

    // By default we translate everything forward
    _data.panelSize = panelSize;
    _data.treeItemsPositions = _treeItemsPositions;

    switch (_options.pageFitMode) {
      case primitives.common.PageFitMode.AutoSize:
        _data.panelSize = new primitives.common.Size(placeholderSize);
        break;
      default:
        _data.panelSize = new primitives.common.Size(placeholderSize);
        if (placeholderSize.width < panelSize.width) {
          _data.treeItemsPositions = {};
          stretchToWidth(_data.treeItemsPositions, placeholderSize.width, panelSize.width);
          _data.panelSize.width = panelSize.width;
        }
        if (placeholderSize.height < panelSize.height) {
          _data.panelSize.height = panelSize.height;
        }
        break;
    }

    switch (_orientationOptions.orientationType) {
      case primitives.common.OrientationType.Left:
      case primitives.common.OrientationType.Right:
        _data.panelSize.invert();
        break;
    }

    return true;
  }

  function stretchToWidth(treeItemsPositions, treeWidth, panelWidth) {
    var offset;
    if (isFamilyChartMode) {
      offset = (panelWidth - treeWidth) / 2.0;
    } else {
      switch (_visualTreeOptions.horizontalAlignment) {
        case primitives.common.HorizontalAlignmentType.Left:
          offset = 0;
          break;
        case primitives.common.HorizontalAlignmentType.Right:
          offset = panelWidth - treeWidth;
          break;
        case primitives.common.HorizontalAlignmentType.Center:
          offset = (panelWidth - treeWidth) / 2.0;
          break;
      }
    }
    translateItemPositions(treeItemsPositions, offset, 0);
  }

  function translateItemPositions(treeItemsPositions, offsetX, offsetY) {
    var treeItemid, treeItemPosition;
    for (treeItemid in _treeItemsPositions) {
      if (_treeItemsPositions.hasOwnProperty(treeItemid)) {
        treeItemPosition = new primitives.orgdiagram.TreeItemPosition(_treeItemsPositions[treeItemid]);
        treeItemPosition.actualPosition.translate(offsetX, offsetY);
        treeItemsPositions[treeItemid] = treeItemPosition;
      }
    }
  }

  function getSizes() {
    var result = [];
    var hash = {};
    for (var itemid in _data.treeItemsPositions) {
      if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
        var treeItemPosition = _data.treeItemsPositions[itemid];
        switch (treeItemPosition.actualVisibility) {
          case primitives.common.Visibility.Normal:
          case primitives.common.Visibility.Dot://ignore jslint
          case primitives.common.Visibility.Line:
            var item = treeItemPosition.actualPosition;
            var size = Math.max(item.width, item.height);
            if (!hash.hasOwnProperty(size)) {
              hash[size] = true;
              result.push(size);
            }
        }
      }
    }
    return result;
  }

  function getSpatialIndex() {
    if (_spatialIndex == null) {
      _spatialIndex = primitives.common.SpatialIndex(getSizes());
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case primitives.common.Visibility.Normal:
              case primitives.common.Visibility.Dot://ignore jslint
              case primitives.common.Visibility.Line:
                var rect = new primitives.common.Rect(treeItemPosition.actualPosition);
                rect.context = itemid;
                _spatialIndex.addRect(rect);
            }
          }
        }
      }
    }
    return _spatialIndex;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null,
      bestDistance = null, distance,
      scale = _scaleOptions.scale,
      spatialIndex = getSpatialIndex(),
      selection,
      center;

    x = x / scale;
    y = y / scale;
    selection = new primitives.common.Rect(x, y, 0, 0);
    center = new primitives.common.Point(x, y);
    selection.offset(gravityRadius, gravityRadius, gravityRadius, gravityRadius);

    spatialIndex.loopArea(this, selection, function (rect) {
      var itemid = rect.context;
      if (rect.contains(x, y)) {
        result = itemid;
        return true;
      }
      var treeItemPosition = _data.treeItemsPositions[itemid];
      switch (treeItemPosition.actualVisibility) {
        case primitives.common.Visibility.Dot://ignore jslint
        case primitives.common.Visibility.Line:
          var distance = center.distanceTo(rect.horizontalCenter(), rect.verticalCenter());
          if (bestDistance == null || distance < bestDistance) {
            bestDistance = distance;
            result = itemid;
          }
      }
    });

    return result;
  }

  function getKeyboardNavigationManager() {
    if (_keyboardNavigationManager == null) {
      _keyboardNavigationManager = primitives.common.KeyboardNavigationManager();
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case primitives.common.Visibility.Normal:
                var rect = new primitives.common.Rect(treeItemPosition.actualPosition);
                _keyboardNavigationManager.addRect(rect, itemid);
            }
          }
        }
      }
    }
    return _keyboardNavigationManager;
  }

  function getNextItem(cursorItem, direction) {
    var manager = getKeyboardNavigationManager(),
      result;

    switch (direction) {
      case primitives.common.OrientationType.Top:
        result = manager.getItemAbove(cursorItem);
        break;
      case primitives.common.OrientationType.Bottom:
        result = manager.getItemBelow(cursorItem);
        break;
      case primitives.common.OrientationType.Left:
        result = manager.getItemOnLeft(cursorItem);
        break;
      case primitives.common.OrientationType.Right:
        result = manager.getItemOnRight(cursorItem);
        break;
    }

    return result;
  }

  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.panelSize;
  }

  return {
    process: process,
    getItemPosition: getItemPosition,
    getItemsPositions: getItemsPositions,
    getContentSize: getContentSize,

    getTreeItemForMousePosition: getTreeItemForMousePosition,
    getNextItem: getNextItem
  };
};