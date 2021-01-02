import { PageFitMode, OrientationType, AdviserPlacementType, Visibility, VerticalAlignmentType, 
  HorizontalAlignmentType, SideFlag, GroupByType } from '../../enums';
import Rect from '../../graphics/structs/Rect';
import Size from '../../graphics/structs/Size';
import TreeItemPosition from '../../models/TreeItemPosition';
import LevelVisibility from '../../models/LevelVisibility';
import TreeLevelPosition from '../../models/TreeLevelPosition';

export default function OrgItemsPositionsTask(currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask, visualTreeOptionTask,
  visualTreeTask, visualTreeLevelsTask,
  itemTemplateParamsTask,
  cursorItemTask, combinedNormalVisibilityItemsTask) {
  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    panelSize: null // Rect();
  },
    _treeLevels,
    _treeLevelsPositions, // TreeLevelPosition()
    _visualTree,
    _leftMargins,
    _rightMargins,
    _orientationOptions,
    _connectorsOptions,
    _visualTreeOptions,
    _itemsSizesOptions,
    _intervals;

  function process() {
    var { optimalPanelSize } = currentControlSizeTask.getOptions(),
      panelSize = new Size(optimalPanelSize),
      panelRect,
      { scale } = scaleOptionTask.getOptions();

    _itemsSizesOptions = itemsSizesOptionTask.getOptions();
    _intervals = getIntervals(_itemsSizesOptions);
    _orientationOptions = orientationOptionTask.getOptions();
    _connectorsOptions = connectorsOptionTask.getOptions();
    _visualTreeOptions = visualTreeOptionTask.getOptions();

    _treeLevels = visualTreeLevelsTask.getTreeLevels();
    _visualTree = visualTreeTask.getVisualTree();
    _leftMargins = visualTreeTask.getLeftMargins();
    _rightMargins = visualTreeTask.getRightMargins();

    _treeLevelsPositions = [];

    _data.treeItemsPositions = {};

    panelSize.scale(1.0 / scale);
    panelRect = new Rect(0, 0, panelSize.width, panelSize.height);
    _data.panelSize = positionTreeItems(panelRect);

    recalcItemsPositions();

    return true;
  }

  /*  Position */
  function positionTreeItems(panelSize) {
    var placeholderSize = new Rect(0, 0, 0, 0),
      levelVisibilities,
      visibilities,
      minimalPlaceholderSize,
      leftMargin,
      rightMargin,
      cursorIndex;

    switch (_orientationOptions.orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        panelSize.invert();
        break;
    }

    if (!_treeLevels.isEmpty()) {
      switch (_itemsSizesOptions.pageFitMode) {
        case PageFitMode.None:
        case PageFitMode.AutoSize:
          levelVisibilities = [new LevelVisibility(0, Visibility.Normal)];
          placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
          break;
        default:
          levelVisibilities = [new LevelVisibility(0, Visibility.Normal)];
          visibilities = [];
          switch (_itemsSizesOptions.minimalVisibility) {
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

          _treeLevels.loopLevelsReversed(this, function (level, levelContext) {
            var index;
            for (index = 0; index < visibilities.length; index += 1) {
              levelVisibilities.push(new LevelVisibility(level, visibilities[index]));
            }
          });

          // Find minimal placeholder size to hold completly folded diagram
          minimalPlaceholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
          minimalPlaceholderSize.addRect(panelSize);
          minimalPlaceholderSize.offset(0, 0, 5, 5);

          leftMargin = null;
          rightMargin = null;
          cursorIndex = null;
          // Maximized
          placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
          if (!checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
            leftMargin = 0;

            // Minimized
            placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
            if (checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
              rightMargin = levelVisibilities.length - 1;

              cursorIndex = rightMargin;
              while (rightMargin - leftMargin > 1) {
                cursorIndex = Math.floor((rightMargin + leftMargin) / 2.0);

                placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, cursorIndex);
                if (checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
                  rightMargin = cursorIndex;
                }
                else {
                  leftMargin = cursorIndex;
                }
              }
              if (rightMargin !== cursorIndex) {
                placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, rightMargin);
              }
            }
          }
          break;
      }
    }
    return placeholderSize;
  }

  function setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, cursorIndex) {
    var index,
      levelVisibility;

    _treeLevelsPositions = [];
    _treeLevels.loopLevels(this, function (index, levelContext) {
      var treeLevelPosition = new TreeLevelPosition();
      treeLevelPosition.currentvisibility = Visibility.Normal;

      _treeLevelsPositions.push(treeLevelPosition);
    });


    for (index = 0; index <= cursorIndex; index += 1) {
      levelVisibility = levelVisibilities[index];

      _treeLevelsPositions[levelVisibility.level].currentvisibility = levelVisibility.currentvisibility;
    }
    recalcItemsSize();
    setOffsets();
    recalcLevelsDepth();
    shiftLevels();

    return new Rect(0, 0, Math.round(getDiagramWidth()), Math.round(getDiagramHeight()));
  }

  function checkDiagramSize(diagramSize, panelSize) {
    var result = false;
    switch (_itemsSizesOptions.pageFitMode) {
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
  }

  function getDiagramHeight() {
    var len = _treeLevelsPositions.length,
      treeLevel = _treeLevelsPositions[len - 1];
    return treeLevel.shift + treeLevel.nextLevelShift;
  }

  function getDiagramWidth() {
    var result = 0,
      index,
      len;
    for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
      result = Math.max(result, _treeLevelsPositions[index].currentOffset);
    }
    result += _itemsSizesOptions.normalItemsInterval;
    return result;
  }

  function recalcItemsSize() {
    var cursorItemId = cursorItemTask.getCursorTreeItem();

    _data.treeItemsPositions = {};
    _treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = _treeLevelsPositions[levelIndex];

      _treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem, position) {
        var treeItemPosition = new TreeItemPosition(),
          treeItemVisibility = combinedNormalVisibilityItemsTask.isItemSelected(treeItemId) ? Visibility.Normal : treeItem.visibility,
          treeItemtemplate = itemTemplateParamsTask.getTemplateParams(treeItemId);

        var actualVisibility = (treeItemVisibility === Visibility.Auto) ? treeLevelPosition.currentvisibility : treeItemVisibility;
        var size = getSize(actualVisibility, cursorItemId == treeItemId, treeItemtemplate, _itemsSizesOptions, _orientationOptions.orientationType);

        treeItemPosition.actualVisibility = actualVisibility;
        treeItemPosition.actualSize = size.actualSize;
        treeItemPosition.contentPosition = size.contentPosition;

        _data.treeItemsPositions[treeItemId] = treeItemPosition;
      });
    });
  }

  function recalcLevelsDepth() {
    var index, len,
      index2, len2,
      index3, len3,
      treeItem,
      treeLevel,
      treeItems,
      itemPosition,
      treeItemsHavingPartners,
      treeItemsGroup,
      partners, partner,
      levelOffset,
      minimalDepth,
      dotsDepth,
      startIndex, endIndex,
      stackSegments;


    _treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = _treeLevelsPositions[levelIndex];
      treeLevelPosition.shift = 0.0;
      treeLevelPosition.depth = 0.0;
      treeLevelPosition.actualVisibility = Visibility.Invisible;

      treeItemsHavingPartners = [];

      minimalDepth = null; /* minimum  height of non-dot items in level */
      dotsDepth = null; /* maximum dots height */

      _treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
        var treeItemPosition = _data.treeItemsPositions[itemid];
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

      switch (_itemsSizesOptions.verticalAlignment) {
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
  }

  function shiftLevels() {
    var shift = _itemsSizesOptions.lineLevelShift,
      index,
      len,
      treeLevelPosition, treeLevelConnectorStackSize,
      childrenSpace = 0,
      parentsSpace = 0,
      arrowTipLength = _connectorsOptions.linesWidth * 8;

    switch (_connectorsOptions.arrowsDirection) {
      case GroupByType.Parents:
        childrenSpace = arrowTipLength;
        parentsSpace = 0;
        break;
      case GroupByType.Children:
        childrenSpace = 0;
        parentsSpace = arrowTipLength;
        break;
    }

    for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
      treeLevelPosition = _treeLevelsPositions[index];
      treeLevelConnectorStackSize = visualTreeLevelsTask.getConnectorsStacksSizes(index);
      shift += treeLevelPosition.setShift(shift, getLevelSpace(treeLevelPosition.actualVisibility), parentsSpace, childrenSpace, treeLevelConnectorStackSize.parentsStackSize);
    }
  }

  function getLevelSpace(visibility) {
    var result = 0.0;

    switch (visibility) {
      case Visibility.Normal:
        result = _itemsSizesOptions.normalLevelShift;
        break;
      case Visibility.Dot:
        result = _itemsSizesOptions.dotLevelShift;
        break;
      case Visibility.Line:
      case Visibility.Invisible:
        result = _itemsSizesOptions.lineLevelShift;
        break;
    }
    return result;
  }

  function setOffsets() {
    var index,
      len;
    for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
      _treeLevelsPositions[index].currentOffset = 0.0;
    }
    _visualTree.loopPostOrder(this, function (treeItemId, treeItem, parentid, parent) {
      var treeItemPosition = _data.treeItemsPositions[treeItemId],
        treeItemVisibility = treeItemPosition.actualVisibility,
        treeItemLevelIndex = _treeLevels.getLevelIndex(treeItemId),
        treeLevelPosition = _treeLevelsPositions[treeItemLevelIndex],
        treeItemPadding = _intervals[treeItemVisibility === Visibility.Auto ? treeLevelPosition.currentvisibility : treeItemVisibility] / 2.0,
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
        cousinsInterval = treeLevelPosition.currentOffset > 0 ? treeItemPadding * (treeItem.relationDegree) * _itemsSizesOptions.cousinsIntervalMultiplier : 0,
        arrowTipLength = _connectorsOptions.linesWidth * 8;
      treeItemPosition.leftPadding = treeItemPadding + cousinsInterval;
      treeItemPosition.rightPadding = treeItemPadding;
      if (_connectorsOptions.arrowsDirection != GroupByType.None) {
        if (treeItem.connectorPlacement & SideFlag.Left) {
          treeItemPosition.leftPadding += arrowTipLength;
        }
        if (treeItem.connectorPlacement & SideFlag.Right) {
          treeItemPosition.rightPadding += arrowTipLength;
        }
      }
      treeItemPosition.offset = treeLevelPosition.currentOffset + treeItemPosition.leftPadding;
      treeLevelPosition.currentOffset = treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;

      if (_visualTree.hasChildren(treeItemId)) {
        offset = getChildrenOffset(treeItem);
        if (offset > 0) {
          offsetItemChildren(treeItem, offset);
        }
        else if (offset < 0) {
          offset = -offset;
          offsetItem(treeItem, offset);

          siblings = null;
          gaps = {};
          leftMargin = null;
          parentItem = _visualTree.parent(treeItem.id);
          if (parentItem !== null) {
            _visualTree.loopChildrenReversed(this, parentItem.id, function (childItemId, childItem, index) {
              if (childItem === treeItem) {
                siblings = [];
              }
              else if (siblings !== null) {
                gap = getGapBetweenSiblings(childItem, treeItem);
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

                  offsetItem(sibling, offset);
                  offsetItemChildren(sibling, offset);
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

                  offsetItem(sibling, offset);
                  offsetItemChildren(sibling, offset);
                }
              }
            }
          }
        }
      }
    });
  }

  function getGapBetweenSiblings(leftItem, rightItem) {
    var result = null,
      rightMargins = getRightMargins(leftItem),
      leftMargins = getLeftMargins(rightItem),
      depth = Math.min(rightMargins.length, leftMargins.length),
      index,
      gap;

    for (index = 0; index < depth; index += 1) {
      gap = leftMargins[index] - rightMargins[index];
      result = (result !== null) ? Math.min(result, gap) : gap;

      if (gap <= 0) {
        break;
      }
    }

    return Math.floor(result);
  }

  function getRightMargins(treeItem) {
    var result = [],
      rightMargins,
      index,
      len,
      marginItemPosition;

    rightMargins = _rightMargins[treeItem.id];
    if (rightMargins === undefined) {
      rightMargins = [];
    }
    rightMargins = rightMargins.slice();
    rightMargins.splice(0, 0, treeItem.id);
    for (index = 0, len = rightMargins.length; index < len; index += 1) {
      marginItemPosition = _data.treeItemsPositions[rightMargins[index]];
      result[index] = marginItemPosition.offset + marginItemPosition.actualSize.width + marginItemPosition.rightPadding;
    }

    return result;
  }

  function getLeftMargins(treeItem) {
    var result = [],
      leftMargins,
      index, len,
      marginItemPosition;

    leftMargins = _leftMargins[treeItem.id];
    if (leftMargins === undefined) {
      leftMargins = [];
    }
    leftMargins = leftMargins.slice();
    leftMargins.splice(0, 0, treeItem.id);
    for (index = 0, len = leftMargins.length; index < len; index += 1) {
      marginItemPosition = _data.treeItemsPositions[leftMargins[index]];
      result[index] = marginItemPosition.offset - marginItemPosition.leftPadding;
    }

    return result;
  }

  function getChildrenOffset(treeItem) {
    var treeItemPosition = _data.treeItemsPositions[treeItem.id],
      treeItemCenterOffset = treeItemPosition.offset + treeItemPosition.actualSize.width / 2.0,
      childrenCenterOffset = null,
      firstItem, firstItemPosition,
      lastItem, lastItemPosition,
      visualAggregatorPosition;
    if (treeItem.visualAggregatorId === null) {
      firstItem = null;
      _visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
        firstItem = childItem;
        if (firstItem.connectorPlacement & SideFlag.Top) {
          return true;
        }
      });
      firstItemPosition = _data.treeItemsPositions[firstItem.id];

      lastItem = null;
      _visualTree.loopChildrenReversed(this, treeItem.id, function (childItemId, childItem, index) {
        lastItem = childItem;
        if (lastItem.connectorPlacement & SideFlag.Top) {
          return true;
        }
      });
      lastItemPosition = _data.treeItemsPositions[lastItem.id];

      switch (_visualTreeOptions.horizontalAlignment) {
        case HorizontalAlignmentType.Left:
          childrenCenterOffset = firstItemPosition.offset + firstItemPosition.actualSize.width / 2.0;
          break;
        case HorizontalAlignmentType.Right:
          childrenCenterOffset = lastItemPosition.offset + lastItemPosition.actualSize.width / 2.0;
          break;
        case HorizontalAlignmentType.Center:
          childrenCenterOffset = (firstItemPosition.offset + lastItemPosition.offset + lastItemPosition.actualSize.width) / 2.0;
          break;
      }
    }
    else {
      visualAggregatorPosition = _data.treeItemsPositions[treeItem.visualAggregatorId];
      childrenCenterOffset = visualAggregatorPosition.offset + visualAggregatorPosition.actualSize.width / 2.0;
    }

    var i = treeItemCenterOffset - childrenCenterOffset;
    return treeItemCenterOffset - childrenCenterOffset;
  }

  function offsetItem(treeItem, offset) {
    var treeItemPosition = _data.treeItemsPositions[treeItem.id];
    treeItemPosition.offset += offset;

    var treeLevelPosition = _treeLevelsPositions[_treeLevels.getLevelIndex(treeItem.id)];
    treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding);
  }

  function offsetItemChildren(treeItem, offset) {
    var childTreeItemPosition,
      treeLevelPosition;

    _visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, levelid) {
      childTreeItemPosition = _data.treeItemsPositions[childItemId];
      childTreeItemPosition.offset += offset;

      treeLevelPosition = _treeLevelsPositions[_treeLevels.getLevelIndex(childItemId)];
      treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childTreeItemPosition.offset + childTreeItemPosition.actualSize.width);

      return true;
    });
  }

  function recalcItemsPositions() {
    var prevLevelPosition = null;
    _treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = _treeLevelsPositions[levelIndex];

      _treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
        var treeItemPosition = _data.treeItemsPositions[itemid];
        var result = getPosition(treeItemPosition.actualVisibility, treeItemPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, _itemsSizesOptions.verticalAlignment);
        treeItemPosition.actualPosition = result.position;
        treeItemPosition.horizontalConnectorsShift = result.horizontalConnectorsShift;
        treeItemPosition.topConnectorShift = result.topConnectorShift;
        treeItemPosition.topConnectorInterval = result.topConnectorInterval;
        treeItemPosition.bottomConnectorShift = result.bottomConnectorShift;
        treeItemPosition.bottomConnectorInterval = result.bottomConnectorInterval;
      });

      prevLevelPosition = treeLevelPosition;
    });
  }

  function getSize(visibility, isCursor, treeItemTemplate, itemsSizesOptions, orientationType) {
    var templateConfig,
      size,
      contentPosition;

    switch (visibility) {
      case Visibility.Normal:
        templateConfig = treeItemTemplate.template.templateConfig;
        size = new Size(templateConfig.itemSize);
        contentPosition = new Rect(0, 0, size.width, size.height);
        if (isCursor) {
          size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
          size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
          contentPosition.x = templateConfig.cursorPadding.left;
          contentPosition.y = templateConfig.cursorPadding.top;
        }
        if (treeItemTemplate.hasSelectorCheckbox) {
          size.height += itemsSizesOptions.checkBoxPanelSize;
        }
        if (treeItemTemplate.hasButtons) {
          size.width += itemsSizesOptions.buttonsPanelSize;
          switch (itemsSizesOptions.groupTitlePlacementType) {
            case AdviserPlacementType.Right:
              contentPosition.x += itemsSizesOptions.buttonsPanelSize;
              break;
          }
        }
        if (treeItemTemplate.hasGroupTitle) {
          size.width += itemsSizesOptions.groupTitlePanelSize;
          switch (itemsSizesOptions.groupTitlePlacementType) {
            case AdviserPlacementType.Right:
              break;
            default:
              contentPosition.x += itemsSizesOptions.groupTitlePanelSize;
              break;
          }
        }
        break;
      case Visibility.Dot:
        templateConfig = treeItemTemplate.template.templateConfig;
        size = new Size(templateConfig.minimizedItemSize);
        break;
      case Visibility.Line:
      case Visibility.Invisible:
        size = new Size();
        break;
    }

    switch (orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        size.invert();
        break;
    }

    return {
      actualSize: size,
      contentPosition: contentPosition
    };
  }

  function getPosition(visibility, offset, size, prevLevel, level, verticalAlignment) {
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
  }

  function getIntervals(options) {
    var result = [];
    result[Visibility.Normal] = options.normalItemsInterval;
    result[Visibility.Dot] = options.dotItemsInterval;
    result[Visibility.Line] = options.lineItemsInterval;
    result[Visibility.Invisible] = options.lineItemsInterval;
    return result;
  }

  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.panelSize;
  }

  return {
    process: process,
    getItemsPositions: getItemsPositions,
    getItemPosition: getItemPosition,
    getContentSize: getContentSize
  };
};