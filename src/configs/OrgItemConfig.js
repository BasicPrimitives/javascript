import Size from '../graphics/structs/Size';
import { Colors, Enabled, ItemType, AdviserPlacementType, ChildrenPlacementType, TextOrientationType, PlacementType } from '../enums';

/**
 * @class OrgItemConfig
 * @classdesc Organizational chart item configuration object defines properties 
 * of individual nodes in the organizational chart hierarchy. Nodes configurations 
 * populate the `items` collection property of the organizational chart 
 * configuration object used to describe the entire component configuration. 
 * 
 * @param {OrgItemConfig} arg0 Item config properties
 * 
 * @param {string} arg0 Item id
 * @param {string} arg1 Parent id
 * @param {string} arg2 Title
 * @param {string} arg3 Description 
 * @param {string} arg4 Image
 */
export default function OrgItemConfig(arg0, arg1, arg2, arg3, arg4) {
  var property;
  /**
   * Unique item id
   * 
   * @type {string}
   */
  this.id = null;

  /**
   * Parent item id. If `null`, then the node is the root item of the hierarchy.
   * 
   * @type {string}
   */
  this.parent = null;

  /**
   * Title. It is used in the default template.
   * 
   * @group Template
   * @type {string}
   */
  this.title = null;

  /**
   * Description
   * 
   * @group Template
   * @type {string}
   */
  this.description = null;

  /**
   * Image. It is used in the default template.
   * 
   * @group Template
   * @type {string}
   */
  this.image = null;

  /**
   * Context object
   * 
   * @group Template
   * @type {object}
   */
  this.context = null;

  /**
   * Title background color for default template.
   * When the node is displayed in its minimized form, it also sets the marker color. 
   * 
   * @group Template
   * @type {string}
   */
  this.itemTitleColor = Colors.RoyalBlue;

  /**
   * Marker type. The shape of the marker when the node is minimized in the diagram layout.
   * The component is designed for automatic nodes positioning; it optimizes nodes placement
   * and size depending on the available screen space. When the diagram size is significantly
   * larger than the available screen space, its scrolling and navigation become problematic,
   * so control replaces some nodes with markers. That feature has a lot of options for tuning.
   * 
   * @group Template
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = null;

  /**
   * Group Title. The group title is a panel on the side of the node with rotated text inside.
   * It is one of the control's default easy-to-use features.
   * It gives extra dimension for the visual grouping in the diagram.
   * 
   * @group Group Title
   * @type {string}
   */
  this.groupTitle = null;

  /**
   * The group title background color.
   * 
   * @group Group Title
   * @type {string}
   */
  this.groupTitleColor = Colors.RoyalBlue;

  /**
   * If `false`, it makes the item invisible in the layout. If the item has no visible parents,
   * its connections are hidden as well. From the navigation perspective,
   * children of hidden nodes become children of their parents.
   * 
   * @type {boolean}
   */
  this.isVisible = true;

  /**
   * If it is true, it makes the node inactive in the diagram layout.
   * The inactive item is excluded from navigation, which means it is not clickable,
   * and it is impossible to set the cursor to it. Consider the inactive node as an in-layout
   * label or title having a custom item template. It is worth mentioning that it
   * impacts cursor neighbors selection. The component skips the static node
   * and selects its neighbors instead. 
   * 
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * It controls the visibility of the selection check box for the node.
   * The selection checkbox is a default, easy-to-use feature to add and
   * remove nodes to selected items collection. 
   * 
   * Auto - depends on the control's configuration `hasSelectorCheckbox` property setting.
   * True - visible
   * False - hidden
   * 
   * @type {Enabled}
   */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * It controls the visibility of the context buttons panel for the node. 
   * The context buttons panel is a built-in, easy-to-use feature to add
   * interactive UI elements around the cursor node. On-screen annotations
   * do not block context buttons panel as well. 
   * 
   * Auto - depends on the control's configuration `hasButtons` property setting
   * True - visible
   * False - hidden
   * 
   * @group Template
   * @type {Enabled}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * Item type defines child node placement relative to its parent node. 
   * By default, all children of the same parent node are of the same rank and
   * status are aligned below the parent in a horizontal line. However,
   * for exceptional cases where the end-user wishes to have a child separate
   * from the rest of its siblings, we provide custom child types that
   * the end-user can use to place different ranking nodes anywhere around
   * the parent node. These placement options give a lot of space for creating
   * roles such as an Assistant, Adviser, various Partners,
   * and co-heads in the organization.
   * 
   * @type {ItemType}
   */
  this.itemType = ItemType.Regular;

  /**
   * Level offset organizes some node types, like regular children and assistants, into multiple rows.
   * 
   * @type {number}
   */
  this.levelOffset = null;

  /**
   * Adviser placement type sets node placement relative to the parent item
   * on the left or right side of the parent's hierarchy. If it is set to `Auto`,
   * the control's configuration object property is used.
   *  
   * @type {AdviserPlacementType}
   */
  this.adviserPlacementType = AdviserPlacementType.Auto;

  /**
   * The children's placement type sets children's layout formation.
   * Control places children in a horizontal line below the parent node by default.
   * That may result in the end-user having to scroll screens to view many child nodes.
   * Placing children in a square/matrix formation compensates for this.
   * It reduces sideways screen scrolling by compacting the child nodes
   * into a much smaller area on the screen.
   *   
   * @type {ChildrenPlacementType}
   */
  this.childrenPlacementType = ChildrenPlacementType.Auto;

  /**
   * The property sets the placement of assistants hierarchies
   * relative to the regular children of the node. If the assistant
   * node has its children, control adds extra levels, so the assistant's
   * children are placed above the regular children.
   * 
   * @type {Enabled}
   */
  this.placeAssistantsAboveChildren = Enabled.Auto;

  /**
   * The property sets placement of advisers hierarchies relative to the regular 
   * children of the node. If the adviser node has its children, then control adds extra levels,
   * so the adviser's children are placed above the regular children.
   * 
   * @type {Enabled}
   */
  this.placeAdvisersAboveChildren = Enabled.Auto;

  /**
   * Template name lets individually assign rendering templates per individual
   * node of the diagram. Templates contain settings defining node size,
   * interactivity options, and HTML fragments to render nodes.
   * See the organization chart configuration object for the `templates` property.
   * 
   * @group Template
   * @type {string}
   */
  this.templateName = null;

  /**
   * Show callout property sets callout annotation visibility per individual node.
   * The callout annotation is one of the easy-to-use features of the control.
   * It is displayed for markers to preview the node's content. The content is displayed
   * using the current node template it is rendered for. The callout can be forced
   * to be displayed for templated nodes as well. In that case, use the `calloutTemplateName`
   * property to change the callout template.
   * 
   * Auto - depends on the control's configuration `showCallout` property setting
   * True - always visible
   * False - hidden
   * 
   * @group Callout
   * @type {Enabled}
   */
  this.showCallout = Enabled.Auto;

  /**
   * Callout annotation template name redefined default item template used to display
   * the content of the callout annotation. Templates contain size and HTML fragments
   * to display node content. See the `templates` property of the organizational
   * chart control configuration object.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutTemplateName = null;

  /**
   * Marker label.
   * 
   * @group Label
   * @type {string}
   */
  this.label = null;

  /**
   * The `showLabel` property controls the visibility of labels for individual nodes.
   * Labels are shown only for node markers. The control does not reserve space
   * for labels in the diagram layout. It is the application's responsibility
   * to set spacing between nodes to accommodate labels.
   *
   * Use the `dotLevelShift` and `dotItemsInterval` properties to reserve
   * space between nodes for labels. Labels are displayed inside fixed-size `div` elements
   * (see the `labelSize` property). The control includes basic conflict resolution
   * to prevent overlapping labels.
   *
   * If two labels overlap based on their bounding rectangles, only one will be visible.
   *
   * Options:
   *  Auto - Automatically avoid overlapping by hiding some labels
   *  True - Labels are visible
   *  False - Labels are hidden
   *
   * @group Label
   * @type {Enabled}
   */
  this.showLabel = Enabled.Auto;

  /**
   * The label size property defines the label's placeholder `div` size,
   * which impacts conflict resolution if labels overlap. If it is `null`,
   * it uses the `labelSize` property of the control configuration.
   * 
   * @group Label
   * @type {Size}
   */
  this.labelSize = null;

  /**
   * Label orientation defines label rotation. If it is `Auto`,
   * it uses the `labelOrientation` property of the control configuration.
   * 
   * @group Label
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Auto;

  /**
   * Label placement sets label placement around the marker.
   * If it is `Auto`, it uses the `labelPlacement` of the control configuration.
   * 
   * @group Label
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Auto;

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
