primitives.orgdiagram.DrawConnectorsTask = function (getGraphics, connectionsGraphTask, connectorsOptionTask, showElbowDots, paletteManagerTask) {
  var _debug = false;

  function process() {
    var graphics = getGraphics();
    var graph = connectionsGraphTask.getGraph();
    var connectorsOptions = connectorsOptionTask.getOptions();
    var paletteManager = paletteManagerTask.getPaletteManager();

    graphics.reset("placeholder", primitives.common.Layers.Connector);
    graphics.activate("placeholder", primitives.common.Layers.Connector);

    var buffer = new primitives.common.PolylinesBuffer();

    var elbowDotRadius = Math.round(connectorsOptions.elbowDotSize / 2);

    //var polyline = buffer.getPolyline(paletteManager.getPalette(primitives.common.ConnectorStyleType.Regular));

    var processed = {};
    var processedDots = {};
    graph.loopNodes(this, null, function (itemid) {
      graph.loopNodeEdges(this, itemid, function (to, connectorEdge) {
        if (!processed.hasOwnProperty(to)) {
          var paletteItem = null;
          if (connectorEdge.fromOffset <= 1) {
            paletteItem = paletteManager.getPalette(primitives.common.ConnectorStyleType.Regular);
          } else {
            paletteManager.selectPalette(connectorEdge.fromOffset);
            paletteItem = paletteManager.getPalette(primitives.common.ConnectorStyleType.Extra);
          }
          var polyline = buffer.getPolyline(paletteItem);

          /* draw intersection dots */
          if (showElbowDots && connectorEdge.dotId != null && connectorsOptions.elbowType != primitives.common.ElbowType.None && !processedDots.hasOwnProperty(connectorEdge.dotId)) {
            var dotPolyline = buffer.getPolyline(polyline.arrowPaletteItem);
            var dotPoint = (connectorEdge.dotId == connectorEdge.from) ? connectorEdge.polyline.getStartPoint() : connectorEdge.polyline.getEndPoint();
            dotPolyline.addSegment(new primitives.common.DotSegment(dotPoint.x - elbowDotRadius, dotPoint.y - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
            processedDots[connectorEdge.dotId] = true;
          }

          var arrowId = null;

          if (connectorEdge.hasArrow) {
            switch (connectorsOptions.arrowsDirection) {
              case primitives.common.GroupByType.Parents:
                arrowId = !connectorEdge.isOppositeFlow ? connectorEdge.parentsArrowId : connectorEdge.childrenArrowId;
                break;
              case primitives.common.GroupByType.Children:
                arrowId = !connectorEdge.isOppositeFlow ? connectorEdge.childrenArrowId : connectorEdge.parentsArrowId;
                break;
            }
          }

          if (arrowId == null) {
            var newSegment = connectorEdge.polyline.clone();

            if (connectorEdge.hasMiddle && connectorsOptions.arrowsDirection != primitives.common.GroupByType.None) {
              var isForward = true;
              if (connectorEdge.from == connectorEdge.middleParent) {
                isForward = (connectorsOptions.arrowsDirection == primitives.common.GroupByType.Children);
              } else {
                isForward = (connectorsOptions.arrowsDirection == primitives.common.GroupByType.Parents);
              }
              if (connectorEdge.isOppositeFlow) {
                isForward = !isForward;
              }
              newSegment.addOffsetArrow(isForward, connectorsOptions.linesWidth, 0.4, connectorsOptions.extraArrowsMinimumSpace, function (arrowPolyline) {
                arrowPolyline.mergeTo(buffer.getPolyline(polyline.arrowPaletteItem));
              }); //ignore jslint
            }

            if (connectorEdge.from == itemid) {
              newSegment.mergeTo(polyline);
            } else {
              polyline.addInverted(newSegment);
            }
          } else {
            if (arrowId == connectorEdge.to) {
              connectorEdge.polyline.clone().mergeTo(polyline);
            } else {
              polyline.addInverted(connectorEdge.polyline.clone());
            }
            polyline.addArrow(connectorsOptions.linesWidth, function (arrowPolyline) {
              arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
            }); //ignore jslint
          }
        }
      });
      processed[itemid] = true;
    });

    graphics.polylinesBuffer(buffer);

    return false;
  }

  return {
    process: process
  };
};