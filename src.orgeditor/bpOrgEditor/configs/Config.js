/*
	Class: primitives.orgeditor.Config
		Organizational Diagram Editor
		options class.
*/
primitives.orgeditor.Config = function () {
	this.classPrefix = "bporgeditor";

	/*
	Event: onSave
		Notifies about any changes in diagram.

	*/
	this.onSave = null;

	/*
		Property: editMode
			Defines widget's edit mode. 

		Default:
			true
	*/
	this.editMode = true;

	/*
		Property: navigationMode
			Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
			It has highlight for mouse over feedback and it has cursor for showing currently selected single node in diagram.
			In order to avoid creation of plus/minus buttons for children nodes folding and unfolding, 
			this functionality is done automatically for current cursor item. This is especially true for family diagram, 
			because it has no logical root, so cursor plays vital role for unfolding of nodes 
			and zooming into area of user interest in diagram.
			Use this option to disable highlight which does not make sense on touch devices or make control inactive completly.

		See Also:
			<primitives.common.NavigationMode>
		Default:
			<primitives.common.NavigationMode.Default>
	*/
	this.navigationMode = primitives.common.NavigationMode.Default;

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type 
			is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.SVG;

	/*
		Property: pageFitMode
			Defines the way diagram is fit into page. 

		Default:
			<primitives.common.PageFitMode.FitToPage>
	*/
	this.pageFitMode = primitives.common.PageFitMode.FitToPage;

	/*
		Property: verticalAlignment
			Defines items vertical alignment relative to each other within one level of hierarchy. 
			It does not affect levels having same size items.
		
		Default:
			<primitives.common.VerticalAlignmentType.Middle>
	*/
	this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: arrowsDirection
			Sets direction of connector lines arrows.

		Default:
			<primitives.common.GroupByType.None>
	*/
	this.arrowsDirection = primitives.common.GroupByType.None;

	/*
		Property: showExtraArrows
			Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines.
			This options if off by default for organizational diagram.

		Default:
			false
	*/
	this.showExtraArrows = false;

	/*
	Property: extraArrowsMinimumSpace
		If diagram is small relations between objects are easy to trace, so mutual positions of parents and children are enough to navigate from parent to children and backward.
		If diagram is large and one row of children exceeds screen width then it use this option to activate horizontal arrows for large intervals between items.

	Default:
		30
	*/
	this.extraArrowsMinimumSpace = 30;

	/*
		Property: horizontalAlignment
			Defines items horizontal alignment relative to their parent. 
		
		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
	Property: connectorType
		   Defines connector lines style for dot and line elements.
		
		Default:
			<primitives.common.ConnectorType.Angular>
	*/
	this.connectorType = primitives.common.ConnectorType.Angular;


	/*
		Property: bevelSize
			Size of squared connector bevel.

		Default:
			4
	*/
	this.bevelSize = 4;

	/*
		Property: elbowType
			Style squared connectors with custom elbows.

		Default:
			<primitives.common.ElbowType.None>
	*/
	this.elbowType = primitives.common.ElbowType.None;

	/*
		Property: elbowDotSize
			Size of elbow dot.

		Default:
			4
	*/
	this.elbowDotSize = 4;

	/*
	Property: items
		This is array of items in hierarchy.
	*/
	this.items = null;

	/*
	Property: highlightGravityRadius
		The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
		When items is minimized its marker can be so small that it is going to be difficult for end user to place mouse pointer inside of it.
		This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.
		This property is ignored when nearest item is outside of screen boundaries and not visible to end user.
	*/
	this.highlightGravityRadius = 40;

	/*
	Property: hasSelectorCheckbox
		This option controls selection check boxes visibility. 

	Auto - Checkbox shown only for current cursor item only.
	True - Every full size item has selection check box.
	False - No check boxes. Application can still programmatically select some items in the chart. 
	Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
	it is auto used as default selection check box.

	Default:
		<primitives.common.Enabled.Auto>

	See Also:
		<primitives.orgdiagram.ItemConfig.hasSelectorCheckbox>
		<primitives.orgdiagram.Config.onSelectionChanging>
		<primitives.orgdiagram.Config.onSelectionChanged>
	*/
	this.hasSelectorCheckbox = primitives.common.Enabled.Auto;

	/*
		Property: selectCheckBoxLabel
			Selection check box label. 
	*/
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
		Defines the way items displayed between root and selected items in diagram. 
		
	Default:
		<primitives.common.SelectionPathMode.FullStack>
	*/
	this.selectionPathMode = primitives.common.SelectionPathMode.FullStack;

	/*
	Property: hasButtons
		This option controls user buttons visibility. 

	Auto - Buttons visible only for cursor item.
	True - Every normal item has buttons visible.
	False - No buttons.

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = primitives.common.Enabled.Auto;

	/*
	Property: minimalVisibility
		Defines the way diagram collapses items when it has not enough space to fit all items. 
		
	Default:
		<primitives.common.Visibility.Dot>
	*/
	this.minimalVisibility = primitives.common.Visibility.Dot;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
			Rotation to the right side is equivalent to left side placement 
			in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = primitives.common.OrientationType.Top;

	/*
	Property: defaultTemplateName
		This is template name used to render items having no <primitives.orgdiagram.ItemConfig.templateName> defined.


		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
	*/
	this.defaultTemplateName = primitives.orgeditor.TemplateName.Default;

	/*
	method: update
		Makes full redraw of diagram contents reevaluating all options.
	
	Parameters:
		updateMode: Parameter defines the way diagram 
		should be updated  <primitives.common.UpdateMode>. 
		For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.
		
	*/

	/*
	Property: itemTitleFirstFontColor
	This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.orgdiagram.Config.itemTitleSecondFontColor>.

	See Also:
	<primitives.orgdiagram.ItemConfig.itemTitleColor>
	<primitives.orgdiagram.Config.itemTitleSecondFontColor>
	<primitives.common.highestContrast>

	*/
	this.itemTitleFirstFontColor = primitives.common.Colors.White;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
	*/
	this.itemTitleSecondFontColor = primitives.common.Colors.Navy;

	/*
	Property: linesColor
		Connectors lines color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.linesColor = primitives.common.Colors.Silver;

	/*
	Property: linesWidth
		Connectors lines width.
	*/
	this.linesWidth = 1;

	/*
	Property: linesType
		Connectors line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.linesType = primitives.common.LineType.Solid;

	/*
Property: showCallout
	This option controls callout visibility for dotted/(markers) items. 

Default:
	true
*/
	this.showCallout = true;

	/*
	Property: calloutPlacementOffset
		Set this property value depending on size and intervals between markers so callout annotation does not overlap neighbouring items of marker it is shown for.
	*/
	this.calloutPlacementOffset = 100;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.orgdiagram.Config.templates> collection property.

	Default:
		null
	*/
	this.defaultCalloutTemplateName = primitives.orgeditor.TemplateName.Default;

	/*
	Property: calloutfillColor
		Annotation callout fill color.
	*/
	this.calloutfillColor = "#000000";

	/*
	Property: calloutBorderColor
		Annotation callout border color.
	*/
	this.calloutBorderColor = null;

	/*
	Property: calloutOffset
		Annotation callout offset.
	*/
	this.calloutOffset = 4;

	/*
	Property: calloutCornerRadius
		Annotation callout corner radius.
	*/
	this.calloutCornerRadius = 4;

	/*
	Property: calloutPointerWidth
		Annotation callout pointer base width.
	*/
	this.calloutPointerWidth = "10%";

	/*
	Property: calloutLineWidth
		Annotation callout border line width.
	*/
	this.calloutLineWidth = 1;

	/*
	Property: calloutOpacity
		Annotation callout opacity.
	*/
	this.calloutOpacity = 0.2;


	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = primitives.common.ChildrenPlacementType.Horizontal;

	/*
	Property: leavesPlacementType
		Defines leaves placement form. Leaves are children having no sub children.
	*/
	this.leavesPlacementType = primitives.common.ChildrenPlacementType.Matrix;

	/*
	Property: maximumColumnsInMatrix
		Maximum number of columns for matrix leaves layout. Leaves are children having no sub children.
	*/
	this.maximumColumnsInMatrix = 6;

	/*
	Property: buttonsPanelSize
		User buttons panel size.
	*/
	this.buttonsPanelSize = 28;

	/*
	Property: groupTitlePanelSize
		Group title panel size.
	*/
	this.groupTitlePanelSize = 24;

	/*
	Property: checkBoxPanelSize
		Selection check box panel size.
	*/
	this.checkBoxPanelSize = 24;

	/*
	Property: groupTitleOrientation
		Group title direction style. 

	Default:
		<primitives.text.TextDirection.Auto>
*/
	this.groupTitleOrientation = primitives.text.TextOrientationType.RotateRight;

	/*
		Property: groupTitleVerticalAlignment
			Group title vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.groupTitleVerticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: groupTitleHorizontalAlignment
			Group title horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.groupTitleHorizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
		Property: groupTitleFontSize
			Group title font size. 

		Default:
			15
	*/
	this.groupTitleFontSize = "12px";

	/*
		Property: groupTitleFontFamily
			Group title font family. 

		Default:
			"Arial"
	*/
	this.groupTitleFontFamily = "Arial";

	/*
		Property: groupTitleColor
			Group title color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.groupTitleColor = primitives.common.Colors.RoyalBlue;

	/*
		Property: groupTitleFontWeight
			Group title font weight: normal | bold

		Default:
			"normal"
	*/
	this.groupTitleFontWeight = "normal";

	/*
		Property: groupTitleFontStyle
			Group title font style: normal | italic
		
		Default:
			"normal"
	*/
	this.groupTitleFontStyle = "normal";

	/*
		Property: scale
			CSS3 scale transform.
	*/
	this.scale = 1;

	/*
	Property: normalLevelShift
		Defines interval after level of items in  diagram having items in normal state.

	See also:
		<primitives.common.RenderEventArgs>
	*/
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
		Defines interval after level of items in  diagram having items in dot state.
	*/
	this.dotLevelShift = 10;
	/*
	Property: lineLevelShift
		Defines interval after level of items in  diagram having items in line state.
	*/
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
		Defines interval between items at the same level in  diagram having items in normal state.
	*/
	this.normalItemsInterval = 20;
	/*
	Property: dotItemsInterval
		Defines interval between items at the same level in  diagram having items in dot state.
	*/
	this.dotItemsInterval = 10;
	/*
	Property: lineItemsInterval
		Defines interval between items at the same level in  diagram having items in line state.
	*/
	this.lineItemsInterval = 5;

	/*
	Property: cousinsIntervalMultiplier
		Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
		So children belonging to different parents have extra gap between them.
	
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	Property: showLabels
		This option controls items labels visibility. Labels are displayed in form of divs having text inside, long strings are wrapped inside of them. 
		User can control labels position relative to its item. Chart does not preserve space for labels, 
		so if they overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.

	Auto - depends on available space.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.orgdiagram.ItemConfig.label>
	<primitives.orgdiagram.Config.labelSize>
	<primitives.orgdiagram.Config.normalItemsInterval>
	<primitives.orgdiagram.Config.dotItemsInterval>
	<primitives.orgdiagram.Config.lineItemsInterval>
	<primitives.orgdiagram.Config.normalLevelShift>
	<primitives.orgdiagram.Config.dotLevelShift>
	<primitives.orgdiagram.Config.lineLevelShift>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabels = primitives.common.Enabled.Auto;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(10, 24);
	*/
	this.labelSize = new primitives.common.Size(10, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

    See Also:
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = primitives.text.TextOrientationType.Horizontal;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = primitives.common.PlacementType.Top;

	/*
	Property: labelFontSize
		Label font size. 

	Default:
		10px
*/
	this.labelFontSize = "10px";

	/*
		Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
	*/
	this.labelFontFamily = "Arial";

	/*
		Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
	*/
	this.labelColor = primitives.common.Colors.Black;

	/*
		Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.labelFontWeight = "normal";

	/*
	Property: labelFontStyle
		Font style: normal | italic
		
	Default:
		"normal"
	*/
	this.labelFontStyle = "normal";

	/*
		Property: enablePanning
			Enable chart panning with mouse drag & drop for desktop browsers.
			Disable it if you need to support items Drag & Drop.

		Default:
			true
	*/
	this.enablePanning = true;
};