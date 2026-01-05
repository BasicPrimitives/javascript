/*  Balance family tree so parents sharing the most children stay close to each other 
    Account for users position and primaryParent options
*/
import FamilyBalance from './familyTransformations/FamilyBalance';
import UserDefinedPrimaryParents from './familyTransformations/UserDefinedPrimaryParents';
import TreeLevelConnectorStackSize from '../../models/TreeLevelConnectorStackSize';
import { ItemsOrderType } from '../../enums';

export default function OrderFamilyNodesTask(orderFamilyNodesOptionTask, userDefinedNodesOrderTask, normalizeLogicalFamilyTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null,
    treeLevels: null, /* TreeLevels */
    bundles: null, /* array of BaseConnectorBundle objects */
    connectorStacks: null /* array of TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
  },
    _familyBalance = new FamilyBalance(),
    _userDefinedPrimaryParents = new UserDefinedPrimaryParents(),
    _nullTreeLevelConnectorStackSize = new TreeLevelConnectorStackSize();

  function process(debug) {
    var logicalFamily = normalizeLogicalFamilyTask.getLogicalFamily(),
      maximumId = normalizeLogicalFamilyTask.getMaximumId(),
      orderFamilyNodesOptions = orderFamilyNodesOptionTask.getOptions();

    switch (orderFamilyNodesOptions.itemsOrderType) {
      case ItemsOrderType.Families:
      case ItemsOrderType.MergedTrees:
        var isReversed = orderFamilyNodesOptions.itemsOrderType === ItemsOrderType.MergedTrees
        var params = {
          logicalFamily,
          maximumId,
          itemsPositions: userDefinedNodesOrderTask.getPositions(),
          itemsGroups: userDefinedNodesOrderTask.getGroups(),
          primaryParents: _userDefinedPrimaryParents.getUserDefinedPrimaryParents(orderFamilyNodesOptions.items, logicalFamily)
        }
        var {maximumId, treeLevels, bundles, connectorStacks} = _familyBalance.balance(params, isReversed);

        _data.maximumId = maximumId;
        _data.treeLevels = treeLevels;
        _data.bundles = bundles;
        _data.connectorStacks = connectorStacks;
        _data.logicalFamily = logicalFamily;
        break;
    }

    return true;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
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
    getMaximumId: getMaximumId,
    getTreeLevels: getTreeLevels,
    getBundles: getBundles,
    getConnectorsStacksSizes: getConnectorsStacksSizes
  };
};
