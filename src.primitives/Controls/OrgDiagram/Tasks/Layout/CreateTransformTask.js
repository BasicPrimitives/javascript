primitives.orgdiagram.CreateTransformTask = function (orientationOptionTask, alignDiagramTask) {
  var _data = {
    transform: null
  },
    _activeTreeLevels;

  function process() {
    var orientationOptions = orientationOptionTask.getOptions();

    var panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());

    _data.transform = new primitives.common.Transform();
    _data.transform.setOrientation(orientationOptions.orientationType);
    _data.transform.size = new primitives.common.Size(panelSize);

    return true;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null;
    _data.transform.transformPoint(x, y, false, this, function (x, y) {
      result = alignDiagramTask.getTreeItemForMousePosition(x, y, gravityRadius);
    });
    return result;
  }

  function getTransform() {
    return _data.transform;
  }

  return {
    process: process,
    getTransform: getTransform,
    getTreeItemForMousePosition: getTreeItemForMousePosition,
    description: "Create oordiante system tranfromation object."
  };
};