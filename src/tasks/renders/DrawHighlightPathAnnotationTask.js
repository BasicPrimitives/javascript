import PolylinesBuffer from '../../graphics/structs/PolylinesBuffer';
import PaletteItem from '../../graphics/structs/PaletteItem';
import { Layers, ZOrderType } from '../../enums';

export default function DrawHighlightPathAnnotationTask(getGraphics, connectorsOptionTask, highlightPathAnnotationOptionTask, connectionsGraphTask, zOrderType) {
  function process() {
    var graph = connectionsGraphTask.getGraph(),
      highlightOptions = connectorsOptionTask.getOptions(),
      annotations = highlightPathAnnotationOptionTask.getAnnotations(),
      graphics = getGraphics();

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        graphics.reset("placeholder", Layers.BackgroundHighlightPathAnnotations);
        break;
      case ZOrderType.Foreground://ignore jslint
        graphics.reset("placeholder", Layers.ForegroundHighlightPathAnnotations);
        break;
    }

    drawAnnotations(graphics, highlightOptions, annotations, graph);

    return false;
  }

  function drawAnnotations(graphics, highlightOptions, annotations, graph) {
    var index, len,
      index2, len2,
      index3, len3,
      firstItemId, nextItemId,
      treeItem,
      path,
      items,
      connectorEdge,
      annotationConfig,
      panel, buffer,
      from, to;

    if (annotations.length > 0) {
      buffer = new PolylinesBuffer();

      switch (zOrderType) {
        case ZOrderType.Background://ignore jslint
          panel = graphics.activate("placeholder", Layers.BackgroundHighlightPathAnnotations);
          break;
        case ZOrderType.Foreground://ignore jslint
          panel = graphics.activate("placeholder", Layers.ForegroundHighlightPathAnnotations);
          break;
      }

      /* group path segments by from node */
      var pairs = {};
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];
        if (annotationConfig.items != null && annotationConfig.items.length > 0) {
          items = annotationConfig.items.slice(0);
          firstItemId = items[0];
          if (graph.hasNode(firstItemId)) {
            for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
              nextItemId = items[index2];
              if (graph.hasNode(nextItemId)) {
                if (pairs.hasOwnProperty(firstItemId)) {
                  pairs[firstItemId].push(nextItemId);
                } else {
                  pairs[firstItemId] = [nextItemId];
                }
                firstItemId = nextItemId;
              }
            }
          }
        }
      }

      /* get shortest paths */
      var paths = {};
      for (from in pairs) {
        paths[from] = {};
        if (pairs.hasOwnProperty(from)) {
          graph.getShortestPath(this, from, pairs[from], function (connectorEdge, fromItem, toItem) {
            return connectorEdge.weight;
          }, function (path2, to2) {
            paths[from][to2] = path2;
          }); //ignore jslint
        }
      }

      /* trace annotations */
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];

        var paletteItem = new PaletteItem({
          lineColor: (annotationConfig.color != null ? annotationConfig.color : highlightOptions.highlightLinesColor),
          lineWidth: (annotationConfig.lineWidth != null ? annotationConfig.lineWidth : highlightOptions.highlightLinesWidth),
          lineType: (annotationConfig.lineType != null ? annotationConfig.lineType : highlightOptions.highlightLinesType),
          fillColor: null,
          opacity: annotationConfig.opacity
        });
        var polyline = buffer.getPolyline(paletteItem);

        if (annotationConfig.items != null && annotationConfig.items.length > 0) {
          items = annotationConfig.items.slice(0);
          firstItemId = items[0];

          if (graph.hasNode(firstItemId)) {
            for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
              nextItemId = items[index2];
              if (graph.hasNode(nextItemId)) {
                path = paths[firstItemId][nextItemId] || [];
                for (index3 = path.length - 2; index3 >= 0; index3 -= 1) {
                  from = path[index3 + 1];
                  to = path[index3];
                  connectorEdge = graph.edge(from, to);
                  if (connectorEdge.from == from) {
                    connectorEdge.polyline.clone().mergeTo(polyline);
                  } else {
                    polyline.addInverted(connectorEdge.polyline.clone());
                  }
                  if (annotationConfig.showArrows) {
                    if (to == connectorEdge.parentsArrowId || to == connectorEdge.childrenArrowId) {
                      polyline.addArrow(annotationConfig.lineWidth, function (arrowPolyline) {
                        arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
                      }); //ignore jslint
                    }
                  }
                }

                firstItemId = nextItemId;
              }
            }
          }
        }
      }

      graphics.polylinesBuffer(buffer);
    }
  }

  return {
    process: process
  };
};