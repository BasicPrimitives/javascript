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