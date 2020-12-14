import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';

export default function NormalVisibilityItemsByConnectorAnnotationTask(connectorAnnotationOptionTask) {
  var _data = {
    items: []
  },
    _hash = {},
    _dataTemplate = new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      annotations = connectorAnnotationOptionTask.getAnnotations();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(annotations) {
    var result = [],
      processed = {},
      index, len,
      annotation,
      treeItem;

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotation = annotations[index];
      if (annotation.selectItems) {
        if (annotation.fromItem != null && !processed.hasOwnProperty(annotation.fromItem)) {
          result.push(annotation.fromItem);
          processed[annotation.fromItem] = true;
        }
        if (annotation.toItem != null && !processed.hasOwnProperty(annotation.toItem)) {
          result.push(annotation.toItem);
          processed[annotation.toItem] = true;
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