import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { OrientationType, Enabled, Visibility } from '../../enums';

export default function CalloutOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    calloutMaximumVisibility: new EnumerationReader(Visibility, false, defaultConfig.calloutMaximumVisibility),
    showCallout: new ValueReader(["boolean"], false, defaultConfig.showCallout),
    calloutPlacementOffset: new ValueReader(["number"], false, defaultConfig.calloutPlacementOffset),
    orientationType: new EnumerationReader(OrientationType, false, defaultConfig.orientationType),

    defaultTemplateName: new ValueReader(["string"], true),
    defaultCalloutTemplateName: new ValueReader(["string"], true),

    calloutfillColor: new ValueReader(["string"], false, defaultConfig.calloutfillColor),
    calloutBorderColor: new ValueReader(["string"], true),
    calloutOffset: new ValueReader(["number"], false, defaultConfig.calloutOffset),
    calloutCornerRadius: new ValueReader(["string"], false, defaultConfig.calloutCornerRadius),
    calloutPointerWidth: new ValueReader(["string"], false, defaultConfig.calloutPointerWidth),
    calloutLineWidth: new ValueReader(["number"], false, defaultConfig.calloutLineWidth),
    calloutOpacity: new ValueReader(["number"], false, defaultConfig.calloutOpacity),

    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        showCallout: new EnumerationReader(Enabled, false, defaultConfig.showCallout),
        calloutTemplateName: new ValueReader(["string"], true),
        templateName: new ValueReader(["string"], true)
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