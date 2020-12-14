import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {NavigationMode} from '../../../enums';

export default function CursorItemOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    cursorItem: new ValueReader(["string", "number"], true),
    navigationMode: new EnumerationReader(NavigationMode, false, defaultConfig.navigationMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getCursorItem() {
    return _data.cursorItem;
  }

  function hasCursorEnabled() {
    switch (_data.navigationMode) {
      case NavigationMode.Default:
      case NavigationMode.CursorOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getCursorItem: getCursorItem,
    hasCursorEnabled: hasCursorEnabled,
    description: "Checks currenct cursor item option."
  };
};