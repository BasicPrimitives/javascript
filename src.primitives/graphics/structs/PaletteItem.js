primitives.common.PaletteItem = function (options) {
  this.lineColor = primitives.common.Colors.Silver;
  this.lineWidth = 1;
  this.lineType = primitives.common.LineType.Solid;
  this.fillColor = null;
  this.opacity = null;

  this._key = "";

  var property, properties,
    index, len;

  properties = ['lineColor', 'lineWidth', 'lineType', 'fillColor', 'opacity'];

  for (index = 0, len = properties.length; index < len; index += 1) {
    property = properties[index];

    if (options != null && options.hasOwnProperty(property)) {
      this[property] = options[property];
    }
    this._key += (!primitives.common.isNullOrEmpty(this._key) ? ", " : "") + property + ":" + this[property];
  }
};

primitives.common.PaletteItem.prototype.toAttr = function () {
  var attr = {
    "lineWidth": this.lineWidth,
    "lineType": this.lineType
  };
  if (this.fillColor !== null) {
    attr.fillColor = this.fillColor;
  }
  if (this.opacity !== null) {
    attr.opacity = this.opacity;
  }
  if (this.lineColor !== null) {
    attr.borderColor = this.lineColor;
  }
  return attr;
};

primitives.common.PaletteItem.prototype.toString = function () {
  return this._key;
};