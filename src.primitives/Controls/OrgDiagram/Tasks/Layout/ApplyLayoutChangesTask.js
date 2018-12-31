primitives.orgdiagram.ApplyLayoutChangesTask = function (getGraphics, getLayout, itemsSizesOptionTask,
	currentControlSizeTask, scaleOptionTask, alignDiagramTask) {
	var _data = {
		scrollPanelSize: null
	},
	_itemsSizesOptions;

	function process() {
		var layout = getLayout(),
			graphics = getGraphics(),
			scaleOptions = scaleOptionTask.getOptions(),
			scale = scaleOptions.scale;

		_itemsSizesOptions = itemsSizesOptionTask.getOptions();

		/* set size of panel with content */
		var mousePanelSize = new primitives.common.Size(alignDiagramTask.getContentSize());
		mousePanelSize.scale(1 * scale);
		primitives.common.JsonML.applyStyles(layout.mousePanel, mousePanelSize.getCSS());

		/* set size of panel with content */
		var panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());
		primitives.common.JsonML.applyStyles(layout.placeholder, panelSize.getCSS());
		graphics.resize("placeholder", panelSize.width, panelSize.height);

		/* resize element to fit placeholder if control in autosize mode */
		switch (_itemsSizesOptions.pageFitMode) {
			case primitives.common.PageFitMode.AutoSize://ignore jslint
				_data.scrollPanelSize = new primitives.common.Size(mousePanelSize.width + 25, mousePanelSize.height + 25);
				_data.scrollPanelSize.cropBySize(_itemsSizesOptions.autoSizeMaximum);
				_data.scrollPanelSize.addSize(_itemsSizesOptions.autoSizeMinimum);//ignore jslint
				primitives.common.JsonML.applyStyles(layout.element, _data.scrollPanelSize.getCSS());
				break;
			default:
				_data.scrollPanelSize = new primitives.common.Size(currentControlSizeTask.getScrollPanelSize());
				break;
		}

		/* set scroll of content */
		var pixelAlignmentFix = primitives.common.getFixOfPixelALignment(layout.element);

		primitives.common.JsonML.applyStyles(layout.scrollPanel, {
			"top": "0px",
			"left": "0px",
			"width": _data.scrollPanelSize.width + "px",
			"height": _data.scrollPanelSize.height + "px",
			"marginBottom": "0px",
			"marginRight": "0px",
			"marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
			"marginTop": pixelAlignmentFix.height + "px"
		});

		/* set CSS scale of content */
		var scaletext = "scale(" + scale + "," + scale + ")";

		primitives.common.JsonML.applyStyles(layout.placeholder, {
			"transform-origin": "0 0",
			"transform": scaletext,
			"-ms-transform": scaletext, /* IE 9 */
			"-webkit-transform": scaletext, /* Safari and Chrome */
			"-o-transform": scaletext, /* Opera */
			"-moz-transform": scaletext /* Firefox */
		});
		return true;
	}

	function getOptimalPanelSize() {
		return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
	}

	return {
		process: process,
		getOptimalPanelSize: getOptimalPanelSize
	};
};