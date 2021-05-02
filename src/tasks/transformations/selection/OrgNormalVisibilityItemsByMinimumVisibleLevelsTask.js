import ArrayReader from '../../../readers/ArrayReader';
import ValueReader from '../../../readers/ValueReader';
import { PageFitMode, Visibility } from '../../../enums';

export default function OrgNormalVisibilityItemsByMinimumVisibleLevelsTask(minimumVisibleLevelsOptionTask, orgTreeTask) {
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
    orgTree = orgTreeTask.getOrgTree(),
    { pageFitMode, minimalVisibility, minimumVisibleLevels } = minimumVisibleLevelsOptionTask.getOptions();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(orgTree, pageFitMode, minimalVisibility, minimumVisibleLevels), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(orgTree, pageFitMode, minimalVisibility, minimumVisibleLevels ) {
    var result = [],
      buckets = [];

    if(minimumVisibleLevels > 0) {
      if(PageFitMode.PageWidth == pageFitMode || PageFitMode.PageHeight || PageFitMode.FitToPage) {
        if(minimalVisibility != Visibility.Normal) {
          orgTree.loopLevels(this, function(nodeId, node, levelIndex) {
            if(node.isVisible) {
              var nodeLevel = levelIndex + node.levelOffset;
              if(!buckets[nodeLevel]) {
                buckets[nodeLevel] = [nodeId];
              } else {
                buckets[nodeLevel].push(nodeId);
              }
            }
          });

          var actualLevel = 0;
          for(var index = 0; index < buckets.length; index+=1) {
            if(buckets[index] != null) {
              result = result.concat(buckets[index]);
              actualLevel+=1;

              if(actualLevel >= minimumVisibleLevels) {
                break;
              }
            }
          }
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