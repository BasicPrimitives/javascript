import { Visibility } from '../enums';

export default function TreeLevelPosition(source) {
  this.currentvisibility = Visibility.Normal;
  this.actualVisibility = Visibility.Normal;

  this.shift = 0.0; /* top abolute position of items in level */
  this.depth = 0.0; /* maximum  height of items in level */
  this.nextLevelShift = 0.0; /* next level relative position */
  this.horizontalConnectorsDepth = 0; /* relative position of horizontal connectors between items */
  this.topConnectorShift = 0.0; /* relative position of top connector horizontal line */
  this.connectorShift = 0.0; /* relative position of bottom horizontal line */
  this.levelSpace = 0.0; /* user interval between prev level and this one based on options set by user, if number of horizontal connections is bigger that one it is proportionally increased */

  this.currentOffset = 0.0; /* this is x axis coordinate offset, it used to calculate horizontal items position in level */

  this.labels = [];
  this.labelsRect = null;
  this.showLabels = true;
  this.hasFixedLabels = false;

  if (source != null) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        this[property] = source[property];
      }
    }
  }
};

TreeLevelPosition.prototype.setShift = function (shift, levelSpace, topConnectorSpace, connectorSpace, partnerConnectorOffset) {
  this.shift = shift;
  this.levelSpace = levelSpace;

  this.topConnectorShift = -levelSpace / 2.0 - topConnectorSpace;
  this.connectorShift = this.depth + connectorSpace + (partnerConnectorOffset + 1) * (levelSpace / 2.0);
  this.nextLevelShift = topConnectorSpace + this.depth + connectorSpace + levelSpace + partnerConnectorOffset * levelSpace / 2.0;

  return this.nextLevelShift;
};

TreeLevelPosition.prototype.shiftDown = function (shift) {
  this.shift += shift;
};

TreeLevelPosition.prototype.toString = function () {
  return this.currentvisibility;
};