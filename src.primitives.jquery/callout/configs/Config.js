/**
 * @class primitives.callout.Config
 * 
 * Callout configuration object.
 */
primitives.callout.Config = function () {
  this.classPrefix = "bpcallout";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Sets callout pointer attachment to one of its sides or corners.
   * 
   * @type {PlacementType}
   */
  this.pointerPlacement = primitives.common.PlacementType.Auto;

  /**
   * Sets callout body position
   * 
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Sets callout snap point.
   * 
   * @type {Point}
   */
  this.snapPoint = null;

  /**
   * Callout annotation corner radius.
   * 
   * @type {string}
   */
  this.cornerRadius = "10%";

  /**
   * Callout body offset
   * 
   * @type {number}
   */
  this.offset = 0;

  /**
   * Background fill opacity. 
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Callout border line width
   * 
   * @type {number}
   */
  this.lineWidth = 1;

  /**
   * Borde line pattern.
   * 
   * @type {string}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Pointer base width in percents or pixels. 
   * 
   * @type {string|number}
   */
  this.pointerWidth = "10%";

  /**
   * Border line color
   * 
   * @type {string}
   */
  this.borderColor = primitives.common.Colors.Black;

  /**
   * Background fill color
   * 
   * @type {string}
   */
  this.fillColor = primitives.common.Colors.LightGray;
};