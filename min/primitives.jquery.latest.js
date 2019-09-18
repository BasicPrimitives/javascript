

/* /common/init.js*/
/**
 * @preserve jQuery Widgets for Basic Primitives Diagrams v5.4.15
 * Copyright (c) 2013 - 2019 Basic Primitives Inc
 *
 * Non-commercial - Free
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * Commercial and government licenses:
 * http://www.basicprimitives.com/license.pdf
 *
 */

/* /orgdiagram/Templates/jQueryButtonsTemplate.js*/
primitives.common.jQueryButtonsTemplate = function (options) {
  var _template = create(),
    _hashCode = primitives.common.hashCode(_template);

  function create() {
    var template = jQuery("<ul></ul>");

    template.css({
      position: "absolute"
    }).addClass("ui-widget ui-helper-clearfix");

    return template.wrap('<div>').parent().html();
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return _hashCode;
  }

  function render(event, data) {
    var name = "orgdiagram",
      element = jQuery(data.element),
      topOffset = 0,
      buttonsInterval = 10,
      buttonConfig,
      buttons = data.buttons,
      buttonprop,
      button,
      index;

    switch (data.renderingMode) {
      case primitives.common.RenderingMode.Create:
        for (index = 0; index < buttons.length; index += 1) {
          buttonConfig = buttons[index];
          button = jQuery('<li data-buttonname="' + buttonConfig.name + '"></li>')
            .css({
              position: "absolute",
              top: topOffset + "px",
              left: "0px",
              width: buttonConfig.size.width + "px",
              height: buttonConfig.size.height + "px",
              padding: "3px"
            })
            .addClass(name + "button");
          element.append(button);
          buttonprop = {
            icons: { primary: buttonConfig.icon },
            label: buttonConfig.label
          };
          if (buttonConfig.text != "") {
            buttonprop.text = buttonConfig.text;
          }
          if (!primitives.common.isNullOrEmpty(buttonConfig.tooltip)) {
            button.attr('title', buttonConfig.tooltip);
          }
          button.button(buttonprop);
          topOffset += buttonsInterval + buttonConfig.size.height;
        }
        break;
      case primitives.common.RenderingMode.Update:
        break;
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};



/* /orgdiagram/Widget.js*/
primitives.orgdiagram.Widget = function (Config, taskManagerFactory, eventArgsFactory, templates) {
  this.widgetEventPrefix = "orgdiagram";

  this.options = new Config();

  this.control = null;

  this.taskManagerFactory = taskManagerFactory;
  this.eventArgsFactory = eventArgsFactory;
  this.templates = templates;
};

primitives.orgdiagram.Widget.prototype._create = function () {
  this.element.addClass("ui-widget");

  this.control = primitives.orgdiagram.BaseControl(this.element[0], this._readOptions(this.options), this.taskManagerFactory, this.eventArgsFactory, this.templates);
};

/**
 * Removes all elements control added to DOM incluidng event listeners.
 */
primitives.orgdiagram.Widget.prototype.destroy = function () {
  this.control.destroy();
};

/**
 * Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly
 * after all options are set in order to update controls contents.
 * 
 * @param {UpdateMode} updateMode 
 * @param {bollean} forceCenterOnCursor 
 */
primitives.orgdiagram.Widget.prototype.update = function (updateMode, centerOnCursor) {
  this.control.update(updateMode, centerOnCursor);
};

primitives.orgdiagram.Widget.prototype._setOption = function (key, value) {
  jQuery.Widget.prototype._setOption.apply(this, arguments);

  switch (key) {
    case "disabled":
      var handles = jQuery([]);
      if (value) {
        handles.filter(".ui-state-focus").blur();
        handles.removeClass("ui-state-hover");
        handles.propAttr("disabled", true);
        this.element.addClass("ui-disabled");
      } else {
        handles.propAttr("disabled", false);
        this.element.removeClass("ui-disabled");
      }
      break;
    default:
      break;
  }

  this.control.setOptions(this._readOptions(this.options));
};

primitives.orgdiagram.Widget.prototype._readOptions = function (options) {
  var result = {},
    self = this;
  /* shallow copy */
  for (var property in options) {
    if (options.hasOwnProperty(property)) {
      switch (property) {
        case 'onHighlightChanged':
        case 'onCursorChanged':
        case 'onSelectionChanging':
        case 'onButtonClick':
        case 'onMouseClick':
        case 'onMouseDblClick':
          result[property] = function (property) {
            return function (event, eventArgs) {
              self._trigger(property, event, eventArgs);
            };
          }(property);
          break;
        case 'onItemRender':
        case 'onCursorRender':
        case 'onHighlightRender':
          result[property] = function (property) {
            return function (event, eventArgs) {
              eventArgs.element = jQuery(eventArgs.element);
              self._trigger(property, event, eventArgs);
            };
          }(property);
          break;
        case 'onHighlightChanging':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.highlightItem = options.highlightItem;

            self._trigger("onHighlightChanging", event, eventArgs);
          };
          break;
        case 'onCursorChanging':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.cursorItem = options.cursorItem;

            self._trigger("onCursorChanging", event, eventArgs);
          };
          break;
        case 'onSelectionChanged':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.selectedItems = options.selectedItems;

            self._trigger("onSelectionChanged", event, eventArgs);
          };
          break;
        default:
          result[property] = options[property];
          break;
      }
    }
  }
  return result;
};

/* /orgdiagram/orgDiagram.js*/
/*
 * jQuery UI Diagram
 *
 * Basic Primitives organization diagram.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.orgDiagram", new primitives.orgdiagram.Widget(primitives.orgdiagram.Config, primitives.orgdiagram.TaskManagerFactory, primitives.orgdiagram.EventArgsFactory, {
      AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
      ButtonsTemplate: primitives.common.jQueryButtonsTemplate,
      CheckBoxTemplate: primitives.common.CheckBoxTemplate,
      CursorTemplate: primitives.common.CursorTemplate,
      DotHighlightTemplate: primitives.common.DotHighlightTemplate,
      GroupTitleTemplate: primitives.common.GroupTitleTemplate,
      HighlightTemplate: primitives.common.HighlightTemplate,
      ItemTemplate: primitives.common.ItemTemplate,
      UserTemplate: primitives.common.UserTemplate,
      /* famDiagram specific templates */
      LabelAnnotationTemplate: primitives.common.LabelAnnotationTemplate
    }));
  }(jQuery));
}; //ignore jslint

/* /callout/configs/Config.js*/
/**
 * @class primitives.callout.Config
 * 
 * Callout configuration object.
 */
primitives.callout.Config = function () {
  this.classPrefix = "bpcallout";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Sets callout pointer attachment to one of its sides or corners.
   * 
   * @type {PlacementType}
   */
  this.pointerPlacement = primitives.common.PlacementType.Auto;

  /**
   * Sets callout body position
   * 
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Sets callout snap point.
   * 
   * @type {Point}
   */
  this.snapPoint = null;

  /**
   * Callout annotation corner radius.
   * 
   * @type {string}
   */
  this.cornerRadius = "10%";

  /**
   * Callout body offset
   * 
   * @type {number}
   */
  this.offset = 0;

  /**
   * Background fill opacity. 
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Callout border line width
   * 
   * @type {number}
   */
  this.lineWidth = 1;

  /**
   * Borde line pattern.
   * 
   * @type {string}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Pointer base width in percents or pixels. 
   * 
   * @type {string|number}
   */
  this.pointerWidth = "10%";

  /**
   * Border line color
   * 
   * @type {string}
   */
  this.borderColor = primitives.common.Colors.Black;

  /**
   * Background fill color
   * 
   * @type {string}
   */
  this.fillColor = primitives.common.Colors.LightGray;
};

/* /callout/controllers/Controller.js*/
primitives.callout.Controller = function () {
	this.widgetEventPrefix = "bpcallout";

	this.options = new primitives.callout.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;

	this.m_shape = null;
};

primitives.callout.Controller.prototype._create = function () {
	this.element
			.addClass("ui-widget");

	this._createLayout();

	this._redraw();
};

primitives.callout.Controller.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.callout.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this.element[0]);

	this.m_shape = new primitives.common.Callout(this.m_graphics);
};

primitives.callout.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.callout.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.callout.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.callout.Controller.prototype._redraw = function () {
	var names = ["pointerPlacement", "cornerRadius", "offset", "opacity", "lineWidth", "lineType", "pointerWidth", "borderColor", "fillColor"],
		index,
		name;
	this.m_graphics.activate("placeholder");
	for (index = 0; index < names.length; index += 1) {
		name = names[index];
		this.m_shape[name] = this.options[name];
	}
	this.m_shape.draw(this.options.snapPoint, this.options.position);
};

primitives.callout.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};

/* /callout/callout.js*/
/*
 * jQuery UI Callout
 *
 * Basic Primitives Callout.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
	(function ($) {
		$.widget("ui.bpCallout", new primitives.callout.Controller());
	}(jQuery));
}; //ignore jslint

/* /connector/configs/Config.js*/
/**
 * @class primitives.connector.Config
 * 
 * Connector configuration object
 */
primitives.connector.Config = function () {
  this.classPrefix = "bpconnector";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = primitives.common.OrientationType.Top;

  /**
   * Connector placement type defines style of connector line drawing over diagram layout. It supports two options: 
   * the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation
   * drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual 
   * location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram 
   * is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be 
   * noticeable on top of other lines of the diagram.
   * 
   * @type {ConnectorPlacementType}
   */
  this.connectorPlacementType = primitives.common.ConnectorPlacementType.Offbeat;

  /**
   * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
   * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
   * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
   * 
   * @type {ConnectorShapeType}
   */
  this.connectorShapeType = primitives.common.ConnectorShapeType.OneWay;

  /**
   * Defines connectors starting rectangle position. 
   * 
   * @type {Rect}
   */
  this.fromRectangle = null;

  /**
   * Defines connectors ending rectangle position. 
   * 
   * @type {Rect}
   */
  this.toRectangle = null;


  /**
   * Connector line end points offset. By default connection lines start from the margin of the node's rectangle.
   * If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle.
   * 
   * @type {Thickness}
   */
  this.offset = new primitives.common.Thickness(0, 0, 0, 0);

  /**
   * Connector line width
   * 
   * @type {number}
   */
  this.lineWidth = 3;

  /**
   * Connector line color
   * 
   * @type {string}
   */
  this.color = primitives.common.Colors.Black;

  /**
   * Connector line pattern
   * 
   * @type {string}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Annotation label text. Label styled with css class name "bp-connector-label".
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size. It is used to position label without overlapping connected items.
   * 
   * @type {Size}
   */
  this.labelSize = new primitives.common.Size(60, 30);

  /**
   * Sets conector label placement relative to connection line end points. Label can be placed between
   * rectangles along connector line or close to one of them.
   * 
   * @type {ConnectorLabelPlacementType}
   */
  this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
};

/* /connector/controllers/AnnotationLabelTemplate.js*/
primitives.connector.AnnotationLabelTemplate = function (options) {
	var _template = ["div",
		{
			"class": ["bp-item", "bp-corner-all", "bp-connector-label"]
		}
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultAnnotationLabelTemplate";
	}

	function render(event, data) {
		data.element.innerHTML = options.label;
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};



/* /connector/controllers/Controller.js*/
primitives.connector.Controller = function () {
  this.widgetEventPrefix = "bpconnector";

  this.options = new primitives.connector.Config();

  this._placeholder = null;
  this._panelSize = null;
  this._graphics = null;
  this._labelTemplate = null;
};

primitives.connector.Controller.prototype._create = function () {
  var self = this;

  this.element
    .addClass("ui-widget");

  this._labelTemplate = primitives.connector.AnnotationLabelTemplate(this.options);

  this._createLayout();

  this._redraw();
};

primitives.connector.Controller.prototype.destroy = function () {
  this._cleanLayout();
};

primitives.connector.Controller.prototype._createLayout = function () {
  this._panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

  this._placeholder = jQuery('<div></div>');
  this._placeholder.css({
    "position": "relative",
    "overflow": "hidden",
    "top": "0px",
    "left": "0px",
    "padding": "0px",
    "margin": "0px"
  });
  this._placeholder.css(this._panelSize.getCSS());
  this._placeholder.addClass("placeholder");
  this._placeholder.addClass(this.widgetEventPrefix);

  this.element.append(this._placeholder);

  this._graphics = primitives.common.createGraphics(this.options.graphicsType, this.element[0]);
};

primitives.connector.Controller.prototype._cleanLayout = function () {
  if (this._graphics !== null) {
    this._graphics.clean();
  }
  this._graphics = null;

  this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.connector.Controller.prototype._updateLayout = function () {
  this._panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
  this._placeholder.css(this._panelSize.getCSS());
};

primitives.connector.Controller.prototype.update = function (recreate) {
  if (recreate) {
    this._cleanLayout();
    this._createLayout();
    this._redraw();
  }
  else {
    this._updateLayout();
    this._graphics.resize("placeholder", this._panelSize.width, this._panelSize.height);
    this._graphics.begin();
    this._redraw();
    this._graphics.end();
  }
};

primitives.connector.Controller.prototype._redraw = function () {
  var annotationConfig = this.options,
    shape,
    uiHash,
    transform = new primitives.common.Transform(),
    panel = this._graphics.activate("placeholder"),
    buffer = new primitives.common.PolylinesBuffer(),
    self = this,
    connectorAnnotationOffsetResolver = primitives.orgdiagram.ConnectorAnnotationOffsetResolver();

  transform.size = new primitives.common.Size(this._panelSize.width, this._panelSize.height);
  transform.setOrientation(annotationConfig.orientationType);

  if (annotationConfig.fromRectangle != null && annotationConfig.toRectangle != null) {
    var fromRect = annotationConfig.fromRectangle,
      toRect = annotationConfig.toRectangle;

    /* translate rectangles to Top orientation */
    /* from rectangle */
    transform.transformRect(fromRect.x, fromRect.y, fromRect.width, fromRect.height, false,
      this, function (x, y, width, height) {
        fromRect = new primitives.common.Rect(x, y, width, height);
      });

    /* to rectangle */
    transform.transformRect(toRect.x, toRect.y, toRect.width, toRect.height, false,
      this, function (x, y, width, height) {
        toRect = new primitives.common.Rect(x, y, width, height);
      });

    switch (annotationConfig.connectorPlacementType) {
      case primitives.common.ConnectorPlacementType.Offbeat:
        shape = new primitives.common.ConnectorOffbeat();
        break;
      case primitives.common.ConnectorPlacementType.Straight:
        shape = new primitives.common.ConnectorStraight();
        break;
    }

    /* rotate label size to user orientation */
    var labelSize;
    transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
      this, function (x, y, width, height) {
        labelSize = new primitives.common.Size(width, height);
      });

    /* rotate panel size to user orientation */
    var panelSize = null;
    transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
      this, function (x, y, width, height) {
        panelSize = new primitives.common.Size(width, height);
      });

    var linePaletteItem = new primitives.common.PaletteItem({
      lineColor: annotationConfig.color,
      lineWidth: annotationConfig.lineWidth,
      lineType: annotationConfig.lineType
    });

    var hasLabel = !primitives.common.isNullOrEmpty(annotationConfig.label);

    /* offset rectangles */
    fromRect = new primitives.common.Rect(fromRect).offset(annotationConfig.offset);
    toRect = new primitives.common.Rect(toRect).offset(annotationConfig.offset);

    var linesOffset = annotationConfig.lineWidth * 6;

    /* create connection lines */
    shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, 0, labelSize, panelSize,
      annotationConfig.connectorShapeType, 4 /*labelOffset*/, annotationConfig.labelPlacementType, hasLabel,
      connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
        var hasLabel = !primitives.common.isNullOrEmpty(labelConfig.label);
        if (hasLabel && labelPlacement != null) {
          /* translate result label placement back to users orientation */
          transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
            self, function (x, y, width, height) {
              labelPlacement = new primitives.common.Rect(x, y, width, height);
            });

          uiHash = new primitives.common.RenderEventArgs();
          uiHash.context = labelConfig;

          /* draw label */
          self._graphics.template(
            labelPlacement.x
            , labelPlacement.y
            , 0
            , 0
            , 0
            , 0
            , labelPlacement.width
            , labelPlacement.height
            , self._labelTemplate.template()
            , self._labelTemplate.getHashCode()
            , self._labelTemplate.render
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
  this._graphics.polylinesBuffer(buffer);

};

primitives.connector.Controller.prototype._setOption = function (key, value) {
  jQuery.Widget.prototype._setOption.apply(this, arguments);

  switch (key) {
    case "disabled":
      var handles = jQuery([]);
      if (value) {
        handles.filter(".ui-state-focus").blur();
        handles.removeClass("ui-state-hover");
        handles.propAttr("disabled", true);
        this.element.addClass("ui-disabled");
      } else {
        handles.propAttr("disabled", false);
        this.element.removeClass("ui-disabled");
      }
      break;
    default:
      break;
  }
};

/* /connector/connector.js*/
/*
 * jQuery UI Connector
 *
 * Basic Primitives Connector.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
	(function ($) {
		$.widget("ui.bpConnector", new primitives.connector.Controller());
	}(jQuery));
}; //ignore jslint

/* /famdiagram/famDiagram.js*/
/*
 * jQuery UI Diagram
 *
 * Basic Primitives family diagram.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
	(function ($) {
		$.widget("ui.famDiagram", new primitives.orgdiagram.Widget(primitives.famdiagram.Config, primitives.famdiagram.TaskManagerFactory, primitives.famdiagram.EventArgsFactory, {
			AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
			ButtonsTemplate: primitives.common.jQueryButtonsTemplate,
			CheckBoxTemplate: primitives.common.CheckBoxTemplate,
			CursorTemplate: primitives.common.CursorTemplate,
			DotHighlightTemplate: primitives.common.DotHighlightTemplate,
			GroupTitleTemplate: primitives.common.GroupTitleTemplate,
			HighlightTemplate: primitives.common.HighlightTemplate,
			ItemTemplate: primitives.common.ItemTemplate,
			UserTemplate: primitives.common.UserTemplate,
			/* famDiagram specific templates */
			LabelAnnotationTemplate: primitives.common.LabelAnnotationTemplate
		}));
	}(jQuery));
}; //ignore jslint

/* /shape/configs/Config.js*/
/*
	Class: primitives.connector.Config
		Connector options class.
	
*/
primitives.shape.Config = function () {
  this.classPrefix = "bpconnector";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = primitives.common.OrientationType.Top;

  /**
   * Shape
   * 
   * @type {ShapeType}
   */
  this.shapeType = primitives.common.ShapeType.Rectangle;

  /**
   * Sets shapes bounding rectangle position. 
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Sets bounding rectangle offset
   * 
   * @type {Thickness}
   */
  this.offset = new primitives.common.Thickness(0, 0, 0, 0);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Corner radius. Body corner radius in percents or pixels. For applicable shapes only.
   * 
   * @type {string|number}
   */
  this.cornerRadius = "10%";

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Shape border line color.
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Shape background fill color.
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Shape border line pattern.
   * 
   * @type {LineType}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Annotation label text. Label styled with css class name "bp-connector-label".
   * 
   * @type {string|undefined}
   */
  this.label = null;

  /**
   * Label size
   * @type {Size}
   */
  this.labelSize = new primitives.common.Size(60, 30);

  /**
   * Label placement relative to the shape.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = primitives.common.PlacementType.Auto;

  /**
   * Label offset from shape in pixels.
   * 
   * @type {number}
   */
  this.labelOffset = 4;
};

/* /shape/controllers/AnnotationLabelTemplate.js*/
primitives.shape.AnnotationLabelTemplate = function (options) {
	var _template = ["div",
		{
			"class": ["bp-item", "bp-corner-all", "bp-connector-label"]
		}
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultAnnotationLabelTemplate";
	}

	function render(event, data) {
		data.element.innerHTML = options.label;
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};



/* /shape/controllers/Controller.js*/
primitives.shape.Controller = function () {
	this.widgetEventPrefix = "bpshape";

	this.options = new primitives.shape.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;

	this.m_shape = null;

	this._labelTemplate = null;
};

primitives.shape.Controller.prototype._create = function () {
	var self = this;

	this.element
			.addClass("ui-widget");

	this._labelTemplate = primitives.shape.AnnotationLabelTemplate(this.options);

	this._createLayout();

	this._redraw();
};

primitives.shape.Controller.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.shape.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this.element[0]);
};

primitives.shape.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.shape.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.shape.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.shape.Controller.prototype._redraw = function () {
	var names = ["orientationType", "shapeType", "offset", "lineWidth", "borderColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "cornerRadius", "opacity", "fillColor"],
		index,
		name;
	this.m_graphics.activate("placeholder");

	this.m_shape = new primitives.common.Shape(this.m_graphics);
	for (index = 0; index < names.length; index += 1) {
		name = names[index];
		this.m_shape[name] = this.options[name];
	}
	this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
	this.m_shape.labelTemplate = this._labelTemplate;
	this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
	this.m_shape.draw(this.options.position);
};

primitives.shape.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};

/* /shape/shape.js*/
/*
 * jQuery UI Shape
 *
 * Basic Primitives Shape.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
	(function ($) {
		$.widget("ui.bpShape", new primitives.shape.Controller());
	}(jQuery));
}; //ignore jslint

/* /text/configs/Config.js*/
/**
 * @class primitives.text.Config
 * 
 * Rotated text configuration object
 */
primitives.text.Config = function () {
  this.classPrefix = "bptext";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.SVG;

  /**
   * Label orientation.
   * 
   * @type {TextOrientationType}
   */
  this.orientation = primitives.text.TextOrientationType.Horizontal;

  /**
   * The text
   * 
   * @type {string}
   */
  this.text = "";


  /**
   * Label vertical alignment inside bounding rectangle.
   * 
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

  /**
   * Label horizontal alignment inside bounding rectangle.
   * 
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

  /**
   * Font size
   * 
   * @type {string}
   */
  this.fontSize = "16px";

  /**
   * Font family
   * 
   * @type {string}
   */
  this.fontFamily = "Arial";

  /**
   * Font color
   * 
   * @type {string}
   */
  this.color = primitives.common.Colors.Black;

  /**
   * Font weight: normal | bold
   * 
   * @type {string}
   */
  this.fontWeight = "normal";

  /**
   * Font style: normal | italic
   * 
   * @type {string}
   */
  this.fontStyle = "normal";
};

/* /text/controllers/Controller.js*/
primitives.text.Controller = function () {
	this.widgetEventPrefix = "bptext";

	this.options = new primitives.text.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;
};

primitives.text.Controller.prototype._create = function () {
	this.element
			.addClass("ui-widget");

	this._createLayout();

	this._redraw();
};

primitives.text.Controller.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.text.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
		

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this.element[0]);
};

primitives.text.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.text.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.text.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.text.Controller.prototype._redraw = function () {
	var panel = this.m_graphics.activate("placeholder"),
		attr = {
			"fontSize": this.options.fontSize,
			"fontFamily": this.options.fontFamily,
			"fontStyle": this.options.fontStyle,
			"fontWeight": this.options.fontWeight,
			"fontColor": this.options.color
		};
	this.m_graphics.text(
	panel.rect.x,
	panel.rect.y,
	panel.rect.width,
	panel.rect.height,
	this.options.text,
	this.options.orientation,
	this.options.horizontalAlignment,
	this.options.verticalAlignment,
	attr
	);
};

primitives.text.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};

/* /text/text.js*/
/*
 * jQuery UI Text
 *
 * Basic Primitives Text.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
	(function ($) {
		$.widget("ui.bpText", new primitives.text.Controller());
	}(jQuery));
}; //ignore jslint