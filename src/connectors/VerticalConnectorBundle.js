import BaseConnectorBundle from './BaseConnectorBundle';
import { ConnectorType, Visibility } from '../enums';
import Polyline from '../graphics/structs/Polyline';
import MoveSegment from '../graphics/structs/MoveSegment';
import LineSegment from '../graphics/structs/LineSegment';

export default function VerticalConnectorBundle(fromItems, toItems, dotId) {
  this.fromItems = fromItems;
  this.toItems = toItems;

  this.dotId = dotId || null;

  this.fromOffset = 0;
  this.fromStackSize = 0;
};

VerticalConnectorBundle.prototype = new BaseConnectorBundle();

VerticalConnectorBundle.prototype.trace = function (data, params, options) {
  var parents, children, items,
    treeItemId, treeItemPosition,
    index, len,
    isSquared, hasSquared,
    parentHorizontalCenter,
    parentsConnectorOffset,
    childrenConnectorOffset,
    connectorPoint,
    connectorStep,
    chartHasSquaredConnectors = (options.connectorType === ConnectorType.Squared);

  /* Draw fork for parents */
  parents = [];
  if (this.fromItems.length > 0) {
    items = this.fromItems;
    for (index = 0, len = items.length; index < len; index += 1) {
      treeItemId = items[index];
      treeItemPosition = params.treeItemsPositions[treeItemId];

      connectorPoint = new this.ConnectorDestination({
        id: params.nestedLayoutBottomConnectorIds.hasOwnProperty(treeItemId) ? params.nestedLayoutBottomConnectorIds[treeItemId] : treeItemId,
        bundleid: this.getId(data),
        x: treeItemPosition.actualPosition.horizontalCenter(),
        y: treeItemPosition.actualPosition.bottom(),
        isSquared: true,
        visibility: treeItemPosition.actualVisibility
      });
      parents.push(connectorPoint);
    }
    parents.sort(function (a, b) { return a.x - b.x; });

    /* Find offset of horizontal connector line between parents */
    parentsConnectorOffset = treeItemPosition.bottomConnectorShift - treeItemPosition.bottomConnectorInterval * (this.fromStackSize - this.fromOffset + 1);
  }

  children = [];
  if (this.toItems.length > 0) {
    hasSquared = false;

    items = this.toItems;
    for (index = 0; index < items.length; index += 1) {
      treeItemId = items[index];
      treeItemPosition = params.treeItemsPositions[treeItemId];

      isSquared = true;
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot:
        case Visibility.Line:
          isSquared = chartHasSquaredConnectors;
          break;
      }
      connectorStep = 0;
      connectorPoint = new this.ConnectorDestination({
        id: treeItemId,
        bundleid: this.getId(data),
        x: (treeItemPosition.actualPosition.horizontalCenter() + connectorStep),
        y: treeItemPosition.actualPosition.top(),
        isSquared: isSquared,
        visibility: treeItemPosition.actualVisibility
      });
      children.push(connectorPoint);

      /* is true if any child point has squared connector */
      hasSquared = hasSquared || connectorPoint.isSquared;
    }
    children.sort(function (a, b) { return a.x - b.x; });

    /* Find offset of horizontal connector line between children */
    childrenConnectorOffset = treeItemPosition.topConnectorShift;
  }

  if (children.length == 1) {
    parentHorizontalCenter = children[0].x;
  } else if (parents.length == 1) {
    parentHorizontalCenter = parents[0].x;
  } else if (children.length > 0 && parents.length > 0) {
    parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x + children[0].x + children[children.length - 1].x) / 4.0;
  } else if (children.length > 0) {
    parentHorizontalCenter = (children[0].x + children[children.length - 1].x) / 2.0;
  } else {
    parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x) / 2.0;
  }

  var topCenterPoint = null;
  if (parents.length > 0) {
    topCenterPoint = new this.ConnectorDestination({
      id: (children.length == 0 ? this.dotId : this.getId(data)),
      x: parentHorizontalCenter,
      y: parentsConnectorOffset
    });
    this.traceFork(data, params, options, topCenterPoint, parents, true, true, this.fromOffset, options.showExtraArrows);
  }

  var bottomCenterPoint = null;
  if (children.length > 0) {
    bottomCenterPoint = new this.ConnectorDestination({
      id: (parents.length == 0 ? this.dotId : this.getId(data)),
      x: parentHorizontalCenter,
      y: childrenConnectorOffset
    });
    if (topCenterPoint != null && bottomCenterPoint.y == topCenterPoint.y) {
      bottomCenterPoint = topCenterPoint;
    }
    this.traceFork(data, params, options, bottomCenterPoint, children, hasSquared, false, 0, options.showExtraArrows);
  }

  /* draw connector line between children and parents */
  if (topCenterPoint != null && bottomCenterPoint != null && topCenterPoint.id != bottomCenterPoint.id) {
    params.transform.transformPoints(topCenterPoint.x, topCenterPoint.y, bottomCenterPoint.x, bottomCenterPoint.y,
      true, this, function (fromX, fromY, toX, toY) {
        var polyline = new Polyline();
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));

        data.graph.addEdge(topCenterPoint.id, bottomCenterPoint.id, new this.ConnectorEdge(topCenterPoint.id, bottomCenterPoint.id, polyline,
          null,
          null,
          null, 0/* weight */));
      });
  }
};