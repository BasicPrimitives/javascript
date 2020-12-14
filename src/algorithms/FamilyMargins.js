export default function FamilyMargins() {
  this.items = [];

  function Margin(left, right, leftIndex, rightIndex) {
    this.left = left;
    this.right = right;
    this.leftIndex = leftIndex;
    this.rightIndex = rightIndex;
  }

  this.add = function (arg0, arg1, arg2, arg3) {
    switch (arguments.length) {
      case 2:
        this.items.push(new Margin(-arg0 / 2, arg0 / 2, arg1, arg1));
        break;
      case 4:
        this.items.push(new Margin(arg0, arg1, arg2, arg3));
        break;
    }
  };

  this.merge = function (from, interval) {
    var distance = this.getDistanceTo(from);
    var leftOffset = 0;
    var rightOffset = 0;

    var len1 = this.items.length;
    var len2 = from.items.length;
    var min = Math.min(len1, len2);
    var max = Math.max(len1, len2);

    for (var index = 0; index < min; index += 1) {
      var leftMargin = this.items[len1 - 1 - index];
      var rightMargin = from.items[len2 - 1 - index];

      if (index === 0) {
        var width = (leftMargin.right - leftMargin.left + (distance || 0) + (interval || 0) + rightMargin.right - rightMargin.left);
        leftOffset = width / 2 + leftMargin.left;
        rightOffset = width / 2 - rightMargin.right;
      }
      leftMargin.left -= leftOffset;
      leftMargin.right = rightMargin.right + rightOffset;

      leftMargin.rightIndex = rightMargin.rightIndex;

      this.items[max - 1 - index] = leftMargin;
    }
    for (index = min; index < max; index += 1) {
      leftMargin = this.items[len1 - 1 - index];
      rightMargin = from.items[len2 - 1 - index];

      if (leftMargin == null) {
        this.items[max - 1 - index] = new Margin(rightMargin.left + rightOffset, rightMargin.right + rightOffset,
          rightMargin.leftIndex, rightMargin.rightIndex);
      } else {
        leftMargin.left -= leftOffset;
        leftMargin.right -= leftOffset;
      }

    }
    return distance;
  };

  this.attach = function (from, interval) {
    var distance = this.getDistanceTo(from);
    var rightOffset = interval || 0;

    var len1 = this.items.length;
    var len2 = from.items.length;
    var min = Math.min(len1, len2);
    var max = Math.max(len1, len2);

    for (var index = 0; index < min; index += 1) {
      var leftMargin = this.items[len1 - 1 - index];
      var rightMargin = from.items[len2 - 1 - index];

      if (index === 0) {
        rightOffset = (leftMargin.right + (distance || 0) + (interval || 0) - rightMargin.left);
      }
      leftMargin.right = rightMargin.right + rightOffset;

      leftMargin.rightIndex = rightMargin.rightIndex;

      this.items[max - 1 - index] = leftMargin;
    }
    for (index = min; index < max; index += 1) {
      leftMargin = this.items[len1 - 1 - index];
      if (leftMargin == null) {
        rightMargin = from.items[len2 - 1 - index];

        this.items[max - 1 - index] = new Margin(rightMargin.left + rightOffset, rightMargin.right + rightOffset,
          rightMargin.leftIndex, rightMargin.rightIndex);
      }
    }
    return distance;
  };

  this.getDistanceTo = function (to) {
    var distance = null;
    var baseDistance = 0;
    var len1 = this.items.length;
    var len2 = to.items.length;
    var len = Math.min(len1, len2);
    if (len > 0) {
      for (var index = 0; index < len; index += 1) {
        var leftMargins = this.items[len1 - 1 - index];
        var rightMargins = to.items[len2 - 1 - index];


        if (index === 0) {
          baseDistance = leftMargins.right - rightMargins.left;
          distance = baseDistance;
        } else {
          if (leftMargins.rightIndex < rightMargins.leftIndex) {
            distance = Math.max(distance, leftMargins.right - rightMargins.left);
          }
        }
      }
      distance = distance - baseDistance;
    }

    return distance;
  };

  this.loop = function (thisArg, onItem) {
    if (onItem != null) {
      for (var index = 0, len = this.items.length; index < len; index += 1) {
        var margin = this.items[len - 1 - index];
        if (onItem.call(thisArg, index, margin.left, margin.right, margin.leftIndex, margin.rightIndex)) {
          break;
        }
      }
    }
  };

  this.getLeft = function (level) {
    var maximum = this.items.length - 1;
    if (maximum >= level) {
      return this.items[maximum - level].left;
    }
  };
};