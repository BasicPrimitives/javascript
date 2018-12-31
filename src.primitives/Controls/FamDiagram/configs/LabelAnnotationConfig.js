/*
	Class: primitives.famdiagram.LabelAnnotationConfig
		Options class. Populate annotation collection with instances of this object to draw labels between items in diagram layout.
		This label annotation is created over connection line going from item to its children or parents.
		It is required that label annotation references subset of item's parents or children.
		If you need to create cross chart reference then use connector annotation.
	
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.LabelAnnotationConfig = function (arg0, arg1) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Label>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = primitives.common.AnnotationType.Label;

	/*
	Property: fromItem 
		This is the item you are creating annotation for.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.fromItem = null;

	/*
	Property: toItems 
		This collection should contain only child or parent items of annotated item.
		You cannot add child and parent items at the same time.
		It may contain sub set of child or parent items. In that case existing annotation labels are drawn as a cascade.
		
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.toItems = [];

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.title = null;

	/*
	Property: itemTitleColor
	Default template title background color.
	*/
	this.itemTitleColor = primitives.common.Colors.RoyalBlue;

	/*
	Property: templateName
		This is template name used to render this label.

		See Also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates>
		<primitives.famdiagram.Config.onItemRender>
	*/
	this.templateName = null;

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