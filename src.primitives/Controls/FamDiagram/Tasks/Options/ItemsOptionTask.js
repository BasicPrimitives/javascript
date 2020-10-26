primitives.famdiagram.ItemsOptionTask = function (optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        parents: new primitives.common.ArrayReader(
          new primitives.common.ValueReader(["string", "number"], true),
          true
        ),
        isActive: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isActive)
      }),
      true,
      "id",
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash,
      sourceHash: _sourceHash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItems() {
    return _data.items;
  }

  function getConfig(itemId) {
    return _sourceHash["options-items"][itemId];
  }

  return {
    process: process,
    getItems: getItems,
    getConfig: getConfig
  };
};