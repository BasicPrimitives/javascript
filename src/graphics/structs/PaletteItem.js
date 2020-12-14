import { Colors, LineType } from '../../enums';
import { isNullOrEmpty } from '../../common';

export default function PaletteItem(options) {
  this.lineColor = Colors.Silver;
  this.lineWidth = 1;
  this.lineType = LineType.Solid;
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
    this._key += (!isNullOrEmpty(this._key) ? ", " : "") + property + ":" + this[property];
  }
};

PaletteItem.prototype.toAttr = function () {
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

PaletteItem.prototype.toString = function () {
  return this._key;
};