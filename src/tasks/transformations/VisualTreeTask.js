import Family from '../../algorithms/Family';
import Tree from '../../algorithms/Tree';
import { SideFlag, Visibility, HorizontalAlignmentType, AdviserPlacementType, 
  Enabled, ChildrenPlacementType, ItemType } from '../../enums';
import TreeItem from '../../models/TreeItem';

var GroupType = {
  Items: 0,
  Assistants: 1,
  RowChildren: 2,
  Children: 3
};

function NodeProps() {
  this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 
  this.hasPartners = false; // If it is true then item has partners. 
  this.isPartner = false;
  this.hasLeavesOnly = true; // If it is true then all regular child items having levelOffset = null are leaves 
  this.hasChildren = false;

  this.rows = [];
  this.groupedRows = [];

  this.getRow = function(itemType, index) {
    return (this.rows[itemType] || [])[index || 0] || [];
  }

  this.getRows = function(itemType) {
    return this.rows[itemType] || [];
  }

  this.getGroupedRow = function(groupType, index) {
    return (this.groupedRows[groupType] || [])[index || 0] || [];
  }

  this.getGroupedRows = function(groupType) {
    return this.groupedRows[groupType] || [];
  }

  this.getLength = function() {
    return this.groupedRows.length;
  }

  this.addChildToRow = function(itemType, index, orgItem) {
    this.rows[itemType] = this.rows[itemType] || [];
    var groups = this.rows[itemType];
    groups[index] = groups[index] || [];
    groups[index].push(orgItem);
  }

  this.addChildToGroupedRow = function(groupType, index, orgItem) {
    this.groupedRows[groupType] = this.groupedRows[groupType] || [];
    var groups = this.groupedRows[groupType];
    groups[index] = groups[index] || [];
    groups[index].push(orgItem);
  }

  this.addChild =function(itemType, index, orgItem) {
    switch (itemType) {
      case ItemType.SubAdviser:
      case ItemType.Adviser:
        this.addChildToRow(itemType, 0, orgItem);
        this.addChildToGroupedRow(GroupType.Items, 0, orgItem);
        break;
      case ItemType.SubAssistant:
      case ItemType.Assistant:
        index = (index < 0 || index == null) ? 0 : index;
        this.addChildToRow(itemType, index, orgItem);
        this.addChildToGroupedRow(GroupType.Assistants, index, orgItem);
        break;
      case ItemType.Regular:
        if(index < 0 || index === undefined || index === null) {
          this.addChildToGroupedRow(GroupType.Children, 0, orgItem);
        } else {
          this.addChildToGroupedRow(GroupType.RowChildren, index, orgItem);
        }
        break;
      default:
        this.addChildToRow(itemType, 0, orgItem);
        break;
    }
  }
}

var RowType = {
  Items: 0,
  Advisers: 1,
  SubAdvisers: 2,
  Assistants: 3,
  SubAssistants: 4,
  RowChildren: 5,
  Children: 6
};


var mapRowTypes = {};
mapRowTypes[RowType.Items] = GroupType.Items;
mapRowTypes[RowType.Advisers] = GroupType.Items;
mapRowTypes[RowType.SubAdvisers] = GroupType.Items;
mapRowTypes[RowType.Assistants] = GroupType.Assistants;
mapRowTypes[RowType.SubAssistants] = GroupType.Assistants;
mapRowTypes[RowType.RowChildren] = GroupType.RowChildren;
mapRowTypes[RowType.Children] = GroupType.Children;

function Row(id) {
  this.id = id;
  this.index = 0;
  this.offset = 0;
  this.extend = true; /* indicates that we need to keep branches of this row children above subsequent rows */
  this.nodes = [];
  this.depth = 0;
  
  this.groups = [];
  this.groups[GroupType.Items] = [[1,1]];
  
  this.getDepth = function() {
    var [currExtend, currDepth] = this.groups.reduce((acc, row) => {
        return row.reduce(([currExtend, currDepth], item) => {
          var [extend, depth] = item || [1, 1];
          return [currExtend + extend, Math.max(currDepth, currExtend + depth)];
        }, acc)
    }, [0,0]);
    return Math.max(currExtend, currDepth) || 1;
  };


  this.addRowDepth = function(rowType, extend, index, depth) {
    var groupIndex = mapRowTypes[rowType];
    if(!this.groups[groupIndex]) {
      this.groups[groupIndex] = [];
    }
    var rows = this.groups[groupIndex];
    var [currExtend, currDepth] = rows[index] || [1,1];
    rows[index] = [Math.max(currExtend, extend ? depth : 1), Math.max(currDepth, depth)];
  }

  // function loopGroupTypes(rowType, len)
  this.loopGroupTypes = function(thisArg, onGroupType) {
    for(var index = 0, len = this.groups.length; index < len; index+=1) {
      if(this.groups[index]) {
        if(onGroupType.call(thisArg, index, len)) {
          break;
        }
      }
    }
  }

  this.getRowDepth = function(groupType, index) {
    var row = (this.groups[groupType] || [])[index];
    return (row && row[0]) || 1;
  }

  this.getRowsDepth = function(groupType) {
    var rows = this.groups[groupType] || [];
    return rows.map(item => item[0]);
  }

  // function onRow(rowDepth, index)
  this.loopRows = function(thisArg, rowType, onRow) {
    var groupIndex = mapRowTypes[rowType];
    var rows = this.groups[groupIndex] || [];
    for(var index = 0; index < rows.length; index+=1) {
      var row = rows[index];
      if(row) {
        if(onRow.call(thisArg, row[0], index)) {
          break;
        }
      }
    }
  }
}

/* method uses structures created in orgTreeTask to create visual tree used to render chart
  It populates visualTree structure with TreeItem objects.
  
  1. Create invisible visual root item, so all orphans added to it, but since it is invisible, no connections are going to be drawn between them
  2. Collect info about child nodes for every parent
  3. Loop orgTree nodes and populate visual tree hierarchy: visualTree
  4. Extend nodes to align nodes into levels
*/
export default function VisualTreeTask(orgTreeTask, activeItemsTask, visualTreeOptionTask) {
  var _data = {
    visualTree: null, /* Tree(); key: TreeItem.id value: TreeItem */
    leftMargins: {},
    rightMargins: {},
    navigationFamily: null /* Family structure where key: TreeItem.id and value: TreeItem */
  },
    _treeItemCounter,
    _activeItems;

  function process() {
    var orgTree = orgTreeTask.getOrgTree(),
      options = visualTreeOptionTask.getOptions();

    _activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

    _data.visualTree = Tree();
    _data.navigationFamily = Family();

    _treeItemCounter = orgTreeTask.getMaximumId();

    if (orgTree.hasNodes()) {
      createVisualTreeItems(orgTree, options, _data.visualTree);
    }


    _data.leftMargins = {},
    _data.rightMargins = {};
    updateVisualTreeMargins(_data.visualTree, _data.leftMargins, _data.rightMargins);

    return true;
  }

  function RowKeyGenerator() {
    var _rowsHash = {};
    var _rowIndex = 1;

    function get(parentId, rowType, index) {
      if(arguments.length > 0) {
        var key = parentId + '-' + rowType + '-' + index;
        if(!_rowsHash.hasOwnProperty(key)) {
          _rowsHash[key] = _rowIndex;
          _rowIndex+=1;
        }
        return _rowsHash[key];
      } else {
        var result = _rowIndex;
        _rowIndex+=1;
        return result;
      }
    }

    return {
      get: get
    }
  }

  function createVisualTreeItems(orgTree, options, visualTree) {
    var index,
      leftSiblingOffset,
      rightSiblingOffset,
      orgTreeProps = {};

   
    /* stage 1: orgTreeProps hash, find and set actualItemType, hasPartners, hasVisibleChildren, hasLeavesOnly */
    orgTree.loopPostOrder(this, function (nodeId, node, parentId, parent) {
      if(!orgTreeProps.hasOwnProperty(nodeId)) {
        orgTreeProps[nodeId] = new NodeProps();
      }
      var nodeProps = orgTreeProps[nodeId];
      nodeProps.actualItemType = node.itemType;

      nodeProps.hasVisibleChildren = node.isVisible || nodeProps.hasVisibleChildren;
      if (parent != null) {
        if(!orgTreeProps.hasOwnProperty(parentId)) {
          orgTreeProps[parentId] = new NodeProps();
        }
        var parentProps = orgTreeProps[parentId];
        parentProps.hasVisibleChildren = parentProps.hasVisibleChildren || nodeProps.hasVisibleChildren;
        parentProps.hasChildren = true;
        parentProps.hasLeavesOnly = parentProps.hasLeavesOnly && !nodeProps.hasChildren;
        switch (node.itemType) {
          case ItemType.LimitedPartner:
          case ItemType.AdviserPartner:
          case ItemType.GeneralPartner:
            /* Don't support partner of partner */
            parentProps.hasPartners = true;
            nodeProps.isPartner = true;
            break;
        }
      }
    });

    var rowsTree = Tree();
    var rowKeyGenerator = RowKeyGenerator(); // rowKey = rowKeyGenerator.get(parentRowId, RowType.Children, 3);
    var rowHash = {}; // rowHash[nodeId] = rowKey;

    /* stage 2: create rowsTree, find alignment rows, nodes having children aligned across branches of the hierarchy */
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];
      if(!parentProps) {
        parentProps = new NodeProps();
        parentProps.actualItemType = ItemType.Regular;
        orgTreeProps[parentOrgItemId] = parentProps;
      }
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }

      orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
        var treeItemProps = orgTreeProps[orgItemId];
        if (treeItemProps.hasVisibleChildren) {
          switch (parentProps.actualItemType) {
            case ItemType.LimitedPartner:
            case ItemType.AdviserPartner:
            case ItemType.GeneralPartner:
              switch (treeItemProps.actualItemType) {
                case ItemType.LimitedPartner:
                case ItemType.AdviserPartner:
                case ItemType.GeneralPartner:
                  /* Don't support partner of partner */
                  treeItemProps.actualItemType = ItemType.Adviser;
                  break;
                case ItemType.Regular:
                  /* Don't support regular children of partner */
                  treeItemProps.actualItemType = ItemType.Assistant;
                  break;
              }
              break;
          }

          parentProps.addChild(treeItemProps.actualItemType, orgItem.levelOffset, orgItem);
        }
      });

      /* find the alignment row for the parent node */
      var parentRowId = rowHash[parentOrgItemId];
      var parentRow;
      if(!parentRowId) {
        parentRowId = rowKeyGenerator.get(null, RowType.Children, 0);
        parentRow = new Row(parentRowId);
        parentRow.rowType = RowType.Items;
        parentRow.index = 0;
        parentRow.offset = 0;
        parentRow.extend = false;
        rowsTree.add(null, parentRowId, parentRow);
        rowHash[parentOrgItemId] = parentRowId;
      } else {
        parentRow = rowsTree.node(parentRowId);
      }

      var partners = [...parentProps.getRow(ItemType.AdviserPartner), ...parentProps.getRow(ItemType.LimitedPartner), ...parentProps.getRow(ItemType.GeneralPartner)];
      var advisers = parentProps.getRow(ItemType.Adviser);
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
          switch (parentProps.actualItemType) {
            case ItemType.LimitedPartner:
            case ItemType.AdviserPartner:
            case ItemType.GeneralPartner:
              extendChildren = true;
              break;
          }
          if(extendChildren) {
            var rowId = rowKeyGenerator.get(parentRow.id, RowType.Advisers, 0);
            mergeNodesIntoAlignmentRow(advisers, rowsTree, rowHash, parentRow.id, rowId, { extendChildren, index: 0, offset: 0, rowType: RowType.Advisers } );
          } else {
            mergeNodesIntoAlignmentRow(advisers, rowsTree, rowHash, parentRow.id, parentRow.id, { extendChildren, index: 0, offset: 0, rowType: RowType.Advisers } );
          }
        } else {
          var rowId = rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(advisers, rowsTree, rowHash, parentRow.id,  rowId, { extendChildren, index: 0, offset: 0, rowType: RowType.Advisers } );
        }
      }

      var subAdvisers = parentProps.getRow(ItemType.SubAdviser);
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
          switch (parentProps.actualItemType) {
            case ItemType.LimitedPartner:
            case ItemType.AdviserPartner:
            case ItemType.GeneralPartner:
              extendChildren = true;
              break;
          }
          var rowId = rowKeyGenerator.get(parentRow.id, RowType.SubAdvisers, 0);
          mergeNodesIntoAlignmentRow(subAdvisers, rowsTree, rowHash, parentRow.id, rowId, { extendChildren, index: 0, offset: 1, rowType: RowType.SubAdvisers });

        } else {
          var rowId = rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(subAdvisers, rowsTree, rowHash, parentRow.id, rowId, { extendChildren, index: 0, offset: 1, rowType: RowType.SubAdvisers });
        }
      }

      var assistants = parentProps.getRows(ItemType.Assistant);
      /* create assistants levels */
      if(assistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0 || options.alignBranches;
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
          var rowId = options.alignBranches ? rowKeyGenerator.get(parentRow.id, RowType.Assistants, index) : rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(nodes, rowsTree, rowHash, parentRow.id, rowId, { extendChildren, index, offset: 0, rowType: RowType.Assistants });
        });
      }

      var subAssistants = parentProps.getRows(ItemType.SubAssistant);
      /* create assistants levels */
      if(subAssistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0 || options.alignBranches;
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
          var rowId = options.alignBranches ? rowKeyGenerator.get(parentRow.id, RowType.SubAssistants, index) : rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(nodes, rowsTree, rowHash, parentRow.id, rowId, { extendChildren, index, offset: 1, rowType: RowType.SubAssistants });
        });
      }

      if(partners.length > 0) {
        mergeNodesIntoAlignmentRow(partners, rowsTree, rowHash, parentRow.id, parentRow.id, {});
      }

      var rowChildren = parentProps.getGroupedRows(GroupType.RowChildren);
      /* create row children levels */
      if(rowChildren.length > 0) {
        rowChildren.forEach((nodes, index) => {
          var rowId = options.alignBranches ? rowKeyGenerator.get(parentRow.id, RowType.RowChildren, index) : rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(nodes, rowsTree, rowHash, parentRow.id, rowId, { extendChildren: true, index, offset: 0, rowType: RowType.RowChildren });
        });
      }

      /* add remaining children in formation */
      var children = parentProps.getGroupedRow(GroupType.Children);
      if(children.length > 0) {
        var props = orgTreeProps[parentOrgItemId];
        var childrenRows = getRegularChildrenRows(options, children, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
        childrenRows.forEach((nodes, index) => {
          var rowId = options.alignBranches ? rowKeyGenerator.get(parentRow.id, RowType.Children, index) : rowKeyGenerator.get();
          mergeNodesIntoAlignmentRow(nodes, rowsTree, rowHash, parentRow.id, rowId, { extendChildren: true, index, offset: 0, rowType: RowType.Children });
        });
      }
    });

    /* stage 3: measure depth of rows in rowsTree, count number of assistants and child rows, find depth of partner's branches */
    rowsTree.loopPostOrder(this, function (rowId, row, parentRowId, parentRow) {
      console.log(rowId + "  " + Object.entries(RowType).filter(([name, value]) => value == row.rowType)[0][0]  + " parent=" + parentRowId + " extend=" + row.extend);
      if(parentRow != null) {
        row.depth = row.getDepth() + row.offset;
        console.log(rowId + "  depth = " + row.depth);
        parentRow.addRowDepth(row.rowType, row.extend, row.index, row.depth);
      }
    });
    var visualPartners = {};

    /* stage 4: create visual tree */
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }

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

      /* find the alignment row for the parent node */
      var parentRowId = rowHash[parentOrgItemId];
      var parentRow = rowsTree.node(parentRowId);

      var partners = [
        ...parentProps.getRow(ItemType.AdviserPartner), 
        ...parentProps.getRow(ItemType.LimitedPartner), 
        ...parentProps.getRow(ItemType.GeneralPartner)
      ];

      var visualParent = logicalParentItem;
      var visualParent2 = null;
      var flagPartners = true;
      parentRow.loopGroupTypes(this, function(groupType, len) {
        if(!(parentProps.hasPartners || parentProps.isPartner) && groupType > parentProps.getLength() - 1) {
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
        var fillEmptyLevels = groupType < len - 1;
        var rows = [];
        switch(groupType) {
          case GroupType.Items:
            var row = parentProps.getGroupedRows(GroupType.Items)[0] || [];
            var depth = parentRow.getRowDepth(GroupType.Items, 0);
            addAdvisers(visualTree, orgTreeProps, visualParent, row, leftSiblingOffset, rightSiblingOffset);
            row.forEach(item => defineNavigationParent(parentOrgItem, item));
            if(partners.length > 0) {
              visualParent2 = addPartners(visualTree, orgTreeProps, visualParent, partners, leftSiblingOffset, rightSiblingOffset);
              /* every child logically belongs to every partner */
              partners.forEach( partner => {
                defineNavigationParent(parentOrgItem, partner, true);
                if(partner.id != logicalParentItem.id) {
                  var rowChildren = parentProps.getGroupedRows(GroupType.RowChildren);
                  rowChildren.forEach(row => row.forEach(child => defineNavigationParent(partner, child)));
                  var regularChildren = parentProps.getGroupedRow(GroupType.Children);
                  regularChildren.forEach(child => defineNavigationParent(partner, child));
                }
              })
            }
            if(parentProps.hasPartners || parentProps.isPartner || groupType < parentProps.getLength() - 1) {
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
            var rows = parentProps.getGroupedRows(GroupType.Assistants);
            parentRow.loopRows(this, RowType.Assistants, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              visualParent = addAssistants(visualTree, orgTreeProps, visualParent, row);
              if(visualParent2) {
                visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
              }
              row.forEach(item => defineNavigationParent(parentOrgItem, item));
              if(parentProps.hasPartners || parentProps.isPartner || rowIndex < rows.length - 1 || groupType < parentProps.getLength() - 1) {
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
            var rows = parentProps.getGroupedRows(GroupType.RowChildren);
            parentRow.loopRows(this, RowType.RowChildren, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              var hideChildConnector = (logicalParentItem.visibility == Visibility.Invisible) && (logicalParentItem.connectorPlacement === 0);
              visualParent = addRowChildren(visualTree, visualParent, row, fillEmptyLevels || rowIndex < rows.length - 1, hideChildConnector, options.horizontalAlignment);
              row.forEach(item => defineNavigationParent(parentOrgItem, item));
              if(rowIndex < rows.length - 1 || groupType < parentProps.getLength() - 1) {
                while(depth > 1) {
                  visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                  depth-=1;
                }
              }
            });
            break;
          case GroupType.Children:
            var regularChildren = parentProps.getGroupedRow(GroupType.Children); /* children added after all other custom item types */
            /* add remaining children in formation */
            if(regularChildren.length > 0) {
              var props = orgTreeProps[logicalParentItem.id];
              var depths = parentRow.getRowsDepth(GroupType.Children);
              addChildren(orgTree, visualTree, depths, options, logicalParentItem, visualParent, regularChildren, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
              regularChildren.forEach(item => defineNavigationParent(parentOrgItem, item));
            }
            break;
        }
      });
    });
  }

  function mergeNodesIntoAlignmentRow(nodes, rowsTree, rowHash, parentRowId, rowId, { extendChildren, index, offset, rowType }) {
    var row = rowsTree.node(rowId);
    if(row) {
      row.nodes = [...row.nodes, ...nodes];
    } else {
      row = new Row(rowId);
      row.nodes = nodes;
      row.extend = extendChildren;
      row.index = index || 0;
      row.offset = offset || 0;
      row.rowType = rowType;
      rowsTree.add(parentRowId, rowId, row)        
    };
    nodes.forEach(child => {
      rowHash[child.id] = rowId;
    });
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
              var depth = depths[rowIndex] || 1;
              var aggregatorItem = currentVisualParent;
              while(depth > 0) {
                newAggregatorItem = getNewTreeItem({
                  visibility: Visibility.Invisible,
                  connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
                });
                visualTree.add(aggregatorItem.id, newAggregatorItem.id, newAggregatorItem);
                aggregatorItem = newAggregatorItem;
                depth -= 1;
              }
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
          var depth = depths[index] || 1;
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

  function defineNavigationParent(parentItem, treeItem, skipFirstParent) {
    var parents = [];
    /* take logicalParentItem when it is visible or collect all visible immediate parents of logicalParentItem */
    if (skipFirstParent || !parentItem.isVisible || !_activeItems.hasOwnProperty(parentItem.id)) {
      if (!skipFirstParent && parentItem.isVisible) {
        parents.push(parentItem.id);
      }
      _data.navigationFamily.loopParents(this, parentItem.id, function (parentId, parent, level) {
        if (parent.isVisible) {
          parents.push(parentId);
          if (_activeItems.hasOwnProperty(parentId)) {
            return _data.navigationFamily.SKIP;
          }
        }
      });
    } else {
      parents.push(parentItem.id);
    }
    if (_data.navigationFamily.node(treeItem.id) != null) {
      _data.navigationFamily.adopt(parents, treeItem.id);
    } else {
      _data.navigationFamily.add(parents, treeItem.id, treeItem);
    }
  }

  function updateVisualTreeMargins(visualTree, leftMargins, rightMargins) {
    visualTree.loop(this, function (nodeid, node) {
      leftMargins[nodeid] = [];
      rightMargins[nodeid] = [];
    });

    visualTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
      var parentLeftMargins = leftMargins[parentid],
        parentRightMargins = rightMargins[parentid],
        nodeLeftMargins = leftMargins[nodeid],
        nodeRightMargins = rightMargins[nodeid],
        index, len;

      if (parentid != null) {
        /* update parent left margins */
        if (!parentLeftMargins[0]) {
          parentLeftMargins[0] = nodeid;
        }

        for (index = 0, len = nodeLeftMargins.length; index < len; index += 1) {
          if (!parentLeftMargins[index + 1]) {
            parentLeftMargins[index + 1] = nodeLeftMargins[index];
          }
        }

        /* update parent rights margins */
        parentRightMargins[0] = nodeid;

        for (index = 0, len = nodeRightMargins.length; index < len; index += 1) {
          parentRightMargins[index + 1] = nodeRightMargins[index];
        }
      }
    });
  }

  function getVisualTree() {
    return _data.visualTree;
  }

  function getLogicalFamily() {
    return _data.navigationFamily;
  }

  function getLeftMargins() {
    return _data.leftMargins;
  }

  function getRightMargins() {
    return _data.rightMargins;
  }

  function getMaximumId() {
    return _treeItemCounter;
  }

  return {
    process: process,
    getVisualTree: getVisualTree,
    getLogicalFamily: getLogicalFamily,
    getLeftMargins: getLeftMargins,
    getRightMargins: getRightMargins,
    getMaximumId: getMaximumId
  };
};