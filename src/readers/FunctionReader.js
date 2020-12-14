export default function FunctionReader() {

};

FunctionReader.prototype.read = function (target, source, path, context) {
  var result = null;

  result = (typeof source == "function") ? source : null;

  return result;
};
