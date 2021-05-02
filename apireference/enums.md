# Enumerations
## <a name="AdviserPlacementType" id="AdviserPlacementType">AdviserPlacementType</a>
The enumeration sets leftward or rightward item placement relative to the referenced item. In the case of assistants or advisers, the referenced node is their immediate parent. In the case of the family diagram, the referenced node is a sibling.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Auto select by layout manager | 
 | `Left` | number | `2` | Left side | 
 | `Right` | number | `3` | Right side | 

## <a name="AnnotationType" id="AnnotationType">AnnotationType</a>
Defines type of on-screen and in-layout annotation object. Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Background` | number | `4` | The background annotation highlights nodes via drawing the rectangular shape in the node's background. If the same style annotations of neighboring nodes overlap, control merges them into one continuous polygon geometry. | 
 | `Connector` | number | `0` | The connector annotation displays a spline between two nodes of the diagram. They are drawn on top and across the existing diagram layout, and they don't affect nodes placement. If available space between nodes is not enough to display connector annotation, then control draws it outside on the side of them. | 
 | `HighlightPath` | number | `2` | Highlight path annotation traces a path between a given sequence of nodes over existing relation lines in the diagram. | 
 | `Label` | number | `3` | The in-layout label annotation display values over relation lines between nodes. The control preserves space for labels in the diagram layout so they don't overlap nodes. Label annotations are designed for auto-placement and bundling of connection lines between nodes when needed. | 
 | `Level` | number | `5` | Level annotation highlights same level nodes of the diagram via drawing continuous rectangular shape from side to side in their background. Level has optional title on the side of the diagram view area. Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the background and does not occupy space. | 
 | `Shape` | number | `1` | Shape annotation is a possibility to draw some geometrical shapes over several nodes of the diagram. | 

## <a name="ChildrenPlacementType" id="ChildrenPlacementType">ChildrenPlacementType</a>
The enumeration defines the shape of children's formation. By default, control places children in a horizontal line below the parent node. On a large scale, this may result in the end-user having to scroll screens to view all of them. To compensate, we provide the option of placing all of the children of a parent node in a square/matrix formation. That will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Auto: This mode lets you set nodes layout at the component level and then redefine it for individual nodes if needed. | 
 | `Horizontal` | number | `2` | Horizontal layout | 
 | `Matrix` | number | `3` | Matrix formation of the nodes | 
 | `Vertical` | number | `1` | Vertical layout | 

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
The enumeration defines child node placement relative to its parent node. By default, the control places all children that belong to the same parent as the horizontal line below it. That works for a regular hierarchy of nodes having the same type. In the organizational chart, we have a lot of exceptions and non-hierarchical relations between nodes. For this purpose, we provide custom item types to place nodes around the logical parent, which helps visually differentiate nodes logically belonging to the same parent.  These placement options give a lot of space for creating roles such as an Assistant, Adviser, various Partners, and co-heads in the organization.  Additionally, control allows shaping the same type of children into vertical and matrix formations and place them into multiple levels.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Adviser` | number | `2` | The adviser type places node on the right or left side of the parent. | 
 | `AdviserPartner` | number | `8` | The adviser partner is a variation of the limited partner. The difference is that it has an extra connection line to its logical parent. | 
 | `Assistant` | number | `1` | The assistant type places node at the row on the side of the connection line going from parent to its children. | 
 | `GeneralPartner` | number | `6` | The general partner type is an imitation of multiple inheritances in the organizational chart hierarchy. The general-partner node is drawn side by side with its logical parent, and control places regular children below them, so they visually look like parents. Another layout specifics of the general partner is that it is connected to its logical parent's parent. So visually, it becomes an immediate child of its grandparent. | 
 | `LimitedPartner` | number | `7` | The limited partner is a variation of the general partner. The only difference is that it is not connected to its logical grandparent. | 
 | `Regular` | number | `0` | The regular type places node below parent. | 
 | `SubAdviser` | number | `5` | The sub-adviser type places node on the right or left side of the parent. The connection line goes out of the top side of the sub-adviser node. | 
 | `SubAssistant` | number | `4` | The sub-assistant node type is a variation of the assistant node type. The sub-assistant places node at the row on the side of the connection line going from parent to its children. The connection line goes out of the top side of the node. | 

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
