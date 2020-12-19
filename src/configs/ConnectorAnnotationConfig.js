import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import {AnnotationType, LineType, Colors, ZOrderType, ConnectorShapeType,
  ConnectorPlacementType, ConnectorLabelPlacementType } from '../enums';
/**
 * @class ConnectorAnnotationConfig
 * @classdesc  Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram.
 * They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to
 * preserve space between nodes for them. 
 *
 * @param {object} arg0 Object properties.
 */
export default function ConnectorAnnotationConfig(arg0, arg1) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distinguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Connector;

  /**
   * Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes then you block mouse events of UI elements in their templates.
   * Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item
   * templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top
   * of other visual elements. The control takes this into account and renders buttons panel on top of everything,
   * so they are never blocked by annotations drawn in front of diagram nodes.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Foreground;

  /**
   * The start node of connection line
   * 
   * @type {string}
   */
  this.fromItem = null;

  /**
   * The end node of connection line
   * 
   * @type {string}
   */
  this.toItem = null;

  /**
   * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
   * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
   * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
   * 
   * @type {ConnectorShapeType}
   */
  this.connectorShapeType = ConnectorShapeType.OneWay;

  /**
   * Connector placement type defines style of connector line drawing over diagram layout. It supports two options: 
   * the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation
   * drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual 
   * location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram 
   * is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be 
   * noticeable on top of other lines of the diagram.
   * 
   * @type {ConnectorPlacementType}
   */
  this.connectorPlacementType = ConnectorPlacementType.Offbeat;

  /**
   * Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes
   * defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them
   * along the connector line. 
   * 
   * @type {ConnectorLabelPlacementType}
   */
  this.labelPlacementType = ConnectorLabelPlacementType.Between;

  /**
   * Connector line end points offset. By default connection lines start from the margin of the node's rectangle.
   * If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle.
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
   * If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space.
   * @type {boolean}
   */
  this.selectItems = true;

  /**
   * Label. Label styled with css class name "bp-connector-label".
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

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
