primitives.orgdiagram.HighlightItemOptionTask = function (optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    highlightItem: new primitives.common.ValueReader(["string", "number"], true),
    navigationMode: new primitives.common.EnumerationReader(primitives.common.NavigationMode, false, defaultConfig.navigationMode),
    highlightGravityRadius: new primitives.common.ValueReader(["number"], false, defaultConfig.highlightGravityRadius)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getHighlightItem() {
    return _data.highlightItem;
  }

  function getGravityRadius() {
    return _data.highlightGravityRadius;
  }

  function hasHighlightEnabled() {
    switch (_data.navigationMode) {
      case primitives.common.NavigationMode.Default:
      case primitives.common.NavigationMode.HighlightOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getHighlightItem: getHighlightItem,
    hasHighlightEnabled: hasHighlightEnabled,
    getGravityRadius: getGravityRadius,
    description: "Checks highlight item option."
  };
};