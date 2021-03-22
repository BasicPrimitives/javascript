# Enumerations
## <a name="AdviserPlacementType" id="AdviserPlacementType">AdviserPlacementType</a>
Defines leftward or rightward item placement relative to the referenced item. In case of assistants and advisers the referenced item is their immediate parent. In case of family diagram the referenced item is spouse or sibling in the row.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Auto select by layout manager | 
 | `Left` | number | `2` | Left side | 
 | `Right` | number | `3` | Right side | 

## <a name="AnnotationType" id="AnnotationType">AnnotationType</a>
Defines type of on-screen and in-layout annotation object. Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Background` | number | `4` | Background annotation highlights nodes via drawing rectangular shape in the background. If shapes overlap the same style neighboring shapes they are merged into one continuous shape. | 
 | `Connector` | number | `0` | Connector lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to preserve space between nodes for them. | 
 | `HighlightPath` | number | `2` | Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram. | 
 | `Label` | number | `3` | In-layout label annotation. Label annotations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighboring nodes. Label annotations are designed for auto placement and bundling of connection lines between nodes when needed. | 
 | `Level` | number | `5` | Stripe annotation highlights same level nodes of the diagram via drawing continuous rectangular shape from side to side in their background. Stripe has optional title on the side of the diagram view area. Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the background and does not occupy space. | 
 | `Shape` | number | `1` | Shape annotation is a possibility to draw some geometrical shapes over several nodes of the diagram. | 

## <a name="ChildrenPlacementType" id="ChildrenPlacementType">ChildrenPlacementType</a>
Defines shape of children formation. By default a node's children are always placed in a horizontal line below the parent node. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a square/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Auto. This mode lets you set children layout at the component level and then redefine it for individual nodes if needed. | 
 | `Horizontal` | number | `2` | Horizontal children layout | 
 | `Matrix` | number | `3` | Matrix formation of the children | 
 | `Vertical` | number | `1` | Children placed in vertical column | 

## <a name="ConnectorLabelPlacementType" id="ConnectorLabelPlacementType">ConnectorLabelPlacementType</a>
Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them along the connector line.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Between` | number | `1` | Between | 
 | `From` | number | `0` | From | 
 | `To` | number | `2` | To | 

## <a name="ConnectorPlacementType" id="ConnectorPlacementType">ConnectorPlacementType</a>
Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it design to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end nodes. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Offbeat` | number | `0` | Places connector annotation in the way that it does not overlap underlying diagram connector lines. If nodes are close to each other and gap between them cannot fit annotation, then it will be drawn on the side of the nodes, so it will have enough space for arrow and label. | 
 | `Straight` | number | `1` | Straight line annotation between nodes. This annotation mode provides basic conflict resolution between annotations overlapping each other. If two or more straight annotations overlap each other then layout engine will add extra offset to them, so they will be drawn in parallel to each other. | 

## <a name="ConnectorShapeType" id="ConnectorShapeType">ConnectorShapeType</a>
Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `BothWay` | number | `2` | Single line with 2 arrows. | 
 | `OneWay` | number | `0` | Single line with one arrow | 
 | `TwoWay` | number | `1` | Two parallel lines with single arrows | 

## <a name="ConnectorType" id="ConnectorType">ConnectorType</a>
Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes are always connected with squared connection lines

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Angular` | number | `1` | Angular direct node to node connection lines | 
 | `Curved` | number | `2` | Curved direct node to node connection lines | 
 | `Squared` | number | `0` | Orthogonal connection lines | 

## <a name="ElbowType" id="ElbowType">ElbowType</a>
Elbow style of connection lines

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Bevel` | number | `2` | Bevel elbow | 
 | `Dot` | number | `1` | Dot marker at the intersection | 
 | `None` | number | `0` | No elbow | 
 | `Round` | number | `3` | Round elbow | 

## <a name="Enabled" id="Enabled">Enabled</a>
Defines option state.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Option state is auto defined. | 
 | `False` | number | `2` | Disabled | 
 | `True` | number | `1` | Enabled | 

## <a name="GroupByType" id="GroupByType">GroupByType</a>
This enumeration defines objects gravity in the chart relative to parents and children. For example connection lines can be drawn with arrows, so this enumeration controls direction of arrows up towards parents or down towards children in the hierarchy. The other example is nodes placement close to their immediate parents or immediate children in case when parents and children are offset from them by multiple levels in hierarchy.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Children` | number | `2` | Children | 
 | `None` | number | `0` | None | 
 | `Parents` | number | `1` | Parents | 

## <a name="HorizontalAlignmentType" id="HorizontalAlignmentType">HorizontalAlignmentType</a>
Horizontal alignment

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Center` | number | `0` | Center | 
 | `Left` | number | `1` | Left | 
 | `Right` | number | `2` | Right | 

## <a name="ItemType" id="ItemType">ItemType</a>
This enumeration defines child node placement relative to its parent node. By default all children that belong to a parent node are of the same rank and status between each other and due to that, are always aligned below the parent and are organized in the same way. However for special cases were the end user wishes to have a child that is separate from the rest of it's siblings, we provide custom child types that the end user can use to place different ranking nodes anywhere around the parent node. These placement options give a lot of space for the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization. Additionally, by default a node's regular children are always placed in a horizontal line below the parent node. See children placement type options for regular children layout.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Adviser` | number | `2` | Adviser is drawn at the same row as parent node on the left or right side and connected horizontally to it. | 
 | `AdviserPartner` | number | `8` | Adviser partner is a variation of limited partner. The only difference is that it has an extra connection line to its parent. | 
 | `Assistant` | number | `1` | Assistant node is drawn at row in between parent and child rows and connected horizontally to connection line going from parent to the regular children | 
 | `GeneralPartner` | number | `6` | General partner is imitation of multiple inheritance in the organizational chart hierarchy. General partner node is drawn side by side with its parent and remaining regular children are visually connected to both of them like they are their parents. Another layout feature of the general partner is that it is connected to parents of its immediate logical parent as well, so visually it becomes a child of its grand parent. | 
 | `LimitedPartner` | number | `7` | Limited partner is variation of general partner. The only difference is that is is not connected to its logical grand parent. | 
 | `Regular` | number | `0` | Regular node is a default placement of child nodes in form of horizontal row. | 
 | `SubAdviser` | number | `5` | Sub adviser is variation of adviser node type. It has the same placement but it is connected by the top side of the node to the connector line going to the parent node. | 
 | `SubAssistant` | number | `4` | Sub assistant is variation of assistant node type. It has the same placement but it is connected by the top side of the node to the connector line going to the parent node. | 

## <a name="LineType" id="LineType">LineType</a>
Line style of connection lines.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Dashed` | number | `2` | Dashed | 
 | `Dotted` | number | `1` | Dotted | 
 | `Solid` | number | `0` | Solid | 

## <a name="NavigationMode" id="NavigationMode">NavigationMode</a>
Interactivity mode. Control implements standard behavior of classic desktop UI controls. It supports single selected node - cursor. It supports on mouse over node visual feedback - highlight. It supports selection of group of nodes - selected items. All that functionality can be disabled depending on your application requirements.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `CursorOnly` | number | `1` | Cursor selection only without highlight. | 
 | `Default` | number | `0` | Everything is on. | 
 | `HighlightOnly` | number | `3` | Mouse over feedback only | 
 | `Inactive` | number | `2` | No interactivity | 

## <a name="NeighboursSelectionMode" id="NeighboursSelectionMode">NeighboursSelectionMode</a>
Neighbors selection mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other as markers. This enumeration controls visibility of neighbors of the cursor node in the auto fit mode. It allows to draw them in full size regardless of available space.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `ParentsAndChildren` | number | `0` | Selects parents and children of the cursor item | 
 | `ParentsChildrenSiblingsAndSpouses` | number | `1` | Selects parents, children, and siblings of the cursor item. | 

## <a name="OrientationType" id="OrientationType">OrientationType</a>
Controls diagram layout orientation. The control can be rotated in any direction, this is needed for arabic support and various layout.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Bottom` | number | `1` | Bottom | 
 | `Left` | number | `2` | Left | 
 | `None` | number | `4` | None | 
 | `Right` | number | `3` | Right | 
 | `Top` | number | `0` | Top | 

## <a name="PageFitMode" id="PageFitMode">PageFitMode</a>
Fits diagram into available screen space. When diagram size significantly larger that available screen space, its scrolling and navigation becomes problematic, so we support automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. Control supports several page fit mode options which can match your requirements depending on diagram layout, orientation and number of nodes. Autosize - this option is opposite to auto fit. It lets you expand control size to fit all diagram nodes full size without scroll bars.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `AutoSize` | number | `5` | This is opposite mode to auto fit. In this mode diagram controls its size, it sets its size to fit all nodes and render them full size using templates. | 
 | `FitToPage` | number | `3` | Fits diagram into the view so it has no scroll bars. | 
 | `None` | number | `0` | Disabled. All nodes are being rendered using their templates. | 
 | `PageHeight` | number | `2` | Fits diagram into the view hight, so it has no vertical scrollbar. | 
 | `PageWidth` | number | `1` | Fits diagram into the view width, so it has no horizontal scrollbar. | 
 | `SelectionOnly` | number | `6` | Renders all nodes as markers regardless of available screen space. Control selects and renders full size cursor, its neighbours and selected nodes only. Don't forget to disable selection path as well, so nodes from cursor up to the root are not selected. | 

## <a name="PlacementType" id="PlacementType">PlacementType</a>
Defines element placement relative to rectangular area it is bound to.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Defined by other control options. | 
 | `Bottom` | number | `5` | Bottom | 
 | `BottomLeft` | number | `6` | Bottom Left | 
 | `BottomRight` | number | `4` | Bottom Right | 
 | `Left` | number | `7` | Left | 
 | `LeftBottom` | number | `10` | Left Bottom | 
 | `LeftTop` | number | `9` | Left Top | 
 | `Right` | number | `3` | Right | 
 | `RightBottom` | number | `12` | Right Bottom | 
 | `RightTop` | number | `11` | Right Top | 
 | `Top` | number | `1` | Top | 
 | `TopLeft` | number | `8` | Top Left | 
 | `TopRight` | number | `2` | Top Right | 

## <a name="RenderingMode" id="RenderingMode">RenderingMode</a>
This enumeration is used to tell rendering callback functions current state of the template. It is needed for proper events binding and content updates.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Create` | number | `0` | Template is just created. | 
 | `Update` | number | `1` | Template is reused and update is needed. | 

## <a name="SelectionPathMode" id="SelectionPathMode">SelectionPathMode</a>
Selection path mode. This enumeration controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `FullStack` | number | `1` | Selects cursor node parents up to the root are renders them full size regardless of available space. | 
 | `None` | number | `0` | No selection path | 

## <a name="ShapeType" id="ShapeType">ShapeType</a>
Shapes

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Circle` | number | `4` | Circle | 
 | `CrossOut` | number | `3` | Cross Out | 
 | `FramedOval` | number | `8` | Framed Oval | 
 | `FramedRhombus` | number | `11` | Framed Rhombus | 
 | `FramedTriangle` | number | `9` | Framed Triangle | 
 | `FramedWedge` | number | `10` | Framed Wedge | 
 | `None` | number | `6` | None | 
 | `Oval` | number | `1` | Oval | 
 | `Rectangle` | number | `0` | Rectangle | 
 | `Rhombus` | number | `5` | Rhombus | 
 | `Triangle` | number | `2` | Triangle | 
 | `Wedge` | number | `7` | Wedge | 

## <a name="TextOrientationType" id="TextOrientationType">TextOrientationType</a>
Text rotation

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `3` | Depends on other options. | 
 | `Horizontal` | number | `0` | Regular horizontal text | 
 | `RotateLeft` | number | `1` | Rotate text left for 90 degree. | 
 | `RotateRight` | number | `2` | Rotate text right for 90 degree. | 

## <a name="UpdateMode" id="UpdateMode">UpdateMode</a>
Controls update of the diagram

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `PositonHighlight` | number | `2` | Updates highlight position only | 
 | `Recreate` | number | `0` | Forces control to make a full chart redraw. It is equivalent to initial chart creation. It removes everything from placeholder and renders all elements again. | 
 | `Refresh` | number | `1` | Optimized refresh. It only updates visual elements which needs to be updated. | 

## <a name="VectorRelationType" id="VectorRelationType">VectorRelationType</a>
Defines relation between two vectors

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Collinear` | number | `2` | Collinear | 
 | `None` | number | `0` | None | 
 | `Null` | number | `1` | Null | 
 | `Opposite` | number | `3` | Opposite | 

## <a name="VerticalAlignmentType" id="VerticalAlignmentType">VerticalAlignmentType</a>
Controls nodes vertical alignment inside row of nodes. If row of nodes contains nodes of multiple sizes then small nodes are vertically aligned relative to their large neighbours.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Bottom` | number | `2` | Bottom | 
 | `Middle` | number | `1` | Middle | 
 | `Top` | number | `0` | Top | 

## <a name="Visibility" id="Visibility">Visibility</a>
Minimal nodes visibility in the diagram. If auto fit of diagram into current page size is enabled, then this option controls minimum allowed size of diagram nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Selects best visibility mode. | 
 | `Dot` | number | `2` | Diagram draws nodes in form of markers | 
 | `Invisible` | number | `4` | Makes node invisible in layout. If node has no parents then its connection lines are hidden as well. | 
 | `Line` | number | `3` | Diagram only draws connection lines and hides actual nodes. | 
 | `Normal` | number | `1` | Regular template based diagram nodes | 

## <a name="ZOrderType" id="ZOrderType">ZOrderType</a>
Option to draw annotation in the foreground or in the background of diagram nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Depends on annotation type. | 
 | `Background` | number | `1` | Background | 
 | `Foreground` | number | `2` | Foreground | 
