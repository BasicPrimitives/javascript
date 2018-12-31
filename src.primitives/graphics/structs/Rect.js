/*
	Class: primitives.common.Rect
	Class describes the width, height and location of rectangle.

	Parameters:
		rect - Copy constructor. It takes as a parameter copy of <primitives.common.Rect> object.

	Parameters:
		pointTopLeft - Top left point <primitives.common.Point> object.
		pointBottomRight - Bottom right point <primitives.common.Point> object.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect = function (arg0, arg1, arg2, arg3) {
	/*
	Property: x
		The location x coordinate.
	*/
	this.x = null;
	/*
	Property: y
		The location y coordinate.
	*/
	this.y = null;
	/*
	Property: width
		The width of rectangle.
	*/
	this.width = null;
	/*
	Property: height
		The height of rectangle.
	*/
	this.height = null;

	/*
	Property: context
		This property holds reference to context object associated with this rectangle.
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

/*
	Method: left
		Gets the x-axis value of the left side of the rectangle.
*/
primitives.common.Rect.prototype.left = function () {
	return this.x;
};

/*
	Method: top
		Gets the y-axis value of the top side of the rectangle.
*/
primitives.common.Rect.prototype.top = function () {
	return this.y;
};

/*
	Method: right
		Gets the x-axis value of the right side of the rectangle.
*/
primitives.common.Rect.prototype.right = function () {
	return this.x + this.width;
};

/*
	Method: bottom
		Gets the y-axis value of the bottom of the rectangle.
*/
primitives.common.Rect.prototype.bottom = function () {
	return this.y + this.height;
};

/*
	Method: verticalCenter
		Gets the y-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.verticalCenter = function () {
	return this.y + this.height / 2.0;
};

/*
	Method: horizontalCenter
		Gets the x-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.horizontalCenter = function () {
	return this.x + this.width / 2.0;
};

/*
	Method: centerPoint
		Gets the point of the geometrical center of the rectangle.
*/
primitives.common.Rect.prototype.centerPoint = function () {
	return new primitives.common.Point(this.horizontalCenter(), this.verticalCenter());
};

/*
	Method: isEmpty
		Gets the value that indicates whether  the rectangle is the Empty rectangle.
*/
primitives.common.Rect.prototype.isEmpty = function () {
	return this.x === null || this.y === null || this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/*
	Method: offset
		Expands the rectangle by using specified value in all directions.

	Parameters:
		value - The amount by which to expand or shrink the sides of the rectangle.

	Parameters:
		left - The amount by which to expand or shrink the left side of the rectangle.	
		top - The amount by which to expand or shrink the top side of the rectangle.		
		right - The amount by which to expand or shrink the right side of the rectangle.		
		bottom - The amount by which to expand or shrink the bottom side of the rectangle.		
*/
primitives.common.Rect.prototype.offset = function (arg0, arg1, arg2, arg3) {
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

/*
	Method: scale
		Scales rectangle position.
*/
primitives.common.Rect.prototype.scale = function (scale) {
	this.x = this.x * scale;
	this.y = this.y * scale;
	this.width = this.width * scale;
	this.height = this.height * scale;
	return this;
};

/*
	Method: translate
		Moves the rectangle to by the specified horizontal and vertical amounts.

	Parameters:
		x - The amount to move the rectangle horizontally.
		y - The amount to move the rectangle vertically.
*/
primitives.common.Rect.prototype.translate = function (x, y) {
	this.x = this.x + x;
	this.y = this.y + y;

	return this;
};

/*
	Method: invert
		Inverts rectangle.
*/
primitives.common.Rect.prototype.invert = function () {
	var width = this.width,
		x = this.x;
	this.width = this.height;
	this.height = width;
	this.x = this.y;
	this.y = x;
	return this;
};

/*
	Method: loopEdges
		Loops edges of rectangle in the following order: Top, Right, Bottom, Left
*/
primitives.common.Rect.prototype.loopEdges = function (callback) { // function(vector, placementType) {}
	var vertexes = [
		new primitives.common.Point(this.left(), this.top()),
		new primitives.common.Point(this.right(), this.top()),
		new primitives.common.Point(this.right(), this.bottom()),
		new primitives.common.Point(this.left(), this.bottom())
	],
	placements = [
		primitives.common.PlacementType.Top,
		primitives.common.PlacementType.Right,
		primitives.common.PlacementType.Bottom,
		primitives.common.PlacementType.Left
	];

	vertexes.push(vertexes[0]);



	if (callback != null) {
		for (var index = 1, len = vertexes.length; index < len; index += 1) {
			if (callback(new primitives.common.Vector(vertexes[index - 1], vertexes[index]), placements[index - 1])) {
				break;
			}
		}
	}
	return this;
};

/*
	Method: contains
		Indicates whether the rectangle contains the specified point.

	Parameters:
		point - The point to check.

	Parameters:	
		x - The x coordinate of the point to check.
		y - The y coordinate of the point to check.
	
	Returns:
		true if the rectangle contains the specified point; otherwise, false.	
*/
primitives.common.Rect.prototype.contains = function (arg0, arg1) {
	switch (arguments.length) {
		case 1:
			return this.x <= arg0.x && arg0.x <= this.x + this.width && this.y <= arg0.y && arg0.y <= this.y + this.height;
		case 2:
			return this.x <= arg0 && arg0 <= this.x + this.width && this.y <= arg1 && arg1 <= this.y + this.height;
		default:
			return false;
	}
};

/*
	Method: cropByRect
		Crops the rectangle by the boundaries of specified rectangle.

	Parameters:
		rect - The rectangle to use as the crop boundaries.
*/
primitives.common.Rect.prototype.cropByRect = function (rect) {
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

/*
	Method: overlaps
		Returns true if the rectangle overlaps specified rectangle.

	Parameters:
		rect - The rectangle to use as overlaping rectangle.
*/
primitives.common.Rect.prototype.overlaps = function (rect) {
	var result = true;
	if (this.x + this.width < rect.x || rect.x + rect.width < this.x || this.y + this.height < rect.y || rect.y + rect.height < this.y) {
		result = false;
	}
	return result;
};

/*
	Method: addRect
		Expands the current rectangle to contain specified rectangle.

	Parameters:
		rect - The rectangle to contain.

	Parameters:	
		x - The x coordinate of the point to contain.
		y - The y coordinate of the point to contain.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect.prototype.addRect = function (arg0, arg1, arg2, arg3) {
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

/*
	Method: getCSS
		Returns rectangle location and size in form of CSS style object.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style object.
*/
primitives.common.Rect.prototype.getCSS = function (units) {
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
	Method: toString
		Returns rectangle location and size in form of CSS style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/
primitives.common.Rect.prototype.toString = function (units) {
	var result = "";

	units = (units !== undefined) ? units : "px";

	result += "left:" + this.x + units + ";";
	result += "top:" + this.y + units + ";";
	result += "width:" + this.width + units + ";";
	result += "height:" + this.height + units + ";";

	return result;
};

primitives.common.Rect.prototype.validate = function () {
	if (isNaN(this.x) || isNaN(this.y) || isNaN(this.width) || isNaN(this.height)) {
		throw "Invalid rect position.";
	}
};

primitives.common.Rect.prototype.equalTo = function (rect) {
	return this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height;
};

