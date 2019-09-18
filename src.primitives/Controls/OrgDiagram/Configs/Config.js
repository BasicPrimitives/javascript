/**
 * @class Config
 * @classdesc Organizational Chart configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * @param {string} name
 */
primitives.orgdiagram.Config = function (name) {
  this.name = (name !== undefined) ? name : "OrgDiagram";
  this.classPrefix = "orgdiagram";

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
   * Sets children horizontal alignment relative to their parent. The children by default are measured in size and then aligned 
   * towards the parent node. If it is `Center` aligned then parent node is placed in the middle of the children. In the `Left`
   * alignment mode parent is aligned to left of the children and vice versa for `Right` alignment.
   * 
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

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
  this.showExtraArrows = false;

  /**
   * Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property.
   * 
   * @type {number}
   */
  this.extraArrowsMinimumSpace = 30;

  /**
   * Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes
   * are always connected with squared connection lines
   * 
   * @type {ConnectorType}
   */
  this.connectorType = primitives.common.ConnectorType.Squared;

  /**
   * The bevel size of squared connector lines.
   * 
   * @type {number}
   */
  this.bevelSize = 4;

  /**
   * Set style of squared connectors with custom elbows.
   * 
   * @type {ElbowType}
   */
  this.elbowType = primitives.common.ElbowType.None;

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
   * Cursor item. Organization Chart control has API options equivalent to regular UI controls.
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
  this.selectionPathMode = primitives.common.SelectionPathMode.FullStack;

  /**
   * Collection of named templates used to define content for nodes, cursor and highlight.
   * By default control provides templates for all types of visual elements.
   * 
   * @type {TemplateConfig[]}
   */
  this.templates = [];

  /**
   * Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node
   * see `templateName` property of `ItemConfig`.
   * 
   * @type {string}
   */
  this.defaultTemplateName = null;

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

  /**
   * Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes.
   * 
   * @type {string}
   */
  this.highlightLinesColor = primitives.common.Colors.Red;

  /**
   * Sets highlight lines width.
   * 
   * @type {number}
   */
  this.highlightLinesWidth = 1;

  /**
   * Sets highlight lines pattern.
   * 
   * @type {LineType}
   */
  this.highlightLinesType = primitives.common.LineType.Solid;

  /**
   * Sets callout visibility.
   * 
   * @type {boolean}
   */
  this.showCallout = true;

  /**
   * Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property.
   * 
   * @type {Visibility}
   */
  this.calloutMaximumVisibility = primitives.common.Visibility.Dot;

  /**
   * Callout annotation placement offset. Sets how far callout content is offset from the marker it is displayed for.
   * 
   * @type {number}
   */
  this.calloutPlacementOffset = 100;

  /**
   * Callout annotation default template name.
   * 
   * Templates are HTML fragments containing layout and styles used to render diagram nodes.
   * They are defined with a named configuration objects. See `templates` property of control's configuration object.
   * 
   * @type {string}
   */
  this.defaultCalloutTemplateName = null;

  /**
   * Callout annotation fill color.
   * 
   * @type {string}
   */
  this.calloutfillColor = "#000000";

  /**
   * Callout annotation border color.
   * 
   * @type {string}
   */
  this.calloutBorderColor = null;

  /**
   * Callout annotation border line offset.
   * 
   * @type {number}
   */
  this.calloutOffset = 4;

  /**
   * Callout annotation corner radius.
   * 
   * @type {number}
   */
  this.calloutCornerRadius = 4;

  /**
   * Callout annotation pointer width.
   * 
   * @type {string}
   */
  this.calloutPointerWidth = "10%";

  /**
   * Callout annotation border line width.
   * 
   * @type {number}
   */
  this.calloutLineWidth = 1;

  /**
   * Callout annotation opacity
   * 
   * @type {number}
   */
  this.calloutOpacity = 0.2;

  /**
   * Sets default formation of child nodes. By default all children that belong to a parent node are always aligned 
   * below and placed in a horizontal line. On a large scale this may result in the end user having to scroll screens
   * in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children
   * of a parent node in a sqaure/matrix formation. This will reduce sideways screen scrolling by compacting the child
   * nodes into a much smaller area on the screen.
   * 
   * @type {ChildrenPlacementType}
   */
  this.childrenPlacementType = primitives.common.ChildrenPlacementType.Horizontal;

  /**
   * Sets formation of leave children.
   * 
   * @type {ChildrenPlacementType}
   */
  this.leavesPlacementType = primitives.common.ChildrenPlacementType.Horizontal;

  /**
   * Maximum number of columns for matrix layout of children.
   * 
   * @type {number}
   */
  this.maximumColumnsInMatrix = 6;

  /**
   * The size of the panel containing context buttons.
   * 
   * @type {number}
   */
  this.buttonsPanelSize = 28;

  /**
   * The size of the panel containing group title.
   * 
   * @type {number}
   */
  this.groupTitlePanelSize = 24;

  /**
   * The size of the panel containing selection checkbox.
   * 
   * @type {number}
   */
  this.checkBoxPanelSize = 24;

  /**
   * Group titles placement. Defines group title and buttons panel position relative to the node. By default it is on the left.
   * The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension 
   * for nodes visual grouping in the diagram.
   * 
   * @type {AdviserPlacementType}
   */
  this.groupTitlePlacementType = primitives.common.AdviserPlacementType.Left;

  /**
   * Group titles orientation.
   * 
   * @type {TextOrientationType}
   */
  this.groupTitleOrientation = primitives.text.TextOrientationType.RotateRight;

  /**
   * Group titles vertical alignment.
   * 
   * @type {VerticalAlignmentType}
   */
  this.groupTitleVerticalAlignment = primitives.common.VerticalAlignmentType.Middle;

  /**
   * Group titles horizontal alignment.
   * 
   * @type {HorizontalAlignmentType}
   */
  this.groupTitleHorizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

  /**
   * 	Group titles font size.
   * 
   * @type {number}
   */
  this.groupTitleFontSize = "12px";

  /**
   * Group titles font family.
   * 
   * @type {string}
   */
  this.groupTitleFontFamily = "Arial";

  /**
   * Group titles color. 
   * 
   * @type {string}
   */
  this.groupTitleColor = primitives.common.Colors.RoyalBlue;

  /**
   * Group titles font weight: normal, bold
   * 
   * @type {string}
   */
  this.groupTitleFontWeight = "normal";

  /**
   * Group titles font style: normal, italic
   * 
   * @type {string}
   */
  this.groupTitleFontStyle = "normal";

  /**
   * @ignore
   */
  this.distance = 3;

  /**
   * CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars.
   * It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers,
   * it looks good only in mobile browsers, so our recomendation is to use zoom with collection of item templates of various sizes.
   * Templates gives you better control over quality of your content at various zoom levels.
   * 
   * @type {number}
   */
  this.scale = 1;

  /**
   * Minimum CSS3 scale transform.
   * 
   * @ignore
   * @type {number}
   */
  this.minimumScale = 0.5;

  /**
   * Maximum CSS3 scale transform.
   * 
   * @ignore
   * @type {number}
   */
  this.maximumScale = 2;

  /**
   * Sets labels visibility for nodes when they are minimized into markers by page auto fit. See `pageFitMode` property.
   * 
   * The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes
   * into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels.
   * 
   * Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict
   * resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them
   * is going to stay visible.
   * 
   * Auto - displays label only when it has space to be rendered.
   * True - shows label regardless, even if it overlaps other labels and nodes.
   * False - hidden.
   * 
   * @type {Enabled}
   */
  this.showLabels = primitives.common.Enabled.Auto;

  /**
   * Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping.
   * If one label overlaps another label the or item it will be hidden.
   * 
   * @type {Size}
   */
  this.labelSize = new primitives.common.Size(80, 24);

  /**
   * Sets labels offset from the merkers bounding rectangles.
   * 
   * @type {number}
   */
  this.labelOffset = 1;

  /**
   * Labels orientation.
   * 
   * @type {TextOrientationType}
   */
  this.labelOrientation = primitives.text.TextOrientationType.Horizontal;

  /**
   * Labels placement. Sets labels placement relative to the markers bounding rectangles.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = primitives.common.PlacementType.Top;

  /**
   * Labels font size.
   * 
   * @type {string}
   */
  this.labelFontSize = "10px";

  /**
   * Labels font family.
   * 
   * @type {string}
   */
  this.labelFontFamily = "Arial";

  /**
   * Labels color
   * 
   * @type {string}
   */
  this.labelColor = primitives.common.Colors.Black;

  /**
   * Labels font weight
   * Font weight: normal, bold
   * 
   * @type {string}
   */
  this.labelFontWeight = "normal";

  /**
   * Labels font style. Font style: normal, italic
   * 
   * @type {string}
   */
  this.labelFontStyle = "normal";

  /**
   * Enable panning. Enable chart panning with mouse drag & drop for desktop browsers.
   * Disable it if you need to support items Drag & Drop.
   * 
   * @type {boolean}
   */
  this.enablePanning = true;

  /**
   * Sets minimum size the diagram can shrink itself in autosize mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accomodate all nodes and render them normally.
   * 
   * @type {Size}
   */
  this.autoSizeMinimum = new primitives.common.Size(800, 600);

  /**
   * Sets maximum size the diagram can expand itself in autosize mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accomodate all nodes and render them normally.
   * 
   * @type {Size}
   */
  this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};