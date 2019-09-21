# Functions

 <code>beforeOpacity(color,  opacity)</code> 

Calculates before opacity color value producing color you need after applying opacity.

 Returns: <code>string</code> - the hex color before opacity

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | The color you want to get after applying opacity. | 
 | <code>opacity</code> | number | <code></code> | Opacity | 

 <code>binarySearch(items,  callback,  startMinimum,  startMaximum)</code> 

Search sorted list of elements for the nearest item.

 Returns: <code>BinarySearchResult</code> - returns an item of the collection, which is nearest to optimal measured by callback function

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>items</code> | Object[] | <code></code> | - The collection of elements. | 
 | <code>callback</code> | funcDistance | <code></code> | - A callback function to get distance for the collection item. | 
 | <code>startMinimum</code> | number | <code>undefined</code> | - The minimum index in the array to start search from | 
 | <code>startMaximum</code> | number | <code>undefined</code> | - The maximum index in the array to start search from | 
**Callbacks**

 <code>funcDistance(item, index)</code> 

Callback for finding distance for a collection item

 Returns: <code>number</code> - returns a distance for the item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item</code> | Object | <code></code> | A collection item | 
 | <code>index</code> | number | <code></code> | An index of the collection item | 

 <code>compareArrays(array1,  array2,  getKeyFunc)</code> 

Compares non-sorted arrays.

 Returns: <code>boolean</code> - returns true if the arrays are identical.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>array1</code> | Object[] | <code></code> | - The first collection of elements. | 
 | <code>array2</code> | Object[] | <code></code> | - The second collection of elements. | 
 | <code>getKeyFunc</code> | getKeyFuncCallback, undefined | <code></code> | If callback function is defined it is used to get a key for an array element | 
**Callbacks**

 <code>getKeyFuncCallback(item)</code> 

Callback for getting item key for an element of the array

 Returns: <code>number</code> - returns key of the item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item</code> | Object | <code></code> | A collection item | 

 <code>getBlue(color)</code> 

Gets blue value of HEX color string.

 Returns: <code>number</code> - returns blue value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | Color | 

 <code>getColorHexValue(color)</code> 

Converts color string into HEX color string.

 Returns: <code>string</code> - returns color value in form of hex string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | Regular HTML color string. | 

 <code>getColorName(color)</code> 

Converts color string into HTML color name string or return hex color string.

 Returns: <code>string</code> - returns html color name or hex string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | Regular HTML color string | 

 <code>getCrossingRectangles(thisArg,  rectangles,  onCrossing)</code> 

Finds pairs of crossing rectangles.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>rectangles</code> | Rect[] | <code></code> | Collection of rectangles. | 
 | <code>onCrossing</code> | onCrossingRectanglesItemCallback | <code></code> | Callback function to pass pair of crossing rectangles. | 
**Callbacks**

 <code>onCrossingRectanglesItemCallback(rect1, rect2)</code> 

Callback function to iterate over pairs of crosssing rectangles

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>rect1</code> | Rect | <code></code> | First rectangle | 
 | <code>rect2</code> | Rect | <code></code> | Second rectangle | 

 <code>getGreen(color)</code> 

Gets green value of HEX color string.

 Returns: <code>number</code> - returns green value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | Color | 

 <code>getLiniarBreaks(values)</code> 

Breaks collection of values into 3 intervals, so values stay close to each other within interval.

 Returns: <code>number[]</code> - returns array conaining 3 indexes. the first 2 break values into 3 intervals, the last index is actuall index of the last element in the values collection.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>values</code> | number[] | <code></code> | Array of values | 

 <code>getMergedRectangles(thisArg,  items,  onItem)</code> 

Merges collection of rectangles into shapes. Calls callback function to pass result sequences of data points.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>items</code> | Rect[] | <code></code> | Collection of rectangles. | 
 | <code>onItem</code> | onMergedRectangleItemCallback | <code></code> | Callback function to pass result sequences of margin data points. | 
**Callbacks**

 <code>onMergedRectangleItemCallback(points)</code> 

Callback function to itterate over result shapes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>points</code> | Point[] | <code></code> | Collection of points tracing marging around result area formed via merge of rectangles. The outer shape margin has clock wise sequance of data ponts. Internal holes inside of the shape are formed by counterclock wise sequence of data points. | 

 <code>getMinimumCrossingRows(thisArg,  rectangles,  onItem)</code> 

Finds minimum number of horizontal lines crossing all reactngles

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>rectangles</code> | React[] | <code></code> | Collection of rectangles | 
 | <code>onItem</code> | onRowCallback | <code></code> | Callback function to call for every found row | 
**Callbacks**

 <code>onRowCallback(row)</code> 

Callback for iterating rows

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>row</code> | number | <code></code> | The y coordinate of the horizontal line | 

 <code>getRed(color)</code> 

Gets red value of HEX color string.

 Returns: <code>number</code> - returns red value of the hex color string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>color</code> | string | <code></code> | Color | 

 <code>highestContrast(baseColor,  firstColor,  secondColor)</code> 

Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.

 Returns: <code>string</code> - returns highest contrast color compared to base color.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>baseColor</code> | string | <code></code> | Base color to compare with | 
 | <code>firstColor</code> | string | <code></code> | First color. | 
 | <code>secondColor</code> | string | <code></code> | Second color. | 

 <code><a name="123">indexOf(vector,  item,  compFunc)</a></code> 

Searches specified item in the array

 Returns: <code>number</code> - returns index of the item in the array or -1 if item is not found

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | object[] | <code></code> | An array through which to search. | 
 | <code>item</code> | object | <code></code> |  The value to search for. | 
 | <code>compFunc</code> | compFuncCallback | <code></code> | Callback function to compair two objects | 
**Callbacks**

 <code>compFuncCallback(item1, item2)</code> 

Callback for items comparison

 Returns: <code>number</code> - returns true if items are equal

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item1</code> | Object | <code></code> | First item to compare | 
 | <code>item2</code> | Object | <code></code> | Second item to compare | 

 <code>luminosity(firstColor,  secondColor)</code> 

Calculates luminosity between two HEX string colors.

 Returns: <code>number</code> - returns luminosity value

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>firstColor</code> | string | <code></code> | First color. | 
 | <code>secondColor</code> | string | <code></code> | Second color. | 

 <code>mergeSort(arrays,  getItemWeight,  ignoreDuplicates)</code> 

Merges array of sorted arrays into one using call back function for comparison.

 Returns: <code>object[]</code> - returns merged sorted array.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arrays</code> | object[][] | <code></code> |  Array of sorted arrays of objects. | 
 | <code>getItemWeight</code> | getItemWeightCallback | <code></code> | Callback function to measure item weight. | 
 | <code>ignoreDuplicates</code> | boolean | <code></code> | If true returns distinct weight items only. | 
**Callbacks**

 <code>getItemWeightCallback(item)</code> 

Callback function to measure item weights of merged arrays.

 Returns: <code>number</code> - returns item's weight.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item</code> | object | <code></code> | The item to weight | 
