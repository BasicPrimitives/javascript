import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { PageFitMode, Visibility } from '../../enums';

export default function MinimumVisibleLevelsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    /* items visibility */
    pageFitMode: new EnumerationReader(PageFitMode, false, defaultConfig.pageFitMode),
    minimalVisibility: new EnumerationReader(Visibility, false, defaultConfig.minimalVisibility),
    minimumVisibleLevels: new ValueReader(["number"], false, defaultConfig.minimumVisibleLevels),
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
    description: "Checks minimum visible levels options."
  };
};