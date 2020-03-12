primitives.famdiagram.LabelAnnotationTemplateOptionTask = function (labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: []
  },
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      id: new primitives.common.ValueReader(["number"], true),
      title: new primitives.common.ValueReader(["string"], true),
      itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
      templateName: new primitives.common.ValueReader(["string"], true)
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

  return {
    process: process,
    getAnnotations: getAnnotations
  };
};