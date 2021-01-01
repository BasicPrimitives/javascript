import Rect from '../../graphics/structs/Rect';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers } from '../../enums';

export default function DrawCursorTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  combinedContextsTask,
  alignDiagramTask, itemTemplateParamsTask,
  cursorItemTask, selectedItemsTask) {
  var _graphics,
    _transform;

  function process() {
    var treeItemId = cursorItemTask.getCursorTreeItem();

    _graphics = getGraphics();
    _graphics.reset("placeholder", Layers.Cursor);

    if (treeItemId != null) {
      _transform = createTransformTask.getTransform();

      drawCursor(treeItemId);
    }
    return false;
  }

  function drawCursor(treeItemId) {
    var treeItem,
      uiHash,
      panel = _graphics.activate("placeholder", Layers.Cursor),
      treeItemPosition = alignDiagramTask.getItemPosition(treeItemId);
    if (treeItemPosition != null) {
      var actualPosition = treeItemPosition.actualPosition,
        position = new Rect(treeItemPosition.contentPosition),
        templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
        template = templateParams.template,
        templateConfig = template.templateConfig,
        cursorPadding = templateConfig.cursorPadding;

      position.offset(cursorPadding.left, cursorPadding.top, cursorPadding.right, cursorPadding.bottom);

      uiHash = new RenderEventArgs();
      uiHash.context = combinedContextsTask.getConfig(treeItemId);
      uiHash.isCursor = true;
      uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
      uiHash.templateName = templateConfig.name;

      _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
        this, function (x, y, width, height) {
          var element = _graphics.template(
            x
            , y
            , width
            , height
            , position.x
            , position.y
            , position.width
            , position.height
            , template.cursorTemplate.template()
            , template.cursorTemplate.getHashCode()
            , template.cursorTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.cursorBorderWidth }
          );
        });
    }
  }

  return {
    process: process
  };
};