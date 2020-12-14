import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { TextOrientationType, PlacementType, Enabled, GroupByType } from '../../enums';

export default function LabelsOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    showLabels: new EnumerationReader(Enabled, false, defaultConfig.showLabels),
    labelOffset: new ValueReader(["number"], false, defaultConfig.labelOffset),
    labelFontSize: new ValueReader(["string"], false, defaultConfig.labelFontSize),
    labelFontFamily: new ValueReader(["string"], false, defaultConfig.labelFontFamily),
    labelFontStyle: new ValueReader(["string"], false, defaultConfig.labelFontStyle),
    labelFontWeight: new ValueReader(["string"], false, defaultConfig.labelFontWeight),
    labelColor: new ValueReader(["string"], false, defaultConfig.labelColor),
    labelSize: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.labelSize.width),
      height: new ValueReader(["number"], false, defaultConfig.labelSize.height)
    }, false, defaultConfig.labelSize),
    labelOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.labelOrientation),
    labelPlacement: new EnumerationReader(PlacementType, false, defaultConfig.labelPlacement),
    arrowsDirection: new EnumerationReader(GroupByType, false, defaultConfig.arrowsDirection),
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        label: new ValueReader(["string", "number", "object"], true),
        showLabel: new EnumerationReader(Enabled, false, defaultItemConfig.showLabel),
        labelSize: new ObjectReader({
          width: new ValueReader(["number"], false, 0),
          height: new ValueReader(["number"], false, 0)
        }, true),
        labelOrientation: new EnumerationReader(TextOrientationType, false, defaultItemConfig.labelOrientation),
        labelPlacement: new EnumerationReader(PlacementType, false, defaultItemConfig.labelPlacement)
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