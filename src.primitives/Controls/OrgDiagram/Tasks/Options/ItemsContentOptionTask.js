primitives.orgdiagram.ItemsContentOptionTask = function (optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        title: new primitives.common.ValueReader(["string"], true),
        description: new primitives.common.ValueReader(["string"], true),
        image: new primitives.common.ValueReader(["string"], true),
        context: new primitives.common.ValueReader(["string", "number", "object"], true),
        itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultItemConfig.itemTitleColor),
        groupTitle: new primitives.common.ValueReader(["string"], false, defaultItemConfig.groupTitle),
        groupTitleColor: new primitives.common.ValueReader(["string"], false, defaultItemConfig.groupTitleColor)
      }),
      true,
      "id",
      true,
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
    getConfig: getConfig,
    description: "Checks items configuration options effecting their placement in layout."
  };
};