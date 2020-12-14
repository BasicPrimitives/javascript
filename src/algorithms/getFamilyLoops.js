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
 * This function finds [optimal collection of feedback edges](https://en.wikipedia.org/wiki/Feedback_arc_set) needed to be cut in 
 * order to eliminate loops in family structure.
 * 
 * @param {Family} family Family structure
 * @returns {Edge[]} Returns optimal collection of feedback loops 
 */
export default function getFamilyLoops(family, debug) {
  var loops = [], loop,
    index, len,
    index2, len2,
    fromNode, toNode, edge;

  var tempFamily = family.clone();

  family.loopTopo(this, function (itemid) {
    tempFamily.removeNode(itemid);
  })
  family.loopTopoReversed(this, function (itemid) {
    tempFamily.removeNode(itemid);
  })
  var cleanFamily = tempFamily.clone();

  cleanFamily.loop(this, function (itemid) {
    if (tempFamily.node(itemid) != null) {
      cleanFamily.loopParents(this, itemid, function (parentid) {
        loops.push(new Edge(parentid, itemid));
        tempFamily.removeChildRelation(parentid, itemid);
        return cleanFamily.SKIP;
      })
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

  /* Invert loops */
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

  if (totalFlow < defaultMinimalFlow) {
    var residueGraph = graph.getLevelGraph(this, from, function (fromNode, toNode, edge) {
      if (fromNode == edge.from) {
        return edge.capacity > edge.flow;
      }
      return false;
    });

    // graph.loopNodes(this, from, function (nodeid) {
    //   console.log("Nodeid: " + nodeid);
    //   graph.loopNodeEdges(this, nodeid, function (neighbour, edge) {
    //     if (edge.to == neighbour) {
    //       console.log("neighbour: " + neighbour + ", edge=" + JSON.stringify(edge));
    //     }
    //   })
    // });

    // var resedueNodes = [];
    // residueGraph.loopNodes(this, from, function (nodeid) {
    //   resedueNodes.push(nodeid);
    // });
    // console.log("Residue graph: " + resedueNodes.join(", "));

    var edgesToBreak = [];
    residueGraph.loopNodes(this, from, function (nodeid) {
      graph.loopNodeEdges(this, nodeid, function (toNode, edge) {
        if (edge.to == toNode) {
          if (!residueGraph.hasNode(toNode)) {
            // console.log("Edge to test: from: " + nodeid + ", to " + toNode);
            var isIsolated = true;
            graph.dfsLoop(this, toNode, function (fromNode, toNode2, edge) {
              if (edge.from == fromNode) {
                return edge.capacity > 0;
              }
              return false;
            }, function (foundid) {
              if (residueGraph.hasNode(foundid)) {
                // console.log("Non-isolated: " + toNode + ", hits residue node" + foundid);
                isIsolated = false;
                return true;
              }
              return false;
            });
            if (isIsolated) {
              edgesToBreak.push(new Edge(nodeid, toNode));
            }
          }
        }
      });
    });

    // collect loops to break
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
    if (validatedFlow != totalFlow) {
      throw "Failed to properly collect edges cutting maximum flow";
    }
    loops = optimizedLoops;
  }
  return loops;
};