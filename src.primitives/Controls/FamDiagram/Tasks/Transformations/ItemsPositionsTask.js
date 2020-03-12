primitives.famdiagram.ItemsPositionsTask = function (currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask,
  normalizeOptionTask, normalizeLogicalFamilyTask,
  itemTemplateParamsTask,
  cursorItemTask, combinedNormalVisibilityItemsTask) {

  var _data = {
    treeItemsPositions: {}, // primitives.orgdiagram.TreeItemPosition();
    panelSize: null // primitives.common.Rect();
  };

  function process() {
    var itemsSizesOptions = itemsSizesOptionTask.getOptions();
    var connectorsOptions = connectorsOptionTask.getOptions();
    var normalizationOptions = normalizeOptionTask.getOptions();

    var params = {
      logicalFamily: normalizeLogicalFamilyTask.getLogicalFamily(),
      treeLevels: normalizeLogicalFamilyTask.getTreeLevels(),
      getConnectorsStacksSizes: normalizeLogicalFamilyTask.getConnectorsStacksSizes,
      isItemSelected: combinedNormalVisibilityItemsTask.isItemSelected,
      cursorItemId: cursorItemTask.getCursorTreeItem(),
      getTemplateParams: itemTemplateParamsTask.getTemplateParams
    };

    var options = {
      verticalAlignment: itemsSizesOptions.verticalAlignment,
      pageFitMode: itemsSizesOptions.pageFitMode,
      minimalVisibility: itemsSizesOptions.minimalVisibility,
      normalLevelShift: itemsSizesOptions.normalLevelShift,
      dotLevelShift: itemsSizesOptions.dotLevelShift,
      lineLevelShift: itemsSizesOptions.lineLevelShift,
      normalItemsInterval: itemsSizesOptions.normalItemsInterval,
      dotItemsInterval: itemsSizesOptions.dotItemsInterval,
      lineItemsInterval: itemsSizesOptions.lineItemsInterval,
      orientationType: orientationOptionTask.getOptions().orientationType,
      arrowsDirection: connectorsOptions.arrowsDirection,
      linesWidth: connectorsOptions.linesWidth,
      checkBoxPanelSize: itemsSizesOptions.checkBoxPanelSize,
      buttonsPanelSize: itemsSizesOptions.buttonsPanelSize,
      groupTitlePanelSize: itemsSizesOptions.groupTitlePanelSize,
      groupTitlePlacementType: itemsSizesOptions.groupTitlePlacementType,
      maximumColumnsInMatrix: normalizationOptions.maximumColumnsInMatrix
    };

    /* calculate panel size */
    var panelSize = currentControlSizeTask.getOptimalPanelSize();
    var scale = scaleOptionTask.getOptions().scale;
    panelSize.scale(1.0 / scale);
    var panelRect = new primitives.common.Rect(0, 0, panelSize.width, panelSize.height);

    var layout = new primitives.famdiagram.FamilyLayout(params, options);
    var matrixes = normalizeLogicalFamilyTask.getMatrixes();
    for (var key in matrixes) {
      if (matrixes.hasOwnProperty(key)) {
        var layoutItem = params.logicalFamily.node(key);
        layout.add(key, new primitives.famdiagram.MatrixLayout({
          items: matrixes[key],
          isItemSelected: params.isItemSelected,
          cursorItemId: params.cursorItemId,
          getTemplateParams: params.getTemplateParams,
          hideParentConnection: layoutItem.hideParentConnection,
          hideChildrenConnection: layoutItem.hideChildrenConnection
        }, options));
      }
    }
    /* calculate items placement */
    _data.panelSize = layout.measure(panelRect);
    _data.treeItemsPositions = {};
    layout.arrange(this, function (treeItemId, treeItemPosition) {
      _data.treeItemsPositions[treeItemId] = treeItemPosition;
    });
    return true;
  }

  function addMatrixLayouts(parent, matrixes, options) {

  }

  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.panelSize;
  }

  return {
    process: process,
    getItemsPositions: getItemsPositions,
    getItemPosition: getItemPosition,
    getContentSize: getContentSize
  };
};