import { OrientationType } from '../enums';
import Thickness from './structs/Thickness';

export default function Transform() {
  this.invertArea = false;
  this.invertHorizontally = false;
  this.invertVertically = false;

  this.size = null;
};

Transform.prototype.setOrientation = function (orientationType) {
  switch (orientationType) {
    case OrientationType.Top:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case OrientationType.Bottom:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = true;
      break;
    case OrientationType.Left:
      this.invertArea = true;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case OrientationType.Right:
      this.invertArea = true;
      this.invertHorizontally = true;
      this.invertVertically = false;
      break;
  }
};

Transform.prototype.getOrientation = function (orientationType) {
  var result = orientationType;
  if (this.invertHorizontally) {
    switch (orientationType) {
      case OrientationType.Left:
        result = OrientationType.Right;
        break;
      case OrientationType.Right:
        result = OrientationType.Left;
        break;
    }
  }

  if (this.invertVertically) {
    switch (orientationType) {
      case OrientationType.Top:
        result = OrientationType.Bottom;
        break;
      case OrientationType.Bottom:
        result = OrientationType.Top;
        break;
    }
  }


  if (this.invertArea) {
    switch (result) {
      case OrientationType.Top:
        result = OrientationType.Left;
        break;
      case OrientationType.Bottom:
        result = OrientationType.Right;
        break;
      case OrientationType.Left:
        result = OrientationType.Top;
        break;
      case OrientationType.Right:
        result = OrientationType.Bottom;
        break;
    }
  }

  return result;
};

Transform.prototype.transformPoint = function (x, y, forward, self, func) {
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

Transform.prototype.transformPoints = function (x, y, x2, y2, forward, self, func) {
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

Transform.prototype.transform3Points = function (x, y, x2, y2, x3, y3, forward, self, func) {
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

Transform.prototype.transformRect = function (x, y, width, height, forward, self, func) {
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

Transform.prototype.transformThickness = function (thickness, forward) {
  var value,
    {left, right, top, bottom } = thickness;

  if (forward) {
    if (this.invertArea) {
      value = left;
      left = top;
      top = value;
      value = right;
      right = bottom;
      bottom = value;
    }
  }

  if (this.invertHorizontally) {
    value = left;
    left = right;
    right = value;
  }
  if (this.invertVertically) {
    value = top;
    top = bottom;
    bottom = value;
  }

  if (!forward) {
    if (this.invertArea) {
      value = left;
      left = top;
      top = value;
      value = right;
      right = bottom;
      bottom = value;
    }
  }

  return new Thickness(left, top, right, bottom);
};
