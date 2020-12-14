import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { ChildrenPlacementType, HorizontalAlignmentType } from '../../enums';

export default function OrgVisualTreeOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    leavesPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultConfig.leavesPlacementType),
    childrenPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultConfig.childrenPlacementType),
    placeAdvisersAboveChildren: new ValueReader(["boolean"], false, defaultConfig.placeAdvisersAboveChildren),
    placeAssistantsAboveChildren: new ValueReader(["boolean"], false, defaultConfig.placeAssistantsAboveChildren),
    maximumColumnsInMatrix: new ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
    horizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.horizontalAlignment)
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
    description: "Checks items layout options."
  };
};