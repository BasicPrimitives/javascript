/**
 * @class Matrix
 * @classdesc Square matrix having 2 rows and 2 columns.
 * 
 * @param {Matrix} arg0 Matrix to clone
 * 
 * @param {number} arg0 A1 - top left.
 * @param {number} arg1 B1 - top right.
 * @param {number} arg2 A2 - bottom left.
 * @param {number} arg3 B2 - bottom right.
 */
export default function Matrix(arg0, arg1, arg2, arg3) {

  this.a1 = null;
  this.b1 = null;
  this.a2 = null;
  this.b2 = null;

  switch (arguments.length) {
    case 1:
      this.a1 = arg0.a1;
      this.b1 = arg0.b1;
      this.a2 = arg0.a2;
      this.b2 = arg0.b2;
      break;
    case 4:
      this.a1 = arg0;
      this.b1 = arg1;
      this.a2 = arg2;
      this.b2 = arg3;
      break;
    default:
      break;
  }
};

/**
 * Finds matrix determinant
 * 
 * @returns {number} Returns matrix determinant
 */
Matrix.prototype.determinant = function () {
  return this.a1 * this.b2 - this.b1 * this.a2;
};