import Size from '../../graphics/structs/Size';
import Rect from '../../graphics/structs/Rect';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers, ZOrderType, ConnectorPlacementType, Enabled } from '../../enums';
import PolylinesBuffer from '../../graphics/structs/PolylinesBuffer';
import PaletteItem from '../../graphics/structs/PaletteItem';
import ConnectorAnnotationOffsetResolver from './offsetResolver/ConnectorAnnotationOffsetResolver';
import ConnectorStraight from '../../graphics/shapes/ConnectorStraight';
import ConnectorOffbeat from '../../graphics/shapes/ConnectorOffbeat';
import { isNullOrEmpty } from '../../common';


export default function DrawConnectorAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  orientationOptionTask, connectorAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, cursorItemOptionTask, endPointsOptionTask, endPointTemplateTask, zOrderType) {
  var _graphics,
    _transform,
    _orientationOptions,
    _endPointsOptions,
    _annotationLabelTemplate,
    _endPointTemplate,
    _panelSize;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    _orientationOptions = orientationOptionTask.getOptions();
    _endPointsOptions = endPointsOptionTask.getOptions();
    _annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();
    _endPointTemplate = endPointTemplateTask.getTemplate();

    _panelSize = new Size(alignDiagramTask.getContentSize());

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        _graphics.reset("placeholder", Layers.BackgroundConnectorAnnotation);
        break;
      case ZOrderType.Foreground://ignore jslint
        _graphics.reset("placeholder", Layers.ForegroundConnectorAnnotation);
        break;
    }
    _graphics.reset("placeholder", Layers.EndPoint);

    drawAnnotations(connectorAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

    return false;
  }

  function drawAnnotations(annotations, getItemPosition) {
    var panel,
      index, len,
      layer = Layers.ForegroundConnectorAnnotation,
      fromItemPosition, fromActualPosition,
      toItemPosition, toActualPosition,
      shape,
      annotationConfig,
      uiHash,
      buffer = new PolylinesBuffer(),
      labelPlacement,
      connectorAnnotationOffsetResolver = ConnectorAnnotationOffsetResolver(),
      maximumLineWidth = 0;

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
            case ConnectorPlacementType.Offbeat:
              shape = new ConnectorOffbeat();
              break;
            case ConnectorPlacementType.Straight:
              shape = new ConnectorStraight();
              break;
          }

          /* rotate label size to user orientation */
          var labelSize;
          _transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
            this, function (x, y, width, height) {
              labelSize = new Size(width, height);
            });

          /* rotate panel size to user orientation */
          var panelSize = null;
          _transform.transformRect(0, 0, _panelSize.width, _panelSize.height, false,
            this, function (x, y, width, height) {
              panelSize = new Size(width, height);
            });

          var linePaletteItem = new PaletteItem({
            lineColor: annotationConfig.color,
            lineWidth: annotationConfig.lineWidth,
            lineType: annotationConfig.lineType
          });

          var hasLabel = !isNullOrEmpty(annotationConfig.label);

          /* offset rectangles */
          var fromRect = new Rect(fromActualPosition).offset(annotationConfig.offset);
          var toRect = new Rect(toActualPosition).offset(annotationConfig.offset);

          var linesOffset = annotationConfig.lineWidth * 3;
          var bundleOffset = maximumLineWidth * 6;

          switch (zOrderType) {
            case ZOrderType.Background://ignore jslint
              _graphics.activate("placeholder", Layers.BackgroundConnectorAnnotation);
              break;
            case ZOrderType.Foreground://ignore jslint
              _graphics.activate("placeholder", Layers.ForegroundConnectorAnnotation);
              break;
          }

          /* create connection lines */
          shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize,
            annotationConfig.connectorShapeType, 4 /*labelOffset*/, annotationConfig.labelPlacementType, hasLabel,
            connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
              var hasLabel = !isNullOrEmpty(labelConfig.label);
              if (hasLabel && labelPlacement != null) {
                /* translate result label placement back to users orientation */
                _transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
                  this, function (x, y, width, height) {
                    labelPlacement = new Rect(x, y, width, height);
                  });

                uiHash = new RenderEventArgs();
                uiHash.context = labelConfig;

                /* draw label */
                switch (labelConfig.zOrderType) {
                  case ZOrderType.Background://ignore jslint
                    _graphics.activate("placeholder", Layers.BackgroundConnectorAnnotation);
                    break;
                  case ZOrderType.Foreground://ignore jslint
                    _graphics.activate("placeholder", Layers.ForegroundConnectorAnnotation);
                    break;
                }
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
            }, annotationConfig,
            function (fromPoint, toPoint, annotationConfig) {
              var cursorItem = cursorItemOptionTask.getCursorItem();
              var hasFromEndpoint = false;
              switch(annotationConfig.showFromEndpoint) {
                case Enabled.True:
                  hasFromEndpoint = true;
                  break;
                case Enabled.Auto:
                  switch (_endPointsOptions.showEndPoints) {
                    case Enabled.True:
                      hasFromEndpoint = true;
                      break;
                    case Enabled.Auto:
                      // Point is visible only when the other end is cursor node
                      hasFromEndpoint = cursorItem !== null && annotationConfig.toItem == cursorItem;
                      break;
                  }
                  break;
              }
              if (hasFromEndpoint && fromPoint != null) {
                //_graphics.activate("placeholder", Layers.EndPoint);
                var isFromEndPoint = true;
                drawEndPoint(fromPoint, annotationConfig, isFromEndPoint);
              }
              var hasToEndpoint = false;
              switch(annotationConfig.showToEndpoint) {
                case Enabled.True:
                  hasToEndpoint = true;
                  break;
                case Enabled.Auto:
                  switch (_endPointsOptions.showEndPoints) {
                    case Enabled.True:
                      hasToEndpoint = true;
                      break;
                    case Enabled.Auto:
                      // Point is visible only when the other end is cursor node
                      hasToEndpoint = cursorItem !== null && annotationConfig.fromItem == cursorItem;
                      break;
                  }
                  break;
              }
              if (hasToEndpoint && toPoint != null) {
                //_graphics.activate("placeholder", Layers.EndPoint);
                var isFromEndPoint = false;
                drawEndPoint(toPoint, annotationConfig, isFromEndPoint);
              }
            }
          );
        }
      }
    }

    connectorAnnotationOffsetResolver.resolve();


    /* translate result polylines back to users orientation */
    buffer.transform(_transform, true);
    /* draw background polylines */
    _graphics.polylinesBuffer(buffer);
  }

  function drawEndPoint(fromPoint, annotationConfig, isFromEndPoint) {
    /* translate result label placement back to users orientation */
    var endPointSize = _endPointsOptions.endPointSize;
    var endPointPlacement = new Rect(fromPoint.x, fromPoint.y, endPointSize.width, endPointSize.height);
    endPointPlacement.translate(- endPointSize.width / 2, - endPointSize.height / 2);
    _transform.transformRect(endPointPlacement.x, endPointPlacement.y, endPointPlacement.width, endPointPlacement.height, true,
      this, function (x, y, width, height) {
        endPointPlacement = new Rect(x, y, width, height);
      });

    let uiHash = new RenderEventArgs();
    uiHash.context = {...annotationConfig, isFromEndPoint};

    /* draw label */
    _graphics.template(
      endPointPlacement.x
      , endPointPlacement.y
      , 0
      , 0
      , 0
      , 0
      , endPointPlacement.width
      , endPointPlacement.height
      , _endPointTemplate.template()
      , _endPointTemplate.getHashCode()
      , _endPointTemplate.render
      , uiHash
      , null
    );
  }

  return {
    process: process
  };
};