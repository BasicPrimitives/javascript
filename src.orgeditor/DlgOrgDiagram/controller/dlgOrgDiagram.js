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