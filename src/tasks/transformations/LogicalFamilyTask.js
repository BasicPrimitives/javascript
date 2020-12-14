import Family from '../../algorithms/Family';
import FamilyItem from '../../models/FamilyItem';

export default function LogicalFamilyTask(itemsOptionTask) {
  var _data = {
    logicalFamily: null,
    maximumId: null
  };

  function process(debug) {
    var index, len,
      itemConfig, famItem,
      items = itemsOptionTask.getItems(),
      logicalFamily = Family(), /*family contains FamItemConfig */
      maximumId = 0,
      parsedId;

    if (items.length > 0) {
      for (index = 0, len = items.length; index < len; index += 1) {
        itemConfig = items[index];

        if (itemConfig != null) {
          famItem = new FamilyItem({
            id: itemConfig.id,
            itemConfig: itemConfig,
            isActive: itemConfig.isActive
          });

          logicalFamily.add(itemConfig.parents, famItem.id, famItem);

          parsedId = parseInt(itemConfig.id, 10);
          maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);
        }
      }
    }

    _data.logicalFamily = logicalFamily;
    _data.maximumId = maximumId;

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }

    return true;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getLogicalFamily: getLogicalFamily,
    getMaximumId: getMaximumId
  };
};