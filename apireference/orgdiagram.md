# Organizational Chart Configuration Objects
## <a name="primitives.orgdiagram.Config" id="primitives.orgdiagram.Config">Config</a>
Organizational Chart configuration object. Use this object as a reference for available properties and their default values.

 `primitives.orgdiagram.Config` 

### Constructor

 `Config(name)` 

Organizational Chart configuration object. Use this object as a reference for available properties and their default values.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `name` | string | `` | name | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotations` | Array.<(ShapeAnnotationConfi | `[]` | Annotations. Annotations are API elements that are attached to the diagram nodes. We draw our annotations either in front of the nodes or in the background. The annotations don't affect the nodes placement in any way. As a result the control redraws them instantaneously without rerendering or recalculating the actual diagram layout. | 
 | `arrowsDirection` | GroupByType | `0` | Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn from logical children towards logical parents. By default diagram has no arrows. | 
 | `autoSizeMaximum` | Size | `{1024, 768}` | Sets maximum size the diagram can expand itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | `autoSizeMinimum` | Size | `{800, 600}` | Sets minimum size the diagram can shrink itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | `bevelSize` | number | `4` | The bevel size of squared connector lines. | 
 | `buttons` | ButtonConfig[] | `[]` | Buttons configuration objects collection. The buttons panel on the side of the diagram nodes is one of our default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This collection of buttons provides configuration properties for buttons rendered using HTML buttons elements. | 
 | `buttonsPanelSize` | number | `28` | The size of the panel containing context buttons. | 
 | `calloutBorderColor` | string | `null` | Callout annotation border color. | 
 | `calloutCornerRadius` | number | `4` | Callout annotation corner radius. | 
 | `calloutLineWidth` | number | `1` | Callout annotation border line width. | 
 | `calloutMaximumVisibility` | Visibility | `2` | Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property. | 
 | `calloutOffset` | number | `4` | Callout annotation border line offset. | 
 | `calloutOpacity` | number | `0.2` | Callout annotation opacity | 
 | `calloutPlacementOffset` | number | `100` | Callout annotation placement offset. Sets how far callout content is offset from the marker it is displayed for. | 
 | `calloutPointerWidth` | string | `"10%"` | Callout annotation pointer width. | 
 | `calloutfillColor` | string | `"#000000"` | Callout annotation fill color. | 
 | `checkBoxPanelSize` | number | `24` | The size of the panel containing selection checkbox. | 
 | `childrenPlacementType` | ChildrenPlacementType | `2` | Sets default formation of child nodes. By default all children that belong to a parent node are always aligned below and placed in a horizontal line. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a sqaure/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. | 
 | `connectorType` | ConnectorType | `0` | Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes are always connected with squared connection lines | 
 | `cousinsIntervalMultiplier` | number | `5` | Set cousins interval multiplier. This values adds extra space between branches of the hierarchy. For example nodes of the same parent have interval 20 and nodes of two different parents are going to have interval 100. | 
 | `cursorItem` | string | `null` | Cursor item. Organization Chart control has API options equivalent to regular UI controls. The cursor item is used to select single item in the hierarchy with mouse click, highlight item provides visual feed back on mouse over. Selected items collection is equivalent to checked items in ListView or TreeView controls. Chart navigation depends on current cursor item, chart shows cursor and its neighbours in full size regardless of enabled page fit mode. So cursor item plays a role of local zoom in the chart hierarchy. User navigates around chart via clicking and moving cursor item around and zooming into data around new cursor item. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no cursor item selected in the diagram. | 
 | `defaultCalloutTemplateName` | string | `null` | Callout annotation default template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | `defaultTemplateName` | string | `null` | Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node see `templateName` property of `ItemConfig`. | 
 | `dotItemsInterval` | number | `1` | Sets interval between nodes of the same row, minimized down to markers. | 
 | `dotLevelShift` | number | `20` | Sets the spacing after the row containing nodes minimized down to markers. | 
 | `elbowDotSize` | number | `4` | The size of dot markers placed in the elbows of connector lines. | 
 | `elbowType` | ElbowType | `0` | Set style of squared connectors with custom elbows. | 
 | `emptyDiagramMessage` | string | `"Diagram is empty."` | Empty diagram message. This option is supposed to say user that chart is empty when no data is available for rendering. | 
 | `enablePanning` | boolean | `true` | Enable panning. Enable chart panning with mouse drag & drop for desktop browsers. Disable it if you need to support items Drag & Drop. | 
 | `extraArrowsMinimumSpace` | number | `30` | Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property. | 
 | `graphicsType` | GraphicsType | `0` | Sets prefered rendering technology. If selected graphics type is not supported on the device, then control will auto fallback to the first available one. | 
 | `groupTitleColor` | string | `"#4169e1"` | Group titles color. | 
 | `groupTitleFontFamily` | string | `"Arial"` | Group titles font family. | 
 | `groupTitleFontSize` | number | `"12px"` | Group titles font size. | 
 | `groupTitleFontStyle` | string | `"normal"` | Group titles font style: normal, italic | 
 | `groupTitleFontWeight` | string | `"normal"` | Group titles font weight: normal, bold | 
 | `groupTitleHorizontalAlignment` | HorizontalAlignmentType | `0` | Group titles horizontal alignment. | 
 | `groupTitleOrientation` | TextOrientationType | `2` | Group titles orientation. | 
 | `groupTitlePanelSize` | number | `24` | The size of the panel containing group title. | 
 | `groupTitlePlacementType` | AdviserPlacementType | `2` | Group titles placement. Defines group title and buttons panel position relative to the node. By default it is on the left. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleVerticalAlignment` | VerticalAlignmentType | `1` | Group titles vertical alignment. | 
 | `hasButtons` | Enabled | `0` | Sets buttons visibility. `Auto` - cursor item only. `True` - visible `False` - hidden | 
 | `hasSelectorCheckbox` | Enabled | `0` | Sets visibility of selection check boxes for the diagram nodes. `Auto` - visible for cursor item only `True` - visible `False` - hiddens See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes. Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element. | 
 | `highlightGravityRadius` | number | `40` | Highlight gravity radius. This property controls mouse over feedback and callout annotation visibility for nodes rendered as markers when diagram auto fits nodes into available screen space. It makes marker highlighted when mouse pointer is inside of the gravity radius cycle of the marker. This property is ignored when the nearest item is outside of the screen boundaries and is not visible to the end user. The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. | 
 | `highlightItem` | string | `null` | Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram layout or scrolling so it can be used to syncronize mouse over feedback of the diagram nodes with other collection controls or UI elements. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no highlight shown on the diagram. | 
 | `highlightLinesColor` | string | `"#ff0000"` | Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes. | 
 | `highlightLinesType` | LineType | `0` | Sets highlight lines pattern. | 
 | `highlightLinesWidth` | number | `1` | Sets highlight lines width. | 
 | `horizontalAlignment` | HorizontalAlignmentType | `0` | Sets children horizontal alignment relative to their parent. The children by default are measured in size and then aligned towards the parent node. If it is `Center` aligned then parent node is placed in the middle of the children. In the `Left` alignment mode parent is aligned to left of the children and vice versa for `Right` alignment. | 
 | `itemTitleFirstFontColor` | string | `"#ffffff"` | The first font color of the title. The title background color is designed to be one of the avalaible dimensitions to group nodes in the diagram, so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue via automatic switch between two available font title colors. | 
 | `itemTitleSecondFontColor` | string | `"#000080"` | The second font color of the title. | 
 | `items` | ItemConfig[] | `[]` | Items collection. Ths property defines data we render in the diagram. Every items should have unique `id` property set. They are used to create relations between items in the diagram and for rendering various UI elements bound to nodes. | 
 | `labelColor` | string | `"#000000"` | Labels color | 
 | `labelFontFamily` | string | `"Arial"` | Labels font family. | 
 | `labelFontSize` | string | `"10px"` | Labels font size. | 
 | `labelFontStyle` | string | `"normal"` | Labels font style. Font style: normal, italic | 
 | `labelFontWeight` | string | `"normal"` | Labels font weight Font weight: normal, bold | 
 | `labelOffset` | number | `1` | Sets labels offset from the merkers bounding rectangles. | 
 | `labelOrientation` | TextOrientationType | `0` | Labels orientation. | 
 | `labelPlacement` | PlacementType | `1` | Labels placement. Sets labels placement relative to the markers bounding rectangles. | 
 | `labelSize` | Size | `{80, 24}` | Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping. If one label overlaps another label the or item it will be hidden. | 
 | `leavesPlacementType` | ChildrenPlacementType | `2` | Sets formation of leave children. | 
 | `lineItemsInterval` | number | `2` | Sets interval between nodes of the same row, minimized down to lines. | 
 | `lineLevelShift` | number | `10` | Sets the spacing after the row containing nodes minimized down to lines. | 
 | `linesColor` | string | `"#c0c0c0"` | The relations lines color. The control uses this lines color to render basic relations between nodes. | 
 | `linesType` | LineType | `0` | The relations lines pattern | 
 | `linesWidth` | number | `1` | The relations lines width | 
 | `maximumColumnsInMatrix` | number | `6` | Maximum number of columns for matrix layout of children. | 
 | `minimalVisibility` | Visibility | `2` | Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then this option controls minimum allowed size of the diagram nodes. | 
 | `minimizedItemShapeType` | ShapeType | `6` | Markers. The shape of the markers when nodes are minimized by autofit. The control supports auto fit of the diagram into available screen space. When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets default marker shape for nodes. It can be set individually per node in items configurations. The default color of shape is the same as `itemTitleColor` property set for individual items. | 
 | `navigationMode` | NavigationMode | `0` | Sets control navigation mode. By default control replicates interactivity of regular collection control. It has cursor to select single item in the collection. So user can click and select any node in the diagram. The control has highlight for mouse over feedback. So user can move mouse and see highlight frame and callout callback annotation for node under cursor. By `Default` the control has both cursor and highlight. If they are disabled then control is rendered as a static image. | 
 | `normalItemsInterval` | number | `10` | Sets interval between nodes of the same row. | 
 | `normalLevelShift` | number | `20` | Sets the spacing between rows. | 
 | `orientationType` | OrientationType | `0` | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | `pageFitMode` | PageFitMode | `3` | Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes while not affecting the rendering performance. With this, huge diagrams can be fit into avaialable screen space. When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes. This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items are just too small to be readable. | 
 | `scale` | number | `1` | CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars. It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers, it looks good only in mobile browsers, so our recomendation is to use zoom with collection of item templates of various sizes. Templates gives you better control over quality of your content at various zoom levels. | 
 | `selectCheckBoxLabel` | string | `"Selected"` | Selection check box label. See `hasSelectorCheckbox` and `selectedItems` properties. | 
 | `selectedItems` | string[] | `[]` | Selected items collection. Selected items is a collection of items ids having checked their check boxes. The control always shows selected items in the full size form, regardless of enabled page fit mode. The control notifies about user made changes in this collection with `onSelectionChanging` and `onSelectionChanged` events. | 
 | `selectionPathMode` | SelectionPathMode | `1` | Selection path mode. This property controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers. | 
 | `showCallout` | boolean | `true` | Sets callout visibility. | 
 | `showExtraArrows` | boolean | `false` | Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing of relations between parents and children. By default it is off. | 
 | `showLabels` | Enabled | `0` | Sets labels visibility for nodes when they are minimized into markers by page auto fit. See `pageFitMode` property. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 
 | `templates` | TemplateConfig[] | `[]` | Collection of named templates used to define content for nodes, cursor and highlight. By default control provides templates for all types of visual elements. | 
 | `verticalAlignment` | VerticalAlignmentType | `1` | Sets items vertical alignment relative to each other within one level of the hierarchy. It does not change anything if diagram nodes are all of the same size. | 

## <a name="primitives.orgdiagram.ItemConfig" id="primitives.orgdiagram.ItemConfig">ItemConfig</a>
Item Configuration Object defines properties of individual node in the organizational chart hierarchy. See `items` collection property of organizational chart control configuration object.

 `primitives.orgdiagram.ItemConfig` 

### Constructor

 `ItemConfig(arg0, arg1, arg2, arg3, arg4)` 

Item Configuration Object defines properties of individual node in the organizational chart hierarchy. See `items` collection property of organizational chart control configuration object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | ItemConfig | `` | Item config properties | 
 | `arg0` | string | `` | Item id | 
 | `arg1` | string[] | `` | Parent id | 
 | `arg2` | string | `` | Title | 
 | `arg3` | string | `` | Description | 
 | `arg4` | string | `` | Image | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `adviserPlacementType` | AdviserPlacementType | `0` | Defines leftward or rightward item placement relative to the parent item. By default it is `Auto` and depends on general diagram layout orientation. | 
 | `calloutTemplateName` | string | `null` | Callout annotation template name. This option lets individually assign rendering callout annotation template per individual node of the diagram. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | `childrenPlacementType` | ChildrenPlacementType | `0` | Defines shape of children formation. By default a node's children are always placed in a horizontal line below the parent node. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a sqaure/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen. | 
 | `context` | object | `null` | Context object | 
 | `description` | string | `null` | Description | 
 | `groupTitle` | string | `null` | Group Title. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | `groupTitleColor` | string | `"#4169e1"` | The group title background color. | 
 | `hasButtons` | Enabled | `0` | Shows context buttons panel for the node. If Auto then context buttons panel visibility depends on control's configuration. Auto - depends on `hasButtons` property of the control True - shown False - hidden | 
 | `hasSelectorCheckbox` | Enabled | `0` | Shows selection check box for the node. If Auto then selection check box visibility depends on control's configuration. Auto - depends on `hasSelectorCheckbox` property of the control True - shown False - hidden | 
 | `id` | string | `null` | Item id. It should be unique per chart. | 
 | `image` | string | `null` | Image | 
 | `isActive` | boolean | `true` | If true it makes item inactive in the diagram layout. Inactive items are regular items excluded from navigation, that means when diagram uses auto fit mode, selection of the neighboring nodes goes through inactive items, so all nodes next to inactive item become selected and shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | `isVisible` | boolean | `true` | If `false` it makes item invisible in the layout. If item has no visible parents then its connections are hidden as well. From navigation perspetive invisible items make all their children to be children of their parents. | 
 | `itemTitleColor` | string | `"#4169e1"` | Title background color. The same color is used for node marker when control has enabled auto fit mode. | 
 | `itemType` | ItemType | `0` | Item type. This property defines child node placement relative to its parent node. By default all children that belong to a parent node are of the same rank and status between each other and due to that, are always aligned below the parent and are organized in the same way. However for special cases were the end user wishes to have a child that is seperate from the rest of it's siblings, we provide custom child types that the end user can use to place diffrent ranking nodes anywhere around the parent node. These placement options give a lot of space for the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization. Additionally, by default `Regular` children are always placed in a horizontal line below the parent node. | 
 | `label` | string | `null` | Marker label. | 
 | `labelOrientation` | TextOrientationType | `3` | Label orientation. If `Auto` then it is set to `labelOrientation` property of the control configuration. | 
 | `labelPlacement` | PlacementType | `0` | Label placement. Sets label placement relative to the marker bounding rectangle. If `Auto` then it is set to `labelPlacement` of the control configuration. | 
 | `labelSize` | Size | `null` | Label size. Sets label's placeholder `div` size and controls conflict resolution if labels overlap each other. If `null` then it is set to `labelSize` property of the control configuration. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when node is minimized by autofit. The control supports auto fit of diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for individual node. | 
 | `parent` | string | `null` | Parent item id. If `null` then node is the root item of the hierarchy. | 
 | `showCallout` | Enabled | `0` | Sets callout annotation visibility for individual node. The callout annotation is one of easy to use features of the control. By default it is displayed for markers in order to preview their node's content. The content is displayed using current template of the node it is rendered for. The callout can be forced to be displayed for regular nodes as well. In that case use `calloutTemplateName` property to change their template. Auto - depends on `showCallout` property of the control True - shown regardless of node's visibility False - hidden | 
 | `showLabel` | Enabled | `0` | Sets label visibility for individual nodes. Labels are only rendered for a node's markers. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 
 | `templateName` | string | `null` | Template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. This option lets individually assign rendering template per individual node of the diagram. | 
 | `title` | string | `null` | Title | 

## <a name="primitives.orgdiagram.TemplateConfig" id="primitives.orgdiagram.TemplateConfig">TemplateConfig</a>
Template configuration object defines DOM elements for node content, cursor and highlight visual representation. They are grouped into one configuration object because if we decide to customize cursor or highlight templates most likely we are going to make them item template specific. At the same time control does not require all 3 of them to be defined. If cursor or highlight templates properties are not set in template configuration object then control uses internal default template for all of them. Generally all 3 templates can be set to null, so default templates are going to be used by control.

 `primitives.orgdiagram.TemplateConfig` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `buttons` | ButtonConfig[] | `null` | Template specific context buttons. | 
 | `cursorBorderWidth` | number | `2` | Cursor frame border width. | 
 | `cursorPadding` | Thickness | `{3, 3, 3, 3}` | Cursor frame offset from node. | 
 | `cursorTemplate` | string, object | `null` | Cursor Template. The control calls `onCursorRender` callback function when specific node cursor needs to be rendered with this template. | 
 | `highlightBorderWidth` | number | `1` | Highlight frame border width. | 
 | `highlightPadding` | Thickness | `{2, 2, 2, 2}` | Highlight frame offset from node. | 
 | `highlightTemplate` | string, object | `null` | Highlight Template. The control calls `onHighlightRender` callback function when specific node highlight needs to be rendered with this template. | 
 | `isActive` | boolean | `true` | If true it makes templated items inactive in diagram layout. Inactive items are regular items excluded from navigation, that means when use auto fit mode, selection of neighboring node to inactive item makes all nodes of inactive item shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | `itemBorderWidth` | number | `1` | Border width. We use archaic method to layout cursor and highlight frames around nodes, so we need to know border width in order measure gaps between them proeprly. | 
 | `itemSize` | Size | `{120, 100}` | Size. Control deals with fixed size layout, it makes no guesses about content and size of nodes. So we don't support in any form nodes auto sizing. In order to support such feature control should measure content of every node before rendering cycle. Taking into account that nodes visibility depends on available space it is going to be infinite loop of diagram layout and nodes measure iterations. The more space we provide to nodes the less number of diagram nodes is going to be visible. So control expect that node size is hard valued in template configuration. | 
 | `itemTemplate` | string, object | `null` | Item template. Supported template formats: Control provide two distinct ways to define item templates. The original one is based on setting HTML elements content via innerHTML DOM element property, see following reference at https://developer.mozilla.org web site for more details. The modern way is to use JSON ML library that is our recommended solution for templates definition, see following web site for more details http://www.jsonml.org/. This is only 3d party MIT licensed code included into our code base, everything else is 100% authentic. We adopted it with minor modifications, it generaly works according to its original design. The control calls `onItemRender` callback function when specific node cursor needs to be rendered with this template. | 
 | `minimizedItemBorderColor` | string | `null` | Marker border line color. By default it is the same as `itemTitleColor` of rendered node. | 
 | `minimizedItemCornerRadius` | number | `null` | Marker corder radius for simple squares. By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares. | 
 | `minimizedItemFillColor` | string | `null` | Marker fill color. By default it is the same as `itemTitleColor` of rendered node. | 
 | `minimizedItemLineWidth` | number | `1` | Marker border line width | 
 | `minimizedItemOpacity` | number | `1` | Marker fill color opacity. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when node is minimized by autofit. The control supposts auto fit of diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for nodes templated with this template. | 
 | `minimizedItemSize` | Size | `{4, 4}` | Marker size. | 
 | `name` | string | `null` | Name. Every template configuration object has name property, it is being used to reference templates from items. This name is used to as an argument of call back rendering function as well. If item has not template name set it uses default template for rendering. | 

## <a name="primitives.orgdiagram.ShapeAnnotationConfig" id="primitives.orgdiagram.ShapeAnnotationConfig">ShapeAnnotationConfig</a>
Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

 `primitives.orgdiagram.ShapeAnnotationConfig` 

### Constructor

 `ShapeAnnotationConfig(arg0)` 

Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `1` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | `borderColor` | string | `null` | Shape border line color | 
 | `cornerRadius` | string, number | `"10%"` | Corner radius. Body corner radius in percents or pixels. For applicable shapes only. | 
 | `fillColor` | string | `null` | Shape fill color | 
 | `items` | string[] | `[]` | Collection of nodes ids this shape annotation is drawn for. | 
 | `label` | string | `null` | Label. Label styled with css class name "bp-connector-label". | 
 | `labelOffset` | number | `4` | Label offset from shape in pixels. | 
 | `labelPlacement` | PlacementType | `0` | Label placement relative to the annotation. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `0` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Sets shape offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | `shapeType` | ShapeType | `0` | Shape | 
 | `zOrderType` | ZOrderType | `0` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="primitives.orgdiagram.BackgroundAnnotationConfig" id="primitives.orgdiagram.BackgroundAnnotationConfig">BackgroundAnnotationConfig</a>
Background annotation configuration object. Background annotation highlights nodes via drawing rectangular shape around nodes in the background of the diagram. If shapes overlap each other and they have the same style then they are merged into one continuous shape.

 `primitives.orgdiagram.BackgroundAnnotationConfig` 

### Constructor

 `BackgroundAnnotationConfig(arg0)` 

Background annotation configuration object. Background annotation highlights nodes via drawing rectangular shape around nodes in the background of the diagram. If shapes overlap each other and they have the same style then they are merged into one continuous shape.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `4` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | `borderColor` | string | `null` | Shape border line color | 
 | `fillColor` | string | `null` | Fill Color. | 
 | `includeChildren` | boolean | `false` | If this property is true then background annotation includes all descendants of every item in `items` collection. | 
 | `items` | string[] | `[]` | Collection of nodes ids this background annotation is drawn for. | 
 | `lineType` | LineType | `0` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{18, 18, 18, 18}` | Sets background offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | `zOrderType` | ZOrderType | `0` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="primitives.orgdiagram.ConnectorAnnotationConfig" id="primitives.orgdiagram.ConnectorAnnotationConfig">ConnectorAnnotationConfig</a>
Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

 `primitives.orgdiagram.ConnectorAnnotationConfig` 

### Constructor

 `ConnectorAnnotationConfig(arg0)` 

Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `0` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | `color` | string | `"#000000"` | Color | 
 | `connectorPlacementType` | ConnectorPlacementType | `0` | Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram. | 
 | `connectorShapeType` | ConnectorShapeType | `0` | Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram. | 
 | `fromItem` | string | `null` | The start node of connection line | 
 | `label` | string | `null` | Label. Label styled with css class name "bp-connector-label". | 
 | `labelPlacementType` | ConnectorLabelPlacementType | `1` | Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them along the connector line. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `0` | Line pattern | 
 | `lineWidth` | number | `2` | Border line width. | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Connector line end points offset. By default connection lines start from the margin of the node's rectangle. If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle. | 
 | `selectItems` | boolean | `true` | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | `toItem` | string | `null` | The end node of connection line | 
 | `zOrderType` | ZOrderType | `2` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="primitives.orgdiagram.HighlightPathAnnotationConfig" id="primitives.orgdiagram.HighlightPathAnnotationConfig">HighlightPathAnnotationConfig</a>
Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

 `primitives.orgdiagram.HighlightPathAnnotationConfig` 

### Constructor

 `HighlightPathAnnotationConfig(arg0)` 

Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `2` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | `color` | string | `"#ff0000"` | Line color | 
 | `items` | string[] | `[]` | Collection of nodes ids this annotation is drawn for. Please, pay attention that this is array of nodes ids. So if diagram finds wrong path from start to end node you have possibility to define every intermediate node in the sequence yourself. | 
 | `lineType` | LineType | `0` | Line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `opacity` | number | `1` | Opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | `showArrows` | boolean | `true` | If true then annotation has arrows along the highlight path line. | 
 | `zOrderType` | ZOrderType | `2` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="primitives.orgdiagram.ButtonConfig" id="primitives.orgdiagram.ButtonConfig">ButtonConfig</a>
The buttons panel on the side of the diagram nodes is one of our default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This object provides configuration properties for buttons rendered using HTML buttons elements. Please, pay attention that diagram visual element are rendered in layers on top of each other, so buttons panel is rendered as the very last layer of the diagram, so its mouse events are never blocked by any other visual elements. See `onButtonClick` event handler in control's configuration object.

 `primitives.orgdiagram.ButtonConfig` 

### Constructor

 `ButtonConfig(name, icon, tooltip)` 

The buttons panel on the side of the diagram nodes is one of our default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This object provides configuration properties for buttons rendered using HTML buttons elements. Please, pay attention that diagram visual element are rendered in layers on top of each other, so buttons panel is rendered as the very last layer of the diagram, so its mouse events are never blocked by any other visual elements. See `onButtonClick` event handler in control's configuration object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `name` | string | `` | Name | 
 | `icon` | string | `` | Icon | 
 | `tooltip` | string | `` | Tooltip | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `icon` | string | `icon` | Name of icon used in jQuery UI. | 
 | `label` | string | `null` | Text to show on the button. | 
 | `name` | string | `name` | Button name. It is needed for `onButtonClick` event handler. | 
 | `size` | Size | `{16, 16}` | Button size | 
 | `text` | boolean | `false` | If true show button text | 
 | `tooltip` | string | `tooltip` | Button tooltip content. Tooltip is rendered using jQuery UI tooltip widget, so it should be part of jQuery UI distribution in order to make this property work. | 

## <a name="primitives.orgdiagram.EventArgs" id="primitives.orgdiagram.EventArgs">EventArgs</a>
Context object

 `primitives.orgdiagram.EventArgs` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cancel` | boolean | `false` | If true cancels subsequent event and layout update. | 
 | `context` | string | `null` | New item | 
 | `name` | string | `null` | Relative object name. | 
 | `oldContext` | string | `null` | Current item | 
 | `position` | Rect | `null` | Node position on the diagram. | 
