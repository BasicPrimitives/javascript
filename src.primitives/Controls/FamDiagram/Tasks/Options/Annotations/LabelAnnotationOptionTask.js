primitives.famdiagram.LabelAnnotationOptionTask = function (splitAnnotationsOptionTask, removeLoopsTask, defaultLabelAnnotationConfig) {
  var _data = {
    annotations: [],
    configs: {},
    maximumId: null
  },
    _hash = {};

  var _dataTemplate = new primitives.common.ArrayReader(
    new primitives.common.ObjectReader({
      zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultLabelAnnotationConfig.zOrderType),
      fromItem: new primitives.common.ValueReader(["string", "number"], true),
      toItems: new primitives.common.ArrayReader(
        new primitives.common.ValueReader(["string", "number"], true),
        true
      ),
      title: new primitives.common.ValueReader(["string"], true),
      itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
      templateName: new primitives.common.ValueReader(["string"], true)
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
      maximumId = removeLoopsTask.getMaximumId(),
      index, len, annotation;

    _data.annotations = _dataTemplate.read(_data.annotations, splitAnnotationsOptionTask.getAnnotations(primitives.common.AnnotationType.Label), "annotations", context);
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