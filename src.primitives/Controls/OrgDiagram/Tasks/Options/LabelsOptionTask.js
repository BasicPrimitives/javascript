primitives.orgdiagram.LabelsOptionTask = function (optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    showLabels: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.showLabels),
    labelOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.labelOffset),
    labelFontSize: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontSize),
    labelFontFamily: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontFamily),
    labelFontStyle: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontStyle),
    labelFontWeight: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontWeight),
    labelColor: new primitives.common.ValueReader(["string"], false, defaultConfig.labelColor),
    labelSize: new primitives.common.ObjectReader({
      width: new primitives.common.ValueReader(["number"], false, defaultConfig.labelSize.width),
      height: new primitives.common.ValueReader(["number"], false, defaultConfig.labelSize.height)
    }, false, defaultConfig.labelSize),
    labelOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultConfig.labelOrientation),
    labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultConfig.labelPlacement),
    arrowsDirection: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.arrowsDirection),
    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        label: new primitives.common.ValueReader(["string", "number", "object"], true),
        showLabel: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.showLabel),
        labelSize: new primitives.common.ObjectReader({
          width: new primitives.common.ValueReader(["number"], false, 0),
          height: new primitives.common.ValueReader(["number"], false, 0)
        }, true),
        labelOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultItemConfig.labelOrientation),
        labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultItemConfig.labelPlacement)
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

  function getItemsOptions() {
    return _hash["options-items"];
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
    getItemsOptions: getItemsOptions,
    getOptions: getOptions,
    description: "Checks items labels options."
  };
};