import Point from './Point';
import Vector from './Vector';
import Interval from './Interval';
import { PlacementType } from '../../enums'

/**
 * @class Rect
 * @classdesc Class describes the width, height and location of rectangle.
 * 
 * @param {Rect} arg0 Rectangle to clone.
 * 
 * @param {Point} arg0 The top left point.
 * @param {Point} arg1 The bottom right point.
 * 
 * @param {number} arg0 The x coordinate of top left corner.
 * @param {number} arg1 The y coordinate of top left corner.
 * @param {number} arg2 Rect width.
 * @param {number} arg3 Rect height.
 */
export default function Rect(arg0, arg1, arg2, arg3) {
  /**
   * The location x coordinate
   * @type {number}
   */
  this.x = null;
  /**
   * The location y coordinate
   * @type {number}
   */
  this.y = null;
  /**
   * The width of rectangle.
   * @type {number}
   */
  this.width = null;
  /**
   * The height of rectangle.
   * @type {number}
   */
  this.height = null;
  /**
   * Reference to context object associated with this rectangle.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.x = arg0.x;
      this.y = arg0.y;
      this.width = arg0.width;
      this.height = arg0.height;
      break;
    case 2:
      this.x = Math.min(arg0.x, arg1.x);
      this.y = Math.min(arg0.y, arg1.y);
      this.width = Math.abs(arg1.x - arg0.x);
      this.height = Math.abs(arg1.y - arg0.y);
      break;
    case 4:
      this.x = arg0;
      this.y = arg1;
      this.width = arg2;
      this.height = arg3;
      break;
    default:
      break;
  }
};

/**
 * Left
 * 
 * @returns {number} Returns x coordinate of the rectangle
 */
Rect.prototype.left = function () {
  return this.x;
};

/**
 * Top
 * 
 * @returns {number} Returns y coordinate of the rectangle
 */
Rect.prototype.top = function () {
  return this.y;
};

/**
 * Right
 * 
 * @returns {number} Returns x-axis coordinate of the right side of the rectangle
 */
Rect.prototype.right = function () {
  return this.x + this.width;
};

/**
 * Bottom
 * 
 * @returns {number} Returns y-axis coordinate of the bottom side of the rectangle
 */
Rect.prototype.bottom = function () {
  return this.y + this.height;
};

/**
 * Vertical center
 * 
 * @returns {number} Returns y-axis coordinate of the center point of the rectangle.
 */
Rect.prototype.verticalCenter = function () {
  return this.y + this.height / 2.0;
};

/**
 * Horizontal center
 * 
 * @returns {number} Returns x-axis coordinate of the center point of the rectangle.
 */
Rect.prototype.horizontalCenter = function () {
  return this.x + this.width / 2.0;
};

/**
 * Center point
 * 
 * @returns {Point} Returns center point of the rectangle.
 */
Rect.prototype.centerPoint = function () {
  return new Point(this.horizontalCenter(), this.verticalCenter());
};

/**
 * Checks if rectangle is empty. Rectangle is empty if one of its sizes is undefined or less than zero.
 * 
 * @returns {boolean} Returns true if rectangle is empty.
 */
Rect.prototype.isEmpty = function () {
  return this.x === null || this.y === null || this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/**
 * Expands rectangle boundaries by using specified value in all directions. Value can be negative.
 * 
 * @param {number} arg0 The amount by which to expand or shrink the sides of the rectangle.
 * @param {number} arg0 Left side
 * @param {number} arg1 Top side
 * @param {number} arg2 Right side
 * @param {number} arg3 Bottom side
 */
Rect.prototype.offset = function (arg0, arg1, arg2, arg3) {
  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.x = this.x - arg0.left;
        this.y = this.y - arg0.top;

        this.width = this.width + arg0.left + arg0.right;
        this.height = this.height + arg0.top + arg0.bottom;
      } else {
        this.x = this.x - arg0;
        this.y = this.y - arg0;

        this.width = this.width + arg0 * 2.0;
        this.height = this.height + arg0 * 2.0;
      }
      break;
    case 4:
      this.x = this.x - arg0;
      this.y = this.y - arg1;

      this.width = this.width + arg0 + arg2;
      this.height = this.height + arg1 + arg3;
      break;
  }
  return this;
};

/**
 * Scales the rectangle by the specified value
 * 
 * @param {number} scale
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.scale = function (scale) {
  this.x = this.x * scale;
  this.y = this.y * scale;
  this.width = this.width * scale;
  this.height = this.height * scale;
  return this;
};

/**
 * Moves the rectangle by the specified horizontal and vertical offsets.
 * 
 * @param {number} x Horizontal offset
 * @param {number} y Vertical offset
 * 
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.translate = function (x, y) {
  this.x = this.x + x;
  this.y = this.y + y;

  return this;
};

/**
 * Inverts rectangle coordinates
 * 
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.invert = function () {
  var width = this.width,
    x = this.x;
  this.width = this.height;
  this.height = width;
  this.x = this.y;
  this.y = x;
  return this;
};

/**
 * Callback for iterating rectangle's sides
 *
 * @callback loopRectEdgesCallback
 * @param {Vector} vector Vector connecting two corners of the rectangle's side
 * @param {PlacementType} placementType The current side
 * @returns {boolean} Returns true to break iteration process
 */

/**
 * Loops edges of the rectangle in the clockwise order: Top, Right, Bottom, Left
 *
 * @param {loopRectEdgesCallback} callback A callback function to iterate over sides of the rectangle. 
 * @returns {Rect} Returns reference to the current rectangle.
*/
Rect.prototype.loopEdges = function (callback) { // function(vector, placementType) {}
  var vertexes = [
    new Point(this.left(), this.top()),
    new Point(this.right(), this.top()),
    new Point(this.right(), this.bottom()),
    new Point(this.left(), this.bottom())
  ],
    placements = [
      PlacementType.Top,
      PlacementType.Right,
      PlacementType.Bottom,
      PlacementType.Left
    ];

  vertexes.push(vertexes[0]);



  if (callback != null) {
    for (var index = 1, len = vertexes.length; index < len; index += 1) {
      if (callback(new Vector(vertexes[index - 1], vertexes[index]), placements[index - 1])) {
        break;
      }
    }
  }
  return this;
};

/**
 * Checks if the rectangle contains given point
 * 
 * @param {Point} arg0 The point to check.
 * 
 * @param {number} arg0  The x coordinate of the point to check.
 * @param {number} arg1  The y coordinate of the point to check.
 * @returns {boolean} Returns true if the rectangle contains the specified point; otherwise, false.
 */
Rect.prototype.contains = function (arg0, arg1) {
  switch (arguments.length) {
    case 1:
      return this.x <= arg0.x && arg0.x <= this.x + this.width && this.y <= arg0.y && arg0.y <= this.y + this.height;
    case 2:
      return this.x <= arg0 && arg0 <= this.x + this.width && this.y <= arg1 && arg1 <= this.y + this.height;
    default:
      return false;
  }
};

/**
 * Crops the rectangle by the boundaries of the specified rectangle.
 * 
 * @param {Rect} rect The rectangle that is used to crop boundaries by
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.cropByRect = function (rect) {
  if (this.x < rect.x) {
    this.width -= (rect.x - this.x);
    this.x = rect.x;
  }

  if (this.right() > rect.right()) {
    this.width -= (this.right() - rect.right());
  }

  if (this.y < rect.y) {
    this.height -= (rect.y - this.y);
    this.y = rect.y;
  }

  if (this.bottom() > rect.bottom()) {
    this.height -= this.bottom() - rect.bottom();
  }

  if (this.isEmpty()) {
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
  }

  return this;
};

/**
 * Checks if the rectangle overlaps the specified rectangle
 * 
 * @param {Rect} rect The rectangle to check overlapping for.
 * @returns {boolean} Returns true if two rectangles overlap each other.
 */
Rect.prototype.overlaps = function (rect) {
  var result = true;
  if (this.x + this.width < rect.x || rect.x + rect.width < this.x || this.y + this.height < rect.y || rect.y + rect.height < this.y) {
    result = false;
  }
  return result;
};

/**
 * Expands the rectangle boundaries to contain the specified rectangle.
 * 
 * @param {Rect} arg0 The rectangle to contain.
 * 
 * @param {number} arg0 The x coordinate of top left corner.
 * @param {number} arg1 The y coordinate of top left corner.
 * @param {number} [arg2=undefined] Width.
 * @param {number} [arg3=undefined] Height.
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.addRect = function (arg0, arg1, arg2, arg3) {
  var right,
    bottom;
  switch (arguments.length) {
    case 1:
      if (!arg0.isEmpty()) {
        if (this.isEmpty()) {
          this.x = arg0.x;
          this.y = arg0.y;
          this.width = arg0.width;
          this.height = arg0.height;
        }
        else {
          right = Math.max(this.right(), arg0.right());
          bottom = Math.max(this.bottom(), arg0.bottom());

          this.x = Math.min(this.x, arg0.x);
          this.y = Math.min(this.y, arg0.y);
          this.width = right - this.x;
          this.height = bottom - this.y;
        }
      }
      break;
    case 2:
      if (this.isEmpty()) {
        this.x = arg0;
        this.y = arg1;
        this.width = 0;
        this.height = 0;
      }
      else {
        right = Math.max(this.right(), arg0);
        bottom = Math.max(this.bottom(), arg1);

        this.x = Math.min(this.x, arg0);
        this.y = Math.min(this.y, arg1);
        this.width = right - this.x;
        this.height = bottom - this.y;
      }
      break;
    case 4:
      if (this.isEmpty()) {
        this.x = arg0;
        this.y = arg1;
        this.width = arg2;
        this.height = arg3;
      }
      else {
        right = Math.max(this.right(), arg0 + arg2);
        bottom = Math.max(this.bottom(), arg1 + arg3);

        this.x = Math.min(this.x, arg0);
        this.y = Math.min(this.y, arg1);
        this.width = right - this.x;
        this.height = bottom - this.y;
      }
      break;
  }

  return this;
};

/**
 * Returns rectangle location and size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Rect.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    left: this.x + units,
    top: this.y + units,
    width: this.width + units,
    height: this.height + units
  };
  return result;
};

/**
 * Returns rectangle location and size in form of CSS style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Rect.prototype.toString = function (units) {
  var result = "";

  units = (units !== undefined) ? units : "px";

  result += "left:" + this.x + units + ";";
  result += "top:" + this.y + units + ";";
  result += "width:" + this.width + units + ";";
  result += "height:" + this.height + units + ";";

  return result;
};

/**
 * Validates rectangle properties
 * 
 * @returns {boolean} Returns true if rectangle properties are valid.
 */
Rect.prototype.validate = function () {
  if (isNaN(this.x) || isNaN(this.y) || isNaN(this.width) || isNaN(this.height)) {
    throw "Invalid rect position.";
  }
};

/**
 * Checks if rectangles are equal
 * 
 * @param {Rect} rect Rectangle
 * @returns {boolean} Returns true if rectangles are equal.
 */
Rect.prototype.equalTo = function (rect) {
  return this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height;
};

/**
 * Find intersection point between rectangle's perimeter and line connecting the given point and center of the rectangle
 * 
 * @param {Point} point Point to project
 * @returns {Point} Returns point or null if point is inside rectangle.
 */
Rect.prototype.getProjectionPoint = function (point) {
  var result = null;
  if(!this.contains(point)) {
    var vector = new Vector(this.centerPoint(), point);
    this.loopEdges(function(edge) {
      result = vector.getIntersectionPoint(edge, true, 1.0);
      return (result != null);
    });
  }
  return result;
};

/**
 * Vertical Interval
 * 
 * @returns {Interval} Returns vertical interval of the rectangle
 */
Rect.prototype.verticalInterval = function () {
  return new Interval( this.y, this.bottom() );
};