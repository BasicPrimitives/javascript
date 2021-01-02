import Rect from '../../graphics/structs/Rect';
import Point from '../../graphics/structs/Point';
import Size from '../../graphics/structs/Size';
import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';

export default function ViewPortPlacementTask(scaleOptionTask, centerOnCursorTask, createTransformTask, applyLayoutChangesTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    viewPortPosition: new ObjectReader({
      x: new ValueReader(["number"], false, 0),
      y: new ValueReader(["number"], false, 0),
      width: new ValueReader(["number"], false, 0),
      height: new ValueReader(["number"], false, 0)
    }, false, new Rect(0, 0, 0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getTransformedPosition(), "options", context);

    return context.isChanged;
  }

  function getTransformedPosition() {
    var viewPortPosition,
      transform = createTransformTask.getTransform(),
      position = getPosition();
    if(position != null ) {
      transform.transformRect(position.x, position.y, position.width, position.height, false,
        this, function (x, y, width, height) { 
          viewPortPosition = new Rect(x, y, width, height);
        });
    }
    return { viewPortPosition: viewPortPosition };
  }

  function getPosition() {
    var scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale,
      placeholderOffset = centerOnCursorTask ? new Point(centerOnCursorTask.getPlaceholderOffset()) : new Point(0, 0),
      optimalPanelSize = new Size(applyLayoutChangesTask.getOptimalPanelSize());

    placeholderOffset.scale(1.0 / scale);
    optimalPanelSize.scale(1.0 / scale);

    var result = new Rect(
      placeholderOffset.x,
      placeholderOffset.y,
      optimalPanelSize.width,
      optimalPanelSize.height
    );
    return result;
  }

  function getViewPortPosition() {
    return _data.viewPortPosition;
  }

  return {
    process: process,
    getViewPortPosition: getViewPortPosition
  };
};