primitives.orgdiagram.OrientationOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    orientationType: new primitives.common.EnumerationReader(primitives.common.OrientationType, false, defaultConfig.orientationType)
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
    description: "Checks diagram orientation options."
  };
};