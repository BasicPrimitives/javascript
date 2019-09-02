

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

primitives.orgdiagram.Widget.prototype.destroy = function () {
	this.control.destroy();
};

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
			switch(property) {
				case 'onHighlightChanged':
				case 'onCursorChanged':
				case 'onSelectionChanging':
				case 'onButtonClick':
				case 'onMouseClick':
				case 'onMouseDblClick':
					result[property] = function(property) { 
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
/*
	Class: primitives.callout.Config
		Callout options class.
	
*/
primitives.callout.Config = function () {
	this.classPrefix = "bpcallout";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.Canvas;

	/*
		Property: pointerPlacement
			Defines pointer connection side or corner.

		Default:
			<primitives.common.PlacementType.Auto>
	*/
	this.pointerPlacement = primitives.common.PlacementType.Auto;

	/*
	Property: position
		Defines callout body position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.position = null;

	/*
	Property: snapPoint
		Callout snap point. 
		
	Type:
		<primitives.common.Point>.
	*/
	this.snapPoint = null;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. 
	*/
	this.cornerRadius = "10%";

	/*
	Property: offset
		Body rectangle offset. 
	*/
	this.offset = 0;

	/*
	Property: opacity
		Background color opacity. 
	*/
	this.opacity = 1;

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 1;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;

	/*
	Property: pointerWidth
		Pointer base width in percents or pixels. 
	*/
	this.pointerWidth = "10%";

	/*
	Property: borderColor
		Border Color. 
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.borderColor = primitives.common.Colors.Black;

	/*
	Property: fillColor
		Fill Color. 
		
	Default:
		<primitives.common.Colors.Gray>
	*/
	this.fillColor = primitives.common.Colors.LightGray;

	/*
	method: update
		Makes full redraw of callout widget contents reevaluating all options.
	*/
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
/*
	Class: primitives.connector.Config
		Connector options class.
	
*/
primitives.connector.Config = function () {
	this.classPrefix = "bpconnector";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.Canvas;

	/*
		Property: orientationType
			Diagram orientation. 

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = primitives.common.OrientationType.Top;

	/*
		Property: connectorPlacementType
			Defines connector annotation shape placement mode between two rectangles. 
			It uses off beat placement mode as default in order to avoid overlapping
			of base hierarchy connector lines.

		Default:
			<primitives.common.ConnectorPlacementType.Offbeat>
	*/
	this.connectorPlacementType = primitives.common.ConnectorPlacementType.Offbeat;

	/*
		Property: connectorShapeType
			Connector shape type. 

		Default:
			<primitives.common.ConnectorShapeType.OneWay>
	*/
	this.connectorShapeType = primitives.common.ConnectorShapeType.OneWay;

	/*
	Property: position
		Defines connectors starting rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.fromRectangle = null;

	/*
	Property: position
		Defines connectors ending rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.toRectangle = null;


	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 3;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = primitives.common.Colors.Black;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;


	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Defines label size. It is needed to preserve space for label without overlapping connected items.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	/*
	Property: labelPlacementType
		Defines conector label placement. Label can be placed between rectangles along connector line or close to one of them.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

	/*
	method: update
		Makes full redraw of connector widget contents reevaluating all options.
	*/
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

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.Canvas;

	/*
		Property: orientationType
			Diagram orientation. 

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = primitives.common.OrientationType.Top;

	/*
		Property: shapeType
			Shape type. 

		Default:
			<primitives.common.ShapeType.Rectangle>
	*/
	this.shapeType = primitives.common.ShapeType.Rectangle;

	/*
	Property: position
		Defines shapes rectangle position. 
		
	Type:
		<primitives.common.Rect>.
	*/
	this.position = null;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. 
	*/
	this.cornerRadius = "10%";

	/*
	Property: opacity
		Background color opacity. 
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 
	
	Default:
		<primitives.common.Colors.Gray>
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = primitives.common.LineType.Solid;


	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Defines label size. It is needed to preserve space for label without overlapping connected items.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	/*
	Property: labelPlacement
		Defines label placement relative to the shape. 

	See Also:
		<primitives.orgdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = primitives.common.PlacementType.Auto;

	/*
	Property: labelOffset
		Defines label offset from shape in pixels.

	Default:
		4;
	*/
	this.labelOffset = 4;

	/*
	method: update
		Makes full redraw of connector widget contents reevaluating all options.
	*/
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
/*
	Class: primitives.text.Config
		Text options class.
	
*/
primitives.text.Config = function () {
	this.classPrefix = "bptext";

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = primitives.common.GraphicsType.SVG;

	/*
		Property: textDirection
			Direction style. 

		Default:
			<primitives.text.TextDirection.Auto>
	*/
	this.orientation = primitives.text.TextOrientationType.Horizontal;

	/*
		Property: text
			Text
	*/
	this.text = "";


	/*
		Property: verticalAlignment
			Vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

	/*
		Property: horizontalAlignment
			Horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

	/*
		Property: fontSize
			Font size. 

		Default:
			15
	*/
	this.fontSize = "16px";

	/*
		Property: fontFamily
			Font family. 

		Default:
			"Arial"
	*/
	this.fontFamily = "Arial";

	/*
		Property: color
			Color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.color = primitives.common.Colors.Black;

	/*
		Property: fontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.fontWeight = "normal";

	/*
		Property: fontStyle
			Font style: normal | italic
		
		Default:
			"normal"
	*/
	this.fontStyle = "normal";

	/*
	method: update
		Makes full redraw of text widget contents reevaluating all options.
	*/
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