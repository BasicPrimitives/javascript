import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';

export default function SelectedItemsTask(selectedItemsOptionTask, itemsOptionTask) {
  var _data = {
    items: []
  },
    _hash = {},
    _dataTemplate = new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      selectedItems = selectedItemsOptionTask.getSelectedItems();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(selectedItems), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(selectedItems) {
    var result = [],
      processed = {},
      index, len,
      treeItemId;

    for (index = 0, len = selectedItems.length; index < len; index += 1) {
      treeItemId = selectedItems[index];
      if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
        processed[treeItemId] = true;
        if(itemsOptionTask.getConfig(treeItemId) != null) {
          result.push(treeItemId);
        }
      }
    }

    return result;
  }

  function isSelected(itemid) {
    return _hash.items.hasOwnProperty(itemid);
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems,
    isSelected: isSelected
  };
};