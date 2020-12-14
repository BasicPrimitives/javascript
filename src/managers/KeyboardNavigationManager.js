import SortedList from '../algorithms/SortedList';
import getMinimumCrossingRows from '../algorithms/getMinimumCrossingRows';
import TreeLevels from '../algorithms/TreeLevels';
import Rect from '../graphics/structs/Rect';

export default function KeyboardNavigationManager() {
  var /*
      Rectangles of the layout. Every rectangle has context property set to itemid.
    */
    _placements = [],
    /*
      This is sorted list of horizontal lines user may navigate along them and across with arrow keys between rectangles of the layout
      Every rectangle may belong to multiple rows, so rows selection is optimized to minimize their number
    */
    _rows,
    /*
      Tree levels structure is collection of colelctions. Its level contains sorted list of rectangles cross by individual row
    */
    _treeLevels,
    /*
      Current itemid and row. Every rectangle may belong to multiple rows, so this structure helps to stay within row during navigation. 
    */
    _cursor = null;

  function Cursor(itemid, row) {
    this.itemid = itemid;
    this.row = row;
  }

  function addRect(rect, itemid) {
    var newRect = new Rect(rect);
    newRect.context = itemid;

    _placements.push(newRect);
  }

  function prepair() {
    if (_treeLevels == null) {
      var levelIndex = 0;
      _rows = SortedList();
      getMinimumCrossingRows(this, _placements, function (row) {
        _rows.add(row, levelIndex);
        levelIndex += 1;
      });

      _treeLevels = TreeLevels();
      _placements.sort(function (a, b) {
        return a.horizontalCenter() - b.horizontalCenter();
      });
      for (var index = 0, len = _placements.length; index < len; index += 1) {
        var placement = _placements[index];
        _rows.loopForward(this, placement.y, function (row, levelIndex) {
          if (row > placement.bottom()) {
            return true;
          }
          _treeLevels.addItem(levelIndex, placement.context, placement);
        });
      }
    }
  }

  function getCursor(itemid) {
    prepair();

    if (_cursor == null || _cursor.itemid != itemid) {
      _cursor = new Cursor(itemid, _treeLevels.getLevelIndex(itemid));
    }

    return _cursor;
  }

  function getItemAbove(itemid) {
    _cursor = getCursor(itemid);

    moveCursorNextRow(false);

    return _cursor.itemid;
  }

  function getItemBelow(itemid) {
    _cursor = getCursor(itemid);

    moveCursorNextRow(true);

    return _cursor.itemid;
  }

  function moveCursorNextRow(isBelow) {
    var cursorItemRect = _treeLevels.getItemContext(_cursor.itemid);
    var cursorCenter = cursorItemRect.horizontalCenter();
    var previousCursorItem = _cursor.itemid;
    _treeLevels.loopLevelsFromItem(this, _cursor.itemid, isBelow, function (levelIndex) {
      _cursor.row = levelIndex;
      _cursor.itemid = _treeLevels.binarySearch(this, levelIndex, function (itemid, placement) {
        return cursorCenter - placement.horizontalCenter();
      });
      return true;
    });
    if (previousCursorItem == _cursor.itemid) {
      if (isBelow) {
        _cursor.row = _treeLevels.getEndLevelIndex(_cursor.itemid);
      } else {
        _cursor.row = _treeLevels.getLevelIndex(_cursor.itemid);
      }
    }
  }

  function getItemOnLeft(itemid) {
    _cursor = getCursor(itemid);

    var nextItem = _treeLevels.getPrevItem(_cursor.itemid, _cursor.row);
    if (nextItem != null) {
      _cursor.itemid = nextItem;
    }
    return _cursor.itemid;
  }

  function getItemOnRight(itemid) {
    _cursor = getCursor(itemid);

    var nextItem = _treeLevels.getNextItem(_cursor.itemid, _cursor.row);
    if (nextItem != null) {
      _cursor.itemid = nextItem;
    }
    return _cursor.itemid;
  }

  function getNavigationLevels() {
    prepair();

    var result = [];
    _treeLevels.loopLevels(this, function (levelIndex, level) {
      var levelItems = [];
      _treeLevels.loopLevelItems(this, levelIndex, function (itemid, item, position) {
        levelItems.push(itemid);
      });
      result.push(levelItems);
    });
    return result;
  }

  return {
    addRect: addRect,
    prepair: prepair,
    getItemAbove: getItemAbove,
    getItemBelow: getItemBelow,
    getItemOnLeft: getItemOnLeft,
    getItemOnRight: getItemOnRight,
    getNavigationLevels: getNavigationLevels
  };
};