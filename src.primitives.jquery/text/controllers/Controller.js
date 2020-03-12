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