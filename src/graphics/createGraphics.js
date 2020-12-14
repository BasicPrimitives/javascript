import { GraphicsType } from '../enums';
import SvgGraphics from './SvgGraphics';
import CanvasGraphics from './CanvasGraphics';

let _supportsSVG = null;

/**
 * Checks if browser supports HTML SVG graphics.
 * 
 * @returns {boolean} Returns true if browser supports SVG canvas graphics.
 * @ignore
 */
export function supportsSVG() {
    if (_supportsSVG === null) {
        _supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ||
        document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
    }
    return _supportsSVG;
};

let _supportsCanvas = null;

/**
 * Checks if browser supports HTML Canvas graphics.
 * 
 * @ignore
 * @returns {boolean} Returns true if browser supports HTML canvas graphics.
 */
export function supportsCanvas() {
    if (_supportsCanvas === null) {
        _supportsCanvas = !!window.HTMLCanvasElement;
    }
    return _supportsCanvas;
};

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
 * @param {GraphicsType} preferred Preferred graphics type by user
 * @param {object} element Reference to dom element the graphics object is created for
 * @returns {Graphics} Returns graphics object
 * @ignore
 */
export default function createGraphics(preferred, element) {
    var result = null,
        modes,
        key,
        index;

    modes = [preferred];
    for (key in GraphicsType) {
        if (GraphicsType.hasOwnProperty(key)) {
        modes.push(GraphicsType[key]);
        }
    }
    for (index = 0; result === null && index < modes.length; index += 1) {
        switch (modes[index]) {
        case GraphicsType.SVG:
            if (supportsSVG()) {

                result = new SvgGraphics(element);
            }
            break;
        case GraphicsType.Canvas:
            if (supportsCanvas()) {
                result = new CanvasGraphics(element);
            }
            break;
        }
    }
    return result;
};