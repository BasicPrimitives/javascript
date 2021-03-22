import {NavigationMode, PageFitMode, Visibility, OrientationType, VerticalAlignmentType,
  ConnectorType, GroupByType, ElbowType, Enabled, SelectionPathMode,
  Colors, ShapeType, LineType, AdviserPlacementType, TextOrientationType, HorizontalAlignmentType,
  PlacementType, ChildrenPlacementType
} from '../enums';
import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';

/**
 * @class OrgConfig
 * @classdesc Organizational Chart configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * @param {string} name
 */
export default function OrgConfig(name) {
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
  this.navigationMode = NavigationMode.Default;

  /**
   * Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram
   * nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes
   * while not affecting the rendering performance. With this, huge diagrams can be fit into available screen space.
   * 
   * When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes.
   * This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size
   * intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it
   * on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items
   * are just too small to be readable.
   * 
   * @group Auto Layout
   * @type {PageFitMode}
   */
  this.pageFitMode = PageFitMode.FitToPage;

  /**
   * Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then
   * this option controls minimum allowed size of the diagram nodes.
   * 
   * @group Auto Layout
   * @type {Visibility}
   */
  this.minimalVisibility = Visibility.Dot;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @group Auto Layout
   * @type {OrientationType}
   */
  this.orientationType = OrientationType.Top;

  /**
   * Sets children horizontal alignment relative to their parent. The children by default are measured in size and then aligned 
   * towards the parent node. If it is `Center` aligned then parent node is placed in the middle of the children. In the `Left`
   * alignment mode parent is aligned to left of the children and vice versa for `Right` alignment.
   * 
   * @group Auto Layout
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Sets items vertical alignment relative to each other within one level of the hierarchy. 
   * It does not change anything if diagram nodes are all of the same size.
   * 
   * @group Auto Layout
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = VerticalAlignmentType.Middle;

  /**
   * Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn
   * from logical children towards logical parents. By default diagram has no arrows.
   * 
   * @group Relation Lines
   * @type {GroupByType}
   */
  this.arrowsDirection = GroupByType.None;

  /**
   * Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing 
   * of relations between parents and children. By default it is off.
   * 
   * @group Relation Lines
   * @type {boolean}
   */
  this.showExtraArrows = false;

  /**
   * Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.extraArrowsMinimumSpace = 30;

  /**
   * Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes
   * are always connected with squared connection lines
   * 
   * @group Relation Lines
   * @type {ConnectorType}
   */
  this.connectorType = ConnectorType.Squared;

  /**
   * The bevel size of squared connector lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.bevelSize = 4;

  /**
   * Set style of squared connectors with custom elbows.
   * 
   * @group Relation Lines
   * @type {ElbowType}
   */
  this.elbowType = ElbowType.None;

  /**
   * The size of dot markers placed in the elbows of connector lines.
   * 
   * @group Relation Lines
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
   * Every item should have set unique `id` property. They are used to create relations
   * between items in the diagram and for rendering of various UI elements bound to nodes.
   * 
   * @type {OrgItemConfig[]}
   */
  this.items = [];

  /**
   * Annotations. Annotations are API elements attached to the diagram nodes 
   * and designed to highlight some nodes or relations. We draw our annotations 
   * either in front of the nodes or in the background. The annotations don't affect 
   * the placement of the nodes in any way. We have some exceptions. As a result, the control 
   * redraws them instantaneously without rendering or recalculating the actual diagram layout. 
   * 
   * @type {Array.<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>}
   */
  this.annotations = [];

  /**
   * Cursor item. Organization Chart control has API options equivalent to standard UI controls.
   * The cursor item is used to select a single item in the hierarchy with a mouse click, and 
   * the highlighted item provides visual feedback on the mouse over. Selected items collection 
   * is equivalent to checked items in ListView or TreeView controls.
   * 
   * The chart's navigation work around the current cursor item. The component shows 
   * the cursor and its neighbors regardless of page fit mode. So cursor item plays the role 
   * of local zoom in the chart hierarchy. The user navigates around the chart via clicking 
   * and selecting cursor items and zooming into data around the new cursor item. 
   * 
   * The control notifies about this property changes with `onCursorChanging` and `onCursorChanged` events.
   * 
   * If the cursor item is set to null, then no cursor item is selected in the diagram.
   * 
   * @type {string}
   */
  this.cursorItem = null;

  /**
   * Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram
   * layout or scrolling so it can be used to synchronize mouse over feedback of the diagram nodes with other
   * collection controls or UI elements. 
   * 
   * The control notifies about this property changes with `onHighlightChanging` and `onHighlightChanged` events.
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
  * `False` - hidden
  * 
  * See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes.
  * Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element.
  * 
  * @type {Enabled}
  */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * Selection check box label. See `hasSelectorCheckbox` and `selectedItems` properties.
   * 
   * @group Templates
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
   * @group Auto Layout
   * @type {SelectionPathMode}
   */
  this.selectionPathMode = SelectionPathMode.FullStack;

  /**
   * Sets selected items frame visibility. If selected item is outside of the diagram's area visible to the end user,
   * control displays that item in the form of the marker on frame around the diagram.
   * 
   * @group Frame
   * @type {boolean}
   */
  this.showFrame = false;

  /**
   * Frame inner padding. Adds extra padding around markers on the inner side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameInnerPadding = new Thickness(2, 2, 2, 2);

  /**
   * Frame outer padding. Adds extra padding around markers on the outer side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameOuterPadding = new Thickness(2, 2, 2, 2);

  /**
   * Collection of named templates used to define content for nodes, cursor and highlight.
   * By default control provides templates for all types of visual elements.
   * 
   * @group Templates
   * @type {TemplateConfig[]}
   */
  this.templates = [];

  /**
   * Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node
   * see `templateName` property of `OrgItemConfig`.
   * 
   * @group Templates
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
   * @group Templates
   * @type {Enabled}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * On buttons panel render event. This callback function is called to render context of buttons panel.
   * It is used to replace `buttons` collection property in ReactJS component. So we preserve context buttons panel as a functional 
   * concept, but eliminate buttons customization API.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onButtonsRender = null;

  /**
   * This callback function is called before `onHighlightChanged` event. See `highlightItem` property.
   * Use this event to modify diagram elements not affecting diagram layout. For example on-screen connector annotations added 
   * in this event handler to diagram configuration would be rendered together with highlight.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information. Use properties of this argument to stop event propagate and further diagram layout and rendering.
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
   * Use this callback function to stop event propagation. See `EventArgs` for details.
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
   * The control reuses existing elements in the DOM, so it is applications responsibility 
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
   * @group Intervals
   * @type {number}
   */
  this.normalLevelShift = 20;

  /**
   * Sets the spacing after the row containing nodes minimized down to markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotLevelShift = 20;

  /**
   * Sets the spacing after the row containing nodes minimized down to lines.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineLevelShift = 10;

  /**
   * Sets interval between nodes of the same row.
   * 
   * @group Intervals
   * @type {number}
   */
  this.normalItemsInterval = 10;

  /**
   * Sets interval between nodes of the same row, minimized down to markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotItemsInterval = 1;

  /**
   * Sets interval between nodes of the same row, minimized down to lines.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineItemsInterval = 2;

  /**
   * Set cousins interval multiplier. This values adds extra space between branches of the hierarchy.
   * For example nodes of the same parent have interval 20 and nodes of two different parents are going to have interval 100.
   * 
   * @group Intervals
   * @type {number}
   */
  this.cousinsIntervalMultiplier = 5;

  /**
   * The first font color of the title.
   * 
   * The title background color is designed to be one of the available dimensions to group nodes in the diagram,
   * so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue
   * via automatic switch between two available font title colors.
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleFirstFontColor = Colors.White;

  /**
   * The second font color of the title.
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleSecondFontColor = Colors.Navy;

  /**
   * Markers. The shape of the markers when nodes are minimized by auto fit. The control supports auto fit of the diagram into available screen space.
   * When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic,
   * so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
   * So this option sets default marker shape for nodes. It can be set individually per node in items configurations.
   * 
   * The default color of shape is the same as `itemTitleColor` property set for individual items.
   * 
   * @group Templates
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = ShapeType.None;

  /**
   * The relations lines color. The control uses this lines color to render basic relations between nodes.
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.linesColor = Colors.Silver;

  /**
   * The relations lines width
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.linesWidth = 1;

  /**
   * The relations lines pattern
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.linesType = LineType.Solid;

  /**
   * Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes.
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.highlightLinesColor = Colors.Red;

  /**
   * Sets highlight lines width.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.highlightLinesWidth = 1;

  /**
   * Sets highlight lines pattern.
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.highlightLinesType = LineType.Solid;

  /**
   * Sets callout visibility.
   * 
   * @group Callout
   * @type {boolean}
   */
  this.showCallout = true;

  /**
   * Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property.
   * 
   * @group Callout
   * @type {Visibility}
   */
  this.calloutMaximumVisibility = Visibility.Dot;

  /**
   * Callout annotation placement offset. Sets how far callout content is offset from the marker it is displayed for.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutPlacementOffset = 100;

  /**
   * Callout annotation default template name.
   * 
   * Templates are HTML fragments containing layout and styles used to render diagram nodes.
   * They are defined with a named configuration objects. See `templates` property of control's configuration object.
   * 
   * @group Callout
   * @type {string}
   */
  this.defaultCalloutTemplateName = null;

  /**
   * Callout annotation fill color.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutfillColor = "#000000";

  /**
   * Callout annotation border color.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutBorderColor = null;

  /**
   * Callout annotation border line offset.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutOffset = 4;

  /**
   * Callout annotation corner radius.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutCornerRadius = 4;

  /**
   * Callout annotation pointer width.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutPointerWidth = "10%";

  /**
   * Callout annotation border line width.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutLineWidth = 1;

  /**
   * Callout annotation opacity
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutOpacity = 0.2;

  /**
   * Sets default formation of child nodes. By default all children that belong to a parent node are always aligned 
   * below and placed in a horizontal line. On a large scale this may result in the end user having to scroll screens
   * in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children
   * of a parent node in a square/matrix formation. This will reduce sideways screen scrolling by compacting the child
   * nodes into a much smaller area on the screen.
   * 
   * @group Auto Layout
   * @type {ChildrenPlacementType}
   */
  this.childrenPlacementType = ChildrenPlacementType.Horizontal;

  /**
   * Sets formation of leave children.
   * 
   * @group Auto Layout
   * @type {ChildrenPlacementType}
   */
  this.leavesPlacementType = ChildrenPlacementType.Horizontal;

  /**
   * Sets default placement of assistants hierarchies relative to the regular children of the parent node.
   * If assistant node has its own children then control adds extra levels, so assistants children are placed
   * above level of the parent node children.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.placeAssistantsAboveChildren = true;

  /**
 * Sets default placement of advisers hierarchies relative to the regular children of the parent node.
 * If adviser node has its own children then control adds extra levels, so advisers children are placed
 * above level of the parent node children.
 * 
 * @group Auto Layout
 * @type {boolean}
 */
  this.placeAdvisersAboveChildren = true;

  /**
   * Maximum number of columns for matrix layout of children.
   * 
   * @group Auto Layout
   * @type {number}
   */
  this.maximumColumnsInMatrix = 6;

  /**
   * The size of the panel containing context buttons.
   * 
   * @group Templates
   * @type {number}
   */
  this.buttonsPanelSize = 28;

  /**
   * The size of the panel containing group title.
   * 
   * @group Group Titles
   * @type {number}
   */
  this.groupTitlePanelSize = 24;

  /**
   * The size of the panel containing selection checkbox.
   * 
   * @group Templates
   * @type {number}
   */
  this.checkBoxPanelSize = 24;

  /**
   * Group titles placement. Defines group title and buttons panel position relative to the node.
   * The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension 
   * for nodes visual grouping in the diagram.
   * 
   * @group Group Titles
   * @type {AdviserPlacementType}
   */
  this.groupTitlePlacementType = AdviserPlacementType.Left;

  /**
   * Group titles orientation.
   * 
   * @group Group Titles
   * @type {TextOrientationType}
   */
  this.groupTitleOrientation = TextOrientationType.RotateRight;

  /**
   * Group titles vertical alignment.
   * 
   * @group Group Titles
   * @type {VerticalAlignmentType}
   */
  this.groupTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * Group titles horizontal alignment.
   * 
   * @group Group Titles
   * @type {HorizontalAlignmentType}
   */
  this.groupTitleHorizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Group titles font size.
   * 
   * @group Group Titles
   * @type {number}
   */
  this.groupTitleFontSize = "12px";

  /**
   * Group titles font family.
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontFamily = "Arial";

  /**
   * Group titles color.
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleColor = Colors.RoyalBlue;

  /**
   * Group titles font weight: normal, bold
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontWeight = "normal";

  /**
   * Group titles font style: normal, italic
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontStyle = "normal";


  /**
   * The size of the panel containing level titles.
   * 
   * @group Level Titles
   * @type {number}
   */
  this.levelTitlePanelSize = 24;

  /**
   * Level titles placement. Defines level title panel position relative to the diagram.
   * 
   * @group Level Titles
   * @type {AdviserPlacementType}
   */
  this.levelTitlePlacementType = AdviserPlacementType.Left;

  /**
   * If this property is true then level titles are placed inside of the diagram's view port above or below diagram nodes.
   * 
   * @group Level Titles
   * @type {boolean}
   */
  this.levelTitlePlaceInside = false;

  /**
   * Group titles orientation.
   * 
   * @group Level Titles
   * @type {TextOrientationType}
   */
  this.levelTitleOrientation = TextOrientationType.Auto;

  /**
   * Level titles vertical alignment.
   * 
   * @group Level Titles
   * @type {VerticalAlignmentType}
   */
  this.levelTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * Level titles horizontal alignment.
   * 
   * @group Level Titles
   * @type {HorizontalAlignmentType}
   */
  this.levelTitleHorizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Level titles font size.
   * 
   * @group Level Titles
   * @type {number}
   */
  this.levelTitleFontSize = "12px";

  /**
   * Level titles font family.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontFamily = "Arial";

  /**
   * Level titles font color.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontColor = Colors.White;

  /**
   * Level titles color.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleColor = Colors.RoyalBlue;

  /**
   * Level titles font weight: normal, bold
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontWeight = "normal";

  /**
   * Level titles font style: normal, italic
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontStyle = "normal";

  /**
   * @ignore
   */
  this.distance = 3;

  /**
   * CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars.
   * It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers,
   * it looks good only in mobile browsers, so our recommendation is to use zoom with collection of item templates of various sizes.
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
   * resolution to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them
   * is going to stay visible.
   * 
   * Auto - displays label only when it has space to be rendered.
   * True - shows label regardless, even if it overlaps other labels and nodes.
   * False - hidden.
   * 
   * @group Labels
   * @type {Enabled}
   */
  this.showLabels = Enabled.Auto;

  /**
   * Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping.
   * If one label overlaps another label the or item it will be hidden.
   * 
   * @group Labels
   * @type {Size}
   */
  this.labelSize = new Size(80, 24);

  /**
   * Sets labels offset from the markers bounding rectangles.
   * 
   * @group Labels
   * @type {number}
   */
  this.labelOffset = 1;

  /**
   * Labels orientation.
   * 
   * @group Labels
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Horizontal;

  /**
   * Labels placement. Sets labels placement relative to the markers bounding rectangles.
   * 
   * @group Labels
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Top;

  /**
   * Labels font size.
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontSize = "10px";

  /**
   * Labels font family.
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontFamily = "Arial";

  /**
   * Labels color
   * 
   * @group Labels
   * @type {string}
   */
  this.labelColor = Colors.Black;

  /**
   * Labels font weight
   * Font weight: normal, bold
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontWeight = "normal";

  /**
   * Labels font style. Font style: normal, italic
   * 
   * @group Labels
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
   * Sets minimum size the diagram can shrink itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMinimum = new Size(800, 600);

  /**
   * Sets maximum size the diagram can expand itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMaximum = new Size(1024, 768);
};