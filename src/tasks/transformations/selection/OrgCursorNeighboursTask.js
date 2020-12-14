import { Visibility } from '../../../enums';

export default function OrgCursorNeighboursTask(cursorItemTask, navigationFamilyTask) {
  var _data = {
    items: []
  };

  function process() {
    var navigationFamily = navigationFamilyTask.getLogicalFamily(),
      cursorTreeItemId = cursorItemTask.getCursorTreeItem();

    _data.items = getCursorNeighbours(cursorTreeItemId, navigationFamily);

    return true;
  }

  function getCursorNeighbours(cursorTreeItemId, navigationFamily) {
    var result = [];
    if (cursorTreeItemId !== null) {
      navigationFamily.loopNeighbours(this, cursorTreeItemId, function (treeItemId, treeItem, distance) {
        if (treeItem.visibility === Visibility.Auto) {
          result.push(treeItemId);
        }
        return true;
      });
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