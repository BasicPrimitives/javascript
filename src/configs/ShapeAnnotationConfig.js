import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import {AnnotationType, ZOrderType, ShapeType, PlacementType, LineType } from '../enums';

/**
 * @class ShapeAnnotationConfig
 * @classdesc  Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical
 * shapes over nodes of the diagram. 
 *
 * @param {object} arg0 Object properties.
 */
export default function ShapeAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distinguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Shape;

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
   * Collection of nodes ids this shape annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * Shape
   * 
   * @type {ShapeType}
   */
  this.shapeType = ShapeType.Rectangle;

  /**
   * Sets shape offset around annotated items.
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
   * Shape border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Shape fill color
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

  /**
   * Label. Label styled with css class name "bp-connector-label".
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  /**
   * Label placement relative to the annotation.
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
