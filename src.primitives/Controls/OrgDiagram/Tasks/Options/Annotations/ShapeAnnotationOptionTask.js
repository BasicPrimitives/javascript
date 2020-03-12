primitives.orgdiagram.ShapeAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultShapeAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultShapeAnnotationConfig.zOrderType),
      items: new primitives.common.ArrayReader(
        new primitives.common.ValueReader(["string", "number"], true),
        true
      ),
      shapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, false, defaultShapeAnnotationConfig.shapeType),
      offset: new primitives.common.ObjectReader({
        left: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.left),
        top: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.top),
        right: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.right),
        bottom: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.bottom)
      }, false, defaultShapeAnnotationConfig.offset),
      lineWidth: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.lineWidth),
      cornerRadius: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.cornerRadius),
      opacity: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.opacity),
      borderColor: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.borderColor),
      fillColor: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.fillColor),
      lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultShapeAnnotationConfig.lineType),
      selectItems: new primitives.common.ValueReader(["boolean"], false, defaultShapeAnnotationConfig.selectItems),
      label: new primitives.common.ValueReader(["string", "object"], false, defaultShapeAnnotationConfig.label),
      labelSize: new primitives.common.ObjectReader({
        width: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.width),
        height: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.height)
      }, false, defaultShapeAnnotationConfig.labelSize),
      labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultShapeAnnotationConfig.labelPlacement),
      labelOffset: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelOffset)
    },
      false
    )
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(primitives.common.AnnotationType.Shape, zOrderType), "annotations", context);

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