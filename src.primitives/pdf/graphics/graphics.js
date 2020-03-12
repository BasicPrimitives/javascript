primitives.pdf.graphics = function (doc) {
  this._doc = doc,
    this._context = this._doc;
  this._dummyPlaceholder = new primitives.common.Placeholder();
};

primitives.pdf.graphics.prototype.clean = function () {

};

primitives.pdf.graphics.prototype.resize = function (name, width, height) {

};

primitives.pdf.graphics.prototype.begin = function () {

};

primitives.pdf.graphics.prototype.end = function () {

};

primitives.pdf.graphics.prototype.reset = function (arg0, arg1) {

};

primitives.pdf.graphics.prototype.activate = function (arg0, arg1) {
  return this._dummyPlaceholder;
};

primitives.pdf.graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {

};

primitives.pdf.graphics.prototype.polylinesBuffer = function (buffer) {
  buffer.loop(this, function (polyline) {
    if (polyline.length() > 0) {
      this.polyline(polyline);
    }
  });
};

primitives.pdf.graphics.prototype.polyline = function (polylineData) {
  var placeholder = this.m_activePlaceholder,
    attr = polylineData.paletteItem.toAttr(),
    step,
    cornerRadius,
    doc = this._doc;

  doc.save();
  polylineData.loop(this, function (segment) {
    switch (segment.segmentType) {
      case primitives.common.SegmentType.Move:
        doc.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case primitives.common.SegmentType.Line:
        doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case primitives.common.SegmentType.Dot:
        if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
          // circle dot
          doc.roundedRect(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, segment.width, segment.height, Math.min(segment.width, segment.height) / 2.0);
        } else if (segment.cornerRadius === 0) {
          // square
          doc.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
          doc.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y) + 0.5);
          doc.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height) + 0.5);
          doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + segment.height) + 0.5);
          doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        } else {
          // rounded corners rectangle
          cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
          doc.roundedRect(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, segment.width, segment.height, cornerRadius);
        }
        break;
      case primitives.common.SegmentType.QuadraticArc:
        doc.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case primitives.common.SegmentType.CubicArc:
        doc.bezierCurveTo(Math.round(segment.cpX1) + 0.5,
          Math.round(segment.cpY1) + 0.5,
          Math.round(segment.cpX2) + 0.5,
          Math.round(segment.cpY2) + 0.5,
          Math.round(segment.x) + 0.5,
          Math.round(segment.y) + 0.5);
        break;
    }
  });

  doc.lineJoin('round');

  if (attr.lineType != null) {
    step = Math.round(attr.lineWidth) || 1;
    switch (attr.lineType) {
      case primitives.common.LineType.Solid:
        break;
      case primitives.common.LineType.Dotted:
        doc.dash(step, step * 2);
        break;
      case primitives.common.LineType.Dashed:
        doc.dash(step * 5, step * 3);
        break;
    }
  }

  if (attr.lineWidth !== undefined && attr.fillColor !== undefined) {
    doc
      .lineWidth(attr.lineWidth)
      .fillOpacity(attr.opacity)
      .fillAndStroke(attr.fillColor, attr.borderColor);
  }
  else if (attr.lineWidth !== undefined) {
    doc
      .lineWidth(attr.lineWidth)
      .stroke(attr.borderColor);
  }
  else if (attr.fillColor !== undefined) {
    doc
      .fillOpacity(attr.opacity)
      .fillColor(attr.fillColor);
  }
  doc.restore();
};


primitives.pdf.graphics.prototype.rightAngleLine = function (fromX, fromY, toX, toY, attr) {

};

primitives.pdf.graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
  var gap = 0;

  if (attr !== null) {
    if (attr.borderWidth !== undefined) {
      gap = this.getPxSize(attr.borderWidth);
    }
  }

  var position = new primitives.common.Rect(x + contentx, y + contenty, contentWidth - gap, contentHeight - gap);

  if (uiHash == null) {
    uiHash = new primitives.common.RenderEventArgs();
  }

  if (onRenderTemplate !== null) {
    onRenderTemplate(this._doc, position, uiHash);
  }
};

primitives.pdf.graphics.prototype.getPxSize = function (value, base) {
  var result = value;
  if (typeof value === "string") {
    if (value.indexOf("pt") > 0) {
      result = parseInt(value, 10) * 96 / 72;
    }
    else if (value.indexOf("%") > 0) {
      result = parseFloat(value) / 100.0 * base;
    }
    else {
      result = parseInt(value, 10);
    }
  }
  return result;
};