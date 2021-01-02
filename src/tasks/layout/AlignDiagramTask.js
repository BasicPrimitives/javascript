import Size from '../../graphics/structs/Size';
import Rect from '../../graphics/structs/Rect';
import Point from '../../graphics/structs/Point';
import TreeItemPosition from '../../models/TreeItemPosition';
import { OrientationType, Visibility, HorizontalAlignmentType, PageFitMode } from '../../enums';
import SpatialIndex from '../../algorithms/SpatialIndex';
import KeyboardNavigationManager from '../../managers/KeyboardNavigationManager';

export default function AlignDiagramTask(orientationOptionTask, itemsSizesOptionTask, visualTreeOptionTask, scaleOptionTask,
  currentControlSizeTask, activeItemsTask, itemsPositionsTask, isFamilyChartMode) {
  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    panelSize: null // Rect();
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
    var placeholderSize = new Size(itemsPositionsTask.getContentSize()),
      { optimalPanelSize } = currentControlSizeTask.getOptions(),
      panelSize = new Size(optimalPanelSize);

    _spatialIndex = null;
    _keyboardNavigationManager = null;

    _activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};
    _treeItemsPositions = itemsPositionsTask.getItemsPositions();

    _options = itemsSizesOptionTask.getOptions();
    _orientationOptions = orientationOptionTask.getOptions();
    _visualTreeOptions = visualTreeOptionTask.getOptions();
    _scaleOptions = scaleOptionTask.getOptions();

    switch (_orientationOptions.orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        panelSize.invert();
        break;
    }

    panelSize.scale(1.0 / _scaleOptions.scale);

    // By default we translate everything forward
    _data.panelSize = panelSize;
    _data.treeItemsPositions = _treeItemsPositions;

    switch (_options.pageFitMode) {
      case PageFitMode.AutoSize:
        _data.panelSize = new Size(placeholderSize);
        break;
      default:
        _data.panelSize = new Size(placeholderSize);
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
      case OrientationType.Left:
      case OrientationType.Right:
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
        case HorizontalAlignmentType.Left:
          offset = 0;
          break;
        case HorizontalAlignmentType.Right:
          offset = panelWidth - treeWidth;
          break;
        case HorizontalAlignmentType.Center:
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
        treeItemPosition = new TreeItemPosition(_treeItemsPositions[treeItemid]);
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
          case Visibility.Normal:
          case Visibility.Dot://ignore jslint
          case Visibility.Line:
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
      _spatialIndex = SpatialIndex(getSizes());
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Normal:
              case Visibility.Dot://ignore jslint
              case Visibility.Line:
                var rect = new Rect(treeItemPosition.actualPosition);
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
    selection = new Rect(x, y, 0, 0);
    center = new Point(x, y);
    selection.offset(gravityRadius, gravityRadius, gravityRadius, gravityRadius);

    spatialIndex.loopArea(this, selection, function (rect) {
      var itemid = rect.context;
      if (rect.contains(x, y)) {
        result = itemid;
        return true;
      }
      var treeItemPosition = _data.treeItemsPositions[itemid];
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot://ignore jslint
        case Visibility.Line:
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
      _keyboardNavigationManager = KeyboardNavigationManager();
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Normal:
                var rect = new Rect(treeItemPosition.actualPosition);
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
      case OrientationType.Top:
        result = manager.getItemAbove(cursorItem);
        break;
      case OrientationType.Bottom:
        result = manager.getItemBelow(cursorItem);
        break;
      case OrientationType.Left:
        result = manager.getItemOnLeft(cursorItem);
        break;
      case OrientationType.Right:
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