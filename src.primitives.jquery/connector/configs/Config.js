/*
	Class: primitives.connector.Config
		Connector options class.
	
*/
primitives.connector.Config = function () {
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
		Property: connectorPlacementType
			Defines connector annotation shape placement mode between two rectangles. 
			It uses off beat placement mode as default in order to avoid overlapping
			of base hierarchy connector lines.

		Default:
			<primitives.common.ConnectorPlacementType.Offbeat>
	*/
	this.connectorPlacementType = primitives.common.ConnectorPlacementType.Offbeat;

	/*
		Property: connectorShapeType
			Connector shape type. 

		Default:
			<primitives.common.ConnectorShapeType.OneWay>
	*/
	this.connectorShapeType = primitives.common.ConnectorShapeType.OneWay;

	/*
	Property: position
		Defines connectors starting rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.fromRectangle = null;

	/*
	Property: position
		Defines connectors ending rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.toRectangle = null;


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
	this.lineWidth = 3;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = primitives.common.Colors.Black;

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
	Property: labelPlacementType
		Defines conector label placement. Label can be placed between rectangles along connector line or close to one of them.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

	/*
	method: update
		Makes full redraw of connector widget contents reevaluating all options.
	*/
};