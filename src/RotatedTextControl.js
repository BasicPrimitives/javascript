import Rect from './graphics/structs/Rect';
import createGraphics from './graphics/createGraphics';
import { getFixOfPixelAlignment, getInnerSize } from './graphics/dom';
import JsonML from './common/jsonml-html';
import Transform from './graphics/Transform';
import Shape from './graphics/shapes/Shape';
import AnnotationLabelTemplate from './templates/html/AnnotationLabelTemplate';
import { isNullOrEmpty } from './common';
import RenderEventArgs from './events/RenderEventArgs';

/**
* Creates JavaScript Rotated Text Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders its content
 * inside of that div element.
 * @param {RotatedTextControlConfig} options Rotated Text Annotation Configuration object
 * 
 * @returns {RotatedTextControl} Returns reference to shape annotation control.
 */
export default function RotatedTextControl(element, options) {
  var _data = {
    name: "rotatedtextcontrol",
    element: element,
    options: options,
    placeholder: null,
    panelSize: null,
    graphics: null,
    labelTemplate: null
  };

  if(!element) {
    throw "Control's placeholder element is undefined";
  }

  if(!options) {
    throw "Control's options argument is undefined";
  }

  function createLayout() {
    var viewportSize = getInnerSize(_data.element);
    _data.panelSize = new Rect(0, 0, viewportSize.width, viewportSize.height);
    var pixelAlignmentFix = getFixOfPixelAlignment(element);
    JsonML.appendDOM(_data.element, JsonML.toHTML(
      ["div", /* root control panel */
        {
          "tabindex": 0,
          "style": {
            "position": "relative",
            "overflow": "hidden",
            "top": "0px",
            "left": "0px",
            "width": _data.panelSize.width,
            "height": _data.panelSize.height,
            "padding": "0px",
            "marginBottom": "0px",
            "marginRight": "0px",
            "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
            "marginTop": pixelAlignmentFix.height + "px"
          },
          "name": "placeholder",
          "class": _data.name,
          "$": function (element) { _data.placeholder = element; }
        }
      ])
    );
  
    _data.graphics = createGraphics(_data.element);
  };

  function cleanLayout() {
    if (_data.graphics !== null) {
      _data.graphics.clean();
    }
    _data.graphics = null;

    var placeholder = _data.placeholder;
    if (placeholder != null) {
      var parent = placeholder.parentNode;
      if (parent != null) {
        parent.removeChild(placeholder);
      }
    }
  }

  function updateLayout() {
    var viewportSize = getInnerSize(_data.element),
      pixelAlignmentFix = getFixOfPixelAlignment(_data.element);
    _data.panelSize = new Rect(0, 0, viewportSize.width, viewportSize.height);
    JsonML.applyStyles(_data.placeholder, {
      "width": _data.panelSize.width,
      "height": _data.panelSize.height,
      "marginBottom": "0px",
      "marginRight": "0px",
      "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
      "marginTop": pixelAlignmentFix.height + "px"
    });
  }

  function update(recreate) {
    if (recreate) {
      _data.labelTemplate = AnnotationLabelTemplate(_data.options);
      cleanLayout();
      createLayout();
      redraw();
    }
    else {
      updateLayout();
      _data.graphics.resize("placeholder", _data.panelSize.width, _data.panelSize.height);
      _data.graphics.begin();
      redraw();
      _data.graphics.end();
    }
  }

  function redraw() {
    var config = _data.options;
    _data.graphics.activate("placeholder");

    var attr = {
      "fontSize": options.fontSize + "px",
      "fontFamily": options.fontFamily,
      "fontStyle": options.fontStyle,
      "fontWeight": options.fontWeight,
      "fontColor": options.fontColor
    };

     _data.graphics.text(position.x, position.y, position.width, position.height, config.label, options.orientation, options.horizontalAlignment, options.verticalAlignment, attr);
  }

  function destroy() {
    cleanLayout();
  };


  /**
   * Call this method to update controls configuration. Control uses default Config instance to initialize itself, 
   * so it sets only options provided in the options parameter.
   * 
   * @param {object} options Options
   */
  function setOptions(options) {
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        _data.options[option] = options[option];
      }
    }
  }

  /**
   * This method returns current configuration object.
   * 
   * @returns {object} Returns reference to current configuration object
   */
  function getOptions() {
    return _data.options;
  }

  /**
   * This method returns configuration option by name.
   * 
   * @param {*} option Option name
   */
  function getOption(option) {
    return _data.options[option];
  }

  /**
   * Sets configuration option of the control by name.
   * 
   * @param {*} option Option name
   * @param {*} value Option value
   */
  function setOption(option, value) {
    return _data.options[option] = value;
  }

  update(true); /* init control on create */

  return {
    destroy: destroy,
    setOptions: setOptions,
    getOptions: getOptions,
    setOption: setOption,
    getOption: getOption,
    update: update
  };
};
