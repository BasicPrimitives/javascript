import Family from '../../algorithms/Family';
import Tree from '../../algorithms/Tree';
import { SideFlag, Visibility, HorizontalAlignmentType, AdviserPlacementType, 
  Enabled, ChildrenPlacementType, ItemType } from '../../enums';
import TreeItem from '../../models/TreeItem';

var RowType = {
  Items: 0,
  /**
   * Advisers
   */
  Advisers: 1,
  /**
   * Assistants
   */
  Assistants: 2,
  /**
   * Row Children
   */
  RowChildren: 3,
  /**
   * Children
   */
  Children: 4
};

function Row(id) {
  this.id = id;
  this.extend = true; /* indicates that we need to extend aggregators to fit nodes branches */
  this.nodes = []; /* nodes to measure depth for*/
  this.aggregators = []; /* nodes to extend */
  this.partners = []; /* nodes to align by depth */

  this.merge = function(row) {
    this.nodes = [...this.nodes, ...row.nodes];
    this.aggregators = [...this.aggregators, ...row.aggregators];
    this.partners = [...this.partners, ...row.partners];
  }
}

function Nest() {
  this.advisers = []; // Row
  this.assistants = []; // Row
  this.rowChildren = []; // Row
  this.children = []; // Row

  this.partners = [];
  this.hasPartners = function() {
    return this.partners.length > 0;
  }

  this.depth = 0;
}

function NodeProps() {
  this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 
  this.hasPartners = false; // If it is true then item has partners. 
  this.hasLeavesOnly = true; // If it is true then all regular child items having levelOffset = null are leaves 
  this.hasChildren = false;
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
    var _rowIndex = 0;

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
    var treeItem,
      visualParent,
      index,
      nests = {},
      leftSiblingOffset,
      rightSiblingOffset,
      orgTreeProps = {};

   
    /* org tree item has visible children */
    orgTree.loopPostOrder(this, function (nodeId, node, parentId, parent) {
      if(!orgTreeProps.hasOwnProperty(nodeId)) {
        orgTreeProps[nodeId] = new NodeProps();
      }
      var nodeProps = orgTreeProps[nodeId];

      nodeProps.hasVisibleChildren = node.isVisible || nodeProps.hasVisibleChildren;
      if (parent != null) {
        if(!orgTreeProps.hasOwnProperty(parentId)) {
          orgTreeProps[parentId] = new NodeProps();
        }
        var parentProps = orgTreeProps[parentId];
        parentProps.hasVisibleChildren = parentProps.hasVisibleChildren || nodeProps.hasVisibleChildren;
        parentProps.hasChildren = true;
        parentProps.hasLeavesOnly = parentProps.hasLeavesOnly && !nodeProps.hasChildren;
        switch (node.actualItemType) {
          case ItemType.LimitedPartner:
          case ItemType.AdviserPartner:
          case ItemType.GeneralPartner:
            /* Don't support partner of partner */
            parentProps.hasPartners = true;
            break;
        }
      }
    });

    var rowsTree = Tree();
    var rowKeyGenerator = RowKeyGenerator(); // rowKey = rowKeyGenerator.get(parentRowId, RowType.Children, 3);
    var rowHash = {}; // rowHash[nodeId] = rowKey;

    /* stage 1: create visual tree & nests alignment tree */
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      if (!orgTreeProps[parentOrgItemId].hasVisibleChildren) {
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
      var parentRow;
      if(!parentRowId) {
        parentRowId = rowKeyGenerator.get(null, RowType.Items, 0);
        parentRow = new Row(parentRowId);
        //rowsTree.add(null, parentRowId, parentRow);
        rowHash[parentOrgItemId] = parentRowId;
      } else {
        parentRow = rowsTree.node(parentRowId);
      }

      var nest = new Nest();

      var advisers = [];
      var partnerAdvisers = [];
      var generalPartners = [];
      var assistants = [];
      var rowChildren = [];
      var regularChildren = []; /* children added after all other custom item types */
      
      /* populate children */
      orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
        var shiftParent;
        if (orgTreeProps[orgItemId].hasVisibleChildren) {
          treeItem = getNewTreeItem({
            parentId: parentOrgItemId,
            actualItemType: orgItem.itemType,
            adviserPlacementType: orgItem.adviserPlacementType
          }, orgItem);

          switch (logicalParentItem.actualItemType) {
            case ItemType.LimitedPartner:
            case ItemType.AdviserPartner:
            case ItemType.GeneralPartner:
              switch (treeItem.actualItemType) {
                case ItemType.LimitedPartner:
                case ItemType.AdviserPartner:
                case ItemType.GeneralPartner:
                  /* Don't support partner of partner */
                  treeItem.actualItemType = ItemType.Adviser;
                  break;
                case ItemType.Regular:
                  /* Don't support regular children of partner */
                  treeItem.actualItemType = ItemType.Assistant;
                  break;
              }
              break;
          }

          switch (treeItem.actualItemType) {
            case ItemType.SubAdviser:
            case ItemType.Adviser:
              advisers.push(treeItem);
              defineNavigationParent(logicalParentItem, treeItem);
              break;
            case ItemType.SubAssistant:
            case ItemType.Assistant:
              var levelOffset = orgItem.levelOffset || 0;
              if (assistants[levelOffset] == null) {
                assistants[levelOffset] = [treeItem];
              } else {
                assistants[levelOffset].push(treeItem);
              }
              defineNavigationParent(logicalParentItem, treeItem);
              break;
            case ItemType.AdviserPartner:
                partnerAdvisers.push(treeItem);
                if (logicalParentItem.parentId != null) {
                  defineNavigationParent(visualTree.node(logicalParentItem.parentId), treeItem);
                } else {
                  defineNavigationParent(logicalParentItem, treeItem, true);
                }
                break;
            case ItemType.LimitedPartner:
            case ItemType.GeneralPartner:
              generalPartners.push(treeItem);
              if (logicalParentItem.parentId != null) {
                defineNavigationParent(visualTree.node(logicalParentItem.parentId), treeItem);
              } else {
                defineNavigationParent(logicalParentItem, treeItem, true);
              }
              break;
            case ItemType.Regular:
              if(orgItem.levelOffset === undefined || orgItem.levelOffset === null) {
                regularChildren.push(treeItem);
              } else {
                if (rowChildren[orgItem.levelOffset] == null) {
                  rowChildren[orgItem.levelOffset] = [treeItem];
                } else {
                  rowChildren[orgItem.levelOffset].push(treeItem);
                }
              }
              defineNavigationParent(logicalParentItem, treeItem);
              break;
          }
        }
      });

      visualParent = logicalParentItem;

      var partners = [...partnerAdvisers, ...generalPartners];

      if(advisers.length > 0) {
        nest.advisers = addAdvisers(visualTree, visualParent, advisers, leftSiblingOffset, rightSiblingOffset);

        /* extend advisers level */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItemId.placeAdvisersAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAdvisersAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        if (!extendChildren) {
          nest.advisers.forEach(sourceRow => sourceRow.extend = false);
        }
        if(!extendChildren && options.alignBranches) {
          mergeIntoParentRow(nest.advisers[0], rowsTree, rowHash, parentRowId)
        } else {
          mergeRows(nest.advisers, rowKeyGenerator, rowsTree, rowHash, parentRow.Id,  RowType.Advisers, options.alignBranches);
        }
      }

      /* create assistants levels */
      if(assistants.length > 0) {
        nest.assistants = addAssistants(visualTree, visualParent, assistants);
        visualParent = nest.assistants[nest.assistants.length - 1].aggregators[0];

        /* extend assistants levels */
        var extendChildren = partners.length > 0 || options.alignBranches;
        if(!extendChildren) {
          switch (parentOrgItemId.placeAssistantsAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAssistantsAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }

        if (!extendChildren) {
          nest.assistants.forEach(sourceRow => sourceRow.extend = false);
        }
        mergeRows(nest.assistants, rowKeyGenerator, rowsTree, rowHash, parentRow.Id, RowType.Assistants, options.alignBranches);
      }

      if(partners.length > 0) {
        var {partnersRow, centerPartner: visualParent } = addPartners(visualTree, logicalParentItem, partners, leftSiblingOffset, rightSiblingOffset);
        nest.partners = partnersRow;

        /* every child logically belongs to every partner */
        partners.forEach( partner => {
          if(partner.id != logicalParentItem.id) {
            rowChildren.forEach(row => row.forEach(child => defineNavigationParent(partner, child)));
            regularChildren.forEach(child => defineNavigationParent(partner, child));
          }
        })
      }

      /* create row children levels */
      if(rowChildren.length > 0) {
        var looseLastRow = regularChildren.length == 0;
        var hideChildConnector = (logicalParentItem.visibility == Visibility.Invisible) && (logicalParentItem.connectorPlacement === 0);
        nest.rowChildren = addRowChildren(visualTree, visualParent, rowChildren, looseLastRow, hideChildConnector, options.horizontalAlignment);
        if(!looseLastRow) {
          visualParent = nest.rowChildren[nest.rowChildren.length - 1].aggregators[0];
        }
        mergeRows(nest.rowChildren, rowKeyGenerator, rowsTree, rowHash, parentRow.Id, RowType.RowChildren, options.alignBranches);
      }

      /* add remaining children in formation */
      if(regularChildren.length > 0) {
        var props = orgTreeProps[logicalParentItem.id];
        nest.children = addChildren(orgTree, visualTree, options, logicalParentItem, visualParent, regularChildren, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);

        mergeRows(nest.children, rowKeyGenerator, rowsTree, rowHash, parentRow.Id, RowType.Children, options.alignBranches);
      }

      nests[parentOrgItemId] = nest;
    });

    /* stage 2: visual tree post creation transformations */
    /* transform tree to place children sub-branches inside of the hierarchy */
    orgTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
      var logicalParentItem = visualTree.node(nodeid);
      var nest = nests[nodeid];
      if (logicalParentItem != null) {

        /* extend assistants levels */
        if(nest.assistants.length > 0) {
          var extendChildren = nest.hasPartners();
          if(!extendChildren) {
            switch (node.placeAssistantsAboveChildren) {
              case Enabled.Auto:
                extendChildren = options.placeAssistantsAboveChildren;
                break;
              case Enabled.True:
                extendChildren = true;
                break;
            }
          }

          if (extendChildren) {
            extendAggregators(visualTree, nests, nest.assistants);
          }
        }
   
        /* extend advisers level */
        if(nest.advisers.length > 0) {
          extendChildren = nest.hasPartners();
          if(!extendChildren) {
            switch (node.placeAdvisersAboveChildren) {
              case Enabled.Auto:
                extendChildren = options.placeAdvisersAboveChildren;
                break;
              case Enabled.True:
                extendChildren = true;
                break;
            }
          }
          if (extendChildren) {
            extendAggregators(visualTree, nests, nest.advisers);
          }
        }

        /* extend row children levels */
        /* if we have multiple rows of children, see `levelOffset` property, */
        /* we make their sub-children to be placed in between of them */
        if(nest.rowChildren.length > 0) {
          extendAggregators(visualTree, nests, nest.rowChildren);
        }

        /* extend regular children levels */
        if(nest.children.length > 0) {
          extendAggregators(visualTree, nests, nest.children);
        }

        /* extend partners branches, in order to draw connector lines between them and logical parent children */
        if (nest.hasPartners()) {
          /* partners collection includes treeItem so we should have at least 2 items */
          extendAggregators(visualTree, nests, nest.partners);
          alignPartnersChildren(visualTree, nest.partners[0].nodes);
        }

        nest.depth = getItemDepth(visualTree, nests, logicalParentItem);
      }
    });
  }

  function mergeIntoParentRow(sourceRow, rowsTree, rowHash, parentRowId) {
      var targetRow = rowsTree.node(parentRowId);
      if(targetRow) {
        targetRow.merge(sourceRow);
      } else {
        throw "Parent row not found!";
      };
      sourceRow.nodes.forEach(child => {
        rowHash[child.id] = parentRowId;
      });
  }

  function mergeRows(sourceRows, rowKeyGenerator, rowsTree, rowHash, parentRowId, rowType, alignBranches) {
    sourceRows.forEach((sourceRow, rowIndex) => {
      var rowId = alignBranches ? rowKeyGenerator.get(parentRowId, rowType, rowIndex) : rowKeyGenerator.get();
      var targetRow = rowsTree.node(rowId);
      if(targetRow) {
        targetRow.merge(sourceRow);
      } else {
        targetRow = sourceRow;
        sourceRow.id = rowId;
        rowsTree.add(parentRowId, rowId, sourceRow)        
      };
      sourceRow.nodes.forEach(child => {
        rowHash[child.id] = rowId;
      });
    });
  }

  function extendAggregators(visualTree, nests, rowChildren) {
    var rowDepths = [];
    if(rowChildren.length > 0) {
      for (var rowIndex = 0, len = rowChildren.length; rowIndex < len; rowIndex += 1) {
        var row = rowChildren[rowIndex];
        rowDepths[rowIndex] = 0;
        if(row.nodes != null) {
          rowDepths[rowIndex] = getDepth(visualTree, nests, row.nodes, row.aggregators);
        }
      }
    }

    for (var index = 0, len = rowDepths.length; index < len; index += 1) {
      var rowDepth = rowDepths[index];
      if (rowDepth > 1) {
        for (var childIndex = 0, childrenLen = rowChildren[index].aggregators.length; childIndex < childrenLen; childIndex += 1) {
          var rowAggregator = rowChildren[index].aggregators[childIndex];
          if (visualTree.hasChildren(rowAggregator.id)) {
            var depth = rowDepth;
            while (depth > 1) {
              rowAggregator = createNewVisualAggregator(visualTree, rowAggregator, false);
              depth -= 1;
            }
          }
        }
      }
    }
  }

  function getDepth(visualTree, nests, treeItems, aggregators) {
    var result = 0,
      aggregatorsHash = {};
    for(var index = 0; index < aggregators.length; index+=1) {
      var aggregator = aggregators[index];
      aggregatorsHash[aggregator.id] = true;
    }

    for(var index = 0; index < treeItems.length; index+=1) {
      var treeItem = treeItems[index];
      if(!aggregatorsHash[treeItem.id]) {
        result = Math.max(result, getItemDepth(visualTree, nests, treeItem));
      }
    }
    return result;    
  }

  function getItemDepth(visualTree, nests, treeItem) {
    var result = 0;
    var nest = nests[treeItem.id];
    if(nest != null && nest.depth > 0) {
      result = nest.depth;
    } else {
      result = Math.max(result, getVisualTreeDepth(visualTree, nests, treeItem));

      if(nest != null) {
        var advisersRows = nest.advisers;
        if(advisersRows.length > 0) {
          var advisers =  advisersRows[0].nodes;
          for(var advIndex = 0; advIndex < advisers.length; advIndex+=1) {
            var adviser = advisers[advIndex];
              result = Math.max(result, getVisualTreeDepth(visualTree, nests, adviser));
          }
        }
      }
    }
    return result;
  }

  function getVisualTreeDepth(visualTree, nests, treeItem) {
    var result = 0;
    var nest = nests[treeItem.id];
    if(nest != null && nest.depth > 0) {
      result = nest.depth;
    } else {
      visualTree.loopLevels(this, treeItem.id, function (childId, child, level) {
        if(nests.hasOwnProperty(childId)) {
          result = Math.max(result, level + nests[childId].depth);  
          return visualTree.SKIP;
        } else {
          result = Math.max(result, level + 1);
        }
      });
      result += 1;
    }
    return result;
  }

  function alignPartnersChildren(visualTree, partners) {
    var depth,
      maxDepth = 0,
      extendedPartners = {},
      visualPartners = [],
      visualPartner;

    /* Find maximum depth required to enclose partners branches */
    for (var index = 0; index < partners.length; index += 1) {
      var partner = partners[index];
      ({visualPartner, depth} = getLastVisualAggregator(visualTree, partner));
      maxDepth = Math.max(maxDepth, depth);

      if(partner.partners.length > 0) {
        visualPartners.push(partner);
      }
    }

    /* Extend visual aggregators lines and ensure that connector lines are visible */
    for (var index = 0, len = partners.length; index < len; index += 1) {
      var partner = partners[index];
      ({visualPartner} = getLastVisualAggregator(visualTree, partner));
      depth = 1;
      var visualAggregator = partner;
      while (visualAggregator.visualAggregatorId != null) {
        visualAggregator = visualTree.node(visualAggregator.visualAggregatorId);
        visualAggregator.connectorPlacement = visualPartner.connectorPlacement & (SideFlag.Top | SideFlag.Bottom);
        depth += 1;
      }
      while (depth < maxDepth) {
        visualPartner = createNewVisualAggregator(visualTree, visualPartner, false);
        depth += 1;
      }
      ({ visualPartner } = getLastVisualAggregator(visualTree, visualPartner));

      extendedPartners[partner.id] = visualPartner.id;
    }

    /* Store collection of visual partners to draw connector lines*/
    for(var index = 0; index < visualPartners.length; index+=1) {
      var partner = visualPartners[index];

      var newPartners = partner.partners.map(partnerId => extendedPartners[partnerId]);
      partner.partners.length = 0;
      visualTree.node(extendedPartners[partner.id]).partners = newPartners;      
    }
  }

  function getLastVisualAggregator(visualTree, treeItem) {
    var visualPartner = treeItem,
      depth = 1;

    while (visualPartner.visualAggregatorId != null) {
      visualPartner = visualTree.node(visualPartner.visualAggregatorId);
      depth +=1;
    }
    return { visualPartner, depth };
  }


  function addPartners(visualTree, parent, partners, leftSiblingOffset, rightSiblingOffset) {
    var leftItems = [];
    var rightItems = [];
    for (var index = 0; index < partners.length; index += 1) {
      var item = partners[index];
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
        switch (item.actualItemType) {
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
    }

    var partners = [...leftItems, parent, ...rightItems];
    var visualPartners = partners.map(item => item.id);
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

    var row = new Row();
    var visualParent = visualTree.parent(parent.id);
    for (var index = parentIndex - 1; index >= 0; index -= 1) {
      var item = partners[index];
      row.nodes.push(item)
      visualTree.add(visualParent.id, item.id, item, leftSiblingOffset);

      item.gravity = HorizontalAlignmentType.Right;
    }
    row.nodes.push(parent)
    for (var index = parentIndex + 1; index < partners.length; index += 1) {
      var item = partners[index];
      row.nodes.push(item)
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
    centerPartner.partners = visualPartners;

    row.aggregators.push(centerPartner)

    return { partnersRow: [row], centerPartner: centerPartner }
  }

  function addAdvisers(visualTree, parent, advisers, leftSiblingOffset, rightSiblingOffset, onItemAdded) {
    var row = new Row();
    row.nodes.push(parent)
    row.aggregators.push(parent)
    for (var index = 0; index < advisers.length; index += 1) {
      var item = advisers[index];
      var alteredItem;
      switch(item.actualItemType) {
        case ItemType.SubAdviser:
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
          visualTree.add(alteredItem.id, item.id, item);
          break;
        default:
          alteredItem = item;
          break;
      }
      row.nodes.push(alteredItem)
      
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
      if(onItemAdded !=null) {
        onItemAdded(alteredItem, alteredItem.gravity == HorizontalAlignmentType.Left ? AdviserPlacementType.Right : AdviserPlacementType.Left);
      }
    }
    return [row];
  }
  
  function addAssistants(visualTree, visualParent, rowsOfAssistants) {
    var results = [];
    for (var rowIndex = 0; rowIndex < rowsOfAssistants.length; rowIndex += 1) {
      var assistants = rowsOfAssistants[rowIndex] || [];
      var nextVisualParent = createNewVisualAggregator(visualTree, visualParent, false);
      var row = new Row();
      row.aggregators.push(nextVisualParent)
      for (var index = 0; index < assistants.length; index += 1) {
        var item = assistants[index];
        var alteredItem;
        switch(item.actualItemType) {
          case ItemType.SubAssistant:
            item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
            alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
            visualTree.add(alteredItem.id, item.id, item);
            break;
          case ItemType.Assistant:
            alteredItem = item;
            break;
        }
        row.nodes.push(alteredItem)
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
      }
      results.push(row);

      visualParent = nextVisualParent;
    }
    return results;
  }

  function addRowChildren(visualTree, visualParent, rowsOfChildren, looseLastRow, hideChildConnector, horizontalAlignment) {
    var results = [];

    for (var rowIndex = 0; rowIndex < rowsOfChildren.length; rowIndex += 1) {
      var rowOfChildren = rowsOfChildren[rowIndex] || [];
      var row = new Row();
      if (rowOfChildren != null) {
        var nextVisualParent = null;
        if(!(looseLastRow && rowIndex == rowsOfChildren.length - 1)) {
          nextVisualParent = createNewVisualAggregator(visualTree, visualParent, hideChildConnector);
          row.aggregators.push(nextVisualParent);
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
          var item = rowOfChildren[index];
          visualTree.add(visualParent.id, item.id, item, 0);
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          item.gravity = HorizontalAlignmentType.Right;

          row.nodes.push(item);
        }

        for (index = medianIndex + 1; index < rowOfChildren.length; index += 1) {
          item = rowOfChildren[index];
          visualTree.add(visualParent.id, item.id, item);
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          item.gravity = HorizontalAlignmentType.Left;

          row.nodes.push(item);
        }

        visualParent = nextVisualParent;
      }
      results.push(row);;
    }

    return results;
  }

  function addChildren(orgTree, visualTree, options, treeItem, visualParent, regularChildren, childrenPlacementType, hasLeavesOnly) {
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
      hideParentConnector = (treeItem.visibility == Visibility.Invisible) && (treeItem.connectorPlacement === 0),
      results = [];

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
          childItem = regularChildren[index];
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
            if (results[rowIndex] === undefined) {
              results[rowIndex] = new Row();
            }
            var row = results[rowIndex];
            if (leftChildItem !== null) {
              if (columnIndex === 0) {
                leftChildItem.relationDegree = 1;
              }
              visualTree.add(currentVisualParent.id, leftChildItem.id, leftChildItem);
              leftChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              leftChildItem.gravity = HorizontalAlignmentType.Right;

              row.nodes.push(leftChildItem);
            }
            if (leftChildItem !== null || rightChildItem !== null) {
              // currentVisualParent.id,
              newAggregatorItem = getNewTreeItem({
                visibility: Visibility.Invisible,
                connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
              });
              visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
              row.aggregators.push(newAggregatorItem);
            }
            if (rightChildItem !== null) {
              visualTree.add(currentVisualParent.id, rightChildItem.id, rightChildItem);
              rightChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              rightChildItem.gravity = HorizontalAlignmentType.Left;

              row.nodes.push(rightChildItem);
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
          childItem = regularChildren[index];

          var row = new Row();

          // visualParent.id,
          newAggregatorItem = getNewTreeItem({
            visibility: Visibility.Invisible,
            connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
          });


          switch (singleItemPlacement) {
            case AdviserPlacementType.Left:
              visualTree.add(visualParent.id, childItem.id, childItem);
              visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Right;
              break;
            case AdviserPlacementType.Right:
              visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
              visualTree.add(visualParent.id, childItem.id, childItem);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Left;
              break;
          }

          row.aggregators = [newAggregatorItem];
          row.nodes = [childItem];
          results.push(row);

          visualParent = newAggregatorItem;
        }
        break;
      default:
        throw "Children placement is undefined!";
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
      hideParentConnector = ((treeItem.visibility == Visibility.Invisible) && (treeItem.connectorPlacement === 0)) || hideChildrenConnector;

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
    if (skipFirstParent || parentItem.visibility == Visibility.Invisible || !_activeItems.hasOwnProperty(parentItem.id)) {
      if (!skipFirstParent) {
        parents.push(parentItem.id);
      }
      _data.navigationFamily.loopParents(this, parentItem.id, function (parentid, parent, level) {
        if (parent.visibility != Visibility.Invisible) {
          parents.push(parentid);
          if (_activeItems.hasOwnProperty(parentid)) {
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

  function getConnectionsFamily() {
    return _data.connectionsFamily;
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
    getConnectionsFamily: getConnectionsFamily,
    getLeftMargins: getLeftMargins,
    getRightMargins: getRightMargins,
    getMaximumId: getMaximumId
  };
};