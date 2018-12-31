primitives.common.tree = function (source) {
	var _nodes = {},        // objects attached to nodes
		_parents = {},      // parent node id for every node id. Both of them should exists in the tree.
		_children = {},     // children node ids for every node id. All children and node itself should be in the tree.
		_roots = {},        // id of non existing parent. If parent does not exists in the tree this hash contains its id.
		_rootChildren = {}, // children of non existing parent. If parent id does not exists in the tree this collection contains it existing children.
		BREAK = 1,
		SKIP = 2;

	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_nodes = primitives.common.cloneObject(source.nodes, true);
			_parents = primitives.common.cloneObject(source.parents, true);
			_children = primitives.common.cloneObject(source.children, false);
			_roots = primitives.common.cloneObject(source.roots, false);
			_rootChildren = primitives.common.cloneObject(source.rootChildren, true);
		}
	}

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

	function loopLevels(thisArg, arg0, arg1) { // onItem(nodeid, node, levelid) if function returns true loop is continued on item's children 
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

	/* children first - parent last */
	function loopPostOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
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

	/* parent first - children next */
	function loopPreOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
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
					parentid =  _parents[nodeid];
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

	/* Euler Walk */
	function loopEulerWalk(thisArg, onItem) { // onItem(nodeid, node, level) if function returns true loop exits
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

	function zipUp(thisArg, firstNodeId, secondNodeid, onZip) { // onZip(firstNodeId, firstParentId, secondNodeid, secondParentId)
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

	function loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem) { // onItem(nodeid, node, index)
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

	function loopChildrenReversed(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
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

	function hasNodes() {
		return !primitives.common.isEmptyObject(_rootChildren);
	}

	function parentid(nodeid) {
		var result = null;

		if (_parents[nodeid] != null) {
			result = _parents[nodeid];
		}

		return result;
	}

	function parent(nodeid) {
		var result = null;

		if (_parents[nodeid] != null) {
			result = _nodes[_parents[nodeid]];
		}

		return result;
	}

	function hasChildren(nodeid) {
		return _children[nodeid] != null;
	}

	function countChildren(nodeid) {
		return _children[nodeid] != null ? _children[nodeid].length : 0;
	}

	function countSiblings(nodeid) {
		var parent = parentid(nodeid);
		return parent != null ? _children[parent].length : 0;
	}

	function indexOf(nodeid) {
		var parent = parentid(nodeid);
		return parent != null ? primitives.common.indexOf(_children[parent], nodeid) : null;
	}

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
			if(collection[index] == nodeid) {
				collection.splice(index, 1);
				return len - 1;
			}
		}
		return len;
	}

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

	function node(nodeid) {
		return _nodes[nodeid];
	}

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

	function clone() {
		return primitives.common.family({
			nodes: _nodes,
			parents: _parents,
			children: _children,
			roots: _roots,
			rootChildren: _rootChildren
		});
	}
	
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