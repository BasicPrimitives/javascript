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