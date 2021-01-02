import SpatialIndex from '../../algorithms/SpatialIndex';
import Thickness from '../../graphics/structs/Thickness';
import Size from '../../graphics/structs/Size';
import Point from '../../graphics/structs/Point';
import Rect from '../../graphics/structs/Rect';

export default function ProjectItemsToFrameTask(createTransformTask, frameSizeTask,
  applyLayoutChangesTask, scaleOptionTask,
  alignDiagramTask, centerOnCursorTask,
  itemTemplateParamsTask,
  selectedItemsTask) {

  var _data = {
    positions: {}
  },
  _scaleOptions,
  _spatialIndex;

  function process() {
    var positions = alignDiagramTask.getItemsPositions(),
      transform = createTransformTask.getTransform();

    _scaleOptions = scaleOptionTask.getOptions(),
    _spatialIndex = null;
    _data.positions = [];

    var medianPosition = getFrameMedianPosition(),
      selectedItems = selectedItemsTask.getItems();

    if(medianPosition != null) {
      for(var index = 0, len = selectedItems.length; index < len; index+=1) {
        var treeItemId = selectedItems[index],
          treeItemPosition = positions[treeItemId],
          actualPosition = treeItemPosition.actualPosition;

        transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
          this, function (x, y, width, height) {
            var nodePosition = new Rect(x, y, width, height);
            if (!medianPosition.rect.overlaps(nodePosition)) {
              var projectionPoint = medianPosition.rect.getProjectionPoint(nodePosition.centerPoint());
              if (projectionPoint != null) {
                // node position is not scaled, scaling is done with CSS
                var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
                    templateConfig = templateParams.template.templateConfig,
                    markerSize = new Size(templateConfig.minimizedItemSize),
                    markerProjectionRect = new Rect(
                      projectionPoint.x - markerSize.width / 2, 
                      projectionPoint.y - markerSize.height / 2, 
                      markerSize.width, 
                      markerSize.height);
  
                markerProjectionRect.translate(- medianPosition.offset.x, - medianPosition.offset.y);
                _data.positions[treeItemId] = markerProjectionRect;
              }
            }
          });
      }
    }
    return true;
  }

  function getFrameMedianPosition() {
    var result = null;
    if (centerOnCursorTask != null) {
      var scale = _scaleOptions.scale,
        placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
        scrollPanelSize = new Size(applyLayoutChangesTask.getScrollPanelSize()),
        frameThickness = new Thickness(applyLayoutChangesTask.getFrameThickness()),
        frameBaseOffset = new Thickness(applyLayoutChangesTask.getFrameOffset()),
        medianThickness = new Thickness(frameSizeTask.getMedian());

      if(!frameThickness.isEmpty()) {
        placeholderOffset.scale(1.0 / scale);
        frameThickness.scale(1.0 / scale);
        frameBaseOffset.scale(1.0 / scale);
        scrollPanelSize.scale(1.0 / scale);
        medianThickness.scale(1.0 / scale);

        var frameOffset = new Point(placeholderOffset.x - frameBaseOffset.left - frameThickness.left, placeholderOffset.y - frameBaseOffset.top - frameThickness.top);

        var medianRect = new Rect(placeholderOffset.x, placeholderOffset.y, scrollPanelSize.width, scrollPanelSize.height);
        medianRect.offset(frameBaseOffset);
        medianRect.offset(medianThickness);

        result = {
          offset: frameOffset,
          rect: medianRect         
        }
      }
    }
    return result;
  }

  function getSizes() {
    var result = [];
    var hash = {};
    for (var treeItemId in _data.positions) {
      if(_data.positions.hasOwnProperty(treeItemId)) {
        var rect = _data.positions[treeItemId];
        var size = Math.max(rect.width, rect.height);
        if (!hash.hasOwnProperty(size)) {
          hash[size] = true;
          result.push(size);
        }
      }
    }
    return result;
  }

  function getSpatialIndex() {
    if (_spatialIndex == null) {
      _spatialIndex = SpatialIndex(getSizes());
      for (var treeItemId in _data.positions) {
        if(_data.positions.hasOwnProperty(treeItemId)) {
          var rect = _data.positions[treeItemId];
          rect.context = treeItemId;
          _spatialIndex.addRect(rect);
        }
      }
    }
    return _spatialIndex;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null,
      bestDistance = null,
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
      var distance = center.distanceTo(rect.horizontalCenter(), rect.verticalCenter());
      if (bestDistance == null || distance < bestDistance) {
        bestDistance = distance;
        result = itemid;
      }
    });

    return result;
  }

  function getPositions() {
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    getTreeItemForMousePosition: getTreeItemForMousePosition,
    process: process
  };
};