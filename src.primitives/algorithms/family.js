primitives.common.family = function (source) {
	var _roots = {},     // children hash of orphant parent id
		_rootsCount = {},
		_children = {},  // children hash by node id
		_childrenCount = {},
		_parents = {},   // parents hash by node id
		_parentsCount = {},
		_nodes = {},     // nodes by node id
		BREAK = 1,
		SKIP = 2;
	
	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_roots = primitives.common.cloneObject(source.roots, false);
			_rootsCount = primitives.common.cloneObject(source.rootsCount, true);
			_children = primitives.common.cloneObject(source.children, false);
			_childrenCount = primitives.common.cloneObject(source.childrenCount, true);
			_parents = primitives.common.cloneObject(source.parents, false);
			_parentsCount = primitives.common.cloneObject(source.parentsCount, true);
			_nodes = primitives.common.cloneObject(source.nodes, true);
		}
	}

	function _loop(thisArg, collection, itemid, onItem) {
		var item, items;
		if (onItem != null) {
			items = collection[itemid];
			if (items != null) {
				for (item in items) {
					if (items.hasOwnProperty(item)) {
						if (onItem.call(thisArg, item, items[item])) {
							break;
						}
					}
				}
			}
		}
	}

	function add(parents, nodeid, node) {
		var index, len,
			parentid,
			processed = {};

		if (!parents || parents.length === 0) {
			parents = [null];
		}

		if (_nodes[nodeid] == null && node != null) {
			_nodes[nodeid] = node;
			for (index = 0, len = parents.length; index < len; index += 1) {
				parentid = parents[index];


				if (processed[parentid] == null && parentid != nodeid) {
					processed[parentid] = true;
					if (_nodes[parentid] != null) {
						if (_parents[nodeid] == null) {
							_parents[nodeid] = {};
							_parentsCount[nodeid] = 0;
						}
						if (!_parents[nodeid][parentid]) {
							_parents[nodeid][parentid] = true;
							_parentsCount[nodeid] += 1;
						}

						if (_children[parentid] == null) {
							_children[parentid] = {};
							_childrenCount[parentid] = 0;
						}
						if (!_children[parentid][nodeid]) {
							_children[parentid][nodeid] = true;
							_childrenCount[parentid] += 1;
						}
					} else {
						if (_roots[parentid] == null) {
							_roots[parentid] = {};
							_rootsCount[parentid] = 0;
						}
						if (!_roots[parentid][nodeid]) {
							_roots[parentid][nodeid] = true;
							_rootsCount[parentid] += 1;
						}
					}
				}
			}
			if (_roots[nodeid] != null) {
				_children[nodeid] = _roots[nodeid];
				_childrenCount[nodeid] = _rootsCount[nodeid];
				delete _roots[nodeid];
				delete _rootsCount[nodeid];
				_loop(this, _children, nodeid, function (itemid) {
					if (_parents[itemid] == null) {
						_parents[itemid] = {};
						_parentsCount[itemid] = 0;
					}
					if (!_parents[itemid][nodeid]) {
						_parents[itemid][nodeid] = true;
						_parentsCount[itemid] += 1;
					}
				});
			}
		}
	}

	function node(nodeid) {
		return _nodes[nodeid];
	}

	function adopt(parents, nodeid) {
		var index, len,
			parentid;
		if (_nodes[nodeid] != null) {
			for (index = 0, len = parents.length; index < len; index += 1) {
				parentid = parents[index];

				if (_parents[nodeid] == null) {
					_parents[nodeid] = {};
					_parentsCount[nodeid] = 0;
				}

				if (parentid != nodeid && _nodes[parentid] != null) {
					if (!_parents[nodeid][parentid]) {
						_parents[nodeid][parentid] = true;
						_parentsCount[nodeid] += 1;
					}

					if (_children[parentid] == null) {
						_children[parentid] = {};
						_childrenCount[parentid] = 0;
					}
					if (!_children[parentid][nodeid]) {
						_children[parentid][nodeid] = true;
						_childrenCount[parentid] += 1;
					}
				} else {
					throw "Item cannot be parent of itself and parent should exist in the structure!";
				}
			}
		} else {
			throw "Child should be in hierarchy!";
		}
	}

	function removeNode(nodeid) {
		if (_nodes[nodeid] != null) {
			_loop(this, _children, nodeid, function (itemid) {
				delete _parents[itemid][nodeid];
				_parentsCount[itemid] -= 1;

				if (!_parentsCount[itemid]) {
					delete _parents[itemid];
					delete _parentsCount[itemid];

					if (_roots[null] == null) {
						_roots[null] = {};
						_rootsCount[null] = 0;
					}
					if (!_roots[null][itemid]) {
						_roots[null][itemid] = true;
						_rootsCount[null] += 1;
					}
				}
			});
			_loop(this, _parents, nodeid, function (itemid) {
				delete _children[itemid][nodeid];
				_childrenCount[itemid] -= 1;
				if (!_childrenCount[itemid]) {
					delete _children[itemid];
					delete _childrenCount[itemid];
				}
			});
			if (_roots[null] != null && _roots[null][nodeid] != null) {
				delete _roots[null][nodeid];
				_rootsCount[null] -= 1;

				if (!_rootsCount[null]) {
					delete _roots[null];
					delete _rootsCount[null];
				}
			}
			delete _children[nodeid];
			delete _childrenCount[nodeid];
			delete _parents[nodeid];
			delete _parentsCount[nodeid];
			delete _nodes[nodeid];
		}
	}

	function _removeChildReference(parentid, childid) {
		var result = false;
		if (_children[parentid] != null && _children[parentid][childid] != null) {
			delete _children[parentid][childid];
			_childrenCount[parentid] -= 1;

			delete _parents[childid][parentid];
			_parentsCount[childid] -= 1;

			if (!_childrenCount[parentid]) {
				delete _children[parentid];
				delete _childrenCount[parentid];
			}

			if (!_parents[childid]) {
				delete _parents[childid];
				delete _parentsCount[childid];

				if (_roots[null] == null) {
					_roots[null] = {};
					_rootsCount[null] = 0;
				}
				_roots[null][childid] = true;
				_rootsCount[null] += 1;
			}
			result = true;
		}
		return result;
	}

	function removeRelation(fromid, toid) {
		var result = false;
		if (_nodes[fromid] != null && _nodes[toid] != null) {
			result = _removeChildReference(fromid, toid) || _removeChildReference(toid, fromid);
		}
		return result;
	}

	function hasNodes() {
		return !primitives.common.isEmptyObject(_nodes);
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

	function _loopItems(thisArg, collection, items, onItem) { // onItem(itemid, item, levelIndex)
		var newItems, itemid,
			processed = {},
			levelIndex = 0,
			hasItems = true;


		while (hasItems) {
			newItems = {};
			hasItems = false;

			for (itemid in items) {
				if (items.hasOwnProperty(itemid)) {
					if (!processed[itemid]) {
						processed[itemid] = true;

						switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
							case 1/*BREAK*/:
								newItems = {};
								hasItems = false;
								break;
							case 2/*SKIP*/:
								break;
							default:
								_loop(this, collection, itemid, function (newItemId) {
									if (!processed[newItemId]) {
										newItems[newItemId] = true;
										hasItems = true;
									}
								}); //ignore jslint
								break;
						}
					}
				}
			}
			items = newItems;
			levelIndex += 1;
		}
	}

	function loopChildren(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
		if (onItem != null) {
			if (nodeid != null && _nodes[nodeid] != null && _children[nodeid] != null) {
				_loopItems(thisArg, _children, _children[nodeid], onItem);
			}
		}
	}

	function loopParents(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
		if (onItem != null) {
			if (nodeid != null && _nodes[nodeid] != null && _parents[nodeid] != null) {
				_loopItems(thisArg, _parents, _parents[nodeid], onItem);
			}
		}
	}

	function _loopTopo(thisArg, backwardCol, backwardCount, forwardCol, forwardCount, onItem) { // onItem(itemid, item, position)
		var index, len, nodeid, references,
			queue, newQueue, position;

		if (onItem != null) {
			/* count parents for every node */
			queue = [];
			references = {};
			for (nodeid in _nodes) {
				if (_nodes.hasOwnProperty(nodeid)) {
					references[nodeid] = (backwardCount[nodeid] || 0);

					if (!references[nodeid]) {
						queue.push(nodeid);
					}
				}
			}

			/* itterate queue and reduce reference counts via children */
			position = 0;
			while (queue.length > 0) {
				newQueue = [];

				for (index = 0, len = queue.length; index < len; index += 1) {
					nodeid = queue[index];

					if (onItem.call(thisArg, nodeid, _nodes[nodeid], position)) {
						newQueue = [];
						break;
					}

					position += 1;

					_loop(this, forwardCol, nodeid, function (itemid) {
						references[itemid] -= 1;
						if (references[itemid] === 0) {
							newQueue.push(itemid);
						}
					}); //ignore jslint
				}
				queue = newQueue;
			}
		}
	}

	function loopTopo(thisArg, onItem) { // onItem(itemid, item, position)
		_loopTopo(thisArg, _parents, _parentsCount, _children, _childrenCount, onItem);
	}

	function loopTopoReversed(thisArg, onItem) { // onItem(itemid, item, position)
		_loopTopo(thisArg, _children, _childrenCount, _parents, _parentsCount, onItem);
	}


	/* argument parentAligned set to true alignes nodes to top otherwise to bottom */
	function loopLevels(thisArg, parentAligned, onItem) { // onItem(itemid, item, levelIndex)
		var topoSorted = [],
			topoSortedPositions = {},
			processed = {},
			margin = [],
			/* result items distribution by levels */
			levels = {}, levelIndex,
			groups = {}, hasGroups, newGroups, groupIndex, group,
			itemsAtLevel, itemid,
			minimumLevel = null,
			loopFunc = parentAligned ? loopTopo : loopTopoReversed,
			index, len,
			mIndex, mLen, mItem, mLevel,
			topoSortedItem,
			bestPosition, bestItem, bestLevel, bestIsParent,
			newMargin, hasNeighbours;

		function Group() {
			this.items = {};
			this.minimumLevel = null;
		}

		Group.prototype.addItemToLevel = function (itemid, level) {
			var items = this.items[level];
			if (!items) {
				items = [itemid];
				this.items[level] = items;
			} else {
				items.push(itemid);
			}
			this.minimumLevel = this.minimumLevel == null ? level : Math.min(this.minimumLevel, level);
		};

		function addItemToLevel(itemid, index, level) {
			var group = groups[index];
			if (!group) {
				group = new Group();
				groups[index] = group;
			}

			group.addItemToLevel(itemid, level);

			minimumLevel = minimumLevel == null ? level : Math.min(minimumLevel, level);

			levels[itemid] = level;
			processed[itemid] = true;
		}


		if (onItem != null) {
			/* sort items topologically */
			loopFunc(this, function (itemid, item, position) {
				topoSorted.push(itemid);
				topoSortedPositions[itemid] = position;
			});

			/* search for the first available non processed item in topological order */
			for (index = 0, len = topoSorted.length; index < len; index += 1) {
				topoSortedItem = topoSorted[index];
				if (processed[topoSortedItem] == null) {
					margin.push(topoSortedItem);

					addItemToLevel(topoSortedItem, index, 0);

					/* use regular graph breadth first search */
					while (margin.length > 0) {
						bestPosition = null;
						bestItem = null;
						bestLevel = null;
						bestIsParent = !parentAligned;
						newMargin = [];
						for (mIndex = 0, mLen = margin.length; mIndex < mLen; mIndex += 1) {
							mItem = margin[mIndex];
							mLevel = levels[mItem];
							hasNeighbours = false;

							if (parentAligned) {
								_loop(this, _parents, mItem, function (parentid) {
									var topoSortedPosition;
									if (!processed[parentid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[parentid];
										if (bestPosition == null || !bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)) {
											bestPosition = topoSortedPosition;
											bestItem = parentid;
											bestLevel = mLevel - 1;
											bestIsParent = true;
										}
									}
								}); //ignore jslint
								_loop(this, _children, mItem, function (childid) {
									var topoSortedPosition;
									if (!processed[childid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[childid];
										if (bestPosition == null || (!bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)))) {
											bestPosition = topoSortedPosition;
											bestItem = childid;
											bestLevel = mLevel + 1;
											bestIsParent = false;
										}
									}
								}); //ignore jslint
							} else {
								_loop(this, _children, mItem, function (childid) {
									var topoSortedPosition;
									if (!processed[childid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[childid];
										if (bestPosition == null || bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)) {
											bestPosition = topoSortedPosition;
											bestItem = childid;
											bestLevel = mLevel + 1;
											bestIsParent = false;
										}
									}
								}); //ignore jslint
								_loop(this, _parents, mItem, function (parentid) {
									var topoSortedPosition;
									if (!processed[parentid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[parentid];
										if (bestPosition == null || (bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)))) {
											bestPosition = topoSortedPosition;
											bestItem = parentid;
											bestLevel = mLevel - 1;
											bestIsParent = true;
										}
									}
								}); //ignore jslint
							}
							if (hasNeighbours) {
								newMargin.push(mItem);
							}
						}
						if (bestItem != null) {
							newMargin.push(bestItem);

							addItemToLevel(bestItem, index, bestLevel);
						}
						margin = newMargin;
					}
				}
			}

			hasGroups = true;
			levelIndex = minimumLevel;
			while (hasGroups) {
				newGroups = {};
				hasGroups = false;
				for (groupIndex in groups) {
					if (groups.hasOwnProperty(groupIndex)) {
						group = groups[groupIndex];
						itemsAtLevel = group.items[(group.minimumLevel - minimumLevel) + levelIndex];
						if (itemsAtLevel != null) {
							newGroups[groupIndex] = group;
							hasGroups = true;

							for (index = 0, len = itemsAtLevel.length; index < len; index += 1) {
								itemid = itemsAtLevel[index];
								if (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex - minimumLevel)) {
									hasGroups = false;
									return true;
								}
							}
						}
					}
				}
				groups = newGroups;
				levelIndex += 1;
			}
		}
	}

	function loopRoots(thisArg, onItem) { // onItem(itemid, item)
		var result = null,
			minimum, counter = 0,
			famMembers = {},
			famCount = {},
			isRoot,
			roots = {},
			processed = {},
			famItemId, member, members, rootid,
			membersRoots, memberRoots, memberRoot,
			index, len;

		loopTopoReversed(this, function (famItemId, famItem, position) {
			/* every node has at least itself in members */
			if (!famMembers.hasOwnProperty(famItemId)) {
				famMembers[famItemId] = {};
				famCount[famItemId] = 0;
			}
			famMembers[famItemId][famItemId] = true;
			famCount[famItemId] += 1;

			isRoot = true;
			loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
				var items, itemid;
				isRoot = false;
				if (!famMembers.hasOwnProperty(parentid)) {
					famMembers[parentid] = {};
					famCount[parentid] = 0;
				}
				/* push famItem members to parent members collection */
				if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
					famMembers[parentid] = famMembers[famItemId];
					famCount[parentid] = famCount[famItemId];
				} else {
					items = famMembers[famItemId];
					for (itemid in items) {
						if (items.hasOwnProperty(itemid)) {
							if (!famMembers[parentid][itemid]) {
								famMembers[parentid][itemid] = true;
								famCount[parentid] += 1;
							}
						}
					}
				}
				return SKIP;
			});
			if (isRoot) {
				roots[famItemId] = true;
				counter += 1;


			}
		});

		/* create collection of roots per member */
		membersRoots = {};
		for (rootid in roots) {
			if (roots.hasOwnProperty(rootid)) {
				members = famMembers[rootid];

				for (member in members) {
					if (members.hasOwnProperty(member)) {

						if (!membersRoots[member]) {
							membersRoots[member] = [];
						}
						membersRoots[member].push(rootid.toString());
					}
				}
			}
		}

		/* loop minimal sub tree roots */
		while (counter > 0) {
			minimum = null;
			for (famItemId in roots) {
				if (roots.hasOwnProperty(famItemId)) {
					if (!minimum || famCount[famItemId] < minimum) {
						minimum = famCount[famItemId];
						result = famItemId;
					}
				}
			}
			if (result != null) {
				if (onItem != null) {
					onItem.call(thisArg, result, _nodes[result]);
				}
				members = famMembers[result];

				for (member in members) {
					if (members.hasOwnProperty(member)) {
						if (!processed[member]) {
							memberRoots = membersRoots[member];
							for (index = 0, len = memberRoots.length; index < len; index += 1) {
								memberRoot = memberRoots[index];
								famCount[memberRoot] -= 1;
							}
							processed[member] = true;
						}
					}
				}

				delete roots[result];
				counter -= 1;
			}
		}
	}

	function findLargestRoot() {
		var result = null,
			maximum,
			famMembers = {},
			famCount = {},
			isRoot;

		maximum = null;

		loopTopoReversed(this, function (famItemId, famItem, position) {
			/* every node has at least itself in members */
			if (!famMembers.hasOwnProperty(famItemId)) {
				famMembers[famItemId] = {};
				famCount[famItemId] = 0;
			}
			famMembers[famItemId][famItemId] = true;
			famCount[famItemId] += 1;

			isRoot = true;
			loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
				var items, itemid;
				isRoot = false;
				if (!famMembers.hasOwnProperty(parentid)) {
					famMembers[parentid] = {};
					famCount[parentid] = 0;
				}
				/* push famItem members to parent members collection */
				if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
					famMembers[parentid] = famMembers[famItemId];
					famCount[parentid] = famCount[famItemId];
				} else {
					items = famMembers[famItemId];
					for (itemid in items) {
						if (items.hasOwnProperty(itemid)) {
							famMembers[parentid][itemid] = true;
							famCount[parentid] += 1;
						}
					}
				}
				return SKIP;
			});
			if (isRoot && (!maximum || famCount[famItemId] > maximum)) {
				maximum = famCount[famItemId];
				result = famItemId;
			}

		});

		return result;
	}

	/* common child should belong only to the given collection of parents, */
	/* if child's parents don't match given parents, it is not considered as common child */
	function hasCommonChild(parents) {
		var result = false,
			parentsHash, childrenHash,
			parentsCount,
			pIndex, pLen,
			parent, child;

		/* convert parents collection to hash, remove duplicates and ignore non-existing items */
		parentsHash = {};
		parentsCount = 0;
		for (pIndex = 0, pLen = parents.length; pIndex < pLen; pIndex += 1) {
			parent = parents[pIndex];
			if (_nodes[parent] != null && !parentsHash[parent]) {
				parentsHash[parent] = true;
				parentsCount += 1;
			}
		}

		/* collect number of parents referencing each child */
		childrenHash = {};
		for (parent in parentsHash) {
			if (parentsHash.hasOwnProperty(parent)) {
				_loop(this, _children, parent, function (child) {
					if (!childrenHash[child]) {
						childrenHash[child] = 1;
					} else {
						childrenHash[child] += 1;
					}
				}); //ignore jslint
			}
		}

		/* find common child having number of references equal to number of existing parents */
		for (child in childrenHash) {
			if (childrenHash.hasOwnProperty(child)) {
				if (_parents[child] != null && (_parentsCount[child] || 0) == childrenHash[child] && childrenHash[child] == parentsCount) {
					result = true;
					break;
				}
			}
		}

		return result;
	}

	function _bundleNodes(fromItem, items, bundleItemId, bundleItem, backwardCol, backwardCount, forwardCol, forwardCount, checkChildren) {
		var isValid = false,
			index, len,
			child;

		if (_nodes[fromItem] != null && forwardCol[fromItem] != null) {
			/* validate target items */
			isValid = true;
			if (checkChildren) {
				/* if we add new bundle all items should present */
				for (index = 0, len = items.length; index < len; index += 1) {
					child = items[index];
					if (_nodes[child] == null || forwardCol[fromItem][child] == null) {
						isValid = false;
					}
				}
			}
			if (isValid) {
				if (bundleItem != null) {
					/* add bundle node */
					_nodes[bundleItemId] = bundleItem;
				}

				if (_nodes[bundleItemId] != null) {
					/* update references */
					if (!backwardCol[bundleItemId]) {
						backwardCol[bundleItemId] = {};
						backwardCount[bundleItemId] = 0;
					}
					if (!forwardCol[bundleItemId]) {
						forwardCol[bundleItemId] = {};
						forwardCount[bundleItemId] = 0;
					}

					if (!backwardCol[bundleItemId][fromItem]) {
						backwardCol[bundleItemId][fromItem] = true;
						backwardCount[bundleItemId] += 1;
					}

					if (!forwardCol[fromItem][bundleItemId]) {
						forwardCol[fromItem][bundleItemId] = true;
						forwardCount[fromItem] += 1;
					}

					for (index = 0, len = items.length; index < len; index += 1) {
						child = items[index];

						if (bundleItemId != child) {
							if (forwardCol[fromItem][child] != null) {
								delete forwardCol[fromItem][child];
								forwardCount[fromItem] -= 1;
							}

							if (backwardCol[child][fromItem] != null) {
								delete backwardCol[child][fromItem];
								backwardCount[child] -= 1;
							}

							if (!backwardCol[child][bundleItemId]) {
								backwardCol[child][bundleItemId] = true;
								backwardCount[child] += 1;
							}

							if (!forwardCol[bundleItemId][child]) {
								forwardCol[bundleItemId][child] = true;
								forwardCount[bundleItemId] += 1;
							}
						}
					}
				}
			}
		}
		return isValid;
	}

	function bundleChildren(parent, children, bundleItemId, bundleItem) {
		return _bundleNodes(parent, children, bundleItemId, bundleItem, _parents, _parentsCount, _children, _childrenCount, true);
	}

	function bundleParents(child, parents, bundleItemId, bundleItem) {
		return _bundleNodes(child, parents, bundleItemId, bundleItem, _children, _childrenCount, _parents, _parentsCount, true);
	}

	function ReferenceItem() {
		this.id = "";
		this.key = "";
		this.children = [];
		this.childrenHash = {};
		this.processed = false;
	}

	function ReferencesEdge(arg0) {
		this.items = [];
		this.weight = 0;
		this.difference = 0;

		if (arguments.length > 0) {
			this.difference = arg0;
		}
	}

	function _getReferencesGraph(currentItems) {
		var result = primitives.common.graph(),
			item, parents,
			index1, index2, len,
			from, to, difference,
			processed = {};

		for (item in currentItems) {
			if (currentItems.hasOwnProperty(item)) {

				_loop(this, _children, item, function (child) {
					if (!processed.hasOwnProperty(child)) {
						processed[child] = true;
						/* create array of parents from hash references */
						parents = [];
						_loop(this, _parents, child, function (parent) {
							parents.push(parent);
						});

						/* create all possible combinations between items */
						for (index1 = 0, len = parents.length; index1 < len - 1; index1 += 1) {
							from = parents[index1];
							if (currentItems.hasOwnProperty(from)) {

								for (index2 = index1 + 1; index2 < len; index2 += 1) {
									to = parents[index2];
									if (currentItems.hasOwnProperty(to)) {
										difference = Math.abs(currentItems[from].children.length - currentItems[to].children.length);

										var edge = result.edge(from, to);
										if (edge == null) {
											edge = new ReferencesEdge(difference);
											result.addEdge(from, to, edge);
										}
										edge.items.push(child);
										edge.weight += 1;
									}
								}
							}
						}
					}
				}); //ignore jslint
			}
		}
		return result;
	}

	function optimizeReferences(onNewBundleItem) {
		var sharedItemsByKey = {},
			sharedItemsById = {},
			currentItems = {},
			nodeid, newReferenceItem,
			nextItems, graph, node,
			maximumTree,
			counter = 0,
			power = 10,
			processed;

		if (onNewBundleItem != null) {
			for (nodeid in _nodes) {
				counter += 1;
				if (_nodes.hasOwnProperty(nodeid)) {
					newReferenceItem = new ReferenceItem();

					_loop(this, _children, nodeid, function (child) {
						newReferenceItem.children.push(child);
						newReferenceItem.childrenHash[child] = true;
					}); //ignore jslint

					newReferenceItem.children.sort();
					newReferenceItem.id = nodeid;
					newReferenceItem.key = newReferenceItem.children.join(",");

					currentItems[newReferenceItem.id] = newReferenceItem;
				}
			}

			power = Math.pow(10, (counter).toString().length);

			while (!primitives.common.isEmptyObject(currentItems)) {
				nextItems = {};
				processed = {};

				graph = _getReferencesGraph(currentItems);

				for (nodeid in currentItems) {
					if (currentItems.hasOwnProperty(nodeid)) {
						node = currentItems[nodeid];

						if (!node.processed) {

							maximumTree = graph.getSpanningTree(nodeid, function (edge) {
								return edge.weight * power + power - edge.difference;
							}); //ignore jslint

							maximumTree.loopLevels(this, function (treeKey, treeKeyNode, levelid) {
								currentItems[treeKey].processed = true;

								maximumTree.loopChildren(this, treeKey, function (child, childNode) {
									var relation = graph.edge(treeKey, child),
										nextBundleItem = null, newItem,
										key, index, len,
										childrenToBind, isSharedItem,
										relationItem;

									currentItems[child].processed = true;

									if (relation.weight > 1) {
										key = relation.items.join(',');

										if (!sharedItemsByKey.hasOwnProperty(key)) {
											newItem = onNewBundleItem();
											_nodes[newItem.id] = newItem; /* add new bundle node to the family */

											nextBundleItem = new ReferenceItem();
											nextBundleItem.id = newItem.id;
											nextBundleItem.key = key;
											for (index = 0, len = relation.items.length; index < len; index += 1) {
												relationItem = relation.items[index];
												nextBundleItem.children.push(relationItem);
												nextBundleItem.childrenHash[relationItem] = true;
												processed[relationItem] = true;
											}
											nextBundleItem.children.sort();

											sharedItemsByKey[nextBundleItem.key] = nextBundleItem;
											sharedItemsById[nextBundleItem.id] = nextBundleItem;
											nextItems[nextBundleItem.id] = nextBundleItem;
											processed[nextBundleItem.id] = nextBundleItem;

											childrenToBind = nextBundleItem.children.slice(0);
											loopChildren(this, treeKeyNode.replacementItem || treeKey, function (childid, child, level) {
												// if child item is bundle and it is not child of new bundle item
												if (!nextBundleItem.childrenHash[childid] && sharedItemsById[childid] != null ) {
													isSharedItem = true;
													// if all children of that child are in the next bundle item we add it to that new bundle item as well
													loopChildren(this, childid, function (childid, child, level) {
														if (!nextBundleItem.childrenHash[childid]) {
															isSharedItem = false;
															return 1/*BREAK*/;
														}
														if (!processed.hasOwnProperty(childid)) {
															return SKIP;
														}
													});
													if (isSharedItem) {
														childrenToBind.push(childid);
													}
												}
												return 2/*SKIP*/;
											});

											_bundleNodes(treeKeyNode.replacementItem || treeKey, childrenToBind, nextBundleItem.id, newItem, _parents, _parentsCount, _children, _childrenCount, false);

											if ((_childrenCount[treeKey] || 0) <= 1 && treeKeyNode.replacementItem == null) {
												treeKeyNode.replacementItem = nextBundleItem.id;
											}
										} else {
											nextBundleItem = sharedItemsByKey[key];
										}

										/* don't add shared item to itself on next items loop*/
										if (nextBundleItem.id != child) {

											childrenToBind = nextBundleItem.children.slice(0);
											loopChildren(this, childNode.replacementItem || child, function (childid, child, level) {
												if (sharedItemsById[childid] != null && !nextBundleItem.childrenHash[childid]) {

													isSharedItem = true;
													loopChildren(this, childid, function (childid, child, level) {
														if (!nextBundleItem.childrenHash[childid]) {
															isSharedItem = false;
															return 1/*BREAK*/;
														}
														if (!processed.hasOwnProperty(childid)) {
															return 2/*SKIP*/;
														}
														return SKIP;
													});
													if (isSharedItem) {
														childrenToBind.push(childid);
													}
												}
												return 2/*SKIP*/;
											});


											_bundleNodes(childNode.replacementItem || child, childrenToBind, nextBundleItem.id, null, _parents, _parentsCount, _children, _childrenCount, false);

											/* if all items bundled then use bundle item for following transformations of references instead of original item if references graph*/
											if ((_childrenCount[child] || 0) <= 1 && childNode.replacementItem == null) {
												childNode.replacementItem = nextBundleItem.id;
											}
										}
									}
								});
							}); //ignore jslint
						}
					}
				}
				currentItems = nextItems;
			}
		}
	}

	function eliminateManyToMany(onNewBundleItem) {
		var parent, bundleNode;

		for (parent in _children) {
			if (_children.hasOwnProperty(parent)) {

				if ((_childrenCount[parent] || 0) > 1) {
					_loop(this, _children, parent, function (child) {
						if ((_parentsCount[child] || 0) > 1) {
							bundleNode = onNewBundleItem();
							bundleChildren(parent, [child], bundleNode.id, bundleNode);
						}
					}); //ignore jslint
				}
			}
		}
	}

	function FamilyEdge(parentid, childid) {
		this.parentid = parentid;
		this.childid = childid;
		this.key = parentid + "," + childid;
	}

	function getPlanarFamily(treeLevels) {
		var result = new primitives.common.family(),
			familyEdgeIndex, familyEdgeLen,
			familyEdgeKey;

		treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var sequence = new primitives.common.LinkedHashItems(),
				crossings = {},
				familyEdges = {},
				firstBucket = [];

			treeLevels.loopLevelItems(this, levelIndex, function (parentid, parentItem, position) {
				loopChildren(this, parentid, function (childid, childItem) {
					var childPosition = treeLevels.getItemPosition(childid);
					var familyEdge = new FamilyEdge(parentid, childid);

					familyEdges[familyEdge.key] = familyEdge;

					var crossEdges = [];
					if (sequence.isEmpty()) {
						sequence.add(childPosition, [familyEdge]);
					} else {
						sequence.iterateBack(function (sequenceItem, itemPosition) {
							if (itemPosition < childPosition) {
								// add new sequence after itemPosition and exit
								sequence.insertAfter(itemPosition, childPosition, [familyEdge]);
								return true;
							} else if (itemPosition == childPosition) {
								// add new link to exisitng sequenceItem and exit
								sequenceItem.push(familyEdge);
								return true;
							} else {
								// merge links into output
								for (var crossEdgesIndex = 0, crossEdgesLen = sequenceItem.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
									var crossEdge = sequenceItem[crossEdgesIndex];
									if (crossEdge.parentid != parentid) {
										crossEdges.push(crossEdge);
									}
								}
							}
						});
						if (sequence.startKey() > childPosition) {
							sequence.unshift(childPosition, [familyEdge]);
						}
					}

					crossings[familyEdge.key] = crossEdges;
					for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
						crossings[crossEdges[crossEdgesIndex].key].push(familyEdge);
					}

					return SKIP;
				});

				if(countChildren(parentid) == 1) {
					var childid = firstChild(parentid);
					if (countParents(childid) == 1) {
						var familyEdge = new FamilyEdge(parentid, childid);
						firstBucket.push(familyEdge.key);
					}
				}
			});

			// distribute edges by number of crossings into buckets
			var buckets = [],
				crossEdges;
			for (var familyEdgeKey in crossings) {
				crossEdges = crossings[familyEdgeKey];
				var len = crossEdges.length;
				if (buckets[len] != null) {
					buckets[len].push(familyEdgeKey);
				} else {
					buckets[len] = [familyEdgeKey];
				}
			}

			var processed = {};

			// leave single parent child relations
			buckets.unshift(firstBucket);

			// break relations having 
			for (var bucketIndex = 0, bucketsLen = buckets.length; bucketIndex < bucketsLen; bucketIndex += 1) {
				var bucket = buckets[bucketIndex];
				if (bucket != null) {
					for (familyEdgeIndex = 0, familyEdgeLen = bucket.length; familyEdgeIndex < familyEdgeLen; familyEdgeIndex += 1) {
						familyEdgeKey = bucket[familyEdgeIndex];
						if (!processed.hasOwnProperty(familyEdgeKey)) {
							processed[familyEdgeKey] = true;

							var familyEdge = familyEdges[familyEdgeKey];

							if (result.node(familyEdge.parentid) == null) {
								result.add(null, familyEdge.parentid, {});
							}
							if (result.node(familyEdge.childid) == null) {
								result.add([familyEdge.parentid], familyEdge.childid, {});
							} else {
								result.adopt([familyEdge.parentid], familyEdge.childid);
							}

							crossEdges = crossings[familyEdgeKey];
							for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
								processed[crossEdges[crossEdgesIndex].key] = true;
							}
						}
					}
				}
			}
		});

		return result;
	}

	function Link(from, to, distance) {
		this.from = from;
		this.to = to;
		this.distance = 0;
	}

	function getFamilyWithoutGrandParentsRelations() {
		var result = new primitives.common.family();

		var hash = {};
		var links = [];
		var level = 0;
		for (var from in _parents) {
			if (_parents.hasOwnProperty(from)) {
				_loop(this, _parents, from, function (to) {
					var fromHash = hash[from];
					if(fromHash == null) {
						fromHash = {};
						hash[from] = fromHash;
					}
					if (!fromHash.hasOwnProperty(to)) {
						var link = new Link(from, to, level);
						links.push(link);
						hash[from][to] = link;
					}
				}); //ignore jslint
			}
		}

		while (links.length > 0) {
			var newLinks = [];
			level += 1;
			for (var index = 0, len = links.length; index < len; index += 1) {
				var link = links[index];
				from = link.to;
				if (_parents.hasOwnProperty(from)) {
					_loop(this, _parents, from, function (to) {
						var fromHash = hash[link.from];
						if (fromHash == null) {
							fromHash = {};
							hash[link.from] = fromHash;
						}
						if (fromHash.hasOwnProperty(to)) {
							fromHash[to].distance = level;
						} else {
							var newLink = new Link(from, to, level);
							newLinks.push(newLink);
							fromHash[to] = newLink;
						}
					});
				}
			}
			links = newLinks;
		}

		// return only references to immidiate parents
		loop(this, function(nodeid, node) {
			var parents = [];
			_loop(this, _parents, nodeid, function (to) {
				if (hash[nodeid][to].distance === 0) {
					parents.push(to);
				}
			});
			result.add(parents, nodeid, node);
		});

		return result;
	}
	function countChildren(parent) {
		return _childrenCount[parent] || 0;
	}

	function countParents(child) {
		return _parentsCount[child] || 0;
	}

	function firstChild(parent) {
		var result = null,
			children = _children[parent] || {};
		for (result in children) {
			if (children.hasOwnProperty(result)) {
				return result; //ignore jslint
			}
		}
		return null;
	}

	function firstParent(child) {
		var result = null,
			parents = _parents[child] || {};
		for (result in parents) {
			if (parents.hasOwnProperty(result)) {
				return result; //ignore jslint
			}
		}
		return null;
	}

	function loopNeighbours(thisArg, itemid, onItem) {
		var processed = {};

		if (onItem != null) {
			loopChildren(this, itemid, function (childid, child, childLevel) {
				if (!processed.hasOwnProperty(childid)) {
					processed[childid] = null;

					if (onItem.call(thisArg, childid, child, 1)) {
						processed[childid] = SKIP;

						loopParents(this, childid, function (parentid, parent, parentLevel) {
							if (!processed.hasOwnProperty(parentid)) {
								processed[parentid] = null;

								if (onItem.call(thisArg, parentid, parent, 2)) {
									processed[parentid] = SKIP;
								}
							}
							return processed[parentid];
						});
					}
				}
				return processed[childid];
			});

			loopParents(this, itemid, function (parentid, parent, parentLevel) {
				if (!processed.hasOwnProperty(parentid)) {
					processed[parentid] = null;

					if (onItem.call(thisArg, parentid, parent, 1)) {
						processed[parentid] = SKIP;

						loopChildren(this, parentid, function (childid, child, childLevel) {
							if (!processed.hasOwnProperty(childid)) {
								processed[childid] = true;

								if (onItem.call(thisArg, childid, child, 2)) {
									processed[childid] = SKIP;
								}
							}
							return processed[childid];
						});
					}
				}
				return processed[parentid];
			});
		}
	}

	function getGraph() {
		var result = primitives.common.graph(),
			from, to;

		for (from in _children) {
			if (_children.hasOwnProperty(from)) {
				_loop(this, _children, from, function (to) {
					var edge = result.edge(from, to);
					if (edge == null) {
						edge = new ReferencesEdge({});
						result.addEdge(from, to, edge);
					}
				}); //ignore jslint
			}
		}

		return result;
	}

	function GroupBy(parentid, childid) {
		this.parentid = parentid;
		this.childid = childid;
		this.ids = [];
		this.nodes = [];
	}

	function groupBy(thisArg, size, onGroup) { //function onGroup(parent, child, nodes)
		if (onGroup != null) {
			var groups = {};
			for (var nodeid in _nodes) {
				var parentsCount = _parentsCount[nodeid] || 0;
				var childrenCount = _childrenCount[nodeid] || 0;
				if (parentsCount <= 1 && childrenCount <= 1) {
					var parentid = firstParent(nodeid);
					var childid = firstChild(nodeid);
					var key = parentid + " * " + childid;
					if (!groups.hasOwnProperty(key)) {
						groups[key] = new GroupBy(parentid, childid);
					}
					groups[key].ids.push(nodeid);
					groups[key].nodes.push(_nodes[nodeid]);
				}
			}

			for (key in groups) {
				if (groups.hasOwnProperty(key)) {
					var group = groups[key];
					if (group.ids.length >= size) {
						if (onGroup.call(thisArg, group.parentid, group.childid, group.ids, group.nodes)) {
							break;
						}
					}
				}
			}
		}
	}

	function validate(info) {
		var parent, child;

		function _count(items) {
			var result = 0, key;
			if (items != null) {
				for (key in items) {
					if (items.hasOwnProperty(key)) {
						result += 1;
					}
				}
			}
			return result;
		}

		loop(this, function (nodeId, node) {
			_loop(this, _children, nodeId, function (child) {
				if (!_parents.hasOwnProperty(child) || !_parents[child].hasOwnProperty(nodeId)) {
					if (info != null) {
						info.message = "Child #" + child + " does not reference parent #" + nodeId;
					}
					return false;
				}
			});
			_loop(this, _parents, nodeId, function (parent) {
				if (!_children.hasOwnProperty(parent) || !_children[parent].hasOwnProperty(nodeId)) {
					if (info != null) {
						info.message = "Parent #" + parent + " does not reference child #" + nodeId;
					}
					return false;
				}
			});
		});

		for (parent in _parents) {
			if (_parents.hasOwnProperty(parent)) {
				if ((_parentsCount[parent] || 0) != _count(_parents[parent])) {
					if (info != null) {
						info.message = "Parents count for item #" + parent + " missmatch.";
					}
					return false;
				}
				if (_parents.hasOwnProperty(parent) && !_nodes.hasOwnProperty(parent)) {
					if (info != null) {
						info.message = "Orphant parents for item #" + parent;
					}
					return false;
				}
			}
		}

		for (child in _children) {
			if (_children.hasOwnProperty(child)) {
				if ((_childrenCount[child] || 0) != _count(_children[child])) {
					if (info != null) {
						info.message = "Children count for item " + child + " missmatch.";
					}
					return false;
				}
				if (_children.hasOwnProperty(child) && !_nodes.hasOwnProperty(child)) {
					if (info != null) {
						info.message = "Orphant children of item " + child;
					}
					return false;
				}
			}
		}

		for (child in _roots) {
			if (_roots.hasOwnProperty(child)) {
				if ((_rootsCount[child] || 0) != _count(_roots[child])) {
					if (info != null) {
						info.message = "Root children count for item @" + child + " missmatch.";
					}
					return false;
				}
				_loop(this, _roots, child, function (nodeid) {
					if (!_nodes.hasOwnProperty(nodeid)) {
						if (info != null) {
							info.message = "Child #" + nodeid + "of root #" + child + " does not exists.";
						}
						return false;
					}
				}); //ignore jslint
			}
		}
		
		return true;
	}
	
	function hasLoops() {
		var tempFamily = clone();
		loopTopo(this, function (itemid, item, levelIndex) {
			tempFamily.removeNode(itemid);
		});

		return tempFamily.hasNodes();
	}

	function clone() {
		return primitives.common.family({
			roots: _roots,
			rootsCount: _rootsCount,
			children: _children,
			childrenCount: _childrenCount,
			parents: _parents,
			parentsCount: _parentsCount,
			nodes: _nodes
		});
	}

	/* Private objects */

	return {
		/* family structure modification */
		add: add,
		adopt: adopt,
		bundleChildren: bundleChildren,
		bundleParents: bundleParents,
		optimizeReferences: optimizeReferences,
		eliminateManyToMany: eliminateManyToMany,
		groupBy: groupBy,
		getPlanarFamily: getPlanarFamily,
		getFamilyWithoutGrandParentsRelations: getFamilyWithoutGrandParentsRelations,
		getGraph: getGraph,

		removeNode: removeNode,
		removeRelation: removeRelation,

		/* referencing and looping */
		node: node,
		loop: loop,
		loopLevels: loopLevels,
		loopTopo: loopTopo,
		loopTopoReversed: loopTopoReversed,
		loopChildren: loopChildren,
		loopParents: loopParents,
		findLargestRoot: findLargestRoot,
		loopRoots: loopRoots,
		hasNodes: hasNodes,
		hasCommonChild: hasCommonChild,
		loopNeighbours: loopNeighbours,
		countChildren: countChildren,
		countParents: countParents,
		firstParent: firstParent,
		firstChild: firstChild,

		/* force validation */
		validate: validate,
		hasLoops: hasLoops,
		clone: clone,

		// callback return codes
		BREAK: BREAK, // break loop immidiatly
		SKIP: SKIP // skip loop of current node children 
	};
};
