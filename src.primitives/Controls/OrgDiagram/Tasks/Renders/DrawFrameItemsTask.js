primitives.orgdiagram.DrawFrameItemsTask = function (getGraphics, applyLayoutChangesTask, projectItemsToFrameTask, itemTemplateParamsTask, minimizedItemsOptionTask) {

  var _graphics;

  function process() {
    var frameThickness = new primitives.common.Thickness(applyLayoutChangesTask.getFrameThickness());

    _graphics = getGraphics();
    _graphics.reset("frameplaceholder", primitives.common.Layers.Marker);

    if(!frameThickness.isEmpty()) {
      drawFrameItems();
    }
    return false;
  }

  function drawFrameItems() {
    var markers = new primitives.common.PolylinesBuffer(),
      positions = projectItemsToFrameTask.getPositions(),
      options = minimizedItemsOptionTask.getOptions(),
      marker = new primitives.common.Marker(),
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
        itemTitleColor = itemTitleColor || templateConfig.minimizedItemBorderColor || primitives.common.Colors.Navy;
        itemFillColor = itemFillColor || templateConfig.minimizedItemFillColor || primitives.common.Colors.Navy;
        if (minimizedItemShapeType == null) {
          minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : options.minimizedItemShapeType);
        }
        minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? templateConfig.minimizedItemSize.width : templateConfig.minimizedItemCornerRadius;

        if (minimizedItemShapeType == null || minimizedItemShapeType == primitives.common.ShapeType.None) {
          polyline = markers.getPolyline(new primitives.common.PaletteItem({
            'lineColor': itemTitleColor,
            'lineWidth': templateConfig.minimizedItemLineWidth,
            'lineType': templateConfig.minimizedItemLineType,
            'fillColor': itemFillColor,
            'opacity': templateConfig.minimizedItemOpacity
          }));
          polyline.addSegment(new primitives.common.DotSegment(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, minimizedItemCornerRadius));
        } else {
          marker.draw(markers, minimizedItemShapeType, actualPosition,
            new primitives.common.PaletteItem({
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
    _graphics.activate("frameplaceholder", primitives.common.Layers.Marker);
    _graphics.polylinesBuffer(markers);
  }

  return {
    process: process
  };
};