primitives.famdiagram.VisualTreeOptionTask = function (optionsTask) {
  var _data = {
    leavesPlacementType: primitives.common.ChildrenPlacementType.Horizontal,
    childrenPlacementType: primitives.common.ChildrenPlacementType.Horizontal,
    maximumColumnsInMatrix: 6,
    horizontalAlignment: primitives.common.HorizontalAlignmentType.Center
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