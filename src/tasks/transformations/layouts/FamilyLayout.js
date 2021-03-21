import Rect from '../../../graphics/structs/Rect';
import { VerticalAlignmentType, Visibility, GroupByType } from '../../../enums';
import FamilyAlignment from '../../../algorithms/FamilyAlignment';
import TreeLevelPosition from '../../../models/TreeLevelPosition';
import TreeItemPosition from '../../../models/TreeItemPosition';

function ChildLayoutPosition( offset, leftPadding, rightPadding ) {
  this.offset = offset;
  this.leftPadding = leftPadding;
  this.rightPadding = rightPadding;
}

export default function FamilyLayout(logicalFamily, treeLevels, getConnectorsStacksSizes) {
  this.logicalFamily = logicalFamily; // Family of FamilyItem
  this.treeLevels = treeLevels; // TreeLevels of OrgItem used properties: isVisible
  this.getConnectorsStacksSizes = getConnectorsStacksSizes; // TreeLevelConnectorStackSize

  this.treeLevelsPositions = [];
  this.childLayoutsPositions = {};
};

FamilyLayout.prototype.loop = function (thisArg, onItem) {
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


FamilyLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
  this.treeLevelsPositions = [];

  this.treeLevels.loopLevels(this, function (index, levelContext) {
    var treeLevelPosition = new TreeLevelPosition();
    this.treeLevelsPositions.push(treeLevelPosition);
  });

  this.setOffsets(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions, this.logicalFamily, options.intervals);
  this.setLevelsDepth(this.treeLevels, treeItemsPositions, this.treeLevelsPositions, options.verticalAlignment);
  this.shiftLevels(this.treeLevelsPositions, options.shifts[Visibility.Line], options.shifts, options.arrowsDirection, options.linesWidth, this.getConnectorsStacksSizes);

  var treeItemPosition = new TreeItemPosition();
  treeItemPosition.actualVisibility = Visibility.Invisible;
  treeItemPosition.actualSize = this.getLayoutSize(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions);
  return treeItemPosition;
};

FamilyLayout.prototype.getLayoutSize = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions) {
  return new Rect(0, 0, Math.round(this.getLayoutWidth(treeLevels, treeItemsPositions, childLayoutsPositions)), Math.round(this.getLayoutHeight(treeLevelsPositions)));
};

FamilyLayout.prototype.getLayoutWidth = function (treeLevels, treeItemsPositions, childLayoutsPositions) {
  var result = 0;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var levelLength = treeLevels.getLevelLength(levelIndex);

    if (levelLength > 0) {
      var itemId = treeLevels.getItemAtPosition(levelIndex, levelLength - 1),
        treeItemPosition = treeItemsPositions[itemId],
        childLayoutPosition = childLayoutsPositions[itemId];
      result = Math.max(result, childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding);
    }
  });
  return result;
};

FamilyLayout.prototype.getLayoutHeight = function (treeLevelsPositions) {
  var len = treeLevelsPositions.length,
    treeLevel = treeLevelsPositions[len - 1];
  return treeLevel.shift + treeLevel.nextLevelShift;
};

FamilyLayout.prototype.setLevelsDepth = function (treeLevels, treeItemsPositions, treeLevelsPositions, verticalAlignment) {
  var minimalDepth,
    dotsDepth;

  treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
    var treeLevelPosition = treeLevelsPositions[levelIndex];
    treeLevelPosition.shift = 0.0;
    treeLevelPosition.depth = 0.0;
    treeLevelPosition.actualVisibility = Visibility.Invisible;

    minimalDepth = null; /* minimum  height of non-dot items in level */
    dotsDepth = null; /* maximum dots height */

    treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
      var treeItemPosition = treeItemsPositions[itemid];
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

FamilyLayout.prototype.shiftLevels = function (treeLevelsPositions, shift, shifts, arrowsDirection, linesWidth, getConnectorsStacksSizes) {
  var index,
    len,
    treeLevelPosition,
    treeLevelConnectorStackSize,
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

  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelPosition = treeLevelsPositions[index];

    treeLevelConnectorStackSize = getConnectorsStacksSizes(index);
    shift += treeLevelPosition.setShift(shift, shifts[treeLevelPosition.actualVisibility], parentsSpace, childrenSpace, treeLevelConnectorStackSize.parentsStackSize);
  }
};

FamilyLayout.prototype.setOffsets = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions, logicalFamily, intervals) {
  var index, len;

  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelsPositions[index].currentOffset = 0.0;
  }

  var family = logicalFamily.getPlanarFamily(treeLevels);

  var familyAlignment = new FamilyAlignment(this, family, treeLevels, function (nodeId, node) {
    var treeItemPosition = treeItemsPositions[nodeId];

    var treeItemPadding = intervals[treeItemPosition.actualVisibility] / 2;
    childLayoutsPositions[nodeId] = new ChildLayoutPosition(0, treeItemPadding, treeItemPadding);

    return treeItemPadding + treeItemPosition.actualSize.width + treeItemPadding;
  });

  var leftMargin = null;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var nodeId = treeLevels.getItemAtPosition(levelIndex, 0);
    if (nodeId != null) {
      var treeItemPosition = treeItemsPositions[nodeId];
      var nodeOffset = familyAlignment.getOffset(nodeId) - treeItemPosition.leftPadding - treeItemPosition.actualSize.width / 2;
      leftMargin = (leftMargin == null) ? nodeOffset : Math.min(leftMargin, nodeOffset);
    }
  });

  treeLevels.loopLevels(this, function (levelIndex, level) {
    treeLevels.loopLevelItems(this, levelIndex, function (nodeId, node, position) {
      var treeItemPosition = treeItemsPositions[nodeId];
      var nodeOffset = familyAlignment.getOffset(nodeId);
      childLayoutsPositions[nodeId].offset = nodeOffset - treeItemPosition.actualSize.width / 2 - leftMargin;
    });
  });
};

FamilyLayout.prototype.arrange = function (thisArg, position, layoutDirection, treeItemsPositions, options, onItemPositioned) {
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

FamilyLayout.prototype.getItemPosition = function (visibility, offset, size, prevLevel, level, verticalAlignment) {
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