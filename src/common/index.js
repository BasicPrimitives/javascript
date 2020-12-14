/**
 * Indicates whether the specified number is even or not.
 * 
 * @param {number} value The number to test.
 * @returns {boolean} Returns true if the value is even.
 * @ignore
 */
export function isEven(value) {
    return value % 2 == 0;
};
  
/**
 * Indicates whether the specified string is null or an Empty string.
 * 
 * @ignore
 * @param {string} value The string to test.
 * @returns {boolean} Returns true if the value is null or an empty string(""); otherwise, false.
 */
export function isNullOrEmpty(value) {
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
export function loop(thisArg, items, onItem) {
var key, index, len;
if (onItem != null) {
    if (Array.isArray(items)) {
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
export function splitCamelCaseName(name) {
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
export function isObject(item) {
    return item !== null && typeof item == 'object';
};

/**
 * Indicates whether the specified object is empty.
 * 
 * @param {string} item The object to test.
 * @returns {boolean} Returns true if the item is empty object otherwise, false.
 * @ignore
 */
export function isEmptyObject(item) {
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
export function cloneObject(source, isShallow) {
    var result;
    if (source === null) {
        result = null;
    } else if (Array.isArray(source)) {
        if (isShallow) {
        result = source.slice(0);
        } else {
        result = [];
        for (var index = 0, len = source.length; index < len; index += 1) {
            result.push(cloneObject(source[index], isShallow));
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
                result[property] = cloneObject(source[property], isShallow);
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
export function mergeObjects(destination, source) {
    for (var index = 1; index < arguments.length; index += 1) {
        var src = arguments[index];
        if (src !== undefined) {
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
export function getHashCode(value) {
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
export function compareArrays(array1, array2, getKeyFunc) {
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