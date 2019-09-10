/**
 * @typedef {number} TextOrientationType
 **/

/**
 * Text rotation
 *  
 * @enum {TextOrientationType}
 */
primitives.text.TextOrientationType = {
  /**
   * Regular horizontal text
   */
  Horizontal: 0,
  /**
   * Rotate text left for 90 degree.
   */
  RotateLeft: 1,
  /**
   * Rotate text right for 90 degree.
   */
  RotateRight: 2,
  /**
   * Depends on other options.
   */
  Auto: 3
};