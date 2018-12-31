/*
	Function: primitives.common.binarySearch
		Search sorted list of elements for nearest item.
	
	Parameters:
		items - Array of elements.
		funcDistance - Call back function used to get ditance for current item. 

	Returns: 
		Nearest item.
*/
primitives.common.binarySearch = function (items, funcDistance, startMinimum, startMaximum) {
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
		distance = funcDistance(item, minimum);
		if (distance > 0) {
			bestDistance = Math.abs(distance);

			item = items[maximum];
			distance = funcDistance(item, maximum);
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
					distance = funcDistance(item, middle);
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

