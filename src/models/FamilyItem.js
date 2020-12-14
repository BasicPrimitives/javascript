import { GroupByType } from '../enums';

export default function FamilyItem(arg0) {
  var property;

  this.id = null;
  this.familyId = null;
  this.itemConfig = null;

  this.isVisible = true;
  this.isActive = true; // item is clickable
  this.isLevelNeutral = false; // This option allows to place fake item in between of original item levels

  this.level = null;
  this.levelGravity = GroupByType.None; // If item can be moved between its parent and children levels in diagram, this option defines preference
  this.hideParentConnection = false;
  this.hideChildrenConnection = false;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
  }
};