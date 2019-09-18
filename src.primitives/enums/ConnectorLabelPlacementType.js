/**
 * @typedef {number} ConnectorLabelPlacementType
 **/


/**
 * Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes
 * defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them
 *  along the connector line. 
 *
 * @enum {ConnectorLabelPlacementType}
 */
primitives.common.ConnectorLabelPlacementType = {
  From: 0,
  Between: 1,
  To: 2
};