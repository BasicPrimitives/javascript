primitives.common.Transform = function () {
  this.invertArea = false;
  this.invertHorizontally = false;
  this.invertVertically = false;

  this.size = null;
};

primitives.common.Transform.prototype.setOrientation = function (orientationType) {
  switch (orientationType) {
    case primitives.common.OrientationType.Top:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case primitives.common.OrientationType.Bottom:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = true;
      break;
    case primitives.common.OrientationType.Left:
      this.invertArea = true;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case primitives.common.OrientationType.Right:
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
      case primitives.common.OrientationType.Left:
        result = primitives.common.OrientationType.Right;
        break;
      case primitives.common.OrientationType.Right:
        result = primitives.common.OrientationType.Left;
        break;
    }
  }

  if (this.invertVertically) {
    switch (orientationType) {
      case primitives.common.OrientationType.Top:
        result = primitives.common.OrientationType.Bottom;
        break;
      case primitives.common.OrientationType.Bottom:
        result = primitives.common.OrientationType.Top;
        break;
    }
  }


  if (this.invertArea) {
    switch (result) {
      case primitives.common.OrientationType.Top:
        result = primitives.common.OrientationType.Left;
        break;
      case primitives.common.OrientationType.Bottom:
        result = primitives.common.OrientationType.Right;
        break;
      case primitives.common.OrientationType.Left:
        result = primitives.common.OrientationType.Top;
        break;
      case primitives.common.OrientationType.Right:
        result = primitives.common.OrientationType.Bottom;
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
