export default function ValueReader(acceptedTypes, isNullable, defaultValue) {
  this.acceptedTypes = acceptedTypes;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;

  this.hash = {};

  /* collect valid enumeration values */
  for (var index = 0; index < acceptedTypes.length; index += 1) {
    var acceptedType = acceptedTypes[index];
    this.hash[acceptedType] = true;
  }
};

ValueReader.prototype.stringify = function (target) {
  if (this.hash["object"] == true) {
    var processed = [];
    var result = JSON.stringify(target, function (key, value) {
      if (key[0] === '_') {
        return null;
      }
      if (value !== null && typeof value == "object") {
        if (processed.indexOf(value) == -1) {
          processed.push(value);
          return value;
        }
        return null;
      }
      return value;
    });
    return result;
  }
  return target;
}

ValueReader.prototype.read = function (target, source, path, context) {
  var result = null;

  if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(typeof source)) {
    source = this.isNullable ? null : this.defaultValue;
  }

  result = source;

  if (this.stringify(target) !== this.stringify(source)) {
    context.isChanged = true;
  }

  return result;
};