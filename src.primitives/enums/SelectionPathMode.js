/**
 * @typedef {number} SelectionPathMode
 **/

/**
 * Selection path mode. This enumeration controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw 
 * them in full size regardless of available space and auto fit mode.
 * 
 * The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other diagram nodes as markers.
 *
 * @enum {SelectionPathMode}
 */
primitives.common.SelectionPathMode = {
  /**
   * No selection path
   */
  None: 0,
  /**
   * Selects cursor node parents up to the root are renders them full size regardless of available space.
   */
  FullStack: 1
};

primitives.orgdiagram.SelectionPathMode = primitives.common.SelectionPathMode;