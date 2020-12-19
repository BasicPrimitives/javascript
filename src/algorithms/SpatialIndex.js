import getLiniarBreaks from './getLiniarBreaks';
import QuadTree from './QuadTree';
import Rect from '../graphics/structs/Rect';
/**
 * Create spatial index structure. It uses collection of sizes to distribute 
 * rectangles into buckets of similar size elements. Elements of the same bucket 
 * are approximated to points. The search of rectangles is transformed to search of points 
 * within given range plus offset for maximum linear rectangle size.
 * 
 * @class SpatialIndex
 * 
 * @param {Array} sizes Reference to optional collection of possible sizes of items we plan to store
 * in the index
 * 
 * @returns {SpatialIndex} Returns spacial index data structure.
 */
export default function SpatialIndex(sizes) {
  var _buckets = [];

  sizes.sort(function (a, b) { return a - b; });

  switch (sizes.length) {
    case 0:
      _buckets.push(new Bucket(0, 1000000));
      break;
    case 1:
      var size1 = sizes[0];
      _buckets.push(new Bucket(0, size1));
      break;
    case 2:
      size1 = sizes[0];
      var size2 = sizes[1];
      if (size2 > size1 * 2) {
        _buckets.push(new Bucket(0, size1));
        _buckets.push(new Bucket(size1, size2));
      } else {
        _buckets.push(new Bucket(0, size2));
      }
      break;
    default:
      var breaks = getLiniarBreaks(sizes);
      var minimum = 0;
      for (var index = 0; index < breaks.length; index += 1) {
        var maximum = sizes[breaks[index]];
        _buckets.push(new Bucket(minimum, maximum));
        minimum = maximum;
      }
      break;
  }

  function Bucket(minimum, maximum) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.quadTree = QuadTree(maximum * 2);
  }

  /**
   * Adds rectangle to spacial index
   * @param {Rect} rect Rectangle
   */
  function addRect(rect) {
    var size = Math.max(rect.width, rect.height);
    var point = rect.centerPoint();

    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      if (size <= bucket.maximum || index == len - 1) {
        point.context = rect;
        bucket.quadTree.addPoint(point);
        break;
      }
    }
  }

  /**
   * Callback function for iteration of spacial index rectangles
   * 
   * @callback onSpatialIndexItemCallback
   * @param {React} rect Rectangle
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops rectangular area of spacial index
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {Rect} rect Rectangular search area
   * @param {onSpatialIndexItemCallback} onItem Callback function to call for every rectangle intersecting given rectangular search area
   */
  function loopArea(thisArg, rect, onItem) { // onItem = function(itemid) {}
    if (onItem != null) {
      for (var index = 0, len = _buckets.length; index < len; index += 1) {
        var bucket = _buckets[index];
        var bucketRect = new Rect(rect);
        bucketRect.offset(bucket.maximum / 2.0);
        bucket.quadTree.loopArea(this, bucketRect, function (point) {
          var pointRect = point.context;

          if (rect.overlaps(pointRect)) {
            return onItem.call(thisArg, pointRect);
          }
        });
      }
    }
  }

  /**
   * Validates internal data consistency of spacial index data structure
   * 
   * @ignore
   * @returns {boolean} Returns true if structure pass validation
   */
  function validate() {
    var result = true;
    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      result = result && bucket.quadTree.validate();
    }
    return result;
  }

  /**
   * Returns collection of quadrants created in spacial index
   * Quadrants exists only when elements exists in them.
   * This method is used for visual debugging of the structure.
   * 
   * @ignore
   * @param {React} selection Rectangular test area to highlight quadrants
   * @returns {Rect[]} Returns collection of available quadrants.
   * Quadrants containing points within selection area have context.highlight property set to true.
   */
  function getPositions(selection) {
    var result = [];
    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      result = result.concat(bucket.quadTree.getPositions(selection));
    }
    return result;
  }

  return {
    addRect: addRect,
    loopArea: loopArea,
    validate: validate,
    getPositions: getPositions
  };
};