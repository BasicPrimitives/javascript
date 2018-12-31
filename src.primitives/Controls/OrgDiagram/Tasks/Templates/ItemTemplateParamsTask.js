primitives.orgdiagram.ItemTemplateParamsTask = function (itemsSizesOptionTask, cursorItemOptionTask, readTemplatesTask) {
	var _data = {
		items: {} // TemplateParams
	};

	function process() {
		var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
			widgetHasButtons = (itemsSizesOptions.buttons.length > 0),
			cursorItem = cursorItemOptionTask.getCursorItem(),
			items = itemsSizesOptions.items,
			index, len;

		_data.items = {};

		for (index = 0, len = items.length; index < len; index += 1) {
			var itemConfig = items[index],
				templateParams = new primitives.orgdiagram.TemplateParams(),
				isCursor = (cursorItem == itemConfig.id),
				template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
				templateConfig = template.templateConfig,
				templateHasButtons = (templateConfig.buttons != null && templateConfig.buttons.length > 0);

			templateParams.template = template;

			templateParams.isActive = itemConfig.isActive && templateConfig.isActive;
			if (templateParams.isActive) {
				templateParams.hasSelectorCheckbox = getSelectionVisibility(isCursor, itemConfig.hasSelectorCheckbox, itemsSizesOptions.hasSelectorCheckbox);
				templateParams.hasButtons = (widgetHasButtons || templateHasButtons) && getSelectionVisibility(isCursor, itemConfig.hasButtons, itemsSizesOptions.hasButtons);
				if (templateParams.hasButtons) {
					templateParams.buttons = templateHasButtons ? templateConfig.buttons : itemsSizesOptions.buttons;
				}
			}
			templateParams.hasGroupTitle = !primitives.common.isNullOrEmpty(itemConfig.groupTitle);
			_data.items[itemConfig.id] = templateParams;
		}
		return true;
	}

	function getSelectionVisibility(isCursor, itemState, widgetState) {
		var result = false;
		switch (itemState) {
			case primitives.common.Enabled.Auto:
				switch (widgetState) {
					case primitives.common.Enabled.Auto:
						result = isCursor;
						break;
					case primitives.common.Enabled.True:
						result = true;
						break;
					case primitives.common.Enabled.False:
						result = false;
						break;
				}
				break;
			case primitives.common.Enabled.True:
				result = true;
				break;
			case primitives.common.Enabled.False:
				result = false;
				break;
		}
		return result;
	}

	function getTemplateParams(orgItemId) {
		return _data.items[orgItemId];
	}

	return {
		process: process,
		getTemplateParams: getTemplateParams
	};
};