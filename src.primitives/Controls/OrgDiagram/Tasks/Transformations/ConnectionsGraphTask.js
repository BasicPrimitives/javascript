primitives.orgdiagram.ConnectionsGraphTask = function (getGraphics, createTranfromTask, connectorsOptionTask, visualTreeLevelsTask, alignDiagramTask) {
	var _data = {
		graph: null,
		nodeid: 0
	};

	function process() {
		var graphics = getGraphics(),
			panel = graphics.activate("placeholder", primitives.common.Layers.Connector),
			bundles = visualTreeLevelsTask.getBundles(),
			nestedLayoutBottomConnectorIds = visualTreeLevelsTask.getNestedLayoutBottomConnectorIds(),
			connectorsOptions = connectorsOptionTask.getOptions();

		var data = {
			graph: primitives.common.graph(),
			nodeid: 0
		};

		var params = {
			treeItemsPositions: alignDiagramTask.getItemsPositions(),
			nestedLayoutBottomConnectorIds: nestedLayoutBottomConnectorIds,
			transform: createTranfromTask.getTransform(),
			hasGraphics: panel.hasGraphics
		};

		var options = {
			connectorType: connectorsOptions.connectorType,
			showExtraArrows: connectorsOptions.showExtraArrows,
			bevelSize: connectorsOptions.bevelSize,
			elbowType: connectorsOptions.elbowType
		};

		for (var index = 0, len = bundles.length; index < len; index += 1) {
			var bundle = bundles[index];

			bundle.trace(data, params, options);
		}

		_data = data;

		return true;
	}

	function getGraph() {
		return _data.graph;
	}

	return {
		process: process,
		getGraph: getGraph
	};
};