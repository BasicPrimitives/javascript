import { Layers } from '../../enums';
import Rect from '../../graphics/structs/Rect';
import Thickness from '../../graphics/structs/Thickness';
import Interval from '../../graphics/structs/Interval';
import RenderEventArgs from '../../events/RenderEventArgs';

export default function DrawLevelAnnotationTitlesTask(getGraphics, verticalOffsetTask, createTransformTask, applyLayoutChangesTask, 
  levelAnnotationOptionTask, mergeLevelIntervalsTask, levelAnnotationTemplateTask, levelTitlePlacementOptionTask) {
  var _graphics,
    _positions,
    _transform,
    _template;

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _graphics = getGraphics();
    _graphics.reset("titlesplaceholder", Layers.LevelAnnotation);

    if (annotations.length > 0) {
      _positions = mergeLevelIntervalsTask.getPositions();
      _transform = createTransformTask.getTransform();
      _template = levelAnnotationTemplateTask.getTitleTemplate();

      drawAnnotations(annotations, _positions);
    }

    return false;
  }

  function drawAnnotations(annotations, positions) {
    var verticalOffset = new Interval(verticalOffsetTask.getVerticalOffset()),
    { levelTitlePanelSize } = levelTitlePlacementOptionTask.getOptions();

    _graphics.activate("titlesplaceholder", Layers.LevelAnnotation);

    var transformedVerticalOffset;
    _transform.transformRect(0, verticalOffset.from, 0, verticalOffset.width(), true,
      this, function (x, y, width, height) {
        transformedVerticalOffset = new Rect(x, y, width, height);
      });

    for (var index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var intervals = positions[index];
      if (intervals != null) {
        for (var index3 = 0, len3 = intervals.length; index3 < len3; index3 += 1) {
          var interval = intervals[index3];

          var position = new Rect(0, interval.from, levelTitlePanelSize, interval.width());
          var verticalInterval = position.verticalInterval();

          if(verticalInterval.overlaps(verticalOffset)) {
            var offset = new Thickness(0, annotationConfig.offset.top, 0, annotationConfig.offset.bottom);
            position.offset(offset);

            var uiHash = new RenderEventArgs();
            uiHash.context = annotationConfig;
      
            _transform.transformRect(position.x, position.y, position.width, position.height, true,
              this, function (x, y, width, height) {
                _graphics.template(
                  x - transformedVerticalOffset.x
                  , y - transformedVerticalOffset.y
                  , width
                  , height
                  , 0
                  , 0
                  , width
                  , height
                  , _template.template()
                  , _template.getHashCode()
                  , _template.render
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