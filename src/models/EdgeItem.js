export default function EdgeItem(key0, val0, key1, val1) {
  this.values = [val0, val1];
  this[key0] = 0;
  this[key1] = 1;
};

EdgeItem.prototype.getNear = function (key) {
  return this.values[this[key]];
};

EdgeItem.prototype.getFar = function (key) {
  return this.values[Math.abs(this[key] - 1)];
};

EdgeItem.prototype.setNear = function (key, value) {
  this.values[this[key]] = value;
};

EdgeItem.prototype.setFar = function (key, value) {
  this.values[Math.abs(this[key] - 1)] = value;
};

EdgeItem.prototype.toString = function () {
  return this.parent + ',' + this.child;
};