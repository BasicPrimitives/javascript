primitives.common.FunctionReader = function () {

};

primitives.common.FunctionReader.prototype.read = function (target, source, path, context) {
  var result = null;

  result = (typeof source == "function") ? source : null;

  return result;
};
