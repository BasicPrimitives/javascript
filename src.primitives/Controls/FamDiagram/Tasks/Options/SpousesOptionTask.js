primitives.famdiagram.SpousesOptionTask = function (optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        spouses: new primitives.common.ArrayReader(
          new primitives.common.ValueReader(["string", "number"], true),
          true
        )
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
};