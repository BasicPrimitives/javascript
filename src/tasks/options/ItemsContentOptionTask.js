import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import ArrayReader from '../../readers/ArrayReader';

export default function ItemsContentOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        title: new ValueReader(["string"], true),
        description: new ValueReader(["string"], true),
        image: new ValueReader(["string"], true),
        context: new ValueReader(["string", "number", "object"], true),
        itemTitleColor: new ValueReader(["string"], false, defaultItemConfig.itemTitleColor),
        groupTitle: new ValueReader(["string"], false, defaultItemConfig.groupTitle),
        groupTitleColor: new ValueReader(["string"], false, defaultItemConfig.groupTitleColor)
      }),
      true,
      "id",
      true,
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
    getConfig: getConfig,
    description: "Checks items configuration options effecting their placement in layout."
  };
};