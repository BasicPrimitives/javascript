import TreeLevelConnectorStackSize from '../../models/TreeLevelConnectorStackSize';
import TreeLevels from '../../algorithms/TreeLevels';
import Pile from '../../algorithms/Pile';
import { SideFlag } from '../../enums';
import VerticalConnectorBundle from '../../connectors/VerticalConnectorBundle';
import HorizontalConnectorBundle from '../../connectors/HorizontalConnectorBundle';

/* Read visual tree
    populate treeLevels array of type TreeLevel
      TreeLevel object contains ordered list of all its items 
      plus when items added to that collection we store level in item
*/
export default function VisualTreeLevelsTask(visualTreeTask, itemTemplateParamsTask) {
  var _data = {
    treeLevels: null, /* TreeLevels */
    bundles: null, /* array of BaseConnectorBundle objects */
    connectorStacks: null /* array of TreeLevelConnectorStackSize objects, 
      it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
  },
    _nullTreeLevelConnectorStackSize = new TreeLevelConnectorStackSize();

  function process() {
    var visualTree = visualTreeTask.getVisualTree();

    _data.treeLevels = TreeLevels();

    visualTree.loopLevels(this, function (treeItemId, treeItem, levelIndex) {
      _data.treeLevels.addItem(levelIndex, treeItemId, treeItem);
    });

    _data.bundles = [];
    _data.connectorStacks = [];

    recalcLevelsDepth(_data.bundles, _data.connectorStacks, _data.treeLevels, visualTree);

    return true;
  }

  function recalcLevelsDepth(bundles, connectorStacks, treeLevels, orgTree, orgPartners) {
    var index, len,
      index2, len2,
      index3, len3,
      treeItem,
      itemPosition,
      bundle, bundlesToStack, bundlesByItemmId = {},
      startIndex, endIndex, stackSegments;


    treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var stacksSizes = new TreeLevelConnectorStackSize();
      connectorStacks[levelIndex] = stacksSizes;

      bundlesToStack = [];

      treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
        var parents = [];
        if (!bundlesByItemmId.hasOwnProperty(itemid)) {
          if (treeItem.connectorPlacement & SideFlag.Bottom) {
            parents.push(itemid);
          }
          parents = parents.concat(treeItem.partners);

          if (parents.length > 0) {
            bundle = new VerticalConnectorBundle(parents, []);

            for (var index = 0, len = parents.length; index < len; index += 1) {
              bundlesByItemmId[parents[index]] = bundle;
            }

            orgTree.loopChildren(this, itemid, function (childid, child, index) {
              if (child.connectorPlacement & SideFlag.Top) {
                bundle.toItems.push(childid);
              }
            }); //ignore jslint

            if (parents.length > 1) {
              bundlesToStack.push(bundle);
            }

            if (bundle.fromItems.length > 1 || bundle.toItems.length > 0) {
              bundles.push(bundle);
            }
          }
        }

        if (treeItem.connectorPlacement & SideFlag.Left) {
          bundle = new HorizontalConnectorBundle(itemid, treeLevels.getPrevItem(itemid));
          bundles.push(bundle);
        }

        if (treeItem.connectorPlacement & SideFlag.Right) {
          bundle = new HorizontalConnectorBundle(itemid, treeLevels.getNextItem(itemid));
          bundles.push(bundle);
        }
      });

      if (bundlesToStack.length > 0) {
        /* find minimum and maximum partner index at level */
        stackSegments = Pile();
        for (index2 = 0, len2 = bundlesToStack.length; index2 < len2; index2 += 1) {
          bundle = bundlesToStack[index2];

          startIndex = null;
          endIndex = null;
          for (index3 = 0, len3 = bundle.fromItems.length; index3 < len3; index3 += 1) {
            itemPosition = treeLevels.getItemPosition(bundle.fromItems[index3]);

            startIndex = (startIndex != null) ? Math.min(startIndex, itemPosition) : itemPosition;
            endIndex = (endIndex != null) ? Math.max(endIndex, itemPosition) : itemPosition;
          }
          stackSegments.add(startIndex, endIndex, bundle);
        }

        stacksSizes.parentsStackSize = stackSegments.resolve(this, function (from, to, bundle, offset, stackSize) {
          bundle.fromOffset = offset + 1;
          bundle.fromStackSize = stackSize;
        });//ignore jslint
      }
    });
  }

  function getTreeLevels() {
    return _data.treeLevels;
  }

  function getBundles() {
    return _data.bundles;
  }

  function getNestedLayoutParentConnectorIds() {
    return {}; /* org chart does not support nested layouts */
  }

  function getNestedLayoutBottomConnectorIds() {
    return {}; /* org chart does not support nested layouts */
  }

  function getConnectorsStacksSizes(levelid) {
    return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
  }

  return {
    process: process,
    getTreeLevels: getTreeLevels,
    getBundles: getBundles,
    getConnectorsStacksSizes: getConnectorsStacksSizes,
    getNestedLayoutParentConnectorIds: getNestedLayoutParentConnectorIds,
    getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds
  };
};