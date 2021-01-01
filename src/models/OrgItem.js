import { ItemType, AdviserPlacementType, ChildrenPlacementType, Enabled } from '../enums';

/* This is model class is used to define intermediate organizational chart structure */
export default function OrgItem(options) {
  var index, len,
    property;

  this.id = null; // Unique org item id. 

  this.isVisible = true; // If it is true then item is shown and selectable in hierarchy. 
  this.isActive = true; // If it is true then item is clickable in hierarchy. 
  this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 

  this.itemType = ItemType.Regular; // This property defines how item should be placed in chart. 
  this.adviserPlacementType = AdviserPlacementType.Auto; // Left or Right placement relative to parent
  this.childrenPlacementType = ChildrenPlacementType.Auto; // Children shape

  this.placeAdvisersAboveChildren = Enabled.Auto;
  this.placeAssistantsAboveChildren = Enabled.Auto;
  this.levelOffset = null;

  this.level = null;
  this.hideParentConnection = false;
  this.hideChildrenConnection = false;

  /* org tree balancing properties */
  this.childIndex = null; // Item index in array of parent's children

  // Following properties we copy from user's item config to new OrgItem instance
  // If user's property is undefined we take default value from OrgItemConfig
  var properties = [
    'id', 'parent', 'isVisible', 'isActive',
    'itemType', 'adviserPlacementType', 'childrenPlacementType',
    'placeAdvisersAboveChildren', 'placeAssistantsAboveChildren',
    'levelOffset'
  ];

  /* copy general org chart items properties */
  for (index = 0, len = properties.length; index < len; index += 1) {
    property = properties[index];

    if (options.hasOwnProperty(property)) {
      this[property] = options[property];
    }
  }
};