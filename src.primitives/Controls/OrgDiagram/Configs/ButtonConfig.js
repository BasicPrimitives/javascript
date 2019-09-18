/**
 * @class ButtonConfig
 * @classdesc The buttons panel on the side of the diagram nodes is one of our default easy to use features.
 * This gives you the possibility to try and see how context buttons work being placed inside of diagram layout.
 * This object provides configuration properties for buttons rendered using HTML buttons elements.
 * 
 * Please, pay attention that diagram visual element are rendered in layers on top of each other, so buttons panel
 * is rendered as the very last layer of the diagram, so its mouse events are never blocked by any other visual elements.
 * 
 * See `onButtonClick` event handler in control's configuration object.
 *
 * @param {string} name Name
 * @param {string} icon Icon
 * @param {string} tooltip Tooltip
 */
primitives.orgdiagram.ButtonConfig = function (name, icon, tooltip) {
  /**
   * Button name. It is needed for `onButtonClick` event handler.
   * 
   * @type {string}
   */
  this.name = name;

  /**
   * Name of icon used in jQuery UI.
   * 
   * @type {string}
   */
  this.icon = icon;

  /**
   * If true show button text
   * @type {boolean}
   */
  this.text = false;

  /**
   * Text to show on the button.
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Button tooltip content. Tooltip is rendered using jQuery UI tooltip widget, so it should be part of jQuery UI distribution
   * in order to make this property work.
   * 
   * @type {string}
   */
  this.tooltip = tooltip;

  /**
   * Button size
   * 
   * @type {Size}
   */
  this.size = new primitives.common.Size(16, 16);
};