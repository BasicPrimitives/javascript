# Structures
## <a name="Edge" id="Edge">Edge</a>
Graph edge structure

 `Edge` 

## <a name="FamilyNode" id="FamilyNode">FamilyNode</a>
Family node

 `FamilyNode` 

## <a name="HeapResult" id="HeapResult">HeapResult</a>
Heap result object

 `HeapResult` 

## <a name="Interval" id="Interval">Interval</a>
Class represents interval defined by two values.

 `Interval` 

### Constructor

 `Interval(arg0, arg1)` 

Class represents interval defined by two values.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Interval | `` | Interval object to clone. | 
 | `arg0` | number | `` | The from value. | 
 | `arg1` | number | `` | The to value. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Reference to the context object associated with this Interval. | 
 | `from` | number | `null` | The from value | 
 | `to` | number | `null` | The to value | 

### Functions

 `clone()` 

Clones the interval

 Returns: `Interval` - returns copy of the interval.


 `equalTo(interval)` 

Checks if intervals are equal

 Returns: `boolean` - returns true if intervals are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `interval` | Interval | `` | Interval | 

 `overlaps(interval)` 

Checks if the interval overlaps the specified interval

 Returns: `boolean` - returns true if two intervals overlap each other.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `interval` | Interval | `` | The interval to check overlapping for. | 

 `toString()` 

Returns interval in form of user friendly string

 Returns: `string` - returns string interval representation.


 `width()` 

Width

 Returns: `number` - returns interval width


## <a name="Matrix" id="Matrix">Matrix</a>
Square matrix having 2 rows and 2 columns.

 `Matrix` 

### Constructor

 `Matrix(arg0, arg1, arg2, arg3)` 

Square matrix having 2 rows and 2 columns.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Matrix | `` | Matrix to clone | 
 | `arg0` | number | `` | A1 - top left. | 
 | `arg1` | number | `` | B1 - top right. | 
 | `arg2` | number | `` | A2 - bottom left. | 
 | `arg3` | number | `` | B2 - bottom right. | 

### Functions

 `determinant()` 

Finds matrix determinant

 Returns: `number` - returns matrix determinant


## <a name="Point" id="Point">Point</a>
Class represents pair of x and y coordinates that define a point in 2D plane.

 `Point` 

### Constructor

 `Point(arg0, arg1)` 

Class represents pair of x and y coordinates that define a point in 2D plane.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Point | `` | Point object to clone. | 
 | `arg0` | number | `` | The x coordinate. | 
 | `arg1` | number | `` | The y coordinate. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Reference to the context object associated with this point. | 
 | `x` | number | `null` | The x coordinate | 
 | `y` | number | `null` | The y coordinate | 

### Functions

 `clone()` 

Clones the point

 Returns: `Point` - returns copy of the point.


 `distanceTo(arg0,  arg1)` 

Calculates distance to the specified point

 Returns: `number` - returns distance to the specified point

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Point | `` | Point | 
 | `arg0` | number | `` | X coordinate | 
 | `arg1` | number | `` | Y coordinate | 

 `equalTo(point)` 

Checks if points are equal

 Returns: `boolean` - returns true if points are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `point` | Point | `` | Point | 

 `getCSS(units)` 

Returns size in form of CSS style object.

 Returns: `object` - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

 `scale(scale)` 

Scales the point location by the specified value

 Returns: `Point` - returns reference to the current point.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `scale` | number | `` | scale | 

 `swap(point)` 

Swaps values of 2 points

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `point` | Point | `` | The point to swap values with | 

 `toString(units)` 

Returns point in form of CSS style string.

 Returns: `string` - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

## <a name="Rect" id="Rect">Rect</a>
Class describes the width, height and location of rectangle.

 `Rect` 

### Constructor

 `Rect(arg0, arg1, arg2, arg3)` 

Class describes the width, height and location of rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Rect | `` | Rectangle to clone. | 
 | `arg0` | Point | `` | The top left point. | 
 | `arg1` | Point | `` | The bottom right point. | 
 | `arg0` | number | `` | The x coordinate of top left corner. | 
 | `arg1` | number | `` | The y coordinate of top left corner. | 
 | `arg2` | number | `` | Rect width. | 
 | `arg3` | number | `` | Rect height. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Reference to context object associated with this rectangle. | 
 | `height` | number | `null` | The height of rectangle. | 
 | `width` | number | `null` | The width of rectangle. | 
 | `x` | number | `null` | The location x coordinate | 
 | `y` | number | `null` | The location y coordinate | 

### Functions

 `addRect(arg0,  arg1,  arg2,  arg3)` 

Expands the rectangle boundaries to contain the specified rectangle.

 Returns: `Rect` - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Rect | `` | The rectangle to contain. | 
 | `arg0` | number | `` | The x coordinate of top left corner. | 
 | `arg1` | number | `` | The y coordinate of top left corner. | 
 | `arg2` | number | `undefined` | Width. | 
 | `arg3` | number | `undefined` | Height. | 

 `bottom()` 

Bottom

 Returns: `number` - returns y-axis coordinate of the bottom side of the rectangle


 `centerPoint()` 

Center point

 Returns: `Point` - returns center point of the rectangle.


 `contains(arg0,  arg1)` 

Checks if the rectangle contains given point

 Returns: `boolean` - returns true if the rectangle contains the specified point; otherwise, false.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Point | `` | The point to check. | 
 | `arg0` | number | `` |  The x coordinate of the point to check. | 
 | `arg1` | number | `` |  The y coordinate of the point to check. | 

 `cropByRect(rect)` 

Crops the rectangle by the boundaries of the specified rectangle.

 Returns: `Rect` - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `rect` | Rect | `` | The rectangle that is used to crop boundaries by | 

 `equalTo(rect)` 

Checks if rectangles are equal

 Returns: `boolean` - returns true if rectangles are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `rect` | Rect | `` | Rectangle | 

 `getCSS(units)` 

Returns rectangle location and size in form of CSS style object.

 Returns: `object` - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

 `getProjectionPoint(point)` 

Find intersection point between rectangle's perimeter and line connecting the given point and center of the rectangle

 Returns: `Point` - returns point or null if point is inside rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `point` | Point | `` | Point to project | 

 `horizontalCenter()` 

Horizontal center

 Returns: `number` - returns x-axis coordinate of the center point of the rectangle.


 `invert()` 

Inverts rectangle coordinates

 Returns: `Rect` - returns reference to the current rectangle.


 `isEmpty()` 

Checks if rectangle is empty. Rectangle is empty if one of its sizes is undefined or less than zero.

 Returns: `boolean` - returns true if rectangle is empty.


 `left()` 

Left

 Returns: `number` - returns x coordinate of the rectangle


 `loopEdges(callback)` 

Loops edges of the rectangle in the clockwise order: Top, Right, Bottom, Left

 Returns: `Rect` - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `callback` | loopRectEdgesCallback | `` | A callback function to iterate over sides of the rectangle. | 
**Callbacks**

 `loopRectEdgesCallback(vector, placementType)` 

Callback for iterating rectangle's sides

 Returns: `boolean` - returns true to break iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | Vector | `` | Vector connecting two corners of the rectangle's side | 
 | `placementType` | PlacementType | `` | The current side | 

 `offset(arg0,  arg1,  arg2,  arg3)` 

Expands rectangle boundaries by using specified value in all directions. Value can be negative.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | number | `` | The amount by which to expand or shrink the sides of the rectangle. | 
 | `arg0` | number | `` | Left side | 
 | `arg1` | number | `` | Top side | 
 | `arg2` | number | `` | Right side | 
 | `arg3` | number | `` | Bottom side | 

 `overlaps(rect)` 

Checks if the rectangle overlaps the specified rectangle

 Returns: `boolean` - returns true if two rectangles overlap each other.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `rect` | Rect | `` | The rectangle to check overlapping for. | 

 `right()` 

Right

 Returns: `number` - returns x-axis coordinate of the right side of the rectangle


 `scale(scale)` 

Scales the rectangle by the specified value

 Returns: `Rect` - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `scale` | number | `` | scale | 

 `toString(units)` 

Returns rectangle location and size in form of CSS style string.

 Returns: `string` - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

 `top()` 

Top

 Returns: `number` - returns y coordinate of the rectangle


 `translate(x,  y)` 

Moves the rectangle by the specified horizontal and vertical offsets.

 Returns: `Rect` - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `x` | number | `` | Horizontal offset | 
 | `y` | number | `` | Vertical offset | 

 `validate()` 

Validates rectangle properties

 Returns: `boolean` - returns true if rectangle properties are valid.


 `verticalCenter()` 

Vertical center

 Returns: `number` - returns y-axis coordinate of the center point of the rectangle.


 `verticalInterval()` 

Vertical Interval

 Returns: `Interval` - returns vertical interval of the rectangle


## <a name="RenderEventArgs" id="RenderEventArgs">RenderEventArgs</a>
This is object parameter of rendering callback function

 `RenderEventArgs` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Context object of the node | 
 | `element` | object | `null` | Reference to DOM element. | 
 | `id` | string | `null` | Node id | 
 | `isCursor` | boolean | `false` | The rendered item is current diagram cursor item | 
 | `isSelected` | boolean | `false` | The rendered item is selected | 
 | `renderingMode` | RenderingMode | `null` | This option indicates current template state. | 
 | `templateName` | string | `null` | Node template name | 

## <a name="Size" id="Size">Size</a>
Size object defines width and height.

 `Size` 

### Constructor

 `Size(arg0, arg1)` 

Size object defines width and height.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Size | `` | Size object to clone. | 
 | `arg0` | number | `` | Width. | 
 | `arg1` | number | `` | Height. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `height` | number | `0` | The height | 
 | `width` | number | `0` | The width | 

### Functions

 `addThickness(thickness)` 

Expands the current size by the thickness object.

 Returns: `Size` - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thickness` | Thickness | `` | The thickness to use for expansion. | 

 `cropBySize(size)` 

Crops the size by the other size object.

 Returns: `Size` - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `size` | Size | `` | The size to use as the crop boundaries. | 

 `getCSS(units)` 

Returns size in form of CSS style object.

 Returns: `object` - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

 `invert()` 

Inverts size dimensions

 Returns: `Size` - returns reference to the current size.


 `isEmpty()` 

Checks if size is empty. Size is empty if one of its dimensions is undefined or less than zero.

 Returns: `boolean` - returns true if size is empty.


 `maxSize(size)` 

Extends the current size by the other size.

 Returns: `Size` - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `size` | Size | `` | The size to use as extension. | 

 `removeThickness(thickness)` 

Shrinks the current size by the thickness object.

 Returns: `Size` - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thickness` | Thickness | `` | The thickness to use for contraction. | 

 `scale(scale)` 

Scales the size by the specified value

 Returns: `Size` - returns reference to the current size.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `scale` | number | `` | scale | 

 `space()` 

Returns square size

 Returns: `number` - returns square size.


 `validate()` 

Validates size properties

 Returns: `boolean` - returns true if size properties are valid.


## <a name="Thickness" id="Thickness">Thickness</a>
Class describes the thickness of a frame around rectangle.

 `Thickness` 

### Constructor

 `Thickness(left, top, right, bottom)` 

Class describes the thickness of a frame around rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `left` | number | `` | Left. | 
 | `top` | number | `` | Top. | 
 | `right` | number | `` | Right. | 
 | `bottom` | number | `` | Bottom. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `bottom` |  | `0` | The thickness for the bottom side of the rectangle. | 
 | `left` |  | `0` | The thickness for the left side of the rectangle. | 
 | `right` |  | `0` | The thickness for the right side of the rectangle. | 
 | `top` |  | `0` | The thickness for the upper side of the rectangle. | 

### Functions

 `addThickness(arg0,  arg1,  arg2,  arg3)` 

Add thickness.

 Returns: `Thickness` - returns reference to the current thickness object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thickness` | Thickness | `` | The thickness to add. | 

 `isEmpty()` 

Checks object is empty

 Returns: `boolean` - returns true if object has no thickness defined for any of its sides


 `isNegative()` 

Checks if at least one side is negative

 Returns: `boolean` - returns true if any of its sides is negative


 `isPositive()` 

Checks if at least one side is positive

 Returns: `boolean` - returns true if any of its sides is positive


 `maxThickness(thickness)` 

Maximum thickness.

 Returns: `Thickness` - returns reference to the current thickness object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thickness` | Thickness | `` | The thickness to compare with. | 

 `scale(scale)` 

Scales the thickness by the specified value

 Returns: `Thickness` - returns reference to the current size.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `scale` | number | `` | scale | 

 `toString(units)` 

Returns thickness object in form of CSS style string. It is conversion to padding style string.

 Returns: `string` - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `units` | string | `"px"` | The string name of units. | 

## <a name="Vector" id="Vector">Vector</a>
Class defines a vector in 2D plane.

 `Vector` 

### Constructor

 `Vector(arg0, arg1)` 

Class defines a vector in 2D plane.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | Vector | `` | Vector object to clone. | 
 | `arg0` | Point | `` | From point. | 
 | `arg1` | Point | `` | To point | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Reference to context object associated with this vector. | 
 | `from` |  | `null` | The start point | 
 | `to` |  | `null` | The end point | 

### Functions

 `equalTo(vector)` 

Checks if vectors are equal

 Returns: `boolean` - returns true if vectors are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | Vector | `` | Vector | 

 `getIntersectionPoint(vector,  strict,  rounding)` 

Finds intersection point of two vectors

 Returns: `Point|null` - returns intersection point or null if intersection does not exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | Vector | `` | The vector to find intersection with | 
 | `strict` | boolean | `` | If true then intersection point should belong to both vectors | 
 | `rounding` | number | `` | The precision of calculations | 

 `getLine()` 

Gets line

 Returns: `number[]` - returns line coefficients


 `getLineKey()` 

Gets line key

 Returns: `string` - returns unique line key


 `getMiddlePoint()` 

Returns middle point of the current vector

 Returns: `Point` - returns middle point


 `intersect(vector)` 

Checks if two vectors have intersection point

 Returns: `boolean` - returns true if vectors intersect

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | vector | `` | The vector to check intersection with | 

 `isNull()` 

Checks if start and end points are the same

 Returns: `boolean` - returns true if start and end points are the same.


 `length()` 

Vector length

 Returns: `number` - returns vector length


 `offset(offset)` 

Offsets vector coordinates

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `offset` | number | `` | Offset | 

 `relateTo(vector)` 

Finds how two vectors relate to each other

 Returns: `VectorRelationType` - returns how the vector relates to the specified vector

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `vector` | Vector | `` | The vector to relate with | 
