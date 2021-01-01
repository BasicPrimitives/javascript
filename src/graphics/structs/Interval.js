/**
 * @class Interval
 * @classdesc Class represents interval defined by two values.
 * 
 * @param {Interval} arg0 Interval object to clone.
 * 
 * @param {number} arg0 The from value.
 * @param {number} arg1 The to value.
 */
export default function Interval(arg0, arg1, arg2) {
  /**
   * The from value
   * @type {number}
   */
  this.from = null;
  /**
   * The to value
   * @type {number}
   */
  this.to = null;

  /**
   * Reference to the context object associated with this Interval.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.from = arg0.from;
      this.to = arg0.to;
      this.context = arg0.context;
      break;
    case 2:
      this.from = arg0;
      this.to = arg1;
      break;
    case 3:
      this.from = arg0;
      this.to = arg1;
      this.context = arg2;
      break;
    default:
      break;
  }
};

/**
 * Width
 * 
 * @returns {number} Returns interval width
 */
Interval.prototype.width = function () {
  return this.to - this.from;
};

/**
 * Checks if intervals are equal
 * 
 * @param {Interval} interval Interval
 * @returns {boolean} Returns true if intervals are equal.
 */
Interval.prototype.equalTo = function (interval) {
  return this.from == interval.from && this.to == interval.to;
};


/**
 * Clones the interval
 * 
 * @returns {Interval} Returns copy of the interval.
 */
Interval.prototype.clone = function () {
  return new Interval(this);
};

/**
 * Returns interval in form of user friendly string 
 * 
 * @returns {string} Returns string interval representation.
 */
Interval.prototype.toString = function () {
  return this.from + ", " + this.to;
};

/**
 * Checks if the interval overlaps the specified interval
 * 
 * @param {Interval} interval The interval to check overlapping for.
 * @returns {boolean} Returns true if two intervals overlap each other.
 */
Interval.prototype.overlaps = function (interval) {
  var result = true;
  if (this.to < interval.from || interval.to < this.from) {
    result = false;
  }
  return result;
};
