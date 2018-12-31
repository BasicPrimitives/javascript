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