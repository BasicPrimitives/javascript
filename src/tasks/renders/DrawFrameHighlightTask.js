import Rect from '../../graphics/structs/Rect';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers } from '../../enums';

export default function DrawFrameHighlightTask(getGraphics, projectItemsToFrameTask,
  combinedContextsTask,
  itemTemplateParamsTask,
  highlightItemTask, cursorItemTask) {
  var _graphics;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("frameplaceholder", Layers.Highlight);

    if (treeItemId != null) {
      drawHighlight(treeItemId);
    }

    return false;
  }

  function drawHighlight(treeItemId) {
    var uiHash,
      positions = projectItemsToFrameTask.getPositions(),
      position = positions[treeItemId];
    if(position != null) {
      var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
        template = templateParams.template,
        templateConfig = template.templateConfig,
        highlightPadding = templateConfig.highlightPadding;

      _graphics.activate("frameplaceholder", Layers.Highlight)

      uiHash = new RenderEventArgs();
      uiHash.context = combinedContextsTask.getConfig(treeItemId);
      uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
      uiHash.isSelected = true;
      uiHash.templateName = templateConfig.name;

      var contentPosition = new Rect(0, 0, Math.round(position.width), Math.round(position.height));
      contentPosition.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);

      _graphics.template(
        Math.round(position.x)
        , Math.round(position.y)
        , Math.round(position.width)
        , Math.round(position.height)
        , Math.round(contentPosition.x)
        , Math.round(contentPosition.y)
        , Math.round(contentPosition.width)
        , Math.round(contentPosition.height)
        , template.dotHighlightTemplate.template()
        , template.dotHighlightTemplate.getHashCode()
        , template.dotHighlightTemplate.render
        , uiHash
        , { "borderWidth": templateConfig.highlightBorderWidth }
      );
    }
  }

  return {
    process: process
  };
};