import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import { ShapeType } from '../../enums';

export default function MinimizedItemsOptionTask(optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    minimizedItemShapeType: new EnumerationReader(ShapeType, true),
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        minimizedItemShapeType: new EnumerationReader(ShapeType, true),
        itemTitleColor: new ValueReader(["string"], true)
      }),
      true,
      "id"
    )
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
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks minimized items drawing options."
  };
};