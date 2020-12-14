export default function EnumerationReader(enumeration, isNullable, defaultValue) {
  this.enumeration = enumeration;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;

  this.hash = {};

  /* collect valid enumeration values */
  for (var key in enumeration) {
    this.hash[enumeration[key]] = key;
  }
};

EnumerationReader.prototype.read = function (target, source, path, context) {
  var result = null;

  if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(source)) {
    source = this.isNullable ? null : this.defaultValue;
  }

  result = source;

  if (target !== source) {
    context.isChanged = true;
  }

  return result;
};
