/**
 * @class HighlightPathAnnotationConfig
 * @classdesc  Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes 
 * over existing connector lines in the diagram.
 *
 * @param {object} arg0 Object properties.
 */
primitives.famdiagram.HighlightPathAnnotationConfig = function (arg0) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distiguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = primitives.common.AnnotationType.HighlightPath;

  /**
   * Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes then you block mouse events of UI elements in their templates.
   * Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item
   * templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top
   * of other visual elements. The control takes this into account and renders buttons panel on top of everyhting,
   * so they are never blocked by annotations drawn in front of diagram nodes.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = primitives.common.ZOrderType.Foreground;

  /**
   * Collection of nodes ids this annotation is drawn for. Please, pay attention that this is array of nodes ids. So if diagram finds
   * wrong path from start to end node you have possibility to define every intermediate node in the sequence yourself.
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
  this.color = primitives.common.Colors.Red;

  /**
   * Line type
   * 
   * @type {LineType}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * If true then annotation has arrows along the highlight path line.
   * 
   * @type {boolean}
   */
  this.showArrows = true;

  /**
   * If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space.
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