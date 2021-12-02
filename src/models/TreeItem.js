import { Visibility } from '../enums';

/* This is model class used to define visual structure of the chart */
export default function TreeItem() {
  /* auto generated internal item id */
  this.id = null;

  /* Visual child id which is supposed to be straight under it */
  this.visualAggregatorId = null;

  this.partners = []; /* nodes connected with bottom line together into one family, family is group of items having common set of children */

  this.visibility = Visibility.Normal;

  this.actualItemType = null; // ItemType
  this.connectorPlacement = 0; // SideFlag
  this.gravity = 0; // HorizontalAlignmentType.Center

  /* This value is used to increase space on the left side of the item */
  this.relationDegree = 0;
};