import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import ArrayReader from '../../readers/ArrayReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { AdviserPlacementType } from '../../enums';

export default function OrderFamilyNodesOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    enableMatrixLayout: new ValueReader(["boolean"], false, defaultConfig.enableMatrixLayout),
    minimumMatrixSize: new ValueReader(["number"], false, defaultConfig.minimumMatrixSize),
    maximumColumnsInMatrix: new ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        position: new ValueReader(["number"], true),
        relativeItem: new ValueReader(["string", "number"], true),
        placementType: new EnumerationReader(AdviserPlacementType, false, defaultItemConfig.placementType),
        primaryParent: new ValueReader(["string", "number"], true),
        matrixId: new ValueReader(["string", "number"], false, defaultItemConfig.matrixId),
        addToMatrix: new ValueReader(["boolean"], false, defaultItemConfig.addToMatrix),
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

  function getOptions() {
    return _data;
  }

  function getConfig(itemId) {
    return _hash["options-items"][itemId];
  }

  return {
    process: process,
    getOptions: getOptions,
    getConfig: getConfig
  };
};