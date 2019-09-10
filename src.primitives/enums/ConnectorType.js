/**
 * @typedef {number} ConnectorType
 **/

/**
 * Connection lines style. This option is only applicable to nodes minimized to markers or lines.
 * Full size nodes are always connected with squared connection lines
 *  
 * @enum {ConnectorType}
 */
primitives.common.ConnectorType = {
  /**
   * Orthogonal connection lines
   */
  Squared: 0,
  /**
   * Angular direct node to node connection lines
   */
  Angular: 1,
  /**
   * Curved direct node to node connection lines
   */
  Curved: 2
};

primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;