import Cache from './Cache';
import { Layers } from '../enums';
import { loop, getHashCode, mergeObjects } from '../common';
import { TextOrientationType, VerticalAlignmentType, RenderingMode } from '../enums';
import JsonML from '../common/jsonml-html';
import Size from './structs/Size';
import Rect from './structs/Rect';
import Placeholder from './Placeholder';
import Layer from './Layer';
import { getInnerSize } from './dom';
import RenderEventArgs from '../events/RenderEventArgs';
import { getTextAlign, getVerticalAlignment } from './EnumValues';

export default function Graphics(element) {
  this.m_element = element;

  this.m_placeholders = {};
  this.m_activePlaceholder = null;

  this.m_cache = new Cache();

  this.debug = false;
  this.layerNames = {};

  loop(this, Layers, function (key, value) {
    this.layerNames[value] = key;
  });
};

Graphics.prototype.clean = function () {
  var key,
    placeholder,
    layerKey,
    layer;
  this.m_cache.clear();

  this.m_cache = null;

  this.m_element = null;
  for (key in this.m_placeholders) {
    if (this.m_placeholders.hasOwnProperty(key)) {
      placeholder = this.m_placeholders[key];

      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          layer.canvas.parentNode.removeChild(layer.canvas);
          layer.canvas = null;
        }
      }
      placeholder.layers.length = 0;
      placeholder.activeLayer = null;

      placeholder.size = null;
      placeholder.rect = null;
      placeholder.div = null;
    }
  }
  this.m_placeholders.length = 0;
  this.m_activePlaceholder = null;
};

Graphics.prototype.resize = function (name, width, height) {
  var placeholder = this.m_placeholders[name];
  if (placeholder === undefined) {
    placeholder = this._activatePlaceholder(name);
  }
  this.resizePlaceholder(placeholder, 0, 0, width, height);
};

Graphics.prototype.position = function (name, left, top, width, height) {
  var placeholder = this.m_placeholders[name];
  if (placeholder === undefined) {
    placeholder = this._activatePlaceholder(name);
  }
  this.resizePlaceholder(placeholder, left, top, width, height);
};

Graphics.prototype.show = function (name) {
  var placeholder = this.m_placeholders[name];
  if (placeholder != null) {
    JsonML.applyStyles(placeholder.div, {
      display: "inherit",
      visibility: "inherit"
    });
  }
};

Graphics.prototype.hide = function (name) {
  var placeholder = this.m_placeholders[name];
  if (placeholder != null) {
    JsonML.applyStyles(placeholder.div, {
      "display": "none",
      "visibility": "hidden"
    });
  }
};

Graphics.prototype.resizePlaceholder = function (placeholder, left, top, width, height) {
  var layerKey,
    layer;

  placeholder.size = new Size(width, height);
  placeholder.rect = new Rect(left, top, width, height);

  JsonML.applyStyles(placeholder.div, placeholder.rect.getCSS());
  for (layerKey in placeholder.layers) {
    if (placeholder.layers.hasOwnProperty(layerKey)) {
      layer = placeholder.layers[layerKey];
      if (layer.name !== -1) {
        JsonML.applyStyles(layer.canvas, {
          "position": "absolute",
          "width": "0px",
          "height": "0px"
        });
      }
    }
  }
};

Graphics.prototype.begin = function () {
  this.m_cache.begin();
};

Graphics.prototype.end = function () {
  this.m_cache.end();
};


Graphics.prototype.reset = function (arg0, arg1) {
  var placeholderName = "none",
    layerName = -1;
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
  this.m_cache.reset(placeholderName, layerName);
};

Graphics.prototype.activate = function (arg0, arg1) {
  switch (arguments.length) {
    case 1:
      if (typeof arg0 === "string") {
        this._activatePlaceholder(arg0);
        this._activateLayer(-1);
      }
      else {
        this._activatePlaceholder("none");
        this._activateLayer(arg0);
      }
      break;
    case 2:
      this._activatePlaceholder(arg0);
      this._activateLayer(arg1);
      break;
  }
  return this.m_activePlaceholder;
};

Graphics.prototype._activatePlaceholder = function (placeholderName) {
  var placeholder = this.m_placeholders[placeholderName],
    div, divs;
  if (placeholder === undefined) {
    div = null;
    if (placeholderName === "none") {
      div = this.m_element;
    }
    else {
      divs = this.m_element.getElementsByClassName(placeholderName);
      div = divs.length > 0 ? divs[0] : this.m_element;
    }

    placeholder = new Placeholder(placeholderName);
    placeholder.div = div;
    placeholder.size = getInnerSize(div);
    placeholder.rect = new Rect(0, 0, placeholder.size.width, placeholder.size.height);

    this.m_placeholders[placeholderName] = placeholder;
  }
  this.m_activePlaceholder = placeholder;
  return this.m_activePlaceholder;
};

Graphics.prototype._activateLayer = function (layerName) {
  var layer = this.m_activePlaceholder.layers[layerName],
    placeholder,
    canvas,
    position,
    maximumLayer,
    layerKey;
  if (layer === undefined) {
    placeholder = this.m_activePlaceholder;
    if (layerName === -1) {
      layer = new Layer(layerName);
      layer.canvas = placeholder.div;
    }
    else {
      canvas = JsonML.toHTML(["div",
        {
          "style": {
            "position": "absolute",
            "width": "0px",
            "height": "0px"
          },
          "class": ["Layer" + layerName, "Layer" + this.layerNames[layerName]]
        }
      ]);

      maximumLayer = null;
      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          if (layer.name < layerName) {
            maximumLayer = (maximumLayer !== null) ? Math.max(maximumLayer, layer.name) : layer.name;
          }
        }
      }

      layer = new Layer(layerName);
      layer.canvas = canvas;

      if (maximumLayer === null) {
        this.prepend(placeholder.div, layer.canvas);
      } else {
        this.insertAfter(placeholder.layers[maximumLayer].canvas, layer.canvas);
      }
    }
    placeholder.layers[layerName] = layer;
  }
  this.m_activePlaceholder.activeLayer = layer;
};

Graphics.prototype.prepend = function (parent, newElement) {
  if (parent.firstChild == null) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, parent.firstChild);
  }
};

Graphics.prototype.insertAfter = function (insertAfterElement, newElement) {
  var parent = insertAfterElement.parentNode;
  if (parent.lastChild == insertAfterElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, insertAfterElement.nextSibling);
  }
};

Graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {
  var placeholder = this.m_activePlaceholder,
    style = {
      "position": "absolute",
      "padding": 0,
      "margin": 0,
      "textAlign": getTextAlign(horizontalAlignment),
      "fontSize": attr.fontSize,
      "fontFamily": attr.fontFamily,
      "fontWeight": attr.fontWeight,
      "fontStyle": attr.fontStyle,
      "color": attr.fontColor,
      "lineHeight": 1
    },
    rotation = "",
    element,
    tdstyle;

  switch (orientation) {
    case TextOrientationType.Horizontal:
    case TextOrientationType.Auto:
      style.left = x + "px";
      style.top = y + "px";
      style.width = width + "px";
      style.height = height + "px";
      break;
    case TextOrientationType.RotateLeft:
      style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
      style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
      style.width = height + "px";
      style.height = width + "px";
      rotation = "rotate(-90deg)";
      break;
    case TextOrientationType.RotateRight:
      style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
      style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
      style.width = height + "px";
      style.height = width + "px";
      rotation = "rotate(90deg)";
      break;
  }

  style["-webkit-transform-origin"] = "center center";
  style["-moz-transform-origin"] = "center center";
  style["-o-transform-origin"] = "center center";
  style["-ms-transform-origin"] = "center center";


  style["-webkit-transform"] = rotation;
  style["-moz-transform"] = rotation;
  style["-o-transform"] = rotation;
  style["-ms-transform"] = rotation;
  style.transform = rotation;


  style.maxWidth = style.width;
  style.maxHeight = style.height;

  label = label.replace(new RegExp("\n", 'g'), "<br/>");
  switch (verticalAlignment) {
    case VerticalAlignmentType.Top:
      if (this.debug) {
        style.border = "solid 1px black";
      }
      element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "text");
      if (element === null) {
        element = JsonML.toHTML(["div",
          {
            "style": style,
            $: function (element) { element.innerHTML = label; }
          }
        ]);
        placeholder.activeLayer.canvas.appendChild(element);
        this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "text", element);
      }
      else {
        JsonML.applyStyles(element, style);
        element.innerHTML = label;
      }
      break;
    default:
      style.borderCollapse = "collapse";
      tdstyle = {
        "verticalAlign": getVerticalAlignment(verticalAlignment),
        "padding": 0
      };
      if (this.debug) {
        tdstyle.border = "solid 1px black";
      }
      element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "textintable");
      if (element === null) {
        element = JsonML.toHTML(["table",
          {
            "style": style
          },
          ["tbody",
            ["tr",
              ["td",
                {
                  "style": tdstyle,
                  $: function (element) { element.innerHTML = label; }
                }
              ]
            ]
          ]
        ]);
        placeholder.activeLayer.canvas.appendChild(element);
        this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "textintable", element);
      }
      else {
        JsonML.applyStyles(element, style);
        var td = element.getElementsByTagName("td")[0];
        JsonML.applyStyles(td, tdstyle);
        td.innerHTML = label;
      }
      break;
  }
};

Graphics.prototype.polylinesBuffer = function (buffer) {
  buffer.loop(this, function (polyline) {
    if (polyline.length() > 0) {
      this.polyline(polyline);
    }
  });
};


Graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
  var placeholder = this.m_activePlaceholder,
    element,
    templateKey = "template" + ((hashCode !== null) ? hashCode : getHashCode(template)),
    gap = 0,
    style;

  element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, templateKey);

  if (attr !== null) {
    if (attr.borderWidth !== undefined) {
      attr.borderWidth = attr.borderWidth.toString();
      gap = this.getPxSize(attr.borderWidth);
    }
  }

  style = {
    "width": (contentWidth - gap) + "px",
    "height": (contentHeight - gap) + "px",
    "top": (y + contenty) + "px",
    "left": (x + contentx) + "px"
  };

  mergeObjects(style, attr);

  if (uiHash == null) {
    uiHash = new RenderEventArgs();
  }

  uiHash.x = x + contentx;
  uiHash.y = y + contenty;
  uiHash.width = contentWidth - gap;
  uiHash.height = contentHeight - gap;

  if (element == null) {
    element = this.getElementByTemplate(template);
    style = mergeObjects(style, {
      "position": "absolute",
      "padding": "0px",
      "margin": "0px"
    }, attr);
    JsonML.applyStyles(element, style);

    uiHash.element = element;
    uiHash.renderingMode = RenderingMode.Create;

    if (onRenderTemplate !== null) {
      onRenderTemplate(null, uiHash);
    }
    placeholder.activeLayer.canvas.appendChild(element);
    this.m_cache.put(placeholder.name, placeholder.activeLayer.name, templateKey, element);
  } else {
    uiHash.element = element;
    uiHash.renderingMode = RenderingMode.Update;
    JsonML.applyStyles(element, style);
    if (onRenderTemplate !== null) {
      onRenderTemplate(null, uiHash);
    }
  }
  return element;
};

Graphics.prototype.getElementByTemplate = function (template) {
  var result = null;
  if (Array.isArray(template)) {
    result = JsonML.toHTML(template);
  } else {
    var parent = document.createElement('div');
    parent.innerHTML = template;
    result = parent.firstChild;
  }
  return result;
};

Graphics.prototype.getPxSize = function (value, base) {
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