/*
	Class: primitives.famdiagram.BackgroundAnnotationConfig
		Consider background annotation as another way to highlight some items in diagram.
		In order to use it you have to create instances of this class and populate annotation collection.
		Background annotation is drawn as rectangular area offset around annotated item. 
		If two items backgrounds overlap each other they are merged into one background area.

	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.BackgroundAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Background>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = primitives.common.AnnotationType.Background;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.items = [];

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
	Property: offset
		Sets background offset around annotated item.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(18, 18, 18, 18);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

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