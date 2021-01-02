import Placeholder from './Placeholder';
import { SegmentType, LineType } from '../enums';
import Rect from './structs/Rect';
import Size from './structs/Size';
import RenderEventArgs from '../events/RenderEventArgs';

export default function PdfGraphics(doc) {
  this._doc = doc,
  this._context = this._doc;
  this.m_placeholders = {};
  this.m_activePlaceholder = null;
  this.saveCounter = 0;
};

PdfGraphics.prototype.clean = function () {
  while(this.saveCounter) {
    this.saveCounter--;
    this._doc.restore();
  }
};

PdfGraphics.prototype.resize = function (name, width, height) {
  var placeholder = this.m_placeholders[name];
  if(!placeholder) {
    placeholder = new Placeholder(name);;
    placeholder.size = new Size(0, 0);
    placeholder.rect = new Rect(0, 0, 0, 0);
    this.m_placeholders[name] = placeholder;
  }
  placeholder.size = new Size(width, height);
  placeholder.rect = new Rect(placeholder.rect.x, placeholder.rect.y, width, height);
};

PdfGraphics.prototype.position = function (name, left, top, width, height) {
  this.resize(name, width, height);

  var placeholder = this.m_placeholders[name];
  placeholder.rect.x = left;
  placeholder.rect.y = top;
};

PdfGraphics.prototype.begin = function () {

};

PdfGraphics.prototype.end = function () {

};

PdfGraphics.prototype.reset = function (arg0, arg1) {

};

PdfGraphics.prototype.activate = function (name, layer) {
  if(!this.m_placeholders[name]) {
    this.resize(name, 0, 0);
  }
  this.m_activePlaceholder = this.m_placeholders[name];

  var { x, y } = this.m_activePlaceholder.rect;
  while(this.saveCounter) {
    this.saveCounter--;
    this._doc.restore();
  }
  this._doc.save();
  this.saveCounter++;
  this._doc.translate(x, y);

  return this.m_activePlaceholder;
};

PdfGraphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {

};

PdfGraphics.prototype.polylinesBuffer = function (buffer) {
  buffer.loop(this, function (polyline) {
    if (polyline.length() > 0) {
      this.polyline(polyline);
    }
  });
};

PdfGraphics.prototype.polyline = function (polylineData) {
  var placeholder = this.m_activePlaceholder,
    attr = polylineData.paletteItem.toAttr(),
    step,
    cornerRadius,
    doc = this._doc;

  doc.save();
  polylineData.loop(this, function (segment) {
    switch (segment.segmentType) {
      case SegmentType.Move:
        doc.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Line:
        doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Dot:
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
      case SegmentType.QuadraticArc:
        doc.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
        break;
      case SegmentType.CubicArc:
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
      case LineType.Solid:
        break;
      case LineType.Dotted:
        doc.dash(step, step * 2);
        break;
      case LineType.Dashed:
        doc.dash(step * 5, step * 3);
        break;
    }
  }

  if (attr.lineWidth !== undefined && attr.fillColor !== undefined) {
    doc
      .lineWidth(attr.lineWidth)
      .fillColor(attr.fillColor, attr.opacity)
      .strokeColor(attr.borderColor)
      .fillAndStroke();
  }
  else if (attr.lineWidth !== undefined) {
    doc
      .lineWidth(attr.lineWidth)
      .stroke(attr.borderColor);
  }
  else if (attr.fillColor !== undefined) {
    doc.fillColor(attr.fillColor, attr.opacity);
  }
  doc.restore();
};


PdfGraphics.prototype.rightAngleLine = function (fromX, fromY, toX, toY, attr) {

};

PdfGraphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
  var gap = 0;

  if (attr !== null) {
    if (attr.borderWidth !== undefined) {
      gap = this.getPxSize(attr.borderWidth);
    }
  }

  var position = new Rect(x + contentx, y + contenty, contentWidth - gap, contentHeight - gap);

  if (uiHash == null) {
    uiHash = new RenderEventArgs();
  }

  if (onRenderTemplate !== null) {
    onRenderTemplate(this._doc, position, uiHash);
  }
};

PdfGraphics.prototype.getPxSize = function (value, base) {
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