import Interval from '../graphics/structs/Interval';

function IntervalPoint(value, index, isStart) {
  this.value = value;
  this.index = index;
  this.isStart = isStart;
}

/**
 * Callback function to iterate over result intervals
 * 
 * @callback onMergedIntervalItemCallback
 * @param {Interval} interval Merged interval
 * @param {Object} context First interval context.
 */

/**
 * Merges collection of overlapping intervals into continuous group of intervals. Calls callback 
 * function to pass result interval per group of overlapping intervals.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Interval[]} items Collection of intervals.
 * @param {onMergedIntervalItemCallback} onItem Callback function to pass result group of merged intervals.
 */
export default function getMergedIntervals(thisArg, items, onItem) {
  var points = [];
  for(var index = 0; index < items.length; index+=1) {
    var item = items[index];
    points.push(new IntervalPoint(item.from, index, true));
    points.push(new IntervalPoint(item.to, index, false));
  }

  points.sort(function(a, b) {
    if(a.value === b.value) {
      return b.isStart - a.isStart;
    }
    return  a.value - b.value;
  })

  var counter = 0;
  var interval = null;
  var logicalIndex = null;
  for(var index = 0, len = points.length; index < len; index+=1) {
    var point = points[index];
    if(interval == null) {
      interval = new Interval(items[point.index]);
    }
    interval.to = point.value;

    if(point.isStart) {
      counter++;

      if(logicalIndex === null || logicalIndex > point.index) {
        logicalIndex = point.index;
        interval.context = items[point.index].context;
      }
    } else {
      counter--;
    }
    if(!counter) {
      if(onItem != null) {
        onItem.call(thisArg, interval);
      }
      interval = null;
      logicalIndex = null;
    }
  }
};
