# Auxiliary JavaScript Controls
## <a name="ConnectorAnnotationControl" id="ConnectorAnnotationControl">ConnectorAnnotationControl</a>
Creates JavaScript Connector Annotation Control

 `ConnectorAnnotationControl` 

### Constructor

 `ConnectorAnnotationControl(element, options)` 

Creates JavaScript Connector Annotation Control

 Returns: `ConnectorAnnotationControl` - returns reference to connector annotation control.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders its content inside of that div element. | 
 | `options` | ConnectorAnnotationControlConfig | `` | Connector Annotation Configuration object | 

### Functions

 `getOption(option)` 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 

 `getOptions()` 

This method returns current configuration object.

 Returns: `object` - returns reference to current configuration object


 `setOption(option, value)` 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 
 | `value` | * | `` | Option value | 

 `setOptions(options)` 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | object | `` | Options | 

## <a name="ConnectorAnnotationControlConfig" id="ConnectorAnnotationControlConfig">ConnectorAnnotationControlConfig</a>
Connector annotation control configuration object. Use this object as a reference for available properties and their default values. Connector annotations control draws lines between two rectangles.

 `ConnectorAnnotationControlConfig` 

### Constructor

 `ConnectorAnnotationControlConfig(arg0)` 

Connector annotation control configuration object. Use this object as a reference for available properties and their default values. Connector annotations control draws lines between two rectangles.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `Colors.Black` | Connector line color | 
 | `connectorPlacementType` | ConnectorPlacementType | `Offbeat` | Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram. | 
 | `connectorShapeType` | ConnectorShapeType | `OneWay` | Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram. | 
 | `fromRectangle` | Rect | `null` | Defines connectors starting rectangle position. | 
 | `label` | string | `null` | Annotation label text. Label styled with css class name "bp-connector-label". | 
 | `labelOffset` | number | `4` | Label offset from connector line | 
 | `labelPlacementType` | ConnectorLabelPlacementType | `Between` | Sets conector label placement relative to connection line end points. Label can be placed between rectangles along connector line or close to one of them. | 
 | `labelSize` | Size | `{60, 30}` | Label size. It is used to position label without overlapping connected items. | 
 | `lineType` | string | `LineType.Solid` | Connector line pattern | 
 | `lineWidth` | number | `3` | Connector line width | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Connector line end points offset. By default connection lines start from the margin of the node's rectangle. If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle. | 
 | `orientationType` | OrientationType | `Top` | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | `toRectangle` | Rect | `null` | Defines connectors ending rectangle position. | 

## <a name="ShapeAnnotationControl" id="ShapeAnnotationControl">ShapeAnnotationControl</a>
Creates JavaScript Shape Annotation Control

 `ShapeAnnotationControl` 

### Constructor

 `ShapeAnnotationControl(element, options)` 

Creates JavaScript Shape Annotation Control

 Returns: `ShapeAnnotationControl` - returns reference to shape annotation control.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders its content inside of that div element. | 
 | `options` | ShapeAnnotationControlConfig | `` | Shape Annotation Configuration object | 

### Functions

 `getOption(option)` 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 

 `getOptions()` 

This method returns current configuration object.

 Returns: `object` - returns reference to current configuration object


 `setOption(option, value)` 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 
 | `value` | * | `` | Option value | 

 `setOptions(options)` 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | object | `` | Options | 

## <a name="ShapeAnnotationControlConfig" id="ShapeAnnotationControlConfig">ShapeAnnotationControlConfig</a>
Shape annotation control configuration object. Use this object as a reference for available properties and their default values. Shape annotations control draws shape around rectangle.

 `ShapeAnnotationControlConfig` 

### Constructor

 `ShapeAnnotationControlConfig(arg0)` 

Shape annotation control configuration object. Use this object as a reference for available properties and their default values. Shape annotations control draws shape around rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `borderColor` | string | `null` | Shape border line color. | 
 | `cornerRadius` | string, number | `"10%"` | Corner radius. Body corner radius in percents or pixels. For applicable shapes only. | 
 | `fillColor` | string | `null` | Shape background fill color. | 
 | `label` | string, undefined | `null` | Annotation label text. Label styled with css class name "bp-connector-label". | 
 | `labelOffset` | number | `4` | Label offset from shape in pixels. | 
 | `labelPlacement` | PlacementType | `Auto` | Label placement relative to the shape. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `Solid` | Shape border line pattern. | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Sets bounding rectangle offset | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `orientationType` | OrientationType | `Top` | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | `position` | Rect | `null` | Sets shapes bounding rectangle position. | 
 | `shapeType` | ShapeType | `Rectangle` | Shape | 

## <a name="CalloutAnnotationControl" id="CalloutAnnotationControl">CalloutAnnotationControl</a>
Creates JavaScript Callout Annotation Control

 `CalloutAnnotationControl` 

### Constructor

 `CalloutAnnotationControl(element, options)` 

Creates JavaScript Callout Annotation Control

 Returns: `CalloutAnnotationControl` - returns reference to callout annotation control.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders its content inside of that div element. | 
 | `options` | CalloutAnnotationControlConfig | `` | Callout Annotation Configuration object | 

### Functions

 `getOption(option)` 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 

 `getOptions()` 

This method returns current configuration object.

 Returns: `object` - returns reference to current configuration object


 `setOption(option, value)` 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 
 | `value` | * | `` | Option value | 

 `setOptions(options)` 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | object | `` | Options | 

## <a name="CalloutAnnotationControlConfig" id="CalloutAnnotationControlConfig">CalloutAnnotationControlConfig</a>
Callout annotation control configuration object. Use this object as a reference for available properties and their default values. Callout annotations control draws shape around rectangle.

 `CalloutAnnotationControlConfig` 

### Constructor

 `CalloutAnnotationControlConfig(arg0)` 

Callout annotation control configuration object. Use this object as a reference for available properties and their default values. Callout annotations control draws shape around rectangle.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `borderColor` | string | `Colors.Black` | Border line color | 
 | `cornerRadius` | string | `"10%"` | Callout annotation corner radius. | 
 | `fillColor` | string | `Colors.LightGray` | Background fill color | 
 | `lineType` | string | `LineType.Solid` | Border line pattern. | 
 | `lineWidth` | number | `1` | Border line width | 
 | `offset` | number | `0` | Callout body offset | 
 | `opacity` | number | `1` | Background fill opacity. | 
 | `pointerPlacement` | PlacementType | `Auto` | Sets callout pointer attachment to one of its sides or corners. | 
 | `pointerWidth` | string, number | `"10%"` | Pointer base width in percents or pixels. | 
 | `position` | Rect | `null` | Sets callout body position | 
 | `snapPoint` | Point | `null` | Sets callout snap point. | 

## <a name="RotatedTextControl" id="RotatedTextControl">RotatedTextControl</a>
Creates JavaScript Rotated Text Control

 `RotatedTextControl` 

### Constructor

 `RotatedTextControl(element, options)` 

Creates JavaScript Rotated Text Control

 Returns: `RotatedTextControl` - returns reference to shape annotation control.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders its content inside of that div element. | 
 | `options` | RotatedTextControlConfig | `` | Rotated Text Annotation Configuration object | 

### Functions

 `getOption(option)` 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 

 `getOptions()` 

This method returns current configuration object.

 Returns: `object` - returns reference to current configuration object


 `setOption(option, value)` 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `option` | * | `` | Option name | 
 | `value` | * | `` | Option value | 

 `setOptions(options)` 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | object | `` | Options | 

## <a name="RotatedTextControlConfig" id="RotatedTextControlConfig">RotatedTextControlConfig</a>
Rotated text control configuration object. Use this object as a reference for available properties and their default values. The rotated text control positions and aligns text within a div element.

 `RotatedTextControlConfig` 

### Constructor

 `RotatedTextControlConfig(arg0)` 

Rotated text control configuration object. Use this object as a reference for available properties and their default values. The rotated text control positions and aligns text within a div element.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `color` | string | `Colors.Black` | Font color | 
 | `fontFamily` | string | `"Arial"` | Font family | 
 | `fontSize` | string | `"16px"` | Font size | 
 | `fontStyle` | string | `"normal"` | Font style: normal | italic | 
 | `fontWeight` | string | `"normal"` | Font weight: normal | bold | 
 | `horizontalAlignment` | HorizontalAlignmentType | `Center` | Label horizontal alignment inside bounding rectangle. | 
 | `orientation` | TextOrientationType | `Horizontal` | Label orientation. | 
 | `text` | string | `""` | The text | 
 | `verticalAlignment` | VerticalAlignmentType | `Middle` | Label vertical alignment inside bounding rectangle. | 
