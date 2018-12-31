primitives.orgdiagram.CurrentControlSizeTask = function (getLayout, optionsTask, itemsSizesOptionTask) {
	var _data = {
		scrollPanelSize: null
	},
	_hash = {},
	_dataTemplate = new primitives.common.ObjectReader({
		scrollPanelSize: new primitives.common.ObjectReader({
			width: new primitives.common.ValueReader(["number"], true),
			height: new primitives.common.ValueReader(["number"], true)
		}, true)
	});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		layout = getLayout(),
		currentLayout = {
			scrollPanelSize: primitives.common.getInnerSize(layout.element)
		},
		result = false,
		options = itemsSizesOptionTask.getOptions();

		_data = _dataTemplate.read(_data, currentLayout, "layout", context);

		switch (options.pageFitMode) {
			case primitives.common.PageFitMode.PageWidth:
			case primitives.common.PageFitMode.PageHeight:
			case primitives.common.PageFitMode.FitToPage:
			case primitives.common.PageFitMode.None:
				result = context.isChanged;
				break;
			default:
				break;

		}

		return result;
	}

	function getScrollPanelSize() {
		return _data.scrollPanelSize;
	}

	function getOptimalPanelSize() {
		return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
	}

	return {
		process: process,
		getScrollPanelSize: getScrollPanelSize,
		getOptimalPanelSize: getOptimalPanelSize
	};
};