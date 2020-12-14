import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';

export default function HideGrandParentsConnectorsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    hideGrandParentsConnectors: new ValueReader(["boolean"], false, defaultConfig.hideGrandParentsConnectors)
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
    getOptions: getOptions
  };
};