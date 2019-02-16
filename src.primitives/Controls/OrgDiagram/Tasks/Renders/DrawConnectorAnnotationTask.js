primitives.orgdiagram.DrawConnectorAnnotationTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
  orientationOptionTask, connectorAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
  var _graphics,
    _transform,
    _orientationOptions,
    _annotationLabelTemplate,
    _panelSize;

  function process() {

    _graphics = getGraphics();

    _transform = createTranfromTask.getTransform();
    _orientationOptions = orientationOptionTask.getOptions();

    _annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

    _panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());

    switch (zOrderType) {
      case primitives.common.ZOrderType.Background://ignore jslint
        _graphics.reset("placeholder", primitives.common.Layers.BackgroundConnectorAnnotation);
        break;
      case primitives.common.ZOrderType.Foreground://ignore jslint
        _graphics.reset("placeholder", primitives.common.Layers.ForegroundConnectorAnnotation);
        break;
    }

    drawAnnotations(connectorAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

    return false;
  }

  function drawAnnotations(annotations, getItemPosition) {
    var panel,
      index, len,
      layer = primitives.common.Layers.ForegroundConnectorAnnotation,
      fromItemPosition, fromActualPosition,
      toItemPosition, toActualPosition,
      shape,
      annotationConfig,
      uiHash,
      buffer = new primitives.common.PolylinesBuffer(),
      labelPlacement,
      connectorAnnotationOffsetResolver = primitives.orgdiagram.ConnectorAnnotationOffsetResolver(),
      maximumLineWidth = 0;

    switch (zOrderType) {
      case primitives.common.ZOrderType.Background://ignore jslint
        panel = _graphics.activate("placeholder", primitives.common.Layers.BackgroundConnectorAnnotation);
        break;
      case primitives.common.ZOrderType.Foreground://ignore jslint
        panel = _graphics.activate("placeholder", primitives.common.Layers.ForegroundConnectorAnnotation);
        break;
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];
      maximumLineWidth = Math.max(maximumLineWidth, annotationConfig.lineWidth);
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];

      if (annotationConfig.fromItem != null && annotationConfig.toItem != null) {
        fromItemPosition = getItemPosition(annotationConfig.fromItem);
        toItemPosition = getItemPosition(annotationConfig.toItem);
        if (fromItemPosition != null && toItemPosition != null) {
          fromActualPosition = fromItemPosition.actualPosition;
          toActualPosition = toItemPosition.actualPosition;

          switch (annotationConfig.connectorPlacementType) {
            case primitives.common.ConnectorPlacementType.Offbeat:
              shape = new primitives.common.ConnectorOffbeat();
              break;
            case primitives.common.ConnectorPlacementType.Straight:
              shape = new primitives.common.ConnectorStraight();
              break;
          }

          /* rotate label size to user orientation */
          var labelSize;
          _transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
            this, function (x, y, width, height) {
              labelSize = new primitives.common.Size(width, height);
            });

          /* rotate panel size to user orientation */
          var panelSize = null;
          _transform.transformRect(0, 0, _panelSize.width, _panelSize.height, false,
            this, function (x, y, width, height) {
              panelSize = new primitives.common.Size(width, height);
            });

          var linePaletteItem = new primitives.common.PaletteItem({
            lineColor: annotationConfig.color,
            lineWidth: annotationConfig.lineWidth,
            lineType: annotationConfig.lineType
          });

          var hasLabel = !primitives.common.isNullOrEmpty(annotationConfig.label);

          /* offset rectangles */
          var fromRect = new primitives.common.Rect(fromActualPosition).offset(annotationConfig.offset);
          var toRect = new primitives.common.Rect(toActualPosition).offset(annotationConfig.offset);

          var linesOffset = annotationConfig.lineWidth * 3;
          var bundleOffset = maximumLineWidth * 6;

          /* create connection lines */
          shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize,
            annotationConfig.connectorShapeType, 4 /*labelOffset*/, annotationConfig.labelPlacementType, hasLabel,
            connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
              var hasLabel = !primitives.common.isNullOrEmpty(labelConfig.label);
              if (hasLabel && labelPlacement != null) {
                /* translate result label placement back to users orientation */
                _transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
                  this, function (x, y, width, height) {
                    labelPlacement = new primitives.common.Rect(x, y, width, height);
                  });

                uiHash = new primitives.common.RenderEventArgs();
                uiHash.context = labelConfig;

                /* draw label */
                _graphics.template(
                  labelPlacement.x
                  , labelPlacement.y
                  , 0
                  , 0
                  , 0
                  , 0
                  , labelPlacement.width
                  , labelPlacement.height
                  , _annotationLabelTemplate.template()
                  , _annotationLabelTemplate.getHashCode()
                  , _annotationLabelTemplate.render
                  , uiHash
                  , null
                );
              }
            }, annotationConfig);
        }
      }
    }

    connectorAnnotationOffsetResolver.resolve();


    /* translate result polylines back to users orientation */
    buffer.transform(_transform, true);
    /* draw background polylines */
    _graphics.polylinesBuffer(buffer);
  }

  return {
    process: process
  };
};