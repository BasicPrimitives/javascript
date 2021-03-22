import FamilyMatrixesExtractor from './familyTransformations/FamilyMatrixesExtractor';

export default function ExtractNestedLayoutsTask(extractNestedLayoutsOptionTask, bindFamilyConnectorsTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null
  },
  _familyMatrixesExtractor = new FamilyMatrixesExtractor(false);

  function process(debug) {
    var logicalFamily = bindFamilyConnectorsTask.getLogicalFamily(),
      maximumId = bindFamilyConnectorsTask.getMaximumId(),
      extractNestedLayoutsOptions = extractNestedLayoutsOptionTask.getOptions();

    var options = {
      enableMatrixLayout: extractNestedLayoutsOptions.enableMatrixLayout,
      minimumMatrixSize: extractNestedLayoutsOptions.minimumMatrixSize,
      maximumColumnsInMatrix: extractNestedLayoutsOptions.maximumColumnsInMatrix
    };

    logicalFamily = logicalFamily.clone();
    var { maximumId, layouts, nestedLayoutParentConnectorIds, nestedLayoutBottomConnectorIds, bundles } = _familyMatrixesExtractor.extract(options, extractNestedLayoutsOptionTask.getConfig, logicalFamily, maximumId);

    _data.logicalFamily = logicalFamily;
    _data.maximumId = maximumId;
    _data.layouts = layouts;
    _data.nestedLayoutParentConnectorIds = nestedLayoutParentConnectorIds;
    _data.nestedLayoutBottomConnectorIds = nestedLayoutBottomConnectorIds;
    _data.bundles = bundles;

    return true;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
  }

  function getLayouts() {
    return _data.layouts;
  }

  function getNestedLayoutParentConnectorIds() {
    return _data.nestedLayoutParentConnectorIds;
  }

  function getNestedLayoutBottomConnectorIds() {
    return _data.nestedLayoutBottomConnectorIds;
  }

  function getBundles() {
    return _data.bundles;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getLogicalFamily: getLogicalFamily,
    getMaximumId: getMaximumId,
    getLayouts: getLayouts,
    getNestedLayoutParentConnectorIds: getNestedLayoutParentConnectorIds,
    getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds,
    getBundles: getBundles
  };
};
