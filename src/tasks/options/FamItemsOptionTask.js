import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';

export default function FamItemsOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        parents: new ArrayReader(
          new ValueReader(["string", "number"], true),
          true
        ),
        isActive: new ValueReader(["boolean"], false, defaultItemConfig.isActive)
      }),
      true,
      "id",
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash,
      sourceHash: _sourceHash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItems() {
    return _data.items;
  }

  function getConfig(itemId) {
    return _sourceHash["options-items"][itemId];
  }

  return {
    process: process,
    getItems: getItems,
    getConfig: getConfig
  };
};