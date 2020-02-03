primitives.famdiagram.OrderFamilyNodesOptionTask = function (optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    enableMatrixLayout: new primitives.common.ValueReader(["boolean"], false, defaultConfig.enableMatrixLayout),
    minimumMatrixSize: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumMatrixSize),
    maximumColumnsInMatrix: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        position: new primitives.common.ValueReader(["number"], true),
        relativeItem: new primitives.common.ValueReader(["string", "number"], true),
        placementType: new primitives.common.EnumerationReader(primitives.common.AdviserPlacementType, false, defaultItemConfig.placementType),
        primaryParent: new primitives.common.ValueReader(["string", "number"], true),
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

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
};