import Point from '../../graphics/structs/Point';
import Rect from '../../graphics/structs/Rect';
import Size from '../../graphics/structs/Size';
import Thickness from '../../graphics/structs/Thickness';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers, Visibility, Enabled, PlacementType, OrientationType } from '../../enums';
import Callout from '../../graphics/shapes/Callout';
import { isNullOrEmpty } from '../../common';

export default function DrawHighlightAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask, scaleOptionTask,
  combinedContextsTask,
  calloutOptionTask,
  readTemplatesTask,
  alignDiagramTask, centerOnCursorTask,
  highlightItemTask, cursorItemTask, selectedItemsTask, frameSizeTask) {
  var _graphics,
    _transform,
    _calloutShape = new Callout(getGraphics()),
    _options;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("calloutplaceholder", Layers.Annotation);

    if (treeItemId !== null) {
      _transform = createTransformTask.getTransform();
      _options = calloutOptionTask.getOptions();

      drawHighlightAnnotation(treeItemId);
    }
    return false;
  }

  function drawHighlightAnnotation(treeItemId) {
    var panel,
      itemConfig,
      calloutPanelPosition,
      position,
      uiHash,
      calloutTemplateName,
      calloutTemplate,
      showCallout = true,
      treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
      actualPosition = treeItemPosition.actualPosition;


    switch (treeItemPosition.actualVisibility) {
      case Visibility.Dot:
      case Visibility.Line:
      case Visibility.Normal:
        itemConfig = calloutOptionTask.getItemOptions(treeItemId);

        switch (itemConfig.showCallout) {
          case Enabled.False:
            showCallout = false;
            break;
          case Enabled.True:
            showCallout = false;
            break;
          default:
            showCallout = _options.showCallout;
            break;
        }

        if (showCallout) {
          panel = _graphics.activate("placeholder", Layers.Item);

          _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
            this, function (x, y, width, height) {
              var snapRect = new Rect(x, y, width, height),
                snapPoint = new Point(snapRect.centerPoint()),
                { medianRect, viewPortRect } = getFrameMedianPosition(),
                projectionPoint = medianRect.getProjectionPoint(snapRect.centerPoint());

              if(projectionPoint == null) {
                /* snapPoint is inside viewport, no need to project */
                projectionPoint = snapPoint;
              }
              if ((treeItemPosition.actualVisibility >= _options.calloutMaximumVisibility && treeItemPosition.actualVisibility != Visibility.Invisible) || !medianRect.overlaps(snapRect)) {

                calloutTemplateName = !isNullOrEmpty(itemConfig.calloutTemplateName) ? itemConfig.calloutTemplateName :
                  !isNullOrEmpty(itemConfig.templateName) ? itemConfig.templateName :
                    !isNullOrEmpty(_options.defaultCalloutTemplateName) ? _options.defaultCalloutTemplateName :
                      _options.defaultTemplateName;

                calloutTemplate = readTemplatesTask.getTemplate(calloutTemplateName, readTemplatesTask.DefaultWidgetTemplateName);

                position = getAnnotationPosition(projectionPoint, viewPortRect, calloutTemplate.templateConfig.itemSize);

                /* position callout div placeholder */
                calloutPanelPosition = new Rect(position);
                calloutPanelPosition.addRect(projectionPoint.x, projectionPoint.y);
                calloutPanelPosition.offset(50);

                /* recalculate geometries */
                projectionPoint.x -= calloutPanelPosition.x;
                projectionPoint.y -= calloutPanelPosition.y;
                position.x -= calloutPanelPosition.x;
                position.y -= calloutPanelPosition.y;

                uiHash = new RenderEventArgs();
                uiHash.context = combinedContextsTask.getConfig(treeItemId);
                uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
                uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
                uiHash.templateName = calloutTemplate.templateConfig.name;
                _graphics.show("calloutplaceholder");
                panel = _graphics.activate("calloutplaceholder", Layers.Annotation);
                _graphics.position("calloutplaceholder", calloutPanelPosition.x, calloutPanelPosition.y, calloutPanelPosition.width, calloutPanelPosition.height);
                _graphics.template(
                  position.x
                  , position.y
                  , position.width
                  , position.height
                  , 0
                  , 0
                  , position.width
                  , position.height
                  , calloutTemplate.itemTemplate.template()
                  , calloutTemplate.itemTemplate.getHashCode()
                  , calloutTemplate.itemTemplate.render
                  , uiHash
                  , null
                );

                _calloutShape.pointerPlacement = PlacementType.Auto;
                _calloutShape.cornerRadius = _options.calloutCornerRadius;
                _calloutShape.offset = _options.calloutOffset;
                _calloutShape.opacity = _options.calloutOpacity;
                _calloutShape.lineWidth = _options.calloutLineWidth;
                _calloutShape.pointerWidth = _options.calloutPointerWidth;
                _calloutShape.borderColor = _options.calloutBorderColor;
                _calloutShape.fillColor = _options.calloutfillColor;
                _calloutShape.draw(projectionPoint, position);
              } else {
                _graphics.hide("calloutplaceholder");
              }
            }
          );
        } else {
          _graphics.hide("calloutplaceholder");
        }
        break;
      case Visibility.Invisible:
        _graphics.hide("calloutplaceholder");
        break;
    }
  }

  function getFrameMedianPosition() {
    var scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale,
      placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
      scrollPanelSize = new Size(applyLayoutChangesTask.getScrollPanelSize()),
      frameBaseOffset = new Thickness(applyLayoutChangesTask.getFrameOffset()),
      medianThickness = new Thickness(frameSizeTask.getMedian());

    
    placeholderOffset.scale(1.0 / scale);
    frameBaseOffset.scale(1.0 / scale);
    scrollPanelSize.scale(1.0 / scale);
    medianThickness.scale(1.0 / scale);

    var viewPortRect = new Rect(placeholderOffset.x, placeholderOffset.y, scrollPanelSize.width, scrollPanelSize.height);
    var medianRect = new Rect(viewPortRect);
    medianRect.offset(frameBaseOffset);
    medianRect.offset(medianThickness);

    return { 
      medianRect: medianRect,
      viewPortRect: viewPortRect
    };
  }

  function getAnnotationPosition(snapPoint, panelRect, itemSize) {
    var result = new Rect(snapPoint.x, snapPoint.y, itemSize.width, itemSize.height);

    switch (_options.orientationType) {
      case OrientationType.Top:
      case OrientationType.Bottom:
        result.y -= (itemSize.height / 4.0);
        if (snapPoint.x < panelRect.horizontalCenter()) {
          result.x += _options.calloutPlacementOffset;
        }
        else {
          result.x -= (_options.calloutPlacementOffset + itemSize.width);
        }
        break;
      default:
        result.x -= (itemSize.width / 4.0);
        if (snapPoint.y < panelRect.verticalCenter()) {
          result.y += _options.calloutPlacementOffset;
        }
        else {
          result.y -= (_options.calloutPlacementOffset + itemSize.height);
        }
        break;
    }

    // If annotation clipped then move it back into view port
    if (result.x < panelRect.x) {
      result.x = panelRect.x + _options.calloutPlacementOffset;
    }
    else if (result.right() > panelRect.right()) {
      result.x -= (result.right() - panelRect.right() + _options.calloutPlacementOffset);
    }

    if (result.y < panelRect.y) {
      result.y = panelRect.y + _options.calloutPlacementOffset;
    }
    else if (result.bottom() > panelRect.bottom()) {
      result.y -= (result.bottom() - panelRect.bottom() + _options.calloutPlacementOffset);
    }

    return result;
  }

  return {
    process: process
  };
};