import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { AdviserPlacementType } from '../../enums';

export default function LevelTitlePlacementOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    levelTitlePlaceInside: new ValueReader(["boolean"], false, defaultConfig.levelTitlePlaceInside),
    levelTitlePanelSize: new ValueReader(["number"], false, defaultConfig.levelTitlePanelSize),
    levelTitlePlacementType: new EnumerationReader(AdviserPlacementType, false, defaultConfig.levelTitlePlacementType)
  });
  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Level annotation title placement options."
  };
};
