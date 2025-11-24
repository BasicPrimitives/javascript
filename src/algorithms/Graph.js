import Tree from './Tree';
import FibonacciHeap from './FibonacciHeap';

/**
 * Creates an undirected graph structure backed by adjacency lists.
 * Each edge stores a context object provided by the caller.
 *
 * @class Graph
 * @returns {Graph} A new graph instance
 */
export default function Graph() {
  var _edges = {},
    MAXIMUMTOTALWEIGHT = 1,
    MINIMUMWEIGHT = 2;

  /**
   * Adds an undirected edge between two nodes.
   * If the edge already exists, it will not be replaced.
   *
   * @param {string} from The starting node id
   * @param {string} to The ending node id
   * @param {object} edge The edge context object
   */
  function addEdge(from, to, edge) {
    if ((_edges[from] == null || _edges[from][to] == null) && edge != null) {

      if (_edges[from] == null) {
        _edges[from] = {};
      }
      _edges[from][to] = edge;

      if (_edges[to] == null) {
        _edges[to] = {};
      }
      _edges[to][from] = edge;
    }
  }

  /**
   * Retrieves the stored edge context object for a given pair of nodes.
   *
   * @param {string} from The source node id
   * @param {string} to The target node id
   * @returns {object|null} The edge's context object, or null if none exists
   */
  function edge(from, to) {
    var result = null;
    if (_edges[from] != null && _edges[from][to]) {
      result = _edges[from][to];
    }
    return result;
  }

  /**
   * Checks whether a node exists in the graph.
   *
   * @param {string} from The node id
   * @returns {boolean} True if the node is present in the graph
   */
  function hasNode(from) {
    return _edges.hasOwnProperty(from);
  }

  /**
   * Callback invoked for each edge during iteration.
   *
   * @callback onEdgeCallback
   * @param {string} from The start node id
   * @param {string} to The end node id
   * @param {Object} edge The edge context object
   */

  /**
   * Iterates over all edges in the graph.
   *
   * @param {object} thisArg Execution context for the callback
   * @param {onEdgeCallback} onEdge Callback invoked for each edge
   */
  function loopEdges(thisArg, onEdge) {
    var neighbours, fromKey, toKey;
    if (onEdge != null) {
      for (fromKey in _edges) {
        if (_edges.hasOwnProperty(fromKey)) {
          neighbours = _edges[fromKey];
          if (neighbours != null) {
            for (toKey in neighbours) {
              if (neighbours.hasOwnProperty(toKey)) {
                onEdge.call(thisArg, fromKey, toKey, neighbours[toKey]);
              }
            }
          }
        }
      }
    }
  }

  /**
   * Iterates over all edges connected to a specific node.
   *
   * @param {object} thisArg Execution context for the callback
   * @param {string} itemid The node id whose edges to iterate
   * @param {onEdgeCallback} onEdge Callback invoked for each connected edge
   */
  function loopNodeEdges(thisArg, itemid, onEdge) {
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

  /**
   * Callback for node iteration functions.
   *
   * @callback onNodeCallback
   * @param {string} to The node id visited
   * @returns {boolean} Return true to stop traversal early
   */

  /**
   * Traverses all connected nodes starting from the given node.
   * If no start node is provided, traversal begins with the first available node.
   *
   * @param {object} thisArg Execution context for the callback
   * @param {string} [startNode] Optional starting node id
   * @param {onNodeCallback} onItem Callback invoked for each visited node
   */
  function loopNodes(thisArg, startNode, onItem) {
    var processed = {};
    if (startNode == null) {
      for (startNode in _edges) {
        if (_edges.hasOwnProperty(startNode)) {
          if (!processed.hasOwnProperty[startNode]) {
            _loopNodes(thisArg, startNode, processed, onItem);
          }
        }
      }
    } else {
      _loopNodes(thisArg, startNode, processed, onItem);
    }
  }

  function _loopNodes(thisArg, startNode, processed, onItem) {
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

        /* iterate neighbours of every node on margin */
        for (index = 0, len = margin.length; index < len; index += 1) {
          marginKey = margin[index];

          if (onItem.call(thisArg, marginKey)) {
            return;
          }

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

  /**
   * Returns edge weight used in certain algorithms.
   *
   * @callback getGraphEdgeWeightCallback
   * @param {object} edge The edge context object
   * @param {string} fromItem The start node id
   * @param {string} toItem The end node id
   * @returns {number} The weight of the edge
   */

  /**
   * Computes a maximum spanning tree using a priority queue.
   * The graph may be disconnected; a start node is required.
   *
   * @param {string} startNode Node to begin spanning tree search
   * @param {getGraphEdgeWeightCallback} getWeightFunc Function returning edge weight
   * @returns {tree} A Tree structure containing the maximum spanning tree
   */
  function getSpanningTree(startNode, getWeightFunc) {
    var result = Tree(),
      margin = FibonacciHeap(true),
      marginNode,
      parents = {}, /* if parent for item is set then it was laready visited */
      neighbours, neighbourKey, neighbourWeight, currentWeight;

    /* add start node to margin */
    margin.add(startNode, 0, null /*parent of root node is null*/);
    parents[startNode] = null;

    /* search graph */
    while ((marginNode = margin.extractRoot()) != null) {

      /* iterate neighbours of every node on margin */
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

  /**
   * Get graph growth sequence. The sequence of graph traversing order.
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {getGraphEdgeWeightCallback} getWeightFunc Callback function to get weight of an edge. 
   * @param {onNodeCallback} onItem A callback function to be called for every node of the growth sequence 
   */
  function getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem) {
    var startNode = _findStartNode(thisArg, onEdgeWeight);

    _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MAXIMUMTOTALWEIGHT);
  }

  /**
   * Get minimum weight graph growth sequence. The sequence of the traversing order of the graph nodes.
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} [startNode=undefined] The optional start node id 
   * @param {getGraphEdgeWeightCallback} onEdgeWeight Callback function to get weight of an edge. 
   * @param {onNodeCallback} onItem A callback function to be called for every node of the growth sequence
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
          /* iterate neighbours of every node on margin */
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

  /**
   * Callback invoked when a full path has been reconstructed.
   *
   * @callback onPathFoundCallback
   * @param {string[]} path The node sequence forming the path
   * @param {string} to The end node id
   */

  /**
   * Computes the shortest paths from a start node to one or more target nodes.
   *
   * @param {object} thisArg Execution context for callbacks
   * @param {string} startNode Starting node id
   * @param {string[]} endNodes Target node ids
   * @param {getGraphEdgeWeightCallback} getWeightFunc Optional function returning edge weight
   * @param {onPathFoundCallback} onPathFound Callback invoked when a target path is found
   */
  function getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound) {
    var margin = FibonacciHeap(false),
      distance = {},
      breadcramps = {},
      bestNodeOnMargin,
      key,
      children,
      newDistance,
      weight,
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
      /* iterate neighbours of selected node on margin */
      children = _edges[bestNodeOnMargin.key];
      for (key in children) {
        if (children.hasOwnProperty(key)) {
          weight = 1;
          if (getWeightFunc != null) {
            weight = getWeightFunc.call(thisArg, children[key], bestNodeOnMargin, key);
            newDistance = bestNodeOnMargin.priority + weight;
          } else {
            newDistance = bestNodeOnMargin.priority + 1;
          }
          if (weight >= 0) {
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

  /**
   * Callback used for filtering usable edges during DFS path search.
   *
   * @callback onPathEdgeCallback
   * @param {string} from The start node id
   * @param {string} to The end node id
   * @param {Object} edge The edge context object
   * @returns {boolean} True if the edge may be used in traversal
   */

  /**
   * Finds any path between two nodes using depth-first search.
   *
   * @param {object} thisArg Execution context for callbacks
   * @param {string} startNode The start node id
   * @param {string} endNode The end node id
   * @param {onPathEdgeCallback} onEdge Callback deciding whether an edge is usable
   * @returns {string[]} Array of node ids forming the found path
   */
  function dfsPath(thisArg, startNode, endNode, onEdge) {
    var margin = [],
      backtrace = {};

    margin.push(startNode);
    backtrace[startNode] = null;

    if (startNode != endNode) {
      /* search graph */
      while (margin.length > 0 && !backtrace.hasOwnProperty(endNode)) {
        // Remove last node out of margin
        var currentNode = margin[margin.length - 1];
        margin.length -= 1;

        // search its neighbours and add them to margin
        var neighbours = _edges[currentNode];
        for (var neighbour in neighbours) {
          if (neighbours.hasOwnProperty(neighbour)) {
            if (!backtrace.hasOwnProperty(neighbour)) {
              // node is not passed yet, check edge capacity and add new neighbour to the margin
              if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
                margin.push(neighbour);
                backtrace[neighbour] = currentNode;
                if (neighbour == endNode) {
                  break;
                }
              }
            }
          }
        }
      }
    }
    currentNode = endNode;
    var path = [];
    while (backtrace.hasOwnProperty(currentNode)) {
      path.push(currentNode);
      currentNode = backtrace[currentNode];
    }
    var result = [];
    if (path.length > 0) {
      for (var index = path.length - 1; index >= 0; index -= 1) {
        result.push(path[index]);
      }
    }
    return result;
  }

  /**
   * Computes a level graph starting from a given node.
   * Levels are assigned via BFS using only edges allowed by the callback.
   *
   * @param {object} thisArg Execution context
   * @param {string} startNode The start node id
   * @param {onPathEdgeCallback} onEdge Callback deciding if an edge is valid to traverse
   * @returns {Graph} A new graph representing the level structure
   */
  function getLevelGraph(thisArg, startNode, onEdge) {
    var level = {},
      margin = [],
      currentNode,
      currentLevel,
      neighbours;

    margin.push(startNode);
    level[startNode] = 1;

    /* search graph level by level */
    while (margin.length > 0) {
      var newMargin = [];
      for (var index = 0, len = margin.length; index < len; index += 1) {
        currentNode = margin[index];
        currentLevel = level[currentNode];
        neighbours = _edges[currentNode];
        for (var neighbour in neighbours) {
          if (neighbours.hasOwnProperty(neighbour)) {
            if (!level.hasOwnProperty(neighbour)) {
              if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
                newMargin.push(neighbour);
                level[neighbour] = currentLevel + 1;
              }
            }
          }
        }
      }
      margin = newMargin;
    }

    // Create level graph, copy existing edges to the new graph
    var levelGraph = Graph();
    for (currentNode in _edges) {
      if (level.hasOwnProperty(currentNode)) {
        currentLevel = level[currentNode];
        neighbours = _edges[currentNode];
        for (neighbour in neighbours) {
          if (level.hasOwnProperty(neighbour)) {
            var neighbourLevel = level[neighbour];
            if (currentLevel + 1 == neighbourLevel) {
              levelGraph.addEdge(currentNode, neighbour, neighbours[neighbour]);
            }
          }
        }
      }
    }

    return levelGraph;
  }

  /**
   * Performs a depth-first traversal starting at a node.
   * Edge usability is determined by the onEdge callback.
   *
   * @param {object} thisArg Execution context
   * @param {string} startNode The start node id
   * @param {onPathEdgeCallback} onEdge Callback deciding edge usability
   * @param {onNodeCallback} onNode Callback invoked for each newly visited node
   */
  function dfsLoop(thisArg, startNode, onEdge, onNode) {
    var margin = [],
      visited = {},
      currentNode;

    margin.push(startNode);
    visited[startNode] = true;

    /* search graph */
    while (margin.length > 0) {
      // Remove last node out of margin
      currentNode = margin[margin.length - 1];
      margin.length -= 1;

      // search its neighbours and add them to margin
      var neighbours = _edges[currentNode];
      for (var neighbour in neighbours) {
        if (neighbours.hasOwnProperty(neighbour)) {
          if (!visited.hasOwnProperty(neighbour)) {
            // node is not passed yet, check edge capacity and add new neighbour to the margin
            if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
              margin.push(neighbour);
              visited[neighbour] = true;
              if (onNode.call(thisArg, neighbour)) {
                return;
              }
            }
          }
        }
      }
    }
  }

  return {
    addEdge: addEdge,
    edge: edge,
    hasNode: hasNode,
    loopNodes: loopNodes,
    loopEdges: loopEdges,
    loopNodeEdges: loopNodeEdges,
    getSpanningTree: getSpanningTree,
    getTotalWeightGrowthSequence: getTotalWeightGrowthSequence,
    getMinimumWeightGrowthSequence: getMinimumWeightGrowthSequence,
    getShortestPath: getShortestPath,
    dfsPath: dfsPath,
    getLevelGraph: getLevelGraph,
    dfsLoop: dfsLoop
  };
};
