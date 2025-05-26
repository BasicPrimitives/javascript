import Rect from './graphics/structs/Rect';
import PaletteItem from './graphics/structs/PaletteItem';
import { ConnectorPlacementType } from './enums';
import createGraphics from './graphics/createGraphics';
import { getFixOfPixelAlignment, getInnerSize, getElementOffset } from './graphics/dom';
import JsonML from './common/jsonml-html';
import Transform from './graphics/Transform';
import PolylinesBuffer from './graphics/structs/PolylinesBuffer';
import ConnectorAnnotationOffsetResolver from './tasks/renders/offsetResolver/ConnectorAnnotationOffsetResolver';
import ConnectorOffbeat from './graphics/shapes/ConnectorOffbeat';
import ConnectorStraight from './graphics/shapes/ConnectorStraight';
import AnnotationLabelTemplate from './templates/html/AnnotationLabelTemplate';
import { isNullOrEmpty } from './common';
import RenderEventArgs from './events/RenderEventArgs';

/**
* Creates JavaScript Connector Annotation Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders its content
 * inside of that div element.
 * @param {ConnectorAnnotationControlConfig} options Connector Annotation Configuration object
 * 
 * @returns {ConnectorAnnotationControl} Returns reference to connector annotation control.
 */
export default function ConnectorAnnotationControl(element, options) {
  var _data = {
    name: "connectorcontrol",
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
    var annotationConfig = _data.options,
      shape,
      uiHash,
      transform = new Transform(),
      panel = _data.graphics.activate("placeholder"),
      buffer = new PolylinesBuffer(),
      connectorAnnotationOffsetResolver = ConnectorAnnotationOffsetResolver();

    transform.size = new Size(_data.panelSize.width, _data.panelSize.height);
    transform.setOrientation(annotationConfig.orientationType);

    if (annotationConfig.fromRectangle != null && annotationConfig.toRectangle != null) {
      var fromRect = annotationConfig.fromRectangle,
        toRect = annotationConfig.toRectangle;

      /* translate rectangles to Top orientation */
      /* from rectangle */
      transform.transformRect(fromRect.x, fromRect.y, fromRect.width, fromRect.height, false,
        this, function (x, y, width, height) {
          fromRect = new Rect(x, y, width, height);
        });

      /* to rectangle */
      transform.transformRect(toRect.x, toRect.y, toRect.width, toRect.height, false,
        this, function (x, y, width, height) {
          toRect = new Rect(x, y, width, height);
        });

      switch (annotationConfig.connectorPlacementType) {
        case ConnectorPlacementType.Offbeat:
          shape = new ConnectorOffbeat();
          break;
        case ConnectorPlacementType.Straight:
          shape = new ConnectorStraight();
          break;
      }

      /* rotate label size to user orientation */
      var labelSize;
      transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
        this, function (x, y, width, height) {
          labelSize = new Size(width, height);
        });

      /* rotate panel size to user orientation */
      var panelSize = null;
      transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
        this, function (x, y, width, height) {
          panelSize = new Size(width, height);
        });

      var linePaletteItem = new PaletteItem({
        lineColor: annotationConfig.color,
        lineWidth: annotationConfig.lineWidth,
        lineType: annotationConfig.lineType
      });

      var hasLabel = !isNullOrEmpty(annotationConfig.label);

      /* offset rectangles */
      fromRect = new Rect(fromRect).offset(annotationConfig.offset);
      toRect = new Rect(toRect).offset(annotationConfig.offset);

      var linesOffset = annotationConfig.lineWidth * 6;

      /* create connection lines */
      shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, 0, labelSize, panelSize,
        annotationConfig.connectorShapeType, annotationConfig.labelOffset, annotationConfig.labelPlacementType, hasLabel,
        connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
          var hasLabel = !isNullOrEmpty(labelConfig.label);
          if (hasLabel && labelPlacement != null) {
            /* translate result label placement back to users orientation */
            transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
              self, function (x, y, width, height) {
                labelPlacement = new Rect(x, y, width, height);
              });

            uiHash = new RenderEventArgs();
            uiHash.context = labelConfig;

            /* draw label */
            _data.graphics.template(
              labelPlacement.x
              , labelPlacement.y
              , 0
              , 0
              , 0
              , 0
              , labelPlacement.width
              , labelPlacement.height
              , _data.labelTemplate.template()
              , _data.labelTemplate.getHashCode()
              , _data.labelTemplate.render
              , uiHash
              , null
            );
          }
        }, annotationConfig);
      connectorAnnotationOffsetResolver.resolve();
    }

    /* translate result polylines back to users orientation */
    buffer.transform(transform, true);
    /* draw background polylines */
    _data.graphics.polylinesBuffer(buffer);

    _data.graphics.end();
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
