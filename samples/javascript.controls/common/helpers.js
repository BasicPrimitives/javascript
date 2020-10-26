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

  namespace("primitives.helpers.controls");

}());

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
    var element = [tagName];
    if (config.id !== "") {
      element.push({
        id: namespace + config.id
      });
    }
    element.push(config.caption);

    return element;
  };
};

primitives.helpers.controls.RadioBoxRender = function () {

  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p",
      {
        "id": namespace + config.id,
        "title": config.id,
        "$": function (element) {
          element.addEventListener('change', function () {
            config.onUpdate(element, config);
          });
        }
      },
      config.caption
    ];
    for (var key in config.items) {
      var value = config.items[key];
      controlBody.push(["br"]);

      var properties = {
        "name": namespace + config.id,
        "type": 'radio',
        "value": value
      };
      if (value == defaultItem) {
        properties["checked"] = "checked";
      }
      controlBody.push(["label",
        ["input",
          properties,
        ],
        primitives.common.splitCamelCaseName(key).join(" ")
      ]);
    };
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var formatter = formatters[item.valueType],
      result = formatter(this.getRadioValue(namespace + item.id));
    return result;
  };

  this.getRadioValue = function (name) {
    var panel = document.getElementById(name);
    var result = null;
    primitives.common.getElementsByName(this, panel, name, function (element) {
      if (element.checked == true) {
        result = element.value;
      }
    })
    return result;
  }
};

primitives.helpers.controls.CheckBoxRender = function () {

  this.render = function (config, namespace, defaultValue) {
    var properties = {
      "name": namespace + config.id,
      "type": 'checkbox'
    };
    if (defaultValue == true) {
      properties["checked"] = "checked";
    }
    controlBody = ["label",
      {
        "title": config.id,
        "$": function (element) {
          element.addEventListener('change', function () {
            config.onUpdate(element, config);
          });
        }
      },
      ["input",
        properties,
      ],
      config.caption,
      ["br"]
    ];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var checkbox = document.getElementsByName(namespace + item.id)[0];
    return checkbox.checked;
  };
};


primitives.helpers.controls.DropDownBoxRender = function () {

  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p",
      {
        "title": config.id,
        "$": function (element) {
          element.addEventListener('change', function () {
            config.onUpdate(element, config);
          });
        }
      },
      config.caption,
      ":",
      '\xa0'
    ];
    var controlList = ["select",
      {
        "id": namespace + config.id
      }
    ];
    var key, value;
    controlBody.push(controlList);
    if (primitives.common.isArray(config.items)) {
      var hasItem = false;
      if (defaultItem == null) {
        controlList.push(["option",
          {
            "value": '-1',
            "selected": "selected"
          },
          "NULL"
        ]);
        hasItem = true;
      }
      for (var index = 0, len = config.items.length; index < len; index += 1) {
        value = config.items[index];
        var properties = {
          "value": (value == "NULL" ? -1 : value)
        };
        if (value == defaultItem) {
          properties["selected"] = "selected";
        }
        controlList.push(["option",
          properties,
          value.toString()
        ]);
        if (value == defaultItem) {
          hasItem = true;
        }
      }

      if (!hasItem) {
        controlList.push(["option",
          {
            "value": defaultItem,
            "selected": "selected"
          },
          defaultItem.toString()
        ]);
      }
    } else {
      if (defaultItem == null) {
        controlList.push(["option",
          {
            "value": '-1',
            "selected": "selected"
          },
          "NULL"
        ]);
      }
      for (key in config.items) {
        if (config.items.hasOwnProperty(key)) {
          value = config.items[key];
          var properties = {
            "value": (value == "NULL" ? -1 : value)
          };
          if (value == defaultItem) {
            properties["selected"] = "selected";
          }
          controlList.push(["option",
            properties,
            primitives.common.splitCamelCaseName(key).join(" ")
          ]);
        }
      }
    }
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var result;
    var formatter = formatters[item.valueType],
      element = document.getElementById(namespace + item.id);
    if (element.selectedIndex == -1) {
      result = null;
    } else {
      value = element.options[element.selectedIndex].value;
      result = formatter(value);
    };

    if (result == -1) {
      result = null;
    }
    return result;
  };
};

primitives.helpers.controls.SizeRender = function () {

  this._render = function (config, items, namespace, sideName, defaultItem) {
    var controlBody = ["span",
      {
        "title": config.id,
        "$": function (element) {
          element.addEventListener('change', function () {
            config.onUpdate(element, config);
          });
        }
      },
      sideName + ":",
      '\xa0'
    ];
    var controlList = ["select", {
      "id": namespace + config.id + "_" + sideName
    }
    ];
    var key, value;
    controlBody.push(controlList);

    var hasItem = false;
    if (defaultItem == null) {
      controlList.push(["option",
        {
          "value": '-1',
          "selected": "selected"
        },
        "NULL"
      ]);
      hasItem = true;
    }
    for (var index = 0, len = items.length; index < len; index += 1) {
      value = items[index];
      var properties = {
        "value": (value == "NULL" ? -1 : value)
      };
      if (!hasItem && value == defaultItem) {
        properties["selected"] = "selected";
      }
      controlList.push(["option",
        properties,
        value.toString()
      ]);
      if (!hasItem && value == defaultItem) {
        hasItem = true;
      }
    }

    if (!hasItem) {
      controlList.push(["option", {
        "value": defaultItem,
        "selected": "selected"
      },
        defaultItem.toString()
      ]);
    }

    return controlBody;
  }


  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p",
      {
        "title": config.id
      },
      config.caption,
      ["br"],
      this._render(config, config.widths, namespace, "Width", defaultItem && defaultItem.width),
      '\xa0',
      this._render(config, config.heights, namespace, "Height", defaultItem && defaultItem.height)
    ];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var formatter = formatters[item.valueType],
      widthElement = document.getElementById(namespace + item.id + "_Width"),
      width = widthElement.options[widthElement.selectedIndex].value,
      heightElement = document.getElementById(namespace + item.id + "_Height"),
      height = heightElement.options[heightElement.selectedIndex].value,
      result = formatter(width, height);

    if (result == -1) {
      result = null;
    }
    return result;
  };
};

primitives.helpers.controls.TextBoxRender = function () {
  this.render = function (config, namespace, defaultValue) {
    var controlBody = ["span",
      ["br"],
      ["label",
        {
          "title": config.id,
          "for": namespace + config.id
        },
        config.caption
      ],
      '\xa0',
      ["input",
        {
          "type": "text",
          "name=": namespace + config.id,
          "class": ["text", "ui-widget-content", "ui-corner-all"],
          "value": (defaultValue != null ? defaultValue : ""),
          "$": function (element) {
            element.addEventListener('change', function () {
              config.onUpdate(element, config);
            });
          }
        }
      ]
    ];

    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var formatter = formatters[item.valueType],
      element = document.getElementsByName(namespace + item.id)[0],
      result = formatter(element.value);
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
    var accordion = ["div"];

    for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
      var panelConfig = this.panels[panelIndex];

      accordion.push(["h3",
        panelConfig.caption
      ]);
      var content = ["div"];
      accordion.push(content);
      for (var index = 0; index < panelConfig.items.length; index += 1) {
        var item = panelConfig.items[index];
        var render = this.renders[item.controlType];
        var defaulValue = primitives.common.isNullOrEmpty(panelConfig.namespace) ? this.defaultValues[item.id] : this.defaultValues[panelConfig.namespace][item.id];

        content.push(render.render(item, panelConfig.namespace || '', defaulValue));
      }
    }

    placeholder.appendChild(primitives.common.JsonML.toHTML(accordion));
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
    new primitives.helpers.controls.CheckBoxConfig("placeAdvisersAboveChildren", true, "Place children of advisers above their parent node children", onUpdate),
    new primitives.helpers.controls.CheckBoxConfig("placeAssistantsAboveChildren", true, "Place children of assistants above their parent node children", onUpdate),
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
  result.push(new primitives.helpers.controls.PanelConfig("Frame", [
    new primitives.helpers.controls.CaptionConfig("Displays selected items outside view port area.", false),
    new primitives.helpers.controls.CheckBoxConfig("showFrame", true, "Show Frame", onUpdate),
    new primitives.helpers.controls.DropDownBoxConfig("frameInnerPadding", 2, "Frame inner padding", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Thickness, onUpdate),
    new primitives.helpers.controls.DropDownBoxConfig("frameOuterPadding", 2, "Frame outer padding", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], primitives.helpers.controls.ValueType.Thickness, onUpdate)
  ]));
  return result;
};
