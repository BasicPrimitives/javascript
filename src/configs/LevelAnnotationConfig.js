import Thickness from '../graphics/structs/Thickness';
import { AnnotationType, LineType, Colors } from '../enums';

/**
 * @class LevelAnnotationConfig
 * @classdesc Level annotation highlights the same level nodes of the diagram via
 * drawing continuous rectangular shapes from side to side and the optional title
 * on the side of the diagram view area. Title placement can be inside or outside
 * of the diagram. The inside placement does not occupy diagram space and
 * is rendered in the background. 
 *
 * @param {object} arg0 Object properties.
 */
export default function LevelAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
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
   * Title.
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
   * The title background color.
   * 
   * @type {string}
   */
  this.titleColor = null;

  /**
   * Background offset relative to its default position.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * The background border line width. Use {Thickness} to set border width individually per side.
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
   * Background border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Background fill Color.
   * 
   * @type {string}
   */
  this.fillColor = "#D4D4D4";

  /**
   * Background border line type
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