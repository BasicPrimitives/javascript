import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';

export default function FrameOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    showFrame: new ValueReader(["boolean"], false, defaultConfig.showFrame),
    frameInnerPadding: new ObjectReader({
      left: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.left),
      top: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.top),
      right: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.right),
      bottom: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.bottom)
    }, false, defaultConfig.frameInnerPadding),
    frameOuterPadding: new ObjectReader({
      left: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.left),
      top: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.top),
      right: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.right),
      bottom: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.bottom)
    }, false, defaultConfig.frameOuterPadding)
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
    description: "Checks frame options."
  };
};