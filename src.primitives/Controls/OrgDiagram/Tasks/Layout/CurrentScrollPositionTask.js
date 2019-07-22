primitives.orgdiagram.CurrentScrollPositionTask = function (layoutOptionsTask) {
  var _data = {
    placeholderOffset: null
  },
    _hash = {},
    _dataTemplate = new primitives.common.ObjectReader({
      placeholderOffset: new primitives.common.ObjectReader({
        x: new primitives.common.ValueReader(["number"], true),
        y: new primitives.common.ValueReader(["number"], true)
      }, true)
    });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      layoutOptions = layoutOptionsTask.getOptions();
    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    return context.isChanged;
  }

  function getPlaceholderOffset() {
    return _data.placeholderOffset;
  }

  return {
    process: process,
    getPlaceholderOffset: getPlaceholderOffset
  };
};