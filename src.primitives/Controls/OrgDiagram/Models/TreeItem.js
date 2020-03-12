/* This is model class used to define visual structure of chart */
primitives.orgdiagram.TreeItem = function () {
  /* auto generated internal item id */
  this.id = null;

  /* Visual child id which is supposed to be straight under it */
  this.visualAggregatorId = null;
  this.visualDepth = 1; // private 

  this.partners = []; /* thess are nodes connected with bottom line together into one family, family is group of items having common set of children */

  this.visibility = primitives.common.Visibility.Normal;

  this.actualItemType = null; // primitives.orgdiagram.ItemType
  this.connectorPlacement = 0; // primitives.common.SideFlag
  this.gravity = 0; // primitives.common.HorizontalAlignmentType.Center

  /* This value is used to increase gap between neighboring left item in hiearchy */
  this.relationDegree = 0;
};