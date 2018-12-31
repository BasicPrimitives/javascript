primitives.common.ConnectorOffbeat = function () {

};

primitives.common.ConnectorOffbeat.prototype = new primitives.common.BaseShape();

primitives.common.ConnectorOffbeat.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
	connectorAnnotationOffsetResolver, onLabelPlacement) {
	var minimalGap,
		connectorRect,
		fromPoint, toPoint,
		snapPoint,
		index, len,
		offsets, tempOffset,
		invertX, invertY,
		fromLabelPlacement = primitives.common.PlacementType.Auto,
		toLabelPlacement = primitives.common.PlacementType.Auto,
		labelPlacement = null,
		polyline,
		bothWay;
	
	polyline = buffer.getPolyline(linePaletteItem);

	offsets = [];
	switch (connectorShapeType) {
		case primitives.common.ConnectorShapeType.TwoWay:
			offsets = [-linesOffset / 2, linesOffset / 2];
			bothWay = false;
			break;
		case primitives.common.ConnectorShapeType.OneWay:
			offsets = [0];
			bothWay = false;
			break;
		case primitives.common.ConnectorShapeType.BothWay:
			offsets = [0];
			bothWay = true;
			break;
	}

	minimalGap = Math.max(hasLabel ? labelSize.width : 0, linesOffset * 5);
	if (fromRect.right() + minimalGap < toRect.left() || fromRect.left() > toRect.right() + minimalGap) {
		if (fromRect.left() > toRect.right()) {
			fromPoint = new primitives.common.Point(fromRect.left(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(toRect.right(), toRect.verticalCenter());
		} else {
			fromPoint = new primitives.common.Point(fromRect.right(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(toRect.left(), toRect.verticalCenter());
		}
		if (hasLabel) {
			if (fromRect.left() > toRect.right()) {
				fromLabelPlacement = primitives.common.PlacementType.Left;
				toLabelPlacement = primitives.common.PlacementType.Right;
			} else {
				fromLabelPlacement = primitives.common.PlacementType.Right;
				toLabelPlacement = primitives.common.PlacementType.Left;
			}
		}
		connectorRect = new primitives.common.Rect(fromPoint, toPoint);
		invertY = (fromPoint.y <= toPoint.y);
		invertX = (fromPoint.x < toPoint.x);
		if (connectorRect.height < connectorRect.width) {
			/* horizontal single bended connector between boxes from right side to left side */
			if (connectorRect.height < linesOffset * 2) {
				connectorRect.offset(0, invertY ? linesOffset * 2 : 0, 0, invertY ? 0 : linesOffset * 2);
			}

			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
						toPoint.x, toPoint.y + tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == primitives.common.ConnectorShapeType.OneWay));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				if (labelSize.width < connectorRect.width / 5 * 2) {
					snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()), toPoint.x, toPoint.y, 0.5);
				} else {
					snapPoint = new primitives.common.Point(fromPoint.x, invertY ? connectorRect.top() : connectorRect.bottom());
				}
				labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset : -labelSize.width - linesOffset), (invertY ? snapPoint.y - labelSize.height - linesOffset : snapPoint.y + linesOffset), labelSize.width, labelSize.height);
			}
		} else {
			/* horizontal double bended connector between boxes from right side to left side */
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
						connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), connectorRect.verticalCenter() + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.bottom() : connectorRect.top()) + tempOffset,
						toPoint.x, toPoint.y + tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == primitives.common.ConnectorShapeType.OneWay));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				labelPlacement = new primitives.common.Rect(connectorRect.horizontalCenter() + (invertY != invertX ? linesOffset : -(linesOffset + labelSize.width)),
					connectorRect.verticalCenter() - labelSize.height / 2, labelSize.width, labelSize.height);
			}
		}
	} else {
		if (fromRect.verticalCenter() < toRect.top() || fromRect.verticalCenter() > toRect.bottom()) {
			/* vertical single bended connector between boxes from right side to right side */
			invertX = fromRect.x < panelSize.width / 2;
			fromPoint = new primitives.common.Point(invertX ? fromRect.right() : fromRect.left(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(invertX ? toRect.right() : toRect.left(), toRect.verticalCenter());
			connectorRect = new primitives.common.Rect(fromPoint, toPoint);
			connectorRect.offset(linesOffset * 10, 0, linesOffset * 10, 0);
			invertY = (fromPoint.y <= toPoint.y);
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(invertX ? connectorRect.right() + tempOffset * (invertY ? -1 : 1) : connectorRect.left() - tempOffset * (invertY ? -1 : 1), connectorRect.verticalCenter(),
						invertX ? toRect.right() : toRect.left(), toRect.verticalCenter() - tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == primitives.common.ConnectorShapeType.OneWay));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				});//ignore jslint
			}

			if (hasLabel) {
				fromLabelPlacement = invertX ? primitives.common.PlacementType.Right : primitives.common.PlacementType.Left;
				toLabelPlacement = fromLabelPlacement;

				snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, (invertX ? connectorRect.right() : connectorRect.left()), connectorRect.verticalCenter(), toPoint.x, toPoint.y, 0.5);
				labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset / 2 : -linesOffset / 2 - labelSize.width), snapPoint.y - labelSize.height / 2, labelSize.width, labelSize.height);
			}
		} else {
			fromPoint = new primitives.common.Point(fromRect.horizontalCenter(), fromRect.top());
			toPoint = new primitives.common.Point(toRect.horizontalCenter(), toRect.top());
			connectorRect = new primitives.common.Rect(fromPoint, toPoint);
			connectorRect.offset(0, linesOffset * 7, 0, 0);
			invertX = (fromPoint.x < toPoint.x);
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x + tempOffset, fromPoint.y));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), connectorRect.top() - tempOffset * (invertX ? -1 : 1),
						toRect.horizontalCenter() - tempOffset, toRect.top()));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == primitives.common.ConnectorShapeType.OneWay));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				fromLabelPlacement = primitives.common.PlacementType.Top;
				toLabelPlacement = primitives.common.PlacementType.Top;

				snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), connectorRect.top(), toPoint.x, toPoint.y, 0.5);
				labelPlacement = new primitives.common.Rect(snapPoint.x - labelSize.width / 2, snapPoint.y - (labelOffset + labelSize.height), labelSize.width, labelSize.height);
			}
		}
	}

	if (hasLabel) {
		/* end points labels placement */
		switch (labelPlacementType) {
			case primitives.common.ConnectorLabelPlacementType.From:
				labelPlacement = this._getLabelPosition(fromRect.x, fromRect.y, fromRect.width, fromRect.height, labelPlacement.width, labelPlacement.height, labelOffset, fromLabelPlacement);
				break;
			case primitives.common.ConnectorLabelPlacementType.To:
				labelPlacement = this._getLabelPosition(toRect.x, toRect.y, toRect.width, toRect.height, labelPlacement.width, labelPlacement.height, labelOffset, toLabelPlacement);
				break;
			default:
				break;
		}
	}

	if (onLabelPlacement != null) {
		onLabelPlacement(labelPlacement);
	}
};
