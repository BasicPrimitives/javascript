/**
 * @typedef {number} UpdateMode
 **/

/**
 * Controls update of the diagram
 *
 * @enum {UpdateMode}
 */
primitives.common.UpdateMode = {
  /**
   * Forces control to make a full chart redraw. It is equivalent to initial chart creation. 
   * It removes everything from placeholder and renders all elements again.
   */
  Recreate: 0,
  /**
   * Optimized refresh. It only updates visual elements which needs to be updated.
   */
  Refresh: 1,
  /**
   * Updates highlight position only
   */
  PositonHighlight: 2
};

primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;