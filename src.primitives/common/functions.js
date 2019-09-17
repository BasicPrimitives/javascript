/**
 * Indicates whether the specified number is even or not.
 * 
 * @param {number} value The number to test.
 * @returns {boolean} Returns true if the value is even.
 * @ignore
 */
primitives.common.isEven = function (value) {
  return value % 2 == 0;
};

/**
 * Indicates whether the specified string is null or an Empty string.
 * 
 * @ignore
 * @param {string} value The string to test.
 * @returns {boolean} Returns true if the value is null or an empty string(""); otherwise, false.
 */
primitives.common.isNullOrEmpty = function (value) {
  var result = true,
    string;
  if (value !== undefined && value !== null) {
    string = value.toString();
    if (string.length > 0) {
      result = false;
    }
  }
  return result;
};

/**
 * Indicates whether the specified value is array.
 * 
 * @param {*} value The value to test.
 * @returns {boolean} Returns true if the value is array; otherwise, false.
 * @ignore
 */
primitives.common.isArray = Array.isArray || function (val) {
  return (val instanceof Array);
};

/**
 * Callback for looping collection items
 *
 * @callback onLoopItemCallback
 * @param {number} index An index of the collection item
 * @param {Object} item A collection item
 * @returns {boolean} Returns true to break iteration process
 */

/**
 * Loops array elements or object properties.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Object|Object[]} items - Array of items or object with properties to iterate on
 * @param {onLoopItemCallback} onItem A call back function to call on each item in the array or object.
 * @ignore
 */
primitives.common.loop = function (thisArg, items, onItem) {
  var key, index, len;
  if (onItem != null) {
    if (primitives.common.isArray(items)) {
      for (index = 0, len = items.length; index < len; index += 1) {
        if (onItem.call(thisArg, index, items[index])) {
          break;
        }
      }
    } else {
      for (key in items) {
        if (items.hasOwnProperty(key)) {
          if (onItem.call(thisArg, key, items[key])) {
            break;
          }
        }
      }
    }
  }
};

/**
 * Splits string of merged cameled words into array.
 * 
 * @param {string} name String of cameled words
 * @returns {string[]} Returns array of cameled words
 * @ignore
 */
primitives.common.splitCamelCaseName = function (name) {
  var result = [];
  var word = "";
  for (var i = 0; i < name.length; i += 1) {
    var c = name[i];
    if (c >= 'A' && c <= 'Z') {
      if (word !== "") {
        result.push(word);
      }
      word = c;
    } else {
      word += c;
    }
  }
  if (word !== "") {
    result.push(word);
  }
  return result;
};

/**
 * Indicates whether the specified value is object
 * 
 * @param {string} item The value to test.
 * @returns {boolean} Returns true if the item is object otherwise, false.
 * @ignore
 */
primitives.common.isObject = function (item) {
  return item !== null && typeof item == 'object';
};

/**
 * Indicates whether the specified object is empty.
 * 
 * @param {string} item The object to test.
 * @returns {boolean} Returns true if the item is empty object otherwise, false.
 * @ignore
 */
primitives.common.isEmptyObject = function (item) {
  var key;
  for (key in item) {
    if (item.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/**
 * Makes deep copy of the object.
 * 
 * @param {object} source The source object to take values from
 * @param {boolean} isShallow If true then method makes shallow copy
 * @returns {object} Returns cloned copy of the object
 * @ignore
 */
primitives.common.cloneObject = function (source, isShallow) {
  var result;
  if (source === null) {
    result = null;
  } else if (source instanceof Array) {
    if (isShallow) {
      result = source.slice(0);
    } else {
      result = [];
      for (var index = 0, len = source.length; index < len; index += 1) {
        result.push(primitives.common.cloneObject(source[index], isShallow));
      }
    }
  } else {
    switch (typeof source) {
      case 'object':
        result = {};
        for (var property in source) {
          if (source.hasOwnProperty(property)) {
            if (isShallow) {
              result[property] = source[property];
            } else {
              result[property] = primitives.common.cloneObject(source[property], isShallow);
            }
          }
        }
        break;
      default:
        result = source;
        break;
    }
  }
  return result;
};

/**
 * Shallow copy of source object properites into destination
 * 
 * @param {object} destination The object to add properties to
 * @param {object} source The source object to take values from
 * @returns {object} Returns reference to destination object
 * @ignore
 */
primitives.common.mergeObjects = function (destination, source) {
  for (var index = 1; index < arguments.length; index += 1) {
    var src = arguments[index];
    if (src != null) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          destination[key] = src[key];
        }
      }
    }
  }
  return destination;
};

/**
 * Returns hash code for specified string value. This function is not needed because 
 * JavaScript supports near unlimited length of object property names.
 * 
 * @param {string} value The string to calculate hash code for.
 * @returns {number} Returns hash code for the given string
 * @ignore
 */
primitives.common.hashCode = function (value) {
  var hash = 0,
    character,
    i;
  /*ignore jslint start*/
  if (value.length > 0) {
    for (i = 0; i < value.length; i += 1) {
      character = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash = hash & hash;
    }
  }
  /*ignore jslint end*/
  return hash;
};

/**
 * Callback for items comparison
 *
 * @callback compFuncCallback
 * @param {Object} item1 First item to compare
 * @param {Object} item2 Second item to compare
 * @returns {number} Returns true if items are equal
 */

/**
 * Searches specified item in the array
 * 
 * @param {object[]} vector An array through which to search.
 * @param {object} item  The value to search for.
 * @param {compFuncCallback} compFunc Callback function to compair two objects
 * @returns {number} Returns index of the item in the array or -1 if item is not found
 */
primitives.common.indexOf = function (vector, item, compFunc) {
  var index,
    treeItem;
  for (index = 0; index < vector.length; index += 1) {
    treeItem = vector[index];
    if (compFunc != null ? compFunc(treeItem, item) : treeItem == item) {
      return index;
    }
  }
  return -1;
};

primitives.common._supportsSVG = null;

/**
 * Checks if browser supports HTML SVG graphics.
 * 
 * @returns {boolean} Returns true if browser supports SVG canvas graphics.
 * @ignore
 */
primitives.common.supportsSVG = function () {
  if (primitives.common._supportsSVG === null) {
    primitives.common._supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ||
      document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
  }
  return primitives.common._supportsSVG;
};

primitives.common._supportsCanvas = null;

/**
 * Checks if browser supports HTML Canvas graphics.
 * 
 * @ignore
 * @returns {boolean} Returns true if browser supports HTML canvas graphics.
 */
primitives.common.supportsCanvas = function () {
  if (primitives.common._supportsCanvas === null) {
    primitives.common._supportsCanvas = !!window.HTMLCanvasElement;
  }
  return primitives.common._supportsCanvas;
};

/**
 * Creates graphics object for chart rendering
 * 
 * @param {GraphicsType} preferred Preferred graphics type by user
 * @param {object} widget Reference to control the graphics object is created for
 * @returns {Graphics} Returns graphics object
 * @ignore
 */
primitives.common.createGraphics = function (preferred, widget) {
  var result = null,
    modes,
    key,
    index;

  modes = [preferred];
  for (key in primitives.common.GraphicsType) {
    if (primitives.common.GraphicsType.hasOwnProperty(key)) {
      modes.push(primitives.common.GraphicsType[key]);
    }
  }
  for (index = 0; result === null && index < modes.length; index += 1) {
    switch (modes[index]) {
      case primitives.common.GraphicsType.SVG:
        if (primitives.common.supportsSVG()) {
          result = new primitives.common.SvgGraphics(widget);
        }
        break;
      case primitives.common.GraphicsType.Canvas:
        if (primitives.common.supportsCanvas()) {
          result = new primitives.common.CanvasGraphics(widget);
        }
        break;
    }
  }
  return result;
};

/**
 * Checks if browser is Chrome.
 * 
 * @returns {boolean} Returns true if browser is chrome.
 * @ignore
 */
primitives.common.isChrome = function () {
  if (navigator != null) { //ignore jslint
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); //ignore jslint
  }
  return false;
};

/**
 * Converts color string into HEX color string.
 * 
 * @param {string} color Regular HTML color string.
 * @returns {string} Returns color value in form of HEX string.
 */
primitives.common.getColorHexValue = function (color) {
  var digits,
    red,
    green,
    blue,
    rgb,
    colorIndex,
    colorKey;
  if (color.substr(0, 1) === '#') {
    return color;
  }

  /*ignore jslint start*/
  digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
  /*ignore jslint end*/
  if (digits !== null && digits.length > 0) {
    red = parseInt(digits[2], 10);
    green = parseInt(digits[3], 10);
    blue = parseInt(digits[4], 10);

    /*ignore jslint start*/
    rgb = ((red << 16) | (green << 8) | blue).toString(16);
    /*ignore jslint end*/
    return digits[1] + "000000".substr(0, 6 - rgb.length) + rgb;
  }
  if (primitives.common.ColorHexs === undefined) {
    primitives.common.ColorHexs = {};
    colorIndex = 0;
    for (colorKey in primitives.common.Colors) {
      if (primitives.common.Colors.hasOwnProperty(colorKey)) {
        primitives.common.ColorHexs[colorKey.toUpperCase()] = primitives.common.Colors[colorKey];
        colorIndex += 1;
      }
    }
  }

  return primitives.common.ColorHexs[color.toUpperCase()];
};

/**
 * Converts color string into HTML color name string or return hex color string.
 * 
 * @param {string} color Regular HTML color string
 * @returns {string} Returns HTML Color name or HEX string.
 */
primitives.common.getColorName = function (color) {
  var colorIndex,
    colorKey;
  color = primitives.common.getColorHexValue(color);

  if (primitives.common.ColorNames === undefined) {
    primitives.common.ColorNames = {};
    colorIndex = 0;
    for (colorKey in primitives.common.Colors) {
      if (primitives.common.Colors.hasOwnProperty(colorKey)) {
        primitives.common.ColorNames[primitives.common.Colors[colorKey]] = colorKey;
        colorIndex += 1;
      }
    }
  }

  return primitives.common.ColorNames[color];
};

/**
 * Gets red value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns red value of the HEX color string. 
 */
primitives.common.getRed = function (color) {
  if (color.substr(0, 1) === '#' && color.length === 7) {
    return parseInt(color.substr(1, 2), 16);
  }
  return null;
};

/**
 * Gets green value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns green value of the HEX color string. 
 */
primitives.common.getGreen = function (color) {
  if (color.substr(0, 1) === '#' && color.length === 7) {
    return parseInt(color.substr(3, 2), 16);
  }
  return null;
};

/**
 * Gets blue value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns blue value of the HEX color string. 
 */
primitives.common.getBlue = function (color) {
  if (color.substr(0, 1) === '#' && color.length === 7) {
    return parseInt(color.substr(5, 2), 16);
  }
  return null;
};

/**
 * Calculates before opacity color value producing color you need after applying opacity.
 * 
 * @param {string} color The color you want to get after applying opacity.
 * @param {number} opacity Opacity
 * @returns {string} The HEX color before opacity
 */
primitives.common.beforeOpacity = function (color, opacity) {
  var common = primitives.common,
    red,
    green,
    blue,
    rgb;
  color = common.getColorHexValue(color);

  red = Math.ceil((common.getRed(color) - (1.0 - opacity) * 255.0) / opacity);
  green = Math.ceil((common.getGreen(color) - (1.0 - opacity) * 255.0) / opacity);
  blue = Math.ceil((common.getBlue(color) - (1.0 - opacity) * 255.0) / opacity);

  /*ignore jslint start*/
  rgb = ((red << 16) | (green << 8) | blue).toString(16);
  /*ignore jslint end*/
  return '#' + "000000".substr(0, 6 - rgb.length) + rgb;
};

/**
 * Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.
 * 
 * @param {string} baseColor Base color to compare with
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 * 
 * @returns {string} Returns highest contrast color compared to base color.
 */
primitives.common.highestContrast = function (baseColor, firstColor, secondColor) {
  var result = firstColor,
    common = primitives.common,
    key = baseColor + "," + firstColor + "," + secondColor;

  if (common.highestContrasts === undefined) {
    common.highestContrasts = {};
  }
  if (common.highestContrasts.hasOwnProperty(key)) {
    result = common.highestContrasts[key];
  } else {
    if (common.luminosity(firstColor, baseColor) < common.luminosity(secondColor, baseColor)) {
      result = secondColor;
    }
    common.highestContrasts[key] = result;
  }
  return result;
};

/**
 * Calculates luminosity between two HEX string colors.
 * 
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 * 
 * @returns {number} Returns luminosity value
 */
primitives.common.luminosity = function (firstColor, secondColor) {
  var result,
    common = primitives.common,
    first = common.getColorHexValue(firstColor),
    second = common.getColorHexValue(secondColor),
    firstLuminosity =
      0.2126 * Math.pow(common.getRed(first) / 255.0, 2.2) +
      0.7152 * Math.pow(common.getRed(first) / 255.0, 2.2) +
      0.0722 * Math.pow(common.getRed(first) / 255.0, 2.2),
    secondLuminosity =
      0.2126 * Math.pow(common.getRed(second) / 255.0, 2.2) +
      0.7152 * Math.pow(common.getRed(second) / 255.0, 2.2) +
      0.0722 * Math.pow(common.getRed(second) / 255.0, 2.2);

  if (firstLuminosity > secondLuminosity) {
    result = (firstLuminosity + 0.05) / (secondLuminosity + 0.05);
  }
  else {
    result = (secondLuminosity + 0.05) / (firstLuminosity + 0.05);
  }

  return result;
};

/**
 * Callback for getting item key for an element of the array
 *
 * @callback getKeyFuncCallback
 * @param {Object} item A collection item
 * @returns {number} Returns key of the item 
 */

/**
 * Compares non-sorted arrays.
 *
 * @param {Object[]} array1 - The first collection of elements.
 * @param {Object[]} array2 - The second collection of elements.
 * @param {getKeyFuncCallback|undefined} getKeyFunc If callback function is defined it is used to get a key for an array element
 * @returns {boolean} Returns true if the arrays are identical.
*/
primitives.common.compareArrays = function (array1, array2, getKeyFunc) {
  var result = true,
    index, len, value,
    hashArray1;
  if (array1.length != array2.length) {
    result = false;
  } else {
    hashArray1 = {};
    for (index = 0, len = array1.length; index < len; index += 1) {
      value = getKeyFunc != null ? getKeyFunc(array1[index]) : array1[index];
      if (hashArray1.hasOwnProperty(value)) {
        hashArray1[value] += 1;
      } else {
        hashArray1[value] = 1;
      }
    }
    for (index = 0, len = array2.length; index < len; index += 1) {
      value = getKeyFunc != null ? getKeyFunc(array2[index]) : array2[index];
      if (!hashArray1.hasOwnProperty(value)) {
        result = false;
        break;
      } else {
        hashArray1[value] -= 1;
        if (hashArray1[value] < 0) {
          result = false;
          break;
        }
      }
    }
  }
  return result;
};