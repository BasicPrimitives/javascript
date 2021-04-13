import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import { PageFitMode, Visibility } from '../../../enums';

export default function FamNormalVisibilityItemsByMinimumVisibleLevelsTask(minimumVisibleLevelsOptionTask, orderFamilyNodesTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
    treeLevels = orderFamilyNodesTask.getTreeLevels(),
    { pageFitMode, minimalVisibility, minimumVisibleLevels } = minimumVisibleLevelsOptionTask.getOptions();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(treeLevels, pageFitMode, minimalVisibility, minimumVisibleLevels), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(treeLevels, pageFitMode, minimalVisibility, minimumVisibleLevels ) {
    var result = [];

    if(minimumVisibleLevels > 0) {
      if(PageFitMode.PageWidth == pageFitMode || PageFitMode.PageHeight || PageFitMode.FitToPage) {
        if(minimalVisibility != Visibility.Normal) {
          var index = 0,
            currentLevel = null;
          treeLevels.loopLevels(this, function(levelIndex, level) {
            treeLevels.loopLevelItems(this, levelIndex, function(nodeId, node, position) {
              if(node.isVisible) {
                if(currentLevel !== levelIndex) {
                  currentLevel = levelIndex;
                  index+=1;
                }
                result.push(nodeId);
              }
            })
            if(index >= minimumVisibleLevels) {
              return true;
            }
          });
        }
      }
    }

    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
};