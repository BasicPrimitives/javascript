/*
	Class: primitives.famdiagram.ShapeAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw shape benith or on top of several items.
		Shape is drawn as rectangular area.
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.ShapeAnnotationConfig = function (arg0) {
	var property;
	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Shape>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = primitives.common.AnnotationType.Shape;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Auto>
	*/
	this.zOrderType = primitives.common.ZOrderType.Auto;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: shapeType
		Shape type. 

	Default:
		<primitives.common.ShapeType.Rectangle>
	*/
	this.shapeType = primitives.common.ShapeType.Rectangle;

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
		Body corner radius in percents or pixels. For applicable shapes only.
	*/
	this.cornerRadius = "10%";

	/*
	Property: opacity
		Background color opacity. For applicable shapes only.
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		null
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 

	Default:
		null
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
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

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

	/*
	Property: labelPlacement
		Defines label placement relative to the shape. 

	See Also:
		<primitives.famdiagram.Config.labelPlacement>
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

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};