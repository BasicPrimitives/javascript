primitives.common.HorizontalConnectorBundle = function (fromItem, toItem) {
  this.fromItem = fromItem;
  this.toItem = toItem;
};

primitives.common.HorizontalConnectorBundle.prototype = new primitives.common.BaseConnectorBundle();

primitives.common.HorizontalConnectorBundle.prototype.trace = function (data, params, options) {
  var fromItemId = this.fromItem,
    toItemId = this.toItem,
    fromItemPosition = params.treeItemsPositions[fromItemId],
    toItemPosition = params.treeItemsPositions[toItemId],
    polyline = new primitives.common.Polyline();

  if (fromItemPosition.actualPosition.x < toItemPosition.actualPosition.x) {
    params.transform.transformPoints(fromItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.x, toItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
        polyline.addSegment(new primitives.common.LineSegment(toX, toY));
      });//ignore jslint
  } else {
    params.transform.transformPoints(fromItemPosition.actualPosition.x, fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
        polyline.addSegment(new primitives.common.LineSegment(toX, toY));
      });//ignore jslint
  }
  var toItemIsVisible = toItemPosition.actualVisibility !== primitives.common.Visibility.Invisible;
  var fromItemIsVisible = fromItemPosition.actualVisibility !== primitives.common.Visibility.Invisible;
  data.graph.addEdge(fromItemId, toItemId, new this.ConnectorEdge(fromItemId, toItemId, polyline,
    toItemIsVisible ? toItemId : null,
    fromItemIsVisible ? fromItemId : null,
    (toItemIsVisible || fromItemIsVisible) ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT), null, null, null,
    true
  );
};