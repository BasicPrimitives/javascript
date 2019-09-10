/**
 * @class Thickness
 * @classdesc Class describes the thickness of a frame around rectangle.
 * 
 * @param {number} left Left.
 * @param {number} top Top.
 * @param {number} right Right.
 * * @param {number} bottom Bottom.
 */
primitives.common.Thickness = function (left, top, right, bottom) {
  /**
   * The thickness for the left side of the rectangle.
   */
  this.left = left;

  /**
   * The thickness for the upper side of the rectangle.
   */
  this.top = top;

  /**
   * The thickness for the right side of the rectangle.
   */
  this.right = right;

  /**
   * The thickness for the bottom side of the rectangle.
   */
  this.bottom = bottom;
};

/**
 * Checks object is empty
 * 
 * @returns {boolean} Returns true if object has no thickness defined for any of its sides
 */
primitives.common.Thickness.prototype.isEmpty = function () {
  return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/**
 * Returns thickness object in form of CSS style string. It is conversion to padding style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
primitives.common.Thickness.prototype.toString = function (units) {
  units = (units !== undefined) ? units : "px";

  return this.left + units + ", " + this.top + units + ", " + this.right + units + ", " + this.bottom + units;
};