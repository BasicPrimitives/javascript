primitives.orgdiagram.MinimizedItemsOptionTask = function (optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
        itemTitleColor: new primitives.common.ValueReader(["string"], true)
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

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks minimized items drawing options."
  };
};