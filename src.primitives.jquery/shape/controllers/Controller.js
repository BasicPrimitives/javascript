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