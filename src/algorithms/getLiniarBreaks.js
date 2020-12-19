import binarySearch from './binarySearch';
/**
 * Breaks collection of values into 3 intervals, so values stay close to each other within interval.
 * 
 * @param {number[]} values Array of values
 * @returns {number[]} Returns array containing 3 indexes. The first 2 break values into 3 intervals, 
 * the last index is actual index of the last element in the values collection. 
 */
export default function getLiniarBreaks(values) {
  var _leftTotal = [],
    _len = values.length;

  // Sum up values from left to right
  var total = 0;
  for (var index = 0; index < _len; index += 1) {
    total += values[index];
    _leftTotal[index] = total;
  }

  function getLinearDeviation(leftIndex, rightIndex) {
    var result = 0;

    var avg = (_leftTotal[rightIndex] - _leftTotal[leftIndex] + values[leftIndex]) / (rightIndex - leftIndex + 1);

    var median = binarySearch(values, function (item) {
      return avg - item;
    }, leftIndex, rightIndex);

    if (median.item <= avg) {
      result += (avg * (median.index + 1 - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] + values[leftIndex]));
      result += (_leftTotal[rightIndex] - _leftTotal[median.index] - avg * (rightIndex - median.index));
    } else {
      result += (avg * (median.index - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] - values[median.index] + values[leftIndex]));
      result += (_leftTotal[rightIndex] - _leftTotal[median.index] + values[median.index] - avg * (rightIndex - median.index + 1));
    }

    return result;
  }

  function getScore(leftIndex, rightIndex) {
    var score = 0;

    score += getLinearDeviation(0, leftIndex);
    if (rightIndex > leftIndex + 1) {
      score += getLinearDeviation(leftIndex + 1, rightIndex - 1);
    }
    score += getLinearDeviation(rightIndex, _len - 1);

    return score;
  }

  var leftIndex = 0,
    rightIndex = _len - 1;

  var score = getScore(leftIndex, rightIndex);

  while (leftIndex < rightIndex + 1) {
    var leftScore = getScore(leftIndex + 1, rightIndex);
    var rightScore = getScore(leftIndex, rightIndex - 1);

    if (leftScore < rightScore) {
      if (leftScore >= score) {
        break;
      }
      leftIndex += 1;
      score = leftScore;
    } else {
      if (rightScore >= score) {
        break;
      }
      rightIndex -= 1;
      score = rightScore;
    }
  }

  return [leftIndex, rightIndex - 1, _len - 1];
};

