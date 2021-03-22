import Polyline from '../graphics/structs/Polyline';
import MoveSegment from '../graphics/structs/MoveSegment';
import LineSegment from '../graphics/structs/LineSegment';
import { Visibility } from '../enums';
import BaseConnectorBundle from './BaseConnectorBundle';

export default function MatrixConnectorBundle(isChildren, items, matrixNodeId, connectionId, matrixWidth) {
  this.isChildren = isChildren;
  this.items = items;
  this.len = items.length;
  this.matrixNodeId = matrixNodeId;
  this.connectionId = connectionId;
  this.matrixWidth = matrixWidth;

  this.blocksCount = Math.ceil(this.matrixWidth / 2);
  this.rowsCount = Math.ceil(this.len / this.matrixWidth);
};

MatrixConnectorBundle.prototype = new BaseConnectorBundle();

MatrixConnectorBundle.prototype.trace = function (data, params, options) {
  if (this.isChildren) {
    this.traceChildrenLayout(data, params, options);
  } else {
    this.traceParentsLayout(data, params, options);
  }
};

MatrixConnectorBundle.prototype.traceChildrenLayout = function (data, params, options) {
  var actualPosition,
    forkItems = [];
  for (var blockIndex = 0; blockIndex < this.blocksCount; blockIndex += 1) {
    var prevMedianPoint = null;
    for (var rowIndex = this.rowsCount - 1; rowIndex >= 0; rowIndex -= 1) {

      var leftNodeIndex = this.getNodeIndex(blockIndex, rowIndex, true, true);
      var leftNodeId = null;
      var leftTreeItemPosition = null;
      if (leftNodeIndex < this.len) {
        leftNodeId = this.items[leftNodeIndex];
        leftTreeItemPosition = params.treeItemsPositions[leftNodeId];
      }

      var rightNodeIndex = this.getNodeIndex(blockIndex, rowIndex, false, true);
      var rightNodeId = null;
      var rightTreeItemPosition = null;
      if (rightNodeIndex < this.len) {
        rightNodeId = this.items[rightNodeIndex];
        rightTreeItemPosition = params.treeItemsPositions[rightNodeId];
      }

      var medianPoint = null;
      if (medianPoint == null && leftTreeItemPosition != null) {
        medianPoint = new this.ConnectorDestination({
          id: this.getId(data),
          x: leftTreeItemPosition.actualPosition.horizontalCenter() + leftTreeItemPosition.rightMedianOffset,
          y: leftTreeItemPosition.horizontalConnectorsShift
        });
      }

      if (medianPoint == null && rightTreeItemPosition != null) {
        medianPoint = new this.ConnectorDestination({
          id: this.getId(data),
          x: rightTreeItemPosition.actualPosition.horizontalCenter() - rightTreeItemPosition.leftMedianOffset,
          y: rightTreeItemPosition.horizontalConnectorsShift
        });
      }

      if (leftTreeItemPosition != null) {
        actualPosition = leftTreeItemPosition.actualPosition;
        params.transform.transformPoints(actualPosition.right(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));
            leftNodeId = params.nestedLayoutParentConnectorIds[leftNodeId] || leftNodeId;
            data.graph.addEdge(leftNodeId, medianPoint.id, new this.ConnectorEdge(leftNodeId, medianPoint.id, polyline,
              null,
              leftNodeId,
              null, 10/* weight */, null, null, null,
              true));
          });
      }

      if (rightTreeItemPosition != null) {
        actualPosition = rightTreeItemPosition.actualPosition;
        params.transform.transformPoints(actualPosition.left(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));
            rightNodeId = params.nestedLayoutParentConnectorIds[rightNodeId] || rightNodeId;
            data.graph.addEdge(rightNodeId, medianPoint.id, new this.ConnectorEdge(rightNodeId, medianPoint.id, polyline,
              null,
              rightNodeId,
              null, 10/* weight */, null, null, null,
              true));
          });
      }

      if (prevMedianPoint != null && medianPoint != null) {
        // draw segment between previous and current row median points
        params.transform.transformPoints(prevMedianPoint.x, prevMedianPoint.y, medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));

            data.graph.addEdge(prevMedianPoint.id, medianPoint.id, new this.ConnectorEdge(prevMedianPoint.id, medianPoint.id, polyline,
              null,
              null,
              null, 0/* weight */));
          });
      }

      if (medianPoint != null) {
        prevMedianPoint = medianPoint;
      }
    }
    if (prevMedianPoint != null) {
      forkItems.push(new this.ConnectorDestination({
        id: prevMedianPoint.id,
        bundleid: this.getId(data),
        x: prevMedianPoint.x,
        y: prevMedianPoint.y,
        isSquared: true,
        visibility: Visibility.Invisible
      }));
    }
  }
  // draw parents fork
  var parentTreeItemPosition = params.treeItemsPositions[this.matrixNodeId];
  actualPosition = parentTreeItemPosition.actualPosition;
  var parentPoint = new this.ConnectorDestination({
    id: this.matrixNodeId,
    x: actualPosition.horizontalCenter(),
    y: actualPosition.top()
  });
  this.traceFork(data, params, options, parentPoint, forkItems, true, false, 0, options.showExtraArrows);
};

MatrixConnectorBundle.prototype.traceParentsLayout = function (data, params, options) {
  var actualPosition,
    forkItems = [];
  for (var blockIndex = 0; blockIndex <= this.blocksCount; blockIndex += 1) {
    var prevMedianPoint = null;
    for (var rowIndex = 0; rowIndex < this.rowsCount; rowIndex += 1) {

      var leftNodeIndex = this.getNodeIndex(blockIndex, rowIndex, true, false);
      var leftNodeId = null;
      var leftTreeItemPosition = null;
      if (leftNodeIndex < this.len) {
        leftNodeId = this.items[leftNodeIndex];
        leftTreeItemPosition = params.treeItemsPositions[leftNodeId];
      }

      var rightNodeIndex = this.getNodeIndex(blockIndex, rowIndex, false, false);
      var rightNodeId = null;
      var rightTreeItemPosition = null;
      if (rightNodeIndex < this.len) {
        rightNodeId = this.items[rightNodeIndex];
        rightTreeItemPosition = params.treeItemsPositions[rightNodeId];
      }

      var medianPoint = null;
      if (medianPoint == null && leftTreeItemPosition != null) {
        medianPoint = new this.ConnectorDestination({
          id: this.getId(data),
          x: leftTreeItemPosition.actualPosition.horizontalCenter() + leftTreeItemPosition.rightMedianOffset,
          y: leftTreeItemPosition.horizontalConnectorsShift
        });
      }

      if (medianPoint == null && rightTreeItemPosition != null) {
        medianPoint = new this.ConnectorDestination({
          id: this.getId(data),
          x: rightTreeItemPosition.actualPosition.horizontalCenter() - rightTreeItemPosition.leftMedianOffset,
          y: rightTreeItemPosition.horizontalConnectorsShift
        });
      }

      if (leftTreeItemPosition != null) {
        actualPosition = leftTreeItemPosition.actualPosition;
        params.transform.transformPoints(actualPosition.right(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));
            leftNodeId = params.nestedLayoutBottomConnectorIds[leftNodeId] || leftNodeId;
            data.graph.addEdge(leftNodeId, medianPoint.id, new this.ConnectorEdge(leftNodeId, medianPoint.id, polyline,
              leftNodeId,
              null,
              null, 10/* weight */, null, null, null,
              true));
          });
      }

      if (rightTreeItemPosition != null) {
        actualPosition = rightTreeItemPosition.actualPosition;
        params.transform.transformPoints(actualPosition.left(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));

            rightNodeId = params.nestedLayoutBottomConnectorIds[rightNodeId] || rightNodeId;
            data.graph.addEdge(rightNodeId, medianPoint.id, new this.ConnectorEdge(rightNodeId, medianPoint.id, polyline,
              rightNodeId,
              null,
              null, 10/* weight */, null, null, null,
              true));
          });
      }

      if (prevMedianPoint != null && medianPoint != null) {
        // draw segment between previous and current row median points
        params.transform.transformPoints(prevMedianPoint.x, prevMedianPoint.y, medianPoint.x, medianPoint.y,
          true, this, function (fromX, fromY, toX, toY) {
            var polyline = new Polyline();
            polyline.addSegment(new MoveSegment(fromX, fromY));
            polyline.addSegment(new LineSegment(toX, toY));

            data.graph.addEdge(prevMedianPoint.id, medianPoint.id, new this.ConnectorEdge(prevMedianPoint.id, medianPoint.id, polyline,
              null,
              null,
              null, 0/* weight */, null, null, null,
              true));
          });
      }

      if (medianPoint != null) {
        prevMedianPoint = medianPoint;
      }
    }
    if (prevMedianPoint != null) {
      forkItems.push(new this.ConnectorDestination({
        id: prevMedianPoint.id,
        bundleid: this.getId(data),
        x: prevMedianPoint.x,
        y: prevMedianPoint.y,
        isSquared: true,
        visibility: Visibility.Invisible
      }));
    }
  }
  // draw parents fork
  var parentTreeItemPosition = params.treeItemsPositions[this.matrixNodeId];
  actualPosition = parentTreeItemPosition.actualPosition;
  var parentPoint = new this.ConnectorDestination({
    id: this.connectionId,
    x: actualPosition.horizontalCenter(),
    y: actualPosition.bottom()
  });
  this.traceFork(data, params, options, parentPoint, forkItems, true, true, 0, options.showExtraArrows);
};

MatrixConnectorBundle.prototype.getNodeIndex = function (blockIndex, row, isLeft, isChild) {
  var result = null,
    column;
  if (isChild) {
    column = blockIndex * 2 + (isLeft ? 0 : 1);
    if (this.matrixWidth > column) {
      result = row * this.matrixWidth + column;
    }
  } else {
    column = blockIndex * 2 + (isLeft ? -1 : 0);
    if (column >= 0 && column < this.matrixWidth) {
      result = row * this.matrixWidth + column;
    }
  }
  return result;
};

