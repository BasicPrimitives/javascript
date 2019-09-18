/**
 * @typedef {number} RenderingMode
 **/

/**
 * This enumeration is used to tell rendering callback functions current state of the template.
 * It is needed for proper events binding and content updates.
 *
 * @enum {RenderingMode}
 */
primitives.common.RenderingMode = {
  /**
   * Template is just created.
   */
  Create: 0,
  /**
   * Template is reused and update is needed.
   */
  Update: 1
};