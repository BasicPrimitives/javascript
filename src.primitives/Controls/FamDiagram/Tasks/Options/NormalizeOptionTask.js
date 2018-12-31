primitives.famdiagram.NormalizeOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		groupByType: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.groupByType),
		alignBylevels: new primitives.common.ValueReader(["boolean"], false, defaultConfig.alignBylevels),
		hideGrandParentsConnectors: new primitives.common.ValueReader(["boolean"], false, defaultConfig.hideGrandParentsConnectors),
		enableMatrixLayout: new primitives.common.ValueReader(["boolean"], false, defaultConfig.enableMatrixLayout),
		minimumMatrixSize: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumMatrixSize),
		maximumColumnsInMatrix: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions
	};
};