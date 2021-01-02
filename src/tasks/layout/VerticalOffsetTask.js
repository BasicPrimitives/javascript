import Interval from '../../graphics/structs/Interval';
import Rect from '../../graphics/structs/Rect';
import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';

export default function VerticalOffsetTask(viewPortPlacementTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    verticalOffset: new ObjectReader({
      from: new ValueReader(["number"], false, 0),
      to: new ValueReader(["number"], false, 0)
    }, false, new Interval(0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getOffset(), "options", context);

    return context.isChanged;
  }

  function getOffset() {
    var viewPortPosition = new Rect(viewPortPlacementTask.getViewPortPosition());
    return { verticalOffset: viewPortPosition.verticalInterval() };
  }

  function getVerticalOffset() {
    return _data.verticalOffset;
  }

  return {
    process: process,
    getVerticalOffset: getVerticalOffset
  };
};