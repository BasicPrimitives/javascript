/**
 * @class Config
 * @classdesc Family Chart configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * @param {string} name
 */
primitives.famdiagram.Config = function (name) {
  this.name = (name !== undefined) ? name : "FamDiagram";
  this.classPrefix = "famdiagram";

  /**
   * Sets control navigation mode.
   * 
   * By default control replicates interactivity of regular collection control. It has cursor to select single
   * item in the collection. So user can click and select any node in the diagram. The control has highlight for mouse over feedback.
   * So user can move mouse and see highlight frame and callout callback annotation for node under cursor.
   * 
   * By `Default` the control has both cursor and highlight. If they are disabled then control is rendered as a static image.
   * 
   * @type {NavigationMode}
   */
  this.navigationMode = primitives.common.NavigationMode.Default;

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.SVG;

  /**
   * Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram
   * nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes
   * while not affecting the rendering performance. With this, huge diagrams can be fit into avaialable screen space.
   * 
   * When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes.
   * This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size
   * intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it
   * on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items
   * are just too small to be readable.
   * 
   * @type {PageFitMode}
   */
  this.pageFitMode = primitives.common.PageFitMode.FitToPage;

  /**
   * Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then
   * this option controls minimum allowed size of the diagram nodes.
   * 
   * @type {Visibility}
   */
  this.minimalVisibility = primitives.common.Visibility.Dot;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = primitives.common.OrientationType.Top;

  /**
   * Sets items vertical alignment relative to each other within one level of the hierarchy. 
   * It does not change anything if diagram nodes are all of the same size.
   * 
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

  /**
   * Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn
   * from logical children towards logical parents. By default diagram has no arrows.
   * 
   * @type {GroupByType}
   */
  this.arrowsDirection = primitives.common.GroupByType.None;

  /**
   * Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing 
   * of relations between parents and children. By default it is off.
   * 
   * @type {boolean}
   */
  this.showExtraArrows = true;

  /**
   * Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property.
   * 
   * @type {number}
   */
  this.extraArrowsMinimumSpace = 30;

  /**
   * This property sets loose nodes alignment between rows. Nodes can be placed close towards parents or children.
   * 
   * @type {GroupByType}
   */
  this.groupByType = primitives.common.GroupByType.Children;

  /**
   * This option keeps items at the same levels after connections bundling.
   */
  this.alignBylevels = true;

  /**
   * This option enables automatic layout of nodes sharing the same set of parents and children in form of matrix.
   * 
   * @type {boolean}
   */
  this.enableMatrixLayout = false;

  /**
   * Sets Minimum number of nodes needed to be shaped into matrix formtion. In order to shape nodes in 
   * form of matrix they should share the same set of parents and children. See `enableMatrixLayout` property.
   */
  this.minimumMatrixSize = 4;

  /**
   * Sets maximum number of columns in the matrix formation. The matrix formation stays squared as long as total number 
   * of columns does not exceed this property value. In order to shape nodes into matrix formation they should
   * share the same set of parents and children. See `enableMatrixLayout` property.
   * 
   * @type {number}
   */
  this.maximumColumnsInMatrix = 6;

  /**
   * Set this property to enable hiding of direct connectors to grand parents. It helps to reduce diagrams connectors layout complexity.
   * 
   * @type {boolean}
   */
  this.hideGrandParentsConnectors = false;

  /**
   * Set style of squared connectors with custom elbows.
   * 
   * @type {ElbowType}
   */
  this.elbowType = primitives.common.ElbowType.Round;

  /**
   * The bevel size of squared connector lines.
   * 
   * @type {number}
   */
  this.bevelSize = 4;

  /**
   * The size of dot markers placed in the elbows of connector lines.
   * 
   * @type {number}
   */
  this.elbowDotSize = 4;

  /**
   * Empty diagram message. This option is supposed to say user that chart is empty when no data is available for rendering.
   * 
   * @type {string}
   */
  this.emptyDiagramMessage = "Diagram is empty.";

  /**
   * Items collection. Ths property defines data we render in the diagram.
   * 
   * Every items should have unique `id` property set. They are used to create relations
   * between items in the diagram and for rendering various UI elements bound to nodes.
   * 
   * @type {ItemConfig[]}
   */
  this.items = [];

  /**
   * Annotations. Annotations are API elements that are attached to the diagram nodes.
   * We draw our annotations either in front of the nodes or in the background. The annotations 
   * don't affect the nodes placement in any way. As a result the control redraws them 
   * instantaneously without rerendering or recalculating the actual diagram layout.
   * 
   * @type {Array.<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>}
   */
  this.annotations = [];

  /**
   * Cursor item. Family Chart control has API options equivalent to regular UI controls.
   * The cursor item is used to select single item in the hierarchy with mouse click, 
   * highlight item provides visual feed back on mouse over. Selected items collection 
   * is equivalent to checked items in ListView or TreeView controls.
   * 
   * Chart navigation depends on current cursor item, chart shows cursor and its neighbours 
   * in full size regardless of enabled page fit mode. So cursor item plays a role of local 
   * zoom in the chart hierarchy. User navigates around chart via clicking and moving
   * cursor item around and zooming into data around new cursor item.
   * 
   * The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events.
   * 
   * If `null` then no cursor item selected in the diagram.
   * 
   * @type {string}
   */
  this.cursorItem = null;

  /**
   * Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram
   * layout or scrolling so it can be used to syncronize mouse over feedback of the diagram nodes with other
   * collection controls or UI elements. 
   * 
   * The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events.
   * 
   * If `null` then no highlight shown on the diagram.
   * 
   * @type {string}
   */
  this.highlightItem = null;

  /**
   * Highlight gravity radius. This property controls mouse over feedback and callout annotation visibility for nodes
   * rendered as markers when diagram auto fits nodes into available screen space. It makes marker highlighted when 
   * mouse pointer is inside of the gravity radius cycle of the marker. This property is ignored when the nearest item
   * is outside of the screen boundaries and is not visible to the end user.
   *
   * The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
   * 
   * @type {number}
   */
  this.highlightGravityRadius = 40;


  /**
   * Selected items collection. Selected items is a collection of items ids having checked their check boxes.
   * The control always shows selected items in the full size form, regardless of enabled page fit mode.
   * 
   * The control notifies about user made changes in this collection with `onSelectionChanging` and `onSelectionChanged` events.
   * 
   * @type {string[]}
   */
  this.selectedItems = [];

  /**
  * Sets visibility of selection check boxes for the diagram nodes.
  * 
  * `Auto` - visible for cursor item only
  * `True` - visible
  * `False` - hiddens
  * 
  * See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes.
  * Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element.
  * 
  * @type {Enabled}
  */
  this.hasSelectorCheckbox = primitives.common.Enabled.Auto;

  /**
   * Selection check box label. See `hasSelectorCheckbox` and `selectedItems` properties.
   * 
   * @type {string}
   */
  this.selectCheckBoxLabel = "Selected";

  /**
   * Selection path mode. This property controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw 
   * them in full size regardless of available space and auto fit mode.
   * 
   * The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
   * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
   * of the diagram in full size and draw all other diagram nodes as markers.
   *
   * @type {SelectionPathMode}
   */
  this.selectionPathMode = primitives.common.SelectionPathMode.None;

	/*
	Property: neighboursSelectionMode
		
	Default:
		<primitives.common.NeighboursSelectionMode.ParentsAndChildren>
	*/
  /**
   * Sets the neighbours selection mode, it defines how many neighbours are selected around cursor.
   * 
   * @type {NeighboursSelectionMode}
   */
  this.neighboursSelectionMode = primitives.common.NeighboursSelectionMode.ParentsAndChildren;

  /**
   * Collection of named templates used to define content for nodes, cursor and highlight.
   * By default control provides templates for all types of visual elements.
   * 
   * @type {TemplateConfig[]}
   */
  this.templates = [];

  /**
   * Name of the template used to render nodes in the diagram. See `templates` property. Template name
   * can be set individually for every node see `templateName` property of `ItemConfig`.
   * 
   * @type {string}
   */
  this.defaultTemplateName = null;

  /**
   * Sets the name of template used to render label annotations. Label annotations are labels placed in layout of the diagram. 
   * 
   * @type {string}
   */
  this.defaultLabelAnnotationTemplate = null;

  /**
   * Sets buttons visibility.
   * 
   * `Auto` - cursor item only.
   * `True` - visible
   * `False` - hidden
   * 
   * @type {Enabled}
   */
  this.hasButtons = primitives.common.Enabled.Auto;

  /**
   * Buttons configuration objects collection. The buttons panel on the side of the diagram nodes is one of our default easy to use features.
   * This gives you the possibility to try and see how context buttons work being placed inside of diagram layout.
   * This collection of buttons provides configuration properties for buttons rendered using HTML buttons elements.
   * 
   * @type {ButtonConfig[]}
   */
  this.buttons = [];

  /**
   * On buttons panel render event. This callback function is called to render context of buttons panel.
   * It is used to replace `buttons` collection property in ReactJS component. So we preserve context buttons panel as a functional 
   * concept, but eliminate buttons customization API.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   * @ignore
   */
  this.onButtonsRender = null;

  /**
   * On highlight item being changed event. See `highlightItem` property. This callback function is called before `onHighlightChanged` event.
   * Use this callabck function to stop event propogation. See `EventArgs` for details.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onHighlightChanging = null;

  /**
   * On highlight item changed event. See `highlightItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onHighlightChanged = null;

  /**
   * On cursor item being changed event. See `cursorItem` property. This callback function is called before `onCursorChanged` event.
   * Use this callabck function to stop event propogation. See `EventArgs` for details.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanging = null;

  /**
   * On cursor item changed event. See `cursorItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanged = null;

  /**
   * On selected items being changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanging = null;

  /**
   * On selected items changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanged = null;

  /**
   * Button click event. See `buttons` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onButtonClick = null;

  /**
   * Mouse click event. 
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onMouseClick = null;

  /**
   * Mouse double click event. 
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onMouseDblClick = null;

  /**
   * Callback function for rendering content of the diagram nodes. This callback is only 
   * called when custom item template is defined in the template object configuration.
   * This callback receives reference to DOM element and context object of the rendered item.
   * The control reuses exisitng elements in the DOM, so it is applications responsibility 
   * to properly update their content.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onItemRender = null;

  /**
   * Callback function for rendering content of the highlight template. This callback is only 
   * called when custom highlight is defined in the template configuration.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onHighlightRender = null;

  /**
   * Callback function for rendering content of the cursor template. This callback is only 
   * called when custom cursor is defined in the template configuration.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onCursorRender = null;

  /**
   * Sets the spacing between rows.
   * 
   * @type {number}
   */
  this.normalLevelShift = 20;

  /**
   * Sets the spacing after the row containing nodes minimized down to markers.
   * 
   * @type {number}
   */
  this.dotLevelShift = 20;

  /**
   * Sets the spacing after the row containing nodes minimized down to lines.
   * 
   * @type {number}
   */
  this.lineLevelShift = 10;

  /**
   * Sets interval between nodes of the same row.
   * 
   * @type {number}
   */
  this.normalItemsInterval = 10;

  /**
   * Sets interval between nodes of the same row, minimized down to markers.
   * 
   * @type {number}
   */
  this.dotItemsInterval = 1;

  /**
   * Sets interval between nodes of the same row, minimized down to lines.
   * 
   * @type {number}
   */
  this.lineItemsInterval = 2;

  /**
   * Set cousins interval multiplier. This values adds extra space between branches of the hierarchy.
   * For example nodes of the same parent have interval 20 and nodes of two different parents are going to have interval 100.
   * 
   * @type {number}
   */
  this.cousinsIntervalMultiplier = 5;

  /**
   * The first font color of the title.
   * 
   * The title background color is designed to be one of the avalaible dimensitions to group nodes in the diagram,
   * so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue
   * via automatic switch between two available font title colors.
   * 
   * @type {string}
   */
  this.itemTitleFirstFontColor = primitives.common.Colors.White;

  /**
   * The second font color of the title.
   * 
   * @type {string}
   */
  this.itemTitleSecondFontColor = primitives.common.Colors.Navy;

  /**
   * Markers. The shape of the markers when nodes are minimized by autofit. The control supports auto fit of the diagram into available screen space.
   * When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic,
   * so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
   * So this option sets default marker shape for nodes. It can be set individually per node in items configurations.
   * 
   * The default color of shape is the same as `itemTitleColor` property set for individual items.
   * 
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = primitives.common.ShapeType.None;

  /**
   * The relations lines color. The control uses this lines color to render basic relations between nodes.
   * 
   * @type {string}
   */
  this.linesColor = primitives.common.Colors.Silver;

  /**
   * The relations lines width
   * 
   * @type {number}
   */
  this.linesWidth = 1;

  /**
   * The relations lines pattern
   * 
   * @type {LineType}
   */
  this.linesType = primitives.common.LineType.Solid;

	/*
	Property: showNeigboursConnectorsHighlighted
		
	See also:
		<primitives.famdiagram.Config.neighboursSelectionMode>,
		<primitives.famdiagram.Config.highlightLinesColor>,
		<primitives.famdiagram.Config.highlightLinesWidth>,
		<primitives.famdiagram.Config.highlightLinesType>
	Default:
		false
	*/
  /**
   * Showa connection lines between current cursor item and its neighbours highlighted. Neighbours selection mode is defined by neighboursSelectionMode option.
   * 
   * @type {boolean}
   */
  this.showNeigboursConnectorsHighlighted = false;

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
	Property: linesPalette
		This collection contains elements of type PaletteItemConfig. It is used to draw connector lines between families in different styles. 
		It is similar concept to regular line chart having lines intersections. 
		If this collection is empty then default linesColor, linesWidth and linesType are used for all connector lines.
	
	See Also:
		<primitives.famdiagram.PaletteItemConfig>
	*/
  this.linesPalette = [];

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
		This option controls callout visibility for dotted items. 

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
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.famdiagram.Config.templates> collection property.

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
		Group title placement style. Defines group title and buttons panel position relative to item. By default group title is on the left and buttons are on the right.
		If the value is set to <primitives.common.AdviserPlacementType.Left> then group title placed on the right and buttons on the left side of items.

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
		Minimum CSS3 scale transform. Available on mobile safary only.
	*/
  this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform. Available on mobile safary only.
	*/
  this.maximumScale = 1;

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
		<primitives.famdiagram.ItemConfig.label>
		<primitives.famdiagram.Config.labelSize>
		<primitives.famdiagram.Config.normalItemsInterval>
		<primitives.famdiagram.Config.dotItemsInterval>
		<primitives.famdiagram.Config.lineItemsInterval>
		<primitives.famdiagram.Config.normalLevelShift>
		<primitives.famdiagram.Config.dotLevelShift>
		<primitives.famdiagram.Config.lineLevelShift>

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