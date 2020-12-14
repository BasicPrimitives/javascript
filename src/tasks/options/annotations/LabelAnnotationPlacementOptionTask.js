import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';

export default function LabelAnnotationPlacementOptionTask(labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      id: new ValueReader(["number"], true),
      fromItem: new ValueReader(["string", "number"], true),
      toItems: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      )
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

  function getMaximumId() {
    return labelAnnotationOptionTask.getMaximumId();
  }

  return {
    process: process,
    getAnnotations: getAnnotations,
    getMaximumId: getMaximumId
  };
};