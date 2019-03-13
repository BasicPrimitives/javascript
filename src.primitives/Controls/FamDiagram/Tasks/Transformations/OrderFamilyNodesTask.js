/*	Balance family tree so parents sharing the most children stay close to each other 
    Account for users position and primnaryParent options
*/
primitives.famdiagram.OrderFamilyNodesTask = function (orderFamilyNodesOptionTask, userDefinedNodesOrderTask, normalizeLogicalFamilyTask, defaultItemConfig) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null,
    matrixes: {},
    nestedLayoutBottomConnectorIds: {},
    treeLevels: null, /* primitives.common.TreeLevels */
    bundles: null, /* array of primitives.common.BaseConnectorBundle objects */
    connectorStacks: null /* array of primitives.orgdiagram.TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
  },
    _familyBalance = new primitives.famdiagram.FamilyBalance(),
    _familyMatrixesExtractor = new primitives.famdiagram.FamilyMatrixesExtractor(false),
    _nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

  function process(debug) {
    var logicalFamily = normalizeLogicalFamilyTask.getLogicalFamily(),
      maximumId = normalizeLogicalFamilyTask.getMaximumId(),
      matrixes = {},
      nestedLayoutBottomConnectorIds = {},
      bundles = [];

    var orderFamilyNodesOptions = orderFamilyNodesOptionTask.getOptions();
    var options = {
      enableMatrixLayout: orderFamilyNodesOptions.enableMatrixLayout,
      minimumMatrixSize: orderFamilyNodesOptions.minimumMatrixSize,
      maximumColumnsInMatrix: orderFamilyNodesOptions.maximumColumnsInMatrix
    };

    logicalFamily = logicalFamily.clone();
    maximumId = _familyMatrixesExtractor.extract(options, logicalFamily, matrixes, nestedLayoutBottomConnectorIds, bundles, maximumId);

    _data.logicalFamily = logicalFamily;
    _data.matrixes = matrixes;
    _data.nestedLayoutBottomConnectorIds = nestedLayoutBottomConnectorIds;
    _data.bundles = bundles;

    var balanceParams = {
      logicalFamily: logicalFamily,
      maximumId: maximumId,
      defaultItemConfig: defaultItemConfig,
      itemsPositions: userDefinedNodesOrderTask.getPositions(),
      itemsGroups: userDefinedNodesOrderTask.getGroups()
    };

    var balanceResult = _familyBalance.balance(balanceParams);

    _data.maximumId = balanceResult.maximumId;
    _data.treeLevels = balanceResult.treeLevels;
    _data.bundles = _data.bundles.concat(balanceResult.bundles);
    _data.connectorStacks = balanceResult.connectorStacks;

    return true;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
  }

  function getMatrixes() {
    return _data.matrixes;
  }

  function getNestedLayoutBottomConnectorIds() {
    return _data.nestedLayoutBottomConnectorIds;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  function getTreeLevels() {
    return _data.treeLevels;
  }

  function getBundles() {
    return _data.bundles;
  }

  function getConnectorsStacksSizes(levelid) {
    return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
  }

  return {
    process: process,
    getLogicalFamily: getLogicalFamily,
    getMatrixes: getMatrixes,
    getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds,
    getMaximumId: getMaximumId,
    getTreeLevels: getTreeLevels,
    getBundles: getBundles,
    getConnectorsStacksSizes: getConnectorsStacksSizes
  };
};
