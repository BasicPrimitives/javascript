primitives.orgdiagram.CombinedNormalVisibilityItemsTask = function (itemsSizesOptionTask, cursorItemTask, cursorNeighboursTask, selectedItemsTask, selectionPathItemsTask,
  normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
  normalVisibilityItemsByBackgroundAnnotationTask,
  normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
  normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask
) {
  var _data = {
    items: []
  },
    _hash = {},
    _sourceTasks = [
      cursorItemTask,
      cursorNeighboursTask,
      selectedItemsTask,
      selectionPathItemsTask,
      normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
      normalVisibilityItemsByBackgroundAnnotationTask,
      normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
      normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask
    ],
    _dataTemplate = new primitives.common.ArrayReader(
      new primitives.common.ValueReader(["string", "number"], true),
      true
    );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      itemsSizesOption = itemsSizesOptionTask.getOptions();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(_sourceTasks), "items", context);

    if (itemsSizesOption.pageFitMode == primitives.common.PageFitMode.None || itemsSizesOption.minimalVisibility == primitives.common.Visibility.Normal) {
      context.isChanged = false;
    }

    return context.isChanged;
  }

  function getSelectedItems(sourceTasks, getItemOptions) {
    var result = [],
      sourceIndex, sourceLen,
      sourceTask,
      index, len,
      items, item,
      processed = {};

    for (sourceIndex = 0, sourceLen = sourceTasks.length; sourceIndex < sourceLen; sourceIndex += 1) {
      sourceTask = sourceTasks[sourceIndex];
      items = sourceTask.getItems();

      for (index = 0, len = items.length; index < len; index += 1) {
        item = items[index];

        if (!processed.hasOwnProperty(item)) {
          result.push(item);
          processed[item] = true;
        }
      }
    }
    return result;
  }

  function isItemSelected(treeItem) {
    return _hash.items.hasOwnProperty(treeItem);
  }

  return {
    process: process,
    isItemSelected: isItemSelected
  };
};