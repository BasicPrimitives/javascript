import { Colors } from '../enums';

let ColorHexs;

/**
 * Converts color string into HEX color string.
 * 
 * @param {string} color Regular HTML color string.
 * @returns {string} Returns color value in form of HEX string.
 */
export function getColorHexValue(color) {
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
    if (ColorHexs === undefined) {
        ColorHexs = {};
        colorIndex = 0;
        for (colorKey in Colors) {
            if (Colors.hasOwnProperty(colorKey)) {
                ColorHexs[colorKey.toUpperCase()] = Colors[colorKey];
                colorIndex += 1;
            }
        }
    }

    return ColorHexs[color.toUpperCase()];
};

let ColorNames;

/**
 * Converts color string into HTML color name string or return hex color string.
 * 
 * @param {string} color Regular HTML color string
 * @returns {string} Returns HTML Color name or HEX string.
 */
export function getColorName(color) {
    var colorIndex,
        colorKey;
    color = getColorHexValue(color);

    if (ColorNames === undefined) {
        ColorNames = {};
        colorIndex = 0;
        for (colorKey in Colors) {
        if (Colors.hasOwnProperty(colorKey)) {
            ColorNames[Colors[colorKey]] = colorKey;
            colorIndex += 1;
        }
        }
    }

    return ColorNames[color];
};

/**
 * Gets red value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns red value of the HEX color string. 
 */
export function getRed(color) {
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
export function getGreen(color) {
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
export function getBlue(color) {
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
export function beforeOpacity(color, opacity) {
    var red,
        green,
        blue,
        rgb;
    color = getColorHexValue(color);

    red = Math.ceil((getRed(color) - (1.0 - opacity) * 255.0) / opacity);
    green = Math.ceil((getGreen(color) - (1.0 - opacity) * 255.0) / opacity);
    blue = Math.ceil((getBlue(color) - (1.0 - opacity) * 255.0) / opacity);

    /*ignore jslint start*/
    rgb = ((red << 16) | (green << 8) | blue).toString(16);
    /*ignore jslint end*/
    return '#' + "000000".substr(0, 6 - rgb.length) + rgb;
};

const highestContrasts = {};

/**
 * Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.
 * 
 * @param {string} baseColor Base color to compare with
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 * 
 * @returns {string} Returns highest contrast color compared to base color.
 */
export function highestContrast(baseColor, firstColor, secondColor) {
    var result = firstColor,
        key = baseColor + "," + firstColor + "," + secondColor;

    if (highestContrasts.hasOwnProperty(key)) {
        result = highestContrasts[key];
    } else {
        if (luminosity(firstColor, baseColor) < luminosity(secondColor, baseColor)) {
            result = secondColor;
        }
        highestContrasts[key] = result;
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
export function luminosity(firstColor, secondColor) {
    var result,
        first = getColorHexValue(firstColor),
        second = getColorHexValue(secondColor),
        firstLuminosity =
        0.2126 * Math.pow(getRed(first) / 255.0, 2.2) +
        0.7152 * Math.pow(getRed(first) / 255.0, 2.2) +
        0.0722 * Math.pow(getRed(first) / 255.0, 2.2),
        secondLuminosity =
        0.2126 * Math.pow(getRed(second) / 255.0, 2.2) +
        0.7152 * Math.pow(getRed(second) / 255.0, 2.2) +
        0.0722 * Math.pow(getRed(second) / 255.0, 2.2);

    if (firstLuminosity > secondLuminosity) {
        result = (firstLuminosity + 0.05) / (secondLuminosity + 0.05);
    }
    else {
        result = (secondLuminosity + 0.05) / (firstLuminosity + 0.05);
    }

    return result;
};