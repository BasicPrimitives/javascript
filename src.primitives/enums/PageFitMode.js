/**
 * @typedef {number} PageFitMode
 **/

/**
 * Fits diagram into available screen space. When diagram size significantly larger that available screen space, its scrolling and navigation
 * becomes problematic, so we support automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
 * Control supports several page fit mode options which can match your requirements depending on diagram layout, orientation and number of nodes.
 * 
 * Autosize - this option is opposite to auto fit. It lets you expand control size to fit all diagram nodes full size without scrollbars.
 *  
 * @enum {PageFitMode}
 */
primitives.common.PageFitMode = {
  /**
   * Disabled. All nodes are being rendered using their templates.
   */
  None: 0,
  /**
   * Fits diagram into the view width, so it has no horizontal scrollbar.
   */
  PageWidth: 1,
  /**
   * Fits diagram into the view height, so it has no vertical scrollbar.
   */
  PageHeight: 2,
  /**
   * Fits diagram into the view so it has no scrollbars.
   */
  FitToPage: 3,
  /**
   * This is opposite mode to auto fit. In this mode diagram controls its size, it sets its size to fit all nodes and render them full size using templates.
   */
  AutoSize: 5,
  /**
   * Renders all nodes as markers regardless of available screen space. Control selects and renders full size cursor, its neighbours and selected nodes only.
   * Don't forget to disable selection path as well, so nodes from cursor up to the root are not selected.
   */
  SelectionOnly: 6
};

primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;