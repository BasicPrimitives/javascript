import getMergedIntervals from '../../algorithms/getMergedIntervals';

export default function MergeLevelIntervalsTask(levelAnnotationOptionTask, logicalLevelsPlacementTask) {
  var _data = {
    positions: []
  };

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _data.positions = [];
    
    if(annotations.length > 0) {
      var positions = logicalLevelsPlacementTask.getPositions();
      _data.positions = createPositions(annotations, positions);
    }

    return true;
  }

  function createPositions(annotations, positions) {
    var index, len,
      index2, len2,
      used = {},
      result = {};

    for (index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var levels = annotationConfig.levels;
      var intervals = [];
      if (levels != null && levels.length > 0) {
        for (index2 = 0, len2 = levels.length; index2 < len2; index2 += 1) {
          var level = levels[index2];
          if(!used[level]) {
            used[level] = true;

            var intervals = [];
            if (positions[level] != null) {
              intervals = intervals.concat(positions[level]);
            }
          }
        }
      }
      result[index] = [];
      getMergedIntervals(this, intervals, function(interval) {
        result[index].push(interval);
      });
    }

    return result;
  }


  function getPositions() {
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    process: process
  };
};