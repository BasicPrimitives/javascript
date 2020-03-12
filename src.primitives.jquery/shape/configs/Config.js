/*
  Class: primitives.connector.Config
    Connector options class.
  
*/
primitives.shape.Config = function () {
  this.classPrefix = "bpconnector";

  /**
   * Sets prefered rendering technology. If selected graphics type is not supported on the device,
   * then control will auto fallback to the first available one.
   * 
   * @type {GraphicsType}
   */
  this.graphicsType = primitives.common.GraphicsType.Canvas;

  /**
   * Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction,
   * this is needed for Arabic support and various layouts.
   * 
   * @type {OrientationType}
   */
  this.orientationType = primitives.common.OrientationType.Top;

  /**
   * Shape
   * 
   * @type {ShapeType}
   */
  this.shapeType = primitives.common.ShapeType.Rectangle;

  /**
   * Sets shapes bounding rectangle position. 
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Sets bounding rectangle offset
   * 
   * @type {Thickness}
   */
  this.offset = new primitives.common.Thickness(0, 0, 0, 0);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Corner radius. Body corner radius in percents or pixels. For applicable shapes only.
   * 
   * @type {string|number}
   */
  this.cornerRadius = "10%";

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Shape border line color.
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Shape background fill color.
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Shape border line pattern.
   * 
   * @type {LineType}
   */
  this.lineType = primitives.common.LineType.Solid;

  /**
   * Annotation label text. Label styled with css class name "bp-connector-label".
   * 
   * @type {string|undefined}
   */
  this.label = null;

  /**
   * Label size
   * @type {Size}
   */
  this.labelSize = new primitives.common.Size(60, 30);

  /**
   * Label placement relative to the shape.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = primitives.common.PlacementType.Auto;

  /**
   * Label offset from shape in pixels.
   * 
   * @type {number}
   */
  this.labelOffset = 4;
};