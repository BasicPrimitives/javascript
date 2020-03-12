primitives.famdiagram.NeighboursSelectionModeOptionTask = function (optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    neighboursSelectionMode: new primitives.common.EnumerationReader(primitives.common.NeighboursSelectionMode, false, defaultConfig.neighboursSelectionMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getNeighboursSelectionMode() {
    return _data.neighboursSelectionMode;
  }

  return {
    process: process,
    getNeighboursSelectionMode: getNeighboursSelectionMode
  };
};