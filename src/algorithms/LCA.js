import RMQ from './RMQ';

/**
 * Creates Lowest Common Ancestor Structure for the given tree
 * @class LCA
 * 
 * @param {Tree} tree The tree structure
 * @returns {LCA} Returns Lowest Common Ancestor Structure
 */
export default function LCA(tree) {
  var _eulerSequence = [];
  var _levels = [];
  var _fai = {};
  var _rmq;


  preprocess();

  function preprocess() {
    var counter = 0;
    tree.loopEulerWalk(this, function (nodeid, node, level) {
      _eulerSequence.push(nodeid);
      _levels.push(level);

      if (!_fai.hasOwnProperty(nodeid)) {
        _fai[nodeid] = counter;
      }
      counter += 1;
    });
    _rmq = RMQ(_levels);
  }

  /**
   * Returns lowest common ancestor for the given pair of tree nodes
   * @param {string} from The first tree node id
   * @param {string} to The second tree node id
   * @returns {string} Returns the lowest common ancestor tree node id
   */
  function getLowestCommonAncestor(from, to) {
    var fromIndex = _fai[from],
      toIndex = _fai[to],
      index;

    if (fromIndex < toIndex) {
      index = _rmq.getRangeMinimumIndex(fromIndex, toIndex);
    } else {
      index = _rmq.getRangeMinimumIndex(toIndex, fromIndex);
    }

    return _eulerSequence[index];
  }

  return {
    getLowestCommonAncestor: getLowestCommonAncestor
  };
};