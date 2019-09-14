/**
 * @typedef {number} NavigationMode
 **/

/**
 * Interactivity mode. Control implements standard behaivour of classic desktop UI controls. It supports single selected node - cursor.
 * It supports on mouse over node visual feedback - highlight. It supports selection of group of nodes - selected items. 
 * All that functionality can be disabled depending on your application requirements.
 *  
 * @enum {NavigationMode}
 */
primitives.common.NavigationMode = {
  /**
   * Everything is on.
   */
  Default: 0,
  /**
   * Cursor selection only without highlight. 
   */
  CursorOnly: 1,
  /**
   * Mouse over feedback only
   */
  HighlightOnly: 3,
  /**
   * No interactivity
   */
  Inactive: 2
};