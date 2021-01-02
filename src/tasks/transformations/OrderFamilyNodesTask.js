/*  Balance family tree so parents sharing the most children stay close to each other 
    Account for users position and primaryParent options
*/
import FamilyBalance from './familyTransformations/FamilyBalance';
import FamilyMatrixesExtractor from './familyTransformations/FamilyMatrixesExtractor';
import UserDefinedPrimaryParents from './familyTransformations/UserDefinedPrimaryParents';
import TreeLevelConnectorStackSize from '../../models/TreeLevelConnectorStackSize';

export default function OrderFamilyNodesTask(orderFamilyNodesOptionTask, userDefinedNodesOrderTask, normalizeLogicalFamilyTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null,
    matrixes: {},
    nestedLayoutBottomConnectorIds: {},
    treeLevels: null, /* TreeLevels */
    bundles: null, /* array of BaseConnectorBundle objects */
    connectorStacks: null /* array of TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
  },
    _familyBalance = new FamilyBalance(),
    _familyMatrixesExtractor = new FamilyMatrixesExtractor(false),
    _userDefinedPrimaryParents = new UserDefinedPrimaryParents(),
    _nullTreeLevelConnectorStackSize = new TreeLevelConnectorStackSize();

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
      itemsPositions: userDefinedNodesOrderTask.getPositions(),
      itemsGroups: userDefinedNodesOrderTask.getGroups(),
      primaryParents: _userDefinedPrimaryParents.getUserDefinedPrimaryParents(orderFamilyNodesOptions.items, logicalFamily)
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
