primitives.orgdiagram.CursorItemOptionTask = function (optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    cursorItem: new primitives.common.ValueReader(["string", "number"], true),
    navigationMode: new primitives.common.EnumerationReader(primitives.common.NavigationMode, false, defaultConfig.navigationMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getCursorItem() {
    return _data.cursorItem;
  }

  function hasCursorEnabled() {
    switch (_data.navigationMode) {
      case primitives.common.NavigationMode.Default:
      case primitives.common.NavigationMode.CursorOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getCursorItem: getCursorItem,
    hasCursorEnabled: hasCursorEnabled,
    description: "Checks currenct cursor item option."
  };
};