/*
	Class: primitives.connector.Config
		Connector options class.
	
*/
primitives.shape.Config = function () {
	this.classPrefix = "bpconnector";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.Canvas;

	/*
		Property: orientationType
			Diagram orientation. 

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = primitives.common.OrientationType.Top;

	/*
		Property: shapeType
			Shape type. 

		Default:
			<primitives.common.ShapeType.Rectangle>
	*/
	this.shapeType = primitives.common.ShapeType.Rectangle;

	/*
	Property: position
		Defines shapes rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.position = null;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. 
	*/
	this.cornerRadius = "10%";

	/*
	Property: opacity
		Background color opacity. 
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 
	
	Default:
		<primitives.common.Colors.Gray>
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;


	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Defines label size. It is needed to preserve space for label without overlapping connected items.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	/*
	Property: labelPlacement
		Defines label placement relative to the shape. 

	See Also:
		<primitives.orgdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = primitives.common.PlacementType.Auto;

	/*
	Property: labelOffset
		Defines label offset from shape in pixels.

	Default:
		4;
	*/
	this.labelOffset = 4;

	/*
	method: update
		Makes full redraw of connector widget contents reevaluating all options.
	*/
};