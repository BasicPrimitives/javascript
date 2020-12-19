import { LineType, Colors } from '../enums';
/**
 * @class PaletteItemConfig
 * @classdesc Palette Item configuration object defines cross family connections lines styles. Multi-parent diagrams have cross hierarchy 
 * relation lines, so in order to make their visual tracing more easy on diagram every connection line can be styled differently.
 * (This is the same approach as for visualization of regular classic line charts. If we have multiple lines in chart area it makes
 * sense to style every line individually.)
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
