import OrgLayout from './layouts/OrgLayout';
import ItemLayout from './layouts/ItemLayout';
import Tree from '../../algorithms/Tree';

export default function OrgCreateLayoutsTreeTask(visualTreeTask, visualTreeLevelsTask, extractNestedLayoutsTask ) {

  var _data = {
    layoutsTree: {},
    maximumId: null
  };

  function process() {
    var visualTree = visualTreeTask.getVisualTree();
    var leftMargins = visualTreeTask.getLeftMargins();
    var rightMargins = visualTreeTask.getRightMargins();
    var maximumId = visualTreeTask.getMaximumId();
    var treeLevels = visualTreeLevelsTask.getTreeLevels();
    var getConnectorsStacksSizes = visualTreeLevelsTask.getConnectorsStacksSizes;
    var layouts = extractNestedLayoutsTask.getLayouts();
    
    var rootLayout = new OrgLayout(visualTree, treeLevels, leftMargins, rightMargins, getConnectorsStacksSizes);
    var layoutsTree = Tree();
    maximumId++;
    layoutsTree.add(null, maximumId, rootLayout);

    var levelLayouts = [{ id: maximumId, levelLayout: rootLayout }];
    while(levelLayouts.length > 0) {
      var nextLevelLayouts = [];
      for(var index = 0; index < levelLayouts.length; index+=1) {
        var { id, levelLayout } = levelLayouts[index];
        levelLayout.loop(this, function(treeItem) {
          var treeItemId = treeItem.id;
          var itemLayout = layouts[treeItemId];
          if(!itemLayout) {
            itemLayout = new ItemLayout(treeItem.visibility);
          } else {
            nextLevelLayouts.push({id: treeItemId, levelLayout: itemLayout});
          }
          layoutsTree.add(id, treeItemId, itemLayout);
        })
      }
      levelLayouts = nextLevelLayouts;
    }

    _data.layoutsTree = layoutsTree;
    _data.maximumId = maximumId;

    return true;
  }


  function getLayoutsTree() {
    return _data.layoutsTree;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getLayoutsTree: getLayoutsTree,
    getMaximumId: getMaximumId
  };
};