# JavaScript Controls
## <a name="primitives.orgdiagram.Control" id="primitives.orgdiagram.Control">Control</a>
Creates JavaScript Organizational Chart Control

 `primitives.orgdiagram.Control` 

### Constructor

 `Control(element, options)` 

Creates JavaScript Organizational Chart Control

 Returns: `orgdiagram` - returns reference to organizational chart control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | `options` | Config | `` | Organizational Chart Configuration object | 

### Functions

 `destroy()` 

Removes all elements control added to DOM incluidng event listeners.


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

 `update(updateMode, forceCenterOnCursor)` 

Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `updateMode` | UpdateMode | `` | update Mode | 
 | `forceCenterOnCursor` | bollean | `` | force Center On Cursor | 

## <a name="primitives.famdiagram.Control" id="primitives.famdiagram.Control">Control</a>
Creates JavaScript Family Chart Control

 `primitives.famdiagram.Control` 

### Constructor

 `Control(element, options)` 

Creates JavaScript Family Chart Control

 Returns: `famdiagram` - returns reference to family diagram control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | `options` | Config | `` | Family Chart Configuration object | 

### Functions

 `destroy()` 

Removes all elements control added to DOM incluidng event listeners.


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

 `update(updateMode, forceCenterOnCursor)` 

Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `updateMode` | UpdateMode | `` | update Mode | 
 | `forceCenterOnCursor` | bollean | `` | force Center On Cursor | 
