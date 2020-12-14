import Thickness from '../../graphics/structs/Thickness';
import { Layers, Colors, ShapeType } from '../../enums';
import PolylinesBuffer from '../../graphics/structs/PolylinesBuffer';
import DotSegment from '../../graphics/structs/DotSegment';
import PaletteItem from '../../graphics/structs/PaletteItem';
import Marker from '../../graphics/shapes/Marker';

export default function DrawFrameItemsTask(getGraphics, applyLayoutChangesTask, projectItemsToFrameTask, itemTemplateParamsTask, minimizedItemsOptionTask) {

  var _graphics;

  function process() {
    var frameThickness = new Thickness(applyLayoutChangesTask.getFrameThickness());

    _graphics = getGraphics();
    _graphics.reset("frameplaceholder", Layers.Marker);

    if(!frameThickness.isEmpty()) {
      drawFrameItems();
    }
    return false;
  }

  function drawFrameItems() {
    var markers = new PolylinesBuffer(),
      positions = projectItemsToFrameTask.getPositions(),
      options = minimizedItemsOptionTask.getOptions(),
      marker = new Marker(),
      polyline;

    for (var treeItemId in positions) {
      if(positions.hasOwnProperty(treeItemId)) {
        var actualPosition = positions[treeItemId],
          templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
          templateConfig = templateParams.template.templateConfig,
          minimizedItemsOptions = minimizedItemsOptionTask.getItemOptions(treeItemId),
          itemTitleColor = null,
          itemFillColor = null,
          minimizedItemShapeType = null,
          minimizedItemCornerRadius = 0;

        /* use individual item options first */
        if (minimizedItemsOptions != null) {
          itemTitleColor = minimizedItemsOptions.itemTitleColor;
          itemFillColor = minimizedItemsOptions.itemTitleColor;
          minimizedItemShapeType = minimizedItemsOptions.minimizedItemShapeType;
        }

        /* use template config & control options next */
        itemTitleColor = itemTitleColor || templateConfig.minimizedItemBorderColor || Colors.Navy;
        itemFillColor = itemFillColor || templateConfig.minimizedItemFillColor || Colors.Navy;
        if (minimizedItemShapeType == null) {
          minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : options.minimizedItemShapeType);
        }
        minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? templateConfig.minimizedItemSize.width : templateConfig.minimizedItemCornerRadius;

        if (minimizedItemShapeType == null || minimizedItemShapeType == ShapeType.None) {
          polyline = markers.getPolyline(new PaletteItem({
            'lineColor': itemTitleColor,
            'lineWidth': templateConfig.minimizedItemLineWidth,
            'lineType': templateConfig.minimizedItemLineType,
            'fillColor': itemFillColor,
            'opacity': templateConfig.minimizedItemOpacity
          }));
          polyline.addSegment(new DotSegment(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, minimizedItemCornerRadius));
        } else {
          marker.draw(markers, minimizedItemShapeType, actualPosition,
            new PaletteItem({
              'lineColor': itemTitleColor,
              'lineWidth': templateConfig.minimizedItemLineWidth,
              'lineType': templateConfig.minimizedItemLineType,
              'fillColor': itemFillColor,
              'opacity': templateConfig.minimizedItemOpacity
            })
          );
        }
      }
    }
    _graphics.activate("frameplaceholder", Layers.Marker);
    _graphics.polylinesBuffer(markers);
  }

  return {
    process: process
  };
};