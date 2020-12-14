import ObjectReader from '../../readers/ObjectReader';
import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';

export default function SpousesOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        spouses: new ArrayReader(
          new ValueReader(["string", "number"], true),
          true
        )
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

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
};