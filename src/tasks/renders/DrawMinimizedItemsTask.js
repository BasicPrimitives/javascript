import Rect from '../../graphics/structs/Rect';
import { Layers, Visibility, Colors, ShapeType, LineType } from '../../enums';
import PolylinesBuffer from '../../graphics/structs/PolylinesBuffer';
import DotSegment from '../../graphics/structs/DotSegment';
import PaletteItem from '../../graphics/structs/PaletteItem';
import Marker from '../../graphics/shapes/Marker';

export default function DrawMinimizedItemsTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  minimizedItemsOptionTask, itemTemplateParamsTask, alignDiagramTask) {
  var _graphics,
    _transform,
    _debug = false,
    _options,
    _positions;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    _options = minimizedItemsOptionTask.getOptions();
    _positions = alignDiagramTask.getItemsPositions();

    _graphics.reset("placeholder", Layers.Marker);

    drawMinimizedItems();

    return false;
  }

  function drawMinimizedItems() {
    var markers = new PolylinesBuffer(),
      paletteItems = {},
      polyline,
      marker = new Marker(),
      itemTitleColor,
      itemFillColor,
      minimizedItemShapeType,
      minimizedItemCornerRadius,
      treeItemPosition,
      actualPosition,
      minimizedItemsOptions,
      templateParams,
      templateConfig;

    for (var treeItemId in _positions) {
      if (_positions.hasOwnProperty(treeItemId)) {
        treeItemPosition = _positions[treeItemId],
          actualPosition = treeItemPosition.actualPosition,
          minimizedItemsOptions = minimizedItemsOptionTask.getItemOptions(treeItemId);

        _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
          this, function (x, y, width, height) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Dot:
                templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId);
                templateConfig = templateParams.template.templateConfig;

                itemTitleColor = null;
                itemFillColor = null;
                minimizedItemShapeType = null;
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
                  minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : _options.minimizedItemShapeType);
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
                  polyline.addSegment(new DotSegment(x, y, width, height, minimizedItemCornerRadius));
                } else {
                  marker.draw(markers, minimizedItemShapeType, new Rect(x, y, width, height),
                    new PaletteItem({
                      'lineColor': itemTitleColor,
                      'lineWidth': templateConfig.minimizedItemLineWidth,
                      'lineType': templateConfig.minimizedItemLineType,
                      'fillColor': itemFillColor,
                      'opacity': templateConfig.minimizedItemOpacity
                    })
                  );
                }
                break;
              default:
                if (_debug) {
                  itemTitleColor = Colors.Red;
                  if (!paletteItems.hasOwnProperty(itemTitleColor)) {
                    paletteItems[itemTitleColor] = new PaletteItem({
                      'lineColor': itemTitleColor,
                      'lineWidth': 1,
                      'lineType': LineType.Solid,
                      'fillColor': itemTitleColor,
                      'opacity': 1
                    });
                  }
                  polyline = markers.getPolyline(paletteItems[itemTitleColor]);
                  polyline.addSegment(new DotSegment(x - 1, y - 1, 2, 2, 1));
                }
                break;
            }
          });//ignore jslint
      }
    }


    _graphics.activate("placeholder", Layers.Marker);
    _graphics.polylinesBuffer(markers);
  }

  return {
    process: process
  };
};