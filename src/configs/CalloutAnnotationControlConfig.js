import {LineType, Colors, PlacementType} from '../enums';
import Rect from '../graphics/structs/Rect';

/**
 * @class CalloutAnnotationControlConfig
 * @classdesc Callout annotation control configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * Callout annotations control draws shape around rectangle. 
 * 
 * @param {object} arg0 Object properties.
 */
export default function CalloutAnnotationControlConfig(arg0) {
  var property;

  /**
   * Sets callout pointer attachment to one of its sides or corners.
   * 
   * @type {PlacementType}
   */
  this.pointerPlacement = PlacementType.Auto;

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
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 1;

  /**
   * Border line pattern.
   * 
   * @type {string}
   */
  this.lineType = LineType.Solid;

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
  this.borderColor = Colors.Black;

  /**
   * Background fill color
   * 
   * @type {string}
   */
  this.fillColor = Colors.LightGray;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
  }
};