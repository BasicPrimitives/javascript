import { ItemType } from "../../../enums";

function NodeTypeSorter() {
  var _rows = [];

  function getRow(itemType, index) {
    return (_rows[itemType] || [])[index || 0] || [];
  }

  function getRows(itemType) {
    return _rows[itemType] || [];
  }

  function addChild(itemType, levelOffset, orgItem) {
    switch (itemType) {
      case ItemType.SubAssistant:
      case ItemType.Assistant:
        levelOffset = levelOffset < 0 || levelOffset == null ? 0 : levelOffset;
        break;
      default:
        levelOffset = 0;
        break;
    }
    _rows[itemType] = _rows[itemType] || [];
    var groups = _rows[itemType];
    groups[levelOffset] = groups[levelOffset] || [];
    groups[levelOffset].push(orgItem);
  }

  return {
    addChild: addChild,
    getRow: getRow,
    getRows: getRows,
  };
}

export default NodeTypeSorter;
