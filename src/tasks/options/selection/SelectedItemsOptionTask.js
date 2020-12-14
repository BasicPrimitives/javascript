import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import ArrayReader from '../../../readers/ArrayReader';

export default function SelectedItemsOptionTask(optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    selectedItems: new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      options = optionsTask.getOptions();

    _data = _dataTemplate.read(_data, options, "options", context);
    return context.isChanged;
  }

  function getSelectedItems() {
    return _data.selectedItems;
  }

  return {
    process: process,
    getSelectedItems: getSelectedItems,
    description: "Checks user selected items option."
  };
};