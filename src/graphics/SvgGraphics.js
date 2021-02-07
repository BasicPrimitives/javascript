import Graphics from './Graphics';
import Element from './Element';
import { LineType, SegmentType } from '../enums';
import JsonML from '../common/jsonml-html';

export default function SvgGraphics(element) {
  this.parent = Graphics.prototype;

  this.parent.constructor.apply(this, arguments);

  this._svgxmlns = "http://www.w3.org/2000/svg";
};

SvgGraphics.prototype = new Graphics();

SvgGraphics.prototype.clean = function () {
  var key,
    placeholder,
    layerKey,
    layer;
  for (key in this.m_placeholders) {
    if (this.m_placeholders.hasOwnProperty(key)) {
      placeholder = this.m_placeholders[key];
      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          if (layer.svgcanvas !== null) {
            layer.svgcanvas.parentNode.removeChild(layer.svgcanvas);
            layer.svgcanvas = null;
          }
        }
      }
    }
  }
  this.parent.clean.apply(this, arguments);
};

SvgGraphics.prototype.resizePlaceholder = function (placeholder, left, top, width, height) {
  var layerKey,
    layer;

  this.parent.resizePlaceholder.apply(this, arguments);

  for (layerKey in placeholder.layers) {
    if (placeholder.layers.hasOwnProperty(layerKey)) {
      layer = placeholder.layers[layerKey];
      if (layer.svgcanvas !== null) {
        JsonML.applyStyles(layer.svgcanvas, {
          "position": "absolute",
          "width": width + "px",
          "height": height + "px"
        });
        layer.svgcanvas.setAttribute('viewBox', "0 0 " + width + " " + height);
      }
    }
  }
};

SvgGraphics.prototype._getCanvas = function () {
  var placeholder = this.m_activePlaceholder,
    layer = placeholder.activeLayer,
    panelSize = placeholder.rect;
  if (layer.svgcanvas === null) {
    layer.svgcanvas = document.createElementNS(this._svgxmlns, "svg");
    layer.svgcanvas.setAttribute("viewBox", panelSize.x + " " + panelSize.y + " " + panelSize.width + " " + panelSize.height);
    JsonML.applyStyles(layer.svgcanvas, {
      "width": panelSize.width + "px",
      "height": panelSize.height + "px"
    });

    this.prepend(placeholder.activeLayer.canvas, layer.svgcanvas);
  }

  return layer.svgcanvas;
};

SvgGraphics.prototype.polyline = function (polylineData) {
  var placeholder = this.m_activePlaceholder,
    polyline,
    data,
    attr = polylineData.paletteItem.toAttr(),
    element,
    svgcanvas,
    step,
    radius,
    cornerRadius;


  polyline = new Element(this._svgxmlns, "path");
  if (attr.fillColor !== undefined) {
    polyline.setAttribute("fill", attr.fillColor);
    polyline.setAttribute("fill-opacity", attr.opacity);
  }
  else {
    polyline.setAttribute("fill-opacity", 0);
  }

  if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
    polyline.setAttribute("stroke", attr.borderColor);
    polyline.setAttribute("stroke-width", attr.lineWidth);

    if (attr.opacity !== undefined) {
      polyline.setAttribute("stroke-opacity", attr.opacity);
    } else {
      polyline.setAttribute("stroke-opacity", 1);
    }
  } else {
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("stroke-width", 0);
  }

  if (attr.lineType != null) {
    step = Math.round(attr.lineWidth) || 1;
    switch (attr.lineType) {
      case LineType.Solid:
        polyline.setAttribute("stroke-dasharray", "");
        break;
      case LineType.Dotted:
        polyline.setAttribute("stroke-dasharray", step + "," + step);
        break;
      case LineType.Dashed:
        polyline.setAttribute("stroke-dasharray", (step * 5) + "," + (step * 3));
        break;
    }
  }

  data = "";
  polylineData.loop(this, function (segment) {
    switch (segment.segmentType) {
      case SegmentType.Move:
        data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Line:
        data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.QuadraticArc:
        data += "Q" + (Math.round(segment.cpX) + 0.5) + " " + (Math.round(segment.cpY) + 0.5) + " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Dot:
        // A rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y
        if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
          // dot
          radius = segment.width / 2.0;
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
          data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
          data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
        } else if (segment.cornerRadius === 0) {
          // square
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        } else {
          cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
        }
        break;
      case SegmentType.CubicArc:
        data += "C" + (Math.round(segment.cpX1) + 0.5) + " " + (Math.round(segment.cpY1) + 0.5) +
          " " + (Math.round(segment.cpX2) + 0.5) + " " + (Math.round(segment.cpY2) + 0.5) +
          " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
    }
  });

  polyline.setAttribute("d", data);
  element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "path");
  if (element === null) {
    element = polyline.create();
    svgcanvas = this._getCanvas();
    svgcanvas.appendChild(element);
    this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "path", element);
  }
  else {
    polyline.update(element);
  }
};