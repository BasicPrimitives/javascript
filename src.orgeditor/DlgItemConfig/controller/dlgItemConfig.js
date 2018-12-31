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