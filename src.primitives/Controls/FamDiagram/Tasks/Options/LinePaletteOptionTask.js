primitives.famdiagram.LinePaletteOptionTask = function (optionsTask, defaultPaletteItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    linesPalette: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        lineColor: new primitives.common.ValueReader(["string"], false, defaultPaletteItemConfig.lineColor),
        lineWidth: new primitives.common.ValueReader(["number"], false, defaultPaletteItemConfig.lineWidth),
        lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultPaletteItemConfig.lineType)
      }),
      false
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