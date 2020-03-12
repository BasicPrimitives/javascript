primitives.famdiagram.LabelAnnotationPlacementOptionTask = function (labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: []
  },
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      id: new primitives.common.ValueReader(["number"], true),
      fromItem: new primitives.common.ValueReader(["string", "number"], true),
      toItems: new primitives.common.ArrayReader(
        new primitives.common.ValueReader(["string", "number"], true),
        true
      )
    }),
    true,
    "id"
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data.annotations = _dataTemplate.read(_data.annotations, labelAnnotationOptionTask.getAnnotations(), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _data.annotations;
  }

  function getMaximumId() {
    return labelAnnotationOptionTask.getMaximumId();
  }

  return {
    process: process,
    getAnnotations: getAnnotations,
    getMaximumId: getMaximumId
  };
};