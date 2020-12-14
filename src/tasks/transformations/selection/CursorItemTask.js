export default function CursorItemTask(cursorItemOptionTask, activeItemsTask) {
  var _data = {
    cursorTreeItemId: null
  };

  function process() {
    var treeItemId = cursorItemOptionTask.getCursorItem(),
      activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

    _data.cursorTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

    return true;
  }

  function getCursorTreeItem() {
    return _data.cursorTreeItemId;
  }

  function getItems() {
    return (_data.cursorTreeItemId != null) ? [_data.cursorTreeItemId] : [];
  }

  return {
    process: process,
    getCursorTreeItem: getCursorTreeItem,
    getItems: getItems
  };
};