import FamilyLayout from './layouts/FamilyLayout';
import ItemLayout from './layouts/ItemLayout';
import Tree from '../../algorithms/Tree';

export default function CreateLayoutsTreeTask(orderFamilyNodesTask, extractNestedLayoutsTask ) {

  var _data = {
    layoutsTree: {},
    maximumId: null
  };

  function process() {
    var logicalFamily = orderFamilyNodesTask.getLogicalFamily();
    var treeLevels = orderFamilyNodesTask.getTreeLevels();
    var maximumId = orderFamilyNodesTask.getMaximumId();
    var getConnectorsStacksSizes = orderFamilyNodesTask.getConnectorsStacksSizes;

    /* create layouts tree and index visibility levels for page auto fit mode */
    var layouts = extractNestedLayoutsTask.getLayouts();
    var rootLayout = new FamilyLayout(logicalFamily, treeLevels, getConnectorsStacksSizes);
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
            itemLayout = new ItemLayout(treeItem);
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