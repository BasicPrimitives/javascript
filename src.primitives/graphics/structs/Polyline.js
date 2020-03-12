primitives.common.Polyline = function (newPaletteItem) {
  var paletteItem = new primitives.common.PaletteItem(),
    segments = [],
    self,
    arrowPaletteItem;

  switch (arguments.length) {
    case 1:
      paletteItem = newPaletteItem;
      break;
  }

  arrowPaletteItem = new primitives.common.PaletteItem({
    lineColor: paletteItem.lineColor,
    lineWidth: 0,
    fillColor: paletteItem.lineColor,
    opacity: paletteItem.opacity || 1
  });

  function getStartPoint() {
    var result = null;
    if (segments.length > 0) {
      result = segments[0].getEndPoint();
    }
    return result;
  }

  function getEndPoint() {
    var result = null;
    if (segments.length > 0) {
      result = segments[segments.length - 1].getEndPoint();
    }
    return result;
  }

  function addSegment(segment) {
    segments.push(segment);
  }

  function addSegments(newSegments) {
    var index, len;
    for (index = 0, len = newSegments.length; index < len; index += 1) {
      segments.push(newSegments[index]);
    }
  }

  function mergeTo(polyline) {
    polyline.addSegments(segments);
  }

  function clone() {
    var index, len,
      result = new primitives.common.Polyline(paletteItem),
      cloneSegments = [],
      segment;
    for (index = 0, len = segments.length; index < len; index += 1) {
      segment = segments[index];
      cloneSegments.push(segment.clone());
    }
    result.addSegments(cloneSegments);
    return result;
  }

  function length() {
    return segments.length;
  }

  function loop(thisArg, onItem) {
    var index, len,
      segment;
    if (onItem != null) {
      for (index = 0, len = segments.length; index < len; index += 1) {
        segment = segments[index];
        if (segment) {
          if (onItem.call(thisArg, segment, index)) {
            break;
          }
        }
      }
    }
  }

  function loopReversed(thisArg, onItem) {
    var index,
      segment;
    if (onItem != null) {
      for (index = segments.length - 1; index >= 0; index -= 1) {
        segment = segments[index];
        if (segment) {
          if (onItem.call(thisArg, segment, index)) {
            break;
          }
        }
      }
    }
  }

  function transform(transformArg, forward) {
    loop(this, function (segment) {
      if (segment.transform != null) {
        segment.transform(transformArg, forward);
      }
    });
  }

  function isInvertable() {
    return primitives.common.isNullOrEmpty(paletteItem.fillColor);
  }

  function addInverted(polyline) {
    var hasMoved = false,
      stack = [];

    if (isInvertable()) {
      polyline.loopReversed(this, function (segment, index) {
        if (segment.segmentType != primitives.common.SegmentType.Dot) {
          if (!hasMoved) {
            segments.push(new primitives.common.MoveSegment(segment.getEndPoint()));
            hasMoved = true;
          }
          stack.unshift(segment);

          if (stack.length > 1) {
            stack[1].invert(stack[0].getEndPoint());
            segments.push(stack[1]);
            stack.length = 1;
          }

        }
      });
    } else {
      polyline.mergeTo(self);
    }
  }

  function _getArrow(fromX, fromY, toX, toY, length, width) {
    var result = new primitives.common.Polyline(arrowPaletteItem),
      index, len,
      point, x, y,
      perimiter = [new primitives.common.Point(length, -width / 2),
      new primitives.common.Point(0, 0),
      new primitives.common.Point(length, width / 2),
      new primitives.common.Point(length / 4 * 3, 0)
      ],
      angle = Math.atan2((fromY - toY), (fromX - toX));

    /* rotate and translate points */
    for (index = 0, len = perimiter.length; index < len; index += 1) {
      point = perimiter[index];
      x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
      y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
      point.x = x + toX;
      point.y = y + toY;
    }

    /* create arrow shape*/
    result.addSegment(new primitives.common.MoveSegment(perimiter[0].x, perimiter[0].y));
    result.addSegment(new primitives.common.LineSegment(perimiter[1].x, perimiter[1].y));
    result.addSegment(new primitives.common.LineSegment(perimiter[2].x, perimiter[2].y));
    result.addSegment(new primitives.common.QuadraticArcSegment(perimiter[3].x, perimiter[3].y, perimiter[0].x, perimiter[0].y));

    return result;
  }

  function addOffsetArrow(forward, lineWidth, offsetPercent, minimumDistance, onAddArrowSegments) {
    var prevEndPoint,
      currentEndPoint,
      currentSegment,
      newEndPoint, newPrevEndPoint,
      polyline,
      len = segments.length,
      arrowTipLength = lineWidth * 3,
      arrowTipWidth = lineWidth * 2,
      offset,
      distance;

    switch (lineWidth) {
      case 1:
        arrowTipLength = 8;
        arrowTipWidth = 6;
        break;
      case 2:
        arrowTipLength = 12;
        arrowTipWidth = 8;
        break;
      case 3:
        arrowTipLength = 16;
        arrowTipWidth = 10;
        break;
    }

    if (onAddArrowSegments != null && len > 1) {
      prevEndPoint = segments[len - 2].getEndPoint();
      currentSegment = segments[len - 1];
      if (currentSegment.offsetPoint != null) {
        currentEndPoint = new primitives.common.Point(currentSegment.getEndPoint());

        distance = prevEndPoint.distanceTo(currentEndPoint);
        if (distance > minimumDistance) {
          offset = distance * offsetPercent;

          if (forward) {
            newEndPoint = currentSegment.offsetPoint(prevEndPoint, currentEndPoint, offset);
            polyline = _getArrow(prevEndPoint.x, prevEndPoint.y, newEndPoint.x, newEndPoint.y, arrowTipLength, arrowTipWidth);
          } else {
            newPrevEndPoint = currentSegment.offsetPoint(currentEndPoint, prevEndPoint, offset);
            polyline = _getArrow(currentEndPoint.x, currentEndPoint.y, newPrevEndPoint.x, newPrevEndPoint.y, arrowTipLength, arrowTipWidth);
          }
          onAddArrowSegments(polyline);
        }
      }
    }
  }

  function addArrow(lineWidth, onAddArrowSegments) {
    var prevEndPoint,
      currentEndPoint,
      currentSegment,
      newEndPoint,
      polyline,
      len = segments.length,
      arrowTipLength = lineWidth * 3,
      arrowTipWidth = lineWidth * 2;

    switch (lineWidth) {
      case 1:
        arrowTipLength = 8;
        arrowTipWidth = 6;
        break;
      case 2:
        arrowTipLength = 12;
        arrowTipWidth = 8;
        break;
      case 3:
        arrowTipLength = 16;
        arrowTipWidth = 10;
        break;
    }

    if (onAddArrowSegments != null && len > 1) {
      prevEndPoint = segments[len - 2].getEndPoint();
      currentSegment = segments[len - 1];
      if (currentSegment.trim != null) {
        currentEndPoint = new primitives.common.Point(currentSegment.getEndPoint());
        if (currentEndPoint.distanceTo(prevEndPoint) > arrowTipLength) {
          newEndPoint = currentSegment.trim(prevEndPoint, arrowTipLength);

          polyline = _getArrow(newEndPoint.x, newEndPoint.y, currentEndPoint.x, currentEndPoint.y, arrowTipLength, arrowTipWidth);
          onAddArrowSegments(polyline, newEndPoint);
        }
      }
    }
  }

  function optimizeMoveSegments() {
    var index, len,
      cursorIndex,
      key,
      optimizedSegments,
      segment, nextSegment,
      links = {},
      jumps = [],
      processed = [];

    for (index = 0, len = segments.length; index < len - 1; index += 1) {
      segment = segments[index];
      nextSegment = segments[index + 1];
      switch (segment.segmentType) {
        case primitives.common.SegmentType.Line:
        case primitives.common.SegmentType.QuadraticArc:
        case primitives.common.SegmentType.CubicArc:
          switch (nextSegment.segmentType) {
            case primitives.common.SegmentType.Move:
            case primitives.common.SegmentType.Dot:
              key = segment.x + "&" + segment.y;
              if (!links.hasOwnProperty(key)) {
                links[key] = index;
              }
              break;
            default:
              break;
          }
          break;
        case primitives.common.SegmentType.Move:
          key = segment.x + "&" + segment.y;
          if (links.hasOwnProperty(key) && !jumps[links[key]]) {
            jumps[links[key]] = index + 1;
            processed[index] = true;
          }
          break;
        default:
          break;
      }
    }
    optimizedSegments = [];
    for (index = 0; index < len; index += 1) {
      if (!processed[index]) {
        segment = segments[index];
        optimizedSegments.push(segment);
        processed[index] = true;

        if (jumps[index] > 0) {
          cursorIndex = jumps[index];
          while (cursorIndex < len && !processed[cursorIndex]) {
            segment = segments[cursorIndex];
            optimizedSegments.push(segment);
            processed[cursorIndex] = true;

            if (jumps[cursorIndex] > 0) {
              cursorIndex = jumps[cursorIndex];
            } else {
              cursorIndex += 1;
            }
          }
        }
      }
    }
    segments = optimizedSegments;
  }

  function toString() {
    return paletteItem.toString();
  }

  /* private classes */
  function Vertex(segment, pointIndex) {
    this.segment = segment;
    this.pointIndex = pointIndex;
  }

  Vertex.prototype.pushToSegment = function (point) {
    this.segment.setPoint(point, this.pointIndex);
  };

  function _joinVectors(prev, current, offset, polyline, isLoop) {
    var relationType = prev.relateTo(current),
      offset2 = isLoop ? 0 : offset,
      joinSegment,
      joinVector,
      newToPoint;
    if (relationType == primitives.common.VectorRelationType.Collinear) {
      /* Vectors are collinear vectors so we don't search for intersection */
      current.offset(offset2);
    } else {
      if (relationType == primitives.common.VectorRelationType.Opposite && current.from.context.pointIndex === 0) {
        /* Vectors are opposite vectors which belong to 2 different segments
          so we add an extra line segment in between of them
        */
        joinSegment = new primitives.common.LineSegment(current.from);
        polyline.addSegment(joinSegment);

        current.offset(offset2);

        newToPoint = current.from.clone();
        newToPoint.context = new Vertex(joinSegment, 0);

        joinVector = new primitives.common.Vector(prev.to.clone(), newToPoint);
        if (!isLoop) {
          current.from = newToPoint.clone();
        }

        joinVector.offset(offset);
        joinVector.intersect(prev);
        joinVector.from.context.pushToSegment(joinVector.from);
        current.intersect(joinVector);

        if (isLoop) {
          joinVector.to.context.pushToSegment(joinVector.to);
        }
      } else {
        current.offset(offset2);
        current.intersect(prev);
      }
    }
    current.from.context.pushToSegment(current.from);
  }

  function _closeVector(vectorStack, startVectors, offset, polyline) {
    var startVector,
      prevVector = vectorStack[0],
      closurePoint = prevVector.to.context.segment.getEndPoint().toString();
    if (startVectors.hasOwnProperty(closurePoint)) {
      startVector = startVectors[closurePoint];

      _joinVectors(prevVector, startVector, offset, polyline, true);

      delete startVectors[closurePoint];
    }
    prevVector.to.context.pushToSegment(prevVector.to);
    vectorStack.length = 0;
  }

  function getOffsetPolyine(offset) {
    var result = new primitives.common.Polyline(paletteItem),
      startVectors = {},
      pointStack = [],
      vectorStack = [];

    loop(this, function (segment) {
      var newSegment = segment.clone(),
        newPoint;

      switch (newSegment.segmentType) {
        case primitives.common.SegmentType.Dot:
        case primitives.common.SegmentType.Move:
          if (vectorStack.length > 0) {
            _closeVector(vectorStack, startVectors, offset, result);
          }
          pointStack.length = 0;
          if (newSegment.segmentType == primitives.common.SegmentType.Move) {
            newPoint = new primitives.common.Point(newSegment);
            newPoint.context = new Vertex(newSegment, 0);
            pointStack.push(newPoint);
          }
          break;
        default:
          newSegment.loop(this, function (x, y, index) {
            var newPoint = new primitives.common.Point(x, y),
              current,
              prev,
              closurePoint;

            newPoint.context = new Vertex(newSegment, index);
            pointStack.unshift(newPoint);
            if (pointStack.length > 1) {
              vectorStack.unshift(new primitives.common.Vector(pointStack[1].clone(), pointStack[0].clone()));
              pointStack.length = 1;
            }

            switch (vectorStack.length) {
              case 1:
                /* first Vector in stack we add to start Vectors collection for possible join into perimiter*/
                current = vectorStack[0];
                closurePoint = current.from.toString();
                startVectors[closurePoint] = current;
                current.offset(offset);
                current.from.context.pushToSegment(current.from);
                break;
              case 2:
                prev = vectorStack[1];
                current = vectorStack[0];

                _joinVectors(prev, current, offset, result, false);

                vectorStack.length = 1;
                break;
              default:
                break;
            }
          });
          break;
      }
      result.addSegment(newSegment);
    });
    if (vectorStack.length > 0) {
      _closeVector(vectorStack, startVectors, offset, result);
    }
    return result;
  }

  self = {
    paletteItem: paletteItem,
    arrowPaletteItem: arrowPaletteItem,
    addSegment: addSegment,
    addSegments: addSegments,
    mergeTo: mergeTo,
    length: length,
    loop: loop,
    loopReversed: loopReversed,
    transform: transform,
    isInvertable: isInvertable,
    addInverted: addInverted,
    addArrow: addArrow,
    addOffsetArrow: addOffsetArrow,
    optimizeMoveSegments: optimizeMoveSegments,
    getOffsetPolyine: getOffsetPolyine,
    toString: toString,
    getStartPoint: getStartPoint,
    getEndPoint: getEndPoint,
    clone: clone
  };

  return self;
};