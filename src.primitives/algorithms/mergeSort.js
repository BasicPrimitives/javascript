/*
	Function: primitives.common.mergeSort
		Merges array of sorted arrays into one using call back function for comparison.
	
	Parameters:
		arrays - Array of sorted arrays of objects.
		getItemWeight - Call back function used to get items weight. 
		ignoreDuplicates - return distinct items only.

	Returns: 
		Array of merged sorted items. 
*/
primitives.common.mergeSort = function (arrays, getItemWeight, ignoreDuplicates) {
	var result = null,
		firstArray, secondArray, mergedArray, arrayIndex,
		firstIndex, secondIndex, firstLen, secondLen, firstItem, secondItem,
		firstItemWeight, secondItemWeight,
		currentValue;

	switch (arrays.length) {
		case 0:
			result = [];
			break;
		default:
			firstArray = [];
			for (arrayIndex = 0; arrayIndex < arrays.length; arrayIndex += 1) {
				secondArray = arrays[arrayIndex];
				mergedArray = [];

				firstLen = firstArray.length;
				secondLen = secondArray.length;

				firstIndex = 0;
				secondIndex = 0;

				firstItem = null;
				firstItemWeight = null;
				secondItem = null;
				secondItemWeight = null;

				if (firstLen > 0) {
					firstItem = firstArray[firstIndex];
					firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
				}

				if (secondLen > 0) {
					secondItem = secondArray[secondIndex];
					secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
				}
				currentValue = null;
				while (firstIndex < firstLen || secondIndex < secondLen) {

					if (firstIndex >= firstLen) {
						if (!ignoreDuplicates || currentValue != secondItem) {
							mergedArray.push(secondItem);
							currentValue = secondItem;
						}
						secondIndex += 1;

						
						if (secondIndex < secondLen) {
							secondItem = secondArray[secondIndex];
							secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
						}
					} else {
						if (secondIndex >= secondLen) {
							if (!ignoreDuplicates || currentValue != firstItem) {
								mergedArray.push(firstItem);
								currentValue = firstItem;
							}
							firstIndex += 1;

							
							if (firstIndex < firstLen) {
								firstItem = firstArray[firstIndex];
								firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
							}
						} else {
							if (firstItemWeight < secondItemWeight) {
								if (!ignoreDuplicates || currentValue != firstItem) {
									mergedArray.push(firstItem);
									currentValue = firstItem;
								}
								firstIndex += 1;

								if (firstIndex < firstLen) {
									firstItem = firstArray[firstIndex];
									firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
								}
							} else {
								if (!ignoreDuplicates || currentValue != secondItem) {
									mergedArray.push(secondItem);
									currentValue = secondItem;
								}
								secondIndex += 1;
								
								if (secondIndex < secondLen) {
									secondItem = secondArray[secondIndex];
									secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
								}
							}
						}
					}
				}
				firstArray = mergedArray;
			}
			result = firstArray;
			break;
	}
	return result;
};
