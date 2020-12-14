import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {ConnectorPlacementType, ShapeType, ZOrderType, ConnectorLabelPlacementType, AnnotationType, LineType} from '../../../enums';

export default function ConnectorAnnotationOptionTask(splitAnnotationsOptionTask, defaultConnectorAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultConnectorAnnotationConfig.zOrderType),
      fromItem: new ValueReader(["string", "number"], true),
      toItem: new ValueReader(["string", "number"], true),
      connectorShapeType: new EnumerationReader(ShapeType, false, defaultConnectorAnnotationConfig.connectorShapeType),
      connectorPlacementType: new EnumerationReader(ConnectorPlacementType, false, defaultConnectorAnnotationConfig.connectorPlacementType),
      labelPlacementType: new EnumerationReader(ConnectorLabelPlacementType, false, defaultConnectorAnnotationConfig.labelPlacementType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.bottom)
      }, false, defaultConnectorAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.lineWidth),
      color: new ValueReader(["string"], false, defaultConnectorAnnotationConfig.color),
      lineType: new EnumerationReader(LineType, false, defaultConnectorAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultConnectorAnnotationConfig.selectItems),
      label: new ValueReader(["string", "object"], false, defaultConnectorAnnotationConfig.label),
      labelSize: new ObjectReader({
        width: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.width),
        height: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.height)
      }, false, defaultConnectorAnnotationConfig.labelSize)
    }),
    false
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Connector, zOrderType), "annotations", context);

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