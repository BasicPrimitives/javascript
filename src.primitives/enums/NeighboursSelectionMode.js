/**
 * @typedef {number} NavigationMode
 **/

/**
 * Neighbors selection mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other as markers.
 *
 * This enumeration controls visibility of neighbours of the cursor node in the auto fit mode. It allows to draw 
 * them in full size regardless of available space.
 *
 * @enum {NavigationMode}
 */
primitives.common.NeighboursSelectionMode = {
  /**
   * Selects parents and children of the cursor item
   */
  ParentsAndChildren: 0,
  /**
   * Selects parents, children, spouses and siblings of the cursor item.
   */
  ParentsChildrenSiblingsAndSpouses: 1
};

