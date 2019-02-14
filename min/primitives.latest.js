/**
 * @preserve Basic Primitives Diagram v5.2.2
 * Copyright (c) 2013 - 2019 Basic Primitives Inc
 *
 * Non-commercial - Free
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * Commercial and government licenses:
 * http://www.basicprimitives.com/pdf/license.pdf
 *
 */
/* File: Basic Primitives (primitives.latest.js)*/
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return (root.primitives = factory());
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = (root.primitives = factory());
    } else {
        root.primitives = factory();
    }
}(this, function () {



/* /common/init.js*/
var primitives = {
    common: {
        version: "5.2.2"
    },
    orgdiagram: {},
    famdiagram: {},
    text: {},
    callout: {},
    connector: {},
    shape: {},
    pdf: {
        orgdiagram: {},
        famdiagram: {}
    }
};

/* /common/dom.js*/
primitives.common.getElementsByName = function(thisArg, parent, name, onNode) {
	var nodes = parent.getElementsByTagName("*");
	for (var index = 0; index < nodes.length; index += 1) {
		var node = nodes[index];
		if (node.name == name) {
			onNode.call(thisArg, node);
		}
	}
};

primitives.common.getFixOfPixelALignment = function (element) {
	var elementClientRectangle = element.getBoundingClientRect(),
		top = elementClientRectangle.top + document.body.scrollTop,
		left = elementClientRectangle.left + document.body.scrollLeft;
	return new primitives.common.Size(-left + Math.floor(left), -top + Math.floor(top));
};

primitives.common.getElementOffset = function (element) {
	var rect = element.getBoundingClientRect();
	var ownerDocument = element.ownerDocument;
	var documentElement = ownerDocument.documentElement;

	return {
		top: rect.top + window.pageYOffset - documentElement.clientTop,
		left: rect.left + window.pageXOffset - documentElement.clientLeft
	};
};

primitives.common.hasClass = function (element, className) {
	var classNames = element.className;
	if (classNames != null && typeof classNames == "string") {
		var list = classNames.split(" ");
		for(var index = 0; index < list.length; index+=1) {
			if (list[index] == className) {
				return true;
			}
		}
	}
	return false;
};

/*
	Function: primitives.common.stopPropogation
	This method uses various approaches used in different browsers to stop event propagation.
	Parameters:
	event - Event to be stopped.
*/
primitives.common.stopPropagation = function (event) {
	if (event.stopPropagation !== undefined) {
		event.stopPropagation();
	} else if (event.cancelBubble !== undefined) {
		event.cancelBubble = true;
	} else if (event.preventDefault !== undefined) {
		event.preventDefault();
	}
};

primitives.common.getInnerSize = function (element) {
	var size = window.getComputedStyle(element);

	return new primitives.common.Size(parseInt(size.width, 10), parseInt(size.height, 10));
};

/* /common/functions.js*/
/*
	Function: primitives.common.isEven
	Indicates whether the specified number is even or not.
	
	Parameters:
	value - The number to test.
	Returns: 
	true if the value is even.
*/
primitives.common.isEven = function (value) {
	return value%2 == 0;
};

/*
	Function: primitives.common.isNullOrEmpty
	Indicates whether the specified string is null or an Empty string.
	
	Parameters:
	value - The string to test.
	Returns: 
	true if the value is null or an empty string(""); otherwise, false.
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

/*
	Function: primitives.common.isArray
	Indicates whether the specified value is array.
	
	Parameters:
	value - The value to test.
	Returns: 
	true if the value is array; otherwise, false.
*/
primitives.common.isArray = Array.isArray || function (val) {
	return (val instanceof Array);
};

/*
	Function: primitives.common.loop
	Method to loop through array of object properties
	
	Parameters:
	thisArg - Call back function call context.
	items - array of items or object with properties to itterate on
	onItem - call back function to call on each item in the array or object. If call back function returns true then break itteration
*/
primitives.common.loop = function (thisArg, items, onItem) { // onItem([index,key], value)
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

/*
	Function: primitives.common.splitCamelCaseName
	Split string of merged cameled words into array.
	
	Parameters:
	name - The string to split.
	Returns: 
	array of split words
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

/*
	Function: primitives.common.isEmptyObject
	Indicates whether the specified object is empty.
	
	Parameters:
	item - The object to test.
	Returns: 
	true if the item is object otherwise, false.
*/
primitives.common.isObject = function (item) {
	return item !== null && typeof item == 'object';
};

/*
	Function: primitives.common.isEmptyObject
	Indicates whether the specified object is empty.
	
	Parameters:
	item - The object to test.
	Returns: 
	true if the item is object otherwise, false.
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

/*
	Function: primitives.common.deepClone
	Makes deep copy of variable.
	
	Parameters:
	source - Source value.
	keepContext - if true then it makes _context reference property of every copied object
	callback - is function called for every object property function(result, source, property) {}

	Returns: 
	Copy of cloned variable.
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

/*
	Function: primitives.common.mergeObjects
	Shallow copy of source object properites into destination
	
	Parameters:
	destination - The object to add properties to
	source - The source object
	Returns: 
	destination object
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

/*
	Function: primitives.common.hashCode
	Returns hash code for specified string value.
	
	Parameters:
	value - The string to calculate hash code.
	Returns:
	int hash code.
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

/*
	Function: primitives.common.indexOf
	Searches array for specified item and returns index (or -1 if not found)
	Parameters:
	vector - An array through which to search.
	item - The value to search for.
	Returns:
	Index of search item or -1 if not found.
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

/*
	Function: primitives.common.supportsSVG
	Indicates whether the browser supports SVG graphics.
	
	Returns: 
	true if browser supports SVG graphics.
*/
primitives.common.supportsSVG = function () {
	if (primitives.common._supportsSVG === null) {
		primitives.common._supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ||
			document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
	}
	return primitives.common._supportsSVG;
};

primitives.common._supportsCanvas = null;

/*
	Function: primitives.common.supportsCanvas
	Indicates whether the browser supports HTML Canvas graphics.
	
	Returns: 
	true if browser supports HTML Canvas graphics.
*/
primitives.common.supportsCanvas = function () {
	if (primitives.common._supportsCanvas === null) {
		primitives.common._supportsCanvas = !!window.HTMLCanvasElement;
	}
	return primitives.common._supportsCanvas;
};

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
			case 0/*primitives.common.GraphicsType.SVG*/:
				if (primitives.common.supportsSVG()) {
					result = new primitives.common.SvgGraphics(widget);
				}
				break;
			case 1/*primitives.common.GraphicsType.Canvas*/:
				if (primitives.common.supportsCanvas()) {
					result = new primitives.common.CanvasGraphics(widget);
				}
				break;
		}
	}
	return result;
};

primitives.common.isChrome = function () {
	if (navigator != null) { //ignore jslint
		return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); //ignore jslint
	}
	return false;
};

/*
	Function: primitives.common.getColorHexValue
	Converts color string into HEX color string.
	
	Parameters:
	color - regular HTML color string.

	Returns: 
		Color value in form of HEX string.
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

/*
	Function: primitives.common.getColorName
		Converts color string into HTML color name string or return hex color string.
	
	Parameters:
	color - regular HTML color string.

	Returns: 
		HTML Color name or HEX string.
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

/*
	Function: primitives.common.getRed
		Gets red value of HEX color string.
	
	Parameters:
	color - HEX string color value.

	Returns: 
		Int value.
*/
primitives.common.getRed = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(1, 2), 16);
	}
	return null;
};

/*
	Function: primitives.common.getGreen
		Gets green value of HEX color string.

	Parameters:
	color - HEX string color value.
	
	Returns: 
		Int value.
*/
primitives.common.getGreen = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(3, 2), 16);
	}
	return null;
};

/*
	Function: primitives.common.getBlue
		Gets blue value of HEX color string.
	
	Parameters:
	color - HEX string color value.

	Returns: 
		Int value.
*/
primitives.common.getBlue = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(5, 2), 16);
	}
	return null;
};

/*
	Function: primitives.common.beforeOpacity
		Calculates before opacity color value producing color you need after applying opacity.
	
	Parameters:
	color - Color you need after applying opacity.
	opacity - Value of opacity.

	Returns: 
		HEX color value.
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

/*
	Function: primitives.common.highestContrast
		Calculates contrast between base color and two optional first and second colors
		and returns the one which has highest contrast.
	
	Parameters:
	baseColor - Base color to compare with.
	firstColor - First color.
	secondColor - Second color.

	Returns: 
		Color value.
*/
primitives.common.highestContrast = function (baseColor, firstColor, secondColor) {
	var result = firstColor,
		common = primitives.common,
		key = baseColor + "," + firstColor  + "," + secondColor;

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

/*
	Function: primitives.common.luminosity
		Calculates luminosity between two HEX string colors.
	
	Parameters:
	firstColor - First color.
	secondColor - Second color.

	Returns: 
		Luminosity value
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

/*
	Function: primitives.common.compareArrays
		Compares non-object non-sorted arrays.
	
	Parameters:
	array1 - First array.
	array2 - Second array.

	Returns: 
		True if arrays are identical.
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

/* /common/jsonml-html.js*/
/*
	jsonml-html.js
	JsonML to HTML utility

	Created: 2006-11-09-0116
	Modified: 2012-11-24-1051

	Copyright (c)2006-2012 Stephen M. McKamey
	Distributed under The MIT License: http://jsonml.org/license

	This file ensures a global JsonML object adding these methods:

		JsonML.toHTML(JsonML, filter)

			This method produces a tree of DOM elements from a JsonML tree. The
			array must not contain any cyclical references.

			The optional filter parameter is a function which can filter and
			transform the results. It receives each of the DOM nodes, and
			its return value is used instead of the original value. If it
			returns what it received, then structure is not modified. If it
			returns undefined then the member is deleted.

			This is useful for binding unobtrusive JavaScript to the generated
			DOM elements.

			Example:

			// Parses the structure. If an element has a specific CSS value then
			// takes appropriate action: Remove from results, add special event
			// handlers, or bind to a custom component.

			var myUI = JsonML.toHTML(myUITemplate, function (elem) {
				if (elem.className.indexOf('Remove-Me') >= 0) {
					// this will remove from resulting DOM tree
					return null;
				}

				if (elem.tagName && elem.tagName.toLowerCase() === 'a' &&
					elem.className.indexOf('External-Link') >= 0) {
					// this is the equivalent of target='_blank'
					elem.onclick = function(evt) {
						window.open(elem.href); return false;
					};

				} else if (elem.className.indexOf('Fancy-Widgit') >= 0) {
					// bind to a custom component
					FancyWidgit.bindDOM(elem);
				}
				return elem;
			});

		JsonML.toHTMLText(JsonML)
			Converts JsonML to HTML text

		// Implement onerror to handle any runtime errors while binding:
		JsonML.onerror = function (ex, jml, filter) {
			// display inline error message
			return document.createTextNode('['+ex+']');
		};
*/

primitives.common.JsonML = {};

if (typeof document !== 'undefined') {

	(function (JsonML, document) {
		'use strict';

		/**
		 * Attribute name map
		 * 
		 * @private
		 * @constant
		 * @type {Object.<string>}
		 */
		var ATTR_MAP = {
			'accesskey': 'accessKey',
			'bgcolor': 'bgColor',
			'cellpadding': 'cellPadding',
			'cellspacing': 'cellSpacing',
			'checked': 'defaultChecked',
			'class': 'className',
			'colspan': 'colSpan',
			'contenteditable': 'contentEditable',
			'defaultchecked': 'defaultChecked',
			'for': 'htmlFor',
			'formnovalidate': 'formNoValidate',
			'hidefocus': 'hideFocus',
			'ismap': 'isMap',
			'maxlength': 'maxLength',
			'novalidate': 'noValidate',
			'readonly': 'readOnly',
			'rowspan': 'rowSpan',
			'spellcheck': 'spellCheck',
			'tabindex': 'tabIndex',
			'usemap': 'useMap',
			'willvalidate': 'willValidate'
			// can add more attributes here as needed
		};

		/**
		 * Attribute duplicates map
		 * 
		 * @private
		 * @constant
		 * @type {Object.<string>}
		 */
		var ATTR_DUP = {
			'enctype': 'encoding',
			'onscroll': 'DOMMouseScroll'
			// can add more attributes here as needed
		};

		/**
		 * Attributes to be set via DOM
		 * 
		 * @private
		 * @constant
		 * @type {Object.<number>}
		 */
		var ATTR_DOM = {
			'autocapitalize': 1,
			'autocomplete': 1,
			'autocorrect': 1
			// can add more attributes here as needed
		};

		/**
		 * Boolean attribute map
		 * 
		 * @private
		 * @constant
		 * @type {Object.<number>}
		 */
		var ATTR_BOOL = {
			'async': 1,
			'autofocus': 1,
			'checked': 1,
			'defaultchecked': 1,
			'defer': 1,
			'disabled': 1,
			'formnovalidate': 1,
			'hidden': 1,
			'indeterminate': 1,
			'ismap': 1,
			'multiple': 1,
			'novalidate': 1,
			'readonly': 1,
			'required': 1,
			'spellcheck': 1,
			'willvalidate': 1
			// can add more attributes here as needed
		};

		/**
		 * Leading SGML line ending pattern
		 * 
		 * @private
		 * @constant
		 * @type {RegExp}
		 */
		var LEADING = /^[\r\n]+/;

		/**
		 * Trailing SGML line ending pattern
		 * 
		 * @private
		 * @constant
		 * @type {RegExp}
		 */
		var TRAILING = /[\r\n]+$/;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var NUL = 0;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var FUN = 1;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var ARY = 2;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var OBJ = 3;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var VAL = 4;

		/**
		 * @private
		 * @const
		 * @type {number}
		 */
		var RAW = 5;

		/**
		 * Wraps a data value to maintain as raw markup in output
		 * 
		 * @private
		 * @this {Markup}
		 * @param {string} value The value
		 * @constructor
		 */
		function Markup(value) {
			/**
			 * @type {string}
			 * @const
			 * @protected
			 */
			this.value = value;
		}

		/**
		 * Renders the value
		 * 
		 * @public
		 * @override
		 * @this {Markup}
		 * @return {string} value
		 */
		Markup.prototype.toString = function () {
			return this.value;
		};

		/**
		 * @param {string} value
		 * @return {Markup}
		 */
		JsonML.raw = function (value) {
			return new Markup(value);
		};

		/**
		 * @param {*} value
		 * @return {boolean}
		 */
		var isMarkup = JsonML.isRaw = function (value) {
			return (value instanceof Markup);
		};

		/**
		 * Determines if the value is an Array
		 * 
		 * @private
		 * @param {*} val the object being tested
		 * @return {boolean}
		 */
		var isArray = Array.isArray || function (val) {
			return (val instanceof Array);
		};

		/**
		 * Determines if the value is a function
		 * 
		 * @private
		 * @param {*} val the object being tested
		 * @return {boolean}
		 */
		function isFunction(val) {
			return (typeof val === 'function');
		}

		/**
		 * Determines the type of the value
		 * 
		 * @private
		 * @param {*} val the object being tested
		 * @return {number}
		 */
		function getType(val) {
			switch (typeof val) {
				case 'object':
					return !val ? NUL : (isArray(val) ? ARY : (isMarkup(val) ? RAW : ((val instanceof Date) ? VAL : OBJ)));
				case 'function':
					return FUN;
				case 'undefined':
					return NUL;
				default:
					return VAL;
			}
		}

		/**
		 * Creates a DOM element 
		 * 
		 * @private
		 * @param {string} tag The element's tag name
		 * @return {Node}
		 */
		var createElement = function (tag) {
			if (!tag) {
				// create a document fragment to hold multiple-root elements
				if (document.createDocumentFragment) {
					return document.createDocumentFragment();
				}

				tag = '';

			} else if (tag.charAt(0) === '!') {
				return document.createComment(tag === '!' ? '' : tag.substr(1) + ' ');
			}

			if (tag.toLowerCase() === 'style' && document.createStyleSheet) {
				// IE requires this interface for styles
				return document.createStyleSheet();
			}

			return document.createElement(tag);
		};

		/**
		 * Adds an event handler to an element
		 * 
		 * @private
		 * @param {Node} elem The element
		 * @param {string} name The event name
		 * @param {function(Event)} handler The event handler
		 */
		var addHandler = function (elem, name, handler) {
			if (name.substr(0, 2) === 'on') {
				name = name.substr(2);
			}

			switch (typeof handler) {
				case 'function':
					if (elem.addEventListener) {
						// DOM Level 2
						elem.addEventListener(name, handler, false);

					} else if (elem.attachEvent && getType(elem[name]) !== NUL) {
						// IE legacy events
						elem.attachEvent('on' + name, handler);

					} else {
						// DOM Level 0
						var old = elem['on' + name] || elem[name];
						elem['on' + name] = elem[name] = !isFunction(old) ? handler :
							function (e) {
								return (old.call(this, e) !== false) && (handler.call(this, e) !== false);
							};
					}
					break;

				case 'string':
					// inline functions are DOM Level 0
					/*jslint evil:true */
					elem['on' + name] = new Function('event', handler);
					/*jslint evil:false */
					break;
			}
		};

		/**
		 * Apply styles to element
		 * 
		 * @public
		 * @param {Node} elem The element
		 * @param {Object} css styles object
		 * @return {Node}
		 */
		var applyStyles = JsonML.applyStyles = function (elem, css) {
			for (var key in css) {
				if (css.hasOwnProperty(key)) {
					elem.style[key] = css[key];
				}
			}
			return elem;
		};

		/**
		 * Appends an attribute to an element
		 * 
		 * @private
		 * @param {Node} elem The element
		 * @param {Object} attr Attributes object
		 * @return {Node}
		 */
		var addAttributes = function (elem, attr) {
			if (attr.name && document.attachEvent && !elem.parentNode) {
				try {
					// IE fix for not being able to programatically change the name attribute
					var alt = createElement('<' + elem.tagName + ' name="' + attr.name + '">');
					// fix for Opera 8.5 and Netscape 7.1 creating malformed elements
					if (elem.tagName === alt.tagName) {
						elem = alt;
					}
				} catch (ex) { }
			}

			// for each attributeName
			for (var name in attr) {
				if (attr.hasOwnProperty(name)) {
					// attributeValue
					var value = attr[name],
						type = getType(value);

					if (name) {
						if (type === NUL) {
							value = '';
							type = VAL;
						}

						name = ATTR_MAP[name.toLowerCase()] || name;

						if (name === '$') {
							value(elem);
						}
						else if (name == 'className') {
							if (isArray(value)) {
								for (var index = 0; index < value.length; index += 1) {
									elem.className += " " + value[index];
								}
							} else {
								elem.className += " " + value;
							}
						}
						else if (name === 'style') {
							if (getType(elem.style.cssText) !== NUL) {
								if (typeof value == "string") {
									elem.style.cssText = value;
								} else {
									applyStyles(elem, value);
								}
							} else {
								elem.style = value;
							}

						} else if (name.substr(0, 2) === 'on') {
							addHandler(elem, name, value);

							// also set duplicated events
							name = ATTR_DUP[name];
							if (name) {
								addHandler(elem, name, value);
							}

						} else if (!ATTR_DOM[name.toLowerCase()] && (type !== VAL || name.charAt(0) === '$' || getType(elem[name]) !== NUL || getType(elem[ATTR_DUP[name]]) !== NUL)) {
							// direct setting of existing properties
							elem[name] = value;

							// also set duplicated properties
							name = ATTR_DUP[name];
							if (name) {
								elem[name] = value;
							}

						} else if (ATTR_BOOL[name.toLowerCase()]) {
							if (value) {
								// boolean attributes
								elem.setAttribute(name, name);

								// also set duplicated attributes
								name = ATTR_DUP[name];
								if (name) {
									elem.setAttribute(name, name);
								}
							}

						} else {
							// http://www.quirksmode.org/dom/w3c_core.html#attributes

							// custom and 'data-*' attributes
							elem.setAttribute(name, value);

							// also set duplicated attributes
							name = ATTR_DUP[name];
							if (name) {
								elem.setAttribute(name, value);
							}
						}
					}
				}
			}
			return elem;
		};

		/**
		 * Appends a child to an element
		 * 
		 * @private
		 * @param {Node} elem The parent element
		 * @param {Node} child The child
		 */
		var appendDOM = JsonML.appendDOM = function (elem, child) {
			if (child) {
				var tag = (elem.tagName || '').toLowerCase();
				if (elem.nodeType === 8) { // comment
					if (child.nodeType === 3) { // text node
						elem.nodeValue += child.nodeValue;
					}
				} else if (tag === 'table' && elem.tBodies) {
					if (!child.tagName) {
						// must unwrap documentFragment for tables
						if (child.nodeType === 11) {
							while (child.firstChild) {
								appendDOM(elem, child.removeChild(child.firstChild));
							}
						}
						return;
					}

					// in IE must explicitly nest TRs in TBODY
					var childTag = child.tagName.toLowerCase();// child tagName
					if (childTag && childTag !== 'tbody' && childTag !== 'thead') {
						// insert in last tbody
						var tBody = elem.tBodies.length > 0 ? elem.tBodies[elem.tBodies.length - 1] : null;
						if (!tBody) {
							tBody = createElement(childTag === 'th' ? 'thead' : 'tbody');
							elem.appendChild(tBody);
						}
						tBody.appendChild(child);
					} else if (elem.canHaveChildren !== false) {
						elem.appendChild(child);
					}

				} else if (tag === 'style' && document.createStyleSheet) {
					// IE requires this interface for styles
					elem.cssText = child;

				} else if (elem.canHaveChildren !== false) {
					elem.appendChild(child);

				} else if (tag === 'object' &&
					child.tagName && child.tagName.toLowerCase() === 'param') {
					// IE-only path
					try {
						elem.appendChild(child);
					} catch (ex1) { }
					try {
						if (elem.object) {
							elem.object[child.name] = child.value;
						}
					} catch (ex2) { }
				}
			}
		};

		/**
		 * Tests a node for whitespace
		 * 
		 * @private
		 * @param {Node} node The node
		 * @return {boolean}
		 */
		var isWhitespace = function (node) {
			return !!node && (node.nodeType === 3) && (!node.nodeValue || !/\S/.exec(node.nodeValue));
		};

		/**
		 * Trims whitespace pattern from the text node
		 * 
		 * @private
		 * @param {Node} node The node
		 */
		var trimPattern = function (node, pattern) {
			if (!!node && (node.nodeType === 3) && pattern.exec(node.nodeValue)) {
				node.nodeValue = node.nodeValue.replace(pattern, '');
			}
		};

		/**
		 * Removes leading and trailing whitespace nodes
		 * 
		 * @private
		 * @param {Node} elem The node
		 */
		var trimWhitespace = function (elem) {
			if (elem) {
				while (isWhitespace(elem.firstChild)) {
					// trim leading whitespace text nodes
					elem.removeChild(elem.firstChild);
				}
				// trim leading whitespace text
				trimPattern(elem.firstChild, LEADING);
				while (isWhitespace(elem.lastChild)) {
					// trim trailing whitespace text nodes
					elem.removeChild(elem.lastChild);
				}
				// trim trailing whitespace text
				trimPattern(elem.lastChild, TRAILING);
			}
		};

		/**
		 * Converts the markup to DOM nodes
		 * 
		 * @private
		 * @param {string|Markup} value The node
		 * @return {Node}
		 */
		var toDOM = function (value) {
			var wrapper = createElement('div');
			wrapper.innerHTML = '' + value;

			// trim extraneous whitespace
			trimWhitespace(wrapper);

			// eliminate wrapper for single nodes
			if (wrapper.childNodes.length === 1) {
				return wrapper.firstChild;
			}

			// create a document fragment to hold elements
			var frag = createElement('');
			while (wrapper.firstChild) {
				frag.appendChild(wrapper.firstChild);
			}
			return frag;
		};

		/**
		 * Default error handler
		 * @param {Error} ex
		 * @return {Node}
		 */
		var onError = function (ex) {
			return document.createTextNode('[' + ex + ']');
		};

		/* override this to perform custom error handling during binding */
		JsonML.onerror = null;

		/**
		 * also used by JsonML.BST
		 * @param {Node} elem
		 * @param {*} jml
		 * @param {function} filter
		 * @return {Node}
		 */
		var patch = JsonML.patch = function (elem, jml, filter) {

			for (var i = 1; i < jml.length; i += 1) {
				if (isArray(jml[i]) || 'string' === typeof jml[i]) {
					// append children
					appendDOM(elem, toHTML(jml[i], filter));

				} else if (isMarkup(jml[i])) {
					appendDOM(elem, toDOM(jml[i].value));

				} else if ('object' === typeof jml[i] && jml[i] !== null && elem.nodeType === 1) {
					// add attributes
					elem = addAttributes(elem, jml[i]);
				}
			}

			return elem;
		};

		/**
		 * Main builder entry point
		 * @param {string|array} jml
		 * @param {function} filter
		 * @return {Node}
		 */
		var toHTML = JsonML.toHTML = function (jml, filter) {
			try {
				if (!jml) {
					return null;
				}
				if ('string' === typeof jml) {
					return document.createTextNode(jml);
				}
				if (isMarkup(jml)) {
					return toDOM(jml.value);
				}
				if (!isArray(jml) || ('string' !== typeof jml[0])) {
					throw new SyntaxError('invalid JsonML');
				}

				var tagName = jml[0]; // tagName
				if (!tagName) {
					// correctly handle a list of JsonML trees
					// create a document fragment to hold elements
					var frag = createElement('');
					for (var i = 1; i < jml.length; i += 1) {
						appendDOM(frag, toHTML(jml[i], filter));
					}

					// trim extraneous whitespace
					trimWhitespace(frag);

					// eliminate wrapper for single nodes
					if (frag.childNodes.length === 1) {
						return frag.firstChild;
					}
					return frag;
				}

				if (tagName.toLowerCase() === 'style' && document.createStyleSheet) {
					// IE requires this interface for styles
					patch(document.createStyleSheet(), jml, filter);
					// in IE styles are effective immediately
					return null;
				}

				var elem = patch(createElement(tagName), jml, filter);

				// trim extraneous whitespace
				trimWhitespace(elem);
				return (elem && isFunction(filter)) ? filter(elem) : elem;
			} catch (ex) {
				try {
					// handle error with complete context
					var err = isFunction(JsonML.onerror) ? JsonML.onerror : onError;
					return err(ex, jml, filter);
				} catch (ex2) {
					return document.createTextNode('[' + ex2 + ']');
				}
			}
		};

		/**
		 * Not super efficient.
		 * TODO: port render.js from DUEL
		 * @param {string|array} jml JsonML structure
		 * @return {string} HTML text
		 */
		JsonML.toHTMLText = function (jml, filter) {
			var elem = toHTML(jml, filter);
			if (elem.outerHTML) {
				return elem.outerHTML;
			}

			var parent = createElement('div');
			parent.appendChild(elem);

			var html = parent.innerHTML;
			parent.removeChild(elem);

			return html;
		};

	})(primitives.common.JsonML, document);
}


/* /enums/AdviserPlacementType.js*/
/*
	Enum: primitives.common.AdviserPlacementType
		Defines item placement in tree relative to parent.
	
	Auto - Layout manager defined.
	Left - Item placed on the left side of parent.
	Right - Item placed on the right side of parent.
*/
primitives.common.AdviserPlacementType =
{
	Auto: 0,
	Left: 2,
	Right: 3
};

primitives.orgdiagram.AdviserPlacementType = primitives.common.AdviserPlacementType;

/* /enums/AnnotationType.js*/
/*
	Enum: primitives.common.AnnotationType
		Defines type of annotation object.
	
	Connector - Connector lines between two rectangular areas.
	Shape - Shape around rectanglur area.
	HighlightPath - Use highlight properties for connector lines between items.
*/
primitives.common.AnnotationType =
{
	Connector: 0,
	Shape: 1,
	HighlightPath: 2,
	Label: 3,
	Background: 4
};

/* /enums/ChildrenPlacementType.js*/
/*
	Enum: primitives.common.ChildrenPlacementType
		Defines children placement shape.
	
	Auto - Children placement auto defined.
	Vertical - Children form vertical column.
	Horizontal - Children placed horizontally.
	Matrix - Children placed in form of matrix.
*/
primitives.common.ChildrenPlacementType =
{
	Auto: 0,
	Vertical: 1,
	Horizontal: 2,
	Matrix: 3
};

primitives.orgdiagram.ChildrenPlacementType = primitives.common.ChildrenPlacementType;

/* /enums/Colors.js*/
/*
	Enum: primitives.common.Colors
		Named colors.

*/
primitives.common.Colors =
{
	AliceBlue: "#f0f8ff",
	AntiqueWhite: "#faebd7",
	Aqua: "#00ffff",
	Aquamarine: "#7fffd4",
	Azure: "#f0ffff",

	Beige: "#f5f5dc",
	Bisque: "#ffe4c4",
	Black: "#000000",
	BlanchedAlmond: "#ffebcd",
	Blue: "#0000ff",
	BlueViolet: "#8a2be2",
	Brown: "#a52a2a",
	BurlyWood: "#deb887",
	Bronze: "#cd7f32",

	CadetBlue: "#5f9ea0",
	ChartReuse: "#7fff00",
	Chocolate: "#d2691e",
	Coral: "#ff7f50",
	CornflowerBlue: "#6495ed",
	Cornsilk: "#fff8dc",
	Crimson: "#dc143c",
	Cyan: "#00ffff",
	DarkBlue: "#00008b",
	DarkCyan: "#008b8b",
	DarkGoldenrod: "#b8860b",
	DarkGray: "#a9a9a9",
	DarkGreen: "#006400",
	DarkKhaki: "#bdb76b",
	DarkMagenta: "#8b008b",
	DarkOliveGreen: "#556b2f",
	Darkorange: "#ff8c00",
	DarkOrchid: "#9932cc",
	DarkRed: "#8b0000",
	DarkSalmon: "#e9967a",
	DarkSeaGreen: "#8fbc8f",
	DarkSlateBlue: "#483d8b",
	DarkSlateGray: "#2f4f4f",
	DarkTurquoise: "#00ced1",
	DarkViolet: "#9400d3",
	DeepPink: "#ff1493",
	DeepSkyBlue: "#00bfff",
	DimGray: "#696969",
	DodgerBlue: "#1e90ff",

	FireBrick: "#b22222",
	FloralWhite: "#fffaf0",
	ForestGreen: "#228b22",
	Fuchsia: "#ff00ff",

	Gainsboro: "#dcdcdc",
	GhostWhite: "#f8f8ff",
	Gold: "#ffd700",
	Goldenrod: "#daa520",
	Gray: "#808080",
	Green: "#008000",
	GreenYellow: "#adff2f",

	Honeydew: "#f0fff0",
	Hotpink: "#ff69b4",

	IndianRed: "#cd5c5c",
	Indigo: "#4b0082",
	Ivory: "#fffff0",
	Khaki: "#f0e68c",

	Lavender: "#e6e6fa",
	LavenderBlush: "#fff0f5",
	Lawngreen: "#7cfc00",
	Lemonchiffon: "#fffacd",
	LightBlue: "#add8e6",
	LightCoral: "#f08080",
	LightCyan: "#e0ffff",
	LightGoldenrodYellow: "#fafad2",

	LightGray: "#d3d3d3",
	LightGreen: "#90ee90",
	LightPink: "#ffb6c1",
	LightSalmon: "#ffa07a",
	LightSeaGreen: "#20b2aa",
	LightSkyBlue: "#87cefa",
	LightSlateGray: "#778899",
	LightSteelBlue: "#b0c4de",

	LightYellow: "#ffffe0",
	Lime: "#00ff00",
	Limegreen: "#32cd32",
	Linen: "#faf0e6",

	Magenta: "#ff00ff",
	Maroon: "#800000",
	MediumAquamarine: "#66cdaa",
	MediumBlue: "#0000cd",
	MediumOrchid: "#ba55d3",
	MediumPurple: "#9370d8",
	MediumSeaGreen: "#3cb371",
	MediumSlateBlue: "#7b68ee",

	MediumSpringGreen: "#00fa9a",
	MediumTurquoise: "#48d1cc",
	MediumVioletRed: "#c71585",
	MidnightBlue: "#191970",
	MintCream: "#f5fffa",
	MistyRose: "#ffe4e1",
	Moccasin: "#ffe4b5",

	NavajoWhite: "#ffdead",
	Navy: "#000080",

	Oldlace: "#fdf5e6",
	Olive: "#808000",
	Olivedrab: "#6b8e23",
	Orange: "#ffa500",
	OrangeRed: "#ff4500",
	Orchid: "#da70d6",

	PaleGoldenRod: "#eee8aa",
	PaleGreen: "#98fb98",
	PaleTurquoise: "#afeeee",
	PaleVioletRed: "#d87093",
	Papayawhip: "#ffefd5",
	Peachpuff: "#ffdab9",
	Peru: "#cd853f",
	Pink: "#ffc0cb",
	Plum: "#dda0dd",
	PowderBlue: "#b0e0e6",
	Purple: "#800080",

	Red: "#ff0000",
	RosyBrown: "#bc8f8f",
	RoyalBlue: "#4169e1",

	SaddleBrown: "#8b4513",
	Salmon: "#fa8072",
	SandyBrown: "#f4a460",
	SeaGreen: "#2e8b57",
	Seashell: "#fff5ee",
	Sienna: "#a0522d",
	Silver: "#c0c0c0",
	SkyBlue: "#87ceeb",
	SlateBlue: "#6a5acd",
	SlateGray: "#708090",
	Snow: "#fffafa",
	SpringGreen: "#00ff7f",
	SteelBlue: "#4682b4",

	Tan: "#d2b48c",
	Teal: "#008080",
	Thistle: "#d8bfd8",
	Tomato: "#ff6347",
	Turquoise: "#40e0d0",

	Violet: "#ee82ee",

	Wheat: "#f5deb3",
	White: "#ffffff",
	WhiteSmoke: "#f5f5f5",

	Yellow: "#ffff00",
	YellowGreen: "#9acd32"
};

/* /enums/ConnectorLabelPlacementType.js*/
/*
	Enum: primitives.common.ConnectorLabelPlacementType
	Defines connector label placement.
	
	
	From - Place at the "from" rectangle
	Between - Place along connector line, between rectangles
	To - Place at "to" rectangle
*/
primitives.common.ConnectorLabelPlacementType =
{
	From: 0,
	Between: 1,
	To: 2
};

/* /enums/ConnectorPlacementType.js*/
/*
	Enum: primitives.common.ConnectorPlacementType
		Defines connector annotation shape placement mode between two rectangles.
	
	Offbeat - place connector annotation in the way that it does not overlap base hierarchy connector lines.
	Straight - direct connection between centers of rectangles.
*/
primitives.common.ConnectorPlacementType =
{
	Offbeat: 0,
	Straight: 1
};

/* /enums/ConnectorShapeType.js*/
/*
	Enum: primitives.common.ConnectorShapeType
		Defines connector shape style between two rectangles.
	
	SingleLine - Single line.
	DoubleLine - Double line.
*/
primitives.common.ConnectorShapeType =
{
	OneWay: 0,
	TwoWay: 1,
	BothWay: 2
};

/* /enums/ConnectorStyleType.js*/
primitives.common.ConnectorStyleType =
{
	Extra: 0,
	Regular: 1,
	Highlight: 2
};

/* /enums/ConnectorType.js*/
/*
	Enum: primitives.common.ConnectorType
		Defines diagram connectors style for dot and line elements.
	
	Squared - Connector lines use only right angles.
	Angular - Connector lines use angular lines comming from common vertex.
	Curved - Connector lines are splines comming from common vertex.
*/
primitives.common.ConnectorType =
{
	Squared: 0,
	Angular: 1,
	Curved: 2
};

primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;

/* /enums/ElbowType.js*/
/*
	Enum: primitives.common.ElbowType
		Defines type of connector line elbow style.
	
	Dot - Two lines intersection marked with dot.
	Angular - Squared connection has angular .
	Dashed - Dashes.
*/
primitives.common.ElbowType =
{
	None: 0,
	Dot: 1,
	Bevel: 2,
	Round: 3
};


/* /enums/Enabled.js*/
/*
	Enum: primitives.common.Enabled
		Defines option state.
	
	Auto - Option state is auto defined.
	True - Enabled.
	False - Disabled.
*/
primitives.common.Enabled =
{
	Auto: 0,
	True: 1,
	False: 2
};

/* /enums/GraphicsType.js*/
/*
	Enum: primitives.ocommon.GraphicsType
		Graphics type. 
	
	SVG - Scalable Vector Graphics. Proportionally scales on majority of devices.
	Canvas - HTML canvas graphics. It requires widget update after zooming page.
*/
primitives.common.GraphicsType =
{
	SVG: 0,
	Canvas: 1
};

/* /enums/GroupByType.js*/
/*
	Enum: primitives.common.GroupByType
		Defines objects gravity in chart.
	
	Parents - To parents.
	Children - To children.
*/
primitives.common.GroupByType =
{
	None: 0,
	Parents: 1,
	Children: 2
};

/* /enums/HorizontalAlignmentType.js*/
/*
	Enum: primitives.common.HorizontalAlignmentType
	Defines text label alignment inside text box boundaries.
	
	Center - Positooned in the middle of the text box
	Left - Aligned to the begging of the text box
	Right - Aligned to the end of text box
*/
primitives.common.HorizontalAlignmentType =
{
	Center: 0,
	Left: 1,
	Right: 2
};

/* /enums/ItemType.js*/
/*
	Enum: primitives.orgdiagram.ItemType
		Defines diagram item type.
	
	Regular - Regular item.
	Assistant - Child item which is placed at separate level above all other children, but below parent item. It has connection on its side.
	Adviser - Child item which is placed at the same level as parent item. It has connection on its side.
	SubAssistant - Child item which is placed at separate level above all other children, but below parent item.  It has connection on its top.
	SubAdviser - Child item placed at the same level as parent item. It has connection on its top.
	GeneralPartner - Child item placed at the same level as parent item and visually grouped with it together via sharing common parent and children.
	LimitedPartner - Child item placed at the same level as parent item and visually grouped with it via sharing common children.
	AdviserPartner - Child item placed at the same level as parent item. It has connection on its side. It is visually grouped with it via sharing common children.
*/
primitives.orgdiagram.ItemType =
{
	Regular: 0,

	Assistant: 1,
	SubAssistant: 4,
	SuperAssistant: 10,

	SuperAdviser: 9,
	SubAdviser: 5,
	Adviser: 2,

	Director: 11,

	GeneralPartner: 6,
	LimitedPartner: 7,
	AdviserPartner: 8
};

/* /enums/LabelType.js*/
primitives.common.LabelType =
{
	Regular: 0,
	Dummy: 1,
	Fixed: 2,
	None: 3
};

/* /enums/Layers.js*/
primitives.common.Layers = 
{
	BackgroundAnnotation: 2,
	BackgroundAnnotations: 3,
	BackgroundConnectorAnnotation: 4,
	BackgroundHighlightPathAnnotations: 5,
	Connector: 6,
	ForegroundHighlightPathAnnotations: 7,
	Highlight: 8,
	Marker: 9,
	Label : 10,
	Cursor: 11,
	Item: 12,
	ForegroundAnnotations: 13,
	ForegroundConnectorAnnotation: 14,
	Annotation: 15,
	Controls: 16
};

/* /enums/LineType.js*/
/*
	Enum: primitives.common.LineType
		Defines type of line pattern. Dash and dot intervals depend on line width. 
	
	Solid - Regular solid line.
	Dotted - Dots.
	Dashed - Dashes.
*/
primitives.common.LineType =
{
	Solid: 0,
	Dotted: 1,
	Dashed: 2
};


/* /enums/NavigationMode.js*/
/*
	Enum: primitives.common.NavigationMode
		Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
		It has highlight for mouse over feedback over nodes and it has cursor for showing currently selected single node in diagram.
		In order to avoid children nodes folding and unfolding, this functionality is done automatically for current cursor item.
		So cursor plays vital role for unfolding of nodes and zooming into area of user interest in diagram.

	Default - Highlight & Cursor 
	CursorOnly - Cursor only.
	HighlightOnly - Highlight only. This mode is usefull for touch devices. Since it requires minimal layout changes and renderings.
	Inactive - No user interactivity.

	See Also:
		<primitives.orgdiagram.Config.navigationMode>
		<primitives.famdiagram.Config.navigationMode>
*/
primitives.common.NavigationMode =
{
	Default: 0,
	CursorOnly: 1,
	HighlightOnly: 3,
	Inactive: 2
};

/* /enums/NeighboursSelectionMode.js*/
/*
	Enum: primitives.common.NeighboursSelectionMode
		Defines the display mode for items related to current cursor item in diagram.
	
	ParentsAndChildren - Parents and children of cursor item placed and sized as regular diagram items.
	ParentsChildrenSiblingsAndSpouses - Parents, children, siblings and spouses of cursor item placed and sized as regular diagram items.
*/
primitives.common.NeighboursSelectionMode =
{
	ParentsAndChildren: 0,
	ParentsChildrenSiblingsAndSpouses: 1
};



/* /enums/OrientationType.js*/
/*
	Enum: primitives.common.OrientationType
		Defines diagram orientation type.
	
	Top - Vertical orientation having root item at the top.
	Bottom - Vertical orientation having root item at the bottom.
	Left - Horizontal orientation having root item on the left.
	Right - Horizontal orientation having root item on the right.
*/
primitives.common.OrientationType =
{
	Top: 0,
	Bottom: 1,
	Left: 2,
	Right: 3,
	None: 4
};

primitives.orgdiagram.OrientationType = primitives.common.OrientationType;

/* /enums/PageFitMode.js*/
/*
	Enum: primitives.common.PageFitMode
		Defines diagram auto fit mode.
	
	None - All diagram items are shown in normal template mode.
	PageWidth - Diagram tries to layout and auto size items in order to fit diagram into available page width.
	PageHeight - Diagram tries to layout and auto size items in order to fit diagram into available page height.
	FitToPage - Diagram tries to layout and auto size items in order to fit diagram into available page size.
	AutoSize - Chart sets its placeholder div size to fit its contents without minimizing items.
*/
primitives.common.PageFitMode =
{
	None: 0,
	PageWidth: 1,
	PageHeight: 2,
	FitToPage: 3,
	AutoSize: 5,
	SelectionOnly: 6
};

primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;

/* /enums/PlacementType.js*/
/*
	Enum: primitives.common.PlacementType
		Defines element placement relative to rectangular area.
	
	Auto - Depends on implementation
	Left - Left side
	Top - Top side
	Right - Right side
	Bottom - Bottom side
	TopLeft - Top left side
	TopRight - Top right side
	BottomLeft - Bottom left side
	BottomRight - Bottom right side
	LeftTop - Left Top side
	LeftBottom - Left Bottom side
	RightTop - Right Top side
	RightBottom - Right Bottom side
*/
primitives.common.PlacementType =
{
	Auto: 0,
	TopLeft: 8,
	Top: 1,
	TopRight: 2,
	RightTop: 11,
	Right: 3,
	RightBottom: 12,
	BottomRight: 4,
	Bottom: 5,
	BottomLeft: 6,
	LeftBottom: 10,
	Left: 7,
	LeftTop: 9
};

/* /enums/RenderingMode.js*/
/*
	Enum: primitives.common.RenderingMode
	This enumeration is used as option in arguments of rendering events.
	It helps to tell template initialization stage, 
	for example user can widgitize some parts of template on create
	and update and refresh them in template update stage.
	
	Create - Template is just created.
	Update - Template is reused and update needed.
*/
primitives.common.RenderingMode =
{
	Create: 0,
	Update: 1
};

/* /enums/SegmentType.js*/
primitives.common.SegmentType =
{
	Line: 0,
	Move: 1,
	QuadraticArc: 2,
	CubicArc: 3,
	Dot: 4
};

/* /enums/SelectionPathMode.js*/
/*
	Enum: primitives.common.SelectionPathMode
		Defines the display mode for items between root item of diagram and selected items.
	
	None - Selection path items placed and sized as regular diagram items.
	FullStack - Selection path items are shown in normal template mode.
*/
primitives.common.SelectionPathMode =
{
	None: 0,
	FullStack: 1
};

primitives.orgdiagram.SelectionPathMode = primitives.common.SelectionPathMode;

/* /enums/ShapeType.js*/
/*
	Enum: primitives.common.ShapeType
		Defines shape type.
	
	Rectangle - rectangle
	Oval - oval
	Triangle - triangle
	CrossOut - cross out
	Circle - circle
	Rhombus - rhombus
	Wedge - wedge
	FramedOval - Framed Oval
	FramedTriangle - Framed Triangle
	FramedWedge - Framed Wedge
	FramedRhombus - Framed Rhombus
*/
primitives.common.ShapeType =
{
	Rectangle: 0,
	Oval: 1,
	Triangle: 2,
	CrossOut: 3,
	Circle: 4,
	Rhombus: 5,
	Wedge: 7,
	FramedOval: 8,
	FramedTriangle: 9,
	FramedWedge: 10,
	FramedRhombus: 11,
	None: 6
};

/* /enums/SideFlag.js*/
primitives.common.SideFlag =
{
	Top: 1,
	Right: 2,
	Bottom: 4,
	Left: 8
};

/* /enums/TextOrientationType.js*/
/*
	Enum: primitives.text.TextOrientationType
		Defines label orientation type.
	
	Horizontal - Regular horizontal text.
	RotateLeft - Rotate all text 90 degree.
	RotateRight - Rotate all text 270 degree.
*/
primitives.text.TextOrientationType =
{
	Horizontal: 0,
	RotateLeft: 1,
	RotateRight: 2,
	Auto: 3
};

/* /enums/UpdateMode.js*/
/*
	Enum: primitives.common.UpdateMode
		Defines redraw mode of diagram.
	
	Recreate - Forces widget to make a full chart redraw. It is equivalent to initial chart creation. 
	It removes everything from chart layout and recreares all elements again. 
	Refresh - This update mode is optimized for widget fast redraw caused by resize or changes of 
	next options: <primitives.orgdiagram.Config.items>, <primitives.orgdiagram.Config.cursorItem> 
	or <primitives.orgdiagram.Config.selectedItems>.
	PositonHighlight - This update mode redraws only <primitives.orgdiagram.Config.highlightItem>.

	See Also:
		<primitives.orgdiagram.Config.update>
*/
primitives.common.UpdateMode =
{
	Recreate: 0,
	Refresh: 1,
	PositonHighlight: 2
};

primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;

/* /enums/VectorRelationType.js*/
primitives.common.VectorRelationType =
{
	None: 0,
	Null: 1,
	Collinear: 2,
	Opposite: 3
};

/* /enums/VerticalAlignmentType.js*/
/*
	Enum: primitives.common.VerticalAlignmentType
	Defines text label alignment inside text box boundaries.
	
	Top - Positined at the top of text box
	Middle - Aligned to the middle
	Bottom - Aligned to the bottom of text box
*/
primitives.common.VerticalAlignmentType =
{
	Top: 0,
	Middle: 1,
	Bottom: 2
};

/* /enums/Visibility.js*/
/*
	Enum: primitives.common.Visibility
		Defines nodes visibility mode.
	
	Auto - Auto select best visibility mode.
	Normal - Show node in normal template mode.
	Dot - Show node as dot.
	Line - Show node as line.
	Invisible - Make node invisible.

	See Also:

		<primitives.orgdiagram.Config.minimalVisibility>
*/
primitives.common.Visibility =
{
	Auto: 0,
	Normal: 1,
	Dot: 2,
	Line: 3,
	Invisible: 4
};

/* /enums/ZOrderType.js*/
/*
	Enum: primitives.common.ZOrderType
		Defines elements Z order. This option is used to place annotations relative to chart.
	
	Auto - Auto selects best order depending on type of element.
	Background - Place element in chart background.
	Foreground - Place element into foreground.
*/
primitives.common.ZOrderType =
{
	Auto: 0,
	Background: 1,
	Foreground: 2
};

/* /events/RenderEventArgs.js*/
/*
	Class: primitives.common.RenderEventArgs
		Rendering event details class.
*/
primitives.common.RenderEventArgs = function () {
	/*
	Property: id
	*/
	this.id = null;

	/*
	Property: element
		DOM element.
	*/
	this.element = null;

	/*
	Property: context
		Reference to item.
	*/
	this.context = null;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
	*/
	this.templateName = null;

	/*
	Property: renderingMode
		This option indicates current template state.

	Default:
		<primitives.common.RenderingMode.Update>

	See also:
		<primitives.common.RenderingMode>
	*/
	this.renderingMode = null;

	/*
	Property: isCursor
		Rendered item is cursor.
	*/
	this.isCursor = false;

	/*
	Property: isSelected
		Rendered item is selected.
	*/
	this.isSelected = false;
};

/* /graphics/shapes/BaseShape.js*/
primitives.common.BaseShape = function () {

};


primitives.common.BaseShape.prototype._getLabelPosition = function (x, y, width, height, labelWidth, labelHeight, labelOffset, labelPlacement) {
	var result = null;
	switch (labelPlacement) {
		case 1/*primitives.common.PlacementType.Top*/:
			result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
			break;
		case 2/*primitives.common.PlacementType.TopRight*/:
			result = new primitives.common.Rect(x + width - labelWidth, y - labelOffset - labelHeight, labelWidth, labelHeight);
			break;
		case 8/*primitives.common.PlacementType.TopLeft*/:
			result = new primitives.common.Rect(x, y - labelOffset - labelHeight, labelWidth, labelHeight);
			break;
		case 3/*primitives.common.PlacementType.Right*/:
			result = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
			break;
		case 11/*primitives.common.PlacementType.RightTop*/:
			result = new primitives.common.Rect(x + width + labelOffset, y, labelWidth, labelHeight);
			break;
		case 12/*primitives.common.PlacementType.RightBottom*/:
			result = new primitives.common.Rect(x + width + labelOffset, y + height - labelHeight, labelWidth, labelHeight);
			break;
		case 4/*primitives.common.PlacementType.BottomRight*/:
			result = new primitives.common.Rect(x + width - labelWidth, y + height + labelOffset, labelWidth, labelHeight);
			break;
		case 6/*primitives.common.PlacementType.BottomLeft*/:
			result = new primitives.common.Rect(x, y + height + labelOffset, labelWidth, labelHeight);
			break;
		case 7/*primitives.common.PlacementType.Left*/:
			result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
			break;
		case 9/*primitives.common.PlacementType.LeftTop*/:
			result = new primitives.common.Rect(x - labelWidth - labelOffset, y, labelWidth, labelHeight);
			break;
		case 10/*primitives.common.PlacementType.LeftBottom*/:
			result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height - labelHeight, labelWidth, labelHeight);
			break;
		case 0/*primitives.common.PlacementType.Auto*/: //ignore jslint
		case 5/*primitives.common.PlacementType.Bottom*/: //ignore jslint
		default: //ignore jslint
			result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
			break;
	}
	return result;
};

primitives.common.BaseShape.prototype._betweenPoint = function (first, second) {
	return new primitives.common.Point((first.x + second.x) / 2, (first.y + second.y) / 2);
};

primitives.common.BaseShape.prototype._offsetPoint = function (first, second, offset) {
	var result = null,
		distance = first.distanceTo(second);

	if (distance === 0 || offset === 0) {
		result = new primitives.common.Point(first);
	} else {
		result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
	}
	return result;
};

/* /graphics/shapes/Callout.js*/
primitives.common.Callout = function (graphics) {
	this.m_graphics = graphics;

	this.pointerPlacement = 0/*primitives.common.PlacementType.Auto*/;
	this.cornerRadius = "10%";
	this.offset = 0;
	this.opacity = 1;
	this.lineWidth = 1;
	this.pointerWidth = "10%";
	this.borderColor = "#000000"/*primitives.common.Colors.Black*/;
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.fillColor = "#d3d3d3"/*primitives.common.Colors.LightGray*/;

	this.m_map = [[8/*primitives.common.PlacementType.TopLeft*/, 7/*primitives.common.PlacementType.Left*/, 6/*primitives.common.PlacementType.BottomLeft*/],
				[1/*primitives.common.PlacementType.Top*/, null, 5/*primitives.common.PlacementType.Bottom*/],
				[2/*primitives.common.PlacementType.TopRight*/, 3/*primitives.common.PlacementType.Right*/, 4/*primitives.common.PlacementType.BottomRight*/]
	];
};

primitives.common.Callout.prototype = new primitives.common.BaseShape();

primitives.common.Callout.prototype.draw = function (snapPoint, position) {
	position = new primitives.common.Rect(position).offset(this.offset);

	var pointA = new primitives.common.Point(position.x, position.y),
	pointB = new primitives.common.Point(position.right(), position.y),
	pointC = new primitives.common.Point(position.right(), position.bottom()),
	pointD = new primitives.common.Point(position.left(), position.bottom()),
	snapPoints = [null, null, null, null, null, null, null, null],
	points = [pointA, pointB, pointC, pointD],
	radius = this.m_graphics.getPxSize(this.cornerRadius, Math.min(pointA.distanceTo(pointB), pointB.distanceTo(pointC))),
	placementType,
	point,
	index,
	attr,
	linePaletteItem,
	buffer,
	polyline;

	attr = {};
	if (this.fillColor !== null) {
		attr.fillColor = this.fillColor;
		attr.opacity = this.opacity;
	}
	if (this.lineColor !== null) {
		attr.lineColor = this.borderColor;
	}
	attr.lineWidth = this.lineWidth;
	attr.lineType = this.lineType;

	linePaletteItem = new primitives.common.PaletteItem(attr);
	buffer = new primitives.common.PolylinesBuffer();
	polyline = buffer.getPolyline(linePaletteItem);

	if (snapPoint !== null) {
		placementType = (this.pointerPlacement === 0/*primitives.common.PlacementType.Auto*/) ? this._getPlacement(snapPoint, pointA, pointC) : this.pointerPlacement;
		if (placementType !== null) {
			snapPoints[placementType] = snapPoint;
		}
	}

	for (index = 0; index < points.length; index += 1) {
		this._drawSegment(polyline, points[0], points[1], points[2], this.pointerWidth, radius, snapPoints[1], snapPoints[2]);
		point = points.shift();
		points.push(point);
		point = snapPoints.shift();
		snapPoints.push(point);
		point = snapPoints.shift();
		snapPoints.push(point);
	}

	this.m_graphics.polylinesBuffer(buffer);
};

primitives.common.Callout.prototype._getPlacement = function (point, point1, point2) {
	var row = null,
		column = null;
	if (point.x < point1.x) {
		row = 0;
	}
	else if (point.x > point2.x) {
		row = 2;
	}
	else {
		row = 1;
	}
	if (point.y < point1.y) {
		column = 0;
	}
	else if (point.y > point2.y) {
		column = 2;
	}
	else {
		column = 1;
	}
	return this.m_map[row][column];
};

primitives.common.Callout.prototype._drawSegment = function (polyline, pointA, pointB, pointC, base, radius, sideSnapPoint, cornerSnapPoint) {
	var pointA1 = this._offsetPoint(pointA, pointB, radius),
		pointB1 = this._offsetPoint(pointB, pointA, radius),
		pointB2 = this._offsetPoint(pointB, pointC, radius),
		pointS,
		pointS1,
		pointS2;

	base = this.m_graphics.getPxSize(base, pointA.distanceTo(pointB) / 2.0);

	if (polyline.length() === 0) {
		polyline.addSegment(new primitives.common.MoveSegment(pointA1));
	}
	if (sideSnapPoint !== null) {
		pointS = this._betweenPoint(pointA, pointB);
		pointS1 = this._offsetPoint(pointS, pointA, base);
		pointS2 = this._offsetPoint(pointS, pointB, base);
		polyline.addSegment(new primitives.common.LineSegment(pointS1));
		polyline.addSegment(new primitives.common.LineSegment(sideSnapPoint));
		polyline.addSegment(new primitives.common.LineSegment(pointS2));
	}

	polyline.addSegment(new primitives.common.LineSegment(pointB1));
	if (cornerSnapPoint !== null) {
		polyline.addSegment(new primitives.common.LineSegment(cornerSnapPoint));
		polyline.addSegment(new primitives.common.LineSegment(pointB2));
	}
	else {
		polyline.addSegment(new primitives.common.QuadraticArcSegment(pointB, pointB2));
	}
};


/* /graphics/shapes/ConnectorOffbeat.js*/
primitives.common.ConnectorOffbeat = function () {

};

primitives.common.ConnectorOffbeat.prototype = new primitives.common.BaseShape();

primitives.common.ConnectorOffbeat.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
	connectorAnnotationOffsetResolver, onLabelPlacement) {
	var minimalGap,
		connectorRect,
		fromPoint, toPoint,
		snapPoint,
		index, len,
		offsets, tempOffset,
		invertX, invertY,
		fromLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
		toLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
		labelPlacement = null,
		polyline,
		bothWay;
	
	polyline = buffer.getPolyline(linePaletteItem);

	offsets = [];
	switch (connectorShapeType) {
		case 1/*primitives.common.ConnectorShapeType.TwoWay*/:
			offsets = [-linesOffset / 2, linesOffset / 2];
			bothWay = false;
			break;
		case 0/*primitives.common.ConnectorShapeType.OneWay*/:
			offsets = [0];
			bothWay = false;
			break;
		case 2/*primitives.common.ConnectorShapeType.BothWay*/:
			offsets = [0];
			bothWay = true;
			break;
	}

	minimalGap = Math.max(hasLabel ? labelSize.width : 0, linesOffset * 5);
	if (fromRect.right() + minimalGap < toRect.left() || fromRect.left() > toRect.right() + minimalGap) {
		if (fromRect.left() > toRect.right()) {
			fromPoint = new primitives.common.Point(fromRect.left(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(toRect.right(), toRect.verticalCenter());
		} else {
			fromPoint = new primitives.common.Point(fromRect.right(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(toRect.left(), toRect.verticalCenter());
		}
		if (hasLabel) {
			if (fromRect.left() > toRect.right()) {
				fromLabelPlacement = 7/*primitives.common.PlacementType.Left*/;
				toLabelPlacement = 3/*primitives.common.PlacementType.Right*/;
			} else {
				fromLabelPlacement = 3/*primitives.common.PlacementType.Right*/;
				toLabelPlacement = 7/*primitives.common.PlacementType.Left*/;
			}
		}
		connectorRect = new primitives.common.Rect(fromPoint, toPoint);
		invertY = (fromPoint.y <= toPoint.y);
		invertX = (fromPoint.x < toPoint.x);
		if (connectorRect.height < connectorRect.width) {
			/* horizontal single bended connector between boxes from right side to left side */
			if (connectorRect.height < linesOffset * 2) {
				connectorRect.offset(0, invertY ? linesOffset * 2 : 0, 0, invertY ? 0 : linesOffset * 2);
			}

			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
						toPoint.x, toPoint.y + tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == 0/*primitives.common.ConnectorShapeType.OneWay*/));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				if (labelSize.width < connectorRect.width / 5 * 2) {
					snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()), toPoint.x, toPoint.y, 0.5);
				} else {
					snapPoint = new primitives.common.Point(fromPoint.x, invertY ? connectorRect.top() : connectorRect.bottom());
				}
				labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset : -labelSize.width - linesOffset), (invertY ? snapPoint.y - labelSize.height - linesOffset : snapPoint.y + linesOffset), labelSize.width, labelSize.height);
			}
		} else {
			/* horizontal double bended connector between boxes from right side to left side */
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
						connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), connectorRect.verticalCenter() + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.bottom() : connectorRect.top()) + tempOffset,
						toPoint.x, toPoint.y + tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == 0/*primitives.common.ConnectorShapeType.OneWay*/));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				labelPlacement = new primitives.common.Rect(connectorRect.horizontalCenter() + (invertY != invertX ? linesOffset : -(linesOffset + labelSize.width)),
					connectorRect.verticalCenter() - labelSize.height / 2, labelSize.width, labelSize.height);
			}
		}
	} else {
		if (fromRect.verticalCenter() < toRect.top() || fromRect.verticalCenter() > toRect.bottom()) {
			/* vertical single bended connector between boxes from right side to right side */
			invertX = fromRect.x < panelSize.width / 2;
			fromPoint = new primitives.common.Point(invertX ? fromRect.right() : fromRect.left(), fromRect.verticalCenter());
			toPoint = new primitives.common.Point(invertX ? toRect.right() : toRect.left(), toRect.verticalCenter());
			connectorRect = new primitives.common.Rect(fromPoint, toPoint);
			connectorRect.offset(linesOffset * 10, 0, linesOffset * 10, 0);
			invertY = (fromPoint.y <= toPoint.y);
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(invertX ? connectorRect.right() + tempOffset * (invertY ? -1 : 1) : connectorRect.left() - tempOffset * (invertY ? -1 : 1), connectorRect.verticalCenter(),
						invertX ? toRect.right() : toRect.left(), toRect.verticalCenter() - tempOffset));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == 0/*primitives.common.ConnectorShapeType.OneWay*/));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				});//ignore jslint
			}

			if (hasLabel) {
				fromLabelPlacement = invertX ? 3/*primitives.common.PlacementType.Right*/ : 7/*primitives.common.PlacementType.Left*/;
				toLabelPlacement = fromLabelPlacement;

				snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, (invertX ? connectorRect.right() : connectorRect.left()), connectorRect.verticalCenter(), toPoint.x, toPoint.y, 0.5);
				labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset / 2 : -linesOffset / 2 - labelSize.width), snapPoint.y - labelSize.height / 2, labelSize.width, labelSize.height);
			}
		} else {
			fromPoint = new primitives.common.Point(fromRect.horizontalCenter(), fromRect.top());
			toPoint = new primitives.common.Point(toRect.horizontalCenter(), toRect.top());
			connectorRect = new primitives.common.Rect(fromPoint, toPoint);
			connectorRect.offset(0, linesOffset * 7, 0, 0);
			invertX = (fromPoint.x < toPoint.x);
			for (index = 0, len = offsets.length; index < len; index += 1) {
				tempOffset = offsets[index];
				buffer.addInverted(function (invertedBuffer) {
					var polyline = invertedBuffer.getPolyline(linePaletteItem);
					polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x + tempOffset, fromPoint.y));
					polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), connectorRect.top() - tempOffset * (invertX ? -1 : 1),
						toRect.horizontalCenter() - tempOffset, toRect.top()));

					if (bothWay) {
						polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
							polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
						});//ignore jslint
					}
				}, index || (connectorShapeType == 0/*primitives.common.ConnectorShapeType.OneWay*/));//ignore jslint

				polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
					polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
				}); //ignore jslint
			}

			if (hasLabel) {
				fromLabelPlacement = 1/*primitives.common.PlacementType.Top*/;
				toLabelPlacement = 1/*primitives.common.PlacementType.Top*/;

				snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), connectorRect.top(), toPoint.x, toPoint.y, 0.5);
				labelPlacement = new primitives.common.Rect(snapPoint.x - labelSize.width / 2, snapPoint.y - (labelOffset + labelSize.height), labelSize.width, labelSize.height);
			}
		}
	}

	if (hasLabel) {
		/* end points labels placement */
		switch (labelPlacementType) {
			case 0/*primitives.common.ConnectorLabelPlacementType.From*/:
				labelPlacement = this._getLabelPosition(fromRect.x, fromRect.y, fromRect.width, fromRect.height, labelPlacement.width, labelPlacement.height, labelOffset, fromLabelPlacement);
				break;
			case 2/*primitives.common.ConnectorLabelPlacementType.To*/:
				labelPlacement = this._getLabelPosition(toRect.x, toRect.y, toRect.width, toRect.height, labelPlacement.width, labelPlacement.height, labelOffset, toLabelPlacement);
				break;
			default:
				break;
		}
	}

	if (onLabelPlacement != null) {
		onLabelPlacement(labelPlacement);
	}
};


/* /graphics/shapes/ConnectorStraight.js*/
primitives.common.ConnectorStraight = function () {

};

primitives.common.ConnectorStraight.prototype = new primitives.common.BaseShape();

primitives.common.ConnectorStraight.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
	connectorAnnotationOffsetResolver, onLabelPlacement) {
	var fromPoint, toPoint, betweenPoint,
		vector, newVector,
		offset = linesOffset / 2,
		labelPlacement = null,
		fromLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
		toLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
		self = this;

	vector = new primitives.common.Vector(fromRect.centerPoint(), toRect.centerPoint());

	fromRect.loopEdges(function (sideVector, placementType) {
		fromPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
		fromLabelPlacement = placementType;
		return (fromPoint != null);
	});

	toRect.loopEdges(function (sideVector, placementType) {
		toPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
		toLabelPlacement = placementType;
		return (toPoint != null);
	});

	if (fromPoint != null && toPoint != null) {
		var baseVector = new primitives.common.Vector(fromPoint, toPoint);
		connectorAnnotationOffsetResolver.getOffset(baseVector, function (offsetIndex, bundleSize, direction) {
			var tempOffset = (offsetIndex * bundleOffset - (bundleSize - 1) * bundleOffset / 2.0) * direction;
			baseVector.offset(tempOffset);
			fromPoint = baseVector.from;
			toPoint = baseVector.to;

			switch (connectorShapeType) {
				case 1/*primitives.common.ConnectorShapeType.TwoWay*/:
					newVector = new primitives.common.Vector(toPoint.clone(), fromPoint.clone());
					newVector.offset(offset);
					self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);

					newVector = new primitives.common.Vector(fromPoint.clone(), toPoint.clone());
					newVector.offset(offset);
					self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);
					break;
				case 0/*primitives.common.ConnectorShapeType.OneWay*/:
					self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, false);
					break;
				case 2/*primitives.common.ConnectorShapeType.BothWay*/:
					self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, true);
					break;
			}

			if (hasLabel) {
				/* end points labels placement */
				switch (labelPlacementType) {
					case 0/*primitives.common.ConnectorLabelPlacementType.From*/:
						labelPlacement = self._getLabelPositionBySnapPoint(fromPoint.x, fromPoint.y, labelSize.width, labelSize.height, labelOffset, fromLabelPlacement);
						break;
					case 1/*primitives.common.ConnectorLabelPlacementType.Between*/:
						betweenPoint = self._betweenPoint(fromPoint, toPoint);
						labelPlacement = self._getLabelPositionBySnapPoint(betweenPoint.x, betweenPoint.y, labelSize.width, labelSize.height, labelOffset, 3/*primitives.common.PlacementType.Right*/);
						break;
					case 2/*primitives.common.ConnectorLabelPlacementType.To*/:
						labelPlacement = self._getLabelPositionBySnapPoint(toPoint.x, toPoint.y, labelSize.width, labelSize.height, labelOffset, toLabelPlacement);
						break;
					default:
						break;
				}

				if (onLabelPlacement != null) {
					onLabelPlacement.call(this, labelPlacement);
				}
			}
		});

	}
};

primitives.common.ConnectorStraight.prototype._drawLine = function (buffer, linePaletteItem, fromPoint, toPoint, bothWays) {
	var polyline;

	buffer.addInverted(function (invertedBuffer) {
		polyline = invertedBuffer.getPolyline(linePaletteItem);
		polyline.addSegment(new primitives.common.MoveSegment(fromPoint));
		polyline.addSegment(new primitives.common.LineSegment(toPoint));

		polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
			polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
		}); //ignore jslint
	}, false);//ignore jslint

	if (bothWays) {
		polyline = buffer.getPolyline(linePaletteItem);
		polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
			polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
		}); //ignore jslint
	}
};

primitives.common.ConnectorStraight.prototype._getLabelPositionBySnapPoint = function (x, y, labelWidth, labelHeight, labelOffset, placementType) {
	var result = null;
	switch (placementType) {
		case 0/*primitives.common.PlacementType.Auto*/:
		case 1/*primitives.common.PlacementType.Top*/:
			result = new primitives.common.Rect(x - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
			break;
		case 3/*primitives.common.PlacementType.Right*/:
			result = new primitives.common.Rect(x + labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
			break;
		case 5/*primitives.common.PlacementType.Bottom*/:
			result = new primitives.common.Rect(x - labelWidth / 2.0, y + labelOffset, labelWidth, labelHeight);
			break;
		case 7/*primitives.common.PlacementType.Left*/:
			result = new primitives.common.Rect(x - labelWidth - labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
			break;
	}
	return result;
};

/* /graphics/shapes/Marker.js*/
primitives.common.Marker = function () {

};

primitives.common.Marker.Markers = {};

primitives.common.Marker.DrawCircle = function (polyline, position) {
	var quarter = Math.min(position.width / 2.0, position.height / 2.0);
	position = new primitives.common.Rect(position.horizontalCenter() - quarter, position.verticalCenter() - quarter, quarter * 2.0, quarter * 2.0);
	primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawRectangle = function (polyline, position) {
	polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.x, position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawOval = function (polyline, position) {
	var cpX, cpY;
	cpX = (position.width / 2) * 0.5522848;
	cpY = (position.height / 2) * 0.5522848;
	polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
	polyline.addSegment(new primitives.common.CubicArcSegment(position.x, position.verticalCenter() - cpY, position.horizontalCenter() - cpX, position.y, position.horizontalCenter(), position.y));
	polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() + cpX, position.y, position.right(), position.verticalCenter() - cpY, position.right(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.CubicArcSegment(position.right(), position.verticalCenter() + cpY, position.horizontalCenter() + cpX, position.bottom(), position.horizontalCenter(), position.bottom()));
	polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() - cpX, position.bottom(), position.x, position.verticalCenter() + cpY, position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawTriangle = function (polyline, position) {
	polyline.addSegment(new primitives.common.MoveSegment(position.left(), position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawCrossOut = function (polyline, position) {
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawRhombus = function (polyline, position) {
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.left(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.verticalCenter()));
	polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
};

primitives.common.Marker.DrawWedge = function (polyline, position) {
	polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
	polyline.addSegment(new primitives.common.LineSegment(position.left(), position.y));
	polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
};

primitives.common.Marker.DrawFramedOval = function (polyline, position) {
	primitives.common.Marker.DrawRectangle(polyline, position);
	primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawFramedTriangle = function (polyline, position) {
	primitives.common.Marker.DrawRectangle(polyline, position);
	primitives.common.Marker.DrawTriangle(polyline, position);
};

primitives.common.Marker.DrawFramedWedge = function (polyline, position) {
	primitives.common.Marker.DrawRectangle(polyline, position);
	primitives.common.Marker.DrawWedge(polyline, position);
};

primitives.common.Marker.DrawFramedRhombus = function (polyline, position) {
	primitives.common.Marker.DrawRectangle(polyline, position);
	primitives.common.Marker.DrawRhombus(polyline, position);
};

primitives.common.Marker.DrawNone = function (polyline, position) {

};

primitives.common.Marker.Markers[4/*primitives.common.ShapeType.Circle*/] = primitives.common.Marker.DrawCircle;
primitives.common.Marker.Markers[0/*primitives.common.ShapeType.Rectangle*/] = primitives.common.Marker.DrawRectangle;
primitives.common.Marker.Markers[1/*primitives.common.ShapeType.Oval*/] = primitives.common.Marker.DrawOval;
primitives.common.Marker.Markers[2/*primitives.common.ShapeType.Triangle*/] = primitives.common.Marker.DrawTriangle;
primitives.common.Marker.Markers[3/*primitives.common.ShapeType.CrossOut*/] = primitives.common.Marker.DrawCrossOut;
primitives.common.Marker.Markers[5/*primitives.common.ShapeType.Rhombus*/] = primitives.common.Marker.DrawRhombus;
primitives.common.Marker.Markers[7/*primitives.common.ShapeType.Wedge*/] = primitives.common.Marker.DrawWedge;
primitives.common.Marker.Markers[8/*primitives.common.ShapeType.FramedOval*/] = primitives.common.Marker.DrawFramedOval;
primitives.common.Marker.Markers[9/*primitives.common.ShapeType.FramedTriangle*/] = primitives.common.Marker.DrawFramedTriangle;
primitives.common.Marker.Markers[10/*primitives.common.ShapeType.FramedWedge*/] = primitives.common.Marker.DrawFramedWedge;
primitives.common.Marker.Markers[11/*primitives.common.ShapeType.FramedRhombus*/] = primitives.common.Marker.DrawFramedRhombus;
primitives.common.Marker.Markers[6/*primitives.common.ShapeType.None*/] = primitives.common.Marker.DrawNone;

primitives.common.Marker.prototype.draw = function (polylinesBuffer, shapeType, position, paletteItem) {
	var polyline;

	// If you need to create custom multi-color marker type
	// create color palette object for every fragment 
	// than request polyline of that that palette style 
	// add fragment into received polyline
	polyline = polylinesBuffer.getPolyline(paletteItem);
	primitives.common.Marker.Markers[shapeType](polyline, position);
};



/* /graphics/shapes/MergedRectangles.js*/
primitives.common.MergedRectangles = function (graphics) {
	this.graphics = graphics;
	this.transform = null;

	this.lineWidth = 1;
	this.opacity = 1;
	this.fillColor = null;
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.borderColor = null;
};

primitives.common.MergedRectangles.prototype = new primitives.common.BaseShape();

primitives.common.MergedRectangles.prototype.draw = function (rects) {
	var paletteItem = new primitives.common.PaletteItem({
		lineColor: this.borderColor,
		lineWidth: this.lineWidth,
		fillColor: this.fillColor,
		lineType: this.lineType,
		opacity: this.opacity
	}),
	polyline = new primitives.common.Polyline(paletteItem),
	offset = this.lineWidth / 2;

	primitives.common.getMergedRectangles(this, rects, function (points) {
		for (var index = 0, len = points.length; index < len; index += 1) {
			var point = points[index];
			if (index == 0) {
				polyline.addSegment(new primitives.common.MoveSegment(point.x, point.y));
			} else {
				polyline.addSegment(new primitives.common.LineSegment(point.x, point.y));
			}
		}
	});

	polyline.transform(this.transform, true);

	this.graphics.polyline(polyline);
};

/* /graphics/shapes/Shape.js*/
primitives.common.Shape = function (graphics) {
	this.m_graphics = graphics;
	this.transform = null;

	this.orientationType = 0/*primitives.common.OrientationType.Top*/;
	this.panelSize = null;
	this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);
	this.lineWidth = 1;
	this.labelOffset = 4;
	this.cornerRadius = "10%";
	this.opacity = 1;
	this.fillColor = null;
	this.labelSize = new primitives.common.Size(60, 30);
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.borderColor = null;
	this.hasLabel = false;
	this.labelTemplate = null;
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;
};

primitives.common.Shape.prototype = new primitives.common.BaseShape();

primitives.common.Shape.prototype.draw = function (position, uiHash) {
	var labelPlacement,
		calloutShape,
		linePaletteItem,
		buffer,
		marker;

	position = new primitives.common.Rect(position).offset(this.offset);

	this.transform = new primitives.common.Transform();
	this.transform.size = this.panelSize;
	this.transform.setOrientation(this.orientationType);

	/* label size */
	if (this.hasLabel) {
		labelPlacement = this._getLabelPosition(position.x, position.y, position.width, position.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement);
	}


	switch (this.shapeType) {
		case 0/*primitives.common.ShapeType.Rectangle*/:
			calloutShape = new primitives.common.Callout(this.m_graphics);
			calloutShape.cornerRadius = this.cornerRadius;
			calloutShape.opacity = this.opacity;
			calloutShape.lineWidth = this.lineWidth;
			calloutShape.lineType = this.lineType;
			calloutShape.borderColor = this.borderColor;
			calloutShape.fillColor = this.fillColor;
			calloutShape.draw(null, position);
			break;
		default:
			linePaletteItem = new primitives.common.PaletteItem({
				lineColor: this.borderColor,
				lineWidth: this.lineWidth,
				lineType: this.lineType,
				fillColor: this.fillColor,
				opacity: this.opacity
			});

			/* from rectangle */
			this.transform.transformRect(position.x, position.y, position.width, position.height, false,
				this, function (x, y, width, height) {
					position = new primitives.common.Rect(x, y, width, height);
				});

			
			marker = new primitives.common.Marker();
			buffer = new primitives.common.PolylinesBuffer();
			marker.draw(buffer, this.shapeType, position, linePaletteItem);
			buffer.transform(this.transform, true);

			this.m_graphics.polylinesBuffer(buffer);
			break;
	}

	if (this.hasLabel) {
		this.m_graphics.template(
			labelPlacement.x,
			labelPlacement.y,
			0,
			0,
			0,
			0,
			labelPlacement.width,
			labelPlacement.height,
			this.labelTemplate.template(),
			this.labelTemplate.getHashCode(),
			this.labelTemplate.render,
			uiHash,
			null
		);
	}
};


/* /graphics/structs/Point.js*/
/*
	Class: primitives.common.Point
	Class represents pair of x and y coordinates that defines a point in 2D plane.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.
*/
primitives.common.Point = function (arg0, arg1) {
	/*
	Property: x
		The x coordinate.
	*/

	this.x = null;
	/*
	Property: y
		The y coordinate.
	*/

	this.y = null;

	/*
	Property: context
		This property holds reference to context object associated with this datapoint.
	*/
	this.context = null;

	switch (arguments.length) {
		case 1:
			this.x = arg0.x;
			this.y = arg0.y;
			this.context = arg0.context;
			break;
		case 2:
			this.x = arg0;
			this.y = arg1;
			break;
		default:
			break;
	}
};

/*
	Method: scale
		Scales width and height.
*/
primitives.common.Point.prototype.scale = function (scale) {
	this.x = this.x * scale;
	this.y = this.y * scale;
	return this;
};

/*
	Method: distanceTo
		Returns distance to point.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.
*/
primitives.common.Point.prototype.distanceTo = function (arg0, arg1) {
	var x2 = 0,
		y2 = 0,
		a,
		b;
	switch (arguments.length) {
		case 1:
			x2 = arg0.x;
			y2 = arg0.y;
			break;
		case 2:
			x2 = arg0;
			y2 = arg1;
			break;
		default:
			break;
	}
	a = this.x - x2;
	b = this.y - y2;
	return Math.sqrt(a * a + b * b);
};

primitives.common.Point.prototype.equalTo = function (point) {
	return this.x == point.x && this.y == point.y;
};

/*
	Method: swap
		Swaps values of two points.

	Parameters:
		point - <primitives.common.Point> object.
*/
primitives.common.Point.prototype.swap = function (point) {
	var x = point.x,
		y = point.y;

	point.x = this.x;
	point.y = this.y;

	this.x = x;
	this.y = y;
};

/*
	Method: clone
		Clones current point.
*/
primitives.common.Point.prototype.clone = function () {
	return new primitives.common.Point(this);
};

/*
	Method: toString
		Returns rectangle location in form of CSS style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/
primitives.common.Point.prototype.toString = function (units) {
	var result = "";

	units = (units !== undefined) ? units : "px";

	result += "left:" + this.x + units + ";";
	result += "top:" + this.y + units + ";";

	return result;
};

/* /graphics/structs/Rect.js*/
/*
	Class: primitives.common.Rect
	Class describes the width, height and location of rectangle.

	Parameters:
		rect - Copy constructor. It takes as a parameter copy of <primitives.common.Rect> object.

	Parameters:
		pointTopLeft - Top left point <primitives.common.Point> object.
		pointBottomRight - Bottom right point <primitives.common.Point> object.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect = function (arg0, arg1, arg2, arg3) {
	/*
	Property: x
		The location x coordinate.
	*/
	this.x = null;
	/*
	Property: y
		The location y coordinate.
	*/
	this.y = null;
	/*
	Property: width
		The width of rectangle.
	*/
	this.width = null;
	/*
	Property: height
		The height of rectangle.
	*/
	this.height = null;

	/*
	Property: context
		This property holds reference to context object associated with this rectangle.
	*/
	this.context = null;

	switch (arguments.length) {
		case 1:
			this.x = arg0.x;
			this.y = arg0.y;
			this.width = arg0.width;
			this.height = arg0.height;
			break;
		case 2:
			this.x = Math.min(arg0.x, arg1.x);
			this.y = Math.min(arg0.y, arg1.y);
			this.width = Math.abs(arg1.x - arg0.x);
			this.height = Math.abs(arg1.y - arg0.y);
			break;
		case 4:
			this.x = arg0;
			this.y = arg1;
			this.width = arg2;
			this.height = arg3;
			break;
		default:
			break;
	}
};

/*
	Method: left
		Gets the x-axis value of the left side of the rectangle.
*/
primitives.common.Rect.prototype.left = function () {
	return this.x;
};

/*
	Method: top
		Gets the y-axis value of the top side of the rectangle.
*/
primitives.common.Rect.prototype.top = function () {
	return this.y;
};

/*
	Method: right
		Gets the x-axis value of the right side of the rectangle.
*/
primitives.common.Rect.prototype.right = function () {
	return this.x + this.width;
};

/*
	Method: bottom
		Gets the y-axis value of the bottom of the rectangle.
*/
primitives.common.Rect.prototype.bottom = function () {
	return this.y + this.height;
};

/*
	Method: verticalCenter
		Gets the y-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.verticalCenter = function () {
	return this.y + this.height / 2.0;
};

/*
	Method: horizontalCenter
		Gets the x-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.horizontalCenter = function () {
	return this.x + this.width / 2.0;
};

/*
	Method: centerPoint
		Gets the point of the geometrical center of the rectangle.
*/
primitives.common.Rect.prototype.centerPoint = function () {
	return new primitives.common.Point(this.horizontalCenter(), this.verticalCenter());
};

/*
	Method: isEmpty
		Gets the value that indicates whether  the rectangle is the Empty rectangle.
*/
primitives.common.Rect.prototype.isEmpty = function () {
	return this.x === null || this.y === null || this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/*
	Method: offset
		Expands the rectangle by using specified value in all directions.

	Parameters:
		value - The amount by which to expand or shrink the sides of the rectangle.

	Parameters:
		left - The amount by which to expand or shrink the left side of the rectangle.	
		top - The amount by which to expand or shrink the top side of the rectangle.		
		right - The amount by which to expand or shrink the right side of the rectangle.		
		bottom - The amount by which to expand or shrink the bottom side of the rectangle.		
*/
primitives.common.Rect.prototype.offset = function (arg0, arg1, arg2, arg3) {
	switch (arguments.length) {
		case 1:
			if (arg0 !== null && typeof arg0 == "object") {
				this.x = this.x - arg0.left;
				this.y = this.y - arg0.top;

				this.width = this.width + arg0.left + arg0.right;
				this.height = this.height + arg0.top + arg0.bottom;
			} else {
				this.x = this.x - arg0;
				this.y = this.y - arg0;

				this.width = this.width + arg0 * 2.0;
				this.height = this.height + arg0 * 2.0;
			}
			break;
		case 4:
			this.x = this.x - arg0;
			this.y = this.y - arg1;

			this.width = this.width + arg0 + arg2;
			this.height = this.height + arg1 + arg3;
			break;
	}
	return this;
};

/*
	Method: scale
		Scales rectangle position.
*/
primitives.common.Rect.prototype.scale = function (scale) {
	this.x = this.x * scale;
	this.y = this.y * scale;
	this.width = this.width * scale;
	this.height = this.height * scale;
	return this;
};

/*
	Method: translate
		Moves the rectangle to by the specified horizontal and vertical amounts.

	Parameters:
		x - The amount to move the rectangle horizontally.
		y - The amount to move the rectangle vertically.
*/
primitives.common.Rect.prototype.translate = function (x, y) {
	this.x = this.x + x;
	this.y = this.y + y;

	return this;
};

/*
	Method: invert
		Inverts rectangle.
*/
primitives.common.Rect.prototype.invert = function () {
	var width = this.width,
		x = this.x;
	this.width = this.height;
	this.height = width;
	this.x = this.y;
	this.y = x;
	return this;
};

/*
	Method: loopEdges
		Loops edges of rectangle in the following order: Top, Right, Bottom, Left
*/
primitives.common.Rect.prototype.loopEdges = function (callback) { // function(vector, placementType) {}
	var vertexes = [
		new primitives.common.Point(this.left(), this.top()),
		new primitives.common.Point(this.right(), this.top()),
		new primitives.common.Point(this.right(), this.bottom()),
		new primitives.common.Point(this.left(), this.bottom())
	],
	placements = [
		1/*primitives.common.PlacementType.Top*/,
		3/*primitives.common.PlacementType.Right*/,
		5/*primitives.common.PlacementType.Bottom*/,
		7/*primitives.common.PlacementType.Left*/
	];

	vertexes.push(vertexes[0]);



	if (callback != null) {
		for (var index = 1, len = vertexes.length; index < len; index += 1) {
			if (callback(new primitives.common.Vector(vertexes[index - 1], vertexes[index]), placements[index - 1])) {
				break;
			}
		}
	}
	return this;
};

/*
	Method: contains
		Indicates whether the rectangle contains the specified point.

	Parameters:
		point - The point to check.

	Parameters:	
		x - The x coordinate of the point to check.
		y - The y coordinate of the point to check.
	
	Returns:
		true if the rectangle contains the specified point; otherwise, false.	
*/
primitives.common.Rect.prototype.contains = function (arg0, arg1) {
	switch (arguments.length) {
		case 1:
			return this.x <= arg0.x && arg0.x <= this.x + this.width && this.y <= arg0.y && arg0.y <= this.y + this.height;
		case 2:
			return this.x <= arg0 && arg0 <= this.x + this.width && this.y <= arg1 && arg1 <= this.y + this.height;
		default:
			return false;
	}
};

/*
	Method: cropByRect
		Crops the rectangle by the boundaries of specified rectangle.

	Parameters:
		rect - The rectangle to use as the crop boundaries.
*/
primitives.common.Rect.prototype.cropByRect = function (rect) {
	if (this.x < rect.x) {
		this.width -= (rect.x - this.x);
		this.x = rect.x;
	}

	if (this.right() > rect.right()) {
		this.width -= (this.right() - rect.right());
	}

	if (this.y < rect.y) {
		this.height -= (rect.y - this.y);
		this.y = rect.y;
	}

	if (this.bottom() > rect.bottom()) {
		this.height -= this.bottom() - rect.bottom();
	}

	if (this.isEmpty()) {
		this.x = null;
		this.y = null;
		this.width = null;
		this.height = null;
	}

	return this;
};

/*
	Method: overlaps
		Returns true if the rectangle overlaps specified rectangle.

	Parameters:
		rect - The rectangle to use as overlaping rectangle.
*/
primitives.common.Rect.prototype.overlaps = function (rect) {
	var result = true;
	if (this.x + this.width < rect.x || rect.x + rect.width < this.x || this.y + this.height < rect.y || rect.y + rect.height < this.y) {
		result = false;
	}
	return result;
};

/*
	Method: addRect
		Expands the current rectangle to contain specified rectangle.

	Parameters:
		rect - The rectangle to contain.

	Parameters:	
		x - The x coordinate of the point to contain.
		y - The y coordinate of the point to contain.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect.prototype.addRect = function (arg0, arg1, arg2, arg3) {
	var right,
		bottom;
	switch (arguments.length) {
		case 1:
			if (!arg0.isEmpty()) {
				if (this.isEmpty()) {
					this.x = arg0.x;
					this.y = arg0.y;
					this.width = arg0.width;
					this.height = arg0.height;
				}
				else {
					right = Math.max(this.right(), arg0.right());
					bottom = Math.max(this.bottom(), arg0.bottom());

					this.x = Math.min(this.x, arg0.x);
					this.y = Math.min(this.y, arg0.y);
					this.width = right - this.x;
					this.height = bottom - this.y;
				}
			}
			break;
		case 2:
			if (this.isEmpty()) {
				this.x = arg0;
				this.y = arg1;
				this.width = 0;
				this.height = 0;
			}
			else {
				right = Math.max(this.right(), arg0);
				bottom = Math.max(this.bottom(), arg1);

				this.x = Math.min(this.x, arg0);
				this.y = Math.min(this.y, arg1);
				this.width = right - this.x;
				this.height = bottom - this.y;
			}
			break;
		case 4:
			if (this.isEmpty()) {
				this.x = arg0;
				this.y = arg1;
				this.width = arg2;
				this.height = arg3;
			}
			else {
				right = Math.max(this.right(), arg0 + arg2);
				bottom = Math.max(this.bottom(), arg1 + arg3);

				this.x = Math.min(this.x, arg0);
				this.y = Math.min(this.y, arg1);
				this.width = right - this.x;
				this.height = bottom - this.y;
			}
			break;
	}

	return this;
};

/*
	Method: getCSS
		Returns rectangle location and size in form of CSS style object.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style object.
*/
primitives.common.Rect.prototype.getCSS = function (units) {
	units = (units !== undefined) ? units : "px";

	var result = {
		left: this.x + units,
		top: this.y + units,
		width: this.width + units,
		height: this.height + units
	};
	return result;
};

/*
	Method: toString
		Returns rectangle location and size in form of CSS style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/
primitives.common.Rect.prototype.toString = function (units) {
	var result = "";

	units = (units !== undefined) ? units : "px";

	result += "left:" + this.x + units + ";";
	result += "top:" + this.y + units + ";";
	result += "width:" + this.width + units + ";";
	result += "height:" + this.height + units + ";";

	return result;
};

primitives.common.Rect.prototype.validate = function () {
	if (isNaN(this.x) || isNaN(this.y) || isNaN(this.width) || isNaN(this.height)) {
		throw "Invalid rect position.";
	}
};

primitives.common.Rect.prototype.equalTo = function (rect) {
	return this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height;
};



/* /graphics/structs/MoveSegment.js*/
primitives.common.MoveSegment = function () {
	this.parent = primitives.common.Point.prototype;
	this.parent.constructor.apply(this, arguments);
	this.segmentType = 1/*primitives.common.SegmentType.Move*/;
};

primitives.common.MoveSegment.prototype = new primitives.common.Point();

primitives.common.MoveSegment.prototype.clone = function () {
	return new primitives.common.MoveSegment(this);
};

primitives.common.MoveSegment.prototype.loop = function (thisArg, onItem) {
	if (onItem != null) {
		onItem.call(thisArg, this.x, this.y, 0);
	}
};

primitives.common.MoveSegment.prototype.setPoint = function (point, index) {
	this.x = point.x;
	this.y = point.y;
};

primitives.common.MoveSegment.prototype.getEndPoint = function () {
	return this;
};

primitives.common.MoveSegment.prototype.invert = function (endPoint) {
	this.x = endPoint.x;
	this.y = endPoint.y;
};

primitives.common.MoveSegment.prototype.transform = function (transform, forward) {
	var self = this;
	transform.transformPoint(self.x, self.y, forward, self, function (x, y) {
		self.x = x;
		self.y = y;
	});//ignore jslint
};


/* /graphics/structs/CubicArcSegment.js*/
primitives.common.CubicArcSegment = function (arg0, arg1, arg2, arg3, arg4, arg5) {
	this.parent = primitives.common.Point.prototype;

	this.x = null;
	this.y = null;

	this.cpX1 = null;
	this.cpY1 = null;

	this.cpX2 = null;
	this.cpY2 = null;

	switch (arguments.length) {
		case 3:
			this.parent.constructor.apply(this, [arg2.x, arg2.y]);
			this.cpX1 = arg0.x;
			this.cpY1 = arg0.y;
			this.cpX2 = arg1.x;
			this.cpY2 = arg1.y;
			break;
		case 6:
			this.parent.constructor.apply(this, [arg4, arg5]);
			this.cpX1 = arg0;
			this.cpY1 = arg1;
			this.cpX2 = arg2;
			this.cpY2 = arg3;
			break;
		default:
			break;
	}

	this.segmentType = 3/*primitives.common.SegmentType.CubicArc*/;
};

primitives.common.CubicArcSegment.prototype = new primitives.common.Point();

primitives.common.CubicArcSegment.prototype.clone = function () {
	return new primitives.common.CubicArcSegment(this.cpX1, this.cpY1, this.cpX2, this.cpY2, this.x, this.y);
};

primitives.common.CubicArcSegment.prototype.loop = function (thisArg, onItem) {
	if (onItem != null) {
		onItem.call(thisArg, this.cpX1, this.cpY1, 0);
		onItem.call(thisArg, this.cpX2, this.cpY2, 1);
		onItem.call(thisArg, this.x, this.y, 2);
	}
};

primitives.common.CubicArcSegment.prototype.setPoint = function (point, index) {
	switch (index) {
		case 0:
			this.cpX1 = point.x;
			this.cpY1 = point.y;
			break;
		case 1:
			this.cpX2 = point.x;
			this.cpY2 = point.y;
			break;
		case 2:
			this.x = point.x;
			this.y = point.y;
			break;
	}
};

primitives.common.CubicArcSegment.prototype.getEndPoint = function () {
	return this;
};

primitives.common.CubicArcSegment.prototype.invert = function (endPoint) {
	var tempX = this.cpX1, 
		tempY = this.cpY1;
	this.x = endPoint.x;
	this.y = endPoint.y;
	this.cpX1 = this.cpX2;
	this.cpY1 = this.cpY2;
	this.cpX2 = tempX;
	this.cpY2 = tempY;
};

primitives.common.CubicArcSegment.prototype.transform = function (transform, forward) {
	var self = this;
	transform.transform3Points(self.x, self.y, self.cpX1, self.cpY1, self.cpX2, self.cpY2, forward, self, function (x, y, cpX1, cpY1, cpX2, cpY2) {
		self.x = x;
		self.y = y;
		self.cpX1 = cpX1;
		self.cpY1 = cpY1;
		self.cpX2 = cpX2;
		self.cpY2 = cpY2;
	});//ignore jslint
};

primitives.common.CubicArcSegment.prototype.trim = function (prevEndPoint, offset) {
	var time = 0.5,
		endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time),
		time2 = 0.1,
		endPoint2 = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time2);

	time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
	endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time);

	this.x = endPoint.x;
	this.y = endPoint.y;

	return this;
};

primitives.common.CubicArcSegment.prototype.offsetPoint = function (x, y, cpX1, cpY1, cpX2, cpY2, x2, y2, time) {
	return new primitives.common.Point(
		(1 - time) * (1 - time) * (1 - time) * x + 3 * (1 - time) * (1 - time) * time * cpX1 + 3 * (1 - time) * time * time * cpX2 + time * time * time * x2,
		(1 - time) * (1 - time) * (1 - time) * y + 3 * (1 - time) * (1 - time) * time * cpY1 + 3 * (1 - time) * time * time * cpY2 + time * time * time * y2
		);
};

/* /graphics/structs/DotSegment.js*/
primitives.common.DotSegment = function (x, y, width, height, cornerRadius) {
	this.segmentType = 4/*primitives.common.SegmentType.Dot*/;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cornerRadius = cornerRadius;
};


/* /graphics/structs/Label.js*/
primitives.common.Label = function () {
	this.text = null;
	this.position = null; // primitives.common.Rect
	this.weight = 0;

	this.isActive = true;
	this.labelType = 0/*primitives.common.LabelType.Regular*/;

	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;
	this.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
	this.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;

	this.parent = primitives.common.Rect.prototype;
	this.parent.constructor.apply(this, arguments);
};

primitives.common.Label.prototype = new primitives.common.Rect();


/* /graphics/structs/LineSegment.js*/
primitives.common.LineSegment = function () {
	this.parent = primitives.common.MoveSegment.prototype;
	this.parent.constructor.apply(this, arguments);

	this.segmentType = 0/*primitives.common.SegmentType.Line*/;
};

primitives.common.LineSegment.prototype = new primitives.common.MoveSegment();

primitives.common.LineSegment.prototype.clone = function () {
	return new primitives.common.LineSegment(this);
};

primitives.common.LineSegment.prototype.trim = function (prevEndPoint, offset) {
	var endPoint = this.offsetPoint(this, prevEndPoint, offset);
	this.x = endPoint.x;
	this.y = endPoint.y;

	return this;
};

primitives.common.LineSegment.prototype.offsetPoint = function (first, second, offset) {
	var result = null,
		distance = first.distanceTo(second);

	if (distance === 0 || offset === 0) {
		result = new primitives.common.Point(first);
	} else {
		result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
	}
	return result;
};

/* /graphics/structs/Matrix.js*/
/*
	Class: primitives.common.Matrix
	Class represents square matrix having 2 rows and 2 columns.

	Parameters:
		matrix - <primitives.common.Matrix> object.

	Parameters:
		a1 - top left.
		b1 - top right.
		a2 - bottom left
		b2 - bottom right
*/
primitives.common.Matrix = function (arg0, arg1, arg2, arg3) {

	this.a1 = null;
	this.b1 = null;
	this.a2 = null;
	this.b2 = null;

	switch (arguments.length) {
		case 1:
			this.a1 = arg0.a1;
			this.b1 = arg0.b1;
			this.a2 = arg0.a2;
			this.b2 = arg0.b2;
			break;
		case 4:
			this.a1 = arg0;
			this.b1 = arg1;
			this.a2 = arg2;
			this.b2 = arg3;
			break;
		default:
			break;
	}
};


primitives.common.Matrix.prototype.determinant = function () {
	return this.a1 * this.b2 - this.b1 * this.a2;
};

/* /graphics/structs/PaletteItem.js*/
primitives.common.PaletteItem = function (options) {
	this.lineColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;
	this.lineWidth = 1;
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.fillColor = null;
	this.opacity = null;

	this._key = "";

	var property, properties,
		index, len;

	properties = ['lineColor', 'lineWidth', 'lineType', 'fillColor', 'opacity'];

	for (index = 0, len = properties.length; index < len; index += 1) {
		property = properties[index];

		if(options != null && options.hasOwnProperty(property)) {
			this[property] = options[property];
		}
		this._key += (!primitives.common.isNullOrEmpty(this._key) ? ", " : "") + property + ":" + this[property];
	}
};

primitives.common.PaletteItem.prototype.toAttr = function () {
	var attr = {
		"lineWidth": this.lineWidth,
		"lineType": this.lineType
	};
	if (this.fillColor !== null) {
		attr.fillColor = this.fillColor;
	}
	if (this.opacity !== null) {
		attr.opacity = this.opacity;
	}
	if (this.lineColor !== null) {
		attr.borderColor = this.lineColor;
	}
	return attr;
};

primitives.common.PaletteItem.prototype.toString = function () {
	return this._key;
};

/* /graphics/structs/PaletteManager.js*/
primitives.common.PaletteManager = function (options, linesPalette) {
	this.palette = [];
	this.cursor = 0;

	var index, len;

	/* pallete based connectors */
	if(linesPalette.length === 0) {
		/* draw all extra as regular */
		this.palette = [new primitives.common.PaletteItem({
			lineColor: options.linesColor,
			lineWidth: options.linesWidth,
			lineType: options.linesType
		})];
		this.paletteLength = this.palette.length;

		this.regularIndex = 0;
	} else {
		for (index = 0, len = linesPalette.length; index < len; index += 1) {
			this.palette.push(new primitives.common.PaletteItem(linesPalette[index]));
		}
		this.paletteLength = this.palette.length;

		/* regular */
		this.palette.push(new primitives.common.PaletteItem({
			lineColor: options.linesColor,
			lineWidth: options.linesWidth,
			lineType: options.linesType
		}));
		this.regularIndex = this.palette.length - 1;
	}
	
	/* highlight */
	this.palette.push(new primitives.common.PaletteItem({
		lineColor: options.highlightLinesColor,
		lineWidth: options.highlightLinesWidth,
		lineType: options.highlightLinesType
	}));
	this.highlightIndex = this.palette.length - 1;
};

primitives.common.PaletteManager.prototype.selectPalette = function (index) {
	this.cursor = index % this.paletteLength;
};

primitives.common.PaletteManager.prototype.getPalette = function (connectorStyleType) {
	var index = null;
	switch (connectorStyleType) {
		case 1/*primitives.common.ConnectorStyleType.Regular*/:
			index = this.regularIndex;
			break;
		case 2/*primitives.common.ConnectorStyleType.Highlight*/:
			index = this.highlightIndex;
			break;
		case 0/*primitives.common.ConnectorStyleType.Extra*/:
			index = this.cursor;
			break;
	}
	return this.palette[index];
};

/* /graphics/structs/Polyline.js*/
primitives.common.Polyline = function (newPaletteItem) {
	var paletteItem = new primitives.common.PaletteItem(),
		segments = [],
		self,
		arrowPaletteItem;

	switch (arguments.length) {
		case 1:
			paletteItem = newPaletteItem;
			break;
	}

	arrowPaletteItem = new primitives.common.PaletteItem({
		lineColor: paletteItem.lineColor,
		lineWidth: 0,
		fillColor: paletteItem.lineColor,
		opacity: paletteItem.opacity || 1
	});

	function getStartPoint() {
		var result = null;
		if (segments.length > 0) {
			result = segments[0].getEndPoint();
		}
		return result;
	}

	function getEndPoint() {
		var result = null;
		if (segments.length > 0) {
			result = segments[segments.length - 1].getEndPoint();
		}
		return result;
	}

	function addSegment(segment) {
		segments.push(segment);
	}

	function addSegments(newSegments) {
		segments = segments.concat(newSegments);
	}

	function mergeTo(polyline) {
		polyline.addSegments(segments);
	}

	function clone() {
		var index, len,
			result = new primitives.common.Polyline(paletteItem),
			cloneSegments = [],
			segment;
		for (index = 0, len = segments.length; index < len; index += 1) {
			segment = segments[index];
			cloneSegments.push(segment.clone());
		}
		result.addSegments(cloneSegments);
		return result;
	}

	function length() {
		return segments.length;
	}

	function loop(thisArg, onItem) {
		var index, len,
			segment;
		if (onItem != null) {
			for (index = 0, len = segments.length; index < len; index += 1) {
				segment = segments[index];
				if (segment) {
					if (onItem.call(thisArg, segment, index)) {
						break;
					}
				}
			}
		}
	}

	function loopReversed(thisArg, onItem) {
		var index,
			segment;
		if (onItem != null) {
			for (index = segments.length - 1; index >= 0; index -= 1) {
				segment = segments[index];
				if (segment) {
					if (onItem.call(thisArg, segment, index)) {
						break;
					}
				}
			}
		}
	}

	function transform(transformArg, forward) {
		loop(this, function(segment){
			if (segment.transform != null) {
				segment.transform(transformArg, forward);
			}
		});
	}

	function isInvertable() {
		return primitives.common.isNullOrEmpty(paletteItem.fillColor);
	}

	function addInverted(polyline) {
		var hasMoved = false,
			stack = [];

		if (isInvertable()) {
			polyline.loopReversed(this, function(segment, index){
				if(segment.segmentType != 4/*primitives.common.SegmentType.Dot*/) {
					if (!hasMoved) {
						segments.push(new primitives.common.MoveSegment(segment.getEndPoint()));
						hasMoved = true;
					}
					stack.unshift(segment);

					if(stack.length > 1) {
						stack[1].invert(stack[0].getEndPoint());
						segments.push(stack[1]);
						stack.length = 1;
					}
						
				}
			});
		} else {
			polyline.mergeTo(self);
		}
	}
	
	function _getArrow(fromX, fromY, toX, toY, length, width) {
		var result = new primitives.common.Polyline(arrowPaletteItem),
			index, len,
			point, x, y,
			perimiter = [new primitives.common.Point(length, -width / 2),
				new primitives.common.Point(0, 0),
				new primitives.common.Point(length, width / 2),
				new primitives.common.Point(length / 4 * 3, 0)
			],
			angle = Math.atan2((fromY - toY), (fromX - toX));

		/* rotate and translate points */
		for (index = 0, len = perimiter.length; index < len; index += 1) {
			point = perimiter[index];
			x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
			y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
			point.x = x + toX;
			point.y = y + toY;
		}

		/* create arrow shape*/
		result.addSegment(new primitives.common.MoveSegment(perimiter[0].x, perimiter[0].y));
		result.addSegment(new primitives.common.LineSegment(perimiter[1].x, perimiter[1].y));
		result.addSegment(new primitives.common.LineSegment(perimiter[2].x, perimiter[2].y));
		result.addSegment(new primitives.common.QuadraticArcSegment(perimiter[3].x, perimiter[3].y, perimiter[0].x, perimiter[0].y));

		return result;
	}

	function addOffsetArrow(forward, lineWidth, offsetPercent, minimumDistance, onAddArrowSegments) {
		var prevEndPoint,
			currentEndPoint,
			currentSegment,
			newEndPoint, newPrevEndPoint,
			polyline,
			len = segments.length,
			arrowTipLength = lineWidth * 3,
			arrowTipWidth = lineWidth * 2,
			offset,
			distance;

		switch (lineWidth) {
			case 1:
				arrowTipLength = 8;
				arrowTipWidth = 6;
				break;
			case 2:
				arrowTipLength = 12;
				arrowTipWidth = 8;
				break;
			case 3:
				arrowTipLength = 16;
				arrowTipWidth = 10;
				break;
		}

		if (onAddArrowSegments != null && len > 1) {
			prevEndPoint = segments[len - 2].getEndPoint();
			currentSegment = segments[len - 1];
			if (currentSegment.offsetPoint != null) {
				currentEndPoint = new primitives.common.Point(currentSegment.getEndPoint());

				distance = prevEndPoint.distanceTo(currentEndPoint);
				if (distance > minimumDistance) {
					offset = distance * offsetPercent;

					if (forward) {
						newEndPoint = currentSegment.offsetPoint(prevEndPoint, currentEndPoint, offset);
						polyline = _getArrow(prevEndPoint.x, prevEndPoint.y, newEndPoint.x, newEndPoint.y, arrowTipLength, arrowTipWidth);
					} else {
						newPrevEndPoint = currentSegment.offsetPoint(currentEndPoint, prevEndPoint, offset);
						polyline = _getArrow(currentEndPoint.x, currentEndPoint.y, newPrevEndPoint.x, newPrevEndPoint.y, arrowTipLength, arrowTipWidth);
					}
					onAddArrowSegments(polyline);
				}
			}
		}
	}


	function addArrow(lineWidth, onAddArrowSegments) {
		var prevEndPoint,
			currentEndPoint,
			currentSegment,
			newEndPoint,
			polyline,
			len = segments.length,
			arrowTipLength = lineWidth * 3,
			arrowTipWidth = lineWidth * 2;

		switch (lineWidth) {
			case 1:
				arrowTipLength = 8;
				arrowTipWidth = 6;
				break;
			case 2:
				arrowTipLength = 12;
				arrowTipWidth = 8;
				break;
			case 3:
				arrowTipLength = 16;
				arrowTipWidth = 10;
				break;
		}

		if (onAddArrowSegments != null && len > 1) {
			prevEndPoint = segments[len - 2].getEndPoint();
			currentSegment = segments[len - 1];
			if (currentSegment.trim != null) {
				currentEndPoint = new primitives.common.Point(currentSegment.getEndPoint());
				newEndPoint = currentSegment.trim(prevEndPoint, arrowTipWidth);

				polyline = _getArrow(newEndPoint.x, newEndPoint.y, currentEndPoint.x, currentEndPoint.y, arrowTipLength, arrowTipWidth);
				onAddArrowSegments(polyline, newEndPoint);
			}
		}
	}

	function optimizeMoveSegments() {
		var index, len,
			cursorIndex,
			key,
			optimizedSegments,
			segment, nextSegment,
			links = {},
			jumps = [],
			processed = [];

		for (index = 0, len = segments.length; index < len - 1; index += 1) {
			segment = segments[index];
			nextSegment = segments[index + 1];
			switch (segment.segmentType) {
				case 0/*primitives.common.SegmentType.Line*/:
				case 2/*primitives.common.SegmentType.QuadraticArc*/:
				case 3/*primitives.common.SegmentType.CubicArc*/:
					switch (nextSegment.segmentType) {
						case 1/*primitives.common.SegmentType.Move*/:
						case 4/*primitives.common.SegmentType.Dot*/:
							key = segment.x + "&" + segment.y;
							if (!links.hasOwnProperty(key)) {
								links[key] = index;
							}
							break;
						default:
							break;
					}
					break;
				case 1/*primitives.common.SegmentType.Move*/:
					key = segment.x + "&" + segment.y;
					if (links.hasOwnProperty(key) && !jumps[links[key]]) {
						jumps[links[key]] = index + 1;
						processed[index] = true;
					}
					break;
				default:
					break;
			}
		}
		optimizedSegments = [];
		for (index = 0; index < len; index += 1) {
			if (!processed[index]) {
				segment = segments[index];
				optimizedSegments.push(segment);
				processed[index] = true;

				if (jumps[index] > 0) {
					cursorIndex = jumps[index];
					while (cursorIndex < len && !processed[cursorIndex]) {
						segment = segments[cursorIndex];
						optimizedSegments.push(segment);
						processed[cursorIndex] = true;

						if (jumps[cursorIndex] > 0) {
							cursorIndex = jumps[cursorIndex];
						} else {
							cursorIndex += 1;
						}
					}
				}
			}
		}
		segments = optimizedSegments;
	}

	function toString() {
		return paletteItem.toString();
	}

	/* private classes */
	function Vertex(segment, pointIndex) {
		this.segment = segment;
		this.pointIndex = pointIndex;
	}

	Vertex.prototype.pushToSegment = function (point) {
		this.segment.setPoint(point, this.pointIndex);
	};

	function _joinVectors(prev, current, offset, polyline, isLoop) {
		var relationType = prev.relateTo(current),
			offset2 = isLoop ? 0 : offset,
			joinSegment,
			joinVector,
			newToPoint;
		if (relationType == 2/*primitives.common.VectorRelationType.Collinear*/) {
			/* Vectors are collinear vectors so we don't search for intersection */
			current.offset(offset2);
		} else {
			if (relationType == 3/*primitives.common.VectorRelationType.Opposite*/ && current.from.context.pointIndex === 0) {
				/* Vectors are opposite vectors which belong to 2 different segments
					so we add an extra line segment in between of them
				*/
				joinSegment = new primitives.common.LineSegment(current.from);
				polyline.addSegment(joinSegment);

				current.offset(offset2);

				newToPoint = current.from.clone();
				newToPoint.context = new Vertex(joinSegment, 0);

				joinVector = new primitives.common.Vector(prev.to.clone(), newToPoint);
				if (!isLoop) {
					current.from = newToPoint.clone();
				}

				joinVector.offset(offset);
				joinVector.intersect(prev);
				joinVector.from.context.pushToSegment(joinVector.from);
				current.intersect(joinVector);

				if (isLoop) {
					joinVector.to.context.pushToSegment(joinVector.to);
				}
			} else {
				current.offset(offset2);
				current.intersect(prev);
			}
		}
		current.from.context.pushToSegment(current.from);
	}

	function _closeVector(vectorStack, startVectors, offset, polyline) {
		var startVector,
			prevVector = vectorStack[0],
			closurePoint = prevVector.to.context.segment.getEndPoint().toString();
		if (startVectors.hasOwnProperty(closurePoint)) {
			startVector = startVectors[closurePoint];

			_joinVectors(prevVector, startVector, offset, polyline, true);

			delete startVectors[closurePoint];
		}
		prevVector.to.context.pushToSegment(prevVector.to);
		vectorStack.length = 0;
	}

	function getOffsetPolyine(offset) {
		var result = new primitives.common.Polyline(paletteItem),
			startVectors = {},
			pointStack = [],
			vectorStack = [];

		loop(this, function (segment) {
			var newSegment = segment.clone(),
				newPoint;

			switch (newSegment.segmentType) {
				case 4/*primitives.common.SegmentType.Dot*/:
				case 1/*primitives.common.SegmentType.Move*/:
					if (vectorStack.length > 0) {
						_closeVector(vectorStack, startVectors, offset, result);
					}
					pointStack.length = 0;
					if (newSegment.segmentType == 1/*primitives.common.SegmentType.Move*/) {
						newPoint = new primitives.common.Point(newSegment);
						newPoint.context = new Vertex(newSegment, 0);
						pointStack.push(newPoint);
					}
					break;
				default:
					newSegment.loop(this, function (x, y, index) {
						var newPoint = new primitives.common.Point(x, y),
							current,
							prev,
							closurePoint;

						newPoint.context = new Vertex(newSegment, index);
						pointStack.unshift(newPoint);
						if (pointStack.length > 1) {
							vectorStack.unshift(new primitives.common.Vector(pointStack[1].clone(), pointStack[0].clone()));
							pointStack.length = 1;
						}

						switch (vectorStack.length) {
							case 1:
								/* first Vector in stack we add to start Vectors collection for possible join into perimiter*/
								current = vectorStack[0];
								closurePoint = current.from.toString();
								startVectors[closurePoint] = current;
								current.offset(offset);
								current.from.context.pushToSegment(current.from);
								break;
							case 2:
								prev = vectorStack[1];
								current = vectorStack[0];

								_joinVectors(prev, current, offset, result, false);

								vectorStack.length = 1;
								break;
							default:
								break;
						}
					});
					break;
			}
			result.addSegment(newSegment);
		});
		if (vectorStack.length > 0) {
			_closeVector(vectorStack, startVectors, offset, result);
		}
		return result;
	}

	self = {
		paletteItem: paletteItem,
		arrowPaletteItem: arrowPaletteItem,
		addSegment: addSegment,
		addSegments: addSegments,
		mergeTo: mergeTo,
		length: length,
		loop: loop,
		loopReversed: loopReversed,
		transform: transform,
		isInvertable: isInvertable,
		addInverted: addInverted,
		addArrow: addArrow,
		addOffsetArrow: addOffsetArrow,
		optimizeMoveSegments: optimizeMoveSegments,
		getOffsetPolyine: getOffsetPolyine,
		toString: toString,
		getStartPoint: getStartPoint,
		getEndPoint: getEndPoint,
		clone: clone
	};

	return self;
};

/* /graphics/structs/PolylinesBuffer.js*/
primitives.common.PolylinesBuffer = function () {
	var polylines = {};

	function _getPolyline(polylines, paletteItem) {
		if (!polylines[paletteItem.toString()]) {
			polylines[paletteItem.toString()] = new primitives.common.Polyline(paletteItem);
		}
		return polylines[paletteItem.toString()];
	}

	function getPolyline(paletteItem) {
		return _getPolyline(polylines, paletteItem);
	}

	function loop(thisArg, onItem) {
		var key,
			polyline;
		if (onItem != null) {
			for (key in polylines) {
				if (polylines.hasOwnProperty(key)) {
					polyline = polylines[key];
					if (polyline) {
						polyline.optimizeMoveSegments();

						if (onItem.call(thisArg, polyline)) {
							break;
						}
					}
				}
			}
		}
	}

	function addInverted(callbackFun, copyOnly) {
		var backupPolylines, backupPolyline;

		/* backup polylines */
		backupPolylines = polylines;
		polylines = {};

		if (callbackFun != null) {
			callbackFun(this);
		}

		/* add inverted polylines to backup collection */
		loop(this, function (polyline) {
			backupPolyline = _getPolyline(backupPolylines, polyline.paletteItem);

			if (!copyOnly) {
				backupPolyline.addInverted(polyline);
			} else {
				polyline.mergeTo(backupPolyline);
			}
		});

		/* restore polylines */
		polylines = backupPolylines;
	}

	function transform(transformArg, forward) {
		loop(this, function (polyline) {
			polyline.transform(transformArg, forward);
		});
	}

	return {
		getPolyline: getPolyline,
		loop: loop,
		addInverted: addInverted,
		transform: transform
	};
};

/* /graphics/structs/QuadraticArcSegment.js*/
primitives.common.QuadraticArcSegment = function (arg0, arg1, arg2, arg3) {
	this.x = null;
	this.y = null;

	this.cpX = null;
	this.cpY = null;

	switch (arguments.length) {
		case 2:
			this.x = arg1.x;
			this.y = arg1.y;
			this.cpX = arg0.x;
			this.cpY = arg0.y;
			break;
		case 4:
			this.cpX = arg0;
			this.cpY = arg1;
			this.x = arg2;
			this.y = arg3;
			break;
		default:
			break;
	}

	this.segmentType = 2/*primitives.common.SegmentType.QuadraticArc*/;
};

primitives.common.QuadraticArcSegment.prototype.clone = function () {
	return new primitives.common.QuadraticArcSegment(this.cpX, this.cpY, this.x, this.y);
};

primitives.common.QuadraticArcSegment.prototype.loop = function (thisArg, onItem) {
	if (onItem != null) {
		onItem.call(thisArg, this.cpX, this.cpY, 0);
		onItem.call(thisArg, this.x, this.y, 1);
	}
};

primitives.common.QuadraticArcSegment.prototype.setPoint = function (point, index) {
	switch (index) {
		case 0:
			this.cpX = point.x;
			this.cpY = point.y;
			break;
		case 1:
			this.x = point.x;
			this.y = point.y;
			break;
	}
};

primitives.common.QuadraticArcSegment.prototype.getEndPoint = function () {
	return this;
};

primitives.common.QuadraticArcSegment.prototype.invert = function (endPoint) {
	this.x = endPoint.x;
	this.y = endPoint.y;
};

primitives.common.QuadraticArcSegment.prototype.transform = function (transform, forward) {
	var self = this;
	transform.transformPoints(self.x, self.y, self.cpX, self.cpY, forward, self, function (x, y, cpX, cpY) {
		self.x = x;
		self.y = y;
		self.cpX = cpX;
		self.cpY = cpY;
	});//ignore jslint
};

primitives.common.QuadraticArcSegment.prototype.trim = function (prevEndPoint, offset) {
	var time = 0.5,
	endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time),
	time2 = 0.1,
	endPoint2 = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time2);

	time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
	endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time);

	this.x = endPoint.x;
	this.y = endPoint.y;

	return this;
};

primitives.common.QuadraticArcSegment.prototype.offsetPoint = function (firstX, firstY, controlX, controlY, secondX, secondY, time) {
	return new primitives.common.Point((1 - time) * (1 - time) * firstX + 2 * (1 - time) * time * controlX + time * time * secondX,
		(1 - time) * (1 - time) * firstY + 2 * (1 - time) * time * controlY + time * time * secondY);
};

/* /graphics/structs/Size.js*/
/*
	Class: primitives.common.Size
	Class describes the size of an object.

	Parameters:
		size - Copy constructor. It takes as a parameter copy of <primitives.common.Size> object.

	Parameters:
		width - The initial width of the instance.
		height - The initial height of the instance.
*/
primitives.common.Size = function (arg0, arg1) {
	/*
	Property: width
		The value that specifies the width of the size class.
	*/

	this.width = 0;

	/*
	Property: height
		The value that specifies the height of the size class.
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

/*
	Method: invert
		Swaps width and height.
*/
primitives.common.Size.prototype.invert = function () {
	var width = this.width;
	this.width = this.height;
	this.height = width;
	return this;
};

/*
	Method: scale
		Scales width and height.
*/
primitives.common.Size.prototype.scale = function (scale) {
	this.width = this.width * scale;
	this.height = this.height * scale;
	return this;
};

/*
	Method: getCSS
		Returns rectangle location and size in form of CSS style object.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style object.
*/
primitives.common.Size.prototype.getCSS = function (units) {
	units = (units !== undefined) ? units : "px";

	var result = {
		left: this.x + units,
		top: this.y + units,
		width: this.width + units,
		height: this.height + units
	};
	return result;
};

/*
	Method: cropBySize
		Crops the size by the other size.

	Parameters:
		size - The size to use as the crop boundaries.
*/
primitives.common.Size.prototype.cropBySize = function (size) {
	this.width = Math.min(this.width, size.width);
	this.height = Math.min(this.height, size.height);

	return this;
};

/*
	Method: addSize
		Extend size by the other size.

	Parameters:
		size - The size to use as extension.
*/
primitives.common.Size.prototype.addSize = function (size) {
	this.width = Math.max(this.width, size.width);
	this.height = Math.max(this.height, size.height);

	return this;
};

primitives.common.Size.prototype.validate = function () {
	if (isNaN(this.width) || isNaN(this.height)) {
		throw "Invalid size.";
	}
};

/* /graphics/structs/Thickness.js*/
/*
	Class: primitives.common.Thickness
	Class describes the thickness of a frame around rectangle.

	Parameters:
		left - The thickness for the left side of the rectangle.
		height - The thickness for the upper side of the rectangle.
		right - The thickness for the right side of the rectangle.
		bottom - The thickness for the bottom side of the rectangle.
*/
primitives.common.Thickness = function (left, top, right, bottom) {
	/*
	Property: left
		The thickness for the left side of the rectangle.
	*/

	this.left = left;

	/*
	Property: top
		The thickness for the upper side of the rectangle.
	*/

	this.top = top;

	/*
	Property: right
		The thickness for the right side of the rectangle.
	*/
	this.right = right;

	/*
	Property: bottom
		The thickness for the bottom side of the rectangle.
	*/
	this.bottom = bottom;
};

/*
	Method: isEmpty
		Gets the value that indicates whether the thickness is the Empty.
*/

primitives.common.Thickness.prototype.isEmpty = function () {
	return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/*
	Method: toString
		Returns thickness in form of CSS style string. It is conversion to padding style string.

	Parameters:
		units - The string name of units. Uses "px" if not defined.

	Returns:
		CSS style string.
*/

primitives.common.Thickness.prototype.toString = function (units) {
	units = (units !== undefined) ? units : "px";

	return this.left + units + ", " + this.top + units + ", " + this.right + units + ", " + this.bottom + units;
};

/* /graphics/structs/Vector.js*/
/*
	Class: primitives.common.Vector
	Class represents pair of points that defines a vector in 2D plane.

	Parameters:
		vector - <primitives.common.Vector> object.

	Parameters:
		from - From 2D point.
		to - To 2D point.
*/
primitives.common.Vector = function (arg0, arg1) {
	/*
	Property: from
		The from point of vector.
	*/

	this.from = null;

	/*
	Property: to
		The to point of vector.
	*/

	this.to = null;

	/*
	Property: context
		This property holds reference to context object associated with this vector.
	*/
	this.context = null;

	switch (arguments.length) {
		case 1:
			this.from = arg0.from;
			this.to = arg0.to;
			break;
		case 2:
			this.from = arg0;
			this.to = arg1;
			break;
		default:
			break;
	}
};

primitives.common.Vector.prototype.isNull = function () {
	return this.from.x == this.to && this.from.y == this.to.y;
};

/*
	Method: length
		Returns length of vector.

	Returns:
		Vector length.
*/
primitives.common.Vector.prototype.length = function () {
	return this.from.distanceTo(this.to);
};

primitives.common.Vector.prototype.equalTo = function (vector) {
	return this.from.equalTo(vector.from) && this.to.equalTo(vector.to);
};

primitives.common.Vector.prototype.getMiddlePoint = function () {
	return new primitives.common.Point((this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2);
};

primitives.common.Vector.prototype.relateTo = function (vector) {
	var result = 0/*primitives.common.VectorRelationType.None*/,
		x1 = this.to.x - this.from.x,
		y1 = this.to.y - this.from.y,
		x2 = vector.to.x - vector.from.x,
		y2 = vector.to.y - vector.from.y,
		key = (x1 ? 8 : 0) + (y1 ? 4 : 0) + (x2 ? 2 : 0) + (y2 ? 1 : 0);

	switch (key) {
		case 0: //0000
		case 1: //0001
		case 2: //0010
		case 3: //0011
		case 4: //0100
		case 8: //1000
		case 12://1100
			result = 1/*primitives.common.VectorRelationType.Null*/;
			break;
		case 5: //0101
			if (y1 * y2 > 0) {
				result = 2/*primitives.common.VectorRelationType.Collinear*/;
			} else {
				result = 3/*primitives.common.VectorRelationType.Opposite*/;
			}
			break;
		case 10://1010
			if (x1 * x2 > 0) {
				result = 2/*primitives.common.VectorRelationType.Collinear*/;
			} else {
				result = 3/*primitives.common.VectorRelationType.Opposite*/;
			}
			break;
		case 15://1111
			if (x1 / x2 == y1 / y2) {
				if (x1 / x2 > 0) {
					result = 2/*primitives.common.VectorRelationType.Collinear*/;
				} else {
					result = 3/*primitives.common.VectorRelationType.Opposite*/;
				}
			}
			break;
	}
	return result;
};

primitives.common.Vector.prototype.offset = function (offset) {
	var length = this.length(),
		/* in order to rotate right multiply vector on 3D vector (0, 0, -1)*/
		x = (this.to.y - this.from.y) * offset / length,
		y = - (this.to.x - this.from.x) * offset / length;

	this.from.x += x;
	this.from.y += y;
	this.to.x += x;
	this.to.y += y;
};

primitives.common.Vector.prototype.getLine = function () {
	var x1 = this.from.x,
		y1 = this.from.y,
		x2 = this.to.x,
		y2 = this.to.y,
		a = y2 - y1,
		b = x1 - x2,
		c = x1 * (y1 - y2) + y1 * (x2 - x1);

	return [a, b, c];
};

primitives.common.Vector.prototype.getLineKey = function () {
	var line = this.getLine(),
		a = line[0],
		b = line[1],
		c = line[2],
		r = 10000;
	if (b !== 0) {
		line = [Math.floor(a / b * r), 1, Math.floor(c / b * r)];
	} else {
		line = [1, 0, Math.floor(c / a * r)];
	}
	return line.toString();
};


primitives.common.Vector.prototype.intersect = function (vector) {
	var v1 = this.getLine(),
		v2 = vector.getLine(),
		m = new primitives.common.Matrix(v1[0], v1[1], v2[0], v2[1]),
		d = m.determinant(),
		mx, my, dx, dy,
		x, y,
		result = false;

	if (d !== 0) {
		mx = new primitives.common.Matrix(-v1[2], v1[1], -v2[2], v2[1]);
		dx = mx.determinant();
		my = new primitives.common.Matrix(v1[0], -v1[2], v2[0], -v2[2]);
		dy = my.determinant();
		x = dx / d;
		y = dy / d;

		vector.to.x = x;
		vector.to.y = y;

		this.from.x = x;
		this.from.y = y;

		result = true;
	}

	return result;
};

primitives.common.Vector.prototype.getIntersectionPoint = function (vector, strict, rounding) {
	var v1 = this.getLine(),
		v2 = vector.getLine(),
		m = new primitives.common.Matrix(v1[0], v1[1], v2[0], v2[1]),
		d = m.determinant(),
		mx, my, dx, dy,
		x, y,
		result = null;

	if (d !== 0) {
		mx = new primitives.common.Matrix(-v1[2], v1[1], -v2[2], v2[1]);
		dx = mx.determinant();
		my = new primitives.common.Matrix(v1[0], -v1[2], v2[0], -v2[2]);
		dy = my.determinant();
		x = dx / d;
		y = dy / d;

		if (strict) {
			if (vector._contains(x, y, rounding) && this._contains(x, y, rounding)) {
				result = new primitives.common.Point(x, y);
			}
		} else {
			result = new primitives.common.Point(x, y);
		}
	}

	return result;
};

primitives.common.Vector.prototype._contains = function (x, y, rounding) {
	var x1 = Math.min(this.from.x, this.to.x),
		y1 = Math.min(this.from.y, this.to.y),
		x2 = Math.max(this.from.x, this.to.x),
		y2 = Math.max(this.from.y, this.to.y);

	return x1 - rounding <= x && x <= x2 + rounding && y1 - rounding <= y && y <= y2 + rounding;
};



/* /graphics/Graphics.js*/
primitives.common.Graphics = function (element) {
	this.m_element = element;

	this.m_placeholders = {};
	this.m_activePlaceholder = null;

	this.m_cache = new primitives.common.Cache();

	this.graphicsType = null;
	this.hasGraphics = false;
	this.debug = false;
	this.layerNames = {};

	primitives.common.loop(this, primitives.common.Layers, function (key, value) {
		this.layerNames[value] = key;
	});
};

primitives.common.Graphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	this.m_cache.clear();

	this.m_cache = null;

	this.m_element = null;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];

			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					layer.canvas.parentNode.removeChild(layer.canvas);
					layer.canvas = null;
				}
			}
			placeholder.layers.length = 0;
			placeholder.activeLayer = null;

			placeholder.size = null;
			placeholder.rect = null;
			placeholder.div = null;
		}
	}
	this.m_placeholders.length = 0;
	this.m_activePlaceholder = null;
};

primitives.common.Graphics.prototype.resize = function (name, width, height) {
	var placeholder = this.m_placeholders[name];
	if (placeholder != null) {
		this.resizePlaceholder(placeholder, width, height);
	}
};

primitives.common.Graphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer;

	placeholder.size = new primitives.common.Size(width, height);
	placeholder.rect = new primitives.common.Rect(0, 0, width, height);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.name !== -1) {
				primitives.common.JsonML.applyStyles(layer.canvas, {
					"position": "absolute",
					"width": "0px",
					"height": "0px"
				});
			}
		}
	}
};

primitives.common.Graphics.prototype.begin = function () {
	this.m_cache.begin();
};

primitives.common.Graphics.prototype.end = function () {
	this.m_cache.end();
};


primitives.common.Graphics.prototype.reset = function (arg0, arg1) {
	var placeholderName = "none",
		layerName = -1;
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				placeholderName = arg0;
			}
			else {
				layerName = arg0;
			}
			break;
		case 2:
			placeholderName = arg0;
			layerName = arg1;
			break;
	}
	this.m_cache.reset(placeholderName, layerName);
};

primitives.common.Graphics.prototype.activate = function (arg0, arg1) {
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				this._activatePlaceholder(arg0);
				this._activateLayer(-1);
			}
			else {
				this._activatePlaceholder("none");
				this._activateLayer(arg0);
			}
			break;
		case 2:
			this._activatePlaceholder(arg0);
			this._activateLayer(arg1);
			break;
	}
	return this.m_activePlaceholder;
};

primitives.common.Graphics.prototype._activatePlaceholder = function (placeholderName) {
	var placeholder = this.m_placeholders[placeholderName],
		div, divs;
	if (placeholder === undefined) {
		div = null;
		if (placeholderName === "none") {
			div = this.m_element;
		}
		else {
			divs = this.m_element.getElementsByClassName(placeholderName);
			div = divs.length > 0 ? divs[0] : this.m_element;
		}

		placeholder = new primitives.common.Placeholder(placeholderName);
		placeholder.div = div;
		placeholder.size = primitives.common.getInnerSize(div);
		placeholder.rect = new primitives.common.Rect(0, 0, placeholder.size.width, placeholder.size.height);

		this.m_placeholders[placeholderName] = placeholder;
	}
	this.m_activePlaceholder = placeholder;
};

primitives.common.Graphics.prototype._activateLayer = function (layerName) {
	var layer = this.m_activePlaceholder.layers[layerName],
		placeholder,
		canvas,
		position,
		maximumLayer,
		layerKey;
	if (layer === undefined) {
		placeholder = this.m_activePlaceholder;
		if (layerName === -1) {
			layer = new primitives.common.Layer(layerName);
			layer.canvas = placeholder.div;
		}
		else {
			canvas = primitives.common.JsonML.toHTML(["div",
				{
					"style": {
						"position": "absolute",
						"width": "0px",
						"height": "0px"
					},
					"class": ["Layer" + layerName, "Layer" + this.layerNames[layerName]]
				}
			]);

			maximumLayer = null;
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.name < layerName) {
						maximumLayer = (maximumLayer !== null) ? Math.max(maximumLayer, layer.name) : layer.name;
					}
				}
			}

			layer = new primitives.common.Layer(layerName);
			layer.canvas = canvas;

			if (maximumLayer === null) {
				this.prepend(placeholder.div, layer.canvas);
			} else {
				this.insertAfter(placeholder.layers[maximumLayer].canvas, layer.canvas);
			}
		}
		placeholder.layers[layerName] = layer;
	}
	this.m_activePlaceholder.activeLayer = layer;
};

primitives.common.Graphics.prototype.prepend = function (parent, newElement) {
	if (parent.firstChild == null) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, parent.firstChild);
	}
};

primitives.common.Graphics.prototype.insertAfter = function (insertAfterElement, newElement) {
	var parent = insertAfterElement.parentNode;
	if (parent.lastChild == insertAfterElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, insertAfterElement.nextSibling);
	}
};

primitives.common.Graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {
	var placeholder = this.m_activePlaceholder,
		style = {
			"position": "absolute",
			"padding": 0,
			"margin": 0,
			"textAlign": this._getTextAlign(horizontalAlignment),
			"fontSize": attr.fontSize,
			"fontFamily": attr.fontFamily,
			"fontWeight": attr.fontWeight,
			"fontStyle": attr.fontStyle,
			"color": attr.fontColor,
			"lineHeight": 1
		},
		rotation = "",
		element,
		tdstyle;

	switch (orientation) {
		case 0/*primitives.text.TextOrientationType.Horizontal*/:
		case 3/*primitives.text.TextOrientationType.Auto*/:
			style.left = x + "px";
			style.top = y + "px";
			style.width = width + "px";
			style.height = height + "px";
			break;
		case 1/*primitives.text.TextOrientationType.RotateLeft*/:
			style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
			style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
			style.width = height + "px";
			style.height = width + "px";
			rotation = "rotate(-90deg)";
			break;
		case 2/*primitives.text.TextOrientationType.RotateRight*/:
			style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
			style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
			style.width = height + "px";
			style.height = width + "px";
			rotation = "rotate(90deg)";
			break;
	}

	style["-webkit-transform-origin"] = "center center";
	style["-moz-transform-origin"] = "center center";
	style["-o-transform-origin"] = "center center";
	style["-ms-transform-origin"] = "center center";


	style["-webkit-transform"] = rotation;
	style["-moz-transform"] = rotation;
	style["-o-transform"] = rotation;
	style["-ms-transform"] = rotation;
	style.transform = rotation;


	style.maxWidth = style.width;
	style.maxHeight = style.height;

	label = label.replace(new RegExp("\n", 'g'), "<br/>");
	switch (verticalAlignment) {
		case 0/*primitives.common.VerticalAlignmentType.Top*/:
			if (this.debug) {
				style.border = "solid 1px black";
			}
			element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "text");
			if (element === null) {
				element = primitives.common.JsonML.toHTML(["div",
					{
						"style": style,
						$: function (element) { element.innerHTML = label; }
					}
				]);
				placeholder.activeLayer.canvas.appendChild(element);
				this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "text", element);
			}
			else {
				primitives.common.JsonML.applyStyles(element, style);
				element.innerHTML = label;
			}
			break;
		default:
			style.borderCollapse = "collapse";
			tdstyle = {
				"verticalAlign": this._getVerticalAlignment(verticalAlignment),
				"padding": 0
			};
			if (this.debug) {
				tdstyle.border = "solid 1px black";
			}
			element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "textintable");
			if (element === null) {
				element = primitives.common.JsonML.toHTML(["table",
					{
						"style": style
					},
					["tbody",
						["tr",
							["td",
								{
									"style": tdstyle,
									$: function (element) { element.innerHTML = label;}
								}
							]
						]
					]
				]);
				placeholder.activeLayer.canvas.appendChild(element);
				this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "textintable", element);
			}
			else {
				primitives.common.JsonML.applyStyles(element, style);
				var td = element.getElementsByTagName("td")[0];
				primitives.common.JsonML.applyStyles(td, tdstyle);
				td.innerHTML = label;
			}
			break;
	}
};

primitives.common.Graphics.prototype._getTextAlign = function (alignment) {
	var result = null;
	switch (alignment) {
		case 0/*primitives.common.HorizontalAlignmentType.Center*/:
			result = "center";
			break;
		case 1/*primitives.common.HorizontalAlignmentType.Left*/:
			result = "left";
			break;
		case 2/*primitives.common.HorizontalAlignmentType.Right*/:
			result = "right";
			break;
	}
	return result;
};

primitives.common.Graphics.prototype._getVerticalAlignment = function (alignment) {
	var result = null;
	switch (alignment) {
		case 1/*primitives.common.VerticalAlignmentType.Middle*/:
			result = "middle";
			break;
		case 0/*primitives.common.VerticalAlignmentType.Top*/:
			result = "top";
			break;
		case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
			result = "bottom";
			break;
	}
	return result;
};

primitives.common.Graphics.prototype.polylinesBuffer = function (buffer) {
	buffer.loop(this, function (polyline) {
		if (polyline.length() > 0) {
			this.polyline(polyline);
		}
	});
};

primitives.common.Graphics.prototype.polyline = function (polylineData) {
	var fromX = null,
		fromY = null,
		attr = polylineData.paletteItem.toAttr();

	polylineData.loop(this, function (segment) {
		switch (segment.segmentType) {
			case 1/*primitives.common.SegmentType.Move*/:
				fromX = Math.round(segment.x) + 0.5;
				fromY = Math.round(segment.y) + 0.5;
				break;
			case 0/*primitives.common.SegmentType.Line*/:
				this.rightAngleLine(fromX, fromY, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, attr);
				fromX = Math.round(segment.x) + 0.5;
				fromY = Math.round(segment.y) + 0.5;
				break;
			case 4/*primitives.common.SegmentType.Dot*/:
				this.dot(segment.x, segment.y, segment.width, segment.height, segment.cornerRadius, attr);
				break;
		}
	});
};

primitives.common.Graphics.prototype.dot = function (cx, cy, width, height, cornerRadius, attr) {
	var placeholder = this.m_activePlaceholder,
		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "dot"),
		hasBorder = (attr.lineWidth !== undefined && attr.borderColor !== undefined),
		style = {
			"position": "absolute",
			"width": (width - (hasBorder ? 1 : 0)),
			"top": Math.round(cy),
			"left": Math.round(cx),
			"padding": 0,
			"margin": 0,
			"lineHeight": "0px",
			"overflow": "hidden",
			"height": (height - (hasBorder ? 1 : 0)),
			"background": attr.fillColor,
			"MozBorderRadius": cornerRadius,
			"WebkitBorderRadius": cornerRadius,
			"-khtml-border-radius": cornerRadius,
			"borderRadius": cornerRadius,
			"fontSize": "0px",
			"borderStyle": (hasBorder ? "Solid" : "None"),
			"borderWidth": (hasBorder ? "1px" : "0px"),
			"borderColor": (hasBorder ? attr.borderColor : "")
		};

	if (element === null) {
		element = primitives.common.JsonML.toHTML(["div",
			{
				"style": style
			}
		]);
		placeholder.activeLayer.canvas.appendChild(element);
		this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "dot", element);
	} else {
		primitives.common.JsonML.applyStyles(element, style);
	}
};

primitives.common.Graphics.prototype.rightAngleLine = function (fromX, fromY, toX, toY, attr) {
	var placeholder = this.m_activePlaceholder,
		isVertical = Math.abs(toY - fromY) > Math.abs(toX - fromX),
		lineWidth = attr.lineWidth,
		style = {
			"position": "absolute",
			"top": Math.round(Math.min(fromY, toY) - ((isVertical) ? 0 : lineWidth / 2.0)),
			"left": Math.round(Math.min(fromX, toX) - ((isVertical) ? lineWidth / 2.0 : 0)),
			"padding": 0,
			"margin": 0,
			"opacity": 0.5,
			"lineHeight": "0px",
			"overflow": "hidden",
			"background": attr.borderColor,
			"fontSize": "0px"
		},
		element;

		if (isVertical) {
			style.width = lineWidth;
			style.height = Math.abs(Math.round(toY - fromY));
		} else {
			style.width = Math.abs(Math.round(toX - fromX));
			style.height = lineWidth;
		}

		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "rect");
		if (element === null) {
			element = primitives.common.JsonML.toHTML(["div",
				{
					"style": style
				}
			]);
			placeholder.activeLayer.canvas.appendChild(element);
			this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "rect", element);
		} else {
			primitives.common.JsonML.applyStyles(element, style);
		}
};

primitives.common.Graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
	var placeholder = this.m_activePlaceholder,
		element,
		templateKey = "template" + ((hashCode !== null) ? hashCode : primitives.common.hashCode(template)),
		gap = 0,
		style;

		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, templateKey);

		if (attr !== null) {
			if (attr.borderWidth !== undefined) {
				gap = this.getPxSize(attr.borderWidth);
			}
		}

		style = {
			"width": (contentWidth - gap) + "px",
			"height": (contentHeight - gap) + "px",
			"top": (y + contenty) + "px",
			"left": (x + contentx) + "px"
		};

		primitives.common.mergeObjects(style, attr);

		if (uiHash == null) {
			uiHash = new primitives.common.RenderEventArgs();
		}

		uiHash.x = x + contentx;
		uiHash.y = y + contenty;
		uiHash.width = contentWidth - gap;
		uiHash.height = contentHeight - gap;

		if (element == null) {
			element = this.getElementByTemplate(template);
			style = primitives.common.mergeObjects(style, {
				"position": "absolute",
				"padding": "0px",
				"margin": "0px"
			}, attr);
			primitives.common.JsonML.applyStyles(element, style);

			uiHash.element = element;
			uiHash.renderingMode = 0/*primitives.common.RenderingMode.Create*/;

			if (onRenderTemplate !== null) {
				onRenderTemplate(null, uiHash);
			}
			placeholder.activeLayer.canvas.appendChild(element);
			this.m_cache.put(placeholder.name, placeholder.activeLayer.name, templateKey, element);
		} else {
			uiHash.element = element;
			uiHash.renderingMode = 1/*primitives.common.RenderingMode.Update*/;
			primitives.common.JsonML.applyStyles(element, style);
			if (onRenderTemplate !== null) {
				onRenderTemplate(null, uiHash);
			}
		}
	return element;
};

primitives.common.Graphics.prototype.getElementByTemplate = function (template) {
	var result = null;
	if (primitives.common.isArray(template)) {
		result = primitives.common.JsonML.toHTML(template);
	} else {
		var parent = document.createElement('div');
		parent.innerHTML = template;
		result = parent.firstChild;
	}
	return result;
};

primitives.common.Graphics.prototype.getPxSize = function (value, base) {
	var result = value;
	if (typeof value === "string") {
		if (value.indexOf("pt") > 0) {
			result = parseInt(value, 10) * 96 / 72;
		}
		else if (value.indexOf("%") > 0) {
			result = parseFloat(value) / 100.0 * base;
		}
		else {
			result = parseInt(value, 10);
		}
	}
	return result;
};

/* /graphics/Cache.js*/
primitives.common.Cache = function () {
	this.threshold = 20;

	this.m_visible = {};
	this.m_invisible = {};
};

primitives.common.Cache.prototype.begin = function () {
	var placeholder,
		type,
		index,
		control;

	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
						control = this.m_visible[placeholder][type][index];
						control.style.visibility = "hidden";
						this.m_invisible[placeholder][type].push(control);
					}
					this.m_visible[placeholder][type].length = 0;
				}
			}
		}
	}
};

primitives.common.Cache.prototype.end = function () {
	var placeholder,
		type,
		control;
	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					control = null;
					if (this.m_invisible[placeholder][type].length > this.threshold) {
						while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
							control.parentNode.removeChild(control);
						}
					}
				}
			}
		}
	}
};

primitives.common.Cache.prototype.reset = function (placeholder, layer) {
	placeholder = placeholder + "-" + layer;
	var control = null,
		type,
		index;
	for (type in this.m_visible[placeholder]) {
		if (this.m_visible[placeholder].hasOwnProperty(type)) {
			for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
				control = this.m_visible[placeholder][type][index];
				this.m_invisible[placeholder][type].push(control);
				control.style.visibility = "hidden";
			}
			this.m_visible[placeholder][type].length = 0;
		}
	}
};

primitives.common.Cache.prototype.clear = function () {
	var placeholder,
		type,
		control;
	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					control = null;
					while ((control = this.m_visible[placeholder][type].pop()) !== undefined) {
						control.parentNode.removeChild(control);
					}
					while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
						control.parentNode.removeChild(control);
					}
				}
			}
		}
	}
};

primitives.common.Cache.prototype.get = function (placeholder, layer, type) {
	placeholder = placeholder + "-" + layer;
	var result = null;
	if (this.m_visible[placeholder] === undefined) {
		this.m_visible[placeholder] = {};
		this.m_invisible[placeholder] = {};
	}
	if (this.m_visible[placeholder][type] === undefined) {
		this.m_visible[placeholder][type] = [];
		this.m_invisible[placeholder][type] = [];
	}
	result = this.m_invisible[placeholder][type].pop() || null;
	if (result !== null) {
		this.m_visible[placeholder][type].push(result);
		result.style.visibility = "inherit";
	}
	return result;
};

primitives.common.Cache.prototype.put = function (placeholder, layer, type, control) {
	placeholder = placeholder + "-" + layer;
	this.m_visible[placeholder][type].push(control);
};

/* /graphics/CanvasGraphics.js*/
primitives.common.CanvasGraphics = function (element) {
	this.parent = primitives.common.Graphics.prototype;

	this.parent.constructor.apply(this, arguments);

	this.graphicsType = 1/*primitives.common.GraphicsType.Canvas*/;
	this.m_maximum = 8000; // Search for maximum size of canvas element
};

primitives.common.CanvasGraphics.prototype = new primitives.common.Graphics();

primitives.common.CanvasGraphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.canvascanvas !== null) {
						layer.canvascanvas.parentNode.removeChild(layer.canvascanvas);
						layer.canvascanvas = null;
					}
				}
			}
		}
	}
	this.parent.clean.apply(this, arguments);
};

primitives.common.CanvasGraphics.prototype._activatePlaceholder = function (placeholderName) {
	var placeholder,
		width,
		height;

	this.parent._activatePlaceholder.apply(this, arguments);

	placeholder = this.m_activePlaceholder;
	width = placeholder.size.width;
	height = placeholder.size.height;
	if (width > this.m_maximum || height > this.m_maximum) {
		placeholder.hasGraphics = false;
	}
	else {
		placeholder.hasGraphics = true;
	}
};

primitives.common.CanvasGraphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer;

	this.parent.resizePlaceholder.apply(this, arguments);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.canvascanvas !== null) {
				layer.canvascanvas.width = width;
				layer.canvascanvas.height = height;
			}
		}
	}
};

primitives.common.CanvasGraphics.prototype.begin = function () {
	var key,
		placeholder,
		layerKey,
		layer,
		width,
		height;
	this.parent.begin.apply(this);

	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			width = placeholder.size.width;
			height = placeholder.size.height;
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];

					if (layer.canvascanvas !== null) {
						layer.canvascontext.clearRect(0, 0, width, height);
					}
				}
			}
		}
	}
};

primitives.common.Graphics.prototype._getContext = function (placeholder, layer) {
	var width = placeholder.size.width,
		height = placeholder.size.height;

	if (layer.canvascanvas === null) {
		layer.canvascanvas = document.createElement('canvas');
		layer.canvascanvas.width = width;
		layer.canvascanvas.height = height;
		this.prepend(placeholder.activeLayer.canvas, layer.canvascanvas);
		layer.canvascontext = layer.canvascanvas.getContext('2d');
	}
	return layer.canvascontext;
};

primitives.common.CanvasGraphics.prototype.reset = function (arg0, arg1) {
	var placeholderName = "none",
		layerName = -1,
		placeholder,
		layer,
		width,
		height;
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				placeholderName = arg0;
			}
			else {
				layerName = arg0;
			}
			break;
		case 2:
			placeholderName = arg0;
			layerName = arg1;
			break;
	}

	this.parent.reset.apply(this, arguments);

	placeholder = this.m_placeholders[placeholderName];
	if (placeholder !== undefined) {
		width = placeholder.size.width;
		height = placeholder.size.height;
		layer = placeholder.layers[layerName];
		if (layer !== undefined && layer.canvascanvas !== null) {
			layer.canvascontext.clearRect(0, 0, width, height);
		}
	}
};

primitives.common.CanvasGraphics.prototype.polyline = function (polylineData) {
	var placeholder = this.m_activePlaceholder,
		layer,
		context,
		attr = polylineData.paletteItem.toAttr(),
		dashes,
		step,
		cornerRadius;
	if (!placeholder.hasGraphics) {
		this.parent.polyline.apply(this, arguments);
	}
	else {
		layer = placeholder.activeLayer;
		context = this._getContext(placeholder, layer);
		context.save();

		if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
			context.strokeStyle = attr.borderColor;
			context.lineWidth = attr.lineWidth;
		}
		else {
			context.lineWidth = 0;
			context.strokeStyle = "Transparent";
		}

		if (attr.lineType != null) {
			step = Math.round(attr.lineWidth) || 1;
			switch (attr.lineType) {
				case 0/*primitives.common.LineType.Solid*/:
					dashes = [];
					break;
				case 1/*primitives.common.LineType.Dotted*/:
					dashes = [step, step];
					break;
				case 2/*primitives.common.LineType.Dashed*/:
					dashes = [step * 5, step * 3];
					break;
			}

			if (context.setLineDash !== undefined) {
				context.setLineDash(dashes);
			} else if (context.webkitLineDash !== undefined) {
				context.webkitLineDash = dashes;
			} else if (context.mozDash !== undefined) {
				context.mozDash = dashes;
			}
		}

		context.beginPath();

		polylineData.loop(this, function (segment) {
			switch (segment.segmentType) {
				case 1/*primitives.common.SegmentType.Move*/:
					context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
					break;
				case 0/*primitives.common.SegmentType.Line*/:
					context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
					break;
				case 4/*primitives.common.SegmentType.Dot*/:
					if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
						// circle dot
						context.moveTo(Math.round(segment.x) + segment.width + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5);
						context.arc(Math.round(segment.x) + segment.width / 2.0 + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5, Math.round(segment.width / 2.0), 0, 2 * Math.PI, false);
					} else if (segment.cornerRadius === 0) {
						// square
						context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
						context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y) + 0.5);
						context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height) + 0.5);
						context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + segment.height) + 0.5);
						context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
					} else {
						// rounded corners rectangle
						cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));

						context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
						context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI, -Math.PI / 2.0, false);

						context.lineTo(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y) + 0.5);
						context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), -Math.PI / 2.0, 0, false);

						context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5);
						context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), 0, Math.PI / 2.0, false);

						context.lineTo(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height) + 0.5);
						context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI / 2.0, Math.PI, false);

						context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
					}
					break;
				case 2/*primitives.common.SegmentType.QuadraticArc*/:
					context.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
					break;
				case 3/*primitives.common.SegmentType.CubicArc*/:
					context.bezierCurveTo(Math.round(segment.cpX1) + 0.5,
						Math.round(segment.cpY1) + 0.5,
						Math.round(segment.cpX2) + 0.5,
						Math.round(segment.cpY2) + 0.5,
						Math.round(segment.x) + 0.5,
						Math.round(segment.y) + 0.5);
					break;
			}
		});
		if (attr.opacity != null) {
			context.globalAlpha = attr.opacity;
		}
		if (attr.lineWidth !== undefined) {
			context.stroke();
		}
		if (attr.fillColor !== undefined) {
			context.fillStyle = attr.fillColor;
			context.fill();
		}
		context.restore();
	}
};

/* /graphics/Element.js*/
primitives.common.Element = function (arg0, arg1) {
	this.ns = null;
	this.name = null;
	this.attr = {};
	this.style = {};

	this.children = [];

	switch (arguments.length) {
		case 1:
			this.name = arg0;
			break;
		case 2:
			this.ns = arg0;
			this.name = arg1;
			break;
		default:
			break;
	}
};

primitives.common.Element.prototype.setAttribute = function (key, value) {
	this.attr[key] = value;
};

primitives.common.Element.prototype.appendChild = function (child) {
	this.children[this.children.length] = child;
};

primitives.common.Element.prototype.create = function (ie8mode) {
	var result = null,
		name,
		child,
		index;
	if (this.ns !== null) {
		result = document.createElementNS(this.ns, this.name);
	}
	else {
		result = document.createElement(this.name);
	}
	for (name in this.attr) {
		if (this.attr.hasOwnProperty(name)) {
			if (ie8mode !== undefined) {
				result[name] = this.attr[name];
			}
			else {
				result.setAttribute(name, this.attr[name]);
			}
		}
	}
	for (name in this.style) {
		if (this.style.hasOwnProperty(name)) {
			result.style[name] = this.style[name];
		}
	}
	for (index = 0; index < this.children.length; index += 1) {
		child = this.children[index];
		if (typeof child === "string") {
			result.appendChild(document.createTextNode(child));
		}
		else {
			result.appendChild(child.create(ie8mode));
		}
	}
	return result;
};

primitives.common.Element.prototype.update = function (target, ie8mode) {
	var name,
		length,
		index,
		child,
		value;
	for (name in this.style) {
		if (this.style.hasOwnProperty(name)) {
			value = this.style[name];
			if (target.style[name] !== value) {
				target.style[name] = value;
			}
		}
	}
	for (name in this.attr) {
		if (this.attr.hasOwnProperty(name)) {
			value = this.attr[name];
			if (ie8mode !== undefined) {
				/* if you see exception here, it may be result of following situation: 
					You made changes in Polyline graphics primitive and added extra sub nodes to it, so number and type of children for shape 
					have been changed, so sub nodes mismatch is a reason for this exception.
				*/
				if (target[name] !== value) {
					target[name] = value;
				}
			}
			else {
				if (target.getAttribute(name) !== value) {
					target.setAttribute(name, value);
				}
			}
		}
	}
	length = this.children.length;
	for (index = 0; index < length; index += 1) {
		child = this.children[index];
		if (typeof child === "string") {
			if (target.innerHtml !== child) {
				target.innerHtml = child;
			}
		}
		else {
			this.children[index].update(target.children[index], ie8mode);
		}
	}
};

/* /graphics/Layer.js*/
primitives.common.Layer = function (name) {
	this.name = name;

	this.canvas = null;

	this.canvascanvas = null;
	this.svgcanvas = null;
};

/* /graphics/Placeholder.js*/
primitives.common.Placeholder = function (name) {
	this.name = name;

	this.layers = {};
	this.activeLayer = null;

	this.size = null;
	this.rect = null;

	this.div = null;

	this.hasGraphics = true;
};

/* /graphics/SvgGraphics.js*/
primitives.common.SvgGraphics = function (element) {
	this.parent = primitives.common.Graphics.prototype;

	this.parent.constructor.apply(this, arguments);

	this._svgxmlns = "http://www.w3.org/2000/svg";

	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	this.hasGraphics = true;
};

primitives.common.SvgGraphics.prototype = new primitives.common.Graphics();

primitives.common.SvgGraphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.svgcanvas !== null) {
						layer.svgcanvas.parentNode.removeChild(layer.svgcanvas);
						layer.svgcanvas = null;
					}
				}
			}
		}
	}
	this.parent.clean.apply(this, arguments);
};

primitives.common.SvgGraphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer,
		position;

	this.parent.resizePlaceholder.apply(this, arguments);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.svgcanvas !== null) {
				primitives.common.JsonML.applyStyles(layer.svgcanvas, {
					"position": "absolute",
					"width": width + "px",
					"height": height + "px"
				});
				layer.svgcanvas.viewBox = "0 0 " + width + " " + height;
			}
		}
	}
};

primitives.common.SvgGraphics.prototype._getCanvas = function () {
	var placeholder = this.m_activePlaceholder,
		layer = placeholder.activeLayer,
		panelSize = placeholder.rect;
	if (layer.svgcanvas === null) {
		layer.svgcanvas = document.createElementNS(this._svgxmlns, "svg");
		layer.svgcanvas.viewBox = panelSize.x + " " + panelSize.y + " " + panelSize.width + " " + panelSize.height;
		primitives.common.JsonML.applyStyles(layer.svgcanvas, {
			"width": panelSize.width + "px",
			"height": panelSize.height + "px"
		});

		this.prepend(placeholder.activeLayer.canvas, layer.svgcanvas);
	}

	return layer.svgcanvas;
};

primitives.common.SvgGraphics.prototype.polyline = function (polylineData) {
	var placeholder = this.m_activePlaceholder,
		polyline,
		data,
		attr = polylineData.paletteItem.toAttr(),
		element,
		svgcanvas,
		step,
		radius,
		cornerRadius;


	polyline = new primitives.common.Element(this._svgxmlns, "path");
	if (attr.fillColor !== undefined) {
		polyline.setAttribute("fill", attr.fillColor);
		polyline.setAttribute("fill-opacity", attr.opacity);
	}
	else {
		polyline.setAttribute("fill-opacity", 0);
	}

	if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
		polyline.setAttribute("stroke", attr.borderColor);
		polyline.setAttribute("stroke-width", attr.lineWidth);

		if (attr.opacity !== undefined) {
			polyline.setAttribute("stroke-opacity", attr.opacity);
		} else {
			polyline.setAttribute("stroke-opacity", 1);
		}
	} else {
		polyline.setAttribute("stroke", "transparent");
		polyline.setAttribute("stroke-width", 0);
	}

	if (attr.lineType != null) {
		step = Math.round(attr.lineWidth) || 1;
		switch (attr.lineType) {
			case 0/*primitives.common.LineType.Solid*/:
				polyline.setAttribute("stroke-dasharray", "");
				break;
			case 1/*primitives.common.LineType.Dotted*/:
				polyline.setAttribute("stroke-dasharray", step + "," + step);
				break;
			case 2/*primitives.common.LineType.Dashed*/:
				polyline.setAttribute("stroke-dasharray", (step * 5) + "," + (step * 3));
				break;
		}
	}

	data = "";
	polylineData.loop(this, function (segment) {
		switch (segment.segmentType) {
			case 1/*primitives.common.SegmentType.Move*/:
				data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
			case 0/*primitives.common.SegmentType.Line*/:
				data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
			case 2/*primitives.common.SegmentType.QuadraticArc*/:
				data += "Q" + (Math.round(segment.cpX) + 0.5) + " " + (Math.round(segment.cpY) + 0.5) + " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
			case 4/*primitives.common.SegmentType.Dot*/:
				// A rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y
				if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
					// dot
					radius = segment.width / 2.0;
					data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
					data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
					data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
				} else if (segment.cornerRadius === 0) {
					// square
					data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
					data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + 0.5);
					data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
					data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
					data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				} else {
					cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
					data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
					data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
					data += "L" + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
					data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
					data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
					data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
					data += "L" + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
					data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
					data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
				}
				break;
			case 3/*primitives.common.SegmentType.CubicArc*/:
				data += "C" + (Math.round(segment.cpX1) + 0.5) + " " + (Math.round(segment.cpY1) + 0.5) +
					" " + (Math.round(segment.cpX2) + 0.5) + " " + (Math.round(segment.cpY2) + 0.5) +
					" " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
		}
	});

	polyline.setAttribute("d", data);
	element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "path");
	if (element === null) {
		element = polyline.create();
		svgcanvas = this._getCanvas();
        svgcanvas.appendChild(element);
		this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "path", element);
	}
	else {
		polyline.update(element);
	}
};

/* /graphics/Transform.js*/
primitives.common.Transform = function () {
	this.invertArea = false;
	this.invertHorizontally = false;
	this.invertVertically = false;

	this.size = null;
};

primitives.common.Transform.prototype.setOrientation = function (orientationType) {
	switch (orientationType) {
		case 0/*primitives.common.OrientationType.Top*/:
			this.invertArea = false;
			this.invertHorizontally = false;
			this.invertVertically = false;
			break;
		case 1/*primitives.common.OrientationType.Bottom*/:
			this.invertArea = false;
			this.invertHorizontally = false;
			this.invertVertically = true;
			break;
		case 2/*primitives.common.OrientationType.Left*/:
			this.invertArea = true;
			this.invertHorizontally = false;
			this.invertVertically = false;
			break;
		case 3/*primitives.common.OrientationType.Right*/:
			this.invertArea = true;
			this.invertHorizontally = true;
			this.invertVertically = false;
			break;
	}
};

primitives.common.Transform.prototype.getOrientation = function (orientationType) {
	var result = orientationType;
	if (this.invertHorizontally) {
		switch (orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
				result = 3/*primitives.common.OrientationType.Right*/;
				break;
			case 3/*primitives.common.OrientationType.Right*/:
				result = 2/*primitives.common.OrientationType.Left*/;
				break;
		}
	}

	if (this.invertVertically) {
		switch (orientationType) {
			case 0/*primitives.common.OrientationType.Top*/:
				result = 1/*primitives.common.OrientationType.Bottom*/;
				break;
			case 1/*primitives.common.OrientationType.Bottom*/:
				result = 0/*primitives.common.OrientationType.Top*/;
				break;
		}
	}


	if (this.invertArea) {
		switch (result) {
			case 0/*primitives.common.OrientationType.Top*/:
				result = 2/*primitives.common.OrientationType.Left*/;
				break;
			case 1/*primitives.common.OrientationType.Bottom*/:
				result = 3/*primitives.common.OrientationType.Right*/;
				break;
			case 2/*primitives.common.OrientationType.Left*/:
				result = 0/*primitives.common.OrientationType.Top*/;
				break;
			case 3/*primitives.common.OrientationType.Right*/:
				result = 1/*primitives.common.OrientationType.Bottom*/;
				break;
		}
	}

	return result;
};

primitives.common.Transform.prototype.transformPoint = function (x, y, forward, self, func) {
	var value;

	if (forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
		}
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
	}
	if (this.invertVertically) {
		y = this.size.height - y;
	}

	if (!forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
		}
	}

	func.call(self, x, y);
};

primitives.common.Transform.prototype.transformPoints = function (x, y, x2, y2, forward, self, func) {
	var value;

	if (forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = x2;
			x2 = y2;
			y2 = value;
		}
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
		x2 = this.size.width - x2;
	}

	if (this.invertVertically) {
		y = this.size.height - y;
		y2 = this.size.height - y2;
	}

	if (!forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = x2;
			x2 = y2;
			y2 = value;
		}
	}

	func.call(self, x, y, x2, y2);
};

primitives.common.Transform.prototype.transform3Points = function (x, y, x2, y2, x3, y3, forward, self, func) {
	var value;

	if (forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = x2;
			x2 = y2;
			y2 = value;
			value = x3;
			x3 = y3;
			y3 = value;
		}
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
		x2 = this.size.width - x2;
		x3 = this.size.width - x3;
	}
	if (this.invertVertically) {
		y = this.size.height - y;
		y2 = this.size.height - y2;
		y3 = this.size.height - y3;
	}

	if (!forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = x2;
			x2 = y2;
			y2 = value;
			value = x3;
			x3 = y3;
			y3 = value;
		}
	}

	func.call(self, x, y, x2, y2, x3, y3);
};

primitives.common.Transform.prototype.transformRect = function (x, y, width, height, forward, self, func) {
	var value;

	if (forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = width;
			width = height;
			height = value;
		}
	}

	if (this.invertHorizontally) {
		x = this.size.width - x - width;
	}
	if (this.invertVertically) {
		y = this.size.height - y - height;
	}

	if (!forward) {
		if (this.invertArea) {
			value = x;
			x = y;
			y = value;
			value = width;
			width = height;
			height = value;
		}
	}

	func.call(self, x, y, width, height);
};


/* /OptionsReaders/ArrayReader.js*/
primitives.common.ArrayReader = function (itemTemplate, containsUniqueItems, uniquePropertyKey, createSourceHash, isOrdered) {
	this.itemTemplate = itemTemplate;
	this.containsUniqueItems = containsUniqueItems;
	this.uniquePropertyKey = uniquePropertyKey;
	this.containsPrimitiveValues = primitives.common.isNullOrEmpty(uniquePropertyKey);
	this.createSourceHash = createSourceHash;
	this.isOrdered = isOrdered;
};

primitives.common.ArrayReader.prototype.read = function (target, source, path, context) {
	var result = [], resultHash = {}, 
		hash, sequence, resultSequence = {},
		sourceHash = {},
		item, itemid,
		index, len,
		newHashObject,
		sequencePath = path + "-seq";

	/* validate source array */
	if (!source || !primitives.common.isArray(source)) {
		source = [];
	}

	/* hash values for tracking changes */
	hash = context.hash.hasOwnProperty(path) ? context.hash[path] : {};
	sequence = context.hash.hasOwnProperty(sequencePath) ? context.hash[sequencePath] : {};

	for (index = 0, len = source.length; index < len; index += 1) {
		item = source[index];

		itemid = this.containsUniqueItems ? (this.containsPrimitiveValues ? item : item[this.uniquePropertyKey]) : index;

		if (!resultHash.hasOwnProperty(itemid)) {
			newHashObject = this.itemTemplate.read(hash.hasOwnProperty(itemid) ? hash[itemid] : {}, item, path + "-" + index, context);

			result.push(newHashObject);
			resultHash[itemid] = newHashObject;
			resultSequence[index] = itemid;
			if (this.createSourceHash) {
				sourceHash[itemid] = item;
			}

			if (this.isOrdered) {
				if (sequence[index] != resultSequence[index]) {
					context.isChanged = true;
				}
			}
		}
	}

	context.hash[path] = resultHash;
	context.hash[sequencePath] = resultSequence;
	if (this.createSourceHash) {
		context.sourceHash[path] = sourceHash;
	}

	if (target == null || target.length != result.length) {
		context.isChanged = true;
	}

	return result;
};

/* /OptionsReaders/EnumerationReader.js*/
primitives.common.EnumerationReader = function (enumeration, isNullable, defaultValue) {
	this.enumeration = enumeration;
	this.isNullable = isNullable;
	this.defaultValue = defaultValue;

	this.hash = {};

	/* collect valid enumeration values */
	for (var key in enumeration) {
		this.hash[enumeration[key]] = key;
	}
};

primitives.common.EnumerationReader.prototype.read = function (target, source, path, context) {
	var result = null;

	if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(source)) {
		source = this.isNullable ? null : this.defaultValue;
	}

	result = source;

	if (target !== source) {
		context.isChanged = true;
	}

	return result;
};


/* /OptionsReaders/FunctionReader.js*/
primitives.common.FunctionReader = function () {

};

primitives.common.FunctionReader.prototype.read = function (target, source, path, context) {
	var result = null;

	result = (typeof source == "function") ? source : null;

	return result;
};


/* /OptionsReaders/ObjectReader.js*/
primitives.common.ObjectReader = function (dataTemplate, isNullable, defaultValue) {
	this.dataTemplate = dataTemplate;
	this.isNullable = isNullable;
	this.defaultValue = defaultValue;
};

primitives.common.ObjectReader.prototype.read = function (target, source, path, context) {
	var result = null,
		property,
		propertyDataTemplate;

	if(!source) {
		source = this.isNullable ? null : this.defaultValue;
	} 

	if(primitives.common.isObject(source)) {
		result = {};

		for (property in this.dataTemplate) {
			if (this.dataTemplate.hasOwnProperty(property)) {
				propertyDataTemplate = this.dataTemplate[property];

				result[property] = propertyDataTemplate.read(primitives.common.isObject(target) ? target[property] : null, source[property], path + "-" + property, context);
			}
		}
	} else {
		result = source;

		if (target !== source) {
			context.isChanged = true;
		}
	}
	return result;
};

/* /OptionsReaders/ValueReader.js*/
primitives.common.ValueReader = function (acceptedTypes, isNullable, defaultValue) {
	this.acceptedTypes = acceptedTypes;
	this.isNullable = isNullable;
	this.defaultValue = defaultValue;

	this.hash = {};

	/* collect valid enumeration values */
	for (var index = 0; index < acceptedTypes.length; index += 1) {
		var acceptedType = acceptedTypes[index];
		this.hash[acceptedType] = true;
	}
};

primitives.common.ValueReader.prototype.read = function (target, source, path, context) {
	var result = null;

	if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(typeof source)) {
		source = this.isNullable ? null : this.defaultValue;
	}

	result = source;

	if (JSON.stringify(target) !== JSON.stringify(source)) {
		context.isChanged = true;
	}

	return result;
};

/* /Controls/FamDiagram/events/EventArgs.js*/
/*
	Class: primitives.famdiagram.EventArgs
		Event details class.
*/
primitives.famdiagram.EventArgs = function () {
	/*
	Property: oldContext
		Reference to associated previous item in hierarchy.
	*/
	this.oldContext = null;

	/*
	Property: context
		Reference to associated new item in hierarchy.
	*/
	this.context = null;

	/*
	Property: parentItems
		Collection of immidiate parent items of item in context.
	*/
	this.parentItems = [];

	/*
	Property: childrenItems
		Collection of immidiate children items of item in context.
	*/
	this.childrenItems = [];

	/*
	Property: position
		Absolute item position on diagram.

	See also:
		<primitives.common.Rect>
	*/
	this.position = null;

	/*
	Property: name
		Relative object name.

	*/
	this.name = null;

	/*
	Property: cancel
		Allows cancelation of coupled event processing. This option allows to cancel layout update 
		and subsequent <primitives.famdiagram.Config.onCursorChanged> event 
		in handler of <primitives.famdiagram.Config.onCursorChanging> event.
	*/
	this.cancel = false;
};

/* /Controls/FamDiagram/configs/TemplateConfig.js*/
/*
	Class: primitives.famdiagram.TemplateConfig
		User defines item template class. It may optionaly define template for item, 
		custom cursor and highlight. If template is null then default template is used.

	See Also:
		<primitives.famdiagram.Config.templates>
*/
primitives.famdiagram.TemplateConfig = function () {
	/*
	Property: name
		Every template should have unique name. It is used as reference when 
		custom template is defined in <primitives.famdiagram.ItemConfig.templateName>.
	*/
	this.name = null;

	/*
	Property: isActive
		If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
	this.isActive = true;

	/*
	Property: itemSize
	This is item size of type <primitives.common.Size>, templates should have 
	fixed size, so famDiagram uses this value in order to layout items properly.
	*/
	this.itemSize = new primitives.common.Size(120, 100);

	/*
	Property: itemBorderWidth
		Item template border width.
	*/
	this.itemBorderWidth = 1;

	/*
	Property: itemTemplate
	Item template, if it is null then default item template is used. It supposed 
	to be div html element containing named elements inside for setting them 
	in <primitives.famdiagram.Config.onItemRender> event.
	*/
	this.itemTemplate = null;

	/*
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.famdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.famdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.famdiagram.ItemConfig.itemTitleColor>
			<primitives.famdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			null
	*/
	this.minimizedItemShapeType = null;

	/*
	Property: minimizedItemSize
	This is size dot used to display item in minimized form, type of <primitives.common.Size>.
	*/
	this.minimizedItemSize = new primitives.common.Size(4, 4);

	/*
	Property: minimizedItemCornerRadius
	Set corner radias for dots in order to display them as squares having rounded corners.
	By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares.
	*/
	this.minimizedItemCornerRadius = null;

	/*
	Property: minimizedItemLineWidth
		Minimized item shape border width.
	*/
	this.minimizedItemLineWidth = 1;

	/*
	Property: minimizedItemBorderColor
		Minimized item line color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemBorderColor = null;

	/*
	Property: minimizedItemLineType
		Minimized item shape border line type.
	*/
	this.minimizedItemLineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: minimizedItemFillColor
		Minimized item fill color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemFillColor = null;

	/*
	Property: minimizedItemOpacity
		Minimized item fill color opacity.
	*/
	this.minimizedItemOpacity = 1;

	/*
	Property: highlightPadding
	This padding around item defines relative size of highlight object, 
	ts type is <primitives.common.Thickness>.
	*/
	this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

	/*
	Property: highlightBorderWidth
		Highlight border width.
	*/
	this.highlightBorderWidth = 1;

	/*
	Property: highlightTemplate
	Highlight template, if it is null then default highlight template is used. 
	It supposed to be div html element containing named elements inside for 
	setting them in <primitives.famdiagram.Config.onHighlightRender> event.
	*/
	this.highlightTemplate = null;

	/*
	Property: cursorPadding
	This padding around item defines relative size of cursor object, 
	its type is <primitives.common.Thickness>.
	*/
	this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);

	/*
	Property: cursorBorderWidth
		Cursor border width.
	*/
	this.cursorBorderWidth = 2;

	/*
	Property: cursorTemplate
	Cursor template, if it is null then default cursor template is used. 
	It supposed to be div html element containing named elements inside 
	for setting them in <primitives.famdiagram.Config.onCursorRender> event.
	*/
	this.cursorTemplate = null;

	/*
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every template. 
	
	See also:
		<primitives.famdiagram.ButtonConfig>
	*/
	this.buttons = null;
};


/* /Controls/FamDiagram/configs/BackgroundAnnotationConfig.js*/
/*
	Class: primitives.famdiagram.BackgroundAnnotationConfig
		Consider background annotation as another way to highlight some items in diagram.
		In order to use it you have to create instances of this class and populate annotation collection.
		Background annotation is drawn as rectangular area offset around annotated item. 
		If two items backgrounds overlap each other they are merged into one background area.

	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.BackgroundAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Background>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 4/*primitives.common.AnnotationType.Background*/;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Auto>
	*/
	this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;


	/*
	Property: offset
		Sets background offset around annotated item.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(18, 18, 18, 18);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: opacity
		Background color opacity. For applicable shapes only.
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		null
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 

	Default:
		null
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/FamDiagram/configs/ButtonConfig.js*/
/*
	Class: primitives.famdiagram.ButtonConfig
		Options class. Custom user button options class. 
		Buttons displayed on the right side of items. 
		See jQuery UI Button options description for details.
		In order to receive button click event make binding 
		to <primitives.famdiagram.Config.onButtonClick>.
	
	See Also:
		<primitives.famdiagram.Config.buttons>
*/
primitives.famdiagram.ButtonConfig = function (name, icon, tooltip) {
	/*
	Property: name 
		It should be unique string name of the button. 
		It is needed to distinguish click events from different butons.
	*/
	this.name = name;

	/*
	Property: icon
	Name of icon used in jQuery UI.
	*/
	this.icon = icon;
	/*
	Property: text
	Whether to show any text -when set to false (display no text), 
	icon must be enabled, otherwise it'll be ignored.
	*/
	this.text = false;
	/*
	Property: label
	Text to show on the button.
	*/
	this.label = null;
	/*
	Property: tooltip
	Button tooltip content. Tooltip is based on jQuery UI tooltip widget, so it should be part of jQuery UI distribution in order to make this property work.
	*/
	this.tooltip = tooltip;
	/*
	Property: size
	Size of the button of type <primitives.common.Size>.
	*/
	this.size = new primitives.common.Size(16, 16);
};

/* /Controls/FamDiagram/configs/Config.js*/
/*
	Class: primitives.famdiagram.Config
		famDiagram options class. Multi-parent hierarchical chart configuration.
	
*/
primitives.famdiagram.Config = function (name) {
	this.name = (name !== undefined) ? name : "FamDiagram";
	this.classPrefix = "famdiagram";

	/*
		Property: navigationMode
			Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
			It has highlight for mouse over feedback and it has cursor for showing currently selected single node in diagram.
			In order to avoid creation of plus/minus buttons for children nodes folding and unfolding, 
			this functionality is done automatically for current cursor item. This is especially true for family diagram, 
			because it has no logical root, so cursor plays vital role for unfolding of nodes 
			and zooming into area of user interest in diagram.
			Use this option to disable highlight which does not make sense on touch devices or make control inactive completly.

		See Also:
			<primitives.common.NavigationMode>
		Default:
			<primitives.common.NavigationMode.Default>
	*/
	this.navigationMode = 0/*primitives.common.NavigationMode.Default*/;

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type 
			is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	/*
		Property: pageFitMode
			Defines the way diagram is fit into page. By default chart minimize items when it has not enough space to fit all of them into screen. 
			Chart has its maximum size when all items shown in full size and  its minimal size when all items shown as dots. 
			It is equivalent of full zoom out of the chart items, dot size items are not readable, but such presentation of them 
			gives possibility to overview chart layout. So chart tryes to combine both presenation modes and keep chart as small 
			as possible in order to give user possibility to see big picture. Collapsed items provide ideal way for analitical reiew of 
			diagram. If chart shown in its maximum size when all items are unfolded, it becomes impossible 
			to navigate betwen parents close to the root item. In such mode chart is usable only at bottom levels when children are close to their parents.
			If we try to navigate up to the root of hierarchy, gaps between parents sometimes as big as screen size. So in order to solve these 
			issues chart partially collapses hierarchy into dots and lines depending on this option.

		See also:
			<primitives.famdiagram.Config.minimalVisibility>

		Default:
			<primitives.common.PageFitMode.FitToPage>
	*/
	this.pageFitMode = 3/*primitives.common.PageFitMode.FitToPage*/;

	/*
		Property: minimalVisibility
			Defines minimal allowed item form size for page fit mode. See description for pageFitMode.
	
		See also:
			<primitives.famdiagram.Config.pageFitMode>

		Default:
			<primitives.common.Visibility.Dot>
	*/
	this.minimalVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
			Rotation to the right side is equivalent to left side placement 
			in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

	/*
	Property: verticalAlignment
		Defines items vertical alignment relative to each other within one level of hierarchy. 
		It does not affect levels having same size items.
	
	Default:
		<primitives.common.VerticalAlignmentType.Middle>
	*/
	this.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

	/*
		Property: arrowsDirection
			Sets direction of connector lines arrows.

		Default:
			<primitives.common.GroupByType.None>
	*/
	this.arrowsDirection = 0/*primitives.common.GroupByType.None*/;

	/*
	Property: showExtraArrows
		Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines.
		This options if off by default for organizational diagram.

	Default:
		false
	*/
	this.showExtraArrows = true;

	/*
	Property: extraArrowsMinimumSpace
		If diagram is small relations between objects are easy to trace, so mutual positions of parents and children are enough to navigate from parent to children and backward.
		If diagram is large and one row of children exceeds screen width then it use this option to activate horizontal arrows for large intervals between items.

	Default:
		30
	*/
	this.extraArrowsMinimumSpace = 30;

	/*
		Property: groupByType
			Defines the way item gravitates to parent or child layout having big vertical gap between levels.

		Default:
			<primitives.common.GroupByType.Children>
	*/
	this.groupByType = 2/*primitives.common.GroupByType.Children*/;

	/*
	Property: alignBylevels
		This option keeps items at the same levels after connections bundling.

	Default:
		true
	*/
	this.alignBylevels = true;

	/*
		Property: enableMatrixLayout
			This option enables automatic layout of nodes sharing the same set of parents and children in form of matrix.

		Default:
			false

		See Also:
			<primitives.famdiagram.Config.minimumMatrixSize>
			<primitives.famdiagram.Config.maximumColumnsInMatrix>
	*/
	this.enableMatrixLayout = false;

	/*
		Property: minimumMatrixSize
			Minimum number of nodes placed into matrix layout. In order to place nodes in form of matrix they should share the same set of parents and children.

		See Also:
			<primitives.famdiagram.Config.enableMatrixLayout>
			<primitives.famdiagram.Config.maximumColumnsInMatrix>

		Default:
			4
	*/
	this.minimumMatrixSize = 4;

	/*
		Property: maximumColumnsInMatrix
			Maximum number of columns for matrix layout. Matrix layout keeps square shape up to number of columns defined by this option.
			If number of columns reaches this value then matrix will grow by number of rows without adding new columns.
			In order to place nodes in form of matrix they should share the same set of parents and children.

		See Also:
			<primitives.famdiagram.Config.minimumMatrixSize>
			<primitives.famdiagram.Config.maximumColumnsInMatrix>
	*/
	this.maximumColumnsInMatrix = 6;

	/*
	Property: hideGrandParentsConnectors
		This option hides direct connectors to grand parents. It helps to reduce diagrams connectors layout complexity. 
		By default it is set to false, so control will always display all available connectors, 
		but the same connetors could be displayed dynamically via usage of connectors annotations highlighting passes between nodes and all its dependents.
		In order to give extra indication that node has direct connection to grand parent via its immidiate parent it may sense to use custom templates 
		for all nodes it is connected to.

	Default:
		false
	*/
	this.hideGrandParentsConnectors = false;

	/*
		Property: elbowType
			Style squared connectors with custom elbows.

		Default:
			<primitives.common.ElbowType.None>
	*/
	this.elbowType = 3/*primitives.common.ElbowType.Round*/;

	/*
		Property: bevelSize
			Size of connector bevel.

		Default:
			4
	*/
	this.bevelSize = 4;

	/*
		Property: elbowDotSize
			Size of elbow dot.
			
		Default:
			4
	*/
	this.elbowDotSize = 4;

	/*
	Property: emptyDiagramMessage
		Empty message in order to avoid blank screen. This option is supposed to say user that chart is empty when no data inside.
	*/
	this.emptyDiagramMessage = "Diagram is empty.";

	/*
	Property: items
		This is chart items collection. It is regular array of items of type ItemConfig. Items reference each other via parents collection property. 
		So every item may have multiple parents in chart. If parents collection is empty or set to null then item supposed to be root parent.
		If items loop each other they are ignored as well. It is applications responsiblity to avoid such issues.

	See Also:
		<primitives.famdiagram.ItemConfig>
		<primitives.famdiagram.ItemConfig.id>
		<primitives.famdiagram.ItemConfig.parents>
	*/
	this.items = [];

	/*
	Property: annotations
		Defines array of annotaions objects. Chart supports several types of annotations. They are drawn on top of chart and they may block view of some of them.
		So chart's layout mechanism does not account available annotations. Don't over use this feature. 
		The design assumes only few of them being displayed simultanuosly. This is especially true for connectors.

	See also:
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotations = [];

	/*
	Property: cursorItem
		Cursor item id - it is single item selection mode, user selects new cursor item on mouse click. 
		Cursor defines current local zoom placement or in other words current navigation item in the chart,
		all items relative to cursor always shoun in full size. So user can see all possible items around cursor in full size 
		and can continue navigation around chart. So when user navigates from one item to another clicking on thems and changing cursor item
		in chart, chart minimizes items going out of cursor scope and shows in full size items relative to new cursor position.
		If it is null then no cursor shown on diagram.

	See Also:
		<primitives.famdiagram.ItemConfig.id>
		<primitives.famdiagram.Config.onCursorChanging>
		<primitives.famdiagram.Config.onCursorChanged>
	*/
	this.cursorItem = null;

	/*
	Property: highlightItem
		Highlighted item id. Highlight is mouse over affect, but using this option applicatin can set highlight at any item 
		in the chart programmatically. It can be used for chart syncronization with other controls on UI having mouse over effect. 
		See primitives.famdiagram.Config.update method arguments description for fast chart update.
		If it is null then no highlight shown on diagram.

	See Also:
		<primitives.famdiagram.ItemConfig.id>
		<primitives.famdiagram.Config.onHighlightChanging>
		<primitives.famdiagram.Config.onHighlightChanged>
	*/
	this.highlightItem = null;

	/*
	Property: highlightGravityRadius
		The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
		When items is minimized its marker can be so small that it is going to be difficult for end user to place mouse pointer inside of it.
		This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.
		This property is ignored when nearest item is outside of screen boundaries and not visible to end user.
	*/
	this.highlightGravityRadius = 40;


	/*
	Property: selectedItems
		Defines array of selected item ids. Chart allows to select items via checking checkboxes under items. Checkboxes are 
		shown only for full size items. So when item is selected it is always shown in full size, so check box always visible for selcted items.
		User can navigate around large diagram and check intrested items in order to keep them opened. So that way chart provides 
		means to show several items on large diagram and fit everything into minimal space ideally into available screen space.
		Application can select items programmatically using this array or receive notifications from chart about user selections with following events.

	See Also:
		<primitives.famdiagram.ItemConfig.id>
		<primitives.famdiagram.Config.onSelectionChanging>
		<primitives.famdiagram.Config.onSelectionChanged>
	*/
	this.selectedItems = [];

	/*
	Property: hasSelectorCheckbox
		This option controls selection check boxes visibility. 

	Auto - Checkbox shown only for current cursor item only.
	True - Every full size item has selection check box.
	False - No check boxes. Application can still programmatically select some items in the chart. 
	Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
	it is auto used as default selection check box.

	Default:
		<primitives.common.Enabled.Auto>

	See Also:
		<primitives.famdiagram.ItemConfig.hasSelectorCheckbox>
		<primitives.famdiagram.Config.onSelectionChanging>
		<primitives.famdiagram.Config.onSelectionChanged>
	*/
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
		Property: selectCheckBoxLabel
			Select check box label.
	*/
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
		Defines the way items between root item and selectedItems displayed in diagram. Chart always shows all items between cursor item and its root in full size.
		But if cursor positioned on root item, then chart shows in full size only selected items in the chart. So this option controls items size between 
		selected items and root item of the chart. By default all items betwen root and selected items shown in full size.
		
	Default:
		<primitives.common.SelectionPathMode.None>
	*/
	this.selectionPathMode = 0/*primitives.common.SelectionPathMode.None*/;

	/*
	Property: neighboursSelectionMode
		Defines the display mode for items related to current cursor item in diagram. By default only parents and children are shown in regular size without minimization.

	Default:
		<primitives.common.NeighboursSelectionMode.ParentsAndChildren>
	*/
	this.neighboursSelectionMode = 0/*primitives.common.NeighboursSelectionMode.ParentsAndChildren*/;

	/*
	Property: templates
		Custom user templates collection. TemplateConfig is complex object providing options to customize item's content template, 
		cursor tempate and highlight template. Every template config should have unique name property, which is used by chart and its item configs 
		to reference them. Chart's defaultTemplateName allows to make template default for all items in the chart. On other hand user may define templates
		to individual items in the chart by templateName property of item config.

	See also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.defaultTemplateName>
		<primitives.famdiagram.ItemConfig.templateName>
	*/
	this.templates = [];

	/*
		Property: defaultTemplateName
			This is template name used to render items having no <primitives.famdiagram.ItemConfig.templateName> defined.


		See Also:
			<primitives.famdiagram.TemplateConfig>
			<primitives.famdiagram.TemplateConfig.name>
			<primitives.famdiagram.Config.templates>
	*/
	this.defaultTemplateName = null;

	/*
		Property: defaultLabelAnnotationTemplate
			This is name of template used to render label annotations having no <primitives.famdiagram.LabelAnnotationConfig.templateName> defined.
			Label annotations are labels placed inside diagram layout. They occupy space and digram gurantees no overlapping of them.

		See Also:
			<primitives.famdiagram.LabelAnnotationConfig>
			<primitives.famdiagram.TemplateConfig>
			<primitives.famdiagram.TemplateConfig.name>
			<primitives.famdiagram.Config.templates>
	*/
	this.defaultLabelAnnotationTemplate = null;

	/*
	Property: hasButtons
		This option controls user buttons visibility. 

	Auto - Buttons visible only for cursor item.
	True - Every normal item has buttons visible.
	False - No buttons.

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every item. 
		The only limitation, they are all the same. So if you need to have unique buttons for every item, then you have to 
		customize cursor templates and manually create custom buttons inside of them.
		
	See also:
		<primitives.famdiagram.ButtonConfig>
	*/
	this.buttons = [];

	/*
	Event: onHighlightChanging
		Notifies about changing highlight item <primitives.famdiagram.Config.highlightItem> in diagram.
		This coupled event with <primitives.famdiagram.Config.onHighlightChanged>, it is fired before highlight update.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onHighlightChanging = null;

	/*
	Event: onHighlightChanged
		Notifies about changed highlight item <primitives.famdiagram.Config.highlightItem> in diagram.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onHighlightChanged = null;

	/*
	Event: onCursorChanging
		Notifies about changing cursor item <primitives.famdiagram.Config.cursorItem> in diagram.
		This coupled event with <primitives.famdiagram.Config.onCursorChanged>, it is fired before layout update.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onCursorChanging = null;

	/*
	Event: onCursorChanged
		Notifies about changed cursor item <primitives.famdiagram.Config.cursorItem> in diagram .

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onCursorChanged = null;

	/*
	Event: onSelectionChanging
		Notifies about changing selected items collection of <primitives.famdiagram.Config.selectedItems>.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onSelectionChanging = null;

	/*
	Event: onSelectionChanged
		Notifies about changes in collection of <primitives.famdiagram.Config.selectedItems>.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onSelectionChanged = null;

	/*
	Event: onButtonClick
		Notifies about click of custom user button defined in colelction of <primitives.famdiagram.Config.buttons>.

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onButtonClick = null;

	/*
	Event: onMouseClick
		On mouse click event. 

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onMouseClick = null;

	/*
	Event: onMouseDblClick
		On mouse double click event. 

	See also:
		<primitives.famdiagram.EventArgs>
	*/
	this.onMouseDblClick = null;

	/*
	Event: onItemRender
		Item templates don't provide means to bind data of items into templates. So this event handler gives application such possibility.
		If application uses custom templates then this method is called to populate template with items properties.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates>
	*/
	this.onItemRender = null;

	/*
	Event: onHighlightRender
		If user defined custom highlight template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates>
	*/
	this.onHighlightRender = null;
	/*
	Event: onCursorRender
		If user defined custom cursor template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates>
	*/
	this.onCursorRender = null;
	/*
	Property: normalLevelShift
		Defines interval after level of items in  diagram having items in normal state.
	*/
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
		Defines interval after level of items in  diagram having all items in dot state.
	*/
	this.dotLevelShift = 20;
	/*
	Property: lineLevelShift
		Defines interval after level of items in  diagram having items in line state.
	*/
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
		Defines interval between items at the same level in  diagram having items in normal state.
	*/
	this.normalItemsInterval = 10;
	/*
	Property: dotItemsInterval
		Defines interval between items at the same level in  diagram having items in dot state.
	*/
	this.dotItemsInterval = 1;
	/*
	Property: lineItemsInterval
		Defines interval between items at the same level in  diagram having items in line state.
	*/
	this.lineItemsInterval = 2;

	/*
	Property: cousinsIntervalMultiplier
		Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
		So children belonging to different parents have extra gap between them.
		
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	Property: itemTitleFirstFontColor
	This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.famdiagram.Config.itemTitleSecondFontColor>.

	See Also:
		<primitives.famdiagram.ItemConfig.itemTitleColor>
		<primitives.famdiagram.Config.itemTitleSecondFontColor>
		<primitives.common.highestContrast>

	*/
	this.itemTitleFirstFontColor = "#ffffff"/*primitives.common.Colors.White*/;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
	*/
	this.itemTitleSecondFontColor = "#000080"/*primitives.common.Colors.Navy*/;

	/*
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.famdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.famdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.famdiagram.ItemConfig.itemTitleColor>
			<primitives.famdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			<primitives.common.ShapeType.None>
	*/
	this.minimizedItemShapeType = 6/*primitives.common.ShapeType.None*/;

	/*
	Property: linesColor
		Connectors lines color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.linesColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

	/*
	Property: linesWidth
		Connectors lines width.
	*/
	this.linesWidth = 1;

	/*
	Property: linesType
		Connectors line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.linesType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: showNeigboursConnectorsHighlighted
		Show connection lines between current cursor item and its neighbours highlighted. Neighbours selection mode is defined by neighboursSelectionMode option.
	See also:
		<primitives.famdiagram.Config.neighboursSelectionMode>,
		<primitives.famdiagram.Config.highlightLinesColor>,
		<primitives.famdiagram.Config.highlightLinesWidth>,
		<primitives.famdiagram.Config.highlightLinesType>
	Default:
		false
	*/
	this.showNeigboursConnectorsHighlighted = false;

	/*
	Property: highlightLinesColor
		Connectors highlight line color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.highlightLinesColor = "#ff0000"/*primitives.common.Colors.Red*/;

	/*
	Property: highlightLinesWidth
		Connectors highlight line width.
	*/
	this.highlightLinesWidth = 1;

	/*
	Property: highlightLinesType
		Connectors highlight line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.highlightLinesType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: linesPalette
		This collection contains elements of type PaletteItemConfig. It is used to draw connector lines between families in different styles. 
		It is similar concept to regular line chart having lines intersections. 
		If this collection is empty then default linesColor, linesWidth and linesType are used for all connector lines.
	
	See Also:
		<primitives.famdiagram.PaletteItemConfig>
	*/
	this.linesPalette = [];

	/*
	Property: calloutMaximumVisibility
		Defines maximum allowed item form size to show callout.

	See also:
		<primitives.orgdiagram.Config.showCallout>

	Default:
		<primitives.common.Visibility.Dot>
	*/
	this.calloutMaximumVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
	Property: showCallout
		This option controls callout visibility for dotted items. 

	Default:
		true
	*/
	this.showCallout = true;

	/*
	Property: calloutPlacementOffset
		Set this property value depending on size and intervals between markers so callout annotation does not overlap neighbouring items of marker it is shown for.
	*/
	this.calloutPlacementOffset = 100;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.famdiagram.Config.templates> collection property.

	Default:
		null
	*/
	this.defaultCalloutTemplateName = null;

	/*
	Property: calloutfillColor
		Annotation callout fill color.
	*/
	this.calloutfillColor = "#000000";

	/*
	Property: calloutBorderColor
		Annotation callout border color.
	*/
	this.calloutBorderColor = null;

	/*
	Property: calloutOffset
		Annotation callout offset.
	*/
	this.calloutOffset = 4;

	/*
	Property: calloutCornerRadius
		Annotation callout corner radius.
	*/
	this.calloutCornerRadius = 4;

	/*
	Property: calloutPointerWidth
		Annotation callout pointer base width.
	*/
	this.calloutPointerWidth = "10%";

	/*
	Property: calloutLineWidth
		Annotation callout border line width.
	*/
	this.calloutLineWidth = 1;

	/*
	Property: calloutOpacity
		Annotation callout opacity.
	*/
	this.calloutOpacity = 0.2;

	/*
	Property: buttonsPanelSize
		User buttons panel size.
	*/
	this.buttonsPanelSize = 28;

	/*
	Property: groupTitlePanelSize
		Group title panel size.
	*/
	this.groupTitlePanelSize = 24;

	/*
	Property: checkBoxPanelSize
		Selection check box panel size.
	*/
	this.checkBoxPanelSize = 24;

	/*
	Property: groupTitlePlacementType
		Group title placement style. Defines group title and buttons panel position relative to item. By default group title is on the left and buttons are on the right.
		If the value is set to <primitives.common.AdviserPlacementType.Left> then group title placed on the right and buttons on the left side of items.

	Default:
		<primitives.common.AdviserPlacementType.Left>
	*/
	this.groupTitlePlacementType = 2/*primitives.common.AdviserPlacementType.Left*/;

	/*
		Property: groupTitleOrientation
			Group title direction style. 

		Default:
			<primitives.text.TextDirection.Auto>
	*/
	this.groupTitleOrientation = 2/*primitives.text.TextOrientationType.RotateRight*/;

	/*
		Property: groupTitleVerticalAlignment
			Group title vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.groupTitleVerticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

	/*
		Property: groupTitleHorizontalAlignment
			Group title horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.groupTitleHorizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;

	/*
		Property: groupTitleFontSize
			Group title font size. 

		Default:
			15
	*/
	this.groupTitleFontSize = "12px";

	/*
		Property: groupTitleFontFamily
			Group title font family. 

		Default:
			"Arial"
	*/
	this.groupTitleFontFamily = "Arial";

	/*
		Property: groupTitleColor
			Group title color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
		Property: groupTitleFontWeight
			Group title font weight: normal | bold

		Default:
			"normal"
	*/
	this.groupTitleFontWeight = "normal";

	/*
		Property: groupTitleFontStyle
			Group title font style: normal | italic
		
		Default:
			"normal"
	*/
	this.groupTitleFontStyle = "normal";

	this.distance = 3;

	/*
	Property: scale
		CSS3 scale transform.
	*/
	this.scale = 1;

	/*
	Property: minimumScale
		Minimum CSS3 scale transform. Available on mobile safary only.
	*/
	this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform. Available on mobile safary only.
	*/
	this.maximumScale = 1;

	/*
	Property: showLabels
		This option controls labels visibility for minimized items. If you need to show labels outside of borders of regular items then use item template for customization.
		Labels placed inside HTML DIV element and long strings are wrapped inside. 
		User can control labels position relative to its item. Chart does not measure labels and does reserve space for them, 
		so if label overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.
	
	Auto - depends on available space.
	True - always shown.
	False - hidden.

	See Also:
		<primitives.famdiagram.ItemConfig.label>
		<primitives.famdiagram.Config.labelSize>
		<primitives.famdiagram.Config.normalItemsInterval>
		<primitives.famdiagram.Config.dotItemsInterval>
		<primitives.famdiagram.Config.lineItemsInterval>
		<primitives.famdiagram.Config.normalLevelShift>
		<primitives.famdiagram.Config.dotLevelShift>
		<primitives.famdiagram.Config.lineLevelShift>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabels = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(80, 24);
	*/
	this.labelSize = new primitives.common.Size(80, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

	See Also:
	<primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = 1/*primitives.common.PlacementType.Top*/;

	/*
	Property: labelFontSize
		Label font size. 

	Default:
		10px
*/
	this.labelFontSize = "10px";

	/*
		Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
	*/
	this.labelFontFamily = "Arial";

	/*
		Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
	*/
	this.labelColor = "#000000"/*primitives.common.Colors.Black*/;

	/*
		Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.labelFontWeight = "normal";

	/*
	Property: labelFontStyle
		Font style: normal | italic
		
	Default:
		"normal"
	*/
	this.labelFontStyle = "normal";

	/*
	Property: enablePanning
		Enable chart panning with mouse drag & drop for desktop browsers.
		Disable it if you need to support items Drag & Drop.

	Default:
		true
	*/
	this.enablePanning = true;

	/*
	Property: autoSizeMinimum
		Defines minimum diagram size in autosize mode. If diagram has no elements, it is going to be of this size on the page.  
	Default:
		new <primitives.common.Size>(800, 600);
	*/
	this.autoSizeMinimum = new primitives.common.Size(800, 600);

	/*
	Property: autoSizeMaximum
		Defines maximum diagram size in autosize mode.
	Default:
		new <primitives.common.Size>(1024, 768);
	*/
	this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};

/* /Controls/FamDiagram/configs/ConnectorAnnotationConfig.js*/
/*
	Class: primitives.famdiagram.ConnectorAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw connector between two items.
	
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.ConnectorAnnotationConfig = function (arg0, arg1) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Connector>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 0/*primitives.common.AnnotationType.Connector*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

	/*
	Property: fromItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.fromItem = null;

	/*
	Property: toItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.toItem = null;

	/*
	Property: connectorShapeType
		Connector shape type. 

	Default:
		<primitives.common.ConnectorShapeType.OneWay>
	*/
	this.connectorShapeType = 0/*primitives.common.ConnectorShapeType.OneWay*/;

	/*
	Property: connectorPlacementType
		Defines connector annotation shape placement mode between two items. 
		It uses off beat placement mode as default in order to avoid overlapping
		of base hierarchy connecting lines.

	Default:
		<primitives.common.ConnectorPlacementType.Offbeat>
*/
	this.connectorPlacementType = 0/*primitives.common.ConnectorPlacementType.Offbeat*/;

	/*
	Property: labelPlacementType
		Label placement type along connection line(s). 

	Default:
		<primitives.common.ConnectorLabelPlacementType.Between>
	*/
	this.labelPlacementType = 1/*primitives.common.ConnectorLabelPlacementType.Between*/;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = "#000000"/*primitives.common.Colors.Black*/;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = true;

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

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

/* /Controls/FamDiagram/configs/HighlightPathAnnotationConfig.js*/
/*
	Class: primitives.famdiagram.HighlightPathAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw path between items.
		Path is drawn along base connection lines displaying relationships between item of the chart.
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.HighlightPathAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.HighlightPath>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
	*/
	this.annotationType = 2/*primitives.common.AnnotationType.HighlightPath*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other.
		Highlight path annotations can be placed under main connectors wire or over. 

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

	/*
	Property: items 
		Array of item ids in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = "#ff0000"/*primitives.common.Colors.Red*/;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;


	/*
	Property: opacity
		Connector's line opacity.
	*/
	this.opacity = 1;

	/*
	Property: showArrows
		This option controls arrows visibility along highlight path. 

	Default:
		true
	*/
	this.showArrows = true;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/FamDiagram/configs/ItemConfig.js*/
/*
	Class: primitives.famdiagram.ItemConfig
		Defines item in family chart hierarchy. 
		User is supposed to create hierarchy of this items and assign it to <primitives.famdiagram.Config.items> collection property.
		Widget contains some generic properties used in default item template, 
		but user can add as many custom properties to this class as needed. 
		Just be careful and avoid widget malfunction.

	See Also:
		<primitives.famdiagram.Config.items>
*/
primitives.famdiagram.ItemConfig = function (arg0, arg1, arg2, arg3, arg4) {
	var property;
	/*
	Property: id
	Unique item id.
	*/
	this.id = null;

	/*
	Property: parents
	Collection of parent id's. If parents collection is empty [] then item placed as a root item.
	*/
	this.parents = [];

	/*
	Property: spouses
	Collection of spouses id's. Items in this collection share common connector line whether they have common children or not.
	*/
	this.spouses = [];

	/*
	Property: title
	Default template title property.
	*/
	this.title = null;

	/*
	Property: description
	Default template description element.
	*/
	this.description = null;

	/*
	Property: image
	Url to image. This property is used in default template.
	*/
	this.image = null;

	/*
	Property: context
	User context object.
	*/
	this.context = null;

	/*
	Property: itemTitleColor
	Default template title background color. The same color is used to draw minimized/dotted item.
	*/
	this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
	Property: minimizedItemShapeType
		Defines minimized/dotted item shape type. By default it is set by ItemTemplate.minimizedItemShapeType property.
		Use this property to set marker type individually per item.

	See Also:
		<primitives.common.ShapeType>
	*/
	this.minimizedItemShapeType = null;

	/*
	Property: groupTitle
	Auxiliary group title property. Displayed vertically on the side of item.
	*/
	this.groupTitle = null;

	/*
	Property: groupTitleColor
	Group title background color.
	*/
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
	Property: isActive
		If it is true then item is selectable in hierarchy and it has mouse over highlight. 

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
	this.isActive = true;

	/*
	Property: hasSelectorCheckbox
		If it is true then selection check box is shown for the item. 
		Selected items are always shown in normal form, so if item is 
		selected then its selection check box is visible and checked.

	Auto - Depends on <primitives.famdiagram.Config.hasSelectorCheckbox> setting.
	True - Selection check box is visible.
	False - No selection check box.

	Default:
	<primitives.common.Enabled.Auto>
	*/
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: hasButtons
		This option controls buttons panel visibility. 

	Auto - Depends on <primitives.famdiagram.Config.hasButtons> setting.
	True - Has buttons panel.
	False - No buttons panel.

	Default:
	<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates> collection property.
	*/
	this.templateName = null;

	/*
	Property: showCallout
		This option controls items callout visibility.

	Auto - depends on <primitives.famdiagram.Config.showCallout> option
	True - shown
	False - hidden

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showCallout = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: calloutTemplateName
		This is template name used to render callout for dotted item. 
		Actual callout template name is defined by following sequence:
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>

	See Also:
		<primitives.famdiagram.Config.templates> collection property.
	Default:
		null
	*/
	this.calloutTemplateName = null;

	/*
	Property: label
	Items label text.
	*/
	this.label = null;

	/*
	Property: showLabel
		This option controls items label visibility. Label is displayed in form of div having text inside, long string is wrapped inside of it. 
		User can control labels position relative to its item. Chart does not preserve space for label.

	Auto - depends on <primitives.famdiagram.Config.labelOrientation> setting.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.famdiagram.ItemConfig.label>
	<primitives.famdiagram.Config.labelSize>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabel = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width. 
		By default it is equal to charts <primitives.famdiagram.Config.labelSize>.

	See Also:
		<primitives.common.Size>
	Default:
		null;
	*/
	this.labelSize = null;

	/*
	Property: labelOrientation
		Defines label orientation. 
		In default <primitives.text.TextOrientationType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelOrientation> setting.

	See Also:
	<primitives.famdiagram.Config.labelOrientation>
	<primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Auto>
	*/
	this.labelOrientation = 3/*primitives.text.TextOrientationType.Auto*/;

	/*
	Property: labelPlacement
		Defines label placement relative to the item. 
		In default <primitives.common.PlacementType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelPlacement> setting.

	See Also:
		<primitives.famdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
		case 5:
			this.id = arg0;
			this.parent = arg1;
			this.title = arg2;
			this.description = arg3;
			this.image = arg4;
			break;
	}
};


/* /Controls/FamDiagram/configs/LabelAnnotationConfig.js*/
/*
	Class: primitives.famdiagram.LabelAnnotationConfig
		Options class. Populate annotation collection with instances of this object to draw labels between items in diagram layout.
		This label annotation is created over connection line going from item to its children or parents.
		It is required that label annotation references subset of item's parents or children.
		If you need to create cross chart reference then use connector annotation.
	
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.LabelAnnotationConfig = function (arg0, arg1) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Label>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.ShapeAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 3/*primitives.common.AnnotationType.Label*/;

	/*
	Property: fromItem 
		This is the item you are creating annotation for.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.fromItem = null;

	/*
	Property: toItems 
		This collection should contain only child or parent items of annotated item.
		You cannot add child and parent items at the same time.
		It may contain sub set of child or parent items. In that case existing annotation labels are drawn as a cascade.
		
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.toItems = [];

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.title = null;

	/*
	Property: itemTitleColor
	Default template title background color.
	*/
	this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
	Property: templateName
		This is template name used to render this label.

		See Also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates>
		<primitives.famdiagram.Config.onItemRender>
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

/* /Controls/FamDiagram/configs/PaletteItemConfig.js*/
/*
	Class: primitives.famdiagram.PaletteItemConfig
		This class is used to define cross family connectors styles. 
		Multi-parent charts are supposed to have multiple cross hierarchy connectors, so in order to trace them more easely on chart
		every connector may have separate style. It is the same strategy as for visualization of regular line charts.

	See Also:
		<primitives.famdiagram.Config.linesPalette>
*/
primitives.famdiagram.PaletteItemConfig = function (arg0, arg1, arg2) {
	var property;

	/*
	Property: lineColor
		Line color.

	Default:
		<primitives.common.Colors.Silver>
	*/
	this.lineColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

	/*
	Property: lineWidth
		Line width.
	Default:
		1
	*/
	this.lineWidth = 1;

	/*
	Property: lineType
		Line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
		case 3:
			this.lineColor = arg0;
			this.lineWidth = arg1;
			this.lineType = arg2;
			break;
	}
};


/* /Controls/FamDiagram/configs/ShapeAnnotationConfig.js*/
/*
	Class: primitives.famdiagram.ShapeAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw shape benith or on top of several items.
		Shape is drawn as rectangular area.
	See Also:
		<primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.ShapeAnnotationConfig = function (arg0) {
	var property;
	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Shape>

	See Also:
		<primitives.famdiagram.Config.annotations>
		<primitives.famdiagram.ConnectorAnnotationConfig>
		<primitives.famdiagram.LabelAnnotationConfig>
		<primitives.famdiagram.BackgroundAnnotationConfig>
		<primitives.famdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 1/*primitives.common.AnnotationType.Shape*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Auto>
	*/
	this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.famdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: shapeType
		Shape type. 

	Default:
		<primitives.common.ShapeType.Rectangle>
	*/
	this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. For applicable shapes only.
	*/
	this.cornerRadius = "10%";

	/*
	Property: opacity
		Background color opacity. For applicable shapes only.
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		null
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 

	Default:
		null
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.famdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	/*
	Property: labelPlacement
		Defines label placement relative to the shape. 

	See Also:
		<primitives.famdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	/*
	Property: labelOffset
		Defines label offset from shape in pixels.

	Default:
		4;
	*/
	this.labelOffset = 4;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/FamDiagram/models/EdgeItem.js*/
primitives.famdiagram.EdgeItem = function (key0, val0, key1, val1) {
	this.values = [val0, val1];
	this[key0] = 0;
	this[key1] = 1;
};

primitives.famdiagram.EdgeItem.prototype.getNear = function (key) {
	return this.values[this[key]];
};

primitives.famdiagram.EdgeItem.prototype.getFar = function (key) {
	return this.values[Math.abs(this[key] - 1)];
};

primitives.famdiagram.EdgeItem.prototype.setNear = function (key, value) {
	this.values[this[key]] = value;
};

primitives.famdiagram.EdgeItem.prototype.setFar = function (key, value) {
	this.values[Math.abs(this[key] - 1)] = value;
};

primitives.famdiagram.EdgeItem.prototype.toString = function () {
	return this.parent + ',' + this.child;
};

/* /Controls/FamDiagram/models/FamilyItem.js*/
primitives.famdiagram.FamilyItem = function (arg0) {
	var property;

	this.id = null;
	this.familyId = null;
	this.itemConfig = null;

	this.isVisible = true;
	this.isActive = true; // item is clickable
	this.isLevelNeutral = false; // This option allows to place fake item in between of original item levels

	this.level = null;
	this.levelGravity = 0/*primitives.common.GroupByType.None*/; // If item can be moved between its parent and children levels in diagram, this option defines preference
	this.hideParentConnection = false;
	this.hideChildrenConnection = false;

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
	}
};

/* /Controls/FamDiagram/models/Slot.js*/
primitives.famdiagram.Slot = function (itemid) {
	this.id = null;
	this.prev = null; /* prev slot id */
	this.next = null; /* next slot id */

	this.position = null;
	this.balance = 0;

	this.itemId = itemid; /* if itemId is null then this slot is empty */
	
	this.left = {}; /* total number of children at the level on the left side of this slot */
	this.right = {}; /* total number of children at the level on the right side of this slot */

	this.crossings = {}; /* number of connections crossing this slot from side to side at the level */
};

primitives.famdiagram.Slot.prototype.clone = function () {
	var result = new primitives.famdiagram.Slot(),
		level;

	result.itemId = this.itemId;

	for (level in this.left) {
		if (this.left.hasOwnProperty(level)) {
			result.left[level] = this.left[level];
		}
	}
	for (level in this.right) {
		if (this.right.hasOwnProperty(level)) {
			result.right[level] = this.right[level];
		}
	}
	for (level in this.crossings) {
		if (this.crossings.hasOwnProperty(level)) {
			result.crossings[level] = this.crossings[level];
		}
	}

	return result;
};

/* /Controls/FamDiagram/models/Slots.js*/
primitives.famdiagram.Slots = function () {
	this.first = null;
	this.last = null;

	this.slots = {};

	this.items = {};

	this.counter = 0;
};

primitives.famdiagram.Slots.prototype.add = function (slot) {
	slot.id = this.counter;
	this.counter += 1;

	this.slots[slot.id] = slot;
	if (slot.itemId != null) {
		this.items[slot.itemId] = slot;
	}

	if (this.last == null) {
		this.last = slot.id;
		this.first = slot.id;
	} else {
		this.slots[this.last].next = slot.id;
		slot.prev = this.last;

		this.last = slot.id;
	}
};

primitives.famdiagram.Slots.prototype.insertBefore = function (beforeSlot, slot) {
	slot.id = this.counter;
	this.counter+=1;
	this.slots[slot.id] = slot;
	if (slot.itemId != null) {
		this.items[slot.itemId] = slot;
	}

	if (beforeSlot.prev == null) {
		slot.next = beforeSlot.id;
		this.first = slot.id;
	} else {
		var prevSlot = this.slots[beforeSlot.prev];
		prevSlot.next = slot.id;
		slot.next = beforeSlot.id;
		beforeSlot.prev = slot.id;
		slot.prev = prevSlot.id;
	}
};

primitives.famdiagram.Slots.prototype.loop = function (callback, startSlot) {
	var slotid = startSlot != null ? startSlot.id : this.first,
		slot;

	while (slotid != null) {
		slot = this.slots[slotid];

		if (callback(slot)) {
			break;
		}

		slotid = slot.next;
	}
};

primitives.famdiagram.Slots.prototype.backwardLoop = function (callback, startSlot) {
	var slotid = startSlot != null ? startSlot.id : this.last,
		slot;

	while (slotid != null) {
		slot = this.slots[slotid];

		if (callback(slot)) {
			break;
		}

		slotid = slot.prev;
	}
};

primitives.famdiagram.Slots.prototype.getSlot = function (itemId) {
	return this.items[itemId];
};

/* /Controls/FamDiagram/Tasks/Options/Annotations/LabelAnnotationOptionTask.js*/
primitives.famdiagram.LabelAnnotationOptionTask = function (splitAnnotationsOptionTask, logicalFamilyTask, defaultLabelAnnotationConfig) {
	var _data = {
		annotations: [],
		configs: {},
		maximumId: null
	},
	_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultLabelAnnotationConfig.zOrderType),
				fromItem: new primitives.common.ValueReader(["string", "number"], true),
				toItems: new primitives.common.ArrayReader(
					new primitives.common.ValueReader(["string", "number"], true),
					true
				),
				title: new primitives.common.ValueReader(["string"], true),
				itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
				templateName: new primitives.common.ValueReader(["string"], true)
			},
			false
		),
		false,
		null,
		true
		);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash,
			sourceHash: {}
		},
		maximumId = logicalFamilyTask.getMaximumId(),
		index, len, annotation;

		_data.annotations = _dataTemplate.read(_data.annotations, splitAnnotationsOptionTask.getAnnotations(3/*primitives.common.AnnotationType.Label*/), "annotations", context);
		_data.configs = {};

		/* here we assign unique id to every annotation used in layout
			and populate configs hash mapping id to source annotation
			these source items used as context objects in rendering cycle
		*/
		var sourceItems = context.sourceHash.annotations;
		for (index = 0, len = _data.annotations.length; index < len; index += 1) {
			annotation = _data.annotations[index];
			maximumId += 1;
			annotation.id = maximumId;

			_data.configs[annotation.id] = sourceItems[index];
		}

		_data.maximumId = maximumId;

		return context.isChanged;
	}

	function getAnnotations() {
		return _data.annotations;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	function getConfig(itemId) {
		return _data.configs[itemId];
	}

	return {
		process: process,
		getAnnotations: getAnnotations,
		getMaximumId: getMaximumId,
		getConfig: getConfig
	};
};

/* /Controls/FamDiagram/Tasks/Options/Annotations/LabelAnnotationPlacementOptionTask.js*/
primitives.famdiagram.LabelAnnotationPlacementOptionTask = function (labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
	var _data = {
		annotations: []
	},
	_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				id: new primitives.common.ValueReader(["number"], true),
				fromItem: new primitives.common.ValueReader(["string", "number"], true),
				toItems: new primitives.common.ArrayReader(
					new primitives.common.ValueReader(["string", "number"], true),
					true
				)
			}),
			true,
			"id"
			);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data.annotations = _dataTemplate.read(_data.annotations, labelAnnotationOptionTask.getAnnotations(), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _data.annotations;
	}

	function getMaximumId() {
		return labelAnnotationOptionTask.getMaximumId();
	}

	return {
		process: process,
		getAnnotations: getAnnotations,
		getMaximumId: getMaximumId
	};
};

/* /Controls/FamDiagram/Tasks/Options/Annotations/LabelAnnotationTemplateOptionTask.js*/
primitives.famdiagram.LabelAnnotationTemplateOptionTask = function (labelAnnotationOptionTask, defaultLabelAnnotationConfig) {
	var _data = {
		annotations: []
	},
	_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				id: new primitives.common.ValueReader(["number"], true),
				title: new primitives.common.ValueReader(["string"], true),
				itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultLabelAnnotationConfig.itemTitleColor),
				templateName: new primitives.common.ValueReader(["string"], true)
			}),
			true,
			"id"
		);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data.annotations = _dataTemplate.read(_data.annotations, labelAnnotationOptionTask.getAnnotations(), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _data.annotations;
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/FamDiagram/Tasks/Options/Selection/NeighboursSelectionModeOptionTask.js*/
primitives.famdiagram.NeighboursSelectionModeOptionTask = function (optionsTask, defaultConfig) {
	var _data = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			neighboursSelectionMode: new primitives.common.EnumerationReader(primitives.common.NeighboursSelectionMode, false, defaultConfig.neighboursSelectionMode)
		});

	function process() {
		var context = {
			isChanged: false
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getNeighboursSelectionMode() {
		return _data.neighboursSelectionMode;
	}

	return {
		process: process,
		getNeighboursSelectionMode: getNeighboursSelectionMode
	};
};

/* /Controls/FamDiagram/Tasks/Options/ItemsOptionTask.js*/
primitives.famdiagram.ItemsOptionTask = function (optionsTask, defaultItemConfig) {
	var _data = {},
		_hash = {},
		_sourceHash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					parents: new primitives.common.ArrayReader(
						new primitives.common.ValueReader(["string", "number"], true),
						true
					),
					isActive: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isActive)
				}),
				true,
				"id",
				true
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash,
			sourceHash: _sourceHash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItems() {
		return _data.items;
	}

	function getConfig(itemId) {
		return _sourceHash["options-items"][itemId];
	}

	return {
		process: process,
		getItems: getItems,
		getConfig: getConfig
	};
};

/* /Controls/FamDiagram/Tasks/Options/LinePaletteOptionTask.js*/
primitives.famdiagram.LinePaletteOptionTask = function (optionsTask, defaultPaletteItemConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		linesPalette: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					lineColor: new primitives.common.ValueReader(["string"], false, defaultPaletteItemConfig.lineColor),
					lineWidth: new primitives.common.ValueReader(["number"], false, defaultPaletteItemConfig.lineWidth),
					lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultPaletteItemConfig.lineType)
				}),
				false
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions
	};
};

/* /Controls/FamDiagram/Tasks/Options/NormalizeOptionTask.js*/
primitives.famdiagram.NormalizeOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		groupByType: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.groupByType),
		alignBylevels: new primitives.common.ValueReader(["boolean"], false, defaultConfig.alignBylevels),
		hideGrandParentsConnectors: new primitives.common.ValueReader(["boolean"], false, defaultConfig.hideGrandParentsConnectors),
		enableMatrixLayout: new primitives.common.ValueReader(["boolean"], false, defaultConfig.enableMatrixLayout),
		minimumMatrixSize: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumMatrixSize),
		maximumColumnsInMatrix: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions
	};
};

/* /Controls/FamDiagram/Tasks/Options/OptionsTask.js*/
/* eliminate invisible items */
primitives.famdiagram.OptionsTask = function (getOptions) {

	function process() {
		return true;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Raw options."
	};
};

/* /Controls/FamDiagram/Tasks/Options/SpousesOptionTask.js*/
primitives.famdiagram.SpousesOptionTask = function (optionsTask, defaultItemConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					spouses: new primitives.common.ArrayReader(
						new primitives.common.ValueReader(["string", "number"], true),
						true
					)
				}),
				true,
				"id"
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/FamDiagram/Tasks/Options/VisualTreeOptionTask.js*/
primitives.famdiagram.VisualTreeOptionTask = function (optionsTask) {
	var _data = {
		leavesPlacementType: 2/*primitives.common.ChildrenPlacementType.Horizontal*/,
		childrenPlacementType: 2/*primitives.common.ChildrenPlacementType.Horizontal*/,
		maximumColumnsInMatrix: 6,
		horizontalAlignment: 0/*primitives.common.HorizontalAlignmentType.Center*/
	};

	function process() {
		return false;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions
	};
};

/* /Controls/FamDiagram/Tasks/Templates/CombinedTemplateParamsTask.js*/
primitives.famdiagram.CombinedTemplateParamsTask = function (itemTemplateParamsTask, labelAnnotationTemplateParamsTask) {
	function process() {
		return true;
	}

	function getTemplateParams(itemId) {
		return itemTemplateParamsTask.getTemplateParams(itemId) || labelAnnotationTemplateParamsTask.getTemplateParams(itemId);
	}

	return {
		process: process,
		getTemplateParams: getTemplateParams
	};
};

/* /Controls/FamDiagram/Tasks/Templates/LabelAnnotationTemplateParamsTask.js*/
primitives.famdiagram.LabelAnnotationTemplateParamsTask = function (itemsSizesOptionTask, labelAnnotationTemplateOptionTask, readTemplatesTask) {
	var _data = {
		items: {} // TemplateParams
	};

	function process() {
		var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
			items = labelAnnotationTemplateOptionTask.getAnnotations(),
			index, len;

		_data.items = {};

		for (index = 0, len = items.length; index < len; index += 1) {
			var annotation = items[index],
				templateParams = new primitives.orgdiagram.TemplateParams(),
				template = readTemplatesTask.getTemplate(annotation.templateName, itemsSizesOptions.defaultLabelAnnotationTemplate, readTemplatesTask.DefaultWidgetLabelAnnotationTemplateName);

			templateParams.template = template;

			_data.items[annotation.id] = templateParams;
		}

		return true;
	}

	function getTemplateParams(itemId) {
		return _data.items[itemId];
	}

	return {
		process: process,
		getTemplateParams: getTemplateParams
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/BaseTransformer.js*/
primitives.famdiagram.BaseTransformer = function (debug) {
	this.debug = debug;
};

primitives.famdiagram.BaseTransformer.prototype.validate = function (logicalFamily, strongValidate) {
	/* test consistency of references in family tree */
	if (!logicalFamily.validate()) {
		throw "Family structure failed to pass validation!";
	}

	logicalFamily.loop(this, function (famItemId, famItem) {

		logicalFamily.loopChildren(this, famItemId, function (childid, child, level) {
			if (child.level === null || famItem.level === null || (strongValidate ? child.level != famItem.level + 1 : child.level <= famItem.level)) {
				throw "Family tree is broken. Children/Parents or levels mismatch!";
			}
			return logicalFamily.SKIP;
		});
	});
};


/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/FamilyBalance.js*/
/*  This class transforms normalized logical family into levels of nodes.
	The current approach to optimize items placement is to transform family into hierarchy of nodes and order 
	children of every node in the way minimizing number of intersections between connection lines.
	1. Extract families into _families array of type FamilyItem. Family is sub tree of items logicalFamily. 
		In order to extract families out of logicalFamily we count from bottom to roots total number of descendants for eevry item and then extract 
		sub hierarchy having minimum number of members. This process is repeated till all nodes are extracted into separate families.
			orgPartners - When we extract families we store links to parents in other branches having the same children of 
			some already extracted item as partner in orgPartners hash
		This hash table is used to create links collections between families
		The orgTree collection is used to define final org hierarchy used to balance nodes in levels.
	2. Use links in families to build family graph
	3. Find maximum spanning tree of family graph
	4. Since spanning tree is the tree we calculate number of descendants in every branch. So when we join families into one 
		org chart we sort them taking first child family having maximum number of links to its parent family
		sortedFamilies collection
	5. Using sortedFamilies collection we merge roots of families back to primary org chart. The rule of that backword merging is 
		to find ancestor in target tree having level less then root item of merged family.
		this is done without extra collection creation via making changes in orgTree
		If family has no links it is added to root of orgTree
	6. Balance organizational chart in order to place items having extra connections close to each other. 
		Assign every extra link to every pair of parent nodes up to the root.
	7. Scan orgTree hierarchy from root to bottom and balance children using extra links collected from children
		So at the top most level we know number of links between children, so we sort them, then number of overlappings between branches should be minimal
		Balancing algorithms finds maximum spanning tree in connections between children and groups them from bottom of that tree up to the root
		In the way when groups having maximum mutual links placed close to each other.
*/
primitives.famdiagram.FamilyBalance = function () {
	this.properties = [
		'title', 'description', 'image',
		'itemTitleColor', 'groupTitle', 'groupTitleColor',
		'isActive', 'hasSelectorCheckbox', 'hasButtons',
		'templateName', 'showCallout', 'calloutTemplateName',
		'label', 'showLabel', 'labelSize', 'labelOrientation', 'labelPlacement',
		'minimizedItemShapeType'
	];
};

//var params = {
//	logicalFamily,
//	maximumId,
//	defaultItemConfig
//};
primitives.famdiagram.FamilyBalance.prototype.balance = function (params) {
	var result = {
		maximumId: null,
		treeLevels: primitives.common.TreeLevels(),
		bundles: [],
		connectorStacks: []
	};

	var data = {
		orgTree: primitives.common.tree(), /*tree primitives.orgdiagram.OrgItem */
		maximumId: params.maximumId,
		orgPartners: {}, /* Creates extra partners collection of relations between visual tree items They are used to draw connectors between items in different branches of organizational chart*/
		itemByChildrenKey: {},
		minimumLevel: null,
		maximumLevel: null
	};

	this.createOrgTree(params, data);

	data.orgTree.loopLevels(this, function (treeItemId, treeItem, levelIndex) {
		result.treeLevels.addItem(levelIndex, treeItemId, treeItem);
	});

	this.recalcLevelsDepth(result.bundles, result.connectorStacks, result.treeLevels, data.orgTree, data.orgPartners);

	result.maximumId = data.maximumId;

	return result;
};

primitives.famdiagram.FamilyBalance.prototype.Family = function (id) {
	this.id = null;
	this.familyPriority = 1;
	this.childFamilies = [];
	this.items = [];

	this.links = []; /* array of FamLink(s) */
	this.backLinks = []; /* array of FamLink(s) */

	if (arguments.length == 1) {
		this.id = id;
	}
};

primitives.famdiagram.FamilyBalance.prototype.FamLink = function (fromItem, toItem) {
	this.fromItem = fromItem; /* FamilyItem.id */
	this.toItem = toItem; /* FamilyItem.id */
};

primitives.famdiagram.FamilyBalance.prototype.createOrgTree = function (params, data) {
	var index, len, index2, len2,
		famItem,
		familiesGraph, /* primitives.common.graph */
		link, links,
		fromFamily,
		toFamily,
		sortedFamilies = [], sortedFamiliesHash,
		attachedFamilies,
		userItem,
		familyId,
		family,
		familyRootItem,
		fromItem,
		toItem,
		rootItem, rootItems, bestRootItem, bestReference,
		spanningTree,
		extraGravities, grandChildren,
		parsedId,
		itemsHavingSpouses, spouses,
		orgItemRoot,
		famItemsExtracted,
		families = [],
		families2;

	if (params.logicalFamily.hasNodes() > 0) {
		/* create hash of extracted family items */
		famItemsExtracted = {};

		familyId = 0;
		families2 = [];
		params.logicalFamily.loopRoots(this, function (grandParentId, grandParent) {
			//ignore jslint
			family = new this.Family(familyId);
			/* extractOrgChart method extracts hiearchy of family members starting from grandParent and takes only non extracted family items 
			 * For every extracted item it assigns its familyId, it is used for building families relations graph and finding cross family links
			*/
			this.extractOrgChart(grandParentId, params.logicalFamily, params.defaultItemConfig, data.orgTree, data.orgPartners, data.itemByChildrenKey, famItemsExtracted, family);
			families.push(family);
			families2.push(family);
			familyId += 1;
		});

		families2.sort(function (a, b) {
			/* sort families by root item level ASC and size DESC */
			var aLevel = a.items[0].level,
				bLevel = b.items[0].level;

			return aLevel != bLevel ? (aLevel - bLevel) : (b.items.length - a.items.length);
		});

		sortedFamilies = [];
		sortedFamiliesHash = {};
		if (families.length > 0) {

			/* Build families graph */
			familiesGraph = primitives.common.graph();
			for (index = 0, len = families.length; index < len; index += 1) {
				family = families[index];

				for (index2 = 0, len2 = family.links.length; index2 < len2; index2 += 1) {
					link = family.links[index2];

					fromFamily = params.logicalFamily.node(link.fromItem).familyId;
					toFamily = params.logicalFamily.node(link.toItem).familyId;

					if (fromFamily != toFamily) {
						familiesGraph.addEdge(fromFamily, toFamily, { weight: 0 });
						familiesGraph.edge(fromFamily, toFamily).weight += 1;
					}

					families[toFamily].backLinks.push(new this.FamLink(link.toItem, link.fromItem));
				}
			}

			/* Flatten families graph into array for merging */
			while (sortedFamilies.length < families.length) {
				for (index = 0, len = families2.length; index < len; index += 1) {
					family = families2[index];

					if (!sortedFamiliesHash.hasOwnProperty(family.id)) {

						/* find maximum spanning tree of families graph*/
						spanningTree = familiesGraph.getSpanningTree(family.id, function (edge) {
							return -edge.weight;
						}); //ignore jslint

						if (spanningTree.node(family.id) != null) {

							/* count number of sub families for every family in spanning tree and sorts child families desc*/
							spanningTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
								var family = families[nodeid],
									parentFamily = families[parentid],
									children = [];

								if (parentid != null) {
									parentFamily.familyPriority = parentFamily.familyPriority + family.familyPriority;
								}

								children = [];
								spanningTree.loopChildren(this, nodeid, function (childid, child, index) {
									children.push(childid);
								});

								children.sort(function (a, b) { return families[a].familyPriority - families[b].familyPriority; });
								spanningTree.arrangeChildren(nodeid, children);
							}); //ignore jslint

							/* merge tree items in pre order sequence */
							spanningTree.loopPreOrder(this, function (familyid, node) {
								sortedFamilies.push(familyid);
								sortedFamiliesHash[familyid] = true;
							}); //ignore jslint

						} else {
							/* family has no links to any other family so we add it as orphant */
							sortedFamilies.push(family.id);
							sortedFamiliesHash[family.id] = true;
						}
					}
				}
			}
		}

		/* create chart root */
		data.maximumId += 1;
		orgItemRoot = this.createOrgItem(data.orgTree, params.defaultItemConfig, data.maximumId, null /*parent id*/, null, data.minimumLevel - 1, null /* userItem */);
		orgItemRoot.hideParentConnection = true;
		orgItemRoot.hideChildrenConnection = true;
		orgItemRoot.title = "internal root";
		orgItemRoot.isVisible = false;
		orgItemRoot.isActive = false;
		orgItemRoot.childIndex = 0;


		/* Place family roots to organizational chart */
		attachedFamilies = {};
		for (index = 0, len = sortedFamilies.length; index < len; index += 1) {
			family = families[sortedFamilies[index]];

			rootItems = {}; // Hash where key = rootItem.id and value is number of references
			bestRootItem = orgItemRoot;
			bestReference = 0;
			links = family.links.concat(family.backLinks);
			for (index2 = 0; index2 < links.length; index2 += 1) {
				link = links[index2];

				toItem = data.orgTree.node(link.toItem);
				fromItem = data.orgTree.node(link.fromItem);

				if (attachedFamilies[toItem.familyId] === true) {
					familyRootItem = family.items[0];
					rootItem = toItem;

					if (rootItem.level >= familyRootItem.level) {
						data.orgTree.loopParents(this, rootItem.id, function (nodeid, node) {
							rootItem = node;
							if (node.level < familyRootItem.level) {
								return true;
							}
						});//ignore jslint
					}

					if (rootItems.hasOwnProperty(rootItem.id)) {
						rootItems[rootItem.id] += 1;
					} else {
						rootItems[rootItem.id] = 1;
					}
					/* family may be nested to multiple places, so we select root item having maximum connections with our new sub family */
					if (bestReference < rootItems[rootItem.id]) {
						bestRootItem = rootItem;
						bestReference = rootItems[rootItem.id];
					}
				}


			}

			this.attachFamilyToOrgChart(data, params.defaultItemConfig, bestRootItem, family);

			attachedFamilies[family.id] = true;
		}

		/* balance organizational chart in order to place items having extra connections close to each other */
		extraGravities = this.getExtraGravity(data);

		/* count number of vertical connections for every item */
		grandChildren = this.getGrandChildren(data);

		/* scan orgTree hierarchy from root to bottom and balance its children */
		this.balanceOrgTree(data.orgTree, extraGravities, grandChildren);
	}
};

primitives.famdiagram.FamilyBalance.prototype.getGrandChildren = function (data) {
	var result = {};  /* Key = primitives.orgdiagram.OrgItem.id, Value= Hash {} having Key = level and Value = number of grand children*/

	data.orgTree.loopPostOrder(this, function (itemId, orgItem, parentId, parent) {
		var level;

		data.minimumLevel = data.minimumLevel != null ? Math.min(data.minimumLevel, orgItem.level) : orgItem.level;
		data.maximumLevel = data.maximumLevel != null ? Math.max(data.maximumLevel, orgItem.level) : orgItem.level;

		if (parentId != null) {
			if (!result[parentId]) {
				result[parentId] = {};
			}

			level = orgItem.level - 1; /* project children qty to parent level, it is needed to match cross hierarchy connectors levels*/
			if (!result[parentId][level]) {
				result[parentId][level] = 1;
			} else {
				result[parentId][level] += 1;
			}

			if (result[itemId] != null) {
				for (level in result[itemId]) {
					if (result[itemId].hasOwnProperty(level)) {
						if (!result[parentId][level]) {
							result[parentId][level] = result[itemId][level];
						} else {
							result[parentId][level] += result[itemId][level];
						}
					}
				}
			}
		}
	});

	return result;
};

primitives.famdiagram.FamilyBalance.prototype.balanceOrgTree = function (orgTree, extraGravities, grandChildren) {
	var index2, len2,
		index3, len3,
		extraGravity,
		childExtraGravities,
		sortedChildren,
		subChildren, subOrgItem,
		leftId = '__left__',
		rightId = '__right__',
		levelExtraGravities,
		sequence;

	orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
		var graph = primitives.common.graph(),
			graphGravities = {},
			firstOrgItem = null,
			toItemId;
		/* build gravities graph for children */
		sortedChildren = [];
		orgTree.loopChildren(this, parentOrgItem.id, function (childOrgItemId, childOrgItem, index) {
			var levelKey;
			if (firstOrgItem == null) {
				firstOrgItem = childOrgItem;
			}

			graphGravities[childOrgItem.id] = {};
			if (extraGravities.hasOwnProperty(childOrgItem.id)) {
				childExtraGravities = extraGravities[childOrgItem.id];

				for (levelKey in childExtraGravities) {
					if (childExtraGravities.hasOwnProperty(levelKey)) {
						levelExtraGravities = childExtraGravities[levelKey];

						graphGravities[childOrgItem.id][levelKey] = {};
						for (index2 = 0, len2 = levelExtraGravities.length; index2 < len2; index2 += 1) {
							extraGravity = levelExtraGravities[index2];

							if (extraGravity.commonParent == parentOrgItem.id) {
								/* this is link between two children */
								toItemId = extraGravity.toParent;
							} else {
								/* this is external link on left or on right side, we create virtual graph item ids for external links */
								if (orgTree.node(extraGravity.fromParent).childIndex < orgTree.node(extraGravity.toParent).childIndex) {
									toItemId = rightId;
								} else {
									toItemId = leftId;
								}
							}

							/* add connection to graph */
							if (childOrgItem.id != toItemId) {
								graph.addEdge(childOrgItem.id, toItemId, { weight: 0 });
								graph.edge(childOrgItem.id, toItemId).weight += 1.0;

								if (graphGravities[childOrgItem.id][levelKey][toItemId] == null) {
									graphGravities[childOrgItem.id][levelKey][toItemId] = 0;
								}
								graphGravities[childOrgItem.id][levelKey][toItemId] += 1;
							}
						}
					}
				}
			}
			/* add extra zero connection to graph when child org item has no connections
				it is connected to the first item in the graph with zero link
			*/
			if (index > 0) {
				graph.addEdge(childOrgItem.id, firstOrgItem.id, { weight: 0 });
			}
		});

		if (firstOrgItem != null) {
			/* sort items in graph from the most connected to the least */

			sequence = [];

			graph.getTotalWeightGrowthSequence(this,
				function (a) { return a.weight; },
				function (a) { sequence.push(a); }
			); //ignore jslint

			if (sequence.length === 0) {
				sequence = [firstOrgItem.id];
			}

			/* sort children from top to down */
			subChildren = this.balanceItems(sequence, leftId, rightId, graphGravities, grandChildren);

			/* save items indexes for further use */
			for (index3 = 0, len3 = subChildren.length; index3 < len3; index3 += 1) {
				subOrgItem = orgTree.node(subChildren[index3]);

				subOrgItem.childIndex = index3;

				sortedChildren.push(subOrgItem.id);
			}
		}
		orgTree.arrangeChildren(parentOrgItem.id, sortedChildren);
	});
};

primitives.famdiagram.FamilyBalance.prototype.balanceItems = function (sequence, leftId, rightId, graphGravities, grandChildren) {
	var result = [],
	index,
	slots, position,
	itemid,
	bestSlot, bestSlotValue, bestSlotDistance, bestSlotBalance, bestSlotCrossings,
	slotValue, slotDistance, slotBalance, slotCrossings,
	itemGrandChildren,
	cloneSlot, itemSlot,
	level, levelGravities, toItemId, toItemSlot;

	slots = new primitives.famdiagram.Slots();
	slots.add(new primitives.famdiagram.Slot(leftId));
	slots.add(new primitives.famdiagram.Slot(null)); /* first empty slot */
	slots.add(new primitives.famdiagram.Slot(rightId));

	/* set initital positions */
	position = 0;
	slots.loop(function (slot) {
		position += 1;
		slot.position = position;
	});

	for (index = 0; index < sequence.length; index += 1) {
		itemid = sequence[index];

		/* ignore left and right margin */
		if (itemid != leftId && itemid != rightId) {

			bestSlot = null;
			bestSlotValue = null;
			bestSlotDistance = null;
			bestSlotBalance = null;
			bestSlotCrossings = null;
			slots.loop(function (slot) {
				var level, toItemId,
					levelGravities,
					toItemSlot;

				if (slot.itemId == null) {
					itemGrandChildren = grandChildren[itemid];
					slotValue = 0;
					slotDistance = 0;
					slotBalance = 0;
					slotCrossings = 0;

					for (level in slot.crossings) {
						if (slot.crossings.hasOwnProperty(level)) {
							if (itemGrandChildren && itemGrandChildren[level] != null) {
								slotValue += slot.crossings[level] * itemGrandChildren[level];
							}
							slotCrossings += slot.crossings[level];
						}
					}
					for (level in graphGravities[itemid]) {
						if (graphGravities[itemid].hasOwnProperty(level)) {
							levelGravities = graphGravities[itemid][level];
							for (toItemId in levelGravities) {
								if (levelGravities.hasOwnProperty(toItemId)) {
									toItemSlot = slots.getSlot(toItemId);
									if (toItemSlot != null) {
										if (toItemSlot.position < slot.position) {
											/* on the left side */
											slotValue += ((slot.left[level] || 0.0) - (toItemSlot.left[level] || 0.0));
											slotBalance += Math.abs(toItemSlot.balance + 1);
										} else {
											/* on the right side */
											slotValue += ((slot.right[level] || 0.0) - (toItemSlot.right[level] || 0.0));
											slotBalance += Math.abs(toItemSlot.balance - 1);
										}
										slotDistance += Math.abs(toItemSlot.position - slot.position);
									}
								}
							}
						}
					}

					if (bestSlotValue == null ||
						bestSlotValue > slotValue ||
							(bestSlotValue == slotValue &&
								(bestSlotDistance > slotDistance ||
									(bestSlotDistance == slotDistance &&
										(bestSlotBalance > slotBalance ||
												(bestSlotBalance == slotBalance && bestSlotCrossings > slotCrossings)
										)
									)
								)
							)
						) {
						bestSlotValue = slotValue;
						bestSlot = slot;
						bestSlotDistance = slotDistance;
						bestSlotBalance = slotBalance;
						bestSlotCrossings = slotCrossings;
					}
				}
			}); //ignore jslint

			/* insert item into found slot*/
			cloneSlot = bestSlot.clone();
			itemSlot = bestSlot.clone();

			itemSlot.itemId = itemid;

			slots.insertBefore(bestSlot, cloneSlot);
			slots.insertBefore(bestSlot, itemSlot);

			/* add new item grand children qty to all slots to their grand totals for right & left sides */
			itemSlot.position = 0;
			position = 0;
			slots.loop(function (slot) {
				var level, itemGrandChildren;
				if (slot.id != itemSlot.id) {
					itemGrandChildren = grandChildren[itemid];
					for (level in itemGrandChildren) {
						if (itemGrandChildren.hasOwnProperty(level)) {
							if (!slot.left[level]) {
								slot.left[level] = itemGrandChildren[level];
							} else {
								slot.left[level] += itemGrandChildren[level];
							}
						}
					}
					position += 1;
					slot.position = position;
				}
			}, itemSlot); //ignore jslint

			position = 0;
			slots.backwardLoop(function (slot) {
				var level, itemGrandChildren;
				if (slot.id != itemSlot.id) {
					itemGrandChildren = grandChildren[itemid];
					for (level in grandChildren[itemid]) {
						if (grandChildren[itemid].hasOwnProperty(level)) {
							if (!slot.right[level]) {
								slot.right[level] = itemGrandChildren[level];
							} else {
								slot.right[level] += itemGrandChildren[level];
							}
						}
					}
					position -= 1;
					slot.position = position;
				}
			}, itemSlot); //ignore jslint

			/* add crossings */
			for (level in graphGravities[itemid]) {
				if (graphGravities[itemid].hasOwnProperty(level)) {
					levelGravities = graphGravities[itemid][level];
					for (toItemId in levelGravities) {
						if (levelGravities.hasOwnProperty(toItemId)) {
							toItemSlot = slots.getSlot(toItemId);
							if (toItemSlot != null) {
								if (toItemSlot.position < 0) {
									/* on the left side */
									toItemSlot.balance += 1;
									itemSlot.balance -= 1;
									slots.backwardLoop(function (slot) {
										if (slot.id != itemSlot.id) {
											if (slot.id != toItemSlot.id) {
												if (!slot.crossings[level]) {
													slot.crossings[level] = levelGravities[toItemId];
												} else {
													slot.crossings[level] += levelGravities[toItemId];
												}
											} else {
												return true;
											}
										}
									}, itemSlot); //ignore jslint
								} else {
									/* on the right side */
									toItemSlot.balance -= 1;
									itemSlot.balance += 1;
									slots.loop(function (slot) {
										if (slot.id != itemSlot.id) {
											if (slot.id != toItemSlot.id) {
												if (!slot.crossings[level]) {
													slot.crossings[level] = levelGravities[toItemId];
												} else {
													slot.crossings[level] += levelGravities[toItemId];
												}
											} else {
												return true;
											}
										}
									}, itemSlot); //ignore jslint
								}
							}
						}
					}
				}
			}
		}
	}

	slots.loop(function (slot) {
		var itemId = slot.itemId;
		if (itemId != null && itemId != leftId && itemId != rightId) {
			result.push(itemId);
		}
	});

	return result;
};

primitives.famdiagram.FamilyBalance.prototype.ExtraGravity = function (level) {
	this.commonParent = null; // primitives.orgdiagram.OrgItem.id
	this.fromParent = null; // primitives.orgdiagram.OrgItem.id
	this.toParent = null; // primitives.orgdiagram.OrgItem.id
	this.level = level;
};

primitives.famdiagram.FamilyBalance.prototype.getExtraGravity = function (data) {
	var orgItemId, orgItem,
		result = {}, /* Key = primitives.orgdiagram.OrgItem.id, Value= Hash {} having Key = level and Value = [] array of ExtraGravity objects*/
		index, len,
		extraPartners, extraPartner;

	/* collect gravities for extra partners */
	for (orgItemId in data.orgPartners) {
		if (data.orgPartners.hasOwnProperty(orgItemId)) {
			orgItem = data.orgTree.node(orgItemId);
			extraPartners = data.orgPartners[orgItemId];

			for (index = 0, len = extraPartners.length; index < len; index += 1) {
				extraPartner = data.orgTree.node(extraPartners[index]);

				this.addExtraGravitiesForConnection(data.orgTree, result, extraPartner, orgItem);
			}
		}
	}

	return result;
};

primitives.famdiagram.FamilyBalance.prototype.addExtraGravitiesForConnection = function (orgTree, extraGravities, fromItem, toItem) {
	var extraGravityFrom = new this.ExtraGravity(fromItem.level),
		extraGravityTo = new this.ExtraGravity(toItem.level);

	/* find common parent for evry child and orgItem and create connector for evey parent in selection path */
	orgTree.zipUp(this, fromItem.id, toItem.id, function (fromItemId, parentFromItemId, toItemId, parentToItemId) {
		/* all parent items in chain up to the common root share the same gravity object for one connector */
		this.addExtraGravityForItem(extraGravities, fromItemId, extraGravityFrom);
		this.addExtraGravityForItem(extraGravities, toItemId, extraGravityTo);

		/* initialize gravity objects */
		if (parentFromItemId == parentToItemId) {
			extraGravityFrom.commonParent = parentFromItemId;
			extraGravityFrom.fromParent = fromItemId;
			extraGravityFrom.toParent = toItemId;

			extraGravityTo.commonParent = parentFromItemId;
			extraGravityTo.fromParent = toItemId;
			extraGravityTo.toParent = fromItemId;

			return true;
		}
	});
};

primitives.famdiagram.FamilyBalance.prototype.addExtraGravityForItem = function (extraGravities, id, extraGravity) {
	if (!extraGravities.hasOwnProperty(id)) {
		extraGravities[id] = {};
	}
	if (extraGravities[id][extraGravity.level] == null) {
		extraGravities[id][extraGravity.level] = [];
	}
	extraGravities[id][extraGravity.level].push(extraGravity);
};

primitives.famdiagram.FamilyBalance.prototype.attachFamilyToOrgChart = function (data, defaultItemConfig, parent, family) {
	var levelIndex,
		familyRoot = family.items[0],
		newOrgItem = null,
		rootItem = parent;

	// fill in levels between parent and family root with invisible items
	for (levelIndex = parent.level + 1; levelIndex < familyRoot.level; levelIndex += 1) {
		data.maximumId += 1;
		newOrgItem = this.createOrgItem(data.orgTree, defaultItemConfig, data.maximumId, rootItem.id, null, levelIndex, null /* userItem */);
		newOrgItem.title = "shift";
		newOrgItem.isVisible = false;
		newOrgItem.isActive = false;
		newOrgItem.hideParentConnection = true;
		newOrgItem.hideChildrenConnection = true;
		family.items.push(newOrgItem);

		rootItem = newOrgItem;
	}

	// attach family root 
	familyRoot.hideParentConnection = true;
	data.orgTree.adopt(rootItem.id, familyRoot.id, familyRoot);
};

primitives.famdiagram.FamilyBalance.prototype.extractOrgChart = function (grandParentId, logicalFamily, defaultItemConfig, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family) {
	var index, len,
		children = [], tempChildren,
		childItem,
		rootItem = null,
		newOrgItem,
		grandParent = logicalFamily.node(grandParentId);

	/* extract root item */
	newOrgItem = this.createOrgItem(orgTree, defaultItemConfig, grandParent.id, rootItem, family.id, grandParent.level, grandParent.itemConfig);
	newOrgItem.hideParentConnection = true;
	newOrgItem.isVisible = grandParent.isVisible;
	newOrgItem.isActive = grandParent.isActive;
	newOrgItem.hideParentConnection = grandParent.hideParentConnection;
	newOrgItem.hideChildrenConnection = grandParent.hideChildrenConnection;
	family.items.push(newOrgItem);

	famItemsExtracted[grandParent.id] = true;
	grandParent.familyId = family.id;

	/* extract its children */
	children = this.extractChildren(grandParent, logicalFamily, defaultItemConfig, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family);

	while (children.length > 0) {
		tempChildren = [];
		for (index = 0, len = children.length; index < len; index += 1) {
			childItem = children[index];
			tempChildren = tempChildren.concat(this.extractChildren(childItem, logicalFamily, defaultItemConfig, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family));
		}

		children = tempChildren;
	}
};

primitives.famdiagram.FamilyBalance.prototype.extractChildren = function (parentItem, logicalFamily, defaultItemConfig, orgTree, orgPartners, itemByChildrenKey, famItemsExtracted, family) {
	var result = [],
		firstChild = null,
		partnerItem = null,
		newOrgItem;

	if (logicalFamily.countChildren(parentItem.id) == 1) {
		firstChild = logicalFamily.firstChild(parentItem.id);
	}

	if (itemByChildrenKey[firstChild] != null) {
		/* all children already extracted */
		partnerItem = itemByChildrenKey[firstChild];

		if (orgPartners[partnerItem.id] == null) {
			orgPartners[partnerItem.id] = [];
		}
		orgPartners[partnerItem.id].push(parentItem.id);

		family.links.push(new this.FamLink(parentItem.id, firstChild));
	} else {
		if (firstChild != null) {
			itemByChildrenKey[firstChild] = parentItem;
		}

		logicalFamily.loopChildren(this, parentItem.id, function (childid, childItem, levelIndex) {
			if (famItemsExtracted[childItem.id]) {
				throw "Many to many relations should not exist at this stage";
			}
			result.push(childItem);

			newOrgItem = this.createOrgItem(orgTree, defaultItemConfig, childItem.id, parentItem.id, family.id, childItem.level, childItem.itemConfig);
			newOrgItem.hideParentConnection = childItem.hideParentConnection;
			newOrgItem.hideChildrenConnection = childItem.hideChildrenConnection;
			newOrgItem.isVisible = childItem.isVisible;
			newOrgItem.isActive = childItem.isActive;
			family.items.push(newOrgItem);

			famItemsExtracted[childItem.id] = true;

			childItem.familyId = family.id;
			return logicalFamily.SKIP;
		});
	}
	return result;
};

primitives.famdiagram.FamilyBalance.prototype.createOrgItem = function (orgTree, defaultItemConfig, id, parentId, familyId, level, userItem) {
	var orgItem = new primitives.orgdiagram.OrgItem({}),
		index, len,
		property;

	// OrgItem id coinsides with ItemConfig id since we don't add any new org items to user's org chart definition
	orgItem.id = id;
	orgItem.familyId = familyId;
	orgItem.level = level;

	for (index = 0, len = this.properties.length; index < len; index += 1) {
		property = this.properties[index];

		orgItem[property] = (userItem != null && userItem[property] !== undefined) ? userItem[property] : defaultItemConfig[property];
	}
	orgTree.add(parentId, orgItem.id, orgItem);

	return orgItem;
};

primitives.famdiagram.FamilyBalance.prototype.recalcLevelsDepth = function (bundles, connectorStacks, treeLevels, orgTree, orgPartners) {
	var index, len,
		index2, len2,
		index3, len3,
		itemPosition,
		bundle, bundlesToStack,
		processed = {},
		startIndex, endIndex, stackSegments;


	treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
		var stacksSizes = new primitives.orgdiagram.TreeLevelConnectorStackSize();
		connectorStacks[levelIndex] = stacksSizes;

		bundlesToStack = [];

		treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
			var fromItems = [],
				toItems = [],
				partners;
			if (!processed.hasOwnProperty(itemid)) {


				processed[itemid] = true;
				if (!treeItem.hideChildrenConnection) {
					fromItems.push(itemid);
				}

				partners = orgPartners[itemid];
				if (partners != null) {
					for (index = 0, len = partners.length; index < len; index += 1) {
						var partner = partners[index];
						processed[partner] = true;
						fromItems.push(partner);
					}
				}

				orgTree.loopChildren(this, itemid, function (childid, child, index) {
					if (!child.hideParentConnection) {
						toItems.push(childid);
					}
				}); //ignore jslint

				if (fromItems.length > 1 || toItems.length > 0) {
					/* if bundle has more than one parent without children we draw connection line between parents */
					/* if bundles has no parents, but has children we draw connectors between children, top loop */
					bundle = new primitives.common.VerticalConnectorBundle(fromItems, toItems);

					bundles.push(bundle);

					if (fromItems.length > 1) {
						bundlesToStack.push(bundle);
					}
				}
			}
		});

		if (bundlesToStack.length > 0) {
			/* find minimum and maximum partner index at level */
			stackSegments = primitives.common.pile();
			for (index2 = 0, len2 = bundlesToStack.length; index2 < len2; index2 += 1) {
				bundle = bundlesToStack[index2];

				startIndex = null;
				endIndex = null;
				for (index3 = 0, len3 = bundle.fromItems.length; index3 < len3; index3 += 1) {
					itemPosition = treeLevels.getItemPosition(bundle.fromItems[index3]);

					startIndex = (startIndex != null) ? Math.min(startIndex, itemPosition) : itemPosition;
					endIndex = (endIndex != null) ? Math.max(endIndex, itemPosition) : itemPosition;
				}
				stackSegments.add(startIndex, endIndex, bundle);
			}

			stacksSizes.parentsStackSize = stackSegments.resolve(this, function (from, to, bundle, offset, stackSize) {
				bundle.fromOffset = offset + 1;
				bundle.fromStackSize = stackSize;
			});//ignore jslint
		}
	});
};

/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/FamilyMatrixesExtractor.js*/
primitives.famdiagram.FamilyMatrixesExtractor = function (debug) {
	this.parent = primitives.famdiagram.BaseTransformer.prototype;
	this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.FamilyMatrixesExtractor.prototype = new primitives.famdiagram.BaseTransformer();

primitives.famdiagram.FamilyMatrixesExtractor.prototype.extract = function (options, logicalFamily, matrixes, matrixBottomConnectorsIds, bundles, maximumId) {
	var index, len, index2, len2,
		famItem,
		familiesGraph, /* primitives.common.graph */
		link, links,
		fromFamily,
		toFamily,
		sortedFamilies = [], sortedFamiliesHash,
		attachedFamilies,
		userItem,
		familyId,
		family,
		familyRootItem,
		fromItem,
		toItem,
		rootItem, rootItems, bestRootItem, bestReference,
		spanningTree,
		extraGravities, grandChildren,
		parsedId,
		itemsHavingSpouses, spouses,
		orgItemRoot,
		famItemsExtracted;

	if (logicalFamily.hasNodes() > 0) {
		/* find nodes having the same parent and child nodes and replace them with matrix placeholder node */
		if (options.enableMatrixLayout) {
			logicalFamily.groupBy(this, Math.max(2, options.minimumMatrixSize), function (parentid, childid, ids, nodes) {
				maximumId +=1;
				var id = maximumId;
				maximumId += 1;
				var id2 = maximumId;

				var firstNode = logicalFamily.node(ids[0]);

				var matrixNode = new primitives.famdiagram.FamilyItem({
					id: id,
					level: firstNode.level,
					isVisible: false,
					isActive: false,
					itemConfig: { title: "dummy #" + id, description: "This is item used as aggregator of matrixed nodes." },
					levelGravity: 1/*primitives.common.GroupByType.Parents*/,
					hideParentConnection: true,
					hideChildrenConnection: true
				});

				matrixBottomConnectorsIds[id] = id2; /* id2 is needed for connectors graph */

				for (var index = 0, len = ids.length; index < len; index += 1) {
					var nodeid = ids[index];
					logicalFamily.removeNode(nodeid);
				}

				if (parentid != null) {
					logicalFamily.add([parentid], id, matrixNode);
					matrixNode.hideParentConnection = false;
					bundles.push(new primitives.common.MatrixConnectorBundle(true, ids, id, id, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
				} else {
					logicalFamily.add(null, id, matrixNode);
				}

				if (childid != null) {
					logicalFamily.adopt([id], childid);
					matrixNode.hideChildrenConnection = false;
					bundles.push(new primitives.common.MatrixConnectorBundle(false, ids, id, id2, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
				}

				matrixes[id] = nodes;
			} //ignore jslint
			);
		}
	}
	return maximumId;
};

primitives.famdiagram.FamilyMatrixesExtractor.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
	return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};

/* /Controls/FamDiagram/Tasks/Transformations/FamilyTransformations/FamilyNormalizer.js*/
primitives.famdiagram.FamilyNormalizer = function (debug) {
	this.parent = primitives.famdiagram.BaseTransformer.prototype;
	this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.FamilyNormalizer.prototype = new primitives.famdiagram.BaseTransformer();

primitives.famdiagram.FamilyNormalizer.prototype.normalize = function (options, logicalFamily, maximumId) {
	var index, len, index2, len2,
		famItem,
		familiesGraph, /* primitives.common.graph */
		link, links,
		fromFamily,
		toFamily,
		sortedFamilies = [], sortedFamiliesHash,
		attachedFamilies,
		userItem,
		familyId,
		family,
		familyRootItem,
		fromItem,
		toItem,
		rootItem, rootItems, bestRootItem, bestReference,
		spanningTree,
		extraGravities, grandChildren,
		parsedId,
		itemsHavingSpouses, spouses,
		orgItemRoot,
		famItemsExtracted,
		families2;

	if (logicalFamily.hasNodes() > 0) {

		/* Distribute FamilyItem-s by levels. Item levels aligned to bottom. */
		logicalFamily.loopLevels(this, options.groupByType == 1/*primitives.common.GroupByType.Parents*/, function (itemid, item, levelIndex) {
			item.level = levelIndex;
		});

		/* Optimize family references. Bundle connectors where it is possible */
		logicalFamily.optimizeReferences(function () {
			maximumId += 1;

			return new primitives.famdiagram.FamilyItem({
				id: maximumId,
				isVisible: false,
				isActive: false,
				itemConfig: { title: "bundle #" + maximumId, description: " This item was created by references optimizer." },
				levelGravity: 2/*primitives.common.GroupByType.Children*/
			});
		}); //ignore jslint

		if (this.debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}
		if (this.debug && logicalFamily.hasLoops()) {
			throw "Structure has loops!";
		}

		/* eliminate many to many connections in chart, every connection should be ether child or parent relation. */
		logicalFamily.eliminateManyToMany(function () {
			maximumId += 1;

			return new primitives.famdiagram.FamilyItem({
				id: maximumId,
				isVisible: false,
				isActive: false,
				itemConfig: { title: "dummy #" + maximumId, description: "This is item used to eliminate M:M relations." },
				levelGravity: 2/*primitives.common.GroupByType.Children*/,
				hideParentConnection: false,
				hideChildrenConnection: false
			});
		} //ignore jslint
		);

		if (this.debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}

		/* enumerate */

		if (options.alignBylevels) {
			/* Distribute FamilyItem-s by levels. The original family items visible to user should keep their levels after all transformations */
			this.resortItemsBylevels(logicalFamily);
		} else {
			logicalFamily.loopLevels(this, options.groupByType == 1/*primitives.common.GroupByType.Parents*/, function (itemid, item, levelIndex) {
				item.level = levelIndex;
			});
		}

		if (this.debug) {
			this.validate(logicalFamily, false);
		}

		/* Fill in items between parent/child relations having gaps in levels */
		this.fillInItems(logicalFamily,
			function () {
				var result;

				maximumId += 1;

				result = new primitives.famdiagram.FamilyItem({
					id: maximumId,
					levelGravity: 2/*primitives.common.GroupByType.Children*/,
					isVisible: false,
					isActive: false,
					itemConfig: { title: "extension #" + maximumId, description: "This is item used to fill gaps in levels." }
				});

				return result;
			} //ignore jslint
		);

		if (this.debug) {
			this.validate(logicalFamily, true);
		}
	}
	return maximumId;
};

primitives.famdiagram.FamilyNormalizer.prototype.resortItemsBylevels = function (logicalFamily) {
	var itemsAtLevels = [],
		minimumLevel = null,
		maximumLevel = null,
		currentLevel, index, itemsAtLevel;

	logicalFamily.loop(this, function (famItemId, famItem) {
		famItem.originalLevel = famItem.level;
		famItem.level = null;
		if (famItem.originalLevel != null) {
			if (!itemsAtLevels[famItem.originalLevel]) {
				itemsAtLevels[famItem.originalLevel] = {};
			}
			itemsAtLevels[famItem.originalLevel][famItemId] = famItem;

			minimumLevel = minimumLevel != null ? Math.min(famItem.originalLevel, minimumLevel) : famItem.originalLevel;
			maximumLevel = maximumLevel != null ? Math.max(famItem.originalLevel, maximumLevel) : famItem.originalLevel;
		}
	});

	/* assign levels*/
	for (index = minimumLevel; index <= maximumLevel; index += 1) {
		itemsAtLevel = itemsAtLevels[index];

		this.setLevelsForItems(itemsAtLevel, logicalFamily);
	}

	logicalFamily.loopTopo(this, function (famItemId, famItem, position) {
		var level;
		if (famItem.levelGravity == 1/*primitives.common.GroupByType.Parents*/) {
			level = null;
			logicalFamily.loopParents(this, famItemId, function (childItemId, childFamItem, levelIndex) {
				level = level == null ? childFamItem.level + 1 : Math.max(childFamItem.level + 1, level);
				return logicalFamily.SKIP;
			}); //ignore jslint
			famItem.level = !level ? famItem.level : level;
		}
	});
};

primitives.famdiagram.FamilyNormalizer.prototype.setLevelsForItems = function (items, logicalFamily) {
	var level = 0,
		key, famItem,
		nextItems;

	for (key in items) {
		if (items.hasOwnProperty(key)) {
			logicalFamily.loopParents(this, key, function (parentid, parent, levelIndex) {
				level = Math.max(parent.level + 1, level);
				return logicalFamily.SKIP;
			}); //ignore jslint
		}
	}

	for (key in items) {
		if (items.hasOwnProperty(key)) {
			famItem = items[key];
			famItem.level = level;
		}
	}

	while (!primitives.common.isEmptyObject(items)) {
		nextItems = {};

		for (key in items) {
			if (items.hasOwnProperty(key)) {
				famItem = items[key];
				logicalFamily.loopChildren(this, key, function (childid, child, levelIndex) {
					if (child.originalLevel == null || child.isLevelNeutral) {
						child.level = child.level == null ? famItem.level + 1 : Math.max(child.level, famItem.level + 1);
						nextItems[childid] = child;
					}
					return logicalFamily.SKIP;
				}); //ignore jslint
			}
		}
		items = nextItems;
	}
};

primitives.famdiagram.FamilyNormalizer.prototype.fillInItems = function (logicalFamily, createFamItem) {
	var bundleItem;

	logicalFamily.loop(this, function (famItemId, famItem) {
		var extNeeded = true,
			itemsToBundle;
		while (extNeeded) {
			extNeeded = false;

			/* extend children down */
			itemsToBundle = [];

			logicalFamily.loopParents(this, famItemId, function (parentItemId, parentItem, level) {
				if (famItem.level - 1 > parentItem.level) {
					itemsToBundle.push(parentItemId);
				}
				return logicalFamily.SKIP;
			}); //ignore jslint

			if (itemsToBundle.length > 1) {
				bundleItem = createFamItem(famItem);
				bundleItem.level = famItem.level - 1;

				bundleItem.hideParentConnection = false;
				bundleItem.hideChildrenConnection = false;

				logicalFamily.bundleParents(famItemId, itemsToBundle, bundleItem.id, bundleItem);

				extNeeded = true;

				famItemId = bundleItem.id;
				famItem = bundleItem;
			}
		}
	});

	logicalFamily.loop(this, function (famItemId, famItem) {
		var extNeeded = true,
			itemsToBundle,
			isSingleExtension = true;
		while (extNeeded) {
			extNeeded = false;

			/* extend children down */
			itemsToBundle = [];
			logicalFamily.loopChildren(this, famItemId, function (childItemId, childItem, level) {
				if (famItem.level + 1 < childItem.level) {
					itemsToBundle.push(childItemId);
				} else {
					isSingleExtension = false;
				}
				return logicalFamily.SKIP;
			}); //ignore jslint

			if (itemsToBundle.length > 1) {
				bundleItem = createFamItem(famItem);
				bundleItem.level = famItem.level + 1;

				if (isSingleExtension) {
					bundleItem.hideParentConnection = false;
					bundleItem.hideChildrenConnection = false;
				}

				logicalFamily.bundleChildren(famItemId, itemsToBundle, bundleItem.id, bundleItem);

				extNeeded = true;

				famItemId = bundleItem.id;
				famItem = bundleItem;
			}
		}
	});

	logicalFamily.loop(this, function (famItemId, famItem) {
		var extNeeded = true,
			itemsToBundle;
		while (extNeeded) {
			extNeeded = false;

			/* extend children down */
			itemsToBundle = [];

			logicalFamily.loopParents(this, famItemId, function (parentItemId, parentItem, level) {
				if (famItem.level - 1 > parentItem.level) {
					itemsToBundle.push(parentItemId);
				}
				return logicalFamily.SKIP;
			}); //ignore jslint

			if (itemsToBundle.length > 0) {
				bundleItem = createFamItem(famItem);
				bundleItem.level = famItem.level - 1;

				bundleItem.hideParentConnection = false;
				bundleItem.hideChildrenConnection = false;

				logicalFamily.bundleParents(famItemId, itemsToBundle, bundleItem.id, bundleItem);

				extNeeded = true;

				famItemId = bundleItem.id;
				famItem = bundleItem;
			}
		}
	});
};

/* /Controls/FamDiagram/Tasks/Transformations/Layouts/BaseLayout.js*/
primitives.common.BaseLayout = function (params, options) {
	this._children = {};

	if (this.params != null) {
		for (var key in this.params) {
			if (this.params.hasOwnProperty(key) && params.hasOwnProperty(key)) {
				this.params[key] = params[key];
			}
		}
	}

	if (this.options != null) {
		for (key in this.options) {
			if (this.options.hasOwnProperty(key) && options.hasOwnProperty(key)) {
				this.options[key] = options[key];
			}
		}

		this.options.shifts = this.getShifts(this.options);
		this.options.intervals = this.getIntervals(this.options);
	}
};

primitives.common.BaseLayout.prototype.add = function (treeItemId, layout) {
	this._children[treeItemId] = layout;
};

primitives.common.BaseLayout.prototype.getLayout = function (treeItemId) {
	return this._children[treeItemId] || null;
};

primitives.common.BaseLayout.prototype.getShifts = function (options) {
	var result = [];
	result[1/*primitives.common.Visibility.Normal*/] = options.normalLevelShift;
	result[2/*primitives.common.Visibility.Dot*/] = options.dotLevelShift;
	result[3/*primitives.common.Visibility.Line*/] = options.lineLevelShift;
	result[4/*primitives.common.Visibility.Invisible*/] = options.lineLevelShift;
	return result;
};

primitives.common.BaseLayout.prototype.getIntervals = function (options) {
	var result = [];
	result[1/*primitives.common.Visibility.Normal*/] = options.normalItemsInterval;
	result[2/*primitives.common.Visibility.Dot*/] = options.dotItemsInterval;
	result[3/*primitives.common.Visibility.Line*/] = options.lineItemsInterval;
	result[4/*primitives.common.Visibility.Invisible*/] = options.lineItemsInterval;
	return result;
};

primitives.common.BaseLayout.prototype.getItemSize = function (visibility, isCursor, treeItemTemplate, options) {
	var templateConfig,
		size,
		contentPosition;

	switch (visibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			templateConfig = treeItemTemplate.template.templateConfig;
			size = new primitives.common.Size(templateConfig.itemSize);
			contentPosition = new primitives.common.Rect(0, 0, size.width, size.height);
			if (isCursor) {
				size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
				size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
				contentPosition.x = templateConfig.cursorPadding.left;
				contentPosition.y = templateConfig.cursorPadding.top;
			}
			if (treeItemTemplate.hasSelectorCheckbox) {
				size.height += options.checkBoxPanelSize;
			}
			if (treeItemTemplate.hasButtons) {
				size.width += options.buttonsPanelSize;
				switch (options.groupTitlePlacementType) {
					case 3/*primitives.common.AdviserPlacementType.Right*/:
						contentPosition.x += options.buttonsPanelSize;
						break;
				}
			}
			if (treeItemTemplate.hasGroupTitle) {
				size.width += options.groupTitlePanelSize;
				switch (options.groupTitlePlacementType) {
					case 3/*primitives.common.AdviserPlacementType.Right*/:
						break;
					default:
						contentPosition.x += options.groupTitlePanelSize;
						break;
				}
			}
			break;
		case 2/*primitives.common.Visibility.Dot*/:
			templateConfig = treeItemTemplate.template.templateConfig;
			size = new primitives.common.Size(templateConfig.minimizedItemSize);
			break;
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			size = new primitives.common.Size();
			break;
	}

	switch (options.orientationType) {
		case 2/*primitives.common.OrientationType.Left*/:
		case 3/*primitives.common.OrientationType.Right*/:
			size.invert();
			break;
	}

	return {
		actualSize: size,
		contentPosition: contentPosition
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/Layouts/FamilyLayout.js*/
primitives.famdiagram.FamilyLayout = function (params, options) {
	this.params = {
		logicalFamily: null, // primitives.common.family of primitives.famdiagram.FamilyItem
		treeLevels: null, // primitives.common.TreeLevels of primitives.orgdiagram.OrgItem used properties: isVisible
		getConnectorsStacksSizes: null, // primitives.orgdiagram.TreeLevelConnectorStackSize
		isItemSelected: null,
		cursorItemId: null,
		getTemplateParams: null //primitives.orgdiagram.TemplateParams
	};

	this.options = {
		verticalAlignment: 1/*primitives.common.VerticalAlignmentType.Middle*/,
		pageFitMode: 0/*primitives.common.PageFitMode.None*/,
		minimalVisibility: 2/*primitives.common.Visibility.Dot*/,
		orientationType: 0/*primitives.common.OrientationType.Top*/,
		arrowsDirection: 0/*primitives.common.GroupByType.None*/,
		linesWidth: 1,
		checkBoxPanelSize: 24,
		buttonsPanelSize: 28,
		groupTitlePanelSize: 24,
		groupTitlePlacementType: 2/*primitives.common.AdviserPlacementType.Left*/,
		normalLevelShift: 20,
		dotLevelShift: 20,
		lineLevelShift: 20,
		normalItemsInterval: 10,
		dotItemsInterval: 1, 
		lineItemsInterval: 2
	};

	this.data = {
		treeItemsPositions: {},
		treeLevelsPositions: []
	};

	this.parent = primitives.common.BaseLayout.prototype;
	this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.FamilyLayout.prototype = new primitives.common.BaseLayout();

primitives.famdiagram.FamilyLayout.prototype.measure = function (panelSize) {
	var placeholderSize = new primitives.common.Rect(0, 0, 0, 0),
		levelVisibilities,
		minimalPlaceholderSize;

	var data = {
		treeItemsPositions: {},
		treeLevelsPositions: []
	};

	switch (this.options.orientationType) {
		case 2/*primitives.common.OrientationType.Left*/:
		case 3/*primitives.common.OrientationType.Right*/:
			panelSize.invert();
			break;
	}

	if (!this.params.treeLevels.isEmpty()) {
		switch (this.options.pageFitMode) {
			case 0/*primitives.common.PageFitMode.None*/:
			case primitives.common.PageFitMode.PrintPreview:
			case 5/*primitives.common.PageFitMode.AutoSize*/:
				levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];
				placeholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, 0);
				break;
			default:
				levelVisibilities = this.getLevelVisibilities(this.params.treeLevels, this.options.minimalVisibility);

				// Find minimal placeholder size to hold completly folded diagram
				minimalPlaceholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, levelVisibilities.length - 1);
				if (!this.checkDiagramSize(minimalPlaceholderSize, panelSize, this.options.pageFitMode)) {
					placeholderSize = minimalPlaceholderSize;
				}
				else {
					// Find optimal diagram size
					minimalPlaceholderSize.addRect(panelSize);
					minimalPlaceholderSize.offset(0, 0, 5, 5);
					this.findOptimalSize(this, levelVisibilities.length - 1, function (index) {
						placeholderSize = this.setTreeLevelsVisibilityAndPositionTreeItems(data, this.params, this.options, levelVisibilities, index);
						return this.checkDiagramSize(placeholderSize, minimalPlaceholderSize, this.options.pageFitMode);
					});
				}
				break;
		}
	}

	this.data = data;

	return placeholderSize;
};

primitives.famdiagram.FamilyLayout.prototype.getLevelVisibilities = function (treeLevels, minimalVisibility) {
	var levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];

	var visibilities = [];
	switch (minimalVisibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			break;
		case 2/*primitives.common.Visibility.Dot*/:
			visibilities.push(2/*primitives.common.Visibility.Dot*/);
			break;
		case 0/*primitives.common.Visibility.Auto*/:
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			visibilities.push(2/*primitives.common.Visibility.Dot*/);
			visibilities.push(3/*primitives.common.Visibility.Line*/);
			break;
	}

	treeLevels.loopLevelsReversed(this, function (level, levelContext) {
		for (var index = 0; index < visibilities.length; index += 1) {
			levelVisibilities.push(new primitives.orgdiagram.LevelVisibility(level, visibilities[index]));
		}
	});

	return levelVisibilities;
};

primitives.famdiagram.FamilyLayout.prototype.findOptimalSize = function (thisArg, maximum, funcCheckSize) {
    var minimum = 0,
        cursorIndex;
	// maximum condension is fit to page
	if (!funcCheckSize.call(thisArg, minimum)) {
		// minimum condension does not fit to page
		cursorIndex = maximum;
		while (maximum - minimum > 1) {
			cursorIndex = Math.floor((maximum + minimum) / 2.0);
			if (funcCheckSize.call(thisArg, cursorIndex)) {
				// middle point size fit to page
				maximum = cursorIndex;
			}
			else {
				minimum = cursorIndex;
			}
		}
		if (maximum !== cursorIndex) {
			funcCheckSize.call(thisArg, maximum);
		}
	}
};

primitives.famdiagram.FamilyLayout.prototype.setTreeLevelsVisibilityAndPositionTreeItems = function (data, params, options, levelVisibilities, cursorIndex) {
	var index,
		levelVisibility;

	data.treeLevelsPositions = [];

	params.treeLevels.loopLevels(this, function (index, levelContext) {
		var treeLevelPosition = new primitives.orgdiagram.TreeLevelPosition();
		treeLevelPosition.currentvisibility = 1/*primitives.common.Visibility.Normal*/;

		data.treeLevelsPositions.push(treeLevelPosition);
	});

	for (index = 0; index <= cursorIndex; index += 1) {
		levelVisibility = levelVisibilities[index];
		data.treeLevelsPositions[levelVisibility.level].currentvisibility = levelVisibility.currentvisibility;
	}

	data.treeItemsPositions = {};

	this.recalcItemsSize(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, params.isItemSelected, params.cursorItemId, params.getTemplateParams, options);

	this.setOffsets(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, params.logicalFamily, options.intervals);
	this.recalcLevelsDepth(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions, options.verticalAlignment);
	this.shiftLevels(data.treeLevelsPositions, options.shifts[3/*primitives.common.Visibility.Line*/], options.shifts, options.arrowsDirection, options.linesWidth, params.getConnectorsStacksSizes);

	return this.getLayoutSize(params.treeLevels, data.treeItemsPositions, data.treeLevelsPositions);
};

primitives.famdiagram.FamilyLayout.prototype.checkDiagramSize = function (diagramSize, panelSize, pageFitMode) {
	var result = false;
	switch (pageFitMode) {
		case 1/*primitives.common.PageFitMode.PageWidth*/:
			if (panelSize.width >= diagramSize.width) {
				result = true;
			}
			break;
		case 2/*primitives.common.PageFitMode.PageHeight*/:
			if (panelSize.height >= diagramSize.height) {
				result = true;
			}
			break;
		case 3/*primitives.common.PageFitMode.FitToPage*/:
			if (panelSize.height >= diagramSize.height && panelSize.width >= diagramSize.width) {
				result = true;
			}
			break;
	}
	return result;
};

primitives.famdiagram.FamilyLayout.prototype.getLayoutSize = function (treeLevels, treeItemsPositions, treeLevelsPositions) {
	return new primitives.common.Rect(0, 0, Math.round(this.getLayoutWidth(treeLevels, treeItemsPositions)), Math.round(this.getLayoutHeight(treeLevelsPositions)));
};

primitives.famdiagram.FamilyLayout.prototype.getLayoutWidth = function (treeLevels, treeItemsPositions) {
	var result = 0;
	treeLevels.loopLevels(this, function (levelIndex, level) {
		var levelLength = treeLevels.getLevelLength(levelIndex);

		if (levelLength > 0) {
			var itemid = treeLevels.getItemAtPosition(levelIndex, levelLength - 1),
				treeItemPosition = treeItemsPositions[itemid];
			result = Math.max(result, treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding);
		}
	});
	return result;
};

primitives.famdiagram.FamilyLayout.prototype.getLayoutHeight = function (treeLevelsPositions) {
	var len = treeLevelsPositions.length,
		treeLevel = treeLevelsPositions[len - 1];
	return treeLevel.shift + treeLevel.nextLevelShift;
};

primitives.famdiagram.FamilyLayout.prototype.recalcItemsSize = function (treeLevels, treeItemsPositions, treeLevelsPositions, isItemSelected, cursorItemId, getTemplateParams, options) {
	treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
		var treeLevelPosition = treeLevelsPositions[levelIndex];

		treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem, position) {
			var treeItemPosition = new primitives.orgdiagram.TreeItemPosition();
			var childLayout = this.getLayout(treeItemId);
			if (childLayout == null) {
				var treeItemVisibility = isItemSelected(treeItemId) ? 1/*primitives.common.Visibility.Normal*/ : (!treeItem.isVisible ? 4/*primitives.common.Visibility.Invisible*/ : 0/*primitives.common.Visibility.Auto*/),
					treeItemtemplate = getTemplateParams(treeItemId);

				var actualVisibility = (treeItemVisibility === 0/*primitives.common.Visibility.Auto*/) ? treeLevelPosition.currentvisibility : treeItemVisibility;
				var size = this.getItemSize(actualVisibility, cursorItemId == treeItemId, treeItemtemplate, options);

				treeItemPosition.actualVisibility = actualVisibility;
				treeItemPosition.actualSize = size.actualSize;
				treeItemPosition.contentPosition = size.contentPosition;
			} else {
				size = childLayout.measure(treeLevelPosition.currentvisibility);
				treeItemPosition.actualVisibility = 4/*primitives.common.Visibility.Invisible*/;
				treeItemPosition.actualSize = size;
			}
			treeItemsPositions[treeItemId] = treeItemPosition;
		});
	});
};

primitives.famdiagram.FamilyLayout.prototype.recalcLevelsDepth = function (treeLevels, treeItemsPositions, treeLevelsPositions, verticalAlignment) {
	var minimalDepth,
		dotsDepth;

	treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
		var treeLevelPosition = treeLevelsPositions[levelIndex];
		treeLevelPosition.shift = 0.0;
		treeLevelPosition.depth = 0.0;
		treeLevelPosition.actualVisibility = 4/*primitives.common.Visibility.Invisible*/;

		minimalDepth = null; /* minimum  height of non-dot items in level */
		dotsDepth = null; /* maximum dots height */

		treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
			var treeItemPosition = treeItemsPositions[itemid];
			treeLevelPosition.depth = Math.max(treeLevelPosition.depth, treeItemPosition.actualSize.height);
			switch (treeItemPosition.actualVisibility) {
				case 2/*primitives.common.Visibility.Dot*/:
				case 3/*primitives.common.Visibility.Line*/:
				case 4/*primitives.common.Visibility.Invisible*/:
					dotsDepth = !dotsDepth ? treeItemPosition.actualSize.height : Math.min(dotsDepth, treeItemPosition.actualSize.height);
					break;
				default:
					minimalDepth = !minimalDepth ? treeItemPosition.actualSize.height : Math.min(minimalDepth, treeItemPosition.actualSize.height);
					break;
			}

			treeLevelPosition.actualVisibility = Math.min(treeLevelPosition.actualVisibility, treeItemPosition.actualVisibility);
		});

		if (minimalDepth == null) {
			minimalDepth = treeLevelPosition.depth;
		}
		if (dotsDepth != null && dotsDepth > minimalDepth) {
			minimalDepth = dotsDepth;
		}

		switch (verticalAlignment) {
			case 0/*primitives.common.VerticalAlignmentType.Top*/:
				treeLevelPosition.horizontalConnectorsDepth = minimalDepth / 2.0;
				break;
			case 1/*primitives.common.VerticalAlignmentType.Middle*/:
				treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth / 2.0;
				break;
			case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
				treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth - minimalDepth / 2.0;
				break;
		}
	});
};

primitives.famdiagram.FamilyLayout.prototype.shiftLevels = function (treeLevelsPositions, shift, shifts, arrowsDirection, linesWidth, getConnectorsStacksSizes) {
	var index,
		len,
		treeLevelPosition,
		treeLevelConnectorStackSize,
		childrenSpace = 0,
		parentsSpace = 0,
		arrowTipLength = linesWidth * 8;

	switch (arrowsDirection) {
		case 1/*primitives.common.GroupByType.Parents*/:
			childrenSpace = arrowTipLength;
			parentsSpace = 0;
			break;
		case 2/*primitives.common.GroupByType.Children*/:
			childrenSpace = 0;
			parentsSpace = arrowTipLength;
			break;
	}

	for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
		treeLevelPosition = treeLevelsPositions[index];

		treeLevelConnectorStackSize = getConnectorsStacksSizes(index);
		shift += treeLevelPosition.setShift(shift, shifts[treeLevelPosition.actualVisibility], parentsSpace, childrenSpace, treeLevelConnectorStackSize.parentsStackSize);
	}
};

primitives.famdiagram.FamilyLayout.prototype.setOffsets = function (treeLevels, treeItemsPositions, treeLevelsPositions, logicalFamily, intervals) {
	var index, len;

	for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
		treeLevelsPositions[index].currentOffset = 0.0;
	}

	var family = logicalFamily.getPlanarFamily(treeLevels);

	var familyAlignment = new primitives.common.FamilyAlignment(this, family, treeLevels, function (nodeid, node) {
		var treeItemPosition = treeItemsPositions[nodeid];
		var treeItemPadding = intervals[treeItemPosition.actualVisibility] / 2;

		treeItemPosition.leftPadding = treeItemPadding;
		treeItemPosition.rightPadding = treeItemPadding;

		return treeItemPosition.leftPadding + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;
	});

	var leftMargin = null;
	treeLevels.loopLevels(this, function (levelIndex, level) {
		var nodeid = treeLevels.getItemAtPosition(levelIndex, 0);
		if (nodeid != null) {
			var treeItemPosition = treeItemsPositions[nodeid];
			var nodeOffset = familyAlignment.getOffset(nodeid) - treeItemPosition.leftPadding - treeItemPosition.actualSize.width / 2;
			leftMargin = (leftMargin == null) ? nodeOffset : Math.min(leftMargin, nodeOffset);
		}
	});

	treeLevels.loopLevels(this, function (levelIndex, level) {
		treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
			var treeItemPosition = treeItemsPositions[nodeid];
			var nodeOffset = familyAlignment.getOffset(nodeid);
			treeItemPosition.offset = nodeOffset - treeItemPosition.actualSize.width / 2;

			treeItemPosition.offset -= leftMargin;
		});
	});
};

primitives.famdiagram.FamilyLayout.prototype.arrange = function (thisArg, onItemPositioned) {
	var prevLevelPosition = null;
	if (onItemPositioned != null) {
		this.params.treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var treeLevelPosition = this.data.treeLevelsPositions[levelIndex];

			this.params.treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
				var treeItemPosition = this.data.treeItemsPositions[itemid];
				var result = this.getItemPosition(treeItemPosition.actualVisibility, treeItemPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, this.options.verticalAlignment);
				treeItemPosition.actualPosition = result.position;
				treeItemPosition.horizontalConnectorsShift = result.horizontalConnectorsShift;
				treeItemPosition.topConnectorShift = result.topConnectorShift;
				treeItemPosition.topConnectorInterval = result.topConnectorInterval;
				treeItemPosition.bottomConnectorShift = result.bottomConnectorShift;
				treeItemPosition.bottomConnectorInterval = result.bottomConnectorInterval;

				onItemPositioned.call(thisArg, itemid, treeItemPosition);

				var childLayout = this.getLayout(itemid);
				if (childLayout != null) {
					childLayout.arrange(thisArg, result.position, onItemPositioned);
				}
			});

			prevLevelPosition = treeLevelPosition;
		});
	}
};

primitives.famdiagram.FamilyLayout.prototype.getItemPosition = function (visibility, offset, size, prevLevel, level, verticalAlignment) {
	var itemShift = 0;

	switch (visibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			switch (verticalAlignment) {
				case 0/*primitives.common.VerticalAlignmentType.Top*/:
					itemShift = 0;
					break;
				case 1/*primitives.common.VerticalAlignmentType.Middle*/:
					itemShift = (level.depth - size.height) / 2.0;
					break;
				case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
					itemShift = level.depth - size.height;
					break;
			}
			break;
		case 2/*primitives.common.Visibility.Dot*/:
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			itemShift = level.horizontalConnectorsDepth - size.height / 2.0;
			break;
	}

	return {
		position: new primitives.common.Rect(offset, level.shift + itemShift, size.width, size.height),
		horizontalConnectorsShift: level.shift + level.horizontalConnectorsDepth,
		topConnectorShift: prevLevel != null ? prevLevel.shift + prevLevel.connectorShift : null,
		topConnectorInterval: prevLevel != null ? prevLevel.levelSpace / 2 : null,
		bottomConnectorShift: level.shift + level.connectorShift,
		bottomConnectorInterval: level.levelSpace / 2
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/Layouts/MatrixLayout.js*/
primitives.famdiagram.MatrixLayout = function (params, options) {
	this.params = {
		items: [], // primitives.orgdiagram.OrgItem used properties: isVisible
		isItemSelected: null,
		cursorItemId: null,
		getTemplateParams: null, //primitives.orgdiagram.TemplateParams
		hideParentConnection: false,
		hideChildrenConnection: false
	};

	this.options = {
		verticalAlignment: 1/*primitives.common.VerticalAlignmentType.Middle*/,
		orientationType: 0/*primitives.common.OrientationType.Top*/,
		arrowsDirection: 0/*primitives.common.GroupByType.None*/,
		linesWidth: 1,
		checkBoxPanelSize: 24,
		buttonsPanelSize: 28,
		groupTitlePanelSize: 24,
		groupTitlePlacementType: 2/*primitives.common.AdviserPlacementType.Left*/,
		normalLevelShift: 20,
		dotLevelShift: 20,
		lineLevelShift: 20,
		normalItemsInterval: 10,
		dotItemsInterval: 1,
		lineItemsInterval: 2,
		maximumColumnsInMatrix: 6
	};

	this.data = {
		treeItemsPositions: {},
		columns: [],
		rows: []
	};

	this.parent = primitives.common.BaseLayout.prototype;
	this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.MatrixLayout.prototype = new primitives.common.BaseLayout();

primitives.famdiagram.MatrixLayout.prototype.Column = function () {
	this.depth = 0;
	this.offset = 0;
	this.leftPadding = 0;
	this.rightPadding = 0;
};

primitives.famdiagram.MatrixLayout.prototype.Row = function () {
	this.depth = 0;
	this.offset = 0;
	this.horizontalConnectorsDepth = 0;
	this.minimalDepth = null;
	this.dotsDepth = null;
};

primitives.famdiagram.MatrixLayout.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
	return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};

primitives.famdiagram.MatrixLayout.prototype.measure = function (visibility) {
	var data = {
		treeItemsPositions: {},
		columns: [],
		rows: []
	};

	this.measureItems(data, this.params, this.options, visibility);
	this.measureColumns(data, this.params, this.options);
	this.measureRows(data, this.params, this.options);

	this.data = data;

	return this.getLayoutSize(data);
};

primitives.famdiagram.MatrixLayout.prototype.measureItems = function (data, params, options, visibility) {
	for (var index = 0, len = params.items.length; index < len; index += 1) {
		var treeItem = params.items[index];
		var treeItemId = treeItem.id;
		var treeItemPosition = new primitives.orgdiagram.TreeItemPosition();

		var treeItemVisibility = params.isItemSelected(treeItemId) ? 1/*primitives.common.Visibility.Normal*/ : (!treeItem.isVisible ? 4/*primitives.common.Visibility.Invisible*/ : 0/*primitives.common.Visibility.Auto*/),
			treeItemtemplate = params.getTemplateParams(treeItemId);

		var actualVisibility = (treeItemVisibility === 0/*primitives.common.Visibility.Auto*/) ? visibility : treeItemVisibility;
		var size = this.getItemSize(actualVisibility, params.cursorItemId == treeItemId, treeItemtemplate, options);
		treeItemPosition.actualVisibility = actualVisibility;
		treeItemPosition.actualSize = size.actualSize;
		treeItemPosition.contentPosition = size.contentPosition;

		data.treeItemsPositions[treeItemId] = treeItemPosition;
	}
};

primitives.famdiagram.MatrixLayout.prototype.measureColumns = function (data, params, options) {
	var column,
		index, len,
		maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, params.items.length);
	for (index = 0, len = params.items.length; index < len; index += 1) {
		var treeItem = params.items[index];
		var treeItemId = treeItem.id;
		var treeItemPosition = data.treeItemsPositions[treeItemId];

		var horizontalPadding = options.intervals[treeItemPosition.actualVisibility] / 2;
		treeItemPosition.leftPadding = horizontalPadding;
		treeItemPosition.rightPadding = horizontalPadding;

		var columnIndex = index % maximumColumns;
		column = data.columns[columnIndex];
		if (column == null) {
			column = new this.Column();
			data.columns[columnIndex] = column;
		}
		var itemWidth = treeItemPosition.leftPadding + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;
		column.depth = Math.max(column.depth, itemWidth);
	}

	var arrowTipLength = options.linesWidth * 8;


	var offset = 0;
	for (index = 0, len = data.columns.length; index < len; index += 1) {
		column = data.columns[index];


		if (index % 2 == 0) {
			switch (options.arrowsDirection) {
				case 1/*primitives.common.GroupByType.Parents*/:
					column.leftPadding = params.hideChildrenConnection ? 0 : arrowTipLength;
					column.rightPadding = 0;
					break;
				case 2/*primitives.common.GroupByType.Children*/:
					column.leftPadding = 0;
					column.rightPadding = params.hideParentConnection ? 0 : arrowTipLength;
					break;
			}
		} else {
			switch (options.arrowsDirection) {
				case 1/*primitives.common.GroupByType.Parents*/:
					column.leftPadding = 0;
					column.rightPadding = params.hideChildrenConnection ? 0 : arrowTipLength;
					break;
				case 2/*primitives.common.GroupByType.Children*/:
					column.leftPadding = params.hideParentConnection ? 0 : arrowTipLength;
					column.rightPadding = 0;
					break;
			}
		}

		column.offset = offset + column.leftPadding + column.depth / 2;

		offset = column.offset + column.depth / 2 + column.rightPadding;
	}
};

primitives.famdiagram.MatrixLayout.prototype.measureRows = function (data, params, options) {
	var index, len,
		row,
		maximumColumns = this.getMatrixWidth(options.maximumColumnsInMatrix, params.items.length);
	for (index = 0, len = params.items.length; index < len; index += 1) {
		var treeItem = params.items[index];
		var treeItemId = treeItem.id;
		var treeItemPosition = data.treeItemsPositions[treeItemId];

		var rowIndex = Math.floor(index / maximumColumns);
		var verticalPadding = options.shifts[treeItemPosition.actualVisibility] / 2;

		row = data.rows[rowIndex];
		if (row == null) {
			row = new this.Row();
			data.rows[rowIndex] = row;
		}
		row.depth = Math.max(row.depth, verticalPadding + treeItemPosition.actualSize.height + verticalPadding);

		switch (treeItemPosition.actualVisibility) {
			case 2/*primitives.common.Visibility.Dot*/:
			case 3/*primitives.common.Visibility.Line*/:
			case 4/*primitives.common.Visibility.Invisible*/:
				row.dotsDepth = !row.dotsDepth ? treeItemPosition.actualSize.height : Math.min(row.dotsDepth, treeItemPosition.actualSize.height);
				break;
			default:
				row.minimalDepth = !row.minimalDepth ? treeItemPosition.actualSize.height : Math.min(row.minimalDepth, treeItemPosition.actualSize.height);
				break;
		}
	}

	var offset = 0;
	for (index = 0, len = data.rows.length; index < len; index += 1) {
		row = data.rows[index];

		row.offset = offset + row.depth / 2;
		offset = row.offset + row.depth / 2;

		if (row.minimalDepth == null) {
			row.minimalDepth = row.depth;
		}
		if (row.dotsDepth != null && row.dotsDepth > row.minimalDepth) {
			row.minimalDepth = row.dotsDepth;
		}

		switch (options.verticalAlignment) {
			case 0/*primitives.common.VerticalAlignmentType.Top*/:
				row.horizontalConnectorsDepth = row.minimalDepth / 2.0;
				break;
			case 1/*primitives.common.VerticalAlignmentType.Middle*/:
				row.horizontalConnectorsDepth = row.depth / 2.0;
				break;
			case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
				row.horizontalConnectorsDepth = row.depth - row.minimalDepth / 2.0;
				break;
		}
	}
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutSize = function (data) {
	return new primitives.common.Rect(0, 0, Math.round(this.getLayoutWidth(data)), Math.round(this.getLayoutHeight(data)));
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutWidth = function (data) {
	var result = 0,
		length = data.columns.length;
	if (length > 0) {
		var lastColumn = data.columns[length - 1];
		result = lastColumn.offset + lastColumn.depth / 2 + lastColumn.rightPadding;
	}
	return result;
};

primitives.famdiagram.MatrixLayout.prototype.getLayoutHeight = function (data) {
	var result = 0,
		length = data.rows.length;
	if (length > 0) {
		var lastRow = data.rows[length - 1];
		result = lastRow.offset + lastRow.depth / 2;
	}
	return result;
};

primitives.famdiagram.MatrixLayout.prototype.arrange = function (thisArg, parentPosition, onItemPositioned) {
	if (onItemPositioned != null) {
		var maximumColumns = this.getMatrixWidth(this.options.maximumColumnsInMatrix, this.params.items.length);
		for (var index = 0, len = this.params.items.length; index < len; index += 1) {
			var treeItem = this.params.items[index],
				treeItemId = treeItem.id;

			var columnIndex = index % maximumColumns;
			var column = this.data.columns[columnIndex];

			var rowIndex = Math.floor(index / maximumColumns);
			var row = this.data.rows[rowIndex];

			var treeItemPosition = this.data.treeItemsPositions[treeItemId];

			var actualPosition = this.getItemPosition(treeItemPosition.actualVisibility, column, row, treeItemPosition.actualSize, this.options);
			actualPosition.translate(parentPosition.x, parentPosition.y);

			treeItemPosition.actualPosition = actualPosition;
			treeItemPosition.horizontalConnectorsShift = parentPosition.y + row.offset - row.depth / 2 + row.horizontalConnectorsDepth,
			treeItemPosition.leftMedianOffset = column.depth / 2 + column.leftPadding;
			treeItemPosition.rightMedianOffset = column.depth / 2 + column.rightPadding;
			treeItemPosition.topConnectorShift = row.depth / 2;
			treeItemPosition.bottomConnectorShift = row.depth / 2;

			onItemPositioned.call(thisArg, treeItemId, treeItemPosition);
		}
	}
};

primitives.famdiagram.MatrixLayout.prototype.getItemPosition = function (visibility, column, row, size, options) {
	var itemShift = 0;

	switch (visibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			switch (options.verticalAlignment) {
				case 0/*primitives.common.VerticalAlignmentType.Top*/:
					itemShift = 0;
					break;
				case 1/*primitives.common.VerticalAlignmentType.Middle*/:
					itemShift = (row.depth - size.height) / 2.0;
					break;
				case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
					itemShift = row.depth - size.height;
					break;
			}
			break;
		case 2/*primitives.common.Visibility.Dot*/:
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			itemShift = row.horizontalConnectorsDepth - size.height / 2.0;
			break;
	}

	return new primitives.common.Rect(column.offset - size.width / 2, row.offset - row.depth / 2 + itemShift, size.width, size.height);
};

/* /Controls/FamDiagram/Tasks/Transformations/Selection/CursorNeighboursTask.js*/
primitives.famdiagram.CursorNeighboursTask = function (cursorItemTask, neighboursSelectionModeOptionTask, navigationFamilyTask, activeItemsTask) {
	var _data = {
		items: []
	},
	_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ValueReader(["string", "number"], true),
			true
		);

	function process() {
		var context = {
				isChanged: false,
				hash: _hash
			},
			cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
			navigationFamily = navigationFamilyTask.getNavigationFamily(),
			neighboursSelectionMode = neighboursSelectionModeOptionTask.getNeighboursSelectionMode(),
			activeItems = activeItemsTask.getActiveItems();

		_data.items = _dataTemplate.read(_data.items, getCursorNeighbours(cursorTreeItemId, neighboursSelectionMode, navigationFamily, activeItems), "items", context);

		return context.isChanged;
	}

	function getCursorNeighbours(cursorTreeItemId, neighboursSelectionMode, navigationFamily, activeItems) {
		var result = [],
			processed = {},
			treeItem;
		if (cursorTreeItemId !== null) {
			switch (neighboursSelectionMode) {
				case 0/*primitives.common.NeighboursSelectionMode.ParentsAndChildren*/:
					navigationFamily.loopParents(this, cursorTreeItemId, function (itemid, orgItem) {
						if (!processed.hasOwnProperty(itemid)) {
							processed[itemid] = true;
							result.push(itemid);
						}
						if (activeItems.hasOwnProperty(itemid)) {
							return navigationFamily.SKIP;
						}
					});
					navigationFamily.loopChildren(this, cursorTreeItemId, function (itemid, orgItem) {
						if (!processed.hasOwnProperty(itemid)) {
							processed[itemid] = true;
							result.push(itemid);
						}
						if (activeItems.hasOwnProperty(itemid)) {
							return navigationFamily.SKIP;
						}
					});
					break;
				case 1/*primitives.common.NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses*/:
					navigationFamily.loopNeighbours(this, cursorTreeItemId, function (itemid, orgItem) {
						if (!processed.hasOwnProperty(itemid)) {
							processed[itemid] = true;
							result.push(itemid);
						}
						if (activeItems.hasOwnProperty(itemid)) {
							return true;
						}
					});
					break;
			}
		}
		return result;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/AddLabelAnnotationsTask.js*/
primitives.famdiagram.AddLabelAnnotationsTask = function (labelAnnotationPlacementOptionTask, logicalFamilyTask) {
	var _data = {
		logicalFamily: null,
		maximumId: null
	},
	_defaultLabelAnnotationTemplateName;

	function process(debug) {
		var index, len,
			itemConfig,
			logicalFamily = logicalFamilyTask.getLogicalFamily(),
			annotations = labelAnnotationPlacementOptionTask.getAnnotations();

		logicalFamily = logicalFamily.clone();

		addLabelAnnotations(logicalFamily, annotations);

		_data.logicalFamily = logicalFamily;

		_data.maximumId = labelAnnotationPlacementOptionTask.getMaximumId();

		if (debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}

		return true;
	}

	function addLabelAnnotations(logicalFamily, annotations) {
		var edges = primitives.common.graph(), /* edge item is new primitives.famdiagram.EdgeItem(fromItem, toItem); */
			configsHash = {},
			configs, config,
			fromItem,
			index, len;

		if (annotations.length > 0) {
			/* group annotations by from item */
			for (index = 0, len = annotations.length; index < len; index += 1) {
				config = annotations[index];
				if (!configsHash.hasOwnProperty(config.fromItem)) {
					configsHash[config.fromItem] = [config];

					/* create edges hash for item */
					logicalFamily.loopChildren(this, config.fromItem, function (childid, child, level) {
						edges.addEdge(config.fromItem, childid, new primitives.famdiagram.EdgeItem(config.fromItem, config.fromItem, childid, childid));
						return logicalFamily.SKIP;
					});//ignore jslint
					logicalFamily.loopParents(this, config.fromItem, function (parentid, parent, level) {
						edges.addEdge(parentid, config.fromItem, new primitives.famdiagram.EdgeItem(parentid, parentid, config.fromItem, config.fromItem));
						return logicalFamily.SKIP;
					});//ignore jslint

				} else {
					configsHash[config.fromItem].push(config);
				}
			}

			for (fromItem in configsHash) {
				if (configsHash.hasOwnProperty(fromItem)) {
					configs = configsHash[fromItem];

					/* process annotations having greater number of references first */
					configs.sort(function (a, b) {
						return b.toItems.length - a.toItems.length;
					}); //ignore jslint


					for (index = 0; index < configs.length; index += 1) {
						config = configs[index];

						addLabelAnnotation(logicalFamily, edges, config.fromItem, config.toItems, function () {
							/* add label annotation as new diagram family item */
							return new primitives.famdiagram.FamilyItem({
								id: config.id,
								isVisible: true,
								isLevelNeutral: true,
								isActive: false,
								itemConfig: config
							});
						}); //ignore jslint
					}
				}
			}
		}
	}

	function addLabelAnnotation(logicalFamily, edges, fromItem, toItems, onCreate) {
		var edge,
			isValid = true,
			commonParentId = null,
			toItem,
			index, len,
			bundleItem,
			bundleItems = [];

		for (index = 0, len = toItems.length; index < len; index += 1) {
			toItem = toItems[index];

			edge = edges.edge(fromItem, toItem);
			if (edge != null) {
				if (commonParentId == null) {
					commonParentId = edge.getFar(toItem);
				} else {
					if (commonParentId != edge.getFar(toItem)) {
						isValid = false;
						break;
					}
				}
				bundleItems.push(edge.getNear(toItem));
			} else {
				isValid = false;
				break;
			}
		}

		if (isValid) {
			bundleItem = onCreate();
			if (logicalFamily.bundleParents(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
				bundleItem.levelGravity = 2/*primitives.common.GroupByType.Children*/;
				isValid = true;
			} else if (logicalFamily.bundleChildren(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
				bundleItem.levelGravity = 1/*primitives.common.GroupByType.Parents*/;
				isValid = true;
			} else if (logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
				bundleItem.levelGravity = 2/*primitives.common.GroupByType.Children*/;
				isValid = true;
			} else if (logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
				bundleItem.levelGravity = 1/*primitives.common.GroupByType.Parents*/;
				isValid = true;
			}

			if (isValid) {
				for (index = 0, len = toItems.length; index < len; index += 1) {
					toItem = toItems[index];

					edge = edges.edge(fromItem, toItem);
					edge.setFar(toItem, bundleItem.id);
				}
			}
		}
	}

	function getNavigationFamily() {
		return _data.logicalFamily;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getNavigationFamily: getNavigationFamily,
		getMaximumId: getMaximumId
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/AddSpousesTask.js*/
primitives.famdiagram.AddSpousesTask = function (spousesOptionTask, removeLoopsTask) {
	var _data = {
		logicalFamily: null,
		maximumId: null
	};

	function process(debug) {
		var logicalFamily = removeLoopsTask.getLogicalFamily(),
			maximumId = removeLoopsTask.getMaximumId(),
			items = spousesOptionTask.getItems();

		logicalFamily = logicalFamily.clone();

		maximumId = addFakeChildrenForSpouses(logicalFamily, items, maximumId, debug);

		_data.logicalFamily = logicalFamily;
		_data.maximumId = maximumId;

		if (debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}
		return true;
	}

	function addFakeChildrenForSpouses(logicalFamily, items, maximumId, debug) {
		var couple, fakeChild,
			index, len,
			itemConfig,
			spouseIndex, spouseLen,
			spouses;
		for (index = 0, len = items.length; index < len; index += 1) {
			itemConfig = items[index];
			spouses = itemConfig.spouses.slice(0);
			for (spouseIndex = 0, spouseLen = spouses.length; spouseIndex < spouseLen; spouseIndex += 1) {
				couple = [itemConfig.id, spouses[spouseIndex]];
				if (!logicalFamily.hasCommonChild(couple)) {

					/* create fake child item to keep spouses together */
					maximumId += 1;

					fakeChild = new primitives.famdiagram.FamilyItem({
						id: maximumId,
						isVisible: false,
						isActive: false,
						isLevelNeutral: true,
						hideParentConnection: true,
						hideChildrenConnection: true,
						itemConfig: { title: "fake child #" + maximumId, description: "This is fake child keeps spouses together." },
						levelGravity: 1/*primitives.common.GroupByType.Parents*/
					});

					logicalFamily.add(couple, fakeChild.id, fakeChild);
				}
			}
		}
		return maximumId;
	}

	function getLogicalFamily() {
		return _data.logicalFamily;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getLogicalFamily: getLogicalFamily,
		getMaximumId: getMaximumId
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/ItemsPositionsTask.js*/
primitives.famdiagram.ItemsPositionsTask = function (currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask,
	normalizeOptionTask, normalizeLogicalFamilyTask,
	itemTemplateParamsTask,
	cursorItemTask, combinedNormalVisibilityItemsTask) {

	var _data = {
		treeItemsPositions: {}, // primitives.orgdiagram.TreeItemPosition();
		panelSize: null // primitives.common.Rect();
	};

	function process() {
		var itemsSizesOptions = itemsSizesOptionTask.getOptions();
		var connectorsOptions = connectorsOptionTask.getOptions();
		var normalizationOptions = normalizeOptionTask.getOptions();

		var params = {
			logicalFamily: normalizeLogicalFamilyTask.getLogicalFamily(),
			treeLevels: normalizeLogicalFamilyTask.getTreeLevels(),
			getConnectorsStacksSizes: normalizeLogicalFamilyTask.getConnectorsStacksSizes,
			isItemSelected: combinedNormalVisibilityItemsTask.isItemSelected,
			cursorItemId: cursorItemTask.getCursorTreeItem(),
			getTemplateParams: itemTemplateParamsTask.getTemplateParams
		};

		var options = {
			verticalAlignment: itemsSizesOptions.verticalAlignment,
			pageFitMode: itemsSizesOptions.pageFitMode,
			minimalVisibility: itemsSizesOptions.minimalVisibility,
			normalLevelShift: itemsSizesOptions.normalLevelShift,
			dotLevelShift: itemsSizesOptions.dotLevelShift,
			lineLevelShift: itemsSizesOptions.lineLevelShift,
			normalItemsInterval: itemsSizesOptions.normalItemsInterval,
			dotItemsInterval: itemsSizesOptions.dotItemsInterval,
			lineItemsInterval: itemsSizesOptions.lineItemsInterval,
			orientationType: orientationOptionTask.getOptions().orientationType,
			arrowsDirection: connectorsOptions.arrowsDirection, 
			linesWidth: connectorsOptions.linesWidth,
			checkBoxPanelSize: itemsSizesOptions.checkBoxPanelSize,
			buttonsPanelSize: itemsSizesOptions.buttonsPanelSize,
			groupTitlePanelSize: itemsSizesOptions.groupTitlePanelSize,
			groupTitlePlacementType: itemsSizesOptions.groupTitlePlacementType,
			maximumColumnsInMatrix: normalizationOptions.maximumColumnsInMatrix
		};

		/* calculate panel size */
		var panelSize = currentControlSizeTask.getOptimalPanelSize();
		var scale = scaleOptionTask.getOptions().scale;
		panelSize.scale(1.0 / scale);
		var panelRect = new primitives.common.Rect(0, 0, panelSize.width, panelSize.height);

		var layout = new primitives.famdiagram.FamilyLayout(params, options);
		var matrixes = normalizeLogicalFamilyTask.getMatrixes();
		for (var key in matrixes) {
			if (matrixes.hasOwnProperty(key)) {
				var layoutItem = params.logicalFamily.node(key);
				layout.add(key, new primitives.famdiagram.MatrixLayout({
					items: matrixes[key],
					isItemSelected: params.isItemSelected,
					cursorItemId: params.cursorItemId,
					getTemplateParams: params.getTemplateParams,
					hideParentConnection: layoutItem.hideParentConnection,
					hideChildrenConnection: layoutItem.hideChildrenConnection
				}, options));
			}
		}
		/* calculate items placement */
		_data.panelSize = layout.measure(panelRect);
		_data.treeItemsPositions = {};
		layout.arrange(this, function (treeItemId, treeItemPosition) {
			_data.treeItemsPositions[treeItemId] = treeItemPosition;
		});
		return true;
	}

	function addMatrixLayouts(parent, matrixes, options) {

	}

	function getItemPosition(itemid) {
		return _data.treeItemsPositions[itemid];
	}

	function getItemsPositions() {
		return _data.treeItemsPositions;
	}

	function getContentSize() {
		return _data.panelSize;
	}

	return {
		process: process,
		getItemsPositions: getItemsPositions,
		getItemPosition: getItemPosition,
		getContentSize: getContentSize
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/LevelsTask.js*/
primitives.famdiagram.LevelsTask = function (normalizeLogicalFamilyTask, defaultItemConfig) {
	var _data = {
		maximumId: null, /* maximum of OrgItem.id */
		treeLevels: null, /* primitives.common.TreeLevels */
		bundles: null, /* array of primitives.common.BaseConnectorBundle objects */
		connectorStacks: null /* array of primitives.orgdiagram.TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
	},
	_familyBalance = new primitives.famdiagram.FamilyBalance(),
	_nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

	function process() {
		var params = {
			logicalFamily: normalizeLogicalFamilyTask.getLogicalFamily(),
			maximumId: normalizeLogicalFamilyTask.getMaximumId(),
			defaultItemConfig: defaultItemConfig
		};

		_data = _familyBalance.balance(params);

		return true;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	function getTreeLevels() {
		return _data.treeLevels;
	}

	function getBundles() {
		return _data.bundles;
	}

	function getConnectorsStacksSizes(levelid) {
		return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
	}

	return {
		process: process,

		getMaximumId: getMaximumId,
		getTreeLevels: getTreeLevels,
		getBundles: getBundles,
		getConnectorsStacksSizes: getConnectorsStacksSizes
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/LogicalFamilyTask.js*/
primitives.famdiagram.LogicalFamilyTask = function (itemsOptionTask) {
	var _data = {
		logicalFamily: null,
		maximumId: null
	};

	function process(debug) {
		var index, len,
			itemConfig, famItem,
			items = itemsOptionTask.getItems(),
			logicalFamily = primitives.common.family(), /*family contains primitives.famdiagram.ItemConfig */
			maximumId = 0,
			parsedId;

		if (items.length > 0) {
			for (index = 0, len = items.length; index < len; index += 1) {
				itemConfig = items[index];

				if (itemConfig != null) {
					famItem = new primitives.famdiagram.FamilyItem({
						id: itemConfig.id,
						itemConfig: itemConfig,
						isActive: itemConfig.isActive
					});

					logicalFamily.add(itemConfig.parents, famItem.id, famItem);

					parsedId = parseInt(itemConfig.id, 10);
					maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);
				}
			}
		}

		_data.logicalFamily = logicalFamily;
		_data.maximumId = maximumId;

		if (debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}

		return true;
	}

	function getLogicalFamily() {
		return _data.logicalFamily;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getLogicalFamily: getLogicalFamily,
		getMaximumId: getMaximumId
	};
};

/* /Controls/FamDiagram/Tasks/Transformations/NormalizeLogicalFamilyTask.js*/
/*	1. Topologically sort _logicalFamily items and assign levels.
	2. Optimize references. Transform M:N relations to M:1:N where it is possible.
	3. Eliminate Many to Many relations. Logical family consists of 1:M and M:1 relations only.
	4. Resort items, so original visible items stay at the same level.
	5. Fill in missed items between levels. So that way we have invisible items between parent/child family items if they have gap between levels.
		Such invisible family items have isVisible option set to false.
*/
primitives.famdiagram.NormalizeLogicalFamilyTask = function (normalizeOptionTask, addSpousesTask, defaultItemConfig) {
	var _data = {
		maximumId: null, /* maximum of OrgItem.id */
		logicalFamily: null,
		matrixes: {},
		nestedLayoutBottomConnectorIds: {},
		treeLevels: null, /* primitives.common.TreeLevels */
		bundles: null, /* array of primitives.common.BaseConnectorBundle objects */
		connectorStacks: null /* array of primitives.orgdiagram.TreeLevelConnectorStackSize objects, it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
	},
	_familyBalance = new primitives.famdiagram.FamilyBalance(),
	_familyNormalizer = new primitives.famdiagram.FamilyNormalizer(false),
	_familyMatrixesExtractor = new primitives.famdiagram.FamilyMatrixesExtractor(false),
	_nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

	function process(debug) {
		var logicalFamily = addSpousesTask.getLogicalFamily(),
			maximumId = addSpousesTask.getMaximumId(),
			matrixes = {},
			nestedLayoutBottomConnectorIds = {},
			bundles = [];

		var normalizeOptions = normalizeOptionTask.getOptions();

		var options = {
			hideGrandParentsConnectors: normalizeOptions.hideGrandParentsConnectors,
			groupByType: normalizeOptions.groupByType,
			alignBylevels: normalizeOptions.alignBylevels,
			enableMatrixLayout: normalizeOptions.enableMatrixLayout,
			minimumMatrixSize: normalizeOptions.minimumMatrixSize,
			maximumColumnsInMatrix: normalizeOptions.maximumColumnsInMatrix
		};

		if (options.hideGrandParentsConnectors == true) {
			/* optionally eliminate grand parents connectors */
			logicalFamily = logicalFamily.getFamilyWithoutGrandParentsRelations();
		} else {
			logicalFamily = logicalFamily.clone();
		}
		
		maximumId = _familyNormalizer.normalize(options, logicalFamily, maximumId);
		maximumId = _familyMatrixesExtractor.extract(options, logicalFamily, matrixes, nestedLayoutBottomConnectorIds, bundles, maximumId);

		_data.logicalFamily = logicalFamily;
		_data.matrixes = matrixes;
		_data.nestedLayoutBottomConnectorIds = nestedLayoutBottomConnectorIds;
		_data.bundles = bundles;

		var balanceParams = {
			logicalFamily: logicalFamily,
			maximumId: maximumId,
			defaultItemConfig: defaultItemConfig
		};

		var balanceResult = _familyBalance.balance(balanceParams);

		_data.maximumId = balanceResult.maximumId;
		_data.treeLevels = balanceResult.treeLevels;
		_data.bundles = _data.bundles.concat(balanceResult.bundles);
		_data.connectorStacks = balanceResult.connectorStacks;

		return true;
	}

	function getLogicalFamily() {
		return _data.logicalFamily;
	}

	function getMatrixes() {
		return _data.matrixes;
	}

	function getNestedLayoutBottomConnectorIds() {
		return _data.nestedLayoutBottomConnectorIds;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	function getTreeLevels() {
		return _data.treeLevels;
	}

	function getBundles() {
		return _data.bundles;
	}

	function getConnectorsStacksSizes(levelid) {
		return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
	}

	return {
		process: process,
		getLogicalFamily: getLogicalFamily,
		getMatrixes: getMatrixes,
		getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds,
		getMaximumId: getMaximumId,
		getTreeLevels: getTreeLevels,
		getBundles: getBundles,
		getConnectorsStacksSizes: getConnectorsStacksSizes
	};
};


/* /Controls/FamDiagram/Tasks/Transformations/RemoveLoopsTask.js*/
primitives.famdiagram.RemoveLoopsTask = function (itemsOptionTask, addLabelAnnotationsTask) {
	var _data = {
		logicalFamily: null,
		maximumId: null
	};

	function process(debug) {
		var logicalFamily = addLabelAnnotationsTask.getNavigationFamily(),
			maximumId = addLabelAnnotationsTask.getMaximumId(),
			items = itemsOptionTask.getItems();

		logicalFamily = logicalFamily.clone();

		maximumId = removeLoops(items, logicalFamily, maximumId, debug);

		_data.logicalFamily = logicalFamily;
		_data.maximumId = maximumId;

		if (debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}

		return true;
	}

	function removeLoops(items, logicalFamily, maximumId, debug) {
		var tempFamily, fakeChild, fakeParent,
			index, len,
			index2, len2,
			nodesToRemove,
			parents,
			userItem;

		tempFamily = logicalFamily.clone();
		logicalFamily.loopTopo(this, function (itemid, item, levelIndex) {
			tempFamily.removeNode(itemid);
		});

		if (tempFamily.hasNodes()) {
			/* remove parents of the first remaining item in user order*/
			for (index = 0, len = items.length; index < len; index += 1) {
				userItem = items[index];

				if (tempFamily.node(userItem.id) != null) {

					parents = [];
					tempFamily.loopParents(this, userItem.id, function (parentid, parent, level) {
						parents.push(parentid);
						return tempFamily.SKIP;
					}); //ignore jslint

					for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
						/* remove relation in temp structure */
						tempFamily.removeRelation(parents[index2], userItem.id);

						/* reverse relation in actual structure*/
						logicalFamily.removeRelation(parents[index2], userItem.id);
					}

					/* create fake parent and child items to loop item to its parent */
					maximumId += 1;

					/* add fake parent */
					fakeParent = new primitives.famdiagram.FamilyItem({
						id: maximumId,
						isVisible: false,
						isActive: true,
						isLevelNeutral: true,
						hideParentConnection: true,
						hideChildrenConnection: true,
						itemConfig: { title: "fake parent #" + maximumId, description: "This is fake parent item was created by loops reversal." }
					});

					logicalFamily.add([], fakeParent.id, fakeParent);
					logicalFamily.adopt([fakeParent.id], userItem.id);

					for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
						maximumId += 1;

						/* add fake child */
						fakeChild = new primitives.famdiagram.FamilyItem({
							id: maximumId,
							isVisible: false,
							isActive: true,
							isLevelNeutral: true,
							hideParentConnection: true,
							hideChildrenConnection: true,
							itemConfig: { title: "fake child #" + maximumId, description: "This is fake child item was created by loops reversal." }
						});

						logicalFamily.add([fakeParent.id, parents[index2]], fakeChild.id, fakeChild);
					}


					/* loop is broken, so continue items removable in topological order */
					nodesToRemove = [];
					tempFamily.loopTopo(this, function (itemid, item, levelIndex) {
						nodesToRemove.push(itemid);
					}); //ignore jslint
					for (index2 = 0, len2 = nodesToRemove.length; index2 < len2; index2 += 1) {
						tempFamily.removeNode(nodesToRemove[index2]);
					}
				}
			}
		}
		return maximumId;
	}

	function getLogicalFamily() {
		return _data.logicalFamily;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getLogicalFamily: getLogicalFamily,
		getMaximumId: getMaximumId
	};
};

/* /Controls/FamDiagram/Templates/LabelAnnotationTemplate.js*/
primitives.common.LabelAnnotationTemplate = function () {
	var _template = ["div",
		{
			"class": ["bp-item", "bp-label-annotation"]
		}
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultLabelAnnotationTemplate";
	}

	function render(event, data) {
		var itemConfig = data.context;
		data.element.innerHTML = itemConfig.title;
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/FamDiagram/Control.js*/
/*
	Class: primitives.famdiagram.Control
	Constructs Family Diagram Control. 
	
	Parameters:
	element - reference to DOM element which is used as new control placeholder. 
		Control renders diagram content inside of that DIV placeholder and  adds events listeners.
	options - reference to primitives.famdiagram.Config class instance.

	Returns: 
	reference to new instance of the control. Control adds event listeners bound to its contents, so if you need to remove it from DOM call destroy() method on the control's instance.
*/
primitives.famdiagram.Control = function (element, options) {
	return primitives.orgdiagram.BaseControl(element, options, primitives.famdiagram.TaskManagerFactory, primitives.famdiagram.EventArgsFactory, {
		AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
		ButtonsTemplate: primitives.common.ButtonsTemplate,
		CheckBoxTemplate: primitives.common.CheckBoxTemplate,
		CursorTemplate: primitives.common.CursorTemplate,
		DotHighlightTemplate: primitives.common.DotHighlightTemplate,
		GroupTitleTemplate: primitives.common.GroupTitleTemplate,
		HighlightTemplate: primitives.common.HighlightTemplate,
		ItemTemplate: primitives.common.ItemTemplate,
		UserTemplate: primitives.common.UserTemplate,
		/* famDiagram specific templates */
		LabelAnnotationTemplate: primitives.common.LabelAnnotationTemplate
	});
};


/* /Controls/FamDiagram/EventArgsFactory.js*/
primitives.famdiagram.EventArgsFactory = function (data, oldTreeItemId, newTreeItemId, name) {
	var result = new primitives.famdiagram.EventArgs(),
		combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
		alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
		logicalFamilyTask = data.tasks.getTask("LogicalFamilyTask"),
		oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
		newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
		family = logicalFamilyTask.getLogicalFamily(),
		itemPosition,
		offset,
		panelOffset;

	if (oldItemConfig && oldItemConfig.id != null) {
		result.oldContext = oldItemConfig;
	}

	if (newItemConfig && newItemConfig.id != null) {
		result.context = newItemConfig;

		family.loopParents(this, newItemConfig.id, function (itemid, item, levelIndex) {
			if (levelIndex > 0) {
				return family.BREAK;
			}
			result.parentItems.push(combinedContextsTask.getConfig(itemid));
		});

		family.loopChildren(this, newItemConfig.id, function (itemid, item, levelIndex) {
			if (levelIndex > 0) {
				return family.BREAK;
			}
			result.childrenItems.push(combinedContextsTask.getConfig(itemid));
		});

		panelOffset = primitives.common.getElementOffset(data.layout.mousePanel);
		offset = primitives.common.getElementOffset(data.layout.element);
		itemPosition = alignDiagramTask.getItemPosition(newTreeItemId);
		result.position = new primitives.common.Rect(itemPosition.actualPosition)
				.translate(panelOffset.left, panelOffset.top)
				.translate(-offset.left, -offset.top);
	}

	if (name != null) {
		result.name = name;
	}

	return result;
};

/* /Controls/FamDiagram/getProcessDiagramConfig.js*/
primitives.famdiagram.getProcessDiagramConfig = function () {
	var dummyFunction = function () { };
	var tasks = primitives.famdiagram.TaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
	return tasks.getProcessDiagramConfig();
};

/* /Controls/FamDiagram/TaskManagerFactory.js*/
primitives.famdiagram.TaskManagerFactory = function (getOptions, getGraphics, getLayout, templates) {
	var tasks = new primitives.common.TaskManager();

	// Dependencies
	tasks.addDependency('options', getOptions);
	tasks.addDependency('graphics', getGraphics);
	tasks.addDependency('layout', getLayout);
	tasks.addDependency('templates', templates);

	tasks.addDependency('defaultConfig', new primitives.famdiagram.Config());
	tasks.addDependency('defaultItemConfig', new primitives.famdiagram.ItemConfig());
	tasks.addDependency('defaultTemplateConfig', new primitives.famdiagram.TemplateConfig());
	tasks.addDependency('defaultButtonConfig', new primitives.famdiagram.ButtonConfig());
	tasks.addDependency('defaultPaletteItemConfig', new primitives.famdiagram.PaletteItemConfig());

	tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.famdiagram.BackgroundAnnotationConfig());
	tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.famdiagram.ConnectorAnnotationConfig());
	tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.famdiagram.HighlightPathAnnotationConfig());
	tasks.addDependency('defaultShapeAnnotationConfig', new primitives.famdiagram.ShapeAnnotationConfig());
	tasks.addDependency('defaultLabelAnnotationConfig', new primitives.famdiagram.LabelAnnotationConfig());

	tasks.addDependency('isFamilyChartMode', true);/* in regular org diagram we hide branch if it contains only invisible nodes, 
		in the family chart we use invisible items to draw connectors across multiple levels */
	tasks.addDependency('showElbowDots', true);/* in regular org chart we don;t have situations when connector lines cross, but we have such situations in 
		family tree so we need extra visual attribute to distinguish intersections betwen connectors */
	tasks.addDependency('null', null);
	tasks.addDependency('foreground', 2/*primitives.common.ZOrderType.Foreground*/);
	tasks.addDependency('background', 1/*primitives.common.ZOrderType.Background*/);

	// Options
	tasks.addTask('OptionsTask', ['options'], primitives.famdiagram.OptionsTask, "#000000"/*primitives.common.Colors.Black*/);

	// Layout
	tasks.addTask('CurrentControlSizeTask', ['layout', 'OptionsTask', 'ItemsSizesOptionTask'], primitives.orgdiagram.CurrentControlSizeTask, "#000000"/*primitives.common.Colors.Black*/);
	tasks.addTask('CurrentScrollPositionTask', ['layout', 'OptionsTask'], primitives.orgdiagram.CurrentScrollPositionTask, "#000000"/*primitives.common.Colors.Black*/);

	tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.ItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsContentOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('SpousesOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.SpousesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.LabelsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('VisualTreeOptionTask', ['OptionsTask'], primitives.famdiagram.VisualTreeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.MinimizedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('NormalizeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NormalizeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('LinePaletteOptionTask', ['OptionsTask', 'defaultPaletteItemConfig'], primitives.famdiagram.LinePaletteOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorSelectionPathModeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('NeighboursSelectionModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NeighboursSelectionModeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	// Transformations
	tasks.addTask('LogicalFamilyTask', ['ItemsOptionTask'], primitives.famdiagram.LogicalFamilyTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('LabelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'LogicalFamilyTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('LabelAnnotationTemplateOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationTemplateOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('LabelAnnotationPlacementOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationPlacementOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask', 'LabelAnnotationOptionTask'], primitives.orgdiagram.CombinedContextsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('AddLabelAnnotationsTask', ['LabelAnnotationPlacementOptionTask', 'LogicalFamilyTask'], primitives.famdiagram.AddLabelAnnotationsTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('RemoveLoopsTask', ['ItemsOptionTask', 'AddLabelAnnotationsTask'], primitives.famdiagram.RemoveLoopsTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('AddSpousesTask', ['SpousesOptionTask', 'RemoveLoopsTask'], primitives.famdiagram.AddSpousesTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('NormalizeLogicalFamilyTask', ['NormalizeOptionTask', 'AddSpousesTask', 'defaultItemConfig'], primitives.famdiagram.NormalizeLogicalFamilyTask, "#ff0000"/*primitives.common.Colors.Red*/);

	// Transformations / Templates
	tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.orgdiagram.ReadTemplatesTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ActiveItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('LabelAnnotationTemplateParamsTask', ['ItemsSizesOptionTask', 'LabelAnnotationTemplateOptionTask', 'ReadTemplatesTask'], primitives.famdiagram.LabelAnnotationTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CombinedTemplateParamsTask', ['ItemTemplateParamsTask', 'LabelAnnotationTemplateParamsTask'], primitives.famdiagram.CombinedTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.orgdiagram.GroupTitleTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.orgdiagram.CheckBoxTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.ButtonsTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.orgdiagram.AnnotationLabelTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'NormalizeLogicalFamilyTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Transformations/Selections
	tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.HighlightItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.CursorItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'NeighboursSelectionModeOptionTask', 'AddLabelAnnotationsTask', 'ActiveItemsTask'], primitives.famdiagram.CursorNeighboursTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('SelectionPathItemsTask', ['AddLabelAnnotationsTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], primitives.orgdiagram.SelectionPathItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('NormalVisibilityItemsByForegroundShapeAnnotationTask', ['ForegroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundShapeAnnotationTask', ['BackgroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundAnnotationTask', ['BackgroundAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByForegroundHighlightPathAnnotationTask', ['ForegroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask', ['BackgroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByForegroundConnectorAnnotationTask', ['ForegroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundConnectorAnnotationTask', ['BackgroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CombinedNormalVisibilityItemsTask', [
		'ItemsSizesOptionTask',
		'CursorItemTask',
		'CursorNeighboursTask',
		'SelectedItemsTask',
		'SelectionPathItemsTask',
		'NormalVisibilityItemsByForegroundShapeAnnotationTask',
		'NormalVisibilityItemsByBackgroundShapeAnnotationTask',
		'NormalVisibilityItemsByBackgroundAnnotationTask',
		'NormalVisibilityItemsByForegroundHighlightPathAnnotationTask',
		'NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask',
		'NormalVisibilityItemsByForegroundConnectorAnnotationTask',
		'NormalVisibilityItemsByBackgroundConnectorAnnotationTask'], primitives.orgdiagram.CombinedNormalVisibilityItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask',
		'NormalizeOptionTask', 'NormalizeLogicalFamilyTask',
		'CombinedTemplateParamsTask',
		'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.famdiagram.ItemsPositionsTask, "#ff0000"/*primitives.common.Colors.Red*/);

	tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CenterOnCursorTask', ['layout', 'CurrentControlSizeTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], primitives.orgdiagram.CenterOnCursorTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Managers
	tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'LinePaletteOptionTask'], primitives.orgdiagram.PaletteManagerTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Apply Layout Changes
	tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'layout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.ApplyLayoutChangesTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Renders
	tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'AddLabelAnnotationsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawCursorTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawHighlightAnnotationTask', ['layout', 'graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
		'ItemsSizesOptionTask',
		'CombinedContextsTask',
		'AlignDiagramTask', 'CenterOnCursorTask',
		'CombinedTemplateParamsTask',
		'CursorItemTask', 'SelectedItemsTask',
		'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
	], primitives.orgdiagram.DrawTreeItemsTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'CombinedTemplateParamsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawMinimizedItemsTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], primitives.orgdiagram.DrawConnectorsTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawItemLabelsTask, "#008000"/*primitives.common.Colors.Green*/);

	return tasks;
};


/* /Controls/OrgDiagram/Configs/TemplateConfig.js*/
/*
	Class: primitives.orgdiagram.TemplateConfig
		User defines item template class. It may optionaly define template for item, 
		custom cursor and highlight. If template is null then default template is used.

	See Also:
		<primitives.orgdiagram.Config.templates>
*/
primitives.orgdiagram.TemplateConfig = function () {
	/*
	Property: name
		Every template should have unique name. It is used as reference when 
		custom template is defined in <primitives.orgdiagram.ItemConfig.templateName>.
	*/
	this.name = null;

	/*
	Property: isActive
		If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
	this.isActive = true;

	/*
	Property: itemSize
	This is item size of type <primitives.common.Size>, templates should have 
	fixed size, so orgDiagram uses this value in order to layout items properly.
	*/
	this.itemSize = new primitives.common.Size(120, 100);

	/*
	Property: itemBorderWidth
		Item template border width.
	*/
	this.itemBorderWidth = 1;

	/*
	Property: itemTemplate
	Item template, if it is null then default item template is used. It supposed 
	to be div html element containing named elements inside for setting them 
	in <primitives.orgdiagram.Config.onItemRender> event.
	*/
	this.itemTemplate = null;

	/*
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.orgdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.orgdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.orgdiagram.ItemConfig.itemTitleColor>
			<primitives.orgdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			null
	*/
	this.minimizedItemShapeType = null;

	/*
	Property: minimizedItemSize
	This is size dot used to display item in minimized form, type of <primitives.common.Size>.
	*/
	this.minimizedItemSize = new primitives.common.Size(4, 4);

	/*
	Property: minimizedItemCornerRadius
	Set corner radias for dots in order to display them as squares having rounded corners.
	By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares.
	*/
	this.minimizedItemCornerRadius = null;

	/*
	Property: minimizedItemLineWidth
		Minimized item shape border width.
	*/
	this.minimizedItemLineWidth = 1;

	/*
	Property: minimizedItemBorderColor
		Minimized item line color. By default it is the same as <primitives.orgdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemBorderColor = null;

	/*
	Property: minimizedItemLineType
		Minimized item shape border line type.
	*/
	this.minimizedItemLineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: minimizedItemFillColor
		Minimized item fill color. By default it is the same as <primitives.orgdiagram.ItemConfig.itemTitleColor>
	*/
	this.minimizedItemFillColor = null;

	/*
	Property: minimizedItemOpacity
		Minimized item fill color opacity.
	*/
	this.minimizedItemOpacity = 1;

	/*
	Property: highlightPadding
	This padding around item defines relative size of highlight object, 
	its type is <primitives.common.Thickness>.
	*/
	this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

	/*
	Property: highlightBorderWidth
		Highlight border width.
	*/
	this.highlightBorderWidth = 1;

	/*
	Property: highlightTemplate
	Highlight template, if it is null then default highlight template is used. 
	It supposed to be div html element containing named elements inside for 
	setting them in <primitives.orgdiagram.Config.onHighlightRender> event.
	*/
	this.highlightTemplate = null;

	/*
	Property: cursorPadding
	This padding around item defines relative size of cursor object, 
	its type is <primitives.common.Thickness>.
	*/
	this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);

	/*
	Property: cursorBorderWidth
		Cursor border width.
	*/
	this.cursorBorderWidth = 2;

	/*
	Property: cursorTemplate
	Cursor template, if it is null then default cursor template is used. 
	It supposed to be div html element containing named elements inside 
	for setting them in <primitives.orgdiagram.Config.onCursorRender> event.
	*/
	this.cursorTemplate = null;

	/*
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every template. 
	
	See also:
		<primitives.orgdiagram.ButtonConfig>
	*/
	this.buttons = null;
};


/* /Controls/OrgDiagram/Configs/BackgroundAnnotationConfig.js*/
/*
	Class: primitives.orgdiagram.BackgroundAnnotationConfig
		Consider background annotation as another way to highlight some items in diagram.
		In order to use it you have to create instances of this class and populate annotation collection.
		Background annotation is drawn as rectangular area offset around annotated item. 
		If two items backgrounds overlap each other they are merged into one background area.
	See Also:
		<primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.BackgroundAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Background>

	See Also:
		<primitives.orgdiagram.Config.annotations>
		<primitives.orgdiagram.ConnectorAnnotationConfig>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 4/*primitives.common.AnnotationType.Background*/;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: includeChildren
		Include all descendants of every item in items collection. If you add root item then all chart items are going to be added to annotation.

	Default:
		false
	*/
	this.includeChildren = false;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Auto>
	*/
	this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;

	/*
	Property: offset
		Sets background offset around annotated item.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(18, 18, 18, 18);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: opacity
		Background color opacity. For applicable shapes only.
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		null
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 

	Default:
		null
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.orgdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/OrgDiagram/Configs/ButtonConfig.js*/
/*
	Class: primitives.orgdiagram.ButtonConfig
		Options class. Custom user button options class. 
		Buttons displayed on the right side of item. 
		See jQuery UI Button options description for details.
		In order to receive button click event make binding 
		to <primitives.orgdiagram.Config.onButtonClick>.
	
	See Also:
		<primitives.orgdiagram.Config.buttons>
*/
primitives.orgdiagram.ButtonConfig = function (name, icon, tooltip) {
	/*
	Property: name 
		It should be unique string name of the button. 
		It is needed to distinguish click events from different butons.
	*/
	this.name = name;

	/*
	Property: icon
	Name of icon used in jQuery UI.
	*/
	this.icon = icon;

	/*
	Property: text
	Whether to show any text -when set to false (display no text), 
	icon must be enabled, otherwise it'll be ignored.
	*/
	this.text = false;

	/*
	Property: label
	Text to show on the button.
	*/
	this.label = null;

	/*
	Property: tooltip
	Button tooltip content. Tooltip is based on jQuery UI tooltip widget, so it should be part of jQuery UI distribution in order to make this property work.
	*/
	this.tooltip = tooltip;

	/*
	Property: size
	Size of the button of type <primitives.common.Size>.
	*/
	this.size = new primitives.common.Size(16, 16);
};

/* /Controls/OrgDiagram/Configs/Config.js*/
/*
	Class: primitives.orgdiagram.Config
		jQuery orgDiagram Widget options class. Organizational chart configuration object.
	
*/
primitives.orgdiagram.Config = function (name) {
	this.name = (name !== undefined) ? name : "OrgDiagram";
	this.classPrefix = "orgdiagram";

	/*
		Property: navigationMode
			Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
			It has highlight for mouse over feedback and it has cursor for showing currently selected single node in diagram.
			In order to avoid creation of plus/minus buttons for children nodes folding and unfolding, 
			this functionality is done automatically for current cursor item. This is especially true for family diagram, 
			because it has no logical root, so cursor plays vital role for unfolding of nodes 
			and zooming into area of user interest in diagram.
			Use this option to disable highlight which does not make sense on touch devices or make control inactive completly.

		See Also:
			<primitives.common.NavigationMode>
		Default:
			<primitives.common.NavigationMode.Default>
	*/
	this.navigationMode = 0/*primitives.common.NavigationMode.Default*/;

	/*
		Property: graphicsType
			Preferable graphics type. If preferred graphics type 
			is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
	*/
	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	/*
		Property: pageFitMode
			Defines the way diagram is fit into page. By default chart minimize items when it has not enough space to fit all of them into screen. 
			Chart has its maximum size when all items shown in full size and  its minimal size when all items shown as dots. 
			It is equivalent of full zoom out of the chart items, dot size items are not readable, but such presentation of them 
			gives possibility to overview chart layout. So chart tryes to combine both presenation modes and keep chart as small 
			as possible in order to give user possibility to see big picture. Collapsed items provide ideal way for analitical reiew of 
			organizational diagram. If chart shown in its maximum size when all items are unfolded, it becomes impossible 
			to navigate betwen parents close to the root item. In such mode chart is usable only at bottom levels when children are close to their parents.
			If we try to navigate up to the root of hierarchy, gaps between parents sometimes as big as screen size. So in order to solve these 
			issues chart partially collapses hierarchy into dots and lines depending on this option.

		See also:
			<primitives.orgdiagram.Config.minimalVisibility>

		Default:
			<primitives.common.PageFitMode.FitToPage>
	*/
	this.pageFitMode = 3/*primitives.common.PageFitMode.FitToPage*/;

	/*
		Property: minimalVisibility
			Defines minimal allowed item form size for page fit mode. See description for pageFitMode.
	
		See also:
			<primitives.orgdiagram.Config.pageFitMode>

		Default:
			<primitives.common.Visibility.Dot>
	*/
	this.minimalVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
			Rotation to the right side is equivalent to left side placement 
			in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
	*/
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

	/*
		Property: horizontalAlignment
			Defines items horizontal alignment relative to their parent. 
			This is usefull for control localization for right-to-left countries.
		
		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.horizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;

	/*
	Property: verticalAlignment
		Defines items vertical alignment relative to each other within one level of hierarchy. 
		It does not affect levels having same size items.
	
	Default:
		<primitives.common.VerticalAlignmentType.Middle>
*/
	this.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

	/*
		Property: arrowsDirection
			Sets direction of connector lines arrows.

		Default:
			<primitives.common.GroupByType.None>
	*/
	this.arrowsDirection = 0/*primitives.common.GroupByType.None*/;

	/*
		Property: showExtraArrows
			Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines.
			This options if off by default for organizational diagram.

		Default:
			false
	*/
	this.showExtraArrows = false;

	/*
	Property: extraArrowsMinimumSpace
		If diagram is small relations between objects are easy to trace, so mutual positions of parents and children are enough to navigate from parent to children and backward.
		If diagram is large and one row of children exceeds screen width then it use this option to activate horizontal arrows for large intervals between items.

	Default:
		30
	*/
	this.extraArrowsMinimumSpace = 30;

	/*
		Property: showHorizontalArrows
			Show extra horizontal arrows for easy navigation to connection line between parents and children.

		Default:
			false
	*/
	this.showHorizontalArrows = false;

	/*
		Property: connectorType
			Defines connector lines style for dot and line elements. If elements are in their normal full size 
			form they are connected with squired connection lines. So this option controls connector lines style for dots only.

		Default:
			<primitives.common.ConnectorType.Squared>
	*/
	this.connectorType = 0/*primitives.common.ConnectorType.Squared*/;

	/*
		Property: bevelSize
			Size of squared connector bevel.

		Default:
			4
	*/
	this.bevelSize = 4;

	/*
		Property: elbowType
			Style squared connectors with custom elbows.

		Default:
			<primitives.common.ElbowType.None>
	*/
	this.elbowType = 0/*primitives.common.ElbowType.None*/;

	/*
		Property: elbowDotSize
			Size of elbow dot.

		Default:
			4
	*/
	this.elbowDotSize = 4;

	/*
	Property: emptyDiagramMessage
		Empty message in order to avoid blank screen. This option is supposed to say user that chart is empty when no data inside.
	*/
	this.emptyDiagramMessage = "Diagram is empty.";

	/*
	Property: items
		This is chart items collection. It is regular array of items of type ItemConfig. Items reference each other via parent property. 
		So every item may have only one parent in chart. If parent set to null then item displayed at root of chart. 
		Chart can have multiple root items simultaniously. If item references missing item, then it is ignored. 
		If items loop each other they are ignored as well. It is applications responsiblity to avoid such issues.

	See Also:
		<primitives.orgdiagram.ItemConfig>
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.ItemConfig.parent>
	*/
	this.items = [];

	/*
	Property: annotations
		Array of annotaion objects. Chart supports several types of annotations. By default they are drawn on top of chart items and they block mouse events of UI elements placed in item templates.
		The design assumes only few of them being displayed simultanuosly in other words chart does not resolve mutual overlaps of annotations, so don't over use them. 
		This is especially true for connectors and background annotations.

	See also:
		<primitives.orgdiagram.ConnectorAnnotationConfig>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotations = [];

	/*
	Property: cursorItem
		Cursor item id - it is single item selection mode, user selects new cursor item on mouse click. 
		Cursor defines current local zoom placement or in other words current navigation item in the chart,
		all items relative to cursor always shoun in full size. So user can see all possible items around cursor in full size 
		and can continue navigation around chart. So when user navigates from one item to another clicking on thems and changing cursor item
		in chart, chart minimizes items going out of cursor scope and shows in full size items relative to new cursor position.
		If it is null then no cursor shown on diagram.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onCursorChanging>
		<primitives.orgdiagram.Config.onCursorChanged>
	*/
	this.cursorItem = null;

	/*
	Property: highlightItem
		Highlighted item id. Highlight is mouse over affect, but using this option applicatin can set highlight at any item 
		in the chart programmatically. It can be used for chart syncronization with other controls on UI having mouse over effect. 
		See primitives.orgdiagram.Config.update method arguments description for fast chart update.
		If it is null then no highlight shown on diagram.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onHighlightChanging>
		<primitives.orgdiagram.Config.onHighlightChanged>
	*/
	this.highlightItem = null;

	/*
	Property: highlightGravityRadius
		The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. 
		When items is minimized its marker can be so small that it is going to be difficult for end user to place mouse pointer inside of it.
		This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.
		This property is ignored when nearest item is outside of screen boundaries and not visible to end user.
	*/
	this.highlightGravityRadius = 40;

	/*
	Property: selectedItems
		Defines array of selected item ids. Chart allows to select items via checking checkboxes under items. Checkboxes are 
		shown only for full size items. So when item is selected it is always shown in full size, so check box always visible for selcted items.
		User can navigate around large diagram and check intrested items in order to keep them opened. So that way chart provides 
		means to show several items on large diagram and fit everything into minimal space ideally into available screen space.
		Application can select items programmatically using this array or receive notifications from chart about user selections with following events.

	See Also:
		<primitives.orgdiagram.ItemConfig.id>
		<primitives.orgdiagram.Config.onSelectionChanging>
		<primitives.orgdiagram.Config.onSelectionChanged>
	*/
	this.selectedItems = [];

	/*
	Property: hasSelectorCheckbox
		This option controls selection check boxes visibility. 

	Auto - Checkbox shown only for current cursor item only.
	True - Every full size item has selection check box.
	False - No check boxes. Application can still programmatically select some items in the chart. 
	Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
	it is auto used as default selection check box.

	Default:
		<primitives.common.Enabled.Auto>

	See Also:
		<primitives.orgdiagram.ItemConfig.hasSelectorCheckbox>
		<primitives.orgdiagram.Config.onSelectionChanging>
		<primitives.orgdiagram.Config.onSelectionChanged>
	*/
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
		Property: selectCheckBoxLabel
			Selection check box label. 
	*/
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
		Defines the way items between root item and selectedItems displayed in diagram. Chart always shows all items between cursor item and its root in full size.
		But if cursor positioned on root item, then chart shows in full size only selected items in the chart. So this option controls items size between 
		selected items and root item of the chart. By default all items betwen root and selected items shown in full size.

	Default:
		<primitives.common.SelectionPathMode.FullStack>
	*/
	this.selectionPathMode = 1/*primitives.common.SelectionPathMode.FullStack*/;

	/*
	Property: templates
		Custom user templates collection. TemplateConfig is complex object providing options to customize item's content template, 
		cursor tempate and highlight template. Every template config should have unique name property, which is used by chart and its item configs 
		to reference them. Chart's defaultTemplateName allows to make template default for all items in the chart. On other hand user may define templates
		to individual items in the chart by templateName property of item config.

	See also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.defaultTemplateName>
		<primitives.orgdiagram.ItemConfig.templateName>
	*/
	this.templates = [];

	/*
		Property: defaultTemplateName
			This is template name used to render items having no <primitives.orgdiagram.ItemConfig.templateName> defined.


		See Also:
			<primitives.orgdiagram.TemplateConfig>
			<primitives.orgdiagram.TemplateConfig.name>
			<primitives.orgdiagram.Config.templates>
	*/
	this.defaultTemplateName = null;

	/*
	Property: hasButtons
		This option controls user buttons visibility. 

	Auto - Buttons visible only for cursor item.
	True - Every normal item has buttons visible.
	False - No buttons.

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: buttons
		Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every item. 
		The only limitation, they are all the same. So if you need to have unique buttons for every item, then you have to 
		customize cursor templates and manually create custom buttons inside of them.

	See also:
		<primitives.orgdiagram.ButtonConfig>
	*/
	this.buttons = [];

	/*
	Event: onHighlightChanging
		Notifies about changing highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.
		This coupled event with <primitives.orgdiagram.Config.onHighlightChanged>, it is fired before highlight update.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onHighlightChanging = null;

	/*
	Event: onHighlightChanged
		Notifies about changed highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onHighlightChanged = null;

	/*
	Event: onCursorChanging
		Notifies about changing cursor item <primitives.orgdiagram.Config.cursorItem> in diagram.
		This coupled event with <primitives.orgdiagram.Config.onCursorChanged>, it is fired before layout update.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onCursorChanging = null;

	/*
	Event: onCursorChanged
		Notifies about changed cursor item <primitives.orgdiagram.Config.cursorItem> in diagram .

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onCursorChanged = null;

	/*
	Event: onSelectionChanging
		Notifies about changing selected items collection of <primitives.orgdiagram.Config.selectedItems>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onSelectionChanging = null;

	/*
	Event: onSelectionChanged
		Notifies about changes in collection of <primitives.orgdiagram.Config.selectedItems>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onSelectionChanged = null;

	/*
	Event: onButtonClick
		Notifies about click of custom user button defined in colelction of <primitives.orgdiagram.Config.buttons>.

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onButtonClick = null;

	/*
	Event: onMouseClick
		On mouse click event. 

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onMouseClick = null;

	/*
	Event: onMouseDblClick
		On mouse double click event. 

	See also:
		<primitives.orgdiagram.EventArgs>
	*/
	this.onMouseDblClick = null;

	/*
	Event: onItemRender
		Item templates don't provide means to bind data of items into templates. So this event handler gives application such possibility.
		If application uses custom templates then this method is called to populate template with items properties.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onItemRender = null;

	/*
	Event: onHighlightRender
		If user defined custom highlight template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onHighlightRender = null;
	/*
	Event: onCursorRender
		If user defined custom cursor template for item template 
		then this method is called to populate it with context data.

	See also:
		<primitives.common.RenderEventArgs>
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates>
	*/
	this.onCursorRender = null;
	/*
	Property: normalLevelShift
		Defines interval after level of items in  diagram having items in normal state.
	*/
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
		Defines interval after level of items in  diagram having all items in dot state.
	*/
	this.dotLevelShift = 20;
	/*
	Property: lineLevelShift
		Defines interval after level of items in  diagram having items in line state.
	*/
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
		Defines interval between items at the same level in  diagram having items in normal state.
	*/
	this.normalItemsInterval = 10;
	/*
	Property: dotItemsInterval
		Defines interval between items at the same level in  diagram having items in dot state.
	*/
	this.dotItemsInterval = 1;
	/*
	Property: lineItemsInterval
		Defines interval between items at the same level in  diagram having items in line state.
	*/
	this.lineItemsInterval = 2;

	/*
	Property: cousinsIntervalMultiplier
		Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
		So children belonging to different parents have extra gap between them.
		
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	method: update
		Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update widget contents.
	
	Parameters:
		updateMode: This parameter defines severaty of update <primitives.common.UpdateMode>. 
		For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.

	See also:
		<primitives.common.UpdateMode>

	Default:
		<primitives.common.UpdateMode.Recreate>
	*/

	/*
	Property: itemTitleFirstFontColor
	This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.orgdiagram.Config.itemTitleSecondFontColor>.

	See Also:
		<primitives.orgdiagram.ItemConfig.itemTitleColor>
		<primitives.orgdiagram.Config.itemTitleSecondFontColor>
		<primitives.common.highestContrast>

	*/
	this.itemTitleFirstFontColor = "#ffffff"/*primitives.common.Colors.White*/;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
	*/
	this.itemTitleSecondFontColor = "#000080"/*primitives.common.Colors.Navy*/;

	/*
		Property: minimizedItemShapeType
			Defines minimized item shape. The border line width is set with <primitives.orgdiagram.TemplateConfig.minimizedItemBorderWidth>
			By default minimized item is rounded rectangle filled with item title color.


		See also:
			<primitives.orgdiagram.TemplateConfig.minimizedItemCornerRadius>
			<primitives.orgdiagram.ItemConfig.itemTitleColor>
			<primitives.orgdiagram.ItemConfig.minimizedItemShapeType>

		Default:
			<primitives.common.ShapeType.None>
	*/
	this.minimizedItemShapeType = 6/*primitives.common.ShapeType.None*/;

	/*
	Property: linesColor
		Connectors lines color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.linesColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

	/*
	Property: linesWidth
		Connectors lines width.
	*/
	this.linesWidth = 1;

	/*
	Property: linesType
		Connectors line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.linesType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: highlightLinesColor
		Connectors highlight line color. Connectors are basic connections betwen chart items 
		defining their logical relationships, don't mix with connector annotations. 
	*/
	this.highlightLinesColor = "#ff0000"/*primitives.common.Colors.Red*/;

	/*
	Property: highlightLinesWidth
		Connectors highlight line width.
	*/
	this.highlightLinesWidth = 1;

	/*
	Property: highlightLinesType
		Connectors highlight line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.highlightLinesType = 0/*primitives.common.LineType.Solid*/;

	/*
		Property: calloutMaximumVisibility
			Defines maximum allowed item form size to show callout.
	
		See also:
			<primitives.orgdiagram.Config.showCallout>

		Default:
			<primitives.common.Visibility.Dot>
	*/
	this.calloutMaximumVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
	Property: showCallout
		This option controls callout visibility for items. 

	Default:
		true
	*/
	this.showCallout = true;

	/*
	Property: calloutPlacementOffset
		Set this property value depending on size and intervals between markers so callout annotation does not overlap neighbouring items of marker it is shown for.
	*/
	this.calloutPlacementOffset = 100;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.orgdiagram.Config.templates> collection property.

	Default:
		null
	*/
	this.defaultCalloutTemplateName = null;

	/*
	Property: calloutfillColor
		Annotation callout fill color.
	*/
	this.calloutfillColor = "#000000";

	/*
	Property: calloutBorderColor
		Annotation callout border color.
	*/
	this.calloutBorderColor = null;

	/*
	Property: calloutOffset
		Annotation callout offset.
	*/
	this.calloutOffset = 4;

	/*
	Property: calloutCornerRadius
		Annotation callout corner radius.
	*/
	this.calloutCornerRadius = 4;

	/*
	Property: calloutPointerWidth
		Annotation callout pointer base width.
	*/
	this.calloutPointerWidth = "10%";

	/*
	Property: calloutLineWidth
		Annotation callout border line width.
	*/
	this.calloutLineWidth = 1;

	/*
	Property: calloutOpacity
		Annotation callout opacity.
	*/
	this.calloutOpacity = 0.2;

	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;

	/*
	Property: leavesPlacementType
		Defines leaves placement form. Leaves are children having no sub children.
	*/
	this.leavesPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;

	/*
	Property: maximumColumnsInMatrix
		Maximum number of columns for matrix leaves layout. Leaves are children having no sub children.
	*/
	this.maximumColumnsInMatrix = 6;

	/*
	Property: buttonsPanelSize
		User buttons panel size.
	*/
	this.buttonsPanelSize = 28;

	/*
	Property: groupTitlePanelSize
		Group title panel size.
	*/
	this.groupTitlePanelSize = 24;

	/*
	Property: checkBoxPanelSize
		Selection check box panel size.
	*/
	this.checkBoxPanelSize = 24;

	/*
	Property: groupTitlePlacementType
		Group title placement style. Defines group title and buttons panel position relative to item. By default it is left.

	Default:
		<primitives.common.AdviserPlacementType.Left>
	*/
	this.groupTitlePlacementType = 2/*primitives.common.AdviserPlacementType.Left*/;

	/*
		Property: groupTitleOrientation
			Group title direction style. 

		Default:
			<primitives.text.TextDirection.Auto>
	*/
	this.groupTitleOrientation = 2/*primitives.text.TextOrientationType.RotateRight*/;

	/*
		Property: groupTitleVerticalAlignment
			Group title vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
	*/
	this.groupTitleVerticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

	/*
		Property: groupTitleHorizontalAlignment
			Group title horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
	*/
	this.groupTitleHorizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;

	/*
		Property: groupTitleFontSize
			Group title font size. 

		Default:
			15
	*/
	this.groupTitleFontSize = "12px";

	/*
		Property: groupTitleFontFamily
			Group title font family. 

		Default:
			"Arial"
	*/
	this.groupTitleFontFamily = "Arial";

	/*
		Property: groupTitleColor
			Group title color. 

		Default:
			<primitives.common.Colors.Black>
	*/
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
		Property: groupTitleFontWeight
			Group title font weight: normal | bold

		Default:
			"normal"
	*/
	this.groupTitleFontWeight = "normal";

	/*
		Property: groupTitleFontStyle
			Group title font style: normal | italic
		
		Default:
			"normal"
	*/
	this.groupTitleFontStyle = "normal";


	this.distance = 3;

	/*
	Property: scale
		CSS3 scale transform.
	*/
	this.scale = 1;

	/*
	Property: minimumScale
		Minimum CSS3 scale transform.
	*/
	this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform.
	*/
	this.maximumScale = 2;

	/*
	Property: showLabels
		This option controls labels visibility for minimized items. If you need to show labels outside of borders of regular items then use item template for customization.
		Labels placed inside HTML DIV element and long strings are wrapped inside. 
		User can control labels position relative to its item. Chart does not measure labels and does reserve space for them, 
		so if label overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.
	
	Auto - depends on available space.
	True - always shown.
	False - hidden.

	See Also:
		<primitives.orgdiagram.ItemConfig.label>
		<primitives.orgdiagram.Config.labelSize>
		<primitives.orgdiagram.Config.normalItemsInterval>
		<primitives.orgdiagram.Config.dotItemsInterval>
		<primitives.orgdiagram.Config.lineItemsInterval>
		<primitives.orgdiagram.Config.normalLevelShift>
		<primitives.orgdiagram.Config.dotLevelShift>
		<primitives.orgdiagram.Config.lineLevelShift>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabels = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(80, 24);
	*/
	this.labelSize = new primitives.common.Size(80, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

	See Also:
	<primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = 1/*primitives.common.PlacementType.Top*/;

	/*
		Property: labelFontSize
			Label font size. 

		Default:
			10px
	*/
	this.labelFontSize = "10px";

	/*
		Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
	*/
	this.labelFontFamily = "Arial";

	/*
		Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
	*/
	this.labelColor = "#000000"/*primitives.common.Colors.Black*/;

	/*
		Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
	*/
	this.labelFontWeight = "normal";

	/*
	Property: labelFontStyle
		Font style: normal | italic
		
	Default:
		"normal"
	*/
	this.labelFontStyle = "normal";

	/*
	Property: enablePanning
		Enable chart panning with mouse drag & drop for desktop browsers.
		Disable it if you need to support items Drag & Drop.

	Default:
		true
	*/
	this.enablePanning = true;

	/*
	Property: autoSizeMinimum
		Defines minimum diagram size in autosize mode. If diagram has no elements, it is going to be of this size on the page.  
	Default:
		new <primitives.common.Size>(800, 600);
	*/
	this.autoSizeMinimum = new primitives.common.Size(800, 600);

	/*
	Property: autoSizeMaximum
		Defines maximum diagram size in autosize mode.
	Default:
		new <primitives.common.Size>(1024, 768);
	*/
	this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};

/* /Controls/OrgDiagram/Configs/ConnectorAnnotationConfig.js*/
/*
	Class: primitives.orgdiagram.ConnectorAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw connector between two items.
	
	See Also:
		<primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.ConnectorAnnotationConfig = function (arg0, arg1) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Connector>

	See Also:
		<primitives.orgdiagram.Config.annotations>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 0/*primitives.common.AnnotationType.Connector*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

	/*
	Property: fromItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.fromItem = null;

	/*
	Property: toItem 
		Reference to from item in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.toItem = null;

	/*
	Property: connectorShapeType
		Connector shape type. 

	Default:
		<primitives.common.ConnectorShapeType.OneWay>
	*/
	this.connectorShapeType = 0/*primitives.common.ConnectorShapeType.OneWay*/;

	/*
		Property: connectorPlacementType
			Defines connector annotation shape placement mode between two items. 
			It uses off beat placement mode as default in order to avoid overlapping
			of base hierarchy connecting lines.

		Default:
			<primitives.common.ConnectorPlacementType.Offbeat>
	*/
	this.connectorPlacementType = 0/*primitives.common.ConnectorPlacementType.Offbeat*/;

	/*
	Property: labelPlacementType
		Label placement type along connection line(s). 

	Default:
		<primitives.common.ConnectorLabelPlacementType.Between>
	*/
	this.labelPlacementType = 1/*primitives.common.ConnectorLabelPlacementType.Between*/;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = "#000000"/*primitives.common.Colors.Black*/;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.orgdiagram.Config.selectedItems>
	*/
	this.selectItems = true;

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

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

/* /Controls/OrgDiagram/Configs/HighlightPathAnnotationConfig.js*/
/*
	Class: primitives.orgdiagram.HighlightPathAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw path between items.
		Path is drawn along base connection lines displaying relationships between item of the chart.
	See Also:
		<primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.HighlightPathAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.HighlightPath>

	See Also:
		<primitives.orgdiagram.Config.annotations>
		<primitives.orgdiagram.ConnectorAnnotationConfig>
		<primitives.orgdiagram.ShapeAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
	*/
	this.annotationType = 2/*primitives.common.AnnotationType.HighlightPath*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other.
		Highlight path annotations can be placed under main connectors wire or over. 

	Default:
		<primitives.common.ZOrderType.Foreground>
	*/
	this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

	/*
	Property: items 
		Array of item ids in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: color
		Connector's color.
	
	Default:
		<primitives.common.Colors.Black>
	*/
	this.color = "#ff0000"/*primitives.common.Colors.Red*/;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: opacity
		Connector's line opacity.
	*/
	this.opacity = 1;

	/*
	Property: showArrows
		This option controls arrows visibility along highlight path. 

	Default:
		true
	*/
	this.showArrows = true;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.orgdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/OrgDiagram/Configs/ItemConfig.js*/
/*
	Class: primitives.orgdiagram.ItemConfig
		Defines item in diagram hierarchy. 
		User is supposed to create hierarchy of this items and assign it to <primitives.orgdiagram.Config.items> collection property.
		Widget contains some generic properties used in default item template, 
		but user can add as many custom properties to this class as needed. 
		Just be careful and avoid widget malfunction.

	See Also:
		<primitives.orgdiagram.Config.items>
*/
primitives.orgdiagram.ItemConfig = function (arg0, arg1, arg2, arg3, arg4) {
	var property;
	/*
	Property: id
	Unique item id.
	*/
	this.id = null;

	/*
	Property: parent
	Parent id. If parent is null then item placed as a root item.
	*/
	this.parent = null;

	/*
	Property: title
	Default template title property.
	*/
	this.title = null;

	/*
	Property: description
	Default template description element.
	*/
	this.description = null;

	/*
	Property: image
	Url to image. This property is used in default template.
	*/
	this.image = null;

	/*
	Property: context
	User context object.
	*/
	this.context = null;

	/*
	Property: itemTitleColor
	Default template title background color.
	*/
	this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
	Property: minimizedItemShapeType
		Defines minimized/dotted item shape type. By default it is set by ItemTemplate.minimizedItemShapeType property.
		Use this property to set marker type individually per item.

	See Also:
		<primitives.common.ShapeType>
	*/
	this.minimizedItemShapeType = null;

	/*
	Property: groupTitle
	Auxiliary group title property. Displayed vertically on the side of item.
	*/
	this.groupTitle = null;

	/*
	Property: groupTitleColor
	Group title background color.
	*/
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
	Property: isVisible
		If it is true then item is shown and selectable in hierarchy. 
		If item is hidden and it has visible children then only connector line is drawn instead of it.

	True - Item is shown.
	False - Item is hidden.

	Default:
		true
	*/
	this.isVisible = true;

	/*
	Property: isActive
		If it is true then item is selectable in hierarchy and it has mouse over highlight. 

	True - Item is clickable.
	False - Item is inactive and user cannot set cursor item or highlight.

	Default:
		true
	*/
	this.isActive = true;

	/*
	Property: hasSelectorCheckbox
		If it is true then selection check box is shown for the item. 
		Selected items are always shown in normal form, so if item is 
		selected then its selection check box is visible and checked.

	Auto - Depends on <primitives.orgdiagram.Config.hasSelectorCheckbox> setting.
	True - Selection check box is visible.
	False - No selection check box.

	Default:
	<primitives.common.Enabled.Auto>
	*/
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: hasButtons
		This option controls buttons panel visibility. 

	Auto - Depends on <primitives.orgdiagram.Config.hasButtons> setting.
	True - Has buttons panel.
	False - No buttons panel.

	Default:
	<primitives.common.Enabled.Auto>
	*/
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
		Property: itemType
			This property defines how item should be shown. 
			So far it is only possible to make it invisible.
	
		See Also:
			<primitives.orgdiagram.ItemType>
		
		Deafult:
			<primitives.orgdiagram.ItemType.Regular>
	*/
	this.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/;

	/*
		Property: adviserPlacementType
			In case of item types <primitives.orgdiagram.ItemType.Assistant> 
			and <primitives.orgdiagram.ItemType.Adviser> this option defines item 
			placement side relative to parent. By default items placed on 
			the right side of parent item.

		Deafult:
			<primitives.common.AdviserPlacementType.Auto>
	*/
	this.adviserPlacementType = 0/*primitives.common.AdviserPlacementType.Auto*/;

	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = 0/*primitives.common.ChildrenPlacementType.Auto*/;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
	*/
	this.templateName = null;

	/*
	Property: showCallout
		This option controls items callout visibility.

	Auto - depends on <primitives.orgdiagram.Config.showCallout> option
	True - shown
	False - hidden

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showCallout = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: calloutTemplateName
		This is template name used to render callout for dotted item. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>

	See Also:
		<primitives.orgdiagram.Config.templates> collection property.
	Default:
		null
	*/
	this.calloutTemplateName = null;

	/*
	Property: label
	Items label text.
	*/
	this.label = null;

	/*
	Property: showLabel
		This option controls items label visibility. Label is displayed in form of div having text inside, long string is wrapped inside of it. 
		User can control labels position relative to its item. Chart does not preserve space for label.

	Auto - depends on <primitives.orgdiagram.Config.labelOrientation> setting.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.orgdiagram.ItemConfig.label>
	<primitives.orgdiagram.Config.labelSize>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabel = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width. 
		By default it is equal to charts <primitives.orgdiagram.Config.labelSize>.

	See Also:
		<primitives.common.Size>
	Default:
		null;
	*/
	this.labelSize = null;

	/*
	Property: labelOrientation
		Defines label orientation. 
		In default <primitives.text.TextOrientationType.Auto> mode it depends on chart <primitives.orgdiagram.Config.labelOrientation> setting.

	See Also:
	<primitives.orgdiagram.Config.labelOrientation>
	<primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Auto>
	*/
	this.labelOrientation = 3/*primitives.text.TextOrientationType.Auto*/;

	/*
	Property: labelPlacement
		Defines label placement relative to the item. 
		In default <primitives.common.PlacementType.Auto> mode it depends on chart <primitives.orgdiagram.Config.labelPlacement> setting.

	See Also:
		<primitives.orgdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	switch (arguments.length) {
		case 1:
			for (property in arg0) {
				if (arg0.hasOwnProperty(property)) {
					this[property] = arg0[property];
				}
			}
			break;
		case 5:
			this.id = arg0;
			this.parent = arg1;
			this.title = arg2;
			this.description = arg3;
			this.image = arg4;
			break;
	}
};


/* /Controls/OrgDiagram/Configs/ShapeAnnotationConfig.js*/
/*
	Class: primitives.orgdiagram.ShapeAnnotationConfig
		Options class. Populate annotation collection with instances of this objects to draw shape benith or on top of several items.
		Shape is drawn as rectangular area.
	See Also:
		<primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.ShapeAnnotationConfig = function (arg0) {
	var property;

	/*
	Property: annotationType
		Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
		So this property is needed to define annotation type when we use JavaScript non-prototype objects.
		See other annotations as well.

	Default:
		<primitives.common.AnnotationType.Shape>

	See Also:
		<primitives.orgdiagram.Config.annotations>
		<primitives.orgdiagram.ConnectorAnnotationConfig>
		<primitives.orgdiagram.BackgroundAnnotationConfig>
		<primitives.orgdiagram.HighlightPathAnnotationConfig>
	*/
	this.annotationType = 1/*primitives.common.AnnotationType.Shape*/;

	/*
	Property: zOrderType
		Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
		If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
		So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
		Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

	Default:
		<primitives.common.ZOrderType.Auto>
	*/
	this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;

	/*
	Property: items 
		Array of items ids in hierarchy.
	See Also:
		<primitives.orgdiagram.ItemConfig.id>
	*/
	this.items = [];

	/*
	Property: shapeType
		Shape type. 

	Default:
		<primitives.common.ShapeType.Rectangle>
	*/
	this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;

	/*
	Property: offset
		Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
	See also:
		<primitives.common.Thickness>
	*/
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
	Property: lineWidth
		Border line width. 
	*/
	this.lineWidth = 2;

	/*
	Property: cornerRadius
		Body corner radius in percents or pixels. For applicable shapes only.
	*/
	this.cornerRadius = "10%";

	/*
	Property: opacity
		Background color opacity. For applicable shapes only.
	*/
	this.opacity = 1;

	/*
	Property: borderColor
		Shape border line color.
	
	Default:
		null
	*/
	this.borderColor = null;

	/*
	Property: fillColor
		Fill Color. 

	Default:
		null
	*/
	this.fillColor = null;

	/*
	Property: lineType
		Connector's line pattern.

	Default:
		<primitives.common.LineType.Solid>
	*/
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: selectItems
		Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

	Default:
		true

	See Also:
		<primitives.orgdiagram.Config.selectedItems>
	*/
	this.selectItems = false;

	/*
	Property: label
		Annotation label text. Label styled with css class name "bp-connector-label".
	*/
	this.label = null;

	/*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

	/*
	Property: labelPlacement
		Defines label placement relative to the shape. 

	See Also:
		<primitives.orgdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	/*
	Property: labelOffset
		Defines label offset from shape in pixels.

	Default:
		4;
	*/
	this.labelOffset = 4;

	switch (arguments.length) {
		case 1:
			if (arg0 !== null) {
				if (arg0 instanceof Array) {
					this.items = arg0;
				} else if (typeof arg0 == "object") {
					for (property in arg0) {
						if (arg0.hasOwnProperty(property)) {
							this[property] = arg0[property];
						}
					}
				}
			}
			break;
	}
};

/* /Controls/OrgDiagram/Events/EventArgs.js*/
/*
	Class: primitives.orgdiagram.EventArgs
		Event details class.
*/
primitives.orgdiagram.EventArgs = function () {
	/*
	Property: oldContext
		Reference to associated previous item in hierarchy.
	*/
	this.oldContext = null;

	/*
	Property: context
		Reference to associated new item in hierarchy.
	*/
	this.context = null;

	/*
	Property: parentItem
		Reference parent item of item in context.
	*/
	this.parentItem = null;

	/*
	Property: position
		Absolute item position on diagram.

	See also:
		<primitives.common.Rect>
	*/
	this.position = null;

	/*
	Property: name
		Relative object name.

	*/
	this.name = null;

	/*
	Property: cancel
		Allows cancelation of coupled event processing. This option allows to cancel layout update 
		and subsequent <primitives.orgdiagram.Config.onCursorChanged> event 
		in handler of <primitives.orgdiagram.Config.onCursorChanging> event.
	*/
	this.cancel = false;
};

/* /Controls/OrgDiagram/Models/ConnectorBundles/BaseConnectorBundle.js*/
primitives.common.BaseConnectorBundle = function () {
	this.NORMAL_ITEM_WEIGHT = 10010;
	this.LINE_ITEM_WEIGHT = 10000;
};


primitives.common.BaseConnectorBundle.prototype.trace = function (data, params, options) {
	//var data = {
	//	graph: null, //primitives.common.graph
	//	nodeid: 0
	//};

	//var params = {
	//	treeItemsPositions: [],
	//	transform: null,
	//	hasGraphics: true
	//};

	//var options = {
	//	connectorType: primitives.common.ConnectorType.Squared,
	//	showExtraArrows: true,
	//	bevelSize: 4,
	//	elbowType: primitives.common.ElbowType.None
	//};
};

primitives.common.BaseConnectorBundle.prototype.getId = function (data) {
	var result = "_" + data.nodeid;
	data.nodeid += 1;
	return result;
};

primitives.common.BaseConnectorBundle.prototype.ConnectorEdge = function (from, to, polyline, parentsArrowId, childrenArrowId, dotId, weight, fromOffset, hasMiddle, middleParent) {
	this.polyline = polyline;
	this.from = from;
	this.to = to;

	this.weight = weight || 0;
	this.fromOffset = fromOffset || 0;

	this.parentsArrowId = parentsArrowId;
	this.childrenArrowId = childrenArrowId;
	this.dotId = dotId;

	/* draw extra arrows along long segments, the hasMiddle should be true and middleParent is parent point id */
	this.hasMiddle = hasMiddle;
	this.middleParent = middleParent;
};

primitives.common.BaseConnectorBundle.prototype.ConnectorDestination = function (options) {
	this.id = null;
	this.x = null;
	this.y = null;
	this.bundleid = null;
	this.hasElbow = false;
	this.elbowPoint1 = null;
	this.elbowPoint2 = null;
	this.visibility = null;
	this.isSquared = true;

	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			this[key] = options[key];
		}
	}
};

primitives.common.BaseConnectorBundle.prototype.traceFork = function (data, params, options, parentPoint, points, hasSquared, isParents, fromOffset, showHorizontalArrows) {
	var startIndex, endIndex, len,
		connectorPoint, curvedPoints = [], bundlePoint, connectorDestination,
		index,
		polyline,
		bevelSize,
		fromPoint, fromPointId, toPoint, toPointId;

	if (hasSquared) {
		/* draw curved or angular lines on left side of pack */
		curvedPoints = [];
		for (startIndex = 0, len = points.length; startIndex < len; startIndex += 1) {
			connectorPoint = points[startIndex];
			if (connectorPoint.x < parentPoint.x && !connectorPoint.isSquared) {
				curvedPoints.push(connectorPoint);
			} else {
				break;
			}
		}
		len = curvedPoints.length;
		if (len > 0) {
			connectorDestination = curvedPoints[len - 1];
			bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
				id: connectorDestination.bundleid,
				x: connectorDestination.x,
				y: parentPoint.y
			});
			this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
		}

		/* draw curved or angular lines on right side of pack */
		curvedPoints = [];
		for (endIndex = points.length - 1; endIndex >= startIndex; endIndex -= 1) {
			connectorPoint = points[endIndex];

			if (connectorPoint.x > parentPoint.x && !connectorPoint.isSquared) {
				curvedPoints.push(connectorPoint);
			} else {
				break;
			}
		}

		len = curvedPoints.length;
		if (len > 0) {
			connectorDestination = curvedPoints[len - 1];
			bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
				id: connectorDestination.bundleid,
				x: connectorDestination.x,
				y: parentPoint.y
			});
			this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
		}

		/* calculate elbows of vertical connectors */
		for (index = startIndex; index <= endIndex; index += 1) {
			connectorPoint = points[index];

			bevelSize = options.bevelSize;
			if (bevelSize < 2) {
				bevelSize = 0;
			}

			if (params.hasGraphics) {
				switch (options.elbowType) {
					case 2/*primitives.common.ElbowType.Bevel*/:
					case 3/*primitives.common.ElbowType.Round*/:
						if (bevelSize > 0 && Math.abs(parentPoint.x - connectorPoint.x) > bevelSize && Math.abs(parentPoint.y - connectorPoint.y) > bevelSize) {
							connectorPoint.hasElbow = true;
							connectorPoint.elbowPoint1 = new primitives.common.Point(connectorPoint.x, parentPoint.y + (parentPoint.y > connectorPoint.y ? -bevelSize : bevelSize));
							connectorPoint.elbowPoint2 = new primitives.common.Point(connectorPoint.x + (parentPoint.x > connectorPoint.x ? bevelSize : -bevelSize), parentPoint.y);
						}
						break;
					default:
						break;
				}
			}

			/* draw vertical segment */
			polyline = new primitives.common.Polyline();
			if (connectorPoint.hasElbow) {
				params.transform.transform3Points(connectorPoint.elbowPoint2.x, connectorPoint.elbowPoint2.y,
												connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint2.y,
												connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, true, this,
					function (fromX, fromY, toX, toY, toX2, toY2) {
						switch (options.elbowType) {
							case 2/*primitives.common.ElbowType.Bevel*/:
								polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
								polyline.addSegment(new primitives.common.LineSegment(toX2, toY2));
								break;
							case 3/*primitives.common.ElbowType.Round*/:
								polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
								polyline.addSegment(new primitives.common.CubicArcSegment(fromX, fromY, toX, toY, toX2, toY2));
								break;
						}
					});//ignore jslint

				params.transform.transformPoints(connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
					polyline.addSegment(new primitives.common.LineSegment(toX, toY));
				}); //ignore jslint
			} else {
				params.transform.transformPoints(connectorPoint.x, parentPoint.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
					polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
					polyline.addSegment(new primitives.common.LineSegment(toX, toY));
				}); //ignore jslint
			}

			var bundleid = (connectorPoint.x == parentPoint.x) ? parentPoint.id : connectorPoint.bundleid;
			var isVisible = (connectorPoint.visibility !== 4/*primitives.common.Visibility.Invisible*/);
			data.graph.addEdge(bundleid, connectorPoint.id, new this.ConnectorEdge(bundleid, connectorPoint.id, polyline,
				isParents && isVisible ? connectorPoint.id : null,
				!isParents && isVisible ? connectorPoint.id : null, null,
				isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT /* weight*/, fromOffset));
		}

		/* draw segments on the right of parent point */
		startIndex = Math.max(startIndex - 1, 0);
		endIndex = Math.min(endIndex + 1, points.length - 1);

		fromPoint = parentPoint;
		fromPointId = parentPoint.id;
		for (index = startIndex; index <= endIndex; index += 1) {
			toPoint = points[index];
			toPointId = toPoint.bundleid;
			if (toPoint.x > fromPoint.x) {
				polyline = new primitives.common.Polyline();
				params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
					polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
					polyline.addSegment(new primitives.common.LineSegment(endX, endY));
				}); //ignore jslint
				data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline, null, null, fromPointId,
					Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */, fromOffset,
					/* draw middle arrows */
					showHorizontalArrows, isParents ? toPointId : fromPointId)
				);

				fromPoint = toPoint.elbowPoint2 || toPoint;
				fromPointId = toPointId;
			}
		}

		/* draw segments on the left of parent point */
		fromPoint = parentPoint;
		fromPointId = parentPoint.id;
		for (index = endIndex; index >= startIndex; index -= 1) {
			toPoint = points[index];
			toPointId = toPoint.bundleid;
			if (toPoint.x < fromPoint.x) {
				polyline = new primitives.common.Polyline();
				params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
					polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
					polyline.addSegment(new primitives.common.LineSegment(endX, endY));
				}); //ignore jslint
				data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline, null, null, fromPointId,
					Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */, fromOffset,
					/* draw middle arrows */
					showHorizontalArrows, isParents ? toPointId : fromPointId)
					);

				fromPoint = toPoint.elbowPoint2 || toPoint;
				fromPointId = toPointId;
			}
		}
	} else {
		/* all lines are angular or curved */
		this.traceAngularSegments(data, params, options, parentPoint, points, true);
	}
};

primitives.common.BaseConnectorBundle.prototype.traceAngularSegments = function (data, params, options, bundlePoint, points, drawToBundle) {
	var index, len,
		rect,
		point,
		polyline;

	for (index = 0, len = points.length; index < len; index += 1) {
		point = points[index];

		polyline = new primitives.common.Polyline();

		params.transform.transformPoint(bundlePoint.x, bundlePoint.y, true, this, function (x, y) {
			polyline.addSegment(new primitives.common.MoveSegment(x, y));
		});//ignore jslint

		switch (options.connectorType) {
			case 1/*primitives.common.ConnectorType.Angular*/:
				params.transform.transformPoint(point.x, point.y, true, this, function (x, y) {
					polyline.addSegment(new primitives.common.LineSegment(x, y));
				});//ignore jslint
				break;
			case 2/*primitives.common.ConnectorType.Curved*/:
				rect = new primitives.common.Rect(bundlePoint, point);

				if (drawToBundle) {
					if (bundlePoint.x > rect.x) {
						params.transform.transform3Points(rect.right(), rect.verticalCenter(), rect.x, rect.verticalCenter(), rect.x, rect.bottom(), true,
							this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
								polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
							});//ignore jslint
					}
					else {
						params.transform.transform3Points(rect.x, rect.verticalCenter(), rect.right(), rect.verticalCenter(), rect.right(), rect.bottom(), true,
							this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
								polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
							});//ignore jslint
					}
				} else {
					if (bundlePoint.x > rect.x) {
						params.transform.transformPoints(rect.x, rect.y, rect.x, rect.bottom(), true,
							this, function (cpX, cpY, x, y) {
								polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
							});//ignore jslint
					} else {
						params.transform.transformPoints(rect.right(), rect.y, rect.right(), rect.bottom(), true,
							this, function (cpX, cpY, x, y) {
								polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
							});//ignore jslint
					}
				}
				break;
		}
		var isVisible = (point.visibility !== 4/*primitives.common.Visibility.Invisible*/);
		data.graph.addEdge(bundlePoint.id, point.id, new this.ConnectorEdge(bundlePoint.id, point.id, polyline, null, isVisible ? point.id : null, isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT));
	}
};

/* /Controls/OrgDiagram/Models/ConnectorBundles/HorizontalConnectorBundle.js*/
primitives.common.HorizontalConnectorBundle = function (fromItem, toItem) {
	this.fromItem = fromItem;
	this.toItem = toItem;
};

primitives.common.HorizontalConnectorBundle.prototype = new primitives.common.BaseConnectorBundle();

primitives.common.HorizontalConnectorBundle.prototype.trace = function (data, params, options) {
	var fromItemId = this.fromItem,
		toItemId = this.toItem,
		fromItemPosition = params.treeItemsPositions[fromItemId],
		toItemPosition = params.treeItemsPositions[toItemId],
		polyline = new primitives.common.Polyline();

	if (fromItemPosition.actualPosition.x < toItemPosition.actualPosition.x) {
		params.transform.transformPoints(fromItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift,
			toItemPosition.actualPosition.x, toItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
				polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
				polyline.addSegment(new primitives.common.LineSegment(toX, toY));
			});//ignore jslint
	} else {
		params.transform.transformPoints(fromItemPosition.actualPosition.x, fromItemPosition.horizontalConnectorsShift,
			toItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
				polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
				polyline.addSegment(new primitives.common.LineSegment(toX, toY));
			});//ignore jslint
	}
	var toItemIsVisible = toItemPosition.actualVisibility !== 4/*primitives.common.Visibility.Invisible*/;
	var fromItemIsVisible = fromItemPosition.actualVisibility !== 4/*primitives.common.Visibility.Invisible*/;
	data.graph.addEdge(fromItemId, toItemId, new this.ConnectorEdge(fromItemId, toItemId, polyline,
		toItemIsVisible ? toItemId : null, fromItemIsVisible ? fromItemId : null, (toItemIsVisible || fromItemIsVisible) ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT));
};

/* /Controls/OrgDiagram/Models/ConnectorBundles/MatrixConnectorBundle.js*/
primitives.common.MatrixConnectorBundle = function (isChildren, items, matrixNodeId, connectionId, matrixWidth) {
	this.isChildren = isChildren;
	this.items = items;
	this.len = items.length;
	this.matrixNodeId = matrixNodeId;
	this.connectionId = connectionId;
	this.matrixWidth = matrixWidth;

	this.blocksCount = Math.ceil(this.matrixWidth / 2);
	this.rowsCount = Math.ceil(this.len / this.matrixWidth);
};

primitives.common.MatrixConnectorBundle.prototype = new primitives.common.BaseConnectorBundle();

primitives.common.MatrixConnectorBundle.prototype.trace = function (data, params, options) {
	if (this.isChildren) {
		this.traceChildrenLayout(data, params, options);
	} else {
		this.traceParentsLayout(data, params, options);
	}
};

primitives.common.MatrixConnectorBundle.prototype.traceChildrenLayout = function (data, params, options) {
	var actualPosition,
		forkItems = [];
	for (var blockIndex = 0; blockIndex < this.blocksCount; blockIndex += 1) {
		var prevMedianPoint = null;
		for (var rowIndex = this.rowsCount - 1; rowIndex >= 0; rowIndex -= 1) {

			var leftNodeIndex = this.getNodeIndex(blockIndex, rowIndex, true, true);
			var leftNodeId = null;
			var leftTreeItemPosition = null;
			if (leftNodeIndex < this.len) {
				leftNodeId = this.items[leftNodeIndex];
				leftTreeItemPosition = params.treeItemsPositions[leftNodeId];
			}

			var rightNodeIndex = this.getNodeIndex(blockIndex, rowIndex, false, true);
			var rightNodeId = null;
			var rightTreeItemPosition = null;
			if (rightNodeIndex < this.len) {
				rightNodeId = this.items[rightNodeIndex];
				rightTreeItemPosition = params.treeItemsPositions[rightNodeId];
			}

			var medianPoint = null;
			if (medianPoint == null && leftTreeItemPosition != null) {
				medianPoint = new this.ConnectorDestination({
					id: this.getId(data),
					x: leftTreeItemPosition.actualPosition.horizontalCenter() + leftTreeItemPosition.rightMedianOffset,
					y: leftTreeItemPosition.horizontalConnectorsShift
				});
			}

			if (medianPoint == null && rightTreeItemPosition != null) {
				medianPoint = new this.ConnectorDestination({
					id: this.getId(data),
					x: rightTreeItemPosition.actualPosition.horizontalCenter() - rightTreeItemPosition.leftMedianOffset,
					y: rightTreeItemPosition.horizontalConnectorsShift
				});
			}

			if (leftTreeItemPosition != null) {
				actualPosition = leftTreeItemPosition.actualPosition;
				params.transform.transformPoints(actualPosition.right(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(leftNodeId, medianPoint.id, new this.ConnectorEdge(leftNodeId, medianPoint.id, polyline, null, leftNodeId, null, 10/* weight */));
					});
			}

			if (rightTreeItemPosition != null) {
				actualPosition = rightTreeItemPosition.actualPosition;
				params.transform.transformPoints(actualPosition.left(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(rightNodeId, medianPoint.id, new this.ConnectorEdge(rightNodeId, medianPoint.id, polyline, null, rightNodeId, null, 10/* weight */));
					});
			}

			if (prevMedianPoint != null && medianPoint != null) {
				// draw segment between previous and current row median points
				params.transform.transformPoints(prevMedianPoint.x, prevMedianPoint.y, medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(prevMedianPoint.id, medianPoint.id, new this.ConnectorEdge(prevMedianPoint.id, medianPoint.id, polyline, null, null, null, 0/* weight */));
					});
			}

			if (medianPoint != null) {
				prevMedianPoint = medianPoint;
			}
		}
		if (prevMedianPoint != null) {
			forkItems.push(new this.ConnectorDestination({
				id: prevMedianPoint.id,
				bundleid: this.getId(data),
				x: prevMedianPoint.x,
				y: prevMedianPoint.y,
				isSquared: true,
				visibility: 4/*primitives.common.Visibility.Invisible*/
			}));
		}
	}
	// draw parents fork
	var parentTreeItemPosition = params.treeItemsPositions[this.matrixNodeId];
	actualPosition = parentTreeItemPosition.actualPosition;
	var parentPoint = new this.ConnectorDestination({
		id: this.matrixNodeId,
		x: actualPosition.horizontalCenter(),
		y: actualPosition.top()
	});
	this.traceFork(data, params, options, parentPoint, forkItems, true, false, 0, options.showExtraArrows);
};

primitives.common.MatrixConnectorBundle.prototype.traceParentsLayout = function (data, params, options) {
	var actualPosition,
		forkItems = [];
	for (var blockIndex = 0; blockIndex <= this.blocksCount; blockIndex += 1) {
		var prevMedianPoint = null;
		for (var rowIndex = 0; rowIndex < this.rowsCount; rowIndex += 1) {

			var leftNodeIndex = this.getNodeIndex(blockIndex, rowIndex, true, false);
			var leftNodeId = null;
			var leftTreeItemPosition = null;
			if (leftNodeIndex < this.len) {
				leftNodeId = this.items[leftNodeIndex];
				leftTreeItemPosition = params.treeItemsPositions[leftNodeId];
			}

			var rightNodeIndex = this.getNodeIndex(blockIndex, rowIndex, false, false);
			var rightNodeId = null;
			var rightTreeItemPosition = null;
			if (rightNodeIndex < this.len) {
				rightNodeId = this.items[rightNodeIndex];
				rightTreeItemPosition = params.treeItemsPositions[rightNodeId];
			}

			var medianPoint = null;
			if (medianPoint == null && leftTreeItemPosition != null) {
				medianPoint = new this.ConnectorDestination({
					id: this.getId(data),
					x: leftTreeItemPosition.actualPosition.horizontalCenter() + leftTreeItemPosition.rightMedianOffset,
					y: leftTreeItemPosition.horizontalConnectorsShift
				});
			}

			if (medianPoint == null && rightTreeItemPosition != null) {
				medianPoint = new this.ConnectorDestination({
					id: this.getId(data),
					x: rightTreeItemPosition.actualPosition.horizontalCenter() - rightTreeItemPosition.leftMedianOffset,
					y: rightTreeItemPosition.horizontalConnectorsShift
				});
			}

			if (leftTreeItemPosition != null) {
				actualPosition = leftTreeItemPosition.actualPosition;
				params.transform.transformPoints(actualPosition.right(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(leftNodeId, medianPoint.id, new this.ConnectorEdge(leftNodeId, medianPoint.id, polyline, leftNodeId, null, null, 10/* weight */));
					});
			}

			if (rightTreeItemPosition != null) {
				actualPosition = rightTreeItemPosition.actualPosition;
				params.transform.transformPoints(actualPosition.left(), actualPosition.verticalCenter(), medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(rightNodeId, medianPoint.id, new this.ConnectorEdge(rightNodeId, medianPoint.id, polyline, rightNodeId, null, null, 10/* weight */));
					});
			}

			if (prevMedianPoint != null && medianPoint != null) {
				// draw segment between previous and current row median points
				params.transform.transformPoints(prevMedianPoint.x, prevMedianPoint.y, medianPoint.x, medianPoint.y,
					true, this, function (fromX, fromY, toX, toY) {
						var polyline = new primitives.common.Polyline();
						polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
						polyline.addSegment(new primitives.common.LineSegment(toX, toY));

						data.graph.addEdge(prevMedianPoint.id, medianPoint.id, new this.ConnectorEdge(prevMedianPoint.id, medianPoint.id, polyline, null, null, null, 0/* weight */));
					});
			}

			if (medianPoint != null) {
				prevMedianPoint = medianPoint;
			}
		}
		if (prevMedianPoint != null) {
			forkItems.push(new this.ConnectorDestination({
				id: prevMedianPoint.id,
				bundleid: this.getId(data),
				x: prevMedianPoint.x,
				y: prevMedianPoint.y,
				isSquared: true,
				visibility: 4/*primitives.common.Visibility.Invisible*/
			}));
		}
	}
	// draw parents fork
	var parentTreeItemPosition = params.treeItemsPositions[this.matrixNodeId];
	actualPosition = parentTreeItemPosition.actualPosition;
	var parentPoint = new this.ConnectorDestination({
		id: this.connectionId,
		x: actualPosition.horizontalCenter(),
		y: actualPosition.bottom()
	});
	this.traceFork(data, params, options, parentPoint, forkItems, true, true, 0, options.showExtraArrows);
};

primitives.common.MatrixConnectorBundle.prototype.getNodeIndex = function (blockIndex, row, isLeft, isChild) {
	var result = null,
		column;
	if (isChild) {
		column = blockIndex * 2 + (isLeft ? 0 : 1);
		if (this.matrixWidth > column) {
			result = row * this.matrixWidth + column;
		}
	} else {
		column = blockIndex * 2 + (isLeft ? -1 : 0);
		if (column >= 0 && column < this.matrixWidth) {
			result = row * this.matrixWidth + column;
		}
	}
	return result;
};



/* /Controls/OrgDiagram/Models/ConnectorBundles/VerticalConnectorBundle.js*/
primitives.common.VerticalConnectorBundle = function (fromItems, toItems) {
	this.fromItems = fromItems;
	this.toItems = toItems;

	this.childConnectorId = {};

	this.fromOffset = 0;
	this.fromStackSize = 0;
};

primitives.common.VerticalConnectorBundle.prototype = new primitives.common.BaseConnectorBundle();

primitives.common.VerticalConnectorBundle.prototype.trace = function (data, params, options) {
	var points,
		parents, children, items,
		treeItem, treeItemId, treeItemPosition, treeItemHighlightPath,
		index, len,
		isSquared, hasSquared,
		parentHorizontalCenter,
		parentsConnectorOffset,
		childrenConnectorOffset,
		connectorPoint,
		connectorStep,
		chartHasSquaredConnectors = (options.connectorType === 0/*primitives.common.ConnectorType.Squared*/),
		paletteItem, polyline;

	/* Draw fork for parents */
	parents = [];
	if (this.fromItems.length > 0) {
		items = this.fromItems;
		for (index = 0, len = items.length; index < len; index += 1) {
			treeItemId = items[index];
			treeItemPosition = params.treeItemsPositions[treeItemId];

			connectorPoint = new this.ConnectorDestination({
				id: params.nestedLayoutBottomConnectorIds.hasOwnProperty(treeItemId) ? params.nestedLayoutBottomConnectorIds[treeItemId] : treeItemId,
				bundleid: this.getId(data),
				x: treeItemPosition.actualPosition.horizontalCenter(),
				y: treeItemPosition.actualPosition.bottom(),
				isSquared: true,
				visibility: treeItemPosition.actualVisibility
			});
			parents.push(connectorPoint);
		}
		parents.sort(function (a, b) { return a.x - b.x; });

		/* Find offset of horizontal connector line between parents */
		parentsConnectorOffset = treeItemPosition.bottomConnectorShift - treeItemPosition.bottomConnectorInterval * (this.fromStackSize - this.fromOffset + 1);
	}

	children = [];
	if (this.toItems.length > 0) {
		hasSquared = false;

		items = this.toItems;
		for (index = 0; index < items.length; index += 1) {
			treeItemId = items[index];
			treeItemPosition = params.treeItemsPositions[treeItemId];

			isSquared = true;
			if (params.hasGraphics) {
				switch (treeItemPosition.actualVisibility) {
					case 2/*primitives.common.Visibility.Dot*/:
					case 3/*primitives.common.Visibility.Line*/:
						isSquared = chartHasSquaredConnectors;
						break;
				}
			}
			connectorStep = 0;
			connectorPoint = new this.ConnectorDestination({
				id: treeItemId,
				bundleid: this.getId(data),
				x: (treeItemPosition.actualPosition.horizontalCenter() + connectorStep),
				y: treeItemPosition.actualPosition.top(),
				isSquared: isSquared,
				visibility: treeItemPosition.actualVisibility
			});
			children.push(connectorPoint);

			/* is true if any child point has squared connector */
			hasSquared = hasSquared || connectorPoint.isSquared;
		}
		children.sort(function (a, b) { return a.x - b.x; });

		/* Find offset of horizontal connector line between children */
		childrenConnectorOffset = treeItemPosition.topConnectorShift;
	}

	if (children.length == 1) {
		parentHorizontalCenter = children[0].x;
	} else if (parents.length == 1) {
		parentHorizontalCenter = parents[0].x;
	} else if (children.length > 0 && parents.length > 0) {
		parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x + children[0].x + children[children.length - 1].x) / 4.0;
	} else if (children.length > 0) {
		parentHorizontalCenter = (children[0].x + children[children.length - 1].x) / 2.0;
	} else {
		parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x) / 2.0;
	}

	var topCenterPoint = null;
	if (parents.length > 0) {
		topCenterPoint = new this.ConnectorDestination({
			id: this.getId(data),
			x: parentHorizontalCenter,
			y: parentsConnectorOffset
		});
		this.traceFork(data, params, options, topCenterPoint, parents, true, true, this.fromOffset, options.showExtraArrows && (children.length > 0));
	}

	var bottomCenterPoint = null;
	if (children.length > 0) {
		bottomCenterPoint = new this.ConnectorDestination({
			id: this.getId(data),
			x: parentHorizontalCenter,
			y: childrenConnectorOffset
		});
		if (topCenterPoint != null && bottomCenterPoint.y == topCenterPoint.y) {
			bottomCenterPoint = topCenterPoint;
		}
		this.traceFork(data, params, options, bottomCenterPoint, children, hasSquared, false, 0, options.showExtraArrows && (parents.length > 0));
	}

	/* draw connector line between children and parents */
	if (topCenterPoint != null && bottomCenterPoint != null && topCenterPoint.id != bottomCenterPoint.id) {
		params.transform.transformPoints(topCenterPoint.x, topCenterPoint.y, bottomCenterPoint.x, bottomCenterPoint.y,
			true, this, function (fromX, fromY, toX, toY) {
				var polyline = new primitives.common.Polyline();
				polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
				polyline.addSegment(new primitives.common.LineSegment(toX, toY));

				data.graph.addEdge(topCenterPoint.id, bottomCenterPoint.id, new this.ConnectorEdge(topCenterPoint.id, bottomCenterPoint.id, polyline, null, null, null, 0/* weight */));
			});
	}
};

/* /Controls/OrgDiagram/Models/LevelVisibility.js*/
primitives.orgdiagram.LevelVisibility = function (level, currentvisibility) {
	this.level = level;
	this.currentvisibility = currentvisibility;
};


/* /Controls/OrgDiagram/Models/OrgItem.js*/
/* This is model class is used to define intermediate organizational chart structure */
primitives.orgdiagram.OrgItem = function (options) {
	var index, len,
		property;

	this.id = null; // Unique org item id. 

	this.isVisible = true; // If it is true then item is shown and selectable in hierarchy. 
	this.isActive = true; // If it is true then item is clickable in hierarchy. 
	this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 

	this.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/; // This property defines how item should be placed in chart. 
	this.adviserPlacementType = 0/*primitives.common.AdviserPlacementType.Auto*/; // Left or Right placement relative to parent
	this.childrenPlacementType = 0/*primitives.common.ChildrenPlacementType.Auto*/; // Children shape

	this.level = null;
	this.hideParentConnection = false;
	this.hideChildrenConnection = false;

	/* org tree balancing properties */
	this.childIndex = null; // Item index in array of parent's children

	// Folowing properties we copy from user's item config to new OrgItem instance
	// If user's property is undefined we take default value from ItemConfig
	var properties = [
		'id', 'parent', 'isVisible', 'isActive',
		'itemType', 'adviserPlacementType', 'childrenPlacementType'
	];

	/* copy general org chart items properties */
	for (index = 0, len = properties.length; index < len; index += 1) {
		property = properties[index];

		if (options.hasOwnProperty(property)) {
			this[property] = options[property];
		}
	}
};

/* /Controls/OrgDiagram/Models/Template.js*/
primitives.orgdiagram.Template = function (options, templateConfig) {
	this.templateConfig = null;
	this.itemTemplate = null;
	this.highlightTemplate = null;
	this.dotHighlightTemplate = null;
	this.cursorTemplate = null;

	if (templateConfig != null) {
		this.templateConfig = templateConfig;

		this.itemTemplate = primitives.common.isNullOrEmpty(templateConfig.itemTemplate) ?
			new primitives.common.ItemTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.itemTemplate, options.onItemRender);

		this.highlightTemplate = primitives.common.isNullOrEmpty(templateConfig.highlightTemplate) ?
			new primitives.common.HighlightTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.highlightTemplate, options.onHighlightRender);

		this.dotHighlightTemplate = new primitives.common.DotHighlightTemplate(options, templateConfig);

		this.cursorTemplate = primitives.common.isNullOrEmpty(templateConfig.cursorTemplate) ?
			new primitives.common.CursorTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.cursorTemplate, options.onCursorRender);
	}
};


/* /Controls/OrgDiagram/Models/TemplateParams.js*/
primitives.orgdiagram.TemplateParams = function () {
	this.template = null;
	this.isActive = false;
	this.hasSelectorCheckbox = false;
	this.hasButtons = false;
	this.hasGroupTitle = false;
	this.buttons = [];
};

/* /Controls/OrgDiagram/Models/TreeItem.js*/
/* This is model class used to define visual structure of chart */
primitives.orgdiagram.TreeItem = function () {
	/* auto generated internal item id */
	this.id = null;

	/* Visual child id which is supposed to be straight under it */
	this.visualAggregatorId = null;
	this.visualDepth = 1; // private 

	this.partners = []; /* thess are nodes connected with bottom line together into one family, family is group of items having common set of children */

	this.visibility = 1/*primitives.common.Visibility.Normal*/;

	this.actualItemType = null; // primitives.orgdiagram.ItemType
	this.connectorPlacement = 0; // primitives.common.SideFlag
	this.gravity = 0; // primitives.common.HorizontalAlignmentType.Center

	/* This value is used to increase gap between neighboring left item in hiearchy */
	this.relationDegree = 0;
};

/* /Controls/OrgDiagram/Models/TreeItemPosition.js*/
/* This is model class used to define visual structure of chart */
primitives.orgdiagram.TreeItemPosition = function (source) {
	this.partnerConnectorOffset = 0;

	this.level = null;
	this.levelPosition = null;
	this.offset = 0;
	this.leftPadding = 0;
	this.rightPadding = 0;

	this.actualVisibility = 1/*primitives.common.Visibility.Normal*/;

	this.actualSize = null;
	this.actualPosition = null;
	this.contentPosition = null;

	this.horizontalConnectorsShift = null;
	this.topConnectorShift = null;
	this.topConnectorInterval = 0;
	this.bottomConnectorShift = null;
	this.bottomConnectorInterval = 0;

	/* following properties are being used in matrix layout to draw connector lines */
	this.leftMedianOffset = null; /* this property is position of vertical connector lines going between columns of nodes in matrix layout on left side of the node */
	this.rightMedianOffset = null; /* the same but on the right side */

	if (source != null) {
		for (var property in source) {
			if (source.hasOwnProperty(property)) {
				switch (property) {
					case 'actualPosition':
						this.actualPosition = new primitives.common.Rect(source.actualPosition);
						break;
					default:
						this[property] = source[property];
						break;
				}
				
			}
		}
	}
};


/* /Controls/OrgDiagram/Models/TreeLevelConnectorStackSize.js*/
primitives.orgdiagram.TreeLevelConnectorStackSize = function () {
	this.parentsStackSize = 0; /* number of overlapping horiontal connection lines between partners in level */
};

/* /Controls/OrgDiagram/Models/TreeLevelPosition.js*/
primitives.orgdiagram.TreeLevelPosition = function (source) {
	this.currentvisibility = 1/*primitives.common.Visibility.Normal*/;
	this.actualVisibility = 1/*primitives.common.Visibility.Normal*/;

	this.shift = 0.0; /* top abolute position of items in level */
	this.depth = 0.0; /* maximum  height of items in level */
	this.nextLevelShift = 0.0; /* next level relative position */
	this.horizontalConnectorsDepth = 0; /* relative position of horizontal connectors between items */
	this.topConnectorShift = 0.0; /* relative position of top connector horizontal line */
	this.connectorShift = 0.0; /* relative position of bottom horizontal line */
	this.levelSpace = 0.0; /* user interval between prev level and this one based on options set by user, if number of horizontal connections is bigger that one it is proportionally increased */

	this.currentOffset = 0.0; /* this is x axis coordinate offset, it used to calculate horizontal items position in level */

	this.labels = [];
	this.labelsRect = null;
	this.showLabels = true;
	this.hasFixedLabels = false;

	if (source != null) {
		for (var property in source) {
			if (source.hasOwnProperty(property)) {
				this[property] = source[property];
			}
		}
	}
};

primitives.orgdiagram.TreeLevelPosition.prototype.setShift = function (shift, levelSpace, topConnectorSpace, connectorSpace, partnerConnectorOffset) {
	this.shift = shift;
	this.levelSpace = levelSpace;

	this.topConnectorShift = -levelSpace / 2.0 - topConnectorSpace;
	this.connectorShift = this.depth + connectorSpace + (partnerConnectorOffset + 1) * (levelSpace / 2.0);
	this.nextLevelShift = topConnectorSpace + this.depth + connectorSpace + levelSpace + partnerConnectorOffset * levelSpace / 2.0;

	return this.nextLevelShift;
};

primitives.orgdiagram.TreeLevelPosition.prototype.shiftDown = function (shift) {
	this.shift += shift;
};

primitives.orgdiagram.TreeLevelPosition.prototype.toString = function () {
	return this.currentvisibility;
};

/* /Controls/OrgDiagram/Tasks/Layout/AlignDiagramTask.js*/
primitives.orgdiagram.AlignDiagramTask = function (orientationOptionTask, itemsSizesOptionTask, visualTreeOptionTask, scaleOptionTask,
	currentControlSizeTask, activeItemsTask, itemsPositionsTask, isFamilyChartMode) {
	var _data = {
		treeItemsPositions: {}, // primitives.orgdiagram.TreeItemPosition();
		panelSize: null // primitives.common.Rect();
	},
	_activeItems,
	_treeItemsPositions,

	_options,
	_orientationOptions,
	_visualTreeOptions,
	_scaleOptions,
	_spatialIndex,
	_keyboardNavigationManager;

	function process() {
		var placeholderSize = new primitives.common.Size(itemsPositionsTask.getContentSize()),
			panelSize = new primitives.common.Size(currentControlSizeTask.getOptimalPanelSize());

		_spatialIndex = null;
		_keyboardNavigationManager = null;

		_activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};
		_treeItemsPositions = itemsPositionsTask.getItemsPositions();

		_options = itemsSizesOptionTask.getOptions();
		_orientationOptions = orientationOptionTask.getOptions();
		_visualTreeOptions = visualTreeOptionTask.getOptions();
		_scaleOptions = scaleOptionTask.getOptions();

		switch (_orientationOptions.orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
			case 3/*primitives.common.OrientationType.Right*/:
				panelSize.invert();
				break;
		}

		panelSize.scale(1.0 / _scaleOptions.scale);

		// By default we translate everything forward
		_data.panelSize = panelSize;
		_data.treeItemsPositions = _treeItemsPositions;

		switch (_options.pageFitMode) {
			case 5/*primitives.common.PageFitMode.AutoSize*/:
				_data.panelSize = new primitives.common.Size(placeholderSize);
				break;
			default:
				_data.panelSize = new primitives.common.Size(placeholderSize);
				if (placeholderSize.width < panelSize.width) {
					_data.treeItemsPositions = {};
					stretchToWidth(_data.treeItemsPositions, placeholderSize.width, panelSize.width);
					_data.panelSize.width = panelSize.width;
				}
				if (placeholderSize.height < panelSize.height) {
					_data.panelSize.height = panelSize.height;
				}
				break;
		}

		switch (_orientationOptions.orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
			case 3/*primitives.common.OrientationType.Right*/:
				_data.panelSize.invert();
				break;
		}

		return true;
	}

	function stretchToWidth(treeItemsPositions, treeWidth, panelWidth) {
		var offset;
		if (isFamilyChartMode) {
			offset = (panelWidth - treeWidth) / 2.0;
		} else {
			switch (_visualTreeOptions.horizontalAlignment) {
				case 1/*primitives.common.HorizontalAlignmentType.Left*/:
					offset = 0;
					break;
				case 2/*primitives.common.HorizontalAlignmentType.Right*/:
					offset = panelWidth - treeWidth;
					break;
				case 0/*primitives.common.HorizontalAlignmentType.Center*/:
					offset = (panelWidth - treeWidth) / 2.0;
					break;
			}
		}
		translateItemPositions(treeItemsPositions, offset, 0);
	}

	function translateItemPositions(treeItemsPositions, offsetX, offsetY) {
		var treeItemid, treeItemPosition;
		for (treeItemid in _treeItemsPositions) {
			if (_treeItemsPositions.hasOwnProperty(treeItemid)) {
				treeItemPosition = new primitives.orgdiagram.TreeItemPosition(_treeItemsPositions[treeItemid]);
				treeItemPosition.actualPosition.translate(offsetX, offsetY);
				treeItemsPositions[treeItemid] = treeItemPosition;
			}
		}
	}

	function getSizes() {
		var result = [];
		var hash = {};
		for (var itemid in _data.treeItemsPositions) {
			if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
				var treeItemPosition = _data.treeItemsPositions[itemid];
				switch (treeItemPosition.actualVisibility) {
					case 1/*primitives.common.Visibility.Normal*/:
					case 2/*primitives.common.Visibility.Dot*/://ignore jslint
					case 3/*primitives.common.Visibility.Line*/:
						var item = treeItemPosition.actualPosition;
						var size = Math.max(item.width, item.height);
						if (!hash.hasOwnProperty(size)) {
							hash[size] = true;
							result.push(size);
						}
				}
			}
		}
		return result;
	}

	function getSpatialIndex() {
		if (_spatialIndex == null) {
			_spatialIndex = primitives.common.SpatialIndex(getSizes());
			for (var itemid in _data.treeItemsPositions) {
				if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
					var treeItemPosition = _data.treeItemsPositions[itemid];
					if (_activeItems.hasOwnProperty(itemid)) {
						switch (treeItemPosition.actualVisibility) {
							case 1/*primitives.common.Visibility.Normal*/:
							case 2/*primitives.common.Visibility.Dot*/://ignore jslint
							case 3/*primitives.common.Visibility.Line*/:
								var rect = new primitives.common.Rect(treeItemPosition.actualPosition);
								rect.context = itemid;
								_spatialIndex.addRect(rect);
						}
					}
				}
			}
		}
		return _spatialIndex;
	}

	function getTreeItemForMousePosition(x, y, gravityRadius) {
		var result = null,
			bestDistance = null, distance,
			scale = _scaleOptions.scale,
			spatialIndex = getSpatialIndex(),
			selection,
			center;

		x = x / scale;
		y = y / scale;
		selection = new primitives.common.Rect(x, y, 0, 0);
		center = new primitives.common.Point(x, y);
		selection.offset(gravityRadius, gravityRadius, gravityRadius, gravityRadius);

		spatialIndex.loopArea(this, selection, function (rect) {
			var itemid = rect.context;
			if (rect.contains(x, y)) {
				result = itemid;
				return true;
			}
			var treeItemPosition = _data.treeItemsPositions[itemid];
			switch (treeItemPosition.actualVisibility) {
				case 2/*primitives.common.Visibility.Dot*/://ignore jslint
				case 3/*primitives.common.Visibility.Line*/:
					var distance = center.distanceTo(rect.horizontalCenter(), rect.verticalCenter());
					if (bestDistance == null || distance < bestDistance) {
						bestDistance = distance;
						result = itemid;
					}
			}
		});

		return result;
	}

	function getKeyboardNavigationManager() {
		if (_keyboardNavigationManager == null) {
			_keyboardNavigationManager = primitives.common.KeyboardNavigationManager();
			for (var itemid in _data.treeItemsPositions) {
				if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
					var treeItemPosition = _data.treeItemsPositions[itemid];
					if (_activeItems.hasOwnProperty(itemid)) {
						switch (treeItemPosition.actualVisibility) {
							case 1/*primitives.common.Visibility.Normal*/:
								var rect = new primitives.common.Rect(treeItemPosition.actualPosition);
								_keyboardNavigationManager.addRect(rect, itemid);
						}
					}
				}
			}
		}
		return _keyboardNavigationManager;
	}

	function getNextItem(cursorItem, direction) {
		var manager = getKeyboardNavigationManager(),
			result;

		switch (direction) {
			case 0/*primitives.common.OrientationType.Top*/:
				result = manager.getItemAbove(cursorItem);
				break;
			case 1/*primitives.common.OrientationType.Bottom*/:
				result = manager.getItemBelow(cursorItem);
				break;
			case 2/*primitives.common.OrientationType.Left*/:
				result = manager.getItemOnLeft(cursorItem);
				break;
			case 3/*primitives.common.OrientationType.Right*/:
				result = manager.getItemOnRight(cursorItem);
				break;
		}

		return result;
	}

	function getItemPosition(itemid) {
		return _data.treeItemsPositions[itemid];
	}

	function getItemsPositions() {
		return _data.treeItemsPositions;
	}

	function getContentSize() {
		return _data.panelSize;
	}

	return {
		process: process,
		getItemPosition: getItemPosition,
		getItemsPositions: getItemsPositions,
		getContentSize: getContentSize,

		getTreeItemForMousePosition: getTreeItemForMousePosition,
		getNextItem: getNextItem
	};
};

/* /Controls/OrgDiagram/Tasks/Layout/ApplyLayoutChangesTask.js*/
primitives.orgdiagram.ApplyLayoutChangesTask = function (getGraphics, getLayout, itemsSizesOptionTask,
	currentControlSizeTask, scaleOptionTask, alignDiagramTask) {
	var _data = {
		scrollPanelSize: null
	},
	_itemsSizesOptions;

	function process() {
		var layout = getLayout(),
			graphics = getGraphics(),
			scaleOptions = scaleOptionTask.getOptions(),
			scale = scaleOptions.scale;

		_itemsSizesOptions = itemsSizesOptionTask.getOptions();

		/* set size of panel with content */
		var mousePanelSize = new primitives.common.Size(alignDiagramTask.getContentSize());
		mousePanelSize.scale(1 * scale);
		primitives.common.JsonML.applyStyles(layout.mousePanel, mousePanelSize.getCSS());

		/* set size of panel with content */
		var panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());
		primitives.common.JsonML.applyStyles(layout.placeholder, panelSize.getCSS());
		graphics.resize("placeholder", panelSize.width, panelSize.height);

		/* resize element to fit placeholder if control in autosize mode */
		switch (_itemsSizesOptions.pageFitMode) {
			case 5/*primitives.common.PageFitMode.AutoSize*/://ignore jslint
				_data.scrollPanelSize = new primitives.common.Size(mousePanelSize.width + 25, mousePanelSize.height + 25);
				_data.scrollPanelSize.cropBySize(_itemsSizesOptions.autoSizeMaximum);
				_data.scrollPanelSize.addSize(_itemsSizesOptions.autoSizeMinimum);//ignore jslint
				primitives.common.JsonML.applyStyles(layout.element, _data.scrollPanelSize.getCSS());
				break;
			default:
				_data.scrollPanelSize = new primitives.common.Size(currentControlSizeTask.getScrollPanelSize());
				break;
		}

		/* set scroll of content */
		var pixelAlignmentFix = primitives.common.getFixOfPixelALignment(layout.element);

		primitives.common.JsonML.applyStyles(layout.scrollPanel, {
			"top": "0px",
			"left": "0px",
			"width": _data.scrollPanelSize.width + "px",
			"height": _data.scrollPanelSize.height + "px",
			"marginBottom": "0px",
			"marginRight": "0px",
			"marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
			"marginTop": pixelAlignmentFix.height + "px"
		});

		/* set CSS scale of content */
		var scaletext = "scale(" + scale + "," + scale + ")";

		primitives.common.JsonML.applyStyles(layout.placeholder, {
			"transform-origin": "0 0",
			"transform": scaletext,
			"-ms-transform": scaletext, /* IE 9 */
			"-webkit-transform": scaletext, /* Safari and Chrome */
			"-o-transform": scaletext, /* Opera */
			"-moz-transform": scaletext /* Firefox */
		});
		return true;
	}

	function getOptimalPanelSize() {
		return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
	}

	return {
		process: process,
		getOptimalPanelSize: getOptimalPanelSize
	};
};

/* /Controls/OrgDiagram/Tasks/Layout/CenterOnCursorTask.js*/
/*
	This method should try to keep cursor item as close as possible to its previous position
*/
primitives.orgdiagram.CenterOnCursorTask = function (getLayout, currentControlSizeTask, currentScrollPositionTask, cursorItemTask, alignDiagramTask, createTransformTask, scaleOptionTask) {
	var _data = {
		placeholderOffset: null
	},
	_transform;

	function process() {
		var snapRect,
			layout = getLayout(),
			cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
			treeItemPosition = alignDiagramTask.getItemPosition(cursorTreeItemId),
			contentSize = alignDiagramTask.getContentSize(),
			scrollPanelSize,
			scaleOptions = scaleOptionTask.getOptions(),
			scale = scaleOptions.scale;

		_data.placeholderOffset = currentScrollPositionTask.getPlaceholderOffset();

		if (layout.forceCenterOnCursor) {
			_transform = createTransformTask.getTransform();
			if (treeItemPosition != null) {
				snapRect = getTransformedItemPosition(treeItemPosition.actualPosition);
				snapRect.scale(scale);
				contentSize.scale(scale);
				scrollPanelSize = currentControlSizeTask.getScrollPanelSize();
				_data.placeholderOffset = new primitives.common.Point(
					Math.max(Math.min(snapRect.horizontalCenter() - scrollPanelSize.width / 2, contentSize.width - scrollPanelSize.width), 0),
					Math.max(Math.min(snapRect.verticalCenter() - scrollPanelSize.height / 2, contentSize.height - scrollPanelSize.height), 0)
				);
			}
		}
		

		return true;
	}

	function isAnnotationNeeded(snapRect, panelPosition) {
		return !panelPosition.overlaps(snapRect);
	}

	function getTransformedItemPosition(position) {
		var result = false;

		_transform.transformRect(position.x, position.y, position.width, position.height, true,
			this, function (x, y, width, height) {
				result = new primitives.common.Rect(x, y, width, height);
			}
		);
		return result;
	}

	function getPlaceholderOffset() {
		return _data.placeholderOffset;
	}

	return {
		process: process,
		getPlaceholderOffset: getPlaceholderOffset
	};
};

/* /Controls/OrgDiagram/Tasks/Layout/CreateTransformTask.js*/
primitives.orgdiagram.CreateTransformTask = function (orientationOptionTask, alignDiagramTask) {
	var _data = {
		transform: null
	},
	_activeTreeLevels;

	function process() {
		var orientationOptions = orientationOptionTask.getOptions();

		var panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());

		_data.transform = new primitives.common.Transform();
		_data.transform.setOrientation(orientationOptions.orientationType);
		_data.transform.size = new primitives.common.Size(panelSize);

		return true;
	}

	function getTreeItemForMousePosition(x, y, gravityRadius) {
		var result = null;
		_data.transform.transformPoint(x, y, false, this, function (x, y) {
			result = alignDiagramTask.getTreeItemForMousePosition(x, y, gravityRadius);
		});
		return result;
	}

	function getTransform() {
		return _data.transform;
	}

	return {
		process: process,
		getTransform: getTransform,
		getTreeItemForMousePosition: getTreeItemForMousePosition,
		description: "Create oordiante system tranfromation object."
	};
};

/* /Controls/OrgDiagram/Tasks/Layout/CurrentControlSizeTask.js*/
primitives.orgdiagram.CurrentControlSizeTask = function (getLayout, optionsTask, itemsSizesOptionTask) {
	var _data = {
		scrollPanelSize: null
	},
	_hash = {},
	_dataTemplate = new primitives.common.ObjectReader({
		scrollPanelSize: new primitives.common.ObjectReader({
			width: new primitives.common.ValueReader(["number"], true),
			height: new primitives.common.ValueReader(["number"], true)
		}, true)
	});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		layout = getLayout(),
		currentLayout = {
			scrollPanelSize: primitives.common.getInnerSize(layout.element)
		},
		result = false,
		options = itemsSizesOptionTask.getOptions();

		_data = _dataTemplate.read(_data, currentLayout, "layout", context);

		switch (options.pageFitMode) {
			case 1/*primitives.common.PageFitMode.PageWidth*/:
			case 2/*primitives.common.PageFitMode.PageHeight*/:
			case 3/*primitives.common.PageFitMode.FitToPage*/:
			case 0/*primitives.common.PageFitMode.None*/:
				result = context.isChanged;
				break;
			default:
				break;

		}

		return result;
	}

	function getScrollPanelSize() {
		return _data.scrollPanelSize;
	}

	function getOptimalPanelSize() {
		return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
	}

	return {
		process: process,
		getScrollPanelSize: getScrollPanelSize,
		getOptimalPanelSize: getOptimalPanelSize
	};
};

/* /Controls/OrgDiagram/Tasks/Layout/CurrentScrollPositionTask.js*/
primitives.orgdiagram.CurrentScrollPositionTask = function (getLayout, optionsTask) {
	var _data = {
		placeholderOffset: null
	},
	_hash = {},
	_dataTemplate = new primitives.common.ObjectReader({
		placeholderOffset: new primitives.common.ObjectReader({
			x: new primitives.common.ValueReader(["number"], true),
			y: new primitives.common.ValueReader(["number"], true)
		}, true)
	});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		layout = getLayout(),
		currentLayout = {
			placeholderOffset: new primitives.common.Point(layout.scrollPanel.scrollLeft, layout.scrollPanel.scrollTop)
		};
		_data = _dataTemplate.read(_data, currentLayout, "layout", context);

		return context.isChanged;
	}

	function getPlaceholderOffset() {
		return _data.placeholderOffset;
	}

	return {
		process: process,
		getPlaceholderOffset: getPlaceholderOffset
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Annotations/BackgroundAnnotationOptionTask.js*/
primitives.orgdiagram.BackgroundAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultBackgroundAnnotationConfig) {
	var _annotations = [],
		_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				items: new primitives.common.ArrayReader(
					new primitives.common.ValueReader(["string", "number"], true),
					true
				),
				includeChildren: new primitives.common.ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.includeChildren),
				zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultBackgroundAnnotationConfig.zOrderType),
				offset: new primitives.common.ObjectReader({
					left: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.left),
					top: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.top),
					right: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.right),
					bottom: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.bottom)
				}, false, defaultBackgroundAnnotationConfig.offset),
				lineWidth: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.lineWidth),
				opacity: new primitives.common.ValueReader(["number"], false, defaultBackgroundAnnotationConfig.opacity),
				borderColor: new primitives.common.ValueReader(["string"], false, defaultBackgroundAnnotationConfig.borderColor),
				fillColor: new primitives.common.ValueReader(["string"], false, defaultBackgroundAnnotationConfig.fillColor),
				lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultBackgroundAnnotationConfig.lineType),
				selectItems: new primitives.common.ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.selectItems)
			}),
			false
		);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(4/*primitives.common.AnnotationType.Background*/, null), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _annotations;
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Annotations/ConnectorAnnotationOptionTask.js*/
primitives.orgdiagram.ConnectorAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultConnectorAnnotationConfig, zOrderType) {
	var _annotations = [],
		_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultConnectorAnnotationConfig.zOrderType),
				fromItem: new primitives.common.ValueReader(["string", "number"], true),
				toItem: new primitives.common.ValueReader(["string", "number"], true),
				connectorShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, false, defaultConnectorAnnotationConfig.connectorShapeType),
				connectorPlacementType: new primitives.common.EnumerationReader(primitives.common.ConnectorPlacementType, false, defaultConnectorAnnotationConfig.connectorPlacementType),
				labelPlacementType: new primitives.common.EnumerationReader(primitives.common.ConnectorLabelPlacementType, false, defaultConnectorAnnotationConfig.labelPlacementType),
				offset: new primitives.common.ObjectReader({
					left: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.left),
					top: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.top),
					right: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.right),
					bottom: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.bottom)
				}, false, defaultConnectorAnnotationConfig.offset),
				lineWidth: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.lineWidth),
				color: new primitives.common.ValueReader(["string"], false, defaultConnectorAnnotationConfig.color),
				lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConnectorAnnotationConfig.lineType),
				selectItems: new primitives.common.ValueReader(["boolean"], false, defaultConnectorAnnotationConfig.selectItems),
				label: new primitives.common.ValueReader(["string", "object"], false, defaultConnectorAnnotationConfig.label),
				labelSize: new primitives.common.ObjectReader({
					width: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.width),
					height: new primitives.common.ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.height)
				}, false, defaultConnectorAnnotationConfig.labelSize)
			}),
			false
		);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(0/*primitives.common.AnnotationType.Connector*/, zOrderType), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _annotations;
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Annotations/HighlightPathAnnotationOptionTask.js*/
primitives.orgdiagram.HighlightPathAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultHighlightPathAnnotationConfig, zOrderType) {
	var _data = {},
		_annotations = [],
		_hash = {};

	var _dataAnnotationsTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultHighlightPathAnnotationConfig.zOrderType),
				lineWidth: new primitives.common.ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.lineWidth),
				opacity: new primitives.common.ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.opacity),
				color: new primitives.common.ValueReader(["string"], false, defaultHighlightPathAnnotationConfig.color),
				lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultHighlightPathAnnotationConfig.lineType),
				items: new primitives.common.ArrayReader(
					new primitives.common.ValueReader(["string", "number"], true),
					false
				),
				selectItems: new primitives.common.ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.selectItems),
				showArrows: new primitives.common.ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.showArrows)
			},
			false)
		);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_annotations = _dataAnnotationsTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(2/*primitives.common.AnnotationType.HighlightPath*/, zOrderType), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _annotations;
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Annotations/ShapeAnnotationOptionTask.js*/
primitives.orgdiagram.ShapeAnnotationOptionTask = function (splitAnnotationsOptionTask, defaultShapeAnnotationConfig, zOrderType) {
	var _annotations = [],
		_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ObjectReader({
				zOrderType: new primitives.common.EnumerationReader(primitives.common.ZOrderType, false, defaultShapeAnnotationConfig.zOrderType),
				items: new primitives.common.ArrayReader(
					new primitives.common.ValueReader(["string", "number"], true),
					true
				),
				shapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, false, defaultShapeAnnotationConfig.shapeType),
				offset: new primitives.common.ObjectReader({
					left: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.left),
					top: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.top),
					right: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.right),
					bottom: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.bottom)
				}, false, defaultShapeAnnotationConfig.offset),
				lineWidth: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.lineWidth),
				cornerRadius: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.cornerRadius),
				opacity: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.opacity),
				borderColor: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.borderColor),
				fillColor: new primitives.common.ValueReader(["string"], false, defaultShapeAnnotationConfig.fillColor),
				lineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultShapeAnnotationConfig.lineType),
				selectItems: new primitives.common.ValueReader(["boolean"], false, defaultShapeAnnotationConfig.selectItems),
				label: new primitives.common.ValueReader(["string", "object"], false, defaultShapeAnnotationConfig.label),
				labelSize: new primitives.common.ObjectReader({
					width: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.width),
					height: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.height)
				}, false, defaultShapeAnnotationConfig.labelSize),
				labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultShapeAnnotationConfig.labelPlacement),
				labelOffset: new primitives.common.ValueReader(["number"], false, defaultShapeAnnotationConfig.labelOffset)
			},
			false
		)
		);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(1/*primitives.common.AnnotationType.Shape*/, zOrderType), "annotations", context);

		return context.isChanged;
	}

	function getAnnotations() {
		return _annotations;
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Annotations/SplitAnnotationsOptionTask.js*/
primitives.orgdiagram.SplitAnnotationsOptionTask = function (optionsTask) {
	var _data = {
		annotations: {}
	};

	function process() {
		var options = optionsTask.getOptions(),
			annotations = options.annotations,
			index, len,
			annotationConfig,
			annotationType,
			zOrderType,
			key,
			hash = {};

		if (primitives.common.isArray(annotations)) {
			for (index = 0, len = annotations.length; index < len; index += 1) {
				annotationConfig = annotations[index];
				annotationType = annotationConfig.annotationType;

				switch (annotationType) {
					case 1/*primitives.common.AnnotationType.Shape*/:
					case 0/*primitives.common.AnnotationType.Connector*/:
					case 2/*primitives.common.AnnotationType.HighlightPath*/:
						switch (annotationConfig.zOrderType) {
							case 1/*primitives.common.ZOrderType.Background*/:
								zOrderType = 1/*primitives.common.ZOrderType.Background*/;
								break;
							case 2/*primitives.common.ZOrderType.Foreground*/:
							case 0/*primitives.common.ZOrderType.Auto*/: //ignore jslint
							default: 
								zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;
								break;
						}
						break;
					case 4/*primitives.common.AnnotationType.Background*/:
					case 3/*primitives.common.AnnotationType.Label*/: //ignore jslint
					default:
						zOrderType = null;
						break;
				}

				if (annotationType != null) {
					key = annotationType * 1000 + (zOrderType || 0);

					if (!hash.hasOwnProperty(key)) {
						hash[key] = [];
					}
					hash[key].push(annotationConfig);
				}
			}
		}

		_data.annotations = hash;

		return true;
	}

	function getAnnotations(annotationType, zOrderType) {
		var key = annotationType * 1000 + (zOrderType || 0);
		return _data.annotations[key];
	}

	return {
		process: process,
		getAnnotations: getAnnotations
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Selection/CursorItemOptionTask.js*/
primitives.orgdiagram.CursorItemOptionTask = function (optionsTask, defaultConfig) {
	var _data = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		cursorItem: new primitives.common.ValueReader(["string", "number"], true),
		navigationMode: new primitives.common.EnumerationReader(primitives.common.NavigationMode, false, defaultConfig.navigationMode)
	});

	function process() {
		var context = {
			isChanged: false
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getCursorItem() {
		return _data.cursorItem;
	}

	function hasCursorEnabled() {
		switch (_data.navigationMode) {
			case 0/*primitives.common.NavigationMode.Default*/:
			case 1/*primitives.common.NavigationMode.CursorOnly*/:
				return true;
		}
		return false;
	}

	return {
		process: process,
		getCursorItem: getCursorItem,
		hasCursorEnabled: hasCursorEnabled,
		description: "Checks currenct cursor item option."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Selection/CursorSelectionPathModeOptionTask.js*/
primitives.orgdiagram.CursorSelectionPathModeOptionTask = function (optionsTask, defaultConfig) {
	var _data = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			selectionPathMode: new primitives.common.EnumerationReader(primitives.common.SelectionPathMode, false, defaultConfig.selectionPathMode)
		});

	function process() {
		var context = {
			isChanged: false
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getSelectionPathMode() {
		return _data.selectionPathMode;
	}

	return {
		process: process,
		getSelectionPathMode: getSelectionPathMode,
		description: "Checks cursor selection path option."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Selection/HighlightItemOptionTask.js*/
primitives.orgdiagram.HighlightItemOptionTask = function (optionsTask, defaultConfig) {
	var _data = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		highlightItem: new primitives.common.ValueReader(["string", "number"], true),
		navigationMode: new primitives.common.EnumerationReader(primitives.common.NavigationMode, false, defaultConfig.navigationMode),
		highlightGravityRadius: new primitives.common.ValueReader(["number"], false, defaultConfig.highlightGravityRadius)
		});

	function process() {
		var context = {
			isChanged: false
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getHighlightItem() {
		return _data.highlightItem;
	}

	function getGravityRadius() {
		return _data.highlightGravityRadius;
	}

	function hasHighlightEnabled() {
		switch (_data.navigationMode) {
			case 0/*primitives.common.NavigationMode.Default*/:
			case 3/*primitives.common.NavigationMode.HighlightOnly*/:
				return true;
		}
		return false;
	}

	return {
		process: process,
		getHighlightItem: getHighlightItem,
		hasHighlightEnabled: hasHighlightEnabled,
		getGravityRadius: getGravityRadius,
		description: "Checks highlight item option."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/Selection/SelectedItemsOptionTask.js*/
primitives.orgdiagram.SelectedItemsOptionTask = function (optionsTask) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			selectedItems: new primitives.common.ArrayReader(
				new primitives.common.ValueReader(["string", "number"], true),
				true
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		options = optionsTask.getOptions();

		_data = _dataTemplate.read(_data, options, "options", context);
		return context.isChanged;
	}

	function getSelectedItems() {
		return _data.selectedItems;
	}

	return {
		process: process,
		getSelectedItems: getSelectedItems,
		description: "Checks user selected items option."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/CalloutOptionTask.js*/
primitives.orgdiagram.CalloutOptionTask = function (optionsTask, defaultConfig, defaultItemConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			calloutMaximumVisibility: new primitives.common.EnumerationReader(primitives.common.Visibility, false, defaultConfig.calloutMaximumVisibility),
			showCallout: new primitives.common.ValueReader(["boolean"], false, defaultConfig.showCallout),
			calloutPlacementOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutPlacementOffset),
			orientationType: new primitives.common.EnumerationReader(primitives.common.OrientationType, false, defaultConfig.orientationType),

			defaultTemplateName: new primitives.common.ValueReader(["string"], true),
			defaultCalloutTemplateName: new primitives.common.ValueReader(["string"], true),

			calloutfillColor: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutfillColor),
			calloutBorderColor: new primitives.common.ValueReader(["string"], true),
			calloutOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutOffset),
			calloutCornerRadius: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutCornerRadius),
			calloutPointerWidth: new primitives.common.ValueReader(["string"], false, defaultConfig.calloutPointerWidth),
			calloutLineWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutLineWidth),
			calloutOpacity: new primitives.common.ValueReader(["number"], false, defaultConfig.calloutOpacity),

			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					showCallout: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.showCallout),
					calloutTemplateName: new primitives.common.ValueReader(["string"], true),
					templateName: new primitives.common.ValueReader(["string"], true)
				}),
				true,
				"id"
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItemOptions(itemid) {
		return _hash["options-items"][itemid];
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		getItemOptions: getItemOptions,
		description: "Checks item callout options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/ConnectorsOptionTask.js*/
primitives.orgdiagram.ConnectorsOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
		arrowsDirection: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.arrowsDirection),
		showExtraArrows: new primitives.common.ValueReader(["boolean"], false, defaultConfig.showExtraArrows),
		extraArrowsMinimumSpace: new primitives.common.ValueReader(["number"], false, defaultConfig.extraArrowsMinimumSpace),
		connectorType: new primitives.common.EnumerationReader(primitives.common.ConnectorType, false, defaultConfig.hasOwnProperty("connectorType") ? defaultConfig.connectorType : 0/*primitives.common.ConnectorType.Squared*/),
		showNeigboursConnectorsHighlighted: new primitives.common.EnumerationReader(primitives.common.ConnectorType, false, defaultConfig.hasOwnProperty("showNeigboursConnectorsHighlighted") ? defaultConfig.showNeigboursConnectorsHighlighted : false),
		elbowType: new primitives.common.EnumerationReader(primitives.common.ElbowType, false, defaultConfig.elbowType),
		bevelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.bevelSize),
		elbowDotSize: new primitives.common.ValueReader(["number"], false, defaultConfig.elbowDotSize),
		linesColor: new primitives.common.ValueReader(["string"], false, defaultConfig.linesColor),
		linesWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.linesWidth),
		linesType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConfig.linesType),
		highlightLinesColor: new primitives.common.ValueReader(["string"], false, defaultConfig.highlightLinesColor),
		highlightLinesWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.highlightLinesWidth),
		highlightLinesType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConfig.highlightLinesType)
	});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Checks connector lines drawing options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/ItemsContentOptionTask.js*/
primitives.orgdiagram.ItemsContentOptionTask = function (optionsTask, defaultItemConfig) {
	var _data = {},
		_hash = {},
		_sourceHash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					title: new primitives.common.ValueReader(["string"], true),
					description: new primitives.common.ValueReader(["string"], true),
					image: new primitives.common.ValueReader(["string"], true),
					context: new primitives.common.ValueReader(["string", "number", "object"], true),
					itemTitleColor: new primitives.common.ValueReader(["string"], false, defaultItemConfig.itemTitleColor),
					groupTitle: new primitives.common.ValueReader(["string"], false, defaultItemConfig.groupTitle),
					groupTitleColor: new primitives.common.ValueReader(["string"], false, defaultItemConfig.groupTitleColor)
				}),
				true,
				"id",
				true,
				true
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash,
			sourceHash: _sourceHash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItems() {
		return _data.items;
	}

	function getConfig(itemId) {
		return _sourceHash["options-items"][itemId];
	}

	return {
		process: process,
		getItems: getItems,
		getConfig: getConfig,
		description: "Checks items configuration options effecting their placement in layout."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/ItemsOptionTask.js*/
primitives.orgdiagram.ItemsOptionTask = function (optionsTask, defaultItemConfig) {
	var _data = {},
		_hash = {},
		_sourceHash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					parent: new primitives.common.ValueReader(["string", "number"], true),
					itemType: new primitives.common.EnumerationReader(primitives.orgdiagram.ItemType, false, defaultItemConfig.itemType),
					adviserPlacementType: new primitives.common.EnumerationReader(primitives.common.AdviserPlacementType, false, defaultItemConfig.adviserPlacementType),
					childrenPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultItemConfig.childrenPlacementType),
					isVisible: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isVisible),
					isActive: new primitives.common.ValueReader(["boolean"], false, defaultItemConfig.isActive)
				}),
				true,
				"id",
				true,
				true
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash,
			sourceHash: _sourceHash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItems() {
		return _data.items;
	}

	function getConfig(itemId) {
		return _sourceHash["options-items"][itemId];
	}

	return {
		process: process,
		getItems: getItems,
		getConfig: getConfig,
		description: "Checks items configuration options effecting their placement in layout."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/ItemsSizesOptionTask.js*/
primitives.orgdiagram.ItemsSizesOptionTask = function (optionsTask, defaultConfig, defaultItemConfig, defaultButtonConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			/*item template options*/
			defaultTemplateName: new primitives.common.ValueReader(["string"], true),
			defaultLabelAnnotationTemplate: new primitives.common.ValueReader(["string"], true),
			hasSelectorCheckbox: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.hasSelectorCheckbox),
			hasButtons: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.hasButtons),
			buttonsPanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.buttonsPanelSize),
			groupTitlePanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.groupTitlePanelSize),
			groupTitlePlacementType: new primitives.common.EnumerationReader(primitives.common.AdviserPlacementType, false, defaultConfig.groupTitlePlacementType),
			checkBoxPanelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.checkBoxPanelSize),
			selectCheckBoxLabel: new primitives.common.ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
			buttons: new primitives.common.ArrayReader(new primitives.common.ObjectReader({
						name: new primitives.common.ValueReader(["string"], true),
						icon: new primitives.common.ValueReader(["string"], true),
						text: new primitives.common.ValueReader(["boolean"], false, false),
						tooltip: new primitives.common.ValueReader(["string"], true),
						size: new primitives.common.ObjectReader({
							width: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.width),
							height: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.height)
						}, false, defaultButtonConfig.size)
				}),
				true,
				"name"
			),
			/* items visibility */
			pageFitMode: new primitives.common.EnumerationReader(primitives.common.PageFitMode, false, defaultConfig.pageFitMode),
			minimalVisibility: new primitives.common.EnumerationReader(primitives.common.Visibility, false, defaultConfig.minimalVisibility),
			selectionPathMode: new primitives.common.EnumerationReader(primitives.common.SelectionPathMode, false, defaultConfig.selectionPathMode),
			autoSizeMinimum: new primitives.common.ObjectReader({
				width: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMinimum.width),
				height: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMinimum.height)
			}, false, defaultConfig.autoSizeMinimum),
			autoSizeMaximum: new primitives.common.ObjectReader({
				width: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMaximum.width),
				height: new primitives.common.ValueReader(["number"], false, defaultConfig.autoSizeMaximum.height)
			}, false, defaultConfig.autoSizeMaximum),
			/* scale */
			scale: new primitives.common.ValueReader(["number"], false, defaultConfig.scale),
			maximumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumScale),
			minimumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumScale),
			/*intervals*/
			normalLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.normalLevelShift),
			dotLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.dotLevelShift),
			lineLevelShift: new primitives.common.ValueReader(["number"], false, defaultConfig.lineLevelShift),
			normalItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.normalItemsInterval),
			dotItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.dotItemsInterval),
			lineItemsInterval: new primitives.common.ValueReader(["number"], false, defaultConfig.lineItemsInterval),
			/*cousiins branches interval multiplier*/
			cousinsIntervalMultiplier: new primitives.common.ValueReader(["number"], false, defaultConfig.cousinsIntervalMultiplier),

			verticalAlignment: new primitives.common.EnumerationReader(primitives.common.VerticalAlignmentType, false, defaultConfig.verticalAlignment),

			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					groupTitle: new primitives.common.ValueReader(["string", "number"], true),
					isVisible: new primitives.common.ValueReader(["boolean", "number"], false, defaultItemConfig.isVisible),
					isActive: new primitives.common.ValueReader(["boolean", "number"], false, defaultItemConfig.isActive),
					hasSelectorCheckbox: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.hasSelectorCheckbox),
					hasButtons: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.hasButtons),
					templateName: new primitives.common.ValueReader(["string"], true)
				}),
				true,
				"id"
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItemOptions(itemid) {
		return _hash["options-items"][itemid];
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getItemOptions: getItemOptions,
		getOptions: getOptions,
		description: "Checks items size options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/LabelsOptionTask.js*/
primitives.orgdiagram.LabelsOptionTask = function (optionsTask, defaultConfig, defaultItemConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			showLabels: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultConfig.showLabels),
			labelOffset: new primitives.common.ValueReader(["number"], false, defaultConfig.labelOffset),
			labelFontSize: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontSize),
			labelFontFamily: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontFamily),
			labelFontStyle: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontStyle),
			labelFontWeight: new primitives.common.ValueReader(["string"], false, defaultConfig.labelFontWeight),
			labelColor: new primitives.common.ValueReader(["string"], false, defaultConfig.labelColor),
			labelSize: new primitives.common.ObjectReader({
				width: new primitives.common.ValueReader(["number"], false, defaultConfig.labelSize.width),
				height: new primitives.common.ValueReader(["number"], false, defaultConfig.labelSize.height)
			}, false, defaultConfig.labelSize),
			labelOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultConfig.labelOrientation),
			labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultConfig.labelPlacement),
			arrowsDirection: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.arrowsDirection),
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					label: new primitives.common.ValueReader(["string", "number"], true),
					showLabel: new primitives.common.EnumerationReader(primitives.common.Enabled, false, defaultItemConfig.showLabel),
					labelSize: new primitives.common.ObjectReader({
						width: new primitives.common.ValueReader(["number"], false, 0),
						height: new primitives.common.ValueReader(["number"], false, 0)
					}, true),
					labelOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultItemConfig.labelOrientation),
					labelPlacement: new primitives.common.EnumerationReader(primitives.common.PlacementType, false, defaultItemConfig.labelPlacement)
				}),
				true,
				"id"
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItemsOptions() {
		return _hash["options-items"];
	}

	function getItemOptions(itemid) {
		return _hash["options-items"][itemid];
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getItemOptions: getItemOptions,
		getItemsOptions: getItemsOptions,
		getOptions: getOptions,
		description: "Checks items labels options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/MinimizedItemsOptionTask.js*/
primitives.orgdiagram.MinimizedItemsOptionTask = function (optionsTask) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
			items: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					id: new primitives.common.ValueReader(["string", "number"], true),
					minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
					itemTitleColor: new primitives.common.ValueReader(["string"], true)
				}),
				true,
				"id"
				)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getItemOptions(itemid) {
		return _hash["options-items"][itemid];
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getItemOptions: getItemOptions,
		getOptions: getOptions,
		description: "Checks minimized items drawing options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/OptionsTask.js*/
primitives.orgdiagram.OptionsTask = function (getOptions) {

	function process() {
		return true;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Raw options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/OrientationOptionTask.js*/
primitives.orgdiagram.OrientationOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			orientationType: new primitives.common.EnumerationReader(primitives.common.OrientationType, false, defaultConfig.orientationType)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Checks diagram orientation options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/ScaleOptionTask.js*/
primitives.orgdiagram.ScaleOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			scale: new primitives.common.ValueReader(["number"], false, defaultConfig.scale),
			minimumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.minimumScale),
			maximumScale: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumScale)
		});
	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Checks control scale options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/TemplatesOptionTask.js*/
primitives.orgdiagram.TemplatesOptionTask = function (optionsTask, defaultConfig, defaultButtonConfig, defaultTemplateConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			groupTitleVerticalAlignment: new primitives.common.EnumerationReader(primitives.common.VerticalAlignmentType, false, defaultConfig.groupTitleVerticalAlignment),
			groupTitleHorizontalAlignment: new primitives.common.EnumerationReader(primitives.common.HorizontalAlignmentType, false, defaultConfig.groupTitleHorizontalAlignment),
			groupTitleOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultConfig.groupTitleOrientation),
			groupTitleFontSize: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontSize),
			groupTitleFontFamily: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontFamily),
			groupTitleColor: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleColor),
			groupTitleFontWeight: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontWeight),
			groupTitleFontStyle: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontStyle),

			itemTitleFirstFontColor: new primitives.common.ValueReader(["string"], false, defaultConfig.itemTitleFirstFontColor),
			itemTitleSecondFontColor: new primitives.common.ValueReader(["string"], false, defaultConfig.itemTitleSecondFontColor),
			selectCheckBoxLabel: new primitives.common.ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
			onItemRender: new primitives.common.FunctionReader(),
			onCursorRender: new primitives.common.FunctionReader(),
			onHighlightRender: new primitives.common.FunctionReader(),
			templates: new primitives.common.ArrayReader(
				new primitives.common.ObjectReader({
					name: new primitives.common.ValueReader(["string"], true),
					isActive: new primitives.common.ValueReader(["boolean"], false, defaultTemplateConfig.isActive),
					itemSize: new primitives.common.ObjectReader({
						width: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemSize.width),
						height: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemSize.height)
					}, false, defaultTemplateConfig.itemSize),
					itemBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemBorderWidth),
					itemTemplate: new primitives.common.ValueReader(["string", "object"], true),
					minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
					minimizedItemSize: new primitives.common.ObjectReader({
						width: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.width),
						height: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.height)
					}, false, defaultTemplateConfig.minimizedItemSize),
					minimizedItemCornerRadius: new primitives.common.ValueReader(["number"], true),
					minimizedItemLineWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemLineWidth),
					minimizedItemBorderColor: new primitives.common.ValueReader(["string"], true),
					minimizedItemLineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultTemplateConfig.minimizedItemLineType),
					minimizedItemFillColor: new primitives.common.ValueReader(["string"], true),
					minimizedItemOpacity: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemOpacity),
					highlightPadding: new primitives.common.ObjectReader({
						left: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.left),
						top: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.top),
						right: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.right),
						bottom: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.bottom)
					}, false, defaultTemplateConfig.highlightPadding),
					highlightBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightBorderWidth),
					highlightTemplate: new primitives.common.ValueReader(["string", "object"], true),
					cursorPadding: new primitives.common.ObjectReader({
						left: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.left),
						top: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.top),
						right: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.right),
						bottom: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.bottom)
					}, false, defaultTemplateConfig.cursorPadding),
					cursorBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorBorderWidth),
					cursorTemplate: new primitives.common.ValueReader(["string", "object"], true),
					buttons: new primitives.common.ArrayReader(new primitives.common.ObjectReader({
						name: new primitives.common.ValueReader(["string"], true),
						icon: new primitives.common.ValueReader(["string"], true),
						text: new primitives.common.ValueReader(["boolean"], false, false),
						tooltip: new primitives.common.ValueReader(["string"], true),
						size: new primitives.common.ObjectReader({
							width: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.width),
							height: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.height)
						}, false, defaultButtonConfig.size)
					}),
					true,
					"name"
					)
				}),
				true,
				"name"
				)
		});


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Checks items template options."
	};
};

/* /Controls/OrgDiagram/Tasks/Options/VisualTreeOptionTask.js*/
primitives.orgdiagram.VisualTreeOptionTask = function (optionsTask, defaultConfig) {
	var _data = {},
		_hash = {};

	var _dataTemplate = new primitives.common.ObjectReader({
			leavesPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultConfig.leavesPlacementType),
			childrenPlacementType: new primitives.common.EnumerationReader(primitives.common.ChildrenPlacementType, false, defaultConfig.childrenPlacementType),
			maximumColumnsInMatrix: new primitives.common.ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
			horizontalAlignment: new primitives.common.EnumerationReader(primitives.common.HorizontalAlignmentType, false, defaultConfig.horizontalAlignment)
		});

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		};

		_data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

		return context.isChanged;
	}

	function getOptions() {
		return _data;
	}

	return {
		process: process,
		getOptions: getOptions,
		description: "Checks items layout options."
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/OffsetResolver/CollinearVectorBundle.js*/
primitives.orgdiagram.CollinearVectorBundle = function () {
	var _boundingRect = new primitives.common.Rect(),
		_vectors = [],
		_continuations = [];

	function addVector(vector, continuation) {
		_vectors.push(vector);
		_continuations.push(continuation);

		_boundingRect.addRect(vector.from.x, vector.from.y);
		_boundingRect.addRect(vector.to.x, vector.to.y);
	}

	function loopProjections(callback) { // calback(from, to)
		var index, len,
			vector;
		if (_boundingRect.width > _boundingRect.height) {
			for (index = 0, len = _vectors.length; index < len; index += 1) {
				vector = _vectors[index];
				callback(vector.from.x, vector.to.x, _continuations[index]);
			}
		} else {
			for (index = 0, len = _vectors.length; index < len; index += 1) {
				vector = _vectors[index];
				callback(vector.from.y, vector.to.y, _continuations[index]);
			}
		}
	}

	function resolve() {
		if (_vectors.length == 1) {
			_continuations[0](0, 1, 1);
		} else {
			var stackSegments = primitives.common.pile();
			loopProjections(function (from, to, continuation) {
				stackSegments.add(from, to, continuation);
			});

			var totalOffset = stackSegments.resolve(this, function (from, to, context, offset, bundleSize, direction) {
				context(offset, bundleSize, direction);
			});
		}
	}

	return {
		addVector: addVector,
		resolve: resolve
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/OffsetResolver/ConnectorAnnotationOffsetResolver.js*/
primitives.orgdiagram.ConnectorAnnotationOffsetResolver = function () {
	var _bundles = {};

	function getOffset(vector, callback) {
		var key = vector.getLineKey();

		if (!_bundles.hasOwnProperty(key)) {
			_bundles[key] = new primitives.orgdiagram.CollinearVectorBundle();
		}

		_bundles[key].addVector(vector, callback);
	}

	function resolve() {
		for (var key in _bundles) {
			if (_bundles.hasOwnProperty(key)) {
				var bundle = _bundles[key];
				bundle.resolve();
			}
		}
	}

	return {
		getOffset: getOffset,
		resolve: resolve
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawBackgroundAnnotationTask.js*/
primitives.orgdiagram.DrawBackgroundAnnotationTask = function (getGraphics, createTransformTask, applyLayoutChangesTask,
	backgroundAnnotationOptionTask, navigationFamilyTask, alignDiagramTask) {
	var _graphics,
		_positions,
		_transform;

	function process() {
		var annotations = backgroundAnnotationOptionTask.getAnnotations(),
			navigationFamily;

		_graphics = getGraphics();
		_graphics.reset("placeholder", 2/*primitives.common.Layers.BackgroundAnnotation*/);

		if (annotations.length > 0) {
			_positions = alignDiagramTask.getItemsPositions();
			_transform = createTransformTask.getTransform();

			navigationFamily = navigationFamilyTask.getNavigationFamily();

			drawAnnotations(annotations, _positions, navigationFamily);
		}

		return false;
	}

	function drawAnnotations(annotations, positions, navigationFamily) {
		var panel,
			index, len,
			index2, len2,
			index3, len3,
			shape,
			defaultConfig,
			rects, rect,
			itemsHash, item,
			properties, property,
			annotationConfig, treeItemPosition;

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotationConfig = annotations[index];

			if (annotationConfig.items != null && annotationConfig.items.length > 0) {
				shape = new primitives.common.MergedRectangles(_graphics);
				shape.transform = _transform;
				defaultConfig = new primitives.orgdiagram.BackgroundAnnotationConfig();
				properties = ["opacity", "lineWidth", "borderColor", "fillColor", "lineType"];
				for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
					property = properties[index3];
					shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
				}
				panel = _graphics.activate("placeholder", 2/*primitives.common.Layers.BackgroundAnnotation*/);

				rects = [];
				itemsHash = {};
				for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
					item = annotationConfig.items[index2];
					treeItemPosition = alignDiagramTask.getItemPosition(item);
					if (treeItemPosition != null) {
						itemsHash[item] = true;
						rect = new primitives.common.Rect(treeItemPosition.actualPosition);
						rect.offset(annotationConfig.offset);
						rects.push(rect);

						if (annotationConfig.includeChildren) {
							navigationFamily.loopChildren(this, item, function (childItemId, childItem) {
								if (!itemsHash[childItemId]) {
									itemsHash[childItemId] = true;
									treeItemPosition = alignDiagramTask.getItemPosition(childItemId);
									rect = new primitives.common.Rect(treeItemPosition.actualPosition);
									rect.offset(annotationConfig.offset);
									rects.push(rect);
								}
							}); //ignore jslint
						}
					}
				}
				shape.draw(rects);
			}
		}
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawConnectorAnnotationTask.js*/
primitives.orgdiagram.DrawConnectorAnnotationTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
	orientationOptionTask, connectorAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
	var _graphics,
		_transform,
		_orientationOptions,
		_annotationLabelTemplate,
		_panelSize;

	function process() {

		_graphics = getGraphics();

		_transform = createTranfromTask.getTransform();
		_orientationOptions = orientationOptionTask.getOptions();

		_annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

		_panelSize = new primitives.common.Size(alignDiagramTask.getContentSize());

		switch (zOrderType) {
			case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
				_graphics.reset("placeholder", 4/*primitives.common.Layers.BackgroundConnectorAnnotation*/);
				break;
			case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
				_graphics.reset("placeholder",  14/*primitives.common.Layers.ForegroundConnectorAnnotation*/);
				break;
		}

		drawAnnotations(connectorAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

		return false;
	}

	function drawAnnotations(annotations, getItemPosition) {
		var panel,
			index, len,
			layer = 14/*primitives.common.Layers.ForegroundConnectorAnnotation*/,
			fromItemPosition, fromActualPosition,
			toItemPosition, toActualPosition,
			shape,
			annotationConfig,
			uiHash,
			buffer = new primitives.common.PolylinesBuffer(),
			labelPlacement,
			connectorAnnotationOffsetResolver = primitives.orgdiagram.ConnectorAnnotationOffsetResolver(),
			maximumLineWidth = 0;

		switch (zOrderType) {
			case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
				panel = _graphics.activate("placeholder", 4/*primitives.common.Layers.BackgroundConnectorAnnotation*/);
				break;
			case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
				panel = _graphics.activate("placeholder", 14/*primitives.common.Layers.ForegroundConnectorAnnotation*/);
				break;
		}

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotationConfig = annotations[index];
			maximumLineWidth = Math.max(maximumLineWidth, annotationConfig.lineWidth);
		}

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotationConfig = annotations[index];

			if (annotationConfig.fromItem != null && annotationConfig.toItem != null) {
				fromItemPosition = getItemPosition(annotationConfig.fromItem);
				toItemPosition = getItemPosition(annotationConfig.toItem);
				if (fromItemPosition != null && toItemPosition != null) {
					fromActualPosition = fromItemPosition.actualPosition;
					toActualPosition = toItemPosition.actualPosition;

					switch (annotationConfig.connectorPlacementType) {
						case 0/*primitives.common.ConnectorPlacementType.Offbeat*/:
							shape = new primitives.common.ConnectorOffbeat();
							break;
						case 1/*primitives.common.ConnectorPlacementType.Straight*/:
							shape = new primitives.common.ConnectorStraight();
							break;
					}

					/* rotate label size to user orientation */
					var labelSize;
					_transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
					this, function (x, y, width, height) {
						labelSize = new primitives.common.Size(width, height);
					});

					/* rotate panel size to user orientation */
					var panelSize = null;
					_transform.transformRect(0, 0, _panelSize.width, _panelSize.height, false,
					this, function (x, y, width, height) {
						panelSize = new primitives.common.Size(width, height);
					});

					var linePaletteItem = new primitives.common.PaletteItem({
						lineColor: annotationConfig.color,
						lineWidth: annotationConfig.lineWidth,
						lineType: annotationConfig.lineType
					});

					var hasLabel = !primitives.common.isNullOrEmpty(annotationConfig.label);

					/* offset rectangles */
					var fromRect = new primitives.common.Rect(fromActualPosition).offset(annotationConfig.offset);
					var toRect = new primitives.common.Rect(toActualPosition).offset(annotationConfig.offset);

					var linesOffset = annotationConfig.lineWidth * 3;
					var bundleOffset = maximumLineWidth * 6;

					/* create connection lines */
					shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize,
						annotationConfig.connectorShapeType, 4 /*labelOffset*/, annotationConfig.labelPlacementType, hasLabel,
						connectorAnnotationOffsetResolver, function (labelPlacement) {
							if (hasLabel && labelPlacement != null) {
								/* translate result label placement back to users orientation */
								_transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
									this, function (x, y, width, height) {
										labelPlacement = new primitives.common.Rect(x, y, width, height);
									});

								uiHash = new primitives.common.RenderEventArgs();
								uiHash.context = annotationConfig;

								/* draw label */
								_graphics.template(
									labelPlacement.x
									, labelPlacement.y
									, 0
									, 0
									, 0
									, 0
									, labelPlacement.width
									, labelPlacement.height
									, _annotationLabelTemplate.template()
									, _annotationLabelTemplate.getHashCode()
									, _annotationLabelTemplate.render
									, uiHash
									, null
								);
							}
						});
				}
			}
		}

		connectorAnnotationOffsetResolver.resolve();


		/* translate result polylines back to users orientation */
		buffer.transform(_transform, true);
		/* draw background polylines */
		_graphics.polylinesBuffer(buffer);
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawConnectorsTask.js*/
primitives.orgdiagram.DrawConnectorsTask = function (getGraphics, connectionsGraphTask, connectorsOptionTask, showElbowDots, paletteManagerTask) {
	var _debug = false;

	function process() {
		var graphics = getGraphics();
		var graph = connectionsGraphTask.getGraph();
		var connectorsOptions = connectorsOptionTask.getOptions();
		var paletteManager = paletteManagerTask.getPaletteManager();

		graphics.reset("placeholder", 6/*primitives.common.Layers.Connector*/);
		graphics.activate("placeholder", 6/*primitives.common.Layers.Connector*/);

		var buffer = new primitives.common.PolylinesBuffer();

		var elbowDotRadius = Math.round(connectorsOptions.elbowDotSize / 2);

		//var polyline = buffer.getPolyline(paletteManager.getPalette(primitives.common.ConnectorStyleType.Regular));

		var processed = {};
		var processedDots = {};
		graph.loopNodes(this, null, function (itemid) {
			graph.loopNodeEdges(this, itemid, function (to, connectorEdge) {
				if (!processed.hasOwnProperty(to)) {
					var paletteItem = null;
					if (connectorEdge.fromOffset <= 1) {
						paletteItem = paletteManager.getPalette(1/*primitives.common.ConnectorStyleType.Regular*/);
					} else {
						paletteManager.selectPalette(connectorEdge.fromOffset);
						paletteItem = paletteManager.getPalette(0/*primitives.common.ConnectorStyleType.Extra*/);
					}
					var polyline = buffer.getPolyline(paletteItem);

					/* draw intersection dots */
					if (showElbowDots && connectorEdge.dotId != null && connectorsOptions.elbowType != 0/*primitives.common.ElbowType.None*/ && !processedDots.hasOwnProperty(connectorEdge.dotId)) {
						var dotPolyline = buffer.getPolyline(polyline.arrowPaletteItem);
						var dotPoint = (connectorEdge.dotId == connectorEdge.from) ? connectorEdge.polyline.getStartPoint() : connectorEdge.polyline.getEndPoint();
						dotPolyline.addSegment(new primitives.common.DotSegment(dotPoint.x - elbowDotRadius, dotPoint.y - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
						processedDots[connectorEdge.dotId] = true;
					}

					var arrowId = null;
					if (connectorEdge.parentsArrowId != null && connectorsOptions.arrowsDirection == 1/*primitives.common.GroupByType.Parents*/) {
						arrowId = connectorEdge.parentsArrowId;
					} else if(connectorEdge.childrenArrowId != null && connectorsOptions.arrowsDirection == 2/*primitives.common.GroupByType.Children*/) {
						arrowId = connectorEdge.childrenArrowId;
					}

					

					

					if (arrowId == null) {
						var newSegment = connectorEdge.polyline.clone();

						if (connectorEdge.hasMiddle && connectorsOptions.arrowsDirection != 0/*primitives.common.GroupByType.None*/) {
							var isForward = true;
							if (connectorEdge.from == connectorEdge.middleParent) {
								isForward = (connectorsOptions.arrowsDirection == 2/*primitives.common.GroupByType.Children*/);
							} else {
								isForward = (connectorsOptions.arrowsDirection == 1/*primitives.common.GroupByType.Parents*/);
							}
							newSegment.addOffsetArrow(isForward, connectorsOptions.linesWidth, 0.4, connectorsOptions.extraArrowsMinimumSpace, function (arrowPolyline) {
								arrowPolyline.mergeTo(buffer.getPolyline(polyline.arrowPaletteItem));
							}); //ignore jslint
						}

						if (connectorEdge.from == itemid) {
							newSegment.mergeTo(polyline);
						} else {
							polyline.addInverted(newSegment);
						}
					} else {
						if (arrowId == connectorEdge.to) {
							connectorEdge.polyline.clone().mergeTo(polyline);
						} else {
							polyline.addInverted(connectorEdge.polyline.clone());
						}
						polyline.addArrow(connectorsOptions.linesWidth, function (arrowPolyline) {
							arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
						}); //ignore jslint
					}
				}
			});
			processed[itemid] = true;
		});

		graphics.polylinesBuffer(buffer);

		return false;
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawCursorTask.js*/
primitives.orgdiagram.DrawCursorTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
	combinedContextsTask,
	alignDiagramTask, itemTemplateParamsTask,
	cursorItemTask, selectedItemsTask) {
	var _graphics,
		_transform;

	function process() {
		var treeItemId = cursorItemTask.getCursorTreeItem();

		_graphics = getGraphics();
		_graphics.reset("placeholder", 11/*primitives.common.Layers.Cursor*/);

		if (treeItemId != null) {
			_transform = createTranfromTask.getTransform();

			drawCursor(treeItemId);
		}
		return false;
	}

	function drawCursor(treeItemId) {
		var treeItem,
			uiHash,
			panel = _graphics.activate("placeholder", 11/*primitives.common.Layers.Cursor*/),
			treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
			actualPosition = treeItemPosition.actualPosition,
			position = new primitives.common.Rect(treeItemPosition.contentPosition),
			templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
			template = templateParams.template,
			templateConfig = template.templateConfig,
			cursorPadding = templateConfig.cursorPadding;

		position.offset(cursorPadding.left, cursorPadding.top, cursorPadding.right, cursorPadding.bottom);

		uiHash = new primitives.common.RenderEventArgs();
		uiHash.context = combinedContextsTask.getConfig(treeItemId);
		uiHash.isCursor = true;
		uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
		uiHash.templateName = templateConfig.name;

		_transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
			this, function (x, y, width, height) {
				var element = _graphics.template(
					x
					, y
					, width
					, height
					, position.x
					, position.y
					, position.width
					, position.height
					, template.cursorTemplate.template()
					, template.cursorTemplate.getHashCode()
					, template.cursorTemplate.render
					, uiHash
					, { "borderWidth": templateConfig.cursorBorderWidth }
					);
			});
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawHighlightAnnotationTask.js*/
primitives.orgdiagram.DrawHighlightAnnotationTask = function (getLayout, getGraphics, createTranfromTask, applyLayoutChangesTask, scaleOptionTask,
	combinedContextsTask,
	calloutOptionTask,
	readTemplatesTask,
	alignDiagramTask, centerOnCursorTask,
	highlightItemTask, cursorItemTask, selectedItemsTask) {
	var _graphics,
		_transform,
		_calloutShape = new primitives.common.Callout(getGraphics()),
		_options,
		_layout;

	function process() {
		var treeItemId = highlightItemTask.getHighlightTreeItem();

		_graphics = getGraphics();
		_graphics.reset("calloutplaceholder", 15/*primitives.common.Layers.Annotation*/);

		if (treeItemId !== null) {
			_transform = createTranfromTask.getTransform();
			_options = calloutOptionTask.getOptions();
			_layout = getLayout();

			drawHighlightAnnotation(treeItemId);
		}
		return false;
	}

	function drawHighlightAnnotation(treeItemId) {
		var panel,
			itemConfig,
			calloutPanelPosition,
			position,
			uiHash,
			element,
			calloutTemplateName,
			calloutTemplate,
			showCallout = true,
			style,
			treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
			actualPosition = treeItemPosition.actualPosition;


		switch (treeItemPosition.actualVisibility) {
			case 2/*primitives.common.Visibility.Dot*/:
			case 3/*primitives.common.Visibility.Line*/:
			case 1/*primitives.common.Visibility.Normal*/:
				itemConfig = calloutOptionTask.getItemOptions(treeItemId);

				switch (itemConfig.showCallout) {
					case 2/*primitives.common.Enabled.False*/:
						showCallout = false;
						break;
					case 1/*primitives.common.Enabled.True*/:
						showCallout = false;
						break;
					default:
						showCallout = _options.showCallout;
						break;
				}

				if (showCallout) {
					panel = _graphics.activate("placeholder", 12/*primitives.common.Layers.Item*/);

					_transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
						this, function (x, y, width, height) {
							var snapRect = new primitives.common.Rect(x, y, width, height),
								snapPoint = new primitives.common.Point(snapRect.horizontalCenter(), snapRect.verticalCenter()),
								viewPortPosition = getViewPortPosition();

							if ((treeItemPosition.actualVisibility >= _options.calloutMaximumVisibility && treeItemPosition.actualVisibility != 4/*primitives.common.Visibility.Invisible*/) || !viewPortPosition.overlaps(snapRect)) {

								calloutTemplateName = !primitives.common.isNullOrEmpty(itemConfig.calloutTemplateName) ? itemConfig.calloutTemplateName :
									!primitives.common.isNullOrEmpty(itemConfig.templateName) ? itemConfig.templateName :
									!primitives.common.isNullOrEmpty(_options.defaultCalloutTemplateName) ? _options.defaultCalloutTemplateName :
									_options.defaultTemplateName;

								calloutTemplate = readTemplatesTask.getTemplate(calloutTemplateName, readTemplatesTask.DefaultWidgetTemplateName);

								position = getAnnotationPosition(snapPoint, viewPortPosition, calloutTemplate.templateConfig.itemSize);

								/* position callout div placeholder */
								calloutPanelPosition = new primitives.common.Rect(position);
								calloutPanelPosition.addRect(snapPoint.x, snapPoint.y);
								calloutPanelPosition.offset(50);
								style = calloutPanelPosition.getCSS();
								style.display = "inherit";
								style.visibility = "inherit";
								primitives.common.JsonML.applyStyles(_layout.calloutPlaceholder, style);

								/* recalculate geometries */
								snapPoint.x -= calloutPanelPosition.x;
								snapPoint.y -= calloutPanelPosition.y;
								position.x -= calloutPanelPosition.x;
								position.y -= calloutPanelPosition.y;

								uiHash = new primitives.common.RenderEventArgs();
								uiHash.context = combinedContextsTask.getConfig(treeItemId);
								uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
								uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
								uiHash.templateName = calloutTemplate.templateConfig.name;

								_graphics.resize("calloutplaceholder", calloutPanelPosition.width, calloutPanelPosition.height);
								panel = _graphics.activate("calloutplaceholder", 15/*primitives.common.Layers.Annotation*/);
								element = _graphics.template(
											position.x
										, position.y
										, position.width
										, position.height
										, 0
										, 0
										, position.width
										, position.height
										, calloutTemplate.itemTemplate.template()
										, calloutTemplate.itemTemplate.getHashCode()
										, calloutTemplate.itemTemplate.render
										, uiHash
										, null
										);

								_calloutShape.pointerPlacement = 0/*primitives.common.PlacementType.Auto*/;
								_calloutShape.cornerRadius = _options.calloutCornerRadius;
								_calloutShape.offset = _options.calloutOffset;
								_calloutShape.opacity = _options.calloutOpacity;
								_calloutShape.lineWidth = _options.calloutLineWidth;
								_calloutShape.pointerWidth = _options.calloutPointerWidth;
								_calloutShape.borderColor = _options.calloutBorderColor;
								_calloutShape.fillColor = _options.calloutfillColor;
								_calloutShape.draw(snapPoint, position);
							} else {
								hideHighlightAnnotation();
							}
						}
					);
				} else {
					hideHighlightAnnotation();
				}
				break;
			case 4/*primitives.common.Visibility.Invisible*/:
				hideHighlightAnnotation();
				break;
		}
	}

	function hideHighlightAnnotation() {
		primitives.common.JsonML.applyStyles(_layout.calloutPlaceholder, {
			"display": "none",
			"visibility": "hidden"
		});
	}

	function getViewPortPosition() {
		var scaleOptions = scaleOptionTask.getOptions(),
			scale = scaleOptions.scale,
			placeholderOffset = new primitives.common.Point(centerOnCursorTask.getPlaceholderOffset()),
			panelSize = new primitives.common.Rect(alignDiagramTask.getContentSize()),
			optimalPanelSize = applyLayoutChangesTask.getOptimalPanelSize();

		placeholderOffset.scale(1.0 / scale);
		optimalPanelSize.scale(1.0 / scale);
		panelSize.scale(1.0 / scale);

		return new primitives.common.Rect(
							placeholderOffset.x,
							placeholderOffset.y,
							Math.min(optimalPanelSize.width, panelSize.width),
							Math.min(optimalPanelSize.height, panelSize.height)
						);
	}

	function getAnnotationPosition(snapPoint, panelRect, itemSize) {
		var result = new primitives.common.Rect(snapPoint.x, snapPoint.y, itemSize.width, itemSize.height);

		switch (_options.orientationType) {
			case 0/*primitives.common.OrientationType.Top*/:
			case 1/*primitives.common.OrientationType.Bottom*/:
				result.y -= (itemSize.height / 4.0);
				if (snapPoint.x < panelRect.horizontalCenter()) {
					result.x += _options.calloutPlacementOffset;
				}
				else {
					result.x -= (_options.calloutPlacementOffset + itemSize.width);
				}
				break;
			default:
				result.x -= (itemSize.width / 4.0);
				if (snapPoint.y < panelRect.verticalCenter()) {
					result.y += _options.calloutPlacementOffset;
				}
				else {
					result.y -= (_options.calloutPlacementOffset + itemSize.height);
				}
				break;
		}

		// If annotation clipped then move it back into view port
		if (result.x < panelRect.x) {
			result.x = panelRect.x + 5;
		}
		else if (result.right() > panelRect.right()) {
			result.x -= (result.right() - panelRect.right() + 5);
		}

		if (result.y < panelRect.y) {
			result.y = panelRect.y + 5;
		}
		else if (result.bottom() > panelRect.bottom()) {
			result.y -= (result.bottom() - panelRect.bottom() + 5);
		}

		return result;
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawHighlightPathAnnotationTask.js*/
primitives.orgdiagram.DrawHighlightPathAnnotationTask = function (getGraphics, connectorsOptionTask, highlightPathAnnotationOptionTask, connectionsGraphTask, zOrderType) {
	function process() {
		var graph = connectionsGraphTask.getGraph(),
			highlightOptions = connectorsOptionTask.getOptions(),
			annotations = highlightPathAnnotationOptionTask.getAnnotations(),
			graphics = getGraphics();

		switch (zOrderType) {
			case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
				graphics.reset("placeholder", 5/*primitives.common.Layers.BackgroundHighlightPathAnnotations*/);
				break;
			case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
				graphics.reset("placeholder", 7/*primitives.common.Layers.ForegroundHighlightPathAnnotations*/);
				break;
		}

		drawAnnotations(graphics, highlightOptions, annotations, graph);

		return false;
	}

	function drawAnnotations(graphics, highlightOptions, annotations, graph) {
		var index, len,
			index2, len2,
			index3, len3,
			firstItemId, nextItemId,
			treeItem,
			path,
			items,
			connectorEdge,
			annotationConfig,
			panel, buffer,
			from, to;

		if (annotations.length > 0) {
			buffer = new primitives.common.PolylinesBuffer();

			switch (zOrderType) {
				case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
					panel = graphics.activate("placeholder", 5/*primitives.common.Layers.BackgroundHighlightPathAnnotations*/);
					break;
				case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
					panel = graphics.activate("placeholder", 7/*primitives.common.Layers.ForegroundHighlightPathAnnotations*/);
					break;
			}

			/* group path segments by from node */
			var pairs = {};
			for (index = 0, len = annotations.length; index < len; index += 1) {
				annotationConfig = annotations[index];
				if (annotationConfig.items != null && annotationConfig.items.length > 0) {
					items = annotationConfig.items.slice(0);
					firstItemId = items[0];
					if (graph.hasNode(firstItemId)) {
						for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
							nextItemId = items[index2];
							if (graph.hasNode(nextItemId)) {
								if (pairs.hasOwnProperty(firstItemId)) {
									pairs[firstItemId].push(nextItemId);
								} else {
									pairs[firstItemId] = [nextItemId];
								}
								firstItemId = nextItemId;
							}
						}
					}
				}
			}

			/* get shortest paths */
			var paths = {};
			for (from in pairs) {
				paths[from] = {};
				if (pairs.hasOwnProperty(from)) {
					graph.getShortestPath(this, from, pairs[from], function (connectorEdge, fromItem, toItem) {
						return connectorEdge.weight;
					}, function (path2, to2) {
						paths[from][to2] = path2;
					}); //ignore jslint
				}
			}

			/* trace annotations */
			for (index = 0, len = annotations.length; index < len; index += 1) {
				annotationConfig = annotations[index];

				var paletteItem = new primitives.common.PaletteItem({
					lineColor: (annotationConfig.color != null ? annotationConfig.color : highlightOptions.highlightLinesColor),
					lineWidth: (annotationConfig.lineWidth != null ? annotationConfig.lineWidth : highlightOptions.highlightLinesWidth),
					lineType: (annotationConfig.lineType != null ? annotationConfig.lineType : highlightOptions.highlightLinesType),
					fillColor: null,
					opacity: annotationConfig.opacity
				});
				var polyline = buffer.getPolyline(paletteItem);

				if (annotationConfig.items != null && annotationConfig.items.length > 0) {
					items = annotationConfig.items.slice(0);
					firstItemId = items[0];

					if (graph.hasNode(firstItemId)) {
						for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
							nextItemId = items[index2];
							if (graph.hasNode(nextItemId)) {
								path = paths[firstItemId][nextItemId] || [];
								for (index3 = path.length - 2; index3 >= 0; index3 -= 1) {
									from = path[index3 + 1];
									to = path[index3];
									connectorEdge = graph.edge(from, to);
									if (connectorEdge.from == from) {
										connectorEdge.polyline.clone().mergeTo(polyline);
									} else {
										polyline.addInverted(connectorEdge.polyline.clone());
									}
									if (annotationConfig.showArrows) {
										if (to == connectorEdge.parentsArrowId || to == connectorEdge.childrenArrowId) {
											polyline.addArrow(annotationConfig.lineWidth, function (arrowPolyline) {
												arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
											}); //ignore jslint
										}
									}
								}

								firstItemId = nextItemId;
							}
						}
					}
				}
			}

			graphics.polylinesBuffer(buffer);
		}
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawHighlightTask.js*/
primitives.orgdiagram.DrawHighlightTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
	combinedContextsTask,
	alignDiagramTask, itemTemplateParamsTask,
	highlightItemTask, cursorItemTask, selectedItemsTask) {
	var _graphics,
		_transform,
		_levelsOfLabels = [];

	function process() {
		var treeItemId = highlightItemTask.getHighlightTreeItem();

		_graphics = getGraphics();
		_graphics.reset("placeholder", 8/*primitives.common.Layers.Highlight*/);

		if (treeItemId != null) {
			_transform = createTranfromTask.getTransform();
			drawHighlight(treeItemId);
		}

		return false;
	}

	function drawHighlight(treeItemId) {
		var uiHash,
			panel = _graphics.activate("placeholder", 8/*primitives.common.Layers.Highlight*/),
			treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
			actualPosition = treeItemPosition.actualPosition,
			templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
			template = templateParams.template,
			templateConfig = template.templateConfig,
			highlightPadding = templateConfig.highlightPadding;

		uiHash = new primitives.common.RenderEventArgs();
		uiHash.context = combinedContextsTask.getConfig(treeItemId);
		uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
		uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
		uiHash.templateName = templateConfig.name;

		_transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
			this, function (x, y, width, height) {
				var position = new primitives.common.Rect(0, 0, Math.round(width), Math.round(height));
				position.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);

				var element;
				if (treeItemPosition.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
					element = _graphics.template(
						x
						, y
						, width
						, height
						, position.x
						, position.y
						, position.width
						, position.height
						, template.highlightTemplate.template()
						, template.highlightTemplate.getHashCode()
						, template.highlightTemplate.render
						, uiHash
						, null
						);
				} else {
					element = _graphics.template(
						x
						, y
						, width
						, height
						, position.x
						, position.y
						, position.width - 1
						, position.height - 1
						, template.dotHighlightTemplate.template()
						, template.dotHighlightTemplate.getHashCode()
						, template.dotHighlightTemplate.render
						, uiHash
						, null
						);
				}
			});
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawItemLabelsTask.js*/
primitives.orgdiagram.DrawItemLabelsTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
	labelsOptionTask,
	alignDiagramTask) {

	function process() {
		var labelsOption = labelsOptionTask.getOptions();

		var params = {
			graphics: getGraphics(),
			transform: createTranfromTask.getTransform(),
			treeItemsPositions: alignDiagramTask.getItemsPositions()
		};

		var options = {
			showLabels: labelsOption.showLabels,
			labelFontSize: labelsOption.labelFontSize,
			labelFontFamily: labelsOption.labelFontFamily,
			labelFontStyle: labelsOption.labelFontStyle,
			labelFontWeight: labelsOption.labelFontWeight,
			labelColor: labelsOption.labelColor,
			itemsOptions: labelsOptionTask.getItemsOptions(),
			labelSize: labelsOption.labelSize,
			labelOrientation: labelsOption.labelOrientation,
			labelPlacement: labelsOption.labelPlacement,
			labelOffset: labelsOption.labelOffset
		};

		params.graphics.reset("placeholder", 10/*primitives.common.Layers.Label*/);

		redrawLabels(params, options);

		return false;
	}

	function redrawLabels(params, options) {
		var labels = [];
		if (options.showLabels == 0/*primitives.common.Enabled.Auto*/ || options.showLabels == 1/*primitives.common.Enabled.True*/) {
			for (var treeItemId in params.treeItemsPositions) {
				if (params.treeItemsPositions.hasOwnProperty(treeItemId)) {
					var labelOptions = options.itemsOptions[treeItemId],
						treeItemPosition = params.treeItemsPositions[treeItemId],
						actualPosition = treeItemPosition.actualPosition;

					if (labelOptions != null) {
						params.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
							this, function (x, y, width, height) {

								switch (treeItemPosition.actualVisibility) {
									case 1/*primitives.common.Visibility.Normal*/:
										if (options.showLabels == 0/*primitives.common.Enabled.Auto*/) {
											// Don't allow labels overlap normal items in Auto mode
											label = new primitives.common.Label(x, y, width, height);
											label.weight = 10000;
											label.labelType = 1/*primitives.common.LabelType.Dummy*/;
											labels.push(label);
										}
										break;
									case 2/*primitives.common.Visibility.Dot*/:
									case 3/*primitives.common.Visibility.Line*/:
										var label = createLabel(x, y, width, height, labelOptions, treeItemPosition, options);
										if (label != null) {
											labels.push(label);
										}
										break;
									default:
										break;
								}
							});//ignore jslint
					}
				}
			}
		}

		/* Auto resolve overllapings between nodes */
		if (options.showLabels == 0/*primitives.common.Enabled.Auto*/) {
			primitives.common.getCrossingRectangles(this, labels, function (label1, label2) {
				if (label1.isActive && label2.isActive) {
					switch (label1.labelType) {
						case 1/*primitives.common.LabelType.Dummy*/:
							switch (label2.labelType) {
								case 1/*primitives.common.LabelType.Dummy*/:
									break;
								case 0/*primitives.common.LabelType.Regular*/:
									label2.isActive = false;
									break;
								case 2/*primitives.common.LabelType.Fixed*/:
									label2.isActive = false;
									break;
							}
							break;
						case 2/*primitives.common.LabelType.Fixed*/:
							switch (label2.labelType) {
								case 1/*primitives.common.LabelType.Dummy*/:
									label1.isActive = false;
									break;
								case 0/*primitives.common.LabelType.Regular*/:
									label2.isActive = false;
									break;
								case 2/*primitives.common.LabelType.Fixed*/:
									break;
							}
							break;
						case 0/*primitives.common.LabelType.Regular*/:
							switch (label2.labelType) {
								case 1/*primitives.common.LabelType.Dummy*/:
									label1.isActive = false;
									break;
								case 0/*primitives.common.LabelType.Regular*/:
									if (label1.weight <= label2.weight) {
										label1.isActive = false;
									} else {
										label2.isActive = false;
									}
									break;
								case 2/*primitives.common.LabelType.Fixed*/:
									label1.isActive = false;
									break;
							}
							break;
					}
				}
			});
		}

		/* Draw labels */
		params.graphics.activate("placeholder", 10/*primitives.common.Layers.Label*/);
		var attr = {
			"fontSize": options.labelFontSize,
			"fontFamily": options.labelFontFamily,
			"fontStyle": options.labelFontStyle,
			"fontWeight": options.labelFontWeight,
			"fontColor": options.labelColor
		};

		for (var index = 0, len = labels.length; index < len; index += 1) {
			var label = labels[index];
			if (label.isActive) {
				switch (label.labelType) {
					case 0/*primitives.common.LabelType.Regular*/:
					case 2/*primitives.common.LabelType.Fixed*/:
						params.graphics.text(label.x, label.y, label.width, label.height, label.text,
							label.labelOrientation,
							label.horizontalAlignmentType,
							label.verticalAlignmentType,
							attr);
						break;
				}
			}
		}
	}

	function createLabel(x, y, width, height, labelOptions, treeItemPosition, options) {
		var result = null,
			labelWidth,
			labelHeight,
			labelSize,
			labelPlacement,
			weight;


		if (!primitives.common.isNullOrEmpty(labelOptions.label)) {
			var labelType = getLabelType(treeItemPosition.actualVisibility, labelOptions.showLabel, options.showLabels);

			switch (labelType) {
				case 0/*primitives.common.LabelType.Regular*/:
					weight = treeItemPosition.leftPadding + treeItemPosition.rightPadding;
					break;
				case 2/*primitives.common.LabelType.Fixed*/:
					weight = 10000;
					break;
				case 3/*primitives.common.LabelType.None*/:
					weight = 0;
					break;
			}

			if (labelType != 3/*primitives.common.LabelType.None*/) {
				labelSize = (labelOptions.labelSize != null) ? labelOptions.labelSize : options.labelSize;

				var labelOrientation = (labelOptions.labelOrientation != 3/*primitives.text.TextOrientationType.Auto*/) ? labelOptions.labelOrientation :
					(options.labelOrientation != 3/*primitives.text.TextOrientationType.Auto*/) ? options.labelOrientation :
						0/*primitives.text.TextOrientationType.Horizontal*/;

				labelPlacement = (labelOptions.labelPlacement != 0/*primitives.common.PlacementType.Auto*/) ? labelOptions.labelPlacement :
					(options.labelPlacement != 0/*primitives.common.PlacementType.Auto*/) ? options.labelPlacement :
					1/*primitives.common.PlacementType.Top*/;

				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						labelWidth = labelSize.width;
						labelHeight = labelSize.height;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						labelHeight = labelSize.width;
						labelWidth = labelSize.height;
						break;
				}

				var position = getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, options.labelOffset);

				result = new primitives.common.Label(position.position);
				result.labelType = labelType;
				result.weight = weight;
				result.text = labelOptions.label;
				

				result.labelOrientation = labelOrientation;
				result.horizontalAlignmentType = position.horizontalAlignmentType;
				result.verticalAlignmentType = position.verticalAlignmentType;
			}
		}
		return result;
	}

	function getLabelType(actualVisibility, showLabel, showLabels) {
		var result = 3/*primitives.common.LabelType.None*/;
		switch (showLabel) {
			case 0/*primitives.common.Enabled.Auto*/:
				switch (showLabels) {
					case 0/*primitives.common.Enabled.Auto*/:
						switch (actualVisibility) {
							case 3/*primitives.common.Visibility.Line*/:
							case 2/*primitives.common.Visibility.Dot*/:
								result = 0/*primitives.common.LabelType.Regular*/;
								break;
							default:
								break;
						}
						break;
					case 2/*primitives.common.Enabled.False*/:
						break;
					case 1/*primitives.common.Enabled.True*/:
						result = 2/*primitives.common.LabelType.Fixed*/;
						break;
				}
				break;
			case 2/*primitives.common.Enabled.False*/:
				break;
			case 1/*primitives.common.Enabled.True*/:
				result = 2/*primitives.common.LabelType.Fixed*/;
				break;
		}
		return result;
	}

	function getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, labelOffset) {
		var position,
			horizontalAlignmentType,
			verticalAlignmentType;

		switch (labelPlacement) {
			case 0/*primitives.common.PlacementType.Auto*/:
			case 1/*primitives.common.PlacementType.Top*/:
				position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
				}
				break;
			case 2/*primitives.common.PlacementType.TopRight*/:
			case 11/*primitives.common.PlacementType.RightTop*/:
				position = new primitives.common.Rect(x + width + labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
				}
				break;
			case 3/*primitives.common.PlacementType.Right*/:
				position = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
				}
				break;
			case 4/*primitives.common.PlacementType.BottomRight*/:
			case 12/*primitives.common.PlacementType.RightBottom*/:
				position = new primitives.common.Rect(x + width + labelOffset, y + height + labelOffset, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
				}
				break;
			case 5/*primitives.common.PlacementType.Bottom*/:
				position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
				}
				break;
			case 6/*primitives.common.PlacementType.BottomLeft*/:
			case 10/*primitives.common.PlacementType.LeftBottom*/:
				position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height + labelOffset, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
				}
				break;
			case 7/*primitives.common.PlacementType.Left*/:
				position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
				}
				break;
			case 8/*primitives.common.PlacementType.TopLeft*/:
			case 9/*primitives.common.PlacementType.LeftTop*/:
				position = new primitives.common.Rect(x - labelWidth - labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
				switch (labelOrientation) {
					case 0/*primitives.text.TextOrientationType.Horizontal*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 1/*primitives.text.TextOrientationType.RotateLeft*/:
						horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
						verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
						break;
					case 2/*primitives.text.TextOrientationType.RotateRight*/:
						horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
						verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
						break;
				}
				break;
		}

		return {
			position: position,
			horizontalAlignmentType: horizontalAlignmentType,
			verticalAlignmentType: verticalAlignmentType
		};
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawMinimizedItemsTask.js*/
primitives.orgdiagram.DrawMinimizedItemsTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
	minimizedItemsOptionTask, itemTemplateParamsTask, alignDiagramTask) {
	var _graphics,
		_transform,
		_debug = false,
		_options,
		_positions;

	function process() {

		_graphics = getGraphics();

		_transform = createTranfromTask.getTransform();
		_options = minimizedItemsOptionTask.getOptions();
		_positions = alignDiagramTask.getItemsPositions();

		_graphics.reset("placeholder", 9/*primitives.common.Layers.Marker*/);

		drawMinimizedItems();

		return false;
	}

	function drawMinimizedItems() {
		var treeLevel,
			uiHash,
			element,
			markers = new primitives.common.PolylinesBuffer(),
			paletteItems = {},
			polyline,
			index,
			len,
			label,
			marker = new primitives.common.Marker(),
			itemTitleColor,
			itemFillColor,
			minimizedItemShapeType,
			minimizedItemCornerRadius,
			treeItemPosition,
			actualPosition,
			minimizedItemsOptions,
			templateParams,
			templateConfig;

		for (var treeItemId in _positions) {
			if (_positions.hasOwnProperty(treeItemId)) {
				treeItemPosition = _positions[treeItemId],
				actualPosition = treeItemPosition.actualPosition,
				minimizedItemsOptions = minimizedItemsOptionTask.getItemOptions(treeItemId);

				_transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
					this, function (x, y, width, height) {
						switch (treeItemPosition.actualVisibility) {
							case 2/*primitives.common.Visibility.Dot*/:
								templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId);
								templateConfig = templateParams.template.templateConfig;

								itemTitleColor = null;
								itemFillColor = null;
								minimizedItemShapeType = null;
								minimizedItemCornerRadius = 0;

								/* use individual item options first */
								if (minimizedItemsOptions != null) {
									itemTitleColor = minimizedItemsOptions.itemTitleColor;
									itemFillColor = minimizedItemsOptions.itemTitleColor;
									minimizedItemShapeType = minimizedItemsOptions.minimizedItemShapeType;
								}

								/* use template config & control options next */
								itemTitleColor = itemTitleColor || templateConfig.minimizedItemBorderColor || "#000080"/*primitives.common.Colors.Navy*/;
								itemFillColor = itemFillColor || templateConfig.minimizedItemFillColor || "#000080"/*primitives.common.Colors.Navy*/;
								if (minimizedItemShapeType == null) {
									minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : _options.minimizedItemShapeType);
								}
								minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? templateConfig.minimizedItemSize.width / 2.0 : templateConfig.minimizedItemCornerRadius;

								if (minimizedItemShapeType == null || minimizedItemShapeType == 6/*primitives.common.ShapeType.None*/) {
									polyline = markers.getPolyline(new primitives.common.PaletteItem({
										'lineColor': itemTitleColor,
										'lineWidth': templateConfig.minimizedItemLineWidth,
										'lineType': templateConfig.minimizedItemLineType,
										'fillColor': itemFillColor,
										'opacity': templateConfig.minimizedItemOpacity
									}));
									polyline.addSegment(new primitives.common.DotSegment(x, y, width, height, minimizedItemCornerRadius));
								} else {
									marker.draw(markers, minimizedItemShapeType, new primitives.common.Rect(x, y, width, height),
										new primitives.common.PaletteItem({
											'lineColor': itemTitleColor,
											'lineWidth': templateConfig.minimizedItemLineWidth,
											'lineType': templateConfig.minimizedItemLineType,
											'fillColor': itemFillColor,
											'opacity': templateConfig.minimizedItemOpacity
										})
									);
								}
								break;
							default:
								if (_debug) {
									itemTitleColor = "#ff0000"/*primitives.common.Colors.Red*/;
									if (!paletteItems.hasOwnProperty(itemTitleColor)) {
										paletteItems[itemTitleColor] = new primitives.common.PaletteItem({
											'lineColor': itemTitleColor,
											'lineWidth': 1,
											'lineType': 0/*primitives.common.LineType.Solid*/,
											'fillColor': itemTitleColor,
											'opacity': 1
										});
									}
									polyline = markers.getPolyline(paletteItems[itemTitleColor]);
									polyline.addSegment(new primitives.common.DotSegment(x - 1, y - 1, 2, 2, 1));
								}
								break;
						}
					});//ignore jslint
			}
		}


		_graphics.activate("placeholder", 9/*primitives.common.Layers.Marker*/);
		_graphics.polylinesBuffer(markers);
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawShapeAnnotationTask.js*/
primitives.orgdiagram.DrawShapeAnnotationTask = function (getGraphics, createTransformTask, applyLayoutChangesTask,
	orientationOptionTask, shapeAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
	var _graphics,
		_transform,
		_orientationOptions,
		_annotationLabelTemplate;

	function process() {

		_graphics = getGraphics();

		_transform = createTransformTask.getTransform();
		_orientationOptions = orientationOptionTask.getOptions();

		_annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

		switch (zOrderType) {
			case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
				_graphics.reset("placeholder", 3/*primitives.common.Layers.BackgroundAnnotations*/);
				break;
			case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
				_graphics.reset("placeholder", 13/*primitives.common.Layers.ForegroundAnnotations*/);
				break;
		}

		_drawAnnotations(shapeAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

		return false;
	}

	function _drawAnnotations(annotations, getItemPosition) {
		var panel,
			layer = 13/*primitives.common.Layers.ForegroundAnnotations*/,
			index, len,
			index2, len2,
			index3, len3,
			fromItem,
			toItem,
			shape,
			defaultConfig,
			items, itemsHash, itemPosition, position,
			properties, property,
			annotationConfig,
			uiHash,
			backgroundManager,
			perimeters, treeItem;


		switch (zOrderType) {
			case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
				panel = _graphics.activate("placeholder", 3/*primitives.common.Layers.BackgroundAnnotations*/);
				break;
			case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
				panel = _graphics.activate("placeholder", 13/*primitives.common.Layers.ForegroundAnnotations*/);
				break;
		}

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotationConfig = annotations[index];

			if (annotationConfig.items != null && annotationConfig.items.length > 0) {
				position = new primitives.common.Rect();
				for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
					itemPosition = getItemPosition(annotationConfig.items[index2]);
					if (itemPosition != null) {
						position.addRect(itemPosition.actualPosition);
					}
				}

				if (!position.isEmpty()) {
					shape = new primitives.common.Shape(_graphics);
					defaultConfig = new primitives.orgdiagram.ShapeAnnotationConfig();
					properties = ["opacity", "cornerRadius", "shapeType", "offset", "lineWidth", "borderColor", "fillColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "zOrderType"];
					for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
						property = properties[index3];
						shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
					}

					shape.position = position;
					shape.orientationType = _orientationOptions.orientationType;
					shape.panelSize = panel.size;
					shape.labelTemplate = _annotationLabelTemplate;
					shape.hasLabel = annotationConfig.templateName != null || annotationConfig.label != null;

					uiHash = new primitives.common.RenderEventArgs();
					uiHash.context = annotationConfig;
					uiHash.templateName = shape.labelTemplate;

					_transform.transformRect(position.x, position.y, position.width, position.height, true,
						this, function (x, y, width, height) {
							var position = new primitives.common.Rect(x, y, width, height);
							shape.draw(position, uiHash);
						});//ignore jslint
				}
			}
		}
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Renders/DrawTreeItemsTask.js*/
primitives.orgdiagram.DrawTreeItemsTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask, scaleOptionTask,
		itemsSizesOptionTask,
		combinedContextsTask,
		alignDiagramTask, centerOnCursorTask,
		itemTemplateParamsTask,
		cursorItemTask, selectedItemsTask,
		groupTitleTemplateTask, checkBoxTemplateTask, buttonsTemplateTask) {

	var	_positions,
		_graphics,
		_transform,
		_itemsSizesOptions,

		_buttonsTemplate,
		_checkBoxTemplate,
		_groupTitleTemplate;

	function process() {
		_graphics = getGraphics();

		_itemsSizesOptions = itemsSizesOptionTask.getOptions();
		_positions = alignDiagramTask.getItemsPositions();
		_transform = createTranfromTask.getTransform();

		_buttonsTemplate = buttonsTemplateTask.getTemplate();
		_checkBoxTemplate = checkBoxTemplateTask.getTemplate();
		_groupTitleTemplate = groupTitleTemplateTask.getTemplate();

		_graphics.reset("placeholder", 12/*primitives.common.Layers.Item*/);
		_graphics.reset("placeholder", 16/*primitives.common.Layers.Controls*/);

		redrawTreeItems();

		return false;
	}

	function redrawTreeItems() {
		var uiHash,
			element,
			polyline,
			index,
			len,
			label,
			itemTitleColor,
			itemFillColor,
			cursorItemId = cursorItemTask.getCursorTreeItem(),
			treeItemPosition,
			actualPosition,
			viewPortPosition = getViewPortPosition();

		for (var treeItemId in _positions) {
			if (_positions.hasOwnProperty(treeItemId)) {
				treeItemPosition = _positions[treeItemId],
				actualPosition = treeItemPosition.actualPosition;
				if (treeItemPosition.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
					_transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
						this, function (x, y, width, height) {
							var nodePosition = new primitives.common.Rect(x, y, width, height);
							if (viewPortPosition == null || viewPortPosition.overlaps(nodePosition)) {
								var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
									template = templateParams.template;

								uiHash = new primitives.common.RenderEventArgs();
								uiHash.id = treeItemId;
								uiHash.context = combinedContextsTask.getConfig(treeItemId);
								uiHash.isCursor = (treeItemId == cursorItemId);
								uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
								uiHash.templateName = template.templateConfig.name;

								_graphics.activate("placeholder", 12/*primitives.common.Layers.Item*/);
								element = _graphics.template(
										x
										, y
										, width
										, height
										, treeItemPosition.contentPosition.x
										, treeItemPosition.contentPosition.y
										, treeItemPosition.contentPosition.width
										, treeItemPosition.contentPosition.height
										, template.itemTemplate.template()
										, template.itemTemplate.getHashCode()
										, template.itemTemplate.render
										, uiHash
										, { "borderWidth": template.templateConfig.itemBorderWidth }
										);

								if (templateParams.hasGroupTitle) {
									var groupTitlePosition = 0;
									switch (_itemsSizesOptions.groupTitlePlacementType) {
										case 2/*primitives.common.AdviserPlacementType.Left*/:
										case 0/*primitives.common.AdviserPlacementType.Auto*/:
											groupTitlePosition = 2;
											break;
										case 3/*primitives.common.AdviserPlacementType.Right*/:
											groupTitlePosition = width - (_itemsSizesOptions.groupTitlePanelSize - 4);
											break;
										default:
									}
									element = _graphics.template(
											x,
											y,
											width,
											height,
											groupTitlePosition,
											treeItemPosition.contentPosition.y,
											_itemsSizesOptions.groupTitlePanelSize - 4,
											treeItemPosition.contentPosition.height + 2,
											_groupTitleTemplate.template(),
											_groupTitleTemplate.getHashCode(),
											_groupTitleTemplate.render,
											uiHash,
											null
											);
								}
								if (templateParams.hasSelectorCheckbox) {
									_graphics.activate("placeholder", 16/*primitives.common.Layers.Controls*/);
									element = _graphics.template(
											x,
											y,
											width,
											height,
											treeItemPosition.contentPosition.x,
											height - (_itemsSizesOptions.checkBoxPanelSize - 4),
											treeItemPosition.contentPosition.width,
											_itemsSizesOptions.checkBoxPanelSize - 4,
											_checkBoxTemplate.template(),
											_checkBoxTemplate.getHashCode(),
											_checkBoxTemplate.render,
											uiHash,
											null
											);
								}
								if (templateParams.hasButtons) {
									_graphics.activate("placeholder", 16/*primitives.common.Layers.Controls*/);
									var buttonsPanelPosition = 0;
									switch (_itemsSizesOptions.groupTitlePlacementType) {
										case 2/*primitives.common.AdviserPlacementType.Left*/:
										case 0/*primitives.common.AdviserPlacementType.Auto*/:
											buttonsPanelPosition = width - (_itemsSizesOptions.buttonsPanelSize - 4);
											break;
										case 3/*primitives.common.AdviserPlacementType.Right*/:
											buttonsPanelPosition = 2;
											break;
										default:
									}
									element = _graphics.template(
											x,
											y,
											width,
											height,
											buttonsPanelPosition,
											treeItemPosition.contentPosition.y,
											_itemsSizesOptions.buttonsPanelSize - 4,
											Math.max(treeItemPosition.contentPosition.height, height - treeItemPosition.contentPosition.y),
											_buttonsTemplate.template(),
											template.templateConfig.name + _buttonsTemplate.getHashCode(),
											_buttonsTemplate.render,
											templateParams,
											null
											);
								}
							}
						});//ignore jslint
				}
			}
		}
	}

	function getViewPortPosition() {
		var result = null;
		if (centerOnCursorTask != null) {
			var scaleOptions = scaleOptionTask.getOptions(),
				scale = scaleOptions.scale,
				placeholderOffset = new primitives.common.Point(centerOnCursorTask.getPlaceholderOffset()),
				panelSize = new primitives.common.Rect(alignDiagramTask.getContentSize()),
				optimalPanelSize = applyLayoutChangesTask.getOptimalPanelSize();

			placeholderOffset.scale(1.0 / scale);
			optimalPanelSize.scale(1.0 / scale);
			panelSize.scale(1.0 / scale);

			result = new primitives.common.Rect(
								placeholderOffset.x,
								placeholderOffset.y,
								Math.min(optimalPanelSize.width, panelSize.width),
								Math.min(optimalPanelSize.height, panelSize.height)
							);
		}
		return result;
	}

	return {
		process: process
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/ActiveItemsTask.js*/
primitives.orgdiagram.ActiveItemsTask = function (itemsSizesOptionTask, readTemplatesTask) {
	var _data = {
		items: []
	},
	_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ValueReader(["string", "number"], true),
			true
		);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
			itemsSizesOptions = itemsSizesOptionTask.getOptions(),
			items = itemsSizesOptions.items;

		_data.items = _dataTemplate.read(_data.items, collectActiveItems(itemsSizesOptions, items), "items", context);

		return context.isChanged;
	}

	function collectActiveItems(itemsSizesOptions, items) {
		var result = [],
			index, len;
		for (index = 0, len = items.length; index < len; index += 1) {
			var itemConfig = items[index],
				template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
				templateConfig = template.templateConfig,
				isActive = itemConfig.isActive && templateConfig.isActive;

			if (isActive) {
				result.push(itemConfig.id);
			}
		}
		return result;
	}

	function getActiveItems() {
		return _hash.items;
	}

	return {
		process: process,
		getActiveItems: getActiveItems
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/AnnotationLabelTemplateTask.js*/
primitives.orgdiagram.AnnotationLabelTemplateTask = function (itemsSizesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		return false;
	}

	function getTemplate() {
		if (_data.template == null) {
			_data.template = new primitives.common.AnnotationLabelTemplate();
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/ButtonsTemplateTask.js*/
primitives.orgdiagram.ButtonsTemplateTask = function (itemsSizesOptionTask, templates) {
	var _data = {
		template: null
	};

	function process() {
		return false;
	}

	function getTemplate() {
		if (_data.template == null) {
			_data.template = new templates.ButtonsTemplate;
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/CheckboxTemplateTask.js*/
primitives.orgdiagram.CheckBoxTemplateTask = function (itemsSizesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		_data.template = null;
		return true;
	}

	function getTemplate() {
		var options;
		if (_data.template == null) {
			options = itemsSizesOptionTask.getOptions();
			_data.template = new primitives.common.CheckBoxTemplate(options.selectCheckBoxLabel);
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/GroupTitleTemplateTask.js*/
primitives.orgdiagram.GroupTitleTemplateTask = function (templatesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		_data.template = null;
		return true;
	}

	function getTemplate() {
		var options;
		if (_data.template == null) {
			options = templatesOptionTask.getOptions();
			_data.template = new primitives.common.GroupTitleTemplate(options);
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/ItemTemplateParamsTask.js*/
primitives.orgdiagram.ItemTemplateParamsTask = function (itemsSizesOptionTask, cursorItemOptionTask, readTemplatesTask) {
	var _data = {
		items: {} // TemplateParams
	};

	function process() {
		var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
			widgetHasButtons = (itemsSizesOptions.buttons.length > 0),
			cursorItem = cursorItemOptionTask.getCursorItem(),
			items = itemsSizesOptions.items,
			index, len;

		_data.items = {};

		for (index = 0, len = items.length; index < len; index += 1) {
			var itemConfig = items[index],
				templateParams = new primitives.orgdiagram.TemplateParams(),
				isCursor = (cursorItem == itemConfig.id),
				template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
				templateConfig = template.templateConfig,
				templateHasButtons = (templateConfig.buttons != null && templateConfig.buttons.length > 0);

			templateParams.template = template;

			templateParams.isActive = itemConfig.isActive && templateConfig.isActive;
			if (templateParams.isActive) {
				templateParams.hasSelectorCheckbox = getSelectionVisibility(isCursor, itemConfig.hasSelectorCheckbox, itemsSizesOptions.hasSelectorCheckbox);
				templateParams.hasButtons = (widgetHasButtons || templateHasButtons) && getSelectionVisibility(isCursor, itemConfig.hasButtons, itemsSizesOptions.hasButtons);
				if (templateParams.hasButtons) {
					templateParams.buttons = templateHasButtons ? templateConfig.buttons : itemsSizesOptions.buttons;
				}
			}
			templateParams.hasGroupTitle = !primitives.common.isNullOrEmpty(itemConfig.groupTitle);
			_data.items[itemConfig.id] = templateParams;
		}
		return true;
	}

	function getSelectionVisibility(isCursor, itemState, widgetState) {
		var result = false;
		switch (itemState) {
			case 0/*primitives.common.Enabled.Auto*/:
				switch (widgetState) {
					case 0/*primitives.common.Enabled.Auto*/:
						result = isCursor;
						break;
					case 1/*primitives.common.Enabled.True*/:
						result = true;
						break;
					case 2/*primitives.common.Enabled.False*/:
						result = false;
						break;
				}
				break;
			case 1/*primitives.common.Enabled.True*/:
				result = true;
				break;
			case 2/*primitives.common.Enabled.False*/:
				result = false;
				break;
		}
		return result;
	}

	function getTemplateParams(orgItemId) {
		return _data.items[orgItemId];
	}

	return {
		process: process,
		getTemplateParams: getTemplateParams
	};
};

/* /Controls/OrgDiagram/Tasks/Templates/ReadTemplatesTask.js*/
primitives.orgdiagram.ReadTemplatesTask = function (templatesOptionTask) {
	var _data = {
		templates: {}
	},
	_defaultWidgetTemplateName = "DefaultWidgetTemplate",
	_defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

	function process() {
		var index, len,
			templateConfig,
			templatesOptions = templatesOptionTask.getOptions(),
			templates = templatesOptions.templates;


		_data.templates = {};
		_data.templates[_defaultWidgetTemplateName] = new primitives.orgdiagram.Template(templatesOptions, new primitives.orgdiagram.TemplateConfig());

		var labelAnnotationTemplateConfig = new primitives.orgdiagram.TemplateConfig();
		labelAnnotationTemplateConfig.name = _defaultWidgetLabelAnnotationTemplateName;
		labelAnnotationTemplateConfig.isActive = false;
		labelAnnotationTemplateConfig.itemSize = new primitives.common.Size(100, 20);
		labelAnnotationTemplateConfig.minimizedItemSize = new primitives.common.Size(0, 0);

		var labelAnnotationTemplate = new primitives.orgdiagram.Template();
		labelAnnotationTemplate.templateConfig = labelAnnotationTemplateConfig;
		labelAnnotationTemplate.minimizedItemCornerRadius = labelAnnotationTemplateConfig.minimizedItemSize.width / 2;
		labelAnnotationTemplate.itemTemplate = new primitives.common.LabelAnnotationTemplate();
		labelAnnotationTemplate.dotHighlightTemplate = new primitives.common.DotHighlightTemplate(templatesOptions, labelAnnotationTemplateConfig);

		_data.templates[_defaultWidgetLabelAnnotationTemplateName] = labelAnnotationTemplate;


		for (index = 0, len = templates.length; index < len; index += 1) {
			templateConfig = templates[index];
			_data.templates[templateConfig.name] = new primitives.orgdiagram.Template(templatesOptions, templateConfig);
		}

		return true;
	}

	function getTemplate(templateName1, templateName2, templateName3) {
		var result = _data.templates[templateName1] || _data.templates[templateName2] || _data.templates[templateName3];
		return result;
	}

	return {
		process: process,
		getTemplate: getTemplate,
		DefaultWidgetTemplateName: _defaultWidgetTemplateName,
		DefaultWidgetLabelAnnotationTemplateName: _defaultWidgetLabelAnnotationTemplateName
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/CombinedNormalVisibilityItemsTask.js*/
primitives.orgdiagram.CombinedNormalVisibilityItemsTask = function (itemsSizesOptionTask, cursorItemTask, cursorNeighboursTask, selectedItemsTask, selectionPathItemsTask,
	normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
	normalVisibilityItemsByBackgroundAnnotationTask,
	normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
	normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask
	) {
	var _data = {
			items: []
		},
		_hash = {},
		_sourceTasks = [
			cursorItemTask,
			cursorNeighboursTask,
			selectedItemsTask,
			selectionPathItemsTask,
			normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
			normalVisibilityItemsByBackgroundAnnotationTask,
			normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
			normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask
		],
		_dataTemplate = new primitives.common.ArrayReader(
				new primitives.common.ValueReader(["string", "number"], true),
				true
				);


	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		itemsSizesOption = itemsSizesOptionTask.getOptions();

		_data.items = _dataTemplate.read(_data.items, getSelectedItems(_sourceTasks), "items", context);

		if (itemsSizesOption.pageFitMode == 0/*primitives.common.PageFitMode.None*/ || itemsSizesOption.minimalVisibility == 1/*primitives.common.Visibility.Normal*/) {
			context.isChanged = false;
		}

		return context.isChanged;
	}

	function getSelectedItems(sourceTasks) {
		var result = [],
			sourceIndex, sourceLen,
			sourceTask,
			index, len,
			items, item,
			processed = {};

		for (sourceIndex = 0, sourceLen = sourceTasks.length; sourceIndex < sourceLen; sourceIndex += 1) {
			sourceTask = sourceTasks[sourceIndex];
			items = sourceTask.getItems();

			for (index = 0, len = items.length; index < len; index += 1) {
				item = items[index];

				if (!processed.hasOwnProperty(item)) {
					result.push(item);
					processed[item] = true;
				}
			}
		}
		return result;
	}

	function isItemSelected(treeItem) {
		return _hash.items.hasOwnProperty(treeItem);
	}

	return {
		process: process,
		isItemSelected: isItemSelected
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/CursorItemTask.js*/
primitives.orgdiagram.CursorItemTask = function (cursorItemOptionTask, activeItemsTask) {
	var _data = {
		cursorTreeItemId: null
	};

	function process() {
		var treeItemId = cursorItemOptionTask.getCursorItem(),
			activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

		_data.cursorTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

		return true;
	}

	function getCursorTreeItem() {
		return _data.cursorTreeItemId;
	}

	function getItems() {
		return (_data.cursorTreeItemId != null) ? [_data.cursorTreeItemId] : [];
	}

	return {
		process: process,
		getCursorTreeItem: getCursorTreeItem,
		getItems: getItems
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/CursorNeighboursTask.js*/
primitives.orgdiagram.CursorNeighboursTask = function (cursorItemTask, navigationFamilyTask) {
	var _data = {
		items: []
	};

	function process() {
		var navigationFamily = navigationFamilyTask.getNavigationFamily(),
			cursorTreeItemId = cursorItemTask.getCursorTreeItem();

		_data.items = getCursorNeighbours(cursorTreeItemId, navigationFamily);

		return true;
	}

	function getCursorNeighbours(cursorTreeItemId, navigationFamily) {
		var result = [];
		if (cursorTreeItemId !== null) {
			navigationFamily.loopNeighbours(this, cursorTreeItemId, function (treeItemId, treeItem, distance) {
				if (treeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
					result.push(treeItemId);
				}
				return true;
			});
		}
		return result;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/HighlightItemTask.js*/
primitives.orgdiagram.HighlightItemTask = function (highlightItemOptionTask, activeItemsTask) {
	var _data = {
		highlightTreeItemId: null
	};

	function process() {
		var treeItemId = highlightItemOptionTask.getHighlightItem(),
			activeItems = (activeItemsTask != null) ? activeItemsTask.getActiveItems() : {};

		_data.highlightTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

		return true;
	}

	function getHighlightTreeItem() {
		return _data.highlightTreeItemId;
	}

	return {
		process: process,
		getHighlightTreeItem: getHighlightTreeItem
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/NormalVisibilityItemsByAnnotationTask.js*/
primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask = function (annotationOptionTask) {
	var _data = {
		items: []
	},
		_hash = {};

	var _dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ValueReader(["string", "number"], true),
			true
		);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		annotations = annotationOptionTask.getAnnotations();

		_data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

		return context.isChanged;
	}

	function getSelectedItems(annotations) {
		var result = [],
			processed = {},
			index, len, index2, len2,
			items, item,
			annotation,
			treeItemId;

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotation = annotations[index];
			if (annotation.selectItems) {
				items = annotation.items;
				for (index2 = 0, len2 = items.length; index2 < len2; index2 += 1) {
					treeItemId = items[index2];
					if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
						result.push(treeItemId);
						processed[treeItemId] = true;
					}
				}
			}
		}

		return result;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/NormalVisibilityItemsByConnectorAnnotationTask.js*/
primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask = function (connectorAnnotationOptionTask) {
	var _data = {
			items: []
		},
		_hash = {},
		_dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ValueReader(["string", "number"], true),
			true
		);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		annotations = connectorAnnotationOptionTask.getAnnotations();

		_data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

		return context.isChanged;
	}

	function getSelectedItems(annotations) {
		var result = [],
			processed = {},
			index, len,
			annotation,
			treeItem;

		for (index = 0, len = annotations.length; index < len; index += 1) {
			annotation = annotations[index];
			if (annotation.selectItems) {
				if (annotation.fromItem != null && !processed.hasOwnProperty(annotation.fromItem)) {
					result.push(annotation.fromItem);
					processed[annotation.fromItem] = true;
				}
				if (annotation.toItem != null && !processed.hasOwnProperty(annotation.toItem)) {
					result.push(annotation.toItem);
					processed[annotation.toItem] = true;
				}
			}
		}

		return result;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/SelectedItemsTask.js*/
primitives.orgdiagram.SelectedItemsTask = function (selectedItemsOptionTask) {
	var _data = {
			items: []
		},
		_hash = {},
		_dataTemplate = new primitives.common.ArrayReader(
			new primitives.common.ValueReader(["string", "number"], true),
			true
		);

	function process() {
		var context = {
			isChanged: false,
			hash: _hash
		},
		selectedItems = selectedItemsOptionTask.getSelectedItems();

		_data.items = _dataTemplate.read(_data.items, getSelectedItems(selectedItems), "items", context);

		return context.isChanged;
	}

	function getSelectedItems(selectedItems) {
		var result = [],
			processed = {},
			index, len,
			treeItemId;

		for (index = 0, len = selectedItems.length; index < len; index += 1) {
			treeItemId = selectedItems[index];
			if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
				result.push(treeItemId);
				processed[treeItemId] = true;
			}
		}

		return result;
	}

	function isSelected(itemid) {
		return _hash.items.hasOwnProperty(itemid);
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems,
		isSelected: isSelected
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/Selection/SelectionPathItemsTask.js*/
primitives.orgdiagram.SelectionPathItemsTask = function (navigationFamilyTask, cursorItemTask, selectedItemsTask, cursorSelectionPathModeOptionTask) {
	var _data = {
		items: []
	};

	function process() {
		var selectionPathMode = cursorSelectionPathModeOptionTask.getSelectionPathMode(),
			navigationFamily = navigationFamilyTask.getNavigationFamily(),
			cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
			selectedItems = selectedItemsTask.getItems().slice(0);

		selectedItems.push(cursorTreeItemId);

		_data.items = getSelectionPathItems(selectedItems, navigationFamily, selectionPathMode);

		return true;
	}

	function getSelectionPathItems(selectedItems, navigationFamily, selectionPathMode) {
		var result = [],
			processed = {},
			selectedItem,
			index, len;

		for (index = 0, len = selectedItems.length; index < len; index += 1) {
			selectedItem = selectedItems[index];
			/* show cursor full stack */
			switch (selectionPathMode) {
				case 0/*primitives.common.SelectionPathMode.None*/:
					break;
				case 1/*primitives.common.SelectionPathMode.FullStack*/:
					/* select all parents up to the root */
					navigationFamily.loopParents(this, selectedItem, function (parentItemId, parentItem) {
						if (processed[parentItemId] != null) {
							return navigationFamily.SKIP;
						}
						if (parentItem.visibility != 4/*primitives.common.Visibility.Invisible*/) {
							result.push(parentItemId);
						}
						processed[parentItemId] = true;
					});
					break;
			}
		}
		return result;
	}

	function getItems() {
		return _data.items;
	}

	return {
		process: process,
		getItems: getItems
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/CombinedContextsTask.js*/
primitives.orgdiagram.CombinedContextsTask = function (task1, task2) {
	function process() {
		return true;
	}

	function getConfig(itemId) {
		return task1.getConfig(itemId) || (task2 != null && task2.getConfig(itemId));
	}

	return {
		process: process,
		getConfig: getConfig
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/ConnectionsGraphTask.js*/
primitives.orgdiagram.ConnectionsGraphTask = function (getGraphics, createTranfromTask, connectorsOptionTask, visualTreeLevelsTask, alignDiagramTask) {
	var _data = {
		graph: null,
		nodeid: 0
	};

	function process() {
		var graphics = getGraphics(),
			panel = graphics.activate("placeholder", 6/*primitives.common.Layers.Connector*/),
			bundles = visualTreeLevelsTask.getBundles(),
			nestedLayoutBottomConnectorIds = visualTreeLevelsTask.getNestedLayoutBottomConnectorIds(),
			connectorsOptions = connectorsOptionTask.getOptions();

		var data = {
			graph: primitives.common.graph(),
			nodeid: 0
		};

		var params = {
			treeItemsPositions: alignDiagramTask.getItemsPositions(),
			nestedLayoutBottomConnectorIds: nestedLayoutBottomConnectorIds,
			transform: createTranfromTask.getTransform(),
			hasGraphics: panel.hasGraphics
		};

		var options = {
			connectorType: connectorsOptions.connectorType,
			showExtraArrows: connectorsOptions.showExtraArrows,
			bevelSize: connectorsOptions.bevelSize,
			elbowType: connectorsOptions.elbowType
		};

		for (var index = 0, len = bundles.length; index < len; index += 1) {
			var bundle = bundles[index];

			bundle.trace(data, params, options);
		}

		_data = data;

		return true;
	}

	function getGraph() {
		return _data.graph;
	}

	return {
		process: process,
		getGraph: getGraph
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/ItemsPositionsTask.js*/
primitives.orgdiagram.ItemsPositionsTask = function (currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask, visualTreeOptionTask,
	visualTreeTask, visualTreeLevelsTask,
	itemTemplateParamsTask,
	cursorItemTask, combinedNormalVisibilityItemsTask) {
	var _data = {
		treeItemsPositions: {}, // primitives.orgdiagram.TreeItemPosition();
		panelSize: null // primitives.common.Rect();
	},
	_treeLevels,
	_treeLevelsPositions, // primitives.orgdiagram.TreeLevelPosition()
	_visualTree,
	_leftMargins,
	_rightMargins,
	_orientationOptions,
	_connectorsOptions,
	_visualTreeOptions,
	_itemsSizesOptions,
	_scaleOptions,
	_intervals;

	function process() {
		var panelSize,
			panelRect,
			scale;

		_itemsSizesOptions = itemsSizesOptionTask.getOptions();
		_intervals = getIntervals(_itemsSizesOptions);
		_orientationOptions = orientationOptionTask.getOptions();
		_connectorsOptions = connectorsOptionTask.getOptions();
		_visualTreeOptions = visualTreeOptionTask.getOptions();

		_treeLevels = visualTreeLevelsTask.getTreeLevels();
		_visualTree = visualTreeTask.getVisualTree();
		_leftMargins = visualTreeTask.getLeftMargins();
		_rightMargins = visualTreeTask.getRightMargins();

		_treeLevelsPositions = [];

		_data.treeItemsPositions = {};

		panelSize = currentControlSizeTask.getOptimalPanelSize();
		_scaleOptions = scaleOptionTask.getOptions();
		scale = _scaleOptions.scale;
		panelSize.scale(1.0 / scale);
		panelRect = new primitives.common.Rect(0, 0, panelSize.width, panelSize.height);
		_data.panelSize = positionTreeItems(panelRect);

		recalcItemsPositions();

		return true;
	}

	/*  Position */
	function positionTreeItems(panelSize) {
		var placeholderSize = new primitives.common.Rect(0, 0, 0, 0),
			levelVisibilities,
			visibilities,
			level,
			index,
			minimalPlaceholderSize,
			leftMargin,
			rightMargin,
			cursorIndex,
			pageSize;

		switch (_orientationOptions.orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
			case 3/*primitives.common.OrientationType.Right*/:
				panelSize.invert();
				break;
		}

		if (!_treeLevels.isEmpty()) {
			switch (_itemsSizesOptions.pageFitMode) {
				case 0/*primitives.common.PageFitMode.None*/:
				case 5/*primitives.common.PageFitMode.AutoSize*/:
					levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];
					placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
					break;
				default:
					levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];
					visibilities = [];
					switch (_itemsSizesOptions.minimalVisibility) {
						case 1/*primitives.common.Visibility.Normal*/:
							break;
						case 2/*primitives.common.Visibility.Dot*/:
							visibilities.push(2/*primitives.common.Visibility.Dot*/);
							break;
						case 0/*primitives.common.Visibility.Auto*/:
						case 3/*primitives.common.Visibility.Line*/:
						case 4/*primitives.common.Visibility.Invisible*/:
							visibilities.push(2/*primitives.common.Visibility.Dot*/);
							visibilities.push(3/*primitives.common.Visibility.Line*/);
							break;
					}

					_treeLevels.loopLevelsReversed(this, function (level, levelContext) {
						var index;
						for (index = 0; index < visibilities.length; index += 1) {
							levelVisibilities.push(new primitives.orgdiagram.LevelVisibility(level, visibilities[index]));
						}
					});

					// Find minimal placeholder size to hold completly folded diagram
					minimalPlaceholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
					minimalPlaceholderSize.addRect(panelSize);
					minimalPlaceholderSize.offset(0, 0, 5, 5);

					leftMargin = null;
					rightMargin = null;
					cursorIndex = null;
					// Maximized
					placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
					if (!checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
						leftMargin = 0;

						// Minimized
						placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
						if (checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
							rightMargin = levelVisibilities.length - 1;

							cursorIndex = rightMargin;
							while (rightMargin - leftMargin > 1) {
								cursorIndex = Math.floor((rightMargin + leftMargin) / 2.0);

								placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, cursorIndex);
								if (checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
									rightMargin = cursorIndex;
								}
								else {
									leftMargin = cursorIndex;
								}
							}
							if (rightMargin !== cursorIndex) {
								placeholderSize = setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, rightMargin);
							}
						}
					}
					break;
			}
		}
		return placeholderSize;
	}

	function setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, cursorIndex) {
		var index,
			levelVisibility;

		_treeLevelsPositions = [];
		_treeLevels.loopLevels(this, function (index, levelContext) {
			var treeLevelPosition = new primitives.orgdiagram.TreeLevelPosition();
			treeLevelPosition.currentvisibility = 1/*primitives.common.Visibility.Normal*/;

			_treeLevelsPositions.push(treeLevelPosition);
		});


		for (index = 0; index <= cursorIndex; index += 1) {
			levelVisibility = levelVisibilities[index];

			_treeLevelsPositions[levelVisibility.level].currentvisibility = levelVisibility.currentvisibility;
		}
		recalcItemsSize();
		setOffsets();
		recalcLevelsDepth();
		shiftLevels();

		return new primitives.common.Rect(0, 0, Math.round(getDiagramWidth()), Math.round(getDiagramHeight()));
	}

	function checkDiagramSize(diagramSize, panelSize) {
		var result = false;
		switch (_itemsSizesOptions.pageFitMode) {
			case 1/*primitives.common.PageFitMode.PageWidth*/:
				if (panelSize.width >= diagramSize.width) {
					result = true;
				}
				break;
			case 2/*primitives.common.PageFitMode.PageHeight*/:
				if (panelSize.height >= diagramSize.height) {
					result = true;
				}
				break;
			case 3/*primitives.common.PageFitMode.FitToPage*/:
				if (panelSize.height >= diagramSize.height && panelSize.width >= diagramSize.width) {
					result = true;
				}
				break;
		}
		return result;
	}

	function getDiagramHeight() {
		var len = _treeLevelsPositions.length,
			treeLevel = _treeLevelsPositions[len - 1];
		return treeLevel.shift + treeLevel.nextLevelShift;
	}

	function getDiagramWidth() {
		var result = 0,
			index,
			len;
		for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
			result = Math.max(result, _treeLevelsPositions[index].currentOffset);
		}
		result += _itemsSizesOptions.normalItemsInterval;
		return result;
	}

	function recalcItemsSize() {
		var cursorItemId = cursorItemTask.getCursorTreeItem();

		_data.treeItemsPositions = {};
		_treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var treeLevelPosition = _treeLevelsPositions[levelIndex];

			_treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem, position) {
				var treeItemPosition = new primitives.orgdiagram.TreeItemPosition(),
					treeItemVisibility = combinedNormalVisibilityItemsTask.isItemSelected(treeItemId) ? 1/*primitives.common.Visibility.Normal*/ : treeItem.visibility,
					treeItemtemplate = itemTemplateParamsTask.getTemplateParams(treeItemId);

				var actualVisibility = (treeItemVisibility === 0/*primitives.common.Visibility.Auto*/) ? treeLevelPosition.currentvisibility : treeItemVisibility;
				var size = getSize(actualVisibility, cursorItemId == treeItemId, treeItemtemplate, _itemsSizesOptions, _orientationOptions.orientationType);

				treeItemPosition.actualVisibility = actualVisibility;
				treeItemPosition.actualSize = size.actualSize;
				treeItemPosition.contentPosition = size.contentPosition;

				_data.treeItemsPositions[treeItemId] = treeItemPosition;
			});
		});
	}

	function recalcLevelsDepth() {
		var index, len,
			index2, len2,
			index3, len3,
			treeItem,
			treeLevel,
			treeItems,
			itemPosition,
			treeItemsHavingPartners,
			treeItemsGroup,
			partners, partner,
			levelOffset,
			minimalDepth,
			dotsDepth,
			startIndex, endIndex,
			stackSegments;


		_treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var treeLevelPosition = _treeLevelsPositions[levelIndex];
			treeLevelPosition.shift = 0.0;
			treeLevelPosition.depth = 0.0;
			treeLevelPosition.actualVisibility = 4/*primitives.common.Visibility.Invisible*/;

			treeItemsHavingPartners = [];

			minimalDepth = null; /* minimum  height of non-dot items in level */
			dotsDepth = null; /* maximum dots height */

			_treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
				var treeItemPosition = _data.treeItemsPositions[itemid];
				treeLevelPosition.depth = Math.max(treeLevelPosition.depth, treeItemPosition.actualSize.height);
				switch (treeItemPosition.actualVisibility) {
					case 2/*primitives.common.Visibility.Dot*/:
					case 3/*primitives.common.Visibility.Line*/:
					case 4/*primitives.common.Visibility.Invisible*/:
						dotsDepth = !dotsDepth ? treeItemPosition.actualSize.height : Math.min(dotsDepth, treeItemPosition.actualSize.height);
						break;
					default:
						minimalDepth = !minimalDepth ? treeItemPosition.actualSize.height : Math.min(minimalDepth, treeItemPosition.actualSize.height);
						break;
				}

				treeLevelPosition.actualVisibility = Math.min(treeLevelPosition.actualVisibility, treeItemPosition.actualVisibility);
			});

			if (minimalDepth == null) {
				minimalDepth = treeLevelPosition.depth;
			}
			if (dotsDepth != null && dotsDepth > minimalDepth) {
				minimalDepth = dotsDepth;
			}

			switch (_itemsSizesOptions.verticalAlignment) {
				case 0/*primitives.common.VerticalAlignmentType.Top*/:
					treeLevelPosition.horizontalConnectorsDepth = minimalDepth / 2.0;
					break;
				case 1/*primitives.common.VerticalAlignmentType.Middle*/:
					treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth / 2.0;
					break;
				case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
					treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth - minimalDepth / 2.0;
					break;
			}
		});
	}

	function shiftLevels() {
		var shift = _itemsSizesOptions.lineLevelShift,
			index,
			len,
			treeLevelPosition, treeLevelConnectorStackSize,
			childrenSpace = 0,
			parentsSpace = 0,
			arrowTipLength = _connectorsOptions.linesWidth * 8;

		switch (_connectorsOptions.arrowsDirection) {
			case 1/*primitives.common.GroupByType.Parents*/:
				childrenSpace = arrowTipLength;
				parentsSpace = 0;
				break;
			case 2/*primitives.common.GroupByType.Children*/:
				childrenSpace = 0;
				parentsSpace = arrowTipLength;
				break;
		}

		for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
			treeLevelPosition = _treeLevelsPositions[index];
			treeLevelConnectorStackSize = visualTreeLevelsTask.getConnectorsStacksSizes(index);
			shift += treeLevelPosition.setShift(shift, getLevelSpace(treeLevelPosition.actualVisibility), parentsSpace, childrenSpace, treeLevelConnectorStackSize.parentsStackSize);
		}
	}

	function getLevelSpace(visibility) {
		var result = 0.0;

		switch (visibility) {
			case 1/*primitives.common.Visibility.Normal*/:
				result = _itemsSizesOptions.normalLevelShift;
				break;
			case 2/*primitives.common.Visibility.Dot*/:
				result = _itemsSizesOptions.dotLevelShift;
				break;
			case 3/*primitives.common.Visibility.Line*/:
			case 4/*primitives.common.Visibility.Invisible*/:
				result = _itemsSizesOptions.lineLevelShift;
				break;
		}
		return result;
	}

	function setOffsets() {
		var index,
			len;
		for (index = 0, len = _treeLevelsPositions.length; index < len; index += 1) {
			_treeLevelsPositions[index].currentOffset = 0.0;
		}
		_visualTree.loopPostOrder(this, function (treeItemId, treeItem, parentid, parent) {
			var treeItemPosition = _data.treeItemsPositions[treeItemId],
				treeItemVisibility = treeItemPosition.actualVisibility,
				treeItemLevelIndex = _treeLevels.getLevelIndex(treeItemId),
				treeLevelPosition = _treeLevelsPositions[treeItemLevelIndex],
				treeItemPadding = _intervals[treeItemVisibility === 0/*primitives.common.Visibility.Auto*/ ? treeLevelPosition.currentvisibility : treeItemVisibility] / 2.0,
				index,
				len,
				offset,
				siblings,
				gaps,
				gap,
				leftMargin,
				parentItem,
				groups,
				items,
				item1,
				item2,
				groupIndex,
				groupOffset,
				group,
				sibling,
				cousinsInterval = treeLevelPosition.currentOffset > 0 ? treeItemPadding * (treeItem.relationDegree) * _itemsSizesOptions.cousinsIntervalMultiplier : 0,
				arrowTipLength = _connectorsOptions.linesWidth * 8;
			treeItemPosition.leftPadding = treeItemPadding + cousinsInterval;
			treeItemPosition.rightPadding = treeItemPadding;
			if (_connectorsOptions.arrowsDirection != 0/*primitives.common.GroupByType.None*/) {
				if (treeItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
					treeItemPosition.leftPadding += arrowTipLength;
				}
				if (treeItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
					treeItemPosition.rightPadding += arrowTipLength;
				}
			}
			treeItemPosition.offset = treeLevelPosition.currentOffset + treeItemPosition.leftPadding;
			treeLevelPosition.currentOffset = treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding;

			if (_visualTree.hasChildren(treeItemId)) {
				offset = getChildrenOffset(treeItem);
				if (offset > 0) {
					offsetItemChildren(treeItem, offset);
				}
				else if (offset < 0) {
					offset = -offset;
					offsetItem(treeItem, offset);

					siblings = null;
					gaps = {};
					leftMargin = null;
					parentItem = _visualTree.parent(treeItem.id);
					if (parentItem !== null) {
						_visualTree.loopChildrenReversed(this, parentItem.id, function (childItemId, childItem, index) {
							if (childItem === treeItem) {
								siblings = [];
							}
							else if (siblings !== null) {
								gap = getGapBetweenSiblings(childItem, treeItem);
								gaps[childItem.id] = gap;
								if (gap > 0) {
									siblings.splice(0, 0, childItem);
								}
								else {
									leftMargin = childItem;
									return true;
								}
							}
						});

						if (siblings.length > 0) {
							groups = null;
							if (leftMargin !== null) {
								items = [leftMargin];
								items = items.concat(siblings);
								items.push(treeItem);

								groups = [[leftMargin]];
								for (index = 1, len = items.length; index < len; index += 1) {
									item1 = items[index - 1];
									item2 = items[index];
									if (item1.gravity == 2/*primitives.common.HorizontalAlignmentType.Right*/ || item2.gravity == 1/*primitives.common.HorizontalAlignmentType.Left*/) {
										groups[groups.length - 1].push(item2);
									}
									else {
										groups.push([item2]);
									}
								}
							}
							else {
								groups = [siblings.slice(0)];
								groups[groups.length - 1].push(treeItem);
							}

							// align items to the right
							if (groups.length > 0) {
								siblings = groups[groups.length - 1];
								for (index = siblings.length - 2; index >= 0; index -= 1) {
									sibling = siblings[index];
									gap = gaps[sibling.id];
									offset = Math.min(gap, offset);

									offsetItem(sibling, offset);
									offsetItemChildren(sibling, offset);
								}
							}

							// spread items proportionally
							groupOffset = offset / (groups.length - 1);
							for (groupIndex = groups.length - 2; groupIndex > 0; groupIndex -= 1) {
								group = groups[groupIndex];
								for (index = group.length - 1; index >= 0; index -= 1) {
									sibling = group[index];
									gap = gaps[sibling.id];
									offset = Math.min(groupIndex * groupOffset, Math.min(gap, offset));

									offsetItem(sibling, offset);
									offsetItemChildren(sibling, offset);
								}
							}
						}
					}
				}
			}
		});
	}

	function getGapBetweenSiblings(leftItem, rightItem) {
		var result = null,
			rightMargins = getRightMargins(leftItem),
			leftMargins = getLeftMargins(rightItem),
			depth = Math.min(rightMargins.length, leftMargins.length),
			index,
			gap;

		for (index = 0; index < depth; index += 1) {
			gap = leftMargins[index] - rightMargins[index];
			result = (result !== null) ? Math.min(result, gap) : gap;

			if (gap <= 0) {
				break;
			}
		}

		return Math.floor(result);
	}

	function getRightMargins(treeItem) {
		var result = [],
			rightMargins,
			index,
			len,
			marginItemPosition;

		rightMargins = _rightMargins[treeItem.id];
		if (rightMargins === undefined) {
			rightMargins = [];
		}
		rightMargins = rightMargins.slice();
		rightMargins.splice(0, 0, treeItem.id);
		for (index = 0, len = rightMargins.length; index < len; index += 1) {
			marginItemPosition = _data.treeItemsPositions[rightMargins[index]];
			result[index] = marginItemPosition.offset + marginItemPosition.actualSize.width + marginItemPosition.rightPadding;
		}

		return result;
	}

	function getLeftMargins(treeItem) {
		var result = [],
			leftMargins,
			index, len,
			marginItemPosition;

		leftMargins = _leftMargins[treeItem.id];
		if (leftMargins === undefined) {
			leftMargins = [];
		}
		leftMargins = leftMargins.slice();
		leftMargins.splice(0, 0, treeItem.id);
		for (index = 0, len = leftMargins.length; index < len; index += 1) {
			marginItemPosition = _data.treeItemsPositions[leftMargins[index]];
			result[index] = marginItemPosition.offset - marginItemPosition.leftPadding;
		}

		return result;
	}

	function getChildrenOffset(treeItem) {
		var treeItemPosition = _data.treeItemsPositions[treeItem.id],
			treeItemCenterOffset = treeItemPosition.offset + treeItemPosition.actualSize.width / 2.0,
			childrenCenterOffset = null,
			firstItem, firstItemPosition,
			lastItem, lastItemPosition,
			visualAggregatorPosition;
		if (treeItem.visualAggregatorId === null) {
			firstItem = null;
			_visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
				firstItem = childItem;
				if (firstItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
					return true;
				}
			});
			firstItemPosition = _data.treeItemsPositions[firstItem.id];

			lastItem = null;
			_visualTree.loopChildrenReversed(this, treeItem.id, function (childItemId, childItem, index) {
				lastItem = childItem;
				if (lastItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
					return true;
				}
			});
			lastItemPosition = _data.treeItemsPositions[lastItem.id];

			switch (_visualTreeOptions.horizontalAlignment) {
				case 1/*primitives.common.HorizontalAlignmentType.Left*/:
					childrenCenterOffset = firstItemPosition.offset + firstItemPosition.actualSize.width / 2.0;
					break;
				case 2/*primitives.common.HorizontalAlignmentType.Right*/:
					childrenCenterOffset = lastItemPosition.offset + lastItemPosition.actualSize.width / 2.0;
					break;
				case 0/*primitives.common.HorizontalAlignmentType.Center*/:
					childrenCenterOffset = (firstItemPosition.offset + lastItemPosition.offset + lastItemPosition.actualSize.width) / 2.0;
					break;
			}
		}
		else {
			visualAggregatorPosition = _data.treeItemsPositions[treeItem.visualAggregatorId];
			childrenCenterOffset = visualAggregatorPosition.offset + visualAggregatorPosition.actualSize.width / 2.0;
		}

		var i = treeItemCenterOffset - childrenCenterOffset;
		return treeItemCenterOffset - childrenCenterOffset;
	}

	function offsetItem(treeItem, offset) {
		var treeItemPosition = _data.treeItemsPositions[treeItem.id];
		treeItemPosition.offset += offset;

		var treeLevelPosition = _treeLevelsPositions[_treeLevels.getLevelIndex(treeItem.id)];
		treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, treeItemPosition.offset + treeItemPosition.actualSize.width + treeItemPosition.rightPadding);
	}

	function offsetItemChildren(treeItem, offset) {
		var childTreeItemPosition,
			treeLevelPosition;

		_visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, levelid) {
			childTreeItemPosition = _data.treeItemsPositions[childItemId];
			childTreeItemPosition.offset += offset;

			treeLevelPosition = _treeLevelsPositions[_treeLevels.getLevelIndex(childItemId)];
			treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childTreeItemPosition.offset + childTreeItemPosition.actualSize.width);

			return true;
		});
	}

	function recalcItemsPositions() {
		var prevLevelPosition = null;
		_treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var treeLevelPosition = _treeLevelsPositions[levelIndex];

			_treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
				var treeItemPosition = _data.treeItemsPositions[itemid];
				var result = getPosition(treeItemPosition.actualVisibility, treeItemPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, _itemsSizesOptions.verticalAlignment);
				treeItemPosition.actualPosition = result.position;
				treeItemPosition.horizontalConnectorsShift = result.horizontalConnectorsShift;
				treeItemPosition.topConnectorShift = result.topConnectorShift;
				treeItemPosition.topConnectorInterval = result.topConnectorInterval;
				treeItemPosition.bottomConnectorShift = result.bottomConnectorShift;
				treeItemPosition.bottomConnectorInterval = result.bottomConnectorInterval;
			});

			prevLevelPosition = treeLevelPosition;
		});
	}

	function getSize(visibility, isCursor, treeItemTemplate, itemsSizesOptions, orientationType) {
		var templateConfig,
			size,
			contentPosition;

		switch (visibility) {
			case 1/*primitives.common.Visibility.Normal*/:
				templateConfig = treeItemTemplate.template.templateConfig;
				size = new primitives.common.Size(templateConfig.itemSize);
				contentPosition = new primitives.common.Rect(0, 0, size.width, size.height);
				if (isCursor) {
					size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
					size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
					contentPosition.x = templateConfig.cursorPadding.left;
					contentPosition.y = templateConfig.cursorPadding.top;
				}
				if (treeItemTemplate.hasSelectorCheckbox) {
					size.height += itemsSizesOptions.checkBoxPanelSize;
				}
				if (treeItemTemplate.hasButtons) {
					size.width += itemsSizesOptions.buttonsPanelSize;
					switch(itemsSizesOptions.groupTitlePlacementType) {
						case 3/*primitives.common.AdviserPlacementType.Right*/:
							contentPosition.x += itemsSizesOptions.buttonsPanelSize;
							break;
					}
				}
				if (treeItemTemplate.hasGroupTitle) {
					size.width += itemsSizesOptions.groupTitlePanelSize;
					switch(itemsSizesOptions.groupTitlePlacementType) {
						case 3/*primitives.common.AdviserPlacementType.Right*/:
							break;
						default:
							contentPosition.x += itemsSizesOptions.groupTitlePanelSize;
							break;
					}
				}
				break;
			case 2/*primitives.common.Visibility.Dot*/:
				templateConfig = treeItemTemplate.template.templateConfig;
				size = new primitives.common.Size(templateConfig.minimizedItemSize);
				break;
			case 3/*primitives.common.Visibility.Line*/:
			case 4/*primitives.common.Visibility.Invisible*/:
				size = new primitives.common.Size();
				break;
		}

		switch (orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
			case 3/*primitives.common.OrientationType.Right*/:
				size.invert();
				break;
		}

		return {
			actualSize: size,
			contentPosition: contentPosition
		};
	}

	function getPosition(visibility, offset, size, prevLevel, level, verticalAlignment) {
		var itemShift = 0;

		switch (visibility) {
			case 1/*primitives.common.Visibility.Normal*/:
				switch (verticalAlignment) {
					case 0/*primitives.common.VerticalAlignmentType.Top*/:
						itemShift = 0;
						break;
					case 1/*primitives.common.VerticalAlignmentType.Middle*/:
						itemShift = (level.depth - size.height) / 2.0;
						break;
					case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
						itemShift = level.depth - size.height;
						break;
				}
				break;
			case 2/*primitives.common.Visibility.Dot*/:
			case 3/*primitives.common.Visibility.Line*/:
			case 4/*primitives.common.Visibility.Invisible*/:
				itemShift = level.horizontalConnectorsDepth - size.height / 2.0;
				break;
		}

		return {
			position: new primitives.common.Rect(offset, level.shift + itemShift, size.width, size.height),
			horizontalConnectorsShift: level.shift + level.horizontalConnectorsDepth,
			topConnectorShift: prevLevel != null ? prevLevel.shift + prevLevel.connectorShift : null,
			topConnectorInterval: prevLevel != null ? prevLevel.levelSpace / 2 : null,
			bottomConnectorShift: level.shift + level.connectorShift,
			bottomConnectorInterval: level.levelSpace / 2
		};
	}

	function getIntervals(options) {
		var result = [];
		result[1/*primitives.common.Visibility.Normal*/] = options.normalItemsInterval;
		result[2/*primitives.common.Visibility.Dot*/] = options.dotItemsInterval;
		result[3/*primitives.common.Visibility.Line*/] = options.lineItemsInterval;
		result[4/*primitives.common.Visibility.Invisible*/] = options.lineItemsInterval;
		return result;
	}

	function getItemPosition(itemid) {
		return _data.treeItemsPositions[itemid];
	}

	function getItemsPositions() {
		return _data.treeItemsPositions;
	}

	function getContentSize() {
		return _data.panelSize;
	}

	return {
		process: process,
		getItemsPositions: getItemsPositions,
		getItemPosition: getItemPosition,
		getContentSize: getContentSize
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/OrgTreeTask.js*/
primitives.orgdiagram.OrgTreeTask = function (itemsOptionTask) {
	var _data = {
		orgTree: null, /*tree primitives.orgdiagram.OrgItem */
		maximumId: null /* maximum of OrgItem.id */
	};

	function process() {
		createOrgTree(itemsOptionTask.getItems());

		return true;
	}

	function createOrgTree(items) {
		var orgItem,
			orgItemRoot,
			userItem,
			index, len,
			index2, len2,
			property,
			maximumId = 0,
			parsedId,
			// Organizational chart definition 
			orgTree = primitives.common.tree(),
			rootItemConfig;

		/* convert items to hash table */
		for (index = 0, len = items.length; index < len; index += 1) {
			userItem = items[index];
			/* user should define unique id for every ItemConfig otherwise we ignore it
				if parent does not exists in the tree then item is considered as root item
			*/
			if (userItem.id != null) {
				/* Organizational chart ItemConfig is almost the same as OrgItem 
					except options used to draw connectors in multi parent chart
				*/
				orgItem = new primitives.orgdiagram.OrgItem(userItem);

				// OrgItem id coinsides with ItemConfig id since we don't add any new org items to user's org chart definition
				parsedId = parseInt(userItem.id, 10);
				maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);

				// Collect org items
				orgTree.add(userItem.parent, orgItem.id, orgItem);

				/* We ignore looped items, it is applications responsibility to control data consistency */
			}
		}
		/* create chart root item config */
		maximumId += 1;

		rootItemConfig = new primitives.orgdiagram.ItemConfig();
		rootItemConfig.id = maximumId;
		rootItemConfig.title = "internal root";
		rootItemConfig.isVisible = false;
		rootItemConfig.isActive = false;
		
		/* create chart org root item */
		orgItemRoot = new primitives.orgdiagram.OrgItem(rootItemConfig);
		orgItemRoot.hideParentConnection = true;
		orgItemRoot.hideChildrenConnection = true;

		orgTree.add(null, orgItemRoot.id, orgItemRoot);

		orgTree.loopLevels(this, function (nodeid, node, levelid) {
			if (levelid > 0) {
				return orgTree.BREAK;
			}
			if (orgItemRoot.id != nodeid) {
				orgTree.adopt(orgItemRoot.id, nodeid);

				/* root item must be regular */
				node.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/;
			}
		});

		hideRootConnectors(orgTree);

		_data.orgTree = orgTree;
		_data.maximumId = maximumId;

		return true;
	}

	function hideRootConnectors(orgTree) {
		orgTree.loopLevels(this, function (nodeid, node, levelid) {
			var allRegular = true;
			if (!node.isVisible) {
				orgTree.loopChildren(this, nodeid, function (childid, child, index) {
					if (child.itemType != 0/*primitives.orgdiagram.ItemType.Regular*/) {
						allRegular = false;
						return true; // break
					}
				}); //ignore jslint

				if (allRegular) {
					node.hideChildrenConnection = true;

					orgTree.loopChildren(this, nodeid, function (childid, child, index) {
						child.hideParentConnection = true;
					});
				} else {
					return orgTree.SKIP; // skip children
				}
			} else {
				return orgTree.SKIP;
			}
		});
	}

	function getOrgTree() {
		return _data.orgTree;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getOrgTree: getOrgTree,
		getMaximumId: getMaximumId
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/PalleteManagerTask.js*/
primitives.orgdiagram.PaletteManagerTask = function (connectorsOptionTask, linePaletteOptionTask) {
	var _paletteManager;

	function process() {
		var linesPalette = [];
		if (linePaletteOptionTask != null) {
			linesPalette = linePaletteOptionTask.getOptions().linesPalette;
		}
		_paletteManager = new primitives.common.PaletteManager(connectorsOptionTask.getOptions(), linesPalette);

		return true;
	}

	function getPaletteManager() {
		return _paletteManager;
	}

	return {
		process: process,
		getPaletteManager: getPaletteManager
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/VisualTreeLevelsTask.js*/
/* Read visual tree
		populate treeLevels array of type TreeLevel
			TreeLevel object contains ordered list of all its items 
			plus when items added to that collection we store level & levelPosition in item
*/
primitives.orgdiagram.VisualTreeLevelsTask = function (visualTreeTask, itemTemplateParamsTask) {
	var _data = {
		treeLevels: null, /* primitives.common.TreeLevels */
		bundles: null, /* array of primitives.common.BaseConnectorBundle objects */
		connectorStacks: null /* array of primitives.orgdiagram.TreeLevelConnectorStackSize objects, 
			it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
	},
	_nullTreeLevelConnectorStackSize = new primitives.orgdiagram.TreeLevelConnectorStackSize();

	function process() {
		var visualTree = visualTreeTask.getVisualTree();

		_data.treeLevels = primitives.common.TreeLevels();

		visualTree.loopLevels(this, function (treeItemId, treeItem, levelIndex) {
			_data.treeLevels.addItem(levelIndex, treeItemId, treeItem);
		});

		_data.bundles = [];
		_data.connectorStacks = [];

		recalcLevelsDepth(_data.bundles, _data.connectorStacks, _data.treeLevels, visualTree);

		return true;
	}

	function recalcLevelsDepth(bundles, connectorStacks, treeLevels, orgTree, orgPartners) {
		var index, len,
			index2, len2,
			index3, len3,
			treeItem,
			itemPosition,
			bundle, bundlesToStack, bundlesByItemmId = {},
			startIndex, endIndex, stackSegments;


		treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var stacksSizes = new primitives.orgdiagram.TreeLevelConnectorStackSize();
			connectorStacks[levelIndex] = stacksSizes;

			bundlesToStack = [];

			treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
				var parents = [];
				if (!bundlesByItemmId.hasOwnProperty(itemid)) {
					if (treeItem.connectorPlacement & 4/*primitives.common.SideFlag.Bottom*/) {
						parents.push(itemid);
					}
					parents = parents.concat(treeItem.partners);

					if (parents.length > 0) {
						bundle = new primitives.common.VerticalConnectorBundle(parents, []);

						for (var index = 0, len = parents.length; index < len; index += 1) {
							bundlesByItemmId[parents[index]] = bundle;
						}

						orgTree.loopChildren(this, itemid, function (childid, child, index) {
							if (child.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
								bundle.toItems.push(childid);
							}
						}); //ignore jslint

						if (parents.length > 1) {
							bundlesToStack.push(bundle);
						}

						if (bundle.fromItems.length > 1 || bundle.toItems.length > 0) {
							bundles.push(bundle);
						}
					}
				}

				if (treeItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
					bundle = new primitives.common.HorizontalConnectorBundle(itemid, treeLevels.getPrevItem(itemid));
					bundles.push(bundle);
				}

				if (treeItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
					bundle = new primitives.common.HorizontalConnectorBundle(itemid, treeLevels.getNextItem(itemid));
					bundles.push(bundle);
				}
			});

			if (bundlesToStack.length > 0) {
				/* find minimum and maximum partner index at level */
				stackSegments = primitives.common.pile();
				for (index2 = 0, len2 = bundlesToStack.length; index2 < len2; index2 += 1) {
					bundle = bundlesToStack[index2];

					startIndex = null;
					endIndex = null;
					for (index3 = 0, len3 = bundle.fromItems.length; index3 < len3; index3 += 1) {
						itemPosition = treeLevels.getItemPosition(bundle.fromItems[index3]);

						startIndex = (startIndex != null) ? Math.min(startIndex, itemPosition) : itemPosition;
						endIndex = (endIndex != null) ? Math.max(endIndex, itemPosition) : itemPosition;
					}
					stackSegments.add(startIndex, endIndex, bundle);
				}

				stacksSizes.parentsStackSize = stackSegments.resolve(this, function (from, to, bundle, offset, stackSize) {
					bundle.fromOffset = offset + 1;
					bundle.fromStackSize = stackSize;
				});//ignore jslint
			}
		});
	}

	function getTreeLevels() {
		return _data.treeLevels;
	}

	function getBundles() {
		return _data.bundles;
	}

	function getNestedLayoutBottomConnectorIds() {
		return {}; /* org chart does not support nested layouts */
	}

	function getConnectorsStacksSizes(levelid) {
		return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
	}

	return {
		process: process,
		getTreeLevels: getTreeLevels,
		getBundles: getBundles,
		getConnectorsStacksSizes: getConnectorsStacksSizes,
		getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds
	};
};

/* /Controls/OrgDiagram/Tasks/Transformations/VisualTreeTask.js*/
/* method uses structures created in orgTreeTask to create visual tree used to render chart
	It populates visualTree structure with TreeItem objects.
	
	1. Create invisble visual root item, so all orphants added to it, but since it is invisible, no connections are going to be drawn betwen them
	2. Loop orgTree nodes and populate visual tree hierarchy: visualTree
*/
primitives.orgdiagram.VisualTreeTask = function (orgTreeTask, activeItemsTask, visualTreeOptionTask, isFamilyChartMode) {
	var _data = {
		visualTree: null, /* primitives.common.tree(); key: primitives.orgdiagram.TreeItem.id value:primitives.orgdiagram.TreeItem */
		leftMargins: {},
		rightMargins: {},
		navigationFamily: null /* family structure where key: TreeItem.id and value: TreeItem */
	},
	_treeItemCounter,
	_activeItems;

	function process() {
		var orgTree = orgTreeTask.getOrgTree(),
			options = visualTreeOptionTask.getOptions();

		_activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

		_data.visualTree = primitives.common.tree();
		_data.navigationFamily =  primitives.common.family();

		_treeItemCounter = orgTreeTask.getMaximumId();

		if (orgTree.hasNodes()) {
			createVisualTreeItems(orgTree, options, _data.visualTree);
		}


		_data.leftMargins = {},
		_data.rightMargins = {};
		updateVisualTreeMargins(_data.visualTree, _data.leftMargins, _data.rightMargins);

		return true;
	}

	function createVisualTreeItems(orgTree, options, visualTree) {
		var treeItem,
			visualParent,
			visualAggregator,
			leftSiblingIndex,
			rightSiblingIndex,
			index, len,
			childIndex,
			childrenLen,
			depth,
			rowDepths,
			rowDepth,
			rowAggregators = {},
			rowAggregator,
			rowChildren = {},
			children,
			leftSiblingOffset,
			rightSiblingOffset,
			partners = {}, tempPartners;


		/* org tree item has visible children */
		orgTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
			node.hasVisibleChildren = node.isVisible || node.hasVisibleChildren;
			if (parent != null) {
				parent.hasVisibleChildren = parent.hasVisibleChildren || node.hasVisibleChildren;
			}
		});

		orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
			var logicalParentItem,
				regularChildren,
				shiftParent;
			if (!isFamilyChartMode && !parentOrgItem.hasVisibleChildren) {
				return orgTree.SKIP;
			}

			logicalParentItem = visualTree.node(parentOrgItemId);
			if (!logicalParentItem) {
				logicalParentItem = getNewTreeItem({
					visibility: 4/*primitives.common.Visibility.Invisible*/,
					connectorPlacement: 0,
					parentId: null,
					actualItemType: 0/*primitives.orgdiagram.ItemType.Regular*/
				}, parentOrgItem);
				visualTree.add(null, parentOrgItemId, logicalParentItem);
			}

			/* find left and right siblings margins of logical parent item
				they are needed to properly place GeneralPartner & LimitedPartner nodes. */
			leftSiblingOffset = 0;
			rightSiblingOffset = 0;
			if ((index = visualTree.indexOf(parentOrgItemId)) != null) {
				leftSiblingOffset = index;
				rightSiblingOffset = visualTree.countSiblings(parentOrgItemId) - index - 1;
			}

			/* populate children */
			regularChildren = []; /* children added after all other custom item types */
			orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
				if (isFamilyChartMode || orgItem.hasVisibleChildren) {
					treeItem = getNewTreeItem({
						parentId: parentOrgItemId,
						actualItemType: orgItem.itemType
					}, orgItem);

					switch (logicalParentItem.actualItemType) {
						case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
						case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
						case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
							switch (treeItem.actualItemType) {
								case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
								case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
								case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
									/* Don't support partner of partner */
									treeItem.actualItemType = 2/*primitives.orgdiagram.ItemType.Adviser*/;
									break;
								case 0/*primitives.orgdiagram.ItemType.Regular*/:
									/* Don't support regular children of partner */
									treeItem.actualItemType = 1/*primitives.orgdiagram.ItemType.Assistant*/;
									break;
							}
							break;
					}

					switch (treeItem.actualItemType) {
						case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
							defineNavigationParent(logicalParentItem, treeItem);
							treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
							shiftParent = getNewTreeItem({ visibility: 4/*primitives.common.Visibility.Invisible*/ });
							visualTree.add(shiftParent.id, treeItem.id, treeItem);
							treeItem = shiftParent;//ignore jslint
						case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/://ignore jslint
						case 2/*primitives.orgdiagram.ItemType.Adviser*/://ignore jslint
							visualParent = visualTree.parent(parentOrgItemId);
							if (logicalParentItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
								leftSiblingIndex = findLeftSiblingIndex(visualTree, _data.navigationFamily, logicalParentItem);
								visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingIndex + 1);
								treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
								treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							} else if (logicalParentItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
								rightSiblingIndex = findRightSiblingIndex(visualTree, _data.navigationFamily, logicalParentItem);
								visualTree.add(visualParent.id, treeItem.id, treeItem, rightSiblingIndex);
								treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
								treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							} else {
								switch (orgItem.adviserPlacementType) {
									case 2/*primitives.common.AdviserPlacementType.Left*/:
										leftSiblingIndex = findLeftSiblingIndex(visualTree, _data.navigationFamily, logicalParentItem);
										visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingIndex + 1);
										treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
										treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
										break;
									default:
										rightSiblingIndex = findRightSiblingIndex(visualTree, _data.navigationFamily, logicalParentItem);
										visualTree.add(visualParent.id, treeItem.id, treeItem, rightSiblingIndex);
										treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
										treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
										break;
								}
							}

							switch (treeItem.actualItemType) {
								case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
									break;
								case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
									if (logicalParentItem.parentId != null) {
										defineNavigationParent(visualTree.node(logicalParentItem.parentId), treeItem);
									} else {
										defineNavigationParent(logicalParentItem, treeItem, true);
									}
									break;
								case 2/*primitives.orgdiagram.ItemType.Adviser*/:
									defineNavigationParent(logicalParentItem, treeItem);
									break;
							}
							break;
						case 4/*primitives.orgdiagram.ItemType.SubAssistant*/:
							defineNavigationParent(logicalParentItem, treeItem);
							treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
							shiftParent = getNewTreeItem({ visibility: 4/*primitives.common.Visibility.Invisible*/ });
							visualTree.add(shiftParent.id, treeItem.id, treeItem);
							treeItem = shiftParent;//ignore jslint
						case 1/*primitives.orgdiagram.ItemType.Assistant*/://ignore jslint
							if (logicalParentItem.visualAggregatorId === null) {
								createNewVisualAggregator(visualTree, logicalParentItem, false);
							}
							switch (orgItem.adviserPlacementType) {
								case 2/*primitives.common.AdviserPlacementType.Left*/:
									visualTree.add(parentOrgItemId, treeItem.id, treeItem, 0);
									treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
									treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
									break;
								default:
									visualTree.add(parentOrgItemId, treeItem.id, treeItem);
									treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
									treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
									break;
							}
							if (treeItem.actualItemType == 1/*primitives.orgdiagram.ItemType.Assistant*/) {
								defineNavigationParent(logicalParentItem, treeItem);
							}
							break;
						case 0/*primitives.orgdiagram.ItemType.Regular*/:
							regularChildren.push(treeItem);
							defineNavigationParent(logicalParentItem, treeItem);
							break;
						case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
						case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
							visualParent = visualTree.parent(parentOrgItemId);
							if (logicalParentItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
								visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingOffset);
								treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
								treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							} else if (logicalParentItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
								visualTree.add(visualParent.id, treeItem.id, treeItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
								treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
								treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							} else {
								switch (orgItem.adviserPlacementType) {
									case 2/*primitives.common.AdviserPlacementType.Left*/:
										visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingOffset);
										treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
										break;
									default:
										visualTree.add(visualParent.id, treeItem.id, treeItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
										treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
										break;
								}
								switch (treeItem.actualItemType) {
									case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
										treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
										break;
									case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
										treeItem.connectorPlacement = 4/*primitives.common.SideFlag.Bottom*/;
										break;
								}
							}
							if (logicalParentItem.parentId != null) {
								defineNavigationParent(visualTree.node(logicalParentItem.parentId), treeItem);
							} else {
								defineNavigationParent(logicalParentItem, treeItem, true);
							}
							break;
					}
				}
			});

			/* collect partners, add logicalParentItem into partners collection */
			switch (logicalParentItem.actualItemType) {
				case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
				case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
				case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
					break;
				default:
					tempPartners = [];
					if ((visualParent = visualTree.parent(parentOrgItemId)) != null) {
						visualTree.loopChildrenRange(this, visualParent.id, leftSiblingOffset, visualTree.countChildren(visualParent.id) - rightSiblingOffset, function (childItemId, childItem, index) {
							if (childItem.id == parentOrgItemId) {
								tempPartners.push(childItem);
							} else {
								switch (childItem.actualItemType) {
									case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
									case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
									case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
										if (orgTree.parentid(childItem.id) == parentOrgItemId) {
											tempPartners.push(childItem);
										}
										break;
								}
							}
						});
					}
					if (tempPartners.length > 1) {
						partners[parentOrgItemId] = tempPartners;
					}
					break;
			}

			/* add children */
			rowAggregators[parentOrgItemId] = [];
			rowChildren[parentOrgItemId] = [];
			layoutChildren(orgTree, visualTree, options, logicalParentItem, regularChildren, parentOrgItem.childrenPlacementType, rowAggregators[parentOrgItemId], rowChildren[parentOrgItemId]);
		});

		/* transform tree to place children sub branches inside of hierarchy */
		orgTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
			var logicalParentItem = visualTree.node(nodeid),
				itemRowChildren,
				itemRowAggregators,
				hasChildren;
			if (logicalParentItem != null) {
				itemRowChildren = rowChildren[nodeid];
				itemRowAggregators = rowAggregators[nodeid];

				/* Move assistants children inside */
				depth = getAssitantsDepth(visualTree, logicalParentItem);
				if (depth > 0) {
					logicalParentItem.visualDepth = depth + 1;
					if (logicalParentItem.visualAggregatorId !== null) {
						visualAggregator = visualTree.node(logicalParentItem.visualAggregatorId);
						hasChildren = visualTree.hasChildren(visualAggregator.id);
						for (index = 0; index < depth - 1; index += 1) {
							visualAggregator = createNewVisualAggregator(visualTree, visualAggregator, !hasChildren);
						}
					}
				}

				/* Move advisers children inside */
				depth = getAdvisersDepth(visualTree, logicalParentItem);
				if (depth > 1) {
					logicalParentItem.visualDepth += (depth - 1);
					hasChildren = visualTree.hasChildren(nodeid);
					visualAggregator = logicalParentItem;
					for (index = 0; index < depth - 1; index += 1) {
						visualAggregator = createNewVisualAggregator(visualTree, visualAggregator, !hasChildren);
					}
				}

				/* Move children of children inside */
				rowDepths = [];
				for (index = 0, len = itemRowChildren.length; index < len; index += 1) {
					children = itemRowChildren[index];
					rowDepths[index] = 0;
					for (childIndex = 0, childrenLen = children.length; childIndex < childrenLen; childIndex += 1) {
						rowDepths[index] = Math.max(rowDepths[index], getItemDepth(visualTree, children[childIndex]));
					}
				}

				for (index = 0, len = rowDepths.length; index < len; index += 1) {
					rowDepth = rowDepths[index];
					if (rowDepth > 1) {
						for (childIndex = 0, childrenLen = itemRowAggregators[index].length; childIndex < childrenLen; childIndex += 1) {
							rowAggregator = itemRowAggregators[index][childIndex];
							if (visualTree.hasChildren(rowAggregator.id)) {
								depth = rowDepth;
								while (depth > 1) {
									rowAggregator = createNewVisualAggregator(visualTree, rowAggregator, false);
									depth -= 1;
								}
							}
						}
					}
				}

				/* Align heights of partner branches in order to draw connector lines between them and logical parent children */
				if (partners[nodeid] != null) {
					/* partners collection includes treeItem so we should have at least 2 items */
					layoutPartners(visualTree, logicalParentItem, partners[nodeid]);
				}
			}
		});
	}

	function layoutPartners(visualTree, treeItem, partners) {
		var partner,
			index, len,
			depth,
			maxDepth = 0,
			visualPartners = [],
			visualPartner,
			visualParent,
			visualAggregator,
			leftSiblingIndex,
			gravity;

		/* Find maximum depth required to enclose partners branches */
		for (index = 0, len = partners.length; index < len; index += 1) {
			partner = partners[index];
			maxDepth = Math.max(maxDepth, partner.visualDepth);
		}

		/* Extend visual aggregators lines and ensure that connector lines are visible */
		for (index = 0, len = partners.length; index < len; index += 1) {
			partner = partners[index];
			visualPartner = getLastVisualAggregator(visualTree, partner);
			depth = 1;
			visualAggregator = partner;
			while (visualAggregator.visualAggregatorId != null) {
				visualAggregator = visualTree.node(visualAggregator.visualAggregatorId);
				visualAggregator.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
				depth += 1;
			}
			while (depth < maxDepth) {
				visualPartner = createNewVisualAggregator(visualTree, visualPartner, false);
				depth += 1;
			}
			visualPartners.push(getLastVisualAggregator(visualTree, visualPartner).id);
		}


		visualAggregator = getLastVisualAggregator(visualTree, treeItem);
		if (visualTree.hasChildren(visualAggregator.id)) {
			/* Select middle partner */
			visualPartner = partners[Math.floor(partners.length / 2)];
			if (partners.length > 1 && partners.length % 2 === 0) {
				/* insert invisble partner for alignemnt */
				visualParent = visualTree.parent(visualPartner.id);
				leftSiblingIndex = findLeftSiblingIndex(visualTree, _data.navigationFamily, visualPartner);

				gravity = visualTree.getChild(visualParent.id, leftSiblingIndex).gravity ||
					visualTree.getChild(visualParent.id, leftSiblingIndex + 1).gravity;

				// visualParent.id,
				visualPartner = getNewTreeItem({
					visibility: 4/*primitives.common.Visibility.Invisible*/,
					connectorPlacement: visualPartner.connectorPlacement & (8/*primitives.common.SideFlag.Left*/ | 2/*primitives.common.SideFlag.Right*/),
					gravity: gravity
				});

				visualTree.add(visualParent.id, visualPartner.id, visualPartner, leftSiblingIndex + 1);

				depth = 1;
				while (depth < maxDepth) {
					visualPartner = createNewVisualAggregator(visualTree, visualPartner, false);
					visualPartner.connectorPlacement = 0;
					depth += 1;
				}
			}

			/* every child logically belongs to every partner */
			for (index = 0, len = partners.length; index < len; index += 1) {
				partner = partners[index];
				/* select all parents up to the root */
				_data.navigationFamily.loopChildren(this, treeItem.id, function (childItemId, childItem, level) {
					switch (childItem.actualItemType) {
						case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
						case 2/*primitives.orgdiagram.ItemType.Adviser*/:
						case 4/*primitives.orgdiagram.ItemType.SubAssistant*/:
						case 1/*primitives.orgdiagram.ItemType.Assistant*/:
							break;
						default:
							/* partners share only regular items */
							if (treeItem.id != partner.id) {
								defineNavigationParent(partner, childItem);
							}
							break;
					}
					return _data.navigationFamily.SKIP;
				}); //ignore jslint
			}

			/* Move children to new visual partner node */
			visualPartner = getLastVisualAggregator(visualTree, visualPartner);
			visualTree.moveChildren(visualAggregator.id, visualPartner.id);
		}

		/* Store collection of visual partners to draw connector lines*/
		visualPartner.partners = visualPartners;
	}

	function getLastVisualAggregator(visualTree, treeItem) {
		var result = treeItem;

		while (result.visualAggregatorId != null) {
			result = visualTree.node(result.visualAggregatorId);
		}
		return result;
	}

	function getAdvisersDepth(visualTree, treeItem) {
		var result = 0,
			parentItem = visualTree.parent(treeItem.id),
			treeItemIndex,
			position,
			childItem;
		if (parentItem !== null) {
			treeItemIndex = visualTree.indexOf(treeItem.id);

			position = 1;
			while ((childItem = visualTree.getChild(parentItem.id, treeItemIndex + position)) != null) {
				if (childItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
					result = Math.max(result, getItemDepth(visualTree, childItem));
					position += 1;
				}
				else {
					break;
				}
			}
			position = 1;
			while ((childItem = visualTree.getChild(parentItem.id, treeItemIndex - position)) != null) {
				if (childItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
					result = Math.max(result, getItemDepth(visualTree, childItem));
					position += 1;
				}
				else {
					break;
				}
			}
		}
		return result;
	}

	function getAssitantsDepth(visualTree, treeItem) {
		var result = 0;
		if (treeItem.visualAggregatorId != null) {
			visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, level) {
				if (treeItem.visualAggregatorId == childItemId) {
					return visualTree.SKIP;
				}
				result = level + 1;
			});
		}
		return result;
	}

	function getItemDepth(visualTree, treeItem) {
		var result = 0;
		visualTree.loopLevels(this, treeItem.id, function (childid, child, level) {
			result = level + 1;
		});
		return result + 1;
	}

	function layoutChildren(orgTree, visualTree, options, treeItem, regularChildren, childrenPlacementType, rowAggregators, rowChildren) {
		var visualParent,
			currentVisualParent,
			leftChildItem,
			rightChildItem,
			newAggregatorItem,
			childItem, orgChildItem,
			width,
			height,
			twinColumns,
			column,
			row,
			index, len,
			singleItemPlacement,
			hideParentConnector = (treeItem.visibility == 4/*primitives.common.Visibility.Invisible*/) && (treeItem.connectorPlacement === 0);

		switch (options.horizontalAlignment) {
			case 0/*primitives.common.HorizontalAlignmentType.Center*/:
			case 1/*primitives.common.HorizontalAlignmentType.Left*/:
				singleItemPlacement = 3/*primitives.common.AdviserPlacementType.Right*/;
				break;
			case 2/*primitives.common.HorizontalAlignmentType.Right*/:
				singleItemPlacement = 2/*primitives.common.AdviserPlacementType.Left*/;
				break;
		}

		if (childrenPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) {
			if (hasRegularLeavesOnly(orgTree, treeItem)) {
				childrenPlacementType = (options.leavesPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) ?
					3/*primitives.common.ChildrenPlacementType.Matrix*/ : options.leavesPlacementType;
			}
			else {
				childrenPlacementType = (options.childrenPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) ?
					2/*primitives.common.ChildrenPlacementType.Horizontal*/ : options.childrenPlacementType;
			}
		}

		visualParent = treeItem;
		/* if node has assitants then it has visual aggregator child node */
		if (treeItem.visualAggregatorId !== null) {
			visualParent = visualTree.node(treeItem.visualAggregatorId);
		}

		if (childrenPlacementType == 3/*primitives.common.ChildrenPlacementType.Matrix*/ && regularChildren.length < 3) {
			childrenPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;
		}

		switch (childrenPlacementType) {
			case 2/*primitives.common.ChildrenPlacementType.Horizontal*/:
				for (index = 0, len = regularChildren.length; index < len; index += 1) {
					childItem = regularChildren[index];
					orgChildItem = orgTree.node(childItem.id);
					visualTree.add(visualParent.id, childItem.id, childItem);
					childItem.connectorPlacement = (orgChildItem.hideParentConnection ? 0 : 1/*primitives.common.SideFlag.Top*/) | (orgChildItem.hideChildrenConnection ? 0 : 4/*primitives.common.SideFlag.Bottom*/);

					if (index === 0) {
						childItem.relationDegree = 1;
					}
				}
				break;
			case 3/*primitives.common.ChildrenPlacementType.Matrix*/:
				width = Math.min(options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
				height = Math.ceil(regularChildren.length / width);
				twinColumns = Math.ceil(width / 2.0);
				for (column = 0; column < twinColumns; column += 1) {
					currentVisualParent = visualParent;
					for (row = 0; row < height; row += 1) {
						leftChildItem = getMatrixItem(regularChildren, column * 2, row, width);
						rightChildItem = getMatrixItem(regularChildren, column * 2 + 1, row, width);
						if (rowAggregators[row] === undefined) {
							rowAggregators[row] = [];
							rowChildren[row] = [];
						}
						if (leftChildItem !== null) {
							if (column === 0) {
								leftChildItem.relationDegree = 1;
							}
							visualTree.add(currentVisualParent.id, leftChildItem.id, leftChildItem);
							leftChildItem.connectorPlacement = (hideParentConnector ? 0 : 2/*primitives.common.SideFlag.Right*/) | 4/*primitives.common.SideFlag.Bottom*/;
							leftChildItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;

							rowChildren[row].push(leftChildItem);
						}
						if (leftChildItem !== null || rightChildItem !== null) {
							// currentVisualParent.id,
							newAggregatorItem = getNewTreeItem({
								visibility: 4/*primitives.common.Visibility.Invisible*/,
								connectorPlacement: hideParentConnector ? 0 : 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/
							});
							visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
							rowAggregators[row].push(newAggregatorItem);
						}
						if (rightChildItem !== null) {
							visualTree.add(currentVisualParent.id, rightChildItem.id, rightChildItem);
							rightChildItem.connectorPlacement = (hideParentConnector ? 0 : 8/*primitives.common.SideFlag.Left*/) | 4/*primitives.common.SideFlag.Bottom*/;
							rightChildItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;

							rowChildren[row].push(rightChildItem);
						}

						currentVisualParent = newAggregatorItem;
					}
				}
				if (width > 2) {
					// No center alignment to aggregator required
					visualParent.visualAggregatorId = null;
				}
				break;
			case 1/*primitives.common.ChildrenPlacementType.Vertical*/:
				for (index = 0, len = regularChildren.length; index < len; index += 1) {
					childItem = regularChildren[index];

					// visualParent.id,
					newAggregatorItem = getNewTreeItem({
						visibility: 4/*primitives.common.Visibility.Invisible*/,
						connectorPlacement: hideParentConnector ? 0 : 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/
					});


					switch (singleItemPlacement) {
						case 2/*primitives.common.AdviserPlacementType.Left*/:
							visualTree.add(visualParent.id, childItem.id, childItem);
							visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
							childItem.connectorPlacement = (hideParentConnector ? 0 : 2/*primitives.common.SideFlag.Right*/) | 4/*primitives.common.SideFlag.Bottom*/;
							childItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							break;
						case 3/*primitives.common.AdviserPlacementType.Right*/:
							visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
							visualTree.add(visualParent.id, childItem.id, childItem);
							childItem.connectorPlacement = (hideParentConnector ? 0 : 8/*primitives.common.SideFlag.Left*/) | 4/*primitives.common.SideFlag.Bottom*/;
							childItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							break;
					}

					rowAggregators[index] = [newAggregatorItem];
					rowChildren[index] = [childItem];

					visualParent = newAggregatorItem;
				}
				break;
			default:
				throw "Children placement is undefined!";
		}
	}

	function getMatrixItem(items, x, y, width) {
		var result,
			isOdd = (width % 2 > 0),
			index;

		if (isOdd) {
			if (x === width - 1) {
				x = items.length;
			}
			else if (x === width) {
				x = width - 1;
			}
		}
		index = y * width + x;

		result = (index > items.length - 1) ? null : items[index];

		return result;
	}

	function hasRegularLeavesOnly(orgTree, treeItem) {
		var hasChildren = false,
			hasLeavesOnly = true;

		orgTree.loopChildren(this, treeItem.id, function (nodeid, node, index) {
			hasChildren = true;
			if (node.itemType === 0/*primitives.orgdiagram.ItemType.Regular*/ &&
				orgTree.hasChildren(nodeid)) {
				hasLeavesOnly = false;
				return true; // break
			}
		});
		return hasChildren && hasLeavesOnly;
	}

	/* Sibling is the first item which does not belongs to items logical hierarchy */
	function findLeftSiblingIndex(visualTree, navigationFamily, treeItem) {
		var result = null,
			ignore = {},
			visualParent = visualTree.parent(treeItem.id);

		visualTree.loopChildrenReversed(this, visualParent.id, function (childItemId, childItem, index) {
			if (result === null) {
				if (childItemId == treeItem.id) {
					result = -1;
					ignore[treeItem.id] = true;
					navigationFamily.loopChildren(this, treeItem.id, function (childid, child, level) {
						if (level > 0) {
							return navigationFamily.BREAK;
						}
						ignore[childid] = true;
					});
				}
			}
			else {
				if (!ignore.hasOwnProperty(childItemId)) {
					result = index;
					return true; //ignore jslint
				} else {
					navigationFamily.loopChildren(this, childItem.id, function (childid, child, level) {
						if (level > 0) {
							return navigationFamily.BREAK;
						}
						ignore[childid] = true;
					});
				}
			}
		});

		return result;
	}

	/* Sibling is the first item which does not belongs to items logical hierarchy */
	function findRightSiblingIndex(visualTree, navigationFamily, treeItem) {
		var result = null,
			ignore = {},
			visualParent = visualTree.parent(treeItem.id);

		visualTree.loopChildren(this, visualParent.id, function (childItemId, childItem, index, lastIndex) {
			if (result === null) {
				if (childItemId == treeItem.id) {
					result = lastIndex + 1;
					ignore[treeItem.id] = true;
					navigationFamily.loopChildren(this, treeItem.id, function (childid, child, level) {
						if (level > 0) {
							return navigationFamily.BREAK;
						}
						ignore[childid] = true;
					});
				}
			}
			else {
				if (!ignore.hasOwnProperty(childItemId)) {
					result = index;
					return true; //ignore jslint
				} else {
					navigationFamily.loopChildren(this, childItemId, function (childid, child, level) {
						if (level > 0) {
							return navigationFamily.BREAK;
						}
						ignore[childid] = true;
					});
				}
			}
		});
		return result;
	}

	function createNewVisualAggregator(visualTree, treeItem, hideChildrenConnector) {
		var newAggregatorItem,
			hideParentConnector = ((treeItem.visibility == 4/*primitives.common.Visibility.Invisible*/) && (treeItem.connectorPlacement === 0)) || hideChildrenConnector;

		newAggregatorItem = getNewTreeItem({
			visibility: 4/*primitives.common.Visibility.Invisible*/,
			visualAggregatorId: treeItem.visualAggregatorId,
			connectorPlacement: hideParentConnector ? 0 : (1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/)
		});

		visualTree.insert(treeItem.id, newAggregatorItem.id, newAggregatorItem);

		treeItem.visualAggregatorId = newAggregatorItem.id;
		return newAggregatorItem;
	}

	function getNewTreeItem(properties, orgItem) {
		var result = new primitives.orgdiagram.TreeItem(),
			optionKey;

		for (optionKey in properties) {
			if (properties.hasOwnProperty(optionKey)) {
				result[optionKey] = properties[optionKey];
			}
		}

		if (orgItem != null) {
			result.id = orgItem.id;
			result.visibility = orgItem.isVisible ? 0/*primitives.common.Visibility.Auto*/ : 4/*primitives.common.Visibility.Invisible*/;
		} else {
			_treeItemCounter += 1;
			result.id = _treeItemCounter;
		}

		return result;
	}

	function defineNavigationParent(parentItem, treeItem, skipFirstParent) {
		var parents = [];

		/* take logicalParentItem when it is visible or collect all visible immidiate parents of logicalParentItem */
		if (skipFirstParent || parentItem.visibility == 4/*primitives.common.Visibility.Invisible*/ || !_activeItems.hasOwnProperty(parentItem.id)) {
			if (!skipFirstParent) {
				parents.push(parentItem.id);
			}
			_data.navigationFamily.loopParents(this, parentItem.id, function (parentid, parent, level) {
				if (parent.visibility != 4/*primitives.common.Visibility.Invisible*/) {
					parents.push(parentid);
					if (_activeItems.hasOwnProperty(parentid)) {
						return _data.navigationFamily.SKIP;
					}
				}
			});
		} else {
			parents.push(parentItem.id);
		}
		if (_data.navigationFamily.node(treeItem.id) != null) {
			_data.navigationFamily.adopt(parents, treeItem.id);
		} else {
			_data.navigationFamily.add(parents, treeItem.id, treeItem);
		}
	}

	function updateVisualTreeMargins(visualTree, leftMargins, rightMargins) {
		visualTree.loop(this, function (nodeid, node) {
			leftMargins[nodeid] = [];
			rightMargins[nodeid] = [];
		});

		visualTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
			var parentLeftMargins = leftMargins[parentid],
				parentRightMargins = rightMargins[parentid],
				nodeLeftMargins = leftMargins[nodeid],
				nodeRightMargins = rightMargins[nodeid],
				index, len;

			if (parentid != null) {
				/* update parent left margins */
				if (!parentLeftMargins[0]) {
					parentLeftMargins[0] = nodeid;
				}

				for (index = 0, len = nodeLeftMargins.length; index < len; index += 1) {
					if (!parentLeftMargins[index + 1]) {
						parentLeftMargins[index + 1] = nodeLeftMargins[index];
					}
				}

				/* update parent rights margins */
				parentRightMargins[0] = nodeid;

				for (index = 0, len = nodeRightMargins.length; index < len; index += 1) {
					parentRightMargins[index + 1] = nodeRightMargins[index];
				}
			}
		});
	}

	function getVisualTree() {
		return _data.visualTree;
	}

	function getNavigationFamily() {
		return _data.navigationFamily;
	}

	function getConnectionsFamily() {
		return _data.connectionsFamily;
	}

	function getLeftMargins() {
		return _data.leftMargins;
	}

	function getRightMargins() {
		return _data.rightMargins;
	}

	return {
		process: process,
		getVisualTree: getVisualTree,
		getNavigationFamily: getNavigationFamily,
		getConnectionsFamily: getConnectionsFamily,
		getLeftMargins: getLeftMargins,
		getRightMargins: getRightMargins
	};
};

/* /Controls/OrgDiagram/Templates/AnnotationLabelTemplate.js*/
/* jshint latedef: true, unused: false */
primitives.common.AnnotationLabelTemplate = function () {
	var _template = ["div",
		{
			"type": "checkbox",
			"name": "checkbox",
			"class": ["bp-item", "bp-corner-all", "bp-connector-label"]
		}
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultAnnotationLabelTemplate";
	}

	function render(event, data) {
		var annotationConfig = data.context;
		if (primitives.common.isArray(annotationConfig.label)) {
			data.element.innerHTML = "";
			data.element.appendChild(primitives.common.JsonML.toHTML(annotationConfig.label));
		} else {
			data.element.innerHTML = annotationConfig.label;
		}
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/ButtonsTemplate.js*/
primitives.common.ButtonsTemplate = function (options) {
	var _template = ["div", {
		"style": {
			position: "absolute"
		}
	}
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultButtonsTemplate";
	}

	function render(event, data) {
		var element = data.element,
			topOffset = 0,
			buttonsInterval = 10,
			buttonConfig,
			buttons = data.buttons,
			buttonprop,
			button,
			index;



		switch (data.renderingMode) {
			case 0/*primitives.common.RenderingMode.Create*/:
				for (index = 0; index < buttons.length; index += 1) {
					buttonConfig = buttons[index];
					button = ["button",
						{
							"style": {
								position: "absolute",
								top: topOffset + "px",
								left: "0px"
							},
							"class": ["orgdiagrambutton", "bp-button"],
							"data-buttonname": buttonConfig.name
						},
						["span",
							{
								"style": {
									width: buttonConfig.size.width + "px",
									height: buttonConfig.size.height + "px"
								},
								"class": ["bp-icon", buttonConfig.icon]
							}
						]
					];
					data.element.appendChild(primitives.common.JsonML.toHTML(button));
					topOffset += buttonsInterval + buttonConfig.size.height;
				}
				

				break;
			case 1/*primitives.common.RenderingMode.Update*/:
				break;
		}
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};



/* /Controls/OrgDiagram/Templates/CheckBoxTemplate.js*/
primitives.common.CheckBoxTemplate = function (selectCheckBoxLabel) {
	var _template = ["div",
		["label",
			["nobr",
				["input",
					{
						"type": "checkbox",
						"name": "checkbox",
						"class": "bp-selectioncheckbox"
					}
				],
				'\xa0',
				["span",
					{
						"name": "selectiontext",
						"class": "bp-selectiontext"
					},
					selectCheckBoxLabel
				]
			]
		]
	];

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultCheckBoxTemplate";
	}

	function render(event, data) {
		var checkBox = data.element.firstChild.firstChild.firstChild;
		checkBox.checked = data.isSelected;
		checkBox.setAttribute("data-id", data.id);
		var label = data.element.firstChild.firstChild.childNodes[2];
		label.setAttribute("data-id", data.id);
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/CursorTemplate.js*/
primitives.common.CursorTemplate = function (options, itemTemplateConfig) {
	var _template = create(itemTemplateConfig);

	function create(config) {
		return ["div",
				{
					"style": {
						width: (config.itemSize.width + config.cursorPadding.left + config.cursorPadding.right) + "px",
						height: (config.itemSize.height + config.cursorPadding.top + config.cursorPadding.bottom) + "px",
						"borderWidth": config.cursorBorderWidth + "px"
					},
					"class": ["bp-item", "bp-corner-all", "bp-cursor-frame"]
				}
		];
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultCursorTemplate";
	}

	function render(event, data) {

	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/DotHighlightTemplate.js*/
primitives.common.DotHighlightTemplate = function (options, itemTemplateConfig) {
	var _template = create(itemTemplateConfig);

	function create(config) {
		var radius = config.minimizedItemCornerRadius + config.highlightPadding.left;
		return ["div",
				{
					"style": {
						"borderWidth": config.highlightBorderWidth + "px",
						"MozBorderRadius": radius + "px",
						"WebkitBorderRadius": radius + "px",
						"-khtml-border-radius": radius + "px",
						"borderRadius": radius + "px"
					},
					"class": ["bp-item", "bp-highlight-dot-frame"]
				}
		];
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultDotHighlightTemplate";
	}

	function render(event, data) {

	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/GroupTitleTemplate.js*/
primitives.common.GroupTitleTemplate = function (options) {
	var _template = create();

	function create() {
		return ["div",
				{
					"style": {
						"fontSize": options.groupTitleFontSize,
						"fontFamily": options.groupTitleFontFamily,
						"fontWeight": options.groupTitleFontWeight,
						"fontStyle": options.groupTitleFontStyle
					},
					"class": ["bp-item", "bp-corner-all", "bp-grouptitle-frame"]
				},
				text(options.groupTitleOrientation, options.groupTitleHorizontalAlignment, options.groupTitleVerticalAlignment)
		];
	}

	function text(orientation, horizontalAlignment, verticalAlignment) {
		var rotation = "",
			element;

		switch (orientation) {
			case 0/*primitives.text.TextOrientationType.Horizontal*/:
			case 3/*primitives.text.TextOrientationType.Auto*/:
				break;
			case 1/*primitives.text.TextOrientationType.RotateLeft*/:
				rotation = "rotate(-90deg)";
				break;
			case 2/*primitives.text.TextOrientationType.RotateRight*/:
				rotation = "rotate(90deg)";
				break;
		}

		var style = {
			"fontSize": options.groupTitleFontSize,
			"fontFamily": options.groupTitleFontFamily,
			"fontWeight": options.groupTitleFontWeight,
			"fontStyle": options.groupTitleFontStyle,
			"position": "absolute",
			"padding": 0,
			"margin": 0,
			"textAlign": _getTextAlign(horizontalAlignment),
			"lineHeight": 1,
			"-webkit-transform-origin": "center center",
			"-moz-transform-origin": "center center",
			"-o-transform-origin": "center center",
			"-ms-transform-origin": "center center",
			"-webkit-transform": rotation,
			"-moz-transform": rotation,
			"-o-transform": rotation,
			"-ms-transform": rotation,
			"transform": rotation
		};

		switch (verticalAlignment) {
			case 0/*primitives.common.VerticalAlignmentType.Top*/:
				element = ["div",
					{
						"style": style,
						"class": ["bp-title-content", "bp-item", "bp-corner-all"]
					}
				];
				break;
			default:
				style.borderCollapse = "collapse";

				element = ["table",
					{
						"style": style
					},
					["tbody",
						["tr",
							["td",
								{
									"style": {
										"verticalAlign": _getVerticalAlignment(verticalAlignment),
										"padding": 0
									},
									"class": "bp-title-content"
								}
							]
						]
					]
				];
				break;
		}

		return element;
	}

	function _getTextAlign(alignment) {
		var result = null;
		switch (alignment) {
			case 0/*primitives.common.HorizontalAlignmentType.Center*/:
				result = "center";
				break;
			case 1/*primitives.common.HorizontalAlignmentType.Left*/:
				result = "left";
				break;
			case 2/*primitives.common.HorizontalAlignmentType.Right*/:
				result = "right";
				break;
		}
		return result;
	}

	function _getVerticalAlignment(alignment) {
		var result = null;
		switch (alignment) {
			case 1/*primitives.common.VerticalAlignmentType.Middle*/:
				result = "middle";
				break;
			case 0/*primitives.common.VerticalAlignmentType.Top*/:
				result = "top";
				break;
			case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
				result = "bottom";
				break;
		}
		return result;
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultGroupTitleTemplate";
	}

	function render(event, data) {
		var itemConfig = data.context,
			groupTitleColor = itemConfig.groupTitleColor || options.groupTitleColor,
			style = {},
			width = data.width,
			height = data.height;

		style.left = Math.round(width / 2.0 - height / 2.0) + "px";
		style.top = Math.round(height / 2.0 - width / 2.0) + "px";
		style.width = height + "px";
		style.height = width + "px";
		style.maxWidth = style.width;
		style.maxHeight = style.height;

		var container = data.element.firstChild;
		primitives.common.JsonML.applyStyles(container, style);

		var label = itemConfig.groupTitle || "";
		label = label.replace(new RegExp("\n", 'g'), "<br/>");

		var title;
		switch (options.groupTitleVerticalAlignment) {
			case 0/*primitives.common.VerticalAlignmentType.Top*/:
				title = data.element.firstChild;
				break;
			default:
				title = data.element.firstChild.firstChild.firstChild.firstChild;
				title.style.borderCollapse = "collapse";
				break;
		}
		title.style.color = primitives.common.highestContrast(groupTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);
		title.textContent = label;

		primitives.common.JsonML.applyStyles(data.element, {
			"backgroundColor": groupTitleColor
		});
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};



/* /Controls/OrgDiagram/Templates/HighlightTemplate.js*/
primitives.common.HighlightTemplate = function (options, itemTemplateConfig) {
	var _template = create(itemTemplateConfig);

	function create(config) {
		return ["div",
		{
			"style": {
				"borderWidth": config.highlightBorderWidth + "px"
			},
			"class": ["bp-item", "bp-corner-all", "bp-highlight-frame"]
		}
		];
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultHighlightTemplate";
	}

	function render(event, data) {

	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/ItemTemplate.js*/
primitives.common.ItemTemplate = function (options, itemTemplateConfig) {
	var _template = create(itemTemplateConfig);

	function create(config) {
		var contentSize = new primitives.common.Size(config.itemSize),
			itemTemplate,
			titleBackground,
			title,
			photoborder,
			photo,
			description;

		contentSize.width -= config.itemBorderWidth * 2;
		contentSize.height -= config.itemBorderWidth * 2;

		itemTemplate = ["div",
				{
					"style": {
						"borderWidth": config.itemBorderWidth + "px"
					},
					"class": ["bp-item", "bp-corner-all", "bt-item-frame"]
				},
				["div",
					{
						"name": "titleBackground",
						"style": {
							top: "2px",
							left: "2px",
							width: (contentSize.width - 4) + "px",
							height: "18px"
						},
						"class": ["bp-item", "bp-corner-all", "bp-title-frame"]
					},
					["div",
						{
							"name": "title",
							"style": {
								top: "1px",
								left: "4px",
								width: (contentSize.width - 4 - 4 * 2) + "px",
								height: "16px"
							},
							"class": ["bp-item", "bp-title"]
						}
					]
				],
                ["div", // photo border
                    {
                        "name": "photoBorder",
						"style": {
							top: "24px",
							left: "2px",
							width: "50px",
							height: "60px"
						},
						"class": ["bp-item", "bp-photo-frame"]
					},
					["img", // photo
						{
							"name": "photo",
							"alt": "",
							"style": {
								width: "50px",
								height: "60px"
							}
						}
					]
				],
				["div",
					{
						"name": "description",
						"style": {
							top: "24px",
							left: "56px",
							width: (contentSize.width - 4 - 56) + "px",
							height: "74px"
						},
						"class": ["bp-item", "bp-description"]
					}

				]
		];

		return itemTemplate;
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultItemTemplate";
	}

	function render(event, data) {
        var itemConfig = data.context,
            itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : "#4169e1"/*primitives.common.Colors.RoyalBlue*/,
            color = primitives.common.highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor),
            element = data.element,
            titleBackground = element.firstChild,
            photo = element.childNodes[1].firstChild,
            title = titleBackground.firstChild,
            description = element.childNodes[2];

        primitives.common.JsonML.applyStyles(titleBackground, {
            "backgroundColor": itemTitleColor
        });
        photo.src = itemConfig.image;
        photo.alt = itemConfig.title;
        primitives.common.JsonML.applyStyles(title, {
            "color": color
        });
        title.textContent = itemConfig.title;
        description.textContent = itemConfig.description;
    }

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/Templates/UserTemplate.js*/
primitives.common.UserTemplate = function (options, content, onRender) {
	var _hashCode = primitives.common.hashCode(JSON.stringify(content));

	function template() {
		return content;
	}

	function getHashCode() {
		return _hashCode;
	}

	function render(event, data) {
		if (onRender != null) {
			onRender(event, data);
		} else {
			var itemConfig = data.context,
				itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : "#4169e1"/*primitives.common.Colors.RoyalBlue*/,
				color = primitives.common.highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);

			primitives.common.getElementsByName(this, data.element, "photo", function(node) {
				node.src = itemConfig.image;
				node.alt = itemConfig.title;
			});

			primitives.common.getElementsByName(this, data.element, "titleBackground", function(node) {
				primitives.common.JsonML.applyStyles(node, {
					"background": itemTitleColor
				});
			});

			primitives.common.getElementsByName(this, data.element, "title", function(node) {
				primitives.common.JsonML.applyStyles(node, {
					"color": color
				});
				node.textContent = itemConfig.title;
			});

			primitives.common.getElementsByName(this, data.element, "description", function(node) {
				node.textContent = itemConfig.description;
			});
		}
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /Controls/OrgDiagram/BaseControl.js*/
primitives.orgdiagram.BaseControl = function (element, options, taskManagerFactory, eventArgsFactory, templates) {
	var _data = {
		name: "orgdiagram",
		options: options,
		tasks: null,
		graphics: null,
		mouse: null,
		layout: {
			element: element,
			scrollPanel: null,
			mousePanel: null,
			placeholder: null,
			calloutPlaceholder: null,
			forceCenterOnCursor: true
		}
	},
	_dragFrom,
	_scrollFrom,
	_scrollTo,
	_dragImage,
	_dragTimer,
	_scale,
	_debug = false,
	_timer = null;

	/*
		method: update
			Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update controls contents.
	
		Parameters:
			updateMode: This parameter defines severaty of update <primitives.common.UpdateMode>. 
			For example <primitives.common.UpdateMode.Refresh> updates only 
			items and selection reusing existing elements where ever it is possible.
			forceCenterOnCursor: Set this paramter to false, if you don't need to recenter diagram on cursor item.

		See also:
			<primitives.common.UpdateMode>

		Default:
			<primitives.common.UpdateMode.Recreate>
	*/
	function update(updateMode, forceCenterOnCursor) {
		if (forceCenterOnCursor == null) {
			forceCenterOnCursor = true;
		}
		switch (updateMode) {
			case 1/*primitives.common.UpdateMode.Refresh*/:
				refresh(forceCenterOnCursor, _debug);
				break;
			case 2/*primitives.common.UpdateMode.PositonHighlight*/:
				positionHighlight(_debug);
				break;
			default:
				redraw();
				break;
		}
	}

	/*
		method: destroy
			Removes all elements control added to DOM incluidng event listeners.
	*/
	function destroy() {
		unbind(_data.layout);
		cleanLayout(_data.layout);

		_data.tasks = null;
		_data.graphics = null;
	}

	function redraw() {
		unbind(_data.layout);
		cleanLayout(_data.layout);

		createLayout(_data.layout, _data.name);
		bind(_data.layout);
		_data.tasks = taskManagerFactory(getOptions, getGraphics, getLayout, templates);
		_data.graphics = primitives.common.createGraphics(_data.options.graphicsType, _data.layout.element);
		_data.graphics.debug = _debug;

		refresh(true, _debug);
	}

	function refresh(forceCenterOnCursor, debug) {
		var centerOnCursorTask,
			placeholderOffset;

		//_data.layout.scrollPanel.css({
		//	"display": "none",
		//	"-webkit-overflow-scrolling": "auto"
		//});

		//this.graphics.begin();

		_data.layout.forceCenterOnCursor = forceCenterOnCursor;
		_data.tasks.process('OptionsTask', null, debug);

		_data.graphics.end();

		//_data.layout.scrollPanel.css({
		//	"display": "block"
		//});

		if (forceCenterOnCursor) {
			/* scroll to offset */
			centerOnCursorTask = _data.tasks.getTask("CenterOnCursorTask");
			placeholderOffset = centerOnCursorTask.getPlaceholderOffset();
			_data.layout.scrollPanel.scrollLeft = placeholderOffset.x;
			_data.layout.scrollPanel.scrollTop = placeholderOffset.y;
		}
		//_data.layout.scrollPanel.css({
		//	"-webkit-overflow-scrolling": "touch"
		//});
	}

	function positionHighlight(debug) {
		_data.layout.forceCenterOnCursor = false;
		_data.tasks.process('HighlightItemOptionTask', null, debug);

		_data.graphics.end();
	}

	function redrawCurrentViewPort(debug) {
		_data.layout.forceCenterOnCursor = false;
		_data.tasks.process('CurrentScrollPositionTask', null, debug);

		_data.graphics.end();
	}

	function onScroll(event) {
		if (_timer == null) {
			_timer = window.setTimeout(function () {
				redrawCurrentViewPort(_debug);
				window.clearTimeout(_timer);
				_timer = null;
			}, 200);
		}
	}

	/*
		method: setOptions
			Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

		Parameters:
		options - JavaScript object containing options.
	*/
	function setOptions(options) {
		for (var option in options) {
			if (options.hasOwnProperty(option)) {
				_data.options[option] = options[option];
			}
		}
	}

	/*
		method: getOptions
			This method returns current configuration object.

		Returns:
		Reference to current configuration object
	*/
	function getOptions() {
		return _data.options;
	}

	/*
		method: getOption
			This method returns configuration option by name.

		Returns:
		Option value by name
	*/
	function getOption(option) {
		return _data.options[option];
	}

	/*
		method: setOption
			Method to set configuration option of the control by name.

		Parameters:
		option - option name
		value - value
	*/
	function setOption(option, value) {
		return _data.options[option] = value;
	}

	function getGraphics() {
		return _data.graphics;
	}

	function getLayout() {
		return _data.layout;
	}

	function createLayout(layout, name) {
		var elementSize = primitives.common.getInnerSize(layout.element),
			scrollPanelRect = new primitives.common.Rect(0, 0, elementSize.width, elementSize.height),
			placeholderRect = new primitives.common.Rect(scrollPanelRect),
			pixelAlignmentFix = primitives.common.getFixOfPixelALignment(element);

		
		primitives.common.JsonML.appendDOM(layout.element, primitives.common.JsonML.toHTML(
			["div", /* scrollPanel - root scroll panel */
				{
					"tabindex": 0,
					"style": {
						"position": "relative",
						"overflow": "auto",
						"-webkit-overflow-scrolling": "touch",
						"top": "0px",
						"left": "0px",
						"width": scrollPanelRect.width + "px",
						"height": scrollPanelRect.height + "px",
						"padding": "0px",
						"marginBottom": "0px",
						"marginRight": "0px",
						"marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
						"marginTop": pixelAlignmentFix.height + "px"
					},
					"class": name,
					"$": function (element) { layout.scrollPanel = element; }
				},
				["div", /* mousePanel - mouse tracking events panel */
					{
						"style": primitives.common.mergeObjects({
							position: "absolute",
							overflow: "hidden"
						},
						placeholderRect.getCSS()),
						"class": name,
						"$": function (element) { layout.mousePanel = element; }
					},
					["div", /* placeholder - contents scalable panel */
						{
							"style": primitives.common.mergeObjects({
								position: "absolute",
								overflow: "hidden"
							},
							placeholderRect.getCSS()),
							"class": ["placeholder", name],
							"$": function (element) { layout.placeholder = element; }
						},
						["div", /* calloutPlaceholder - callout panel */
							{
								"style": {
									position: "absolute",
									overflow: "visible",
									top: "0px",
									left: "0px",
									width: "0px",
									height: "0px"
								},
								"class": ["calloutplaceholder", name],
								"$": function (element) { layout.calloutPlaceholder = element; }
							}
						]
					]
				]
			])
		);
	}

	function cleanLayout(layout) {
		if (_data.layout.scrollPanel != null) {
			var parent = _data.layout.scrollPanel.parentNode;
			if (parent != null) {
				parent.removeChild(_data.layout.scrollPanel);
			}
		}
	}

	function bind(layout) {
		layout.mousePanel.addEventListener('mousemove', onMouseMove);
		layout.mousePanel.addEventListener('click', onMouseClick);
		layout.mousePanel.addEventListener('dblclick', onMouseDblClick);
		layout.mousePanel.addEventListener('change', onCheckboxChange);

		layout.scrollPanel.addEventListener('keydown', onKeyDown);
		layout.scrollPanel.addEventListener('scroll', onScroll);
		if (_data.options.enablePanning && primitives.common.isChrome()) {
			layout.scrollPanel.draggable = true;
			layout.scrollPanel.addEventListener('dragstart', onDragStart);
			layout.scrollPanel.addEventListener('drag', onDragScroll);
			layout.scrollPanel.addEventListener('dragend', onDragScroll);
			layout.scrollPanel.addEventListener('dragover', onDragOver);
		}
	}

	function unbind(layout) {
		if (layout.mousePanel != null) {
			layout.mousePanel.removeEventListener("mousemove", onMouseMove);
			layout.mousePanel.removeEventListener("click", onMouseClick);
			layout.mousePanel.removeEventListener("dblclick", onMouseDblClick);
			layout.mousePanel.removeEventListener("change", onCheckboxChange);
		}
		if (layout.scrollPanel != null) {
			layout.scrollPanel.removeEventListener("keydown", onKeyDown);
			layout.scrollPanel.removeEventListener("scroll", onScroll);

			layout.scrollPanel.removeEventListener('dragstart', onDragStart);
			layout.scrollPanel.removeEventListener('drag', onDragScroll);
			layout.scrollPanel.removeEventListener('dragend', onDragScroll);
			layout.scrollPanel.removeEventListener('dragover', onDragOver);
		}
	}

	function onMouseMove(event) {
		var placeholderOffset = primitives.common.getElementOffset(_data.layout.mousePanel),
			x = event.pageX - placeholderOffset.left,
			y = event.pageY - placeholderOffset.top,
			createTransformTask = _data.tasks.getTask("CreateTransformTask"),
			highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
			itemId;

		if (highlightItemOptionTask.hasHighlightEnabled()) {
			itemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius());
			setHighlightItem(event, itemId);
		}
	}

	function onCheckboxChange(event) {
		var target = event.target;
		var selectedId = target.getAttribute("data-id");
		if (selectedId != null) {
			var selectedItems = (_data.options.selectedItems || []).slice();
			var eventArgs = getEventArgs(null, selectedId);
			var position = primitives.common.indexOf(selectedItems, selectedId);
			trigger("onSelectionChanging", event, eventArgs);
			if (!eventArgs.cancel) {
				if (position >= 0) {
					selectedItems.splice(position, 1);
				}
				else {
					selectedItems.push(selectedId);
				}
				_data.options.selectedItems = selectedItems;

				if (position < 0) {
					target.setAttribute("checked", "checked");
				} else {
					target.removeAttribute("checked");
				}

				//refresh(false, false);

				trigger("onSelectionChanged", event, eventArgs);
			}
		}
	}

	function onMouseClick(event) {
		var placeholderOffset = primitives.common.getElementOffset(_data.layout.mousePanel),
			x = event.pageX - placeholderOffset.left,
			y = event.pageY - placeholderOffset.top,
			createTransformTask = _data.tasks.getTask("CreateTransformTask"),
			cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
			highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
			item,
			newCursorItemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
			target,
			button,
			buttonname,
			eventArgs,
			position,
			selectedItems;
		target = event.target;
		if (newCursorItemId !== null) {
			if (primitives.common.hasClass(target, _data.name + "button") || primitives.common.hasClass(target.parentNode, _data.name + "button")) {
				button = primitives.common.hasClass(target, _data.name + "button") ? target : target.parentNode;
				buttonname = button.getAttribute("data-buttonname");

				eventArgs = getEventArgs(null, newCursorItemId, buttonname);
				trigger("onButtonClick", event, eventArgs);
			}
			else if (target.getAttribute("name") === "checkbox" || target.getAttribute("name") === "selectiontext") { //ignore jslint
				
			}
			else {
				eventArgs = getEventArgs(null, newCursorItemId);
				trigger("onMouseClick", event, eventArgs);
				if (!eventArgs.cancel) {
					if (cursorItemOptionTask.hasCursorEnabled()) {
						setCursorItem(event, newCursorItemId);
						_data.layout.scrollPanel.focus();
					}
				}
			}
		}
	}

	function onMouseDblClick(event) {
		var eventArgs,
			highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
			highlightTreeItem = highlightItemTask.getHighlightTreeItem();

		if (highlightTreeItem !== null) {
				eventArgs = getEventArgs(null, highlightTreeItem);
				trigger("onMouseDblClick", event, eventArgs);
		}
	}

	function onKeyDown(event) {
		var highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
			highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
			cursorItemTask = _data.tasks.getTask("CursorItemTask"),
			cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
			alignDiagramTask = _data.tasks.getTask('AlignDiagramTask'),
			createTransformTask = _data.tasks.getTask('CreateTransformTask'),
			transform = createTransformTask.getTransform(),
			navigationItem = null,
			newNavigationItem,
			direction = null,
			accepted,
			layout = _data.layout;

		if (highlightItemOptionTask.hasHighlightEnabled() && cursorItemOptionTask.hasCursorEnabled()) {
			navigationItem = highlightItemTask.getHighlightTreeItem();
			if (navigationItem === null) {
				navigationItem = cursorItemTask.getCursorTreeItem();
			}
		} else if (highlightItemOptionTask.hasHighlightEnabled()) {
			navigationItem = highlightItemTask.getHighlightTreeItem();
		} else if (cursorItemOptionTask.hasCursorEnabled()) {
			navigationItem = cursorItemTask.getCursorTreeItem();
		}


		if (navigationItem != null) {
			switch (event.which) {
				case 13: /*Enter*/
					if (cursorItemOptionTask.hasCursorEnabled()) {
						setCursorItem(event, navigationItem);
						event.preventDefault();
						layout.scrollPanel.focus();
					}
					break;
				case 40: /*Down*/
					direction = 1/*primitives.common.OrientationType.Bottom*/;
					break;
				case 38: /*Up*/
					direction = 0/*primitives.common.OrientationType.Top*/;
					break;
				case 37: /*Left*/
					direction = 2/*primitives.common.OrientationType.Left*/;
					break;
				case 39: /*Right*/
					direction = 3/*primitives.common.OrientationType.Right*/;
					break;
			}

			if (direction != null) {

				accepted = false;

				while (!accepted) {
					accepted = true;

					direction = transform.getOrientation(direction);
					newNavigationItem = alignDiagramTask.getNextItem(navigationItem, direction);

					if (newNavigationItem != null) {
						event.preventDefault();
						if (highlightItemOptionTask.hasHighlightEnabled()) {
							setHighlightItem(event, newNavigationItem);
						} else if (cursorItemOptionTask.hasCursorEnabled()) {
							setCursorItem(event, newNavigationItem);
						}

					}
				}
				layout.scrollPanel.focus();
			}
		}
	}

	function onDragStart(event) {
		var scrollPanel = _data.layout.scrollPanel;
		_dragFrom = new primitives.common.Point(event.clientX, event.clientY);
		_scrollFrom = new primitives.common.Point(scrollPanel.scrollLeft, scrollPanel.scrollTop);
		_dragImage = _dragImage || new Image(); //ignore jslint
		event.dataTransfer.setDragImage(_dragImage, 0, 0);
	}

	function onDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}

	function onDragScroll(event) {
		_scrollTo = new primitives.common.Point(_scrollFrom.x - (event.clientX - _dragFrom.x), _scrollFrom.y - (event.clientY - _dragFrom.y));
		if (_dragTimer == null) {
			_dragTimer = window.setTimeout(function () {
				var scrollPanel = _data.layout.scrollPanel;
				scrollPanel.scrollLeft = _scrollTo.x;
				scrollPanel.scrollTop = _scrollTo.y;
				window.clearTimeout(_dragTimer);
				_dragTimer = null;
			}, 50);
		}
	}

	function setHighlightItem(event, newHighlightItemId) {
		var result = true,
			eventArgs;
		if (newHighlightItemId !== null) {
			if (newHighlightItemId !== _data.options.highlightItem) {
				eventArgs = getEventArgs(_data.options.highlightItem, newHighlightItemId);

				_data.options.highlightItem = newHighlightItemId;

				trigger("onHighlightChanging", event, eventArgs);

				if (!eventArgs.cancel) {
					refresh(false, false);

					trigger("onHighlightChanged", event, eventArgs);
				} else {
					result = false;
				}
			}
		} else {
			if (_data.options.highlightItem !== null) {
				eventArgs = getEventArgs(_data.options.highlightItem, null);

				_data.options.highlightItem = null;

				trigger("onHighlightChanging", event, eventArgs);

				if (!eventArgs.cancel) {
					refresh(false, false);

					trigger("onHighlightChanged", event, eventArgs);
				} else {
					result = false;
				}
			}
		}
		return result;
	}

	function setCursorItem(event, newCursorItemId) {
		var eventArgs;
		if (newCursorItemId !== _data.options.cursorItem) {
			eventArgs = getEventArgs(_data.options.cursorItem, newCursorItemId);

			_data.options.cursorItem = newCursorItemId;

			trigger("onCursorChanging", event, eventArgs);

			if (!eventArgs.cancel) {
				refresh(true, _debug);

				trigger("onCursorChanged", event, eventArgs);
			}
		}
	}

	function getEventArgs(oldTreeItemId, newTreeItemId, name) {
		return eventArgsFactory(_data, oldTreeItemId, newTreeItemId, name);
	}

	function trigger(eventHandlerName, event, eventArgs) {
		var eventHandler = _data.options[eventHandlerName];
		if (eventHandler != null) {
			eventHandler(event, eventArgs);
		}
	}

	update(); /* init control on create */

	return {
		destroy: destroy,
		setOptions: setOptions,
		getOptions: getOptions,
		setOption: setOption,
		getOption: getOption,
		update: update
	};
};


/* /Controls/OrgDiagram/Control.js*/
/*
	Class: primitives.orgdiagram.Control
	JavaScript Organizational Diagram Control. 
	
	Parameters:
	element - reference to DOM element which is used as new control placeholder. 
		Control renders diagram content inside of that DIV placeholder and  adds events listeners.
	options - reference to primitives.orgdiagram.Config class instance.

	Returns: 
	reference to new instance of the control. Control adds event listeners bound to its contents, so if you need to remove it from DOM call destroy() method on the control's instance.
*/
primitives.orgdiagram.Control = function (element, options) {
	return primitives.orgdiagram.BaseControl(element, options, primitives.orgdiagram.TaskManagerFactory, primitives.orgdiagram.EventArgsFactory, {
		AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
		ButtonsTemplate: primitives.common.ButtonsTemplate,
		CheckBoxTemplate: primitives.common.CheckBoxTemplate,
		CursorTemplate: primitives.common.CursorTemplate,
		DotHighlightTemplate: primitives.common.DotHighlightTemplate,
		GroupTitleTemplate: primitives.common.GroupTitleTemplate,
		HighlightTemplate: primitives.common.HighlightTemplate,
		ItemTemplate: primitives.common.ItemTemplate,
		UserTemplate: primitives.common.UserTemplate
	});
};


/* /Controls/OrgDiagram/EventArgsFactory.js*/
primitives.orgdiagram.EventArgsFactory = function (data, oldTreeItemId, newTreeItemId, name) {
	var result = new primitives.orgdiagram.EventArgs(),
		combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
		alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
		oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
		newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
		itemPosition,
		actualPosition,
		offset,
		panelOffset;

	if (oldItemConfig && oldItemConfig.id != null) {
		result.oldContext = oldItemConfig;
	}

	if (newItemConfig && newItemConfig.id != null) {
		result.context = newItemConfig;

		if (newItemConfig.parent !== null) {
			result.parentItem = combinedContextsTask.getConfig(newItemConfig.parent);
		}

		panelOffset = primitives.common.getElementOffset(data.layout.mousePanel);
		offset = primitives.common.getElementOffset(data.layout.element);
		itemPosition = alignDiagramTask.getItemPosition(newTreeItemId),
		result.position = new primitives.common.Rect(itemPosition.actualPosition)
				.translate(panelOffset.left, panelOffset.top)
				.translate(-offset.left, -offset.top);
	}

	if (name != null) {
		result.name = name;
	}

	return result;
};


/* /Controls/OrgDiagram/getProcessDiagramConfig.js*/
primitives.orgdiagram.getProcessDiagramConfig = function () {
	var dummyFunction = function () { };
	var tasks = primitives.orgdiagram.TaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
	return tasks.getProcessDiagramConfig();
};

/* /Controls/OrgDiagram/TaskManagerFactory.js*/
primitives.orgdiagram.TaskManagerFactory = function (getOptions, getGraphics, getLayout, templates) {
	var tasks = new primitives.common.TaskManager();

	// Dependencies
	tasks.addDependency('options', getOptions);
	tasks.addDependency('graphics', getGraphics);
	tasks.addDependency('layout', getLayout);
	tasks.addDependency('templates', templates);

	tasks.addDependency('defaultConfig', new primitives.orgdiagram.Config());
	tasks.addDependency('defaultItemConfig', new primitives.orgdiagram.ItemConfig());
	tasks.addDependency('defaultTemplateConfig', new primitives.orgdiagram.TemplateConfig());
	tasks.addDependency('defaultButtonConfig', new primitives.orgdiagram.ButtonConfig());

	tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.orgdiagram.BackgroundAnnotationConfig());
	tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.orgdiagram.ConnectorAnnotationConfig());
	tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.orgdiagram.HighlightPathAnnotationConfig());
	tasks.addDependency('defaultShapeAnnotationConfig', new primitives.orgdiagram.ShapeAnnotationConfig());

	tasks.addDependency('isFamilyChartMode', false);
	tasks.addDependency('showElbowDots', false);
	tasks.addDependency('null', null);
	tasks.addDependency('foreground', 2/*primitives.common.ZOrderType.Foreground*/);
	tasks.addDependency('background', 1/*primitives.common.ZOrderType.Background*/);

	// Options
	tasks.addTask('OptionsTask', ['options'], primitives.orgdiagram.OptionsTask, "#000000"/*primitives.common.Colors.Black*/);

	// Layout
	tasks.addTask('CurrentControlSizeTask', ['layout', 'OptionsTask', 'ItemsSizesOptionTask'], primitives.orgdiagram.CurrentControlSizeTask, "#000000"/*primitives.common.Colors.Black*/);
	tasks.addTask('CurrentScrollPositionTask', ['layout', 'OptionsTask'], primitives.orgdiagram.CurrentScrollPositionTask, "#000000"/*primitives.common.Colors.Black*/);

	tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsContentOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.LabelsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.VisualTreeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.MinimizedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorSelectionPathModeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
	tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

	// Transformations
	tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask'], primitives.orgdiagram.CombinedContextsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], primitives.orgdiagram.OrgTreeTask, "#ff0000"/*primitives.common.Colors.Red*/);

	// Transformations / Templates
	tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.orgdiagram.ReadTemplatesTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ActiveItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.orgdiagram.GroupTitleTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.orgdiagram.CheckBoxTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.ButtonsTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.orgdiagram.AnnotationLabelTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'ActiveItemsTask', 'VisualTreeOptionTask', 'isFamilyChartMode'], primitives.orgdiagram.VisualTreeTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], primitives.orgdiagram.VisualTreeLevelsTask, "#ff0000"/*primitives.common.Colors.Red*/);

	tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Transformations/Selections
	tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.HighlightItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.CursorItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'VisualTreeTask'], primitives.orgdiagram.CursorNeighboursTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('SelectionPathItemsTask', ['VisualTreeTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], primitives.orgdiagram.SelectionPathItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('NormalVisibilityItemsByForegroundShapeAnnotationTask', ['ForegroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundShapeAnnotationTask', ['BackgroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundAnnotationTask', ['BackgroundAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByForegroundHighlightPathAnnotationTask', ['ForegroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask', ['BackgroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByForegroundConnectorAnnotationTask', ['ForegroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('NormalVisibilityItemsByBackgroundConnectorAnnotationTask', ['BackgroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CombinedNormalVisibilityItemsTask', [
		'ItemsSizesOptionTask',
		'CursorItemTask',
		'CursorNeighboursTask',
		'SelectedItemsTask',
		'SelectionPathItemsTask',
		'NormalVisibilityItemsByForegroundShapeAnnotationTask',
		'NormalVisibilityItemsByBackgroundShapeAnnotationTask',
		'NormalVisibilityItemsByBackgroundAnnotationTask',
		'NormalVisibilityItemsByForegroundHighlightPathAnnotationTask',
		'NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask',
		'NormalVisibilityItemsByForegroundConnectorAnnotationTask',
		'NormalVisibilityItemsByBackgroundConnectorAnnotationTask'], primitives.orgdiagram.CombinedNormalVisibilityItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
		'VisualTreeTask', 'VisualTreeLevelsTask',
		'ItemTemplateParamsTask',
		'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.orgdiagram.ItemsPositionsTask, "#ff0000"/*primitives.common.Colors.Red*/);

	tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, "#ff0000"/*primitives.common.Colors.Red*/);
	tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('CenterOnCursorTask', ['layout', 'CurrentControlSizeTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], primitives.orgdiagram.CenterOnCursorTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Managers
	tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], primitives.orgdiagram.PaletteManagerTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	// Apply Layout Changes
	tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'layout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.ApplyLayoutChangesTask, "#008000"/*primitives.common.Colors.Green*/);

	// Renders
	tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
	tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

	tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawCursorTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawHighlightAnnotationTask', ['layout', 'graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
		'ItemsSizesOptionTask',
		'CombinedContextsTask',
		'AlignDiagramTask', 'CenterOnCursorTask',
		'ItemTemplateParamsTask',
		'CursorItemTask', 'SelectedItemsTask',
		'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
	], primitives.orgdiagram.DrawTreeItemsTask, "#008000"/*primitives.common.Colors.Green*/);

	tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'ItemTemplateParamsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawMinimizedItemsTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], primitives.orgdiagram.DrawConnectorsTask, "#008000"/*primitives.common.Colors.Green*/);
	tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawItemLabelsTask, "#008000"/*primitives.common.Colors.Green*/);

	return tasks;
};


/* /algorithms/binarySearch.js*/
/*
	Function: primitives.common.binarySearch
		Search sorted list of elements for nearest item.
	
	Parameters:
		items - Array of elements.
		funcDistance - Call back function used to get ditance for current item. 

	Returns: 
		Nearest item.
*/
primitives.common.binarySearch = function (items, funcDistance, startMinimum, startMaximum) {
	var result = null,
		distance,
		bestDistance,
		minimum = startMinimum || 0,
		maximum = startMaximum || (items.length - 1),
		middle,
		item;

	if (items.length > 0) {
		item = items[minimum];
		result = { index: minimum, item: item };
		distance = funcDistance(item, minimum);
		if (distance > 0) {
			bestDistance = Math.abs(distance);

			item = items[maximum];
			distance = funcDistance(item, maximum);
			if (distance >= 0) {
				result = { index: maximum, item: item };
			} else {
				distance = Math.abs(distance);
				if (bestDistance > distance) {
					bestDistance = distance;
					result = { index: maximum, item: item };
				}
				while (minimum + 1 < maximum) {
					middle = Math.round((minimum + maximum) / 2.0);
					item = items[middle];
					distance = funcDistance(item, middle);
					if (distance === 0) {
						result = { index: middle, item: item };
						break;
					} else {
						if (distance > 0) {
							minimum = middle;
						} else {
							maximum = middle;
						}
						distance = Math.abs(distance);
						if (bestDistance > distance) {
							bestDistance = distance;
							result = { index: middle, item: item };
						}
					}
				}
			}
		}
	}
	return result;
};



/* /algorithms/family.js*/
primitives.common.family = function (source) {
	var _roots = {},     // children hash of orphant parent id
		_rootsCount = {},
		_children = {},  // children hash by node id
		_childrenCount = {},
		_parents = {},   // parents hash by node id
		_parentsCount = {},
		_nodes = {},     // nodes by node id
		BREAK = 1,
		SKIP = 2;
	
	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_roots = primitives.common.cloneObject(source.roots, false);
			_rootsCount = primitives.common.cloneObject(source.rootsCount, true);
			_children = primitives.common.cloneObject(source.children, false);
			_childrenCount = primitives.common.cloneObject(source.childrenCount, true);
			_parents = primitives.common.cloneObject(source.parents, false);
			_parentsCount = primitives.common.cloneObject(source.parentsCount, true);
			_nodes = primitives.common.cloneObject(source.nodes, true);
		}
	}

	function _loop(thisArg, collection, itemid, onItem) {
		var item, items;
		if (onItem != null) {
			items = collection[itemid];
			if (items != null) {
				for (item in items) {
					if (items.hasOwnProperty(item)) {
						if (onItem.call(thisArg, item, items[item])) {
							break;
						}
					}
				}
			}
		}
	}

	function add(parents, nodeid, node) {
		var index, len,
			parentid,
			processed = {};

		if (!parents || parents.length === 0) {
			parents = [null];
		}

		if (_nodes[nodeid] == null && node != null) {
			_nodes[nodeid] = node;
			for (index = 0, len = parents.length; index < len; index += 1) {
				parentid = parents[index];


				if (processed[parentid] == null && parentid != nodeid) {
					processed[parentid] = true;
					if (_nodes[parentid] != null) {
						if (_parents[nodeid] == null) {
							_parents[nodeid] = {};
							_parentsCount[nodeid] = 0;
						}
						if (!_parents[nodeid][parentid]) {
							_parents[nodeid][parentid] = true;
							_parentsCount[nodeid] += 1;
						}

						if (_children[parentid] == null) {
							_children[parentid] = {};
							_childrenCount[parentid] = 0;
						}
						if (!_children[parentid][nodeid]) {
							_children[parentid][nodeid] = true;
							_childrenCount[parentid] += 1;
						}
					} else {
						if (_roots[parentid] == null) {
							_roots[parentid] = {};
							_rootsCount[parentid] = 0;
						}
						if (!_roots[parentid][nodeid]) {
							_roots[parentid][nodeid] = true;
							_rootsCount[parentid] += 1;
						}
					}
				}
			}
			if (_roots[nodeid] != null) {
				_children[nodeid] = _roots[nodeid];
				_childrenCount[nodeid] = _rootsCount[nodeid];
				delete _roots[nodeid];
				delete _rootsCount[nodeid];
				_loop(this, _children, nodeid, function (itemid) {
					if (_parents[itemid] == null) {
						_parents[itemid] = {};
						_parentsCount[itemid] = 0;
					}
					if (!_parents[itemid][nodeid]) {
						_parents[itemid][nodeid] = true;
						_parentsCount[itemid] += 1;
					}
				});
			}
		}
	}

	function node(nodeid) {
		return _nodes[nodeid];
	}

	function adopt(parents, nodeid) {
		var index, len,
			parentid;
		if (_nodes[nodeid] != null) {
			for (index = 0, len = parents.length; index < len; index += 1) {
				parentid = parents[index];

				if (_parents[nodeid] == null) {
					_parents[nodeid] = {};
					_parentsCount[nodeid] = 0;
				}

				if (parentid != nodeid && _nodes[parentid] != null) {
					if (!_parents[nodeid][parentid]) {
						_parents[nodeid][parentid] = true;
						_parentsCount[nodeid] += 1;
					}

					if (_children[parentid] == null) {
						_children[parentid] = {};
						_childrenCount[parentid] = 0;
					}
					if (!_children[parentid][nodeid]) {
						_children[parentid][nodeid] = true;
						_childrenCount[parentid] += 1;
					}
				} else {
					throw "Item cannot be parent of itself and parent should exist in the structure!";
				}
			}
		} else {
			throw "Child should be in hierarchy!";
		}
	}

	function removeNode(nodeid) {
		if (_nodes[nodeid] != null) {
			_loop(this, _children, nodeid, function (itemid) {
				delete _parents[itemid][nodeid];
				_parentsCount[itemid] -= 1;

				if (!_parentsCount[itemid]) {
					delete _parents[itemid];
					delete _parentsCount[itemid];

					if (_roots[null] == null) {
						_roots[null] = {};
						_rootsCount[null] = 0;
					}
					if (!_roots[null][itemid]) {
						_roots[null][itemid] = true;
						_rootsCount[null] += 1;
					}
				}
			});
			_loop(this, _parents, nodeid, function (itemid) {
				delete _children[itemid][nodeid];
				_childrenCount[itemid] -= 1;
				if (!_childrenCount[itemid]) {
					delete _children[itemid];
					delete _childrenCount[itemid];
				}
			});
			if (_roots[null] != null && _roots[null][nodeid] != null) {
				delete _roots[null][nodeid];
				_rootsCount[null] -= 1;

				if (!_rootsCount[null]) {
					delete _roots[null];
					delete _rootsCount[null];
				}
			}
			delete _children[nodeid];
			delete _childrenCount[nodeid];
			delete _parents[nodeid];
			delete _parentsCount[nodeid];
			delete _nodes[nodeid];
		}
	}

	function _removeChildReference(parentid, childid) {
		var result = false;
		if (_children[parentid] != null && _children[parentid][childid] != null) {
			delete _children[parentid][childid];
			_childrenCount[parentid] -= 1;

			delete _parents[childid][parentid];
			_parentsCount[childid] -= 1;

			if (!_childrenCount[parentid]) {
				delete _children[parentid];
				delete _childrenCount[parentid];
			}

			if (!_parents[childid]) {
				delete _parents[childid];
				delete _parentsCount[childid];

				if (_roots[null] == null) {
					_roots[null] = {};
					_rootsCount[null] = 0;
				}
				_roots[null][childid] = true;
				_rootsCount[null] += 1;
			}
			result = true;
		}
		return result;
	}

	function removeRelation(fromid, toid) {
		var result = false;
		if (_nodes[fromid] != null && _nodes[toid] != null) {
			result = _removeChildReference(fromid, toid) || _removeChildReference(toid, fromid);
		}
		return result;
	}

	function hasNodes() {
		return !primitives.common.isEmptyObject(_nodes);
	}

	function loop(thisArg, onItem) {
		var item;
		if (onItem != null) {
			for (item in _nodes) {
				if (_nodes.hasOwnProperty(item)) {
					if (onItem.call(thisArg, item, _nodes[item])) {
						break;
					}
				}
			}
		}
	}

	function _loopItems(thisArg, collection, items, onItem) { // onItem(itemid, item, levelIndex)
		var newItems, itemid,
			processed = {},
			levelIndex = 0,
			hasItems = true;


		while (hasItems) {
			newItems = {};
			hasItems = false;

			for (itemid in items) {
				if (items.hasOwnProperty(itemid)) {
					if (!processed[itemid]) {
						processed[itemid] = true;

						switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
							case 1/*BREAK*/:
								newItems = {};
								hasItems = false;
								break;
							case 2/*SKIP*/:
								break;
							default:
								_loop(this, collection, itemid, function (newItemId) {
									if (!processed[newItemId]) {
										newItems[newItemId] = true;
										hasItems = true;
									}
								}); //ignore jslint
								break;
						}
					}
				}
			}
			items = newItems;
			levelIndex += 1;
		}
	}

	function loopChildren(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
		if (onItem != null) {
			if (nodeid != null && _nodes[nodeid] != null && _children[nodeid] != null) {
				_loopItems(thisArg, _children, _children[nodeid], onItem);
			}
		}
	}

	function loopParents(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
		if (onItem != null) {
			if (nodeid != null && _nodes[nodeid] != null && _parents[nodeid] != null) {
				_loopItems(thisArg, _parents, _parents[nodeid], onItem);
			}
		}
	}

	function _loopTopo(thisArg, backwardCol, backwardCount, forwardCol, forwardCount, onItem) { // onItem(itemid, item, position)
		var index, len, nodeid, references,
			queue, newQueue, position;

		if (onItem != null) {
			/* count parents for every node */
			queue = [];
			references = {};
			for (nodeid in _nodes) {
				if (_nodes.hasOwnProperty(nodeid)) {
					references[nodeid] = (backwardCount[nodeid] || 0);

					if (!references[nodeid]) {
						queue.push(nodeid);
					}
				}
			}

			/* itterate queue and reduce reference counts via children */
			position = 0;
			while (queue.length > 0) {
				newQueue = [];

				for (index = 0, len = queue.length; index < len; index += 1) {
					nodeid = queue[index];

					if (onItem.call(thisArg, nodeid, _nodes[nodeid], position)) {
						newQueue = [];
						break;
					}

					position += 1;

					_loop(this, forwardCol, nodeid, function (itemid) {
						references[itemid] -= 1;
						if (references[itemid] === 0) {
							newQueue.push(itemid);
						}
					}); //ignore jslint
				}
				queue = newQueue;
			}
		}
	}

	function loopTopo(thisArg, onItem) { // onItem(itemid, item, position)
		_loopTopo(thisArg, _parents, _parentsCount, _children, _childrenCount, onItem);
	}

	function loopTopoReversed(thisArg, onItem) { // onItem(itemid, item, position)
		_loopTopo(thisArg, _children, _childrenCount, _parents, _parentsCount, onItem);
	}


	/* argument parentAligned set to true alignes nodes to top otherwise to bottom */
	function loopLevels(thisArg, parentAligned, onItem) { // onItem(itemid, item, levelIndex)
		var topoSorted = [],
			topoSortedPositions = {},
			processed = {},
			margin = [],
			/* result items distribution by levels */
			levels = {}, levelIndex,
			groups = {}, hasGroups, newGroups, groupIndex, group,
			itemsAtLevel, itemid,
			minimumLevel = null,
			loopFunc = parentAligned ? loopTopo : loopTopoReversed,
			index, len,
			mIndex, mLen, mItem, mLevel,
			topoSortedItem,
			bestPosition, bestItem, bestLevel, bestIsParent,
			newMargin, hasNeighbours;

		function Group() {
			this.items = {};
			this.minimumLevel = null;
		}

		Group.prototype.addItemToLevel = function (itemid, level) {
			var items = this.items[level];
			if (!items) {
				items = [itemid];
				this.items[level] = items;
			} else {
				items.push(itemid);
			}
			this.minimumLevel = this.minimumLevel == null ? level : Math.min(this.minimumLevel, level);
		};

		function addItemToLevel(itemid, index, level) {
			var group = groups[index];
			if (!group) {
				group = new Group();
				groups[index] = group;
			}

			group.addItemToLevel(itemid, level);

			minimumLevel = minimumLevel == null ? level : Math.min(minimumLevel, level);

			levels[itemid] = level;
			processed[itemid] = true;
		}


		if (onItem != null) {
			/* sort items topologically */
			loopFunc(this, function (itemid, item, position) {
				topoSorted.push(itemid);
				topoSortedPositions[itemid] = position;
			});

			/* search for the first available non processed item in topological order */
			for (index = 0, len = topoSorted.length; index < len; index += 1) {
				topoSortedItem = topoSorted[index];
				if (processed[topoSortedItem] == null) {
					margin.push(topoSortedItem);

					addItemToLevel(topoSortedItem, index, 0);

					/* use regular graph breadth first search */
					while (margin.length > 0) {
						bestPosition = null;
						bestItem = null;
						bestLevel = null;
						bestIsParent = !parentAligned;
						newMargin = [];
						for (mIndex = 0, mLen = margin.length; mIndex < mLen; mIndex += 1) {
							mItem = margin[mIndex];
							mLevel = levels[mItem];
							hasNeighbours = false;

							if (parentAligned) {
								_loop(this, _parents, mItem, function (parentid) {
									var topoSortedPosition;
									if (!processed[parentid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[parentid];
										if (bestPosition == null || !bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)) {
											bestPosition = topoSortedPosition;
											bestItem = parentid;
											bestLevel = mLevel - 1;
											bestIsParent = true;
										}
									}
								}); //ignore jslint
								_loop(this, _children, mItem, function (childid) {
									var topoSortedPosition;
									if (!processed[childid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[childid];
										if (bestPosition == null || (!bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)))) {
											bestPosition = topoSortedPosition;
											bestItem = childid;
											bestLevel = mLevel + 1;
											bestIsParent = false;
										}
									}
								}); //ignore jslint
							} else {
								_loop(this, _children, mItem, function (childid) {
									var topoSortedPosition;
									if (!processed[childid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[childid];
										if (bestPosition == null || bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)) {
											bestPosition = topoSortedPosition;
											bestItem = childid;
											bestLevel = mLevel + 1;
											bestIsParent = false;
										}
									}
								}); //ignore jslint
								_loop(this, _parents, mItem, function (parentid) {
									var topoSortedPosition;
									if (!processed[parentid]) {
										hasNeighbours = true;
										topoSortedPosition = topoSortedPositions[parentid];
										if (bestPosition == null || (bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)))) {
											bestPosition = topoSortedPosition;
											bestItem = parentid;
											bestLevel = mLevel - 1;
											bestIsParent = true;
										}
									}
								}); //ignore jslint
							}
							if (hasNeighbours) {
								newMargin.push(mItem);
							}
						}
						if (bestItem != null) {
							newMargin.push(bestItem);

							addItemToLevel(bestItem, index, bestLevel);
						}
						margin = newMargin;
					}
				}
			}

			hasGroups = true;
			levelIndex = minimumLevel;
			while (hasGroups) {
				newGroups = {};
				hasGroups = false;
				for (groupIndex in groups) {
					if (groups.hasOwnProperty(groupIndex)) {
						group = groups[groupIndex];
						itemsAtLevel = group.items[(group.minimumLevel - minimumLevel) + levelIndex];
						if (itemsAtLevel != null) {
							newGroups[groupIndex] = group;
							hasGroups = true;

							for (index = 0, len = itemsAtLevel.length; index < len; index += 1) {
								itemid = itemsAtLevel[index];
								if (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex - minimumLevel)) {
									hasGroups = false;
									return true;
								}
							}
						}
					}
				}
				groups = newGroups;
				levelIndex += 1;
			}
		}
	}

	function loopRoots(thisArg, onItem) { // onItem(itemid, item)
		var result = null,
			minimum, counter = 0,
			famMembers = {},
			famCount = {},
			isRoot,
			roots = {},
			processed = {},
			famItemId, member, members, rootid,
			membersRoots, memberRoots, memberRoot,
			index, len;

		loopTopoReversed(this, function (famItemId, famItem, position) {
			/* every node has at least itself in members */
			if (!famMembers.hasOwnProperty(famItemId)) {
				famMembers[famItemId] = {};
				famCount[famItemId] = 0;
			}
			famMembers[famItemId][famItemId] = true;
			famCount[famItemId] += 1;

			isRoot = true;
			loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
				var items, itemid;
				isRoot = false;
				if (!famMembers.hasOwnProperty(parentid)) {
					famMembers[parentid] = {};
					famCount[parentid] = 0;
				}
				/* push famItem members to parent members collection */
				if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
					famMembers[parentid] = famMembers[famItemId];
					famCount[parentid] = famCount[famItemId];
				} else {
					items = famMembers[famItemId];
					for (itemid in items) {
						if (items.hasOwnProperty(itemid)) {
							if (!famMembers[parentid][itemid]) {
								famMembers[parentid][itemid] = true;
								famCount[parentid] += 1;
							}
						}
					}
				}
				return SKIP;
			});
			if (isRoot) {
				roots[famItemId] = true;
				counter += 1;


			}
		});

		/* create collection of roots per member */
		membersRoots = {};
		for (rootid in roots) {
			if (roots.hasOwnProperty(rootid)) {
				members = famMembers[rootid];

				for (member in members) {
					if (members.hasOwnProperty(member)) {

						if (!membersRoots[member]) {
							membersRoots[member] = [];
						}
						membersRoots[member].push(rootid.toString());
					}
				}
			}
		}

		/* loop minimal sub tree roots */
		while (counter > 0) {
			minimum = null;
			for (famItemId in roots) {
				if (roots.hasOwnProperty(famItemId)) {
					if (!minimum || famCount[famItemId] < minimum) {
						minimum = famCount[famItemId];
						result = famItemId;
					}
				}
			}
			if (result != null) {
				if (onItem != null) {
					onItem.call(thisArg, result, _nodes[result]);
				}
				members = famMembers[result];

				for (member in members) {
					if (members.hasOwnProperty(member)) {
						if (!processed[member]) {
							memberRoots = membersRoots[member];
							for (index = 0, len = memberRoots.length; index < len; index += 1) {
								memberRoot = memberRoots[index];
								famCount[memberRoot] -= 1;
							}
							processed[member] = true;
						}
					}
				}

				delete roots[result];
				counter -= 1;
			}
		}
	}

	function findLargestRoot() {
		var result = null,
			maximum,
			famMembers = {},
			famCount = {},
			isRoot;

		maximum = null;

		loopTopoReversed(this, function (famItemId, famItem, position) {
			/* every node has at least itself in members */
			if (!famMembers.hasOwnProperty(famItemId)) {
				famMembers[famItemId] = {};
				famCount[famItemId] = 0;
			}
			famMembers[famItemId][famItemId] = true;
			famCount[famItemId] += 1;

			isRoot = true;
			loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
				var items, itemid;
				isRoot = false;
				if (!famMembers.hasOwnProperty(parentid)) {
					famMembers[parentid] = {};
					famCount[parentid] = 0;
				}
				/* push famItem members to parent members collection */
				if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
					famMembers[parentid] = famMembers[famItemId];
					famCount[parentid] = famCount[famItemId];
				} else {
					items = famMembers[famItemId];
					for (itemid in items) {
						if (items.hasOwnProperty(itemid)) {
							famMembers[parentid][itemid] = true;
							famCount[parentid] += 1;
						}
					}
				}
				return SKIP;
			});
			if (isRoot && (!maximum || famCount[famItemId] > maximum)) {
				maximum = famCount[famItemId];
				result = famItemId;
			}

		});

		return result;
	}

	/* common child should belong only to the given collection of parents, */
	/* if child's parents don't match given parents, it is not considered as common child */
	function hasCommonChild(parents) {
		var result = false,
			parentsHash, childrenHash,
			parentsCount,
			pIndex, pLen,
			parent, child;

		/* convert parents collection to hash, remove duplicates and ignore non-existing items */
		parentsHash = {};
		parentsCount = 0;
		for (pIndex = 0, pLen = parents.length; pIndex < pLen; pIndex += 1) {
			parent = parents[pIndex];
			if (_nodes[parent] != null && !parentsHash[parent]) {
				parentsHash[parent] = true;
				parentsCount += 1;
			}
		}

		/* collect number of parents referencing each child */
		childrenHash = {};
		for (parent in parentsHash) {
			if (parentsHash.hasOwnProperty(parent)) {
				_loop(this, _children, parent, function (child) {
					if (!childrenHash[child]) {
						childrenHash[child] = 1;
					} else {
						childrenHash[child] += 1;
					}
				}); //ignore jslint
			}
		}

		/* find common child having number of references equal to number of existing parents */
		for (child in childrenHash) {
			if (childrenHash.hasOwnProperty(child)) {
				if (_parents[child] != null && (_parentsCount[child] || 0) == childrenHash[child] && childrenHash[child] == parentsCount) {
					result = true;
					break;
				}
			}
		}

		return result;
	}

	function _bundleNodes(fromItem, items, bundleItemId, bundleItem, backwardCol, backwardCount, forwardCol, forwardCount, checkChildren) {
		var isValid = false,
			index, len,
			child;

		if (_nodes[fromItem] != null && forwardCol[fromItem] != null) {
			/* validate target items */
			isValid = true;
			if (checkChildren) {
				/* if we add new bundle all items should present */
				for (index = 0, len = items.length; index < len; index += 1) {
					child = items[index];
					if (_nodes[child] == null || forwardCol[fromItem][child] == null) {
						isValid = false;
					}
				}
			}
			if (isValid) {
				if (bundleItem != null) {
					/* add bundle node */
					_nodes[bundleItemId] = bundleItem;
				}

				if (_nodes[bundleItemId] != null) {
					/* update references */
					if (!backwardCol[bundleItemId]) {
						backwardCol[bundleItemId] = {};
						backwardCount[bundleItemId] = 0;
					}
					if (!forwardCol[bundleItemId]) {
						forwardCol[bundleItemId] = {};
						forwardCount[bundleItemId] = 0;
					}

					if (!backwardCol[bundleItemId][fromItem]) {
						backwardCol[bundleItemId][fromItem] = true;
						backwardCount[bundleItemId] += 1;
					}

					if (!forwardCol[fromItem][bundleItemId]) {
						forwardCol[fromItem][bundleItemId] = true;
						forwardCount[fromItem] += 1;
					}

					for (index = 0, len = items.length; index < len; index += 1) {
						child = items[index];

						if (bundleItemId != child) {
							if (forwardCol[fromItem][child] != null) {
								delete forwardCol[fromItem][child];
								forwardCount[fromItem] -= 1;
							}

							if (backwardCol[child][fromItem] != null) {
								delete backwardCol[child][fromItem];
								backwardCount[child] -= 1;
							}

							if (!backwardCol[child][bundleItemId]) {
								backwardCol[child][bundleItemId] = true;
								backwardCount[child] += 1;
							}

							if (!forwardCol[bundleItemId][child]) {
								forwardCol[bundleItemId][child] = true;
								forwardCount[bundleItemId] += 1;
							}
						}
					}
				}
			}
		}
		return isValid;
	}

	function bundleChildren(parent, children, bundleItemId, bundleItem) {
		return _bundleNodes(parent, children, bundleItemId, bundleItem, _parents, _parentsCount, _children, _childrenCount, true);
	}

	function bundleParents(child, parents, bundleItemId, bundleItem) {
		return _bundleNodes(child, parents, bundleItemId, bundleItem, _children, _childrenCount, _parents, _parentsCount, true);
	}

	function ReferenceItem() {
		this.id = "";
		this.key = "";
		this.children = [];
		this.childrenHash = {};
		this.processed = false;
	}

	function ReferencesEdge(arg0) {
		this.items = [];
		this.weight = 0;
		this.difference = 0;

		if (arguments.length > 0) {
			this.difference = arg0;
		}
	}

	function _getReferencesGraph(currentItems) {
		var result = primitives.common.graph(),
			item, parents,
			index1, index2, len,
			from, to, difference,
			processed = {};

		for (item in currentItems) {
			if (currentItems.hasOwnProperty(item)) {

				_loop(this, _children, item, function (child) {
					if (!processed.hasOwnProperty(child)) {
						processed[child] = true;
						/* create array of parents from hash references */
						parents = [];
						_loop(this, _parents, child, function (parent) {
							parents.push(parent);
						});

						/* create all possible combinations between items */
						for (index1 = 0, len = parents.length; index1 < len - 1; index1 += 1) {
							from = parents[index1];
							if (currentItems.hasOwnProperty(from)) {

								for (index2 = index1 + 1; index2 < len; index2 += 1) {
									to = parents[index2];
									if (currentItems.hasOwnProperty(to)) {
										difference = Math.abs(currentItems[from].children.length - currentItems[to].children.length);

										var edge = result.edge(from, to);
										if (edge == null) {
											edge = new ReferencesEdge(difference);
											result.addEdge(from, to, edge);
										}
										edge.items.push(child);
										edge.weight += 1;
									}
								}
							}
						}
					}
				}); //ignore jslint
			}
		}
		return result;
	}

	function optimizeReferences(onNewBundleItem) {
		var sharedItemsByKey = {},
			sharedItemsById = {},
			currentItems = {},
			nodeid, newReferenceItem,
			nextItems, graph, node,
			maximumTree,
			counter = 0,
			power = 10,
			processed;

		if (onNewBundleItem != null) {
			for (nodeid in _nodes) {
				counter += 1;
				if (_nodes.hasOwnProperty(nodeid)) {
					newReferenceItem = new ReferenceItem();

					_loop(this, _children, nodeid, function (child) {
						newReferenceItem.children.push(child);
						newReferenceItem.childrenHash[child] = true;
					}); //ignore jslint

					newReferenceItem.children.sort();
					newReferenceItem.id = nodeid;
					newReferenceItem.key = newReferenceItem.children.join(",");

					currentItems[newReferenceItem.id] = newReferenceItem;
				}
			}

			power = Math.pow(10, (counter).toString().length);

			while (!primitives.common.isEmptyObject(currentItems)) {
				nextItems = {};
				processed = {};

				graph = _getReferencesGraph(currentItems);

				for (nodeid in currentItems) {
					if (currentItems.hasOwnProperty(nodeid)) {
						node = currentItems[nodeid];

						if (!node.processed) {

							maximumTree = graph.getSpanningTree(nodeid, function (edge) {
								return edge.weight * power + power - edge.difference;
							}); //ignore jslint

							maximumTree.loopLevels(this, function (treeKey, treeKeyNode, levelid) {
								currentItems[treeKey].processed = true;

								maximumTree.loopChildren(this, treeKey, function (child, childNode) {
									var relation = graph.edge(treeKey, child),
										nextBundleItem = null, newItem,
										key, index, len,
										childrenToBind, isSharedItem,
										relationItem;

									currentItems[child].processed = true;

									if (relation.weight > 1) {
										key = relation.items.join(',');

										if (!sharedItemsByKey.hasOwnProperty(key)) {
											newItem = onNewBundleItem();
											_nodes[newItem.id] = newItem; /* add new bundle node to the family */

											nextBundleItem = new ReferenceItem();
											nextBundleItem.id = newItem.id;
											nextBundleItem.key = key;
											for (index = 0, len = relation.items.length; index < len; index += 1) {
												relationItem = relation.items[index];
												nextBundleItem.children.push(relationItem);
												nextBundleItem.childrenHash[relationItem] = true;
												processed[relationItem] = true;
											}
											nextBundleItem.children.sort();

											sharedItemsByKey[nextBundleItem.key] = nextBundleItem;
											sharedItemsById[nextBundleItem.id] = nextBundleItem;
											nextItems[nextBundleItem.id] = nextBundleItem;
											processed[nextBundleItem.id] = nextBundleItem;

											childrenToBind = nextBundleItem.children.slice(0);
											loopChildren(this, treeKeyNode.replacementItem || treeKey, function (childid, child, level) {
												// if child item is bundle and it is not child of new bundle item
												if (!nextBundleItem.childrenHash[childid] && sharedItemsById[childid] != null ) {
													isSharedItem = true;
													// if all children of that child are in the next bundle item we add it to that new bundle item as well
													loopChildren(this, childid, function (childid, child, level) {
														if (!nextBundleItem.childrenHash[childid]) {
															isSharedItem = false;
															return 1/*BREAK*/;
														}
														if (!processed.hasOwnProperty(childid)) {
															return SKIP;
														}
													});
													if (isSharedItem) {
														childrenToBind.push(childid);
													}
												}
												return 2/*SKIP*/;
											});

											_bundleNodes(treeKeyNode.replacementItem || treeKey, childrenToBind, nextBundleItem.id, newItem, _parents, _parentsCount, _children, _childrenCount, false);

											if ((_childrenCount[treeKey] || 0) <= 1 && treeKeyNode.replacementItem == null) {
												treeKeyNode.replacementItem = nextBundleItem.id;
											}
										} else {
											nextBundleItem = sharedItemsByKey[key];
										}

										/* don't add shared item to itself on next items loop*/
										if (nextBundleItem.id != child) {

											childrenToBind = nextBundleItem.children.slice(0);
											loopChildren(this, childNode.replacementItem || child, function (childid, child, level) {
												if (sharedItemsById[childid] != null && !nextBundleItem.childrenHash[childid]) {

													isSharedItem = true;
													loopChildren(this, childid, function (childid, child, level) {
														if (!nextBundleItem.childrenHash[childid]) {
															isSharedItem = false;
															return 1/*BREAK*/;
														}
														if (!processed.hasOwnProperty(childid)) {
															return 2/*SKIP*/;
														}
														return SKIP;
													});
													if (isSharedItem) {
														childrenToBind.push(childid);
													}
												}
												return 2/*SKIP*/;
											});


											_bundleNodes(childNode.replacementItem || child, childrenToBind, nextBundleItem.id, null, _parents, _parentsCount, _children, _childrenCount, false);

											/* if all items bundled then use bundle item for following transformations of references instead of original item if references graph*/
											if ((_childrenCount[child] || 0) <= 1 && childNode.replacementItem == null) {
												childNode.replacementItem = nextBundleItem.id;
											}
										}
									}
								});
							}); //ignore jslint
						}
					}
				}
				currentItems = nextItems;
			}
		}
	}

	function eliminateManyToMany(onNewBundleItem) {
		var parent, bundleNode;

		for (parent in _children) {
			if (_children.hasOwnProperty(parent)) {

				if ((_childrenCount[parent] || 0) > 1) {
					_loop(this, _children, parent, function (child) {
						if ((_parentsCount[child] || 0) > 1) {
							bundleNode = onNewBundleItem();
							bundleChildren(parent, [child], bundleNode.id, bundleNode);
						}
					}); //ignore jslint
				}
			}
		}
	}

	function FamilyEdge(parentid, childid) {
		this.parentid = parentid;
		this.childid = childid;
		this.key = parentid + "," + childid;
	}

	function getPlanarFamily(treeLevels) {
		var result = new primitives.common.family(),
			familyEdgeIndex, familyEdgeLen,
			familyEdgeKey;

		treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
			var sequence = new primitives.common.LinkedHashItems(),
				crossings = {},
				familyEdges = {},
				firstBucket = [];

			treeLevels.loopLevelItems(this, levelIndex, function (parentid, parentItem, position) {
				loopChildren(this, parentid, function (childid, childItem) {
					var childPosition = treeLevels.getItemPosition(childid);
					var familyEdge = new FamilyEdge(parentid, childid);

					familyEdges[familyEdge.key] = familyEdge;

					var crossEdges = [];
					if (sequence.isEmpty()) {
						sequence.add(childPosition, [familyEdge]);
					} else {
						sequence.iterateBack(function (sequenceItem, itemPosition) {
							if (itemPosition < childPosition) {
								// add new sequence after itemPosition and exit
								sequence.insertAfter(itemPosition, childPosition, [familyEdge]);
								return true;
							} else if (itemPosition == childPosition) {
								// add new link to exisitng sequenceItem and exit
								sequenceItem.push(familyEdge);
								return true;
							} else {
								// merge links into output
								for (var crossEdgesIndex = 0, crossEdgesLen = sequenceItem.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
									var crossEdge = sequenceItem[crossEdgesIndex];
									if (crossEdge.parentid != parentid) {
										crossEdges.push(crossEdge);
									}
								}
							}
						});
						if (sequence.startKey() > childPosition) {
							sequence.unshift(childPosition, [familyEdge]);
						}
					}

					crossings[familyEdge.key] = crossEdges;
					for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
						crossings[crossEdges[crossEdgesIndex].key].push(familyEdge);
					}

					return SKIP;
				});

				if(countChildren(parentid) == 1) {
					var childid = firstChild(parentid);
					if (countParents(childid) == 1) {
						var familyEdge = new FamilyEdge(parentid, childid);
						firstBucket.push(familyEdge.key);
					}
				}
			});

			// distribute edges by number of crossings into buckets
			var buckets = [],
				crossEdges;
			for (var familyEdgeKey in crossings) {
				crossEdges = crossings[familyEdgeKey];
				var len = crossEdges.length;
				if (buckets[len] != null) {
					buckets[len].push(familyEdgeKey);
				} else {
					buckets[len] = [familyEdgeKey];
				}
			}

			var processed = {};

			// leave single parent child relations
			buckets.unshift(firstBucket);

			// break relations having 
			for (var bucketIndex = 0, bucketsLen = buckets.length; bucketIndex < bucketsLen; bucketIndex += 1) {
				var bucket = buckets[bucketIndex];
				if (bucket != null) {
					for (familyEdgeIndex = 0, familyEdgeLen = bucket.length; familyEdgeIndex < familyEdgeLen; familyEdgeIndex += 1) {
						familyEdgeKey = bucket[familyEdgeIndex];
						if (!processed.hasOwnProperty(familyEdgeKey)) {
							processed[familyEdgeKey] = true;

							var familyEdge = familyEdges[familyEdgeKey];

							if (result.node(familyEdge.parentid) == null) {
								result.add(null, familyEdge.parentid, {});
							}
							if (result.node(familyEdge.childid) == null) {
								result.add([familyEdge.parentid], familyEdge.childid, {});
							} else {
								result.adopt([familyEdge.parentid], familyEdge.childid);
							}

							crossEdges = crossings[familyEdgeKey];
							for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
								processed[crossEdges[crossEdgesIndex].key] = true;
							}
						}
					}
				}
			}
		});

		return result;
	}

	function Link(from, to, distance) {
		this.from = from;
		this.to = to;
		this.distance = 0;
	}

	function getFamilyWithoutGrandParentsRelations() {
		var result = new primitives.common.family();

		var hash = {};
		var links = [];
		var level = 0;
		for (var from in _parents) {
			if (_parents.hasOwnProperty(from)) {
				_loop(this, _parents, from, function (to) {
					var fromHash = hash[from];
					if(fromHash == null) {
						fromHash = {};
						hash[from] = fromHash;
					}
					if (!fromHash.hasOwnProperty(to)) {
						var link = new Link(from, to, level);
						links.push(link);
						hash[from][to] = link;
					}
				}); //ignore jslint
			}
		}

		while (links.length > 0) {
			var newLinks = [];
			level += 1;
			for (var index = 0, len = links.length; index < len; index += 1) {
				var link = links[index];
				from = link.to;
				if (_parents.hasOwnProperty(from)) {
					_loop(this, _parents, from, function (to) {
						var fromHash = hash[link.from];
						if (fromHash == null) {
							fromHash = {};
							hash[link.from] = fromHash;
						}
						if (fromHash.hasOwnProperty(to)) {
							fromHash[to].distance = level;
						} else {
							var newLink = new Link(from, to, level);
							newLinks.push(newLink);
							fromHash[to] = newLink;
						}
					});
				}
			}
			links = newLinks;
		}

		// return only references to immidiate parents
		loop(this, function(nodeid, node) {
			var parents = [];
			_loop(this, _parents, nodeid, function (to) {
				if (hash[nodeid][to].distance === 0) {
					parents.push(to);
				}
			});
			result.add(parents, nodeid, node);
		});

		return result;
	}
	function countChildren(parent) {
		return _childrenCount[parent] || 0;
	}

	function countParents(child) {
		return _parentsCount[child] || 0;
	}

	function firstChild(parent) {
		var result = null,
			children = _children[parent] || {};
		for (result in children) {
			if (children.hasOwnProperty(result)) {
				return result; //ignore jslint
			}
		}
		return null;
	}

	function firstParent(child) {
		var result = null,
			parents = _parents[child] || {};
		for (result in parents) {
			if (parents.hasOwnProperty(result)) {
				return result; //ignore jslint
			}
		}
		return null;
	}

	function loopNeighbours(thisArg, itemid, onItem) {
		var processed = {};

		if (onItem != null) {
			loopChildren(this, itemid, function (childid, child, childLevel) {
				if (!processed.hasOwnProperty(childid)) {
					processed[childid] = null;

					if (onItem.call(thisArg, childid, child, 1)) {
						processed[childid] = SKIP;

						loopParents(this, childid, function (parentid, parent, parentLevel) {
							if (!processed.hasOwnProperty(parentid)) {
								processed[parentid] = null;

								if (onItem.call(thisArg, parentid, parent, 2)) {
									processed[parentid] = SKIP;
								}
							}
							return processed[parentid];
						});
					}
				}
				return processed[childid];
			});

			loopParents(this, itemid, function (parentid, parent, parentLevel) {
				if (!processed.hasOwnProperty(parentid)) {
					processed[parentid] = null;

					if (onItem.call(thisArg, parentid, parent, 1)) {
						processed[parentid] = SKIP;

						loopChildren(this, parentid, function (childid, child, childLevel) {
							if (!processed.hasOwnProperty(childid)) {
								processed[childid] = true;

								if (onItem.call(thisArg, childid, child, 2)) {
									processed[childid] = SKIP;
								}
							}
							return processed[childid];
						});
					}
				}
				return processed[parentid];
			});
		}
	}

	function getGraph() {
		var result = primitives.common.graph(),
			from, to;

		for (from in _children) {
			if (_children.hasOwnProperty(from)) {
				_loop(this, _children, from, function (to) {
					var edge = result.edge(from, to);
					if (edge == null) {
						edge = new ReferencesEdge({});
						result.addEdge(from, to, edge);
					}
				}); //ignore jslint
			}
		}

		return result;
	}

	function GroupBy(parentid, childid) {
		this.parentid = parentid;
		this.childid = childid;
		this.ids = [];
		this.nodes = [];
	}

	function groupBy(thisArg, size, onGroup) { //function onGroup(parent, child, nodes)
		if (onGroup != null) {
			var groups = {};
			for (var nodeid in _nodes) {
				var parentsCount = _parentsCount[nodeid] || 0;
				var childrenCount = _childrenCount[nodeid] || 0;
				if (parentsCount <= 1 && childrenCount <= 1) {
					var parentid = firstParent(nodeid);
					var childid = firstChild(nodeid);
					var key = parentid + " * " + childid;
					if (!groups.hasOwnProperty(key)) {
						groups[key] = new GroupBy(parentid, childid);
					}
					groups[key].ids.push(nodeid);
					groups[key].nodes.push(_nodes[nodeid]);
				}
			}

			for (key in groups) {
				if (groups.hasOwnProperty(key)) {
					var group = groups[key];
					if (group.ids.length >= size) {
						if (onGroup.call(thisArg, group.parentid, group.childid, group.ids, group.nodes)) {
							break;
						}
					}
				}
			}
		}
	}

	function validate(info) {
		var parent, child;

		function _count(items) {
			var result = 0, key;
			if (items != null) {
				for (key in items) {
					if (items.hasOwnProperty(key)) {
						result += 1;
					}
				}
			}
			return result;
		}

		loop(this, function (nodeId, node) {
			_loop(this, _children, nodeId, function (child) {
				if (!_parents.hasOwnProperty(child) || !_parents[child].hasOwnProperty(nodeId)) {
					if (info != null) {
						info.message = "Child #" + child + " does not reference parent #" + nodeId;
					}
					return false;
				}
			});
			_loop(this, _parents, nodeId, function (parent) {
				if (!_children.hasOwnProperty(parent) || !_children[parent].hasOwnProperty(nodeId)) {
					if (info != null) {
						info.message = "Parent #" + parent + " does not reference child #" + nodeId;
					}
					return false;
				}
			});
		});

		for (parent in _parents) {
			if (_parents.hasOwnProperty(parent)) {
				if ((_parentsCount[parent] || 0) != _count(_parents[parent])) {
					if (info != null) {
						info.message = "Parents count for item #" + parent + " missmatch.";
					}
					return false;
				}
				if (_parents.hasOwnProperty(parent) && !_nodes.hasOwnProperty(parent)) {
					if (info != null) {
						info.message = "Orphant parents for item #" + parent;
					}
					return false;
				}
			}
		}

		for (child in _children) {
			if (_children.hasOwnProperty(child)) {
				if ((_childrenCount[child] || 0) != _count(_children[child])) {
					if (info != null) {
						info.message = "Children count for item " + child + " missmatch.";
					}
					return false;
				}
				if (_children.hasOwnProperty(child) && !_nodes.hasOwnProperty(child)) {
					if (info != null) {
						info.message = "Orphant children of item " + child;
					}
					return false;
				}
			}
		}

		for (child in _roots) {
			if (_roots.hasOwnProperty(child)) {
				if ((_rootsCount[child] || 0) != _count(_roots[child])) {
					if (info != null) {
						info.message = "Root children count for item @" + child + " missmatch.";
					}
					return false;
				}
				_loop(this, _roots, child, function (nodeid) {
					if (!_nodes.hasOwnProperty(nodeid)) {
						if (info != null) {
							info.message = "Child #" + nodeid + "of root #" + child + " does not exists.";
						}
						return false;
					}
				}); //ignore jslint
			}
		}
		
		return true;
	}
	
	function hasLoops() {
		var tempFamily = clone();
		loopTopo(this, function (itemid, item, levelIndex) {
			tempFamily.removeNode(itemid);
		});

		return tempFamily.hasNodes();
	}

	function clone() {
		return primitives.common.family({
			roots: _roots,
			rootsCount: _rootsCount,
			children: _children,
			childrenCount: _childrenCount,
			parents: _parents,
			parentsCount: _parentsCount,
			nodes: _nodes
		});
	}

	/* Private objects */

	return {
		/* family structure modification */
		add: add,
		adopt: adopt,
		bundleChildren: bundleChildren,
		bundleParents: bundleParents,
		optimizeReferences: optimizeReferences,
		eliminateManyToMany: eliminateManyToMany,
		groupBy: groupBy,
		getPlanarFamily: getPlanarFamily,
		getFamilyWithoutGrandParentsRelations: getFamilyWithoutGrandParentsRelations,
		getGraph: getGraph,

		removeNode: removeNode,
		removeRelation: removeRelation,

		/* referencing and looping */
		node: node,
		loop: loop,
		loopLevels: loopLevels,
		loopTopo: loopTopo,
		loopTopoReversed: loopTopoReversed,
		loopChildren: loopChildren,
		loopParents: loopParents,
		findLargestRoot: findLargestRoot,
		loopRoots: loopRoots,
		hasNodes: hasNodes,
		hasCommonChild: hasCommonChild,
		loopNeighbours: loopNeighbours,
		countChildren: countChildren,
		countParents: countParents,
		firstParent: firstParent,
		firstChild: firstChild,

		/* force validation */
		validate: validate,
		hasLoops: hasLoops,
		clone: clone,

		// callback return codes
		BREAK: BREAK, // break loop immidiatly
		SKIP: SKIP // skip loop of current node children 
	};
};


/* /algorithms/FamilyAlignment.js*/
primitives.common.FamilyAlignment = function (thisArg, family, treeLevels, onItemSize) {
	var offsets,
		sizes = {},
		childrenDistances;

	if (onItemSize != null) {
		treeLevels.loopItems(this, function (itemid, item, position, levelIndex, level) {
			sizes[itemid] = onItemSize.call(thisArg, itemid, item);
		});
	}

	childrenDistances = getDistancesBetweenChildren(family, treeLevels);
	offsets = getTreeLevelsOffsets(family, treeLevels, childrenDistances);

	function _getNodeMargins(margins, nodeid) {
		// create margins for node if it does not exists
		var nodeMargins = margins[nodeid];
		if (nodeMargins == null) {
			nodeMargins = new primitives.common.FamilyMargins();
			margins[nodeid] = nodeMargins;
		}
		return nodeMargins;
	}

	function getDistancesBetweenChildren(family, treeLevels) {
		var distances = {};
		var margins = {};
		var levelMargins = null;

		treeLevels.loopLevelsReversed(this, function (levelIndex, level) {
			var newMargins = new primitives.common.FamilyMargins();
			if (levelMargins != null) {
				levelMargins.add(0, Number.MAX_VALUE);
				newMargins.merge(levelMargins, 0);
			}
			levelMargins = newMargins;

			var previousParentMargins = levelMargins;
			treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
				var nodeMargins = _getNodeMargins(margins, nodeid);

				// add node size into its margin
				nodeMargins.add(sizes[nodeid], position);

				switch (family.countParents(nodeid)) {
					case 0:
						if (previousParentMargins != null) {
							distances[nodeid] = previousParentMargins.attach(nodeMargins);
						}
						break;
					case 1:
						family.loopParents(this, nodeid, function (parentid, parent, levelIndex) {
							var parentMargins = _getNodeMargins(margins, parentid);
							distances[nodeid] = parentMargins.merge(nodeMargins);

							previousParentMargins = parentMargins;
							return family.BREAK;
						});
						break;
					default:
						// loop parents and find total size of them
						var totalSize = 0;
						var fromIndex = null;
						var toIndex = null;
						var hash = {};
						family.loopParents(this, nodeid, function (parentid, parent, levelIndex) {
							if (levelIndex > 0) {
								return family.BREAK;
							}
							totalSize += sizes[parentid];

							var position = treeLevels.getItemPosition(parentid);
							fromIndex = fromIndex == null ? position : Math.min(fromIndex, position);
							toIndex = toIndex == null ? position : Math.max(toIndex, position);
							hash[position] = parentid;
						});

						var offset = -totalSize / 2;
						for (var index = fromIndex; index <= toIndex; index += 1) {
							var parentid = hash[index];

							offset += sizes[parentid] / 2.0;

							var parentMargins = _getNodeMargins(margins, parentid);

							parentMargins.attach(nodeMargins, -offset);

							previousParentMargins = parentMargins;

							offset += sizes[parentid] / 2.0;
						}
						break;
				}
			});
		});

		return distances;
	}

	function getTreeLevelsOffsets(family, treeLevels, childrenDistances) {
		var offsets = {};

		var familyUnitsById = primitives.common.getFamilyUnits(family);
		var processedFamilyUnits = {};

		treeLevels.loopLevels(this, function (levelIndex, level) {
			treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
				if (!offsets.hasOwnProperty(nodeid)) {
					var offset = 0;
					if (position === 0) {
						if (childrenDistances[nodeid] != null) {
							offset += childrenDistances[nodeid] + sizes[nodeid] / 2;
						}
					} else {
						var prevNodeId = treeLevels.getItemAtPosition(levelIndex, position - 1);
						offset += offsets[prevNodeId] + sizes[prevNodeId] / 2 + (childrenDistances[nodeid] || 0) + sizes[nodeid] / 2;
					}
					offsets[nodeid] = offset;
				}
				var familyUnits = familyUnitsById[nodeid];
				if (familyUnits != null) {
					for (var index = 0; index < familyUnits.length; index += 1) {
						var familyUnit = familyUnits[index];
						if (!processedFamilyUnits.hasOwnProperty(familyUnit.id)) {
							processedFamilyUnits[familyUnit.id] = true;

							setFamilyOffsets(offsets, nodeid, familyUnit, levelIndex, levelIndex + 1, position, treeLevels, childrenDistances);
						}
					}
				}
			});
		});

		return offsets;
	}

	function setFamilyOffsets(offsets, itemid, familyUnit, fromLevel, toLevel, itemIndex, treeLevels, childrenDistances) {
		var fromIndex = itemIndex;
		var toIndex = itemIndex;

		familyUnit.loopSiblings(this, itemid, function (siblingid) {
			var position = treeLevels.getItemPosition(siblingid);
			fromIndex = Math.min(fromIndex, position);
			toIndex = Math.max(toIndex, position);
		});

		// Place nodes on the left side of start node
		for (var index = itemIndex - 1; index >= fromIndex; index -= 1) {
			var siblingid = treeLevels.getItemAtPosition(fromLevel, index);

			if (!offsets.hasOwnProperty(siblingid)) {
				var nodeid = treeLevels.getItemAtPosition(fromLevel, index + 1);
				offsets[siblingid] = offsets[nodeid] - (sizes[siblingid] / 2 + (childrenDistances[nodeid] || 0) + sizes[nodeid] / 2);
			}
		}
		// Place nodes on the right side of start node
		for (index = itemIndex + 1; index <= toIndex; index += 1) {
			siblingid = treeLevels.getItemAtPosition(fromLevel, index);

			if (!offsets.hasOwnProperty(siblingid)) {
				nodeid = treeLevels.getItemAtPosition(fromLevel, index - 1);
				offsets[siblingid] = offsets[nodeid] + (sizes[nodeid] / 2 + (childrenDistances[siblingid] || 0) + sizes[siblingid] / 2);
			}
		}
		siblingid = treeLevels.getItemAtPosition(fromLevel, fromIndex);
		var siblingsMedian = offsets[siblingid] - sizes[siblingid] / 2;
		siblingid = treeLevels.getItemAtPosition(fromLevel, toIndex);
		siblingsMedian += offsets[siblingid] + sizes[siblingid] / 2;

		siblingsMedian /= 2;

		fromIndex = null;
		toIndex = null;
		familyUnit.loopNonSiblings(this, itemid, function (siblingid) {
			var position = treeLevels.getItemPosition(siblingid);
			fromIndex = fromIndex != null ? Math.min(fromIndex, position) : position;
			toIndex = toIndex != null ? Math.max(toIndex, position) : position;
		});

		var nonSiblingsWidth = 0;
		for (index = fromIndex; index <= toIndex; index += 1) {
			var relatedItemId = treeLevels.getItemAtPosition(toLevel, index);
			nonSiblingsWidth += sizes[relatedItemId];
			if (index > fromIndex) {
				nonSiblingsWidth += (childrenDistances[relatedItemId] || 0);
			}
		}

		var offset = siblingsMedian - nonSiblingsWidth / 2;
		relatedItemId = treeLevels.getItemAtPosition(toLevel, fromIndex);
		if (!offsets.hasOwnProperty(relatedItemId)) {
			offsets[relatedItemId] = offset + sizes[relatedItemId] / 2;
		}
		for (index = fromIndex + 1; index <= toIndex; index += 1) {
			relatedItemId = treeLevels.getItemAtPosition(toLevel, index);
			if (!offsets.hasOwnProperty(relatedItemId)) {
				nodeid = treeLevels.getItemAtPosition(toLevel, index - 1);
				offsets[relatedItemId] = offsets[nodeid] + (sizes[nodeid] / 2 + (childrenDistances[relatedItemId] || 0) + sizes[relatedItemId] / 2);
			}
		}
	}

	function getOffset(nodeid) {
		return offsets[nodeid];
	}

	return {
		getOffset: getOffset
	};
};

/* /algorithms/FamilyMargins.js*/
primitives.common.FamilyMargins = function () {
	this.items = [];

	function Margin(left, right, leftIndex, rightIndex) {
		this.left = left;
		this.right = right;
		this.leftIndex = leftIndex;
		this.rightIndex = rightIndex;
	}

	this.add = function (arg0, arg1, arg2, arg3) {
		switch (arguments.length) {
			case 2:
				this.items.push(new Margin(-arg0 / 2, arg0 / 2, arg1, arg1));
				break;
			case 4:
				this.items.push(new Margin(arg0, arg1, arg2, arg3));
				break;
		}
	};

	this.merge = function (from, interval) {
		var distance = this.getDistanceTo(from);
		var leftOffset = 0;
		var rightOffset = 0;

		var len1 = this.items.length;
		var len2 = from.items.length;
		var min = Math.min(len1, len2);
		var max = Math.max(len1, len2);

		for (var index = 0; index < min; index += 1) {
			var leftMargin = this.items[len1 - 1 - index];
			var rightMargin = from.items[len2 - 1 - index];

			if (index === 0) {
				var width = (leftMargin.right - leftMargin.left + (distance || 0) + (interval || 0) + rightMargin.right - rightMargin.left);
				leftOffset = width / 2 + leftMargin.left;
				rightOffset = width / 2 - rightMargin.right;
			}
			leftMargin.left -= leftOffset;
			leftMargin.right = rightMargin.right + rightOffset;

			leftMargin.rightIndex = rightMargin.rightIndex;

			this.items[max - 1 - index] = leftMargin;
		}
		for (index = min; index < max; index += 1) {
			leftMargin = this.items[len1 - 1 - index];
			rightMargin = from.items[len2 - 1 - index];

			if (leftMargin == null) {
				this.items[max - 1 - index] = new Margin(rightMargin.left + rightOffset, rightMargin.right + rightOffset,
					rightMargin.leftIndex, rightMargin.rightIndex);
			} else {
				leftMargin.left -= leftOffset;
				leftMargin.right -= leftOffset;
			}

		}
		return distance;
	};

	this.attach = function (from, interval) {
		var distance = this.getDistanceTo(from);
		var rightOffset = interval || 0;

		var len1 = this.items.length;
		var len2 = from.items.length;
		var min = Math.min(len1, len2);
		var max = Math.max(len1, len2);

		for (var index = 0; index < min; index += 1) {
			var leftMargin = this.items[len1 - 1 - index];
			var rightMargin = from.items[len2 - 1 - index];

			if (index === 0) {
				rightOffset = (leftMargin.right + (distance || 0) + (interval || 0) - rightMargin.left);
			}
			leftMargin.right = rightMargin.right + rightOffset;

			leftMargin.rightIndex = rightMargin.rightIndex;

			this.items[max - 1 - index] = leftMargin;
		}
		for (index = min; index < max; index += 1) {
			leftMargin = this.items[len1 - 1 - index];
			if (leftMargin == null) {
				rightMargin = from.items[len2 - 1 - index];

				this.items[max - 1 - index] = new Margin(rightMargin.left + rightOffset, rightMargin.right + rightOffset,
					rightMargin.leftIndex, rightMargin.rightIndex);
			}
		}
		return distance;
	};

	this.getDistanceTo = function (to) {
		var distance = null;
		var baseDistance = 0;
		var len1 = this.items.length;
		var len2 = to.items.length;
		var len = Math.min(len1, len2);
		if (len > 0) {
			for (var index = 0; index < len; index += 1) {
				var leftMargins = this.items[len1 - 1 - index];
				var rightMargins = to.items[len2 - 1 - index];


				if (index === 0) {
					baseDistance = leftMargins.right - rightMargins.left;
					distance = baseDistance;
				} else {
					if (leftMargins.rightIndex < rightMargins.leftIndex) {
						distance = Math.max(distance, leftMargins.right - rightMargins.left);
					}
				}
			}
			distance = distance - baseDistance;
		}

		return distance;
	};

	this.loop = function (thisArg, onItem) {
		if (onItem != null) {
			for (var index = 0, len = this.items.length; index < len; index += 1) {
				var margin = this.items[len - 1 - index];
				if (onItem.call(thisArg, index, margin.left, margin.right, margin.leftIndex, margin.rightIndex)) {
					break;
				}
			}
		}
	};

	this.getLeft = function (level) {
		var maximum = this.items.length - 1;
		if (maximum >= level) {
			return this.items[maximum - level].left;
		}
	};
};

/* /algorithms/FibonacciHeap.js*/
primitives.common.FibonacciHeap = function (isMaximum) {
	var root = null,
		count = 0,
		nodes = {};

	function Result(node) {
		this.key = node.key;
		this.priority = node.priority;
		this.item = node.item;
	}

	function Node(key, priority, item) {
		this.key = key;
		this.priority = priority;
		this.item = item;
		this.degree = 0;
		this.marked = false;

		this.parent = null;
		this.child = null;
		this.left = null;
		this.right = null;
	}

	function validate() {
		var totalNodes = 0;
		for (var key in nodes) {
			if (nodes.hasOwnProperty(key)) {
				var node = nodes[key];

				totalNodes += 1;

				if (node.child != null) {
					if (!nodes.hasOwnProperty(node.child)) {
						throw "Child does not exists";
					}
					var ref = nodes[node.child];
					if (ref.parent != node.key) {
						throw "Child references wrong parent";
					}
				}
				if (node.parent != null) {
					if (!nodes.hasOwnProperty(node.parent)) {
						throw "Parent does not exists";
					}

				}
				if (node.left != null) {
					if (!nodes.hasOwnProperty(node.left)) {
						throw "Left does not exists";
					}
					ref = nodes[node.left];
					if (ref.right != node.key) {
						throw "Left references wrong right";
					}
				}

				if (node.right != null) {
					if (!nodes.hasOwnProperty(node.right)) {
						throw "Right does not exists";
					}
					ref = nodes[node.right];
					if (ref.left != node.key) {
						throw "Right references wrong left";
					}
				}
			}
		}
		if (root == null && totalNodes > 0) {
			throw "Orphans";
		}

		if (root != null) {
			if (!nodes.hasOwnProperty(root)) {
				throw "Root node does not exists";
			}

			node = nodes[root];
			if (node.parent != null) {
				throw "Root node has parent reference";
			}

			var children = [root];
			var processed = {};
			var totalChildren = 0;
			while (children.length > 0) {
				var newChildren = [];
				for (var index = 0, len = children.length; index < len; index += 1) {
					var child = nodes[children[index]];
					while (!processed.hasOwnProperty(child.key)) {
						processed[child.key] = true;
						totalChildren += 1;
						if (child.child != null) {
							newChildren.push(child.child);
						}
						child = nodes[child.right];
					}
				}
				children = newChildren;
			}

			if (totalNodes != totalChildren) {
				throw "Tree has loops or orpants";
			}
		}
	}

	function add(key, priority, item) {
		if (nodes.hasOwnProperty(key)) {
			throw "Duplicate keys are not supported!";
		}

		var newNode = new Node(key, priority, item);
		nodes[key] = newNode;

		if (root == null) {
			newNode.left = key;
			newNode.right = key;
			root = key;
		} else {
			var rootNode = nodes[root];
			_insert(rootNode, newNode);
			if (isMaximum ? rootNode.priority < newNode.priority : rootNode.priority > newNode.priority) {
				root = key;
			}
		}
		count += 1;
	}

	function _insert(node, newNode) {
		var rightNode = nodes[node.right];
		newNode.right = node.right;
		newNode.left = node.key;
		node.right = newNode.key;
		rightNode.left = newNode.key;
	}

	function _exclude(node) {
		var prevNode = nodes[node.left],
			nextNode = nodes[node.right];

		prevNode.right = nextNode.key;
		nextNode.left = prevNode.key;
		node.right = node.key;
		node.left = node.key;
	}

	function getPriority(key) {
		var result = null;
		if (nodes.hasOwnProperty(key)) {
			result = nodes[key].priority;
		}
		return result;
	}

	function heapRoot() {
		var result = null;
		if (root != null) {
			result = new Result(nodes[root]);
		}
		return result;
	}

	function extractRoot() {
		var result = heapRoot();
		if (result != null) {
			var rootNode = nodes[root],
				nextNode = nodes[rootNode.right];

			if (rootNode.child != null) {
				var childNode = nodes[rootNode.child],
					childNodeLeft = nodes[childNode.left];

				rootNode.right = childNode.key;
				nextNode.left = childNodeLeft.key;
				childNode.left = rootNode.key;
				childNodeLeft.right = nextNode.key;

				_exclude(rootNode);
				delete nodes[rootNode.key];

				root = null;
				_consolidate(childNode.key);
			} else {
				_exclude(rootNode);
				delete nodes[rootNode.key];

				root = null;
				if (nextNode.key != rootNode.key) {
					_consolidate(nextNode.key);
				}
			}
			count -= 1;
		}
		return result;
	}

	function _consolidate(startKey) {
		var pairs = [], pairedNode,
			processed = {},
			key = startKey;
		while (!processed.hasOwnProperty(key)) {
			var node = nodes[key],
				nextKey = node.right;

			processed[key] = true;
			node.parent = null;

			while ((pairedNode = pairs[node.degree]) != null) {
				if (isMaximum ? node.priority > pairedNode.priority : node.priority < pairedNode.priority) {
					_union(node, pairedNode);
				} else {
					_union(pairedNode, node);
					node = pairedNode;
				}
				pairs[node.degree - 1] = null;
			}
			pairs[node.degree] = node;

			if (root == null || nodes[root] == null || (isMaximum ? nodes[root].priority <= node.priority : nodes[root].priority >= node.priority)) {
				root = node.key;
			}

			key = nextKey;
		}
	}

	function _union(node1, node2) {
		node1.degree += 1;
		_exclude(node2);
		var child = nodes[node1.child];
		if (child != null) {
			_insert(child, node2);
			if (isMaximum ? child.priority < node2.priority : child.priority > node2.priority) {
				node1.child = node2.key;
			}
		} else {
			node1.child = node2.key;
		}
		node2.parent = node1.key;
	}

	function setPriority(key, priority) {
		var node = nodes[key];
		if (isMaximum ? node.priority > priority : node.priority < priority) {
			throw "Priority increase is not supported";
		}
		node.priority = priority;

		if (node.parent != null) {
			var parentNode = nodes[node.parent];
			if (isMaximum ? parentNode.priority < node.priority : parentNode.priority > node.priority) {
				_cut(parentNode, node);
				_cascadeCut(parentNode);
			}
		}
		if (isMaximum ? nodes[root].priority < node.priority : nodes[root].priority > node.priority) {
			root = node.key;
		}
	}

	function _cut(parentNode, node) {
		node.marked = false;
		node.parent = null;
		if (node.right == node.key) {
			parentNode.child = null;
		} else {
			parentNode.child = node.right;
			_exclude(node);
		}
		parentNode.degree -= 1;
		_insert(nodes[root], node);
	}

	function _cascadeCut(node) {
		if (node.parent != null) {
			if (node.marked) {
				var parentNode = nodes[node.parent];
				_cut(parentNode, node);
				_cascadeCut(parentNode);
			} else {
				node.marked = true;
			}
		}
	}

	function deleteKey(key) {
		setPriority(key, isMaximum ? Infinity : -1);
		extractRoot();
	}

	return {
		add: add,
		getPriority: getPriority,
		setPriority: setPriority,
		heapRoot: heapRoot,
		extractRoot: extractRoot,
		deleteKey: deleteKey,
		validate: validate
	};
};



/* /algorithms/getCrossingRectangles.js*/
primitives.common.getCrossingRectangles = function (thisArg, rectangles, onCrossing) { // function onCrossing(rect1, rect2)
	function Action(isStart, index, x, rect) {
		this.isStart = isStart;
		this.index = index;
		this.x = x;
		this.rect = rect;
	}

	function Level() {
		this.count = 0;
		this.rectangles = {};

		this.add = function (index) {
			this.count += 1;
			this.rectangles[index] = true;
		};

		this.remove = function (index) {
			this.count -= 1;
			delete this.rectangles[index];
			return this.count == 0;
		};
	}

	function _findCrossedRectangles(buffer, from, to, rectIndex, rect) {
		buffer.loopForward(this, from, function (value, level) {
			if (value > to) {
				return true;
			}
			for (var index in level.rectangles) {
				if (level.rectangles.hasOwnProperty(index)) {
					var key = rectIndex > index ? rectIndex + "-" + index : index + "-" + rectIndex;
					if (!processed.hasOwnProperty(key)) {
						processed[key] = true;
						onCrossing.call(thisArg, rect, rectangles[index]);
					}
				}
			}
		});
	}

	if (onCrossing != null) {

		// Create action items out of rectangles
		var actions = [];
		for (var index = 0; index < rectangles.length; index += 1) {
			var rect = rectangles[index];

			actions.push(new Action(1, index, rect.x, rect));
			actions.push(new Action(0, index, rect.right(), rect));
		}

		actions.sort(function (a, b) {
			if (a.x == b.x) {
				return b.isStart - a.isStart;
			}
			return a.x - b.x;
		});

		/* find intersections */
		var buffer = primitives.common.SortedList();
		var levels = {};
		var processed = {};

		for (index = 0; index < actions.length; index += 1) {
			var action = actions[index];
			var actionLevels = [action.rect.y, action.rect.bottom()];

			if (action.isStart == 1) {
				// Search for intersections of the left side of the rectangle with existing horizontal segments
				_findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);

				// add rectangle's horizontal segments
				for (var index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
					var value = actionLevels[index2];
					var level = levels[value];
					if (level == null) {
						level = new Level();
						levels[value] = level;

						buffer.add(value, level);
					}
					level.add(action.index);
				}
			} else {
				// remove rectangle's horizontal segments
				for (index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
					value = actionLevels[index2];
					level = levels[value];
					if (level.remove(action.index)) {
						delete levels[value];
						buffer.remove(value);
					}
				}

				// Search for intersections of the right side of rectangle with exisitng horizontal segments
				_findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);
			}
		}
	}
};



/* /algorithms/getFamilyUnits.js*/
primitives.common.getFamilyUnits = function (family) {
	var familyUnits = [],
		familyUnitByParent = {},
		index,
		len;

	function FamilySiblings() {
		this.fromIndex = 0;
		this.toIndex = 0;
		this.items = [];
		this.hash = {};
	}

	function FamilyUnit(id) {
		this.id = id;
		this.parents = new FamilySiblings();
		this.children = new FamilySiblings();

		this.loopSiblings = function (thisArg, itemid, onItem) {
			this._loop(thisArg, this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
		};

		this.loopNonSiblings = function (thisArg, itemid, onItem) {
			this._loop(thisArg, !this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
		};

		this.loop = function (thisArg, onItem) {
			this._loop(thisArg, this.parents.items, onItem);
			this._loop(thisArg, this.children.items, onItem);
		};

		this._loop = function (thisArg, items, onItem) {
			if (onItem != null) {
				for (var index = 0, len = items.length; index < len; index += 1) {
					var sibling = items[index];
					onItem.call(thisArg, sibling);
				}
			}
		};

		this.addParent = function (itemid) {
			this._add(itemid, this.parents);
		};

		this.addChild = function (itemid) {
			this._add(itemid, this.children);
		};

		this._add = function (itemid, siblings) {
			if (!siblings.hash.hasOwnProperty(itemid)) {
				siblings.items.push(itemid);
				siblings.hash[itemid] = true;
			}
		};
	}

	index = 0;
	family.loop(this, function (itemid, item) {
		var childrenCount = family.countChildren(itemid);
		if (childrenCount > 0) {
			if (!familyUnitByParent.hasOwnProperty(itemid)) {
				var familyUnit = new FamilyUnit(index);
				index += 1;
				familyUnit.addParent(itemid);
				family.loopChildren(this, itemid, function (childid, child) {
					familyUnit.addChild(childid);
					if (childrenCount == 1) {
						family.loopParents(this, childid, function (parentid) {
							familyUnit.addParent(parentid);
							familyUnitByParent[parentid] = familyUnit;
							return family.SKIP;
						});
					}
					return family.SKIP;
				});
				familyUnits.push(familyUnit);
				familyUnitByParent[itemid] = familyUnit;
			}
		}
	});

	var familyUnitByItemId = {};
	for (index = 0, len = familyUnits.length; index < len; index += 1) {
		var familyUnit = familyUnits[index];
		familyUnit.loop(this, function (itemid) {
			if (!familyUnitByItemId.hasOwnProperty(itemid)) {
				familyUnitByItemId[itemid] = [familyUnit];
			} else {
				familyUnitByItemId[itemid].push(familyUnit);
			}
		});
	}

	return familyUnitByItemId;
};

/* /algorithms/getLiniarBreaks.js*/
primitives.common.getLiniarBreaks = function (values) {
	var _leftTotal = [],
		_rightTotal = [],
		_len = values.length;

	// Sum up values from left to right
	var total = 0;
	for(var index = 0; index < _len; index += 1) {
		total += values[index];
		_leftTotal[index] = total;
	}

	function getLinearDeviation(leftIndex, rightIndex) {
		var result = 0;

		var avg = (_leftTotal[rightIndex] - _leftTotal[leftIndex] + values[leftIndex]) / (rightIndex - leftIndex + 1);

		var median = primitives.common.binarySearch(values, function (item) {
			return avg - item;
		}, leftIndex, rightIndex);

		if (median.item <= avg) {
			result += (avg * (median.index + 1 - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] + values[leftIndex]));
			result += (_leftTotal[rightIndex] - _leftTotal[median.index] - avg * (rightIndex - median.index));
		} else {
			result += (avg * (median.index - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] - values[median.index] + values[leftIndex]));
			result += (_leftTotal[rightIndex] - _leftTotal[median.index] + values[median.index] - avg * (rightIndex - median.index + 1));
		}

		return result;
	}

	function getScore(leftIndex, rightIndex) {
		var score = 0;

		score += getLinearDeviation(0, leftIndex);
		if (rightIndex > leftIndex + 1) {
			score += getLinearDeviation(leftIndex + 1, rightIndex - 1);
		}
		score += getLinearDeviation(rightIndex, _len - 1);

		return score;
	}

	var leftIndex = 0,
		rightIndex = _len - 1;

	var score = getScore(leftIndex, rightIndex);

	while (leftIndex < rightIndex + 1) {
		var leftScore = getScore(leftIndex + 1, rightIndex);
		var rightScore = getScore(leftIndex, rightIndex - 1);

		if (leftScore < rightScore) {
			if (leftScore >= score) {
				break;
			}
			leftIndex += 1;
			score = leftScore;
		} else {
			if (rightScore >= score) {
				break;
			}
			rightIndex -= 1;
			score = rightScore;
		}
	}

	return [leftIndex, rightIndex - 1, _len - 1];
};



/* /algorithms/getMergedRectangles.js*/
primitives.common.getMergedRectangles = function (thisArg, items, onItem) {
	var index, len,
		index2, len2,
		point;

	items.sort(function (a, b) {
		if (a.x == b.x) {
			return a.y - b.y;
		}
		return a.x - b.x;
	});

	var points = [];
	var pointsHash = {};

	for (index = 0, len = items.length; index < len; index += 1) {
		var item = items[index];
		var xs = [item.x, item.right()];
		for (var k = 0; k < xs.length; k += 1) {
			var x = xs[k];
			point = pointsHash[x];
			if (point == null) {
				point = {
					x: x,
					add: [],
					remove: []
				};
				pointsHash[x] = point;
				points.push(point);
			}
			if (x == item.x) {
				point.add.push(index);
			} else {
				point.remove.push(index);
			}
		}
	}

	points.sort(function (a, b) {
		return a.x - b.x;
	});

	function Range(start, end) {
		this.start = start;
		this.startHead = null;

		this.end = end;
		this.endHead = null;

		this.overlap = function (range) {
			return !(this.end < range.start || this.start > range.end);
		};
	}

	function Stripe(x, ranges) {
		this.x = x;
		this.ranges = ranges;
	}

	var active = {};
	var stripes = [];
	stripes.push(new Stripe(null, []));

	for (index = 0, len = points.length; index < len; index += 1) {
		point = points[index];

		for (index2 = 0, len2 = point.add.length; index2 < len2; index2 += 1) {
			active[point.add[index2]] = true;
		}
		for (index2 = 0, len2 = point.remove.length; index2 < len2; index2 += 1) {
			delete active[point.remove[index2]];
		}

		var activeRects = [];
		for (var key in active) {
			if (active.hasOwnProperty(key)) {
				activeRects.push(items[key]);
			}
		}

		activeRects.sort(function (a, b) {
			return a.y - b.y;
		});

		var ranges = [];

		var start = null;
		var end = null;

		for (index2 = 0, len2 = activeRects.length; index2 < len2; index2 += 1) {
			var activeRect = activeRects[index2];

			if (start == null) {
				start = activeRect.y;
				end = activeRect.bottom();
			} else {
				if (end < activeRect.y) {
					ranges.push(new Range(start, end));
					start = activeRect.y;
					end = activeRect.bottom();
				} else {
					end = Math.max(end, activeRect.bottom());
				}
			}
		}
		if (start != null) {
			ranges.push(new Range(start, end));
		}

		stripes.push(new Stripe(point.x, ranges));
	}

	var lists = [];
	var heads = {};
	var counter = 1;

	function Head(isHead, list) {
		this.isHead = isHead;
		this.list = list;

		if (!heads.hasOwnProperty(list)) {
			heads[list] = [];
		}
		heads[list].push(this);

		this.add = function (segment) {
			if (!segment.from.equalTo(segment.to)) {
				if (this.isHead) {
					lists[this.list].add(counter, segment);
					counter += 1;
				} else {
					lists[this.list].unshift(counter, segment);
					counter += 1;
				}
			}
		};

		this.getTail = function () {
			return new Head(!this.isHead, this.list);
		};

		this.attach = function (head) {
			if (this.list != head.list) {
				lists[this.list].attach(lists[head.list]);

				var refs = heads[head.list];
				delete heads[head.list];
				if (refs != null) {
					for (var index = 0, len = refs.length; index < len; index += 1) {
						var ref = refs[index];
						if (ref != head) {
							ref.list = this.list;
							heads[this.list].push(ref);
						}
					}
				}
			}
		};
	}

	function createHead(isHead) {
		lists.push(new primitives.common.LinkedHashItems());
		return new Head(isHead, lists.length - 1);
	}

	for (index = 1, len = stripes.length; index < len; index += 1) {
		var prev = stripes[index - 1];
		var curr = stripes[index];

		var pi = 0, ci = 0;
		while (pi < prev.ranges.length || ci < curr.ranges.length) {
			var pr = pi < prev.ranges.length ? prev.ranges[pi] : null;
			var cr = ci < curr.ranges.length ? curr.ranges[ci] : null;

			if (cr == null) {
				// close pr
				points = [
					new primitives.common.Point(prev.x, pr.end),
					new primitives.common.Point(curr.x, pr.end),
					new primitives.common.Point(curr.x, pr.start),
					new primitives.common.Point(prev.x, pr.start)
				];
				for (var pindex = 1; pindex < points.length; pindex += 1) {
					pr.endHead.add(new primitives.common.Vector(points[pindex - 1], points[pindex]));
				}
				pr.endHead.attach(pr.startHead);
				pi += 1;
				continue;
			}

			if (pr == null) {
				// open cr
				cr.endHead = createHead(true);
				cr.endHead.add(new primitives.common.Vector(new primitives.common.Point(curr.x, cr.start), new primitives.common.Point(curr.x, cr.end)));
				cr.startHead = cr.endHead.getTail();
				ci += 1;
				continue;
			}

			if (!cr.overlap(pr)) {
				if (pr.start < cr.start) {
					// close pr
					points = [
						new primitives.common.Point(prev.x, pr.end),
						new primitives.common.Point(curr.x, pr.end),
						new primitives.common.Point(curr.x, pr.start),
						new primitives.common.Point(prev.x, pr.start)
					];
					for (pindex = 1; pindex < points.length; pindex += 1) {
						pr.endHead.add(new primitives.common.Vector(points[pindex - 1], points[pindex]));
					}
					pr.endHead.attach(pr.startHead);
					pi += 1;
					continue;
				} else {
					// open cr
					cr.endHead = createHead(true);
					cr.endHead.add(new primitives.common.Vector(new primitives.common.Point(curr.x, cr.start), new primitives.common.Point(curr.x, cr.end)));
					cr.startHead = cr.endHead.getTail();
					ci += 1;
					continue;
				}
			} else {
				// ovelaps
				// extend pr.start to cr.start
				points = [
					new primitives.common.Point(prev.x, pr.start),
					new primitives.common.Point(curr.x, pr.start),
					new primitives.common.Point(curr.x, cr.start)
				];
				for (pindex = 1; pindex < points.length; pindex += 1) {
					pr.startHead.add(new primitives.common.Vector(points[pindex], points[pindex - 1]));
				}
				cr.startHead = pr.startHead;

				var loop = true;
				while (loop) {
					loop = false;

					if (pr.end > cr.end) {
						var nextcr = (ci + 1) < curr.ranges.length ? curr.ranges[ci + 1] : null;
						if (nextcr != null && nextcr.overlap(pr)) {
							// open loop cr.end to nextcr.start
							var p1 = new primitives.common.Point(curr.x, nextcr.start);
							var p2 = new primitives.common.Point(curr.x, cr.end);
							cr.endHead = createHead(true);
							cr.endHead.add(new primitives.common.Vector(p1, p2));
							nextcr.startHead = cr.endHead.getTail();

							ci += 1;
							cr = nextcr;
							loop = true;
						}
					} else {
						var nextpr = (pi + 1) < prev.ranges.length ? prev.ranges[pi + 1] : null;
						if (nextpr != null && nextpr.overlap(cr)) {
							// close loop pr.end to nextpr.start
							points = [
								new primitives.common.Point(prev.x, pr.end),
								new primitives.common.Point(curr.x, pr.end),
								new primitives.common.Point(curr.x, nextpr.start),
								new primitives.common.Point(prev.x, nextpr.start)
							];
							for (pindex = 1; pindex < points.length; pindex += 1) {
								pr.endHead.add(new primitives.common.Vector(points[pindex - 1], points[pindex]));
							}
							pr.endHead.attach(nextpr.startHead);
							pi += 1;
							pr = nextpr;
							loop = true;
						}
					}
				}
				// extend pr.end to cr.end
				points = [
					new primitives.common.Point(prev.x, pr.end),
					new primitives.common.Point(curr.x, pr.end),
					new primitives.common.Point(curr.x, cr.end)
				];
				for (pindex = 1; pindex < points.length; pindex += 1) {
					pr.endHead.add(new primitives.common.Vector(points[pindex - 1], points[pindex]));
				}
				cr.endHead = pr.endHead;
				pi += 1;
				ci += 1;
			}
		}
	}
	if (onItem != null) {
		for (index = 0; index < lists.length; index += 1) {
			if (heads.hasOwnProperty(index)) {
				var list = lists[index];
				points = [];
				list.iterate(function (segment, key) {
					if (points.length == 0) {
						points.push(segment.from);
						points.push(segment.to);
					} else {
						points.push(segment.to);
					}
				});
				onItem.call(thisArg, points);
			}
		}
	}
};


/* /algorithms/getMinimumCrossingRows.js*/
primitives.common.getMinimumCrossingRows = function (thisArg, rectangles, onItem) { // function onItem(row)
	var from = null;
	var to = null;
	if (onItem != null) {
		rectangles.sort(function (a, b) {
			return a.y - b.y;
		});

		for (var index = 0; index < rectangles.length; index += 1) {
			var rect = rectangles[index];
			var bottom = rect.bottom();
			if (from === null) {
				from = rect.y;
				to = bottom;
			} else {
				if (rect.y >= to) {
					onItem.call(this.Arg, from);
					from = rect.y;
					to = bottom;
				} else {
					if (rect.y > from) {
						from = rect.y;
					}

					if (bottom < to) {
						to = bottom;
					}
				}
			}
		}
		if (from !== null) {
			onItem.call(this.Arg, from);
		}
	}
};



/* /algorithms/graph.js*/
primitives.common.graph = function () {
	var _edges = {},
		MAXIMUMTOTALWEIGHT = 1,
		MINIMUMWEIGHT = 2;

	function addEdge(from, to, edge) {
		if ((_edges[from] == null || _edges[from][to] == null)  && edge != null) {

			if(_edges[from] == null) {
				_edges[from] = {};
			}
			_edges[from][to] = edge;

			if (_edges[to] == null) {
				_edges[to] = {};
			}
			_edges[to][from] = edge;
		}
	}

	function edge(from, to) {
		var result = null;
		if (_edges[from] != null && _edges[from][to]) {
			result = _edges[from][to];
		}
		return result;
	}

	function hasNode(from) {
		return _edges.hasOwnProperty(from);
	}

	function loopNodeEdges(thisArg, itemid, onEdge) { // onEdge = function(to, edge) {}
		var neighbours, neighbourKey;
		if (onEdge != null) {
			neighbours = _edges[itemid];
			if (neighbours != null) {
				for (neighbourKey in neighbours) {
					if (neighbours.hasOwnProperty(neighbourKey)) {
						onEdge.call(thisArg, neighbourKey, neighbours[neighbourKey]);
					}
				}
			}
		}
	}

	function loopNodes(thisArg, startNode, onItem) { // onItem = function(itemid) {}
		var processed = {};
		if (startNode == null) {
			for (startNode in _edges) {
				if (_edges.hasOwnProperty(startNode)) {
					if (!processed.hasOwnProperty[startNode]) {
						_loopNodes(this, startNode, processed, onItem);
					}
				}
			}
		} else {
			_loopNodes(this, startNode, processed, onItem);
		}
	}

	function _loopNodes(thisArg, startNode, processed, onItem) { // onItem = function(itemid) {}
		/* Graph */
		var margin = [],
			marginKey,
			newMargin,
			index, len,
			neighbours, neighbourKey;

		margin.push(startNode);
		processed[startNode] = true;
		if (onItem != null) {
			while (margin.length > 0) {
				newMargin = [];

				/* itterate neighbours of every node on margin */
				for (index = 0, len = margin.length; index < len; index += 1) {
					marginKey = margin[index];

					onItem.call(thisArg, marginKey);

					neighbours = _edges[marginKey];
					for (neighbourKey in neighbours) {
						if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
							processed[neighbourKey] = true;
							newMargin.push(neighbourKey);
						}
					}
				}
				margin = newMargin;
			}
		}
	}

	/*
		Function: primitives.common.graph.getSpanningTree
			Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is nessasary.
	
		Parameters:
		startNode - The node to start searching for maximum spanning tree. Graph is not nessasary connected
		getWeightFunc - Call back function to get weight of edge. function(edge)

		Returns: 
			primitives.common.tree structure
	*/
	function getSpanningTree(startNode, getWeightFunc) {
		var result = primitives.common.tree(),
			margin = primitives.common.FibonacciHeap(true),
			marginNode,
			parents = {}, /* if parent for item is set then it was laready visited */
			neighbours, neighbourKey, neighbourWeight, currentWeight;

		/* add start node to margin */
		margin.add(startNode, 0, null /*parent of root node is null*/);
		parents[startNode] = null;

		/* search graph */
		while ((marginNode = margin.extractRoot()) != null) {

			/* itterate neighbours of every node on margin */
			neighbours = _edges[marginNode.key];

			for (neighbourKey in neighbours) {
				if (neighbours.hasOwnProperty(neighbourKey) && !result.node(neighbourKey)) {
					neighbourWeight = getWeightFunc != null ? getWeightFunc(neighbours[neighbourKey]) : neighbours[neighbourKey];

					currentWeight = margin.getPriority(neighbourKey);
					if (currentWeight == null) {
						margin.add(neighbourKey, neighbourWeight, null);
						parents[neighbourKey] = marginNode.key.toString();
					} else {
						if (currentWeight <= neighbourWeight) {
							/* improve node distance */
							margin.setPriority(neighbourKey, neighbourWeight);
							parents[neighbourKey] = marginNode.key.toString();
						}
					}
				}
			}

			/* add next margin item to resul tree */
			result.add(parents[marginNode.key], marginNode.key.toString(), {});
		}

		return result;
	}

	function _findStartNode(thisArg, onEdgeWeight) {
		var result = null,
			fromItem, toItems, toItem,
			weight = 0,
			maxWeight = null;
		
		for (fromItem in _edges) {
			if (_edges.hasOwnProperty(fromItem)) {
				toItems = _edges[fromItem];

				weight = 0;
				for (toItem in toItems) {
					if (toItems.hasOwnProperty(toItem)) {
						weight += onEdgeWeight.call(thisArg, toItems[toItem], fromItem, toItem);
					}
				}
				if (weight > maxWeight || maxWeight == null) {
					result = fromItem;
					maxWeight = weight;
				}
			}
		}
		return result;
	}

	/*
		Function: primitives.common.graph.getTotalWeightGrowthSequence
			Get graph growth sequence. The sequence of graph traversing order.
	
		Parameters:
			thisArg - call back functions context
			onEdgeWeight - Call back function to weight edge of graph. function(edge)
			onItem - Call back function on next item found
	*/
	function getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem) {
		var startNode = _findStartNode(thisArg, onEdgeWeight);

		_getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MAXIMUMTOTALWEIGHT);
	}

	/*
	Function: primitives.common.graph.getMinimumWeightGrowthSequence
		Get graph growth sequence. The sequence of graph traversing order.

	Parameters:
		thisArg - call back functions context
		startNode - The node to start searching for grows sequence.
		onEdgeWeight - Call back function to weight edge of graph. function(edge)
		onItem - Call back function on next item found
	*/
	function getMinimumWeightGrowthSequence(thisArg, startNode, onEdgeWeight, onItem) {
		_getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MINIMUMWEIGHT);
	}

	function _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, growsMode) {
		var margin = {}, marginKey,
			itemsToRemove = [], /* if margin item has no neighbours to expand we remove it from margin*/
			hasNeighbours,
			processed = {}, /* if item is set then it was already visited */
			marginLength = 0, /* curent margin length */
			nextMarginKey,
			nextMarginWeight,
			bestWeight,
			neighbours, neighbourKey, neighbourWeight,
			index, len;

		if (onEdgeWeight != null && onItem != null) {
			if (startNode == null) {
				startNode = _findStartNode(thisArg, onEdgeWeight);
			}

			if (startNode != null) {

				onItem.call(thisArg, startNode);

				/* add start node to margin */
				margin[startNode] = true;
				marginLength += 1;

				/* add startNode to result tree */
				processed[startNode] = null;

				/* search graph */
				while (marginLength > 0) {
					itemsToRemove = [];
					nextMarginKey = null;
					nextMarginWeight = null;
					bestWeight = {};
					/* itterate neighbours of every node on margin */
					for (marginKey in margin) {
						if (margin.hasOwnProperty(marginKey)) {
							neighbours = _edges[marginKey];
							hasNeighbours = false;

							for (neighbourKey in neighbours) {
								if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
									neighbourWeight = onEdgeWeight.call(thisArg, neighbours[neighbourKey], marginKey, neighbourKey);
									hasNeighbours = true;

									switch (growsMode) {
										case MAXIMUMTOTALWEIGHT:
											if (bestWeight[neighbourKey] == null) {
												bestWeight[neighbourKey] = 0;
											}
											bestWeight[neighbourKey] += neighbourWeight;

											if (!nextMarginWeight || bestWeight[neighbourKey] > nextMarginWeight) {
												nextMarginKey = neighbourKey;
												nextMarginWeight = bestWeight[neighbourKey];
											}
											break;
										case MINIMUMWEIGHT:
											if (bestWeight[neighbourKey] == null) {
												bestWeight[neighbourKey] = neighbourWeight;
											} else {
												bestWeight[neighbourKey] = Math.min(bestWeight[neighbourKey], neighbourWeight);
											}

											if (!nextMarginWeight || bestWeight[neighbourKey] < nextMarginWeight) {
												nextMarginKey = neighbourKey;
												nextMarginWeight = bestWeight[neighbourKey];
											}
											break;
									}
								}
							}

							if (!hasNeighbours) {
								itemsToRemove.push(marginKey);
							}
						}
					}

					if (nextMarginKey == null) {
						/* no items to expand to exit*/
						break;
					} else {
						margin[nextMarginKey] = true;
						marginLength += 1;
						processed[nextMarginKey] = true;

						/* add next margin item to result sequence */
						onItem.call(thisArg, nextMarginKey);
					}

					for (index = 0, len = itemsToRemove.length; index < len; index += 1) {
						/* delete visited node from margin */
						delete margin[itemsToRemove[index]];
						marginLength -= 1;
					}
				}
			}
		}
	}

	/*
		Function: primitives.common.graph.getShortestPath
		Get shortest path between two nodes in graph. Start and end nodes supposed to have connection path. All connections have the same weight.
	
		Parameters:
		startNode - The node to start.
		endNode - The end node.
		getWeightFunc - Call back function to weight edge of graph. function(edge, fromItem, toItem)
	
		Returns: 
			Array containing nodes names of connection path.
	*/
	function getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound) { // getWeightFunc = function(edge, fromItem, toItem), onPathFound = function(path, to)
		var margin = primitives.common.FibonacciHeap(false),
			distance = {},
			breadcramps = {},
			bestNodeOnMargin,
			key,
			children,
			newDistance,
			path,
			currentNode,
			endNodesHash = {},
			index, len, 
			endsCount = 0, endsFound = 0;

		/* create hash table of end nodes to find */
		for (index = 0, len = endNodes.length; index < len; index += 1) {
			key = endNodes[index];

			if (!endNodesHash.hasOwnProperty(key)) {
				endsCount += 1;
				endNodesHash[key] = true;
			}
		}

		/* add start node to margin */
		margin.add(startNode, 0, null);
		breadcramps[startNode] = null;

		/* search graph */
		while ((bestNodeOnMargin = margin.extractRoot()) != null) {
			/* itterate neighbours of selected node on margin */
			children = _edges[bestNodeOnMargin.key];
			for (key in children) {
				if (children.hasOwnProperty(key)) {
					newDistance = bestNodeOnMargin.priority + (getWeightFunc != null ? getWeightFunc.call(thisArg, children[key], bestNodeOnMargin, key) : 1);
					distance = margin.getPriority(key);
					if (distance != null) {
						if (distance > newDistance) {
							margin.setPriority(key, newDistance);
							breadcramps[key] = bestNodeOnMargin.key;
						}
					} else {
						if (!breadcramps.hasOwnProperty(key)) {
							margin.add(key, newDistance, null);
							breadcramps[key] = bestNodeOnMargin.key;
						}
					}
				}
			}

			if (endNodesHash.hasOwnProperty(bestNodeOnMargin.key)) {
				/* trace path */
				path = [];
				currentNode = bestNodeOnMargin.key;
				while (currentNode != null) {
					path.push(currentNode);
					currentNode = breadcramps[currentNode];
				}
				onPathFound.call(thisArg, path, bestNodeOnMargin.key);

				endsFound += 1;
				if (endsFound >= endsCount) {
					break;
				}
			}
		}
	}

	return {
		addEdge: addEdge,
		edge: edge,
		hasNode: hasNode,
		loopNodes: loopNodes,
		loopNodeEdges: loopNodeEdges,
		getSpanningTree: getSpanningTree,
		getTotalWeightGrowthSequence: getTotalWeightGrowthSequence,
		getMinimumWeightGrowthSequence: getMinimumWeightGrowthSequence,
		getShortestPath: getShortestPath
	};
};

/* /algorithms/LCA.js*/
primitives.common.LCA = function (tree) {
	var _eulerSequence = [];
	var _levels = [];
	var _fai = {};
	var _rmq;
	

	preprocess();

	function preprocess() {
		var counter = 0;
		tree.loopEulerWalk(this, function (nodeid, node, level) {
			_eulerSequence.push(nodeid);
			_levels.push(level);

			if (!_fai.hasOwnProperty(nodeid)) {
				_fai[nodeid] = counter;
			}
			counter += 1;
		});
		_rmq = primitives.common.RMQ(_levels);
	}

	function getLowestCommonAncestor(from, to) {
		var fromIndex = _fai[from],
			toIndex = _fai[to],
			index;

		if (fromIndex < toIndex) {
			index = _rmq.getRangeMinimumIndex(fromIndex, toIndex);
		} else {
			index = _rmq.getRangeMinimumIndex(toIndex, fromIndex);
		}

		return _eulerSequence[index];
	}

	return {
		getLowestCommonAncestor: getLowestCommonAncestor
	};
};

/* /algorithms/LinkedHashItems.js*/
primitives.common.LinkedHashItems = function () {
	var segmentsHash = {},
	nextKeys = {},
	prevKeys = {},
	startSegmentKey = null,
	endSegmentKey = null;

	function add(key, item) {
		if (segmentsHash.hasOwnProperty(key)) {
			throw "Duplicate segments are not supported!";
		}
		segmentsHash[key] = item;
		nextKeys[key] = null;
		if (endSegmentKey == null) {
			startSegmentKey = key;
			prevKeys[key] = null;
		} else {
			nextKeys[endSegmentKey] = key;
			prevKeys[key] = endSegmentKey;
		}
		endSegmentKey = key;
	}

	function isEmpty() {
		return startSegmentKey == null;
	}

	function item(key) {
		return segmentsHash[key];
	}

	function nextKey(key) {
		return nextKeys[key];
	}

	function prevKey(key) {
		return prevKeys[key];
	}

	function  startKey() {
		return startSegmentKey;
	}

	function endKey() {
		return endSegmentKey;
	}

	function unshift(key, item) {
		if (segmentsHash.hasOwnProperty(key)) {
			throw "Duplicate segments are not supported!";
		}
		segmentsHash[key] = item;
		prevKeys[key] = null;
		if (startSegmentKey == null) {
			endSegmentKey = key;
			nextKeys[key] = null;
		} else {
			prevKeys[startSegmentKey] = key;
			nextKeys[key] = startSegmentKey;
		}
		startSegmentKey = key;
	}

	function insertAfter(afterKey, key, item) {
		if (segmentsHash.hasOwnProperty(key)) {
			throw "Duplicate segments are not supported!";
		}

		if (afterKey == null) {
			unshift(key, item);
		} else {
			var nextKey = nextKeys[afterKey];
			if (nextKey == null) {
				add(key, item);
			} else {
				segmentsHash[key] = item;
				nextKeys[afterKey] = key;
				nextKeys[key] = nextKey;
				prevKeys[nextKey] = key;
				prevKeys[key] = afterKey;
			}
		}
	}

	function remove(key) {
		var prevKey = prevKeys[key],
			nextKey = nextKeys[key];

		if (prevKey != null) {
			nextKeys[prevKey] = nextKey;
		} else {
			startSegmentKey = nextKey;
		}

		if (nextKey != null) {
			prevKeys[nextKey] = prevKey;
		} else {
			endSegmentKey = prevKey;
		}

		delete segmentsHash[key];
		delete nextKeys[key];
		delete prevKeys[key];
	}

	function empty() {
		segmentsHash = {};
		nextKeys = {};
		prevKeys = {};
		startSegmentKey = null;
		endSegmentKey = null;
	}

	function _iterate(forward, onItem, startKey, endKey) {
		var key = startKey,
			segment;

		if (key == null) {
			key = forward ? startSegmentKey : endSegmentKey;
		}

		if (onItem != null) {
			while (key != null) {
				segment = segmentsHash[key];
				if (segment != null) {
					if (onItem(segment, key)) {
						return;
					}
				}

				if (key == endKey) {
					key = null;
				} else {
					key = forward ? nextKeys[key] : prevKeys[key];
				}
			}
		}
	}

	function attach(list) {
		list.iterate(function (segment, key) {
			add(key, segment);
		});
	}

	function iterate(onItem, startKey, endKey) {
		_iterate(true, onItem, startKey, endKey);
	}

	function iterateBack(onItem, startKey, endKey) {
		_iterate(false, onItem, startKey, endKey);
	}

	function validate(info) {
		var key, prevKey, nextKey;
		for (key in segmentsHash) {
			if (segmentsHash.hasOwnProperty(key)) {
				if (!nextKeys.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
					if (info != null) {
						info.message = "Orphant key found!";
					}
					return false;
				}
			}
		}
		if (!segmentsHash.hasOwnProperty(startSegmentKey) || !segmentsHash.hasOwnProperty(endSegmentKey)) {
			if (info != null) {
				info.message = "Start or end values are missing!";
			}
			return false;
		}
		for (key in nextKeys) {
			if (nextKeys.hasOwnProperty(key)) {
				if (!segmentsHash.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
					if (info != null) {
						info.message = "Orphant key found!";
					}
					return false;
				}
				nextKey = nextKeys[key];
				if (nextKey && !nextKeys.hasOwnProperty(nextKey)) {
					if (info != null) {
						info.message = "Next key not found!";
					}
					return false;
				}
			}
		}
		for (key in prevKeys) {
			if (prevKeys.hasOwnProperty(key)) {
				if (!segmentsHash.hasOwnProperty(key) || !nextKeys.hasOwnProperty(key)) {
					if (info != null) {
						info.message = "Orphant key found!";
					}
					return false;
				}
				prevKey = prevKeys[key];
				if (prevKey && !prevKeys.hasOwnProperty(prevKey)) {
					if (info != null) {
						info.message = "Prev key not found!";
					}
					return false;
				}
			}
		}
		return true;
	}

	function toArray() {
		var result = [];

		iterate(function (item) {
			result.push(item);
		});

		return result;
	}

	return {
		add: add,
		item: item,
		nextKey: nextKey,
		prevKey: prevKey,
		startKey: startKey,
		endKey: endKey,
		unshift:unshift,
		insertAfter:insertAfter,
		remove: remove,
		isEmpty: isEmpty,
		attach: attach,

		iterate: iterate,
		iterateBack: iterateBack,
		empty: empty,
		toArray: toArray,
		validate: validate
	};
};



/* /algorithms/mergeSort.js*/
/*
	Function: primitives.common.mergeSort
		Merges array of sorted arrays into one using call back function for comparison.
	
	Parameters:
		arrays - Array of sorted arrays of objects.
		getItemWeight - Call back function used to get items weight. 
		ignoreDuplicates - return distinct items only.

	Returns: 
		Array of merged sorted items. 
*/
primitives.common.mergeSort = function (arrays, getItemWeight, ignoreDuplicates) {
	var result = null,
		firstArray, secondArray, mergedArray, arrayIndex,
		firstIndex, secondIndex, firstLen, secondLen, firstItem, secondItem,
		firstItemWeight, secondItemWeight,
		currentValue;

	switch (arrays.length) {
		case 0:
			result = [];
			break;
		default:
			firstArray = [];
			for (arrayIndex = 0; arrayIndex < arrays.length; arrayIndex += 1) {
				secondArray = arrays[arrayIndex];
				mergedArray = [];

				firstLen = firstArray.length;
				secondLen = secondArray.length;

				firstIndex = 0;
				secondIndex = 0;

				firstItem = null;
				firstItemWeight = null;
				secondItem = null;
				secondItemWeight = null;

				if (firstLen > 0) {
					firstItem = firstArray[firstIndex];
					firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
				}

				if (secondLen > 0) {
					secondItem = secondArray[secondIndex];
					secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
				}
				currentValue = null;
				while (firstIndex < firstLen || secondIndex < secondLen) {

					if (firstIndex >= firstLen) {
						if (!ignoreDuplicates || currentValue != secondItem) {
							mergedArray.push(secondItem);
							currentValue = secondItem;
						}
						secondIndex += 1;

						
						if (secondIndex < secondLen) {
							secondItem = secondArray[secondIndex];
							secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
						}
					} else {
						if (secondIndex >= secondLen) {
							if (!ignoreDuplicates || currentValue != firstItem) {
								mergedArray.push(firstItem);
								currentValue = firstItem;
							}
							firstIndex += 1;

							
							if (firstIndex < firstLen) {
								firstItem = firstArray[firstIndex];
								firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
							}
						} else {
							if (firstItemWeight < secondItemWeight) {
								if (!ignoreDuplicates || currentValue != firstItem) {
									mergedArray.push(firstItem);
									currentValue = firstItem;
								}
								firstIndex += 1;

								if (firstIndex < firstLen) {
									firstItem = firstArray[firstIndex];
									firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
								}
							} else {
								if (!ignoreDuplicates || currentValue != secondItem) {
									mergedArray.push(secondItem);
									currentValue = secondItem;
								}
								secondIndex += 1;
								
								if (secondIndex < secondLen) {
									secondItem = secondArray[secondIndex];
									secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
								}
							}
						}
					}
				}
				firstArray = mergedArray;
			}
			result = firstArray;
			break;
	}
	return result;
};


/* /algorithms/pile.js*/
/*
	Class: primitives.common.pile
		Sorts and stack segments on top of each other so they occupy minimum number of rows.
*/
primitives.common.pile = function () {
	var _items = [];

	/*
		Function: add
			Add segment to pile object.
	
		Parameters:
			from - Left margin of segment.
			to - Right margin of segment.
			context - Any reference to user object. It is returned as parameter in callback function of resolve method.

		See Also:
			<primitives.common.pile>
	*/
	function add(from, to, context) {
		if (from < to) {
			_items.push(new Segment(from, to, context, 1));
		} else {
			_items.push(new Segment(to, from, context, -1));
		}
	}

	/*
		Function: resolve
			Sorts and stack segments on top of each other so they occupy minimum number of rows.
	
		Parameters:
			thisArg - Context of onItemStacked callback function call.
			onItemStacked - Call back function used to set segment offset. function(from, to, context, offset) {}

		Returns: 
			Number of stacked rows in pile.

		See Also:
			<primitives.common.pile>
	*/
	function resolve(thisArg, onItem) { // function(from, to, context, offset) {}
		var hash,
			backtraceNext,
			backtraceTaken,
			items, item,
			rowItems,
			rows,
			rowIndex, index,
			offset = 0;

		if (onItem != null) {
			items = _items.slice(0);
			items.sort(function (a, b) {
				return a.from - b.from;
			});

			rows = [];
			while (items.length > 0) {
				hash = {};
				backtraceNext = {};
				backtraceTaken = {};

				getMax(0, items, hash, backtraceNext, backtraceTaken);

				rowItems = [];
				rows[offset] = [];
				index = 0;
				while (backtraceNext.hasOwnProperty(index)) {
					if (backtraceTaken[index]) {
						rowItems.push(index);

						rows[offset].push(items[index]);
					}
					index = backtraceNext[index];
				}

				for (index = rowItems.length - 1; index >= 0; index -= 1) {
					items.splice(rowItems[index], 1);
				}
				offset += 1;
			}

			for (rowIndex = 0; rowIndex < offset; rowIndex += 1) {
				rowItems = rows[rowIndex];
				for (index = 0; index < rowItems.length; index += 1) {
					item = rowItems[index];
					if (onItem.call(thisArg, item.from, item.to, item.context, rowIndex, offset, item.direction)) {
						return offset;
					}
				}
			}
		}

		return offset;
	}

	function Segment(from, to, context, direction) {
		this.context = context;
		this.from = from;
		this.to = to;
		this.offset = null;
		this.direction = direction;
	}

	function getMax(index, items, hash, backtraceNext, backtraceTaken) {
		var result = 0;

		if (index >= items.length) {
			return 0;
		}

		if (hash.hasOwnProperty(index)) {
			return hash[index];
		}

		var item = items[index];
		var withoutItem = getMax(index + 1, items, hash, backtraceNext, backtraceTaken);

		var nextIndex = index + 1;
		while (nextIndex < items.length) {
			var nextItem = items[nextIndex];
			if (nextItem.from >= item.to) {
				break;
			}
			nextIndex += 1;
		}
		var withItem = 1 + getMax(nextIndex, items, hash, backtraceNext, backtraceTaken);

		if (withItem > withoutItem) {
			hash[index] = withItem;
			backtraceNext[index] = nextIndex;
			backtraceTaken[index] = true;
		} else {
			hash[index] = withoutItem;
			backtraceNext[index] = index + 1;
			backtraceTaken[index] = false;
		}

		return hash[index];
	}

	return {
		add: add,
		resolve: resolve
	};
};

/* /algorithms/QuadTree.js*/
primitives.common.QuadTree = function (minimalSize) {
	var _minimalScale = Math.max(1, scale(minimalSize)),
		_rootScale = 8,
		_rootSize = 256,
		_rootCell = null;

	// Create root cell
	_rootCell = new Cell(0, 0, _rootScale, _rootSize);

	function Cell(x, y, scale, size) {
		this.x = x;
		this.y = y;
		this.scale = scale;
		this.size = size;
		this.quadrants = [];
		this.points = [];
	}

	Cell.prototype.notEnclosed = function (rect) {
		if (this.x < rect.x || this.x + this.size > rect.x + rect.width || this.y < rect.y || this.y + this.size > rect.y + rect.height) {
			return true;
		}
		return false;
	};

	Cell.prototype.overlaps = function (rect) {
		if (this.x + this.size < rect.x || rect.x + rect.width < this.x || this.y + this.size < rect.y || rect.y + rect.height < this.y) {
			return false;
		}
		return true;
	};

	Cell.prototype.getQuadrantIndex = function (x, y) {
		var shift = this.scale - 1;
		return ((x >> shift) & 1) | (((y >> shift) & 1) << 1);
	};

	function scale(value) {
		return Math.floor(Math.log(value) / Math.log(2));
	}

	function addPoint(point) {
		var x = Math.floor(point.x),
			y = Math.floor(point.y),
			size = Math.max(x, y);

		while (_rootSize <= size) {
			_rootScale += 1;
			_rootSize *= 2;
			var parent = new Cell(0, 0, _rootScale, _rootSize);
			_splitCell(parent);
			parent.quadrants[0] = _rootCell;
			_rootCell = parent;
		}
		_addPoint(point);
	}

	function _addPoint(point) {
		var x = Math.floor(point.x),
			y = Math.floor(point.y),
			cell = _rootCell;
		if (x < 0 || y < 0) {
			throw "Negative values are not supported in the quad tree.";
		}
		while (cell.points == null || cell.points.length > 0) {
			if (cell.scale == _minimalScale && cell.points != null) {
				break;
			}
			if (cell.points != null && cell.points.length > 0) {
				_splitCell(cell);
			}
			cell = cell.quadrants[cell.getQuadrantIndex(x, y)];
		}
		cell.points.push(point);
	}

	function _splitCell(parent) {
		var size = parent.size / 2;
		parent.quadrants = [
			new Cell(parent.x, parent.y, parent.scale - 1, size),
			new Cell(parent.x + size, parent.y, parent.scale - 1, size),
			new Cell(parent.x, parent.y + size, parent.scale - 1, size),
			new Cell(parent.x + size, parent.y + size, parent.scale - 1, size)
		];
		for (var index = 0, len = parent.points.length; index < len; index += 1) {
			var point = parent.points[index],
				x = Math.floor(point.x),
				y = Math.floor(point.y);

			parent.quadrants[parent.getQuadrantIndex(x, y)].points.push(point);
		}

		// indicates that cell has quadrants
		parent.points = null;
	}

	function loopArea(thisArg, rect, onItem) { // onItem = function(itemid) {}
		var cell,
			index, len;
		if (onItem != null) {
			var check = [_rootCell],
				nocheck = [];
			while (check.length > 0 || nocheck.length > 0) {
				var newCheck = [],
					newNocheck = [];
				for (index = 0, len = check.length; index < len; index += 1) {
					cell = check[index];
					if (cell.overlaps(rect)) {
						if (cell.notEnclosed(rect)) {
							if (cell.points == null) {
								for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
									newCheck.push(cell.quadrants[quadrantIndex]);
								}
							} else {
								for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
									var point = cell.points[pointIndex];
									if (rect.contains(point)) {
										if (onItem.call(thisArg, point)) {
											return;
										}
									}
								}
							}
						} else {
							nocheck.push(cell);
						}
					}
				}
				for (index = 0, len = nocheck.length; index < len; index += 1) {
					cell = nocheck[index];
					if (cell.points == null) {
						for (quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
							newNocheck.push(cell.quadrants[quadrantIndex]);
						}
					} else {
						for (pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
							if (onItem.call(thisArg, cell.points[pointIndex])) {
								return;
							}
						}
					}
				}
				check = newCheck;
				nocheck = newNocheck;
			}
		}
	}

	function validate() {
		var level = [_rootCell];
		while (level.length > 0) {
			var newLevel = [];
			for (var index = 0, len = level.length; index < len; index += 1) {
				var cell = level[index];
				var rect = new primitives.common.Rect(cell.x, cell.y, cell.size, cell.size);
				if (cell.points != null && cell.quadrants.length > 0) {
					return false;
				}
				if (cell.points == null) {
					for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
						newLevel.push(cell.quadrants[quadrantIndex]);
					}
				} else {
					for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
						var point = cell.points[pointIndex];
						if (!rect.contains(point)) {
							return false;
						}
					}
				}
			}
			level = newLevel;
		}
		return true;
	}

	function getPositions(selection) {
		var result = [];
		var count = 0;
		var level = [_rootCell];
		while (level.length > 0) {
			var newLevel = [];
			for (var index = 0, len = level.length; index < len; index += 1) {
				var cell = level[index];
				var rect = new primitives.common.Rect(cell.x, cell.y, cell.size, cell.size);
				rect.context = {
					isHighlighted: false
				};
				count += 1;
				if (selection != null && selection.overlaps(rect) && cell.points != null && cell.points.length > 0) {
					rect.context.isHighlighted = true;
				}

				result.push(rect);
				for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
					var quadrant = cell.quadrants[quadrantIndex];
					if (quadrant != null) {
						newLevel.push(quadrant);
					}
				}
			}
			level = newLevel;
		}
		return result;
	}

	return {
		addPoint: addPoint,
		loopArea: loopArea,
		validate: validate,
		getPositions: getPositions
	};
};

/* /algorithms/RMQ.js*/
primitives.common.RMQ = function (items) {
	var _lookup = [];
	var _log2 = Math.log(2);

	preprocess();

	function preprocess() {
		var power;

		for (var index = 0, len = items.length; index < len; index += 1) {
			_lookup[index] = [index];
		}
		for (power = 1, len = items.length; (1 << power) < len; power += 1) {
			for (index = 0; (index + (1 << power) - 1) < len; index += 1) {
				if (items[_lookup[index][power - 1]] < items[_lookup[index + (1 << (power - 1))][power - 1]]) {
					_lookup[index][power] = _lookup[index][power - 1];
				} else {
					_lookup[index][power] = _lookup[index + (1 << (power - 1))][power - 1];
				}
			}
		}
	}

	function getRangeMinimumIndex(from, to) {
		var power = Math.floor(Math.log(to - from + 1) / _log2);

		if (items[_lookup[from][power]] <= items[_lookup[to - (1 << power) + 1][power]]) {
			return _lookup[from][power];
		} else {
			return _lookup[to - (1 << power) + 1][power];
		}
	}

	function getRangeMinimum(from, to) {
		return items[getRangeMinimumIndex(from, to)];
	}

	return {
		getRangeMinimumIndex: getRangeMinimumIndex,
		getRangeMinimum: getRangeMinimum
	};
};

/* /algorithms/SortedList.js*/
primitives.common.SortedList = function () {
	var _rootNode = null;

	function Node(value, context) {
		this.value = value;
		this.context = context;

		this.left = null;
		this.right = null;

		this.balance = 0;
	}

	function _rebalance(node) {
		var balance;
		if (node.balance == 2) {
			var right = node.right;
			balance = right.balance;
			if (balance >= 0) {
				_rotateSmallLeft(right, node);
			} else {
				_rotateBigLeft(right, node);
			}
		} else if (node.balance == -2) {
			var left = node.left;
			balance = left.balance;
			if (balance <= 0) {
				_rotateSmallRight(node.left, node);
			} else {
				_rotateBigRight(node.left, node);
			}
		}
		return balance;
	}

	function _rotateSmallLeft(node, parent) {
		_rotateLeft(node, parent);

		if (node.balance == 1) {
			parent.balance = 0;
			node.balance = 0;
		} else {
			parent.balance = -1;
			node.balance = 1;
		}
	}

	function _rotateLeft(node, parent) {
		_swap(node, parent);
		parent.right = node.right;
		node.right = node.left;
		node.left = parent.left;
		parent.left = node;
	}

	function _rotateSmallRight(node, parent) {
		_rotateRight(node, parent);

		if (node.balance == -1) {
			parent.balance = 0;
			node.balance = 0;
		} else {
			parent.balance = 1;
			node.balance = -1;
		}
	}

	function _rotateRight(node, parent) {
		_swap(node, parent);
		parent.left = node.left;
		node.left = node.right;
		node.right = parent.right;
		parent.right = node;
	}

	function _rotateBigLeft(node, parent) {
		var bottom = node.left;
		_rotateRight(bottom, node);
		_rotateLeft(node, parent);

		parent.balance = 0;
		switch (bottom.balance) {
			case 1:
				node.balance = -1;
				bottom.balance = 0;
				break;
			case 0:
				bottom.balance = 0;
				node.balance = 0;
				break;
			default:
				bottom.balance = 1;
				node.balance = 0;
				break;
		}
	}

	function _rotateBigRight(node, parent) {
		var bottom = node.right;
		_rotateLeft(bottom, node);
		_rotateRight(node, parent);

		parent.balance = 0;
		switch (bottom.balance) {
			case -1:
				bottom.balance = 0;
				node.balance = 1;
				break;
			case 0:
				bottom.balance = 0;
				node.balance = 0;
				break;
			default:
				bottom.balance = -1;
				node.balance = 0;
				break;
		}
	}

	function add(value, context, thisArg, onDuplicate) {
		if (_rootNode == null) {
			_rootNode = new Node(value, context);
		} else {
			var trace = [];
			var node = null;
			var next = _rootNode;
			while (next != null) {
				if (node != null) {
					trace.push(node);
				}
				node = next;
				if (node.value == value) {
					if (onDuplicate != null) {
						onDuplicate.call(thisArg, node.context);
					} else {
						throw "Structure does not support duplicates.";
					}
				} else {
					if (node.value > value) {
						next = node.left;
					} else {
						next = node.right;
					}
				}
			}
			trace.push(node);
			var newNode = new Node(value, context);
			if (node.value > value) {
				node.left = newNode;
			} else {
				node.right = newNode;
			}
			node = newNode;

			while ((next = trace.pop()) != null) {
				if (node.value < next.value) {
					if (next.balance < 0) {
						next.balance -= 1;
						_rebalance(next);
						break;
					} else {
						if (next.balance > 0) {
							next.balance -= 1;
							break;
						}
						next.balance -= 1;
					}
				} else {
					if (next.balance > 0) {
						next.balance += 1;
						_rebalance(next);
						break;
					} else {
						if (next.balance < 0) {
							next.balance += 1;
							break;
						}
						next.balance += 1;
					}
				}
				node = next;
			}
		}
	}

	function _delete(node, parent) {
		var child = node.right != null ? node.right : node.left;
		if (parent != null) {
			if (parent.value > node.value) {
				parent.left = child;
			} else {
				parent.right = child;
			}
		} else {
			_rootNode = child;
		}
	}

	function _swap(node1, node2) {
		var value = node1.value;
		node1.value = node2.value;
		node2.value = value;

		var context = node1.context;
		node1.context = node2.context;
		node2.context = context;
	}

	function _copy(fromNode, toNode) {
		toNode.value = fromNode.value;
		toNode.context = fromNode.context;
	}

	function remove(value) {
		var trace = [];
		var node = _rootNode;
		while (node != null) {
			if (node.value == value) {
				if (node.right != null && node.left != null) {
					trace.push(node);
					var next = node.right;
					while (next.left != null) {
						trace.push(next);
						next = next.left;
					}
					_copy(next, node);
					_delete(next, trace[trace.length - 1]);
					trace.push(next);
				} else {
					_delete(node, trace[trace.length - 1]);
					trace.push(node);
				}
				for (var index = trace.length - 2; index >= 0; index -= 1) {
					var parent = trace[index];
					node = trace[index + 1];
					if (parent.value > node.value) {
						if (parent.balance > 0) {
							parent.balance += 1;
							if (_rebalance(parent) === 0) {
								break;
							}
						} else {
							if (parent.balance === 0) {
								parent.balance += 1;
								break;
							}
							parent.balance += 1;
						}
					} else {
						if (parent.balance < 0) {
							parent.balance -= 1;
							if (_rebalance(parent) === 0) {
								break;
							}
						} else {
							if (parent.balance === 0) {
								parent.balance -= 1;
								break;
							}
							parent.balance -= 1;
						}
					}
				}
				break;
			} else {
				trace.push(node);
				if (node.value > value) {
					node = node.left;
				} else {
					node = node.right;
				}
			}
		}
	}

	function nextContext(fromValue) {
		var result = null;
		loopForward(this, fromValue, function (value, context) {
			result = context;
			return true;
		});
		return result;
	}

	function loopForward(thisArg, fromValue, onItem) { //function onItem(value, context)
		if (onItem != null) {
			var trace = [];
			var node = null;
			var next = _rootNode;
			while (next != null) {
				node = next;
				if (node.value >= fromValue || fromValue == null) {
					trace.push(node);
					next = node.left;
				} else {
					next = node.right;
				}
			}
			while ((node = trace.pop()) != null) {
				if (onItem.call(thisArg, node.value, node.context)) {
					return;
				}
				next = node.right;
				while (next != null) {
					node = next;
					if (node.left != null) {
						trace.push(node);
						next = node.left;
					} else {
						if (onItem.call(thisArg, node.value, node.context)) {
							return;
						}
						next = node.right;
					}
				}
			}
		}
	}

	function previousContext(fromValue) {
		var result = null;
		loopBackward(this, fromValue, function (nextValue, context) {
			result = context;
			return true;
		});
		return result;
	}

	function loopBackward(thisArg, fromValue, onItem) {
		if (onItem != null) {
			var trace = [];
			var node = null;
			var next = _rootNode;
			while (next != null) {
				node = next;
				if (node.value <= fromValue || fromValue == null) {
					trace.push(node);
					next = node.right;
				} else {
					next = node.left;
				}
			}
			while ((node = trace.pop()) != null) {
				if (onItem.call(thisArg, node.value, node.context)) {
					return;
				}
				next = node.left;
				while (next != null) {
					node = next;
					if (node.right != null) {
						trace.push(node);
						next = node.right;
					} else {
						if (onItem.call(thisArg, node.value, node.context)) {
							return;
						}
						next = node.left;
					}
				}
			}
		}
	}

	function _getValidationDepth(node) {
		var level = [],
			result = 0;
		if (node != null) {
			level.push(node);
			while (level.length > 0) {
				var newLevel = [];

				for (var index = 0; index < level.length; index += 1) {
					node = level[index];

					if (node.left != null) {
						newLevel.push(node.left);
					}

					if (node.right != null) {
						newLevel.push(node.right);
					}
				}

				level = newLevel;
				result += 1;
			}
		}
		return result;
	}

	function validate() {
		if (_rootNode != null) {
			var level = [_rootNode];
			while (level.length > 0) {
				var newLevel = [];

				for (var index = 0; index < level.length; index += 1) {
					var node = level[index];

					if (node.value == null) {
						return false;
					}

					if (node.left != null) {
						newLevel.push(node.left);
						if (node.left.value >= node.value) {
							return false;
						}
					}

					if (node.right != null) {
						newLevel.push(node.right);
						if (node.right.value <= node.value) {
							return false;
						}
					}

					if (node.balance != (_getValidationDepth(node.right) - _getValidationDepth(node.left))) {
						console.log("Disbalanced node: " + node.value + " - " + JSON.stringify(_rootNode));
						return false;
					}
				}

				level = newLevel;
			}
		}
		return true;
	}

	return {
		add: add,
		remove: remove,
		loopForward: loopForward,
		loopBackward: loopBackward,
		nextContext: nextContext,
		previousContext: previousContext,
		validate: validate
	};
};

/* /algorithms/SpatialIndex.js*/
primitives.common.SpatialIndex = function (sizes) {
	var _buckets = [];

	sizes.sort(function (a, b) { return a - b;});

	switch (sizes.length) {
		case 0:
			_buckets.push(new Bucket(0, 1000000));
			break;
		case 1:
			var size1 = sizes[0];
			_buckets.push(new Bucket(0, size1));
			break;
		case 2:
			size1 = sizes[0];
			var size2 = sizes[1];
			if (size2 > size1 * 2) {
				_buckets.push(new Bucket(0, size1));
				_buckets.push(new Bucket(size1, size2));
			} else {
				_buckets.push(new Bucket(0, size2));
			}
			break;
		default:
			var breaks = primitives.common.getLiniarBreaks(sizes);
			var minimum = 0;
			for (var index = 0; index < breaks.length; index += 1) {
				var maximum = sizes[breaks[index]];
				_buckets.push(new Bucket(minimum, maximum));
				minimum = maximum;
			}
			break;
	}

	function Bucket(minimum, maximum) {
		this.minimum = minimum;
		this.maximum = maximum;
		this.quadTree = primitives.common.QuadTree(maximum * 2);
	}

	function addRect(rect) {
		var size = Math.max(rect.width, rect.height);
		var point = rect.centerPoint();

		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			if (size <= bucket.maximum || index == len - 1) {
				point.context = rect;
				bucket.quadTree.addPoint(point);
				break;
			}
		}
	}

	function loopArea(thisArg, rect, onItem) { // onItem = function(itemid) {}
		if (onItem != null) {
			for (var index = 0, len = _buckets.length; index < len; index += 1) {
				var bucket = _buckets[index];
				var bucketRect = new primitives.common.Rect(rect);
				bucketRect.offset(bucket.maximum / 2.0);
				bucket.quadTree.loopArea(this, bucketRect, function (point) {
					var pointRect = point.context;

					if (rect.overlaps(pointRect)) {
						return onItem.call(thisArg, pointRect);
					}
				});
			}
		}
	}

	function validate() {
		var result = true;
		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			result = result && bucket.quadTree.validate();
		}
		return result;
	}

	function getPositions(selection) {
		var result = [];
		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			result = result.concat(bucket.quadTree.getPositions(selection));
		}
		return result;
	}

	return {
		addRect: addRect,
		loopArea: loopArea,
		validate: validate,
		getPositions: getPositions
	};
};

/* /algorithms/tree.js*/
primitives.common.tree = function (source) {
	var _nodes = {},        // objects attached to nodes
		_parents = {},      // parent node id for every node id. Both of them should exists in the tree.
		_children = {},     // children node ids for every node id. All children and node itself should be in the tree.
		_roots = {},        // id of non existing parent. If parent does not exists in the tree this hash contains its id.
		_rootChildren = {}, // children of non existing parent. If parent id does not exists in the tree this collection contains it existing children.
		BREAK = 1,
		SKIP = 2;

	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_nodes = primitives.common.cloneObject(source.nodes, true);
			_parents = primitives.common.cloneObject(source.parents, true);
			_children = primitives.common.cloneObject(source.children, false);
			_roots = primitives.common.cloneObject(source.roots, false);
			_rootChildren = primitives.common.cloneObject(source.rootChildren, true);
		}
	}

	function loop(thisArg, onItem) {
		var item;
		if (onItem != null) {
			for (item in _nodes) {
				if (_nodes.hasOwnProperty(item)) {
					if (onItem.call(thisArg, item, _nodes[item])) {
						break;
					}
				}
			}
		}
	}

	function loopLevels(thisArg, arg0, arg1) { // onItem(nodeid, node, levelid) if function returns true loop is continued on item's children 
		var levelIndex = 0,
			items = [],
			itemid,
			onItem,
			newItems,
			key,
			index, len;

		switch (arguments.length) {
			case 2:
				onItem = arg0;
				break;
			case 3:
				itemid = arg0;
				onItem = arg1;
				break;
		}

		if (onItem != null) {

			if (itemid == null) {
				for (key in _rootChildren) {
					if (_rootChildren.hasOwnProperty(key)) {
						items = items.concat(_rootChildren[key]);
					}
				}
			} else {
				if (_children[itemid] != null) {
					items = items.concat(_children[itemid]);
				}
			}

			while (items.length > 0) {
				newItems = [];

				for (index = 0, len = items.length; index < len; index += 1) {
					itemid = items[index];
					switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
						case BREAK:
							newItems = [];
							break;
						case SKIP:
							break;
						default:
							if (_children[itemid] != null) {
								newItems = newItems.concat(_children[itemid]);
							}
							break;
					}
				}

				items = newItems;
				levelIndex += 1;
			}
		}
	}

	/* children first - parent last */
	function loopPostOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
		var stack = [], nodeid,
			key,
			index,
			prevParent,
			children;

		if (onItem != null) {

			for (key in _rootChildren) {
				if (_rootChildren.hasOwnProperty(key)) {
					stack = stack.concat(_rootChildren[key]);
				}
			}

			while (stack.length > 0) {
				nodeid = stack[stack.length - 1];
				if (nodeid != prevParent && (children = _children[nodeid]) != null) {
					for (index = children.length - 1; index >= 0; index -= 1) {
						stack.push(children[index]);
					}
				} else {
					stack.pop();
					prevParent = _parents[nodeid];

					if (onItem.call(thisArg, nodeid, _nodes[nodeid], prevParent, _nodes[prevParent])) {
						break;
					}
				}
			}
		}
	}

	/* parent first - children next */
	function loopPreOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
		var stack = [], nodeid,
			key,
			index,
			parentid,
			prevParent,
			children;

		if (onItem != null) {

			for (key in _rootChildren) {
				if (_rootChildren.hasOwnProperty(key)) {
					stack = stack.concat(_rootChildren[key]);
				}
			}

			while (stack.length > 0) {
				nodeid = stack[stack.length - 1];
				if (nodeid != prevParent) {
					parentid =  _parents[nodeid];
					if (onItem.call(thisArg, nodeid, _nodes[nodeid], parentid, _nodes[parentid])) {
						break;
					}
				}
				if (nodeid != prevParent && (children = _children[nodeid]) != null) {
					for (index = children.length - 1; index >= 0; index -= 1) {
						stack.push(children[index]);
					}
				} else {
					stack.pop();
					prevParent = _parents[nodeid];
				}
			}
		}
	}

	/* Euler Walk */
	function loopEulerWalk(thisArg, onItem) { // onItem(nodeid, node, level) if function returns true loop exits
		var stack = [],
			nodeid,
			levels = [],
			level = 0,
			key,
			index, len,
			prevParent,
			children;

		if (onItem != null) {

			for (key in _rootChildren) {
				if (_rootChildren.hasOwnProperty(key)) {
					children = _rootChildren[key];
					for (index = 0, len = children.length; index < len; index += 1) {
						stack.push(children[index]);
						levels.push(0);
					}
				}
			}
			while (stack.length > 0) {
				index = stack.length - 1;
				nodeid = stack[index];
				level = levels[index];

				if (onItem.call(thisArg, nodeid, _nodes[nodeid], level)) {
					break;
				}

				if (nodeid != prevParent && (children = _children[nodeid]) != null) {
					for (index = children.length - 1; index >= 0; index -= 1) {
						stack.push(children[index]);
						levels.push(level + 1);
						if (index > 0) {
							stack.push(nodeid);
							levels.push(level);
						}
					}
				} else {
					stack.pop();
					levels.pop();

					prevParent = _parents[nodeid];
				}
			}
		}
	}

	function zipUp(thisArg, firstNodeId, secondNodeid, onZip) { // onZip(firstNodeId, firstParentId, secondNodeid, secondParentId)
		var firstParentId,
			secondParentId;

		if (onZip != null) {
			while (firstNodeId != null && secondNodeid != null && firstNodeId != secondNodeid) {
				firstParentId = _parents[firstNodeId];
				secondParentId = _parents[secondNodeid];
				if (onZip.call(thisArg, firstNodeId, firstParentId, secondNodeid, secondParentId)) {
					break;
				}
				firstNodeId = firstParentId;
				secondNodeid = secondParentId;
			}
		}
	}

	function loopParents(thisArg, nodeid, onItem, includingStartItem) { // onItem(nodeid, node)
		var parentid = nodeid;
		if (_nodes[parentid] != null) {
			if (onItem != null) {
				if (includingStartItem === true) {
					if (onItem.call(thisArg, parentid, _nodes[parentid])) {
						return;
					}
				}
				while ((parentid = _parents[parentid]) != null) {
					if (onItem.call(thisArg, parentid, _nodes[parentid])) {
						break;
					}
				}
			}
		}
	}

	function loopChildren(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
		var items,
			itemid,
			index, len;
		if (_nodes[nodeid] != null) {
			items = _children[nodeid];
			if (items != null) {
				for (index = 0, len = items.length; index < len; index += 1) {
					itemid = items[index];
					if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
						break;
					}
				}
			}
		}
	}

	function loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem) { // onItem(nodeid, node, index)
		var items,
			itemid,
			index, len;
		if (_nodes[nodeid] != null) {
			items = _children[nodeid];
			if (items != null) {
				if (fromIndex < toIndex) {
					fromIndex = Math.max(fromIndex, 0);
					toIndex = Math.min(toIndex, items.length - 1);
					for (index = fromIndex; index <= toIndex; index += 1) {
						itemid = items[index];
						if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
							break;
						}
					}
				} else {
					fromIndex = Math.min(fromIndex, items.length - 1);
					toIndex = Math.max(0, toIndex);
					for (index = fromIndex; index >= toIndex; index -= 1) {
						itemid = items[index];
						if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
							break;
						}
					}
				}
			}
		}
	}

	function loopChildrenReversed(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
		var items,
			itemid,
			index, lastIndex;
		if (_nodes[nodeid] != null) {
			items = _children[nodeid];
			lastIndex = items.length - 1;
			if (items != null) {
				for (index = lastIndex; index >= 0; index -= 1) {
					itemid = items[index];
					if (onItem.call(thisArg, itemid, _nodes[itemid], index, lastIndex)) {
						break;
					}
				}
			}
		}
	}

	function arrangeChildren(nodeid, children) {
		var childid,
			index, len;

		children = children.slice(0);
		if (_nodes[nodeid] != null) {
			if (_children[nodeid] != null) {
				if (_children[nodeid].length == children.length) {
					for (index = 0, len = children.length; index < len; index += 1) {
						childid = children[index];
						if (_parents[childid] != nodeid) {
							throw "Child " + childid + " does not belong to given node!";
						}
					}
					_children[nodeid] = children;
				} else {
					throw "Collections of children don't match each other!";
				}
			} else {
				if (children.length > 0) {
					throw "Collections of children don't match each other!";
				}
			}
		}
	}

	function add(parentid, nodeid, node, position) {
		var index, len, children, childid;

		if (_nodes[nodeid] != null) {
			throw "Node already exists";
		}

		if (nodeid != null && node != null && _nodes[nodeid] == null) {

			if (_nodes[parentid] != null) {
				_parents[nodeid] = parentid;

				// existing parent
				if (_children[parentid] != null) {
					if (position == null) {
						_children[parentid].push(nodeid);
					} else {
						_children[parentid].splice(position, 0, nodeid);
					}
				} else {
					_children[parentid] = [nodeid];
				}
			} else {
				_roots[nodeid] = parentid;

				// missing parent
				if (_rootChildren[parentid] != null) {
					if (position == null) {
						_rootChildren[parentid].push(nodeid);
					} else {
						_rootChildren[parentid].splice(position, 0, nodeid);
					}
				} else {
					_rootChildren[parentid] = [nodeid];
				}
			}

			_nodes[nodeid] = node;

			if (_rootChildren[nodeid] != null) {
				_children[nodeid] = _rootChildren[nodeid];
				delete _rootChildren[nodeid];

				children = _children[nodeid];
				for (index = 0, len = children.length; index < len; index += 1) {
					childid = children[index];

					delete _roots[childid];

					_parents[childid] = nodeid;
				}
				
			}

		}
	}

	function insert(nodeid, bundleid, bundle) {
		if (_nodes[nodeid] != null && bundleid != null && _nodes[bundleid] == null && bundle != null) {

			_nodes[bundleid] = bundle;

			if (_children[nodeid] != null) {
				_children[bundleid] = _children[nodeid];
			}
			_children[nodeid] = [bundleid];

			loopChildren(this, bundleid, function (childid, node, index) {
				_parents[childid] = bundleid;
			});
			_parents[bundleid] = nodeid;
		}
	}

	function moveChildren(fromNodeid, toNodeId) {
		if (_nodes[fromNodeid] != null && _nodes[toNodeId] != null && fromNodeid != toNodeId) {

			if (_children[fromNodeid] != null) {

				loopChildren(this, fromNodeid, function (childid, node, index) {
					_parents[childid] = toNodeId;
				});

				if (_children[toNodeId] != null) {
					_children[toNodeId] = _children[toNodeId].concat(_children[fromNodeid]);
				} else {
					_children[toNodeId] = _children[fromNodeid];
				}
				delete _children[fromNodeid];
			}
		}
	}

	function hasNodes() {
		return !primitives.common.isEmptyObject(_rootChildren);
	}

	function parentid(nodeid) {
		var result = null;

		if (_parents[nodeid] != null) {
			result = _parents[nodeid];
		}

		return result;
	}

	function parent(nodeid) {
		var result = null;

		if (_parents[nodeid] != null) {
			result = _nodes[_parents[nodeid]];
		}

		return result;
	}

	function hasChildren(nodeid) {
		return _children[nodeid] != null;
	}

	function countChildren(nodeid) {
		return _children[nodeid] != null ? _children[nodeid].length : 0;
	}

	function countSiblings(nodeid) {
		var parent = parentid(nodeid);
		return parent != null ? _children[parent].length : 0;
	}

	function indexOf(nodeid) {
		var parent = parentid(nodeid);
		return parent != null ? primitives.common.indexOf(_children[parent], nodeid) : null;
	}

	function getChild(parentid, index) {
		var result = null,
			children;
		if ((children = _children[parentid]) != null) {
			result = _nodes[children[index]];
		}
		return result;
	}

	function _splice(collection, nodeid) {
		var index, len = collection.length;
		for (index = 0; index < len; index += 1) {
			if(collection[index] == nodeid) {
				collection.splice(index, 1);
				return len - 1;
			}
		}
		return len;
	}

	function adopt(parentid, nodeid) {
		if (_nodes[parentid] != null && _nodes[nodeid] != null) {
			if (parentid != nodeid) {
				if (_roots.hasOwnProperty(nodeid)) {
					if (!_splice(_rootChildren[_roots[nodeid]], nodeid)) {
						delete _rootChildren[_roots[nodeid]];
					}
					delete _roots[nodeid];
				}

				if (_parents.hasOwnProperty(nodeid)) {
					if (!_splice(_children[_parents[nodeid]], nodeid)) {
						delete _children[_parents[nodeid]];
					}
				}

				_parents[nodeid] = parentid;
				if (_children[parentid] != null) {
					_children[parentid].push(nodeid);
				} else {
					_children[parentid] = [nodeid];
				}
			}
			else {
				throw "Item cannot be parent of itself!";
			}
		} else {
			throw "Both parent and child should be in hierarchy!";
		}
	}

	function node(nodeid) {
		return _nodes[nodeid];
	}

	function validate() {
		var result = true,
			key;

		for (key in _roots) {
			if (_roots.hasOwnProperty(key)) {
				if (_roots[key] != null) {
					result = false;
					break;
				}
			}
		}

		return result;
	}

	function clone() {
		return primitives.common.family({
			nodes: _nodes,
			parents: _parents,
			children: _children,
			roots: _roots,
			rootChildren: _rootChildren
		});
	}
	
	function loopNeighbours(thisArg, itemid, distance, onItem) {
		var processed = {},
			margin = [itemid],
			newMargin,
			currentDistance = 0;

		if (onItem != null) {
			if (_nodes.hasOwnProperty(itemid)) {
				processed[itemid] = true;
				while (margin.length > 0) {
					newMargin = [];
					for (var index = 0, len = margin.length; index < len; index += 1) {
						var marginid = margin[index];
						if (currentDistance > 0) {
							if (onItem.call(thisArg, marginid, _nodes[marginid], currentDistance)) {
								return;
							}
						}
						if (currentDistance < distance) {
							_loopNeighbours(this, marginid, function (neighbourid, neighbour) {
								if (!processed.hasOwnProperty(neighbourid)) {
									newMargin.push(neighbourid);
									processed[neighbourid] = true;
								}
							});
						}
					}
					margin = newMargin;
					currentDistance += 1;
				}
			}
		}
	}

	function _loopNeighbours(thisArg, itemid, onItem) {
		if (onItem != null) {
			if (_nodes.hasOwnProperty(itemid)) {
				/* loop parent */
				var parentItemId = parentid(itemid);
				if (parentItemId != null) {
					if (onItem.call(thisArg, parentItemId, _nodes[parentItemId])) {
						return;
					}
				}
				/* loop siblings */
				loopChildren(thisArg, parentItemId, function (childItemId, childItem) {
					if (childItemId != itemid) {
						if (onItem.call(thisArg, childItemId, childItem)) {
							return;
						}
					}
				});
				/* loop actual children */
				loopChildren(thisArg, itemid, function (childItemId, childItem) {
					if (onItem.call(thisArg, childItemId, childItem)) {
						return;
					}
				});
			}
		}
	}

	return {
		loop: loop,
		loopLevels: loopLevels,
		loopParents: loopParents,
		loopChildren: loopChildren,
		loopChildrenRange: loopChildrenRange,
		loopChildrenReversed: loopChildrenReversed,
		loopPostOrder: loopPostOrder, /* children first - parent last */
		loopPreOrder: loopPreOrder, /* parent first - children next */
		loopEulerWalk: loopEulerWalk, /* pre order loop with every parent revisited for every child */
		loopNeighbours: loopNeighbours, /* loop items by distance. Siblings are as far as parent and children */
		zipUp: zipUp,
		parentid: parentid,
		parent: parent,
		adopt: adopt,
		moveChildren: moveChildren,
		node: node,
		add: add,
		insert: insert,
		hasNodes: hasNodes,
		hasChildren: hasChildren,
		countChildren: countChildren,
		countSiblings: countSiblings,
		indexOf: indexOf,
		getChild: getChild,
		arrangeChildren: arrangeChildren,

		/* force validation */
		validate: validate,
		clone: clone,

		// callback return codes
		BREAK: BREAK, // break loop immidiatly
		SKIP: SKIP // skip loop of current node children 
	};
};

/* /algorithms/TreeLevels.js*/
primitives.common.TreeLevels = function (source) {
	var _levels = [],
		_items = {},
		_minimum = null,
		_maximum = null;

	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_levels = primitives.common.cloneObject(source.levels, true);
			_items = primitives.common.cloneObject(source.items, true);
			_minimum = primitives.common.cloneObject(source.minimum, true);
			_maximum = primitives.common.cloneObject(source.maximum, true);
		}
	}

	function LevelContext(context) {
		this.context = context;
		this.items = [];
	}

	function ItemContext(context, position, level) {
		this.context = context;
		this.positions = {};
		this.positions[level] = position;
		this.startLevel = level;
		this.endLevel = level;
	}

	function isEmpty() {
		return !_levels.length;
	}

	function length() {
		return _levels.length;
	}

	function addLevel(level, context) {
		var treeLevel = createLevel(level);
		treeLevel.context = context;
	}

	function getStartLevelIndex(itemid) {
		return _items.hasOwnProperty(itemid) ? _items[itemid].startLevel : null;
	}

	function getEndLevelIndex(itemid) {
		return _items.hasOwnProperty(itemid) ? _items[itemid].endLevel : null;
	}

	function getItemPosition(itemid, level) {
		var context = _items[itemid];
		if(context != null) {
			if (level != null) {
				return context.positions[level];
			} else {
				return context.positions[context.startLevel];
			}
		}
		return null;
	}

	function getItemAtPosition(levelIndex, position) {
		var level = _levels[levelIndex],
			itemid = null;
		if (level != null) {
			itemid = level.items[position];
		}
		return itemid;
	}

	function getPrevItem(itemid, itemLevel) {
		var result = null;
		if(_items.hasOwnProperty(itemid)) {
			var item = _items[itemid];
			itemLevel = itemLevel || item.startLevel;
			var level = _levels[itemLevel];
			result = level.items[item.positions[itemLevel] - 1];
		}
		return result;
	}

	function getNextItem(itemid, itemLevel) {
		var result = null;
		if (_items.hasOwnProperty(itemid)) {
			var item = _items[itemid];
			itemLevel = itemLevel || item.startLevel;
			var level = _levels[itemLevel];
			result = level.items[item.positions[itemLevel] + 1];
		}
		return result;
	}

	function hasItem(itemid) {
		return _items.hasOwnProperty(itemid);
	}

	function hasLevel(levelIndex) {
		return _levels[levelIndex] != null;
	}

	function getItemContext(itemid) {
		var result = null;
		if (_items.hasOwnProperty(itemid)) {
			result = _items[itemid].context;
		}
		return result;
	}

	function createLevel(index) {
		if (_levels[index] == null) {
			_levels[index] = new LevelContext(null);

			_minimum = _minimum === null ? index : Math.min(_minimum, index);
			_maximum = _maximum === null ? index : Math.max(_maximum, index);
		}
		return _levels[index];
	}

	function addItem(levelIndex, itemid, context) {
		var level, itemContext;
		if (!_items.hasOwnProperty(itemid)) {
			level = createLevel(levelIndex);
			level.items.push(itemid);
			_items[itemid] = new ItemContext(context, level.items.length - 1, levelIndex);
		} else {
			level = createLevel(levelIndex);
			level.items.push(itemid);
			itemContext = _items[itemid];
			itemContext.positions[levelIndex] = level.items.length - 1;
			itemContext.startLevel = Math.min(itemContext.startLevel, levelIndex);
			itemContext.endLevel = Math.max(itemContext.endLevel, levelIndex);
		}
	}

	function loopLevels(thisArg, onItem) { // function onItem(levelIndex, level)
		var index, 
			level;
		if (onItem != null) {
			for (index = _minimum; index <= _maximum; index+=1) {
				level = _levels[index];
				if(level != null) {
					if (onItem.call(thisArg, index, level.context)) {
						break;
					}
				}
			}
		}
	}

	function loopLevelsReversed(thisArg, onItem) { // function onItem(levelIndex, level)
		var index,
			level;
		if (onItem != null) {
			for (index = _maximum; index >= _minimum; index -= 1) {
				level = _levels[index];
				if (level != null) {
					if (onItem.call(thisArg, index, level.context)) {
						break;
					}
				}
			}
		}
	}

	function getLevelLength(levelIndex) {
		var result = 0,
			level = _levels[levelIndex];
		if (level != null) {
			result = level.items.length;
		}
		return result;
	}

	function loopLevelItems(thisArg, levelIndex, onItem) { // function onItem(itemid, item, position)
		var index, len,
			level,
			itemid;
		if (onItem != null) {
			level = _levels[levelIndex];
			if (level != null) {
				for (index = 0, len = level.items.length; index < len; index += 1) {
					itemid = level.items[index];
					if (onItem.call(thisArg, itemid, _items[itemid].context, index)) {
						break;
					}
				}
			}
		}
	}

	function loopItems(thisArg, onItem) { // function onItem(itemid, item, position, levelIndex, level)
		var index, len,
			level, levelIndex,
			items,
			itemid,
			processed = {};
		if (onItem != null) {
			for (levelIndex = _minimum; levelIndex <= _maximum; levelIndex += 1) {
				level = _levels[levelIndex];
				if (level != null) {
					items = level.items;
					for (index = 0, len = items.length; index < len; index += 1) {
						itemid = items[index];
						if (!processed.hasOwnProperty(itemid)) {
							processed[itemid] = true;
							if (onItem.call(thisArg, itemid, _items[itemid].context, index, levelIndex, level.context)) {
								return;
							}
						}
					}
				}
			}
		}
	}

	function binarySearch(thisArg, levelIndex, onGetDistance) {
		var result = null,
			level;
		if (onGetDistance != null) {
			level = _levels[levelIndex];
			if (level != null) {
				result = primitives.common.binarySearch(level.items, function (itemid) {
					return onGetDistance.call(thisArg, itemid, _items[itemid].context);
				});
			}
		}
		return result.item;
	}

	function loopMerged(thisArg, getItemWeight, onItem) {
		var index, len,
			level,
			itemid,
			levelsItems = [],
			sortedItems;

		for (index = 0, len = _levels.length; index < len; index += 1) {
			level = _levels[index];
			if (level != null) {
				levelsItems.push(level.items);
			}
		}

		sortedItems = primitives.common.mergeSort(levelsItems, getItemWeight, true);

		if (onItem != null) {
			for (index = 0, len = sortedItems.length; index < len; index += 1) {
				itemid = sortedItems[index];
				if (onItem.call(thisArg, itemid, _items[itemid].context)) {
					break;
				}
			}
		}
	}

	function loopFromItem(thisArg, itemid, isLeft, onItem, level) {
		var context,
			index, len,
			items, nextItemId,
			itemLevel, position;
		if (_items.hasOwnProperty(itemid)) {
			context = _items[itemid];
			itemLevel = level || context.startLevel;
			items = _levels[itemLevel].items;
			position = context.positions[itemLevel];
			if (onItem != null) {
				if (isLeft) {
					for (index = position - 1; index >= 0; index -= 1) {
						nextItemId = items[index];
						if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
							break;
						}
					}
				} else {
					for (index = position + 1, len = items.length; index < len; index += 1) {
						nextItemId = items[index];
						if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
							break;
						}
					}
				}
			}
		}
	}

	function loopLevelsFromItem(thisArg, itemid, isBelow, onItem) { // function(levelIndex, level)
		var context,
			index, len,
			items, item, nextItemId,
			nextLevels, level;
		if (_items.hasOwnProperty(itemid)) {
			context = _items[itemid];
			if (onItem != null) {
				if (isBelow) {
					for (index = context.endLevel + 1; index <= _maximum; index += 1) {
						level = _levels[index];
						if (onItem.call(thisArg, index, level != null ? level.context : null)) {
							break;
						}
					}
				} else {
					for (index = context.startLevel - 1; index >= _minimum; index -= 1) {
						level = _levels[index];
						if (onItem.call(thisArg, index, level != null ? level.context : null)) {
							break;
						}
					}
				}
			}
		}
	}

	function clone() {
		return primitives.common.TreeLevels({
			levels: _levels,
			items: _items,
			minimum: _minimum,
			maximum: _maximum
		});
	}

	return {
		addlevel: addLevel,
		hasLevel: hasLevel,
		hasItem: hasItem,
		addItem: addItem,
		getItemContext: getItemContext,
		getLevelIndex: getStartLevelIndex,
		getEndLevelIndex: getEndLevelIndex,
		getItemPosition: getItemPosition,
		getItemAtPosition: getItemAtPosition,
		loopLevels: loopLevels,
		loopLevelsReversed: loopLevelsReversed,
		loopLevelItems: loopLevelItems,
		getLevelLength: getLevelLength,
		loopItems: loopItems,
		binarySearch: binarySearch,
		loopMerged: loopMerged,
		loopFromItem: loopFromItem,
		loopLevelsFromItem: loopLevelsFromItem,
		getPrevItem: getPrevItem,
		getNextItem: getNextItem,
		length: length,
		isEmpty: isEmpty,

		clone: clone
	};
};

/* /Managers/DependencyManager.js*/
primitives.common.DependencyManager = function () {
	var hash = {};

	function register(key, value) {
		hash[key] = value;

		return value;
	}

	function resolve() {
		var args = [],
			deps = arguments[0],
			func = arguments[1],
			scope = arguments[2] || {};
		return function () {
			var a = Array.prototype.slice.call(arguments, 0);
			for (var i = 0; i < deps.length; i += 1) {
				var d = deps[i];
				args.push(hash.hasOwnProperty(d) && d !== '' ? hash[d] : a.shift());
			}
			args = args.concat(a);
			return func.apply(scope || {}, args);
		};
	}

	return {
		register: register,
		resolve: resolve
	};
};

/* /Managers/KeyboardNavigationManager.js*/
primitives.common.KeyboardNavigationManager = function () {
	var /*
			Rectangles of the layout. Every rectangle has context property set to itemid.
		*/
		_placements = [],
		/*
			This is sorted list of horizontal lines user may navigate along them and across with arrow keys between rectangles of the layout
			Every rectangle may belong to multiple rows, so rows selection is optimized to minimize their number
		*/
		_rows,
		/*
			Tree levels structure is collection of colelctions. Its level contains sorted list of rectangles cross by individual row
		*/
		_treeLevels,
		/*
			Current itemid and row. Every rectangle may belong to multiple rows, so this structure helps to stay within row during navigation. 
		*/
		_cursor = null;

	function Cursor(itemid, row) {
		this.itemid = itemid;
		this.row = row;
	}

	function addRect(rect, itemid) {
		var newRect = new primitives.common.Rect(rect);
		newRect.context = itemid;

		_placements.push(newRect);
	}

	function prepair() {
		if (_treeLevels == null) {
			var levelIndex = 0;
			_rows = primitives.common.SortedList();
			primitives.common.getMinimumCrossingRows(this, _placements, function (row) {
				_rows.add(row, levelIndex);
				levelIndex += 1;
			});

			_treeLevels = primitives.common.TreeLevels();
			_placements.sort(function (a, b) {
				return a.horizontalCenter() - b.horizontalCenter();
			});
			for (var index = 0, len = _placements.length; index < len; index += 1) {
				var placement = _placements[index];
				_rows.loopForward(this, placement.y, function (row, levelIndex) {
					if (row > placement.bottom()) {
						return true;
					}
					_treeLevels.addItem(levelIndex, placement.context, placement);
				});
			}
		}
	}

	function getCursor(itemid) {
		prepair();

		if (_cursor == null || _cursor.itemid != itemid) {
			_cursor = new Cursor(itemid, _treeLevels.getLevelIndex(itemid));
		}

		return _cursor;
	}

	function getItemAbove(itemid) {
		_cursor = getCursor(itemid);

		moveCursorNextRow(false);

		return _cursor.itemid;
	}

	function getItemBelow(itemid) {
		_cursor = getCursor(itemid);

		moveCursorNextRow(true);

		return _cursor.itemid;
	}

	function moveCursorNextRow(isBelow) {
		var cursorItemRect = _treeLevels.getItemContext(_cursor.itemid);
		var cursorCenter = cursorItemRect.horizontalCenter();
		var previousCursorItem = _cursor.itemid;
		_treeLevels.loopLevelsFromItem(this, _cursor.itemid, isBelow, function (levelIndex) {
			_cursor.row = levelIndex;
			_cursor.itemid = _treeLevels.binarySearch(this, levelIndex, function (itemid, placement) {
				return cursorCenter - placement.horizontalCenter();
			});
			return true;
		});
		if (previousCursorItem == _cursor.itemid) {
			if (isBelow) {
				_cursor.row = _treeLevels.getEndLevelIndex(_cursor.itemid);
			} else {
				_cursor.row = _treeLevels.getLevelIndex(_cursor.itemid);
			}
		}
	}

	function getItemOnLeft(itemid) {
		_cursor = getCursor(itemid);

		var nextItem = _treeLevels.getPrevItem(_cursor.itemid, _cursor.row);
		if (nextItem != null) {
			_cursor.itemid = nextItem;
		}
		return _cursor.itemid;
	}

	function getItemOnRight(itemid) {
		_cursor = getCursor(itemid);

		var nextItem = _treeLevels.getNextItem(_cursor.itemid, _cursor.row);
		if(nextItem != null) {
			_cursor.itemid =  nextItem;
		}
		return _cursor.itemid;
	}

	function getNavigationLevels() {
		prepair();

		var result = [];
		_treeLevels.loopLevels(this, function (levelIndex, level) {
			var levelItems = [];
			_treeLevels.loopLevelItems(this, levelIndex, function (itemid, item, position) {
				levelItems.push(itemid);
			});
			result.push(levelItems);
		});
		return result;
	}

	return {
		addRect: addRect,
		prepair: prepair,
		getItemAbove: getItemAbove,
		getItemBelow: getItemBelow,
		getItemOnLeft: getItemOnLeft,
		getItemOnRight: getItemOnRight,
		getNavigationLevels: getNavigationLevels
	};
};

/* /Managers/TaskManager.js*/
primitives.common.TaskManager = function () {
	var _taskFamily = new primitives.common.family();
	var _dependencies = new primitives.common.DependencyManager();
	var _tasks = [];

	function TaskInfo(name, dependencies, factory, color) {
		this.name = name;
		this.dependencies = dependencies;
		this.factory = factory;
		this.task = null;
		this.color = color;
	}

	function addTask(taskName, taskDependencies, factory, color) {
		if (_tasks.length > 0) {
			throw "Task Manager is already initialized";
		}
		_taskFamily.add(taskDependencies, taskName, new TaskInfo(taskName, taskDependencies, factory, color));
	}

	function getTask(taskName) {
		var taskInfo = _taskFamily.node(taskName);
		return taskInfo && taskInfo.task;
	}

	function addDependency(name, dependency) {
		if (_tasks.length > 0) {
			throw "Task Manager is already initialized";
		}
		_dependencies.register(name, dependency);
	}

	function process(startTask, stopTask, debug) {
		var hasChanges = false,
			logtime = debug;
		if (_tasks.length === 0) {
			_taskFamily.loopTopo(this, function (taskName, taskInfo) {
				taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
				_tasks.push(taskInfo);
			});
		}
		if (debug) {
			console.log("-- process --");
		}
		var isRequired = {};
		for (var index = 0, len = _tasks.length; index < len; index += 1) {
			var taskInfo = _tasks[index],
				dependents = [];

			if (taskInfo.name == startTask || isRequired.hasOwnProperty(taskInfo.name)) {
				if (logtime) {
					var startAt = performance.now(); //ignore jslint
				}
				if (hasChanges = taskInfo.task.process(debug)) {
					_taskFamily.loopChildren(this, taskInfo.name, function (childTaskName, childTaskInfo) {
						isRequired[childTaskName] = true;
						if (debug) {
							dependents.push(childTaskName);
						}
						return _taskFamily.SKIP;
					});
				}
				if (logtime) {
					var endAt = performance.now(); //ignore jslint
				}
				if (debug) {
					var spentTime = Math.round((endAt - startAt), 2);
					console.log(index + ". " + taskInfo.name + (", " + spentTime + " ms. ") + (hasChanges ? " - forces: " + dependents.toString() : ""));
				}
			}
			if (taskInfo.name == stopTask) {
				return;
			}
		}
	}

	function getProcessDiagramConfig() {
		var result = new primitives.famdiagram.Config();
		if (_tasks.length === 0) {
			_taskFamily.loopTopo(this, function (taskName, taskInfo) {
				taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
				_tasks.push(taskInfo);
			});
		}
		for (var index = 0, len = _tasks.length; index < len; index += 1) {
			var taskInfo = _tasks[index];

			var itemConfig = new primitives.famdiagram.ItemConfig();
			itemConfig.id = taskInfo.name;
			itemConfig.title = primitives.common.splitCamelCaseName(taskInfo.name).join(" ");
			itemConfig.description = taskInfo.task.description || "";
			itemConfig.itemTitleColor = taskInfo.color;
			itemConfig.parents = [];

			_taskFamily.loopParents(this, taskInfo.name, function (parentTaskName, parentTaskInfo) {
				itemConfig.parents.push(parentTaskName);
				return _taskFamily.SKIP;
			});
			result.items.push(itemConfig);
		}
		return result;
	}

	return {
		addTask: addTask,
		addDependency: addDependency,
		getTask: getTask,
		process: process,
		getProcessDiagramConfig: getProcessDiagramConfig
	};
};

/* /pdf/graphics/graphics.js*/
primitives.pdf.graphics = function (doc) {
	this._doc = doc,
	this._context = this._doc;
	this._dummyPlaceholder = new primitives.common.Placeholder();
};

primitives.pdf.graphics.prototype.clean = function () {

};

primitives.pdf.graphics.prototype.resize = function (name, width, height) {

};

primitives.pdf.graphics.prototype.begin = function () {

};

primitives.pdf.graphics.prototype.end = function () {

};

primitives.pdf.graphics.prototype.reset = function (arg0, arg1) {

};

primitives.pdf.graphics.prototype.activate = function (arg0, arg1) {
	return this._dummyPlaceholder;
};

primitives.pdf.graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {

};

primitives.pdf.graphics.prototype.polylinesBuffer = function (buffer) {
	buffer.loop(this, function (polyline) {
		if (polyline.length() > 0) {
			this.polyline(polyline);
		}
	});
};

primitives.pdf.graphics.prototype.polyline = function (polylineData) {
	var placeholder = this.m_activePlaceholder,
		attr = polylineData.paletteItem.toAttr(),
		step,
		cornerRadius,
		doc = this._doc;

	doc.save();
	polylineData.loop(this, function (segment) {
		switch (segment.segmentType) {
			case 1/*primitives.common.SegmentType.Move*/:
				doc.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
				break;
			case 0/*primitives.common.SegmentType.Line*/:
				doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
				break;
			case 4/*primitives.common.SegmentType.Dot*/:
				if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
					// circle dot
					doc.roundedRect(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, segment.width, segment.height, Math.min(segment.width, segment.height) / 2.0);
				} else if (segment.cornerRadius === 0) {
					// square
					doc.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
					doc.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y) + 0.5);
					doc.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height) + 0.5);
					doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + segment.height) + 0.5);
					doc.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
				} else {
					// rounded corners rectangle
					cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
					doc.roundedRect(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, segment.width, segment.height, cornerRadius);
				}
				break;
			case 2/*primitives.common.SegmentType.QuadraticArc*/:
				doc.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
				break;
			case 3/*primitives.common.SegmentType.CubicArc*/:
				doc.bezierCurveTo(Math.round(segment.cpX1) + 0.5,
					Math.round(segment.cpY1) + 0.5,
					Math.round(segment.cpX2) + 0.5,
					Math.round(segment.cpY2) + 0.5,
					Math.round(segment.x) + 0.5,
					Math.round(segment.y) + 0.5);
				break;
		}
	});

	doc.lineJoin('round');

	if (attr.lineType != null) {
		step = Math.round(attr.lineWidth) || 1;
		switch (attr.lineType) {
			case 0/*primitives.common.LineType.Solid*/:
				break;
			case 1/*primitives.common.LineType.Dotted*/:
				doc.dash(step, step * 2);
				break;
			case 2/*primitives.common.LineType.Dashed*/:
				doc.dash(step * 5, step * 3);
				break;
		}
	}

	if (attr.lineWidth !== undefined && attr.fillColor !== undefined) {
		doc
			.lineWidth(attr.lineWidth)
			.fillOpacity(attr.opacity)
			.fillAndStroke(attr.fillColor, attr.borderColor);
	}
	else if (attr.lineWidth !== undefined) {
		doc
			.lineWidth(attr.lineWidth)
			.stroke(attr.borderColor);
	}
	else if (attr.fillColor !== undefined) {
		doc
			.fillOpacity(attr.opacity)
			.fillColor(attr.fillColor);
	}
	doc.restore();
};


primitives.pdf.graphics.prototype.rightAngleLine = function (fromX, fromY, toX, toY, attr) {

};

primitives.pdf.graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
	var gap = 0;

	if (attr !== null) {
		if (attr.borderWidth !== undefined) {
			gap = this.getPxSize(attr.borderWidth);
		}
	}

	var position = new primitives.common.Rect(x + contentx, y + contenty, contentWidth - gap, contentHeight - gap);

	if (uiHash == null) {
		uiHash = new primitives.common.RenderEventArgs();
	}

	if (onRenderTemplate !== null) {
		onRenderTemplate(this._doc, position, uiHash);
	}
};

primitives.pdf.graphics.prototype.getPxSize = function (value, base) {
	var result = value;
	if (typeof value === "string") {
		if (value.indexOf("pt") > 0) {
			result = parseInt(value, 10) * 96 / 72;
		}
		else if (value.indexOf("%") > 0) {
			result = parseFloat(value) / 100.0 * base;
		}
		else {
			result = parseInt(value, 10);
		}
	}
	return result;
};

/* /pdf/FamDiagram/Plugin.js*/
primitives.pdf.famdiagram.Plugin = function (options) {
	var _data = {
		name: "famdiagram",
		doc: null,
		options: options,
		tasks: null,
		graphics: null
	},
	_scale,
	_debug = false;

	function getOptions() {
		return _data.options;
	}

	function getGraphics() {
		return _data.graphics;
	}

	function createTaskManager() {
		var tasks = new primitives.common.TaskManager();

		// Dependencies
		tasks.addDependency('options', getOptions);
		tasks.addDependency('graphics', getGraphics);

		tasks.addDependency('defaultConfig', new primitives.famdiagram.Config());
		tasks.addDependency('defaultItemConfig', new primitives.famdiagram.ItemConfig());
		tasks.addDependency('defaultTemplateConfig', new primitives.famdiagram.TemplateConfig());
		tasks.addDependency('defaultButtonConfig', new primitives.famdiagram.ButtonConfig());
		tasks.addDependency('defaultPaletteItemConfig', new primitives.famdiagram.PaletteItemConfig());

		tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.famdiagram.BackgroundAnnotationConfig());
		tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.famdiagram.ConnectorAnnotationConfig());
		tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.famdiagram.HighlightPathAnnotationConfig());
		tasks.addDependency('defaultShapeAnnotationConfig', new primitives.famdiagram.ShapeAnnotationConfig());
		tasks.addDependency('defaultLabelAnnotationConfig', new primitives.famdiagram.LabelAnnotationConfig());

		tasks.addDependency('isFamilyChartMode', true);/* in regular org diagram we hide branch if it contains only invisible nodes, 
		in the family chart we use invisible items to draw connectors across multiple levels */
		tasks.addDependency('showElbowDots', true);/* in regular org chart we don;t have situations when connector lines cross, but we have such situations in 
		family tree so we need extra visual attribute to distinguish intersections betwen connectors */
		tasks.addDependency('null', null);
		tasks.addDependency('foreground', 2/*primitives.common.ZOrderType.Foreground*/);
		tasks.addDependency('background', 1/*primitives.common.ZOrderType.Background*/);

		// Options
		tasks.addTask('OptionsTask', ['options'], primitives.famdiagram.OptionsTask, "#000000"/*primitives.common.Colors.Black*/);

		tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.ItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('SpousesOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.SpousesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('VisualTreeOptionTask', ['OptionsTask'], primitives.famdiagram.VisualTreeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('NormalizeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NormalizeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('LinePaletteOptionTask', ['OptionsTask', 'defaultPaletteItemConfig'], primitives.famdiagram.LinePaletteOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		// Transformations
		tasks.addTask('LogicalFamilyTask', ['ItemsOptionTask'], primitives.famdiagram.LogicalFamilyTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('LabelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'LogicalFamilyTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('LabelAnnotationTemplateOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationTemplateOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('LabelAnnotationPlacementOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationPlacementOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('CombinedContextsTask', ['ItemsOptionTask', 'LabelAnnotationOptionTask'], primitives.orgdiagram.CombinedContextsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('AddLabelAnnotationsTask', ['LabelAnnotationPlacementOptionTask', 'LogicalFamilyTask'], primitives.famdiagram.AddLabelAnnotationsTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('RemoveLoopsTask', ['ItemsOptionTask', 'AddLabelAnnotationsTask'], primitives.famdiagram.RemoveLoopsTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('AddSpousesTask', ['SpousesOptionTask', 'RemoveLoopsTask'], primitives.famdiagram.AddSpousesTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('NormalizeLogicalFamilyTask', ['NormalizeOptionTask', 'AddSpousesTask', 'defaultItemConfig'], primitives.famdiagram.NormalizeLogicalFamilyTask, "#ff0000"/*primitives.common.Colors.Red*/);

		// Transformations / Templates
		tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.ReadTemplatesTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('LabelAnnotationTemplateParamsTask', ['ItemsSizesOptionTask', 'LabelAnnotationTemplateOptionTask', 'ReadTemplatesTask'], primitives.famdiagram.LabelAnnotationTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('CombinedTemplateParamsTask', ['ItemTemplateParamsTask', 'LabelAnnotationTemplateParamsTask'], primitives.famdiagram.CombinedTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.GroupTitleTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.CheckBoxTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.ButtonsTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.pdf.orgdiagram.AnnotationLabelTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'NormalizeLogicalFamilyTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Transformations/Selections
		tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], primitives.orgdiagram.HighlightItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], primitives.orgdiagram.CursorItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCombinedNormalVisibilityItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCurrentControlSizeTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask',
			'NormalizeOptionTask', 'NormalizeLogicalFamilyTask',
			'CombinedTemplateParamsTask',
			'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.famdiagram.ItemsPositionsTask, "#ff0000"/*primitives.common.Colors.Red*/);

		tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Managers
		tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'LinePaletteOptionTask'], primitives.orgdiagram.PaletteManagerTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Renders
		tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'AddLabelAnnotationsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

		tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawBackgroundConnectorAnnotationTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawConnectorsTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
			'ItemsSizesOptionTask',
			'CombinedContextsTask',
			'AlignDiagramTask', 'null',
			'CombinedTemplateParamsTask',
			'CursorItemTask', 'SelectedItemsTask',
			'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
			'DrawForegroundHighlightPathAnnotationTask'
		], primitives.orgdiagram.DrawTreeItemsTask, "#008000"/*primitives.common.Colors.Green*/);

		tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawTreeItemsTask'], primitives.orgdiagram.DrawCursorTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], primitives.orgdiagram.DrawHighlightTask, "#008000"/*primitives.common.Colors.Green*/);

		tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawHighlightTask'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

		return tasks;
	}

	function createEventArgs(data, oldTreeItemId, newTreeItemId, name) {
		var result = new primitives.famdiagram.EventArgs(),
			combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
			alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
			navigationFamilyTask = data.tasks.getTask("AddLabelAnnotationsTask"),
			oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
			newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
			navigationFamily = navigationFamilyTask.getNavigationFamily(),
			itemPosition;

		if (oldItemConfig && oldItemConfig.id != null) {
			result.oldContext = oldItemConfig;
		}

		if (newItemConfig && newItemConfig.id != null) {
			result.context = newItemConfig;

			navigationFamily.loopParents(this, newItemConfig.id, function (itemid, item, levelIndex) {
				if (levelIndex > 0) {
					return navigationFamily.BREAK;
				}
				result.parentItems.push(combinedContextsTask.getConfig(itemid));
			});

			itemPosition = alignDiagramTask.getItemPosition(newTreeItemId);
			result.position = new primitives.common.Rect(itemPosition.actualPosition);
		}

		if (name != null) {
			result.name = name;
		}

		return result;
	}

	function trigger(eventHandlerName, event, eventArgs) {
		var eventHandler = _data.options[eventHandlerName];
		if (eventHandler != null) {
			eventHandler(event, eventArgs);
		}
	}

	function _disableNotAvailableFunctionality() {
		/* disable functionality not available in PDF */
		_data.options.hasButtons = 2/*primitives.common.Enabled.False*/;
		_data.options.pageFitMode = 5/*primitives.common.PageFitMode.AutoSize*/;
		_data.options.autoSizeMaximum = new primitives.common.Size(100000, 100000);
	}

	function draw(doc, positionX, positionY) {
		_data.doc = doc;

		_data.tasks = createTaskManager(getOptions, getGraphics);
		_data.graphics = new primitives.pdf.graphics(_data.doc);
		_data.graphics.debug = _debug;

		_disableNotAvailableFunctionality();

		_data.doc.save();

		_data.doc.translate(positionX, positionY);

		_data.tasks.process('OptionsTask', null, _debug);

		_data.doc.restore();

		var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

		return new primitives.common.Size(alignDiagramTask.getContentSize());
	}

	function getSize() {
		_data.tasks = createTaskManager(getOptions, getGraphics);

		_disableNotAvailableFunctionality();

		_data.tasks.process('OptionsTask', 'AlignDiagramTask', _debug);

		var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

		return new primitives.common.Size(alignDiagramTask.getContentSize());
	}

	return {
		draw: draw,
		getSize: getSize
	};
};


/* /pdf/Models/Template.js*/
primitives.pdf.Template = function (options, templateConfig) {
	this.templateConfig = null;
	this.itemTemplate = null;
	this.highlightTemplate = null;
	this.dotHighlightTemplate = null;
	this.cursorTemplate = null;

	if (templateConfig != null) {
		this.templateConfig = templateConfig;

		this.itemTemplate = primitives.common.isNullOrEmpty(templateConfig.itemTemplate) ?
			new primitives.pdf.ItemTemplate(options, templateConfig) :
			new primitives.pdf.UserTemplate(options, templateConfig, options.onItemRender);

		this.highlightTemplate = primitives.common.isNullOrEmpty(templateConfig.highlightTemplate) ?
			new primitives.pdf.HighlightTemplate(options, templateConfig) :
			new primitives.pdf.UserTemplate(options, templateConfig, options.onHighlightRender);

		this.dotHighlightTemplate = new primitives.pdf.DummyTemplate(options, templateConfig);

		this.cursorTemplate = primitives.common.isNullOrEmpty(templateConfig.cursorTemplate) ?
			new primitives.pdf.CursorTemplate(options, templateConfig) :
			new primitives.pdf.UserTemplate(options, templateConfig, options.onCursorRender);
	}
};


/* /pdf/OrgDiagram/Tasks/Layout/DummyCurrentControlSizeTask.js*/
primitives.pdf.orgdiagram.DummyCurrentControlSizeTask = function (optionsTask) {
	function process() {
		return true;
	}

	function getScrollPanelSize() {
		return new primitives.common.Size(800, 600);
	}

	function getOptimalPanelSize() {
		return new primitives.common.Size(800 - 25, 600 - 25);
	}

	return {
		process: process,
		getScrollPanelSize: getScrollPanelSize,
		getOptimalPanelSize: getOptimalPanelSize
	};
};

/* /pdf/OrgDiagram/Tasks/Templates/AnnotationLabelTemplateTask.js*/
primitives.pdf.orgdiagram.AnnotationLabelTemplateTask = function (itemsSizesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		return false;
	}

	function getTemplate() {
		if (_data.template == null) {
			_data.template = new primitives.pdf.AnnotationLabelTemplate();
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /pdf/OrgDiagram/Tasks/Templates/ButtonsTemplateTask.js*/
primitives.pdf.orgdiagram.ButtonsTemplateTask = function (itemsSizesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		return false;
	}

	function getTemplate() {
		if (_data.template == null) {
			_data.template = new primitives.pdf.DummyTemplate();
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /pdf/OrgDiagram/Tasks/Templates/CheckboxTemplateTask.js*/
primitives.pdf.orgdiagram.CheckBoxTemplateTask = function (itemsSizesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		_data.template = null;
		return true;
	}

	function getTemplate() {
		var options;
		if (_data.template == null) {
			options = itemsSizesOptionTask.getOptions();
			_data.template = new primitives.pdf.CheckBoxTemplate(options.selectCheckBoxLabel);
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /pdf/OrgDiagram/Tasks/Templates/GroupTitleTemplateTask.js*/
primitives.pdf.orgdiagram.GroupTitleTemplateTask = function (templatesOptionTask) {
	var _data = {
		template: null
	};

	function process() {
		_data.template = null;
		return true;
	}

	function getTemplate() {
		var options;
		if (_data.template == null) {
			options = templatesOptionTask.getOptions();
			_data.template = new primitives.pdf.GroupTitleTemplate(options.itemTitleFirstFontColor, options.itemTitleSecondFontColor);
		}
		return _data.template;
	}

	return {
		process: process,
		getTemplate: getTemplate
	};
};

/* /pdf/OrgDiagram/Tasks/Templates/ReadTemplatesTask.js*/
primitives.pdf.orgdiagram.ReadTemplatesTask = function (templatesOptionTask) {
	var _data = {
		templates: {}
	},
	_defaultWidgetTemplateName = "DefaultWidgetTemplate",
	_defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

	function process() {
		var index, len,
			templateConfig,
			templatesOptions = templatesOptionTask.getOptions(),
			templates = templatesOptions.templates;


		_data.templates = {};
		_data.templates[_defaultWidgetTemplateName] = new primitives.pdf.Template(templatesOptions, new primitives.orgdiagram.TemplateConfig());

		var labelAnnotationTemplateConfig = new primitives.orgdiagram.TemplateConfig();
		labelAnnotationTemplateConfig.name = _defaultWidgetLabelAnnotationTemplateName;
		labelAnnotationTemplateConfig.isActive = false;
		labelAnnotationTemplateConfig.itemSize = new primitives.common.Size(100, 20);
		labelAnnotationTemplateConfig.minimizedItemSize = new primitives.common.Size(0, 0);

		var labelAnnotationTemplate = new primitives.pdf.Template();
		labelAnnotationTemplate.templateConfig = labelAnnotationTemplateConfig;
		labelAnnotationTemplate.minimizedItemCornerRadius = labelAnnotationTemplateConfig.minimizedItemSize.width / 2;
		labelAnnotationTemplate.itemTemplate = new primitives.pdf.LabelAnnotationTemplate();
		labelAnnotationTemplate.dotHighlightTemplate = new primitives.pdf.DummyTemplate();

		_data.templates[_defaultWidgetLabelAnnotationTemplateName] = labelAnnotationTemplate;


		for (index = 0, len = templates.length; index < len; index += 1) {
			templateConfig = templates[index];
			_data.templates[templateConfig.name] = new primitives.pdf.Template(templatesOptions, templateConfig);
		}

		return true;
	}

	function getTemplate(templateName1, templateName2, templateName3) {
		var result = _data.templates[templateName1] || _data.templates[templateName2] || _data.templates[templateName3];
		return result;
	}

	return {
		process: process,
		getTemplate: getTemplate,
		DefaultWidgetTemplateName: _defaultWidgetTemplateName,
		DefaultWidgetLabelAnnotationTemplateName: _defaultWidgetLabelAnnotationTemplateName
	};
};

/* /pdf/OrgDiagram/Tasks/Transformations/Selection/DummyCombinedNormalVisibilityItemsTask.js*/
primitives.pdf.orgdiagram.DummyCombinedNormalVisibilityItemsTask = function (optionsTask) {
	function process() {
		return true;
	}

	function isItemSelected(treeItem) {
		return false;
	}

	return {
		process: process,
		isItemSelected: isItemSelected
	};
};

/* /pdf/OrgDiagram/Plugin.js*/
primitives.pdf.orgdiagram.Plugin = function (options) {
	var _data = {
		name: "orgdiagram",
		doc: null,
		options: options,
		tasks: null,
		graphics: null
	},
	_scale,
	_debug = false;

	function getOptions() {
		return _data.options;
	}

	function getGraphics() {
		return _data.graphics;
	}

	function createTaskManager() {
		var tasks = new primitives.common.TaskManager();

		// Dependencies
		tasks.addDependency('options', getOptions);
		tasks.addDependency('graphics', getGraphics);

		tasks.addDependency('defaultConfig', new primitives.orgdiagram.Config());
		tasks.addDependency('defaultItemConfig', new primitives.orgdiagram.ItemConfig());
		tasks.addDependency('defaultTemplateConfig', new primitives.orgdiagram.TemplateConfig());
		tasks.addDependency('defaultButtonConfig', new primitives.orgdiagram.ButtonConfig());

		tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.orgdiagram.BackgroundAnnotationConfig());
		tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.orgdiagram.ConnectorAnnotationConfig());
		tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.orgdiagram.HighlightPathAnnotationConfig());
		tasks.addDependency('defaultShapeAnnotationConfig', new primitives.orgdiagram.ShapeAnnotationConfig());

		tasks.addDependency('isFamilyChartMode', false);
		tasks.addDependency('showElbowDots', false);
		tasks.addDependency('null', null);
		tasks.addDependency('foreground', 2/*primitives.common.ZOrderType.Foreground*/);
		tasks.addDependency('background', 1/*primitives.common.ZOrderType.Background*/);

		// Options
		tasks.addTask('OptionsTask', ['options'], primitives.orgdiagram.OptionsTask, "#000000"/*primitives.common.Colors.Black*/);

		tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.VisualTreeOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);
		tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, "#000080"/*primitives.common.Colors.Navy*/);

		// Transformations
		tasks.addTask('CombinedContextsTask', ['ItemsOptionTask'], primitives.orgdiagram.CombinedContextsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], primitives.orgdiagram.OrgTreeTask, "#ff0000"/*primitives.common.Colors.Red*/);

		// Transformations / Templates
		tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.ReadTemplatesTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		// TODO: Add jsPDF templates
		tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.GroupTitleTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.CheckBoxTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.ButtonsTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.pdf.orgdiagram.AnnotationLabelTemplateTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'null', 'VisualTreeOptionTask', 'isFamilyChartMode'], primitives.orgdiagram.VisualTreeTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], primitives.orgdiagram.VisualTreeLevelsTask, "#ff0000"/*primitives.common.Colors.Red*/);

		tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Transformations/Selections
		tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], primitives.orgdiagram.HighlightItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], primitives.orgdiagram.CursorItemTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCombinedNormalVisibilityItemsTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCurrentControlSizeTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
			'VisualTreeTask', 'VisualTreeLevelsTask',
			'ItemTemplateParamsTask',
			'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.orgdiagram.ItemsPositionsTask, "#ff0000"/*primitives.common.Colors.Red*/);

		tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, "#ff0000"/*primitives.common.Colors.Red*/);
		tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Managers
		tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], primitives.orgdiagram.PaletteManagerTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		// Renders
		tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask' /*dummy dependency enforeces drawing order */], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);

		tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
			'ItemsSizesOptionTask',
			'CombinedContextsTask',
			'AlignDiagramTask', 'null',
			'ItemTemplateParamsTask',
			'CursorItemTask', 'SelectedItemsTask',
			'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
			'DrawBackgroundConnectorAnnotationTask'
		], primitives.orgdiagram.DrawTreeItemsTask, "#008000"/*primitives.common.Colors.Green*/);

		tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawTreeItemsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);
		tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawConnectorsTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, "#00ffff"/*primitives.common.Colors.Cyan*/);

		tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawShapeAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, "#008000"/*primitives.common.Colors.Green*/);


		tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawForegroundConnectorAnnotationTask'], primitives.orgdiagram.DrawCursorTask, "#008000"/*primitives.common.Colors.Green*/);
		tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], primitives.orgdiagram.DrawHighlightTask, "#008000"/*primitives.common.Colors.Green*/);

		return tasks;
	}

	function createEventArgs(data, oldTreeItemId, newTreeItemId, name) {
		var result = new primitives.orgdiagram.EventArgs(),
			combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
			alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
			oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
			newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
			itemPosition,
			actualPosition;

		if (oldItemConfig && oldItemConfig.id != null) {
			result.oldContext = oldItemConfig;
		}

		if (newItemConfig && newItemConfig.id != null) {
			result.context = newItemConfig;

			if (newItemConfig.parent !== null) {
				result.parentItem = combinedContextsTask.getConfig(newItemConfig.parent);
			}

			itemPosition = alignDiagramTask.getItemPosition(newTreeItemId),
			result.position = new primitives.common.Rect(itemPosition.actualPosition);
		}

		if (name != null) {
			result.name = name;
		}

		return result;
	}

	function trigger(eventHandlerName, event, eventArgs) {
		var eventHandler = _data.options[eventHandlerName];
		if (eventHandler != null) {
			eventHandler(event, eventArgs);
		}
	}

	function _disableNotAvailableFunctionality() {
		/* disable functionality not available in PDF */
		_data.options.hasButtons = 2/*primitives.common.Enabled.False*/;
		_data.options.pageFitMode = 5/*primitives.common.PageFitMode.AutoSize*/;
		_data.options.autoSizeMaximum = new primitives.common.Size(100000, 100000);
	}

	function draw(doc, positionX, positionY) {
		_data.doc = doc;

		_data.tasks = createTaskManager(getOptions, getGraphics);
		_data.graphics = new primitives.pdf.graphics(_data.doc);
		_data.graphics.debug = _debug;

		_disableNotAvailableFunctionality();

		_data.doc.save();

		_data.doc.translate(positionX, positionY);

		_data.tasks.process('OptionsTask', null, _debug);

		_data.doc.restore();

		var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

		return new primitives.common.Size(alignDiagramTask.getContentSize());
	}

	function getSize() {
		_data.tasks = createTaskManager(getOptions, getGraphics);

		_disableNotAvailableFunctionality();

		_data.tasks.process('OptionsTask', 'AlignDiagramTask', _debug);

		var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

		return new primitives.common.Size(alignDiagramTask.getContentSize());
	}

	return {
		draw: draw,
		getSize: getSize
	};
};


/* /pdf/Templates/AnnotationLabelTemplate.js*/
/* jshint latedef: true, unused: false */
primitives.pdf.AnnotationLabelTemplate = function () {
	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		var annotationConfig = data.context;

		doc.save();

		doc.font('Helvetica', 12)
			.text(annotationConfig.label, position.x, position.y, {
				width: position.width,
				height: position.height,
				align: 'center'
			});

		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/CheckBoxTemplate.js*/
primitives.pdf.CheckBoxTemplate = function (selectCheckBoxLabel) {
	var _checked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAF/SURBVDhPpZM7rwFREMf/u4hEY5vVkigoSERiKwq1QqOh28R30QnFRqnSKHwFn0C37Sbi0SCE2KzE41wzd/feG48g91ftmdn5zznzkLLZrNhutzidTvgEv98PRVEgxeNx0e12EYvFcDweXfdjZFmGEIKDx+MxdF0HotGomEwmV/tnUAzFyqT8KrNHLpdDJpPBZrPh81UHLPAO7XYb6/Ua8/kcpmnC5/NBkqT3BJbLJRqNBgKBACqVCgqFAg6HA/veEiiVSlBVFZfLBZ1Ox7V+81KAMtPVV6sV+v2+a/2FBeg9RDqdhqZp/E1Mp1O0Wi32V6tVLuAtLEBvGw6HmM1m2O/3yOfz7CyXy4hEItz3ZrPJtr/8dIEKUiwWYRgGX3e32yGZTOJ8PnMBB4MBB9xy14VarcaZFosFQqEQHMdBvV5HIpFw/3gATZNlWTxdHr1eT4TDYZFKpVzLPRRDsU9HeTQaCdu23dM91wKzwNNlCgaDXINHW0pF95bpn+us4AsY2TIOZFyZ9AAAAABJRU5ErkJggg==',
		_unchecked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACjSURBVDhPrZNNCsQgDEY/f2q33sCCN+iNPJlXE2/gTtDiVBln1TJo+zZBJS+YELLvewkhIOeMETjnkFKCaK2LtRbbtiGl9H2+hlKKUkpLds7BGAMopYr3/rwfo+bUXFrN/yrfcXrQBDMwxkAImRfEGFucFnTeEdT/zNIEy7K0wyi/KfSGjPJoCp13BDM9EEK0eLtM67riOI7LLa0F+zI9XGeJDyTldfBA9FNyAAAAAElFTkSuQmCC';

	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		var image = data.isSelected ? _checked : _unchecked;

		doc.save();

		/* photo */
		doc.image(image, position.x, position.y);

		doc.font('Helvetica', 11)
			.text(selectCheckBoxLabel, position.x + 20, position.y + 4, {
				ellipsis: true,
				width: (position.width - 4),
				height: position.height,
				align: 'left'
			});

		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/CursorTemplate.js*/
primitives.pdf.CursorTemplate = function (options, itemTemplateConfig) {
	var _config = itemTemplateConfig;

	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		doc.save();

		/* item border */
		doc.roundedRect(position.x, position.y, position.width, position.height, 4)
			.lineWidth(_config.cursorBorderWidth)
			.stroke('#fbd850');

		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/DummyTemplate.js*/
primitives.pdf.DummyTemplate = function () {
	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render() {}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/GroupTitleTemplate.js*/
primitives.pdf.GroupTitleTemplate = function (itemTitleFirstFontColor, itemTitleSecondFontColor ) {
	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		var itemConfig = data.context,
			groupTitleColor = itemConfig.groupTitleColor || "#4169e1"/*primitives.common.Colors.RoyalBlue*/,
			color = primitives.common.highestContrast(groupTitleColor, itemTitleSecondFontColor, itemTitleFirstFontColor);

		/* title background */
		doc.save();
		doc.translate(position.width, 0)
			.rotate(90, {
			origin: [position.x, position.y]
		});
		doc.fillColor(groupTitleColor)
			.roundedRect(position.x, position.y, position.height - 2, position.width, 4)
			.fill();

		/* title */
		doc.fillColor(color)
			.font('Helvetica', 12)
			.text(itemConfig.groupTitle, position.x + 4, position.y + 6, {
				ellipsis: true,
				width: (position.height - 4),
				height: position.width - 4,
				align: 'center'
			});
		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};



/* /pdf/Templates/HighlightTemplate.js*/
primitives.pdf.HighlightTemplate = function (options, itemTemplateConfig) {
	var _config = itemTemplateConfig;

	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		doc.save();

		/* border */
		doc.roundedRect(position.x, position.y, position.width, position.height, 4)
			.lineWidth(_config.highlightBorderWidth)
			.stroke('#fbcb09');

		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/ItemTemplate.js*/
primitives.pdf.ItemTemplate = function (options, itemTemplateConfig) {
	var _config = itemTemplateConfig;

	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		var itemConfig = data.context,
			itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : "#4169e1"/*primitives.common.Colors.RoyalBlue*/,
			color = primitives.common.highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor),
			contentSize = new primitives.common.Size(_config.itemSize);

		contentSize.width -= _config.itemBorderWidth * 2;
		contentSize.height -= _config.itemBorderWidth * 2;

		doc.save();

		/* item border */
		doc.roundedRect(position.x, position.y, position.width, position.height, 4)
			.lineWidth(_config.itemBorderWidth)
			.stroke('#dddddd');

		/* title background */
		doc.fillColor(itemTitleColor)
			.roundedRect(position.x + 2, position.y + 2, (contentSize.width - 4), 18, 2)
			.fill();
		
		/* title */
		doc.fillColor(color)
			.font('Helvetica', 12)
			.text(itemConfig.title, position.x + 4, position.y + 7, {
				ellipsis: true,
				width: (contentSize.width - 4 - 4 * 2),
				height: 16,
				align: 'left'
			});

		/* photo */
		if (itemConfig.image != null) {
			doc.image(itemConfig.image, position.x + 3, position.y + 24);
		}
		/* photo frame */
		doc.rect(position.x + 3, position.y + 24, 50, 60)
			.stroke('#cccccc');

		/* description */
		doc.fillColor('black')
			.font('Helvetica', 10)
			.text(itemConfig.description, position.x + 56, position.y + 24, {
				ellipsis: true,
				width: (contentSize.width - 4 - 56),
				height: 74,
				align: 'left'
			});
		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/LabelAnnotationTemplate.js*/
primitives.pdf.LabelAnnotationTemplate = function () {
	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		var itemConfig = data.context;

		doc.save();

		doc.font('Helvetica', 12)
			.text(itemConfig.title, position.x, position.y, {
				width: position.width,
				height: position.height,
				align: 'center'
			});

		doc.restore();
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

/* /pdf/Templates/UserTemplate.js*/
primitives.pdf.UserTemplate = function (options, itemTemplateConfig, onRender) {
	function template() {
		return {};
	}

	function getHashCode() {
		return 0;
	}

	function render(doc, position, data) {
		if (onRender != null) {
			onRender(doc, position, data);
		} else {
			var itemTemplate = primitives.pdf.ItemTemplate(options, itemTemplateConfig);
			itemTemplate.render(doc, position, data);
		}
	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};

return primitives;
}));