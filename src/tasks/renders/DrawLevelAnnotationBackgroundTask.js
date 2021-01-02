import { Layers } from '../../enums';
import Rect from '../../graphics/structs/Rect';
import Interval from '../../graphics/structs/Interval';
import RenderEventArgs from '../../events/RenderEventArgs';
import { mergeObjects } from '../../common';

export default function DrawLevelAnnotationBackgroundTask(getGraphics, verticalOffsetTask, createTransformTask, applyLayoutChangesTask, 
  levelAnnotationOptionTask, mergeLevelIntervalsTask, levelAnnotationTemplateTask) {
  var _graphics,
    _positions,
    _transform,
    _backgroundTemplate;

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _graphics = getGraphics();
    _graphics.reset("placeholder", Layers.LevelAnnotation);

    if (annotations.length > 0) {
      _positions = mergeLevelIntervalsTask.getPositions();
      _transform = createTransformTask.getTransform();
      _backgroundTemplate = levelAnnotationTemplateTask.getBackgroundTemplate();

      drawAnnotations(annotations, _positions);
    }

    return false;
  }

  function drawAnnotations(annotations, positions) {
    var verticalOffset = new Interval(verticalOffsetTask.getVerticalOffset()),
      panel = _graphics.activate("placeholder", Layers.LevelAnnotation),
      panelRect;

    _transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
      this, function (x, y, width, height) {
        panelRect = new Rect(x, y, width, height);
      });

      
    for (var index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var lineWidth = _transform.transformThickness(annotationConfig.lineWidth, true);
      var intervals = positions[index];
      if (intervals != null) {
        for (var index3 = 0, len3 = intervals.length; index3 < len3; index3 += 1) {
          var interval = intervals[index3];

          var position = new Rect(0, interval.from, panelRect.width, interval.width());
          position.offset(annotationConfig.offset);

          var verticalInterval = position.verticalInterval();
          if(verticalInterval.overlaps(verticalOffset)) {
            var uiHash = new RenderEventArgs();
            uiHash.context = annotationConfig;
            mergeObjects(uiHash.context, { lineWidth });
    
            _transform.transformRect(position.x, position.y, position.width, position.height, true,
              this, function (x, y, width, height) {
                _graphics.template(
                  x
                  , y
                  , width
                  , height
                  , 0
                  , 0
                  , width
                  , height
                  , _backgroundTemplate.template()
                  , _backgroundTemplate.getHashCode()
                  , _backgroundTemplate.render
                  , uiHash
                  , null
                );
              });
          }
        }
      }
    }
  }

  return {
    process: process
  };
};