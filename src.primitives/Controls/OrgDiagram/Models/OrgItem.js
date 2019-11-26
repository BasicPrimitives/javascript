/* This is model class is used to define intermediate organizational chart structure */
primitives.orgdiagram.OrgItem = function (options) {
  var index, len,
    property;

  this.id = null; // Unique org item id. 

  this.isVisible = true; // If it is true then item is shown and selectable in hierarchy. 
  this.isActive = true; // If it is true then item is clickable in hierarchy. 
  this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 

  this.itemType = primitives.orgdiagram.ItemType.Regular; // This property defines how item should be placed in chart. 
  this.adviserPlacementType = primitives.common.AdviserPlacementType.Auto; // Left or Right placement relative to parent
  this.childrenPlacementType = primitives.common.ChildrenPlacementType.Auto; // Children shape

  this.placeAdvisersAboveChildren = primitives.common.Enabled.Auto;
  this.placeAssistantsAboveChildren = primitives.common.Enabled.Auto;
  this.levelOffset = null;

  this.level = null;
  this.hideParentConnection = false;
  this.hideChildrenConnection = false;

  /* org tree balancing properties */
  this.childIndex = null; // Item index in array of parent's children

  // Folowing properties we copy from user's item config to new OrgItem instance
  // If user's property is undefined we take default value from ItemConfig
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