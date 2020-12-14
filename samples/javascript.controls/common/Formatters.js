import Thickness from '../../../src/graphics/structs/Thickness';
import Size from '../../../src/graphics/structs/Size';

export function IntegerFormatter(value) {
    return parseInt(value, 10);
};
  
export function StringFormatter(value) {
    return value != null ? value.toString() : value;
};
  
export function NumberFormatter(value) {
    return parseFloat(value, 10);
};

export function BooleanFormatter(value) {
    var stringValue = value.toString().toLowerCase();
    return stringValue == "true" || stringValue == "1";
};

export function SizeFormatter(arg0, arg1) {
    var result = null,
        value,
        width, height;
    switch (arguments.length) {
        case 1:
        value = parseFloat(arg0, 10);
        result = new Size(value, value);
        break;
        case 2:
        width = parseFloat(arg0, 10);
        height = parseFloat(arg1, 10);
        result = new Size(width, height);
        break;
    }
    return result;
};

export function ThicknessFormatter(value) {
    value = parseFloat(value, 10);
    return new Thickness(value, value, value, value);
};