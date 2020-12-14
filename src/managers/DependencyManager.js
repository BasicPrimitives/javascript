export default function DependencyManager() {
  var hash = {};

  function register(key, value) {
    hash[key] = value;

    return value;
  }

  function resolve() {
    var args = [],
      deps = arguments[0],
      func = arguments[1],
      scope = arguments[2] || {};
    return function () {
      var a = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < deps.length; i += 1) {
        var d = deps[i];
        args.push(hash.hasOwnProperty(d) && d !== '' ? hash[d] : a.shift());
      }
      args = args.concat(a);
      return func.apply(scope || {}, args);
    };
  }

  return {
    register: register,
    resolve: resolve
  };
};