import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import ArrayReader from '../../readers/ArrayReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { ItemType, AdviserPlacementType, ChildrenPlacementType, Enabled } from '../../enums';

export default function OrgItemsOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        parent: new ValueReader(["string", "number"], true),
        itemType: new EnumerationReader(ItemType, false, defaultItemConfig.itemType),
        adviserPlacementType: new EnumerationReader(AdviserPlacementType, false, defaultItemConfig.adviserPlacementType),
        childrenPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultItemConfig.childrenPlacementType),
        placeAdvisersAboveChildren: new EnumerationReader(Enabled, false, defaultItemConfig.placeAdvisersAboveChildren),
        placeAssistantsAboveChildren: new EnumerationReader(Enabled, false, defaultItemConfig.placeAssistantsAboveChildren),
        isVisible: new ValueReader(["boolean"], false, defaultItemConfig.isVisible),
        isActive: new ValueReader(["boolean"], false, defaultItemConfig.isActive),
        levelOffset: new ValueReader(["number"], true)
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