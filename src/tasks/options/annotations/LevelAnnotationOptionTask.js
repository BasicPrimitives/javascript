import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {LineType, AnnotationType} from '../../../enums';

export default function LevelAnnotationOptionTask(splitAnnotationsOptionTask, defaultLevelAnnotationConfig) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      levels: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      title: new ValueReader(["string"], true),
      titleFontColor: new ValueReader(["string"], true),
      titleColor: new ValueReader(["string"], true),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.bottom)
      }, false, defaultLevelAnnotationConfig.offset),
      lineWidth: new ObjectReader({
        left: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.left),
        top: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.top),
        right: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.right),
        bottom: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.bottom)
      }, false, defaultLevelAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultLevelAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], true),
      fillColor: new ValueReader(["string"], false, defaultLevelAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultLevelAnnotationConfig.lineType)
    }),
    false
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Level, null), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations,
    description: "Collects Level Annotations"
  };
};