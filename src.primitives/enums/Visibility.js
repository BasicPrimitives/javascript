/**
 * @typedef {number} Visibility
 **/


/**
 * Minimal nodes visibility in the diagram. If auto fit of diagram into current page size is enabled, then
 * this option controls minimum allowed size of diagram nodes.
 *  
 * @enum {Visibility}
 */
primitives.common.Visibility = {
  /**
   * Selects best visibility mode.
   */
  Auto: 0,
  /**
   * Regular template based diagram nodes
   */
  Normal: 1,
  /**
   * Diagram draws nodes in form of markers
   */
  Dot: 2,
  /**
   * Diagram only draws connection lines and hides actuall nodes.
   */
  Line: 3,
  /**
   * Makes node invisible in layout. If node has no parents then 
   * its connection lines are hidden as well.
   * 
   * @ignore
   */
  Invisible: 4
};