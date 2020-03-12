primitives.orgdiagram.HighlightPathAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultHighlightPathAnnotationConfig, zOrderType) {
  var _data = {},
    _annotations = [],
    _hash = {};

  var _dataAnnotationsTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultHighlightPathAnnotationConfig.zOrderType),
      lineWidth: new primitives.common.ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.lineWidth),
      opacity: new primitives.common.ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.opacity),
      color: new primitives.common.ValueReader(["string"], false, defaultHighlightPathAnnotationConfig.color),
      lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultHighlightPathAnnotationConfig.lineType),
      items: new primitives.common.ArrayReader(
        new primitives.common.ValueReader(["string", "number"], true),
        false
      ),
      selectItems: new primitives.common.ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.selectItems),
      showArrows: new primitives.common.ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.showArrows)
    },
      false)
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataAnnotationsTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(primitives.common.AnnotationType.HighlightPath, zOrderType), "annotations", context);

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