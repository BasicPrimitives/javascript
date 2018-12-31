/*
	Class: primitives.common.RenderEventArgs
		Rendering event details class.
*/
primitives.common.RenderEventArgs = function () {
	/*
	Property: id
	*/
	this.id = null;

	/*
	Property: element
		DOM element.
	*/
	this.element = null;

	/*
	Property: context
		Reference to item.
	*/
	this.context = null;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
	*/
	this.templateName = null;

	/*
	Property: renderingMode
		This option indicates current template state.

	Default:
		<primitives.common.RenderingMode.Update>

	See also:
		<primitives.common.RenderingMode>
	*/
	this.renderingMode = null;

	/*
	Property: isCursor
		Rendered item is cursor.
	*/
	this.isCursor = false;

	/*
	Property: isSelected
		Rendered item is selected.
	*/
	this.isSelected = false;
};