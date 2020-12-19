/**
 * Creates linked hash list collection.
 * @class LinkedHashItems
 * 
 * @returns {LinkedHashItems} Returns linked hash list structure
 */
export default function LinkedHashItems() {
  var segmentsHash = {},
    nextKeys = {},
    prevKeys = {},
    startSegmentKey = null,
    endSegmentKey = null;

  /**
   * Adds new item to collection
   * @param {string} key The new item key 
   * @param {object} item The new item context object value
   */
  function add(key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    segmentsHash[key] = item;
    nextKeys[key] = null;
    if (endSegmentKey == null) {
      startSegmentKey = key;
      prevKeys[key] = null;
    } else {
      nextKeys[endSegmentKey] = key;
      prevKeys[key] = endSegmentKey;
    }
    endSegmentKey = key;
  }

  /**
   * Checks if collection is empty
   * 
   * @returns {boolean} Returns true if collection is empty
   */
  function isEmpty() {
    return startSegmentKey == null;
  }

  /**
   * Item context object
   * 
   * @param {string} key The item's key
   * @returns {object} Returns context object
   */
  function item(key) {
    return segmentsHash[key];
  }

  /**
   * Gets next key
   * 
   * @param {string} key The item key
   * @returns {string} Returns key of the next collection item
   */
  function nextKey(key) {
    return nextKeys[key];
  }

  /**
   * Gets previous key
   * 
   * @param {string} key The item key
   * @returns {string} Returns key of the previous collection item
   */
  function prevKey(key) {
    return prevKeys[key];
  }

  /**
   * First collection item key
   * 
   * @returns {string} Returns the key of the first item in the collection
   */
  function startKey() {
    return startSegmentKey;
  }

  /**
   * Last collection item key
   * 
   * @returns {string} Returns key of the last item in the collection
   */
  function endKey() {
    return endSegmentKey;
  }

  /**
  * Adds new item to the head of the list
  * 
  * @param {string} key The new item key 
  * @param {object} item The new item context object value
  * @returns {string} Returns key of the last item in the collection
  */
  function unshift(key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    segmentsHash[key] = item;
    prevKeys[key] = null;
    if (startSegmentKey == null) {
      endSegmentKey = key;
      nextKeys[key] = null;
    } else {
      prevKeys[startSegmentKey] = key;
      nextKeys[key] = startSegmentKey;
    }
    startSegmentKey = key;
  }

  /**
  * Inserts new item into the list after the given key 
  *  
  * @param {string} afterKey The key that the new element is placed after 
  * @param {string} key The new item key 
  * @param {object} item The new item context object value
  */
  function insertAfter(afterKey, key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }

    if (afterKey == null) {
      unshift(key, item);
    } else {
      var nextKey = nextKeys[afterKey];
      if (nextKey == null) {
        add(key, item);
      } else {
        segmentsHash[key] = item;
        nextKeys[afterKey] = key;
        nextKeys[key] = nextKey;
        prevKeys[nextKey] = key;
        prevKeys[key] = afterKey;
      }
    }
  }

  /**
   * Inserts new item into the list before the given key  
   * 
   * @param {string} beforeKey The key that the new element is placed before 
   * @param {string} key The new item key 
   * @param {object} item The new item context object value
   */
  function insertBefore(beforeKey, key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    if (beforeKey == null || !segmentsHash.hasOwnProperty(beforeKey)) {
      throw "Before key should be defined!";
    }
    var prevKey = prevKeys[beforeKey];
    if (prevKey == null) {
      unshift(key, item);
    } else {
      insertAfter(prevKey, key, item)
    }
  }

  /**
   * Removes item
   * @param {string} key The key of the item 
   */
  function remove(key) {
    var prevKey = prevKeys[key],
      nextKey = nextKeys[key];

    if (prevKey != null) {
      nextKeys[prevKey] = nextKey;
    } else {
      startSegmentKey = nextKey;
    }

    if (nextKey != null) {
      prevKeys[nextKey] = prevKey;
    } else {
      endSegmentKey = prevKey;
    }

    delete segmentsHash[key];
    delete nextKeys[key];
    delete prevKeys[key];
  }

  /**
   * Empties collection
   */
  function empty() {
    segmentsHash = {};
    nextKeys = {};
    prevKeys = {};
    startSegmentKey = null;
    endSegmentKey = null;
  }

  function _iterate(forward, onItem, startKey, endKey) {
    var key = startKey,
      segment;

    if (key == null) {
      key = forward ? startSegmentKey : endSegmentKey;
    }

    if (onItem != null) {
      while (key != null) {
        segment = segmentsHash[key];
        if (segment != null) {
          if (onItem(segment, key)) {
            return;
          }
        }

        if (key == endKey) {
          key = null;
        } else {
          key = forward ? nextKeys[key] : prevKeys[key];
        }
      }
    }
  }

  /**
   * Appends one list to another
   * 
   * @param {LinkedHashItems} list A list to append to the end of the current list  
   */
  function attach(list) {
    list.iterate(function (segment, key) {
      add(key, segment);
    });
  }

  /**
   * Callback function for iterating list items
   * 
   * @callback onLinkedHashItemsCallback
   * @param {object} item  The item context object
   * @param {string} key The item key
   * @returns {boolean} Returns true to break the iteration process
   */

  /**
   * Loops items of the collection
   * @param {onLinkedHashItemsCallback} onItem  Callback function for iterating collection items
   * @param {string} startKey The key to start iteration from 
   * @param {string} endKey The key to end iteration at
   */
  function iterate(onItem, startKey, endKey) {
    _iterate(true, onItem, startKey, endKey);
  }

  /**
   * Loops items of the collection backward
   * @param {onLinkedHashItemsCallback} onItem  Callback function for iterating collection items
   * @param {string} startKey The key to start iteration from 
   * @param {string} endKey The key to end iteration at
   */
  function iterateBack(onItem, startKey, endKey) {
    _iterate(false, onItem, startKey, endKey);
  }

  /**
   * Validates internal data consistency of the structure
   * @returns {boolean} Returns true if it pass validation
   */
  function validate(info) {
    var key, prevKey, nextKey;
    for (key in segmentsHash) {
      if (segmentsHash.hasOwnProperty(key)) {
        if (!nextKeys.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
      }
    }
    if (!segmentsHash.hasOwnProperty(startSegmentKey) || !segmentsHash.hasOwnProperty(endSegmentKey)) {
      if (info != null) {
        info.message = "Start or end values are missing!";
      }
      return false;
    }
    for (key in nextKeys) {
      if (nextKeys.hasOwnProperty(key)) {
        if (!segmentsHash.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
        nextKey = nextKeys[key];
        if (nextKey && !nextKeys.hasOwnProperty(nextKey)) {
          if (info != null) {
            info.message = "Next key not found!";
          }
          return false;
        }
      }
    }
    for (key in prevKeys) {
      if (prevKeys.hasOwnProperty(key)) {
        if (!segmentsHash.hasOwnProperty(key) || !nextKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
        prevKey = prevKeys[key];
        if (prevKey && !prevKeys.hasOwnProperty(prevKey)) {
          if (info != null) {
            info.message = "Prev key not found!";
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Returns a regular javascript array of collection items
   * 
   * @returns {object[]} Returns array containing items of the collection
   */
  function toArray() {
    var result = [];

    iterate(function (item) {
      result.push(item);
    });

    return result;
  }

  return {
    add: add,
    item: item,
    nextKey: nextKey,
    prevKey: prevKey,
    startKey: startKey,
    endKey: endKey,
    unshift: unshift,
    insertAfter: insertAfter,
    insertBefore: insertBefore,
    remove: remove,
    isEmpty: isEmpty,
    attach: attach,

    iterate: iterate,
    iterateBack: iterateBack,
    empty: empty,
    toArray: toArray,
    validate: validate
  };
};