import { LineType, Colors } from '../enums';
/**
 * @class PaletteItemConfig
 * @classdesc Palette Item configuration object defines cross-family 
 * connections lines styles. Multi-parent diagrams may have a lot of
 * parallel lines, so to make their visual tracing easier, the component
 * supports multiple line styles and evenly distributes them. It is a similar
 * approach as for visualization of regular line charts. If we have numerous
 * lines in the chart area, it makes sense to style every line individually.
 * 
 * @param {PaletteItemConfig} arg0 Palette properties object.
 * 
 * @param {string} arg0 Line color
 * @param {number} arg1 Line width
 * @param {LineType} arg2 Line type
 */
export default function PaletteItemConfig(arg0, arg1, arg2) {
  var property;

  /**
   * Line color
   * 
   * @type {string}
   */
  this.lineColor = Colors.Silver;

  /**
   * Line width
   * 
   * @type {number}
   */
  this.lineWidth = 1;

  /**
   * Line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 3:
      this.lineColor = arg0;
      this.lineWidth = arg1;
      this.lineType = arg2;
      break;
  }
};
