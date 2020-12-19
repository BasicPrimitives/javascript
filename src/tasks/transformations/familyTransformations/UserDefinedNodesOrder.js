import Tree from '../../../algorithms/Tree';
import { AdviserPlacementType } from '../../../enums';

export default function UserDefinedNodesOrder() {

};

UserDefinedNodesOrder.prototype.getUserDefinedPositions = function (items) {
  var userItem,
    index, len,
    relationTree = Tree(),
    referencedItems = {};

  for (index = 0, len = items.length; index < len; index += 1) {
    userItem = items[index];
    /* user should define unique id for every FamItemConfig otherwise we ignore it
       user should define relativeItem otherwise we cannot position item
    */
    if (userItem.relativeItem != null) {
      referencedItems[userItem.relativeItem] = true;
    }
    if (userItem.id != null) {
      referencedItems[userItem.id] = true;
    }
  }

  /* convert items relations into tree, it is not necessary to be a single root tree */
  for (index = 0, len = items.length; index < len; index += 1) {
    userItem = items[index];
    if (referencedItems.hasOwnProperty(userItem.id)) {
      var relativeItem = userItem.relativeItem || null;
      relationTree.add(relativeItem, userItem.id, userItem);
    }
  }

  /* at this step relationTree should contain some set of root items 
    if it has no root items that means we ether don't have any user defined relations
    or relations tree is looped so we ignore loops
  */
  function Set(position, items) {
    this.position = position;
    this.items = items;
  }

  var itemsOrder = {};
  var lefts = {};
  var rights = {};
  relationTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
    var items = [],
      leftItems = lefts[nodeid],
      rightItems = rights[nodeid],
      index;
    if (leftItems != null) {
      leftItems.sort(function (a, b) {
        return b.position - a.position
      });
      for (index = 0; index < leftItems.length; index += 1) {
        items = items.concat(leftItems[index].items);
      }
    }
    items.push(nodeid);
    if (rightItems != null) {
      rightItems.sort(function (a, b) {
        return a.position - b.position
      });
      for (index = 0; index < rightItems.length; index += 1) {
        items = items.concat(rightItems[index].items);
      }
    }

    if (parentid != null) {
      if (node.placementType == AdviserPlacementType.Left) {
        if (!lefts.hasOwnProperty(parentid)) {
          lefts[parentid] = [];
        }
        lefts[parentid].push(new Set(node.position, items));
      } else {
        if (!rights.hasOwnProperty(parentid)) {
          rights[parentid] = [];
        }
        rights[parentid].push(new Set(node.position, items));
      }
    } else {
      itemsOrder[nodeid] = items;
    }
  });

  /* convert root items collections into a sinle result hash */
  var position = {},
    group = {};

  for (var rootItemId in itemsOrder) {
    if (itemsOrder.hasOwnProperty(rootItemId)) {
      items = itemsOrder[rootItemId];
      for (index = 0; index < items.length; index += 1) {
        var itemid = items[index];
        position[itemid] = index;
        group[itemid] = rootItemId;
      }
    }
  }
  return {
    position: position,
    group: group
  };
}