primitives.common.graph = function () {
	var _edges = {},
		MAXIMUMTOTALWEIGHT = 1,
		MINIMUMWEIGHT = 2;

	function addEdge(from, to, edge) {
		if ((_edges[from] == null || _edges[from][to] == null)  && edge != null) {

			if(_edges[from] == null) {
				_edges[from] = {};
			}
			_edges[from][to] = edge;

			if (_edges[to] == null) {
				_edges[to] = {};
			}
			_edges[to][from] = edge;
		}
	}

	function edge(from, to) {
		var result = null;
		if (_edges[from] != null && _edges[from][to]) {
			result = _edges[from][to];
		}
		return result;
	}

	function hasNode(from) {
		return _edges.hasOwnProperty(from);
	}

	function loopNodeEdges(thisArg, itemid, onEdge) { // onEdge = function(to, edge) {}
		var neighbours, neighbourKey;
		if (onEdge != null) {
			neighbours = _edges[itemid];
			if (neighbours != null) {
				for (neighbourKey in neighbours) {
					if (neighbours.hasOwnProperty(neighbourKey)) {
						onEdge.call(thisArg, neighbourKey, neighbours[neighbourKey]);
					}
				}
			}
		}
	}

	function loopNodes(thisArg, startNode, onItem) { // onItem = function(itemid) {}
		var processed = {};
		if (startNode == null) {
			for (startNode in _edges) {
				if (_edges.hasOwnProperty(startNode)) {
					if (!processed.hasOwnProperty[startNode]) {
						_loopNodes(this, startNode, processed, onItem);
					}
				}
			}
		} else {
			_loopNodes(this, startNode, processed, onItem);
		}
	}

	function _loopNodes(thisArg, startNode, processed, onItem) { // onItem = function(itemid) {}
		/* Graph */
		var margin = [],
			marginKey,
			newMargin,
			index, len,
			neighbours, neighbourKey;

		margin.push(startNode);
		processed[startNode] = true;
		if (onItem != null) {
			while (margin.length > 0) {
				newMargin = [];

				/* itterate neighbours of every node on margin */
				for (index = 0, len = margin.length; index < len; index += 1) {
					marginKey = margin[index];

					onItem.call(thisArg, marginKey);

					neighbours = _edges[marginKey];
					for (neighbourKey in neighbours) {
						if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
							processed[neighbourKey] = true;
							newMargin.push(neighbourKey);
						}
					}
				}
				margin = newMargin;
			}
		}
	}

	/*
		Function: primitives.common.graph.getSpanningTree
			Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is nessasary.
	
		Parameters:
		startNode - The node to start searching for maximum spanning tree. Graph is not nessasary connected
		getWeightFunc - Call back function to get weight of edge. function(edge)

		Returns: 
			primitives.common.tree structure
	*/
	function getSpanningTree(startNode, getWeightFunc) {
		var result = primitives.common.tree(),
			margin = primitives.common.FibonacciHeap(true),
			marginNode,
			parents = {}, /* if parent for item is set then it was laready visited */
			neighbours, neighbourKey, neighbourWeight, currentWeight;

		/* add start node to margin */
		margin.add(startNode, 0, null /*parent of root node is null*/);
		parents[startNode] = null;

		/* search graph */
		while ((marginNode = margin.extractRoot()) != null) {

			/* itterate neighbours of every node on margin */
			neighbours = _edges[marginNode.key];

			for (neighbourKey in neighbours) {
				if (neighbours.hasOwnProperty(neighbourKey) && !result.node(neighbourKey)) {
					neighbourWeight = getWeightFunc != null ? getWeightFunc(neighbours[neighbourKey]) : neighbours[neighbourKey];

					currentWeight = margin.getPriority(neighbourKey);
					if (currentWeight == null) {
						margin.add(neighbourKey, neighbourWeight, null);
						parents[neighbourKey] = marginNode.key.toString();
					} else {
						if (currentWeight <= neighbourWeight) {
							/* improve node distance */
							margin.setPriority(neighbourKey, neighbourWeight);
							parents[neighbourKey] = marginNode.key.toString();
						}
					}
				}
			}

			/* add next margin item to resul tree */
			result.add(parents[marginNode.key], marginNode.key.toString(), {});
		}

		return result;
	}

	function _findStartNode(thisArg, onEdgeWeight) {
		var result = null,
			fromItem, toItems, toItem,
			weight = 0,
			maxWeight = null;
		
		for (fromItem in _edges) {
			if (_edges.hasOwnProperty(fromItem)) {
				toItems = _edges[fromItem];

				weight = 0;
				for (toItem in toItems) {
					if (toItems.hasOwnProperty(toItem)) {
						weight += onEdgeWeight.call(thisArg, toItems[toItem], fromItem, toItem);
					}
				}
				if (weight > maxWeight || maxWeight == null) {
					result = fromItem;
					maxWeight = weight;
				}
			}
		}
		return result;
	}

	/*
		Function: primitives.common.graph.getTotalWeightGrowthSequence
			Get graph growth sequence. The sequence of graph traversing order.
	
		Parameters:
			thisArg - call back functions context
			onEdgeWeight - Call back function to weight edge of graph. function(edge)
			onItem - Call back function on next item found
	*/
	function getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem) {
		var startNode = _findStartNode(thisArg, onEdgeWeight);

		_getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MAXIMUMTOTALWEIGHT);
	}

	/*
	Function: primitives.common.graph.getMinimumWeightGrowthSequence
		Get graph growth sequence. The sequence of graph traversing order.

	Parameters:
		thisArg - call back functions context
		startNode - The node to start searching for grows sequence.
		onEdgeWeight - Call back function to weight edge of graph. function(edge)
		onItem - Call back function on next item found
	*/
	function getMinimumWeightGrowthSequence(thisArg, startNode, onEdgeWeight, onItem) {
		_getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MINIMUMWEIGHT);
	}

	function _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, growsMode) {
		var margin = {}, marginKey,
			itemsToRemove = [], /* if margin item has no neighbours to expand we remove it from margin*/
			hasNeighbours,
			processed = {}, /* if item is set then it was already visited */
			marginLength = 0, /* curent margin length */
			nextMarginKey,
			nextMarginWeight,
			bestWeight,
			neighbours, neighbourKey, neighbourWeight,
			index, len;

		if (onEdgeWeight != null && onItem != null) {
			if (startNode == null) {
				startNode = _findStartNode(thisArg, onEdgeWeight);
			}

			if (startNode != null) {

				onItem.call(thisArg, startNode);

				/* add start node to margin */
				margin[startNode] = true;
				marginLength += 1;

				/* add startNode to result tree */
				processed[startNode] = null;

				/* search graph */
				while (marginLength > 0) {
					itemsToRemove = [];
					nextMarginKey = null;
					nextMarginWeight = null;
					bestWeight = {};
					/* itterate neighbours of every node on margin */
					for (marginKey in margin) {
						if (margin.hasOwnProperty(marginKey)) {
							neighbours = _edges[marginKey];
							hasNeighbours = false;

							for (neighbourKey in neighbours) {
								if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
									neighbourWeight = onEdgeWeight.call(thisArg, neighbours[neighbourKey], marginKey, neighbourKey);
									hasNeighbours = true;

									switch (growsMode) {
										case MAXIMUMTOTALWEIGHT:
											if (bestWeight[neighbourKey] == null) {
												bestWeight[neighbourKey] = 0;
											}
											bestWeight[neighbourKey] += neighbourWeight;

											if (!nextMarginWeight || bestWeight[neighbourKey] > nextMarginWeight) {
												nextMarginKey = neighbourKey;
												nextMarginWeight = bestWeight[neighbourKey];
											}
											break;
										case MINIMUMWEIGHT:
											if (bestWeight[neighbourKey] == null) {
												bestWeight[neighbourKey] = neighbourWeight;
											} else {
												bestWeight[neighbourKey] = Math.min(bestWeight[neighbourKey], neighbourWeight);
											}

											if (!nextMarginWeight || bestWeight[neighbourKey] < nextMarginWeight) {
												nextMarginKey = neighbourKey;
												nextMarginWeight = bestWeight[neighbourKey];
											}
											break;
									}
								}
							}

							if (!hasNeighbours) {
								itemsToRemove.push(marginKey);
							}
						}
					}

					if (nextMarginKey == null) {
						/* no items to expand to exit*/
						break;
					} else {
						margin[nextMarginKey] = true;
						marginLength += 1;
						processed[nextMarginKey] = true;

						/* add next margin item to result sequence */
						onItem.call(thisArg, nextMarginKey);
					}

					for (index = 0, len = itemsToRemove.length; index < len; index += 1) {
						/* delete visited node from margin */
						delete margin[itemsToRemove[index]];
						marginLength -= 1;
					}
				}
			}
		}
	}

	/*
		Function: primitives.common.graph.getShortestPath
		Get shortest path between two nodes in graph. Start and end nodes supposed to have connection path. All connections have the same weight.
	
		Parameters:
		startNode - The node to start.
		endNode - The end node.
		getWeightFunc - Call back function to weight edge of graph. function(edge, fromItem, toItem)
	
		Returns: 
			Array containing nodes names of connection path.
	*/
	function getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound) { // getWeightFunc = function(edge, fromItem, toItem), onPathFound = function(path, to)
		var margin = primitives.common.FibonacciHeap(false),
			distance = {},
			breadcramps = {},
			bestNodeOnMargin,
			key,
			children,
			newDistance,
			path,
			currentNode,
			endNodesHash = {},
			index, len, 
			endsCount = 0, endsFound = 0;

		/* create hash table of end nodes to find */
		for (index = 0, len = endNodes.length; index < len; index += 1) {
			key = endNodes[index];

			if (!endNodesHash.hasOwnProperty(key)) {
				endsCount += 1;
				endNodesHash[key] = true;
			}
		}

		/* add start node to margin */
		margin.add(startNode, 0, null);
		breadcramps[startNode] = null;

		/* search graph */
		while ((bestNodeOnMargin = margin.extractRoot()) != null) {
			/* itterate neighbours of selected node on margin */
			children = _edges[bestNodeOnMargin.key];
			for (key in children) {
				if (children.hasOwnProperty(key)) {
					newDistance = bestNodeOnMargin.priority + (getWeightFunc != null ? getWeightFunc.call(thisArg, children[key], bestNodeOnMargin, key) : 1);
					distance = margin.getPriority(key);
					if (distance != null) {
						if (distance > newDistance) {
							margin.setPriority(key, newDistance);
							breadcramps[key] = bestNodeOnMargin.key;
						}
					} else {
						if (!breadcramps.hasOwnProperty(key)) {
							margin.add(key, newDistance, null);
							breadcramps[key] = bestNodeOnMargin.key;
						}
					}
				}
			}

			if (endNodesHash.hasOwnProperty(bestNodeOnMargin.key)) {
				/* trace path */
				path = [];
				currentNode = bestNodeOnMargin.key;
				while (currentNode != null) {
					path.push(currentNode);
					currentNode = breadcramps[currentNode];
				}
				onPathFound.call(thisArg, path, bestNodeOnMargin.key);

				endsFound += 1;
				if (endsFound >= endsCount) {
					break;
				}
			}
		}
	}

	return {
		addEdge: addEdge,
		edge: edge,
		hasNode: hasNode,
		loopNodes: loopNodes,
		loopNodeEdges: loopNodeEdges,
		getSpanningTree: getSpanningTree,
		getTotalWeightGrowthSequence: getTotalWeightGrowthSequence,
		getMinimumWeightGrowthSequence: getMinimumWeightGrowthSequence,
		getShortestPath: getShortestPath
	};
};