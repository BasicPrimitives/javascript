/**
 * @typedef {number} LoopsLayoutMode
 **/

/**
 * Loops layout mode. Configuration may contain loop references between items, so control tries to find layout minimizing number of loops between levels, 
 * so majority of references ideally should go in one direction. This option allows to disable optimization and 
 * force items level order to match their order in `items` collection. For example if you have two nodes `A` and `B` and each node references the other one as parent, 
 * then it is undetermenistic which node is going to be on the top. If this option is set to `KeepItemsOrder` then node be is going to be at the top level in the diagram.
 *  
 * @enum {LoopsLayoutMode}
 */
primitives.common.LoopsLayoutMode = {
  /**
   * Optimized. Control searches for layout producing minimal number of backward loops between levels.
   */
  Optimized: 0,
  /**
   * Keeps items levels order matching the order of items in the control configuration.
   */
  KeepItemsOrder: 1
};