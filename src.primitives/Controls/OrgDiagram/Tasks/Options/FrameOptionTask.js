primitives.orgdiagram.FrameOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    showFrame: new primitives.common.ValueReader(["boolean"], false, defaultConfig.showFrame),
    frameInnerPadding: new primitives.common.ObjectReader({
      left: new primitives.common.ValueReader(["number"], false, defaultConfig.frameInnerPadding.left),
      top: new primitives.common.ValueReader(["number"], false, defaultConfig.frameInnerPadding.top),
      right: new primitives.common.ValueReader(["number"], false, defaultConfig.frameInnerPadding.right),
      bottom: new primitives.common.ValueReader(["number"], false, defaultConfig.frameInnerPadding.bottom)
    }, false, defaultConfig.frameInnerPadding),
    frameOuterPadding: new primitives.common.ObjectReader({
      left: new primitives.common.ValueReader(["number"], false, defaultConfig.frameOuterPadding.left),
      top: new primitives.common.ValueReader(["number"], false, defaultConfig.frameOuterPadding.top),
      right: new primitives.common.ValueReader(["number"], false, defaultConfig.frameOuterPadding.right),
      bottom: new primitives.common.ValueReader(["number"], false, defaultConfig.frameOuterPadding.bottom)
    }, false, defaultConfig.frameOuterPadding)
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