import SortedList from './SortedList';
/**
 * Callback function to iterate over pairs of crossing rectangles
 * 
 * @callback onCrossingRectanglesItemCallback
 * @param {Rect} rect1 First rectangle
 * @param {Rect} rect2 Second rectangle
 */

/**
 * Finds pairs of crossing rectangles.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} rectangles Collection of rectangles.
 * @param {onCrossingRectanglesItemCallback} onCrossing Callback function to pass pair of crossing rectangles.
 */
export default function getCrossingRectangles(thisArg, rectangles, onCrossing) {
  function Action(isStart, index, x, rect) {
    this.isStart = isStart;
    this.index = index;
    this.x = x;
    this.rect = rect;
  }

  function Level() {
    this.count = 0;
    this.rectangles = {};

    this.add = function (index) {
      this.count += 1;
      this.rectangles[index] = true;
    };

    this.remove = function (index) {
      this.count -= 1;
      delete this.rectangles[index];
      return this.count == 0;
    };
  }

  function _findCrossedRectangles(buffer, from, to, rectIndex, rect) {
    buffer.loopForward(this, from, function (value, level) {
      if (value > to) {
        return true;
      }
      for (var index in level.rectangles) {
        if (level.rectangles.hasOwnProperty(index)) {
          var key = rectIndex > index ? rectIndex + "-" + index : index + "-" + rectIndex;
          if (!processed.hasOwnProperty(key)) {
            processed[key] = true;
            onCrossing.call(thisArg, rect, rectangles[index]);
          }
        }
      }
    });
  }

  if (onCrossing != null) {

    // Create action items out of rectangles
    var actions = [];
    for (var index = 0; index < rectangles.length; index += 1) {
      var rect = rectangles[index];

      actions.push(new Action(1, index, rect.x, rect));
      actions.push(new Action(0, index, rect.right(), rect));
    }

    actions.sort(function (a, b) {
      if (a.x == b.x) {
        return b.isStart - a.isStart;
      }
      return a.x - b.x;
    });

    /* find intersections */
    var buffer = SortedList();
    var levels = {};
    var processed = {};

    for (index = 0; index < actions.length; index += 1) {
      var action = actions[index];
      var actionLevels = [action.rect.y, action.rect.bottom()];

      if (action.isStart == 1) {
        // Search for intersections of the left side of the rectangle with existing horizontal segments
        _findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);

        // add rectangle's horizontal segments
        for (var index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
          var value = actionLevels[index2];
          var level = levels[value];
          if (level == null) {
            level = new Level();
            levels[value] = level;

            buffer.add(value, level);
          }
          level.add(action.index);
        }
      } else {
        // remove rectangle's horizontal segments
        for (index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
          value = actionLevels[index2];
          level = levels[value];
          if (level.remove(action.index)) {
            delete levels[value];
            buffer.remove(value);
          }
        }

        // Search for intersections of the right side of rectangle with existing horizontal segments
        _findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);
      }
    }
  }
};

