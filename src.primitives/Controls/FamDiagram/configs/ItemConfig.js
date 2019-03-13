/*
	Class: primitives.famdiagram.ItemConfig
		Defines item in family chart hierarchy. 
		User is supposed to create hierarchy of this items and assign it to <primitives.famdiagram.Config.items> collection property.
		Widget contains some generic properties used in default item template, 
		but user can add as many custom properties to this class as needed. 
		Just be careful and avoid widget malfunction.

	See Also:
		<primitives.famdiagram.Config.items>
*/
primitives.famdiagram.ItemConfig = function (arg0, arg1, arg2, arg3, arg4) {
  var property;
	/*
	Property: id
	Unique item id.
	*/
  this.id = null;

	/*
	Property: parents
	Collection of parent id's. If parents collection is empty [] then item placed as a root item.
	*/
  this.parents = [];

	/*
	Property: spouses
	Collection of spouses id's. Items in this collection share common connector line whether they have common children or not.
	*/
  this.spouses = [];

  /*
		Property: relativeItem
      This property is used to control items mutual placement in order to keep consistent ordering within levels. Relative item is used 
      for placing given item in diagram. We can place item on left or right side of relative item via setting placementType type property.
      In case when multiple items use the same relative item then their order can be customized with position property.

      If this property set to null, family layout algorithm will try to choose elements order via placing connected 
      nodes as close to each other as posible.

    Deafult:
			null
	*/
  this.relativeItem = null;

	/*
		Property: placementType
      Placement type defines Left ot Right side placement relative to relativeItem.
		Deafult:
			<primitives.common.AdviserPlacementType.Auto>
	*/
  this.placementType = primitives.common.AdviserPlacementType.Right;

	/*
    Property: position
      Property defines ordering of elements placed relative to the same item.
	*/
  this.position = null;

	/*
	Property: title
	Default template title property.
	*/
  this.title = null;

	/*
	Property: description
	Default template description element.
	*/
  this.description = null;

	/*
	Property: image
	Url to image. This property is used in default template.
	*/
  this.image = null;

	/*
	Property: context
	User context object.
	*/
  this.context = null;

	/*
	Property: itemTitleColor
	Default template title background color. The same color is used to draw minimized/dotted item.
	*/
  this.itemTitleColor = primitives.common.Colors.RoyalBlue;

	/*
	Property: minimizedItemShapeType
		Defines minimized/dotted item shape type. By default it is set by ItemTemplate.minimizedItemShapeType property.
		Use this property to set marker type individually per item.

	See Also:
		<primitives.common.ShapeType>
	*/
  this.minimizedItemShapeType = null;

	/*
	Property: groupTitle
	Auxiliary group title property. Displayed vertically on the side of item.
	*/
  this.groupTitle = null;

	/*
	Property: groupTitleColor
	Group title background color.
	*/
  this.groupTitleColor = primitives.common.Colors.RoyalBlue;

	/*
	Property: isActive
		If it is true then item is selectable in hierarchy and it has mouse over highlight. 

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
  this.isActive = true;

	/*
	Property: hasSelectorCheckbox
		If it is true then selection check box is shown for the item. 
		Selected items are always shown in normal form, so if item is 
		selected then its selection check box is visible and checked.

	Auto - Depends on <primitives.famdiagram.Config.hasSelectorCheckbox> setting.
	True - Selection check box is visible.
	False - No selection check box.

	Default:
	<primitives.common.Enabled.Auto>
	*/
  this.hasSelectorCheckbox = primitives.common.Enabled.Auto;

	/*
	Property: hasButtons
		This option controls buttons panel visibility. 

	Auto - Depends on <primitives.famdiagram.Config.hasButtons> setting.
	True - Has buttons panel.
	False - No buttons panel.

	Default:
	<primitives.common.Enabled.Auto>
	*/
  this.hasButtons = primitives.common.Enabled.Auto;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates> collection property.
	*/
  this.templateName = null;

	/*
	Property: showCallout
		This option controls items callout visibility.

	Auto - depends on <primitives.famdiagram.Config.showCallout> option
	True - shown
	False - hidden

	Default:
		<primitives.common.Enabled.Auto>
	*/
  this.showCallout = primitives.common.Enabled.Auto;

	/*
	Property: calloutTemplateName
		This is template name used to render callout for dotted item. 
		Actual callout template name is defined by following sequence:
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>

	See Also:
		<primitives.famdiagram.Config.templates> collection property.
	Default:
		null
	*/
  this.calloutTemplateName = null;

	/*
	Property: label
	Items label text.
	*/
  this.label = null;

	/*
	Property: showLabel
		This option controls items label visibility. Label is displayed in form of div having text inside, long string is wrapped inside of it. 
		User can control labels position relative to its item. Chart does not preserve space for label.

	Auto - depends on <primitives.famdiagram.Config.labelOrientation> setting.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.famdiagram.ItemConfig.label>
	<primitives.famdiagram.Config.labelSize>

	Default:
		<primitives.common.Enabled.Auto>
	*/
  this.showLabel = primitives.common.Enabled.Auto;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width. 
		By default it is equal to charts <primitives.famdiagram.Config.labelSize>.

	See Also:
		<primitives.common.Size>
	Default:
		null;
	*/
  this.labelSize = null;

	/*
	Property: labelOrientation
		Defines label orientation. 
		In default <primitives.text.TextOrientationType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelOrientation> setting.

	See Also:
	<primitives.famdiagram.Config.labelOrientation>
	<primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Auto>
	*/
  this.labelOrientation = primitives.text.TextOrientationType.Auto;

	/*
	Property: labelPlacement
		Defines label placement relative to the item. 
		In default <primitives.common.PlacementType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelPlacement> setting.

	See Also:
		<primitives.famdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
  this.labelPlacement = primitives.common.PlacementType.Auto;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 5:
      this.id = arg0;
      this.parent = arg1;
      this.title = arg2;
      this.description = arg3;
      this.image = arg4;
      break;
  }
};
