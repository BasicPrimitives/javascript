import BaseConnectorBundle from './BaseConnectorBundle';
import Polyline from '../graphics/structs/Polyline';
import MoveSegment from '../graphics/structs/MoveSegment';
import LineSegment from '../graphics/structs/LineSegment';
import { Visibility } from '../enums';

export default function HorizontalConnectorBundle(fromItem, toItem) {
  this.fromItem = fromItem;
  this.toItem = toItem;
};

HorizontalConnectorBundle.prototype = new BaseConnectorBundle();

HorizontalConnectorBundle.prototype.trace = function (data, params, options) {
  var fromItemId = this.fromItem,
    toItemId = this.toItem,
    fromItemPosition = params.treeItemsPositions[fromItemId],
    toItemPosition = params.treeItemsPositions[toItemId],
    polyline = new Polyline();

  if (fromItemPosition.actualPosition.x < toItemPosition.actualPosition.x) {
    params.transform.transformPoints(fromItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.x, toItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));
      });//ignore jslint
  } else {
    params.transform.transformPoints(fromItemPosition.actualPosition.x, fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));
      });//ignore jslint
  }
  var toItemIsVisible = toItemPosition.actualVisibility !== Visibility.Invisible;
  var fromItemIsVisible = fromItemPosition.actualVisibility !== Visibility.Invisible;

  data.graph.addEdge(fromItemId, toItemId, new this.ConnectorEdge(fromItemId, toItemId, polyline,
    toItemIsVisible ? toItemId : null,
    fromItemIsVisible ? fromItemId : null,
    null,
    (toItemIsVisible || fromItemIsVisible) ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT, 
    null, null, null,
    true)
  );
};