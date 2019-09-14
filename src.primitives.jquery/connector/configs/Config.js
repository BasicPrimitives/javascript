/**
 * @class primitives.connector.Config
 * 
 * Connector configuration object
 */
primitives.connector.Config = function () {
  this.classPrefix = "bpconnector";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = primitives.common.OrientationType.Top;

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
  this.connectorPlacementType = primitives.common.ConnectorPlacementType.Offbeat;

  /**
   * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
   * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
   * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
   * 
   * @type {ConnectorShapeType}
   */
  this.connectorShapeType = primitives.common.ConnectorShapeType.OneWay;

  /**
   * Defines connectors starting rectangle position. 
   * 
   * @type {Rect}
   */
  this.fromRectangle = null;

  /**
   * Defines connectors ending rectangle position. 
   * 
   * @type {Rect}
   */
  this.toRectangle = null;


  /**
   * Connector line end points offset. By default connection lines start from the margin of the node's rectangle.
   * If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle.
   * 
   * @type {Thickness}
   */
  this.offset = new primitives.common.Thickness(0, 0, 0, 0);

  /**
   * Connector line width
   * 
   * @type {number}
   */
  this.lineWidth = 3;

  /**
   * Connector line color
   * 
   * @type {string}
   */
  this.color = primitives.common.Colors.Black;

  /**
   * Connector line pattern
   * 
   * @type {string}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Annotation label text. Label styled with css class name "bp-connector-label".
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size. It is used to position label without overlapping connected items.
   * 
   * @type {Size}
   */
  this.labelSize = new primitives.common.Size(60, 30);

  /**
   * Sets conector label placement relative to connection line end points. Label can be placed between
   * rectangles along connector line or close to one of them.
   * 
   * @type {ConnectorLabelPlacementType}
   */
  this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
};