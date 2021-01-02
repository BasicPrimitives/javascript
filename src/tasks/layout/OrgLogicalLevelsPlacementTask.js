import { ItemType } from '../../enums';
import getMergedIntervals from '../../algorithms/getMergedIntervals';
import Interval from '../../graphics/structs/Interval';

export default function OrgLogicalLevelsPlacementTask(orgTreeTask, alignDiagramTask) {
  var _data = {
    positions: []
  };

  function process() {
    _data.positions = null;
    return true;
  }

  function createPositions() {
    var intervals = [],
      orgTree = orgTreeTask.getOrgTree(),
      itemsPositions = alignDiagramTask.getItemsPositions(),
      visited = {};
    orgTree.loopLevels(this, function(nodeId, node, levelIndex) {
      if(node.itemType == ItemType.Regular) {
        if(node.isVisible) {
          var itemPosition = itemsPositions[nodeId];
          if(itemPosition) {
            var interval = new Interval(itemPosition.topConnectorShift, itemPosition.bottomConnectorShift - 1, levelIndex + node.levelOffset)
            var key = interval.toString();
            if(!visited[key]) {
              visited[key] = true;
              intervals.push(interval);
            }
          }
        }
        return;
      }
      return orgTree.SKIP;
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