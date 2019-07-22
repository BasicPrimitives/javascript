primitives.orgdiagram.ItemsSizesOptionTask = function (optionsTask, defaultConfig, defaultItemConfig, defaultButtonConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    /*item template options*/
    defaultTemplateName: new primitives.common.ValueReader(["string"], true),
    defaultLabelAnnotationTemplate: new primitives.common.ValueReader(["string"], true),
    hasSelectorCheckbox: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.hasSelectorCheckbox),
    hasButtons: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.hasButtons),
    buttonsPanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.buttonsPanelSize),
    groupTitlePanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.groupTitlePanelSize),
    groupTitlePlacementType: new primitives.common.EnumerationReader(primitives.common.AdviserPlacementType, false, defaultConfig.groupTitlePlacementType),
    checkBoxPanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.checkBoxPanelSize),
    selectCheckBoxLabel: new primitives.common.ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    buttons: new primitives.common.ArrayReader(new primitives.common.ObjectReader({
      name: new primitives.common.ValueReader(["string"], true),
      icon: new primitives.common.ValueReader(["string"], true),
      text: new primitives.common.ValueReader(["boolean"], false, false),
      tooltip: new primitives.common.ValueReader(["string"], true),
      size: new primitives.common.ObjectReader({
        width: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.width),
        height: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.height)
      }, false, defaultButtonConfig.size)
    }),
      true,
      "name"
    ),
    onButtonsRender: new primitives.common.FunctionReader(),
    /* items visibility */
    pageFitMode: new primitives.common.EnumerationReader(primitives.common.PageFitMode, false, defaultConfig.pageFitMode),
    minimalVisibility: new primitives.common.EnumerationReader(primitives.common.Visibility, false, defaultConfig.minimalVisibility),
    selectionPathMode: new primitives.common.EnumerationReader(primitives.common.SelectionPathMode, false, defaultConfig.selectionPathMode),
    autoSizeMinimum: new primitives.common.ObjectReader({
      width: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMinimum.width),
      height: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMinimum.height)
    }, false, defaultConfig.autoSizeMinimum),
    autoSizeMaximum: new primitives.common.ObjectReader({
      width: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMaximum.width),
      height: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMaximum.height)
    }, false, defaultConfig.autoSizeMaximum),
    /* scale */
    scale: new primitives.common.ValueReader(["number"], false, defaultConfig.scale),
    maximumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumScale),
    minimumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumScale),
    /*intervals*/
    normalLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.normalLevelShift),
    dotLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.dotLevelShift),
    lineLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.lineLevelShift),
    normalItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.normalItemsInterval),
    dotItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.dotItemsInterval),
    lineItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.lineItemsInterval),
    /*cousiins branches interval multiplier*/
    cousinsIntervalMultiplier: new primitives.common.ValueReader(["number"], false, defaultConfig.cousinsIntervalMultiplier),

    verticalAlignment: new primitives.common.EnumerationReader(primitives.common.VerticalAlignmentType, false, defaultConfig.verticalAlignment),

    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        groupTitle: new primitives.common.ValueReader(["string", "number"], true),
        isVisible: new primitives.common.ValueReader(["boolean", "number"], false, defaultItemConfig.isVisible),
        isActive: new primitives.common.ValueReader(["boolean", "number"], false, defaultItemConfig.isActive),
        hasSelectorCheckbox: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.hasSelectorCheckbox),
        hasButtons: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.hasButtons),
        templateName: new primitives.common.ValueReader(["string"], true)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks items size options."
  };
};