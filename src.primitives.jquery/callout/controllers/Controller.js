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