export default function HighlightItemTask(highlightItemOptionTask, activeItemsTask) {
  var _data = {
    highlightTreeItemId: null
  };

  function process() {
    var treeItemId = highlightItemOptionTask.getHighlightItem(),
      activeItems = (activeItemsTask != null) ? activeItemsTask.getActiveItems() : {};

    _data.highlightTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

    return true;
  }

  function getHighlightTreeItem() {
    return _data.highlightTreeItemId;
  }

  return {
    process: process,
    getHighlightTreeItem: getHighlightTreeItem
  };
};