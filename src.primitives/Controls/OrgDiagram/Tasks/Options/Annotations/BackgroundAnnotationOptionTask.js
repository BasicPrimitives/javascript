primitives.orgdiagram.BackgroundAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultBackgroundAnnotationConfig) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      items: new primitives.common.ArrayReader(
        new primitives.common.ValueReader(["string", "number"], true),
        true
      ),
      includeChildren: new primitives.common.ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.includeChildren),
      zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultBackgroundAnnotationConfig.zOrderType),
      offset: new primitives.common.ObjectReader({
        left: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.left),
        top: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.top),
        right: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.right),
        bottom: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.bottom)
      }, false, defaultBackgroundAnnotationConfig.offset),
      lineWidth: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.lineWidth),
      opacity: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.opacity),
      borderColor: new primitives.common.ValueReader(["string"], false, defaultBackgroundAnnotationConfig.borderColor),
      fillColor: new primitives.common.ValueReader(["string"], false, defaultBackgroundAnnotationConfig.fillColor),
      lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultBackgroundAnnotationConfig.lineType),
      selectItems: new primitives.common.ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.selectItems)
    }),
    false
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(primitives.common.AnnotationType.Background, null), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
};