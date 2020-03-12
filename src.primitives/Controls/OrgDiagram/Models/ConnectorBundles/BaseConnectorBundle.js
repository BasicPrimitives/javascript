primitives.common.BaseConnectorBundle = function () {
  this.NORMAL_ITEM_WEIGHT = 10010;
  this.LINE_ITEM_WEIGHT = 10000;
};


primitives.common.BaseConnectorBundle.prototype.trace = function (data, params, options) {
  //var data = {
  //  graph: null, //primitives.common.graph
  //  nodeid: 0
  //};

  //var params = {
  //  treeItemsPositions: [],
  //  transform: null,
  //  hasGraphics: true
  //};

  //var options = {
  //  connectorType: primitives.common.ConnectorType.Squared,
  //  showExtraArrows: true,
  //  bevelSize: 4,
  //  elbowType: primitives.common.ElbowType.None
  //};
};

primitives.common.BaseConnectorBundle.prototype.getId = function (data) {
  var result = "_" + data.nodeid;
  data.nodeid += 1;
  return result;
};

primitives.common.BaseConnectorBundle.prototype.ConnectorEdge = function (from, to, polyline, parentsArrowId, childrenArrowId, dotId, weight, fromOffset, hasMiddle, middleParent, hasArrow) {
  this.polyline = polyline;
  this.from = from;
  this.to = to;

  this.weight = weight || 0;
  this.fromOffset = fromOffset || 0;

  this.hasArrow = hasArrow || false;
  this.parentsArrowId = parentsArrowId;
  this.childrenArrowId = childrenArrowId;
  this.dotId = dotId;

  /* draw extra arrows along long segments, the hasMiddle should be true and middleParent is parent point id */
  this.hasMiddle = hasMiddle;
  this.middleParent = middleParent;
  this.isOppositeFlow = false;
};

primitives.common.BaseConnectorBundle.prototype.ConnectorDestination = function (options) {
  this.id = null;
  this.x = null;
  this.y = null;
  this.bundleid = null;
  this.hasElbow = false;
  this.elbowPoint1 = null;
  this.elbowPoint2 = null;
  this.visibility = null;
  this.isSquared = true;

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    }
  }
};

primitives.common.BaseConnectorBundle.prototype.traceFork = function (data, params, options, parentPoint, points, hasSquared, isParents, fromOffset, showHorizontalArrows) {
  var startIndex, endIndex, len,
    connectorPoint, curvedPoints = [], bundlePoint, connectorDestination,
    index,
    polyline,
    bevelSize,
    fromPoint, fromPointId, toPoint, toPointId;

  if (hasSquared) {
    /* draw curved or angular lines on left side of pack */
    curvedPoints = [];
    for (startIndex = 0, len = points.length; startIndex < len; startIndex += 1) {
      connectorPoint = points[startIndex];
      if (connectorPoint.x < parentPoint.x && !connectorPoint.isSquared) {
        curvedPoints.push(connectorPoint);
      } else {
        break;
      }
    }
    len = curvedPoints.length;
    if (len > 0) {
      connectorDestination = curvedPoints[len - 1];
      bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
        id: connectorDestination.bundleid,
        x: connectorDestination.x,
        y: parentPoint.y
      });
      this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
    }

    /* draw curved or angular lines on right side of pack */
    curvedPoints = [];
    for (endIndex = points.length - 1; endIndex >= startIndex; endIndex -= 1) {
      connectorPoint = points[endIndex];

      if (connectorPoint.x > parentPoint.x && !connectorPoint.isSquared) {
        curvedPoints.push(connectorPoint);
      } else {
        break;
      }
    }

    len = curvedPoints.length;
    if (len > 0) {
      connectorDestination = curvedPoints[len - 1];
      bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
        id: connectorDestination.bundleid,
        x: connectorDestination.x,
        y: parentPoint.y
      });
      this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
    }

    /* calculate elbows of vertical connectors */
    for (index = startIndex; index <= endIndex; index += 1) {
      connectorPoint = points[index];

      bevelSize = options.bevelSize;
      if (bevelSize < 2) {
        bevelSize = 0;
      }

      if (params.hasGraphics) {
        switch (options.elbowType) {
          case primitives.common.ElbowType.Bevel:
          case primitives.common.ElbowType.Round:
            if (bevelSize > 0 && Math.abs(parentPoint.x - connectorPoint.x) > bevelSize && Math.abs(parentPoint.y - connectorPoint.y) > bevelSize) {
              connectorPoint.hasElbow = true;
              connectorPoint.elbowPoint1 = new primitives.common.Point(connectorPoint.x, parentPoint.y + (parentPoint.y > connectorPoint.y ? -bevelSize : bevelSize));
              connectorPoint.elbowPoint2 = new primitives.common.Point(connectorPoint.x + (parentPoint.x > connectorPoint.x ? bevelSize : -bevelSize), parentPoint.y);
            }
            break;
          default:
            break;
        }
      }

      /* draw vertical segment */
      polyline = new primitives.common.Polyline();
      if (connectorPoint.hasElbow) {
        params.transform.transform3Points(connectorPoint.elbowPoint2.x, connectorPoint.elbowPoint2.y,
          connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint2.y,
          connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, true, this,
          function (fromX, fromY, toX, toY, toX2, toY2) {
            switch (options.elbowType) {
              case primitives.common.ElbowType.Bevel:
                polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
                polyline.addSegment(new primitives.common.LineSegment(toX2, toY2));
                break;
              case primitives.common.ElbowType.Round:
                polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
                polyline.addSegment(new primitives.common.CubicArcSegment(fromX, fromY, toX, toY, toX2, toY2));
                break;
            }
          });//ignore jslint

        params.transform.transformPoints(connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
          polyline.addSegment(new primitives.common.LineSegment(toX, toY));
        }); //ignore jslint
      } else {
        params.transform.transformPoints(connectorPoint.x, parentPoint.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
          polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
          polyline.addSegment(new primitives.common.LineSegment(toX, toY));
        }); //ignore jslint
      }

      var bundleid = (connectorPoint.x == parentPoint.x) ? parentPoint.id : connectorPoint.bundleid;
      var isVisible = (connectorPoint.visibility !== primitives.common.Visibility.Invisible);
      data.graph.addEdge(bundleid, connectorPoint.id, new this.ConnectorEdge(bundleid, connectorPoint.id, polyline,
        isParents ? connectorPoint.id : null,
        !isParents ? connectorPoint.id : null,
        null,
        isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT /* weight*/, fromOffset, null, null,
        isVisible));
    }

    /* draw segments on the right of parent point */
    startIndex = Math.max(startIndex - 1, 0);
    endIndex = Math.min(endIndex + 1, points.length - 1);

    fromPoint = parentPoint;
    fromPointId = parentPoint.id;
    for (index = startIndex; index <= endIndex; index += 1) {
      toPoint = points[index];
      toPointId = toPoint.bundleid;
      if (toPoint.x > fromPoint.x) {
        polyline = new primitives.common.Polyline();
        params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
          polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
          polyline.addSegment(new primitives.common.LineSegment(endX, endY));
        }); //ignore jslint
        data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline,
          null,
          null,
          fromPointId, Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */,
          fromOffset,
          /* draw middle arrows */
          showHorizontalArrows, isParents ? toPointId : fromPointId)
        );

        fromPoint = toPoint.elbowPoint2 || toPoint;
        fromPointId = toPointId;
      }
    }

    /* draw segments on the left of parent point */
    fromPoint = parentPoint;
    fromPointId = parentPoint.id;
    for (index = endIndex; index >= startIndex; index -= 1) {
      toPoint = points[index];
      toPointId = toPoint.bundleid;
      if (toPoint.x < fromPoint.x) {
        polyline = new primitives.common.Polyline();
        params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
          polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
          polyline.addSegment(new primitives.common.LineSegment(endX, endY));
        }); //ignore jslint
        data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline, null, null, fromPointId,
          Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */, fromOffset,
          /* draw middle arrows */
          showHorizontalArrows, isParents ? toPointId : fromPointId)
        );

        fromPoint = toPoint.elbowPoint2 || toPoint;
        fromPointId = toPointId;
      }
    }
  } else {
    /* all lines are angular or curved */
    this.traceAngularSegments(data, params, options, parentPoint, points, true);
  }
};

primitives.common.BaseConnectorBundle.prototype.traceAngularSegments = function (data, params, options, bundlePoint, points, drawToBundle) {
  var index, len,
    rect,
    point,
    polyline;

  for (index = 0, len = points.length; index < len; index += 1) {
    point = points[index];

    polyline = new primitives.common.Polyline();

    params.transform.transformPoint(bundlePoint.x, bundlePoint.y, true, this, function (x, y) {
      polyline.addSegment(new primitives.common.MoveSegment(x, y));
    });//ignore jslint

    switch (options.connectorType) {
      case primitives.common.ConnectorType.Angular:
        params.transform.transformPoint(point.x, point.y, true, this, function (x, y) {
          polyline.addSegment(new primitives.common.LineSegment(x, y));
        });//ignore jslint
        break;
      case primitives.common.ConnectorType.Curved:
        rect = new primitives.common.Rect(bundlePoint, point);

        if (drawToBundle) {
          if (bundlePoint.x > rect.x) {
            params.transform.transform3Points(rect.right(), rect.verticalCenter(), rect.x, rect.verticalCenter(), rect.x, rect.bottom(), true,
              this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
                polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
              });//ignore jslint
          }
          else {
            params.transform.transform3Points(rect.x, rect.verticalCenter(), rect.right(), rect.verticalCenter(), rect.right(), rect.bottom(), true,
              this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
                polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
              });//ignore jslint
          }
        } else {
          if (bundlePoint.x > rect.x) {
            params.transform.transformPoints(rect.x, rect.y, rect.x, rect.bottom(), true,
              this, function (cpX, cpY, x, y) {
                polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
              });//ignore jslint
          } else {
            params.transform.transformPoints(rect.right(), rect.y, rect.right(), rect.bottom(), true,
              this, function (cpX, cpY, x, y) {
                polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
              });//ignore jslint
          }
        }
        break;
    }
    var isVisible = (point.visibility !== primitives.common.Visibility.Invisible);
    data.graph.addEdge(bundlePoint.id, point.id, new this.ConnectorEdge(bundlePoint.id, point.id, polyline,
      null,
      isVisible ? point.id : null,
      isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT, null, null, null,
      true));
  }
};