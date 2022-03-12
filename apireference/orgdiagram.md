# Organizational Chart Configuration Objects
## <a name="OrgConfig" id="OrgConfig">OrgConfig</a>
Organizational Chart configuration object. Use this object as a reference for available properties and their default values. Organizational Chart control has API options similar to regular UI collection controls. It supports single node selection with the `cursorItem` property, mouse click, or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems` collection and checkboxes enable multi-select available in ListView and TreeView controls.

 `OrgConfig` 

### Constructor

 `OrgConfig(name)` 

Organizational Chart configuration object. Use this object as a reference for available properties and their default values. Organizational Chart control has API options similar to regular UI collection controls. It supports single node selection with the `cursorItem` property, mouse click, or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems` collection and checkboxes enable multi-select available in ListView and TreeView controls.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `name` | string | `` | name | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotations` | Array.<(ShapeAnnotationConfi | `[]` | Annotations are visual elements attached to the diagram nodes and designed to spotlight some nodes or relations. They are drawn either in front of the diagram or the background. The annotations don't impact the placement of the nodes, though, with some exceptions. As a result, the control redraws them instantaneously without rendering or recalculating the actual diagram layout. | 
 | `cursorItem` | string | `null` | The cursor item provides a single node selection, navigation, and local zoom in the diagram. The component shows the cursor, neighbors, and selected nodes using templates and folds everything into markers to save space. So clicking and moving the cursor from node to node works as stepping in and expanding nodes in the neighboring diagram area. To select cursor node with keyboard, use arrow keys to change focus selection first in the diagram and press the `Enter` key to set the `cursorItem` to the required node. See the'onCursorChanging` and `onCursorChanged` events to handle user clicks on nodes. If the cursor item is set to null, then no cursor item is selected in the diagram. | 
 | `emptyDiagramMessage` | string | `"Diagram is empty."` | Empty diagram message. This option should tell the user that the chart is blank when no data is available for rendering. | 
 | `enablePanning` | boolean | `true` | The enable panning property enables chart panning with mouse drag for desktop browsers. Disable it if you need to support items Drag & Drop. | 
 | `hasSelectorCheckbox` | Enabled | `Auto` | The selection checkboxes are built-in UI elements managing the `selectedItems` collection property. `Auto` - visible for cursor item only `True` - visible `False` - hidden Adding a custom checkbox element to the item template requires its name to be `checkbox`, so the control can use it the same way as the built-in checkbox element. | 
 | `highlightGravityRadius` | number | `40` | The highlight gravity radius controls distance to the nearest marker to trigger the highlight setting and callout annotation. For the templated nodes, it is required for the mouse to be inside the node's bounding rectangle to activate the highlight setting. It can be problematic to put the mouse precisely over the marker. The gravity radius helps to overcome that issue, but at the same time, it can be a source of performance if the component gets too many markers within the scope of the gravity radius. Please, keep this in mind and don't make it too big. It is crucial when the diagram has over 5 thousand nodes in the hierarchy. | 
 | `highlightItem` | string | `null` | The highlighted item sets focus to some node in the diagram. It is a redundant feature on touch screen devices, so use the `navigationMode` property to disable it. The highlight item can be set programmatically, with mouseover, keyboard arrow keys, or the `Tab` key. The default visual is a rounded rectangle; use templates to customize the highlight's graphic. The highlight item setting does not trigger diagram layout or scrolling, so it is near-instant. It is designed to synchronize mouse moves over diagram nodes with other collection controls or UI elements. The component triggers  the `onHighlightChanging` and `onHighlightChanged` events on highlight changes. Set it to `null` to hide the highlight of the diagram. | 
 | `items` | OrgItemConfig[] | `[]` | The items collection defines the data we render in the diagram. Every item should have a unique `id`. They are used to create relations between the nodes of the graph and render various UI elements associated with nodes. | 
 | `navigationMode` | NavigationMode | `Default` | The navigation mode property allows disabling control interactivity. By default, the control behaves like a regular collection control. It has a cursor to select a single item in the collection. So user can click and select any node in the diagram. The control has a highlight for mouseover feedback. So user can move the mouse and see highlight frame and callout callback annotation for a node under the cursor. By `Default`, the control has both cursor and highlight. If they are disabled, then control is rendered as a static image. | 
 | `scale` | number | `1` | The scale property sets the CSS scale-transform property for the diagram content. | 
 | `selectedItems` | string[] | `[]` | The selected items collection property allows the end-user to choose multiple nodes in the diagram. It is a collection of ids of checked nodes. The selected items impact the diagram layout and navigation process since they are always shown in the expanded templated form. So it also helps users pin nodes while they browse in the diagram. The control notifies about the user changes in this collection with the `onSelectionChanging` and the `onSelectionChanged` events. | 

### Auto Layout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `alignBranches` | boolean | `false` | The align branches property enables cross-branch nodes alignment. In the Organizational Chart layout, the number of rows occupied by the immediate children depends on the number of assistants, advisers, and levels of children of the node. So nodes at the same logical level in the organizational chart hierarchy require visual alignment. As expected, the control aligns regular horizontally placed children across branches of the hierarchy. But it supports the alignment of Assistants, SubAssistants, Advisers, and SubAdvisers hierarchies and child nodes in vertical and matrix formations across departments. The component supports the infinite nesting of children layers and their alignment across hierarchy branches. | 
 | `autoSizeMaximum` | Size | `{1024, 768}` | Sets maximum size, the diagram can expand itself in auto size mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accommodate all nodes and render them normally. | 
 | `autoSizeMinimum` | Size | `{800, 600}` | Sets minimum size, the diagram can shrink itself in auto size mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accommodate all nodes and render them normally. | 
 | `childrenPlacementType` | ChildrenPlacementType | `Horizontal` | The children's placement type sets default children's layout formation. The control places children in a horizontal line below the parent node by default. That may result in the end-user having to scroll screens to view many child nodes. So to compensate for this, the component supports placing children in a square/matrix and vertical formation. It reduces sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. See the 'levelOffset' and the 'itemType' on `OrgItemConfig` for more layout options. | 
 | `horizontalAlignment` | HorizontalAlignmentType | `Center` | The horizontal alignment allows the transformation of hierarchy into a folder-like tree visualization, where the parent node is aligned with the first child. If alignment is set to center, then the parent node is aligned to the children's center. In the `Left` alignment mode parent is aligned to left most child and vice versa for the `Right` alignment. | 
 | `leavesPlacementType` | ChildrenPlacementType | `Horizontal` | The leaves placement type property sets default children formation of leave children. See the `childrenPlacementType` for more details. | 
 | `maximumColumnsInMatrix` | number | `6` | The maximum number of columns in the matrix formation prevents it from outgrowing screen width and forces it to grow vertically. | 
 | `minimalVisibility` | Visibility | `Dot` | The minimal nodes visibility option controls how small nodes of the diagram can be in auto-fit mode. | 
 | `minimumVisibleLevels` | number | `1` | The minimum visible levels option prevents top-level nodes from folding into markers. It accounts for organizational chart relations and the `levelOffset` of individual items. | 
 | `orientationType` | OrientationType | `Top` | The orientation property rotates the diagram layout. It is needed for right-to-left languages support and custom layouts. | 
 | `pageFitMode` | PageFitMode | `FitToPage` | The page fit mode option minimizes the diagram size via replacing nodes with markers and labels. That mode can show a large number of nodes while not affecting the rendering performance. It can fit thousands of nodes into available screen space without losing usability. On the other hand, when we use a graphics editor to draw our diagrams manually, it is common to have a sparse layout with significant gaps between the nodes. If we don't fit the graph, the space between nodes can easily make the diagram/chart unusable hard to view, edit and navigate. | 
 | `placeAdvisersAboveChildren` | boolean | `true` | The property sets default placement of advisers hierarchies relative to the regular children of the node. If the adviser node has its children, then control adds extra levels, so the adviser's children are placed above the regular children. | 
 | `placeAssistantsAboveChildren` | boolean | `true` | The property sets the default placement of assistants hierarchies relative to the regular children of the node. If the assistant node has its children, control adds extra levels, so the assistant's children are placed above the regular children. | 
 | `selectionPathMode` | SelectionPathMode | `FullStack` | The selection path mode property makes all parents of the cursor item up to the root node to be shown with templates. It is a complimentary feature to the auto-fit mode of the diagram. See the `pageFitMode` for more details. | 
 | `verticalAlignment` | VerticalAlignmentType | `Middle` | The vertical alignment sets nodes alignment inside row's vertical boundaries. If a row of nodes contains nodes of multiple sizes, small nodes are vertically aligned relative to their bigger siblings. It does not change anything if diagram nodes are all of the same size. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutBorderColor` | string | `null` | Callout annotation border color. | 
 | `calloutCornerRadius` | number | `4` | Callout annotation corner radius. | 
 | `calloutLineWidth` | number | `1` | Callout annotation border line width. | 
 | `calloutMaximumVisibility` | Visibility | `Dot` | The callout maximum visibility property enables callout for the diagram nodes having specified visibility. See the `pageFitMode` property. | 
 | `calloutOffset` | number | `4` | Callout annotation border line offset. | 
 | `calloutOpacity` | number | `0.2` | Callout annotation opacity | 
 | `calloutPlacementOffset` | number | `100` | The callout annotation placement offset sets how far the callout rectangle is offset from the marker it is displayed for. | 
 | `calloutPointerWidth` | string | `"10%"` | Callout annotation pointer width. | 
 | `calloutfillColor` | string | `"#000000"` | Callout annotation fill color. | 
 | `defaultCalloutTemplateName` | string | `null` | The callout default template name. Templates are HTML fragments used to render diagram nodes. They are defined with named configuration objects. See the `templates` property for more details. | 
 | `showCallout` | boolean | `true` | The show callout property enables on mouse over node callout for the diagram. | 

### Frame Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `frameInnerPadding` | Thickness | `{2, 2, 2, 2}` | The frame's inner padding adds extra padding around markers on the inner side of the frame. | 
 | `frameOuterPadding` | Thickness | `{2, 2, 2, 2}` | The frame's outer padding adds extra padding around markers on the outer side of the frame. | 
 | `padding` | Thickness | `{10, 10, 10, 10}` | The diagram padding adds extra padding around the diagram nodes. | 
 | `showFrame` | boolean | `false` | The show frame controls the visibility of decorating frame around the diagram. The frame displays markers for selected nodes in the chart when they are outside the screen and not visible to the end-user. | 

### Group Titles Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | Group titles color. | 
 | `groupTitleFontFamily` | string | `"Arial"` | Group titles font family. | 
 | `groupTitleFontSize` | number | `"12px"` | Group titles font size. | 
 | `groupTitleFontStyle` | string | `"normal"` | Group titles font style: normal, italic | 
 | `groupTitleFontWeight` | string | `"normal"` | Group titles font weight: normal, bold | 
 | `groupTitleHorizontalAlignment` | HorizontalAlignmentType | `Center` | The group titles horizontal alignment property sets text horizontal alignment inside the group title panel. | 
 | `groupTitleOrientation` | TextOrientationType | `RotateRight` | Group titles orientation. | 
 | `groupTitlePanelSize` | number | `24` | The size of the group title | 
 | `groupTitlePlacementType` | AdviserPlacementType | `Left` | The group titles placement property sets left to right or right to left alignment for group title and buttons panel relative to the node. | 
 | `groupTitleVerticalAlignment` | VerticalAlignmentType | `Middle` | The group titles vertical alignment property sets text vertical alignment inside the group title panel. | 

### Intervals Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cousinsIntervalMultiplier` | number | `5` | The cousins' interval multiplier property adds extra space between branches of the hierarchy. For example, if the multiplier equals five, nodes of the same parent will have interval 20, and nodes of two different parents will have interval 100. | 
 | `dotItemsInterval` | number | `1` | The dotted items interval property sets the spacing between markers. | 
 | `dotLevelShift` | number | `20` | The dot level shift property sets the spacing between rows of markers. | 
 | `lineItemsInterval` | number | `2` | The line items interval property sets the spacing between lines. | 
 | `lineLevelShift` | number | `10` | The lines level shift property sets the spacing between rows having only connection lines. Nodes are hidden completely. | 
 | `normalItemsInterval` | number | `10` | The normal items interval property sets the spacing between templated nodes. | 
 | `normalLevelShift` | number | `20` | The normal level shift sets spacing between rows of templated nodes. | 

### Labels Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `labelColor` | string | `Colors.Black` | Labels color | 
 | `labelFontFamily` | string | `"Arial"` | Labels font family. | 
 | `labelFontSize` | string | `"10px"` | Labels font size. | 
 | `labelFontStyle` | string | `"normal"` | Labels font style. Font style: normal, italic | 
 | `labelFontWeight` | string | `"normal"` | Labels font weight Font weight: normal, bold | 
 | `labelOffset` | number | `1` | The label offset property sets the distance from the markers bounding rectangles. | 
 | `labelOrientation` | TextOrientationType | `Horizontal` | Label orientation defines label rotation. | 
 | `labelPlacement` | PlacementType | `Top` | Label placement sets label placement around the marker. | 
 | `labelSize` | Size | `{80, 24}` | The label size property defines the label's placeholder `div` size, which impacts conflict resolution if labels overlap. | 
 | `showLabels` | Enabled | `Auto` | The show label property sets labels visibility for individual nodes. The control displays label only for node markers. The control does not preserve space for labels in the diagram layout. The application's responsibility is to set intervals between nodes to fit labels. Use controls `dotLevelShift`, `dotItemsInterval` and `padding` properties to preserve space between nodes for labels. Labels are displayed inside `div's of the fixed size, see the `labelSize` property, and the control provides simple conflict resolution to avoid displaying overlapping labels. If two labels overlap with their bounding rectangles, then only one of them will stay visible. Auto - avoid labels overlapping, hide some of them True - visible False - hidden. | 

### Level Titles Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelTitleColor` | string | `Colors.RoyalBlue` | Level titles color. | 
 | `levelTitleFontColor` | string | `Colors.White` | Level titles font color. | 
 | `levelTitleFontFamily` | string | `"Arial"` | Level titles font family. | 
 | `levelTitleFontSize` | number | `"12px"` | Level titles font size. | 
 | `levelTitleFontStyle` | string | `"normal"` | Level titles font style: normal, italic | 
 | `levelTitleFontWeight` | string | `"normal"` | Level titles font weight: normal, bold | 
 | `levelTitleHorizontalAlignment` | HorizontalAlignmentType | `Center` | The level annotation titles horizontal alignment. | 
 | `levelTitleOrientation` | TextOrientationType | `Auto` | The level annotation titles orientation. | 
 | `levelTitlePanelSize` | number | `24` | The panel size of the level annotation titles | 
 | `levelTitlePlaceInside` | boolean | `false` | If this property is true, level titles are placed inside the diagram's viewport above or below diagram nodes. | 
 | `levelTitlePlacementType` | AdviserPlacementType | `Left` | The panel placement of the level annotation titles | 
 | `levelTitleVerticalAlignment` | VerticalAlignmentType | `Middle` | The level annotation titles vertical alignment. | 

### Relation Lines Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arrowsDirection` | GroupByType | `None` | The arrows direction property shows arrows for connector lines. If it is set to the `Parents`, arrows are drawn towards logical parents from logical children. | 
 | `bevelSize` | number | `4` | The bevel size of squared connection lines. | 
 | `connectorType` | ConnectorType | `Squared` | The connector type option defines the style of connection lines in the diagram. It is only applicable to nodes minimized to markers or lines. The templated nodes are always connected with squared connection lines | 
 | `elbowDotSize` | number | `4` | The elbow dot size property sets marker size in elbows of connector lines. | 
 | `elbowType` | ElbowType | `None` | The elbow type of squared connection lines | 
 | `extraArrowsMinimumSpace` | number | `30` | The extra arrows minimum space on horizontal connection lines. See `showExtraArrows` property. | 
 | `highlightLinesColor` | string | `Colors.Red` | The color of the highlighted relation lines. | 
 | `highlightLinesType` | LineType | `Solid` | The line style of the highlighted relation lines. | 
 | `highlightLinesWidth` | number | `1` | The line width of the highlighted relation lines. | 
 | `linesColor` | string | `Colors.Silver` | The color of the relations lines | 
 | `linesType` | LineType | `Solid` | The line style of the relations lines | 
 | `linesWidth` | number | `1` | The line width of the relations lines | 
 | `showExtraArrows` | boolean | `false` | Show extra horizontal arrows for long horizontal connection lines for the easy visual tracking of relations between parents and children. By default, it is off. | 

### Templates Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `buttonsPanelSize` | number | `28` | The size of the button panel | 
 | `checkBoxPanelSize` | number | `24` | The size of the selection checkbox | 
 | `defaultTemplateName` | string | `null` | The default template name property allows overriding the default template for all nodes without setting the template name individually per node. See the `templates` property for mode details. To customize the template per node, see the `templateName` property of the `OrgItemConfig`. | 
 | `hasButtons` | Enabled | `Auto` | The button visibility is a legacy property. The only reason it is still available on the components API is the lack of consistent support of the mouse transparency across browsers. The buttons panel is placed over all other visuals in the diagram, so they are not obstructed by the connector and shape annotations. `Auto` - cursor item only. `True` - visible `False` - hidden | 
 | `itemTitleFirstFontColor` | string | `Colors.White` | The first choice title color. The component has two properties for the title color to automatically select the one having the highest contract for the node's background-color | 
 | `itemTitleSecondFontColor` | string | `Colors.Navy` | The second choice title color. | 
 | `minimizedItemShapeType` | ShapeType | `None` | The markers shape type property sets the default marker shape for nodes. It is possible to set it individually for every node or in the item template. By default color of the marker is equal to the `itemTitleColor` property set for individual items. | 
 | `selectCheckBoxLabel` | string | `"Selected"` | The checkbox label. See `hasSelectorCheckbox` and `selectedItems` properties. | 
 | `templates` | TemplateConfig[] | `[]` | The templates property is a collection of uniquely named templates objects used to customize nodes' size, interactivity, and visuals for content, cursor, and highlight. By default, the control provides templates for all types of visual elements. So to start experimenting with the Basic Primitives library, you don't need to define any templates. | 

**Events**

 `onButtonClick(event, data)` 

The on content button click event is a legacy property. To use it, buttons in the buttons panel in the item template should have the `data-buttonname` property set.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onButtonsRender(data)` 

The event property is used to render the content of the buttons panel.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorChanged(event, data)` 

The on cursor item changed event. See `cursorItem` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorChanging(event, data)` 

This callback function is called before the `onCursorChanged` event. See the `cursorItem` property. Use properties of this event to stop event propagation and the following diagram layout and rendering if needed.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorRender(event, data)` 

The on cursor render callback function is used to update the cursor visual content having a custom template.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onGroupTitleRender(data)` 

On group title render event. This callback function renders the group title panel. It overwrites the default group title renderer. It is called only when the group title is visible. See other group title options for details.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `data` | EventArgs | `` | Context information | 

 `onHighlightChanged(event, data)` 

The on highlight changed event. See `highlightItem` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onHighlightChanging(event, data)` 

This callback function is called before the `onHighlightChanged` event. See the `highlightItem` property. Use this event to modify diagram elements not affecting diagram layout. For example, on-screen connector annotations added in this event handler to the diagram configuration would be rendered together with highlight. Use properties of this event to stop event propagation and the following diagram layout and rendering if needed.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information. | 

 `onHighlightRender(event, data)` 

The on highlight render callback function is used to update the highlight visual content having a custom template.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onItemRender(event, data)` 

The on item render callback function is used to populate the content of templated nodes in the diagram. It is called for user templates only. The callback references the DOM element and the node configuration object. The control reuses existing DOM elements, so the application should update the entire content of the template.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onLevelBackgroundRender(data)` 

The level background callback function allows rendering custom content in the level annotation background panel. It is called only for the visible level annotations. See other level annotation options for details.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `data` | EventArgs | `` | Context information | 

 `onLevelTitleRender(data)` 

The level title callback function allows rendering custom content in the level annotation title panel. It is called only for the visible level annotations. See other level annotation options for details.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `data` | EventArgs | `` | Context information | 

 `onMouseClick(event, data)` 

Mouse click event.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onMouseDblClick(event, data)` 

Mouse double click event.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onSelectionChanged(event, data)` 

The on selected items changed event. See `selectedItems` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onSelectionChanging(event, data)` 

The on selected items being changed event. See `selectedItems` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 
## <a name="OrgItemConfig" id="OrgItemConfig">OrgItemConfig</a>
Organizational chart item configuration object defines properties of individual nodes in the organizational chart hierarchy. Nodes configurations populate the `items` collection property of the organizational chart configuration object used to describe the entire component configuration.

 `OrgItemConfig` 

### Constructor

 `OrgItemConfig(arg0, arg1, arg2, arg3, arg4)` 

Organizational chart item configuration object defines properties of individual nodes in the organizational chart hierarchy. Nodes configurations populate the `items` collection property of the organizational chart configuration object used to describe the entire component configuration.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | OrgItemConfig | `` | Item config properties | 
 | `arg0` | string | `` | Item id | 
 | `arg1` | string | `` | Parent id | 
 | `arg2` | string | `` | Title | 
 | `arg3` | string | `` | Description | 
 | `arg4` | string | `` | Image | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `adviserPlacementType` | AdviserPlacementType | `Auto` | Adviser placement type sets node placement relative to the parent item on the left or right side of the parent's hierarchy. If it is set to `Auto`, the control's configuration object property is used. | 
 | `childrenPlacementType` | ChildrenPlacementType | `Auto` | The children's placement type sets children's layout formation. Control places children in a horizontal line below the parent node by default. That may result in the end-user having to scroll screens to view many child nodes. Placing children in a square/matrix formation compensates for this. It reduces sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. | 
 | `hasSelectorCheckbox` | Enabled | `Auto` | It controls the visibility of the selection check box for the node. The selection checkbox is a default, easy-to-use feature to add and remove nodes to selected items collection. Auto - depends on the control's configuration `hasSelectorCheckbox` property setting. True - visible False - hidden | 
 | `id` | string | `null` | Unique item id | 
 | `isActive` | boolean | `true` | If it is true, it makes the node inactive in the diagram layout. The inactive item is excluded from navigation, which means it is not clickable, and it is impossible to set the cursor to it. Consider the inactive node as an in-layout label or title having a custom item template. It is worth mentioning that it impacts cursor neighbors selection. The component skips the static node and selects its neighbors instead. | 
 | `isVisible` | boolean | `true` | If `false`, it makes the item invisible in the layout. If the item has no visible parents, its connections are hidden as well. From the navigation perspective, children of hidden nodes become children of their parents. | 
 | `itemType` | ItemType | `Regular` | Item type defines child node placement relative to its parent node. By default, all children of the same parent node are of the same rank and status are aligned below the parent in a horizontal line. However, for exceptional cases where the end-user wishes to have a child separate from the rest of its siblings, we provide custom child types that the end-user can use to place different ranking nodes anywhere around the parent node. These placement options give a lot of space for creating roles such as an Assistant, Adviser, various Partners, and co-heads in the organization. | 
 | `levelOffset` | number | `null` | Level offset organizes some node types, like regular children and assistants, into multiple rows. | 
 | `parent` | string | `null` | Parent item id. If `null`, then the node is the root item of the hierarchy. | 
 | `placeAdvisersAboveChildren` | Enabled | `Auto` | The property sets placement of advisers hierarchies relative to the regular children of the node. If the adviser node has its children, then control adds extra levels, so the adviser's children are placed above the regular children. | 
 | `placeAssistantsAboveChildren` | Enabled | `Auto` | The property sets the placement of assistants hierarchies relative to the regular children of the node. If the assistant node has its children, control adds extra levels, so the assistant's children are placed above the regular children. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutTemplateName` | string | `null` | Callout annotation template name redefined default item template used to display the content of the callout annotation. Templates contain size and HTML fragments to display node content. See the `templates` property of the organizational chart control configuration object. | 
 | `showCallout` | Enabled | `Auto` | Show callout property sets callout annotation visibility per individual node. The callout annotation is one of the easy-to-use features of the control. It is displayed for markers to preview the node's content. The content is displayed using the current node template it is rendered for. The callout can be forced to be displayed for templated nodes as well. In that case, use the `calloutTemplateName` property to change the callout template. Auto - depends on the control's configuration `showCallout` property setting True - always visible False - hidden | 

### Group Title Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitle` | string | `null` | Group Title. The group title is a panel on the side of the node with rotated text inside. It is one of the control's default easy-to-use features. It gives extra dimension for the visual grouping in the diagram. | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | The group title background color. | 

### Label Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `label` | string | `null` | Marker label. | 
 | `labelOrientation` | TextOrientationType | `Auto` | Label orientation defines label rotation. If it is `Auto`, it uses the `labelOrientation` property of the control configuration. | 
 | `labelPlacement` | PlacementType | `Auto` | Label placement sets label placement around the marker. If it is `Auto`, it uses the `labelPlacement` of the control configuration. | 
 | `labelSize` | Size | `null` | The label size property defines the label's placeholder `div` size, which impacts conflict resolution if labels overlap. If it is `null`, it uses the `labelSize` property of the control configuration. | 
 | `showLabel` | Enabled | `Auto` | The show label property sets labels visibility for individual nodes. The control displays label only for node markers. The control does not preserve space for labels in the diagram layout. The application's responsibility is to set intervals between nodes to fit labels. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside `div's of the fixed size, see the `labelSize` property, and the control provides simple conflict resolution to avoid displaying overlapping labels. If two labels overlap each other with their bounding rectangles, then only one of them will stay visible. Auto - avoid labels overlapping, hide some of them True - visible False - hidden. | 

### Template Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Context object | 
 | `description` | string | `null` | Description | 
 | `hasButtons` | Enabled | `Auto` | It controls the visibility of the context buttons panel for the node. The context buttons panel is a built-in, easy-to-use feature to add interactive UI elements around the cursor node. On-screen annotations do not block context buttons panel as well. Auto - depends on the control's configuration `hasButtons` property setting True - visible False - hidden | 
 | `image` | string | `null` | Image. It is used in the default template. | 
 | `itemTitleColor` | string | `Colors.RoyalBlue` | Title background color for default template. When the node is displayed in its minimized form, it also sets the marker color. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when the node is minimized in the diagram layout. The component is designed for automatic nodes positioning; it optimizes nodes placement and size depending on the available screen space. When the diagram size is significantly larger than the available screen space, its scrolling and navigation become problematic, so control replaces some nodes with markers. That feature has a lot of options for tuning. | 
 | `templateName` | string | `null` | Template name lets individually assign rendering templates per individual node of the diagram. Templates contain settings defining node size, interactivity options, and HTML fragments to render nodes. See the organization chart configuration object for the `templates` property. | 
 | `title` | string | `null` | Title. It is used in the default template. | 

## <a name="OrgEventArgs" id="OrgEventArgs">OrgEventArgs</a>
Context object

 `OrgEventArgs` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cancel` | boolean | `false` | If true cancels subsequent event and layout update. | 
 | `context` | string | `null` | New item | 
 | `name` | string | `null` | Relative object name. | 
 | `oldContext` | string | `null` | Current item | 
 | `position` | Rect | `null` | Node position on the diagram. | 
