primitives.orgdiagram.VisualTreeOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    leavesPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultConfig.leavesPlacementType),
    childrenPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultConfig.childrenPlacementType),
    placeAdvisersAboveChildren: new primitives.common.ValueReader(["boolean"], false, defaultConfig.placeAdvisersAboveChildren),
    placeAssistantsAboveChildren: new primitives.common.ValueReader(["boolean"], false, defaultConfig.placeAssistantsAboveChildren),
    maximumColumnsInMatrix: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
    horizontalAlignment: new primitives.common.EnumerationReader(primitives.common.HorizontalAlignmentType, false, defaultConfig.horizontalAlignment)
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