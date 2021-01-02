/**
 * @class Point
 * @classdesc Class represents pair of x and y coordinates that define a point in 2D plane.
 * 
 * @param {Point} arg0 Point object to clone.
 * 
 * @param {number} arg0 The x coordinate.
 * @param {number} arg1 The y coordinate.
 */
export default function Point(arg0, arg1) {
  /**
   * The x coordinate
   * @type {number}
   */
  this.x = null;
  /**
   * The y coordinate
   * @type {number}
   */
  this.y = null;

  /**
   * Reference to the context object associated with this point.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.x = arg0.x;
      this.y = arg0.y;
      this.context = arg0.context;
      break;
    case 2:
      this.x = arg0;
      this.y = arg1;
      break;
    default:
      break;
  }
};

/**
 * Scales the point location by the specified value
 * 
 * @param {number} scale
 * @returns {Point} Returns reference to the current point.
 */
Point.prototype.scale = function (scale) {
  this.x = this.x * scale;
  this.y = this.y * scale;
  return this;
};

/**
 * Calculates distance to the specified point
 * 
 * @param {Point} arg0 Point
 * 
 * @param {number} arg0 X coordinate
 * @param {number} arg1 Y coordinate
 * 
 * @returns {number} Returns distance to the specified point
 */
Point.prototype.distanceTo = function (arg0, arg1) {
  var x2 = 0,
    y2 = 0,
    a,
    b;
  switch (arguments.length) {
    case 1:
      x2 = arg0.x;
      y2 = arg0.y;
      break;
    case 2:
      x2 = arg0;
      y2 = arg1;
      break;
    default:
      break;
  }
  a = this.x - x2;
  b = this.y - y2;
  return Math.sqrt(a * a + b * b);
};

/**
 * Checks if points are equal
 * 
 * @param {Point} point Point
 * @returns {boolean} Returns true if points are equal.
 */
Point.prototype.equalTo = function (point) {
  return this.x == point.x && this.y == point.y;
};

/**
 * Swaps values of 2 points
 * 
 * @param {Point} point The point to swap values with
 */
Point.prototype.swap = function (point) {
  var x = point.x,
    y = point.y;

  point.x = this.x;
  point.y = this.y;

  this.x = x;
  this.y = y;
};

/**
 * Clones the point
 * 
 * @returns {Point} Returns copy of the point.
 */
Point.prototype.clone = function () {
  return new Point(this);
};

/**
 * Returns point in form of CSS style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Point.prototype.toString = function (units) {
  var result = "";

  units = (units !== undefined) ? units : "px";

  result += "left:" + this.x + units + ";";
  result += "top:" + this.y + units + ";";

  return result;
};

/**
 * Returns size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Point.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    left: this.x + units,
    top: this.y + units
  };
  return result;
};