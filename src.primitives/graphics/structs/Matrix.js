/*
	Class: primitives.common.Matrix
	Class represents square matrix having 2 rows and 2 columns.

	Parameters:
		matrix - <primitives.common.Matrix> object.

	Parameters:
		a1 - top left.
		b1 - top right.
		a2 - bottom left
		b2 - bottom right
*/
primitives.common.Matrix = function (arg0, arg1, arg2, arg3) {

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


primitives.common.Matrix.prototype.determinant = function () {
	return this.a1 * this.b2 - this.b1 * this.a2;
};