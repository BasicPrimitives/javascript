import {OrientationType, LineType, ShapeType, PlacementType } from '../enums';
import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import Rect from '../graphics/structs/Rect';

/**
 * @class ShapeAnnotationControlConfig
 * @classdesc Shape annotation control configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * Shape annotations control draws shape around rectangle. 
 * 
 * @param {object} arg0 Object properties.
 */
export default function ShapeAnnotationControlConfig(arg0, arg1) {
  var property;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = OrientationType.Top;

  /**
   * Shape
   * 
   * @type {ShapeType}
   */
  this.shapeType = ShapeType.Rectangle;

  /**
   * Sets shapes bounding rectangle position. 
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Sets bounding rectangle offset
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Corner radius. Body corner radius in percents or pixels. For applicable shapes only.
   * 
   * @type {string|number}
   */
  this.cornerRadius = "10%";

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Shape border line color.
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Shape background fill color.
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Shape border line pattern.
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * Annotation label text. Label styled with css class name "bp-connector-label".
   * 
   * @type {string|undefined}
   */
  this.label = null;

  /**
   * Label size
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  /**
   * Label placement relative to the shape.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Auto;

  /**
   * Label offset from shape in pixels.
   * 
   * @type {number}
   */
  this.labelOffset = 4;

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