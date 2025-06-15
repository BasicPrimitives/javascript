import {VerticalAlignmentType, TextOrientationType, HorizontalAlignmentType, Colors} from '../enums';

/**
 * @class RotatedTextControlConfig
 * @classdesc Rotated text control configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * The rotated text control positions and aligns text within a div element.
 * 
 * @param {object} arg0 Object properties.
 */
export default function RotatedTextControlConfig(arg0) {
  var property;

/**
   * Label orientation.
   * 
   * @type {TextOrientationType}
   */
  this.orientation = TextOrientationType.Horizontal;

  /**
   * The text
   * 
   * @type {string}
   */
  this.text = "";


  /**
   * Label vertical alignment inside bounding rectangle.
   * 
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = VerticalAlignmentType.Middle;

  /**
   * Label horizontal alignment inside bounding rectangle.
   * 
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Font size
   * 
   * @type {string}
   */
  this.fontSize = "16px";

  /**
   * Font family
   * 
   * @type {string}
   */
  this.fontFamily = "Arial";

  /**
   * Font color
   * 
   * @type {string}
   */
  this.color = Colors.Black;

  /**
   * Font weight: normal | bold
   * 
   * @type {string}
   */
  this.fontWeight = "normal";

  /**
   * Font style: normal | italic
   * 
   * @type {string}
   */
  this.fontStyle = "normal";

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