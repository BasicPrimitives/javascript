import BaseLayout from './BaseLayout';
import Rect from '../../../graphics/structs/Rect';
import { VerticalAlignmentType, PageFitMode, Visibility, OrientationType, GroupByType, AdviserPlacementType } from '../../../enums';
import FamilyAlignment from '../../../algorithms/FamilyAlignment';
import LevelVisibility from '../../../models/LevelVisibility';
import TreeLevelPosition from '../../../models/TreeLevelPosition';
import TreeItemPosition from '../../../models/TreeItemPosition';

export default function FamilyLayout(params, options) {
  this.params = {
    logicalFamily: null, // Family of FamilyItem
    treeLevels: null, // TreeLevels of OrgItem used properties: isVisible
    getConnectorsStacksSizes: null, // TreeLevelConnectorStackSize
    isItemSelected: null,
    cursorItemId: null,
    getTemplateParams: null //TemplateParams
  };

  this.options = {
    verticalAlignment: VerticalAlignmentType.Middle,
    pageFitMode: PageFitMode.None,
    minimalVisibility: Visibility.Dot,
    orientationType: OrientationType.Top,
    arrowsDirection: GroupByType.None,
    linesWidth: 1,
    checkBoxPanelSize: 24,
    buttonsPanelSize: 32,
    groupTitlePanelSize: 24,
    groupTitlePlacementType: AdviserPlacementType.Left,
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 1,
    lineItemsInterval: 2
  };

  this.data = {
    treeItemsPositions: {},
    treeLevelsPositions: []
  };

  this.parent = BaseLayout.prototype;
  this.parent.constructor.apply(this, arguments);
};

FamilyLayout.prototype = new BaseLayout();

FamilyLayout.prototype.measure = function (panelSize) {
  var placeholderSize = new Rect(0, 0, 0, 0),
    levelVisibilities,
    minimalPlaceholderSize;

  var data = {
    treeItemsPositions: {},
    treeLevelsPositions: []
  };

  switch (this.options.orientationType) {
    case OrientationType.Left:
    case OrientationType.Right:
      panelSize.invert();
      break;
  }

  if (!this.params.treeLevels.isEmpty()) {
    switch (this.options.pageFitMode) {
      case PageFitMode.None:
      case PageFitMode.PrintPreview:
      case PageFitMode.AutoSize:
        levelVisibilities = [new LevelVisibility(0, Visibility.Normal)];
        placeholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, 0);
        break;
      default:
        levelVisibilities = this.getLevelVisibilities(this.params.treeLevels, this.options.minimalVisibility);

        // Find minimal placeholder size to hold completly folded diagram
        minimalPlaceholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, levelVisibilities.length - 1);
        if (!this.checkDiagramSize(minimalPlaceholderSize, panelSize, this.options.pageFitMode)) {
          placeholderSize = minimalPlaceholderSize;
        }
        else {
          // Find optimal diagram size
          minimalPlaceholderSize.addRect(panelSize);
          minimalPlaceholderSize.offset(0, 0, 5, 5);
          this.findOptimalSize(this, levelVisibilities.length - 1, function (index) {
            placeholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, index);
            return this.checkDiagramSize(placeholderSize, minimalPlaceholderSize, this.options.pageFitMode);
          });
        }
        break;
    }
  }

  this.data = data;

  return placeholderSize;
};

FamilyLayout.prototype.getLevelVisibilities = function (treeLevels, minimalVisibility) {
  var levelVisibilities = [new LevelVisibility(0, Visibility.Normal)];

  var visibilities = [];
  switch (minimalVisibility) {
    case Visibility.Normal:
      break;
    case Visibility.Dot:
      visibilities.push(Visibility.Dot);
      break;
    case Visibility.Auto:
    case Visibility.Line:
    case Visibility.Invisible:
      visibilities.push(Visibility.Dot);
      visibilities.push(Visibility.Line);
      break;
  }

  treeLevels.loopLevelsReversed(this, function (level, levelContext) {
    for (var index = 0; index < visibilities.length; index += 1) {
      levelVisibilities.push(new LevelVisibility(level, visibilities[index]));
    }
  });

  return levelVisibilities;
};

FamilyLayout.prototype.findOptimalSize = function (thisArg, maximum, funcCheckSize) {
  var minimum = 0,
    cursorIndex;
  // maximum condension is fit to page
  if (!funcCheckSize.call(thisArg, minimum)) {
    // minimum condension does not fit to page
    cursorIndex = maximum;
    while (maximum - minimum > 1) {
      cursorIndex = Math.floor((maximum + minimum) / 2.0);
      if (funcCheckSize.call(thisArg, cursorIndex)) {
        // middle point size fit to page
        maximum = cursorIndex;
      }
      else {
        minimum = cursorIndex;
      }
    }
    if (maximum !== cursorIndex) {
      funcCheckSize.call(thisArg, maximum);
    }
  }
};

FamilyLayout.prototype.setTreeLevelsVisibilityAndPositionTreeItems = function (data, params, options, levelVisibilities, cursorIndex) {
  var index,
    levelVisibility;

  data.treeLevelsPositions = [];

  params.treeLevels.loopLevels(this, function (index, levelContext) {
    var treeLevelPosition = new TreeLevelPosition();
    treeLevelPosition.currentvisibility = Visibility.Normal;

    data.treeLevelsPositions.push(treeLevelPosition);
  });

  for (index = 0; index <= cursorIndex; index += 1) {
    levelVisibility = levelVisibilities[index];
    data.treeLevelsPositions[levelVisibility.level].currentvisibility = levelVisibility.currentvisibility;
  }

  data.treeItemsPositions = {};

  this.recalcItemsSize(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, params.isItemSelected, params.cursorItemId, params.getTemplateParams, options);

  this.setOffsets(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, params.logicalFamily, options.intervals);
  this.recalcLevelsDepth(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, options.verticalAlignment);
  this.shiftLevels(data.treeLevelsPositions, options.shifts[Visibility.Line], options.shifts, options.arrowsDirection, options.linesWidth, params.getConnectorsStacksSizes);

  return this.getLayoutSize(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions);
};

FamilyLayout.prototype.checkDiagramSize = function (diagramSize, panelSize, pageFitMode) {
  var result = false;
  switch (pageFitMode) {
    case PageFitMode.PageWidth:
      if (panelSize.width >= diagramSize.width) {
        result = true;
      }
      break;
    case PageFitMode.PageHeight:
      if (panelSize.height >= diagramSize.height) {
        result = true;
      }
      break;
    case PageFitMode.FitToPage:
      if (panelSize.height >= diagramSize.height && panelSize.width >= diagramSize.width) {
        result = true;
      }
      break;
  }
  return result;
};

FamilyLayout.prototype.getLayoutSize = function (treeLevels, treeItemsPositions, treeLevelsPositions) {
  return new Rect(0, 0, Math.round(this.getLayoutWidth(treeLevels, treeItemsPositions)), Math.round(this.getLayoutHeight(treeLevelsPositions)));
};

FamilyLayout.prototype.getLayoutWidth = function (treeLevels, treeItemsPositions) {
  var result = 0;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var levelLength = treeLevels.getLevelLength(levelIndex);

    if (levelLength > 0) {
      var itemid = treeLevels.getItemAtPosition(levelIndex, levelLength - 1),
        treeItemPosition = treeItemsPositions[itemid];
      result = Math.max(result, treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding);
    }
  });
  return result;
};

FamilyLayout.prototype.getLayoutHeight = function (treeLevelsPositions) {
  var len = treeLevelsPositions.length,
    treeLevel = treeLevelsPositions[len - 1];
  return treeLevel.shift + treeLevel.nextLevelShift;
};

FamilyLayout.prototype.recalcItemsSize = function (treeLevels, treeItemsPositions, treeLevelsPositions, isItemSelected, cursorItemId, getTemplateParams, options) {
  treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
    var treeLevelPosition = treeLevelsPositions[levelIndex];

    treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem, position) {
      var treeItemPosition = new TreeItemPosition();
      var childLayout = this.getLayout(treeItemId);
      if (childLayout == null) {
        var treeItemVisibility = isItemSelected(treeItemId) ? Visibility.Normal : (!treeItem.isVisible ? Visibility.Invisible : Visibility.Auto),
          treeItemtemplate = getTemplateParams(treeItemId);

        var actualVisibility = (treeItemVisibility === Visibility.Auto) ? treeLevelPosition.currentvisibility : treeItemVisibility;
        var size = this.getItemSize(actualVisibility, cursorItemId == treeItemId, treeItemtemplate, options);

        treeItemPosition.actualVisibility = actualVisibility;
        treeItemPosition.actualSize = size.actualSize;
        treeItemPosition.contentPosition = size.contentPosition;
      } else {
        size = childLayout.measure(treeLevelPosition.currentvisibility);
        treeItemPosition.actualVisibility = Visibility.Invisible;
        treeItemPosition.actualSize = size;
      }
      treeItemsPositions[treeItemId] = treeItemPosition;
    });
  });
};

FamilyLayout.prototype.recalcLevelsDepth = function (treeLevels, treeItemsPositions, treeLevelsPositions, verticalAlignment) {
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

FamilyLayout.prototype.setOffsets = function (treeLevels, treeItemsPositions, treeLevelsPositions, logicalFamily, intervals) {
  var index, len;

  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelsPositions[index].currentOffset = 0.0;
  }

  var family = logicalFamily.getPlanarFamily(treeLevels);

  var familyAlignment = new FamilyAlignment(this, family, treeLevels, function (nodeid, node) {
    var treeItemPosition = treeItemsPositions[nodeid];
    var treeItemPadding = intervals[treeItemPosition.actualVisibility] / 2;

    treeItemPosition.leftPadding = treeItemPadding;
    treeItemPosition.rightPadding = treeItemPadding;

    return treeItemPosition.leftPadding + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;
  });

  var leftMargin = null;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var nodeid = treeLevels.getItemAtPosition(levelIndex, 0);
    if (nodeid != null) {
      var treeItemPosition = treeItemsPositions[nodeid];
      var nodeOffset = familyAlignment.getOffset(nodeid) - treeItemPosition.leftPadding - treeItemPosition.actualSize.width / 2;
      leftMargin = (leftMargin == null) ? nodeOffset : Math.min(leftMargin, nodeOffset);
    }
  });

  treeLevels.loopLevels(this, function (levelIndex, level) {
    treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
      var treeItemPosition = treeItemsPositions[nodeid];
      var nodeOffset = familyAlignment.getOffset(nodeid);
      treeItemPosition.offset = nodeOffset - treeItemPosition.actualSize.width / 2;

      treeItemPosition.offset -= leftMargin;
    });
  });
};

FamilyLayout.prototype.arrange = function (thisArg, onItemPositioned) {
  var prevLevelPosition = null;
  if (onItemPositioned != null) {
    this.params.treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = this.data.treeLevelsPositions[levelIndex];

      this.params.treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
        var treeItemPosition = this.data.treeItemsPositions[itemid];
        var result = this.getItemPosition(treeItemPosition.actualVisibility, treeItemPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, this.options.verticalAlignment);
        treeItemPosition.actualPosition = result.position;
        treeItemPosition.horizontalConnectorsShift = result.horizontalConnectorsShift;
        treeItemPosition.topConnectorShift = result.topConnectorShift;
        treeItemPosition.topConnectorInterval = result.topConnectorInterval;
        treeItemPosition.bottomConnectorShift = result.bottomConnectorShift;
        treeItemPosition.bottomConnectorInterval = result.bottomConnectorInterval;

        onItemPositioned.call(thisArg, itemid, treeItemPosition);

        var childLayout = this.getLayout(itemid);
        if (childLayout != null) {
          childLayout.arrange(thisArg, result.position, onItemPositioned);
        }
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
    position: new Rect(offset, level.shift + itemShift, size.width, size.height),
    horizontalConnectorsShift: level.shift + level.horizontalConnectorsDepth,
    topConnectorShift: prevLevel != null ? prevLevel.shift + prevLevel.connectorShift : null,
    topConnectorInterval: prevLevel != null ? prevLevel.levelSpace / 2 : null,
    bottomConnectorShift: level.shift + level.connectorShift,
    bottomConnectorInterval: level.levelSpace / 2
  };
};