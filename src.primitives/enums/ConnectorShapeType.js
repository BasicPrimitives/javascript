/**
 * @typedef {number} ConnectorShapeType
 **/


/**
 * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
 * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
 * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
 *
 * @enum {ConnectorShapeType}
 */
primitives.common.ConnectorShapeType = {
  /**
   * Single line with one arrow
   */
  OneWay: 0,
  /**
   * Two parallel lines with single arrows
   */
  TwoWay: 1,
  /**
   * Single line with 2 arrows.
   */
  BothWay: 2
};