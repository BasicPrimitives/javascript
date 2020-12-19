import { isObject, cloneObject } from '../common';
import commonBinarySearch from './binarySearch';
import commonMergeSort from './mergeSort';
/**
 * Creates Tree Levels structure. It is diagraming specific auxiliary structure
 * that keeps tree nodes order level by level.
 * @class TreeLevels
 * 
 * @param {TreeLevels} [source=undefined] Optional source object to clone content from into the new instance of the structure.
 * @returns {TreeLevels} Returns tree levels structure.
 */
export default function TreeLevels(source) {
  var _levels = [],
    _items = {},
    _minimum = null,
    _maximum = null;

  _init(source);

  function _init(source) {
    if (isObject(source)) {
      _levels = cloneObject(source.levels, true);
      _items = cloneObject(source.items, true);
      _minimum = cloneObject(source.minimum, true);
      _maximum = cloneObject(source.maximum, true);
    }
  }

  function LevelContext(context) {
    this.context = context;
    this.items = [];
  }

  function ItemContext(context, position, level) {
    this.context = context;
    this.positions = {};
    this.positions[level] = position;
    this.startLevel = level;
    this.endLevel = level;
  }

  /**
   * Checks if structure has elements.
   * 
   * @returns {boolean} Returns true if structure has elements.
   */
  function isEmpty() {
    return !_levels.length;
  }

  /**
   * Number of levels
   * 
   * @returns {number} Returns number of levels in structure.
   */
  function length() {
    return _levels.length;
  }

  /**
   * Adds new level. Structure keeps levels sorted by their indexes. The level index can be positive and negative as well.
   * Structure auto expands collection of levels in both directions and keeps them ordered.
   * @param {number} level New level index
   * @param {object} context Context object
   */
  function addLevel(level, context) {
    var treeLevel = createLevel(level);
    treeLevel.context = context;
  }

  /**
   * Returns element's start level index in the structure. Element may occupy multiple levels of the tree levels structure.
   * 
   * @param {string} itemid The element id
   * @returns {number} Returns start level index
   */
  function getStartLevelIndex(itemid) {
    return _items.hasOwnProperty(itemid) ? _items[itemid].startLevel : null;
  }

  /**
   * Returns element's end level index in the structure. Element may occupy multiple levels of the tree levels structure.
   * 
   * @param {string} itemid Element id
   * @returns {number} Returns end level index
   */
  function getEndLevelIndex(itemid) {
    return _items.hasOwnProperty(itemid) ? _items[itemid].endLevel : null;
  }

  /**
   * Gets element position at level
   * 
   * @param {string} itemid Element id
   * @param {number} level Level index
   * @returns {number} Returns position of the element 
   */
  function getItemPosition(itemid, level) {
    var context = _items[itemid];
    if (context != null) {
      if (level != null) {
        return context.positions[level];
      } else {
        return context.positions[context.startLevel];
      }
    }
    return null;
  }

  /**
   * Gets element at position
   * 
   * @param {number} levelIndex Level index
   * @param {number} position Item position
   * @returns {number} Returns element id
   */
  function getItemAtPosition(levelIndex, position) {
    var level = _levels[levelIndex],
      itemid = null;
    if (level != null) {
      itemid = level.items[position];
    }
    return itemid;
  }

  /**
   * Gets previous element
   * 
   * @param {string} itemid Element id
   * @param {number} itemLevel Level index
   * @returns {number} Returns previous element id
   */
  function getPrevItem(itemid, itemLevel) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      var item = _items[itemid];
      itemLevel = itemLevel || item.startLevel;
      var level = _levels[itemLevel];
      result = level.items[item.positions[itemLevel] - 1];
    }
    return result;
  }

  /**
   * Gets next element
   * 
   * @param {string} itemid Element id
   * @param {number} itemLevel Level index
   * @returns {number} Returns next element id
   */
  function getNextItem(itemid, itemLevel) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      var item = _items[itemid];
      itemLevel = itemLevel || item.startLevel;
      var level = _levels[itemLevel];
      result = level.items[item.positions[itemLevel] + 1];
    }
    return result;
  }

  /**
   * Checks if structure contains element
   * @param {string} itemid Element id
   * @returns {boolean} Returns true if structure contains given element id
   */
  function hasItem(itemid) {
    return _items.hasOwnProperty(itemid);
  }

  /**
   * Checks if structure contains level
   * @param {number} levelIndex Level index
   * @returns {boolean} Returns true if structure contains given level index
   */
  function hasLevel(levelIndex) {
    return _levels[levelIndex] != null;
  }

  /**
   * Gets element context object
   * @param {string} itemid Element id
   * @returns {object} Returns context object of the element
   */
  function getItemContext(itemid) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      result = _items[itemid].context;
    }
    return result;
  }

  /**
   * Creates new level
   * @param {index} index New level index
   * @returns {object} Returns new level empty context object
   */
  function createLevel(index) {
    if (_levels[index] == null) {
      _levels[index] = new LevelContext(null);

      _minimum = _minimum === null ? index : Math.min(_minimum, index);
      _maximum = _maximum === null ? index : Math.max(_maximum, index);
    }
    return _levels[index];
  }

  /**
   * Adds element
   * @param {number} levelIndex Level index
   * @param {string} itemid New element id
   * @param {object} context Context object
   */
  function addItem(levelIndex, itemid, context) {
    var level, itemContext;
    if (!_items.hasOwnProperty(itemid)) {
      level = createLevel(levelIndex);
      level.items.push(itemid);
      _items[itemid] = new ItemContext(context, level.items.length - 1, levelIndex);
    } else {
      level = createLevel(levelIndex);
      level.items.push(itemid);
      itemContext = _items[itemid];
      itemContext.positions[levelIndex] = level.items.length - 1;
      itemContext.startLevel = Math.min(itemContext.startLevel, levelIndex);
      itemContext.endLevel = Math.max(itemContext.endLevel, levelIndex);
    }
  }

  /**
   * Callback function for iteration of levels
   * 
   * @callback onTreeLevelCallback
   * @param {number} levelIndex Level index
   * @param {object} level Context object
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops levels
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelCallback} onItem A callback function to call for every level
   */
  function loopLevels(thisArg, onItem) {
    var index,
      level;
    if (onItem != null) {
      for (index = _minimum; index <= _maximum; index += 1) {
        level = _levels[index];
        if (level != null) {
          if (onItem.call(thisArg, index, level.context)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Loops levels in reversed order
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelCallback} onItem A callback function to call for every level
   */
  function loopLevelsReversed(thisArg, onItem) {
    var index,
      level;
    if (onItem != null) {
      for (index = _maximum; index >= _minimum; index -= 1) {
        level = _levels[index];
        if (level != null) {
          if (onItem.call(thisArg, index, level.context)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Gets number of elements at level
   * 
   * @param {number} levelIndex Level index
   * @returns {number} Returns number of elements at the level
   */
  function getLevelLength(levelIndex) {
    var result = 0,
      level = _levels[levelIndex];
    if (level != null) {
      result = level.items.length;
    }
    return result;
  }

  /**
   * Callback function for iteration of level elements
   * 
   * @callback onTreeLevelItemCallback
   * @param {string} itemid Element id
   * @param {object} item Context object of the element
   * @param {number} position Position of the element at level
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops level elements
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {number} levelIndex Level index
   * @param {onTreeLevelItemCallback} onItem A callback function to call for every item
   */
  function loopLevelItems(thisArg, levelIndex, onItem) {
    var index, len,
      level,
      itemid;
    if (onItem != null) {
      level = _levels[levelIndex];
      if (level != null) {
        for (index = 0, len = level.items.length; index < len; index += 1) {
          itemid = level.items[index];
          if (onItem.call(thisArg, itemid, _items[itemid].context, index)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Callback function for iteration of elements level by level
   * 
   * @callback onTreeLevelsItemCallback
   * @param {string} itemid Element id
   * @param {object} item Element context object
   * @param {number} position Position of the element at level
   * @param {number} levelIndex Level index
   * @param {object} level Level context object
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops elements level by level
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelsItemCallback} onItem A callback function to call for every item
   */
  function loopItems(thisArg, onItem) { // function onItem(itemid, item, position, levelIndex, level)
    var index, len,
      level, levelIndex,
      items,
      itemid,
      processed = {};
    if (onItem != null) {
      for (levelIndex = _minimum; levelIndex <= _maximum; levelIndex += 1) {
        level = _levels[levelIndex];
        if (level != null) {
          items = level.items;
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            if (!processed.hasOwnProperty(itemid)) {
              processed[itemid] = true;
              if (onItem.call(thisArg, itemid, _items[itemid].context, index, levelIndex, level.context)) {
                return;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Callback for finding distance for element
   *
   * @callback onTreeLevelDistanceCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns distance for the element
   */

  /**
   * Searches element at level using binary search
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {number} levelIndex Level index to search element at
   * @param {onTreeLevelDistanceCallback} onGetDistance A callback function to measure distance for element
   */
  function binarySearch(thisArg, levelIndex, onGetDistance) {
    var result = null,
      level;
    if (onGetDistance != null) {
      level = _levels[levelIndex];
      if (level != null) {
        result = commonBinarySearch(level.items, function (itemid) {
          return onGetDistance.call(thisArg, itemid, _items[itemid].context);
        });
      }
    }
    return result.item;
  }

  /**
   * Callback for finding weight of element
   *
   * @callback onTreeLevelItemWeightCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns distance for the element
   */

  /**
   * Callback for iterating items
   *
   * @callback onTreeLevelMergedItemCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns true to break iteration process.
   */

  /**
   * Loops merged elements of tree level structure by weight
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelItemWeightCallback} getItemWeight Callback to measure weight of the element
   * @param {onTreeLevelMergedItemCallback} onItem Callback to iterate merged elements
   */
  function loopMerged(thisArg, getItemWeight, onItem) {
    var index, len,
      level,
      itemid,
      levelsItems = [],
      sortedItems;

    for (index = 0, len = _levels.length; index < len; index += 1) {
      level = _levels[index];
      if (level != null) {
        levelsItems.push(level.items);
      }
    }

    sortedItems = commonMergeSort(levelsItems, getItemWeight, true);

    if (onItem != null) {
      for (index = 0, len = sortedItems.length; index < len; index += 1) {
        itemid = sortedItems[index];
        if (onItem.call(thisArg, itemid, _items[itemid].context)) {
          break;
        }
      }
    }
  }

  /**
   * Loops level elements starting with the given item
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} itemid Start element id
   * @param {boolean} isLeft If true then method loops leftward
   * @param {onTreeLevelMergedItemCallback} onItem Callback function to call for every item
   * @param {number} level Level index
   */
  function loopFromItem(thisArg, itemid, isLeft, onItem, level) {
    var context,
      index, len,
      items, nextItemId,
      itemLevel, position;
    if (_items.hasOwnProperty(itemid)) {
      context = _items[itemid];
      itemLevel = level || context.startLevel;
      items = _levels[itemLevel].items;
      position = context.positions[itemLevel];
      if (onItem != null) {
        if (isLeft) {
          for (index = position - 1; index >= 0; index -= 1) {
            nextItemId = items[index];
            if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
              break;
            }
          }
        } else {
          for (index = position + 1, len = items.length; index < len; index += 1) {
            nextItemId = items[index];
            if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Loops levels starting with the given element end level. Element may occupy multiple levels, 
   * so this method starts level iteration from next level after or before item levels.
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} itemid Element id
   * @param {boolean} isBelow If true then method loops levels backward
   * @param {onTreeLevelCallback} onItem Callback function to call for every level
   */
  function loopLevelsFromItem(thisArg, itemid, isBelow, onItem) { // function(levelIndex, level)
    var context,
      index, len,
      items, item, nextItemId,
      nextLevels, level;
    if (_items.hasOwnProperty(itemid)) {
      context = _items[itemid];
      if (onItem != null) {
        if (isBelow) {
          for (index = context.endLevel + 1; index <= _maximum; index += 1) {
            level = _levels[index];
            if (onItem.call(thisArg, index, level != null ? level.context : null)) {
              break;
            }
          }
        } else {
          for (index = context.startLevel - 1; index >= _minimum; index -= 1) {
            level = _levels[index];
            if (onItem.call(thisArg, index, level != null ? level.context : null)) {
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Clones tree levels structure.
   * 
   * @returns {TreeLevels} Returns cloned copy of the structure
   */
  function clone() {
    return TreeLevels({
      levels: _levels,
      items: _items,
      minimum: _minimum,
      maximum: _maximum
    });
  }

  return {
    addlevel: addLevel,
    hasLevel: hasLevel,
    hasItem: hasItem,
    addItem: addItem,
    getItemContext: getItemContext,
    getLevelIndex: getStartLevelIndex,
    getEndLevelIndex: getEndLevelIndex,
    getItemPosition: getItemPosition,
    getItemAtPosition: getItemAtPosition,
    loopLevels: loopLevels,
    loopLevelsReversed: loopLevelsReversed,
    loopLevelItems: loopLevelItems,
    getLevelLength: getLevelLength,
    loopItems: loopItems,
    binarySearch: binarySearch,
    loopMerged: loopMerged,
    loopFromItem: loopFromItem,
    loopLevelsFromItem: loopLevelsFromItem,
    getPrevItem: getPrevItem,
    getNextItem: getNextItem,
    length: length,
    isEmpty: isEmpty,

    clone: clone
  };
};