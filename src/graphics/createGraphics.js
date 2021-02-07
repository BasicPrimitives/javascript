import SvgGraphics from './SvgGraphics';

/**
 * Checks if browser is Chrome.
 * 
 * @returns {boolean} Returns true if browser is chrome.
 * @ignore
 */
export function isChrome () {
    if (navigator != null) { //ignore jslint
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); //ignore jslint
    }
    return false;
};

/**
 * Creates graphics object for chart rendering
 * 
 * @param {object} element Reference to dom element the graphics object is created for
 * @returns {Graphics} Returns graphics object
 * @ignore
 */
export default function createGraphics(element) {
    return new SvgGraphics(element);
};