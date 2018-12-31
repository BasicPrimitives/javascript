/*
	Class: primitives.orgdiagram.ConnectorAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw connector between two items.
	
	See Also:
		<primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.ConnectorAnnotationConfig = function (arg0, arg1) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Connector>

	See Also:
		<primitives.orgdiagram.Config.annotations>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = primitives.common.AnnotationType.Connector;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = primitives.common.ZOrderType.Foreground;

	/*
	Property: fromItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.fromItem = null;

	/*
	Property: toItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.toItem = null;

	/*
	Property: connectorShapeType
		Connector shape type. 

	Default:
		<primitives.common.ConnectorShapeType.OneWay>
	*/
	this.connectorShapeType = primitives.common.ConnectorShapeType.OneWay;

	/*
		Property: connectorPlacementType
			Defines connector annotation shape placement mode between two items. 
			It uses off beat placement mode as default in order to avoid overlapping
			of base hierarchy connecting lines.

		Default:
			<primitives.common.ConnectorPlacementType.Offbeat>
	*/
	this.connectorPlacementType = primitives.common.ConnectorPlacementType.Offbeat;

	/*
	Property: labelPlacementType
		Label placement type along connection line(s). 

	Default:
		<primitives.common.ConnectorLabelPlacementType.Between>
	*/
	this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

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
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.orgdiagram.Config.selectedItems>
	*/
	this.selectItems = true;

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
		case 2:
			this.fromItem = arg0;
			this.toItem = arg1;
			break;
	}
};