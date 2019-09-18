/**
 * @typedef {number} ZOrderType
 **/

/**
 * Option to draw annotation in the foreground or in the backgound of diagram nodes.
 *  
 * @enum {ZOrderType}
 */
primitives.common.ZOrderType = {
  /**
   * Depends on annotation type.
   */
  Auto: 0,
  Background: 1,
  Foreground: 2
};