import FamilyLayout from './layouts/FamilyLayout';
import MatrixLayout from './layouts/MatrixLayout';
import Rect from '../../graphics/structs/Rect';
import Size from '../../graphics/structs/Size';

export default function FamItemsPositionsTask(currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask,
  normalizeOptionTask, normalizeLogicalFamilyTask,
  itemTemplateParamsTask,
  cursorItemTask, combinedNormalVisibilityItemsTask) {

  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    panelSize: null // Rect();
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
    var { optimalPanelSize } = currentControlSizeTask.getOptions();
    var panelSize = new Size(optimalPanelSize);
    var { scale } = scaleOptionTask.getOptions();
    panelSize.scale(1.0 / scale);
    var panelRect = new Rect(0, 0, panelSize.width, panelSize.height);

    var layout = new FamilyLayout(params, options);
    var matrixes = normalizeLogicalFamilyTask.getMatrixes();
    for (var key in matrixes) {
      if (matrixes.hasOwnProperty(key)) {
        var layoutItem = params.logicalFamily.node(key);
        layout.add(key, new MatrixLayout({
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