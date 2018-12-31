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

