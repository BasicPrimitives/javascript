import { Layers } from '../../enums';
import Graph from '../../algorithms/Graph';

export default function ConnectionsGraphTask(getGraphics, createTransformTask, connectorsOptionTask, visualTreeLevelsTask, alignDiagramTask, removeLoopsTask) {
  var _data = {
    graph: null,
    nodeid: 0
  };

  function process() {
    var graphics = getGraphics(),
      panel = graphics.activate("placeholder", Layers.Connector),
      bundles = visualTreeLevelsTask.getBundles(),
      nestedLayoutBottomConnectorIds = visualTreeLevelsTask.getNestedLayoutBottomConnectorIds(),
      connectorsOptions = connectorsOptionTask.getOptions(),
      loops = removeLoopsTask != null ? removeLoopsTask.getLoops() : [];


    var data = {
      graph: Graph(),
      nodeid: 0
    };

    var params = {
      treeItemsPositions: alignDiagramTask.getItemsPositions(),
      nestedLayoutBottomConnectorIds: nestedLayoutBottomConnectorIds,
      transform: createTransformTask.getTransform(),
      hasGraphics: panel.hasGraphics
    };

    var options = {
      connectorType: connectorsOptions.connectorType,
      showExtraArrows: connectorsOptions.showExtraArrows,
      bevelSize: connectorsOptions.bevelSize,
      elbowType: connectorsOptions.elbowType
    };

    for (var index = 0, len = bundles.length; index < len; index += 1) {
      var bundle = bundles[index];

      bundle.trace(data, params, options);
    }

    TraceLoops(data.graph, loops, connectorsOptions.extraArrowsMinimumSpace);

    _data = data;

    return true;
  }

  function TraceLoops(graph, loops) {
    for (var index = 0, len = loops.length; index < len; index += 1) {
      var loop = loops[index];

      graph.getShortestPath(this, loop.from, [loop.to], function (connectorEdge, fromItem, toItem) {
        return connectorEdge.weight;
      }, function (path, to) {
        for (var index2 = 0, len2 = path.length - 1; index2 < len2; index2 += 1) {
          var fromItem = path[index2], toItem = path[index2 + 1];
          var edge = graph.edge(fromItem, toItem);
          edge.isOppositeFlow = true;
          edge.hasArrow = true;
        }
      }); //ignore jslint
    }
  }

  function getGraph() {
    return _data.graph;
  }

  return {
    process: process,
    getGraph: getGraph
  };
};