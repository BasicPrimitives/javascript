/**
* Heap result object
* @class HeapResult
* @property {string} key Key
* @property {number} priority Priority
* @property {Object} item Context object
*/
export function HeapResult (node) {
  this.key = node.key;
  this.priority = node.priority;
  this.item = node.item;
}

/**
 * Creates Fibonacci Heap structure
 * @class FibonacciHeap
 * 
 * @param {boolean} isMaximum Is maximum heap
 * @returns {FibonacciHeap} Returns new FibonacciHeap object
 */
export default function FibonacciHeap(isMaximum) {
  var root = null,
    count = 0,
    nodes = {};

  function Node(key, priority, item) {
    this.key = key;
    this.priority = priority;
    this.item = item;
    this.degree = 0;
    this.marked = false;

    this.parent = null;
    this.child = null;
    this.left = null;
    this.right = null;
  }

  /**
   * Validates internal structure consistency.
   * 
   * @returns {boolean} Returns true if structure pass data consistency check.
   */
  function validate() {
    var totalNodes = 0;
    for (var key in nodes) {
      if (nodes.hasOwnProperty(key)) {
        var node = nodes[key];

        totalNodes += 1;

        if (node.child != null) {
          if (!nodes.hasOwnProperty(node.child)) {
            throw "Child does not exists";
          }
          var ref = nodes[node.child];
          if (ref.parent != node.key) {
            throw "Child references wrong parent";
          }
        }
        if (node.parent != null) {
          if (!nodes.hasOwnProperty(node.parent)) {
            throw "Parent does not exists";
          }

        }
        if (node.left != null) {
          if (!nodes.hasOwnProperty(node.left)) {
            throw "Left does not exists";
          }
          ref = nodes[node.left];
          if (ref.right != node.key) {
            throw "Left references wrong right";
          }
        }

        if (node.right != null) {
          if (!nodes.hasOwnProperty(node.right)) {
            throw "Right does not exists";
          }
          ref = nodes[node.right];
          if (ref.left != node.key) {
            throw "Right references wrong left";
          }
        }
      }
    }
    if (root == null && totalNodes > 0) {
      throw "Orphans";
    }

    if (root != null) {
      if (!nodes.hasOwnProperty(root)) {
        throw "Root node does not exists";
      }

      node = nodes[root];
      if (node.parent != null) {
        throw "Root node has parent reference";
      }

      var children = [root];
      var processed = {};
      var totalChildren = 0;
      while (children.length > 0) {
        var newChildren = [];
        for (var index = 0, len = children.length; index < len; index += 1) {
          var child = nodes[children[index]];
          while (!processed.hasOwnProperty(child.key)) {
            processed[child.key] = true;
            totalChildren += 1;
            if (child.child != null) {
              newChildren.push(child.child);
            }
            child = nodes[child.right];
          }
        }
        children = newChildren;
      }

      if (totalNodes != totalChildren) {
        throw "Tree has loops or orpants";
      }
    }
  }

  /**
   * Adds a new item into the heap
   * @param {string} key A key of the new element 
   * @param {number} priority A priority of the new element
   * @param {object} item A context object of the new element 
   */
  function add(key, priority, item) {
    if (nodes.hasOwnProperty(key)) {
      throw "Duplicate keys are not supported!";
    }

    var newNode = new Node(key, priority, item);
    nodes[key] = newNode;

    if (root == null) {
      newNode.left = key;
      newNode.right = key;
      root = key;
    } else {
      var rootNode = nodes[root];
      _insert(rootNode, newNode);
      if (isMaximum ? rootNode.priority < newNode.priority : rootNode.priority > newNode.priority) {
        root = key;
      }
    }
    count += 1;
  }

  function _insert(node, newNode) {
    var rightNode = nodes[node.right];
    newNode.right = node.right;
    newNode.left = node.key;
    node.right = newNode.key;
    rightNode.left = newNode.key;
  }

  function _exclude(node) {
    var prevNode = nodes[node.left],
      nextNode = nodes[node.right];

    prevNode.right = nextNode.key;
    nextNode.left = prevNode.key;
    node.right = node.key;
    node.left = node.key;
  }

  /**
   * Gets priority of element by key
   * @param {string} key The element key
   * @returns {number} Returns priority of the element
   */
  function getPriority(key) {
    var result = null;
    if (nodes.hasOwnProperty(key)) {
      result = nodes[key].priority;
    }
    return result;
  }

  /**
   * Returns heap root element
   * 
   * @returns {HeapResult} Returns root element of the heap 
   */
  function heapRoot() {
    var result = null;
    if (root != null) {
      result = new HeapResult(nodes[root]);
    }
    return result;
  }

  /**
   * Returns heap root element with removal
   * 
   * @returns {HeapResult} Returns root element of the heap 
   */
  function extractRoot() {
    var result = heapRoot();
    if (result != null) {
      var rootNode = nodes[root],
        nextNode = nodes[rootNode.right];

      if (rootNode.child != null) {
        var childNode = nodes[rootNode.child],
          childNodeLeft = nodes[childNode.left];

        rootNode.right = childNode.key;
        nextNode.left = childNodeLeft.key;
        childNode.left = rootNode.key;
        childNodeLeft.right = nextNode.key;

        _exclude(rootNode);
        delete nodes[rootNode.key];

        root = null;
        _consolidate(childNode.key);
      } else {
        _exclude(rootNode);
        delete nodes[rootNode.key];

        root = null;
        if (nextNode.key != rootNode.key) {
          _consolidate(nextNode.key);
        }
      }
      count -= 1;
    }
    return result;
  }

  function _consolidate(startKey) {
    var pairs = [], pairedNode,
      processed = {},
      key = startKey;
    while (!processed.hasOwnProperty(key)) {
      var node = nodes[key],
        nextKey = node.right;

      processed[key] = true;
      node.parent = null;

      while ((pairedNode = pairs[node.degree]) != null) {
        if (isMaximum ? node.priority > pairedNode.priority : node.priority < pairedNode.priority) {
          _union(node, pairedNode);
        } else {
          _union(pairedNode, node);
          node = pairedNode;
        }
        pairs[node.degree - 1] = null;
      }
      pairs[node.degree] = node;

      if (root == null || nodes[root] == null || (isMaximum ? nodes[root].priority <= node.priority : nodes[root].priority >= node.priority)) {
        root = node.key;
      }

      key = nextKey;
    }
  }

  function _union(node1, node2) {
    node1.degree += 1;
    _exclude(node2);
    var child = nodes[node1.child];
    if (child != null) {
      _insert(child, node2);
      if (isMaximum ? child.priority < node2.priority : child.priority > node2.priority) {
        node1.child = node2.key;
      }
    } else {
      node1.child = node2.key;
    }
    node2.parent = node1.key;
  }

  /**
   * Sets priority of an element by key
   * @param {string} key The key of the element 
   * @param {number} priority Priority
   */
  function setPriority(key, priority) {
    var node = nodes[key];
    if (isMaximum ? node.priority > priority : node.priority < priority) {
      throw "Priority increase is not supported";
    }
    node.priority = priority;

    if (node.parent != null) {
      var parentNode = nodes[node.parent];
      if (isMaximum ? parentNode.priority < node.priority : parentNode.priority > node.priority) {
        _cut(parentNode, node);
        _cascadeCut(parentNode);
      }
    }
    if (isMaximum ? nodes[root].priority < node.priority : nodes[root].priority > node.priority) {
      root = node.key;
    }
  }

  function _cut(parentNode, node) {
    node.marked = false;
    node.parent = null;
    if (node.right == node.key) {
      parentNode.child = null;
    } else {
      parentNode.child = node.right;
      _exclude(node);
    }
    parentNode.degree -= 1;
    _insert(nodes[root], node);
  }

  function _cascadeCut(node) {
    if (node.parent != null) {
      if (node.marked) {
        var parentNode = nodes[node.parent];
        _cut(parentNode, node);
        _cascadeCut(parentNode);
      } else {
        node.marked = true;
      }
    }
  }

  /**
   * Deletes heap element by key
   * @param {string} key The Key 
   */
  function deleteKey(key) {
    setPriority(key, isMaximum ? Infinity : -1);
    extractRoot();
  }

  return {
    add: add,
    getPriority: getPriority,
    setPriority: setPriority,
    heapRoot: heapRoot,
    extractRoot: extractRoot,
    deleteKey: deleteKey,
    validate: validate
  };
};