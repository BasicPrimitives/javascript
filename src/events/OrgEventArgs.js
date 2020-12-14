/**
 * @class EventArgs
 * 
 * Context object
 */
export default function OrgEventArgs() {
  /**
   * Current item
   * 
   * @type {string}
   */
  this.oldContext = null;

  /**
   * New item
   * 
   * @type {string}
   */
  this.context = null;

  /**
   * Parent item
   * 
   * @type {string}
   * @ignore
   */
  this.parentItem = null;

  /**
   * Node position on the diagram.
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Relative object name.
   * 
   * @type {string}
   */
  this.name = null;

  /**
   * If true cancels subsequent event and layout update.
   * 
   * @type {boolean}
   */
  this.cancel = false;
};