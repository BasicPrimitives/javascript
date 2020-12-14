export default function Slot(itemid) {
  this.itemId = itemid; /* if itemId is null then this slot is empty */
  this.position = null;
  this.balance = 0;

  this.left = {}; /* total number of children at the level on the left side of this slot */
  this.right = {}; /* total number of children at the level on the right side of this slot */
  this.crossings = {}; /* number of connections crossing this slot from side to side at the level */
};

Slot.prototype.clone = function (itemid) {
  var result = new Slot(itemid),
    level;

  for (level in this.left) {
    if (this.left.hasOwnProperty(level)) {
      result.left[level] = this.left[level];
    }
  }
  for (level in this.right) {
    if (this.right.hasOwnProperty(level)) {
      result.right[level] = this.right[level];
    }
  }
  for (level in this.crossings) {
    if (this.crossings.hasOwnProperty(level)) {
      result.crossings[level] = this.crossings[level];
    }
  }

  result.itemid = itemid;
  return result;
};