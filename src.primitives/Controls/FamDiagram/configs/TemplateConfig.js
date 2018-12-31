/*
	Class: primitives.famdiagram.TemplateConfig
		User defines item template class. It may optionaly define template for item, 
		custom cursor and highlight. If template is null then default template is used.

	See Also:
		<primitives.famdiagram.Config.templates>
*/
primitives.famdiagram.TemplateConfig = function () {
	/*
	Property: name
		Every template should have unique name. It is used as reference when 
		custom template is defined in <primitives.famdiagram.ItemConfig.templateName>.
	*/
	this.name = null;

	/*
	Property: isActive
		If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
	this.isActive = true;

	/*
	Property: itemSize
	This is item size of type <primitives.common.Size>, templates should have 
	fixed size, so famDiagram uses this value in order to layout items properly.
	*/
	this.itemSize = new primitives.common.Size(120, 100);

	/*
	Property: itemBorderWidth
		Item template border width.
	*/
	this.itemBorderWidth = 1;

	/*
	Property: itemTemplate
	Item template, if it is null then default item template is used. It supposed 
	to be div html element containing named elements inside for setting them 
	in <primitives.famdiagram.Config.onItemRender> event.
	*/
	this.itemTemplate = null;

	/*
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.famdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.famdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.famdiagram.ItemConfig.itemTitleColor>
			<primitives.famdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			null
	*/
	this.minimizedItemShapeType = null;

	/*
	Property: minimizedItemSize
	This is size dot used to display item in minimized form, type of <primitives.common.Size>.
	*/
	this.minimizedItemSize = new primitives.common.Size(4, 4);

	/*
	Property: minimizedItemCornerRadius
	Set corner radias for dots in order to display them as squares having rounded corners.
	By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares.
	*/
	this.minimizedItemCornerRadius = null;

	/*
	Property: minimizedItemLineWidth
		Minimized item shape border width.
	*/
	this.minimizedItemLineWidth = 1;

	/*
	Property: minimizedItemBorderColor
		Minimized item line color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemBorderColor = null;

	/*
	Property: minimizedItemLineType
		Minimized item shape border line type.
	*/
	this.minimizedItemLineType = primitives.common.LineType.Solid;

	/*
	Property: minimizedItemFillColor
		Minimized item fill color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemFillColor = null;

	/*
	Property: minimizedItemOpacity
		Minimized item fill color opacity.
	*/
	this.minimizedItemOpacity = 1;

	/*
	Property: highlightPadding
	This padding around item defines relative size of highlight object, 
	ts type is <primitives.common.Thickness>.
	*/
	this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

	/*
	Property: highlightBorderWidth
		Highlight border width.
	*/
	this.highlightBorderWidth = 1;

	/*
	Property: highlightTemplate
	Highlight template, if it is null then default highlight template is used. 
	It supposed to be div html element containing named elements inside for 
	setting them in <primitives.famdiagram.Config.onHighlightRender> event.
	*/
	this.highlightTemplate = null;

	/*
	Property: cursorPadding
	This padding around item defines relative size of cursor object, 
	its type is <primitives.common.Thickness>.
	*/
	this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);

	/*
	Property: cursorBorderWidth
		Cursor border width.
	*/
	this.cursorBorderWidth = 2;

	/*
	Property: cursorTemplate
	Cursor template, if it is null then default cursor template is used. 
	It supposed to be div html element containing named elements inside 
	for setting them in <primitives.famdiagram.Config.onCursorRender> event.
	*/
	this.cursorTemplate = null;

	/*
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every template. 
	
	See also:
		<primitives.famdiagram.ButtonConfig>
	*/
	this.buttons = null;
};
