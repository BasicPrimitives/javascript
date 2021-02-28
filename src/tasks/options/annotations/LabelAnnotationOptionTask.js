import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {ZOrderType, AnnotationType} from '../../../enums';

export default function LabelAnnotationOptionTask(splitAnnotationsOptionTask, logicalFamilyTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: [],
    configs: {},
    maximumId: null
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultLabelAnnotationConfig.zOrderType),
      fromItem: new ValueReader(["string", "number"], true),
      toItems: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      title: new ValueReader(["string"], true),
      itemTitleColor: new ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
      templateName: new ValueReader(["string"], true)
    },
      false
    ),
    false,
    null,
    true
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash,
      sourceHash: {}
    },
      maximumId = logicalFamilyTask.getMaximumId(),
      index, len, annotation;

    _data.annotations = _dataTemplate.read(_data.annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Label), "annotations", context);
    _data.configs = {};

    /* here we assign unique id to every annotation used in layout
      and populate configs hash mapping id to source annotation
      these source items used as context objects in rendering cycle
    */
    var sourceItems = context.sourceHash.annotations;
    for (index = 0, len = _data.annotations.length; index < len; index += 1) {
      annotation = _data.annotations[index];
      maximumId += 1;
      annotation.id = maximumId;

      _data.configs[annotation.id] = sourceItems[index];
    }

    _data.maximumId = maximumId;

    return context.isChanged;
  }

  function getAnnotations() {
    return _data.annotations;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  function getConfig(itemId) {
    return _data.configs[itemId];
  }

  return {
    process: process,
    getAnnotations: getAnnotations,
    getMaximumId: getMaximumId,
    getConfig: getConfig
  };
};