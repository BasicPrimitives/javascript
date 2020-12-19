import Thickness from '../graphics/structs/Thickness';
import { AnnotationType, ZOrderType, LineType } from '../enums';

/**
 * @class BackgroundAnnotationConfig
 * @classdesc Background annotation draws rectangular shape around annotated items. Annotations borders are offset around items, so if 
 * two annotations overlap each other they are merged into one continuos shape having single border line.
 *
 * @param {object} arg0 Object properties.
 */
export default function BackgroundAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distinguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Background;

  /**
   * Collection of nodes ids this background annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * If this property is true then background annotation includes all descendants of every item in `items` collection. It works in {OrgDiagram} only.
   * 
   * @type {boolean}
   */
  this.includeChildren = false;

  /**
   * Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes then you block mouse events of UI elements in their templates.
   * Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item
   * templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top
   * of other visual elements. The control takes this into account and renders buttons panel on top of everything,
   * so they are never blocked by annotations drawn in front of diagram nodes.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Auto;

  /**
   * Sets background offset around annotated items.
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
   * Shape border line color
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
   * If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space.
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