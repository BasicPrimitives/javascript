import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';

export default function CurrentScrollPositionTask(layoutOptionsTask) {
  var _data = {
    placeholderOffset: null
  },
    _hash = {},
    _dataTemplate = new ObjectReader({
      placeholderOffset: new ObjectReader({
        x: new ValueReader(["number"], true),
        y: new ValueReader(["number"], true)
      }, true)
    });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      layoutOptions = layoutOptionsTask.getOptions();
    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    return context.isChanged;
  }

  function getPlaceholderOffset() {
    return _data.placeholderOffset;
  }

  return {
    process: process,
    getPlaceholderOffset: getPlaceholderOffset
  };
};