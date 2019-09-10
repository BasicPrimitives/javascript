/**
 * @typedef {number} ConnectorPlacementType
 **/


/**
 * Connector placement type defines style of connector line drawing over diagram layout. It supports two options: 
 * the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation
 * drawing over diagram, the second style is called `Offbeat` and it design to dynamically adopt to nodes mutual 
 * location and gap between them. It uses free hand line style drawing going from start to the end nodes. Since every diagram 
 * is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be 
 * noticeable on top of other lines of the diagram.
 *
 * @enum {ConnectorPlacementType}
 */
primitives.common.ConnectorPlacementType = {
  /**
   * Places connector annotation in the way that it does not overlap underlying diagram connector lines.
   * If nodes are close to each other and gap between them cannot fit annotation, then 
   * it will be drawn on the side of the nodes, so it will have enough space for arrow and label.
   */
  Offbeat: 0,
  /**
   * Straight line annotation between nodes. This annotation mode provides basic conflict resolution between annotations
   * overlapping each other. If two or more straight annotations overlap each other then layout engine will 
   * add extra offset to them, so they will be drawn in parallel to each other.
   */
  Straight: 1
};