import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import FunctionReader from '../../readers/FunctionReader';
import { Enabled } from '../../enums';

export default function EndPointsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    showEndPoints: new EnumerationReader(Enabled, false, defaultConfig.showEndPoints),
    endPointSize: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.endPointSize.width),
      height: new ValueReader(["number"], false, defaultConfig.endPointSize.height)
    }, false, defaultConfig.endPointSize),
    endPointCornerRadius: new ValueReader(["number"], false, defaultConfig.endPointCornerRadius),
    endPointFillColor: new ValueReader(["string"], false, defaultConfig.endPointFillColor),
    endPointOpacity: new ValueReader(["number"], false, defaultConfig.endPointOpacity),
    onEndPointRender: new FunctionReader()
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
    description: "Checks annotations endpoints options."
  };
};