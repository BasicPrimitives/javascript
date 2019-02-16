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