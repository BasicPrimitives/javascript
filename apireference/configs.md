# Configuration Objects
## <a name="BackgroundAnnotationConfig" id="BackgroundAnnotationConfig">BackgroundAnnotationConfig</a>
Background annotation draws a rectangular shape around annotated items. Annotations borders are offset around nodes, so if two annotations overlap, they are merged into one continuous shape with a single borderline.

 `BackgroundAnnotationConfig` 

### Constructor

 `BackgroundAnnotationConfig(arg0)` 

Background annotation draws a rectangular shape around annotated items. Annotations borders are offset around nodes, so if two annotations overlap, they are merged into one continuous shape with a single borderline.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Background` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `borderColor` | string | `null` | Border line color | 
 | `fillColor` | string | `null` | Fill Color. | 
 | `includeChildren` | boolean | `false` | If this property is true, background annotation includes all descendants of every item in the `items` collection. It works in {OrgDiagram} only. | 
 | `items` | string[] | `[]` | The `items` Collection contains nodes ids the background annotation is drawn for. | 
 | `lineType` | LineType | `Solid` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{18, 18, 18, 18}` | Sets background borderline offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `selectItems` | boolean | `false` | If true, annotated nodes are shown in their expanded form using item templates regardless of controls autofit mode and available screen space. | 
 | `zOrderType` | ZOrderType | `Auto` | Sets annotation z-order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes, you block mouse events of UI elements in nodes templates. Browsers don't support mouse events transparency consistently yet. So to avoid mouse events blocking UI elements in node templates, you have to place annotation items under nodes or manipulate z-index for UI interactive controls and make them placed on top of other visual elements. The component puts the buttons panel on top of everything, so annotations drawn over the diagram nodes are not blocked. | 

## <a name="ConnectorAnnotationConfig" id="ConnectorAnnotationConfig">ConnectorAnnotationConfig</a>
Connector annotations draw lines between two nodes of the diagram. They are drawn on top of the existing diagram layout, and they don't impact nodes placement. So it is the user's responsibility to preserve space between nodes for them.

 `ConnectorAnnotationConfig` 

### Constructor

 `ConnectorAnnotationConfig(arg0)` 

Connector annotations draw lines between two nodes of the diagram. They are drawn on top of the existing diagram layout, and they don't impact nodes placement. So it is the user's responsibility to preserve space between nodes for them.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Connector` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `color` | string | `Colors.Black` | Color | 
 | `connectorPlacementType` | ConnectorPlacementType | `Offbeat` | The connector placement type defines how the component traces the connector line over the diagram nodes. The `Straight` is a direct line connecting two nodes. The`Offbeat` style is designed to dynamically tune connector line placement depending on the relative position of nodes and the gap between them. It uses free-hand line style drawing going from start to the end node. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight so that it can be noticeable on top of other diagram lines. | 
 | `connectorShapeType` | ConnectorShapeType | `OneWay` | Connector shape type defines the number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature, combined with conflict resolution, places overlapping annotations in parallel. It gives you complete flexibility over variations of possible connector lines between two given diagram nodes. | 
 | `fromItem` | string | `null` | The start node of the connection line | 
 | `label` | string | `null` | Label. Label styled with "bp-connector-label" css class. | 
 | `labelPlacementType` | ConnectorLabelPlacementType | `Between` | Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by the `fromItem` and the `toItem` properties. The component places the label along the connector line close to the start, the end nodes, or between them. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `Solid` | Line pattern | 
 | `lineWidth` | number | `2` | Border line width. | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Connection lines start from the margin of the node's rectangle. If the offset is positive, the connection line has a gap between its endpoints and the node's rectangles. If it is negative, the connection line overlaps the node's rectangle and starts from inside them. | 
 | `selectItems` | boolean | `true` | If true, annotated nodes are shown in their expanded form using item templates regardless of controls autofit mode and available screen space. | 
 | `toItem` | string | `null` | The end node of the connection line | 
 | `zOrderType` | ZOrderType | `Foreground` | Sets annotation z-order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes, you block mouse events of UI elements in nodes templates. Browsers don't support mouse events transparency consistently yet. So to avoid mouse events blocking UI elements in node templates, you have to place annotation items under nodes or manipulate z-index for UI interactive controls and make them placed on top of other visual elements. The component puts the buttons panel on top of everything, so annotations drawn over the diagram nodes are not blocked. | 

## <a name="HighlightPathAnnotationConfig" id="HighlightPathAnnotationConfig">HighlightPathAnnotationConfig</a>
Highlight path annotation renders the route between the given sequence of nodes over existing connector lines in the diagram.

 `HighlightPathAnnotationConfig` 

### Constructor

 `HighlightPathAnnotationConfig(arg0)` 

Highlight path annotation renders the route between the given sequence of nodes over existing connector lines in the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `HighlightPath` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `color` | string | `Colors.Red` | Line color | 
 | `items` | string[] | `[]` | Collection of nodes ids this path is drawn for. Please, pay attention that this is the array of nodes ids. So if the diagram finds the wrong way from start to end nodes, you can sequence the route yourself. | 
 | `lineType` | LineType | `Solid` | Line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `opacity` | number | `1` | Opacity. | 
 | `selectItems` | boolean | `false` | If true, annotated nodes are shown in their expanded form using item templates regardless of controls autofit mode and available screen space. | 
 | `showArrows` | boolean | `true` | If true, then annotation has arrows along the route. | 
 | `zOrderType` | ZOrderType | `Foreground` | Sets annotation z-order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes, you block mouse events of UI elements in nodes templates. Browsers don't support mouse events transparency consistently yet. So to avoid mouse events blocking UI elements in node templates, you have to place annotation items under nodes or manipulate z-index for UI interactive controls and make them placed on top of other visual elements. The component puts the buttons panel on top of everything, so annotations drawn over the diagram nodes are not blocked. | 

## <a name="LabelAnnotationConfig" id="LabelAnnotationConfig">LabelAnnotationConfig</a>
In-layout label annotations are placed between nodes, impacting diagram layout and node placement. Label annotations are designed for auto-placement and bundling connection lines between nodes when needed.

 `LabelAnnotationConfig` 

### Constructor

 `LabelAnnotationConfig(arg0)` 

In-layout label annotations are placed between nodes, impacting diagram layout and node placement. Label annotations are designed for auto-placement and bundling connection lines between nodes when needed.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Label` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `fromItem` | string | `null` | This is the item id you are creating annotation for. | 
 | `itemTitleColor` | string | `Colors.RoyalBlue` | Background color. | 
 | `templateName` | string | `null` | Item template name. See items templates collection for more details. | 
 | `title` | string | `null` | The label of the annotation. It is styled with `bp-connector-label` CSS class name. | 
 | `toItems` | string[] | `[]` | The collection of destination nodes should have only child or parent items of the annotated item simultaneously. It cannot include children and parents at the same time. Suppose the annotated item has several label annotations for different sub-sets of children. In that case, annotations form into cascades of labels over connection lines in the diagram. | 

## <a name="LevelAnnotationConfig" id="LevelAnnotationConfig">LevelAnnotationConfig</a>
Level annotation highlights the same level nodes of the diagram via drawing continuous rectangular shapes from side to side and the optional title on the side of the diagram view area. Title placement can be inside or outside of the diagram. The inside placement does not occupy diagram space and is rendered in the background.

 `LevelAnnotationConfig` 

### Constructor

 `LevelAnnotationConfig(arg0)` 

Level annotation highlights the same level nodes of the diagram via drawing continuous rectangular shapes from side to side and the optional title on the side of the diagram view area. Title placement can be inside or outside of the diagram. The inside placement does not occupy diagram space and is rendered in the background.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Level` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `borderColor` | string | `null` | Background border line color | 
 | `fillColor` | string | `"#D4D4D4"` | Background fill Color. | 
 | `levels` | string[] | `[]` | Collection of levels this level annotation is drawn for. | 
 | `lineType` | LineType | `Solid` | Background border line type | 
 | `lineWidth` | Thickness | `{0, 0, 0, 0}` | The background border line width. Use {Thickness} to set border width individually per side. | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Background offset relative to its default position. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `title` | string | `null` | Title. | 
 | `titleColor` | string | `null` | The title background color. | 
 | `titleFontColor` | string | `null` | Title font color. | 

## <a name="PaletteItemConfig" id="PaletteItemConfig">PaletteItemConfig</a>
Palette Item configuration object defines cross-family connections lines styles. Multi-parent diagrams may have a lot of parallel lines, so to make their visual tracing easier, the component supports multiple line styles and evenly distributes them. It is a similar approach as for visualization of regular line charts. If we have numerous lines in the chart area, it makes sense to style every line individually.

 `PaletteItemConfig` 

### Constructor

 `PaletteItemConfig(arg0, arg1, arg2)` 

Palette Item configuration object defines cross-family connections lines styles. Multi-parent diagrams may have a lot of parallel lines, so to make their visual tracing easier, the component supports multiple line styles and evenly distributes them. It is a similar approach as for visualization of regular line charts. If we have numerous lines in the chart area, it makes sense to style every line individually.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | PaletteItemConfig | `` | Palette properties object. | 
 | `arg0` | string | `` | Line color | 
 | `arg1` | number | `` | Line width | 
 | `arg2` | LineType | `` | Line type | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `lineColor` | string | `Colors.Silver` | Line color | 
 | `lineType` | LineType | `Solid` | Line type | 
 | `lineWidth` | number | `1` | Line width | 

## <a name="ShapeAnnotationConfig" id="ShapeAnnotationConfig">ShapeAnnotationConfig</a>
Shape annotation draws geometrical shapes over nodes of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.

 `ShapeAnnotationConfig` 

### Constructor

 `ShapeAnnotationConfig(arg0)` 

Shape annotation draws geometrical shapes over nodes of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Shape` | Annotation type property explicitly defines annotation object type when it is defined as a JSON object. The `annotations` collection contains a mixture of all kinds of control annotations. | 
 | `borderColor` | string | `null` | Shape border line color | 
 | `cornerRadius` | string, number | `"10%"` | Adds rounded corners for applicable shapes. Radius is defined in percents or pixels. | 
 | `fillColor` | string | `null` | Shape fill color | 
 | `items` | string[] | `[]` | Collection of nodes ids this shape annotation is drawn for. | 
 | `label` | string | `null` | Annotation label, it is styled with 'bp-connector-label' CSS class | 
 | `labelOffset` | number | `4` | Label offset in pixels. | 
 | `labelPlacement` | PlacementType | `Auto` | Label placement around the annotation. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `Solid` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Shape offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity | 
 | `selectItems` | boolean | `false` | If true, annotated nodes are shown in their expanded form using item templates regardless of controls autofit mode and available screen space. | 
 | `shapeType` | ShapeType | `Rectangle` | Shape | 
 | `zOrderType` | ZOrderType | `Auto` | Sets annotation z-order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes, you block mouse events of UI elements in nodes templates. Browsers don't support mouse events transparency consistently yet. So to avoid mouse events blocking UI elements in node templates, you have to place annotation items under nodes or manipulate z-index for UI interactive controls and make them placed on top of other visual elements. The component puts the buttons panel on top of everything, so annotations drawn over the diagram nodes are not blocked. | 

## <a name="TemplateConfig" id="TemplateConfig">TemplateConfig</a>
Template configuration object defines DOM elements for node content, cursor, and mouseover highlight visual representation. If one of them is not set, then the component uses an internal default template. We separate template creation and rendering functions for security reasons. It is not needed in modern frameworks anymore.

 `TemplateConfig` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cursorBorderWidth` | number | `2` | Cursor frame border width | 
 | `cursorPadding` | Thickness | `{3, 3, 3, 3}` | Cursor frame offset from node | 
 | `cursorTemplate` | string, object | `null` | Cursor Template. See item template for details. The control calls the 'onCursorRender' callback function to populate the cursor template content for a specific node. | 
 | `highlightBorderWidth` | number | `1` | Highlight frame border width | 
 | `highlightPadding` | Thickness | `{2, 2, 2, 2}` | Highlight frame offset | 
 | `highlightTemplate` | string, object | `null` | Highlight Template. See item template for details. The control calls the 'onHighlightRender' callback function to populate the highlight template content for a specific node. | 
 | `isActive` | boolean | `true` | If it is true, it makes templated items inactive in the diagram layout. Inactive items are regular items excluded from navigation, which means they are not clickable, and it is impossible to set the cursor to them. Consider the inactive nodes as in-layout labels or titles having a custom item template. It is worth mentioning that they impact neighbors of cursor item selection. The component skips them and selects neighbors of inactive nodes. | 
 | `itemBorderWidth` | number | `1` | Border width. We use the archaic method to layout cursor and highlight frames around nodes, so we need to know border width to measure gaps between them correctly. | 
 | `itemSize` | Size | `{120, 100}` | Size. Control deals with the fixed-size layout. It makes no guesses about the content of nodes. So we don't support in any form nodes auto-sizing; otherwise, the component should measure the content of every node before the rendering cycle. Considering that the visibility of nodes depends on available space, it will be an infinite loop of diagram layout, and nodes measure iterations. The more room we provide to nodes, the fewer diagram nodes are visible. So control expects that node size is hard valued in the template configuration. | 
 | `itemTemplate` | string, object | `null` | Item template. The control provides two ways to define item templates. The first one sets HTML elements content via innerHTML DOM element property. See the following reference at https://developer.mozilla.org website for more details. The second uses JSON ML library for templates definition. See http://www.jsonml.org/ for more details. That is only 3d party MIT licensed code included in our codebase; everything else is 100% authentic. We included it with minor modifications. The control calls the 'onItemRender' callback function to populate the template's content for a specific node. | 
 | `minimizedItemBorderColor` | string | `null` | Marker border line color. It equals the `itemTitleColor` of the rendered node by default. | 
 | `minimizedItemCornerRadius` | number | `null` | Marker corner radius. It applies to simple square shapes only. If it is null, then squire markers are displayed as cycles. Squares have no rounded corners if the corner radius is set to 0. | 
 | `minimizedItemFillColor` | string | `null` | Marker fill color. It equals to `itemTitleColor` of the rendered node by default. | 
 | `minimizedItemLineType` | LineType | `Solid` | Marker border line pattern | 
 | `minimizedItemLineWidth` | number | `1` | Marker border line width | 
 | `minimizedItemOpacity` | number | `1` | Marker fill color opacity | 
 | `minimizedItemShapeType` | ShapeType | `null` | The markers shape type property sets the default marker shape for nodes. It is possible to set it individually for every node or in the item template. By default color of the marker is equal to the `itemTitleColor` property set for individual items. | 
 | `minimizedItemSize` | Size | `{4, 4}` | Marker size. | 
 | `name` | string | `null` | A unique template name is used to reference templates from items and other diagram components. The 'onItemRender' callback passes the template name as an argument. | 

### Templates Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `hasButtons` | boolean | `Enabled.Auto` | Sets buttons panel visibility. `Auto` - depends on the controls config `hasButtons` property setting. `True` - visible `False` - hidden | 

**Events**

 `onButtonsRender(data)` 

On buttons render callback function. This function is called to render context of buttons panel.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `data` | EventArgs | `` | Context information | 