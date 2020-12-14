import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {NeighboursSelectionMode} from '../../../enums';

export default function NeighboursSelectionModeOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    neighboursSelectionMode: new EnumerationReader(NeighboursSelectionMode, false, defaultConfig.neighboursSelectionMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getNeighboursSelectionMode() {
    return _data.neighboursSelectionMode;
  }

  return {
    process: process,
    getNeighboursSelectionMode: getNeighboursSelectionMode
  };
};