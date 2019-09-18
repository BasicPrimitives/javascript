/**
 * @typedef {number} ChildrenPlacementType
 **/


/**
 * Defines shape of children formation. By default a node's children are always placed in a horizontal line 
 * below the parent node. On a large scale this may result in the end user having to scroll screens 
 * in order to view all of the nodes. To compensate for this, we provide the option of placing all 
 * of the children of a parent node in a sqaure/matrix formation. This will reduce sideways screen 
 * scrolling by compacting the child nodes into a much smaller area on the screen.
 *  
 * @enum {ChildrenPlacementType}
 */
primitives.common.ChildrenPlacementType = {
  /**
   * Auto. This mode lets you set children layout at the component level
   * and then redefine it for individual nodes if needed.
   */
  Auto: 0,
  /**
   * Children placed in vertical column
   */
  Vertical: 1,
  /**
   * Horizontal children layout
   */
  Horizontal: 2,
  /**
   * Matrix formation of the children
   */
  Matrix: 3
};

primitives.orgdiagram.ChildrenPlacementType = primitives.common.ChildrenPlacementType;