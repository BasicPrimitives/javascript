# Configuration Objects
## <a name="BackgroundAnnotationConfig" id="BackgroundAnnotationConfig">BackgroundAnnotationConfig</a>
Background annotation draws rectangular shape around annotated items. Annotations borders are offset around items, so if two annotations overlap each other they are merged into one continuos shape having single border line.

 `BackgroundAnnotationConfig` 

### Constructor

 `BackgroundAnnotationConfig(arg0)` 

Background annotation draws rectangular shape around annotated items. Annotations borders are offset around items, so if two annotations overlap each other they are merged into one continuos shape having single border line.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Background` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as JSON objects. | 
 | `borderColor` | string | `null` | Shape border line color | 
 | `fillColor` | string | `null` | Fill Color. | 
 | `includeChildren` | boolean | `false` | If this property is true then background annotation includes all descendants of every item in `items` collection. It works in {OrgDiagram} only. | 
 | `items` | string[] | `[]` | Collection of nodes ids this background annotation is drawn for. | 
 | `lineType` | LineType | `Solid` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{18, 18, 18, 18}` | Sets background offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space. | 
 | `zOrderType` | ZOrderType | `Auto` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everything, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="ConnectorAnnotationConfig" id="ConnectorAnnotationConfig">ConnectorAnnotationConfig</a>
Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

 `ConnectorAnnotationConfig` 

### Constructor

 `ConnectorAnnotationConfig(arg0)` 

Connector annotation configuration object. Connector annotations draws lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Connector` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as JSON objects. | 
 | `color` | string | `Colors.Black` | Color | 
 | `connectorPlacementType` | ConnectorPlacementType | `Offbeat` | Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it is designed to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end node. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram. | 
 | `connectorShapeType` | ConnectorShapeType | `OneWay` | Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram. | 
 | `fromItem` | string | `null` | The start node of connection line | 
 | `label` | string | `null` | Label. Label styled with css class name "bp-connector-label". | 
 | `labelPlacementType` | ConnectorLabelPlacementType | `Between` | Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them along the connector line. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `Solid` | Line pattern | 
 | `lineWidth` | number | `2` | Border line width. | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Connector line end points offset. By default connection lines start from the margin of the node's rectangle. If offset is positive then start point goes from outside of the rectangle, if it is negative then it starts from inside of the nodes rectangle. | 
 | `selectItems` | boolean | `true` | If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space. | 
 | `toItem` | string | `null` | The end node of connection line | 
 | `zOrderType` | ZOrderType | `Foreground` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everything, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="HighlightPathAnnotationConfig" id="HighlightPathAnnotationConfig">HighlightPathAnnotationConfig</a>
Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

 `HighlightPathAnnotationConfig` 

### Constructor

 `HighlightPathAnnotationConfig(arg0)` 

Highlight path annotation configuration object. Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `HighlightPath` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as JSON objects. | 
 | `color` | string | `Colors.Red` | Line color | 
 | `items` | string[] | `[]` | Collection of nodes ids this annotation is drawn for. Please, pay attention that this is array of nodes ids. So if diagram finds wrong path from start to end node you have possibility to define every intermediate node in the sequence yourself. | 
 | `lineType` | LineType | `Solid` | Line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `opacity` | number | `1` | Opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space. | 
 | `showArrows` | boolean | `true` | If true then annotation has arrows along the highlight path line. | 
 | `zOrderType` | ZOrderType | `Foreground` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everything, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="LabelAnnotationConfig" id="LabelAnnotationConfig">LabelAnnotationConfig</a>
In-layout label annotation. Label annotations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighboring nodes. Label annotations are designed for auto placement and bundling of connection lines between nodes when needed.

 `LabelAnnotationConfig` 

### Constructor

 `LabelAnnotationConfig(arg0)` 

In-layout label annotation. Label annotations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighboring nodes. Label annotations are designed for auto placement and bundling of connection lines between nodes when needed.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Label` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as JSON objects. | 
 | `fromItem` | string | `null` | This is the item id you are creating annotation for. | 
 | `itemTitleColor` | string | `Colors.RoyalBlue` | Default template title background color. | 
 | `templateName` | string | `null` | Template name used to render this label. | 
 | `title` | string | `null` | Title. Annotation label text, it is styled with css class name "bp-connector-label". | 
 | `toItems` | string[] | `[]` | This collection should contain only child or parent items of the annotated item. It cannot contain children and parents at the same time. If it contain sub set of children then annotation label bundles children into subset and annotations form cascades of labels over connection lines in the diagram. | 

## <a name="LevelAnnotationConfig" id="LevelAnnotationConfig">LevelAnnotationConfig</a>
Level annotation highlights same level nodes of the diagram via drawing continuous rectangular shape from side to side in their background. Stripe has optional title on the side of the diagram view area. Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the background and does not occupy space.

 `LevelAnnotationConfig` 

### Constructor

 `LevelAnnotationConfig(arg0)` 

Level annotation highlights same level nodes of the diagram via drawing continuous rectangular shape from side to side in their background. Stripe has optional title on the side of the diagram view area. Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the background and does not occupy space.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Level` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as a type less JSON objects. | 
 | `borderColor` | string | `null` | Background stripe border line color | 
 | `fillColor` | string | `"#D4D4D4"` | Background stripe fill Color. | 
 | `levels` | string[] | `[]` | Collection of levels this level annotation is drawn for. | 
 | `lineType` | LineType | `Solid` | Background stripe border line type | 
 | `lineWidth` | Thickness | `{0, 0, 0, 0}` | Background stripe border line width. Use {Thickness} to set border width individually per side. | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Sets background offset relative to default position. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `title` | string | `null` | Level Title. | 
 | `titleColor` | string | `null` | The level title background color. | 
 | `titleFontColor` | string | `null` | Title font color. | 

## <a name="PaletteItemConfig" id="PaletteItemConfig">PaletteItemConfig</a>
Palette Item configuration object defines cross family connections lines styles. Multi-parent diagrams have cross hierarchy relation lines, so in order to make their visual tracing more easy on diagram every connection line can be styled differently. (This is the same approach as for visualization of regular classic line charts. If we have multiple lines in chart area it makes sense to style every line individually.)

 `PaletteItemConfig` 

### Constructor

 `PaletteItemConfig(arg0, arg1, arg2)` 

Palette Item configuration object defines cross family connections lines styles. Multi-parent diagrams have cross hierarchy relation lines, so in order to make their visual tracing more easy on diagram every connection line can be styled differently. (This is the same approach as for visualization of regular classic line charts. If we have multiple lines in chart area it makes sense to style every line individually.)

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
Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

 `ShapeAnnotationConfig` 

### Constructor

 `ShapeAnnotationConfig(arg0)` 

Shape annotation configuration object. Shape annotation is a possibility to draw some geometrical shapes over nodes of the diagram.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `arg0` | object | `` | Object properties. | 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `annotationType` | AnnotationType | `Shape` | Annotation type. All types of annotations objects are added to `annotations` collection property of the control. This property is needed to distinguish them when they are defined as JSON objects. | 
 | `borderColor` | string | `null` | Shape border line color | 
 | `cornerRadius` | string, number | `"10%"` | Corner radius. Body corner radius in percents or pixels. For applicable shapes only. | 
 | `fillColor` | string | `null` | Shape fill color | 
 | `items` | string[] | `[]` | Collection of nodes ids this shape annotation is drawn for. | 
 | `label` | string | `null` | Label. Label styled with css class name "bp-connector-label". | 
 | `labelOffset` | number | `4` | Label offset from shape in pixels. | 
 | `labelPlacement` | PlacementType | `Auto` | Label placement relative to the annotation. | 
 | `labelSize` | Size | `{60, 30}` | Label size | 
 | `lineType` | LineType | `Solid` | Border line type | 
 | `lineWidth` | number | `2` | Border line width | 
 | `offset` | Thickness | `{0, 0, 0, 0}` | Sets shape offset around annotated items. | 
 | `opacity` | number | `1` | Background color opacity. | 
 | `selectItems` | boolean | `false` | If true then annotated nodes are shown full size regardless of controls auto fit mode and available screen space. | 
 | `shapeType` | ShapeType | `Rectangle` | Shape | 
 | `zOrderType` | ZOrderType | `Auto` | Sets annotation Z order placement relative to the diagram items. Diagram visual elements are drawn in layers on top of each other. If you place annotations over diagram nodes then you block mouse events of UI elements in their templates. Browsers don't support mouse events transparency consistently yet. So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them or explicitly define maximum zindex for controls and make them rendered on top of other visual elements. The control takes this into account and renders buttons panel on top of everything, so they are never blocked by annotations drawn in front of diagram nodes. | 

## <a name="TemplateConfig" id="TemplateConfig">TemplateConfig</a>
Template configuration object defines DOM elements for node content, cursor and highlight visual representation. They are grouped into one configuration object because if we decide to customize cursor or highlight templates most likely we are going to make them item template specific. At the same time control does not require all 3 of them to be defined. If cursor or highlight templates properties are not set in template configuration object then control uses internal default template for all of them. Generally all 3 templates can be set to null, so default templates are going to be used by control.

 `TemplateConfig` 

### Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `cursorBorderWidth` | number | `2` | Cursor frame border width. | 
 | `cursorPadding` | Thickness | `{3, 3, 3, 3}` | Cursor frame offset from node. | 
 | `cursorTemplate` | string, object | `null` | Cursor Template. The control calls `onCursorRender` callback function when specific node cursor needs to be rendered with this template. | 
 | `highlightBorderWidth` | number | `1` | Highlight frame border width. | 
 | `highlightPadding` | Thickness | `{2, 2, 2, 2}` | Highlight frame offset from node. | 
 | `highlightTemplate` | string, object | `null` | Highlight Template. The control calls `onHighlightRender` callback function when specific node highlight needs to be rendered with this template. | 
 | `isActive` | boolean | `true` | If true it makes templated items inactive in diagram layout. Inactive items are regular items excluded from navigation, that means when use auto fit mode, selection of neighboring node to inactive item makes all nodes of inactive item shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout. | 
 | `itemBorderWidth` | number | `1` | Border width. We use archaic method to layout cursor and highlight frames around nodes, so we need to know border width in order measure gaps between them properly. | 
 | `itemSize` | Size | `{120, 100}` | Size. Control deals with fixed size layout, it makes no guesses about content and size of nodes. So we don't support in any form nodes auto sizing. In order to support such feature control should measure content of every node before rendering cycle. Taking into account that nodes visibility depends on available space it is going to be infinite loop of diagram layout and nodes measure iterations. The more space we provide to nodes the less number of diagram nodes is going to be visible. So control expect that node size is hard valued in template configuration. | 
 | `itemTemplate` | string, object | `null` | Item template. Supported template formats: Control provide two distinct ways to define item templates. The original one is based on setting HTML elements content via innerHTML DOM element property, see following reference at https://developer.mozilla.org web site for more details. The modern way is to use JSON ML library that is our recommended solution for templates definition, see following web site for more details http://www.jsonml.org/. This is only 3d party MIT licensed code included into our code base, everything else is 100% authentic. We adopted it with minor modifications, it generally works according to its original design. The control calls `onItemRender` callback function when specific node cursor needs to be rendered with this template. | 
 | `minimizedItemBorderColor` | string | `null` | Marker border line color. By default it is the same as `itemTitleColor` of rendered node. | 
 | `minimizedItemCornerRadius` | number | `null` | Marker corder radius for simple squares. By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares. | 
 | `minimizedItemFillColor` | string | `null` | Marker fill color. By default it is the same as `itemTitleColor` of rendered node. | 
 | `minimizedItemLineWidth` | number | `1` | Marker border line width | 
 | `minimizedItemOpacity` | number | `1` | Marker fill color opacity. | 
 | `minimizedItemShapeType` | ShapeType | `null` | Marker type. The shape of the marker when node is minimized by auto fit. The control supports auto fit of the diagram into available screen space. When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic, so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. So this option sets marker shape for nodes templated with this template. | 
 | `minimizedItemSize` | Size | `{4, 4}` | Marker size. | 
 | `name` | string | `null` | Name. Every template configuration object has name property, it is being used to reference templates from items. This name is used to as an argument of call back rendering function as well. If item has not template name set it uses default template for rendering. | 

### Templates Properties
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `hasButtons` | boolean | `Enabled.Auto` | Sets buttons panel visibility. `Auto` - depends on master config `hasButtons` property setting. `True` - visible `False` - hidden | 

**Events**

 `onButtonsRender(event, data)` 

On buttons panel render event. This callback function is called to render context of buttons panel. It is used to replace `buttons` collection property in the control. So we preserve context buttons panel as a functional concept, but eliminate buttons customization API.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `event` | Object | `` | Mouse event | 
 | `data` | EventArgs | `` | Context information | 