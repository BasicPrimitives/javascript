import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import {AnnotationType, ZOrderType, ShapeType, PlacementType, LineType } from '../enums';

/**
 * @class ShapeAnnotationConfig
 * @classdesc  Shape annotation draws geometrical shapes over nodes
 * of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.
 *
 * @param {object} arg0 Object properties.
 */
export default function ShapeAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Shape;

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
   * Shape offset around annotated items.
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
   * Adds rounded corners for applicable shapes. Radius is defined in percents or pixels.
   * 
   * @type {string|number}
   */
  this.cornerRadius = "10%";

  /**
   * Background color opacity
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
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = false;

  /**
   * Annotation label, it is styled with 'bp-connector-label' CSS class
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * 
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  /**
   * Label placement around the annotation.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Auto;

  /**
   * Label offset in pixels.
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
