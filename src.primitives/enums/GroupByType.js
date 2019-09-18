/**
 * @typedef {number} GroupByType
 **/

/**
 * This enumeration defines objects gravity in the chart relative to parents and children.
 * For example connection lines can be drawn with arrows, so this enumeration controls
 * direction of arrows up towards parents or down towards children in the hierarchy.
 * The other example is nodes placement close to their immediate parents or immediate children 
 * in case when parents and children are offset from them by multiple levels in hierarchy.
 *  
 * @enum {GroupByType}
 */
primitives.common.GroupByType = {
  None: 0,
  Parents: 1,
  Children: 2
};