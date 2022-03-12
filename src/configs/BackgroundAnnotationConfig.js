import Thickness from '../graphics/structs/Thickness';
import { AnnotationType, ZOrderType, LineType } from '../enums';

/**
 * @class BackgroundAnnotationConfig
 * @classdesc Background annotation draws a rectangular shape around annotated items.
 * Annotations borders are offset around nodes, so if two annotations overlap, 
 * they are merged into one continuous shape with a single borderline.
 *
 * @param {object} arg0 Object properties.
 */
export default function BackgroundAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Background;

  /**
   * The `items` Collection contains nodes ids the background annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * If this property is true, background annotation includes all descendants of every 
   * item in the `items` collection. It works in {OrgDiagram} only.
   * 
   * @type {boolean}
   */
  this.includeChildren = false;

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
  this.zOrderType = ZOrderType.Auto;

  /**
   * Sets background borderline offset around annotated items.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(18, 18, 18, 18);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Fill Color.
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Border line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
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