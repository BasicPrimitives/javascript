import Rect from '../../graphics/structs/Rect';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers, Visibility } from '../../enums';

export default function DrawHighlightTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  combinedContextsTask,
  alignDiagramTask, itemTemplateParamsTask,
  highlightItemTask, cursorItemTask, selectedItemsTask) {
  var _graphics,
    _transform;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("placeholder", Layers.Highlight);

    if (treeItemId != null) {
      _transform = createTransformTask.getTransform();
      drawHighlight(treeItemId);
    }

    return false;
  }

  function drawHighlight(treeItemId) {
    var uiHash,
      panel = _graphics.activate("placeholder", Layers.Highlight),
      treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
      actualPosition = treeItemPosition.actualPosition,
      templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
      template = templateParams.template,
      templateConfig = template.templateConfig,
      highlightPadding = templateConfig.highlightPadding;

    uiHash = new RenderEventArgs();
    uiHash.context = combinedContextsTask.getConfig(treeItemId);
    uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
    uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
    uiHash.templateName = templateConfig.name;

    _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
      this, function (x, y, width, height) {
        var position = new Rect(0, 0, Math.round(width), Math.round(height));
        position.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);

        var element;
        if (treeItemPosition.actualVisibility == Visibility.Normal) {
          element = _graphics.template(
            x
            , y
            , width
            , height
            , position.x
            , position.y
            , position.width
            , position.height
            , template.highlightTemplate.template()
            , template.highlightTemplate.getHashCode()
            , template.highlightTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.highlightBorderWidth }
          );
        } else {
          element = _graphics.template(
            Math.round(x)
            , Math.round(y)
            , Math.round(width)
            , Math.round(height)
            , Math.round(position.x)
            , Math.round(position.y)
            , Math.round(position.width)
            , Math.round(position.height)
            , template.dotHighlightTemplate.template()
            , template.dotHighlightTemplate.getHashCode()
            , template.dotHighlightTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.highlightBorderWidth }
          );
        }
      });
  }

  return {
    process: process
  };
};