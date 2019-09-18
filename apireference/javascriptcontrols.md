# JavaScript Controls
## Control
Creates JavaScript Organizational Chart Control

 <code>primitives.orgdiagram.Control</code> 

### Constructor

 <code>Control(element, options)</code> 

Creates JavaScript Organizational Chart Control

 Returns: <code>orgdiagram</code> - returns reference to organizational chart control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>element</code> | object | <code></code> | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | <code>options</code> | Config | <code></code> | Organizational Chart Configuration object | 

### Functions

 <code>destroy()</code> 

Removes all elements control added to DOM incluidng event listeners.


 <code>getOption(option)</code> 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>option</code> | * | <code></code> | Option name | 

 <code>getOptions()</code> 

This method returns current configuration object.

 Returns: <code>object</code> - returns reference to current configuration object


 <code>setOption(option, value)</code> 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>option</code> | * | <code></code> | Option name | 
 | <code>value</code> | * | <code></code> | Option value | 

 <code>setOptions(options)</code> 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>options</code> | object | <code></code> | Options | 

 <code>update(updateMode, forceCenterOnCursor)</code> 

Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>updateMode</code> | UpdateMode | <code></code> | update Mode | 
 | <code>forceCenterOnCursor</code> | bollean | <code></code> | force Center On Cursor | 

## Control
Creates JavaScript Family Chart Control

 <code>primitives.famdiagram.Control</code> 

### Constructor

 <code>Control(element, options)</code> 

Creates JavaScript Family Chart Control

 Returns: <code>famdiagram</code> - returns reference to family diagram control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>element</code> | object | <code></code> | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | <code>options</code> | Config | <code></code> | Family Chart Configuration object | 

### Functions

 <code>destroy()</code> 

Removes all elements control added to DOM incluidng event listeners.


 <code>getOption(option)</code> 

This method returns configuration option by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>option</code> | * | <code></code> | Option name | 

 <code>getOptions()</code> 

This method returns current configuration object.

 Returns: <code>object</code> - returns reference to current configuration object


 <code>setOption(option, value)</code> 

Sets configuration option of the control by name.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>option</code> | * | <code></code> | Option name | 
 | <code>value</code> | * | <code></code> | Option value | 

 <code>setOptions(options)</code> 

Call this method to update controls configuration. Control uses default Config instance to initialize itself, so it sets only options provided in the options parameter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>options</code> | object | <code></code> | Options | 

 <code>update(updateMode, forceCenterOnCursor)</code> 

Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>updateMode</code> | UpdateMode | <code></code> | update Mode | 
 | <code>forceCenterOnCursor</code> | bollean | <code></code> | force Center On Cursor | 
