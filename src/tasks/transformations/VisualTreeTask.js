import Family from '../../algorithms/Family';
import Tree from '../../algorithms/Tree';
import BranchAligner from './visualTreeBuilder/BranchAligner';
import VisualTreeBuilder from './visualTreeBuilder/VisualTreeBuilder';

export default function VisualTreeTask(orgTreeTask, activeItemsTask, visualTreeOptionTask) {
  var _visualTree, /* Tree(); key: TreeItem.id value: TreeItem */
    _leftMargins,
    _rightMargins,
    _navigationFamily, /* Family structure where key: TreeItem.id and value: TreeItem */
    _treeItemCounter,
    _branchAligner,
    _visualTreeBuilder = VisualTreeBuilder();

  function process() {
    var orgTree = orgTreeTask.getOrgTree();
    var options = visualTreeOptionTask.getOptions();
    var activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

    _treeItemCounter = orgTreeTask.getMaximumId();

    if (orgTree.hasNodes()) {
      ({ 
        visualTree: _visualTree, 
        navigationFamily: _navigationFamily,
        treeItemCounter: _treeItemCounter,
        branchAligner: _branchAligner
      } = _visualTreeBuilder.build(orgTree, _treeItemCounter, activeItems, options));
    } else {
      _visualTree = Tree();
      _navigationFamily = Family();
      _branchAligner = BranchAligner();
    }

    ({
      leftMargins: _leftMargins,
      rightMargins: _rightMargins
    } = getVisualTreeMargins(_visualTree));

    return true;
  }

  function getVisualTreeMargins(visualTree) {
    var leftMargins = {}
    var rightMargins = {};
    visualTree.loop(this, function (nodeid, node) {
      leftMargins[nodeid] = [];
      rightMargins[nodeid] = [];
    });

    visualTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
      var parentLeftMargins = leftMargins[parentid],
        parentRightMargins = rightMargins[parentid],
        nodeLeftMargins = leftMargins[nodeid],
        nodeRightMargins = rightMargins[nodeid],
        index, len;

      if (parentid != null) {
        /* update parent left margins */
        if (!parentLeftMargins[0]) {
          parentLeftMargins[0] = nodeid;
        }

        for (index = 0, len = nodeLeftMargins.length; index < len; index += 1) {
          if (!parentLeftMargins[index + 1]) {
            parentLeftMargins[index + 1] = nodeLeftMargins[index];
          }
        }

        /* update parent rights margins */
        parentRightMargins[0] = nodeid;

        for (index = 0, len = nodeRightMargins.length; index < len; index += 1) {
          parentRightMargins[index + 1] = nodeRightMargins[index];
        }
      }
    });

    return {
      leftMargins: leftMargins,
      rightMargins: rightMargins
    }
  }

  function getVisualTree() {
    return _visualTree;
  }

  function getLogicalFamily() {
    return _navigationFamily;
  }

  function getBranchAligner() {
    return _branchAligner;
  }

  function getLeftMargins() {
    return _leftMargins;
  }

  function getRightMargins() {
    return _rightMargins;
  }

  function getMaximumId() {
    return _treeItemCounter;
  }

  return {
    process: process,
    getVisualTree: getVisualTree,
    getLogicalFamily: getLogicalFamily,
    getLeftMargins: getLeftMargins,
    getRightMargins: getRightMargins,
    getMaximumId: getMaximumId,
    getBranchAligner: getBranchAligner
  };
};