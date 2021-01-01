import Transform from '../../graphics/Transform';
import Size from '../../graphics/structs/Size';

export default function CreateTransformTask(orientationOptionTask, alignDiagramTask) {
  var _data = {
    transform: null
  };

  function process() {
    var orientationOptions = orientationOptionTask.getOptions();

    var panelSize = new Size(alignDiagramTask.getContentSize());

    _data.transform = new Transform();
    _data.transform.setOrientation(orientationOptions.orientationType);
    _data.transform.size = new Size(panelSize);

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
    description: "Create coordinate system transformation object."
  };
};