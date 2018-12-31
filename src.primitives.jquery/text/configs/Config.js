/*
	Class: primitives.text.Config
		Text options class.
	
*/
primitives.text.Config = function () {
	this.classPrefix = "bptext";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.SVG;

	/*
		Property: textDirection
			Direction style. 

		Default:
			<primitives.text.TextDirection.Auto>
	*/
	this.orientation = primitives.text.TextOrientationType.Horizontal;

	/*
		Property: text
			Text
	*/
	this.text = "";


	/*
		Property: verticalAlignment
			Vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: horizontalAlignment
			Horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
		Property: fontSize
			Font size. 

		Default:
			15
	*/
	this.fontSize = "16px";

	/*
		Property: fontFamily
			Font family. 

		Default:
			"Arial"
	*/
	this.fontFamily = "Arial";

	/*
		Property: color
			Color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.color = primitives.common.Colors.Black;

	/*
		Property: fontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.fontWeight = "normal";

	/*
		Property: fontStyle
			Font style: normal | italic
		
		Default:
			"normal"
	*/
	this.fontStyle = "normal";

	/*
	method: update
		Makes full redraw of text widget contents reevaluating all options.
	*/
};