# Organizational Chart Configuration Objects
## <a name="OrgConfig" id="OrgConfig">OrgConfig</a>
Organizational Chart configuration object. Use this object as a reference for available properties and their default values.

 `OrgConfig` 

### Constructor

 `OrgConfig(name)` 

Organizational Chart configuration object. Use this object as a reference for available properties and their default values.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `name` | string | `` | name | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotations` | Array.<(ShapeAnnotationConfi | `[]` | Annotations. Annotations are API elements attached to the diagram nodes and designed to highlight some nodes or relations. We draw our annotations either in front of the nodes or in the background. The annotations don't affect the placement of the nodes in any way. We have some exceptions. As a result, the control redraws them instantaneously without rendering or recalculating the actual diagram layout. | 
 | `cursorItem` | string | `null` | Cursor item. Organization Chart control has API options equivalent to standard UI controls. The cursor item is used to select a single item in the hierarchy with a mouse click, and the highlighted item provides visual feedback on the mouse over. Selected items collection is equivalent to checked items in ListView or TreeView controls. The chart's navigation work around the current cursor item. The component shows the cursor and its neighbors regardless of page fit mode. So cursor item plays the role of local zoom in the chart hierarchy. The user navigates around the chart via clicking and selecting cursor items and zooming into data around the new cursor item. The control notifies about this property changes with `onCursorChanging` and `onCursorChanged` events. If the cursor item is set to null, then no cursor item is selected in the diagram. | 
 | `emptyDiagramMessage` | string | `"Diagram is empty."` | Empty diagram message. This option is supposed to say user that chart is empty when no data is available for rendering. | 
 | `enablePanning` | boolean | `true` | Enable panning. Enable chart panning with mouse drag & drop for desktop browsers. Disable it if you need to support items Drag & Drop. | 
 | `hasSelectorCheckbox` | Enabled | `Auto` | Sets visibility of selection check boxes for the diagram nodes. `Auto` - visible for cursor item only `True` - visible `False` - hidden See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes. Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element. | 
 | `highlightGravityRadius` | number | `40` | Highlight gravity radius. This property controls mouse over feedback and callout annotation visibility for nodes rendered as markers when diagram auto fits nodes into available screen space. It makes marker highlighted when mouse pointer is inside of the gravity radius cycle of the marker. This property is ignored when the nearest item is outside of the screen boundaries and is not visible to the end user. The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. | 
 | `highlightItem` | string | `null` | Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram layout or scrolling so it can be used to synchronize mouse over feedback of the diagram nodes with other collection controls or UI elements. The control notifies about this property changes with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no highlight shown on the diagram. | 
 | `items` | OrgItemConfig[] | `[]` | Items collection. Ths property defines data we render in the diagram. Every item should have set unique `id` property. They are used to create relations between items in the diagram and for rendering of various UI elements bound to nodes. | 
 | `navigationMode` | NavigationMode | `Default` | Sets control navigation mode. By default control replicates interactivity of regular collection control. It has cursor to select single item in the collection. So user can click and select any node in the diagram. The control has highlight for mouse over feedback. So user can move mouse and see highlight frame and callout callback annotation for node under cursor. By `Default` the control has both cursor and highlight. If they are disabled then control is rendered as a static image. | 
 | `scale` | number | `1` | CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars. It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers, it looks good only in mobile browsers, so our recommendation is to use zoom with collection of item templates of various sizes. Templates gives you better control over quality of your content at various zoom levels. | 
 | `selectedItems` | string[] | `[]` | Selected items collection. Selected items is a collection of items ids having checked their check boxes. The control always shows selected items in the full size form, regardless of enabled page fit mode. The control notifies about user made changes in this collection with `onSelectionChanging` and `onSelectionChanged` events. | 

### Auto Layout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `autoSizeMaximum` | Size | `{1024, 768}` | Sets maximum size the diagram can expand itself in auto size mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accommodate all nodes and render them normally. | 
 | `autoSizeMinimum` | Size | `{800, 600}` | Sets minimum size the diagram can shrink itself in auto size mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accommodate all nodes and render them normally. | 
 | `childrenPlacementType` | ChildrenPlacementType | `Horizontal` | Sets default formation of child nodes. By default all children that belong to a parent node are always aligned below and placed in a horizontal line. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a square/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. | 
 | `horizontalAlignment` | HorizontalAlignmentType | `Center` | Sets children horizontal alignment relative to their parent. The children by default are measured in size and then aligned towards the parent node. If it is `Center` aligned then parent node is placed in the middle of the children. In the `Left` alignment mode parent is aligned to left of the children and vice versa for `Right` alignment. | 
 | `leavesPlacementType` | ChildrenPlacementType | `Horizontal` | Sets formation of leave children. | 
 | `maximumColumnsInMatrix` | number | `6` | Maximum number of columns for matrix layout of children. | 
 | `minimalVisibility` | Visibility | `Dot` | Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then this option controls minimum allowed size of the diagram nodes. | 
 | `minimumVisibleLevels` | number | `1` | Minimum visible levels option prevents top-level nodes from folding into markers. The option accounts for organizational chart relations and `levelOffset` of individual items. | 
 | `orientationType` | OrientationType | `Top` | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | `pageFitMode` | PageFitMode | `FitToPage` | Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes while not affecting the rendering performance. With this, huge diagrams can be fit into available screen space. When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes. This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items are just too small to be readable. | 
 | `placeAdvisersAboveChildren` | boolean | `true` | Sets default placement of advisers hierarchies relative to the regular children of the parent node. If adviser node has its own children then control adds extra levels, so advisers children are placed above level of the parent node children. | 
 | `placeAssistantsAboveChildren` | boolean | `true` | Sets default placement of assistants hierarchies relative to the regular children of the parent node. If assistant node has its own children then control adds extra levels, so assistants children are placed above level of the parent node children. | 
 | `selectionPathMode` | SelectionPathMode | `FullStack` | Selection path mode. This property controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers. | 
 | `verticalAlignment` | VerticalAlignmentType | `Middle` | Sets items vertical alignment relative to each other within one level of the hierarchy. It does not change anything if diagram nodes are all of the same size. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutBorderColor` | string | `null` | Callout annotation border color. | 
 | `calloutCornerRadius` | number | `4` | Callout annotation corner radius. | 
 | `calloutLineWidth` | number | `1` | Callout annotation border line width. | 
 | `calloutMaximumVisibility` | Visibility | `Dot` | Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property. | 
 | `calloutOffset` | number | `4` | Callout annotation border line offset. | 
 | `calloutOpacity` | number | `0.2` | Callout annotation opacity | 
 | `calloutPlacementOffset` | number | `100` | Callout annotation placement offset. Sets how far callout content is offset from the marker it is displayed for. | 
 | `calloutPointerWidth` | string | `"10%"` | Callout annotation pointer width. | 
 | `calloutfillColor` | string | `"#000000"` | Callout annotation fill color. | 
 | `defaultCalloutTemplateName` | string | `null` | Callout annotation default template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | `showCallout` | boolean | `true` | Sets callout visibility. | 

### Frame Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `frameInnerPadding` | Thickness | `{2, 2, 2, 2}` | Frame inner padding. Adds extra padding around markers on the inner side of the frame. | 
 | `frameOuterPadding` | Thickness | `{2, 2, 2, 2}` | Frame outer padding. Adds extra padding around markers on the outer side of the frame. | 
 | `padding` | Thickness | `{10, 10, 10, 10}` | Diagram padding. Adds extra padding around the diagram. | 
 | `showFrame` | boolean | `false` | Sets selected items frame visibility. If selected item is outside of the diagram's area visible to the end user, control displays that item in the form of the marker on frame around the diagram. | 

### Group Titles Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | Group titles color. | 
 | `groupTitleFontFamily` | string | `"Arial"` | Group titles font family. | 
 | `groupTitleFontSize` | number | `"12px"` | Group titles font size. | 
 | `groupTitleFontStyle` | string | `"normal"` | Group titles font style: normal, italic | 
 | `groupTitleFontWeight` | string | `"normal"` | Group titles font weight: normal, bold | 
 | `groupTitleHorizontalAlignment` | HorizontalAlignmentType | `Center` | Group titles horizontal alignment. | 
 | `groupTitleOrientation` | TextOrientationType | `RotateRight` | Group titles orientation. | 
 | `groupTitlePanelSize` | number | `24` | The size of the panel containing group title. | 
 | `groupTitlePlacementType` | AdviserPlacementType | `Left` | Group titles placement. Defines group title and buttons panel position relative to the node. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleVerticalAlignment` | VerticalAlignmentType | `Middle` | Group titles vertical alignment. | 

### Intervals Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cousinsIntervalMultiplier` | number | `5` | Set cousins interval multiplier. This values adds extra space between branches of the hierarchy. For example nodes of the same parent have interval 20 and nodes of two different parents are going to have interval 100. | 
 | `dotItemsInterval` | number | `1` | Sets interval between nodes of the same row, minimized down to markers. | 
 | `dotLevelShift` | number | `20` | Sets the spacing after the row containing nodes minimized down to markers. | 
 | `lineItemsInterval` | number | `2` | Sets interval between nodes of the same row, minimized down to lines. | 
 | `lineLevelShift` | number | `10` | Sets the spacing after the row containing nodes minimized down to lines. | 
 | `normalItemsInterval` | number | `10` | Sets interval between nodes of the same row. | 
 | `normalLevelShift` | number | `20` | Sets the spacing between rows. | 

### Labels Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `labelColor` | string | `Colors.Black` | Labels color | 
 | `labelFontFamily` | string | `"Arial"` | Labels font family. | 
 | `labelFontSize` | string | `"10px"` | Labels font size. | 
 | `labelFontStyle` | string | `"normal"` | Labels font style. Font style: normal, italic | 
 | `labelFontWeight` | string | `"normal"` | Labels font weight Font weight: normal, bold | 
 | `labelOffset` | number | `1` | Sets labels offset from the markers bounding rectangles. | 
 | `labelOrientation` | TextOrientationType | `Horizontal` | Labels orientation. | 
 | `labelPlacement` | PlacementType | `Top` | Labels placement. Sets labels placement relative to the markers bounding rectangles. | 
 | `labelSize` | Size | `{80, 24}` | Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping. If one label overlaps another label the or item it will be hidden. | 
 | `showLabels` | Enabled | `Auto` | Sets labels visibility for nodes when they are minimized into markers by page auto fit. See `pageFitMode` property. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resolution to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 

### Level Titles Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelTitleColor` | string | `Colors.RoyalBlue` | Level titles color. | 
 | `levelTitleFontColor` | string | `Colors.White` | Level titles font color. | 
 | `levelTitleFontFamily` | string | `"Arial"` | Level titles font family. | 
 | `levelTitleFontSize` | number | `"12px"` | Level titles font size. | 
 | `levelTitleFontStyle` | string | `"normal"` | Level titles font style: normal, italic | 
 | `levelTitleFontWeight` | string | `"normal"` | Level titles font weight: normal, bold | 
 | `levelTitleHorizontalAlignment` | HorizontalAlignmentType | `Center` | Level titles horizontal alignment. | 
 | `levelTitleOrientation` | TextOrientationType | `Auto` | Group titles orientation. | 
 | `levelTitlePanelSize` | number | `24` | The size of the panel containing level titles. | 
 | `levelTitlePlaceInside` | boolean | `false` | If this property is true then level titles are placed inside of the diagram's view port above or below diagram nodes. | 
 | `levelTitlePlacementType` | AdviserPlacementType | `Left` | Level titles placement. Defines level title panel position relative to the diagram. | 
 | `levelTitleVerticalAlignment` | VerticalAlignmentType | `Middle` | Level titles vertical alignment. | 

### Relation Lines Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arrowsDirection` | GroupByType | `None` | Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn from logical children towards logical parents. By default diagram has no arrows. | 
 | `bevelSize` | number | `4` | The bevel size of squared connector lines. | 
 | `connectorType` | ConnectorType | `Squared` | Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes are always connected with squared connection lines | 
 | `elbowDotSize` | number | `4` | The size of dot markers placed in the elbows of connector lines. | 
 | `elbowType` | ElbowType | `None` | Set style of squared connectors with custom elbows. | 
 | `extraArrowsMinimumSpace` | number | `30` | Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property. | 
 | `highlightLinesColor` | string | `Colors.Red` | Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes. | 
 | `highlightLinesType` | LineType | `Solid` | Sets highlight lines pattern. | 
 | `highlightLinesWidth` | number | `1` | Sets highlight lines width. | 
 | `linesColor` | string | `Colors.Silver` | The relations lines color. The control uses this lines color to render basic relations between nodes. | 
 | `linesType` | LineType | `Solid` | The relations lines pattern | 
 | `linesWidth` | number | `1` | The relations lines width | 
 | `showExtraArrows` | boolean | `false` | Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing of relations between parents and children. By default it is off. | 

### Templates Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `buttonsPanelSize` | number | `28` | The size of the panel containing context buttons. | 
 | `checkBoxPanelSize` | number | `24` | The size of the panel containing selection checkbox. | 
 | `defaultTemplateName` | string | `null` | Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node see `templateName` property of `OrgItemConfig`. | 
 | `hasButtons` | Enabled | `Auto` | Sets buttons visibility. `Auto` - cursor item only. `True` - visible `False` - hidden | 
 | `itemTitleFirstFontColor` | string | `Colors.White` | The first font color of the title. The title background color is designed to be one of the available dimensions to group nodes in the diagram, so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue via automatic switch between two available font title colors. | 
 | `itemTitleSecondFontColor` | string | `Colors.Navy` | The second font color of the title. | 
 | `minimizedItemShapeType` | ShapeType | `None` | Markers. The shape of the markers when nodes are minimized by auto fit. The control supports auto fit of the diagram into available screen space. When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets default marker shape for nodes. It can be set individually per node in items configurations. The default color of shape is the same as `itemTitleColor` property set for individual items. | 
 | `selectCheckBoxLabel` | string | `"Selected"` | Selection check box label. See `hasSelectorCheckbox` and `selectedItems` properties. | 
 | `templates` | TemplateConfig[] | `[]` | Collection of named templates used to define content for nodes, cursor and highlight. By default control provides templates for all types of visual elements. | 

**Events**

 `onButtonClick(event, data)` 

Button click event. See `buttons` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onButtonsRender(event, data)` 

On buttons panel render event. This callback function is called to render context of buttons panel. It is used to replace `buttons` collection property in the control. So we preserve context buttons panel as a functional concept, but eliminate buttons customization API.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorChanged(event, data)` 

On cursor item changed event. See `cursorItem` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorChanging(event, data)` 

On cursor item being changed event. See `cursorItem` property. This callback function is called before `onCursorChanged` event. Use this callback function to stop event propagation. See `EventArgs` for details.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onCursorRender(event, data)` 

Callback function for rendering content of the cursor template. This callback is only called when custom cursor is defined in the template configuration.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onHighlightChanged(event, data)` 

On highlight item changed event. See `highlightItem` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onHighlightChanging(event, data)` 

This callback function is called before `onHighlightChanged` event. See `highlightItem` property. Use this event to modify diagram elements not affecting diagram layout. For example on-screen connector annotations added in this event handler to diagram configuration would be rendered together with highlight.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information. Use properties of this argument to stop event propagate and further diagram layout and rendering. | 

 `onHighlightRender(event, data)` 

Callback function for rendering content of the highlight template. This callback is only called when custom highlight is defined in the template configuration.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onItemRender(event, data)` 

Callback function for rendering content of the diagram nodes. This callback is only called when custom item template is defined in the template object configuration. This callback receives reference to DOM element and context object of the rendered item. The control reuses existing elements in the DOM, so it is applications responsibility to properly update their content.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

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

On selected items changed event. See `selectedItems` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onSelectionChanging(event, data)` 

On selected items being changed event. See `selectedItems` property.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 
## <a name="OrgItemConfig" id="OrgItemConfig">OrgItemConfig</a>
Item Configuration Object defines properties of individual node in the organizational chart hierarchy. See `items` collection property of organizational chart control configuration object.

 `OrgItemConfig` 

### Constructor

 `OrgItemConfig(arg0, arg1, arg2, arg3, arg4)` 

Item Configuration Object defines properties of individual node in the organizational chart hierarchy. See `items` collection property of organizational chart control configuration object.

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
 | `adviserPlacementType` | AdviserPlacementType | `Auto` | Defines leftward or rightward item placement relative to the parent item. By default it is `Auto` and depends on general diagram layout orientation. | 
 | `childrenPlacementType` | ChildrenPlacementType | `Auto` | The property defines children's layout formation. By default, control places children in a horizontal line below the parent node. On a large scale, this may result in the end-user having to scroll screens to view all nodes. To compensate for this, we place children in a square/matrix formation. That will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. | 
 | `hasSelectorCheckbox` | Enabled | `Auto` | Shows selection check box for the node. If Auto then selection check box visibility depends on control's configuration. Auto - depends on `hasSelectorCheckbox` property of the control True - shown False - hidden | 
 | `id` | string | `null` | Item id. It should be unique per chart. | 
 | `isActive` | boolean | `true` | If true it makes item inactive in the diagram layout. Inactive items are regular items excluded from navigation, that means when diagram uses auto fit mode, selection of the neighboring nodes goes through inactive items, so all nodes next to inactive item become selected and shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | `isVisible` | boolean | `true` | If `false` it makes item invisible in the layout. If item has no visible parents then its connections are hidden as well. From navigation perspective invisible items make all their children to be children of their parents. | 
 | `itemType` | ItemType | `Regular` | Item type. This property defines child node placement relative to its parent node. By default all children that belong to a parent node are of the same rank and status between each other and due to that, are always aligned below the parent and are organized in the same way. However for special cases were the end user wishes to have a child that is separate from the rest of it's siblings, we provide custom child types that the end user can use to place different ranking nodes anywhere around the parent node. These placement options give a lot of space for the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization. Additionally, by default `Regular` children are always placed in a horizontal line below the parent node. | 
 | `levelOffset` | number | `null` | Sets node level offset relative to parent node. This property is ignored if it is not applicable. | 
 | `parent` | string | `null` | Parent item id. If `null` then node is the root item of the hierarchy. | 
 | `placeAdvisersAboveChildren` | Enabled | `Auto` | The property sets default placement of advisers hierarchies relative to the regular children of the node. If the adviser node has its children, then control adds extra levels, so the adviser's children are placed above the regular children. | 
 | `placeAssistantsAboveChildren` | Enabled | `Auto` | The property sets the default placement of assistants hierarchies relative to the regular children of the node. If the assistant node has its children, then control adds extra levels, so the assistant's children are placed above the regular children. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutTemplateName` | string | `null` | Callout annotation template name. This option lets individually assign rendering callout annotation template per individual node of the diagram. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | `showCallout` | Enabled | `Auto` | Sets callout annotation visibility for individual node. The callout annotation is one of easy to use features of the control. By default it is displayed for markers in order to preview their node's content. The content is displayed using current template of the node it is rendered for. The callout can be forced to be displayed for regular nodes as well. In that case use `calloutTemplateName` property to change their template. Auto - depends on `showCallout` property of the control True - shown regardless of node's visibility False - hidden | 

### Group Title Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitle` | string | `null` | Group Title. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | The group title background color. | 

### Label Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `label` | string | `null` | Marker label. | 
 | `labelOrientation` | TextOrientationType | `Auto` | Label orientation. If `Auto` then it is set to `labelOrientation` property of the control configuration. | 
 | `labelPlacement` | PlacementType | `Auto` | Label placement. Sets label placement relative to the marker bounding rectangle. If `Auto` then it is set to `labelPlacement` of the control configuration. | 
 | `labelSize` | Size | `null` | Label size. Sets label's placeholder `div` size and controls conflict resolution if labels overlap each other. If `null` then it is set to `labelSize` property of the control configuration. | 
 | `showLabel` | Enabled | `Auto` | Sets label visibility for individual nodes. Labels are only rendered for a node's markers. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resolution to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 

### Template Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Context object | 
 | `description` | string | `null` | Description | 
 | `hasButtons` | Enabled | `Auto` | Shows context buttons panel for the node. If Auto then context buttons panel visibility depends on control's configuration. Auto - depends on `hasButtons` property of the control True - shown False - hidden | 
 | `image` | string | `null` | Image | 
 | `itemTitleColor` | string | `Colors.RoyalBlue` | Title background color. The same color is used for node marker when control has enabled auto fit mode. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when node is minimized by auto fit. The control supports auto fit of diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for individual node. | 
 | `templateName` | string | `null` | Template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. This option lets individually assign rendering template per individual node of the diagram. | 
 | `title` | string | `null` | Title | 

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
