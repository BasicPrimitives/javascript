primitives.orgdiagram.SelectedItemsOptionTask = function (optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    selectedItems: new primitives.common.ArrayReader(
      new primitives.common.ValueReader(["string", "number"], true),
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