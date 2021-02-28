import {Enabled, ShapeType, AdviserPlacementType, TextOrientationType, PlacementType, Colors } from '../enums';

/**
 * @class FamItemConfig
 * @classdesc Item Configuration Object defines properties of individual node in the family chart hierarchy. See `items` collection property
 * of family control configuration object. 
 * 
 * @param {FamItemConfig} arg0 Item config properties
 * 
 * @param {string} arg0 Item id
 * @param {string[]|undefined} arg1 Parents ids
 * @param {string} arg2 Title
 * @param {string} arg3 Description 
 * @param {string} arg4 Image
 */
export default function FamItemConfig(arg0, arg1, arg2, arg3, arg4) {
  var property;
  /**
   * Item id. It should be unique per chart.
   * 
   * @type {string}
   */
  this.id = null;

  /**
   * Parents items ids. If this collection is empty then item considered as a root item.
   * @type {string[]}
   */
  this.parents = [];

  /**
   * Relative item id. This property is used to control items mutual placement in order to keep consistent ordering within levels. Relative item is used 
   * for placing given item in diagram. We can place item on left or right side of relative item via setting placementType type property.
   * In case when multiple items use the same relative item then their order can be customized with position property.
   * 
   * If this property set to null, family layout algorithm will try to choose elements order via placing connected 
   * nodes as close to each other as possible.
   * 
   * @group Order
   * @type {string}
   */
  this.relativeItem = null;

  /**
   * Relative placement type defines Left ot Right side placement of the node relative to the `relativeItem`.
   * 
   * @group Order
   * @type {AdviserPlacementType}
   */
  this.placementType = AdviserPlacementType.Right;

  /**
   * Relative position defines order of elements placed relative to the same relative item on the same side.
   * 
   * @group Order
   * @type {number}
   */
  this.position = null;

  /**
   * Primary parents id. Set this property to place item close to the selected primary parent in `parents` collection.
   * If property set to null or referenced parent does not exists then this property is ignored.
   * 
   * @group Order
   * @type {string}
   */
  this.primaryParent = null;

  /**
   * Title
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
   * Image
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
   * Title background color. The same color is used for node marker when control has enabled auto fit mode.
   * 
   * @group Template
   * @type {string}
   */
  this.itemTitleColor = Colors.RoyalBlue;

  /**
   * Marker type. The shape of the marker when node is minimized by auto fit. The control supports auto fit of diagram into available screen space.
   * When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic,
   * so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
   * So this option sets marker shape for individual node.
   * 
   * @group Template
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = null;

  /**
   * Group Title. The group title on the side of the diagram node is one of controls default easy to use features.
   * It gives extra dimension for nodes visual grouping in the diagram.
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
   * Matrix id defines grouping of multiple nodes into individual matrixes. By default all applicable nodes grouped into a single matrix.
   * Use this property to split nodes into multiple matrixes.
   * 
   * @type {string}
   */
  this.matrixId = null;

  /**
   * Add to matrix property allows node to be grouped with other nodes into matrix. It is true by default.
   * 
   * @type {boolean}
   */
  this.addToMatrix = true;

  /**
   * If true it makes item inactive in the diagram layout. Inactive items are regular items excluded from navigation, that means 
   * when diagram uses auto fit mode, selection of the neighboring nodes goes through inactive items, so all nodes next to inactive item
   * become selected and shown in full size as well. Inactive items play a role of in layout annotations having no user interaction
   * and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items
   * indicating that upon reaching them diagram would load extra nodes into layout.
   * 
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * Shows selection check box for the node.
   * If Auto then selection check box visibility depends on control's configuration.
   * 
   * Auto - depends on `hasSelectorCheckbox` property of the control
   * True - shown
   * False - hidden
   * 
   * @type {Enabled}
   */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * Shows context buttons panel for the node.
   * If Auto then context buttons panel visibility depends on control's configuration.
   * 
   * Auto - depends on `hasButtons` property of the control
   * True - shown
   * False - hidden
   * 
   * @group Template
   * @type {Enabled}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * Template name. Templates are HTML fragments containing layout and styles used to render diagram nodes.
   * They are defined with a named configuration objects. See `templates` property of control's configuration object.
   * This option lets individually assign rendering template per individual node of the diagram.
   * 
   * @group Template
   * @type {string}
   */
  this.templateName = null;

  /**
   * Sets callout annotation visibility for individual node. The callout annotation is one of easy to use features of the control.
   * By default it is displayed for markers in order to preview their node's content. The content is displayed using
   * current template of the node it is rendered for.
   * 
   * The callout can be forced to be displayed for regular nodes as well. In that case use `calloutTemplateName` property
   * to change their template.
   * 
   * Auto - depends on `showCallout` property of the control
   * True - shown regardless of node's visibility
   * False - hidden
   * 
   * @group Callout
   * @type {Enabled}
   */
  this.showCallout = Enabled.Auto;

  /**
   * Callout annotation template name. This option lets individually assign rendering callout annotation template
   * per individual node of the diagram.
   * 
   * Templates are HTML fragments containing layout and styles used to render diagram nodes.
   * They are defined with a named configuration objects. See `templates` property of control's configuration object.
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
   * Sets label visibility for individual nodes. Labels are only rendered for a node's markers. 
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
   * @group Label
   * @type {Enabled}
   */
  this.showLabel = Enabled.Auto;

  /**
   * Label size. Sets label's placeholder `div` size and controls conflict resolution if labels overlap each other.
   * If `null` then it is set to `labelSize` property of the control configuration.
   * 
   * @group Label
   * @type {Size}
   */
  this.labelSize = null;

  /**
   * Label orientation.
   * If `Auto` then it is set to `labelOrientation` property of the control configuration.
   * 
   * @group Label
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Auto;

  /**
   * Label placement. Sets label placement relative to the marker bounding rectangle.
   * If `Auto` then it is set to `labelPlacement` of the control configuration.
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
      this.parents = arg1;
      this.title = arg2;
      this.description = arg3;
      this.image = arg4;
      break;
  }
};
