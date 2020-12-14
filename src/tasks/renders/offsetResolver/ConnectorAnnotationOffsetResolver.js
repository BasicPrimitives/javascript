import CollinearVectorBundle from './CollinearVectorBundle';

export default function ConnectorAnnotationOffsetResolver() {
  var _bundles = {};

  function getOffset(vector, callback) {
    var key = vector.getLineKey();

    if (!_bundles.hasOwnProperty(key)) {
      _bundles[key] = new CollinearVectorBundle();
    }

    _bundles[key].addVector(vector, callback);
  }

  function resolve() {
    for (var key in _bundles) {
      if (_bundles.hasOwnProperty(key)) {
        var bundle = _bundles[key];
        bundle.resolve();
      }
    }
  }

  return {
    getOffset: getOffset,
    resolve: resolve
  };
};