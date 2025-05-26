import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import {AnnotationType, LineType, Colors, ZOrderType, ConnectorShapeType,
  ConnectorPlacementType, ConnectorLabelPlacementType, Enabled} from '../enums';
/**
 * @class ConnectorAnnotationConfig
 * @classdesc Connector annotations draw lines between two nodes of the diagram. 
 * They are drawn on top of the existing diagram layout, and they don't impact 
 * nodes placement. So it is the user's responsibility to preserve space between nodes for them. 
 *
 * @param {object} arg0 Object properties.
 */
export default function ConnectorAnnotationConfig(arg0, arg1) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Connector;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Foreground;

  /**
   * The start node of the connection line
   * 
   * @type {string}
   */
  this.fromItem = null;

  /**
   * The end node of the connection line
   * 
   * @type {string}
   */
  this.toItem = null;

  /**
   * Connector shape type defines the number of lines and arrows at their ends
   * drawn between nodes of the connector annotation. This feature, combined 
   * with conflict resolution, places overlapping annotations in parallel.
   * It gives you complete flexibility over variations of possible connector
   * lines between two given diagram nodes.
   * 
   * @type {ConnectorShapeType}
   */
  this.connectorShapeType = ConnectorShapeType.OneWay;

  /**
   * The connector placement type defines how the component traces the connector
   * line over the diagram nodes. The `Straight` is a direct line connecting two
   * nodes. The`Offbeat` style is designed to dynamically tune connector line
   * placement depending on the relative position of nodes and the gap between them.
   * It uses free-hand line style drawing going from start to the end node.
   * Since every diagram is packed with various connection lines, this annotation
   * placement style is deliberately made not straight so that it can be
   * noticeable on top of other diagram lines.
   * 
   * @type {ConnectorPlacementType}
   */
  this.connectorPlacementType = ConnectorPlacementType.Offbeat;

  /**
   * Label placement relative to connector annotation. Connector annotation is
   * bound and drawn between two nodes defined by the `fromItem` and the `toItem`
   * properties. The component places the label along the connector line close
   * to the start, the end nodes, or between them. 
   * 
   * @type {ConnectorLabelPlacementType}
   */
  this.labelPlacementType = ConnectorLabelPlacementType.Between;

  /**
   * Connection lines start from the margin of the node's rectangle. If the offset is positive,
   * the connection line has a gap between its endpoints and the node's rectangles.
   * If it is negative, the connection line overlaps the node's rectangle and starts from inside them.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * Border line width.
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Color
   * 
   * @type {string}
   */
  this.color = Colors.Black;

  /**
   * Line pattern
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = true;

  /**
   * Label. Label styled with "bp-connector-label" css class.
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * 
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  /**
   * Show connector annotation from endpoint
   *
   * Auto - depends on the entire diagram configuration options
   * True - always visible
   * False - always hidden
   *
   * @group Endpoints
   * @type {Enabled}
   */
  this.showFromEndpoint = Enabled.Auto;

  /**
   * Show connector annotation to endpoint
   *
   * Auto - depends on the entire diagram configuration options
   * True - always visible
   * False - always hidden
   *
   * @group Endpoints
   * @type {Enabled}
   */
  this.showToEndpoint = Enabled.Auto;

  /**
   * Context object
   *
   * @group Template
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 2:
      this.fromItem = arg0;
      this.toItem = arg1;
      break;
  }
};
