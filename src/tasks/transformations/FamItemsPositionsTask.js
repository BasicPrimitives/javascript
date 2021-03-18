import FamilyLayout from './layouts/FamilyLayout';
import ItemLayout from './layouts/ItemLayout';
import Rect from '../../graphics/structs/Rect';
import Size from '../../graphics/structs/Size';
import Tree from '../../algorithms/Tree';
import { OrientationType, PageFitMode, Visibility } from '../../enums';

function LevelVisibility(level, visibility) {
  this.level = level;
  this.visibility = visibility;
};

export default function FamItemsPositionsTask(currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask,
  normalizeOptionTask, normalizeLogicalFamilyTask, extractNestedLayoutsTask,
  itemTemplateParamsTask,
  cursorItemTask, combinedNormalVisibilityItemsTask) {

  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    size: null // Rect();
  };

  function process() {
    var { verticalAlignment, pageFitMode, minimalVisibility,
      normalLevelShift, dotLevelShift, lineLevelShift, normalItemsInterval, dotItemsInterval, lineItemsInterval,
      checkBoxPanelSize, buttonsPanelSize, groupTitlePanelSize, groupTitlePlacementType } = itemsSizesOptionTask.getOptions();
    var { arrowsDirection, linesWidth } = connectorsOptionTask.getOptions();
    var { maximumColumnsInMatrix } = normalizeOptionTask.getOptions();
    var { orientationType } = orientationOptionTask.getOptions();

    var logicalFamily = normalizeLogicalFamilyTask.getLogicalFamily();
    var treeLevels = normalizeLogicalFamilyTask.getTreeLevels();
    var maximumId = normalizeLogicalFamilyTask.getMaximumId();
    var getConnectorsStacksSizes = normalizeLogicalFamilyTask.getConnectorsStacksSizes;
    var isItemSelected = combinedNormalVisibilityItemsTask.isItemSelected;
    var cursorItemId = cursorItemTask.getCursorTreeItem();
    var getTemplateParams = itemTemplateParamsTask.getTemplateParams;

    /* calculate panel size */
    var { optimalPanelSize } = currentControlSizeTask.getOptions();
    var panelSize = new Size(optimalPanelSize);
    var { scale } = scaleOptionTask.getOptions();
    panelSize.scale(1.0 / scale);
    var panelRect = new Rect(0, 0, panelSize.width, panelSize.height);

    /* create layouts tree */
    var layouts = extractNestedLayoutsTask.getLayouts();
    var rootLayout = new FamilyLayout(logicalFamily, treeLevels, getConnectorsStacksSizes);
    var layoutsTree = Tree();
    maximumId++;
    layoutsTree.add(null, maximumId, rootLayout);

    var levelIndexes = {};
    var levelLayouts = [];
    treeLevels.loopLevels(this, function (levelIndex) {
      treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem) {
        levelIndexes[treeItemId] = levelIndex;
        var itemLayout = layouts[treeItemId];
        if(!itemLayout) {
          itemLayout = new ItemLayout(treeItem);
        } else {
          levelLayouts.push({id: treeItemId, levelLayout: itemLayout, levelIndex: levelIndex});
        }
        layoutsTree.add(maximumId, treeItemId, itemLayout);
      });
    });

    while(levelLayouts.length > 0) {
      var nextLevelLayouts = [];
      for(var index = 0; index < levelLayouts.length; index+=1) {
        var { id, levelLayout, levelIndex } = levelLayouts[index];
        levelLayout.loop(this, function(treeItem) {
          var treeItemId = treeItem.id;
          var itemLayout = layouts[treeItemId];
          if(!itemLayout) {
            itemLayout = new ItemLayout(treeItem);
          } else {
            nextLevelLayouts.push({id: treeItemId, levelLayout: itemLayout, levelIndex: levelIndex});
          }
          levelIndexes[treeItemId] = levelIndex;
          layoutsTree.add(id, treeItemId, itemLayout);
        })
      }
      levelLayouts = nextLevelLayouts;
    }

    var options = {
      verticalAlignment,
      pageFitMode,
      minimalVisibility,
      orientationType,
      arrowsDirection,
      linesWidth,
      checkBoxPanelSize,
      buttonsPanelSize,
      groupTitlePanelSize,
      groupTitlePlacementType,
      maximumColumnsInMatrix,
      shifts: getShifts(normalLevelShift, dotLevelShift, lineLevelShift, lineLevelShift),
      intervals: getIntervals(normalItemsInterval, dotItemsInterval, lineItemsInterval, lineItemsInterval)
    };

    /* find optimal panel size */
    _data.size = panelSize;
    var { treeItemsPositions, size } = autoFitDiagramToPageSize(panelSize, treeLevels, maximumId, layoutsTree, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
    if(treeItemsPositions != null) {
      _data.treeItemsPositions = treeItemsPositions;
      _data.size = size;

      /* arrange items positions */
      var treeItemPosition = _data.treeItemsPositions[maximumId];
      treeItemPosition.actualPosition = new Rect(0, 0, _data.size.width, _data.size.height);

      var layoutsDirections = {};
      layoutsTree.loopPreOrder(this, function(childLayoutId, childLayout, parentLayoutId, parentLayout) {
        var treeItemPosition = _data.treeItemsPositions[childLayoutId];
        var layoutDirection = layoutsDirections[childLayoutId];
        childLayout.arrange(this, treeItemPosition.actualPosition, layoutDirection, _data.treeItemsPositions, options, function (treeItemId, treeItemPosition, layoutDirection) {
          _data.treeItemsPositions[treeItemId] = treeItemPosition;
          layoutsDirections[treeItemId] = layoutDirection;
        });
      });
    }
    return true;
  }

  function autoFitDiagramToPageSize(panelSize, treeLevels, rootLayoutId, layoutsTree, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options) {
    var result = {},
      possibleLevelVisibilities,
      enabledLevelVisibilities;

    var { orientationType, pageFitMode, minimalVisibility } = options;

    switch (orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        panelSize.invert();
        break;
    }
    if (!treeLevels.isEmpty()) {
      switch (pageFitMode) {
        case PageFitMode.None:
        case PageFitMode.AutoSize:
          possibleLevelVisibilities = [new LevelVisibility(0, Visibility.Normal)];
          enabledLevelVisibilities = getLevelVisibilities(treeLevels, possibleLevelVisibilities, 0);
          result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
          break;
        default:
          possibleLevelVisibilities = getPossibleLevelVisibilities(treeLevels, minimalVisibility);
          enabledLevelVisibilities = getLevelVisibilities(treeLevels, possibleLevelVisibilities, possibleLevelVisibilities.length - 1);

          // Find minimal placeholder size to hold completely folded diagram
          result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
          if (checkDiagramSize(result.size, panelSize, pageFitMode)) {
            // Find optimal diagram size
            var minimalPlaceholderSize = new Rect(0, 0, result.size.width, result.size.height);
            minimalPlaceholderSize.addRect(0, 0, panelSize.width, panelSize.height);
            minimalPlaceholderSize.offset(0, 0, 5, 5);
            findOptimalSize(this, possibleLevelVisibilities.length - 1, function (index) {
              enabledLevelVisibilities = getLevelVisibilities(treeLevels, possibleLevelVisibilities, index);
              result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);

              /* compare root layout to the available panel space */
              return checkDiagramSize(result.size, minimalPlaceholderSize, options.pageFitMode);
            });
          }
          break;
      }
    }

    return result;
  }

  function measureLayout(rootLayoutId, layoutsTree, levelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options ) {
    var treeItemsPositions = {};

    /* measure individual nodes from bottom to up */
    layoutsTree.loopPostOrder(this, function(childLayoutId, childLayout, parentLayoutId, parentLayout) {
      var levelIndex = levelIndexes[childLayoutId];
      var levelVisibility = levelVisibilities[levelIndex];
      var isCursor = (cursorItemId == childLayoutId);
      var isSelected = isItemSelected(childLayoutId);
      var treeItemTemplate = getTemplateParams(childLayoutId);
      treeItemsPositions[childLayoutId] = childLayout.measure(levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options);
    });

    return {
      treeItemsPositions,
      size: treeItemsPositions[rootLayoutId].actualSize
    }
  }

  function findOptimalSize(thisArg, maximum, funcCheckSize) {
    var minimum = 0,
      cursorIndex;
    /* maximum compression fit to page */
    if (!funcCheckSize.call(thisArg, minimum)) {
      /* minimum compression does not fit to page */
      cursorIndex = maximum;
      while (maximum - minimum > 1) {
        cursorIndex = Math.floor((maximum + minimum) / 2.0);
        if (funcCheckSize.call(thisArg, cursorIndex)) {
          /* middle point size fit to page */
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

  function getLevelVisibilities(treeLevels, possibleLevelVisibilities, cursorIndex) {
    var index,
      levelVisibility;

     
    var result = [];
    treeLevels.loopLevels(this, function () {
      result.push(Visibility.Normal);
    });

    /* set levels visibility */ 
    for (index = 0; index <= cursorIndex; index += 1) {
      levelVisibility = possibleLevelVisibilities[index];
      result[levelVisibility.level] = levelVisibility.visibility;
    }
    return result;
  }

  function getPossibleLevelVisibilities(treeLevels, minimalVisibility) {
    var result = [new LevelVisibility(0, Visibility.Normal)];
  
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
        result.push(new LevelVisibility(level, visibilities[index]));
      }
    });
  
    return result;
  };

  function checkDiagramSize(diagramSize, panelSize, pageFitMode) {
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

  function getShifts(normalLevelShift, dotLevelShift, lineLevelShift, invisibleLineLevelShift) {
    var result = [];
    result[Visibility.Normal] = normalLevelShift;
    result[Visibility.Dot] = dotLevelShift;
    result[Visibility.Line] = lineLevelShift;
    result[Visibility.Invisible] = invisibleLineLevelShift;
    return result;
  };
  
  function getIntervals(normalItemsInterval, dotItemsInterval, lineItemsInterval, invisibleLineItemsInterval) {
    var result = [];
    result[Visibility.Normal] = normalItemsInterval;
    result[Visibility.Dot] = dotItemsInterval;
    result[Visibility.Line] = lineItemsInterval;
    result[Visibility.Invisible] = invisibleLineItemsInterval;
    return result;
  };

  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.size;
  }

  return {
    process: process,
    getItemsPositions: getItemsPositions,
    getItemPosition: getItemPosition,
    getContentSize: getContentSize
  };
};