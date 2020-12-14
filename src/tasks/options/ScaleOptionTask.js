import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';

export default function ScaleOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    scale: new ValueReader(["number"], false, defaultConfig.scale),
    minimumScale: new ValueReader(["number"], false, defaultConfig.minimumScale),
    maximumScale: new ValueReader(["number"], false, defaultConfig.maximumScale)
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
    description: "Checks control scale options."
  };
};