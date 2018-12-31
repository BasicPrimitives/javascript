primitives.famdiagram.LevelsTask = function (normalizeLogicalFamilyTask, defaultItemConfig) {
	var _data = {
		maximumId: null, /* maximum of OrgItem.id */
		treeLevels: null, /* primitives.common.TreeLevels */
		bundles: null, /* array of primitives.common.BaseConnectorBundle objects */
		connectorStacks: null /* array of primitives.orgdiagram.TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
	},
	_familyBalance = new primitives.famdiagram.FamilyBalance(),
	_nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

	function process() {
		var params = {
			logicalFamily: normalizeLogicalFamilyTask.getLogicalFamily(),
			maximumId: normalizeLogicalFamilyTask.getMaximumId(),
			defaultItemConfig: defaultItemConfig
		};

		_data = _familyBalance.balance(params);

		return true;
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

		getMaximumId: getMaximumId,
		getTreeLevels: getTreeLevels,
		getBundles: getBundles,
		getConnectorsStacksSizes: getConnectorsStacksSizes
	};
};