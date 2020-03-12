primitives.orgdiagram.ConnectorAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultConnectorAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultConnectorAnnotationConfig.zOrderType),
      fromItem: new primitives.common.ValueReader(["string", "number"], true),
      toItem: new primitives.common.ValueReader(["string", "number"], true),
      connectorShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, false, defaultConnectorAnnotationConfig.connectorShapeType),
      connectorPlacementType: new primitives.common.EnumerationReader(primitives.common.ConnectorPlacementType, false, defaultConnectorAnnotationConfig.connectorPlacementType),
      labelPlacementType: new primitives.common.EnumerationReader(primitives.common.ConnectorLabelPlacementType, false, defaultConnectorAnnotationConfig.labelPlacementType),
      offset: new primitives.common.ObjectReader({
        left: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.left),
        top: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.top),
        right: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.right),
        bottom: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.bottom)
      }, false, defaultConnectorAnnotationConfig.offset),
      lineWidth: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.lineWidth),
      color: new primitives.common.ValueReader(["string"], false, defaultConnectorAnnotationConfig.color),
      lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConnectorAnnotationConfig.lineType),
      selectItems: new primitives.common.ValueReader(["boolean"], false, defaultConnectorAnnotationConfig.selectItems),
      label: new primitives.common.ValueReader(["string", "object"], false, defaultConnectorAnnotationConfig.label),
      labelSize: new primitives.common.ObjectReader({
        width: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.width),
        height: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.height)
      }, false, defaultConnectorAnnotationConfig.labelSize)
    }),
    false
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(primitives.common.AnnotationType.Connector, zOrderType), "annotations", context);

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