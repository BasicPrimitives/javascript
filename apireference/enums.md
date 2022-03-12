# Enumerations
## <a name="AdviserPlacementType" id="AdviserPlacementType">AdviserPlacementType</a>
The adviser placement type controls assistants and advisers placement relative to the parent node, on the left or the right side of the parent's hierarchy in the organizational chart. In the case of the family diagram, the position is defined relative to siblings.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Auto select by layout manager | 
 | `Left` | number | `2` | Left side | 
 | `Right` | number | `3` | Right side | 

## <a name="AnnotationType" id="AnnotationType">AnnotationType</a>
Annotation type defines the type of on-screen and in-layout annotation object. Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Background` | number | `4` | The background annotation highlights nodes via drawing the rectangular shape in the node's background. If annotations of neighboring nodes overlap, control merges them into one continuous polygon geometry. | 
 | `Connector` | number | `0` | The connector annotation displays a spline between two nodes of the diagram. They are drawn on top and across the existing diagram layout, and they don't affect nodes placement. If available space between nodes is not enough to display connector annotation, then control draws it outside on the side of them. | 
 | `HighlightPath` | number | `2` | Highlight path annotation traces a path between a given sequence of nodes over existing relation lines in the diagram. | 
 | `Label` | number | `3` | The in-layout label annotations display values over relation lines between nodes. The control reserves space for labels in the diagram layout to not overlap nodes. Label annotations are designed for auto-placement and bundling connection lines between nodes when needed. | 
 | `Level` | number | `5` | Level annotation highlights the row of nodes of the diagram by drawing a continuous rectangular shape from side to side in their background. The level annotation has the optional title on the side of the diagram view area. The level's title is optionally placed inside or outside of the diagram. If placed inside, it is drawn in the background and does not occupy space. | 
 | `Shape` | number | `1` | Shape annotation lets draw some geometrical figures over nodes of the diagram. | 

## <a name="ChildrenPlacementType" id="ChildrenPlacementType">ChildrenPlacementType</a>
The children's placement type enumeration defines the shape of children's formation. Control places children in a horizontal line below the parent node by default. In the case of many child nodes, this may result in the end-user having to scroll screens to view all of them. To compensate, we provide the option of placing all of the parent node's children in a square/matrix formation. That will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Sets nodes layout at the component level | 
 | `Horizontal` | number | `2` | Horizontal layout | 
 | `Matrix` | number | `3` | Matrix formation of the nodes | 
 | `Vertical` | number | `1` | Vertical layout | 

## <a name="ConnectorLabelPlacementType" id="ConnectorLabelPlacementType">ConnectorLabelPlacementType</a>
Connector label placement type defines label placement relative to connector annotation endpoints. Connector annotation is bound and drawn between two nodes defined by the `fromItem` and the `toItem` properties. The label can be placed close to the start, end, or between them along the connector line.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Between` | number | `1` | Between | 
 | `From` | number | `0` | From | 
 | `To` | number | `2` | To | 

## <a name="ConnectorPlacementType" id="ConnectorPlacementType">ConnectorPlacementType</a>
Connector placement type defines style and shape of the connector line.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Offbeat` | number | `0` | The offbeat connection line style places the connector line not to overlap or parallel the underlying diagram connector lines. If nodes are close to each other and the gap between them cannot fit annotation, it will be traced around the nodes to have enough space for arrows and labels. | 
 | `Straight` | number | `1` | The straight option is a classic direct line connecting two nodes. The component provides conflict resolution between annotations overlapping each other. If two or more annotations overlap, the layout engine will add offset to them to be drawn parallel. | 

## <a name="ConnectorShapeType" id="ConnectorShapeType">ConnectorShapeType</a>
Connector shape type defines the number of lines and arrows at their ends drawn between nodes of the connector annotation. The possibility to draw single lines, combined with conflict resolution, which places overlapping annotations in parallel when they overlap each other, provides flexibility to create an infinite variety of parallel lines and styles between nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `BothWay` | number | `2` | Single line with 2 arrows. | 
 | `OneWay` | number | `0` | Single line with one arrow | 
 | `TwoWay` | number | `1` | Two parallel lines with single arrows | 

## <a name="ConnectorType" id="ConnectorType">ConnectorType</a>
The connector type option defines the base connection lines in the diagram. It is only applicable to nodes minimized to markers or lines. The templated nodes are always connected with squared connection lines

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Angular` | number | `1` | Angular | 
 | `Curved` | number | `2` | Curved | 
 | `Squared` | number | `0` | Orthogonal | 

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
The group by type enumeration defines direction towards parents or children. For example, connection lines arrows direction can be towards parents or down towards children in the hierarchy. The other example is the placement of nodes close to their parents or children when we have multiple empty levels between parents and children of the node.

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
The enumeration defines child nodes' placement relative to their parents. By default, all children of the same parent node are of the same rank and status are aligned below the parent in a horizontal line. However, for exceptional cases where the end-user wishes to have a child separate from the rest of its siblings, we provide custom child types that the end-user can use to place different ranking nodes anywhere around the parent node. These placement options give a lot of space for creating roles such as an Assistant, Adviser, various Partners, and co-heads in the organization.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Adviser` | number | `2` | The adviser type places node on the right or left side of the parent and attaches to it with a horizontal connection line. | 
 | `AdviserPartner` | number | `8` | The adviser partner is a variation of the limited partner. The difference is that it has an extra connection line to its logical parent. | 
 | `Assistant` | number | `1` | The assistant type places node at the row on the side of the connection line going from parent to its children. | 
 | `GeneralPartner` | number | `6` | The general partner type is an imitation of multiple inheritances in the organizational chart hierarchy. The general-partner node is drawn side by side with its logical parent, and control places regular children below them, so they visually look like parents. Another layout specifics of the general partner is that it is connected to its logical parent's parent. So visually, it becomes an immediate child of its grandparent. | 
 | `LimitedPartner` | number | `7` | The limited partner is a variation of the general partner. The only difference is that it is not connected to its logical grandparent. | 
 | `Regular` | number | `0` | The regular type places node below the parent. | 
 | `SubAdviser` | number | `5` | The sub-adviser type places node on the right or left side of the parent and attaches to it with the connection line that goes out of the top side of the sub-adviser node. | 
 | `SubAssistant` | number | `4` | The sub-assistant node type is a variation of the assistant type. It is placed on the side of the connection line going from parent to regular children and attached to it with the connection line going from the top of the node. | 

## <a name="LineType" id="LineType">LineType</a>
Line style of connection lines.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Dashed` | number | `2` | Dashed | 
 | `Dotted` | number | `1` | Dotted | 
 | `Solid` | number | `0` | Solid | 

## <a name="NavigationMode" id="NavigationMode">NavigationMode</a>
It is possible to disable control interactivity depending on application requirements. The control implements the standard behavior of collection controls. It supports single node selection, mouse over visual feedback, and multiple node selection.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `CursorOnly` | number | `1` | Cursor selection only without highlight. | 
 | `Default` | number | `0` | Everything is on. | 
 | `HighlightOnly` | number | `3` | Mouse over feedback only | 
 | `Inactive` | number | `2` | No interactivity | 

## <a name="NeighboursSelectionMode" id="NeighboursSelectionMode">NeighboursSelectionMode</a>
Neighbors selection method defines the neighbors of the cursor node in the autofit mode. The auto-fit mode replaces nodes with small markers to fit the diagram into the screen view. Small nodes fit the diagram into the screen space, but they have no details. So our solution is to show the cursor, neighbors, and selected diagram items with templates and draw all others as markers.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `ParentsAndChildren` | number | `0` | Parents and children of the cursor item | 
 | `ParentsChildrenSiblingsAndSpouses` | number | `1` | Parents, children, and siblings of the cursor item. | 

## <a name="OrientationType" id="OrientationType">OrientationType</a>
The orientation type defines diagram layout direction. The control can rotate diagrams in any direction; this is needed for Arabic support and other layouts.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Bottom` | number | `1` | Bottom | 
 | `Left` | number | `2` | Left | 
 | `None` | number | `4` | None | 
 | `Right` | number | `3` | Right | 
 | `Top` | number | `0` | Top | 

## <a name="PageFitMode" id="PageFitMode">PageFitMode</a>
The page fit method defines how the control fits the diagram into available screen space. When the diagram size is significantly larger than the screen space, its scrolling and navigation become problematic, so the component automatically fits the diagram into the screen space via rendering some of its nodes in the form of small markers. The control supports several page fit method options which can match your requirements depending on the diagram layout, orientation, and the number of nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `AutoSize` | number | `5` | The auto size option is opposite to the fit-to-page. It expands the control placeholder to fit the entire diagram without scrolling. | 
 | `FitToPage` | number | `3` | Fits diagram into the view so it has no scroll bars. | 
 | `None` | number | `0` | Disabled. All nodes are being rendered using their templates. | 
 | `PageHeight` | number | `2` | fits the diagram into the view hight, so it has no vertical scrollbar. | 
 | `PageWidth` | number | `1` | Fits the diagram into the view width, so it has no horizontal scrollbar. | 
 | `SelectionOnly` | number | `6` | It renders all nodes as markers regardless of available screen space, and only the cursor node, neighbors, and selected nodes are rendered with templates. Don't forget to disable the selection path mode, which forces all nodes from the cursor up to the root to be shown with templates. | 

## <a name="PlacementType" id="PlacementType">PlacementType</a>
Defines element placement around the rectangular area it is bound to.

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
This enumeration is used to tell rendering callback functions the current state of the template. It is needed for proper events binding and content updates.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Create` | number | `0` | Create | 
 | `Update` | number | `1` | Update | 

## <a name="SelectionPathMode" id="SelectionPathMode">SelectionPathMode</a>
The selection path enumeration controls nodes visibility between the cursor node and the root of the diagram in the auto-fit mode. It forces drawing of them with templates.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `FullStack` | number | `1` | Snow all parent nodes with templates | 
 | `None` | number | `0` | Disabled | 

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
 | `Horizontal` | number | `0` | Horizontal text | 
 | `RotateLeft` | number | `1` | Rotate text left for 90 degree. | 
 | `RotateRight` | number | `2` | Rotate text right for 90 degree. | 

## <a name="UpdateMode" id="UpdateMode">UpdateMode</a>
Defines update method of the diagram

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `PositonHighlight` | number | `2` | Updates highlight position only | 
 | `Recreate` | number | `0` | Forces control to make a full chart redraw. It is equivalent to initial chart creation. It removes everything from the placeholder and renders all elements again. | 
 | `Refresh` | number | `1` | Optimized refresh. It only updates visual elements which need to be updated. | 

## <a name="VectorRelationType" id="VectorRelationType">VectorRelationType</a>
Defines relation between two vectors

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Collinear` | number | `2` | Collinear | 
 | `None` | number | `0` | None | 
 | `Null` | number | `1` | Null | 
 | `Opposite` | number | `3` | Opposite | 

## <a name="VerticalAlignmentType" id="VerticalAlignmentType">VerticalAlignmentType</a>
The vertical alignment defines nodes alignment inside row's vertical boundaries. If a row of nodes contains nodes of multiple sizes, small nodes are vertically aligned relative to their bigger siblings.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Bottom` | number | `2` | Bottom | 
 | `Middle` | number | `1` | Middle | 
 | `Top` | number | `0` | Top | 

## <a name="Visibility" id="Visibility">Visibility</a>
The enumeration defines nodes visibility in the diagram. If the diagram's auto-fit is enabled, this option controls the minimum allowed size of diagram nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Selects best visibility mode. | 
 | `Dot` | number | `2` | Nodes are allowed to be replaced with markers | 
 | `Invisible` | number | `4` | It hides the node and shows only its connection lines. If the node has no parents, its connection lines are hidden as well. | 
 | `Line` | number | `3` | The component displays only connection lines, no nodes or markers visible in layout | 
 | `Normal` | number | `1` | All nodes shown with templates | 

## <a name="ZOrderType" id="ZOrderType">ZOrderType</a>
Z-order type defines the annotation layer in the foreground or the background of diagram nodes.

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | `Auto` | number | `0` | Depends on annotation type. | 
 | `Background` | number | `1` | Background | 
 | `Foreground` | number | `2` | Foreground | 
