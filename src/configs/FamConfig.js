import {NavigationMode, PageFitMode, Visibility, OrientationType, VerticalAlignmentType,
  GroupByType, ElbowType, Enabled, SelectionPathMode, NeighboursSelectionMode,
  Colors, ShapeType, LineType, AdviserPlacementType, TextOrientationType, HorizontalAlignmentType,
  PlacementType
} from '../enums';
import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';

/**
 * @class FamConfig
 * @classdesc Family Chart configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * Family Chart control has API options similar to regular UI collection controls.
 * It supports single node selection with the `cursorItem` property, mouse click,
 * or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback
 * and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems`
 * collection and checkboxes enable multi-select available in ListView and TreeView controls.
 * 
 * @param {string} name
 */
export default function FamConfig(name) {
  this.name = (name !== undefined) ? name : "FamDiagram";
  this.classPrefix = "famdiagram";

  /**
   * The navigation mode property allows disabling control interactivity.
   * By default, the control behaves like a regular collection control. It has a cursor to select
   * a single item in the collection. So user can click and select any node in the diagram.
   * The control has a highlight for mouseover feedback. So user can move the mouse and see highlight
   * frame and callout callback annotation for a node under the cursor.
   * 
   * By `Default`, the control has both cursor and highlight. If they are disabled, then control is rendered as a static image.
   * 
   * @type {NavigationMode}
   */
  this.navigationMode = NavigationMode.Default;

  /**
   * The page fit mode option minimizes the diagram size via replacing nodes with markers and labels. 
   * That mode can show a large number of nodes while not affecting the rendering performance.
   * It can fit thousands of nodes into available screen space without losing usability. 
   * On the other hand, when we use a graphics editor to draw our diagrams manually,
   * it is common to have a sparse layout with significant gaps between the nodes.
   * If we don't fit the graph, the space between nodes can easily make 
   * the diagram/chart unusable hard to view, edit and navigate.
   * 
   * @group Auto Layout
   * @type {PageFitMode}
   */
  this.pageFitMode = PageFitMode.FitToPage;

  /**
   * The minimal nodes visibility option controls how small nodes of the diagram can be in auto-fit mode. 
   * 
   * @group Auto Layout
   * @type {Visibility}
   */
  this.minimalVisibility = Visibility.Dot;

  /**
   * The minimum visible levels option prevents top-level nodes from folding into markers.
   * It accounts for family chart relations and the `levelOffset` of individual items.
   * 
   * @group Auto Layout
   * @type {number}
   */
   this.minimumVisibleLevels = 0;

  /**
   * The orientation property rotates the diagram layout. It is needed for right-to-left languages support and custom layouts.
   * 
   * @group Auto Layout
   * @type {OrientationType}
   */
  this.orientationType = OrientationType.Top;

  /**
   * The vertical alignment sets nodes alignment inside row's vertical boundaries.
   * If a row of nodes contains nodes of multiple sizes, small nodes
   * are vertically aligned relative to their bigger siblings.
   * It does not change anything if diagram nodes are all of the same size.
   * 
   * @group Auto Layout
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The arrows direction property shows arrows for connector lines. 
   * If it is set to the `Parents`, arrows are drawn towards logical parents from logical children. 
   * 
   * @group Relation Lines
   * @type {GroupByType}
   */
  this.arrowsDirection = GroupByType.None;

  /**
   * Show extra horizontal arrows for long horizontal connection lines for the easy visual 
   * tracking of relations between parents and children. By default, it is off.
   * 
   * @group Relation Lines
   * @type {boolean}
   */
  this.showExtraArrows = true;

  /**
   * The extra arrows minimum space on horizontal connection lines. See `showExtraArrows` property.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.extraArrowsMinimumSpace = 30;

  /**
   * The group by property sets loose nodes alignment between rows. Nodes can be placed close towards parents or children.
   * 
   * @group Auto Layout
   * @type {GroupByType}
   */
  this.groupByType = GroupByType.Children;

  /**
   * The align by levels option keeps items at the same levels after bundling connection lines between parents and children.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.alignBylevels = true;

  /**
   * The matrix layout option enables nodes sharing the same parents and children into a matrix formation.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.enableMatrixLayout = false;

  /**
   * The minimum matrix size sets the number of nodes needed to be shaped into matrix formation. See the `enableMatrixLayout` property.
   * 
   * @group Auto Layout
   * @type {number}
   */
  this.minimumMatrixSize = 4;

  /**
   * The maximum number of columns in the matrix formation prevents
   * it from outgrowing screen width and forces it to grow vertically. 
   * 
   * @group Auto Layout
   * @type {number}
   */
  this.maximumColumnsInMatrix = 6;

  /**
   * The hide grandparents connections property enables hiding of direct connectors to grandparents.
   * It helps to reduce diagrams connectors layout complexity.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.hideGrandParentsConnectors = false;

  /**
   * The elbow style of squared connectors lines.
   * 
   * @group Relation Lines
   * @type {ElbowType}
   */
  this.elbowType = ElbowType.Round;

  /**
   * The bevel size of squared connection lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.bevelSize = 4;

  /**
   * The elbow dot size property sets marker size in elbows of connector lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.elbowDotSize = 4;

  /**
   * Empty diagram message. This option should tell the user 
   * that the chart is blank when no data is available for rendering.
   * 
   * @type {string}
   */
  this.emptyDiagramMessage = "Diagram is empty.";

  /**
   * The items collection defines the data we render in the diagram.
   * Every item should have a unique `id`. They are used to create relations
   * between the nodes of the graph and render various UI elements associated with nodes.
   * 
   * @type {FamItemConfig[]}
   */
  this.items = [];

  /**
   * Annotations are visual elements attached to the diagram nodes and designed to spotlight
   * some nodes or relations. They are drawn either in front of the diagram or the background.
   * The annotations don't impact the placement of the nodes, though, with some exceptions.
   * As a result, the control redraws them instantaneously without rendering
   * or recalculating the actual diagram layout. 
   * 
   * @type {Array.<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>}
   */
  this.annotations = [];

  /**
   * The cursor item provides a single node selection, navigation, and local zoom in the diagram.
   * The component shows the cursor, neighbors, and selected nodes using templates and folds
   * everything into markers to save space. So clicking and moving the cursor from node to node
   * works as stepping in and expanding nodes in the neighboring diagram area. To select cursor
   * node with keyboard, use arrow keys to change focus selection first in the diagram and press
   * the `Enter` key to set the `cursorItem` to the required node. See the'onCursorChanging` 
   * and `onCursorChanged` events to handle user clicks on nodes. If the cursor item is set to
   * null, then no cursor item is selected in the diagram.
   * 
   * @type {string}
   */
  this.cursorItem = null;

  /**
   * The highlighted item sets focus to some node in the diagram. It is a redundant feature on
   * touch screen devices, so use the `navigationMode` property to disable it.
   * The highlight item can be set programmatically, with mouseover, keyboard arrow keys, or the `Tab` key. 
   * The default visual is a rounded rectangle; use templates to customize the highlight's graphic. 
   * The highlight item setting does not trigger diagram layout or scrolling, so it is near-instant.
   * It is designed to synchronize mouse moves over diagram nodes with other collection controls or UI elements.
   * The component triggers  the `onHighlightChanging` and `onHighlightChanged` events on highlight changes.
   * Set it to `null` to hide the highlight of the diagram.
   * 
   * @type {string}
   */
  this.highlightItem = null;

  /**
   * The highlight gravity radius controls distance to the nearest marker to trigger the highlight setting
   * and callout annotation. For the templated nodes, it is required for the mouse to be inside the node's
   * bounding rectangle to activate the highlight setting. It can be problematic to put the mouse precisely
   * over the marker. The gravity radius helps to overcome that issue, but at the same time, it can be a source
   * of performance if the component gets too many markers within the scope of the gravity radius.
   * Please, keep this in mind and don't make it too big. It is crucial when the diagram has
   * over 5 thousand nodes in the hierarchy.
   * 
   * @type {number}
   */
  this.highlightGravityRadius = 40;

  /**
   * The selected items collection property allows the end-user to choose multiple nodes in the diagram.
   * It is a collection of ids of checked nodes. The selected items impact the diagram layout and navigation
   * process since they are always shown in the expanded templated form. So it also helps users pin nodes while they browse in the diagram.
   * The control notifies about the user changes in this collection with the `onSelectionChanging` and the `onSelectionChanged` events.
   * 
   * @type {string[]}
   */
  this.selectedItems = [];

  /**
  * The selection checkboxes are built-in UI elements managing the `selectedItems` collection property. 
  * `Auto` - visible for cursor item only
  * `True` - visible
  * `False` - hidden
  * 
  * Adding a custom checkbox element to the item template requires its name to be `checkbox`,
  * so the control can use it the same way as the built-in checkbox element.
  * 
  * @type {Enabled}
  */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * The checkbox label. See `hasSelectorCheckbox` and `selectedItems` properties.
   * 
   * @group Templates
   * @type {string}
   */
  this.selectCheckBoxLabel = "Selected";

  /**
   * The selection path mode property makes all parents of the cursor item up to the root nodes
   * to be shown with templates. It is a complimentary feature to the auto-fit mode of the
   * diagram. See the `pageFitMode` for more details.
   * 
   *
   * @group Auto Layout
   * @type {SelectionPathMode}
   */
  this.selectionPathMode = SelectionPathMode.None;

  /**
   * The neighbors selection method defines how many neighbors are selected around the cursor.
   * 
   * @type {NeighboursSelectionMode}
   */
  this.neighboursSelectionMode = NeighboursSelectionMode.ParentsAndChildren;

  /**
   * The show frame controls the visibility of decorating frame around the diagram.
   * The frame displays markers for selected nodes in the chart when they are outside
   * the screen and not visible to the end-user.
   * 
   * @group Frame
   * @type {boolean}
   */
  this.showFrame = false;

  /**
   * The frame's inner padding adds extra padding around markers on the inner side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameInnerPadding = new Thickness(2, 2, 2, 2);

  /**
   * The frame's outer padding adds extra padding around markers on the outer side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameOuterPadding = new Thickness(2, 2, 2, 2);

  /**
   * The diagram padding adds extra padding around the diagram nodes.
   * 
   * @group Frame
   * @type {Thickness}
  */
  this.padding = new Thickness(10, 10, 10, 10);

  /**
   * The templates property is a collection of uniquely named templates objects used
   * to customize nodes size, interactivity, and visuals for content, cursor, and highlight.
   * By default, the control provides templates for all types of visual elements.
   * So to start experimenting with the Basic Primitives library, you don't need to define any templates.
   * 
   * @group Templates
   * @type {TemplateConfig[]}
   */
  this.templates = [];

  /**
   * The default template name property allows overriding the default template for all nodes
   * without setting the template name individually per node. See the `templates` property for mode details.
   * To customize the template per node, see the `templateName` property of the `FamItemConfig`.
   * 
   * @group Templates
   * @type {string}
   */
  this.defaultTemplateName = null;

  /**
   * The default label annotation template sets the template's name used to
   * render label annotations. Label annotations are labels placed in the layout of the diagram. 
   * 
   * @group Templates
   * @type {string}
   */
  this.defaultLabelAnnotationTemplate = null;

  /**
   * The button visibility is a legacy property. The only reason it is still available on the components API
   * is the lack of consistent support of the mouse transparency across browsers.
   * The buttons panel is placed over all other visuals in the diagram,
   * so they are not obstructed by the connector and shape annotations. 
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
   * The event property is used to render the content of the buttons panel.
   *
   * @callback
   * @param {EventArgs} data Context information
   */
  this.onButtonsRender = null;

  /**
   * This callback function is called before the `onHighlightChanged` event.
   * See the `highlightItem` property. Use this event to modify diagram elements
   * not affecting diagram layout. For example, on-screen connector annotations
   * added in this event handler to the diagram configuration would be rendered
   * together with highlight. Use properties of this event to stop event propagation 
   * and the following diagram layout and rendering if needed.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onHighlightChanging = null;

  /**
   * The on highlight changed event. See `highlightItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onHighlightChanged = null;

  /**
   * This callback function is called before the `onCursorChanged` event. 
   * See the `cursorItem` property. Use properties of this event to stop event propagation 
   * and the following diagram layout and rendering if needed.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanging = null;

  /**
   * The on cursor item changed event. See `cursorItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanged = null;

  /**
   * The on selected items being changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanging = null;

  /**
   * The on selected items changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanged = null;

  /**
   * The on content button click event is a legacy property.
   * To use it, buttons in the buttons panel in the item template should have the `data-buttonname` property set.
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
   * The on item render callback function is used to populate the content of templated
   * nodes in the diagram. It is called for user templates only. The callback references
   * the DOM element and the node configuration object. The control reuses existing DOM elements,
   * so the application should update the entire content of the template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onItemRender = null;

  /**
   * The on highlight render callback function is used to update the highlight visual content having a custom template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onHighlightRender = null;

  /**
   * The on cursor render callback function is used to update the cursor visual content having a custom template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onCursorRender = null;

  /**
   * The normal level shift sets spacing between rows of templated nodes.
   * 
   * @group Intervals
   * @type {number}
   */
  this.normalLevelShift = 20;

  /**
   * The dot level shift property sets the spacing between rows of markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotLevelShift = 20;

  /**
   * The lines level shift property sets the spacing between rows
   * having only connection lines. Nodes are hidden completely.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineLevelShift = 10;

  /**
   * The normal items interval property sets the spacing between templated nodes.
   * 
   * @group Intervals
   * @type {number}
   */
  this.normalItemsInterval = 10;

  /**
   * The dotted items interval property sets the spacing between markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotItemsInterval = 1;

  /**
   * The line items interval property sets the spacing between lines.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineItemsInterval = 2;

  /**
   * The cousins interval multiplier property adds extra space between branches of the hierarchy.
   * For example, if the multiplier equals five, nodes of the same parent will have interval 20,
   * and nodes of two different parents will have interval 100.
   * 
   * @group Intervals
   * @type {number}
   */
  this.cousinsIntervalMultiplier = 5;

  /**
   * The first choice title color. The component has two properties for the title color to automatically select
   * the one having the highest contract for the node's background-color
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleFirstFontColor = Colors.White;

  /**
   * The second choice title color.
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleSecondFontColor = Colors.Navy;

  /**
   * The markers shape type property sets the default marker shape for nodes.
   * It is possible to set it individually for every node or in the item template.
   * By default color of the marker is equal to the `itemTitleColor` property set for individual items. 
   * 
   * @group Templates
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = ShapeType.None;

  /**
   * The color of the relations lines
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.linesColor = Colors.Silver;

  /**
   * The line width of the relations lines
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.linesWidth = 1;

  /**
   * The line style of the relations lines
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.linesType = LineType.Solid;

  /**
   * The property shows connection lines between the cursor item and its neighbors highlighted.
   * See the `neighboursSelectionMode` and `highlightLinesColor`, `highlightLinesWidth`
   * and `highlightLinesType` to style highlighted lines.
   * 
   * @group Relation Lines
   * @type {boolean}
   */
  this.showNeigboursConnectorsHighlighted = false;

  /**
   * The color of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.highlightLinesColor = Colors.Red;

  /**
   * The line width of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.highlightLinesWidth = 1;

  /**
   * The line style of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.highlightLinesType = LineType.Solid;

  /**
   * The lines palette collection contains lines styles for rendering relations across the family hierarchy.
   * The multi-parent diagram may have a lot of parallel lines, so to make their visual tracing easier,
   * the component supports multiple line styles and evenly distributes them. It is a similar 
   * approach as for visualization of regular line charts. If we have numerous lines in the chart area,
   * it makes sense to style every line individually. 
   * 
   * If this collection is empty then default `linesColor`, `linesWidth` and `linesType` are used for all connector lines.
   * 
   * @group Relation Lines
   * @type {PaletteItemConfig[]}
   */
  this.linesPalette = [];

  /**
   * The show callout property enables on mouse over node callout for the diagram.
   * 
   * @group Callout
   * @type {boolean}
   */
  this.showCallout = true;

  /**
   * The callout maximum visibility property enables callout 
   * for the diagram nodes having specified visibility. See the `pageFitMode` property.
   * 
   * @group Callout
   * @type {Visibility}
   */
  this.calloutMaximumVisibility = Visibility.Dot;

  /**
   * The callout annotation placement offset sets how far the callout rectangle is offset from the marker it is displayed for.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutPlacementOffset = 100;

  /**
   * The callout default template name. Templates are HTML fragments used to render diagram nodes.
   * They are defined with named configuration objects. See the `templates` property for more details.
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
   * The size of the button panel
   * 
   * @group Templates
   * @type {number}
   */
  this.buttonsPanelSize = 28;

  /**
   * The size of the group title
   * 
   * @group Group Titles
   * @type {number}
   */
  this.groupTitlePanelSize = 24;

  /**
   * The size of the selection checkbox
   * 
   * @group Templates
   * @type {number}
   */
  this.checkBoxPanelSize = 24;

  /**
   * The group titles placement property sets left to right or right to left alignment
   * for group title and buttons panel relative to the node. 
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
   * The group titles vertical alignment property sets text vertical alignment inside the group title panel.
   * 
   * @group Group Titles
   * @type {VerticalAlignmentType}
   */
  this.groupTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The group titles horizontal alignment property sets text horizontal alignment inside the group title panel.
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
    * On group title render event. This callback function renders the group title panel.
    * It overwrites the default group title renderer. It is called only when the group title is visible.
    * See other group title options for details.
    *
    * @group Group Titles
    * @callback
    * @param {EventArgs} data Context information
    */
  this.onGroupTitleRender = null;

  /**
   * The panel size of the level annotation titles
   * 
   * @group Level Titles
   * @type {number}
   */
  this.levelTitlePanelSize = 24;

  /**
   * The panel placement of the level annotation titles
   * 
   * @group Level Titles
   * @type {AdviserPlacementType}
   */
  this.levelTitlePlacementType = AdviserPlacementType.Left;

  /**
   * If this property is true, level titles are placed inside the diagram's viewport above or below diagram nodes.
   * 
   * @group Level Titles
   * @type {boolean}
   */
  this.levelTitlePlaceInside = false;

  /**
   * The level annotation titles orientation.
   * 
   * @group Level Titles
   * @type {TextOrientationType}
   */
  this.levelTitleOrientation = TextOrientationType.Auto;

  /**
   * The level annotation titles vertical alignment.
   * 
   * @group Level Titles
   * @type {VerticalAlignmentType}
   */
  this.levelTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The level annotation titles horizontal alignment.
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
   * The level title callback function allows rendering custom content in the level annotation title panel.
   * It is called only for the visible level annotations. See other level annotation options for details.
    *
    * @group Level Titles
    * @callback
    * @param {EventArgs} data Context information
    */
  this.onLevelTitleRender = null;

  /**
   * The level background callback function allows rendering custom content in the level annotation background panel.
   * It is called only for the visible level annotations. See other level annotation options for details.
    *
    * @group Level Titles
    * @callback
    * @param {EventArgs} data Context information
    */
  this.onLevelBackgroundRender = null;

  /**
   * The endpoints rendering callback function allows rendering custom content for connection annotation endpoints.
   *
   * @group Endpoints
   * @callback
   * @param {EventArgs} data Context information
   */
  this.onEndPointRender = null;

  /**
   * Show connector annotation endpoints property sets their visibility for the entire diagram.
   * Customize them with drag placeholders to implement connector annotation placement using mouse drag & drop operations.
   *
   * Auto - only connector annotations linked to cursor node have endpoints visible
   * True - always visible
   * False - hidden
   *
   * @group Endpoints
   * @type {Enabled}
   */
  this.showEndPoints = Enabled.False;

  /**
   * Annotations endpoints size
   *
   * @group Endpoints
   * @type {Size}
   */
  this.endPointSize = new Size(8, 8);

  /**
   * Annotations endpoints corner radius.
   *
   * @group Endpoints
   * @type {number}
   */
  this.endPointCornerRadius = 4;

  /**
   * Annotations endpoints fill color.
   *
   * @group Endpoints
   * @type {string}
   */
  this.endPointFillColor = "#000080";

  /**
   * Annotations endpoints opacity
   *
   * @group Endpoints
   * @type {number}
   */
  this.endPointOpacity = 0.5;

  /**
   * @ignore
   */
  this.distance = 3;

  /**
   * The scale property sets the CSS scale-transform property for the diagram content. 
   * 
   * @type {number}
   */
  this.scale = 1;

  /**
   * Minimum scale
   * 
   * @ignore
   */
  this.minimumScale = 0.5;

  /**
   * Maximum scale
   * 
   * @ignore
   */
  this.maximumScale = 1;

  /**
   * The show label property sets labels visibility for individual nodes.
   * The control displays label only for node markers. The control does not
   * preserve space for labels in the diagram layout. The application's
   * responsibility is to set intervals between nodes to fit labels.
   * Use controls `dotLevelShift`, `dotItemsInterval` and `padding` properties to preserve
   * space between nodes for labels. Labels are displayed inside `div's of
   * the fixed size, see the `labelSize` property, and the control provides
   * simple conflict resolution to avoid displaying overlapping labels.
   * If two labels overlap with their bounding rectangles,
   * then only one of them will stay visible. 
   * 
   * Auto - avoid labels overlapping, hide some of them
   * True - visible
   * False - hidden.
   * 
   * @group Labels
   * @type {Enabled}
   */
  this.showLabels = Enabled.Auto;

  /**
   * The label size property defines the label's placeholder `div` size,
   * which impacts conflict resolution if labels overlap.
   * 
   * @group Labels
   * @type {Size}
   */
  this.labelSize = new Size(80, 24);

  /**
   * The label offset property sets the distance from the markers bounding rectangles.
   * 
   * @group Labels
   * @type {number}
   */
  this.labelOffset = 1;

  /**
   * Label orientation defines label rotation.
   * 
   * @group Labels
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Horizontal;

  /**
   * Label placement sets label placement around the marker.
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
   * The enable panning property enables chart panning with mouse drag for
   * desktop browsers. Disable it if you need to support items Drag & Drop.
   * 
   * @type {boolean}
   */
  this.enablePanning = true;

  /**
   * Sets minimum size, the diagram can shrink itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMinimum = new Size(800, 600);

  /**
   * Sets maximum size, the diagram can expand itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMaximum = new Size(1024, 768);
};
