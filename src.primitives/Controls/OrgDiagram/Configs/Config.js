/*
	Class: primitives.orgdiagram.Config
		jQuery orgDiagram Widget options class. Organizational chart configuration object.
	
*/
primitives.orgdiagram.Config = function (name) {
	this.name = (name !== undefined) ? name : "OrgDiagram";
	this.classPrefix = "orgdiagram";

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
			Defines the way diagram is fit into page. By default chart minimize items when it has not enough space to fit all of them into screen. 
			Chart has its maximum size when all items shown in full size and  its minimal size when all items shown as dots. 
			It is equivalent of full zoom out of the chart items, dot size items are not readable, but such presentation of them 
			gives possibility to overview chart layout. So chart tryes to combine both presenation modes and keep chart as small 
			as possible in order to give user possibility to see big picture. Collapsed items provide ideal way for analitical reiew of 
			organizational diagram. If chart shown in its maximum size when all items are unfolded, it becomes impossible 
			to navigate betwen parents close to the root item. In such mode chart is usable only at bottom levels when children are close to their parents.
			If we try to navigate up to the root of hierarchy, gaps between parents sometimes as big as screen size. So in order to solve these 
			issues chart partially collapses hierarchy into dots and lines depending on this option.

		See also:
			<primitives.orgdiagram.Config.minimalVisibility>

		Default:
			<primitives.common.PageFitMode.FitToPage>
	*/
	this.pageFitMode = primitives.common.PageFitMode.FitToPage;

	/*
		Property: minimalVisibility
			Defines minimal allowed item form size for page fit mode. See description for pageFitMode.
	
		See also:
			<primitives.orgdiagram.Config.pageFitMode>

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
		Property: horizontalAlignment
			Defines items horizontal alignment relative to their parent. 
			This is usefull for control localization for right-to-left countries.
		
		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

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
		Property: showHorizontalArrows
			Show extra horizontal arrows for easy navigation to connection line between parents and children.

		Default:
			false
	*/
	this.showHorizontalArrows = false;

	/*
		Property: connectorType
			Defines connector lines style for dot and line elements. If elements are in their normal full size 
			form they are connected with squired connection lines. So this option controls connector lines style for dots only.

		Default:
			<primitives.common.ConnectorType.Squared>
	*/
	this.connectorType = primitives.common.ConnectorType.Squared;

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
	Property: emptyDiagramMessage
		Empty message in order to avoid blank screen. This option is supposed to say user that chart is empty when no data inside.
	*/
	this.emptyDiagramMessage = "Diagram is empty.";

	/*
	Property: items
		This is chart items collection. It is regular array of items of type ItemConfig. Items reference each other via parent property. 
		So every item may have only one parent in chart. If parent set to null then item displayed at root of chart. 
		Chart can have multiple root items simultaniously. If item references missing item, then it is ignored. 
		If items loop each other they are ignored as well. It is applications responsiblity to avoid such issues.

	See Also:
		<primitives.orgdiagram.ItemConfig>
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.ItemConfig.parent>
	*/
	this.items = [];

	/*
	Property: annotations
		Array of annotaion objects. Chart supports several types of annotations. By default they are drawn on top of chart items and they block mouse events of UI elements placed in item templates.
		The design assumes only few of them being displayed simultanuosly in other words chart does not resolve mutual overlaps of annotations, so don't over use them. 
		This is especially true for connectors and background annotations.

	See also:
		<primitives.orgdiagram.ConnectorAnnotationConfig>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotations = [];

	/*
	Property: cursorItem
		Cursor item id - it is single item selection mode, user selects new cursor item on mouse click. 
		Cursor defines current local zoom placement or in other words current navigation item in the chart,
		all items relative to cursor always shoun in full size. So user can see all possible items around cursor in full size 
		and can continue navigation around chart. So when user navigates from one item to another clicking on thems and changing cursor item
		in chart, chart minimizes items going out of cursor scope and shows in full size items relative to new cursor position.
		If it is null then no cursor shown on diagram.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onCursorChanging>
		<primitives.orgdiagram.Config.onCursorChanged>
	*/
	this.cursorItem = null;

	/*
	Property: highlightItem
		Highlighted item id. Highlight is mouse over affect, but using this option applicatin can set highlight at any item 
		in the chart programmatically. It can be used for chart syncronization with other controls on UI having mouse over effect. 
		See primitives.orgdiagram.Config.update method arguments description for fast chart update.
		If it is null then no highlight shown on diagram.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onHighlightChanging>
		<primitives.orgdiagram.Config.onHighlightChanged>
	*/
	this.highlightItem = null;

	/*
	Property: highlightGravityRadius
		The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
		When items is minimized its marker can be so small that it is going to be difficult for end user to place mouse pointer inside of it.
		This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.
		This property is ignored when nearest item is outside of screen boundaries and not visible to end user.
	*/
	this.highlightGravityRadius = 40;

	/*
	Property: selectedItems
		Defines array of selected item ids. Chart allows to select items via checking checkboxes under items. Checkboxes are 
		shown only for full size items. So when item is selected it is always shown in full size, so check box always visible for selcted items.
		User can navigate around large diagram and check intrested items in order to keep them opened. So that way chart provides 
		means to show several items on large diagram and fit everything into minimal space ideally into available screen space.
		Application can select items programmatically using this array or receive notifications from chart about user selections with following events.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onSelectionChanging>
		<primitives.orgdiagram.Config.onSelectionChanged>
	*/
	this.selectedItems = [];

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
		Defines the way items between root item and selectedItems displayed in diagram. Chart always shows all items between cursor item and its root in full size.
		But if cursor positioned on root item, then chart shows in full size only selected items in the chart. So this option controls items size between 
		selected items and root item of the chart. By default all items betwen root and selected items shown in full size.

	Default:
		<primitives.common.SelectionPathMode.FullStack>
	*/
	this.selectionPathMode = primitives.common.SelectionPathMode.FullStack;

	/*
	Property: templates
		Custom user templates collection. TemplateConfig is complex object providing options to customize item's content template, 
		cursor tempate and highlight template. Every template config should have unique name property, which is used by chart and its item configs 
		to reference them. Chart's defaultTemplateName allows to make template default for all items in the chart. On other hand user may define templates
		to individual items in the chart by templateName property of item config.

	See also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.defaultTemplateName>
		<primitives.orgdiagram.ItemConfig.templateName>
	*/
	this.templates = [];

	/*
		Property: defaultTemplateName
			This is template name used to render items having no <primitives.orgdiagram.ItemConfig.templateName> defined.


		See Also:
			<primitives.orgdiagram.TemplateConfig>
			<primitives.orgdiagram.TemplateConfig.name>
			<primitives.orgdiagram.Config.templates>
	*/
	this.defaultTemplateName = null;

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
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every item. 
		The only limitation, they are all the same. So if you need to have unique buttons for every item, then you have to 
		customize cursor templates and manually create custom buttons inside of them.

	See also:
		<primitives.orgdiagram.ButtonConfig>
	*/
	this.buttons = [];

	/*
	Event: onHighlightChanging
		Notifies about changing highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.
		This coupled event with <primitives.orgdiagram.Config.onHighlightChanged>, it is fired before highlight update.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onHighlightChanging = null;

	/*
	Event: onHighlightChanged
		Notifies about changed highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onHighlightChanged = null;

	/*
	Event: onCursorChanging
		Notifies about changing cursor item <primitives.orgdiagram.Config.cursorItem> in diagram.
		This coupled event with <primitives.orgdiagram.Config.onCursorChanged>, it is fired before layout update.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onCursorChanging = null;

	/*
	Event: onCursorChanged
		Notifies about changed cursor item <primitives.orgdiagram.Config.cursorItem> in diagram .

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onCursorChanged = null;

	/*
	Event: onSelectionChanging
		Notifies about changing selected items collection of <primitives.orgdiagram.Config.selectedItems>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onSelectionChanging = null;

	/*
	Event: onSelectionChanged
		Notifies about changes in collection of <primitives.orgdiagram.Config.selectedItems>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onSelectionChanged = null;

	/*
	Event: onButtonClick
		Notifies about click of custom user button defined in colelction of <primitives.orgdiagram.Config.buttons>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onButtonClick = null;

	/*
	Event: onMouseClick
		On mouse click event. 

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onMouseClick = null;

	/*
	Event: onMouseDblClick
		On mouse double click event. 

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onMouseDblClick = null;

	/*
	Event: onItemRender
		Item templates don't provide means to bind data of items into templates. So this event handler gives application such possibility.
		If application uses custom templates then this method is called to populate template with items properties.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onItemRender = null;

	/*
	Event: onHighlightRender
		If user defined custom highlight template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onHighlightRender = null;
	/*
	Event: onCursorRender
		If user defined custom cursor template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onCursorRender = null;
	/*
	Property: normalLevelShift
		Defines interval after level of items in  diagram having items in normal state.
	*/
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
		Defines interval after level of items in  diagram having all items in dot state.
	*/
	this.dotLevelShift = 20;
	/*
	Property: lineLevelShift
		Defines interval after level of items in  diagram having items in line state.
	*/
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
		Defines interval between items at the same level in  diagram having items in normal state.
	*/
	this.normalItemsInterval = 10;
	/*
	Property: dotItemsInterval
		Defines interval between items at the same level in  diagram having items in dot state.
	*/
	this.dotItemsInterval = 1;
	/*
	Property: lineItemsInterval
		Defines interval between items at the same level in  diagram having items in line state.
	*/
	this.lineItemsInterval = 2;

	/*
	Property: cousinsIntervalMultiplier
		Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
		So children belonging to different parents have extra gap between them.
		
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	method: update
		Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update widget contents.
	
	Parameters:
		updateMode: This parameter defines severaty of update <primitives.common.UpdateMode>. 
		For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.

	See also:
		<primitives.common.UpdateMode>

	Default:
		<primitives.common.UpdateMode.Recreate>
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
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.orgdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.orgdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.orgdiagram.ItemConfig.itemTitleColor>
			<primitives.orgdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			<primitives.common.ShapeType.None>
	*/
	this.minimizedItemShapeType = primitives.common.ShapeType.None;

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
	Property: highlightLinesColor
		Connectors highlight line color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.highlightLinesColor = primitives.common.Colors.Red;

	/*
	Property: highlightLinesWidth
		Connectors highlight line width.
	*/
	this.highlightLinesWidth = 1;

	/*
	Property: highlightLinesType
		Connectors highlight line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.highlightLinesType = primitives.common.LineType.Solid;

	/*
		Property: calloutMaximumVisibility
			Defines maximum allowed item form size to show callout.
	
		See also:
			<primitives.orgdiagram.Config.showCallout>

		Default:
			<primitives.common.Visibility.Dot>
	*/
	this.calloutMaximumVisibility = primitives.common.Visibility.Dot;

	/*
	Property: showCallout
		This option controls callout visibility for items. 

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
	this.defaultCalloutTemplateName = null;

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
	this.leavesPlacementType = primitives.common.ChildrenPlacementType.Horizontal;

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
	Property: groupTitlePlacementType
		Group title placement style. Defines group title and buttons panel position relative to item. By default it is left.

	Default:
		<primitives.common.AdviserPlacementType.Left>
	*/
	this.groupTitlePlacementType = primitives.common.AdviserPlacementType.Left;

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


	this.distance = 3;

	/*
	Property: scale
		CSS3 scale transform.
	*/
	this.scale = 1;

	/*
	Property: minimumScale
		Minimum CSS3 scale transform.
	*/
	this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform.
	*/
	this.maximumScale = 2;

	/*
	Property: showLabels
		This option controls labels visibility for minimized items. If you need to show labels outside of borders of regular items then use item template for customization.
		Labels placed inside HTML DIV element and long strings are wrapped inside. 
		User can control labels position relative to its item. Chart does not measure labels and does reserve space for them, 
		so if label overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.
	
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
		new <primitives.common.Size>(80, 24);
	*/
	this.labelSize = new primitives.common.Size(80, 24);

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

	/*
	Property: autoSizeMinimum
		Defines minimum diagram size in autosize mode. If diagram has no elements, it is going to be of this size on the page.  
	Default:
		new <primitives.common.Size>(800, 600);
	*/
	this.autoSizeMinimum = new primitives.common.Size(800, 600);

	/*
	Property: autoSizeMaximum
		Defines maximum diagram size in autosize mode.
	Default:
		new <primitives.common.Size>(1024, 768);
	*/
	this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};