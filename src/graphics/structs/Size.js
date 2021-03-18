/**
 * @class Size
 * @classdesc Size object defines width and height.
 * 
 * @param {Size} arg0 Size object to clone.
 * 
 * @param {number} arg0 Width.
 * @param {number} arg1 Height.
 */
export default function Size(arg0, arg1) {
  /**
   * The width
   * @type {number}
   */
  this.width = 0;

  /**
   * The height
   * @type {number}
   */
  this.height = 0;

  switch (arguments.length) {
    case 1:
      this.width = arg0.width;
      this.height = arg0.height;
      break;
    case 2:
      this.width = arg0;
      this.height = arg1;
      break;
    default:
      break;
  }
};

/**
 * Checks if size is empty. Size is empty if one of its dimensions is undefined or less than zero.
 * 
 * @returns {boolean} Returns true if size is empty.
 */
 Size.prototype.isEmpty = function () {
  return this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/**
 * Inverts size dimensions
 * 
 * @returns {Size} Returns reference to the current size.
 */
Size.prototype.invert = function () {
  var width = this.width;
  this.width = this.height;
  this.height = width;
  return this;
};

/**
 * Scales the size by the specified value
 * 
 * @param {number} scale
 * @returns {Size} Returns reference to the current size.
 */
Size.prototype.scale = function (scale) {
  this.width = this.width * scale;
  this.height = this.height * scale;
  return this;
};

/**
 * Returns square size
 * 
 * @returns {number} Returns square size.
 */
Size.prototype.space = function () {
  return this.width * this.height;
};


/**
 * Returns size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Size.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    width: this.width + units,
    height: this.height + units
  };
  return result;
};

/**
 * Crops the size by the other size object.
 * 
 * @param {Size} size The size to use as the crop boundaries.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.cropBySize = function (size) {
  this.width = Math.min(this.width, size.width);
  this.height = Math.min(this.height, size.height);

  return this;
};

/**
 * Extends the current size by the other size.
 * 
 * @param {Size} size The size to use as extension.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.maxSize = function (size) {
  this.width = Math.max(this.width, size.width);
  this.height = Math.max(this.height, size.height);

  return this;
};

/**
 * Expands the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for expansion.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.addThickness = function (thickness) {
  this.width = Math.max(0, this.width + thickness.left + thickness.right);
  this.height = Math.max(0, this.height + thickness.top + thickness.bottom);

  return this;
};

/**
 * Shrinks the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for contraction.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.removeThickness = function (thickness) {
  this.width = Math.max(0, this.width - thickness.left - thickness.right);
  this.height = Math.max(0, this.height - thickness.top - thickness.bottom);

  return this;
};

/**
 * Validates size properties
 * 
 * @returns {boolean} Returns true if size properties are valid.
 */
Size.prototype.validate = function () {
  if (isNaN(this.width) || isNaN(this.height)) {
    throw "Invalid size.";
  }
};