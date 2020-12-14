/**
 * Creates range minimum query structure
 * @class RMQ
 * 
 * @param {number[]} items Collection of numbers
 * @returns {RMQ} Returns range minimum query structure
 */
export default function RMQ(items) {
  var _lookup = [];
  var _log2 = Math.log(2);

  preprocess();

  function preprocess() {
    var power;

    for (var index = 0, len = items.length; index < len; index += 1) {
      _lookup[index] = [index];
    }
    for (power = 1, len = items.length; (1 << power) < len; power += 1) {
      for (index = 0; (index + (1 << power) - 1) < len; index += 1) {
        if (items[_lookup[index][power - 1]] < items[_lookup[index + (1 << (power - 1))][power - 1]]) {
          _lookup[index][power] = _lookup[index][power - 1];
        } else {
          _lookup[index][power] = _lookup[index + (1 << (power - 1))][power - 1];
        }
      }
    }
  }

  /**
   * Returns index of minimum item for the given range of items
   * 
   * @param {number} from The left margin index
   * @param {number} to The right margin index
   * @returns {number} Returns index of the minimum item
   */
  function getRangeMinimumIndex(from, to) {
    var power = Math.floor(Math.log(to - from + 1) / _log2);

    if (items[_lookup[from][power]] <= items[_lookup[to - (1 << power) + 1][power]]) {
      return _lookup[from][power];
    } else {
      return _lookup[to - (1 << power) + 1][power];
    }
  }

  /**
   * Return minimum value for the given range
   * 
   * @param {number} from The left index of the range
   * @param {number} to The right index of the range
   * @returns {number} Returns minimum value in the range
   */
  function getRangeMinimum(from, to) {
    return items[getRangeMinimumIndex(from, to)];
  }

  return {
    getRangeMinimumIndex: getRangeMinimumIndex,
    getRangeMinimum: getRangeMinimum
  };
};