/**
 * @class RenderEventArgs
 * @classdesc This is object parameter of rendering callback function 
 */
export default function RenderEventArgs() {
  /**
   * Node id
   * @type {string}
   */
  this.id = null;

  /**
   * Reference to DOM element.
   * @type {object}
   */
  this.element = null;

  /**
   * Context object of the node
   * @type {object}
   */
  this.context = null;

  /**
   * Node template name
   * @type {string}
   */
  this.templateName = null;

  /**
   * This option indicates current template state.
   * @type {RenderingMode}
   */
  this.renderingMode = null;

  /**
   * The rendered item is current diagram cursor item
   * @type {boolean}
   */
  this.isCursor = false;

  /**
   * The rendered item is selected
   * @type {boolean}
   */
  this.isSelected = false;
};