import getMergedIntervals from '../../algorithms/getMergedIntervals';
import Interval from '../../graphics/structs/Interval';

export default function FamLogicalLevelsPlacementTask(orderFamilyNodesTask, alignDiagramTask) {
  var _data = {
    positions: []
  };

  function process() {
    _data.positions = null;
    return true;
  }

  function createPositions() {
    var intervals = [],
      treeLevels = orderFamilyNodesTask.getTreeLevels(),
      itemsPositions = alignDiagramTask.getItemsPositions(),
      index = 0;
    treeLevels.loopLevels(this, function(levelIndex, level) {
      treeLevels.loopLevelItems(this, levelIndex, function(nodeId, node, position) {
        if(node.isVisible && node.isActive) {
          var itemPosition = itemsPositions[nodeId];
          if(itemPosition) {
            var interval = new Interval(itemPosition.topConnectorShift || itemPosition.actualPosition.y, itemPosition.bottomConnectorShift - 1, index++)
            intervals.push(interval);
          }
          return true; /* only one item per level is needed */
        }
      })
    });

    var mergedIntervals = [];
    getMergedIntervals(this, intervals, function(interval) {
      mergedIntervals.push(interval);
    });
    intervals = mergedIntervals;

    /* merge intervals having equal logical levels */
    mergedIntervals = [];
    var currentInterval = null;
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      if(!currentInterval) {
        currentInterval = interval;
        mergedIntervals.push(interval);
      } else {
        if(currentInterval.context === interval.context) {
          currentInterval.to = interval.to;
        } else {
          currentInterval = interval;
          mergedIntervals.push(interval);
        }
      }
    }
    intervals = mergedIntervals;

    /* extend first level to the top */
    if(intervals.length > 0) {
      intervals[0].from = 0;
    }

    /* fill gaps between levels */
    for(var index = 0, len = intervals.length - 1; index < len; index+=1) {
      var prev = intervals[index];
      var next = intervals[index + 1];

      prev.to = next.from;
    }

    /* find minimal level */
    var minLevelIndex = null;
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      minLevelIndex = (minLevelIndex === null) ? interval.context : Math.min(minLevelIndex, interval.context);
    }

    /* group intervals by logical levels */ 
    var result = {};
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      var levelIndex = interval.context - minLevelIndex;
      var logicalLevelPosition = result[levelIndex];
      if(!logicalLevelPosition) {
        result[levelIndex] = [interval];
      } else {
        logicalLevelPosition.push(interval);
      }
    }
    return result;
  }


  function getPositions() {
    if(!_data.positions) {
      _data.positions = createPositions();
    }
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    process: process
  };
};