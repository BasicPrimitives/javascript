primitives.orgdiagram.CalloutOptionTask = function (optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    calloutMaximumVisibility: new primitives.common.EnumerationReader(primitives.common.Visibility, false, defaultConfig.calloutMaximumVisibility),
    showCallout: new primitives.common.ValueReader(["boolean"], false, defaultConfig.showCallout),
    calloutPlacementOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutPlacementOffset),
    orientationType: new primitives.common.EnumerationReader(primitives.common.OrientationType, false, defaultConfig.orientationType),

    defaultTemplateName: new primitives.common.ValueReader(["string"], true),
    defaultCalloutTemplateName: new primitives.common.ValueReader(["string"], true),

    calloutfillColor: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutfillColor),
    calloutBorderColor: new primitives.common.ValueReader(["string"], true),
    calloutOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutOffset),
    calloutCornerRadius: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutCornerRadius),
    calloutPointerWidth: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutPointerWidth),
    calloutLineWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutLineWidth),
    calloutOpacity: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutOpacity),

    items: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        id: new primitives.common.ValueReader(["string", "number"], true),
        showCallout: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.showCallout),
        calloutTemplateName: new primitives.common.ValueReader(["string"], true),
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
    getOptions: getOptions,
    getItemOptions: getItemOptions,
    description: "Checks item callout options."
  };
};