/*
	Class: primitives.common.Vector
	Class represents pair of points that defines a vector in 2D plane.

	Parameters:
		vector - <primitives.common.Vector> object.

	Parameters:
		from - From 2D point.
		to - To 2D point.
*/
primitives.common.Vector = function (arg0, arg1) {
	/*
	Property: from
		The from point of vector.
	*/

	this.from = null;

	/*
	Property: to
		The to point of vector.
	*/

	this.to = null;

	/*
	Property: context
		This property holds reference to context object associated with this vector.
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

primitives.common.Vector.prototype.isNull = function () {
	return this.from.x == this.to && this.from.y == this.to.y;
};

/*
	Method: length
		Returns length of vector.

	Returns:
		Vector length.
*/
primitives.common.Vector.prototype.length = function () {
	return this.from.distanceTo(this.to);
};

primitives.common.Vector.prototype.equalTo = function (vector) {
	return this.from.equalTo(vector.from) && this.to.equalTo(vector.to);
};

primitives.common.Vector.prototype.getMiddlePoint = function () {
	return new primitives.common.Point((this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2);
};

primitives.common.Vector.prototype.relateTo = function (vector) {
	var result = primitives.common.VectorRelationType.None,
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
			result = primitives.common.VectorRelationType.Null;
			break;
		case 5: //0101
			if (y1 * y2 > 0) {
				result = primitives.common.VectorRelationType.Collinear;
			} else {
				result = primitives.common.VectorRelationType.Opposite;
			}
			break;
		case 10://1010
			if (x1 * x2 > 0) {
				result = primitives.common.VectorRelationType.Collinear;
			} else {
				result = primitives.common.VectorRelationType.Opposite;
			}
			break;
		case 15://1111
			if (x1 / x2 == y1 / y2) {
				if (x1 / x2 > 0) {
					result = primitives.common.VectorRelationType.Collinear;
				} else {
					result = primitives.common.VectorRelationType.Opposite;
				}
			}
			break;
	}
	return result;
};

primitives.common.Vector.prototype.offset = function (offset) {
	var length = this.length(),
		/* in order to rotate right multiply vector on 3D vector (0, 0, -1)*/
		x = (this.to.y - this.from.y) * offset / length,
		y = - (this.to.x - this.from.x) * offset / length;

	this.from.x += x;
	this.from.y += y;
	this.to.x += x;
	this.to.y += y;
};

primitives.common.Vector.prototype.getLine = function () {
	var x1 = this.from.x,
		y1 = this.from.y,
		x2 = this.to.x,
		y2 = this.to.y,
		a = y2 - y1,
		b = x1 - x2,
		c = x1 * (y1 - y2) + y1 * (x2 - x1);

	return [a, b, c];
};

primitives.common.Vector.prototype.getLineKey = function () {
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


primitives.common.Vector.prototype.intersect = function (vector) {
	var v1 = this.getLine(),
		v2 = vector.getLine(),
		m = new primitives.common.Matrix(v1[0], v1[1], v2[0], v2[1]),
		d = m.determinant(),
		mx, my, dx, dy,
		x, y,
		result = false;

	if (d !== 0) {
		mx = new primitives.common.Matrix(-v1[2], v1[1], -v2[2], v2[1]);
		dx = mx.determinant();
		my = new primitives.common.Matrix(v1[0], -v1[2], v2[0], -v2[2]);
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

primitives.common.Vector.prototype.getIntersectionPoint = function (vector, strict, rounding) {
	var v1 = this.getLine(),
		v2 = vector.getLine(),
		m = new primitives.common.Matrix(v1[0], v1[1], v2[0], v2[1]),
		d = m.determinant(),
		mx, my, dx, dy,
		x, y,
		result = null;

	if (d !== 0) {
		mx = new primitives.common.Matrix(-v1[2], v1[1], -v2[2], v2[1]);
		dx = mx.determinant();
		my = new primitives.common.Matrix(v1[0], -v1[2], v2[0], -v2[2]);
		dy = my.determinant();
		x = dx / d;
		y = dy / d;

		if (strict) {
			if (vector._contains(x, y, rounding) && this._contains(x, y, rounding)) {
				result = new primitives.common.Point(x, y);
			}
		} else {
			result = new primitives.common.Point(x, y);
		}
	}

	return result;
};

primitives.common.Vector.prototype._contains = function (x, y, rounding) {
	var x1 = Math.min(this.from.x, this.to.x),
		y1 = Math.min(this.from.y, this.to.y),
		x2 = Math.max(this.from.x, this.to.x),
		y2 = Math.max(this.from.y, this.to.y);

	return x1 - rounding <= x && x <= x2 + rounding && y1 - rounding <= y && y <= y2 + rounding;
};

