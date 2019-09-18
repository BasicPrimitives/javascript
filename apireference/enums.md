# Enumerations
## AdviserPlacementType
Defines leftward or rightward item placement relative to the referenced item. In case of assitants and advisers the referenced item is their imediate parent. In case of family diagram the referenced item is spouse or sibling in the row.

 <code>primitives.common.AdviserPlacementType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Auto select by layout manager | 
 | <code>Left</code> | number | <code>2</code> | Left side | 
 | <code>Right</code> | number | <code>3</code> | Right side | 

## AnnotationType
Defines type of on-screen and in-layout annotation object. Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.

 <code>primitives.common.AnnotationType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Background</code> | number | <code>4</code> | Background annotation highlights nodes via drawing rectangular shape in background. If shapes overlap the same style neighbouring shapes they are merged into one continuous shape. | 
 | <code>Connector</code> | number | <code>0</code> | Connector lines between two nodes of the diagram. They are drawn on top of existing diagram layout and they don't affect nodes placement. So it is users responsibility to prserve space between nodes for them. | 
 | <code>HighlightPath</code> | number | <code>2</code> | Highlight path annotation traces path between given sequence of nodes over existing connector lines in the diagram. | 
 | <code>Label</code> | number | <code>3</code> | In-layout label annotation. Label anntations are placed in layout between nodes, they preserve space between nodes, so they don't overlap neighbouring nodes. Label annotations are designed for autoplacement and bundling of connection lines between nodes when needed. | 
 | <code>Shape</code> | number | <code>1</code> | Shape annotation is a possibility to draw some geometrical shapes over several nodes of the diagram. | 

## ChildrenPlacementType
Defines shape of children formation. By default a node's children are always placed in a horizontal line below the parent node. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a sqaure/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.

 <code>primitives.common.ChildrenPlacementType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Auto. This mode lets you set children layout at the component level and then redefine it for individual nodes if needed. | 
 | <code>Horizontal</code> | number | <code>2</code> | Horizontal children layout | 
 | <code>Matrix</code> | number | <code>3</code> | Matrix formation of the children | 
 | <code>Vertical</code> | number | <code>1</code> | Children placed in vertical column | 

## ConnectorLabelPlacementType
Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them along the connector line.

 <code>primitives.common.ConnectorLabelPlacementType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Between</code> | number | <code>1</code> | Between | 
 | <code>From</code> | number | <code>0</code> | From | 
 | <code>To</code> | number | <code>2</code> | To | 

## ConnectorPlacementType
Connector placement type defines style of connector line drawing over diagram layout. It supports two options: the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation drawing over diagram, the second style is called `Offbeat` and it design to dynamically adopt to nodes mutual location and gap between them. It uses free hand line style drawing going from start to the end nodes. Since every diagram is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be noticeable on top of other lines of the diagram.

 <code>primitives.common.ConnectorPlacementType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Offbeat</code> | number | <code>0</code> | Places connector annotation in the way that it does not overlap underlying diagram connector lines. If nodes are close to each other and gap between them cannot fit annotation, then it will be drawn on the side of the nodes, so it will have enough space for arrow and label. | 
 | <code>Straight</code> | number | <code>1</code> | Straight line annotation between nodes. This annotation mode provides basic conflict resolution between annotations overlapping each other. If two or more straight annotations overlap each other then layout engine will add extra offset to them, so they will be drawn in parallel to each other. | 

## ConnectorShapeType
Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation. This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other, gives you full flexibility over variations of possible connector lines between two given nodes of diagram.

 <code>primitives.common.ConnectorShapeType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>BothWay</code> | number | <code>2</code> | Single line with 2 arrows. | 
 | <code>OneWay</code> | number | <code>0</code> | Single line with one arrow | 
 | <code>TwoWay</code> | number | <code>1</code> | Two parallel lines with single arrows | 

## ConnectorType
Connection lines style. This option is only applicable to nodes minimized to markers or lines. Full size nodes are always connected with squared connection lines

 <code>primitives.common.ConnectorType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Angular</code> | number | <code>1</code> | Angular direct node to node connection lines | 
 | <code>Curved</code> | number | <code>2</code> | Curved direct node to node connection lines | 
 | <code>Squared</code> | number | <code>0</code> | Orthogonal connection lines | 

## ElbowType
Elbow style of connection lines

 <code>primitives.common.ElbowType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Bevel</code> | number | <code>2</code> | Bevel elbow | 
 | <code>Dot</code> | number | <code>1</code> | Dot marker at the intersection | 
 | <code>None</code> | number | <code>0</code> | No elbow | 
 | <code>Round</code> | number | <code>3</code> | Round elbow | 

## Enabled
Defines option state.

 <code>primitives.common.Enabled</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Option state is auto defined. | 
 | <code>False</code> | number | <code>2</code> | Disabled | 
 | <code>True</code> | number | <code>1</code> | Enabled | 

## GraphicsType
Graphics primitives elements rendering mode

 <code>primitives.common.GraphicsType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Canvas</code> | number | <code>1</code> | HTML Canvas | 
 | <code>SVG</code> | number | <code>0</code> | Scalable Vector Graphics | 

## GroupByType
This enumeration defines objects gravity in the chart relative to parents and children. For example connection lines can be drawn with arrows, so this enumeration controls direction of arrows up towards parents or down towards children in the hierarchy. The other example is nodes placement close to their immediate parents or immediate children in case when parents and children are offset from them by multiple levels in hierarchy.

 <code>primitives.common.GroupByType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Children</code> | number | <code>2</code> | Children | 
 | <code>None</code> | number | <code>0</code> | None | 
 | <code>Parents</code> | number | <code>1</code> | Parents | 

## HorizontalAlignmentType
Horizontal alignment

 <code>primitives.common.HorizontalAlignmentType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Center</code> | number | <code>0</code> | Center | 
 | <code>Left</code> | number | <code>1</code> | Left | 
 | <code>Right</code> | number | <code>2</code> | Right | 

## ItemType
This enumeration defines child node placement relative to its parent node. By default all children that belong to a parent node are of the same rank and status between each other and due to that, are always aligned below the parent and are organized in the same way. However for special cases were the end user wishes to have a child that is seperate from the rest of it's siblings, we provide custom child types that the end user can use to place diffrent ranking nodes anywhere around the parent node. These placement options give a lot of space for the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization. Additionally, by default a node's regular children are always placed in a horizontal line below the parent node. See children placement type options for regular children layout.

 <code>primitives.orgdiagram.ItemType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Adviser</code> | number | <code>2</code> | Adviser is drawn at the same row as parent node on the left or right side and connected horizontally to it. | 
 | <code>AdviserPartner</code> | number | <code>8</code> | Adviser partner is a variation of limited partner. The only difference is that it has an extra connection line to its parent. | 
 | <code>Assistant</code> | number | <code>1</code> | Assitant node is drawn at row in between parent and child rows and connected horizontally to connection line going from parent to the regualr children | 
 | <code>GeneralPartner</code> | number | <code>6</code> | General partner is immitation of multiple inheritance in the oraganizational chart hierarchy. General partner node is drawn side by side with its parent and remaining regular children are visually connected to both of them like they are their parents. Another layout feature of the general partner is that it is connected to parents of its immediate logical parent as well, so visually it becomes a child of its grand parent. | 
 | <code>LimitedPartner</code> | number | <code>7</code> | Limited partner is variation of general partner. The only difference is that is is not conencte to its logical grand parent. | 
 | <code>Regular</code> | number | <code>0</code> | Regular node is a default placement of child nodes in form of horizontal row. | 
 | <code>SubAdviser</code> | number | <code>5</code> | Sub adviser is variation of adviser node type. It has the same placement but it is connected by the top side of the node to the connector line going to the parent node. | 
 | <code>SubAssistant</code> | number | <code>4</code> | Sub assitant is variation of assitant node type. It has the same placement but it is connected by the top side of the node to the connector line going to the parent node. | 

## LineType
Line style of connection lines.

 <code>primitives.common.LineType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Dashed</code> | number | <code>2</code> | Dashed | 
 | <code>Dotted</code> | number | <code>1</code> | Dotted | 
 | <code>Solid</code> | number | <code>0</code> | Solid | 

## NavigationMode
Interactivity mode. Control implements standard behaivour of classic desktop UI controls. It supports single selected node - cursor. It supports on mouse over node visual feedback - highlight. It supports selection of group of nodes - selected items. All that functionality can be disabled depending on your application requirements.

 <code>primitives.common.NavigationMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>CursorOnly</code> | number | <code>1</code> | Cursor selection only without highlight. | 
 | <code>Default</code> | number | <code>0</code> | Everything is on. | 
 | <code>HighlightOnly</code> | number | <code>3</code> | Mouse over feedback only | 
 | <code>Inactive</code> | number | <code>2</code> | No interactivity | 

## NeighboursSelectionMode
Neighbors selection mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other as markers. This enumeration controls visibility of neighbours of the cursor node in the auto fit mode. It allows to draw them in full size regardless of available space.

 <code>primitives.common.NeighboursSelectionMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>ParentsAndChildren</code> | number | <code>0</code> | Selects parents and children of the cursor item | 
 | <code>ParentsChildrenSiblingsAndSpouses</code> | number | <code>1</code> | Selects parents, children, spouses and siblings of the cursor item. | 

## OrientationType
Controls diagram layout orientation. The control can be rotated in any direction, this is needed for arabic support and various layout.

 <code>primitives.common.OrientationType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Bottom</code> | number | <code>1</code> | Bottom | 
 | <code>Left</code> | number | <code>2</code> | Left | 
 | <code>None</code> | number | <code>4</code> | None | 
 | <code>Right</code> | number | <code>3</code> | Right | 
 | <code>Top</code> | number | <code>0</code> | Top | 

## PageFitMode
Fits diagram into available screen space. When diagram size significantly larger that available screen space, its scrolling and navigation becomes problematic, so we support automatic diagram fit into the screen space via rendering some of its nodes in form of small markers. Control supports several page fit mode options which can match your requirements depending on diagram layout, orientation and number of nodes. Autosize - this option is opposite to auto fit. It lets you expand control size to fit all diagram nodes full size without scrollbars.

 <code>primitives.common.PageFitMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>AutoSize</code> | number | <code>5</code> | This is opposite mode to auto fit. In this mode diagram controls its size, it sets its size to accomodate all nodes and render them normally. | 
 | <code>FitToPage</code> | number | <code>3</code> | Fits diagram into the view so it has no scrollbars. | 
 | <code>None</code> | number | <code>0</code> | Disabled. All nodes rendered with their templates. | 
 | <code>PageHeight</code> | number | <code>2</code> | Fits diagram into the view hight, so it has no vertical scrollbar. | 
 | <code>PageWidth</code> | number | <code>1</code> | Fits diagram into the view width, so it has no horizontal scrollbar. | 
 | <code>SelectionOnly</code> | number | <code>6</code> | Renders all nodes as markers regardless of available screen space. Control selects and renders full size cursor, its neighbours and selected nodes only. Don't forget to disable selection path as well, so nodes from cursor up to the root are not selected. | 

## PlacementType
Defines element placement relative to rectangular area it is bound to.

 <code>primitives.common.PlacementType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Defined by other control options. | 
 | <code>Bottom</code> | number | <code>5</code> | Bottom | 
 | <code>BottomLeft</code> | number | <code>6</code> | Bottom Left | 
 | <code>BottomRight</code> | number | <code>4</code> | Bottom Right | 
 | <code>Left</code> | number | <code>7</code> | Left | 
 | <code>LeftBottom</code> | number | <code>10</code> | Left Bottom | 
 | <code>LeftTop</code> | number | <code>9</code> | Left Top | 
 | <code>Right</code> | number | <code>3</code> | Right | 
 | <code>RightBottom</code> | number | <code>12</code> | Right Bottom | 
 | <code>RightTop</code> | number | <code>11</code> | Right Top | 
 | <code>Top</code> | number | <code>1</code> | Top | 
 | <code>TopLeft</code> | number | <code>8</code> | Top Left | 
 | <code>TopRight</code> | number | <code>2</code> | Top Right | 

## RenderingMode
This enumeration is used to tell rendering callback functions current state of the template. It is needed for proper events binding and content updates.

 <code>primitives.common.RenderingMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Create</code> | number | <code>0</code> | Template is just created. | 
 | <code>Update</code> | number | <code>1</code> | Template is reused and update is needed. | 

## SelectionPathMode
Selection path mode. This enumeration controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw them in full size regardless of available space and auto fit mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers. So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items of the diagram in full size and draw all other diagram nodes as markers.

 <code>primitives.common.SelectionPathMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>FullStack</code> | number | <code>1</code> | Selects cursor node parents up to the root are renders them full size regardless of available space. | 
 | <code>None</code> | number | <code>0</code> | No selection path | 

## ShapeType
Shapes

 <code>primitives.common.ShapeType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Circle</code> | number | <code>4</code> | Circle | 
 | <code>CrossOut</code> | number | <code>3</code> | Cross Out | 
 | <code>FramedOval</code> | number | <code>8</code> | Framed Oval | 
 | <code>FramedRhombus</code> | number | <code>11</code> | Framed Rhombus | 
 | <code>FramedTriangle</code> | number | <code>9</code> | Framed Triangle | 
 | <code>FramedWedge</code> | number | <code>10</code> | Framed Wedge | 
 | <code>None</code> | number | <code>6</code> | None | 
 | <code>Oval</code> | number | <code>1</code> | Oval | 
 | <code>Rectangle</code> | number | <code>0</code> | Rectangle | 
 | <code>Rhombus</code> | number | <code>5</code> | Rhombus | 
 | <code>Triangle</code> | number | <code>2</code> | Triangle | 
 | <code>Wedge</code> | number | <code>7</code> | Wedge | 

## TextOrientationType
Text rotation

 <code>primitives.text.TextOrientationType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>3</code> | Depends on other options. | 
 | <code>Horizontal</code> | number | <code>0</code> | Regular horizontal text | 
 | <code>RotateLeft</code> | number | <code>1</code> | Rotate text left for 90 degree. | 
 | <code>RotateRight</code> | number | <code>2</code> | Rotate text right for 90 degree. | 

## UpdateMode
Controls update of the diagram

 <code>primitives.common.UpdateMode</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>PositonHighlight</code> | number | <code>2</code> | Updates highlight position only | 
 | <code>Recreate</code> | number | <code>0</code> | Forces control to make a full chart redraw. It is equivalent to initial chart creation. It removes everything from placeholder and renders all elements again. | 
 | <code>Refresh</code> | number | <code>1</code> | Optimized refresh. It only updates visual elements which needs to be updated. | 

## VectorRelationType
Defines relation between two vectors

 <code>primitives.common.VectorRelationType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Collinear</code> | number | <code>2</code> | Collinear | 
 | <code>None</code> | number | <code>0</code> | None | 
 | <code>Null</code> | number | <code>1</code> | Null | 
 | <code>Opposite</code> | number | <code>3</code> | Opposite | 

## VerticalAlignmentType
Controls nodes vertical alignment inside row of nodes. If row of nodes contains nodes of multiple sizes then small nodes are vertically aligned relative to their large neighbours.

 <code>primitives.common.VerticalAlignmentType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Bottom</code> | number | <code>2</code> | Bottom | 
 | <code>Middle</code> | number | <code>1</code> | Middle | 
 | <code>Top</code> | number | <code>0</code> | Top | 

## Visibility
Minimal nodes visibility in the diagram. If auto fit of diagram into current page size is enabled, then this option controls minimum allowed size of diagram nodes.

 <code>primitives.common.Visibility</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Selects best visibility mode. | 
 | <code>Dot</code> | number | <code>2</code> | Diagram draws nodes in form of markers | 
 | <code>Invisible</code> | number | <code>4</code> | Makes node invisible in layout. If node has no parents then its connection lines are hidden as well. | 
 | <code>Line</code> | number | <code>3</code> | Diagram only draws connection lines and hides actuall nodes. | 
 | <code>Normal</code> | number | <code>1</code> | Regular template based diagram nodes | 

## ZOrderType
Option to draw annotation in the foreground or in the backgound of diagram nodes.

 <code>primitives.common.ZOrderType</code> 

| Name | Type | Value | Description | 
| --- | --- | --- | --- | 
 | <code>Auto</code> | number | <code>0</code> | Depends on annotation type. | 
 | <code>Background</code> | number | <code>1</code> | Background | 
 | <code>Foreground</code> | number | <code>2</code> | Foreground | 
