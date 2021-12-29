import Tree from '../../../algorithms/Tree';
import { SideFlag, Visibility, HorizontalAlignmentType, AdviserPlacementType, 
  Enabled, ChildrenPlacementType, ItemType } from '../../../enums';
import TreeItem from '../../../models/TreeItem';
import { RowType, GroupType } from './enums';
import NodeTypeSorter from './NodeTypeSorter';
import NodeGroupSorter from './NodeGroupSorter';
import BranchAligner from './BranchAligner';
import NavigationalFamily from './NavigationalFamily';

function NodeProps() {
  this.hasVisibleChildren = false;
  this.hasPartners = false;
  this.isPartner = false;
  this.hasLeavesOnly = true;
  this.hasChildren = false;

  this.typeSorter = NodeTypeSorter();
  this.groupSorter = NodeGroupSorter();
}

/* method uses structures created in orgTreeTask to create visual tree used to render chart
  It populates visualTree structure with TreeItem objects.
*/
export default function VisualTreeBuilder() {
  var _treeItemCounter,
    _activeItems;

  function build(orgTree, maximumId, activeItems, options) {
    _treeItemCounter = maximumId;
    _activeItems = activeItems;
    
    var {visualTree, navigationFamily, branchAligner} = createVisualTreeItems(orgTree, options, activeItems);

    return {
        visualTree: visualTree,
        navigationFamily: navigationFamily.getFamily(),
        branchAligner: branchAligner,
        treeItemCounter: _treeItemCounter
    };
  }

  function createVisualTreeItems(orgTree, options, activeItems) {
    var index,
      leftSiblingOffset,
      rightSiblingOffset,
      orgTreeProps = {},
      visualTree = Tree(), /* Tree(); key: TreeItem.id value: TreeItem */
      navigationFamily = NavigationalFamily(activeItems); /* Family structure where key: TreeItem.id and value: TreeItem */
   
    /* stage 1: orgTreeProps hash, find and set actualItemType, hasPartners, hasVisibleChildren, hasLeavesOnly */
    orgTree.loopPostOrder(this, function (nodeId, node, parentId, parent) {
      if(!orgTreeProps.hasOwnProperty(nodeId)) {
        orgTreeProps[nodeId] = new NodeProps();
      }
      var nodeProps = orgTreeProps[nodeId];
      nodeProps.actualItemType = node.itemType;
      if (parent != null) {
        if(!orgTreeProps.hasOwnProperty(parentId)) {
          orgTreeProps[parentId] = new NodeProps();
        }
        var parentProps = orgTreeProps[parentId];
        parentProps.hasVisibleChildren = parentProps.hasVisibleChildren || node.isVisible || nodeProps.hasVisibleChildren;
        parentProps.hasChildren = true;
        parentProps.hasLeavesOnly = parentProps.hasLeavesOnly && !nodeProps.hasChildren;
      }
    });

    /* stage 2: convert not supported combinations of child and parent items */
    orgTree.loopPreOrder(this, function (nodeId, node, parentId, parent) {
      var nodeProps = orgTreeProps[nodeId];
      var parentProps = orgTreeProps[parentId];
      if(!parentProps) {
        parentProps = new NodeProps();
        parentProps.actualItemType = ItemType.Regular;
        orgTreeProps[parentId] = parentProps;
      }
      switch (nodeProps.actualItemType) {
        case ItemType.LimitedPartner:
        case ItemType.AdviserPartner:
        case ItemType.GeneralPartner:
          /* Don't support partner of partner */
          if(parentProps.isPartner) {
            nodeProps.actualItemType = ItemType.Adviser;
          } else {
            nodeProps.isPartner = true;
            parentProps.hasPartners = true;
          }
          break;
        case ItemType.Regular:
          /* Don't support regular children of partner */
          if(parentProps.isPartner) {
            nodeProps.actualItemType = ItemType.Assistant;
          }
          break;
      }
    });

    /* stage 3: find nodes alignment levels, so nodes from different branches of the hierarchy will be placed at the same level */
    var branchAligner = BranchAligner();
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }
      orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
        var treeItemProps = orgTreeProps[orgItemId];
        parentProps.typeSorter.addChild(treeItemProps.actualItemType, orgItem.levelOffset, orgItem);
        parentProps.groupSorter.addChild(treeItemProps.actualItemType, orgItem.levelOffset, orgItem);
      });

      var partners = [];
      if(parentProps.hasPartners) {
        partners = [...parentProps.typeSorter.getRow(ItemType.AdviserPartner), ...parentProps.typeSorter.getRow(ItemType.LimitedPartner), ...parentProps.typeSorter.getRow(ItemType.GeneralPartner)];
      }
      var advisers = parentProps.typeSorter.getRow(ItemType.Adviser);
      if(advisers.length > 0) {
        /* extend advisers level */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAdvisersAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAdvisersAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        if(options.alignBranches) {
          if(parentProps.isPartner) {
            extendChildren = true;
          }
          if(extendChildren) {
            branchAligner.mergeToChild(parentOrgItemId, advisers, RowType.Advisers, 0, 0, extendChildren);
          } else {
            branchAligner.mergeToParent(parentOrgItemId, advisers);
          }
        } else {
          branchAligner.addChild(parentOrgItemId, advisers, RowType.Advisers, 0, 0, extendChildren);
        }
      }

      var subAdvisers = parentProps.typeSorter.getRow(ItemType.SubAdviser);
      if(subAdvisers.length > 0) {
        /* extend advisers level */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAdvisersAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAdvisersAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        if(options.alignBranches) {
          if(parentProps.isPartner) {
            extendChildren = true;
          }
          branchAligner.mergeToChild(parentOrgItemId, subAdvisers, RowType.SubAdvisers, 0, 1, extendChildren);

        } else {
          branchAligner.addChild(parentOrgItemId, subAdvisers, RowType.SubAdvisers, 0, 1, extendChildren);
        }
      }

      var assistants = parentProps.typeSorter.getRows(ItemType.Assistant);
      /* create assistants levels */
      if(assistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAssistantsAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAssistantsAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        assistants.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.Assistants, index, 0, extendChildren);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.Assistants, index, 0, extendChildren);
          }
        });
      }

      var subAssistants = parentProps.typeSorter.getRows(ItemType.SubAssistant);
      /* create assistants levels */
      if(subAssistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAssistantsAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAssistantsAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        subAssistants.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.SubAssistants, index, 1, extendChildren);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.SubAssistants, index, 1, extendChildren);
          }
        });
      }

      if(partners.length > 0) {
        branchAligner.mergeToParent(parentOrgItemId, partners);
      }

      var rowChildren = parentProps.groupSorter.getRows(GroupType.RowChildren);
      /* create row children levels */
      if(rowChildren.length > 0) {
        rowChildren.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.RowChildren, index, 0, true);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.RowChildren, index, 0, true);
          }
        });
      }

      /* add remaining children in formation */
      var children = parentProps.groupSorter.getRow(GroupType.Children);
      if(children.length > 0) {
        var props = orgTreeProps[parentOrgItemId];
        var childrenRows = getRegularChildrenRows(options, children, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
        childrenRows.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.Children, index, 0, true);
          } else {
            if(index == childrenRows.length - 1) {
              branchAligner.addSplitChildren(parentOrgItemId, nodes, RowType.Children, index, 0);
            } else {
              branchAligner.addChild(parentOrgItemId, nodes, RowType.Children, index, 0, true);
            }
          }
        });
      }
    });

    /* stage 4: measure depth of alignment levels */
    branchAligner.align();

    /* stage 5: create visual tree */
    var visualPartners = {};
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];

      var logicalParentItem = visualTree.node(parentOrgItemId);
      if (!logicalParentItem) {
        logicalParentItem = getNewTreeItem({
          visibility: Visibility.Invisible,
          connectorPlacement: 0,
          parentId: null,
          actualItemType: ItemType.Regular
        }, parentOrgItem);
        visualTree.add(null, parentOrgItemId, logicalParentItem);
      }

      /* find left and right siblings margins of logical parent item
        they are needed to properly place GeneralPartner & LimitedPartner nodes. */
      leftSiblingOffset = 0;
      rightSiblingOffset = 0;
      if ((index = visualTree.indexOf(parentOrgItemId)) != null) {
        leftSiblingOffset = index;
        rightSiblingOffset = visualTree.countSiblings(parentOrgItemId) - index - 1;
      }

      var partners = [];
      if(parentProps.hasPartners) {
        partners = [
          ...parentProps.typeSorter.getRow(ItemType.AdviserPartner), 
          ...parentProps.typeSorter.getRow(ItemType.LimitedPartner), 
          ...parentProps.typeSorter.getRow(ItemType.GeneralPartner)
        ];
      }
      var visualParent = logicalParentItem;
      var visualParent2 = null;
      var flagPartners = true;
      branchAligner.loopGroupTypes(this, parentOrgItemId, function(groupType, len) {
        if(!(parentProps.hasPartners || parentProps.isPartner) && groupType > parentProps.groupSorter.getLength() - 1) {
          return true;
        }
        if(groupType > GroupType.Assistants && flagPartners) {
          flagPartners = false;
          if(parentProps.hasPartners) {
            visualPartners[parentOrgItemId] = [visualParent.id];
            visualParent = visualParent2 || visualParent;
            visualParent2 = null;
            visualParent.partners = visualPartners[parentOrgItemId];
          }
          if(parentProps.isPartner) {
            visualPartners[parentOrgItem.parent].push(visualParent.id);
          }
        }
        var fillEmptyLevels = ((parentProps.isPartner || parentProps.hasPartners) && groupType <= GroupType.Assistants);
        fillEmptyLevels = fillEmptyLevels || groupType < parentProps.groupSorter.getLength() - 1;

        var rows = [];
        switch(groupType) {
          case GroupType.Items:
            var row = parentProps.groupSorter.getRows(GroupType.Items)[0] || [];
            var depth = branchAligner.getRowDepth(parentOrgItemId, GroupType.Items, 0);
            addAdvisers(visualTree, orgTreeProps, visualParent, row, leftSiblingOffset, rightSiblingOffset);
            row.forEach(item => navigationFamily.define(parentOrgItem, item));
            if(partners.length > 0) {
              visualParent2 = addPartners(visualTree, orgTreeProps, visualParent, partners, leftSiblingOffset, rightSiblingOffset);
              /* every child logically belongs to every partner */
              partners.forEach( partner => {
                navigationFamily.define(parentOrgItem, partner, true);
                if(partner.id != logicalParentItem.id) {
                  var rowChildren = parentProps.groupSorter.getRows(GroupType.RowChildren);
                  rowChildren.forEach(row => row.forEach(child => navigationFamily.define(partner, child)));
                  var regularChildren = parentProps.groupSorter.getRow(GroupType.Children);
                  regularChildren.forEach(child => navigationFamily.define(partner, child));
                }
              })
            }
            if(parentProps.hasPartners || parentProps.isPartner || groupType < parentProps.groupSorter.getLength() - 1) {
              while(depth > 1) {
                visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                if(visualParent2) {
                  visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
                }
                depth-=1;
              }
            }
            break;
          case GroupType.Assistants:
            var rows = parentProps.groupSorter.getRows(GroupType.Assistants);
            branchAligner.loopRows(this, parentOrgItemId, RowType.Assistants, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              visualParent = addAssistants(visualTree, orgTreeProps, visualParent, row);
              if(visualParent2) {
                visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
              }
              row.forEach(item => navigationFamily.define(parentOrgItem, item));
              if(parentProps.hasPartners || parentProps.isPartner || rowIndex < rows.length - 1 || groupType < parentProps.groupSorter.getLength() - 1) {
                while(depth > 1) {
                  visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                  if(visualParent2) {
                    visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
                  }
                  depth-=1;
                }
              }
            });
            break;
          case GroupType.RowChildren:
            var rows = parentProps.groupSorter.getRows(GroupType.RowChildren);
            branchAligner.loopRows(this, parentOrgItemId, RowType.RowChildren, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              var hideChildConnector = (logicalParentItem.visibility == Visibility.Invisible) && (logicalParentItem.connectorPlacement === 0);
              visualParent = addRowChildren(visualTree, visualParent, row, fillEmptyLevels || rowIndex < rows.length - 1, hideChildConnector, options.horizontalAlignment);
              row.forEach(item => navigationFamily.define(parentOrgItem, item));
              if(rowIndex < rows.length - 1 || groupType < parentProps.groupSorter.getLength() - 1) {
                while(depth > 1) {
                  visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                  depth-=1;
                }
              }
            });
            break;
          case GroupType.Children:
            var regularChildren = parentProps.groupSorter.getRow(GroupType.Children); /* children added after all other custom item types */
            /* add remaining children in formation */
            if(regularChildren.length > 0) {
              var props = orgTreeProps[logicalParentItem.id];
              var depths = branchAligner.getRowsDepth(parentOrgItemId, GroupType.Children);
              addChildren(orgTree, visualTree, depths, options, logicalParentItem, visualParent, regularChildren, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
              regularChildren.forEach(item => navigationFamily.define(parentOrgItem, item));
            }
            break;
        }
      });
      if(flagPartners) {
        flagPartners = false;
        if(parentProps.hasPartners) {
          visualPartners[parentOrgItemId] = [visualParent.id];
          visualParent = visualParent2 || visualParent;
          visualParent2 = null;
          visualParent.partners = visualPartners[parentOrgItemId];
        }
        if(parentProps.isPartner) {
          visualPartners[parentOrgItem.parent].push(visualParent.id);
        }
      }
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }
    });

    return {
        visualTree: visualTree,
        navigationFamily: navigationFamily,
        branchAligner: branchAligner
    }
  }

  function addPartners(visualTree, orgTreeProps, parent, partners, leftSiblingOffset, rightSiblingOffset) {
    var leftItems = [];
    var rightItems = [];
    partners.map(partner => getNewTreeItem({}, partner)).forEach(item => {
      var isLeft = true;
      if (parent.connectorPlacement & SideFlag.Right) {
        isLeft = true;
        item.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
      } else if (parent.connectorPlacement & SideFlag.Left) {
        isLeft = false;
        item.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
      } else {
        switch (item.adviserPlacementType) {
          case AdviserPlacementType.Left:
            isLeft = true;
            item.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
            break;
          default:
            isLeft = false;
            item.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
            break;
        }
        var itemProp = orgTreeProps[item.id];
        switch (itemProp.actualItemType) {
          case ItemType.GeneralPartner:
            item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
            break;
          case ItemType.LimitedPartner:
            item.connectorPlacement = SideFlag.Bottom;
            break;
          default:
            break;
        }
      }
      if(isLeft) {
        leftItems.unshift(item);
      } else {
        rightItems.push(item);
      }
    });

    var partners = [...leftItems, parent, ...rightItems];
    var parentIndex = leftItems.length;
    var centerIndex = Math.floor((partners.length) / 2);
    var invisiblePartner = null;
    if(partners.length % 2 == 0) {
      invisiblePartner = getNewTreeItem({ visibility: Visibility.Invisible });
      partners.splice(centerIndex, 0, invisiblePartner);
      if(centerIndex <= parentIndex) {
        parentIndex+=1;
      }
    }

    var visualParent = visualTree.parent(parent.id);
    for (var index = parentIndex - 1; index >= 0; index -= 1) {
      var item = partners[index];
      visualTree.add(visualParent.id, item.id, item, leftSiblingOffset);

      item.gravity = HorizontalAlignmentType.Right;
    }
    for (var index = parentIndex + 1; index < partners.length; index += 1) {
      var item = partners[index];
      visualTree.add(visualParent.id, item.id, item, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
      
      item.gravity = HorizontalAlignmentType.Left;
    }

    if(invisiblePartner != null) {
      var mimicPartner = null;
      if(centerIndex <= parentIndex) {
        mimicPartner = partners[centerIndex - 1];
      } else {
        mimicPartner = partners[centerIndex + 1];
      }
      invisiblePartner.connectorPlacement = mimicPartner.connectorPlacement & (SideFlag.Left | SideFlag.Right);
    }

    var centerPartner = partners[centerIndex];
    return centerPartner;
  }

  function addAdvisers(visualTree, orgTreeProps, parent, advisers, leftSiblingOffset, rightSiblingOffset) {
    advisers.map(adviser => getNewTreeItem({}, adviser)).forEach(item => {
      var itemProps = orgTreeProps[item.id];
      var alteredItem;
      switch(itemProps.actualItemType) {
        case ItemType.SubAdviser:
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
          visualTree.add(alteredItem.id, item.id, item);
          break;
        default:
          alteredItem = item;
          break;
      }
      var visualParent = visualTree.parent(parent.id);
      if (parent.connectorPlacement & SideFlag.Right) {
        visualTree.add(visualParent.id, alteredItem.id, alteredItem, leftSiblingOffset);
        alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
        alteredItem.gravity = HorizontalAlignmentType.Right;
      } else if (parent.connectorPlacement & SideFlag.Left) {
        visualTree.add(visualParent.id, alteredItem.id, alteredItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
        alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
        alteredItem.gravity = HorizontalAlignmentType.Left;
      } else {
        switch (item.adviserPlacementType) {
          case AdviserPlacementType.Left:
            visualTree.add(visualParent.id, alteredItem.id, alteredItem, leftSiblingOffset);
            alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
            alteredItem.gravity = HorizontalAlignmentType.Right;
            break;
          default:
            visualTree.add(visualParent.id, alteredItem.id, alteredItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
            alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
            alteredItem.gravity = HorizontalAlignmentType.Left;
            break;
        }
        switch (item.actualItemType) {
          case ItemType.GeneralPartner:
            alteredItem.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
            break;
          case ItemType.LimitedPartner:
            alteredItem.connectorPlacement = SideFlag.Bottom;
            break;
        }
      }
    })
  }
  
  function addAssistants(visualTree, orgTreeProps, visualParent, assistants) {
    var nextVisualParent = createNewVisualAggregator(visualTree, visualParent, false);
    assistants.map(assistant => getNewTreeItem({}, assistant)).forEach(item => {
      var itemProps = orgTreeProps[item.id];
      var alteredItem;
      switch(itemProps.actualItemType) {
        case ItemType.SubAssistant:
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
          visualTree.add(alteredItem.id, item.id, item);
          break;
        case ItemType.Assistant:
          alteredItem = item;
          break;
      }
      switch (item.adviserPlacementType) {
        case AdviserPlacementType.Left:
          visualTree.add(visualParent.id, alteredItem.id, alteredItem, 0);
          alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
          alteredItem.gravity = HorizontalAlignmentType.Right;
          break;
        default:
          visualTree.add(visualParent.id, alteredItem.id, alteredItem);
          alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
          alteredItem.gravity = HorizontalAlignmentType.Left;
          break;
      }
    });
    return nextVisualParent;
  }

  function addRowChildren(visualTree, visualParent, rowOfChildren, fillEmptyLevels, hideChildConnector, horizontalAlignment) {
    var nextVisualParent = null;
    if(fillEmptyLevels) {
      nextVisualParent = createNewVisualAggregator(visualTree, visualParent, hideChildConnector);
    }
    var medianIndex = 0;
    switch (horizontalAlignment) {
      case HorizontalAlignmentType.Center:
        medianIndex = Math.ceil(rowOfChildren.length / 2) - 1;
        break;
      case HorizontalAlignmentType.Left:
        medianIndex = -1;
        break;
      case HorizontalAlignmentType.Right:
        medianIndex = rowOfChildren.length - 1;
        break;
    }
    for (var index = medianIndex; index >= 0; index -= 1) {
      var item = getNewTreeItem({}, rowOfChildren[index]);
      visualTree.add(visualParent.id, item.id, item, 0);
      item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
      item.gravity = HorizontalAlignmentType.Right;
    }

    for (index = medianIndex + 1; index < rowOfChildren.length; index += 1) {
      item = getNewTreeItem({}, rowOfChildren[index]);
      visualTree.add(visualParent.id, item.id, item);
      item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
      item.gravity = HorizontalAlignmentType.Left;
    }
    return nextVisualParent;
  }

  function addChildren(orgTree, visualTree, depths, options, treeItem, visualParent, regularChildren, childrenPlacementType, hasLeavesOnly) {
    var visualParent,
      currentVisualParent,
      leftChildItem,
      rightChildItem,
      newAggregatorItem,
      childItem, orgChildItem,
      width,
      height,
      twinColumns,
      rowIndex,
      index, len,
      singleItemPlacement,
      hideParentConnector = (treeItem.visibility == Visibility.Invisible) && (treeItem.connectorPlacement === 0);

    switch (options.horizontalAlignment) {
      case HorizontalAlignmentType.Center:
      case HorizontalAlignmentType.Left:
        singleItemPlacement = AdviserPlacementType.Right;
        break;
      case HorizontalAlignmentType.Right:
        singleItemPlacement = AdviserPlacementType.Left;
        break;
    }

    if (childrenPlacementType === ChildrenPlacementType.Auto) {
      if (hasLeavesOnly) {
        childrenPlacementType = (options.leavesPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Matrix : options.leavesPlacementType;
      }
      else {
        childrenPlacementType = (options.childrenPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Horizontal : options.childrenPlacementType;
      }
    }

    if (childrenPlacementType == ChildrenPlacementType.Matrix && regularChildren.length < 3) {
      childrenPlacementType = ChildrenPlacementType.Horizontal;
    }

    switch (childrenPlacementType) {
      case ChildrenPlacementType.Horizontal:
        for (index = 0, len = regularChildren.length; index < len; index += 1) {
          childItem = getNewTreeItem({}, regularChildren[index]);
          orgChildItem = orgTree.node(childItem.id);
          visualTree.add(visualParent.id, childItem.id, childItem);
          childItem.connectorPlacement = (orgChildItem.hideParentConnection ? 0 : SideFlag.Top) | (orgChildItem.hideChildrenConnection ? 0 : SideFlag.Bottom);

          if (index === 0) {
            childItem.relationDegree = 1;
          }
        }
        break;
      case ChildrenPlacementType.Matrix:
        width = Math.min(options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
        height = Math.ceil(regularChildren.length / width);
        twinColumns = Math.ceil(width / 2.0);
        for (var columnIndex = 0; columnIndex < twinColumns; columnIndex += 1) {
          currentVisualParent = visualParent;
          for (rowIndex = 0; rowIndex < height; rowIndex += 1) {
            leftChildItem = getMatrixItem(regularChildren, columnIndex * 2, rowIndex, width);
            rightChildItem = getMatrixItem(regularChildren, columnIndex * 2 + 1, rowIndex, width);
            if (leftChildItem !== null || rightChildItem !== null) {
              var depth = depths[rowIndex - 1] || 1;
              while(depth > 1) {
                newAggregatorItem = getNewTreeItem({
                  visibility: Visibility.Invisible,
                  connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
                });
                visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
                currentVisualParent = newAggregatorItem;
                depth -= 1;
              }
            }
            if (leftChildItem !== null) {
              leftChildItem =  getNewTreeItem({},leftChildItem);
              if (columnIndex === 0) {
                leftChildItem.relationDegree = 1;
              }
              visualTree.add(currentVisualParent.id, leftChildItem.id, leftChildItem);
              leftChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              leftChildItem.gravity = HorizontalAlignmentType.Right;
            }
            if (leftChildItem !== null || rightChildItem !== null) {
              newAggregatorItem = getNewTreeItem({
                visibility: Visibility.Invisible,
                connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
              });
              visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
            }
            if (rightChildItem !== null) {
              rightChildItem = getNewTreeItem({},rightChildItem);
              visualTree.add(currentVisualParent.id, rightChildItem.id, rightChildItem);
              rightChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              rightChildItem.gravity = HorizontalAlignmentType.Left;
            }
            currentVisualParent = newAggregatorItem;
          }
        }
        if (width > 2) {
          // No center alignment to aggregator required
          visualParent.visualAggregatorId = null;
        }
        break;
      case ChildrenPlacementType.Vertical:
        for (index = 0, len = regularChildren.length; index < len; index += 1) {
          childItem = getNewTreeItem({}, regularChildren[index]);
          var depth = (index == len - 1) ?  1 : depths[index] || 1;
          var aggregatorItem = visualParent;
          while(depth > 0) {
            newAggregatorItem = getNewTreeItem({
              visibility: Visibility.Invisible,
              connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
            });
            visualTree.add(aggregatorItem.id, newAggregatorItem.id, newAggregatorItem);
            aggregatorItem = newAggregatorItem;
            depth -= 1;
          }

          switch (singleItemPlacement) {
            case AdviserPlacementType.Left:
              visualTree.add(visualParent.id, childItem.id, childItem, 0);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Right;
              break;
            case AdviserPlacementType.Right:
              visualTree.add(visualParent.id, childItem.id, childItem);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Left;
              break;
          }
          visualParent = newAggregatorItem;
        }
        break;
      default:
        throw "Children placement is undefined!";
    }
  }

  function getRegularChildrenRows(options, regularChildren, childrenPlacementType, hasLeavesOnly) {
    var results = [];

    if (childrenPlacementType === ChildrenPlacementType.Auto) {
      if (hasLeavesOnly) {
        childrenPlacementType = (options.leavesPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Matrix : options.leavesPlacementType;
      }
      else {
        childrenPlacementType = (options.childrenPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Horizontal : options.childrenPlacementType;
      }
    }

    if (childrenPlacementType == ChildrenPlacementType.Matrix && regularChildren.length < 3) {
      childrenPlacementType = ChildrenPlacementType.Horizontal;
    }

    switch (childrenPlacementType) {
      case ChildrenPlacementType.Horizontal:
        results.push(regularChildren);
        break;
      case ChildrenPlacementType.Matrix:
        var width = Math.min(options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
        for(var index = 0; index < regularChildren.length; index+= width) {
          results.push(regularChildren.slice(index, index + width));
        }
        break;
      case ChildrenPlacementType.Vertical:
        regularChildren.forEach(childItem => {
          results.push([childItem])
        })
        break;
    }
    return results;
  }

  function getMatrixItem(items, x, y, width) {
    var result,
      isOdd = (width % 2 > 0),
      index;

    if (isOdd) {
      if (x === width - 1) {
        x = items.length;
      }
      else if (x === width) {
        x = width - 1;
      }
    }
    index = y * width + x;

    result = (index > items.length - 1) ? null : items[index];

    return result;
  }

  function createNewVisualAggregator(visualTree, treeItem, hideChildrenConnector) {
    var newAggregatorItem,
      hideParentConnector = ((treeItem.visibility == Visibility.Invisible) && ((treeItem.connectorPlacement & SideFlag.Top) === 0)) || hideChildrenConnector;

    newAggregatorItem = getNewTreeItem({
      visibility: Visibility.Invisible,
      visualAggregatorId: treeItem.visualAggregatorId,
      connectorPlacement: hideParentConnector ? 0 : (SideFlag.Top | SideFlag.Bottom)
    });

    visualTree.insert(treeItem.id, newAggregatorItem.id, newAggregatorItem);

    treeItem.visualAggregatorId = newAggregatorItem.id;
    return newAggregatorItem;
  }

  function getNewTreeItem(properties, orgItem) {
    var result = new TreeItem(),
      optionKey;

    if (orgItem != null) {
      result.actualItemType = orgItem.itemType;
      result.adviserPlacementType = orgItem.adviserPlacementType;
    }

    for (optionKey in properties) {
      if (properties.hasOwnProperty(optionKey)) {
        result[optionKey] = properties[optionKey];
      }
    }

    if (orgItem != null) {
      result.id = orgItem.id;
      result.visibility = orgItem.isVisible ? Visibility.Auto : Visibility.Invisible;
    } else {
      _treeItemCounter += 1;
      result.id = _treeItemCounter;
    }

    return result;
  }

  return {
    build: build
  };
};