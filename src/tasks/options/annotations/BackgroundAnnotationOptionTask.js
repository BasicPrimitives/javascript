import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {ZOrderType, LineType, AnnotationType} from '../../../enums';

export default function BackgroundAnnotationOptionTask(splitAnnotationsOptionTask, defaultBackgroundAnnotationConfig) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      includeChildren: new ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.includeChildren),
      zOrderType: new EnumerationReader(ZOrderType, false, defaultBackgroundAnnotationConfig.zOrderType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.bottom)
      }, false, defaultBackgroundAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], false, defaultBackgroundAnnotationConfig.borderColor),
      fillColor: new ValueReader(["string"], false, defaultBackgroundAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultBackgroundAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.selectItems)
    }),
    false
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Background, null), "annotations", context);

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