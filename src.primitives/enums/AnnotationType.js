/**
 * @typedef {number} AnnotationType
 **/


/**
 * Defines type of on-screen and in-layout annotation object. Annotations are geometrical 
 * figures drawn around or bound to existing nodes of the diagram.
 *
 * @enum {AnnotationType}
 */
primitives.common.AnnotationType = {
  /**
   * Connector lines between two nodes of the diagram. They are drawn on top of existing
   * diagram layout and they don't affect nodes placement. So it is users responsibility to
   * prserve space between nodes for them.
   */
  Connector: 0,
  /**
   * Shape annotation is a possibility to draw some geometrical
   * shapes over several nodes of the diagram. 
   */
  Shape: 1,
  /**
   * Highlight path annotation traces path between given sequence of nodes 
   * over existing connector lines in the diagram.
   */
  HighlightPath: 2,
  /**
   * In-layout label annotation. Label anntations are placed in layout between nodes,
   * they preserve space between nodes, so they don't overlap neighbouring nodes.
   * Label annotations are designed for autoplacement and bundling of connection lines between 
   * nodes when needed.
   */
  Label: 3,
  /**
   * Background annotation highlights nodes via drawing rectangular shape in background.
   * If shapes overlap the same style neighbouring shapes they are merged into one continuous shape. 
   */
  Background: 4
};