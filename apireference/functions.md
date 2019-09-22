# Functions

## <a name="primitives.common.beforeOpacity" id="primitives.common.beforeOpacity">beforeOpacity</a>

Calculates before opacity color value producing color you need after applying opacity.

 Returns: `string` - the hex color before opacity

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | The color you want to get after applying opacity. | 
 | `opacity` | number | `` | Opacity | 

## <a name="primitives.common.binarySearch" id="primitives.common.binarySearch">binarySearch</a>

Search sorted list of elements for the nearest item.

 Returns: `BinarySearchResult` - returns an item of the collection, which is nearest to optimal measured by callback function

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `items` | Object[] | `` | - The collection of elements. | 
 | `callback` | funcDistance | `` | - A callback function to get distance for the collection item. | 
 | `startMinimum` | number | `undefined` | - The minimum index in the array to start search from | 
 | `startMaximum` | number | `undefined` | - The maximum index in the array to start search from | 
**Callbacks**

 `funcDistance(item, index)` 

Callback for finding distance for a collection item

 Returns: `number` - returns a distance for the item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item` | Object | `` | A collection item | 
 | `index` | number | `` | An index of the collection item | 

## <a name="primitives.common.compareArrays" id="primitives.common.compareArrays">compareArrays</a>

Compares non-sorted arrays.

 Returns: `boolean` - returns true if the arrays are identical.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `array1` | Object[] | `` | - The first collection of elements. | 
 | `array2` | Object[] | `` | - The second collection of elements. | 
 | `getKeyFunc` | getKeyFuncCallback, undefined | `` | If callback function is defined it is used to get a key for an array element | 
**Callbacks**

 `getKeyFuncCallback(item)` 

Callback for getting item key for an element of the array

 Returns: `number` - returns key of the item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item` | Object | `` | A collection item | 

## <a name="primitives.common.getBlue" id="primitives.common.getBlue">getBlue</a>

Gets blue value of HEX color string.

 Returns: `number` - returns blue value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | Color | 

## <a name="primitives.common.getColorHexValue" id="primitives.common.getColorHexValue">getColorHexValue</a>

Converts color string into HEX color string.

 Returns: `string` - returns color value in form of hex string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | Regular HTML color string. | 

## <a name="primitives.common.getColorName" id="primitives.common.getColorName">getColorName</a>

Converts color string into HTML color name string or return hex color string.

 Returns: `string` - returns html color name or hex string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | Regular HTML color string | 

## <a name="primitives.common.getCrossingRectangles" id="primitives.common.getCrossingRectangles">getCrossingRectangles</a>

Finds pairs of crossing rectangles.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `rectangles` | Rect[] | `` | Collection of rectangles. | 
 | `onCrossing` | onCrossingRectanglesItemCallback | `` | Callback function to pass pair of crossing rectangles. | 
**Callbacks**

 `onCrossingRectanglesItemCallback(rect1, rect2)` 

Callback function to iterate over pairs of crosssing rectangles

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `rect1` | Rect | `` | First rectangle | 
 | `rect2` | Rect | `` | Second rectangle | 

## <a name="primitives.common.getGreen" id="primitives.common.getGreen">getGreen</a>

Gets green value of HEX color string.

 Returns: `number` - returns green value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | Color | 

## <a name="primitives.common.getLiniarBreaks" id="primitives.common.getLiniarBreaks">getLiniarBreaks</a>

Breaks collection of values into 3 intervals, so values stay close to each other within interval.

 Returns: `number[]` - returns array conaining 3 indexes. the first 2 break values into 3 intervals, the last index is actuall index of the last element in the values collection.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `values` | number[] | `` | Array of values | 

## <a name="primitives.common.getMergedRectangles" id="primitives.common.getMergedRectangles">getMergedRectangles</a>

Merges collection of rectangles into shapes. Calls callback function to pass result sequences of data points.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `items` | Rect[] | `` | Collection of rectangles. | 
 | `onItem` | onMergedRectangleItemCallback | `` | Callback function to pass result sequences of margin data points. | 
**Callbacks**

 `onMergedRectangleItemCallback(points)` 

Callback function to itterate over result shapes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `points` | Point[] | `` | Collection of points tracing marging around result area formed via merge of rectangles. The outer shape margin has clock wise sequance of data ponts. Internal holes inside of the shape are formed by counterclock wise sequence of data points. | 

## <a name="primitives.common.getMinimumCrossingRows" id="primitives.common.getMinimumCrossingRows">getMinimumCrossingRows</a>

Finds minimum number of horizontal lines crossing all reactngles

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `rectangles` | React[] | `` | Collection of rectangles | 
 | `onItem` | onRowCallback | `` | Callback function to call for every found row | 
**Callbacks**

 `onRowCallback(row)` 

Callback for iterating rows

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `row` | number | `` | The y coordinate of the horizontal line | 

## <a name="primitives.common.getRed" id="primitives.common.getRed">getRed</a>

Gets red value of HEX color string.

 Returns: `number` - returns red value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `` | Color | 

## <a name="primitives.common.highestContrast" id="primitives.common.highestContrast">highestContrast</a>

Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.

 Returns: `string` - returns highest contrast color compared to base color.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `baseColor` | string | `` | Base color to compare with | 
 | `firstColor` | string | `` | First color. | 
 | `secondColor` | string | `` | Second color. | 

## <a name="primitives.common.indexOf" id="primitives.common.indexOf">indexOf</a>

Searches specified item in the array

 Returns: `number` - returns index of the item in the array or -1 if item is not found

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | object[] | `` | An array through which to search. | 
 | `item` | object | `` |  The value to search for. | 
 | `compFunc` | compFuncCallback | `` | Callback function to compair two objects | 
**Callbacks**

 `compFuncCallback(item1, item2)` 

Callback for items comparison

 Returns: `number` - returns true if items are equal

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item1` | Object | `` | First item to compare | 
 | `item2` | Object | `` | Second item to compare | 

## <a name="primitives.common.luminosity" id="primitives.common.luminosity">luminosity</a>

Calculates luminosity between two HEX string colors.

 Returns: `number` - returns luminosity value

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `firstColor` | string | `` | First color. | 
 | `secondColor` | string | `` | Second color. | 

## <a name="primitives.common.mergeSort" id="primitives.common.mergeSort">mergeSort</a>

Merges array of sorted arrays into one using call back function for comparison.

 Returns: `object[]` - returns merged sorted array.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arrays` | object[][] | `` |  Array of sorted arrays of objects. | 
 | `getItemWeight` | getItemWeightCallback | `` | Callback function to measure item weight. | 
 | `ignoreDuplicates` | boolean | `` | If true returns distinct weight items only. | 
**Callbacks**

 `getItemWeightCallback(item)` 

Callback function to measure item weights of merged arrays.

 Returns: `number` - returns item's weight.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item` | object | `` | The item to weight | 