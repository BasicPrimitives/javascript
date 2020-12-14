import Graphics from './Graphics';
import { GraphicsType, LineType, SegmentType } from '../enums';

export default function CanvasGraphics(element) {
  this.parent = Graphics.prototype;

  this.parent.constructor.apply(this, arguments);

  this.graphicsType = GraphicsType.Canvas;
  this.m_maximum = 8000; // Search for maximum size of canvas element
};

CanvasGraphics.prototype = new Graphics();

CanvasGraphics.prototype.clean = function () {
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
          if (layer.canvascanvas !== null) {
            layer.canvascanvas.parentNode.removeChild(layer.canvascanvas);
            layer.canvascanvas = null;
          }
        }
      }
    }
  }
  this.parent.clean.apply(this, arguments);
};

CanvasGraphics.prototype._activatePlaceholder = function (placeholderName) {
  var placeholder,
    width,
    height;

  this.parent._activatePlaceholder.apply(this, arguments);

  placeholder = this.m_activePlaceholder;
  width = placeholder.size.width;
  height = placeholder.size.height;
  if (width > this.m_maximum || height > this.m_maximum) {
    placeholder.hasGraphics = false;
  }
  else {
    placeholder.hasGraphics = true;
  }
  return placeholder;
};

CanvasGraphics.prototype.resizePlaceholder = function (placeholder, left, top, width, height) {
  var layerKey,
    layer;

  this.parent.resizePlaceholder.apply(this, arguments);

  for (layerKey in placeholder.layers) {
    if (placeholder.layers.hasOwnProperty(layerKey)) {
      layer = placeholder.layers[layerKey];
      if (layer.canvascanvas !== null) {
        layer.canvascanvas.width = width;
        layer.canvascanvas.height = height;
      }
    }
  }
};

CanvasGraphics.prototype.begin = function () {
  var key,
    placeholder,
    layerKey,
    layer,
    width,
    height;
  this.parent.begin.apply(this);

  for (key in this.m_placeholders) {
    if (this.m_placeholders.hasOwnProperty(key)) {
      placeholder = this.m_placeholders[key];
      width = placeholder.size.width;
      height = placeholder.size.height;
      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];

          if (layer.canvascanvas !== null) {
            layer.canvascontext.clearRect(0, 0, width, height);
          }
        }
      }
    }
  }
};

CanvasGraphics.prototype._getContext = function (placeholder, layer) {
  var width = placeholder.size.width,
    height = placeholder.size.height;

  if (layer.canvascanvas === null) {
    layer.canvascanvas = document.createElement('canvas');
    layer.canvascanvas.width = width;
    layer.canvascanvas.height = height;
    this.prepend(placeholder.activeLayer.canvas, layer.canvascanvas);
    layer.canvascontext = layer.canvascanvas.getContext('2d');
  }
  return layer.canvascontext;
};

CanvasGraphics.prototype.reset = function (arg0, arg1) {
  var placeholderName = "none",
    layerName = -1,
    placeholder,
    layer,
    width,
    height;
  switch (arguments.length) {
    case 1:
      if (typeof arg0 === "string") {
        placeholderName = arg0;
      }
      else {
        layerName = arg0;
      }
      break;
    case 2:
      placeholderName = arg0;
      layerName = arg1;
      break;
  }

  this.parent.reset.apply(this, arguments);

  placeholder = this.m_placeholders[placeholderName];
  if (placeholder !== undefined) {
    width = placeholder.size.width;
    height = placeholder.size.height;
    layer = placeholder.layers[layerName];
    if (layer !== undefined && layer.canvascanvas !== null) {
      layer.canvascontext.clearRect(0, 0, width, height);
    }
  }
};

CanvasGraphics.prototype.polyline = function (polylineData) {
  var placeholder = this.m_activePlaceholder,
    layer,
    context,
    attr = polylineData.paletteItem.toAttr(),
    dashes,
    step,
    cornerRadius;
  if (!placeholder.hasGraphics) {
    this.parent.polyline.apply(this, arguments);
  }
  else {
    layer = placeholder.activeLayer;
    context = this._getContext(placeholder, layer);
    context.save();

    if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
      context.strokeStyle = attr.borderColor;
      context.lineWidth = attr.lineWidth;
    }
    else {
      context.lineWidth = 0;
      context.strokeStyle = "Transparent";
    }

    if (attr.lineType != null) {
      step = Math.round(attr.lineWidth) || 1;
      switch (attr.lineType) {
        case LineType.Solid:
          dashes = [];
          break;
        case LineType.Dotted:
          dashes = [step, step];
          break;
        case LineType.Dashed:
          dashes = [step * 5, step * 3];
          break;
      }

      if (context.setLineDash !== undefined) {
        context.setLineDash(dashes);
      } else if (context.webkitLineDash !== undefined) {
        context.webkitLineDash = dashes;
      } else if (context.mozDash !== undefined) {
        context.mozDash = dashes;
      }
    }

    context.beginPath();

    polylineData.loop(this, function (segment) {
      switch (segment.segmentType) {
        case SegmentType.Move:
          context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
          break;
        case SegmentType.Line:
          context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
          break;
        case SegmentType.Dot:
          if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
            // circle dot
            context.moveTo(Math.round(segment.x) + segment.width + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5);
            context.arc(Math.round(segment.x) + segment.width / 2.0 + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5, Math.round(segment.width / 2.0), 0, 2 * Math.PI, false);
          } else if (segment.cornerRadius === 0) {
            // square
            context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
            context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y) + 0.5);
            context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height) + 0.5);
            context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + segment.height) + 0.5);
            context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
          } else {
            // rounded corners rectangle
            cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));

            context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
            context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI, -Math.PI / 2.0, false);

            context.lineTo(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y) + 0.5);
            context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), -Math.PI / 2.0, 0, false);

            context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5);
            context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), 0, Math.PI / 2.0, false);

            context.lineTo(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height) + 0.5);
            context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI / 2.0, Math.PI, false);

            context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
          }
          break;
        case SegmentType.QuadraticArc:
          context.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
          break;
        case SegmentType.CubicArc:
          context.bezierCurveTo(Math.round(segment.cpX1) + 0.5,
            Math.round(segment.cpY1) + 0.5,
            Math.round(segment.cpX2) + 0.5,
            Math.round(segment.cpY2) + 0.5,
            Math.round(segment.x) + 0.5,
            Math.round(segment.y) + 0.5);
          break;
      }
    });
    if (attr.opacity != null) {
      context.globalAlpha = attr.opacity;
    }
    if (attr.lineWidth !== undefined) {
      context.stroke();
    }
    if (attr.fillColor !== undefined) {
      context.fillStyle = attr.fillColor;
      context.fill();
    }
    context.restore();
  }
};