import Rect from '../../../graphics/structs/Rect';
import { VerticalAlignmentType, HorizontalAlignmentType, Visibility, GroupByType, SideFlag } from '../../../enums';
import TreeLevelPosition from '../../../models/TreeLevelPosition';
import TreeItemPosition from '../../../models/TreeItemPosition';

function ChildLayoutPosition( offset, leftPadding, rightPadding ) {
  this.offset = offset;
  this.leftPadding = leftPadding;
  this.rightPadding = rightPadding;
}

export default function OrgLayout(visualTree, treeLevels, leftMargins, rightMargins, getConnectorsStacksSizes) {
  this.visualTree = visualTree;
  this.treeLevels = treeLevels; // TreeLevels of OrgItem used properties: isVisible
  this.leftMargins = leftMargins;
  this.rightMargins = rightMargins;
  this.getConnectorsStacksSizes = getConnectorsStacksSizes;

  this.treeLevelsPositions = [];
  this.childLayoutsPositions = {};
};

OrgLayout.prototype.loop = function (thisArg, onItem) {
  if(onItem != null) {
    var zeroBasedLevelIndex = 0;
    this.treeLevels.loopLevels(this, function (levelIndex) {
      this.treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem) {
        onItem.call(thisArg, treeItem, zeroBasedLevelIndex);
      });
      zeroBasedLevelIndex+=1;
    });
  }
};


OrgLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
  this.treeLevelsPositions = [];

  this.treeLevels.loopLevels(this, function (index, levelContext) {
    var treeLevelPosition = new TreeLevelPosition();
    this.treeLevelsPositions.push(treeLevelPosition);
  });

  this.setOffsets(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions, this.visualTree, this.rightMargins, this.leftMargins, options.intervals, options.arrowsDirection, options.linesWidth, options.cousinsIntervalMultiplier, options.horizontalAlignment, options.padding);
  this.setLevelsDepth(this.treeLevels, treeItemsPositions, this.treeLevelsPositions, options.verticalAlignment);
  this.shiftLevels(this.treeLevelsPositions, options.padding.top, options.shifts, options.arrowsDirection, options.linesWidth, this.getConnectorsStacksSizes);

  var treeItemPosition = new TreeItemPosition();
  treeItemPosition.actualVisibility = Visibility.Normal;
  treeItemPosition.actualSize = this.getLayoutSize(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions, options.padding);
  return treeItemPosition;
};

OrgLayout.prototype.getLayoutSize = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions, padding) {
  return new Rect(0, 0, Math.round(this.getLayoutWidth(treeLevels, treeItemsPositions, childLayoutsPositions, padding)), Math.round(this.getLayoutHeight(treeLevelsPositions, padding)));
};

OrgLayout.prototype.getLayoutWidth = function (treeLevels, treeItemsPositions, childLayoutsPositions, padding) {
  var result = 0;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var levelLength = treeLevels.getLevelLength(levelIndex);

    if (levelLength > 0) {
      var itemId = treeLevels.getItemAtPosition(levelIndex, levelLength - 1),
        treeItemPosition = treeItemsPositions[itemId],
        childLayoutPosition = childLayoutsPositions[itemId];
      result = Math.max(result, childLayoutPosition.offset + treeItemPosition.actualSize.width + padding.right);
    }
  });
  return result;
};

OrgLayout.prototype.getLayoutHeight = function (treeLevelsPositions, padding) {
  var len = treeLevelsPositions.length,
    treeLevel = treeLevelsPositions[len - 1];
  return treeLevel.getNodesBottom() + padding.bottom;
};

OrgLayout.prototype.setLevelsDepth = function (treeLevels, treeItemsPositions, treeLevelsPositions, verticalAlignment) {
  var minimalDepth,
    dotsDepth;

  treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
    var treeLevelPosition = treeLevelsPositions[levelIndex];
    treeLevelPosition.shift = 0.0;
    treeLevelPosition.depth = 0.0;
    treeLevelPosition.actualVisibility = Visibility.Invisible;

    minimalDepth = null; /* minimum  height of non-dot items in level */
    dotsDepth = null; /* maximum dots height */

    treeLevels.loopLevelItems(this, levelIndex, function (itemId, treeItem, position) {
      var treeItemPosition = treeItemsPositions[itemId];
      treeLevelPosition.depth = Math.max(treeLevelPosition.depth, treeItemPosition.actualSize.height);
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot:
        case Visibility.Line:
        case Visibility.Invisible:
          dotsDepth = !dotsDepth ? treeItemPosition.actualSize.height : Math.min(dotsDepth, treeItemPosition.actualSize.height);
          break;
        default:
          minimalDepth = !minimalDepth ? treeItemPosition.actualSize.height : Math.min(minimalDepth, treeItemPosition.actualSize.height);
          break;
      }

      treeLevelPosition.actualVisibility = Math.min(treeLevelPosition.actualVisibility, treeItemPosition.actualVisibility);
    });

    if (minimalDepth == null) {
      minimalDepth = treeLevelPosition.depth;
    }
    if (dotsDepth != null && dotsDepth > minimalDepth) {
      minimalDepth = dotsDepth;
    }

    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        treeLevelPosition.horizontalConnectorsDepth = minimalDepth / 2.0;
        break;
      case VerticalAlignmentType.Middle:
        treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth / 2.0;
        break;
      case VerticalAlignmentType.Bottom:
        treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth - minimalDepth / 2.0;
        break;
    }
  });
};

OrgLayout.prototype.shiftLevels = function (treeLevelsPositions, shift, shifts, arrowsDirection, linesWidth, getConnectorsStacksSizes) {
  var index,
    len,
    treeLevelPosition,
    childrenSpace = 0,
    parentsSpace = 0,
    arrowTipLength = linesWidth * 8;

  switch (arrowsDirection) {
    case GroupByType.Parents:
      childrenSpace = arrowTipLength;
      parentsSpace = 0;
      break;
    case GroupByType.Children:
      childrenSpace = 0;
      parentsSpace = arrowTipLength;
      break;
  }

  var isTopLevel = true;
  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelPosition = treeLevelsPositions[index];
    
    if(isTopLevel && treeLevelPosition.actualVisibility == Visibility.Invisible) {
      treeLevelPosition.setShift(0, 0, 0, 0, 0);
    } else {
      var parentsStackSize = getConnectorsStacksSizes(index).parentsStackSize;
      shift += treeLevelPosition.setShift(shift, shifts[treeLevelPosition.actualVisibility], parentsSpace, childrenSpace, parentsStackSize);
      isTopLevel = false;
    }
  }
};

OrgLayout.prototype.setOffsets = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions, visualTree, rightMargins, leftMargins, intervals, arrowsDirection, linesWidth, cousinsIntervalMultiplier, horizontalAlignment, padding) {
  var index, len;

  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelsPositions[index].currentOffset = 0.0;
  }

  visualTree.loopPostOrder(this, function (treeItemId, treeItem, parentId, parent) {
    var treeItemPosition = treeItemsPositions[treeItemId],
      treeItemVisibility = treeItemPosition.actualVisibility,
      treeItemLevelIndex = treeLevels.getLevelIndex(treeItemId),
      treeLevelPosition = treeLevelsPositions[treeItemLevelIndex],
      treeItemPadding = intervals[treeItemVisibility === Visibility.Auto ? treeLevelPosition.currentvisibility : treeItemVisibility] / 2.0,
      index,
      len,
      offset,
      siblings,
      gaps,
      gap,
      leftMargin,
      parentItem,
      groups,
      items,
      item1,
      item2,
      groupIndex,
      groupOffset,
      group,
      sibling,
      leftPadding = treeLevelPosition.currentOffset > 0 ? treeItemPadding + treeItemPadding * (treeItem.relationDegree) * cousinsIntervalMultiplier : padding.left,
      arrowTipLength = linesWidth * 8;

    childLayoutsPositions[treeItemId] = new ChildLayoutPosition(0,  leftPadding, treeItemPadding);
    var childLayoutPosition = childLayoutsPositions[treeItemId];

    if (arrowsDirection != GroupByType.None) {
      if (treeItem.connectorPlacement & SideFlag.Left) {
        childLayoutPosition.leftPadding += arrowTipLength;
      }
      if (treeItem.connectorPlacement & SideFlag.Right) {
        childLayoutPosition.rightPadding += arrowTipLength;
      }
    }
    childLayoutPosition.offset = treeLevelPosition.currentOffset + childLayoutPosition.leftPadding;
    treeLevelPosition.currentOffset = childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding;

    if (visualTree.hasChildren(treeItemId)) {
      offset = this.getChildrenOffset(treeItem, treeItemsPositions, childLayoutsPositions, visualTree, horizontalAlignment);
      if (offset > 0) {
        this.offsetItemChildren(treeItem, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
      }
      else if (offset < 0) {
        offset = -offset;
        this.offsetItem(treeItem, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);

        siblings = null;
        gaps = {};
        leftMargin = null;
        parentItem = visualTree.parent(treeItem.id);
        if (parentItem !== null) {
          visualTree.loopChildrenReversed(this, parentItem.id, function (childItemId, childItem, index) {
            if (childItem === treeItem) {
              siblings = [];
            }
            else if (siblings !== null) {
              gap = this.getGapBetweenSiblings(childItem, treeItem, rightMargins, leftMargins, treeItemsPositions, childLayoutsPositions);
              gaps[childItem.id] = gap;
              if (gap > 0) {
                siblings.splice(0, 0, childItem);
              }
              else {
                leftMargin = childItem;
                return true;
              }
            }
          });

          if (siblings.length > 0) {
            groups = null;
            if (leftMargin !== null) {
              items = [leftMargin];
              items = items.concat(siblings);
              items.push(treeItem);

              groups = [[leftMargin]];
              for (index = 1, len = items.length; index < len; index += 1) {
                item1 = items[index - 1];
                item2 = items[index];
                if (item1.gravity == HorizontalAlignmentType.Right || item2.gravity == HorizontalAlignmentType.Left) {
                  groups[groups.length - 1].push(item2);
                }
                else {
                  groups.push([item2]);
                }
              }
            }
            else {
              groups = [siblings.slice(0)];
              groups[groups.length - 1].push(treeItem);
            }

            // align items to the right
            if (groups.length > 0) {
              siblings = groups[groups.length - 1];
              for (index = siblings.length - 2; index >= 0; index -= 1) {
                sibling = siblings[index];
                gap = gaps[sibling.id];
                offset = Math.min(gap, offset);

                this.offsetItem(sibling, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
                this.offsetItemChildren(sibling, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
              }
            }

            // spread items proportionally
            groupOffset = offset / (groups.length - 1);
            for (groupIndex = groups.length - 2; groupIndex > 0; groupIndex -= 1) {
              group = groups[groupIndex];
              for (index = group.length - 1; index >= 0; index -= 1) {
                sibling = group[index];
                gap = gaps[sibling.id];
                offset = Math.min(groupIndex * groupOffset, Math.min(gap, offset));

                this.offsetItem(sibling, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
                this.offsetItemChildren(sibling, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
              }
            }
          }
        }
      }
    }
  });
};

OrgLayout.prototype.getGapBetweenSiblings = function(leftItem, rightItem, rightMargins, leftMargins, treeItemsPositions, childLayoutsPositions) {
  var result = null,
    itemRightMargins = this.getRightMargins(leftItem, rightMargins, treeItemsPositions, childLayoutsPositions),
    itemLeftMargins = this.getLeftMargins(rightItem, leftMargins, childLayoutsPositions),
    depth = Math.min(itemRightMargins.length, itemLeftMargins.length);

  for (var index = 0; index < depth; index += 1) {
    var gap = itemLeftMargins[index] - itemRightMargins[index];
    result = (result !== null) ? Math.min(result, gap) : gap;

    if (gap <= 0) {
      break;
    }
  }

  return Math.floor(result);
}

OrgLayout.prototype.getRightMargins = function(treeItem, rightMargins, treeItemsPositions, childLayoutsPositions) {
  var result = [],
    itemRightMargins = rightMargins[treeItem.id];
  if (itemRightMargins === undefined) {
    itemRightMargins = [];
  }
  itemRightMargins = itemRightMargins.slice();
  itemRightMargins.splice(0, 0, treeItem.id);
  for (var index = 0, len = itemRightMargins.length; index < len; index += 1) {
    var treeItemId = itemRightMargins[index];
    var treeItemPosition = treeItemsPositions[treeItemId];
    var childLayoutPosition = childLayoutsPositions[treeItemId];
    result[index] = childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding;
  }

  return result;
}

OrgLayout.prototype.getLeftMargins = function(treeItem, leftMargins, childLayoutsPositions) {
  var result = [],
    itemLeftMargins = leftMargins[treeItem.id];
  if (itemLeftMargins === undefined) {
    itemLeftMargins = [];
  }
  itemLeftMargins = itemLeftMargins.slice();
  itemLeftMargins.splice(0, 0, treeItem.id);
  for (var index = 0, len = itemLeftMargins.length; index < len; index += 1) {
    var childLayoutPosition = childLayoutsPositions[itemLeftMargins[index]];
    result[index] = childLayoutPosition.offset - childLayoutPosition.leftPadding;
  }

  return result;
}

OrgLayout.prototype.getChildrenOffset = function(treeItem, treeItemsPositions, childLayoutsPositions, visualTree, horizontalAlignment) {
  var treeItemPosition = treeItemsPositions[treeItem.id],
    childLayoutPosition = childLayoutsPositions[treeItem.id],
    treeItemCenterOffset = childLayoutPosition.offset + treeItemPosition.actualSize.width / 2.0,
    childrenCenterOffset = null;
  if (treeItem.visualAggregatorId === null) {
    var firstItem = null;
    visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
      firstItem = childItem;
      if (firstItem.connectorPlacement & SideFlag.Top) {
        return true;
      }
    });
    var firstItemPosition = treeItemsPositions[firstItem.id];
    var firstLayoutPosition = childLayoutsPositions[firstItem.id];

    var lastItem = null;
    visualTree.loopChildrenReversed(this, treeItem.id, function (childItemId, childItem, index) {
      lastItem = childItem;
      if (lastItem.connectorPlacement & SideFlag.Top) {
        return true;
      }
    });
    var lastItemPosition = treeItemsPositions[lastItem.id];
    var lastLayoutPosition = childLayoutsPositions[lastItem.id];

    switch (horizontalAlignment) {
      case HorizontalAlignmentType.Left:
        childrenCenterOffset = firstLayoutPosition.offset + firstItemPosition.actualSize.width / 2.0;
        break;
      case HorizontalAlignmentType.Right:
        childrenCenterOffset = lastLayoutPosition.offset + lastItemPosition.actualSize.width / 2.0;
        break;
      case HorizontalAlignmentType.Center:
        childrenCenterOffset = (firstLayoutPosition.offset + lastLayoutPosition.offset + lastItemPosition.actualSize.width) / 2.0;
        break;
    }
  }
  else {
    var visualAggregatorPosition = treeItemsPositions[treeItem.visualAggregatorId];
    var visualAggregatorLayoutPosition = childLayoutsPositions[treeItem.visualAggregatorId];
    childrenCenterOffset = visualAggregatorLayoutPosition.offset + visualAggregatorPosition.actualSize.width / 2.0;
  }

  return treeItemCenterOffset - childrenCenterOffset;
}

OrgLayout.prototype.offsetItem = function(treeItem, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions ) {
  var treeItemPosition = treeItemsPositions[treeItem.id];
  var childLayoutPosition = childLayoutsPositions[treeItem.id];
  childLayoutPosition.offset += offset;

  var treeLevelPosition = treeLevelsPositions[treeLevels.getLevelIndex(treeItem.id)];
  treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding);
}

OrgLayout.prototype.offsetItemChildren = function(treeItem, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions) {
  visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, levelid) {
    var treeItemPosition = treeItemsPositions[childItemId];
    var childLayoutPosition = childLayoutsPositions[childItemId];
    childLayoutPosition.offset += offset;

    var treeLevelPosition = treeLevelsPositions[treeLevels.getLevelIndex(childItemId)];
    treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childLayoutPosition.offset + treeItemPosition.actualSize.width);

    return true;
  });
}

OrgLayout.prototype.arrange = function (thisArg, position, layoutDirection, treeItemsPositions, options, onItemPositioned) {
  var prevLevelPosition = null;
  if (onItemPositioned != null) {
    this.treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = this.treeLevelsPositions[levelIndex];

      this.treeLevels.loopLevelItems(this, levelIndex, function (itemId, treeItem, position) {
        var treeItemPosition = treeItemsPositions[itemId];
        var childLayoutPosition = this.childLayoutsPositions[itemId];
        var result = this.getItemPosition(treeItemPosition.actualVisibility, childLayoutPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, options.verticalAlignment);

        onItemPositioned.call(thisArg, itemId, { ...treeItemPosition, ...result});
      });

      prevLevelPosition = treeLevelPosition;
    });
  }
};

OrgLayout.prototype.getItemPosition = function (visibility, offset, size, prevLevel, level, verticalAlignment) {
  var itemShift = 0;

  switch (visibility) {
    case Visibility.Normal:
      switch (verticalAlignment) {
        case VerticalAlignmentType.Top:
          itemShift = 0;
          break;
        case VerticalAlignmentType.Middle:
          itemShift = (level.depth - size.height) / 2.0;
          break;
        case VerticalAlignmentType.Bottom:
          itemShift = level.depth - size.height;
          break;
      }
      break;
    case Visibility.Dot:
    case Visibility.Line:
    case Visibility.Invisible:
      itemShift = level.horizontalConnectorsDepth - size.height / 2.0;
      break;
  }

  return {
    actualPosition: new Rect(offset, level.shift + itemShift, size.width, size.height),
    horizontalConnectorsShift: level.shift + level.horizontalConnectorsDepth,
    topConnectorShift: prevLevel != null ? prevLevel.shift + prevLevel.connectorShift : null,
    topConnectorInterval: prevLevel != null ? prevLevel.levelSpace / 2 : null,
    bottomConnectorShift: level.shift + level.connectorShift,
    bottomConnectorInterval: level.levelSpace / 2
  };
};

