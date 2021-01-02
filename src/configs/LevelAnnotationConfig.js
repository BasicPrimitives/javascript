import Thickness from '../graphics/structs/Thickness';
import { AnnotationType, LineType, Colors } from '../enums';

/**
 * @class LevelAnnotationConfig
 * @classdesc Level annotation highlights same level nodes of the diagram via drawing continuous rectangular shape 
 * from side to side in their background. Stripe has optional title on the side of the diagram view area.
 * Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the 
 * background and does not occupy space. 
 *
 * @param {object} arg0 Object properties.
 */
export default function LevelAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distinguish them when they are defined as a type less JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Level;

  /**
   * Collection of levels this level annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.levels = [];

  /**
   * Level Title.
   * 
   * @type {string}
   */
  this.title = null;

  /**
   * Title font color.
   * 
   * @type {string}
   */
  this.titleFontColor = null;

  /**
   * The level title background color.
   * 
   * @type {string}
   */
  this.titleColor = null;

  /**
   * Sets background offset relative to default position.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * Background stripe border line width. Use {Thickness} to set border width individually per side.
   * 
   * @type {Thickness}
   */
  this.lineWidth = new Thickness(0, 0, 0, 0);

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Background stripe border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Background stripe fill Color.
   * 
   * @type {string}
   */
  this.fillColor = "#D4D4D4";

  /**
   * Background stripe border line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null) {
        if (arg0 instanceof Array) {
          this.items = arg0;
        } else if (typeof arg0 == "object") {
          for (property in arg0) {
            if (arg0.hasOwnProperty(property)) {
              this[property] = arg0[property];
            }
          }
        }
      }
      break;
  }
};