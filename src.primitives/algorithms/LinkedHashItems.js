primitives.common.LinkedHashItems = function () {
  var segmentsHash = {},
    nextKeys = {},
    prevKeys = {},
    startSegmentKey = null,
    endSegmentKey = null;

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

  function isEmpty() {
    return startSegmentKey == null;
  }

  function item(key) {
    return segmentsHash[key];
  }

  function nextKey(key) {
    return nextKeys[key];
  }

  function prevKey(key) {
    return prevKeys[key];
  }

  function startKey() {
    return startSegmentKey;
  }

  function endKey() {
    return endSegmentKey;
  }

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

  function attach(list) {
    list.iterate(function (segment, key) {
      add(key, segment);
    });
  }

  function iterate(onItem, startKey, endKey) {
    _iterate(true, onItem, startKey, endKey);
  }

  function iterateBack(onItem, startKey, endKey) {
    _iterate(false, onItem, startKey, endKey);
  }

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

