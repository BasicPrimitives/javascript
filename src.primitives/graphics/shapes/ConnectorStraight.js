primitives.common.ConnectorStraight = function () {

};

primitives.common.ConnectorStraight.prototype = new primitives.common.BaseShape();

primitives.common.ConnectorStraight.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
  connectorAnnotationOffsetResolver, onLabelPlacement, labelConfig) {
  var fromPoint, toPoint, betweenPoint,
    vector, newVector,
    offset = linesOffset / 2,
    labelPlacement = null,
    fromLabelPlacement = primitives.common.PlacementType.Auto,
    toLabelPlacement = primitives.common.PlacementType.Auto,
    self = this;

  vector = new primitives.common.Vector(fromRect.centerPoint(), toRect.centerPoint());

  fromRect.loopEdges(function (sideVector, placementType) {
    fromPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
    fromLabelPlacement = placementType;
    return (fromPoint != null);
  });

  toRect.loopEdges(function (sideVector, placementType) {
    toPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
    toLabelPlacement = placementType;
    return (toPoint != null);
  });

  if (fromPoint != null && toPoint != null) {
    var baseVector = new primitives.common.Vector(fromPoint, toPoint);
    connectorAnnotationOffsetResolver.getOffset(baseVector, function (offsetIndex, bundleSize, direction) {
      var tempOffset = (offsetIndex * bundleOffset - (bundleSize - 1) * bundleOffset / 2.0) * direction;
      baseVector.offset(tempOffset);
      fromPoint = baseVector.from;
      toPoint = baseVector.to;

      switch (connectorShapeType) {
        case primitives.common.ConnectorShapeType.TwoWay:
          newVector = new primitives.common.Vector(toPoint.clone(), fromPoint.clone());
          newVector.offset(offset);
          self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);

          newVector = new primitives.common.Vector(fromPoint.clone(), toPoint.clone());
          newVector.offset(offset);
          self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);
          break;
        case primitives.common.ConnectorShapeType.OneWay:
          self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, false);
          break;
        case primitives.common.ConnectorShapeType.BothWay:
          self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, true);
          break;
      }

      if (hasLabel) {
        /* end points labels placement */
        switch (labelPlacementType) {
          case primitives.common.ConnectorLabelPlacementType.From:
            labelPlacement = self._getLabelPositionBySnapPoint(fromPoint.x, fromPoint.y, labelSize.width, labelSize.height, labelOffset, fromLabelPlacement);
            break;
          case primitives.common.ConnectorLabelPlacementType.Between:
            betweenPoint = self._betweenPoint(fromPoint, toPoint);
            labelPlacement = self._getLabelPositionBySnapPoint(betweenPoint.x, betweenPoint.y, labelSize.width, labelSize.height, labelOffset, primitives.common.PlacementType.Right);
            break;
          case primitives.common.ConnectorLabelPlacementType.To:
            labelPlacement = self._getLabelPositionBySnapPoint(toPoint.x, toPoint.y, labelSize.width, labelSize.height, labelOffset, toLabelPlacement);
            break;
          default:
            break;
        }

        if (onLabelPlacement != null) {
          onLabelPlacement.call(this, labelPlacement, labelConfig);
        }
      }
    });

  }
};

primitives.common.ConnectorStraight.prototype._drawLine = function (buffer, linePaletteItem, fromPoint, toPoint, bothWays) {
  var polyline;

  buffer.addInverted(function (invertedBuffer) {
    polyline = invertedBuffer.getPolyline(linePaletteItem);
    polyline.addSegment(new primitives.common.MoveSegment(fromPoint));
    polyline.addSegment(new primitives.common.LineSegment(toPoint));

    polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
      polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
    }); //ignore jslint
  }, false);//ignore jslint

  if (bothWays) {
    polyline = buffer.getPolyline(linePaletteItem);
    polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
      polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
    }); //ignore jslint
  }
};

primitives.common.ConnectorStraight.prototype._getLabelPositionBySnapPoint = function (x, y, labelWidth, labelHeight, labelOffset, placementType) {
  var result = null;
  switch (placementType) {
    case primitives.common.PlacementType.Auto:
    case primitives.common.PlacementType.Top:
      result = new primitives.common.Rect(x - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Right:
      result = new primitives.common.Rect(x + labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Bottom:
      result = new primitives.common.Rect(x - labelWidth / 2.0, y + labelOffset, labelWidth, labelHeight);
      break;
    case primitives.common.PlacementType.Left:
      result = new primitives.common.Rect(x - labelWidth - labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
      break;
  }
  return result;
};