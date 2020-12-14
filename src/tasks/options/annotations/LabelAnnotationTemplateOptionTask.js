import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';

export default function LabelAnnotationTemplateOptionTask(labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      id: new ValueReader(["number"], true),
      title: new ValueReader(["string"], true),
      itemTitleColor: new ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
      templateName: new ValueReader(["string"], true)
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