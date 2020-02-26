primitives.famdiagram.RemoveLoopsOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    loopsLayoutMode: new primitives.common.EnumerationReader(primitives.common.LoopsLayoutMode, false, defaultConfig.loopsLayoutMode)
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