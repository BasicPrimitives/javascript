/*	1. Topologically sort _logicalFamily items and assign levels.
	2. Optimize references. Transform M:N relations to M:1:N where it is possible.
	3. Eliminate Many to Many relations. Logical family consists of 1:M and M:1 relations only.
	4. Resort items, so original visible items stay at the same level.
	5. Fill in missed items between levels. So that way we have invisible items between parent/child family items if they have gap between levels.
		Such invisible family items have isVisible option set to false.
*/
primitives.famdiagram.NormalizeLogicalFamilyTask = function (normalizeOptionTask, addSpousesTask, defaultItemConfig) {
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
	_familyNormalizer = new primitives.famdiagram.FamilyNormalizer(false),
	_familyMatrixesExtractor = new primitives.famdiagram.FamilyMatrixesExtractor(false),
	_nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

	function process(debug) {
		var logicalFamily = addSpousesTask.getLogicalFamily(),
			maximumId = addSpousesTask.getMaximumId(),
			matrixes = {},
			nestedLayoutBottomConnectorIds = {},
			bundles = [];

		var normalizeOptions = normalizeOptionTask.getOptions();

		var options = {
			hideGrandParentsConnectors: normalizeOptions.hideGrandParentsConnectors,
			groupByType: normalizeOptions.groupByType,
			alignBylevels: normalizeOptions.alignBylevels,
			enableMatrixLayout: normalizeOptions.enableMatrixLayout,
			minimumMatrixSize: normalizeOptions.minimumMatrixSize,
			maximumColumnsInMatrix: normalizeOptions.maximumColumnsInMatrix
		};

		if (options.hideGrandParentsConnectors == true) {
			/* optionally eliminate grand parents connectors */
			logicalFamily = logicalFamily.getFamilyWithoutGrandParentsRelations();
		} else {
			logicalFamily = logicalFamily.clone();
		}
		
		maximumId = _familyNormalizer.normalize(options, logicalFamily, maximumId);
		maximumId = _familyMatrixesExtractor.extract(options, logicalFamily, matrixes, nestedLayoutBottomConnectorIds, bundles, maximumId);

		_data.logicalFamily = logicalFamily;
		_data.matrixes = matrixes;
		_data.nestedLayoutBottomConnectorIds = nestedLayoutBottomConnectorIds;
		_data.bundles = bundles;

		var balanceParams = {
			logicalFamily: logicalFamily,
			maximumId: maximumId,
			defaultItemConfig: defaultItemConfig
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
