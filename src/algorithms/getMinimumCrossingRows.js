/**
 * Callback for iterating rows
 * 
 * @callback onRowCallback
 * @param {number} row The y coordinate of the horizontal line
 */

/**
 * Finds minimum number of horizontal lines crossing all rectangles
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {React[]} rectangles Collection of rectangles
 * @param {onRowCallback} onItem Callback function to call for every found row
 */
export default function getMinimumCrossingRows(thisArg, rectangles, onItem) {
  var from = null;
  var to = null;
  if (onItem != null) {
    rectangles.sort(function (a, b) {
      return a.y - b.y;
    });

    for (var index = 0; index < rectangles.length; index += 1) {
      var rect = rectangles[index];
      var bottom = rect.bottom();
      if (from === null) {
        from = rect.y;
        to = bottom;
      } else {
        if (rect.y >= to) {
          onItem.call(thisArg, from);
          from = rect.y;
          to = bottom;
        } else {
          if (rect.y > from) {
            from = rect.y;
          }

          if (bottom < to) {
            to = bottom;
          }
        }
      }
    }
    if (from !== null) {
      onItem.call(thisArg, from);
    }
  }
};

