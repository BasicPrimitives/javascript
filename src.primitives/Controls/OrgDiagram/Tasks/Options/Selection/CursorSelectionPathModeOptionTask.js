primitives.orgdiagram.CursorSelectionPathModeOptionTask = function (optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    selectionPathMode: new primitives.common.EnumerationReader(primitives.common.SelectionPathMode, false, defaultConfig.selectionPathMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getSelectionPathMode() {
    return _data.selectionPathMode;
  }

  return {
    process: process,
    getSelectionPathMode: getSelectionPathMode,
    description: "Checks cursor selection path option."
  };
};