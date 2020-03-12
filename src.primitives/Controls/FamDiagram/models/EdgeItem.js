primitives.famdiagram.EdgeItem = function (key0, val0, key1, val1) {
  this.values = [val0, val1];
  this[key0] = 0;
  this[key1] = 1;
};

primitives.famdiagram.EdgeItem.prototype.getNear = function (key) {
  return this.values[this[key]];
};

primitives.famdiagram.EdgeItem.prototype.getFar = function (key) {
  return this.values[Math.abs(this[key] - 1)];
};

primitives.famdiagram.EdgeItem.prototype.setNear = function (key, value) {
  this.values[this[key]] = value;
};

primitives.famdiagram.EdgeItem.prototype.setFar = function (key, value) {
  this.values[Math.abs(this[key] - 1)] = value;
};

primitives.famdiagram.EdgeItem.prototype.toString = function () {
  return this.parent + ',' + this.child;
};