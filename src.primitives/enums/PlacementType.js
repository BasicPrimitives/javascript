/**
 * @typedef {number} PlacementType
 **/


/**
 * Defines element placement relative to rectangular area it is bound to.
 *  
 * @enum {PlacementType}
 */
primitives.common.PlacementType = {
  /**
   * Defined by other control options.
   */
  Auto: 0,
  TopLeft: 8,
  Top: 1,
  TopRight: 2,
  RightTop: 11,
  Right: 3,
  RightBottom: 12,
  BottomRight: 4,
  Bottom: 5,
  BottomLeft: 6,
  LeftBottom: 10,
  Left: 7,
  LeftTop: 9
};