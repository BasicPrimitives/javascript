import Rect from '../../../graphics/structs/Rect';
import Pile from '../../../algorithms/Pile';

export default function CollinearVectorBundle() {
  var _boundingRect = new Rect(),
    _vectors = [],
    _continuations = [];

  function addVector(vector, continuation) {
    _vectors.push(vector);
    _continuations.push(continuation);

    _boundingRect.addRect(vector.from.x, vector.from.y);
    _boundingRect.addRect(vector.to.x, vector.to.y);
  }

  function loopProjections(callback) { // calback(from, to)
    var index, len,
      vector;
    if (_boundingRect.width > _boundingRect.height) {
      for (index = 0, len = _vectors.length; index < len; index += 1) {
        vector = _vectors[index];
        callback(vector.from.x, vector.to.x, _continuations[index]);
      }
    } else {
      for (index = 0, len = _vectors.length; index < len; index += 1) {
        vector = _vectors[index];
        callback(vector.from.y, vector.to.y, _continuations[index]);
      }
    }
  }

  function resolve() {
    if (_vectors.length == 1) {
      _continuations[0](0, 1, 1);
    } else {
      var stackSegments = Pile();
      loopProjections(function (from, to, continuation) {
        stackSegments.add(from, to, continuation);
      });

      var totalOffset = stackSegments.resolve(this, function (from, to, context, offset, bundleSize, direction) {
        context(offset, bundleSize, direction);
      });
    }
  }

  return {
    addVector: addVector,
    resolve: resolve
  };
};