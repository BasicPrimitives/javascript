/**
 * @class Thickness
 * @classdesc Class describes the thickness of a frame around rectangle.
 * 
 * @param {number} left Left.
 * @param {number} top Top.
 * @param {number} right Right.
 * @param {number} bottom Bottom.
 */
export default function Thickness(arg0, arg1, arg2, arg3) {
  /**
   * The thickness for the left side of the rectangle.
   */
  this.left = 0;

  /**
   * The thickness for the upper side of the rectangle.
   */
  this.top = 0;

  /**
   * The thickness for the right side of the rectangle.
   */
  this.right = 0;

  /**
   * The thickness for the bottom side of the rectangle.
   */
  this.bottom = 0;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.left = arg0.left;
        this.top = arg0.top;
        this.right = arg0.right;
        this.bottom = arg0.bottom;
      } else {
        this.left = arg0;
        this.top = arg0;
        this.right = arg0;
        this.bottom = arg0;
      }
      break;
    case 4:
      this.left = arg0;
      this.top = arg1;
      this.right = arg2;
      this.bottom = arg3;
      break;
  }
  return this;
};

/**
 * Checks object is empty
 * 
 * @returns {boolean} Returns true if object has no thickness defined for any of its sides
 */
Thickness.prototype.isEmpty = function () {
  return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/**
 * Checks if at least one side is positive
 * 
 * @returns {boolean} Returns true if any of its sides is positive
 */
Thickness.prototype.isPositive = function () {
  return this.left > 0 || this.top > 0 || this.right > 0 || this.bottom > 0;
};

/**
 * Checks if at least one side is negative
 * 
 * @returns {boolean} Returns true if any of its sides is negative
 */
Thickness.prototype.isNegative = function () {
  return this.left < 0 || this.top < 0 || this.right < 0 || this.bottom < 0;
};

/**
 * Maximum thickness.
 * 
 * @param {Thickness} thickness The thickness to compare with.
 * @returns {Thickness} Returns reference to the current thickness object
 */
Thickness.prototype.maxThickness = function (thickness) {
  this.left = Math.max(this.left, thickness.left);
  this.top = Math.max(this.top, thickness.top);
  this.right = Math.max(this.right, thickness.right);
  this.bottom = Math.max(this.bottom, thickness.bottom);

  return this;
};

/**
 * Add thickness.
 * 
 * @param {Thickness} thickness The thickness to add.
 * @returns {Thickness} Returns reference to the current thickness object
 */
Thickness.prototype.addThickness = function (arg0, arg1, arg2, arg3) {
  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.left += arg0.left;
        this.top += arg0.top;
        this.right += arg0.right;
        this.bottom += arg0.bottom;
      } else {
        this.left += arg0;
        this.top += arg0;
        this.right += arg0;
        this.bottom += arg0;
      }
      break;
    case 4:
      this.left += arg0;
      this.top += arg1;
      this.right += arg2;
      this.bottom += arg3;
      break;
  }

  return this;
};

/**
 * Scales the thickness by the specified value
 * 
 * @param {number} scale
 * @returns {Thickness} Returns reference to the current size.
 */
Thickness.prototype.scale = function (scale) {
  this.left = this.left * scale;
  this.top = this.top * scale;
  this.right = this.right * scale;
  this.bottom = this.bottom * scale;
  return this;
};

/**
 * Returns thickness object in form of CSS style string. It is conversion to padding style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Thickness.prototype.toString = function (units) {
  units = (units !== undefined) ? units : "px";

  return this.top + units + " " + this.right + units + " " + this.bottom + units + " " + this.left + units;
};