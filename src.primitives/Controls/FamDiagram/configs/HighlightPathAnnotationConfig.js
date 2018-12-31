/*
	Class: primitives.famdiagram.HighlightPathAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw path between items.
		Path is drawn along base connection lines displaying relationships between item of the chart.
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.HighlightPathAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.HighlightPath>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
	*/
	this.annotationType = primitives.common.AnnotationType.HighlightPath;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other.
		Highlight path annotations can be placed under main connectors wire or over. 

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = primitives.common.ZOrderType.Foreground;

	/*
	Property: items 
		Array of item ids in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.items = [];

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
	this.color = primitives.common.Colors.Red;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;


	/*
	Property: opacity
		Connector's line opacity.
	*/
	this.opacity = 1;

	/*
	Property: showArrows
		This option controls arrows visibility along highlight path. 

	Default:
		true
	*/
	this.showArrows = true;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

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