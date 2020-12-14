import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';

export default function NormalVisibilityItemsByAnnotationTask(annotationOptionTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      annotations = annotationOptionTask.getAnnotations();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(annotations) {
    var result = [],
      processed = {},
      index, len, index2, len2,
      items, item,
      annotation,
      treeItemId;

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotation = annotations[index];
      if (annotation.selectItems) {
        items = annotation.items;
        for (index2 = 0, len2 = items.length; index2 < len2; index2 += 1) {
          treeItemId = items[index2];
          if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
            result.push(treeItemId);
            processed[treeItemId] = true;
          }
        }
      }
    }

    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
};