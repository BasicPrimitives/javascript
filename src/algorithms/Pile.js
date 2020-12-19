/**
 * Creates pile structure used to sort and stack segments on top of each other 
 * so they occupy minimum number of rows.
 * @class Pile
 * 
 * @returns {Pile} Returns pile structure
 */
export default function Pile () {
  var _items = [];

  /**
   * Adds new segment to pile object.
   * 
   * @param {number} from Left margin of segment.
   * @param {number} to Right margin of segment.
   * @param {object} context Any reference to user object. It is returned as parameter in callback function of resolve method.
   */
  function add(from, to, context) {
    if (from < to) {
      _items.push(new Segment(from, to, context, 1));
    } else {
      _items.push(new Segment(to, from, context, -1));
    }
  }

  /**
   * Callback function or iterating result offsets of the pile items in the stack.
   * 
   * @callback onPileItemCallback
   * @param {number} from The left margin of the segment 
   * @param {number} to The right margin of the segment
   * @param {object} context The context of the pile item
   * @param {number} offset Index of the pile item in the stack
   */

  /**
   * Sorts and stack segments on top of each other so they occupy minimum number of rows.
   * 
   * @param {object} thisArg A context object of the callback function invocation.
   * @param {onPileItemCallback} onItem Callback function for setting segments offsets in the pile.
   * @returns {number} Number of stacked rows in pile.
   */
  function resolve(thisArg, onItem) {
    var hash,
      backtraceNext,
      backtraceTaken,
      items, item,
      rowItems,
      rows,
      rowIndex, index,
      offset = 0;

    if (onItem != null) {
      items = _items.slice(0);
      items.sort(function (a, b) {
        return a.from - b.from;
      });

      rows = [];
      while (items.length > 0) {
        hash = {};
        backtraceNext = {};
        backtraceTaken = {};

        getMax(0, items, hash, backtraceNext, backtraceTaken);

        rowItems = [];
        rows[offset] = [];
        index = 0;
        while (backtraceNext.hasOwnProperty(index)) {
          if (backtraceTaken[index]) {
            rowItems.push(index);

            rows[offset].push(items[index]);
          }
          index = backtraceNext[index];
        }

        for (index = rowItems.length - 1; index >= 0; index -= 1) {
          items.splice(rowItems[index], 1);
        }
        offset += 1;
      }

      for (rowIndex = 0; rowIndex < offset; rowIndex += 1) {
        rowItems = rows[rowIndex];
        for (index = 0; index < rowItems.length; index += 1) {
          item = rowItems[index];
          if (onItem.call(thisArg, item.from, item.to, item.context, rowIndex, offset, item.direction)) {
            return offset;
          }
        }
      }
    }

    return offset;
  }

  function Segment(from, to, context, direction) {
    this.context = context;
    this.from = from;
    this.to = to;
    this.offset = null;
    this.direction = direction;
  }

  function getMax(index, items, hash, backtraceNext, backtraceTaken) {
    var result = 0;

    if (index >= items.length) {
      return 0;
    }

    if (hash.hasOwnProperty(index)) {
      return hash[index];
    }

    var item = items[index];
    var withoutItem = getMax(index + 1, items, hash, backtraceNext, backtraceTaken);

    var nextIndex = index + 1;
    while (nextIndex < items.length) {
      var nextItem = items[nextIndex];
      if (nextItem.from >= item.to) {
        break;
      }
      nextIndex += 1;
    }
    var withItem = 1 + getMax(nextIndex, items, hash, backtraceNext, backtraceTaken);

    if (withItem > withoutItem) {
      hash[index] = withItem;
      backtraceNext[index] = nextIndex;
      backtraceTaken[index] = true;
    } else {
      hash[index] = withoutItem;
      backtraceNext[index] = index + 1;
      backtraceTaken[index] = false;
    }

    return hash[index];
  }

  return {
    add: add,
    resolve: resolve
  };
};