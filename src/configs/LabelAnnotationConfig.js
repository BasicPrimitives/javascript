import {AnnotationType, Colors } from '../enums';
/**
 * @class LabelAnnotationConfig
 * @classdesc In-layout label annotations are placed between nodes,
 * impacting diagram layout and node placement. Label annotations are
 * designed for auto-placement and bundling connection lines between nodes when needed.
 *
 * @param {object} arg0 Object properties.
 */
export default function LabelAnnotationConfig(arg0, arg1) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Label;

  /**
   * This is the item id you are creating annotation for.
   * 
   * @type {string}
   */
  this.fromItem = null;

  /**
   * The collection of destination nodes should have only child or parent 
   * items of the annotated item simultaneously. It cannot include children 
   * and parents at the same time. Suppose the annotated item has several
   * label annotations for different sub-sets of children. In that case,
   * annotations form into cascades of labels over connection lines in the diagram.
   * 
   * @type {string[]}
   */
  this.toItems = [];

  /**
   * The label of the annotation. It is styled with `bp-connector-label` CSS class name.
   * 
   * @type {string}
   */
  this.title = null;

  /**
   * Background color.
   * 
   * @type {string}
   */
  this.itemTitleColor = Colors.RoyalBlue;

  /**
   * Item template name. See items templates collection for more details.
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