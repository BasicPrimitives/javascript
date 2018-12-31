/*
	Class: primitives.common.Thickness
	Class describes the thickness of a frame around rectangle.

	Parameters:
		left - The thickness for the left side of the rectangle.
		height - The thickness for the upper side of the rectangle.
		right - The thickness for the right side of the rectangle.
		bottom - The thickness for the bottom side of the rectangle.
*/
primitives.common.Thickness = function (left, top, right, bottom) {
	/*
	Property: left
		The thickness for the left side of the rectangle.
	*/

	this.left = left;

	/*
	Property: top
		The thickness for the upper side of the rectangle.
	*/

	this.top = top;

	/*
	Property: right
		The thickness for the right side of the rectangle.
	*/
	this.right = right;

	/*
	Property: bottom
		The thickness for the bottom side of the rectangle.
	*/
	this.bottom = bottom;
};

/*
	Method: isEmpty
		Gets the value that indicates whether the thickness is the Empty.
*/

primitives.common.Thickness.prototype.isEmpty = function () {
	return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/*
	Method: toString
		Returns thickness in form of CSS style string. It is conversion to padding style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/

primitives.common.Thickness.prototype.toString = function (units) {
	units = (units !== undefined) ? units : "px";

	return this.left + units + ", " + this.top + units + ", " + this.right + units + ", " + this.bottom + units;
};