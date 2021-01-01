import Size from './structs/Size';

export function getElementsByName(thisArg, parent, name, onNode) {
  var nodes = parent.getElementsByTagName("*");
  for (var index = 0; index < nodes.length; index += 1) {
    var node = nodes[index];
    if (node.name == name) {
      onNode.call(thisArg, node);
    }
  }
};

export function getFixOfPixelAlignment(element) {
  var elementClientRectangle = element.getBoundingClientRect(),
    top = elementClientRectangle.top + document.body.scrollTop,
    left = elementClientRectangle.left + document.body.scrollLeft;
  return new Size(-left + Math.floor(left), -top + Math.floor(top));
};

export function getElementOffset(element) {
  var rect = element.getBoundingClientRect();
  var ownerDocument = element.ownerDocument;
  var documentElement = ownerDocument.documentElement;

  return {
    top: rect.top + window.pageYOffset - documentElement.clientTop,
    left: rect.left + window.pageXOffset - documentElement.clientLeft
  };
};

export function hasClass(element, className) {
  var classNames = element.className;
  if (classNames != null && typeof classNames == "string") {
    var list = classNames.split(" ");
    for (var index = 0; index < list.length; index += 1) {
      if (list[index] == className) {
        return true;
      }
    }
  }
  return false;
};

/**
 * This method uses various approaches used in different browsers to stop event propagation.
 * @param {object} event Event to be stopped
 * @ignore
 */
export function stopPropagation(event) {
  if (event.stopPropagation !== undefined) {
    event.stopPropagation();
  } else if (event.cancelBubble !== undefined) {
    event.cancelBubble = true;
  } else if (event.preventDefault !== undefined) {
    event.preventDefault();
  }
};

export function getInnerSize(element) {
  var size = window.getComputedStyle(element);

  return new Size(parseInt(size.width, 10), parseInt(size.height, 10));
};