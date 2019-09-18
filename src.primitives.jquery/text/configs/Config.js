/**
 * @class primitives.text.Config
 * 
 * Rotated text configuration object
 */
primitives.text.Config = function () {
  this.classPrefix = "bptext";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.SVG;

  /**
   * Label orientation.
   * 
   * @type {TextOrientationType}
   */
  this.orientation = primitives.text.TextOrientationType.Horizontal;

  /**
   * The text
   * 
   * @type {string}
   */
  this.text = "";


  /**
   * Label vertical alignment inside bounding rectangle.
   * 
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = primitives.common.VerticalAlignmentType.Middle;

  /**
   * Label horizontal alignment inside bounding rectangle.
   * 
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = primitives.common.HorizontalAlignmentType.Center;

  /**
   * Font size
   * 
   * @type {string}
   */
  this.fontSize = "16px";

  /**
   * Font family
   * 
   * @type {string}
   */
  this.fontFamily = "Arial";

  /**
   * Font color
   * 
   * @type {string}
   */
  this.color = primitives.common.Colors.Black;

  /**
   * Font weight: normal | bold
   * 
   * @type {string}
   */
  this.fontWeight = "normal";

  /**
   * Font style: normal | italic
   * 
   * @type {string}
   */
  this.fontStyle = "normal";
};