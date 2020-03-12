primitives.orgdiagram.ScaleOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    scale: new primitives.common.ValueReader(["number"], false, defaultConfig.scale),
    minimumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumScale),
    maximumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumScale)
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
    getOptions: getOptions,
    description: "Checks control scale options."
  };
};