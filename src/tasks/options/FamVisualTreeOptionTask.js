import { ChildrenPlacementType, HorizontalAlignmentType } from '../../enums';
export default function FamVisualTreeOptionTask(optionsTask) {
  var _data = {
    leavesPlacementType: ChildrenPlacementType.Horizontal,
    childrenPlacementType: ChildrenPlacementType.Horizontal,
    maximumColumnsInMatrix: 6,
    horizontalAlignment: HorizontalAlignmentType.Center
  };

  function process() {
    return false;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
};