/*
	Class: primitives.callout.Config
		Callout options class.
	
*/
primitives.callout.Config = function () {
	this.classPrefix = "bpcallout";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.Canvas;

	/*
		Property: pointerPlacement
			Defines pointer connection side or corner.

		Default:
			<primitives.common.PlacementType.Auto>
	*/
	this.pointerPlacement = primitives.common.PlacementType.Auto;

	/*
	Property: position
		Defines callout body position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.position = null;

	/*
	Property: snapPoint
		Callout snap point. 
		
	Type:
		<primitives.common.Point>.
	*/
	this.snapPoint = null;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. 
	*/
	this.cornerRadius = "10%";

	/*
	Property: offset
		Body rectangle offset. 
	*/
	this.offset = 0;

	/*
	Property: opacity
		Background color opacity. 
	*/
	this.opacity = 1;

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 1;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;

	/*
	Property: pointerWidth
		Pointer base width in percents or pixels. 
	*/
	this.pointerWidth = "10%";

	/*
	Property: borderColor
		Border Color. 
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.borderColor = primitives.common.Colors.Black;

	/*
	Property: fillColor
		Fill Color. 
		
	Default:
		<primitives.common.Colors.Gray>
	*/
	this.fillColor = primitives.common.Colors.LightGray;

	/*
	method: update
		Makes full redraw of callout widget contents reevaluating all options.
	*/
};