
/**
 * @class BackgroundAnnotationConfig
 * @classdesc Consider background annotation as another way to highlight some items in diagram. 
 * In order to use it you have to create instances of this class and populate annotation collection.
 * Background annotation is drawn as rectangular area offset around annotated item. 
 * If two items backgrounds overlap each other they are merged into one background area.
 *
 * @param {object} arg0 Object properties.
 */
primitives.famdiagram.BackgroundAnnotationConfig = function (arg0) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distiguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = primitives.common.AnnotationType.Background;

  /**
   * Collection of nodes ids this background annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

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
  this.zOrderType = primitives.common.ZOrderType.Auto;


  /**
   * Sets background offset around annotated items.
   * 
   * @type {Thickness}
   */
  this.offset = new primitives.common.Thickness(18, 18, 18, 18);

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
  this.lineType = primitives.common.LineType.Solid;

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