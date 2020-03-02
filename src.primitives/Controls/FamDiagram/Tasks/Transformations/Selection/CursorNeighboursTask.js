primitives.famdiagram.CursorNeighboursTask = function (cursorItemTask, neighboursSelectionModeOptionTask, navigationFamilyTask, activeItemsTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
      navigationFamily = navigationFamilyTask.getLogicalFamily(),
      neighboursSelectionMode = neighboursSelectionModeOptionTask.getNeighboursSelectionMode(),
      activeItems = activeItemsTask.getActiveItems();

    _data.items = _dataTemplate.read(_data.items, getCursorNeighbours(cursorTreeItemId, neighboursSelectionMode, navigationFamily, activeItems), "items", context);

    return context.isChanged;
  }

  function getCursorNeighbours(cursorTreeItemId, neighboursSelectionMode, navigationFamily, activeItems) {
    var result = [],
      processed = {};
    if (cursorTreeItemId !== null) {
      switch (neighboursSelectionMode) {
        case primitives.common.NeighboursSelectionMode.ParentsAndChildren:
          navigationFamily.loopParents(this, cursorTreeItemId, function (itemid, item) {
            if (item.isVisible && !processed.hasOwnProperty(itemid)) {
              processed[itemid] = true;
              result.push(itemid);
            }
            if (activeItems.hasOwnProperty(itemid)) {
              return navigationFamily.SKIP;
            }
          });
          navigationFamily.loopChildren(this, cursorTreeItemId, function (itemid, item) {
            if (item.isVisible && !processed.hasOwnProperty(itemid)) {
              processed[itemid] = true;
              result.push(itemid);
            }
            if (activeItems.hasOwnProperty(itemid)) {
              return navigationFamily.SKIP;
            }
          });
          break;
        case primitives.common.NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses:
          navigationFamily.loopNeighbours(this, cursorTreeItemId, function (itemid, item) {
            if (item.isVisible && !processed.hasOwnProperty(itemid)) {
              processed[itemid] = true;
              result.push(itemid);
            }
            if (activeItems.hasOwnProperty(itemid)) {
              return true;
            }
          });
          break;
      }
    }
    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
};