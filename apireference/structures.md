# Structures
## RenderEventArgs
This is object parameter of rendering callback function

 <code>primitives.common.RenderEventArgs</code> 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>context</code> | object | <code>null</code> | Context object of the node | 
 | <code>element</code> | object | <code>null</code> | Reference to DOM element. | 
 | <code>id</code> | string | <code>null</code> | Node id | 
 | <code>isCursor</code> | boolean | <code>false</code> | The rendered item is current diagram cursor item | 
 | <code>isSelected</code> | boolean | <code>false</code> | The rendered item is selected | 
 | <code>renderingMode</code> | RenderingMode | <code>null</code> | This option indicates current template state. | 
 | <code>templateName</code> | string | <code>null</code> | Node template name | 

## Point
Class represents pair of x and y coordinates that define a point in 2D plane.

 <code>primitives.common.Point</code> 

### Constructor

 <code>Point(arg0, arg1)</code> 

Class represents pair of x and y coordinates that define a point in 2D plane.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Size | <code></code> | Point object to clone. | 
 | <code>arg0</code> | number | <code></code> | The x coordinate. | 
 | <code>arg1</code> | number | <code></code> | The y coordinate. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>context</code> | object | <code>null</code> | Reference to the context object associated with this point. | 
 | <code>x</code> | number | <code>null</code> | The x coordinate | 
 | <code>y</code> | number | <code>null</code> | The y coordinate | 

### Functions

 <code>clone()</code> 

Clones the point

 Returns: <code>Point</code> - returns copy of the point.


 <code>distanceTo(arg0,  arg1)</code> 

Calculates distance to the specified point

 Returns: <code>number</code> - returns distance to the specified point

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Point | <code></code> | Point | 
 | <code>arg0</code> | number | <code></code> | X coordinate | 
 | <code>arg1</code> | number | <code></code> | Y coordinate | 

 <code>equalTo(point)</code> 

Checks if points are equal

 Returns: <code>boolean</code> - returns true if points are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>point</code> | Point | <code></code> | Point | 

 <code>getCSS(units)</code> 

Returns size in form of CSS style object.

 Returns: <code>object</code> - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

 <code>scale(scale)</code> 

Scales the point location by the specified value

 Returns: <code>Point</code> - returns reference to the current point.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>scale</code> | number | <code></code> | scale | 

 <code>swap(point)</code> 

Swaps values of 2 points

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>point</code> | Point | <code></code> | The point to swap values with | 

 <code>toString(units)</code> 

Returns point in form of CSS style string.

 Returns: <code>string</code> - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

## Rect
Class describes the width, height and location of rectangle.

 <code>primitives.common.Rect</code> 

### Constructor

 <code>Rect(arg0, arg1, arg2, arg3)</code> 

Class describes the width, height and location of rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Rect | <code></code> | Rectangle to clone. | 
 | <code>arg0</code> | Point | <code></code> | The top left point. | 
 | <code>arg1</code> | Point | <code></code> | The bottom right point. | 
 | <code>arg0</code> | number | <code></code> | The x coordinate of top left corner. | 
 | <code>arg1</code> | number | <code></code> | The y coordinate of top left corner. | 
 | <code>arg2</code> | number | <code></code> | Rect width. | 
 | <code>arg3</code> | number | <code></code> | Rect height. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>context</code> | object | <code>null</code> | Reference to context object associated with this rectangle. | 
 | <code>height</code> | number | <code>null</code> | The height of rectangle. | 
 | <code>width</code> | number | <code>null</code> | The width of rectangle. | 
 | <code>x</code> | number | <code>null</code> | The location x coordinate | 
 | <code>y</code> | number | <code>null</code> | The location y coordinate | 

### Functions

 <code>addRect(arg0,  arg1,  arg2,  arg3)</code> 

Expands the rectangle boundaries to contain the specified rectangle.

 Returns: <code>Rect</code> - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Rect | <code></code> | The rectangle to contain. | 
 | <code>arg0</code> | number | <code></code> | The x coordinate of top left corner. | 
 | <code>arg1</code> | number | <code></code> | The y coordinate of top left corner. | 
 | <code>arg2</code> | number | <code>undefined</code> | Width. | 
 | <code>arg3</code> | number | <code>undefined</code> | Height. | 

 <code>bottom()</code> 

Bottom

 Returns: <code>number</code> - returns y-axis coordinate of the bottom side of the rectangle


 <code>centerPoint()</code> 

Center point

 Returns: <code>Point</code> - returns center point of the rectangle.


 <code>contains(arg0,  arg1)</code> 

Checks if the rectangle contains given point

 Returns: <code>boolean</code> - returns true if the rectangle contains the specified point; otherwise, false.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Point | <code></code> | The point to check. | 
 | <code>arg0</code> | number | <code></code> |  The x coordinate of the point to check. | 
 | <code>arg1</code> | number | <code></code> |  The y coordinate of the point to check. | 

 <code>cropByRect(rect)</code> 

Crops the rectangle by the boundaries of the specified rectangle.

 Returns: <code>Rect</code> - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>rect</code> | Rect | <code></code> | The rectangle that is used to crop boundaries by | 

 <code>equalTo(rect)</code> 

Checks if rectangles are equal

 Returns: <code>boolean</code> - returns true if rectangles are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>rect</code> | Rect | <code></code> | Rectangle | 

 <code>getCSS(units)</code> 

Returns rectangle location and size in form of CSS style object.

 Returns: <code>object</code> - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

 <code>horizontalCenter()</code> 

Horizontal center

 Returns: <code>number</code> - returns x-axis coordinate of the center point of the rectangle.


 <code>invert()</code> 

Inverts rectangle coordinates

 Returns: <code>Rect</code> - returns reference to the current rectangle.


 <code>isEmpty()</code> 

Checks if rectangle is empty. Rectangle is empty if one of its sizes is undefined or less than zero.

 Returns: <code>boolean</code> - returns true if rectangle is empty.


 <code>left()</code> 

Left

 Returns: <code>number</code> - returns x coordinate of the rectangle


 <code>loopEdges(callback)</code> 

Loops edges of the rectangle in the clockwise order: Top, Right, Bottom, Left

 Returns: <code>Rect</code> - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>callback</code> | loopRectEdgesCallback | <code></code> | A callback function to iterate over sides of the rectangle. | 
**Callbacks**

 <code>loopRectEdgesCallback(vector, placementType)</code> 

Callback for iterating rectangle's sides

 Returns: <code>boolean</code> - returns true to break iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | Vector | <code></code> | Vector connecting two corners of the rectangle's side | 
 | <code>placementType</code> | PlacementType | <code></code> | The current side | 

 <code>offset(arg0,  arg1,  arg2,  arg3)</code> 

Expands rectangle boundaries by using specified value in all directions. Value can be negative.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | number | <code></code> | The amount by which to expand or shrink the sides of the rectangle. | 
 | <code>arg0</code> | number | <code></code> | Left side | 
 | <code>arg1</code> | number | <code></code> | Top side | 
 | <code>arg2</code> | number | <code></code> | Right side | 
 | <code>arg3</code> | number | <code></code> | Bottom side | 

 <code>overlaps(rect)</code> 

Checks if the rectangle overlaps the specified rectangle

 Returns: <code>boolean</code> - returns true if two rectangles overlap each other.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>rect</code> | Rect | <code></code> | The rectangle to check overlaping for. | 

 <code>right()</code> 

Right

 Returns: <code>number</code> - returns x-axis coordinate of the right side of the rectangle


 <code>scale(scale)</code> 

Scales the rectangle by the specified value

 Returns: <code>Rect</code> - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>scale</code> | number | <code></code> | scale | 

 <code>toString(units)</code> 

Returns rectangle location and size in form of CSS style string.

 Returns: <code>string</code> - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

 <code>top()</code> 

Top

 Returns: <code>number</code> - returns y coordinate of the rectangle


 <code>translate(x,  y)</code> 

Moves the rectangle by the specified horizontal and vertical offsets.

 Returns: <code>Rect</code> - returns reference to the current rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>x</code> | number | <code></code> | Horizontal offset | 
 | <code>y</code> | number | <code></code> | Vertical offset | 

 <code>validate()</code> 

Validates rectangle properties

 Returns: <code>boolean</code> - returns true if rectangle properties are valid.


 <code>verticalCenter()</code> 

Vertical center

 Returns: <code>number</code> - returns y-axis coordinate of the center point of the rectangle.


## Matrix
Square matrix having 2 rows and 2 columns.

 <code>primitives.common.Matrix</code> 

### Constructor

 <code>Matrix(arg0, arg1, arg2, arg3)</code> 

Square matrix having 2 rows and 2 columns.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Matrix | <code></code> | Matrix to clone | 
 | <code>arg0</code> | number | <code></code> | A1 - top left. | 
 | <code>arg1</code> | number | <code></code> | B1 - top right. | 
 | <code>arg2</code> | number | <code></code> | A2 - bottom left. | 
 | <code>arg3</code> | number | <code></code> | B2 - bottom right. | 

### Functions

 <code>determinant()</code> 

Finds matrix determinant

 Returns: <code>number</code> - returns matrix determinant


## Size
Size object defines width and height.

 <code>primitives.common.Size</code> 

### Constructor

 <code>Size(arg0, arg1)</code> 

Size object defines width and height.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Size | <code></code> | Size object to clone. | 
 | <code>arg0</code> | number | <code></code> | Width. | 
 | <code>arg1</code> | number | <code></code> | Height. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>height</code> | number | <code>0</code> | The height | 
 | <code>width</code> | number | <code>0</code> | The width | 

### Functions

 <code>addSize(size)</code> 

Extends the current size by the other size.

 Returns: <code>Size</code> - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>size</code> | Size | <code></code> | The size to use as extension. | 

 <code>cropBySize(size)</code> 

Crops the size by the other size object.

 Returns: <code>Size</code> - returns reference to the current size object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>size</code> | Size | <code></code> | The size to use as the crop boundaries. | 

 <code>getCSS(units)</code> 

Returns size in form of CSS style object.

 Returns: <code>object</code> - css style object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

 <code>invert()</code> 

Inverts size dimensions

 Returns: <code>Size</code> - returns reference to the current size.


 <code>scale(scale)</code> 

Scales the size by the specified value

 Returns: <code>Size</code> - returns reference to the current size.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>scale</code> | number | <code></code> | scale | 

 <code>validate()</code> 

Validates size properties

 Returns: <code>boolean</code> - returns true if size properties are valid.


## Thickness
Class describes the thickness of a frame around rectangle.

 <code>primitives.common.Thickness</code> 

### Constructor

 <code>Thickness(left, top, right, bottom)</code> 

Class describes the thickness of a frame around rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>left</code> | number | <code></code> | Left. | 
 | <code>top</code> | number | <code></code> | Top. | 
 | <code>right</code> | number | <code></code> | Right. | 
 | <code>bottom</code> | number | <code></code> | Bottom. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>bottom</code> |  | <code>bottom</code> | The thickness for the bottom side of the rectangle. | 
 | <code>left</code> |  | <code>left</code> | The thickness for the left side of the rectangle. | 
 | <code>right</code> |  | <code>right</code> | The thickness for the right side of the rectangle. | 
 | <code>top</code> |  | <code>top</code> | The thickness for the upper side of the rectangle. | 

### Functions

 <code>isEmpty()</code> 

Checks object is empty

 Returns: <code>boolean</code> - returns true if object has no thickness defined for any of its sides


 <code>toString(units)</code> 

Returns thickness object in form of CSS style string. It is conversion to padding style string.

 Returns: <code>string</code> - css style string.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>units</code> | string | <code>"px"</code> | The string name of units. | 

## Vector
Class defines a vector in 2D plane.

 <code>primitives.common.Vector</code> 

### Constructor

 <code>Vector(arg0, arg1)</code> 

Class defines a vector in 2D plane.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | Vector | <code></code> | Vector object to clone. | 
 | <code>arg0</code> | Point | <code></code> | From point. | 
 | <code>arg1</code> | Point | <code></code> | To point | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>context</code> | object | <code>null</code> | Reference to context object associated with this vector. | 
 | <code>from</code> |  | <code>null</code> | The start point | 
 | <code>to</code> |  | <code>null</code> | The end point | 

### Functions

 <code>equalTo(vector)</code> 

Checks if vectors are equal

 Returns: <code>boolean</code> - returns true if vectors are equal.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | Vector | <code></code> | Vector | 

 <code>getIntersectionPoint(vector,  strict,  rounding)</code> 

Finds intersection point of two vectors

 Returns: <code>Point|null</code> - returns intersection point or null if intersection does not exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | Vector | <code></code> | The vector to find intersection with | 
 | <code>strict</code> | boolean | <code></code> | If true then intersection point should belong to both vectors | 
 | <code>rounding</code> | number | <code></code> | The precision of calculations | 

 <code>getLine()</code> 

Gets line

 Returns: <code>number[]</code> - returns line coefficients


 <code>getLineKey()</code> 

Gets line key

 Returns: <code>string</code> - returns unique line key


 <code>getMiddlePoint()</code> 

Returns middle point of the current vector

 Returns: <code>Point</code> - returns middle point


 <code>intersect(vector)</code> 

Checks if two vectors have intersection point

 Returns: <code>boolean</code> - returns true if vectors intersect

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | vector | <code></code> | The vector to check intersection with | 

 <code>isNull()</code> 

Checks if start and end points are the same

 Returns: <code>boolean</code> - returns true if start and end points are the same.


 <code>length()</code> 

Vector length

 Returns: <code>number</code> - returns vector length


 <code>offset(offset)</code> 

Offsets vector coordinates

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>offset</code> | number | <code></code> | Offset | 

 <code>relateTo(vector)</code> 

Finds how two vectors relate to each other

 Returns: <code>VectorRelationType</code> - returns how the vector relates to the specified vector

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>vector</code> | Vector | <code></code> | The vector to relate with | 
