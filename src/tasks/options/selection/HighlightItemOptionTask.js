import ValueReader from '../../../readers/ValueReader';
import ObjectReader from '../../../readers/ObjectReader';
import EnumerationReader from '../../../readers/EnumerationReader';
import {NavigationMode } from '../../../enums';

export default function HighlightItemOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    highlightItem: new ValueReader(["string", "number"], true),
    navigationMode: new EnumerationReader(NavigationMode, false, defaultConfig.navigationMode),
    highlightGravityRadius: new ValueReader(["number"], false, defaultConfig.highlightGravityRadius)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getHighlightItem() {
    return _data.highlightItem;
  }

  function getGravityRadius() {
    return _data.highlightGravityRadius;
  }

  function hasHighlightEnabled() {
    switch (_data.navigationMode) {
      case NavigationMode.Default:
      case NavigationMode.HighlightOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getHighlightItem: getHighlightItem,
    hasHighlightEnabled: hasHighlightEnabled,
    getGravityRadius: getGravityRadius,
    description: "Checks highlight item option."
  };
};