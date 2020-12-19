import { isObject, cloneObject, isEmptyObject } from '../common'
/**
 * Creates tree structure
 * @class Tree
 * 
 * @param {Tree} source A source tree structure to clone properties from
 * @returns {Tree} Returns new tree structure
 */
export default function Tree(source) {
    var _nodes = {},        // objects attached to nodes
      _parents = {},      // parent node id for every node id. Both of them should exists in the tree.
      _children = {},     // children node ids for every node id. All children and node itself should be in the tree.
      _roots = {},        // id of non existing parent. If parent does not exists in the tree this hash contains its id.
      _rootChildren = {}, // children of non existing parent. If parent id does not exists in the tree this collection contains it existing children.
      /** @constant
        @type {number}
        @default
      */
      BREAK = 1,
      /** @constant
        @type {number}
        @default
      */
      SKIP = 2;
  
    _init(source);
  
    function _init(source) {
      if (isObject(source)) {
        _nodes = cloneObject(source.nodes, true);
        _parents = cloneObject(source.parents, true);
        _children = cloneObject(source.children, false);
        _roots = cloneObject(source.roots, false);
        _rootChildren = cloneObject(source.rootChildren, true);
      }
    }
  
    /**
     * Callback for iterating tree nodes
     * 
     * @callback onTreeItemCallback
     * @param {string} itemid The node id
     * @param {object} item The node
     * @returns {boolean} Returns true to break the loop
     */
  
    /**
     * Loops through nodes of tree structure
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {onTreeItemCallback} onItem Callback function to call for every tree node 
     */
    function loop(thisArg, onItem) {
      var item;
      if (onItem != null) {
        for (item in _nodes) {
          if (_nodes.hasOwnProperty(item)) {
            if (onItem.call(thisArg, item, _nodes[item])) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback for iterating the tree nodes level by level
     * 
     * @callback onTreeItemWithLevelCallback
     * @param {string} nodeid The node id
     * @param {object} node The node context object
     * @param {number} levelIndex The node level index
     * @returns {number} Returns BREAK to break the loop and exit. Returns SKIP to skip node's branch traversing.
     */
  
    /**
     * Loops through child nodes of the tree structure level by level
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} arg0 The node id to start children traversing
     * @param {onTreeItemWithLevelCallback} arg1 Callback function to call for every child node 
     */
    function loopLevels(thisArg, arg0, arg1) {
      var levelIndex = 0,
        items = [],
        itemid,
        onItem,
        newItems,
        key,
        index, len;
  
      switch (arguments.length) {
        case 2:
          onItem = arg0;
          break;
        case 3:
          itemid = arg0;
          onItem = arg1;
          break;
      }
  
      if (onItem != null) {
  
        if (itemid == null) {
          for (key in _rootChildren) {
            if (_rootChildren.hasOwnProperty(key)) {
              items = items.concat(_rootChildren[key]);
            }
          }
        } else {
          if (_children[itemid] != null) {
            items = items.concat(_children[itemid]);
          }
        }
  
        while (items.length > 0) {
          newItems = [];
  
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
              case BREAK:
                newItems = [];
                break;
              case SKIP:
                break;
              default:
                if (_children[itemid] != null) {
                  newItems = newItems.concat(_children[itemid]);
                }
                break;
            }
          }
  
          items = newItems;
          levelIndex += 1;
        }
      }
    }
  
    /**
     * Callback for iterating nodes and providing parent in parameters
     * 
     * @callback onTreeItemWithParentCallback
     * @param {string} nodeid The node id
     * @param {object} node The node context object
     * @param {string} parentid The parent node id
     * @param {object} parent The parent node context object
     * @returns {number} Returns BREAK to break the loop and exit. Returns SKIP to skip node's branch traversing.
     */
  
    /**
     * Traverse tree structure in post order.
     * Children first - parent last
     * @param {Object} thisArg The callback function invocation context
     * @param {onTreeItemWithParentCallback} onItem Callback function to call for every node 
     */
    function loopPostOrder(thisArg, onItem) {
      var stack = [], nodeid,
        key,
        index,
        prevParent,
        children;
  
      if (onItem != null) {
  
        for (key in _rootChildren) {
          if (_rootChildren.hasOwnProperty(key)) {
            stack = stack.concat(_rootChildren[key]);
          }
        }
  
        while (stack.length > 0) {
          nodeid = stack[stack.length - 1];
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
            }
          } else {
            stack.pop();
            prevParent = _parents[nodeid];
  
            if (onItem.call(thisArg, nodeid, _nodes[nodeid], prevParent, _nodes[prevParent])) {
              break;
            }
          }
        }
      }
    }
  
  
    /**
     * Traverse tree structure in pre order.
     * Parent first - children next
     * @param {Object} thisArg The callback function invocation context
     * @param {onTreeItemWithParentCallback} onItem A callback function to call for every node 
     */
    function loopPreOrder(thisArg, onItem) {
      var stack = [], nodeid,
        key,
        index,
        parentid,
        prevParent,
        children;
  
      if (onItem != null) {
  
        for (key in _rootChildren) {
          if (_rootChildren.hasOwnProperty(key)) {
            stack = stack.concat(_rootChildren[key]);
          }
        }
  
        while (stack.length > 0) {
          nodeid = stack[stack.length - 1];
          if (nodeid != prevParent) {
            parentid = _parents[nodeid];
            if (onItem.call(thisArg, nodeid, _nodes[nodeid], parentid, _nodes[parentid])) {
              break;
            }
          }
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
            }
          } else {
            stack.pop();
            prevParent = _parents[nodeid];
          }
        }
      }
    }
  
    /**
     * Callback for iterating nodes in euler walk order
     * 
     * @callback onItemEulerWalkCallback
     * @param {string} nodeid The node id
     * @param {object} node Context object of the node
     * @param {number} level The node's level
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops tree nodes in "Euler Walk" order
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {onItemEulerWalkCallback} onItem Callback function to call for every node 
     */
    function loopEulerWalk(thisArg, onItem) {
      var stack = [],
        nodeid,
        levels = [],
        level = 0,
        key,
        index, len,
        prevParent,
        children;
  
      if (onItem != null) {
  
        for (key in _rootChildren) {
          if (_rootChildren.hasOwnProperty(key)) {
            children = _rootChildren[key];
            for (index = 0, len = children.length; index < len; index += 1) {
              stack.push(children[index]);
              levels.push(0);
            }
          }
        }
        while (stack.length > 0) {
          index = stack.length - 1;
          nodeid = stack[index];
          level = levels[index];
  
          if (onItem.call(thisArg, nodeid, _nodes[nodeid], level)) {
            break;
          }
  
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
              levels.push(level + 1);
              if (index > 0) {
                stack.push(nodeid);
                levels.push(level);
              }
            }
          } else {
            stack.pop();
            levels.pop();
  
            prevParent = _parents[nodeid];
          }
        }
      }
    }
  
    /**
     * Callback function to return pairs of nodes
     * 
     * @callback onZipUpPairCallback
     * @param {string} firstNodeId First node id
     * @param {string} firstParentId Parent id of the first node
     * @param {string} secondNodeid Second node id
     * @param {string} secondParentId Parent id of the second node
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Iterates hierarchy nodes by pairs starting with given pair of start and second nodes and up to the root of the hierarchy.
     * Breaks iteration when callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} firstNodeId The first node to start iteration
     * @param {string} secondNodeid The second node to start iteration
     * @param {onZipUpPairCallback} onZip Callback function to call for every pair of nodes on the way up in the tree structure
     */
    function zipUp(thisArg, firstNodeId, secondNodeid, onZip) {
      var firstParentId,
        secondParentId;
  
      if (onZip != null) {
        while (firstNodeId != null && secondNodeid != null && firstNodeId != secondNodeid) {
          firstParentId = _parents[firstNodeId];
          secondParentId = _parents[secondNodeid];
          if (onZip.call(thisArg, firstNodeId, firstParentId, secondNodeid, secondParentId)) {
            break;
          }
          firstNodeId = firstParentId;
          secondNodeid = secondParentId;
        }
      }
    }
  
    /**
     * Loops parents up to the root of the hierarchy starting with the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The node id to start iteration from
     * @param {onTreeItemCallback} onItem Callback function to call for every parent node
     * @param {boolean} includingStartItem If true the first call to callback function is made with start node id
     */
    function loopParents(thisArg, nodeid, onItem, includingStartItem) { // onItem(nodeid, node)
      var parentid = nodeid;
      if (_nodes[parentid] != null) {
        if (onItem != null) {
          if (includingStartItem === true) {
            if (onItem.call(thisArg, parentid, _nodes[parentid])) {
              return;
            }
          }
          while ((parentid = _parents[parentid]) != null) {
            if (onItem.call(thisArg, parentid, _nodes[parentid])) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback function to loop through children of the given node
     * 
     * @callback onTreeChildItemCallback
     * @param {string} nodeid Child node id
     * @param {object} node Context object of the child node
     * @param {number} index Index of the child node
     * @param {number} lastIndex Index of the last child
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops immediate children of the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {onTreeChildItemCallback} onItem Callback function to call for every child node
     */
    function loopChildren(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
      var items,
        itemid,
        index, len;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        if (items != null) {
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback function to loop through range of children for the given node
     * 
     * @callback onTreeNodeWithIndexItemCallback
     * @param {string} nodeid Child node id
     * @param {object} node Context object of the child node
     * @param {number} index Index of the child node
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops range of immediate children of the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {number} fromIndex Start index of iteration
     * @param {number} toIndex End index of iteration
     * @param {onTreeNodeWithIndexItemCallback} onItem Callback function to call for every child node
     */
    function loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem) {
      var items,
        itemid,
        index, len;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        if (items != null) {
          if (fromIndex < toIndex) {
            fromIndex = Math.max(fromIndex, 0);
            toIndex = Math.min(toIndex, items.length - 1);
            for (index = fromIndex; index <= toIndex; index += 1) {
              itemid = items[index];
              if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                break;
              }
            }
          } else {
            fromIndex = Math.min(fromIndex, items.length - 1);
            toIndex = Math.max(0, toIndex);
            for (index = fromIndex; index >= toIndex; index -= 1) {
              itemid = items[index];
              if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                break;
              }
            }
          }
        }
      }
    }
  
    /**
     * Loops immediate children of the given node in reversed order.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {onTreeChildItemCallback} onItem Callback function to call for every child node
     */
    function loopChildrenReversed(thisArg, nodeid, onItem) {
      var items,
        itemid,
        index, lastIndex;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        lastIndex = items.length - 1;
        if (items != null) {
          for (index = lastIndex; index >= 0; index -= 1) {
            itemid = items[index];
            if (onItem.call(thisArg, itemid, _nodes[itemid], index, lastIndex)) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Orders children of the given node
     * 
     * @param {string} nodeid The node id of the parent node which children should be ordered in the tree structure
     * @param {string[]} children Collection of ordered children
     */
    function arrangeChildren(nodeid, children) {
      var childid,
        index, len;
  
      children = children.slice(0);
      if (_nodes[nodeid] != null) {
        if (_children[nodeid] != null) {
          if (_children[nodeid].length == children.length) {
            for (index = 0, len = children.length; index < len; index += 1) {
              childid = children[index];
              if (_parents[childid] != nodeid) {
                throw "Child " + childid + " does not belong to given node!";
              }
            }
            _children[nodeid] = children;
          } else {
            throw "Collections of children don't match each other!";
          }
        } else {
          if (children.length > 0) {
            throw "Collections of children don't match each other!";
          }
        }
      }
    }
  
    /**
     * Adds new tree item
     * @param {string} parentid Parent id
     * @param {string} nodeid New node id
     * @param {object} node Context object of the new node
     * @param {number} position Position of the new node in the collection of children
     */
    function add(parentid, nodeid, node, position) {
      var index, len, children, childid;
  
      if (_nodes[nodeid] != null) {
        throw "Node already exists";
      }
  
      if (nodeid != null && node != null && _nodes[nodeid] == null) {
  
        if (_nodes[parentid] != null) {
          _parents[nodeid] = parentid;
  
          // existing parent
          if (_children[parentid] != null) {
            if (position == null) {
              _children[parentid].push(nodeid);
            } else {
              _children[parentid].splice(position, 0, nodeid);
            }
          } else {
            _children[parentid] = [nodeid];
          }
        } else {
          _roots[nodeid] = parentid;
  
          // missing parent
          if (_rootChildren[parentid] != null) {
            if (position == null) {
              _rootChildren[parentid].push(nodeid);
            } else {
              _rootChildren[parentid].splice(position, 0, nodeid);
            }
          } else {
            _rootChildren[parentid] = [nodeid];
          }
        }
  
        _nodes[nodeid] = node;
  
        if (_rootChildren[nodeid] != null) {
          _children[nodeid] = _rootChildren[nodeid];
          delete _rootChildren[nodeid];
  
          children = _children[nodeid];
          for (index = 0, len = children.length; index < len; index += 1) {
            childid = children[index];
  
            delete _roots[childid];
  
            _parents[childid] = nodeid;
          }
  
        }
  
      }
    }
  
    /**
     * Inserts bundle node into the tree structure. The new bundle node becomes only child node of the parent node.
     * All immediate children of the parent node become children of the inserted bundle node.
     * 
     * @param {string} nodeid Parent node id
     * @param {string} bundleid New bundle node id
     * @param {object} bundle Context object of the bundle node
     */
    function insert(nodeid, bundleid, bundle) {
      if (_nodes[nodeid] != null && bundleid != null && _nodes[bundleid] == null && bundle != null) {
  
        _nodes[bundleid] = bundle;
  
        if (_children[nodeid] != null) {
          _children[bundleid] = _children[nodeid];
        }
        _children[nodeid] = [bundleid];
  
        loopChildren(this, bundleid, function (childid, node, index) {
          _parents[childid] = bundleid;
        });
        _parents[bundleid] = nodeid;
      }
    }
  
    /**
     * Moves children form one node to another.
     * 
     * @param {string} fromNodeid Source node node id
     * @param {string} toNodeId Destination node id
     */
    function moveChildren(fromNodeid, toNodeId) {
      if (_nodes[fromNodeid] != null && _nodes[toNodeId] != null && fromNodeid != toNodeId) {
  
        if (_children[fromNodeid] != null) {
  
          loopChildren(this, fromNodeid, function (childid, node, index) {
            _parents[childid] = toNodeId;
          });
  
          if (_children[toNodeId] != null) {
            _children[toNodeId] = _children[toNodeId].concat(_children[fromNodeid]);
          } else {
            _children[toNodeId] = _children[fromNodeid];
          }
          delete _children[fromNodeid];
        }
      }
    }
  
    /**
     * Return true if structure has nodes
     * 
     * @returns {boolean} Returns true if structure has nodes
     */
    function hasNodes() {
      return !isEmptyObject(_rootChildren);
    }
  
    /**
     * Returns parent node id
     * 
     * @param {string} nodeid Node id
     * @returns {string} Returns parent node id
     */
    function parentid(nodeid) {
      var result = null;
  
      if (_parents[nodeid] != null) {
        result = _parents[nodeid];
      }
  
      return result;
    }
  
    /**
     * Returns context object of the parent node
     * 
     * @param {string} nodeid Node id
     * @returns {object} Returns context object of the  parent node
     */
    function parent(nodeid) {
      var result = null;
  
      if (_parents[nodeid] != null) {
        result = _nodes[_parents[nodeid]];
      }
  
      return result;
    }
  
    /**
     * Returns true if node has children
     * 
     * @param {string} nodeid Node id
     * @returns {boolean} Returns true if node has children
     */
    function hasChildren(nodeid) {
      return _children[nodeid] != null;
    }
  
    /**
     * Returns number of children
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns number of child nodes
     */
    function countChildren(nodeid) {
      return _children[nodeid] != null ? _children[nodeid].length : 0;
    }
  
    /**
     * Returns number of siblings
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns number of siblings
     */
    function countSiblings(nodeid) {
      var parent = parentid(nodeid);
      return parent != null ? _children[parent].length : 0;
    }
  
    /**
     * Returns index of the node in the children's collection
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns node index
     */
    function indexOf(nodeid) {
      var parent = parentid(nodeid);
      return parent != null ? _children[parent].findIndex( itemid => itemid === nodeid) : null;
    }
  
    /**
     * Returns child node by index in the children's collection
     * 
     * @param {string} nodeid Node id
     * @param {number} index Child index
     * @returns {object} Returns child node
     */
    function getChild(parentid, index) {
      var result = null,
        children;
      if ((children = _children[parentid]) != null) {
        result = _nodes[children[index]];
      }
      return result;
    }
  
    function _splice(collection, nodeid) {
      var index, len = collection.length;
      for (index = 0; index < len; index += 1) {
        if (collection[index] == nodeid) {
          collection.splice(index, 1);
          return len - 1;
        }
      }
      return len;
    }
  
    /**
     * Adds existing node to the children of the parent node
     * 
     * @param {string} parentid Parent Node id
     * @param {string} nodeid Node id
     */
    function adopt(parentid, nodeid) {
      if (_nodes[parentid] != null && _nodes[nodeid] != null) {
        if (parentid != nodeid) {
          if (_roots.hasOwnProperty(nodeid)) {
            if (!_splice(_rootChildren[_roots[nodeid]], nodeid)) {
              delete _rootChildren[_roots[nodeid]];
            }
            delete _roots[nodeid];
          }
  
          if (_parents.hasOwnProperty(nodeid)) {
            if (!_splice(_children[_parents[nodeid]], nodeid)) {
              delete _children[_parents[nodeid]];
            }
          }
  
          _parents[nodeid] = parentid;
          if (_children[parentid] != null) {
            _children[parentid].push(nodeid);
          } else {
            _children[parentid] = [nodeid];
          }
        }
        else {
          throw "Item cannot be parent of itself!";
        }
      } else {
        throw "Both parent and child should be in hierarchy!";
      }
    }
  
    /**
     * Returns context object
     * @param {string} nodeid Node id
     * @returns {object} Context object of the node
     */
    function node(nodeid) {
      return _nodes[nodeid];
    }
  
    /**
     * Validates internal data integrity of the structure
     * 
     * @returns {boolean} Returns true if structure pass validation
     */
    function validate() {
      var result = true,
        key;
  
      for (key in _roots) {
        if (_roots.hasOwnProperty(key)) {
          if (_roots[key] != null) {
            result = false;
            break;
          }
        }
      }
  
      return result;
    }
  
    /**
     * Clones tree structure
     * 
     * @returns {tree} Returns clone of the tree
     */
    function clone() {
      return Tree({
        nodes: _nodes,
        parents: _parents,
        children: _children,
        roots: _roots,
        rootChildren: _rootChildren
      });
    }
  
  
    /**
     * Callback for iterating tree node neighbours level by level
     * 
     * @callback onTreeItemNeighbourCallback
     * @param {string} itemid The node id
     * @param {object} item The node
     * @param {number} distance The neigbour node distance from the start node
     * @returns {number} Returns true to skip further neighbous traversing.
     */
  
    /**
     * Loops through the node neighbours of the tree structure level by level
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} itemid The node id to start traversing neighbour nodes
     * @param {number} distance Stop iteration of neighbours when distance exceeds the given value
     * @param {onTreeItemNeighbourCallback} onItem A callback function to call for every neighbour node 
     */
    function loopNeighbours(thisArg, itemid, distance, onItem) {
      var processed = {},
        margin = [itemid],
        newMargin,
        currentDistance = 0;
  
      if (onItem != null) {
        if (_nodes.hasOwnProperty(itemid)) {
          processed[itemid] = true;
          while (margin.length > 0) {
            newMargin = [];
            for (var index = 0, len = margin.length; index < len; index += 1) {
              var marginid = margin[index];
              if (currentDistance > 0) {
                if (onItem.call(thisArg, marginid, _nodes[marginid], currentDistance)) {
                  return;
                }
              }
              if (currentDistance < distance) {
                _loopNeighbours(this, marginid, function (neighbourid, neighbour) {
                  if (!processed.hasOwnProperty(neighbourid)) {
                    newMargin.push(neighbourid);
                    processed[neighbourid] = true;
                  }
                });
              }
            }
            margin = newMargin;
            currentDistance += 1;
          }
        }
      }
    }
  
    function _loopNeighbours(thisArg, itemid, onItem) {
      if (onItem != null) {
        if (_nodes.hasOwnProperty(itemid)) {
          /* loop parent */
          var parentItemId = parentid(itemid);
          if (parentItemId != null) {
            if (onItem.call(thisArg, parentItemId, _nodes[parentItemId])) {
              return;
            }
          }
          /* loop siblings */
          loopChildren(thisArg, parentItemId, function (childItemId, childItem) {
            if (childItemId != itemid) {
              if (onItem.call(thisArg, childItemId, childItem)) {
                return;
              }
            }
          });
          /* loop actual children */
          loopChildren(thisArg, itemid, function (childItemId, childItem) {
            if (onItem.call(thisArg, childItemId, childItem)) {
              return;
            }
          });
        }
      }
    }
  
    return {
      loop: loop,
      loopLevels: loopLevels,
      loopParents: loopParents,
      loopChildren: loopChildren,
      loopChildrenRange: loopChildrenRange,
      loopChildrenReversed: loopChildrenReversed,
      loopPostOrder: loopPostOrder, /* children first - parent last */
      loopPreOrder: loopPreOrder, /* parent first - children next */
      loopEulerWalk: loopEulerWalk, /* pre order loop with every parent revisited for every child */
      loopNeighbours: loopNeighbours, /* loop items by distance. Siblings are as far as parent and children */
      zipUp: zipUp,
      parentid: parentid,
      parent: parent,
      adopt: adopt,
      moveChildren: moveChildren,
      node: node,
      add: add,
      insert: insert,
      hasNodes: hasNodes,
      hasChildren: hasChildren,
      countChildren: countChildren,
      countSiblings: countSiblings,
      indexOf: indexOf,
      getChild: getChild,
      arrangeChildren: arrangeChildren,
  
      /* force validation */
      validate: validate,
      clone: clone,
  
      // callback return codes
      BREAK: BREAK, // break loop immidiatly
      SKIP: SKIP // skip loop of current node children 
    };
  };