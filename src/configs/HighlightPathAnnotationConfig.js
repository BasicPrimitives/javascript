import { AnnotationType, ZOrderType, Colors, LineType } from '../enums';
/**
 * @class HighlightPathAnnotationConfig
 * @classdesc  Highlight path annotation renders the route between the 
 * given sequence of nodes over existing connector lines in the diagram.
 *
 * @param {object} arg0 Object properties.
 */
export default function HighlightPathAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.HighlightPath;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Foreground;

  /**
   * Collection of nodes ids this path is drawn for. Please, pay attention 
   * that this is the array of nodes ids. So if the diagram finds the wrong
   * way from start to end nodes, you can sequence the route yourself.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Line color
   * 
   * @type {string}
   */
  this.color = Colors.Red;

  /**
   * Line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * Opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * If true, then annotation has arrows along the route.
   * 
   * @type {boolean}
   */
  this.showArrows = true;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = false;

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
