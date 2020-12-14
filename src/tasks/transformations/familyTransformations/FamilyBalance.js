/*  This class transforms normalized logical family into levels of nodes.
  The current approach to optimize items placement is to transform family into hierarchy of nodes and order 
  children of every node in the way minimizing number of intersections between connection lines.
  1. Extract families into _families array of type FamilyItem. Family is sub tree of items logicalFamily. 
    In order to extract families out of logicalFamily we count from bottom to roots total number of descendants for evry item and then extract 
    sub hierarchy having minimum number of members. This process is repeated till all nodes are extracted into separate families.
      orgPartners - When we extract families we store links to parents in other branches having the same children of 
      some already extracted item as partner in orgPartners hash
    This hash table is used to create links collections between families
    The orgTree collection is used to define final org hierarchy used to balance nodes in levels.
  2. Use links in families to build family graph
  3. Find maximum spanning tree of family graph
  4. Since spanning tree is the tree we calculate number of descendants in every branch. So when we join families into one 
    org chart we sort them taking first child family having maximum number of links to its parent family
    sortedFamilies collection
  5. Using sortedFamilies collection we merge roots of families back to primary org chart. The rule of that backward merging is 
    to find ancestor in target tree having level less then root item of merged family.
    this is done without extra collection creation via making changes in orgTree
    If family has no links it is added to root of orgTree
  6. Balance organizational chart in order to place items having extra connections close to each other. 
    Assign every extra link to every pair of parent nodes up to the root.
  7. Scan orgTree hierarchy from root to bottom and balance children using extra links collected from children
    So at the top most level we know number of links between children, so we sort them, then number of overlappings between branches should be minimal
    Balancing algorithms finds maximum spanning tree in connections between children and groups them from bottom of that tree up to the root
    In the way when groups having maximum mutual links placed close to each other.
*/
import TreeLevels from '../../../algorithms/TreeLevels';
import LinkedHashItems from '../../../algorithms/LinkedHashItems';
import Tree from '../../../algorithms/Tree';
import Graph from '../../../algorithms/Graph';
import Pile from '../../../algorithms/Pile';
import SortedList from '../../../algorithms/SortedList';
import FamilyBalanceItem from './FamilyBalanceItem';
import Slot from '../../../models/Slot';
import TreeLevelConnectorStackSize from '../../../models/TreeLevelConnectorStackSize';
import VerticalConnectorBundle from '../../../connectors/VerticalConnectorBundle';

export default function FamilyBalance() {

};

//var params = {
//  logicalFamily,
//  maximumId,
//  items
//};
FamilyBalance.prototype.balance = function (params) {
  var result = {
    maximumId: null,
    treeLevels: TreeLevels(),
    bundles: [],
    connectorStacks: []
  };

  var data = {
    orgTree: Tree(), /*tree OrgItem */
    maximumId: params.maximumId,
    orgPartners: {}, /* Creates extra partners collection of relations between visual tree items They are used to draw connectors between items in different branches of organizational chart*/
    itemByChildrenKey: {},
    minimumLevel: null,
    maximumLevel: null
  };

  this.createOrgTree(params, data);

  var currentLevelIndex, index = -1;
  data.orgTree.loopLevels(this, function (treeItemId, treeItem, levelIndex) {
    var familyItem = params.logicalFamily.node(treeItemId);
    if (familyItem != null) {
      if (currentLevelIndex !== levelIndex) {
        currentLevelIndex = levelIndex;
        index += 1;
      }
      result.treeLevels.addItem(index, treeItemId, familyItem);
    }
  });

  this.recalcLevelsDepth(result.bundles, result.connectorStacks, result.treeLevels, params.logicalFamily);

  result.maximumId = data.maximumId;

  return result;
};

FamilyBalance.prototype.Family = function (id) {
  this.id = null;
  this.familyPriority = 1;
  this.childFamilies = [];
  this.items = [];

  this.links = []; /* array of FamLink(s) */
  this.backLinks = []; /* array of FamLink(s) */

  if (arguments.length == 1) {
    this.id = id;
  }
};

FamilyBalance.prototype.FamLink = function (fromItem, toItem) {
  this.fromItem = fromItem; /* FamilyItem.id */
  this.toItem = toItem; /* FamilyItem.id */
};

FamilyBalance.prototype.createOrgTree = function (params, data) {
  var index, len, index2, len2,
    familiesGraph, /* Graph */
    link, links,
    fromFamily,
    toFamily,
    sortedFamilies = [], sortedFamiliesHash,
    attachedFamilies,
    familyId,
    family,
    familyRootItem,
    fromItem,
    toItem,
    rootItem, rootItems, bestRootItem, bestReference,
    spanningTree,
    extraGravities, grandChildren,
    orgItemRoot,
    famItemsExtracted,
    families = [],
    families2;

  if (params.logicalFamily.hasNodes() > 0) {
    /* create hash of extracted family items */
    famItemsExtracted = {};

    familyId = 0;
    families2 = [];
    params.logicalFamily.loopRoots(this, function (grandParentId, grandParent) {
      //ignore jslint
      family = new this.Family(familyId);
      /* extractOrgChart method extracts hiearchy of family members starting from grandParent and takes only non extracted family items 
       * For every extracted item it assigns its familyId, it is used for building families relations graph and finding cross family links
      */
      this.extractOrgChart(grandParentId, params.logicalFamily, params.primaryParents, data.orgTree, data.orgPartners, data.itemByChildrenKey, famItemsExtracted, family);
      families.push(family);
      families2.push(family);
      familyId += 1;
    });

    families2.sort(function (a, b) {
      /* sort families by root item level ASC and size DESC */
      var aLevel = a.items[0].level,
        bLevel = b.items[0].level;

      return aLevel != bLevel ? (aLevel - bLevel) : (b.items.length - a.items.length);
    });

    sortedFamilies = [];
    sortedFamiliesHash = {};
    if (families.length > 0) {

      /* Build families graph */
      familiesGraph = Graph();
      for (index = 0, len = families.length; index < len; index += 1) {
        family = families[index];

        for (index2 = 0, len2 = family.links.length; index2 < len2; index2 += 1) {
          link = family.links[index2];

          fromFamily = params.logicalFamily.node(link.fromItem).familyId;
          toFamily = params.logicalFamily.node(link.toItem).familyId;

          if (fromFamily != toFamily) {
            familiesGraph.addEdge(fromFamily, toFamily, { weight: 0 });
            familiesGraph.edge(fromFamily, toFamily).weight += 1;
          }

          families[toFamily].backLinks.push(new this.FamLink(link.toItem, link.fromItem));
        }
      }

      /* Flatten families graph into array for merging */
      while (sortedFamilies.length < families.length) {
        for (index = 0, len = families2.length; index < len; index += 1) {
          family = families2[index];

          if (!sortedFamiliesHash.hasOwnProperty(family.id)) {

            /* find maximum spanning tree of families graph*/
            spanningTree = familiesGraph.getSpanningTree(family.id, function (edge) {
              return -edge.weight;
            }); //ignore jslint

            if (spanningTree.node(family.id) != null) {

              /* count number of sub families for every family in spanning tree and sorts child families desc*/
              spanningTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
                var family = families[nodeid],
                  parentFamily = families[parentid],
                  children = [];

                if (parentid != null) {
                  parentFamily.familyPriority = parentFamily.familyPriority + family.familyPriority;
                }

                children = [];
                spanningTree.loopChildren(this, nodeid, function (childid, child, index) {
                  children.push(childid);
                });

                children.sort(function (a, b) { return families[a].familyPriority - families[b].familyPriority; });
                spanningTree.arrangeChildren(nodeid, children);
              }); //ignore jslint

              /* merge tree items in pre order sequence */
              spanningTree.loopPreOrder(this, function (familyid, node) {
                sortedFamilies.push(familyid);
                sortedFamiliesHash[familyid] = true;
              }); //ignore jslint

            } else {
              /* family has no links to any other family so we add it as orphant */
              sortedFamilies.push(family.id);
              sortedFamiliesHash[family.id] = true;
            }
          }
        }
      }
    }

    /* create chart root */
    data.maximumId += 1;
    orgItemRoot = new FamilyBalanceItem(data.maximumId, null, data.minimumLevel - 1);
    data.orgTree.add(null, orgItemRoot.id, orgItemRoot);

    /* Place family roots to organizational chart */
    attachedFamilies = {};
    for (index = 0, len = sortedFamilies.length; index < len; index += 1) {
      family = families[sortedFamilies[index]];

      rootItems = {}; // Hash where key = rootItem.id and value is number of references
      bestRootItem = orgItemRoot;
      bestReference = 0;
      links = family.links.concat(family.backLinks);
      for (index2 = 0; index2 < links.length; index2 += 1) {
        link = links[index2];

        toItem = data.orgTree.node(link.toItem);
        fromItem = data.orgTree.node(link.fromItem);

        if (attachedFamilies[toItem.familyId] === true) {
          familyRootItem = family.items[0];
          rootItem = toItem;

          if (rootItem.level >= familyRootItem.level) {
            data.orgTree.loopParents(this, rootItem.id, function (nodeid, node) {
              rootItem = node;
              if (node.level < familyRootItem.level) {
                return true;
              }
            });//ignore jslint
          }

          if (rootItems.hasOwnProperty(rootItem.id)) {
            rootItems[rootItem.id] += 1;
          } else {
            rootItems[rootItem.id] = 1;
          }
          /* family may be nested to multiple places, so we select root item having maximum connections with our new sub family */
          if (bestReference < rootItems[rootItem.id]) {
            bestRootItem = rootItem;
            bestReference = rootItems[rootItem.id];
          }
        }


      }

      this.attachFamilyToOrgChart(data, bestRootItem, family);

      attachedFamilies[family.id] = true;
    }

    /* balance organizational chart in order to place items having extra connections close to each other */
    extraGravities = this.getExtraGravity(data);

    /* count number of vertical connections for every item */
    grandChildren = this.getGrandChildren(data);

    /* scan orgTree hierarchy from root to bottom and balance its children */
    this.balanceOrgTree(data.orgTree, extraGravities, grandChildren, params.itemsPositions, params.itemsGroups);
  }
};

FamilyBalance.prototype.getGrandChildren = function (data) {
  var result = {};  /* Key = OrgItem.id, Value= Hash {} having Key = level and Value = number of grand children*/

  data.orgTree.loopPostOrder(this, function (itemId, orgItem, parentId, parent) {
    var level;

    data.minimumLevel = data.minimumLevel != null ? Math.min(data.minimumLevel, orgItem.level) : orgItem.level;
    data.maximumLevel = data.maximumLevel != null ? Math.max(data.maximumLevel, orgItem.level) : orgItem.level;

    if (parentId != null) {
      if (!result[parentId]) {
        result[parentId] = {};
      }

      level = orgItem.level - 1; /* project children qty to parent level, it is needed to match cross hierarchy connectors levels*/
      if (!result[parentId][level]) {
        result[parentId][level] = 1;
      } else {
        result[parentId][level] += 1;
      }

      if (result[itemId] != null) {
        for (level in result[itemId]) {
          if (result[itemId].hasOwnProperty(level)) {
            if (!result[parentId][level]) {
              result[parentId][level] = result[itemId][level];
            } else {
              result[parentId][level] += result[itemId][level];
            }
          }
        }
      }
    }
  });

  return result;
};

FamilyBalance.prototype.balanceOrgTree = function (orgTree, extraGravities, grandChildren, itemsPositions, itemsGroups) {
  var index2, len2,
    index3, len3,
    extraGravity,
    childExtraGravities,
    sortedChildren,
    subChildren, subOrgItem,
    leftId = '__left__',
    rightId = '__right__',
    levelExtraGravities,
    sequence;

  orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
    var graph = Graph(),
      graphGravities = {},
      firstOrgItem = null,
      toItemId;
    /* build gravities graph for children */
    sortedChildren = [];
    orgTree.loopChildren(this, parentOrgItem.id, function (childOrgItemId, childOrgItem, index) {
      var levelKey;
      if (firstOrgItem == null) {
        firstOrgItem = childOrgItem;
      }

      graphGravities[childOrgItem.id] = {};
      if (extraGravities.hasOwnProperty(childOrgItem.id)) {
        childExtraGravities = extraGravities[childOrgItem.id];

        for (levelKey in childExtraGravities) {
          if (childExtraGravities.hasOwnProperty(levelKey)) {
            levelExtraGravities = childExtraGravities[levelKey];

            graphGravities[childOrgItem.id][levelKey] = {};
            for (index2 = 0, len2 = levelExtraGravities.length; index2 < len2; index2 += 1) {
              extraGravity = levelExtraGravities[index2];

              if (extraGravity.commonParent == parentOrgItem.id) {
                /* this is link between two children */
                toItemId = extraGravity.toParent;
              } else {
                /* this is external link on left or on right side, we create virtual graph item ids for external links */
                if (orgTree.node(extraGravity.fromParent).childIndex < orgTree.node(extraGravity.toParent).childIndex) {
                  toItemId = rightId;
                } else {
                  toItemId = leftId;
                }
              }

              /* add connection to graph */
              if (childOrgItem.id != toItemId) {
                graph.addEdge(childOrgItem.id, toItemId, { weight: 0 });
                graph.edge(childOrgItem.id, toItemId).weight += 1.0;

                if (graphGravities[childOrgItem.id][levelKey][toItemId] == null) {
                  graphGravities[childOrgItem.id][levelKey][toItemId] = 0;
                }
                graphGravities[childOrgItem.id][levelKey][toItemId] += 1;
              }
            }
          }
        }
      }
      /* add extra zero connection to graph when child org item has no connections
        it is connected to the first item in the graph with zero link
      */
      if (index > 0) {
        graph.addEdge(childOrgItem.id, firstOrgItem.id, { weight: 0 });
      }
    });

    if (firstOrgItem != null) {
      /* sort items in graph from the most connected to the least */

      sequence = [];

      graph.getTotalWeightGrowthSequence(this,
        function (a) { return a.weight; },
        function (a) { sequence.push(a); }
      ); //ignore jslint

      if (sequence.length === 0) {
        sequence = [firstOrgItem.id];
      }

      /* sort children from top to down */
      subChildren = this.balanceItems(sequence, leftId, rightId, graphGravities, grandChildren, itemsPositions, itemsGroups);

      /* save items indexes for further use */
      for (index3 = 0, len3 = subChildren.length; index3 < len3; index3 += 1) {
        subOrgItem = orgTree.node(subChildren[index3]);

        subOrgItem.childIndex = index3;

        sortedChildren.push(subOrgItem.id);
      }
    }
    orgTree.arrangeChildren(parentOrgItem.id, sortedChildren);
  });
};

FamilyBalance.prototype.balanceItems = function (sequence, leftId, rightId, graphGravities, grandChildren, itemsPositions, itemsGroups) {
  var result = [],
    index,
    slots = LinkedHashItems(), // key = counter++, value =  slot object
    counter = 0,
    positions = {}, // hash[groupId] = SortedList, key = user defined item position, value = key in slots -- create only when user defined itemsPositions exists for items
    startSlotKey, endSlotKey,
    key, slot,
    items = {}, itemid, itemsToAdd,
    bestSlotKey, bestSlot, bestSlotValue, bestSlotDistance, bestSlotBalance, bestSlotCrossings,
    slotValue, slotDistance, slotBalance, slotCrossings,
    itemGrandChildren,
    itemSlot, itemSlotKey,
    level, levelGravities, toItemId, toItemSlot,
    userItemPosition, position, itemGroup, groupPositions,
    toItemSlotKey;

  /* populate initital slots */
  itemsToAdd = [leftId, null, rightId];
  for (index = 0; index < itemsToAdd.length; index += 1) {
    itemid = itemsToAdd[index];
    key = counter++;
    slot = new Slot(itemid);
    slot.position = index;
    slots.add(key, slot);
    if (itemid !== null) {
      items[itemid] = key;
    }
  }

  for (index = 0; index < sequence.length; index += 1) {
    itemid = sequence[index];

    /* ignore left and right margin */
    if (itemid != leftId && itemid != rightId) {

      bestSlotKey = null;
      bestSlot = null;
      bestSlotValue = null;
      bestSlotDistance = null;
      bestSlotBalance = null;
      bestSlotCrossings = null;

      startSlotKey = null;
      endSlotKey = null;
      if (itemsGroups.hasOwnProperty(itemid)) {
        itemGroup = itemsGroups[itemid];
        if (positions.hasOwnProperty(itemGroup)) {
          userItemPosition = itemsPositions[itemid];
          groupPositions = positions[itemGroup];
          startSlotKey = groupPositions.previousContext(userItemPosition);
          endSlotKey = groupPositions.nextContext(userItemPosition);
        }
      }

      slots.iterate(function (slot, slotKey) {
        var level, toItemId,
          levelGravities,
          toItemSlot;

        if (slot.itemId == null) {
          itemGrandChildren = grandChildren[itemid];
          slotValue = 0;
          slotDistance = 0;
          slotBalance = 0;
          slotCrossings = 0;

          for (level in slot.crossings) {
            if (slot.crossings.hasOwnProperty(level)) {
              if (itemGrandChildren && itemGrandChildren[level] != null) {
                slotValue += slot.crossings[level] * itemGrandChildren[level];
              }
              slotCrossings += slot.crossings[level];
            }
          }
          for (level in graphGravities[itemid]) {
            if (graphGravities[itemid].hasOwnProperty(level)) {
              levelGravities = graphGravities[itemid][level];
              for (toItemId in levelGravities) {
                if (levelGravities.hasOwnProperty(toItemId)) {
                  if (items.hasOwnProperty(toItemId)) {
                    toItemSlot = slots.item(items[toItemId]);
                    if (toItemSlot != null) {
                      if (toItemSlot.position < slot.position) {
                        /* on the left side */
                        slotValue += ((slot.left[level] || 0.0) - (toItemSlot.left[level] || 0.0));
                        slotBalance += Math.abs(toItemSlot.balance + 1);
                      } else {
                        /* on the right side */
                        slotValue += ((slot.right[level] || 0.0) - (toItemSlot.right[level] || 0.0));
                        slotBalance += Math.abs(toItemSlot.balance - 1);
                      }
                      slotDistance += Math.abs(toItemSlot.position - slot.position);
                    }
                  }
                }
              }
            }
          }

          if (bestSlotValue == null ||
            bestSlotValue > slotValue ||
            (bestSlotValue == slotValue &&
              (bestSlotDistance > slotDistance ||
                (bestSlotDistance == slotDistance &&
                  (bestSlotBalance > slotBalance ||
                    (bestSlotBalance == slotBalance && bestSlotCrossings > slotCrossings)
                  )
                )
              )
            )
          ) {
            bestSlotKey = slotKey;
            bestSlotValue = slotValue;
            bestSlot = slot;
            bestSlotDistance = slotDistance;
            bestSlotBalance = slotBalance;
            bestSlotCrossings = slotCrossings;
          }
        }
      }, startSlotKey, endSlotKey); //ignore jslint

      slots.insertBefore(bestSlotKey, counter++, bestSlot.clone(null));
      items[itemid] = counter;
      itemSlotKey = counter;
      itemSlot = bestSlot.clone(itemid);
      if (itemsPositions.hasOwnProperty(itemid)) {
        itemGroup = itemsGroups[itemid];
        if (!positions.hasOwnProperty(itemGroup)) {
          positions[itemGroup] = SortedList();
        }
        groupPositions = positions[itemGroup];
        groupPositions.add(itemsPositions[itemid], counter);
      }
      slots.insertBefore(bestSlotKey, counter++, itemSlot);

      /* add new item grand children qty to all slots to their grand totals for right & left sides */
      itemSlot.position = 0;
      position = 0;
      slots.iterate(function (slot, slotKey) {
        var level, itemGrandChildren;
        if (slotKey != itemSlotKey) {
          itemGrandChildren = grandChildren[itemid];
          for (level in itemGrandChildren) {
            if (itemGrandChildren.hasOwnProperty(level)) {
              if (!slot.left[level]) {
                slot.left[level] = itemGrandChildren[level];
              } else {
                slot.left[level] += itemGrandChildren[level];
              }
            }
          }
          position += 1;
          slot.position = position;
        }
      }, itemSlotKey); //ignore jslint

      position = 0;
      slots.iterateBack(function (slot, slotKey) {
        var level, itemGrandChildren;
        if (slotKey != itemSlotKey) {
          itemGrandChildren = grandChildren[itemid];
          for (level in grandChildren[itemid]) {
            if (grandChildren[itemid].hasOwnProperty(level)) {
              if (!slot.right[level]) {
                slot.right[level] = itemGrandChildren[level];
              } else {
                slot.right[level] += itemGrandChildren[level];
              }
            }
          }
          position -= 1;
          slot.position = position;
        }
      }, itemSlotKey); //ignore jslint

      /* add crossings */
      for (level in graphGravities[itemid]) {
        if (graphGravities[itemid].hasOwnProperty(level)) {
          levelGravities = graphGravities[itemid][level];
          for (toItemId in levelGravities) {
            if (levelGravities.hasOwnProperty(toItemId)) {
              if (items.hasOwnProperty(toItemId)) {
                toItemSlotKey = items[toItemId];
                toItemSlot = slots.item(toItemSlotKey);
                if (toItemSlot != null) {
                  if (toItemSlot.position < 0) {
                    /* on the left side */
                    toItemSlot.balance += 1;
                    itemSlot.balance -= 1;
                    slots.iterateBack(function (slot, slotKey) {
                      if (slotKey != itemSlotKey && slotKey != toItemSlotKey) {
                        if (!slot.crossings[level]) {
                          slot.crossings[level] = levelGravities[toItemId];
                        } else {
                          slot.crossings[level] += levelGravities[toItemId];
                        }
                      }
                    }, itemSlotKey, toItemSlotKey); //ignore jslint
                  } else {
                    /* on the right side */
                    toItemSlot.balance -= 1;
                    itemSlot.balance += 1;
                    slots.iterate(function (slot, slotKey) {
                      if (slotKey != itemSlotKey && slotKey != toItemSlotKey) {
                        if (!slot.crossings[level]) {
                          slot.crossings[level] = levelGravities[toItemId];
                        } else {
                          slot.crossings[level] += levelGravities[toItemId];
                        }
                      }
                    }, itemSlotKey, toItemSlotKey); //ignore jslint
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  slots.iterate(function (slot) {
    var itemId = slot.itemId;
    if (itemId != null && itemId != leftId && itemId != rightId) {
      result.push(itemId);
    }
  });

  return result;
};

FamilyBalance.prototype.ExtraGravity = function (level) {
  this.commonParent = null; // OrgItem.id
  this.fromParent = null; // OrgItem.id
  this.toParent = null; // OrgItem.id
  this.level = level;
};

FamilyBalance.prototype.getExtraGravity = function (data) {
  var orgItemId, orgItem,
    result = {}, /* Key = OrgItem.id, Value= Hash {} having Key = level and Value = [] array of ExtraGravity objects*/
    index, len,
    extraPartners, extraPartner;

  /* collect gravities for extra partners */
  for (orgItemId in data.orgPartners) {
    if (data.orgPartners.hasOwnProperty(orgItemId)) {
      orgItem = data.orgTree.node(orgItemId);
      extraPartners = data.orgPartners[orgItemId];

      for (index = 0, len = extraPartners.length; index < len; index += 1) {
        extraPartner = data.orgTree.node(extraPartners[index]);

        this.addExtraGravitiesForConnection(data.orgTree, result, extraPartner, orgItem);
      }
    }
  }

  return result;
};

FamilyBalance.prototype.addExtraGravitiesForConnection = function (orgTree, extraGravities, fromItem, toItem) {
  var extraGravityFrom = new this.ExtraGravity(fromItem.level),
    extraGravityTo = new this.ExtraGravity(toItem.level);

  /* find common parent for evry child and orgItem and create connector for evey parent in selection path */
  orgTree.zipUp(this, fromItem.id, toItem.id, function (fromItemId, parentFromItemId, toItemId, parentToItemId) {
    /* all parent items in chain up to the common root share the same gravity object for one connector */
    this.addExtraGravityForItem(extraGravities, fromItemId, extraGravityFrom);
    this.addExtraGravityForItem(extraGravities, toItemId, extraGravityTo);

    /* initialize gravity objects */
    if (parentFromItemId == parentToItemId) {
      extraGravityFrom.commonParent = parentFromItemId;
      extraGravityFrom.fromParent = fromItemId;
      extraGravityFrom.toParent = toItemId;

      extraGravityTo.commonParent = parentFromItemId;
      extraGravityTo.fromParent = toItemId;
      extraGravityTo.toParent = fromItemId;

      return true;
    }
  });
};

FamilyBalance.prototype.addExtraGravityForItem = function (extraGravities, id, extraGravity) {
  if (!extraGravities.hasOwnProperty(id)) {
    extraGravities[id] = {};
  }
  if (extraGravities[id][extraGravity.level] == null) {
    extraGravities[id][extraGravity.level] = [];
  }
  extraGravities[id][extraGravity.level].push(extraGravity);
};

FamilyBalance.prototype.attachFamilyToOrgChart = function (data, parent, family) {
  var levelIndex,
    familyRoot = family.items[0],
    newOrgItem = null,
    rootItem = parent;

  // fill in levels between parent and family root with invisible items
  for (levelIndex = parent.level + 1; levelIndex < familyRoot.level; levelIndex += 1) {
    data.maximumId += 1;
    newOrgItem = new FamilyBalanceItem(data.maximumId, null, levelIndex);
    data.orgTree.add(rootItem.id, newOrgItem.id, newOrgItem);
    family.items.push(newOrgItem);

    rootItem = newOrgItem;
  }

  // attach family root 
  familyRoot.hideParentConnection = true;
  data.orgTree.adopt(rootItem.id, familyRoot.id, familyRoot);
};

FamilyBalance.prototype.extractOrgChart = function (grandParentId, logicalFamily, primaryParentsPath, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family) {
  var index, len,
    children = [], tempChildren,
    childItem,
    rootItem = null,
    newOrgItem,
    grandParent = logicalFamily.node(grandParentId);

  /* extract root item */
  newOrgItem = new FamilyBalanceItem(grandParent.id, family.id, grandParent.level);
  orgTree.add(rootItem, newOrgItem.id, newOrgItem);
  family.items.push(newOrgItem);

  famItemsExtracted[grandParent.id] = grandParent;
  grandParent.familyId = family.id;

  /* extract its children */
  children = this.extractChildren(grandParent, logicalFamily, primaryParentsPath, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family);

  while (children.length > 0) {
    tempChildren = [];
    for (index = 0, len = children.length; index < len; index += 1) {
      childItem = children[index];
      tempChildren = tempChildren.concat(this.extractChildren(childItem, logicalFamily, primaryParentsPath, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family));
    }

    children = tempChildren;
  }
};

FamilyBalance.prototype.extractChildren = function (parentItem, logicalFamily, primaryParentsPath, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family) {
  var result = [],
    firstChild = null,
    partnerItem = null,
    newOrgItem;

  if (logicalFamily.countChildren(parentItem.id) == 1) {
    firstChild = logicalFamily.firstChild(parentItem.id);
  }

  if (itemByChildrenKey[firstChild] != null) {
    /* all children already extracted */
    partnerItem = itemByChildrenKey[firstChild];

    if (orgPartners[partnerItem.id] == null) {
      orgPartners[partnerItem.id] = [];
    }
    orgPartners[partnerItem.id].push(parentItem.id);

    family.links.push(new this.FamLink(parentItem.id, firstChild));
  } else {
    if (firstChild != null) {
      if (primaryParentsPath.hasOwnProperty(firstChild)) {
        var realParent = primaryParentsPath[firstChild];
        if (realParent != parentItem.id) {
          if (orgPartners[realParent] == null) {
            orgPartners[realParent] = [];
          }
          orgPartners[realParent].push(parentItem.id);
          family.links.push(new this.FamLink(parentItem.id, firstChild));
          return result;
        }
      }
      itemByChildrenKey[firstChild] = parentItem;
    }

    logicalFamily.loopChildren(this, parentItem.id, function (childid, childItem, levelIndex) {
      if (famItemsExtracted[childItem.id]) {
        throw "Many to many relations should not exist at this stage";
      }
      result.push(childItem);

      newOrgItem = new FamilyBalanceItem(childItem.id, family.id, childItem.level);
      orgTree.add(parentItem.id, newOrgItem.id, newOrgItem);
      family.items.push(newOrgItem);

      famItemsExtracted[childItem.id] = true;

      childItem.familyId = family.id;
      return logicalFamily.SKIP;
    });
  }
  return result;
};

FamilyBalance.prototype.recalcLevelsDepth = function (bundles, connectorStacks, treeLevels, logicalFamily) {
  var index2, len2,
    index3, len3,
    itemPosition,
    bundle, bundlesToStack,
    processed = {},
    startIndex, endIndex, stackSegments;


  treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
    var stacksSizes = new TreeLevelConnectorStackSize();
    connectorStacks[levelIndex] = stacksSizes;

    bundlesToStack = [];

    treeLevels.loopLevelItems(this, levelIndex, function (itemid, familyItem, position) {
      var fromItems = [],
        toItems = [],
        dotId = null;
      if (!processed.hasOwnProperty(itemid)) {
        processed[itemid] = true;
        if (!familyItem.hideChildrenConnection) {
          fromItems.push(itemid);
        } else {
          dotId = itemid;
        }

        logicalFamily.loopChildren(this, itemid, function (childid, child, index) {
          logicalFamily.loopParents(this, childid, function (parentid, parentItem) {
            if (!processed.hasOwnProperty(parentid)) {
              processed[parentid] = true;
              if (!parentItem.hideChildrenConnection) {
                fromItems.push(parentid);
              } else {
                dotId = parentid;
              }
            }
            return logicalFamily.SKIP;
          });

          if (!child.hideParentConnection) {
            toItems.push(childid);
          } else {
            dotId = childid;
          }
          return logicalFamily.SKIP;
        }); //ignore jslint

        if (fromItems.length > 1 || toItems.length > 0) {
          /* if bundle has more than one parent without children we draw connection line between parents */
          /* if bundles has no parents, but has children we draw connectors between children, top loop */
          bundle = new VerticalConnectorBundle(fromItems, toItems, dotId);

          bundles.push(bundle);

          if (fromItems.length > 1) {
            bundlesToStack.push(bundle);
          }
        }
      }
    });

    if (bundlesToStack.length > 0) {
      /* find minimum and maximum partner index at level */
      stackSegments = Pile();
      for (index2 = 0, len2 = bundlesToStack.length; index2 < len2; index2 += 1) {
        bundle = bundlesToStack[index2];

        startIndex = null;
        endIndex = null;
        for (index3 = 0, len3 = bundle.fromItems.length; index3 < len3; index3 += 1) {
          itemPosition = treeLevels.getItemPosition(bundle.fromItems[index3]);

          startIndex = (startIndex != null) ? Math.min(startIndex, itemPosition) : itemPosition;
          endIndex = (endIndex != null) ? Math.max(endIndex, itemPosition) : itemPosition;
        }
        stackSegments.add(startIndex, endIndex, bundle);
      }

      stacksSizes.parentsStackSize = stackSegments.resolve(this, function (from, to, bundle, offset, stackSize) {
        bundle.fromOffset = offset + 1;
        bundle.fromStackSize = stackSize;
      });//ignore jslint
    }
  });
};