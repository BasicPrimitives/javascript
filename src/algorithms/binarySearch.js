/**
 * Callback for finding distance for a collection item
 *
 * @callback funcDistance
 * @param {Object} item A collection item
 * @param {number} index An index of the collection item
 * @returns {number} Returns a distance for the item 
 */

/**
* @typedef {Object} BinarySearchResult
* @property {number} index The index of the nearest item in the collection
* @property {Object} item The nearest item
*/

/**
 * Search sorted list of elements for the nearest item.
 *
 * @param {Object[]} items - The collection of elements.
 * @param {funcDistance} callback - A callback function to get distance for the collection item. 
 * @param {number} [startMinimum=undefined] - The minimum index in the array to start search from
 * @param {number} [startMaximum=undefined] - The maximum index in the array to start search from
 * @returns {BinarySearchResult} Returns an item of the collection, which is nearest to optimal measured by callback function
*/
export default function binarySearch(items, callback, startMinimum, startMaximum) {
  var result = null,
    distance,
    bestDistance,
    minimum = startMinimum || 0,
    maximum = startMaximum || (items.length - 1),
    middle,
    item;

  if (items.length > 0) {
    item = items[minimum];
    result = { index: minimum, item: item };
    distance = callback(item, minimum);
    if (distance > 0) {
      bestDistance = Math.abs(distance);

      item = items[maximum];
      distance = callback(item, maximum);
      if (distance >= 0) {
        result = { index: maximum, item: item };
      } else {
        distance = Math.abs(distance);
        if (bestDistance > distance) {
          bestDistance = distance;
          result = { index: maximum, item: item };
        }
        while (minimum + 1 < maximum) {
          middle = Math.round((minimum + maximum) / 2.0);
          item = items[middle];
          distance = callback(item, middle);
          if (distance === 0) {
            result = { index: middle, item: item };
            break;
          } else {
            if (distance > 0) {
              minimum = middle;
            } else {
              maximum = middle;
            }
            distance = Math.abs(distance);
            if (bestDistance > distance) {
              bestDistance = distance;
              result = { index: middle, item: item };
            }
          }
        }
      }
    }
  }
  return result;
};