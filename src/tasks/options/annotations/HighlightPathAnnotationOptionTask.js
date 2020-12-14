import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {ZOrderType, AnnotationType, LineType} from '../../../enums';

export default function HighlightPathAnnotationOptionTask(splitAnnotationsOptionTask, defaultHighlightPathAnnotationConfig, zOrderType) {
  var _data = {},
    _annotations = [],
    _hash = {};

  var _dataAnnotationsTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultHighlightPathAnnotationConfig.zOrderType),
      lineWidth: new ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.opacity),
      color: new ValueReader(["string"], false, defaultHighlightPathAnnotationConfig.color),
      lineType: new EnumerationReader(LineType, false, defaultHighlightPathAnnotationConfig.lineType),
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        false
      ),
      selectItems: new ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.selectItems),
      showArrows: new ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.showArrows)
    },
      false)
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataAnnotationsTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.HighlightPath, zOrderType), "annotations", context);

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