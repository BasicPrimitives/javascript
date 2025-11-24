/**
 * Graph edge structure
 * @class Edge
 * @property {string} from From node id
 * @property {string} to To node id
 */
export function Edge(from, to) {
  this.from = from;
  this.to = to;
}

/**
 * Computes the optimal set of feedback edges that must be removed
 * to eliminate all cycles in a family structure. This corresponds to
 * [finding a minimum feedback arc set in the directed graph](https://en.wikipedia.org/wiki/Feedback_arc_set) formed by
 * the family relationships.
 *
 * The function analyzes the directed dependencies inside the family,
 * detects all cycles, and returns the smallest collection of edges
 * whose removal makes the structure acyclic.
 *
 * @param {Family} family - The family structure represented as a directed graph.
 * @param {boolean} [debug=false] - If true, enables diagnostic output.
 * @returns {Edge[]} The minimal set of edges whose removal breaks all cycles.
 */
export default function getFamilyLoops(family, debug) {
  var loops = [], loop,
    index, len,
    index2, len2,
    fromNode, toNode, edge;

  var tempFamily = family.clone();

  /* Cleaning loops stage: use topological sorting to remove all nodes without parents.
    Then use reversed topological sorting to remove all nodes without children.
    The final temp family should contain only nodes that are in loops,
    having both children and parents at the same time.
  */
  family.loopTopo(this, function (itemid) {
    tempFamily.removeNode(itemid);
  })
  family.loopTopoReversed(this, function (itemid) {
    tempFamily.removeNode(itemid);
  })
  var cleanFamily = tempFamily.clone();

  /* Take any node in the temp family and break all its parent relations, storing them in the loops collection.
    After that, repeat the previous cleaning stage: use topological and reversed topological sorting
    to remove nodes that are no longer part of loops.
    Repeat this until the temp family becomes empty.
  */
  cleanFamily.loop(this, function (itemid) {
    /* take any node in temp family and break its parents relations*/
    if (tempFamily.node(itemid) != null) {
      tempFamily.loopParents(this, itemid, function (parentid) {
        loops.push(new Edge(parentid, itemid));
        tempFamily.removeChildRelation(parentid, itemid);
        return tempFamily.SKIP;
      });
      /* clean nodes in broken loops */
      var itemsToRemove = [];
      tempFamily.loopTopo(this, function (itemid) {
        itemsToRemove.push(itemid);
      });
      tempFamily.loopTopoReversed(this, function (itemid) {
        itemsToRemove.push(itemid);
      });
      for (var index = 0; index < itemsToRemove.length; index += 1) {
        tempFamily.removeNode(itemsToRemove[index]);
      }
    }
  });

  /* At this stage we have a copy of the original clean family
    and a collection of loops we need to break to make the clean family acyclic.
    So we remove the broken loops (edges) from the clean family here.
  */
  for (index = 0, len = loops.length; index < len; index += 1) {
    loop = loops[index];
    if (!cleanFamily.removeChildRelation(loop.from, loop.to)) {
      throw "Relation does not exists";
    }
  }

  if (debug && cleanFamily.hasLoops()) {
    throw "Failed to clean loops in family";
  }

  var graph = cleanFamily.getGraph(this, function (from, to) {
    return { from: from, to: to, capacity: 1, flow: 0 };
  });

  /* Create two nodes, `from` and `to`, for finding the maximum flow in the graph
    around and through the broken loops.
    For each broken loop we create two edges: the parent node of the broken loop
    is connected to the `from` node, and the child node of the broken loop
    is connected to the `to` node.
  */
  var from = "__1000__";
  var to = "__2000__";
  var defaultMinimalFlow = loops.length;
  for (index = 0, len = loops.length; index < len; index += 1) {
    loop = loops[index];
    edge = graph.edge(loop.from, to);
    if (edge == null) {
      graph.addEdge(loop.from, to, { from: loop.from, to: to, capacity: 1, flow: 0, tos: [loop.to] });
    } else {
      edge.capacity += 1;
      edge.tos.push(loop.to);
    }
    edge = graph.edge(from, loop.to);
    if (edge == null) {
      graph.addEdge(from, loop.to, { from: from, to: loop.to, capacity: 1, flow: 0, froms: [loop.from] });
    } else {
      edge.capacity += 1;
      edge.froms.push(loop.from);
    }
  }

  /*Now, use standard algorithm to find maximum flow between `from` and `to` nodes */
  var totalFlow = 0;
  var levelGraph = null;
  while (true) {
    levelGraph = graph.getLevelGraph(this, from, function (fromNode, toNode, edge) {
      if (fromNode == edge.from) {
        return edge.capacity > edge.flow;
      } else {
        return edge.flow > 0;
      }
    });

    if (!levelGraph.hasNode(to)) {
      break;
    }

    while (true) {
      var connectionPath = graph.dfsPath(this, from, to, function (fromNode, toNode, edge) {
        if (fromNode == edge.from) {
          return edge.capacity > edge.flow;
        } else {
          return edge.flow > 0;
        }
      });

      if (connectionPath.length == 0) {
        break;
      }

      // Find maximum flow for given path
      var flow = Infinity;
      for (index = 0, len = connectionPath.length; index < len - 1; index += 1) {
        fromNode = connectionPath[index];
        toNode = connectionPath[index + 1];
        edge = graph.edge(fromNode, toNode);
        var edgeFlow = 0;
        if (edge.from == fromNode) {
          edgeFlow = edge.capacity - edge.flow;
        } else {
          edgeFlow = edge.flow;
        }
        if (edgeFlow == 0) {
          throw "Broken flow path";
        }
        flow = Math.min(flow, edgeFlow);
      }

      // Update graph
      for (index = 0, len = connectionPath.length; index < len - 1; index += 1) {
        fromNode = connectionPath[index];
        toNode = connectionPath[index + 1];
        edge = graph.edge(fromNode, toNode);
        if (edge.from == fromNode) {
          edge.flow += flow;
        } else {
          edge.flow -= flow;
        }
      }
      totalFlow += flow;
    }
  }

  /* If the maximum flow is less than the number of initially broken loops,
    then it means the graph has a more optimal set of edges to break.
  */
  if (totalFlow < defaultMinimalFlow) {
    /* Collect residue graph nodes from the graph used to find the maximum flow.
      Start collecting edges from the `from` node.
      Use the same logic as for searching maximum flow:
        - if edge capacity > edge.flow, we can go forward
        - if edge.flow > 0, we can go backward through the edge
      Stop when no more new nodes are available.
      The `to` node cannot be reached this time.
    */
    var residueGraphNodes = {};
    residueGraphNodes[from] = true;
    graph.dfsLoop(this, from, function (fromNode, toNode2, edge) {
        if (fromNode == edge.from) {
          return edge.capacity > edge.flow;
        } else {
          return edge.flow > 0;
        }
    }, function (foundid) {
      if (!residueGraphNodes.hasOwnProperty(foundid)) {
        residueGraphNodes[foundid] = true;
      }
      return false;
    });

    /* The minimum cut of the directed graph is the set of edges
      between residue graph nodes and the inaccessible nodes of the graph.
    */
    var edgesToBreak = [];
    graph.loopEdges(this, function (fromKey, toKey, edge) {
      if (residueGraphNodes.hasOwnProperty(fromKey) && !residueGraphNodes.hasOwnProperty(toKey) && edge.capacity == edge.flow) {
        edgesToBreak.push(new Edge(fromKey, toKey));
        // console.log("Edge to break: fromKey: " + fromKey + ", toKey: " + toKey + ", edge=" + JSON.stringify(edge));
      }
    });

    // graph.loopNodes(this, from, function (nodeid) {
    //   console.log("Nodeid: " + nodeid);
    //   graph.loopNodeEdges(this, nodeid, function (neighbour, edge) {
    //     if (edge.to == neighbour) {
    //       console.log("neighbour: " + neighbour + ", edge=" + JSON.stringify(edge));
    //     }
    //   })
    // });

    // console.log("Residue graph nodes: " + Object.keys(residueGraphNodes).join(", "));

    /* Collect loops to break. If a broken edge contains the `from` or `to` nodes,
      recover the original edge from the family structure.
    */
    var optimizedLoops = [];
    var validatedFlow = 0;
    for (index = 0, len = edgesToBreak.length; index < len; index += 1) {
      var edgeToBreak = edgesToBreak[index];

      if (edgeToBreak.from == from) {
        edge = graph.edge(edgeToBreak.from, edgeToBreak.to);
        for (index2 = 0, len2 = edge.froms.length; index2 < len2; index2 += 1) {
          optimizedLoops.push(new Edge(edge.froms[index2], edgeToBreak.to));
          validatedFlow += 1;
        }
      } else if (edgeToBreak.to == to) {
        edge = graph.edge(edgeToBreak.from, edgeToBreak.to);
        for (index2 = 0, len2 = edge.tos.length; index2 < len2; index2 += 1) {
          optimizedLoops.push(new Edge(edgeToBreak.from, edge.tos[index2]));
          validatedFlow += 1;
        }
      } else {
        optimizedLoops.push(edgeToBreak);
        validatedFlow += 1;
      }
    }
    if (validatedFlow == totalFlow) {
      loops = optimizedLoops;
    }
  }
  return loops;
};