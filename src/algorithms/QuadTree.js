import Rect from '../graphics/structs/Rect';
/**
 * Creates Quad Tree data structure. It distributes points into equal quadrants. 
 * So it is equivalent to 2 dimensional binary search tree. 
 * @class QuadTree
 * 
 * @param {number} minimalSize Defines minimal size of the quadrant. This protects structure against unnecessary depth.
 * @returns {QuadTree} Returns Quad Tree data structure.
 */
export default function QuadTree(minimalSize) {
  var _minimalScale = Math.max(1, scale(minimalSize)),
    _rootScale = 8,
    _rootSize = 256,
    _rootCell = null;

  // Create root cell
  _rootCell = new Cell(0, 0, _rootScale, _rootSize);

  function Cell(x, y, scale, size) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.size = size;
    this.quadrants = [];
    this.points = [];
  }

  Cell.prototype.notEnclosed = function (rect) {
    if (this.x < rect.x || this.x + this.size > rect.x + rect.width || this.y < rect.y || this.y + this.size > rect.y + rect.height) {
      return true;
    }
    return false;
  };

  Cell.prototype.overlaps = function (rect) {
    if (this.x + this.size < rect.x || rect.x + rect.width < this.x || this.y + this.size < rect.y || rect.y + rect.height < this.y) {
      return false;
    }
    return true;
  };

  Cell.prototype.getQuadrantIndex = function (x, y) {
    var shift = this.scale - 1;
    return ((x >> shift) & 1) | (((y >> shift) & 1) << 1);
  };

  function scale(value) {
    return Math.floor(Math.log(value) / Math.log(2));
  }

  /**
   * Adds point
   * 
   * @param {Point} point Point
   */
  function addPoint(point) {
    var x = Math.floor(point.x),
      y = Math.floor(point.y),
      size = Math.max(x, y);

    while (_rootSize <= size) {
      _rootScale += 1;
      _rootSize *= 2;
      var parent = new Cell(0, 0, _rootScale, _rootSize);
      _splitCell(parent);
      parent.quadrants[0] = _rootCell;
      _rootCell = parent;
    }
    _addPoint(point);
  }

  function _addPoint(point) {
    var x = Math.floor(point.x),
      y = Math.floor(point.y),
      cell = _rootCell;
    if (x < 0 || y < 0) {
      throw "Negative values are not supported in the quad tree.";
    }
    while (cell.points == null || cell.points.length > 0) {
      if (cell.scale == _minimalScale && cell.points != null) {
        break;
      }
      if (cell.points != null && cell.points.length > 0) {
        _splitCell(cell);
      }
      cell = cell.quadrants[cell.getQuadrantIndex(x, y)];
    }
    cell.points.push(point);
  }

  function _splitCell(parent) {
    var size = parent.size / 2;
    parent.quadrants = [
      new Cell(parent.x, parent.y, parent.scale - 1, size),
      new Cell(parent.x + size, parent.y, parent.scale - 1, size),
      new Cell(parent.x, parent.y + size, parent.scale - 1, size),
      new Cell(parent.x + size, parent.y + size, parent.scale - 1, size)
    ];
    for (var index = 0, len = parent.points.length; index < len; index += 1) {
      var point = parent.points[index],
        x = Math.floor(point.x),
        y = Math.floor(point.y);

      parent.quadrants[parent.getQuadrantIndex(x, y)].points.push(point);
    }

    // indicates that cell has quadrants
    parent.points = null;
  }

  /**
   * Callback function for iteration of points
   * 
   * @callback onQuadTreePointCallback
   * @param {Point} point Rectangle
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops rectangular area of quad tree structure
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {Rect} rect Rectangular search area
   * @param {onQuadTreePointCallback} onItem Callback function to call for every point within the search area
   */
  function loopArea(thisArg, rect, onItem) {
    var cell,
      index, len;
    if (onItem != null) {
      var check = [_rootCell],
        nocheck = [];
      while (check.length > 0 || nocheck.length > 0) {
        var newCheck = [],
          newNocheck = [];
        for (index = 0, len = check.length; index < len; index += 1) {
          cell = check[index];
          if (cell.overlaps(rect)) {
            if (cell.notEnclosed(rect)) {
              if (cell.points == null) {
                for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
                  newCheck.push(cell.quadrants[quadrantIndex]);
                }
              } else {
                for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
                  var point = cell.points[pointIndex];
                  if (rect.contains(point)) {
                    if (onItem.call(thisArg, point)) {
                      return;
                    }
                  }
                }
              }
            } else {
              nocheck.push(cell);
            }
          }
        }
        for (index = 0, len = nocheck.length; index < len; index += 1) {
          cell = nocheck[index];
          if (cell.points == null) {
            for (quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
              newNocheck.push(cell.quadrants[quadrantIndex]);
            }
          } else {
            for (pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
              if (onItem.call(thisArg, cell.points[pointIndex])) {
                return;
              }
            }
          }
        }
        check = newCheck;
        nocheck = newNocheck;
      }
    }
  }

  /**
   * Validates internal data consistency of quad tree data structure
   * 
   * @returns {boolean} Returns true if structure pass validation
   */
  function validate() {
    var level = [_rootCell];
    while (level.length > 0) {
      var newLevel = [];
      for (var index = 0, len = level.length; index < len; index += 1) {
        var cell = level[index];
        var rect = new Rect(cell.x, cell.y, cell.size, cell.size);
        if (cell.points != null && cell.quadrants.length > 0) {
          return false;
        }
        if (cell.points == null) {
          for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
            newLevel.push(cell.quadrants[quadrantIndex]);
          }
        } else {
          for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
            var point = cell.points[pointIndex];
            if (!rect.contains(point)) {
              return false;
            }
          }
        }
      }
      level = newLevel;
    }
    return true;
  }

  /**
   * Returns collection of quadrants created in the data structure
   * Quadrants exists only when elements exists in them.
   * This method is used for visual debugging of the structure.
   * 
   * @param {React} selection Rectangular test area to highlight quadrants
   * @returns {Rect[]} Returns collection of available quadrants.
   * Quadrants containing points within selection area have context.highlight property set to true.
   */
  function getPositions(selection) {
    var result = [];
    var count = 0;
    var level = [_rootCell];
    while (level.length > 0) {
      var newLevel = [];
      for (var index = 0, len = level.length; index < len; index += 1) {
        var cell = level[index];
        var rect = new Rect(cell.x, cell.y, cell.size, cell.size);
        rect.context = {
          isHighlighted: false
        };
        count += 1;
        if (selection != null && selection.overlaps(rect) && cell.points != null && cell.points.length > 0) {
          rect.context.isHighlighted = true;
        }

        result.push(rect);
        for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
          var quadrant = cell.quadrants[quadrantIndex];
          if (quadrant != null) {
            newLevel.push(quadrant);
          }
        }
      }
      level = newLevel;
    }
    return result;
  }

  return {
    addPoint: addPoint,
    loopArea: loopArea,
    validate: validate,
    getPositions: getPositions
  };
};