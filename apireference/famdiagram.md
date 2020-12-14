# Family Diagram Configuration Objects
## <a name="FamConfig" id="FamConfig">FamConfig</a>
Family Chart configuration object. Use this object as a reference for available properties and their default values.

 `FamConfig` 

### Constructor

 `FamConfig(name)` 

Family Chart configuration object. Use this object as a reference for available properties and their default values.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `name` | string | `` | name | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotations` | Array.<(ShapeAnnotationConfi | `[]` | Annotations. Annotations are API elements that are attached to the diagram nodes. We draw our annotations either in front of the nodes or in the background. The annotations don't affect the nodes placement in any way. As a result the control redraws them instantaneously without rerendering or recalculating the actual diagram layout. | 
 | `cursorItem` | string | `null` | Cursor item. Family Chart control has API options equivalent to regular UI controls. The cursor item is used to select single item in the hierarchy with mouse click, highlight item provides visual feed back on mouse over. Selected items collection is equivalent to checked items in ListView or TreeView controls. Chart navigation depends on current cursor item, chart shows cursor and its neighbours in full size regardless of enabled page fit mode. So cursor item plays a role of local zoom in the chart hierarchy. User navigates around chart via clicking and moving cursor item around and zooming into data around new cursor item. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no cursor item selected in the diagram. | 
 | `emptyDiagramMessage` | string | `"Diagram is empty."` | Empty diagram message. This option is supposed to say user that chart is empty when no data is available for rendering. | 
 | `enablePanning` | boolean | `true` | Enable panning. Enable chart panning with mouse drag & drop for desktop browsers. Disable it if you need to support items Drag & Drop. | 
 | `graphicsType` | GraphicsType | `GraphicsType.SVG` | Sets prefered rendering technology. If selected graphics type is not supported on the device, then control will auto fallback to the first available one. | 
 | `hasSelectorCheckbox` | Enabled | `Enabled.Auto` | Sets visibility of selection check boxes for the diagram nodes. `Auto` - visible for cursor item only `True` - visible `False` - hiddens See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes. Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element. | 
 | `highlightGravityRadius` | number | `40` | Highlight gravity radius. This property controls mouse over feedback and callout annotation visibility for nodes rendered as markers when diagram auto fits nodes into available screen space. It makes marker highlighted when mouse pointer is inside of the gravity radius cycle of the marker. This property is ignored when the nearest item is outside of the screen boundaries and is not visible to the end user. The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. | 
 | `highlightItem` | string | `null` | Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram layout or scrolling so it can be used to syncronize mouse over feedback of the diagram nodes with other collection controls or UI elements. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no highlight shown on the diagram. | 
 | `items` | FamItemConfig[] | `[]` | Items collection. Ths property defines data we render in the diagram. Every items should have unique `id` property set. They are used to create relations between items in the diagram and for rendering various UI elements bound to nodes. | 
 | `navigationMode` | NavigationMode | `NavigationMode.Default` | Sets control navigation mode. By default control replicates interactivity of regular collection control. It has cursor to select single item in the collection. So user can click and select any node in the diagram. The control has highlight for mouse over feedback. So user can move mouse and see highlight frame and callout callback annotation for node under cursor. By `Default` the control has both cursor and highlight. If they are disabled then control is rendered as a static image. | 
 | `neighboursSelectionMode` | NeighboursSelectionMode | `NeighboursSelectionMode.ParentsAndChildren` | Sets the neighbours selection mode, it defines how many neighbours are selected around cursor. | 
 | `scale` | number | `1` | CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars. It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers, it looks good only in mobile browsers, so our recomendation is to use zoom with collection of item templates of various sizes. Templates gives you better control over quality of your content at various zoom levels. | 
 | `selectedItems` | string[] | `[]` | Selected items collection. Selected items is a collection of items ids having checked their check boxes. The control always shows selected items in the full size form, regardless of enabled page fit mode. The control notifies about user made changes in this collection with `onSelectionChanging` and `onSelectionChanged` events. | 

### Auto Layout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `alignBylevels` | boolean | `true` | This option keeps items at the same levels after connections bundling. | 
 | `autoSizeMaximum` | Size | `{1024, 768}` | Sets maximum size the diagram can expand itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | `autoSizeMinimum` | Size | `{800, 600}` | Sets minimum size the diagram can shrink itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | `enableMatrixLayout` | boolean | `false` | This option enables automatic layout of nodes sharing the same set of parents and children in form of matrix. | 
 | `groupByType` | GroupByType | `GroupByType.Children` | This property sets loose nodes alignment between rows. Nodes can be placed close towards parents or children. | 
 | `hideGrandParentsConnectors` | boolean | `false` | Set this property to enable hiding of direct connectors to grand parents. It helps to reduce diagrams connectors layout complexity. | 
 | `loopsLayoutMode` | LoopsLayoutMode | `LoopsLayoutMode.Optimized` | Loops layout mode. Configuration may contain loop references between items, so control tries to find layout minimizing number of loops between levels, so majority of references ideally should go in one direction. This option disables optimization and forces items levels order to match their order in `items` collection. For example if you have two nodes `A` and `B` referencing each other as a parent, then it is not defined which one is going to be on the top of the diagram. Set this option to `KeepItemsOrder`, if you need the first item in your collection to be on the top, otherwise control will optimize loops layout in order to minimize number of loops in diagram. | 
 | `maximumColumnsInMatrix` | number | `6` | Sets maximum number of columns in the matrix formation. The matrix formation stays squared as long as total number of columns does not exceed this property value. In order to shape nodes into matrix formation they should share the same set of parents and children. See `enableMatrixLayout` property. | 
 | `minimalVisibility` | Visibility | `Visibility.Dot` | Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then this option controls minimum allowed size of the diagram nodes. | 
 | `minimumMatrixSize` | number | `4` | Sets Minimum number of nodes needed to be shaped into matrix formtion. In order to shape nodes in form of matrix they should share the same set of parents and children. See `enableMatrixLayout` property. | 
 | `orientationType` | OrientationType | `OrientationType.Top` | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | `pageFitMode` | PageFitMode | `PageFitMode.FitToPage` | Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes while not affecting the rendering performance. With this, huge diagrams can be fit into avaialable screen space. When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes. This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items are just too small to be readable. | 
 | `selectionPathMode` | SelectionPathMode | `SelectionPathMode.None` | Selection path mode. This property controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers. | 
 | `verticalAlignment` | VerticalAlignmentType | `VerticalAlignmentType.Middle` | Sets items vertical alignment relative to each other within one level of the hierarchy. It does not change anything if diagram nodes are all of the same size. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutBorderColor` | string | `null` | Callout annotation border color. | 
 | `calloutCornerRadius` | number | `4` | Callout annotation corner radius. | 
 | `calloutLineWidth` | number | `1` | Callout annotation border line width. | 
 | `calloutMaximumVisibility` | Visibility | `Visibility.Dot` | Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property. | 
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
 | `showFrame` | boolean | `false` | Sets selected items frame visibility. If selected item is outside of the diagram's area visible to the end user, control displays that item in the form of the marker on frame around the diagram. | 

### Group Titles Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | Group titles color. | 
 | `groupTitleFontFamily` | string | `"Arial"` | Group titles font family. | 
 | `groupTitleFontSize` | number | `"12px"` | Group titles font size. | 
 | `groupTitleFontStyle` | string | `"normal"` | Group titles font style: normal, italic | 
 | `groupTitleFontWeight` | string | `"normal"` | Group titles font weight: normal, bold | 
 | `groupTitleHorizontalAlignment` | HorizontalAlignmentType | `HorizontalAlignmentType.Center` | Group titles horizontal alignment. | 
 | `groupTitleOrientation` | TextOrientationType | `TextOrientationType.RotateRight` | Group titles orientation. | 
 | `groupTitlePanelSize` | number | `24` | The size of the panel containing group title. | 
 | `groupTitlePlacementType` | AdviserPlacementType | `AdviserPlacementType.Left` | Group titles placement. Defines group title and buttons panel position relative to the node. By default it is on the left. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleVerticalAlignment` | VerticalAlignmentType | `VerticalAlignmentType.Middle` | Group titles vertical alignment. | 

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
 | `labelOffset` | number | `1` | Sets labels offset from the merkers bounding rectangles. | 
 | `labelOrientation` | TextOrientationType | `TextOrientationType.Horizontal` | Labels orientation. | 
 | `labelPlacement` | PlacementType | `PlacementType.Top` | Labels placement. Sets labels placement relative to the markers bounding rectangles. | 
 | `labelSize` | Size | `{80, 24}` | Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping. If one label overlaps another label the or item it will be hidden. | 
 | `showLabels` | Enabled | `Enabled.Auto` | Sets labels visibility for nodes when they are minimized into markers by page auto fit. See `pageFitMode` property. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 

### Relation Lines Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arrowsDirection` | GroupByType | `GroupByType.None` | Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn from logical children towards logical parents. By default diagram has no arrows. | 
 | `bevelSize` | number | `4` | The bevel size of squared connector lines. | 
 | `elbowDotSize` | number | `4` | The size of dot markers placed in the elbows of connector lines. | 
 | `elbowType` | ElbowType | `ElbowType.Round` | Set style of squared connectors with custom elbows. | 
 | `extraArrowsMinimumSpace` | number | `30` | Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property. | 
 | `highlightLinesColor` | string | `Colors.Red` | Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes. See `showNeigboursConnectorsHighlighted` property. | 
 | `highlightLinesType` | LineType | `LineType.Solid` | Sets highlight lines pattern. See `showNeigboursConnectorsHighlighted` property. | 
 | `highlightLinesWidth` | number | `1` | Sets highlight lines width. See `showNeigboursConnectorsHighlighted` property. | 
 | `linesColor` | string | `Colors.Silver` | The relations lines color. The control uses this lines color to render basic relations between nodes. | 
 | `linesPalette` | PaletteItemConfig[] | `[]` | This collection contains lines styles for rendering relations going across family hierarchy. The purpose of this collection is to draw long horizontal parallel lines drawn between family branches in different styles. If this collection is empty then default `linesColor`, `linesWidth` and `linesType` are used for all connector lines. | 
 | `linesType` | LineType | `LineType.Solid` | The relations lines pattern | 
 | `linesWidth` | number | `1` | The relations lines width | 
 | `showExtraArrows` | boolean | `true` | Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing of relations between parents and children. By default it is off. | 
 | `showNeigboursConnectorsHighlighted` | boolean | `false` | Shows connection lines between current cursor item and its neighbours highlighted. Neighbours selection mode is set by `neighboursSelectionMode` property. Set following properties: `highlightLinesColor`, `highlightLinesWidth` and `highlightLinesType` to style highlighted lines. | 

### Templates Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `buttonsPanelSize` | number | `28` | The size of the panel containing context buttons. | 
 | `checkBoxPanelSize` | number | `24` | The size of the panel containing selection checkbox. | 
 | `defaultLabelAnnotationTemplate` | string | `null` | Sets the name of template used to render label annotations. Label annotations are labels placed in layout of the diagram. | 
 | `defaultTemplateName` | string | `null` | Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node see `templateName` property of `FamItemConfig`. | 
 | `hasButtons` | Enabled | `Enabled.Auto` | Sets buttons panel visibility. `Auto` - cursor item only. `True` - visible `False` - hidden | 
 | `itemTitleFirstFontColor` | string | `Colors.White` | The first font color of the title. The title background color is designed to be one of the avalaible dimensitions to group nodes in the diagram, so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue via automatic switch between two available font title colors. | 
 | `itemTitleSecondFontColor` | string | `Colors.Navy` | The second font color of the title. | 
 | `minimizedItemShapeType` | ShapeType | `ShapeType.None` | Markers. The shape of the markers when nodes are minimized by autofit. The control supports auto fit of the diagram into available screen space. When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets default marker shape for nodes. It can be set individually per node in items configurations. The default color of shape is the same as `itemTitleColor` property set for individual items. | 
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

On buttons panel render event. This callback function is called to render context of buttons panel. It is used to replace `buttons` collection property in ReactJS component. So we preserve context buttons panel as a functional concept, but eliminate buttons customization API.

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

On cursor item being changed event. See `cursorItem` property. This callback function is called before `onCursorChanged` event. Use this callabck function to stop event propogation. See `EventArgs` for details.

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

On highlight item being changed event. See `highlightItem` property. This callback function is called before `onHighlightChanged` event. Use this callabck function to stop event propogation. See `EventArgs` for details.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 

 `onHighlightRender(event, data)` 

Callback function for rendering content of the highlight template. This callback is only called when custom highlight is defined in the template configuration.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Event if available | 
 | `data` | RenderEventArgs | `` | The context information | 

 `onItemRender(event, data)` 

Callback function for rendering content of the diagram nodes. This callback is only called when custom item template is defined in the template object configuration. This callback receives reference to DOM element and context object of the rendered item. The control reuses exisitng elements in the DOM, so it is applications responsibility to properly update their content.

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
## <a name="FamItemConfig" id="FamItemConfig">FamItemConfig</a>
Item Configuration Object defines properties of individual node in the family chart hierarchy. See `items` collection property of family control configuration object.

 `FamItemConfig` 

### Constructor

 `FamItemConfig(arg0, arg1, arg2, arg3, arg4)` 

Item Configuration Object defines properties of individual node in the family chart hierarchy. See `items` collection property of family control configuration object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | FamItemConfig | `` | Item config properties | 
 | `arg0` | string | `` | Item id | 
 | `arg1` | string[], undefined | `` | Parents ids | 
 | `arg2` | string | `` | Title | 
 | `arg3` | string | `` | Description | 
 | `arg4` | string | `` | Image | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `hasSelectorCheckbox` | Enabled | `Enabled.Auto` | Shows selection check box for the node. If Auto then selection check box visibility depends on control's configuration. Auto - depends on `hasSelectorCheckbox` property of the control True - shown False - hidden | 
 | `id` | string | `null` | Item id. It should be unique per chart. | 
 | `isActive` | boolean | `true` | If true it makes item inactive in the diagram layout. Inactive items are regular items excluded from navigation, that means when diagram uses auto fit mode, selection of the neighboring nodes goes through inactive items, so all nodes next to inactive item become selected and shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | `parents` | string[] | `[]` | Parents items ids. If this collection is empty then item considered as a root item. | 
 | `spouses` | string[] | `[]` | Spouses items ids. The nodes of this collection create fake invisible child node, so all of them are being connected with common child connection line. | 

### Callout Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `calloutTemplateName` | string | `null` | Callout annotation template name. This option lets individually assign rendering callout annotation template per individual node of the diagram. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | `showCallout` | Enabled | `Enabled.Auto` | Sets callout annotation visibility for individual node. The callout annotation is one of easy to use features of the control. By default it is displayed for markers in order to preview their node's content. The content is displayed using current template of the node it is rendered for. The callout can be forced to be displayed for regular nodes as well. In that case use `calloutTemplateName` property to change their template. Auto - depends on `showCallout` property of the control True - shown regardless of node's visibility False - hidden | 

### Group Title Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `groupTitle` | string | `null` | Group Title. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleColor` | string | `Colors.RoyalBlue` | The group title background color. | 

### Label Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `label` | string | `null` | Marker label. | 
 | `labelOrientation` | TextOrientationType | `TextOrientationType.Auto` | Label orientation. If `Auto` then it is set to `labelOrientation` property of the control configuration. | 
 | `labelPlacement` | PlacementType | `PlacementType.Auto` | Label placement. Sets label placement relative to the marker bounding rectangle. If `Auto` then it is set to `labelPlacement` of the control configuration. | 
 | `labelSize` | Size | `null` | Label size. Sets label's placeholder `div` size and controls conflict resolution if labels overlap each other. If `null` then it is set to `labelSize` property of the control configuration. | 
 | `showLabel` | Enabled | `Enabled.Auto` | Sets label visibility for individual nodes. Labels are only rendered for a node's markers. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 

### Order Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `placementType` | AdviserPlacementType | `AdviserPlacementType.Right` | Relative placement type defines Left ot Right side placement of the node relative to the `relativeItem`. | 
 | `position` | number | `null` | Relative position defines order of elements placed relative to the same relative item on the same side. | 
 | `primaryParent` | string | `null` | Primary parents id. Set this property to place item close to the selected primary parent in `parents` collection. If property set to null or referenced parent does not exists then this property is ignored. | 
 | `relativeItem` | string | `null` | Relative item id. This property is used to control items mutual placement in order to keep consistent ordering within levels. Relative item is used for placing given item in diagram. We can place item on left or right side of relative item via setting placementType type property. In case when multiple items use the same relative item then their order can be customized with position property. If this property set to null, family layout algorithm will try to choose elements order via placing connected nodes as close to each other as posible. | 

### Template Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | object | `null` | Context object | 
 | `description` | string | `null` | Description | 
 | `hasButtons` | Enabled | `Enabled.Auto` | Shows context buttons panel for the node. If Auto then context buttons panel visibility depends on control's configuration. Auto - depends on `hasButtons` property of the control True - shown False - hidden | 
 | `image` | string | `null` | Image | 
 | `itemTitleColor` | string | `Colors.RoyalBlue` | Title background color. The same color is used for node marker when control has enabled auto fit mode. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when node is minimized by autofit. The control supports auto fit of diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for individual node. | 
 | `templateName` | string | `null` | Template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. This option lets individually assign rendering template per individual node of the diagram. | 
 | `title` | string | `null` | Title | 

## <a name="FamEventArgs" id="FamEventArgs">FamEventArgs</a>
Context object

 `FamEventArgs` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cancel` | boolean | `false` | If true cancels subsequent event and layout update. | 
 | `context` | string | `null` | New item | 
 | `name` | string | `null` | Relative object name. | 
 | `oldContext` | string | `null` | Current item | 
 | `position` | Rect | `null` | Node position on the diagram. | 
