import { ItemType } from "../../../enums";
import { GroupType } from "./enums";

function NodeGroupSorter() {
  var _rows = [];

  function getRow(groupType, index) {
    return (_rows[groupType] || [])[index || 0] || [];
  }

  function getRows(groupType) {
    return _rows[groupType] || [];
  }

  function getLength() {
    return _rows.length;
  }

  function _addChild(groupType, index, orgItem) {
    _rows[groupType] = _rows[groupType] || [];
    var groups = _rows[groupType];
    groups[index] = groups[index] || [];
    groups[index].push(orgItem);
  }

  function addChild(itemType, index, orgItem) {
    switch (itemType) {
      case ItemType.SubAdviser:
      case ItemType.Adviser:
        _addChild(GroupType.Items, 0, orgItem);
        break;
      case ItemType.SubAssistant:
      case ItemType.Assistant:
        index = index < 0 || index == null ? 0 : index;
        _addChild(GroupType.Assistants, index, orgItem);
        break;
      case ItemType.Regular:
        if (index < 0 || index === undefined || index === null) {
          _addChild(GroupType.Children, 0, orgItem);
        } else {
          _addChild(GroupType.RowChildren, index, orgItem);
        }
        break;
      default:
        break;
    }
  }

  return {
    addChild: addChild,
    getLength: getLength,
    getRow: getRow,
    getRows: getRows,
  };
}

export default NodeGroupSorter;
