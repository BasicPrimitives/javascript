
/* /common/init.js*/
/**
 * @preserve Basic Primitives orgEditor Demo v2.0.6
 *
 * (c) Basic Primitives Inc
 *
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */


(function () {

	var namespace = function (name) {
		var namespaces = name.split('.'),
			namespace = window,
			index;
		for (index = 0; index < namespaces.length; index += 1) {
			namespace = namespace[namespaces[index]] = namespace[namespaces[index]] || {};
		}
		return namespace;
	};

	namespace("primitives.orgeditor");
	namespace("primitives.helpers.controls");

}());

/* /common/helpers.js*/
/* Configs */

primitives.helpers.controls.ControlType = {
	Caption: 0,
	RadioBox: 1,
	CheckBox: 2,
	DropDownBox: 3,
	SizeBox: 4,
	TextBox: 5
};

primitives.helpers.controls.CaptionConfig = function (caption, isBig, id) {
	this.controlType = primitives.helpers.controls.ControlType.Caption;
	this.caption = caption;
	this.isBig = isBig;
	this.id = id;
};


primitives.helpers.controls.RadioBoxConfig = function (id, defaultItem, caption, items, valueType, onUpdate) {
	this.controlType = primitives.helpers.controls.ControlType.RadioBox;
	this.id = id;
	this.defaultItem = defaultItem;
	this.caption = caption;
	this.items = items;
	this.valueType = valueType;
	this.onUpdate = onUpdate;
};

primitives.helpers.controls.CheckBoxConfig = function (id, defaultValue, caption, onUpdate) {
	this.controlType = primitives.helpers.controls.ControlType.CheckBox;
	this.id = id;
	this.defaultValue = defaultValue;
	this.caption = caption;
	this.onUpdate = onUpdate;
};

primitives.helpers.controls.DropDownBoxConfig = function (id, defaultItem, caption, items, valueType, onUpdate) {
	this.controlType = primitives.helpers.controls.ControlType.DropDownBox;
	this.id = id;
	this.defaultItem = defaultItem;
	this.caption = caption;
	this.items = items;
	this.valueType = valueType;
	this.onUpdate = onUpdate;
};

primitives.helpers.controls.SizeConfig = function (id, defaultItem, caption, widths, heights, valueType, onUpdate) {
	this.controlType = primitives.helpers.controls.ControlType.SizeBox;
	this.id = id;
	this.defaultItem = defaultItem;
	this.caption = caption;
	this.widths = widths;
	this.heights = heights;
	this.valueType = valueType;
	this.onUpdate = onUpdate;
};

primitives.helpers.controls.TextBoxConfig = function (id, defaultItem, caption, valueType, onUpdate) {
	this.controlType = primitives.helpers.controls.ControlType.TextBox;
	this.id = id;
	this.defaultItem = defaultItem;
	this.caption = caption;
	this.valueType = valueType;
	this.onUpdate = onUpdate;
};

/* Renders */

primitives.helpers.controls.CaptionRender = function () {
	this.render = function (config, namespace) {
		var tagName = config.isBig ? "h3" : "p";
		var controlBody = jQuery("<" + tagName + (config.id !== "" ? " id='" + namespace + config.id + "' " : "") + ">" + config.caption + "</" + tagName + ">");
		return controlBody;
	};
};

primitives.helpers.controls.RadioBoxRender = function () {

	this.render = function (config, namespace, defaultItem) {
		var controlBody = jQuery("<p id=" + namespace + config.id + " title=" + config.id + ">" + config.caption + "</p>");
		for (var key in config.items) {
			var value = config.items[key];
			controlBody.append(jQuery("<br/><label><input name='" + namespace + config.id + "' type='radio' value='" + value + "' " + (value == defaultItem ? "checked" : "") + " />" + primitives.common.splitCamelCaseName(key).join(" ") + "</label>"));
		}

		controlBody.change(function () {
			config.onUpdate(controlBody, config);
		});

		return controlBody;
	};

	this.getValue = function (item, namespace, formatters) {
		var formatter = formatters[item.valueType],
			result = formatter(jQuery("input:radio[name=" + namespace + item.id + "]:checked").val());
		return result;
	};
};

primitives.helpers.controls.CheckBoxRender = function () {

	this.render = function (config, namespace, defaultValue) {
		controlBody = jQuery("<label title=" + config.id + "><input name='" + namespace + config.id + "' type='checkbox' " + (defaultValue == true ? "checked" : "") + " />" + config.caption + "</label><br/>");

		controlBody.change(function () {
			config.onUpdate(controlBody, config);
		});

		return controlBody;
	};

	this.getValue = function (item, namespace, formatters) {
		result = jQuery("input:checkbox[name=" + namespace + item.id + "]").is(':checked');
		return result;
	};
};


primitives.helpers.controls.DropDownBoxRender = function () {

	this.render = function (config, namespace, defaultItem) {
		var controlBody = jQuery("<p id=" + namespace + config.id + " title=" + config.id + ">" + config.caption + ": &nbsp;</p>");
		var controlList = jQuery("<select></select>");
		var key, value;
		controlBody.append(controlList);
		if (primitives.common.isArray(config.items)) {
			var hasItem = false;
			if (defaultItem == null) {
				controlList.append(jQuery("<option value='-1' selected>NULL</option>"));
				hasItem = true;
			}
			for (var index = 0, len = config.items.length; index < len; index += 1) {
				value = config.items[index];
				controlList.append(jQuery("<option value='" + (value == "NULL" ? -1 : value) + "' " + (value == defaultItem ? "selected" : "") + " >" + value + "</option>"));
				if (value == defaultItem) {
					hasItem = true;
				}
			}

			if (!hasItem) {
				controlList.append(jQuery("<option value='" + defaultItem + "' selected>" + defaultItem + "</option>"));
			}
		} else {
			if (defaultItem == null) {
				controlList.append(jQuery("<option value='-1' selected>NULL</option>"));
			}
			for (key in config.items) {
				if (config.items.hasOwnProperty(key)) {
					value = config.items[key];
					controlList.append(jQuery("<option value='" + (value == "NULL" ? -1 : value) + "' " + (value == defaultItem ? "selected" : "") + " >" + primitives.common.splitCamelCaseName(key).join(" ") + "</option>"));
				}
			}
		}

		controlBody.change(function () {
			config.onUpdate(controlBody, config);
		});

		return controlBody;
	};

	this.getValue = function (item, namespace, formatters) {
		var formatter = formatters[item.valueType],
			result = formatter(jQuery("#" + namespace + item.id + " option:selected").val());

		if (result == -1) {
			result = null;
		}
		return result;
	};
};

primitives.helpers.controls.SizeRender = function () {

	this._render = function (config, items, namespace, sideName, defaultItem) {
		var controlBody = jQuery("<span id=" + namespace + config.id + "_" + sideName + " title=" + config.id + ">" + sideName + ": &nbsp;</span>");
		var controlList = jQuery("<select></select>");
		var key, value;
		controlBody.append(controlList);


		var hasItem = false;
		if (defaultItem == null) {
			controlList.append(jQuery("<option value='-1' selected>NULL</option>"));
			hasItem = true;
		}
		for (var index = 0, len = items.length; index < len; index += 1) {
			value = items[index];
			controlList.append(jQuery("<option value='" + (value == "NULL" ? -1 : value) + "' " + (!hasItem && value == defaultItem ? "selected" : "") + " >" + value + "</option>"));
			if (!hasItem && value == defaultItem) {
				hasItem = true;
			}
		}

		if (!hasItem) {
			controlList.append(jQuery("<option value='" + defaultItem + "' selected>" + defaultItem + "</option>"));
		}

		controlBody.change(function () {
			config.onUpdate(controlBody, config);
		});

		return controlBody;
	}
	

	this.render = function (config, namespace, defaultItem) {
		var controlBody = jQuery("<p title=" + config.id + ">" + config.caption + "<br/></p>");

		controlBody.append(this._render(config, config.widths, namespace, "Width", defaultItem && defaultItem.width));
		controlBody.append("&nbsp;");
		controlBody.append(this._render(config, config.heights, namespace, "Height", defaultItem && defaultItem.height));

		return controlBody;
	};

	this.getValue = function (item, namespace, formatters) {
		var formatter = formatters[item.valueType],
			result = formatter(jQuery("#" + namespace + item.id + "_Width option:selected").val(), jQuery("#" + namespace + item.id + "_Height option:selected").val());

		if (result == -1) {
			result = null;
		}
		return result;
	};
};

primitives.helpers.controls.TextBoxRender = function () {
	this.render = function (config, namespace, defaultValue) {
		var controlBody = jQuery('<br/><label title="' + config.id + '" for="' + namespace + config.id + '">' + config.caption + '</label>&nbsp;<input type="text" name="' + namespace + config.id + '" class="text ui-widget-content ui-corner-all" value="' + (defaultValue != null ? defaultValue : "") + '" />');

		controlBody.change(function () {
			config.onUpdate(controlBody, config);
		});

		return controlBody;
	};

	this.getValue = function (item, namespace, formatters) {
		var formatter = formatters[item.valueType],
			result = formatter(jQuery("input[name=" + namespace + item.id + "]").val());
		return result;
	};
};

/* Formatters */

primitives.helpers.controls.ValueType = {
	Integer: 0,
	String: 1,
	Number: 2,
	Boolean: 3,
	Size: 4,
	Thickness: 5
};

primitives.helpers.controls.IntegerFormatter = function (value) {
	return parseInt(value, 10);
};

primitives.helpers.controls.StringFormatter = function (value) {
	return value != null ? value.toString() : value;
};

primitives.helpers.controls.NumberFormatter = function (value) {
	return parseFloat(value, 10);
};

primitives.helpers.controls.BooleanFormatter = function (value) {
	var stringValue = value.toString().toLowerCase();
	return stringValue == "true" || stringValue == "1";
};

primitives.helpers.controls.SizeFormatter = function (arg0, arg1) {
	var result = null,
		value,
		width, height;
	switch (arguments.length) {
		case 1:
			value = parseFloat(arg0, 10);
			result = new primitives.common.Size(value, value);
			break;
		case 2:
			width = parseFloat(arg0, 10);
			height = parseFloat(arg1, 10);
			result = new primitives.common.Size(width, height);
			break;
	}
	return result;
};

primitives.helpers.controls.ThicknessFormatter = function (value) {
	value = parseFloat(value, 10);
	return new primitives.common.Thickness(value, value, value, value);
};

/* Render */

primitives.helpers.controls.PanelConfig = function (caption, items, namespace) {
	this.caption = caption;
	this.items = items;
	this.namespace = namespace;
};

primitives.helpers.controls.Render = function (panels, defaultValues) {
	this.renders = {};
	this.renders[primitives.helpers.controls.ControlType.Caption] = new primitives.helpers.controls.CaptionRender();
	this.renders[primitives.helpers.controls.ControlType.RadioBox] = new primitives.helpers.controls.RadioBoxRender();
	this.renders[primitives.helpers.controls.ControlType.CheckBox] = new primitives.helpers.controls.CheckBoxRender();
	this.renders[primitives.helpers.controls.ControlType.DropDownBox] = new primitives.helpers.controls.DropDownBoxRender();
	this.renders[primitives.helpers.controls.ControlType.SizeBox] = new primitives.helpers.controls.SizeRender();
	this.renders[primitives.helpers.controls.ControlType.TextBox] = new primitives.helpers.controls.TextBoxRender();

	this.formatters = {};
	this.formatters[primitives.helpers.controls.ValueType.Integer] = primitives.helpers.controls.IntegerFormatter;
	this.formatters[primitives.helpers.controls.ValueType.String] = primitives.helpers.controls.StringFormatter;
	this.formatters[primitives.helpers.controls.ValueType.Number] = primitives.helpers.controls.NumberFormatter;
	this.formatters[primitives.helpers.controls.ValueType.Boolean] = primitives.helpers.controls.BooleanFormatter;
	this.formatters[primitives.helpers.controls.ValueType.Size] = primitives.helpers.controls.SizeFormatter;
	this.formatters[primitives.helpers.controls.ValueType.Thickness] = primitives.helpers.controls.ThicknessFormatter;

	this.panels = panels;
	this.defaultValues = defaultValues;

	this.render = function (placeholder) {
		var accordion = jQuery('<div></div>');
		placeholder.append(accordion);

		for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
			var panelConfig = this.panels[panelIndex];

			accordion.append(jQuery('<h3>' + panelConfig.caption + '</h3>'));
			var content = jQuery('<div></div>');
			accordion.append(content);
			for (var index = 0; index < panelConfig.items.length; index += 1) {
				var item = panelConfig.items[index];
				var render = this.renders[item.controlType];
				var defaulValue = primitives.common.isNullOrEmpty(panelConfig.namespace) ? this.defaultValues[item.id] : this.defaultValues[panelConfig.namespace][item.id];

				content.append(render.render(item, panelConfig.namespace || '', defaulValue));
			}
		}
		accordion.accordion({
			active: 0,
			animate: 30,
			heightStyle: "content"
		});
	};

	this.getValues = function () {
		var result = {};
		for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
			var panelConfig = this.panels[panelIndex];

			var panelOptions = result;
			if (!primitives.common.isNullOrEmpty(panelConfig.namespace)) {
				if (!result.hasOwnProperty(panelConfig.namespace)) {
					result[panelConfig.namespace] = {};
				}
				panelOptions = result[panelConfig.namespace];
			}

			for (var index = 0; index < panelConfig.items.length; index += 1) {
				var item = panelConfig.items[index];
				var render = this.renders[item.controlType];

				if (render.getValue != null) {
					panelOptions[item.id] = render.getValue(item, panelConfig.namespace || '', this.formatters);
				}
			}
		}
		return result;
	};
};

/* Demo Specific Functions */

primitives.helpers.controls.getOrgEditorOptionsRender = function (extraPanels, defaultOptions) {
	var panels = extraPanels;
	panels = panels.concat(primitives.helpers.controls.getCommonOptionsPanels(function () { }, false));

	return new primitives.helpers.controls.Render(panels, defaultOptions);
};

primitives.helpers.controls.getOrgDiagramOptionsRender = function (defaultOptions, onUpdate) {
	var commonOptionsPanels = primitives.helpers.controls.getCommonOptionsPanels(onUpdate, true);
	return new primitives.helpers.controls.Render(commonOptionsPanels, defaultOptions);
};

primitives.helpers.controls.getFamDiagramOptionsRender = function (extraPanels, defaultOptions, onUpdate) {
	var panels = extraPanels;
	panels = panels.concat(primitives.helpers.controls.getFamDiagramOptionsPanels(onUpdate));
	panels = panels.concat(primitives.helpers.controls.getAnnotationsOptionsPanels(onUpdate));
	panels = panels.concat(primitives.helpers.controls.getCommonOptionsPanels(onUpdate, true));

	return new primitives.helpers.controls.Render(panels, defaultOptions);
};

primitives.helpers.controls.getFamDiagramOptionsPanels = function (onUpdate) {
	return [
			new primitives.helpers.controls.PanelConfig("Family Diagram Specific Options", [
				new primitives.helpers.controls.RadioBoxConfig("neighboursSelectionMode", primitives.common.NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses, "Neighbours Selection Modes", primitives.common.NeighboursSelectionMode, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("groupByType", primitives.common.GroupByType.Children, "Group by option defines node placement in layout close to its parents or children when node is linked across multiple levels in hierarchy. See \"alignment\" data set.", { Children: 2, Parents: 1 }, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("alignBylevels", "true", "This option keeps items at the same levels after connections bundling", ["true", "false"], primitives.helpers.controls.ValueType.Boolean, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("hideGrandParentsConnectors", "true", "This option hides direct connectors to grand parents. It helps to reduce diagrams connectors layout complexity. This option should be used together with dynamic highlighting of connectors to grandparents via immidiate parents, so information is not lost.", ["true", "false"], primitives.helpers.controls.ValueType.Boolean, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("enableMatrixLayout", "false", "This option enables natrix layout in family diagram. Nodes having the same set of parents and children are grouped into square shaped matrix in order to keep them visualy together.", ["true", "false"], primitives.helpers.controls.ValueType.Boolean, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("minimumMatrixSize", null, "Minimum number of nodes needed in order to be formed into matrix layout", [2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("maximumColumnsInMatrix", null, "Maximum columns number in matrix nodes layout", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20], primitives.helpers.controls.ValueType.Number, onUpdate)
			])
	];
};

primitives.helpers.controls.getAnnotationsOptionsPanels = function (onUpdate) {
	return [
			new primitives.helpers.controls.PanelConfig("On-screen Annotations Specific Options", [
				new primitives.helpers.controls.RadioBoxConfig("connectorPlacementType", primitives.common.ConnectorPlacementType.Offbeat, "Placement type", primitives.common.ConnectorPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("connectorShapeType", primitives.common.ConnectorShapeType.OneWay, "Connector shape type", primitives.common.ConnectorShapeType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("labelPlacementType", primitives.common.ConnectorLabelPlacementType.Between, "Label Placement type", primitives.common.ConnectorLabelPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("lineWidth", 1, "Line width", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("lineType", primitives.common.LineType.Dashed, "Line type", primitives.common.LineType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("color", primitives.common.Colors.Red, "Color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("offset", 5, "Offset", [-50, -20, -10, -5, 0, 5, 10, 20, 50], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("zOrderType", primitives.common.ZOrderType.Auto, "Connector Z order type", primitives.common.ZOrderType, primitives.helpers.controls.ValueType.Integer, onUpdate)
			], "AnnotationOptions")
	];
};

primitives.helpers.controls.getCommonOptionsPanels = function (onUpdate, showDefaultTemplateOptions) {
	var result = [];
	result.push(new primitives.helpers.controls.PanelConfig("Auto Layout Options", [
				new primitives.helpers.controls.CaptionConfig("Page Fit Mode defines rule of fitting chart into available screen space. Set it to None if you want to disable it.", false),
				new primitives.helpers.controls.RadioBoxConfig("pageFitMode", primitives.common.PageFitMode.FitToPage, "Page Fit Mode", { None: 0, PageWidth: 1, PageHeight: 2, FitToPage: 3, SelectionOnly: 6 }, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("orientationType", primitives.common.OrientationType.Top, "Orientation Type", primitives.common.OrientationType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("verticalAlignment", primitives.common.VerticalAlignmentType.Middle, "Items Vertical Alignment", primitives.common.VerticalAlignmentType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("horizontalAlignment", primitives.common.HorizontalAlignmentType.Center, "Items Horizontal Alignment", primitives.common.HorizontalAlignmentType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("childrenPlacementType", primitives.common.ChildrenPlacementType.Horizontal, "Children placement", primitives.common.ChildrenPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("leavesPlacementType", primitives.common.ChildrenPlacementType.Horizontal, "Leaves placement defines layout shape for items having no children", primitives.common.ChildrenPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("maximumColumnsInMatrix", null, "Maximum columns number in matrix children layout", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("minimalVisibility", primitives.common.Visibility.Dot, "Minimal nodes visibility", primitives.common.Visibility, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("selectionPathMode", primitives.common.SelectionPathMode.FullStack, "Selection Path Mode sets visibility of items between cursor item and root", primitives.common.SelectionPathMode, primitives.helpers.controls.ValueType.Integer, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Default Template Options", [
				new primitives.helpers.controls.RadioBoxConfig("hasButtons", primitives.common.Enabled.Auto, "Show user buttons", primitives.common.Enabled, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("hasSelectorCheckbox", primitives.common.Enabled.True, "Show selection check box", primitives.common.Enabled, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("selectCheckBoxLabel", "Selected", "Selection checkbox label", ["Selected", "Included", "Pinned", "Any label"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.CaptionConfig("Default chart item template tries to select the best matching font color for current title background.", false),
				new primitives.helpers.controls.DropDownBoxConfig("itemTitleFirstFontColor", primitives.common.Colors.White, "Title first font color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("itemTitleSecondFontColor", primitives.common.Colors.White, "Title second font color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("buttonsPanelSize", 28, "Buttons panel size", [28, 56, 84], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("checkBoxPanelSize", 24, "Checkbox panel size", [24, 48, 72], primitives.helpers.controls.ValueType.Number, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Group Titles", [
				new primitives.helpers.controls.RadioBoxConfig("groupTitlePlacementType", primitives.common.AdviserPlacementType.Left, "Placement", primitives.common.AdviserPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitlePanelSize", 24, "Group title panel width", [24, 48, 72], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("groupTitleOrientation", primitives.text.TextOrientationType.RotateRight, "Orientation", primitives.text.TextOrientationType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("groupTitleVerticalAlignment", primitives.common.VerticalAlignmentType.Middle, "Vertical Alignment", primitives.common.VerticalAlignmentType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("groupTitleHorizontalAlignment", primitives.common.HorizontalAlignmentType.Center, "Horizontal Alignment", primitives.common.HorizontalAlignmentType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleColor", primitives.common.Colors.Black, "Background Color", primitives.common.Colors, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.CaptionConfig("For group title color, see title first and second font colors in default template options.", false),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleFontSize", "12px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleFontWeight", "normal", "Font Weight", ["normal", "bold"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleFontStyle", "normal", "Font Style", ["normal", "italic"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleFontFamily", "Arial", "Font Style", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], primitives.helpers.controls.ValueType.String, onUpdate)
	]));
	if (showDefaultTemplateOptions) {
		result.push(new primitives.helpers.controls.PanelConfig("Minimized Item (Dot, Marker)", [
					new primitives.helpers.controls.CaptionConfig("These options are defined per item template. So if you need to show individual markers per item, you have to define template for every marker type and assign it to items. Template is some sort of named property bag.", false),
					new primitives.helpers.controls.CaptionConfig("By default marker has color of itemTitleColor property, download demos and check samples source data. If item has no title color set, then be sure that you set border line width and color for markers having no fill, othewise you are not going to see them.", false),
					new primitives.helpers.controls.SizeConfig("minimizedItemSize", new primitives.common.Size(4, 4), "Marker size", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Size, onUpdate),
					new primitives.helpers.controls.DropDownBoxConfig("minimizedItemCornerRadius", null, "Corner Radius", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20], primitives.helpers.controls.ValueType.Number, onUpdate),
					new primitives.helpers.controls.DropDownBoxConfig("highlightPadding", 2, "Highlight border padding around marker", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Thickness, onUpdate),
					new primitives.helpers.controls.RadioBoxConfig("minimizedItemShapeType", primitives.common.ShapeType.None, "Marker Shape", primitives.common.ShapeType, primitives.helpers.controls.ValueType.Integer, onUpdate),
					new primitives.helpers.controls.DropDownBoxConfig("minimizedItemLineWidth", 1, "Marker border line width", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
					new primitives.helpers.controls.RadioBoxConfig("minimizedItemLineType", primitives.common.LineType.Solid, "Marker border line type", primitives.common.LineType, primitives.helpers.controls.ValueType.Integer, onUpdate),
					new primitives.helpers.controls.CaptionConfig("Following Border and Fill colors properties work only for items having no title color property set. See Parners & Annotations Demo to try them.", false),
					new primitives.helpers.controls.DropDownBoxConfig("minimizedItemBorderColor", null, "Marker border line color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
					new primitives.helpers.controls.DropDownBoxConfig("minimizedItemFillColor", null, "Marker fill color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
					new primitives.helpers.controls.DropDownBoxConfig("minimizedItemOpacity", 1.0, "Opacity", [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], primitives.helpers.controls.ValueType.Number, onUpdate)
		], "DefaultTemplateOptions"));
	}
	result.push(new primitives.helpers.controls.PanelConfig("Intervals", [
				new primitives.helpers.controls.CaptionConfig("Vertical Intervals Between Rows", true),
				new primitives.helpers.controls.DropDownBoxConfig("normalLevelShift", 20, "Normal", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.CaptionConfig("If you enable labels for dots, use the following interval to fit them between levels.", false),
				new primitives.helpers.controls.DropDownBoxConfig("dotLevelShift", 20, "Dotted", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40, 80, 160, 240, 320], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("lineLevelShift", 10, "Lined", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40, 80, 160, 240, 320], primitives.helpers.controls.ValueType.Number, onUpdate),

				new primitives.helpers.controls.CaptionConfig("Horizontal Intervals Between Items in Row", true),
				new primitives.helpers.controls.DropDownBoxConfig("normalItemsInterval", 10, "Normal", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("dotItemsInterval", 2, "Dotted", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("lineItemsInterval", 2, "Lined", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Number, onUpdate),

				new primitives.helpers.controls.DropDownBoxConfig("cousinsIntervalMultiplier", 5, "Additional interval multiplier between cousins, it creates extra space between hierarchies", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 30, 40], primitives.helpers.controls.ValueType.Number, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Connectors", [
				new primitives.helpers.controls.RadioBoxConfig("arrowsDirection", primitives.common.GroupByType.None, "Arrows Direction", primitives.common.GroupByType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("connectorType", primitives.common.ConnectorType.Squared, "Connectors", primitives.common.ConnectorType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("elbowType", primitives.common.ElbowType.None, "Elbows Type", primitives.common.ElbowType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("bevelSize", 4, "Bevel Size", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("elbowDotSize", 4, "Elbow dot Size", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("linesType", primitives.common.LineType.Solid, "Line type", primitives.common.LineType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("linesColor", primitives.common.Colors.Silver, "Color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("linesWidth", 1, "Line width", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("showExtraArrows", "true", "Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines", ["true", "false"], primitives.helpers.controls.ValueType.Boolean, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("extraArrowsMinimumSpace", 30, "Available minimum space to show horizontal arrow", [0, 5, 10, 20, 30, 40, 50, 100, 200, 1000], primitives.helpers.controls.ValueType.Number, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Labels", [
				new primitives.helpers.controls.CaptionConfig("Label property should be defined for every item first, otherwise chart has nothiong to show. Labels are visible only for markers. If you need to add labels to normal size items you have to modify default item template and place text outside item boundaries.", false),
				new primitives.helpers.controls.RadioBoxConfig("showLabels", primitives.common.Enabled.Auto, "Show labels", primitives.common.Enabled, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.SizeConfig("labelSize", new primitives.common.Size(80, 24), "Size: Use this property to define labels bounding rectangle. Labels placed relative to markers(dots), so when they overlap in auto show mode one of them would be hidden. Set appropriate intervals between levels of markers in order to fit and make all labels visible.", [80, 160, 240, 320], [8, 16, 24, 32, 40, 48, 56], primitives.helpers.controls.ValueType.Size, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelOffset", 1, "Offset", [0, 1, 2, 3, 4, 5, 10, 20, 30], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("labelOrientation", primitives.text.TextOrientationType.Horizontal, "Label Orientation", primitives.text.TextOrientationType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("labelPlacement", primitives.common.PlacementType.Top, "Label Placement", primitives.common.PlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelFontSize", "10px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelFontFamily", "Arial", "Font Style", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelColor", primitives.common.Colors.Black, "Font Color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelFontWeight", "normal", "Font Weight", ["normal", "bold"], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("labelFontStyle", "normal", "Font Style", ["normal", "italic"], primitives.helpers.controls.ValueType.String, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Callout", [
				new primitives.helpers.controls.CaptionConfig("By default callout displays item content, but it can be redefined with custom callout template.", false),
				new primitives.helpers.controls.RadioBoxConfig("calloutMaximumVisibility", primitives.common.Visibility.Dot, "Maximum node type visibility", { Normal: 1, Dot: 2, Line: 3 }, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("showCallout", "true", "This option controls callout visibility for minimized items and it can be ovewritten pre item", ["true", "false"], primitives.helpers.controls.ValueType.Boolean, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutPlacementOffset", 100, "Call out placement offset", [10, 20, 30, 40, 50, 100, 200, 300], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutfillColor", "#000000", "Fill color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutBorderColor", null, "Border line color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutOffset", 4, "Offset", [0, 1, 2, 3, 4, 5, 10, 20, 30], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutCornerRadius", 4, "Corner Radius", ["0%", "5%", "10%", "20%", 0, 1, 2, 3, 4, 5, 10, 20, 30], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutPointerWidth", "10%", "Pointer Base Width", ["0%", "5%", "10%", "20%", 0, 5, 10, 20, 50], primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutLineWidth", 1, "Line width", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("calloutOpacity", 0.2, "Opacity", [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], primitives.helpers.controls.ValueType.Number, onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Interactivity", [
				new primitives.helpers.controls.CaptionConfig("Use this option to disable mouse highlight on touch devices.", false),
				new primitives.helpers.controls.RadioBoxConfig("navigationMode", primitives.common.NavigationMode.Default, "Navigation mode", primitives.common.NavigationMode, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.CaptionConfig("This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.", false),
				new primitives.helpers.controls.DropDownBoxConfig("highlightGravityRadius", 40, "Normal", [0, 5, 10, 20, 30, 40, 50, 100, 200, 1000], primitives.helpers.controls.ValueType.Number, onUpdate),
				new primitives.helpers.controls.CheckBoxConfig("enablePanning", true, "Enable Panning", onUpdate)
	]));
	result.push(new primitives.helpers.controls.PanelConfig("Rendering", [
				new primitives.helpers.controls.CaptionConfig("By default widget preferes SVG graphics mode. Use this property to enforce graphics mode programmatically.", false),
				new primitives.helpers.controls.RadioBoxConfig("graphicsType", primitives.common.GraphicsType.SVG, "Graphics", primitives.common.GraphicsType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.CaptionConfig("In order to achive better greacefull degradation of your diagram use item templates of various sizes instead of CSS scale.", false),
				new primitives.helpers.controls.DropDownBoxConfig("scale", 1.0, "CSS Scale", { "50%": 0.5, "60%": 0.6, "70%": 0.7, "80%": 0.8, "90%": 0.9, "100%": 1.0, "110%": 1.1, "120%": 1.2, "130%": 1.3, "140%": 1.4, "150%": 1.5, "160%": 1.6, "170%": 1.7, "180%": 1.8, "190%": 1.9, "200%": 2.0 }, primitives.helpers.controls.ValueType.Number, onUpdate)
	]));
	return result;
};

/* /bpOrgEditor/enums/TemplateName.js*/
/*
	Enum: primitives.orgeditor.TemplateName
		Defines available templates.
	
	Default - Built in template.
	Contact - Extended version of default template having phone & email fields.
	PlainDescription - Template has only title & description fields.
*/
primitives.orgeditor.TemplateName =
{
	Default: null,
	Contact: "contactTemplate",
	PlainDescription: "plainDescriptionTemplate",
	Invisible: "invisibleTemplate"
};

/* /bpOrgEditor/views/UserTemplate.js*/
primitives.orgeditor.UserTemplate = function () {
	this.name = "";

};

primitives.orgeditor.UserTemplate.prototype.getTemplate = function () {
	var result = "";

	return result;
};

primitives.orgeditor.UserTemplate.prototype.onRender = function (event, data) {

};

/* /bpOrgEditor/views/UserTemplateContact.js*/
primitives.orgeditor.UserTemplateContact = function () {
	this.name = "contactTemplate";

};

primitives.orgeditor.UserTemplateContact.prototype = new primitives.orgeditor.UserTemplate();

primitives.orgeditor.UserTemplateContact.prototype.getTemplate = function () {
	var result = new primitives.orgdiagram.TemplateConfig(),
		itemTemplate;
	result.name = this.name;
	result.itemSize = new primitives.common.Size(180, 120);
	result.minimizedItemSize = new primitives.common.Size(4, 4);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


	itemTemplate = jQuery(
	  '<div class="bp-item bp-corner-all bt-item-frame">'
		+ '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 176px; height: 20px;">'
			+ '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 168px; height: 18px;">'
			+ '</div>'
		+ '</div>'
		+ '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
			+ '<img name="photo" style="height:60px; width:50px;" />'
		+ '</div>'
		+ '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 122px; height: 18px; font-size: 12px;"></div>'
		+ '<div name="email" class="bp-item" style="top: 44px; left: 56px; width: 122px; height: 18px; font-size: 12px;"></div>'
		+ '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 122px; height: 36px; font-size: 10px;"></div>'
		+ '<a name="readmorelabel" class="bp-item bp-readmore" style="top: 102px; left: 4px; width: 172px; height: 16px; font-size: 10px;"></a>'
	+ '</div>'
	).css({
		width: result.itemSize.width + "px",
		height: result.itemSize.height + "px"
	});
	result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

	return result;
};

primitives.orgeditor.UserTemplateContact.prototype.onRender = function (event, data, config) {
	var itemConfig = data.context,
		index,
		len,
		fields,
		field,
		newValue,
		element,
		readmorelabel;

	readmorelabel = data.element.find("[name=readmorelabel]");

	switch (data.renderingMode) {
		case primitives.common.RenderingMode.Create:
			/* Initialize widgets here */
			readmorelabel.click(function (e) {
				/* Block mouse click propogation in order to avoid layout updates before server postback*/
				primitives.common.stopPropagation(e);
			});
			break;
		case primitives.common.RenderingMode.Update:
			/* Update widgets here */
			break;
	}

	data.element.find("[name=photo]").attr({ "src": itemConfig.image });
	data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
	data.element.find("[name=title]").css({ "color": primitives.common.highestContrast(itemConfig.itemTitleColor, config.itemTitleSecondFontColor, config.itemTitleFirstFontColor) });

	fields = ["title", "description", "phone", "email", "readmorelabel"];
	for (index = 0, len = fields.length; index < len; index += 1) {
		field = fields[index];

		element = data.element.find("[name=" + field + "]");
		newValue = itemConfig[field] != null ? itemConfig[field] : "";
		if (element.text() !== newValue) {
			element.text(newValue);
		}
	}

	readmorelabel.css({"visibility": (!primitives.common.isNullOrEmpty(itemConfig.readmorelabel) ? "inherit" : "hidden")});

	if (!primitives.common.isNullOrEmpty(itemConfig.readmoreurl)) {
		readmorelabel.attr({ "href": itemConfig.readmoreurl });
	} else {
		readmorelabel.removeAttr("href");
	}

};

/* /bpOrgEditor/views/UserTemplateDescription.js*/
primitives.orgeditor.UserTemplateDescription = function () {
	this.name = "plainDescriptionTemplate";

};

primitives.orgeditor.UserTemplateDescription.prototype = new primitives.orgeditor.UserTemplate();

primitives.orgeditor.UserTemplateDescription.prototype.getTemplate = function () {
	var result = new primitives.orgdiagram.TemplateConfig(),
		itemTemplate;
	result.name = this.name;
	result.itemSize = new primitives.common.Size(120, 100);
	result.minimizedItemSize = new primitives.common.Size(4, 4);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


	itemTemplate = jQuery(
	  '<div class="bp-item bp-corner-all bt-item-frame">'
		+ '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 116px; height: 20px;">'
			+ '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 108px; height: 18px;">'
			+ '</div>'
		+ '</div>'
		+ '<div name="description" class="bp-item" style="top: 26px; left: 4px; width: 112px; height: 56px; font-size: 10px;"></div>'
		+ '<a name="readmorelabel" class="bp-item bp-readmore" style="top: 82px; left: 4px; width: 112px; height: 16px; font-size: 10px;"></a>'
	+ '</div>'
	).css({
		width: result.itemSize.width + "px",
		height: result.itemSize.height + "px"
	});
	result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

	return result;
};

primitives.orgeditor.UserTemplateDescription.prototype.onRender = function (event, data, config) {
	var itemConfig = data.context,
		index,
		len,
		fields,
		field,
		newValue,
		element,
		readmorelabel;

	readmorelabel = data.element.find("[name=readmorelabel]");
	switch (data.renderingMode) {
		case primitives.common.RenderingMode.Create:
			/* Initialize widgets here */
			readmorelabel.click(function (e) {
				/* Block mouse click propogation in order to avoid layout updates before server postback*/
				primitives.common.stopPropagation(e);
			});
			break;
		case primitives.common.RenderingMode.Update:
			/* Update widgets here */
			break;
	}

	data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
	data.element.find("[name=title]").css({ "color": primitives.common.highestContrast(itemConfig.itemTitleColor, config.itemTitleSecondFontColor, config.itemTitleFirstFontColor) });

	fields = ["title", "description", "readmorelabel"];
	for (index = 0, len = fields.length; index < len; index += 1) {
		field = fields[index];

		element = data.element.find("[name=" + field + "]");
		newValue = itemConfig[field] != null ? itemConfig[field] : "";
		if (element.text() !== newValue) {
			element.text(newValue);
		}
	}
	readmorelabel.css({"visibility": (!primitives.common.isNullOrEmpty(itemConfig.readmorelabel) ? "inherit" : "hidden")});
	if (!primitives.common.isNullOrEmpty(itemConfig.readmoreurl)) {
		readmorelabel.attr({ "href": itemConfig.readmoreurl });
	} else {
		readmorelabel.removeAttr("href");
	}
};

/* /bpOrgEditor/views/UserTemplateInvisible.js*/
primitives.orgeditor.UserTemplateInvisible = function () {
	this.name = "invisibleTemplate";

};

primitives.orgeditor.UserTemplateInvisible.prototype = new primitives.orgeditor.UserTemplate();

primitives.orgeditor.UserTemplateInvisible.prototype.getTemplate = function () {
	var result = new primitives.orgdiagram.TemplateConfig(),
		itemTemplate;
	result.name = this.name;
	result.itemSize = new primitives.common.Size(120, 100);
	result.minimizedItemSize = new primitives.common.Size(4, 4);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


	itemTemplate = jQuery(
	  '<div class="bp-item bp-corner-all bt-item-frame">'
		+ '<div class="bp-item" style="top: 4px; left: 4px; width: 112px; height: 92px; font-size: 10px;">'
		+ 'This item is invisible to user and its children logically belong to its first visible parent.'
		+ '</div>'
	+ '</div>'
	).css({
		width: result.itemSize.width + "px",
		height: result.itemSize.height + "px"
	});
	result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

	return result;
};

primitives.orgeditor.UserTemplateInvisible.prototype.onRender = function (event, data, config) {
	var itemConfig = data.context;

	data.element.find("[name=title]").text(itemConfig.title);
};

/* /bpOrgEditor/configs/Config.js*/
/*
	Class: primitives.orgeditor.Config
		Organizational Diagram Editor
		options class.
*/
primitives.orgeditor.Config = function () {
	this.classPrefix = "bporgeditor";

	/*
	Event: onSave
		Notifies about any changes in diagram.

	*/
	this.onSave = null;

	/*
		Property: editMode
			Defines widget's edit mode. 

		Default:
			true
	*/
	this.editMode = true;

	/*
		Property: navigationMode
			Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
			It has highlight for mouse over feedback and it has cursor for showing currently selected single node in diagram.
			In order to avoid creation of plus/minus buttons for children nodes folding and unfolding, 
			this functionality is done automatically for current cursor item. This is especially true for family diagram, 
			because it has no logical root, so cursor plays vital role for unfolding of nodes 
			and zooming into area of user interest in diagram.
			Use this option to disable highlight which does not make sense on touch devices or make control inactive completly.

		See Also:
			<primitives.common.NavigationMode>
		Default:
			<primitives.common.NavigationMode.Default>
	*/
	this.navigationMode = primitives.common.NavigationMode.Default;

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type 
			is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.SVG;

	/*
		Property: pageFitMode
			Defines the way diagram is fit into page. 

		Default:
			<primitives.common.PageFitMode.FitToPage>
	*/
	this.pageFitMode = primitives.common.PageFitMode.FitToPage;

	/*
		Property: verticalAlignment
			Defines items vertical alignment relative to each other within one level of hierarchy. 
			It does not affect levels having same size items.
		
		Default:
			<primitives.common.VerticalAlignmentType.Middle>
	*/
	this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: arrowsDirection
			Sets direction of connector lines arrows.

		Default:
			<primitives.common.GroupByType.None>
	*/
	this.arrowsDirection = primitives.common.GroupByType.None;

	/*
		Property: showExtraArrows
			Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines.
			This options if off by default for organizational diagram.

		Default:
			false
	*/
	this.showExtraArrows = false;

	/*
	Property: extraArrowsMinimumSpace
		If diagram is small relations between objects are easy to trace, so mutual positions of parents and children are enough to navigate from parent to children and backward.
		If diagram is large and one row of children exceeds screen width then it use this option to activate horizontal arrows for large intervals between items.

	Default:
		30
	*/
	this.extraArrowsMinimumSpace = 30;

	/*
		Property: horizontalAlignment
			Defines items horizontal alignment relative to their parent. 
		
		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
	Property: connectorType
		   Defines connector lines style for dot and line elements.
		
		Default:
			<primitives.common.ConnectorType.Angular>
	*/
	this.connectorType = primitives.common.ConnectorType.Angular;


	/*
		Property: bevelSize
			Size of squared connector bevel.

		Default:
			4
	*/
	this.bevelSize = 4;

	/*
		Property: elbowType
			Style squared connectors with custom elbows.

		Default:
			<primitives.common.ElbowType.None>
	*/
	this.elbowType = primitives.common.ElbowType.None;

	/*
		Property: elbowDotSize
			Size of elbow dot.

		Default:
			4
	*/
	this.elbowDotSize = 4;

	/*
	Property: items
		This is array of items in hierarchy.
	*/
	this.items = null;

	/*
	Property: highlightGravityRadius
		The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
		When items is minimized its marker can be so small that it is going to be difficult for end user to place mouse pointer inside of it.
		This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.
		This property is ignored when nearest item is outside of screen boundaries and not visible to end user.
	*/
	this.highlightGravityRadius = 40;

	/*
	Property: hasSelectorCheckbox
		This option controls selection check boxes visibility. 

	Auto - Checkbox shown only for current cursor item only.
	True - Every full size item has selection check box.
	False - No check boxes. Application can still programmatically select some items in the chart. 
	Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
	it is auto used as default selection check box.

	Default:
		<primitives.common.Enabled.Auto>

	See Also:
		<primitives.orgdiagram.ItemConfig.hasSelectorCheckbox>
		<primitives.orgdiagram.Config.onSelectionChanging>
		<primitives.orgdiagram.Config.onSelectionChanged>
	*/
	this.hasSelectorCheckbox = primitives.common.Enabled.Auto;

	/*
		Property: selectCheckBoxLabel
			Selection check box label. 
	*/
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
		Defines the way items displayed between root and selected items in diagram. 
		
	Default:
		<primitives.common.SelectionPathMode.FullStack>
	*/
	this.selectionPathMode = primitives.common.SelectionPathMode.FullStack;

	/*
	Property: hasButtons
		This option controls user buttons visibility. 

	Auto - Buttons visible only for cursor item.
	True - Every normal item has buttons visible.
	False - No buttons.

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = primitives.common.Enabled.Auto;

	/*
	Property: minimalVisibility
		Defines the way diagram collapses items when it has not enough space to fit all items. 
		
	Default:
		<primitives.common.Visibility.Dot>
	*/
	this.minimalVisibility = primitives.common.Visibility.Dot;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
			Rotation to the right side is equivalent to left side placement 
			in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = primitives.common.OrientationType.Top;

	/*
	Property: defaultTemplateName
		This is template name used to render items having no <primitives.orgdiagram.ItemConfig.templateName> defined.


		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
	*/
	this.defaultTemplateName = null/*primitives.orgeditor.TemplateName.Default*/;

	/*
	method: update
		Makes full redraw of diagram contents reevaluating all options.
	
	Parameters:
		updateMode: Parameter defines the way diagram 
		should be updated  <primitives.common.UpdateMode>. 
		For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.
		
	*/

	/*
	Property: itemTitleFirstFontColor
	This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.orgdiagram.Config.itemTitleSecondFontColor>.

	See Also:
	<primitives.orgdiagram.ItemConfig.itemTitleColor>
	<primitives.orgdiagram.Config.itemTitleSecondFontColor>
	<primitives.common.highestContrast>

	*/
	this.itemTitleFirstFontColor = primitives.common.Colors.White;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
	*/
	this.itemTitleSecondFontColor = primitives.common.Colors.Navy;

	/*
	Property: linesColor
		Connectors lines color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.linesColor = primitives.common.Colors.Silver;

	/*
	Property: linesWidth
		Connectors lines width.
	*/
	this.linesWidth = 1;

	/*
	Property: linesType
		Connectors line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.linesType = primitives.common.LineType.Solid;

	/*
Property: showCallout
	This option controls callout visibility for dotted/(markers) items. 

Default:
	true
*/
	this.showCallout = true;

	/*
	Property: calloutPlacementOffset
		Set this property value depending on size and intervals between markers so callout annotation does not overlap neighbouring items of marker it is shown for.
	*/
	this.calloutPlacementOffset = 100;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.orgdiagram.Config.templates> collection property.

	Default:
		null
	*/
	this.defaultCalloutTemplateName = null/*primitives.orgeditor.TemplateName.Default*/;

	/*
	Property: calloutfillColor
		Annotation callout fill color.
	*/
	this.calloutfillColor = "#000000";

	/*
	Property: calloutBorderColor
		Annotation callout border color.
	*/
	this.calloutBorderColor = null;

	/*
	Property: calloutOffset
		Annotation callout offset.
	*/
	this.calloutOffset = 4;

	/*
	Property: calloutCornerRadius
		Annotation callout corner radius.
	*/
	this.calloutCornerRadius = 4;

	/*
	Property: calloutPointerWidth
		Annotation callout pointer base width.
	*/
	this.calloutPointerWidth = "10%";

	/*
	Property: calloutLineWidth
		Annotation callout border line width.
	*/
	this.calloutLineWidth = 1;

	/*
	Property: calloutOpacity
		Annotation callout opacity.
	*/
	this.calloutOpacity = 0.2;


	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = primitives.common.ChildrenPlacementType.Horizontal;

	/*
	Property: leavesPlacementType
		Defines leaves placement form. Leaves are children having no sub children.
	*/
	this.leavesPlacementType = primitives.common.ChildrenPlacementType.Matrix;

	/*
	Property: maximumColumnsInMatrix
		Maximum number of columns for matrix leaves layout. Leaves are children having no sub children.
	*/
	this.maximumColumnsInMatrix = 6;

	/*
	Property: buttonsPanelSize
		User buttons panel size.
	*/
	this.buttonsPanelSize = 28;

	/*
	Property: groupTitlePanelSize
		Group title panel size.
	*/
	this.groupTitlePanelSize = 24;

	/*
	Property: checkBoxPanelSize
		Selection check box panel size.
	*/
	this.checkBoxPanelSize = 24;

	/*
	Property: groupTitleOrientation
		Group title direction style. 

	Default:
		<primitives.text.TextDirection.Auto>
*/
	this.groupTitleOrientation = primitives.text.TextOrientationType.RotateRight;

	/*
		Property: groupTitleVerticalAlignment
			Group title vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.groupTitleVerticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: groupTitleHorizontalAlignment
			Group title horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.groupTitleHorizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
		Property: groupTitleFontSize
			Group title font size. 

		Default:
			15
	*/
	this.groupTitleFontSize = "12px";

	/*
		Property: groupTitleFontFamily
			Group title font family. 

		Default:
			"Arial"
	*/
	this.groupTitleFontFamily = "Arial";

	/*
		Property: groupTitleColor
			Group title color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.groupTitleColor = primitives.common.Colors.RoyalBlue;

	/*
		Property: groupTitleFontWeight
			Group title font weight: normal | bold

		Default:
			"normal"
	*/
	this.groupTitleFontWeight = "normal";

	/*
		Property: groupTitleFontStyle
			Group title font style: normal | italic
		
		Default:
			"normal"
	*/
	this.groupTitleFontStyle = "normal";

	/*
		Property: scale
			CSS3 scale transform.
	*/
	this.scale = 1;

	/*
	Property: normalLevelShift
		Defines interval after level of items in  diagram having items in normal state.

	See also:
		<primitives.common.RenderEventArgs>
	*/
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
		Defines interval after level of items in  diagram having items in dot state.
	*/
	this.dotLevelShift = 10;
	/*
	Property: lineLevelShift
		Defines interval after level of items in  diagram having items in line state.
	*/
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
		Defines interval between items at the same level in  diagram having items in normal state.
	*/
	this.normalItemsInterval = 20;
	/*
	Property: dotItemsInterval
		Defines interval between items at the same level in  diagram having items in dot state.
	*/
	this.dotItemsInterval = 10;
	/*
	Property: lineItemsInterval
		Defines interval between items at the same level in  diagram having items in line state.
	*/
	this.lineItemsInterval = 5;

	/*
	Property: cousinsIntervalMultiplier
		Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
		So children belonging to different parents have extra gap between them.
	
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	Property: showLabels
		This option controls items labels visibility. Labels are displayed in form of divs having text inside, long strings are wrapped inside of them. 
		User can control labels position relative to its item. Chart does not preserve space for labels, 
		so if they overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.

	Auto - depends on available space.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.orgdiagram.ItemConfig.label>
	<primitives.orgdiagram.Config.labelSize>
	<primitives.orgdiagram.Config.normalItemsInterval>
	<primitives.orgdiagram.Config.dotItemsInterval>
	<primitives.orgdiagram.Config.lineItemsInterval>
	<primitives.orgdiagram.Config.normalLevelShift>
	<primitives.orgdiagram.Config.dotLevelShift>
	<primitives.orgdiagram.Config.lineLevelShift>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabels = primitives.common.Enabled.Auto;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(10, 24);
	*/
	this.labelSize = new primitives.common.Size(10, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

    See Also:
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = primitives.text.TextOrientationType.Horizontal;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = primitives.common.PlacementType.Top;

	/*
	Property: labelFontSize
		Label font size. 

	Default:
		10px
*/
	this.labelFontSize = "10px";

	/*
		Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
	*/
	this.labelFontFamily = "Arial";

	/*
		Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
	*/
	this.labelColor = primitives.common.Colors.Black;

	/*
		Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.labelFontWeight = "normal";

	/*
	Property: labelFontStyle
		Font style: normal | italic
		
	Default:
		"normal"
	*/
	this.labelFontStyle = "normal";

	/*
		Property: enablePanning
			Enable chart panning with mouse drag & drop for desktop browsers.
			Disable it if you need to support items Drag & Drop.

		Default:
			true
	*/
	this.enablePanning = true;
};

/* /bpOrgEditor/controllers/Controller.js*/
/*
	Class: jQuery.bpOrgEditor
		jQuery UI Organizational Diagram Editor 
*/
primitives.orgeditor.Controller = function () {
	this.widgetEventPrefix = "bporgeditor";
	this.timer = null;

	this.options = new primitives.orgeditor.Config();

	this.panelHeight = 50;

	this.formsPlaceholder = null;
	this.orgDiagram = null;
	this.dlgOrgChart = null;
	this.dlgItemConfig = null;
	this.dlgConfig = null;
	this.dlgCodeMirror = null;

	this.dlgMessage = null;

	this.selectedItem = null;

	this.fieldsToClone = ["navigationMode", "graphicsType", "pageFitMode", "verticalAlignment",
		"arrowsDirection", "showExtraArrows", "extraArrowsMinimumSpace",
		"horizontalAlignment", "connectorType", "bevelSize", "elbowType", "elbowDotSize",
		"items", "highlightGravityRadius", "hasSelectorCheckbox", "selectCheckBoxLabel", "selectionPathMode",
		"hasButtons", "minimalVisibility", "orientationType", 
		"defaultTemplateName",
		"itemTitleFirstFontColor", "itemTitleSecondFontColor",
		"linesColor", "linesWidth", "linesType",
		"showCallout", "calloutPlacementOffset", "defaultCalloutTemplateName", "calloutfillColor",
		"calloutBorderColor", "calloutOffset", "calloutCornerRadius", "calloutPointerWidth", "calloutLineWidth", "calloutOpacity",

		"childrenPlacementType", "leavesPlacementType", "maximumColumnsInMatrix",

		"buttonsPanelSize", "groupTitlePanelSize", "checkBoxPanelSize", 

		"groupTitleOrientation", "groupTitleVerticalAlignment", "groupTitleHorizontalAlignment", 
		"groupTitleFontSize", "groupTitleFontFamily", "groupTitleColor", "groupTitleFontWeight", "groupTitleFontStyle",

		"scale",

		"normalLevelShift", "dotLevelShift", "lineLevelShift",
		"normalItemsInterval", "dotItemsInterval", "lineItemsInterval",
		"cousinsIntervalMultiplier",
		
		"showLabels", "labelSize", "labelOffset", "labelOrientation", "labelPlacement",
		"labelFontSize", "labelFontFamily", "labelColor", "labelFontWeight", "labelFontStyle", 

		"enablePanning",

		"annotations"];

	this.userTemplates = {
		contactTemplate: new primitives.orgeditor.UserTemplateContact(),
		plainDescriptionTemplate: new primitives.orgeditor.UserTemplateDescription(),
		invisibleTemplate: new primitives.orgeditor.UserTemplateInvisible()
	};
};

primitives.orgeditor.Controller.prototype._create = function () {
	this.element
			.addClass("bp-item");

	this._createLayout();
	this._updateLayout();
	this._updateWidgets();
};

primitives.orgeditor.Controller.prototype.destroy = function () {
    this._cleanLayout();

    this.timer = null;
};

primitives.orgeditor.Controller.prototype._createLayout = function () {
	var content,
		contentString = "";

	contentString += '<div name="forms-placeholder" class="bp-item" style="overflow:hidden; display:none;">'
			+ '<div name="dialog-confirm" class="dialog-form" title="Delete?">'
			+ '<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>This item and all its sub-items will be deleted. Are you sure?</p>'
			+ '</div>'
			+ '<div name="dialog-message" title="Warning">'
			+ '<p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;"></span>'
			+ 'You cannot remove or move root item in organizational chart.'
			+ '</p>'
			+ '</div>'
			+ '<div name="config-form"></div>'
			+ '<div name="codemirror-form" style="margin:0; padding:0;"></div>'
			+ '<div name="itemconfig-form"></div>'
			+ '<div name="orgchart-form"></div>'
			+ '</div>';

	contentString += '<div name="orgchart-widget" class="bp-item" style="overflow:hidden; padding: 0px; margin: 0px; border: 0px;"></div>';

	contentString += '<div name="orgchart-panel" style="padding: 0px; margin:10px;">';
    contentString += '<div style="width:120px;" name="options-button">Options</div><div style="width:120px;" name="json-button">JSON</div>';
	contentString += '<div style="float: right;"><label for="search100">Search:&nbsp;</label><input id="search100" name="search" style="padding: 0.4em; height: 18px; margin-right: 20px;" /></div>';
	contentString += '</div>';

	content = jQuery(contentString).addClass(this.widgetEventPrefix);
	this.element.append(content);

	this._createWidgets(this.element);
};

primitives.orgeditor.Controller.prototype._createWidgets = function () {
    var widgetPosition = new primitives.common.Rect(0, this.panelHeight, this.element.innerWidth(), this.element.innerHeight() - this.panelHeight),
		panelPosition = new primitives.common.Rect(0, 0, widgetPosition.width, this.panelHeight),
		self = this;

	this.formsPlaceholder = this.element.find("[name=forms-placeholder]");
	this.formsPlaceholder.css(widgetPosition.getCSS());

	this.dlgOrgChart = this.element.find("[name=orgchart-form]").bpDlgOrgDiagram();
	this.dlgConfig = this.element.find("[name=config-form]").bpDlgConfig();

	if (window.CodeMirror != null) {
		this.dlgCodeMirror = this.element.find("[name=codemirror-form]").bpDlgCodeMirror();
	}
	this.dlgItemConfig = this.element.find("[name=itemconfig-form]").bpDlgItemConfig();

	this.dlgMessage = this.element.find("[name=dialog-message]");
	this.dlgConfirm = this.element.find("[name=dialog-confirm]");

	this.orgDiagram = this.element.find("[name=orgchart-widget]");
	this.orgDiagram.css(widgetPosition.getCSS());
	this.orgDiagram.orgDiagram();

	this.buttonsPanel = this.element.find("[name=orgchart-panel]");
	this.buttonsPanel.css(panelPosition.getCSS());

	this.element.find("[name=options-button]").button().click(function () { self._onOptionsButtonClick(); });
	this.element.find("[name=json-button]").button().click(function () { self._onJsonButtonClick(); });
	this.element.find("[name=search]").on('change keyup', function () {
	    var control =  jQuery(this);
	    if (control.data('last') !== control.val()) {
	        control.data('last', control.val());
	        self._onChange(control.val());
	    } 
	});
};

primitives.orgeditor.Controller.prototype._updateWidgets = function () {
    this.orgDiagram.orgDiagram("option", this._getOrgDiagramConfig());
    this.orgDiagram.orgDiagram("update");

    this.element.find("[name=search]").autocomplete({ source: this._getTitles(this.options.items) });
};

primitives.orgeditor.Controller.prototype._getTitles = function (items) {
    var index, len, itemConfig, result = [];
    for (index = 0, len = items.length; index < len; index += 1) {
        itemConfig = items[index];
        if (itemConfig.isVisible == true && !primitives.common.isNullOrEmpty(itemConfig.title)) {
            result.push(itemConfig.title);
        }
    }
    return result;
};


primitives.orgeditor.Controller.prototype._onChange = function () {
    var index, len, itemConfig, 
        items = this.options.items,
        id = null,
        self = this,
        value;

    if (self.timer == null) {
        self.timer = window.setTimeout(function () {
            value = self.buttonsPanel.find("[name=search]").val();
            for (index = 0, len = items.length; index < len; index += 1) {
                itemConfig = items[index];
                if (itemConfig.isVisible == true && itemConfig.title == value) {
                    id = itemConfig.id;
                    break;
                } else if (itemConfig.title.indexOf(value) >= 0) {
                    id = itemConfig.id;
                }
            }
            if (id != null) {
                self.orgDiagram.orgDiagram("option", { cursorItem: id });
                self.orgDiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
            }
            window.clearTimeout(self.timer);
            self.timer = null;
        }, 300);
    }

};

primitives.orgeditor.Controller.prototype._onOptionsButtonClick = function () {
	var self = this,
		index,
		len,
		fieldToClone,
		options;

	self.dlgConfig.bpDlgConfig("option", {
		"cancel": function () { },
		"update": function () {
			options = {};
			for (index = 0, len = self.fieldsToClone.length; index < len; index += 1) {
				fieldToClone = self.fieldsToClone[index];
				options[fieldToClone] = self.options[fieldToClone];
			}
			self.orgDiagram.orgDiagram("option", options);
			self.orgDiagram.orgDiagram("update");
			self._trigger("onSave");
		}
	});
	self.dlgConfig.bpDlgConfig("open", self.options);
};

primitives.orgeditor.Controller.prototype._onJsonButtonClick = function () {
	var self = this,
		index,
		len,
		fieldToClone,
		options;

	if (this.dlgCodeMirror != null) {
		self.dlgCodeMirror.bpDlgCodeMirror("option", {
			"cancel": function () { },
			"update": function (event, content) {
				options = {};
				for (index = 0, len = self.fieldsToClone.length; index < len; index += 1) {
					fieldToClone = self.fieldsToClone[index];
					self.options[fieldToClone] = content[fieldToClone];
					options[fieldToClone] = content[fieldToClone];
				}
				self._updateItemConfigs(options.items);
				options.cursorItem = options.items[0] != null ? options.items[0].id : null;
				self.orgDiagram.orgDiagram("option", options);
				self.orgDiagram.orgDiagram("update");
				self._trigger("onSave");
			}
		});

		options = {};
		for (index = 0, len = self.fieldsToClone.length; index < len; index += 1) {
			fieldToClone = self.fieldsToClone[index];
			options[fieldToClone] = self.options[fieldToClone];
		}
		self.dlgCodeMirror.bpDlgCodeMirror("open", JSON.stringify(options, undefined, 2));
	} else {
		alert("In order to enable this function you have to download latest version of Basic Primitives Joomla modules.");//ignore jslint
	}
};

primitives.orgeditor.Controller.prototype._cleanLayout = function () {
	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.orgeditor.Controller.prototype._updateItemConfigs = function (items) {
	var index, len, itemConfig;
	for (index = 0, len = items.length; index < len; index += 1) {
		itemConfig = items[index];
		itemConfig.isVisible = true;
		if (itemConfig.templateName === "invisibleTemplate") {
			itemConfig.isVisible = this.options.editMode;
		}
	}
};

primitives.orgeditor.Controller.prototype._updateLayout = function () {
    var widgetPosition = new primitives.common.Rect(0, this.panelHeight, this.element.innerWidth(), this.element.innerHeight() - this.panelHeight),
		panelPosition = new primitives.common.Rect(0, 0, widgetPosition.width, this.panelHeight),
        visibility = (this.options.editMode ? "inherit" : "hidden");
    this.formsPlaceholder.css(widgetPosition.getCSS());
    this.orgDiagram.css(widgetPosition.getCSS());
    this.buttonsPanel.css(panelPosition.getCSS());

    
    this.buttonsPanel.find("[name=options-button]").css({ "visibility": visibility });
    this.buttonsPanel.find("[name=json-button]").css({ "visibility": visibility });
};

 
primitives.orgeditor.Controller.prototype.update = function () {
    this._updateLayout();
    this._updateWidgets();
};

primitives.orgeditor.Controller.prototype._getOrgDiagramConfig = function () {
	var self = this,
		templates = [],
		key,
		index,
		len,
		fieldToClone,
		result;

	for (key in this.userTemplates) {
		if (this.userTemplates.hasOwnProperty(key)) {
			templates.push(this.userTemplates[key].getTemplate());
		}
	}

	result = new primitives.orgdiagram.Config();

	for (index = 0, len = self.fieldsToClone.length; index < len; index += 1) {
		fieldToClone = self.fieldsToClone[index];
		result[fieldToClone] = self.options[fieldToClone];
	}

	this._updateItemConfigs(self.options.items);

	result.cursorItem = self.options.items[0] != null ? self.options.items[0].id : null;

	result.hasButtons = primitives.common.Enabled.False;
	result.hasSelectorCheckbox = primitives.common.Enabled.False;
	result.templates = templates;
	result.onItemRender = function (e, data) { self.userTemplates[data.templateName].onRender(e, data, self.options); };
	result.onMouseClick = function (e, data) { self._onMouseClick(e, data); };
	
	if (this.options.editMode) {
		result.hasButtons = primitives.common.Enabled.Auto;
		result.hasSelectorCheckbox = primitives.common.Enabled.True;
		result.buttons = [
				new primitives.orgdiagram.ButtonConfig("properties", "ui-icon-person", "Edit"),
				new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-trash", "Delete"),
				new primitives.orgdiagram.ButtonConfig("add", "ui-icon-plus", "Add"),
				new primitives.orgdiagram.ButtonConfig("move", "ui-icon-arrow-4", "Move")
		];
		result.onButtonClick = function (e, data) { self._onButtonClick(e, data); };
	}

	return result;
};

primitives.orgeditor.Controller.prototype._onMouseClick = function (e, data) {
	if (!this.options.editMode) {
		var cursorItem = this.orgDiagram.orgDiagram("option", "cursorItem");
		if (data.context != null && cursorItem === data.context.id && !primitives.common.isNullOrEmpty(cursorItem.readmoreurl)) {
			window.location.href = cursorItem.readmoreurl;
		}
	}
};

primitives.orgeditor.Controller.prototype._onButtonClick = function (e, data) {
	var self = this,
		popupConfig,
		index,
		len,
		fieldToClone,
		item,
        newItems,
		children;

	switch (data.name) {
		case "delete":
			if (data.parentItem === null) {
				self.dlgMessage.dialog({
					modal: true,
					buttons: {
						Ok: function () {
							jQuery(this).dialog("close");
						}
					}
				});
			}
			else {
				self.dlgConfirm.dialog({
					resizable: false,
					height: 240,
					modal: true,
					buttons: {
					    "Delete": function () {
					        children = self._getSubItemsForParent(data.context);
					        children[data.context.id] = true;
					        newItems = [];
					        for (index = 0, len = self.options.items.length; index < len; index += 1) {
					            item = self.options.items[index];
					            if (!children.hasOwnProperty(item.id)) {
					                newItems.push(item);
					            }
					        }
					        self.options.items = newItems;
					        self.orgDiagram.orgDiagram("option", {
					            items: self.options.items,
					            cursorItem: data.context.parent
					        });
							self.orgDiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
							jQuery(this).dialog("close");
							self._trigger("onSave");
						},
						Cancel: function () {
							jQuery(this).dialog("close");
						}
					}
				});
			}
			break;
		case "properties":
			self.dlgItemConfig.bpDlgItemConfig("option", {
				"cancel": function () { },
				"update": function () {
				    var childItems = self.dlgItemConfig.bpDlgItemConfig("option", "children"),
                        len,
				        children = {}, child, item;
				    for (index = 0, len = childItems.length; index < len; index += 1) {
				        child = childItems[index];
				        children[child.id] = true;
				    }
				    newItems = [];
				    for (index = 0, len = self.options.items.length; index < len; index += 1) {
				        item = self.options.items[index];
				        if (!children.hasOwnProperty(item.id)) {
				            newItems.push(item);
				        }
				    }
				    self.options.items = newItems.concat(childItems);

				    self.orgDiagram.orgDiagram("option", { items: self.options.items });
					self.orgDiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
					self._trigger("onSave");
				},
				itemConfig: data.context,
				children: self._getChildrenForParent(data.context)
			});
			self.dlgItemConfig.bpDlgItemConfig("open");
			break;
		case "add":
			self.selectedItem = data.context;
			self.dlgItemConfig.bpDlgItemConfig("option", {
				"cancel": function () { },
				"update": function (element) {
				    var newItemConfig = self.dlgItemConfig.bpDlgItemConfig("option", "itemConfig");
				    newItemConfig.id = self._getMaximumId() + 1;
				    newItemConfig.parent = self.selectedItem.id;
				    self.options.items.push(newItemConfig);
				    self.orgDiagram.orgDiagram("option", {
				        items: self.options.items,
				        cursorItem: newItemConfig.id
				    });
					self.orgDiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
					self._trigger("onSave");
				},
				itemConfig: null,
			    children: []
			});
			self.dlgItemConfig.bpDlgItemConfig("open");
			break;
		case "move":
			if (data.parentItem === null) {
				self.dlgMessage.dialog({
					modal: true,
					buttons: {
						Ok: function () {
							jQuery(this).dialog("close");
						}
					}
				});
			}
			else {
				self.selectedItem = data.context;
				self.dlgOrgChart.bpDlgOrgDiagram("option", {
					"cancel": function () { },
					"update": function (element, newParentId) {
					    data.context.parent = newParentId;
						self.orgDiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
						self._trigger("onSave");
					}
				});

				popupConfig = new primitives.orgdiagram.Config();
				for (index = 0, len = self.fieldsToClone.length; index < len; index += 1) {
					fieldToClone = self.fieldsToClone[index];
					popupConfig[fieldToClone] = self.options[fieldToClone];
				}
				popupConfig.hasButtons = primitives.common.Enabled.False;
				popupConfig.hasSelectorCheckbox = primitives.common.Enabled.False;
				popupConfig.items = self.options.items;
				popupConfig.cursorItem = self.orgDiagram.orgDiagram("option", "cursorItem");

				self.dlgOrgChart.bpDlgOrgDiagram("open", popupConfig, data.context);
			}
			break;
	}
};

primitives.orgeditor.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);
};

primitives.orgeditor.Controller.prototype._getMaximumId = function () {
    var result = 0,
        index, len,
        item;
    for (index = 0, len = this.options.items.length; index < len; index += 1) {
        item = this.options.items[index];
        result = Math.max(result, item.id);
    }
    return result;
};

primitives.orgeditor.Controller.prototype._getChildrenForParent = function (parentItem) {
    var result = [],
        index, len, item;
    for (index = 0, len = this.options.items.length; index < len; index += 1) {
        item = this.options.items[index];
        if (item.parent == parentItem.id) {
            result.push(item);
        }
    }
    return result;
};

primitives.orgeditor.Controller.prototype._getSubItemsForParent = function (parentItem) {
    var children = {},
        index, len, item,
        newChildren,
        result,
        tempChildren;
    for (index = 0, len = this.options.items.length; index < len; index += 1) {
        item = this.options.items[index];
        if (children[item.parent] == null) {
            children[item.parent] = [];
        }
        children[item.parent].push(item);
    }
    newChildren = children[parentItem.id];
    result = {};
    if (newChildren != null) {
        while (newChildren.length > 0) {
            tempChildren = [];
            for (index = 0; index < newChildren.length; index+=1) {
                item = newChildren[index];
                result[item.id] = item;
                if (children[item.id] != null) {
                    tempChildren = tempChildren.concat(children[item.id]);
                }
            }
            newChildren = tempChildren;
        }
    }
    return result;
};


/* /bpOrgEditor/bpOrgEditor.js*/
/*
	jQuery UI Widget
	Organizational Diagram Editor

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.autocomplete
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpOrgEditor", new primitives.orgeditor.Controller());
}(jQuery));

/* /DlgCodeMirror/config/dlgCodeMirrorOptions.js*/
/*
    Class: primitives.orgeditor.DlgCodeMirrorOptions
	    Organizational Diagram CodeMirror dialog 
		options class.
*/
primitives.orgeditor.DlgCodeMirrorOptions = function () {
	this.cancel = null;
	this.update = null;
};

/* /DlgCodeMirror/controller/dlgCodeMirror.js*/
/*
    Class: primitives.orgeditor.DlgCodeMirror
	    Organizational Diagram Config dialog
		Controller
*/
primitives.orgeditor.DlgCodeMirror = function () {
	this.widgetEventPrefix = "bpdlgjson";

	this.options = new primitives.orgeditor.DlgCodeMirrorOptions();

	this.placeholder = null;
	this.content = null;

	this.editor = null;
};

primitives.orgeditor.DlgCodeMirror.prototype._create = function () {
	this._createLayout();
};

primitives.orgeditor.DlgCodeMirror.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.orgeditor.DlgCodeMirror.prototype._createLayout = function () {
	var contentString;

	contentString = '<div style="overflow: hidden; padding:0; margin:0; border: 0px;">' +
		'<form><textarea name="content"></textarea></form>' +
		'</div>';

	this.placeholder = jQuery(contentString).addClass(this.widgetEventPrefix);
	this.element.append(this.placeholder);
	this.element.addClass("dialog-form");

	this.content = this.element.find("[name=content]");
};

primitives.orgeditor.DlgCodeMirror.prototype._updateLayout = function () {
	var panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight()),
		codeMirror = this.element.find(".CodeMirror");
	this.placeholder.css(panelSize.getCSS());
	codeMirror.css(panelSize.getCSS());

	this.editor.setSize(panelSize.width + "px", panelSize.height + "px");
};

primitives.orgeditor.DlgCodeMirror.prototype._cleanLayout = function () {
	this.element.empty();
	this.element.removeClass("dialog-form");
};

primitives.orgeditor.DlgCodeMirror.prototype.open = function (content) {
	var self = this;

	this.content.val(content);
	this.editor = CodeMirror.fromTextArea(this.content[0], { lineNumbers: true, matchBrackets: true });

	this.element.dialog({
		autoOpen: false,
		minWidth: 640,
		minHeight: 480,
		modal: true,
		title: "Organizational Chart Data",
		buttons: {
			"Save": function () {
				content = JSON.parse(self.editor.getValue());
				jQuery(this).dialog("close");

				self._trigger("update", null, content);
			},
			Cancel: function () {
				jQuery(this).dialog("close");
				self._trigger("cancel", null);
			}
		},
		resizeStop: function (event, ui) {
			self._updateLayout();
		},
		close: function () {
			self.editor.toTextArea();
			self._trigger("cancel", null);
		},
		open: function (event, ui) {
			self._updateLayout();
		}
	}).dialog("open");
};

primitives.orgeditor.DlgCodeMirror.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);
};

/* /DlgCodeMirror/bpDlgCodeMirror.js*/
/*
 * jQuery UI Widget
 * Organizational Diagram Editor
 * CodeMirror Dialog Widget
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button
 *  jquery.ui.buttonset
 *  jquery.ui.autocomplete
 *	jquery.ui.dialog
 */
(function ($) {
	$.widget("ui.bpDlgCodeMirror", new primitives.orgeditor.DlgCodeMirror());
}(jQuery));

/* /DlgConfig/config/dlgConfigOptions.js*/
/*
	Class: primitives.orgeditor.DlgConfigOptions
		Organizational Diagram Config dialog 
		options class.
*/
primitives.orgeditor.DlgConfigOptions = function () {
	this.cancel = null;
	this.update = null;
};

/* /DlgConfig/controller/dlgConfig.js*/
/*
	Class: primitives.orgeditor.DlgConfig
		Organizational Diagram Config dialog
		Controller
*/
primitives.orgeditor.DlgConfig = function () {
	this.widgetEventPrefix = "bpdlgconfig";

	this.options = new primitives.orgeditor.DlgConfigOptions();
	this.content = null;
	this.tips = null;

};

primitives.orgeditor.DlgConfig.prototype._create = function () {
	this._createLayout();
};

primitives.orgeditor.DlgConfig.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.orgeditor.DlgConfig.prototype._createLayout = function () {
	var form = jQuery('<form></form>');

	this.content = jQuery('<fieldset></fieldset>');

	form.append(this.content);
	this.element.append(form);
	this.element.addClass("dialog-form");
};

primitives.orgeditor.DlgConfig.prototype._cleanLayout = function () {
	this.element.empty();
	this.element.removeClass("dialog-form");
};

primitives.orgeditor.DlgConfig.prototype.open = function (config) {
	var optionsRender = primitives.helpers.controls.getOrgEditorOptionsRender([
			new primitives.helpers.controls.PanelConfig("Editor Specific Options", [
				new primitives.helpers.controls.RadioBoxConfig("defaultTemplateName", null, "Default item template", { Default: "Default", Contact: "contactTemplate", PlainDescription: "plainDescriptionTemplate" }, primitives.helpers.controls.ValueType.String, function () { }),
				new primitives.helpers.controls.RadioBoxConfig("defaultCalloutTemplateName", null, "Default callout template", { Default: "Default", Contact: "contactTemplate", PlainDescription: "plainDescriptionTemplate" }, primitives.helpers.controls.ValueType.String, function () { })
			])
	], config),
		self = this;

	self.content.empty();
	optionsRender.render(this.content);

	this.element.dialog({
		autoOpen: false,
		height: 600,
		width: 800,
		modal: true,
		title: "Chart options",
		buttons: {
			"Save": function () {
				var bValid = true;

				if (bValid) {
					self._updateConfig(config, optionsRender);

					jQuery(this).dialog("close");

					self._trigger("update", null, config);
				}
			},
			Cancel: function () {
				jQuery(this).dialog("close");

				self._trigger("cancel", null, config);
			}
		},
		close: function () {
			self._trigger("cancel", null, config);
		}
	}).dialog("open");
};

primitives.orgeditor.DlgConfig.prototype._updateConfig = function (config, optionsRender) {
	var options = optionsRender.getValues(),
		option,
		value;

	for (option in options) {
		if (options.hasOwnProperty(option)) {
			config[option] = options[option];
		}
	}
};

primitives.orgeditor.DlgConfig.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);
};

/* /DlgConfig/bpDlgConfig.js*/
/*
	jQuery UI Widget
	Organizational Diagram Editor
	Config Dialog Widget

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpDlgConfig", new primitives.orgeditor.DlgConfig());
}(jQuery));

/* /DlgItemConfig/config/dlgItemConfigOptions.js*/
/*
	Class: primitives.orgeditor.DlgItemConfigOptions
		Organizational Diagram Item Config dialog 
		options class.
*/
primitives.orgeditor.DlgItemConfigOptions = function () {
	this.cancel = null;
	this.update = null;

	this.itemConfig = null;
	this.children = [];
};

/* /DlgItemConfig/controller/dlgItemConfig.js*/
/*
	Class: primitives.orgeditor.DlgItemConfig
		Organizational Diagram Item Config dialog
		Controller
*/
primitives.orgeditor.DlgItemConfig = function () {
	this.widgetEventPrefix = "bpdlgitemconfig";

	this.options = new primitives.orgeditor.DlgItemConfigOptions();
	this.sortableList = null;
	this.content = null;
	this.tips = null;
};

primitives.orgeditor.DlgItemConfig.prototype._create = function () {
	this._createLayout();
};

primitives.orgeditor.DlgItemConfig.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.orgeditor.DlgItemConfig.prototype._createLayout = function () {
	var content,
		key,
		item,
		contentString = "";

	contentString += "<ul>";
	contentString += "	<li><a href=\"#" + this.widgetEventPrefix + "options\">Options</a></li>";
	contentString += "	<li><a href=\"#" + this.widgetEventPrefix + "order\">Children order</a></li>";
	contentString += "</ul>";
	contentString += "<div id=\"" + this.widgetEventPrefix + "options\">";
	contentString += '<p class="validateTips">All form fields are required.</p>';
	contentString += '<form><fieldset name="itemConfigOptions"></fieldset></form>';
	contentString += "</div>";
	contentString += "<div id=\"" + this.widgetEventPrefix + "order\">";
	contentString += "<ul name=\"sortable\" class=\"sortable\"></ul>";
	contentString += "</div>";
	content = jQuery(contentString).addClass(this.widgetEventPrefix);

	this.element.append(content);
	this.element.addClass("dialog-form");

	this._createWidgets();
};

primitives.orgeditor.DlgItemConfig.prototype._createWidgets = function () {
	var availableColors = [],
		colorKey,
		key,
		value,
		item,
		enumKey,
		enumItem;

	this.element.tabs();
	this.sortableList = this.element.find("[name=sortable]");
	this.sortableList.sortable();
	this.sortableList.disableSelection();

	this.content = this.element.find("[name=itemConfigOptions]");
	this.tips = this.element.find(".validateTips");
};

primitives.orgeditor.DlgItemConfig.prototype._cleanLayout = function () {
	this.element.empty();
	this.element.removeClass("dialog-form");
};

primitives.orgeditor.DlgItemConfig.prototype.open = function () {
	this.options.itemConfig = this.options.itemConfig != null ? this.options.itemConfig : new primitives.orgdiagram.ItemConfig();

	var onUpdate = function () { },
		optionsRender = new primitives.helpers.controls.Render([
			new primitives.helpers.controls.PanelConfig("Item Options", [
				new primitives.helpers.controls.TextBoxConfig("title", null, "Title", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("description", null, "Description", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("phone", null, "Phone", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("email", null, "E-mail", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("groupTitle", null, "Group Title", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("image", null, "Photo", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("readmorelabel", null, "Read More Label", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("readmoreurl", null, "Read More Url", primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.TextBoxConfig("label", null, "Label", primitives.helpers.controls.ValueType.String, onUpdate)
			]),
			new primitives.helpers.controls.PanelConfig("Item template", [
				new primitives.helpers.controls.RadioBoxConfig("templateName", null, "Item template", { Default: null, Contact: "contactTemplate", PlainDescription: "plainDescriptionTemplate" }, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("calloutTemplateName", null, "Callout template", { Default: null, Contact: "contactTemplate", PlainDescription: "plainDescriptionTemplate" }, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("itemTitleColor", primitives.common.Colors.Red, "Title Color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate),
				new primitives.helpers.controls.DropDownBoxConfig("groupTitleColor", primitives.common.Colors.Red, "Group Title Color", primitives.common.Colors, primitives.helpers.controls.ValueType.String, onUpdate)
			]),
			new primitives.helpers.controls.PanelConfig("Item Placement", [
				new primitives.helpers.controls.RadioBoxConfig("itemType", null, "Item type", { Regular: 0, Assistant: 1, Adviser: 2, SubAssistant: 4, SubAdviser: 5, GeneralPartner: 6, LimitedPartner: 7, AdviserPartner: 8 }, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("adviserPlacementType", null, "Adviser Placement", primitives.common.AdviserPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate)
			]),
			new primitives.helpers.controls.PanelConfig("Marker Label Options", [
				new primitives.helpers.controls.RadioBoxConfig("showLabel", null, "Show Label", primitives.common.Enabled, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("labelOrientation", null, "Label orientation", primitives.text.TextOrientationType, primitives.helpers.controls.ValueType.Integer, onUpdate),
				new primitives.helpers.controls.RadioBoxConfig("labelPlacement", null, "Label placement", primitives.common.PlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate)
			]),
			new primitives.helpers.controls.PanelConfig("Children Layout", [
				new primitives.helpers.controls.RadioBoxConfig("childrenPlacementType", null, "Children Placement", primitives.common.ChildrenPlacementType, primitives.helpers.controls.ValueType.Integer, onUpdate)
			])
	], this.options.itemConfig);

	var self = this;

	self.content.empty();
	optionsRender.render(this.content);

	this._updateSortedList(this.options.children);

	this.element.dialog({
		autoOpen: false,
		height: 600,
		width: 800,
		modal: true,
		title: "Item options",
		buttons: {
			"Save": function () {
				var bValid = true,
					key;
				for (key in self.textFields) {
					if (self.textFields.hasOwnProperty(key)) {
						self[key].removeClass("ui-state-error");
					}
				}

				bValid = bValid && self._checkLength(self.tips, self.element.find("[name=title]"), "Title", 1, 80);
				bValid = bValid && self._checkLength(self.tips, self.element.find("[name=description]"), "Description", 0, 400);

				if (bValid) {
					self._updateConfig(self.options.itemConfig, optionsRender);
					self._updateChildren();

					jQuery(this).dialog("close");

					self._trigger("update", null);
				}
			},
			Cancel: function () {
				jQuery(this).dialog("close");

				self._trigger("cancel", null);
			}
		},
		close: function () {
			var key;
			for (key in self.textFields) {
				if (self.textFields.hasOwnProperty(key)) {
					self[key].val("").removeClass("ui-state-error");
				}
			}

			self._trigger("cancel", null);
		}
	}).dialog("open");
};

primitives.orgeditor.DlgItemConfig.prototype._updateTips = function (tips, text) {
	tips.text(text)
		.addClass("ui-state-highlight");
};

primitives.orgeditor.DlgItemConfig.prototype._checkLength = function (tips, element, text, min, max) {
	var result = true;
	if (element.val().length > max || element.val().length < min) {
		element.addClass("ui-state-error");
		this._updateTips(tips, "Length of " + text + " must be between " + min + " and " + max + ".");
		result = false;
	}
	return result;
};

primitives.orgeditor.DlgItemConfig.prototype._updateSortedList = function (children) {
	var index, len,
		item;

	this.sortableList.empty();
	for (index = 0, len = children.length; index < len; index += 1) {
		item = children[index];

		this.sortableList.append(jQuery("<li id=\"" + index + "\" class=\"ui-state-default\"><span class=\"ui-icon ui-icon-arrowthick-2-n-s\"></span>" + item.title + "</li>"));
	}
};

primitives.orgeditor.DlgItemConfig.prototype._updateConfig = function (config, optionsRender) {
	var options = optionsRender.getValues(),
		option;

	for (option in options) {
		if (options.hasOwnProperty(option)) {
			config[option] = options[option];
		}
	}
};

primitives.orgeditor.DlgItemConfig.prototype._updateChildren = function () {
	var index, len,
		ids, newItems;

	ids = this.sortableList.sortable("toArray");
	if (ids.length > 0) {
		newItems = [];
		for (index = 0, len = ids.length; index < len; index += 1) {
			newItems.push(this.options.children[parseInt(ids[index], 10)]);
		}
		this.options.children.length = 0;
		this.options.children = newItems;
	}
};

primitives.orgeditor.DlgItemConfig.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);
};

/* /DlgItemConfig/bpDlgItemConfig.js*/
/*
	jQuery UI Widget
	Organizational Diagram Editor
	Item Config Dialog Widget

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.autocomplete
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpDlgItemConfig", new primitives.orgeditor.DlgItemConfig());
}(jQuery));

/* /DlgOrgDiagram/config/dlgOrgDiagramOptions.js*/
/*
    _Class: primitives.orgeditor.DlgOrgDiagramOptions
	    Organizational Diagram Dialog 
		options class.
	
*/
primitives.orgeditor.DlgOrgDiagramOptions = function () {
	this.cancel = null;
	this.update = null;
};

/* /DlgOrgDiagram/controller/dlgOrgDiagram.js*/
/*
    _Class: primitives.orgeditor.DlgOrgDiagram
	    Organizational Diagram Dialog
		Controller
*/
primitives.orgeditor.DlgOrgDiagram = function () {
	this.widgetEventPrefix = "bpdlgorgdiagram";

	this.options = new primitives.orgeditor.DlgOrgDiagramOptions();
	this._items = {};
	this.orgdiagram = null;
};

primitives.orgeditor.DlgOrgDiagram.prototype._create = function () {
	this._createLayout();
};

primitives.orgeditor.DlgOrgDiagram.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.orgeditor.DlgOrgDiagram.prototype._createLayout = function () {
	var content;

	content = jQuery(
		  '<div class="bp-item" name="dlgorgdiagram" style="overflow: hidden; padding: 0px; margin: 0px; border: 0px;"></div>'
		).addClass(this.widgetEventPrefix);
	this.element.append(content);
	this.element.css({
		overflow: "hidden"
	});
	this.element.addClass("dialog-form");

	this._createWidgets(this.element);
};

primitives.orgeditor.DlgOrgDiagram.prototype._createWidgets = function () {
	this.orgdiagram = this.element.find("[name=dlgorgdiagram]");
	this.orgdiagram.orgDiagram();
};

primitives.orgeditor.DlgOrgDiagram.prototype._updateWidgets = function (config) {
    var index, len, item;
    this._updateLayout();

    /* hash items by id */
    for (index = 0, len = config.items.length; index < len; index+=1) {
        item = config.items[index];
        this._items[item.id] = item;
    }

	this.orgdiagram.orgDiagram("option", config);
	this.orgdiagram.orgDiagram("update");
};


primitives.orgeditor.DlgOrgDiagram.prototype._updateLayout = function () {
	var panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
	this.orgdiagram.css(panelSize.getCSS());
};

primitives.orgeditor.DlgOrgDiagram.prototype._cleanLayout = function () {
	this.element.empty();
	this.element.removeClass("dialog-form");
};

primitives.orgeditor.DlgOrgDiagram.prototype.open = function (config, currentItemConfig) {
	var allFields = jQuery([]),
		itemConfig = null,
		self = this;

	config = config !== undefined ? config : new primitives.orgdiagram.Config();

	this.element.dialog({
		autoOpen: false,
		minWidth: 640,
		minHeight: 480,
		modal: true,
		title: "Select new parent",
		buttons: {
			"Select": function () {
				var bValid = true;
				allFields.removeClass("ui-state-error");

				itemConfig = self.orgdiagram.orgDiagram("option", "cursorItem");

				bValid = !self._isParentOf(currentItemConfig, itemConfig);

				if (bValid) {
					jQuery(this).dialog("close");

					self._trigger("update", null, itemConfig);
				}
			},
			Cancel: function () {
				jQuery(this).dialog("close");

				self._trigger("cancel");
			}
		},
		close: function () {
			allFields.val("").removeClass("ui-state-error");

			self._trigger("cancel");
		},
		resizeStop: function (event, ui) {
			self._updateLayout();
			self.orgdiagram.orgDiagram("update", primitives.common.UpdateMode.Refresh);
		},
		open: function (event, ui) {
			self._updateWidgets(config);
		}
	}).dialog("open");
};

primitives.orgeditor.DlgOrgDiagram.prototype._isParentOf = function (parentItem, childItem) {
    var result = false;
    if (parentItem.id == childItem.id) {
        result = true;
    } else {
        while (childItem.parent != null) {
            childItem = this._items[childItem.parent];
            if (childItem.id == parentItem.id) {
                result = true;
                break;
            }
        }
    }
    return result;
};

primitives.orgeditor.DlgOrgDiagram.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);
};

/* /DlgOrgDiagram/bpDlgOrgDiagram.js*/
/*
	jQuery UI Widget
	Organizational Diagram Editor
	Organizational Diagram Dialog Widget

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.autocomplete
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpDlgOrgDiagram", new primitives.orgeditor.DlgOrgDiagram());
}(jQuery));

