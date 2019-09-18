/**
 * @class LabelAnnotationConfig
 * @classdesc In-layout label annotation. Label anntations are placed in layout between nodes, they preserve
 * space between nodes, so they don't overlap neighbouring nodes. Label annotations are designed 
 * for autoplacement and bundling of connection lines between nodes when needed.
 *
 * @param {object} arg0 Object properties.
 */
primitives.famdiagram.LabelAnnotationConfig = function (arg0, arg1) {
  var property;

  /**
   * Annotation type. All types of annotations objects are added to `annotations` collection property of the control.
   * This property is needed to distiguish them when they are defined as JSON objects.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = primitives.common.AnnotationType.Label;

  /**
   * This is the item id you are creating annotation for.
   * @type {string}
   */
  this.fromItem = null;

  /**
   * This collection should contain only child or parent items of the annotated item. It cannot conatain children and parents at the same time.
   * If it contain sub set of children then annotaion label bundles children into subset and annotations form cascades 
   * of labels over connection lines in the diagram.
   * 
   * @type {string[]}
   */
  this.toItems = [];

  /**
   * Title. Annotation label text, it is styled with css class name "bp-connector-label".
   * 
   * @type {string}
   */
  this.title = null;

  /**
   * Default template title background color.
   * 
   * @type {string}
   */
  this.itemTitleColor = primitives.common.Colors.RoyalBlue;

  /**
   * Template name used to render this label.
   * 
   * @type {string}
   */
  this.templateName = null;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 2:
      this.fromItem = arg0;
      this.toItem = arg1;
      break;
  }
};