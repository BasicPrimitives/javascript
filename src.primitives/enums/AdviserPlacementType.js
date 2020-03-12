/**
 * @typedef {number} AdviserPlacementType
 **/


/**
 * Defines leftward or rightward item placement relative to the referenced item.
 * In case of assitants and advisers the referenced item is their imediate parent.
 * In case of family diagram the referenced item is spouse or sibling in the row. 
 *  
 * @enum {AdviserPlacementType}
 */
primitives.common.AdviserPlacementType = {
  /**
   * Auto select by layout manager
   */
  Auto: 0,
  /**
   * Left side
   */
  Left: 2,
  /**
   * Right side
   */
  Right: 3
};

primitives.orgdiagram.AdviserPlacementType = primitives.common.AdviserPlacementType;