# Family Diagram Configuration Objects
## Config
Family Chart configuration object. Use this object as a reference for available properties and their default values.

 <code>primitives.famdiagram.Config</code> 

### Constructor

 <code>Config(name)</code> 

Family Chart configuration object. Use this object as a reference for available properties and their default values.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>name</code> | string | <code></code> | name | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>alignBylevels</code> | boolean | <code>true</code> | This option keeps items at the same levels after connections bundling. | 
 | <code>annotations</code> | Array.<(ShapeAnnotationConfi | <code>[]</code> | Annotations. Annotations are API elements that are attached to the diagram nodes. We draw our annotations either in front of the nodes or in the background. The annotations don't affect the nodes placement in any way. As a result the control redraws them instantaneously without rerendering or recalculating the actual diagram layout. | 
 | <code>arrowsDirection</code> | GroupByType | <code>0</code> | Sets arrows direction for connector lines. If this property set to `Parents` then arrows are drawn from logical children towards logical parents. By default diagram has no arrows. | 
 | <code>autoSizeMaximum</code> | Size | <code>{1024, 768}</code> | Sets maximum size the diagram can expand itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | <code>autoSizeMinimum</code> | Size | <code>{800, 600}</code> | Sets minimum size the diagram can shrink itself in autosize mode. See `pageFitMode` property. In the auto size mode diagram controls its placeholder size itself, it sets its size to accomodate all nodes and render them normally. | 
 | <code>bevelSize</code> | number | <code>4</code> | The bevel size of squared connector lines. | 
 | <code>buttons</code> | ButtonConfig[] | <code>[]</code> | Buttons configuration objects collection. The buttons panel on the side of the diagram nodes is one of our default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This collection of buttons provides configuration properties for buttons rendered using HTML buttons elements. | 
 | <code>buttonsPanelSize</code> | number | <code>28</code> | The size of the panel containing context buttons. | 
 | <code>calloutBorderColor</code> | string | <code>null</code> | Callout annotation border color. | 
 | <code>calloutCornerRadius</code> | number | <code>4</code> | Callout annotation corner radius. | 
 | <code>calloutLineWidth</code> | number | <code>1</code> | Callout annotation border line width. | 
 | <code>calloutMaximumVisibility</code> | Visibility | <code>2</code> | Sets visibility of the callout annotation depending on size of a node it is shown for. See `pageFitMode` property. | 
 | <code>calloutOffset</code> | number | <code>4</code> | Callout annotation border line offset. | 
 | <code>calloutOpacity</code> | number | <code>0.2</code> | Callout annotation opacity | 
 | <code>calloutPlacementOffset</code> | number | <code>100</code> | Callout annotation placement offset. Sets how far callout content is offset from the marker it is displayed for. | 
 | <code>calloutPointerWidth</code> | string | <code>"10%"</code> | Callout annotation pointer width. | 
 | <code>calloutfillColor</code> | string | <code>"#000000"</code> | Callout annotation fill color. | 
 | <code>checkBoxPanelSize</code> | number | <code>24</code> | The size of the panel containing selection checkbox. | 
 | <code>cousinsIntervalMultiplier</code> | number | <code>5</code> | Set cousins interval multiplier. This values adds extra space between branches of the hierarchy. For example nodes of the same parent have interval 20 and nodes of two different parents are going to have interval 100. | 
 | <code>cursorItem</code> | string | <code>null</code> | Cursor item. Family Chart control has API options equivalent to regular UI controls. The cursor item is used to select single item in the hierarchy with mouse click, highlight item provides visual feed back on mouse over. Selected items collection is equivalent to checked items in ListView or TreeView controls. Chart navigation depends on current cursor item, chart shows cursor and its neighbours in full size regardless of enabled page fit mode. So cursor item plays a role of local zoom in the chart hierarchy. User navigates around chart via clicking and moving cursor item around and zooming into data around new cursor item. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no cursor item selected in the diagram. | 
 | <code>defaultCalloutTemplateName</code> | string | <code>null</code> | Callout annotation default template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | <code>defaultLabelAnnotationTemplate</code> | string | <code>null</code> | Sets the name of template used to render label annotations. Label annotations are labels placed in layout of the diagram. | 
 | <code>defaultTemplateName</code> | string | <code>null</code> | Name of the template used to render nodes in the diagram. See `templates` property. Template name can be set individually for every node see `templateName` property of `ItemConfig`. | 
 | <code>dotItemsInterval</code> | number | <code>1</code> | Sets interval between nodes of the same row, minimized down to markers. | 
 | <code>dotLevelShift</code> | number | <code>20</code> | Sets the spacing after the row containing nodes minimized down to markers. | 
 | <code>elbowDotSize</code> | number | <code>4</code> | The size of dot markers placed in the elbows of connector lines. | 
 | <code>elbowType</code> | ElbowType | <code>3</code> | Set style of squared connectors with custom elbows. | 
 | <code>emptyDiagramMessage</code> | string | <code>"Diagram is empty."</code> | Empty diagram message. This option is supposed to say user that chart is empty when no data is available for rendering. | 
 | <code>enableMatrixLayout</code> | boolean | <code>false</code> | This option enables automatic layout of nodes sharing the same set of parents and children in form of matrix. | 
 | <code>enablePanning</code> | boolean | <code>true</code> | Enable panning. Enable chart panning with mouse drag & drop for desktop browsers. Disable it if you need to support items Drag & Drop. | 
 | <code>extraArrowsMinimumSpace</code> | number | <code>30</code> | Set minimum space for placement of extra arrows on horizontal connection lines. See `showExtraArrows` property. | 
 | <code>graphicsType</code> | GraphicsType | <code>0</code> | Sets prefered rendering technology. If selected graphics type is not supported on the device, then control will auto fallback to the first available one. | 
 | <code>groupByType</code> | GroupByType | <code>2</code> | This property sets loose nodes alignment between rows. Nodes can be placed close towards parents or children. | 
 | <code>groupTitleColor</code> | string | <code>"#4169e1"</code> | Group titles color. | 
 | <code>groupTitleFontFamily</code> | string | <code>"Arial"</code> | Group titles font family. | 
 | <code>groupTitleFontSize</code> | number | <code>"12px"</code> | Group titles font size. | 
 | <code>groupTitleFontStyle</code> | string | <code>"normal"</code> | Group titles font style: normal, italic | 
 | <code>groupTitleFontWeight</code> | string | <code>"normal"</code> | Group titles font weight: normal, bold | 
 | <code>groupTitleHorizontalAlignment</code> | HorizontalAlignmentType | <code>0</code> | Group titles horizontal alignment. | 
 | <code>groupTitleOrientation</code> | TextOrientationType | <code>2</code> | Group titles orientation. | 
 | <code>groupTitlePanelSize</code> | number | <code>24</code> | The size of the panel containing group title. | 
 | <code>groupTitlePlacementType</code> | AdviserPlacementType | <code>2</code> | Group titles placement. Defines group title and buttons panel position relative to the node. By default it is on the left. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | <code>groupTitleVerticalAlignment</code> | VerticalAlignmentType | <code>1</code> | Group titles vertical alignment. | 
 | <code>hasButtons</code> | Enabled | <code>0</code> | Sets buttons visibility. `Auto` - cursor item only. `True` - visible `False` - hidden | 
 | <code>hasSelectorCheckbox</code> | Enabled | <code>0</code> | Sets visibility of selection check boxes for the diagram nodes. `Auto` - visible for cursor item only `True` - visible `False` - hiddens See `selectedItems` property. All items listed in this property are going to have checked selection checkboxes. Checkbox can be added to item template, in that case it should be named="checkbox", so control can use it as built in checkbox element. | 
 | <code>hideGrandParentsConnectors</code> | boolean | <code>false</code> | Set this property to enable hiding of direct connectors to grand parents. It helps to reduce diagrams connectors layout complexity. | 
 | <code>highlightGravityRadius</code> | number | <code>40</code> | Highlight gravity radius. This property controls mouse over feedback and callout annotation visibility for nodes rendered as markers when diagram auto fits nodes into available screen space. It makes marker highlighted when mouse pointer is inside of the gravity radius cycle of the marker. This property is ignored when the nearest item is outside of the screen boundaries and is not visible to the end user. The normal item has mouse over feedback in form of highlight border only when mouse pointer is inside of its boundaries. | 
 | <code>highlightItem</code> | string | <code>null</code> | Highlighted item. Shows highlight and callout annotation for given item id. It does not trigger diagram layout or scrolling so it can be used to syncronize mouse over feedback of the diagram nodes with other collection controls or UI elements. The control notifies about this property chnges with `onHighlightChanging` and `onHighlightChanged` events. If `null` then no highlight shown on the diagram. | 
 | <code>highlightLinesColor</code> | string | <code>"#ff0000"</code> | Sets highlight lines color. The diagram uses highlight lines to render highlighted relation lines between nodes. See `showNeigboursConnectorsHighlighted` property. | 
 | <code>highlightLinesType</code> | LineType | <code>0</code> | Sets highlight lines pattern. See `showNeigboursConnectorsHighlighted` property. | 
 | <code>highlightLinesWidth</code> | number | <code>1</code> | Sets highlight lines width. See `showNeigboursConnectorsHighlighted` property. | 
 | <code>itemTitleFirstFontColor</code> | string | <code>"#ffffff"</code> | The first font color of the title. The title background color is designed to be one of the avalaible dimensitions to group nodes in the diagram, so title can be unreadable if its color matches its background color. This property is created to auto resolve this issue via automatic switch between two available font title colors. | 
 | <code>itemTitleSecondFontColor</code> | string | <code>"#000080"</code> | The second font color of the title. | 
 | <code>items</code> | ItemConfig[] | <code>[]</code> | Items collection. Ths property defines data we render in the diagram. Every items should have unique `id` property set. They are used to create relations between items in the diagram and for rendering various UI elements bound to nodes. | 
 | <code>labelColor</code> | string | <code>"#000000"</code> | Labels color | 
 | <code>labelFontFamily</code> | string | <code>"Arial"</code> | Labels font family. | 
 | <code>labelFontSize</code> | string | <code>"10px"</code> | Labels font size. | 
 | <code>labelFontStyle</code> | string | <code>"normal"</code> | Labels font style. Font style: normal, italic | 
 | <code>labelFontWeight</code> | string | <code>"normal"</code> | Labels font weight Font weight: normal, bold | 
 | <code>labelOffset</code> | number | <code>1</code> | Sets labels offset from the merkers bounding rectangles. | 
 | <code>labelOrientation</code> | TextOrientationType | <code>0</code> | Labels orientation. | 
 | <code>labelPlacement</code> | PlacementType | <code>1</code> | Labels placement. Sets labels placement relative to the markers bounding rectangles. | 
 | <code>labelSize</code> | Size | <code>{80, 24}</code> | Label size. Sets labels placeholders `div`s size. It is needed to resolve labels overlapping. If one label overlaps another label the or item it will be hidden. | 
 | <code>lineItemsInterval</code> | number | <code>2</code> | Sets interval between nodes of the same row, minimized down to lines. | 
 | <code>lineLevelShift</code> | number | <code>10</code> | Sets the spacing after the row containing nodes minimized down to lines. | 
 | <code>linesColor</code> | string | <code>"#c0c0c0"</code> | The relations lines color. The control uses this lines color to render basic relations between nodes. | 
 | <code>linesPalette</code> | PaletteItemConfig[] | <code>[]</code> | This collection contains lines styles for rendering relations going across family hierarchy. The purpose of this collection is to draw long horizontal parallel lines drawn between family branches in different styles. If this collection is empty then default `linesColor`, `linesWidth` and `linesType` are used for all connector lines. | 
 | <code>linesType</code> | LineType | <code>0</code> | The relations lines pattern | 
 | <code>linesWidth</code> | number | <code>1</code> | The relations lines width | 
 | <code>maximumColumnsInMatrix</code> | number | <code>6</code> | Sets maximum number of columns in the matrix formation. The matrix formation stays squared as long as total number of columns does not exceed this property value. In order to shape nodes into matrix formation they should share the same set of parents and children. See `enableMatrixLayout` property. | 
 | <code>minimalVisibility</code> | Visibility | <code>2</code> | Minimal nodes visibility in the diagram. If auto fit of the diagram into current page size is enabled, then this option controls minimum allowed size of the diagram nodes. | 
 | <code>minimizedItemShapeType</code> | ShapeType | <code>6</code> | Markers. The shape of the markers when nodes are minimized by autofit. The control supports auto fit of the diagram into available screen space. When the diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets default marker shape for nodes. It can be set individually per node in items configurations. The default color of shape is the same as `itemTitleColor` property set for individual items. | 
 | <code>minimumMatrixSize</code> | number | <code>4</code> | Sets Minimum number of nodes needed to be shaped into matrix formtion. In order to shape nodes in form of matrix they should share the same set of parents and children. See `enableMatrixLayout` property. | 
 | <code>navigationMode</code> | NavigationMode | <code>0</code> | Sets control navigation mode. By default control replicates interactivity of regular collection control. It has cursor to select single item in the collection. So user can click and select any node in the diagram. The control has highlight for mouse over feedback. So user can move mouse and see highlight frame and callout callback annotation for node under cursor. By `Default` the control has both cursor and highlight. If they are disabled then control is rendered as a static image. | 
 | <code>neighboursSelectionMode</code> | NeighboursSelectionMode | <code>0</code> | Sets the neighbours selection mode, it defines how many neighbours are selected around cursor. | 
 | <code>normalItemsInterval</code> | number | <code>10</code> | Sets interval between nodes of the same row. | 
 | <code>normalLevelShift</code> | number | <code>20</code> | Sets the spacing between rows. | 
 | <code>orientationType</code> | OrientationType | <code>0</code> | Set diagram orientation. This option controls diagram layout orientation. The control can be rotated in any direction, this is needed for Arabic support and various layouts. | 
 | <code>pageFitMode</code> | PageFitMode | <code>3</code> | Page fit mode. Minimizing nodes into markers and labels. This option provides a special mode that renders the diagram nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes while not affecting the rendering performance. With this, huge diagrams can be fit into avaialable screen space. When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes. This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items are just too small to be readable. | 
 | <code>scale</code> | number | <code>1</code> | CSS3 scale transform. Control supports content scaling using CSS scale transform. It scales everything except scroll bars. It properly handles mouse event coordinates. The CSS scale transform produces unreadable text and corrupted lines in desktop browsers, it looks good only in mobile browsers, so our recomendation is to use zoom with collection of item templates of various sizes. Templates gives you better control over quality of your content at various zoom levels. | 
 | <code>selectCheckBoxLabel</code> | string | <code>"Selected"</code> | Selection check box label. See `hasSelectorCheckbox` and `selectedItems` properties. | 
 | <code>selectedItems</code> | string[] | <code>[]</code> | Selected items collection. Selected items is a collection of items ids having checked their check boxes. The control always shows selected items in the full size form, regardless of enabled page fit mode. The control notifies about user made changes in this collection with `onSelectionChanging` and `onSelectionChanged` events. | 
 | <code>selectionPathMode</code> | SelectionPathMode | <code>0</code> | Selection path mode. This property controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers. | 
 | <code>showCallout</code> | boolean | <code>true</code> | Sets callout visibility. | 
 | <code>showExtraArrows</code> | boolean | <code>true</code> | Show extra horizontal arrows on top of long horizontal connection lines for the easy visual tracing of relations between parents and children. By default it is off. | 
 | <code>showLabels</code> | Enabled | <code>0</code> | Sets labels visibility for nodes when they are minimized into markers by page auto fit. See `pageFitMode` property. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 
 | <code>showNeigboursConnectorsHighlighted</code> | boolean | <code>false</code> | Shows connection lines between current cursor item and its neighbours highlighted. Neighbours selection mode is set by `neighboursSelectionMode` property. Set following properties: `highlightLinesColor`, `highlightLinesWidth` and `highlightLinesType` to style highlighted lines. | 
 | <code>templates</code> | TemplateConfig[] | <code>[]</code> | Collection of named templates used to define content for nodes, cursor and highlight. By default control provides templates for all types of visual elements. | 
 | <code>verticalAlignment</code> | VerticalAlignmentType | <code>1</code> | Sets items vertical alignment relative to each other within one level of the hierarchy. It does not change anything if diagram nodes are all of the same size. | 

## ItemConfig
Item Configuration Object defines properties of individual node in the family chart hierarchy. See `items` collection property of family control configuration object.

 <code>primitives.famdiagram.ItemConfig</code> 

### Constructor

 <code>ItemConfig(arg0, arg1, arg2, arg3, arg4)</code> 

Item Configuration Object defines properties of individual node in the family chart hierarchy. See `items` collection property of family control configuration object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | ItemConfig | <code></code> | Item config properties | 
 | <code>arg0</code> | string | <code></code> | Item id | 
 | <code>arg1</code> | string[], undefined | <code></code> | Parents ids | 
 | <code>arg2</code> | string | <code></code> | Title | 
 | <code>arg3</code> | string | <code></code> | Description | 
 | <code>arg4</code> | string | <code></code> | Image | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>calloutTemplateName</code> | string | <code>null</code> | Callout annotation template name. This option lets individually assign rendering callout annotation template per individual node of the diagram. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. | 
 | <code>context</code> | object | <code>null</code> | Context object | 
 | <code>description</code> | string | <code>null</code> | Description | 
 | <code>groupTitle</code> | string | <code>null</code> | Group Title. The group title on the side of the diagram node is one of controls default easy to use features. It gives extra dimension for nodes visual grouping in the diagram. | 
 | <code>groupTitleColor</code> | string | <code>"#4169e1"</code> | The group title background color. | 
 | <code>hasButtons</code> | Enabled | <code>0</code> | Shows context buttons panel for the node. If Auto then context buttons panel visibility depends on control's configuration. Auto - depends on `hasButtons` property of the control True - shown False - hidden | 
 | <code>hasSelectorCheckbox</code> | Enabled | <code>0</code> | Shows selection check box for the node. If Auto then selection check box visibility depends on control's configuration. Auto - depends on `hasSelectorCheckbox` property of the control True - shown False - hidden | 
 | <code>id</code> | string | <code>null</code> | Item id. It should be unique per chart. | 
 | <code>image</code> | string | <code>null</code> | Image | 
 | <code>isActive</code> | boolean | <code>true</code> | If true it makes item inactive in the diagram layout. Inactive items are regular items excluded from navigation, that means when diagram uses auto fit mode, selection of the neighboring nodes goes through inactive items, so all nodes next to inactive item become selected and shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | <code>itemTitleColor</code> | string | <code>"#4169e1"</code> | Title background color. The same color is used for node marker when control has enabled auto fit mode. | 
 | <code>label</code> | string | <code>null</code> | Marker label. | 
 | <code>labelOrientation</code> | TextOrientationType | <code>3</code> | Label orientation. If `Auto` then it is set to `labelOrientation` property of the control configuration. | 
 | <code>labelPlacement</code> | PlacementType | <code>0</code> | Label placement. Sets label placement relative to the marker bounding rectangle. If `Auto` then it is set to `labelPlacement` of the control configuration. | 
 | <code>labelSize</code> | Size | <code>null</code> | Label size. Sets label's placeholder `div` size and controls conflict resolution if labels overlap each other. If `null` then it is set to `labelSize` property of the control configuration. | 
 | <code>minimizedItemShapeType</code> | ShapeType | <code>null</code> | Marker type. The shape of the marker when node is minimized by autofit. The control supports auto fit of diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for individual node. | 
 | <code>parents</code> | string[] | <code>[]</code> | Parents items ids. If this collection is empty then item considered as a root item. | 
 | <code>placementType</code> | AdviserPlacementType | <code>3</code> | Relative placement type defines Left ot Right side placement of the node relative to the `relativeItem`. | 
 | <code>position</code> | number | <code>null</code> | Relative position defines order of elements placed relative to the same relative item on the same side. | 
 | <code>relativeItem</code> | string | <code>null</code> | Relative item id. This property is used to control items mutual placement in order to keep consistent ordering within levels. Relative item is used for placing given item in diagram. We can place item on left or right side of relative item via setting placementType type property. In case when multiple items use the same relative item then their order can be customized with position property. If this property set to null, family layout algorithm will try to choose elements order via placing connected nodes as close to each other as posible. | 
 | <code>showCallout</code> | Enabled | <code>0</code> | Sets callout annotation visibility for individual node. The callout annotation is one of easy to use features of the control. By default it is displayed for markers in order to preview their node's content. The content is displayed using current template of the node it is rendered for. The callout can be forced to be displayed for regular nodes as well. In that case use `calloutTemplateName` property to change their template. Auto - depends on `showCallout` property of the control True - shown regardless of node's visibility False - hidden | 
 | <code>showLabel</code> | Enabled | <code>0</code> | Sets label visibility for individual nodes. Labels are only rendered for a node's markers. The control does not preserve space for labels in the diagram layout, since that would contradict the purpose of minimizing the nodes into markers. Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve space between nodes for labels. Labels are displayed inside of `div`s of the fixed size, see `labelSize` property, and control provides simple conflict resoltion to avoid labels overlapping. If two labels overlap each other with their bounding rectangles then only one of them is going to stay visible. Auto - displays label only when it has space to be rendered. True - shows label regardless, even if it overlaps other labels and nodes. False - hidden. | 
 | <code>spouses</code> | string[] | <code>[]</code> | Spouses items ids. The nodes of this collection create fake invisible child node, so all of them are being connected with common child connection line. | 
 | <code>templateName</code> | string | <code>null</code> | Template name. Templates are HTML fragments containing layout and styles used to render diagram nodes. They are defined with a named configuration objects. See `templates` property of control's configuration object. This option lets individually assign rendering template per individual node of the diagram. | 
 | <code>title</code> | string | <code>null</code> | Title | 

## TemplateConfig
Template configuration object defines DOM elements for node content, cursor and highlight visual representation. They are grouped into one configuration object because if we decide to customize cursor or highlight templates most likely we are going to make them item template specific. At the same time control does not require all 3 of them to be defined. If cursor or highlight templates properties are not set in template configuration object then control uses internal default template for all of them. Generally all 3 templates can be set to null, so default templates are going to be used by control.

 <code>primitives.famdiagram.TemplateConfig</code> 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>buttons</code> | ButtonConfig[] | <code>null</code> | Template specific context buttons. | 
 | <code>cursorBorderWidth</code> | number | <code>2</code> | Cursor frame border width. | 
 | <code>cursorPadding</code> | Thickness | <code>{3, 3, 3, 3}</code> | Cursor frame offset from node. | 
 | <code>cursorTemplate</code> | string, object | <code>null</code> | Cursor Template. The control calls `onCursorRender` callback function when specific node cursor needs to be rendered with this template. | 
 | <code>highlightBorderWidth</code> | number | <code>1</code> | Highlight frame border width. | 
 | <code>highlightPadding</code> | Thickness | <code>{2, 2, 2, 2}</code> | Highlight frame offset from node. | 
 | <code>highlightTemplate</code> | string, object | <code>null</code> | Highlight Template. The control calls `onHighlightRender` callback function when specific node highlight needs to be rendered with this template. | 
 | <code>isActive</code> | boolean | <code>true</code> | If true it makes templated items inactive in diagram layout. Inactive items are regular items excluded from navigation, that means when use auto fit mode, selection of neighboring node to inactive item makes all nodes of inactive item shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | <code>itemBorderWidth</code> | number | <code>1</code> | Border width. We use archaic method to layout cursor and highlight frames around nodes, so we need to know border width in order measure gaps between them proeprly. | 
 | <code>itemSize</code> | Size | <code>{120, 100}</code> | Size. Control deals with fixed size layout, it makes no guesses about content and size of nodes. So we don't support in any form nodes auto sizing. In order to support such feature control should measure content of every node before rendering cycle. Taking into account that nodes visibility depends on available space it is going to be infinite loop of diagram layout and nodes measure iterations. The more space we provide to nodes the less number of diagram nodes is going to be visible. So control expect that node size is hard valued in template configuration. | 
 | <code>itemTemplate</code> | string, object | <code>null</code> | Item template. Supported template formats: Control provide two distinct ways to define item templates. The original one is based on setting HTML elements content via innerHTML DOM element property, see following reference at https://developer.mozilla.org web site for more details. The modern way is to use JSON ML library that is our recommended solution for templates definition, see following web site for more details http://www.jsonml.org/. This is only 3d party MIT licensed code included into our code base, everything else is 100% authentic. We adopted it with minor modifications, it generaly works according to its original design. The control calls `onItemRender` callback function when specific node cursor needs to be rendered with this template. | 
 | <code>minimizedItemBorderColor</code> | string | <code>null</code> | Marker border line color. By default it is the same as `itemTitleColor` of rendered node. | 
 | <code>minimizedItemCornerRadius</code> | number | <code>null</code> | Marker corder radius for simple squares. By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares. | 
 | <code>minimizedItemFillColor</code> | string | <code>null</code> | Marker fill color. By default it is the same as `itemTitleColor` of rendered node. | 
 | <code>minimizedItemLineWidth</code> | number | <code>1</code> | Marker border line width | 
 | <code>minimizedItemOpacity</code> | number | <code>1</code> | Marker fill color opacity. | 
 | <code>minimizedItemShapeType</code> | ShapeType | <code>null</code> | Marker type. The shape of the marker when node is minimized by autofit. The control supports auto fit of the diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for nodes templated with this template. | 
 | <code>minimizedItemSize</code> | Size | <code>{4, 4}</code> | Marker size. | 
 | <code>name</code> | string | <code>null</code> | Name. Every template configuration object has name property, it is being used to reference templates from items. This name is used to as an argument of call back rendering function as well. If item has not template name set it uses default template for rendering. | 

## ShapeAnnotationConfig
Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

 <code>primitives.famdiagram.ShapeAnnotationConfig</code> 

### Constructor

 <code>ShapeAnnotationConfig(arg0)</code> 

Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | object | <code></code> | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>annotationType</code> | AnnotationType | <code>1</code> | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | <code>borderColor</code> | string | <code>null</code> | Shape border line color | 
 | <code>cornerRadius</code> | string, number | <code>"10%"</code> | Corner radius. Body corner radius in percents or pixels. For applicable shapes only. | 
 | <code>fillColor</code> | string | <code>null</code> | Shape fill color | 
 | <code>items</code> | string[] | <code>[]</code> | Collection of nodes ids this shape annotation is drawn for. | 
 | <code>label</code> | string | <code>null</code> | Label. Label styled with css class name "bp-connector-label". | 
 | <code>labelOffset</code> | number | <code>4</code> | Label offset from shape in pixels. | 
 | <code>labelPlacement</code> | PlacementType | <code>0</code> | Label placement relative to the annotation. | 
 | <code>labelSize</code> | Size | <code>{60, 30}</code> | Label size | 
 | <code>lineType</code> | LineType | <code>0</code> | Border line type | 
 | <code>lineWidth</code> | number | <code>2</code> | Border line width | 
 | <code>offset</code> | Thickness | <code>{0, 0, 0, 0}</code> | Sets shape offset around annotated items. | 
 | <code>opacity</code> | number | <code>1</code> | Background color opacity. | 
 | <code>selectItems</code> | boolean | <code>false</code> | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | <code>shapeType</code> | ShapeType | <code>0</code> | Shape | 
 | <code>zOrderType</code> | ZOrderType | <code>0</code> | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## BackgroundAnnotationConfig
Consider background annotation as another way to highlight some items in diagram. In order to use it you have to create instances of this class and populate annotation collection. Background annotation is drawn as rectangular area offset around annotated item. If two items backgrounds overlap each other they are merged into one background area.

 <code>primitives.famdiagram.BackgroundAnnotationConfig</code> 

### Constructor

 <code>BackgroundAnnotationConfig(arg0)</code> 

Consider background annotation as another way to highlight some items in diagram. In order to use it you have to create instances of this class and populate annotation collection. Background annotation is drawn as rectangular area offset around annotated item. If two items backgrounds overlap each other they are merged into one background area.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | object | <code></code> | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>annotationType</code> | AnnotationType | <code>4</code> | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | <code>borderColor</code> | string | <code>null</code> | Shape border line color | 
 | <code>fillColor</code> | string | <code>null</code> | Fill Color. | 
 | <code>items</code> | string[] | <code>[]</code> | Collection of nodes ids this background annotation is drawn for. | 
 | <code>lineType</code> | LineType | <code>0</code> | Border line type | 
 | <code>lineWidth</code> | number | <code>2</code> | Border line width | 
 | <code>offset</code> | Thickness | <code>{18, 18, 18, 18}</code> | Sets background offset around annotated items. | 
 | <code>opacity</code> | number | <code>1</code> | Background color opacity. | 
 | <code>selectItems</code> | boolean | <code>false</code> | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | <code>zOrderType</code> | ZOrderType | <code>0</code> | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## ConnectorAnnotationConfig
Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

 <code>primitives.famdiagram.ConnectorAnnotationConfig</code> 

### Constructor

 <code>ConnectorAnnotationConfig(arg0)</code> 

Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | object | <code></code> | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>annotationType</code> | AnnotationType | <code>0</code> | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | <code>color</code> | string | <code>"#000000"</code> | Color | 
 | <code>connectorPlacementType</code> | ConnectorPlacementType | <code>0</code> | Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram. | 
 | <code>connectorShapeType</code> | ConnectorShapeType | <code>0</code> | Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram. | 
 | <code>fromItem</code> | string | <code>null</code> | The start node of connection line | 
 | <code>label</code> | string | <code>null</code> | Label. Label styled with css class name "bp-connector-label". | 
 | <code>labelPlacementType</code> | ConnectorLabelPlacementType | <code>1</code> | Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them along the connector line. | 
 | <code>labelSize</code> | Size | <code>{60, 30}</code> | Label size | 
 | <code>lineType</code> | LineType | <code>0</code> | Line pattern | 
 | <code>lineWidth</code> | number | <code>2</code> | Border line width. | 
 | <code>offset</code> | Thickness | <code>{0, 0, 0, 0}</code> | Connector line end points offset. By default connection lines start from the margin of the node's rectangle. If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle. | 
 | <code>selectItems</code> | boolean | <code>true</code> | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | <code>toItem</code> | string | <code>null</code> | The end node of connection line | 
 | <code>zOrderType</code> | ZOrderType | <code>2</code> | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## HighlightPathAnnotationConfig
Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

 <code>primitives.famdiagram.HighlightPathAnnotationConfig</code> 

### Constructor

 <code>HighlightPathAnnotationConfig(arg0)</code> 

Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | object | <code></code> | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>annotationType</code> | AnnotationType | <code>2</code> | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | <code>color</code> | string | <code>"#ff0000"</code> | Line color | 
 | <code>items</code> | string[] | <code>[]</code> | Collection of nodes ids this annotation is drawn for. Please, pay attention that this is array of nodes ids. So if diagram finds wrong path from start to end node you have possibility to define every intermediate node in the sequence yourself. | 
 | <code>lineType</code> | LineType | <code>0</code> | Line type | 
 | <code>lineWidth</code> | number | <code>2</code> | Border line width | 
 | <code>opacity</code> | number | <code>1</code> | Opacity. | 
 | <code>selectItems</code> | boolean | <code>false</code> | If true then annotated nodes are shown full size regardless of controls autofit mode and available screen space. | 
 | <code>showArrows</code> | boolean | <code>true</code> | If true then annotation has arrows along the highlight path line. | 
 | <code>zOrderType</code> | ZOrderType | <code>2</code> | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparentcy consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explisitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everyhting, so they are never blocked by annotations drawn in front of diagram nodes. | 

## LabelAnnotationConfig
In-layout label annotation. Label anntations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighbouring nodes. Label annotations are designed for autoplacement and bundling of connection lines between nodes when needed.

 <code>primitives.famdiagram.LabelAnnotationConfig</code> 

### Constructor

 <code>LabelAnnotationConfig(arg0)</code> 

In-layout label annotation. Label anntations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighbouring nodes. Label annotations are designed for autoplacement and bundling of connection lines between nodes when needed.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | object | <code></code> | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>annotationType</code> | AnnotationType | <code>3</code> | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distiguish them when they are defined as JSON objects. | 
 | <code>fromItem</code> | string | <code>null</code> | This is the item id you are creating annotation for. | 
 | <code>itemTitleColor</code> | string | <code>"#4169e1"</code> | Default template title background color. | 
 | <code>templateName</code> | string | <code>null</code> | Template name used to render this label. | 
 | <code>title</code> | string | <code>null</code> | Title. Annotation label text, it is styled with css class name "bp-connector-label". | 
 | <code>toItems</code> | string[] | <code>[]</code> | This collection should contain only child or parent items of the annotated item. It cannot conatain children and parents at the same time. If it contain sub set of children then annotaion label bundles children into subset and annotations form cascades of labels over connection lines in the diagram. | 

## PaletteItemConfig
Palette Item configuration object defines cross family connections lines styles. Multi-parent diagrams have cross hirearchy relation lines, so in order to make their visual tracing more easy on diagram every connection line can be styled differently. (This is the same approach as for visualization of regular classic line charts. If we have multiple lines in chart area it makes sense to style every line individually.)

 <code>primitives.famdiagram.PaletteItemConfig</code> 

### Constructor

 <code>PaletteItemConfig(arg0, arg1, arg2)</code> 

Palette Item configuration object defines cross family connections lines styles. Multi-parent diagrams have cross hirearchy relation lines, so in order to make their visual tracing more easy on diagram every connection line can be styled differently. (This is the same approach as for visualization of regular classic line charts. If we have multiple lines in chart area it makes sense to style every line individually.)

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>arg0</code> | PaletteItemConfig | <code></code> | Palette properties object. | 
 | <code>arg0</code> | string | <code></code> | Line color | 
 | <code>arg1</code> | number | <code></code> | Line width | 
 | <code>arg2</code> | LineType | <code></code> | Line type | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>lineColor</code> | string | <code>"#c0c0c0"</code> | Line color | 
 | <code>lineType</code> | LineType | <code>0</code> | Line type | 
 | <code>lineWidth</code> | number | <code>1</code> | Line width | 

## ButtonConfig
The buttons panel on the side of the diagram nodes is one of controls default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This object provides configuration properties for buttons rendered using HTML buttons elements. Please, pay attention that diagram visual element are rendered in layers on top of each other, so buttons panel is rendered as the very last layer of the diagram, so its mouse events are never blocked by any other visual elements. See `onButtonClick` event handler in control's configuration object.

 <code>primitives.famdiagram.ButtonConfig</code> 

### Constructor

 <code>ButtonConfig(name, icon, tooltip)</code> 

The buttons panel on the side of the diagram nodes is one of controls default easy to use features. This gives you the possibility to try and see how context buttons work being placed inside of diagram layout. This object provides configuration properties for buttons rendered using HTML buttons elements. Please, pay attention that diagram visual element are rendered in layers on top of each other, so buttons panel is rendered as the very last layer of the diagram, so its mouse events are never blocked by any other visual elements. See `onButtonClick` event handler in control's configuration object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>name</code> | string | <code></code> | Name | 
 | <code>icon</code> | string | <code></code> | Icon | 
 | <code>tooltip</code> | string | <code></code> | Tooltip | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>icon</code> | string | <code>icon</code> | Name of icon used in jQuery UI. | 
 | <code>label</code> | string | <code>null</code> | Text to show on the button. | 
 | <code>name</code> | string | <code>name</code> | Button name. It is needed for `onButtonClick` event handler. | 
 | <code>size</code> | Size | <code>{16, 16}</code> | Button size | 
 | <code>text</code> | boolean | <code>false</code> | If true show button text | 
 | <code>tooltip</code> | string | <code>tooltip</code> | Button tooltip content. Tooltip is rendered using jQuery UI tooltip widget, so it should be part of jQuery UI distribution in order to make this property work. | 

## EventArgs
Context object

 <code>primitives.famdiagram.EventArgs</code> 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>cancel</code> | boolean | <code>false</code> | If true cancels subsequent event and layout update. | 
 | <code>context</code> | string | <code>null</code> | New item | 
 | <code>name</code> | string | <code>null</code> | Relative object name. | 
 | <code>oldContext</code> | string | <code>null</code> | Current item | 
 | <code>position</code> | Rect | <code>null</code> | Node position on the diagram. | 
