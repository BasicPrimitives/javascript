/*
	Class: primitives.common.Point
	Class represents pair of x and y coordinates that defines a point in 2D plane.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.
*/
primitives.common.Point = function (arg0, arg1) {
	/*
	Property: x
		The x coordinate.
	*/

  this.x = null;
	/*
	Property: y
		The y coordinate.
	*/

  this.y = null;

	/*
	Property: context
		This property holds reference to context object associated with this datapoint.
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

/*
	Method: scale
		Scales width and height.
*/
primitives.common.Point.prototype.scale = function (scale) {
  this.x = this.x * scale;
  this.y = this.y * scale;
  return this;
};

/*
	Method: distanceTo
		Returns distance to point.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.
*/
primitives.common.Point.prototype.distanceTo = function (arg0, arg1) {
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

primitives.common.Point.prototype.equalTo = function (point) {
  return this.x == point.x && this.y == point.y;
};

/*
	Method: swap
		Swaps values of two points.

	Parameters:
		point - <primitives.common.Point> object.
*/
primitives.common.Point.prototype.swap = function (point) {
  var x = point.x,
    y = point.y;

  point.x = this.x;
  point.y = this.y;

  this.x = x;
  this.y = y;
};

/*
	Method: clone
		Clones current point.
*/
primitives.common.Point.prototype.clone = function () {
  return new primitives.common.Point(this);
};

/*
	Method: toString
		Returns rectangle location in form of CSS style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/
primitives.common.Point.prototype.toString = function (units) {
  var result = "";

  units = (units !== undefined) ? units : "px";

  result += "left:" + this.x + units + ";";
  result += "top:" + this.y + units + ";";

  return result;
};

/*
	Method: getCSS
		Returns rectangle location in form of CSS style object.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style object.
*/
primitives.common.Point.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    left: this.x + units,
    top: this.y + units
  };
  return result;
};