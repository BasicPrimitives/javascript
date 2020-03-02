/**
 * @typedef {number} LoopsLayoutMode
 **/

/**
 * Loops layout mode. Configuration may contain loop references between items, so control tries to find layout minimizing number of loops between levels, 
 * so majority of references ideally should go in one direction. This option disables optimization and 
 * forces items levels order to match their order in `items` collection. For example if you have two nodes `A` and `B` referencing each other as a parent, 
 * then it is not defined which one is going to be on the top of the diagram. Set this option to `KeepItemsOrder`, if you need the first item in your collection to be
 * on the top, otherwise control will optimize loops layout in order to minimize number of loops in diagram.
 *  
 * @enum {LoopsLayoutMode}
 */
primitives.common.LoopsLayoutMode = {
  /**
   * Optimized. Control searches for layout producing minimal number of feedback loops in the diagram.
   */
  Optimized: 0,
  /**
   * Keeps order of items on levels, the same as in `items` collection property.
   */
  KeepItemsOrder: 1
};