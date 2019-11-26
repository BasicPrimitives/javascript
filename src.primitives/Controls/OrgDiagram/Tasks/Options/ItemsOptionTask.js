primitives.orgdiagram.ItemsOptionTask = function (optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        parent: new primitives.common.ValueReader(["string", "number"], true),
        itemType: new primitives.common.EnumerationReader(primitives.orgdiagram.ItemType, false, defaultItemConfig.itemType),
        adviserPlacementType: new primitives.common.EnumerationReader(primitives.common.AdviserPlacementType, false, defaultItemConfig.adviserPlacementType),
        childrenPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultItemConfig.childrenPlacementType),
        placeAdvisersAboveChildren: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.placeAdvisersAboveChildren),
        placeAssistantsAboveChildren: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.placeAssistantsAboveChildren),
        isVisible: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isVisible),
        isActive: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isActive),
        levelOffset: new primitives.common.ValueReader(["number"], true)
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