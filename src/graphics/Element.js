export default function Element(arg0, arg1) {
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

Element.prototype.setAttribute = function (key, value) {
  this.attr[key] = value;
};

Element.prototype.appendChild = function (child) {
  this.children[this.children.length] = child;
};

Element.prototype.create = function (ie8mode) {
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

Element.prototype.update = function (target, ie8mode) {
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