import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import { SelectionPathMode } from '../../../enums';

export default function CursorSelectionPathModeOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    selectionPathMode: new EnumerationReader(SelectionPathMode, false, defaultConfig.selectionPathMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getSelectionPathMode() {
    return _data.selectionPathMode;
  }

  return {
    process: process,
    getSelectionPathMode: getSelectionPathMode,
    description: "Checks cursor selection path option."
  };
};