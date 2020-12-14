import Size from '../../graphics/structs/Size';
import Point from '../../graphics/structs/Point';
import Rect from '../../graphics/structs/Rect';

/*
  This method should try to keep cursor item as close as possible to its previous position
*/
export default function CenterOnCursorTask(layoutOptionsTask, applyLayoutChangesTask, currentScrollPositionTask, cursorItemTask, alignDiagramTask, createTransformTask, scaleOptionTask) {
  var _data = {
    placeholderOffset: null
  },
    _transform;

  function process() {
    var snapRect,
      layoutOptions = layoutOptionsTask.getOptions(),
      cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
      treeItemPosition = alignDiagramTask.getItemPosition(cursorTreeItemId),
      contentSize = new Size(alignDiagramTask.getContentSize()),
      scrollPanelSize,
      scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale;

    _data.placeholderOffset = currentScrollPositionTask.getPlaceholderOffset();

    if (layoutOptions.forceCenterOnCursor) {
      _transform = createTransformTask.getTransform();
      if (treeItemPosition != null) {
        snapRect = getTransformedItemPosition(treeItemPosition.actualPosition);
        snapRect.scale(scale);
        contentSize.scale(scale);
        scrollPanelSize = applyLayoutChangesTask.getScrollPanelSize();
        _data.placeholderOffset = new Point(
          Math.max(Math.min(snapRect.horizontalCenter() - scrollPanelSize.width / 2, contentSize.width - scrollPanelSize.width), 0),
          Math.max(Math.min(snapRect.verticalCenter() - scrollPanelSize.height / 2, contentSize.height - scrollPanelSize.height), 0)
        );
      }
    }


    return true;
  }

  function getTransformedItemPosition(position) {
    var result = false;

    _transform.transformRect(position.x, position.y, position.width, position.height, true,
      this, function (x, y, width, height) {
        result = new Rect(x, y, width, height);
      }
    );
    return result;
  }

  function getPlaceholderOffset() {
    return _data.placeholderOffset;
  }

  return {
    process: process,
    getPlaceholderOffset: getPlaceholderOffset
  };
};