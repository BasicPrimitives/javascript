/**
 * @typedef {number} ElbowType
 **/

/**
 * Elbow style of connection lines
 *  
 * @enum {ElbowType}
 */
primitives.common.ElbowType = {
  /**
   * No elbow
   */
  None: 0,
  /**
   * Dot marker at the intersection
   */
  Dot: 1,
  /**
   * Bevel elbow
   */
  Bevel: 2,
  /**
   * Round elbow
   */
  Round: 3
};
