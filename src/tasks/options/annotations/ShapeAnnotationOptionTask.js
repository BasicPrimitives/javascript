import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {ZOrderType, ShapeType, AnnotationType, LineType, PlacementType} from '../../../enums';

export default function ShapeAnnotationOptionTask(splitAnnotationsOptionTask, defaultShapeAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultShapeAnnotationConfig.zOrderType),
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      shapeType: new EnumerationReader(ShapeType, false, defaultShapeAnnotationConfig.shapeType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.bottom)
      }, false, defaultShapeAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultShapeAnnotationConfig.lineWidth),
      cornerRadius: new ValueReader(["string"], false, defaultShapeAnnotationConfig.cornerRadius),
      opacity: new ValueReader(["number"], false, defaultShapeAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], false, defaultShapeAnnotationConfig.borderColor),
      fillColor: new ValueReader(["string"], false, defaultShapeAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultShapeAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultShapeAnnotationConfig.selectItems),
      label: new ValueReader(["string", "object"], false, defaultShapeAnnotationConfig.label),
      labelSize: new ObjectReader({
        width: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.width),
        height: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.height)
      }, false, defaultShapeAnnotationConfig.labelSize),
      labelPlacement: new EnumerationReader(PlacementType, false, defaultShapeAnnotationConfig.labelPlacement),
      labelOffset: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelOffset)
    },
      false
    )
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Shape, zOrderType), "annotations", context);

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