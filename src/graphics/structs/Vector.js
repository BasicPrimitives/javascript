import Matrix from './Matrix';
import Point from './Point';
import { VectorRelationType } from '../../enums';

/**
 * @class Vector
 * @classdesc Class defines a vector in 2D plane.
 * 
 * @param {Vector} arg0 Vector object to clone.
 * 
 * @param {Point} arg0 From point.
 * @param {Point} arg1 To point
 */
export default function Vector(arg0, arg1) {
  /**
   * The start point
   */
  this.from = null;

  /**
   * The end point
   */
  this.to = null;

  /**
   * Reference to context object associated with this vector.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.from = arg0.from;
      this.to = arg0.to;
      break;
    case 2:
      this.from = arg0;
      this.to = arg1;
      break;
    default:
      break;
  }
};

/**
 * Checks if start and end points are the same
 * 
 * @returns {boolean} Returns true if start and end points are the same.
 */
Vector.prototype.isNull = function () {
  return this.from.x == this.to && this.from.y == this.to.y;
};

/**
 * Vector length
 * 
 * @returns {number} Returns vector length
 */
Vector.prototype.length = function () {
  return this.from.distanceTo(this.to);
};

/**
 * Checks if vectors are equal
 * 
 * @param {Vector} vector Vector
 * @returns {boolean} Returns true if vectors are equal.
 */
Vector.prototype.equalTo = function (vector) {
  return this.from.equalTo(vector.from) && this.to.equalTo(vector.to);
};

/**
 * Returns middle point of the current vector
 * 
 * @returns {Point} Returns middle point
 */
Vector.prototype.getMiddlePoint = function () {
  return new Point((this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2);
};

/**
 * Finds how two vectors relate to each other
 * 
 * @param {Vector} vector The vector to relate with
 * @returns {VectorRelationType} Returns how the vector relates to the specified vector
 */
Vector.prototype.relateTo = function (vector) {
  var result = VectorRelationType.None,
    x1 = this.to.x - this.from.x,
    y1 = this.to.y - this.from.y,
    x2 = vector.to.x - vector.from.x,
    y2 = vector.to.y - vector.from.y,
    key = (x1 ? 8 : 0) + (y1 ? 4 : 0) + (x2 ? 2 : 0) + (y2 ? 1 : 0);

  switch (key) {
    case 0: //0000
    case 1: //0001
    case 2: //0010
    case 3: //0011
    case 4: //0100
    case 8: //1000
    case 12://1100
      result = VectorRelationType.Null;
      break;
    case 5: //0101
      if (y1 * y2 > 0) {
        result = VectorRelationType.Collinear;
      } else {
        result = VectorRelationType.Opposite;
      }
      break;
    case 10://1010
      if (x1 * x2 > 0) {
        result = VectorRelationType.Collinear;
      } else {
        result = VectorRelationType.Opposite;
      }
      break;
    case 15://1111
      if (x1 / x2 == y1 / y2) {
        if (x1 / x2 > 0) {
          result = VectorRelationType.Collinear;
        } else {
          result = VectorRelationType.Opposite;
        }
      }
      break;
  }
  return result;
};

/**
 * Offsets vector coordinates
 * 
 * @param {number} offset Offset
 */
Vector.prototype.offset = function (offset) {
  var length = this.length(),
    /* in order to rotate right multiply vector on 3D vector (0, 0, -1)*/
    x = (this.to.y - this.from.y) * offset / length,
    y = - (this.to.x - this.from.x) * offset / length;

  this.from.x += x;
  this.from.y += y;
  this.to.x += x;
  this.to.y += y;
};

/**
 * Gets line
 * 
 * @returns {number[]} Returns line coefficients
 */
Vector.prototype.getLine = function () {
  var x1 = this.from.x,
    y1 = this.from.y,
    x2 = this.to.x,
    y2 = this.to.y,
    a = y2 - y1,
    b = x1 - x2,
    c = x1 * (y1 - y2) + y1 * (x2 - x1);

  return [a, b, c];
};

/**
 * Gets line key
 * 
 * @returns {string} Returns unique line key
 */
Vector.prototype.getLineKey = function () {
  var line = this.getLine(),
    a = line[0],
    b = line[1],
    c = line[2],
    r = 10000;
  if (b !== 0) {
    line = [Math.floor(a / b * r), 1, Math.floor(c / b * r)];
  } else {
    line = [1, 0, Math.floor(c / a * r)];
  }
  return line.toString();
};

/**
 * Checks if two vectors have intersection point
 * 
 * @param {vector} vector The vector to check intersection with
 * @returns {boolean} Returns true if vectors intersect
 */
Vector.prototype.intersect = function (vector) {
  var v1 = this.getLine(),
    v2 = vector.getLine(),
    m = new Matrix(v1[0], v1[1], v2[0], v2[1]),
    d = m.determinant(),
    mx, my, dx, dy,
    x, y,
    result = false;

  if (d !== 0) {
    mx = new Matrix(-v1[2], v1[1], -v2[2], v2[1]);
    dx = mx.determinant();
    my = new Matrix(v1[0], -v1[2], v2[0], -v2[2]);
    dy = my.determinant();
    x = dx / d;
    y = dy / d;

    vector.to.x = x;
    vector.to.y = y;

    this.from.x = x;
    this.from.y = y;

    result = true;
  }

  return result;
};

/**
 * Finds intersection point of two vectors
 * 
 * @param {Vector} vector The vector to find intersection with
 * @param {boolean} strict If true then intersection point should belong to both vectors
 * @param {number} rounding The precision of calculations
 * @returns {Point|null} Returns intersection point or null if intersection does not exists
 */
Vector.prototype.getIntersectionPoint = function (vector, strict, rounding) {
  var v1 = this.getLine(),
    v2 = vector.getLine(),
    m = new Matrix(v1[0], v1[1], v2[0], v2[1]),
    d = m.determinant(),
    mx, my, dx, dy,
    x, y,
    result = null;

  if (d !== 0) {
    mx = new Matrix(-v1[2], v1[1], -v2[2], v2[1]);
    dx = mx.determinant();
    my = new Matrix(v1[0], -v1[2], v2[0], -v2[2]);
    dy = my.determinant();
    x = dx / d;
    y = dy / d;

    if (strict) {
      if (vector._contains(x, y, rounding) && this._contains(x, y, rounding)) {
        result = new Point(x, y);
      }
    } else {
      result = new Point(x, y);
    }
  }

  return result;
};

/**
 * @ignore
 */
Vector.prototype._contains = function (x, y, rounding) {
  var x1 = Math.min(this.from.x, this.to.x),
    y1 = Math.min(this.from.y, this.to.y),
    x2 = Math.max(this.from.x, this.to.x),
    y2 = Math.max(this.from.y, this.to.y);

  return x1 - rounding <= x && x <= x2 + rounding && y1 - rounding <= y && y <= y2 + rounding;
};

