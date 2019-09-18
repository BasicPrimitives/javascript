/**
 * @typedef {number} OrientationType
 **/

/**
 * Controls diagram layout orientation. The control can be rotated in any direction, this is needed for arabic support and various layout.
 *  
 * @enum {OrientationType}
 */
primitives.common.OrientationType = {
  Top: 0,
  Bottom: 1,
  Left: 2,
  Right: 3,
  None: 4
};

primitives.orgdiagram.OrientationType = primitives.common.OrientationType;