/*
	Class: primitives.common.Size
	Class describes the size of an object.

	Parameters:
		size - Copy constructor. It takes as a parameter copy of <primitives.common.Size> object.

	Parameters:
		width - The initial width of the instance.
		height - The initial height of the instance.
*/
primitives.common.Size = function (arg0, arg1) {
	/*
	Property: width
		The value that specifies the width of the size class.
	*/

	this.width = 0;

	/*
	Property: height
		The value that specifies the height of the size class.
	*/

	this.height = 0;

	switch (arguments.length) {
		case 1:
			this.width = arg0.width;
			this.height = arg0.height;
			break;
		case 2:
			this.width = arg0;
			this.height = arg1;
			break;
		default:
			break;
	}
};

/*
	Method: invert
		Swaps width and height.
*/
primitives.common.Size.prototype.invert = function () {
	var width = this.width;
	this.width = this.height;
	this.height = width;
	return this;
};

/*
	Method: scale
		Scales width and height.
*/
primitives.common.Size.prototype.scale = function (scale) {
	this.width = this.width * scale;
	this.height = this.height * scale;
	return this;
};

/*
	Method: getCSS
		Returns rectangle location and size in form of CSS style object.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style object.
*/
primitives.common.Size.prototype.getCSS = function (units) {
	units = (units !== undefined) ? units : "px";

	var result = {
		left: this.x + units,
		top: this.y + units,
		width: this.width + units,
		height: this.height + units
	};
	return result;
};

/*
	Method: cropBySize
		Crops the size by the other size.

	Parameters:
		size - The size to use as the crop boundaries.
*/
primitives.common.Size.prototype.cropBySize = function (size) {
	this.width = Math.min(this.width, size.width);
	this.height = Math.min(this.height, size.height);

	return this;
};

/*
	Method: addSize
		Extend size by the other size.

	Parameters:
		size - The size to use as extension.
*/
primitives.common.Size.prototype.addSize = function (size) {
	this.width = Math.max(this.width, size.width);
	this.height = Math.max(this.height, size.height);

	return this;
};

primitives.common.Size.prototype.validate = function () {
	if (isNaN(this.width) || isNaN(this.height)) {
		throw "Invalid size.";
	}
};