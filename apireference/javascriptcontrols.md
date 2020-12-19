# JavaScript Controls
## <a name="OrgDiagram" id="OrgDiagram">OrgDiagram</a>
Creates JavaScript Organizational Chart Control

 `OrgDiagram` 

### Constructor

 `OrgDiagram(element, options)` 

Creates JavaScript Organizational Chart Control

 Returns: `OrgDiagram` - returns reference to organizational chart control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | `options` | OrgConfig | `` | Organizational Chart Configuration object | 

### Functions

 `destroy()` 

Removes all elements control added to DOM including event listeners.


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

Performs full redraw of the diagram contents via reevaluating all API options. This method has to be called explicitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `updateMode` | UpdateMode | `` | update Mode | 
 | `forceCenterOnCursor` | boolean | `` | force Center On Cursor | 

## <a name="FamDiagram" id="FamDiagram">FamDiagram</a>
Creates JavaScript Family Diagram Control

 `FamDiagram` 

### Constructor

 `FamDiagram(element, options)` 

Creates JavaScript Family Diagram Control

 Returns: `FamDiagram` - returns reference to family diagram control. since control adds event listeners bound to its contents, call `destroy` method to clean up everything.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `element` | object | `` | Reference to placeholder `div` element in the DOM. The control renders diagram content inside of that div element and adds events listeners. | 
 | `options` | FamConfig | `` | Family Diagram Configuration object | 

### Functions

 `destroy()` 

Removes all elements control added to DOM including event listeners.


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

Performs full redraw of the diagram contents via reevaluating all API options. This method has to be called explicitly after all options are set in order to update controls contents.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `updateMode` | UpdateMode | `` | update Mode | 
 | `forceCenterOnCursor` | boolean | `` | force Center On Cursor | 
