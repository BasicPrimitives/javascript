/*
	Class: primitives.famdiagram.PaletteItemConfig
		This class is used to define cross family connectors styles. 
		Multi-parent charts are supposed to have multiple cross hierarchy connectors, so in order to trace them more easely on chart
		every connector may have separate style. It is the same strategy as for visualization of regular line charts.

	See Also:
		<primitives.famdiagram.Config.linesPalette>
*/
primitives.famdiagram.PaletteItemConfig = function (arg0, arg1, arg2) {
	var property;

	/*
	Property: lineColor
		Line color.

	Default:
		<primitives.common.Colors.Silver>
	*/
	this.lineColor = primitives.common.Colors.Silver;

	/*
	Property: lineWidth
		Line width.
	Default:
		1
	*/
	this.lineWidth = 1;

	/*
	Property: lineType
		Line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
		case 3:
			this.lineColor = arg0;
			this.lineWidth = arg1;
			this.lineType = arg2;
			break;
	}
};
