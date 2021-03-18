/**
 * @typedef {number} AdviserPlacementType
 **/


/**
 * Defines leftward or rightward item placement relative to the referenced item.
 * In case of assistants and advisers the referenced item is their immediate parent.
 * In case of family diagram the referenced item is spouse or sibling in the row. 
 *  
 * @enum {AdviserPlacementType}
 */
export const AdviserPlacementType = {
    /**
     * Auto select by layout manager
     */
    Auto: 0,
    /**
     * Left side
     */
    Left: 2,
    /**
     * Right side
     */
    Right: 3
};

/**
 * @typedef {number} AnnotationType
 **/


/**
 * Defines type of on-screen and in-layout annotation object. Annotations are geometrical 
 * figures drawn around or bound to existing nodes of the diagram.
 *
 * @enum {AnnotationType}
 */
export const AnnotationType = {
    /**
     * Connector lines between two nodes of the diagram. They are drawn on top of existing
     * diagram layout and they don't affect nodes placement. So it is users responsibility to
     * preserve space between nodes for them.
     */
    Connector: 0,
    /**
     * Shape annotation is a possibility to draw some geometrical
     * shapes over several nodes of the diagram. 
     */
    Shape: 1,
    /**
     * Highlight path annotation traces path between given sequence of nodes 
     * over existing connector lines in the diagram.
     */
    HighlightPath: 2,
    /**
     * In-layout label annotation. Label annotations are placed in layout between nodes,
     * they preserve space between nodes, so they don't overlap neighboring nodes.
     * Label annotations are designed for auto placement and bundling of connection lines between 
     * nodes when needed.
     */
    Label: 3,
    /**
     * Background annotation highlights nodes via drawing rectangular shape in the background.
     * If shapes overlap the same style neighboring shapes they are merged into one continuous shape. 
     */
    Background: 4,
    /**
     * Stripe annotation highlights same level nodes of the diagram via drawing continuous rectangular shape 
     * from side to side in their background. Stripe has optional title on the side of the diagram view area.
     * Title may be placed inside or outside of the diagram. If it is placed inside, it is drawn in the 
     * background and does not occupy space. 
     */
    Level: 5
};

/**
 * @typedef {number} ChildrenPlacementType
 **/


/**
 * Defines shape of children formation. By default a node's children are always placed in a horizontal line 
 * below the parent node. On a large scale this may result in the end user having to scroll screens 
 * in order to view all of the nodes. To compensate for this, we provide the option of placing all 
 * of the children of a parent node in a square/matrix formation. This will reduce sideways screen 
 * scrolling by compacting the child nodes into a much smaller area on the screen.
 *  
 * @enum {ChildrenPlacementType}
 */
export const ChildrenPlacementType = {
    /**
     * Auto. This mode lets you set children layout at the component level
     * and then redefine it for individual nodes if needed.
     */
    Auto: 0,
    /**
     * Children placed in vertical column
     */
    Vertical: 1,
    /**
     * Horizontal children layout
     */
    Horizontal: 2,
    /**
     * Matrix formation of the children
     */
    Matrix: 3
};

/**
 * @typedef {string} Colors
 **/

/**
 * Just a list of named colors.
 * 
 * @ignore
 * @enum {Colors}
 */
export const Colors = {
    AliceBlue: "#f0f8ff",
    AntiqueWhite: "#faebd7",
    Aqua: "#00ffff",
    Aquamarine: "#7fffd4",
    Azure: "#f0ffff",
  
    Beige: "#f5f5dc",
    Bisque: "#ffe4c4",
    Black: "#000000",
    BlanchedAlmond: "#ffebcd",
    Blue: "#0000ff",
    BlueViolet: "#8a2be2",
    Brown: "#a52a2a",
    BurlyWood: "#deb887",
    Bronze: "#cd7f32",
  
    CadetBlue: "#5f9ea0",
    ChartReuse: "#7fff00",
    Chocolate: "#d2691e",
    Coral: "#ff7f50",
    CornflowerBlue: "#6495ed",
    Cornsilk: "#fff8dc",
    Crimson: "#dc143c",
    Cyan: "#00ffff",
    DarkBlue: "#00008b",
    DarkCyan: "#008b8b",
    DarkGoldenrod: "#b8860b",
    DarkGray: "#a9a9a9",
    DarkGreen: "#006400",
    DarkKhaki: "#bdb76b",
    DarkMagenta: "#8b008b",
    DarkOliveGreen: "#556b2f",
    Darkorange: "#ff8c00",
    DarkOrchid: "#9932cc",
    DarkRed: "#8b0000",
    DarkSalmon: "#e9967a",
    DarkSeaGreen: "#8fbc8f",
    DarkSlateBlue: "#483d8b",
    DarkSlateGray: "#2f4f4f",
    DarkTurquoise: "#00ced1",
    DarkViolet: "#9400d3",
    DeepPink: "#ff1493",
    DeepSkyBlue: "#00bfff",
    DimGray: "#696969",
    DodgerBlue: "#1e90ff",
  
    FireBrick: "#b22222",
    FloralWhite: "#fffaf0",
    ForestGreen: "#228b22",
    Fuchsia: "#ff00ff",
  
    Gainsboro: "#dcdcdc",
    GhostWhite: "#f8f8ff",
    Gold: "#ffd700",
    Goldenrod: "#daa520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#adff2f",
  
    Honeydew: "#f0fff0",
    Hotpink: "#ff69b4",
  
    IndianRed: "#cd5c5c",
    Indigo: "#4b0082",
    Ivory: "#fffff0",
    Khaki: "#f0e68c",
  
    Lavender: "#e6e6fa",
    LavenderBlush: "#fff0f5",
    Lawngreen: "#7cfc00",
    Lemonchiffon: "#fffacd",
    LightBlue: "#add8e6",
    LightCoral: "#f08080",
    LightCyan: "#e0ffff",
    LightGoldenrodYellow: "#fafad2",
  
    LightGray: "#d3d3d3",
    LightGreen: "#90ee90",
    LightPink: "#ffb6c1",
    LightSalmon: "#ffa07a",
    LightSeaGreen: "#20b2aa",
    LightSkyBlue: "#87cefa",
    LightSlateGray: "#778899",
    LightSteelBlue: "#b0c4de",
  
    LightYellow: "#ffffe0",
    Lime: "#00ff00",
    Limegreen: "#32cd32",
    Linen: "#faf0e6",
  
    Magenta: "#ff00ff",
    Maroon: "#800000",
    MediumAquamarine: "#66cdaa",
    MediumBlue: "#0000cd",
    MediumOrchid: "#ba55d3",
    MediumPurple: "#9370d8",
    MediumSeaGreen: "#3cb371",
    MediumSlateBlue: "#7b68ee",
  
    MediumSpringGreen: "#00fa9a",
    MediumTurquoise: "#48d1cc",
    MediumVioletRed: "#c71585",
    MidnightBlue: "#191970",
    MintCream: "#f5fffa",
    MistyRose: "#ffe4e1",
    Moccasin: "#ffe4b5",
  
    NavajoWhite: "#ffdead",
    Navy: "#000080",
  
    Oldlace: "#fdf5e6",
    Olive: "#808000",
    Olivedrab: "#6b8e23",
    Orange: "#ffa500",
    OrangeRed: "#ff4500",
    Orchid: "#da70d6",
  
    PaleGoldenRod: "#eee8aa",
    PaleGreen: "#98fb98",
    PaleTurquoise: "#afeeee",
    PaleVioletRed: "#d87093",
    Papayawhip: "#ffefd5",
    Peachpuff: "#ffdab9",
    Peru: "#cd853f",
    Pink: "#ffc0cb",
    Plum: "#dda0dd",
    PowderBlue: "#b0e0e6",
    Purple: "#800080",
  
    Red: "#ff0000",
    RosyBrown: "#bc8f8f",
    RoyalBlue: "#4169e1",
  
    SaddleBrown: "#8b4513",
    Salmon: "#fa8072",
    SandyBrown: "#f4a460",
    SeaGreen: "#2e8b57",
    Seashell: "#fff5ee",
    Sienna: "#a0522d",
    Silver: "#c0c0c0",
    SkyBlue: "#87ceeb",
    SlateBlue: "#6a5acd",
    SlateGray: "#708090",
    Snow: "#fffafa",
    SpringGreen: "#00ff7f",
    SteelBlue: "#4682b4",
  
    Tan: "#d2b48c",
    Teal: "#008080",
    Thistle: "#d8bfd8",
    Tomato: "#ff6347",
    Turquoise: "#40e0d0",
  
    Violet: "#ee82ee",
  
    Wheat: "#f5deb3",
    White: "#ffffff",
    WhiteSmoke: "#f5f5f5",
  
    Yellow: "#ffff00",
    YellowGreen: "#9acd32"
};

/**
 * @typedef {number} ConnectorLabelPlacementType
 **/


/**
 * Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes
 * defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them
 *  along the connector line. 
 *
 * @enum {ConnectorLabelPlacementType}
 */
export const ConnectorLabelPlacementType = {
    From: 0,
    Between: 1,
    To: 2
};

/**
 * @typedef {number} ConnectorPlacementType
 **/


/**
 * Connector placement type defines style of connector line drawing over diagram layout. It supports two options: 
 * the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation
 * drawing over diagram, the second style is called `Offbeat` and it design to dynamically adopt to nodes mutual 
 * location and gap between them. It uses free hand line style drawing going from start to the end nodes. Since every diagram 
 * is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be 
 * noticeable on top of other lines of the diagram.
 *
 * @enum {ConnectorPlacementType}
 */
export const ConnectorPlacementType = {
    /**
     * Places connector annotation in the way that it does not overlap underlying diagram connector lines.
     * If nodes are close to each other and gap between them cannot fit annotation, then 
     * it will be drawn on the side of the nodes, so it will have enough space for arrow and label.
     */
    Offbeat: 0,
    /**
     * Straight line annotation between nodes. This annotation mode provides basic conflict resolution between annotations
     * overlapping each other. If two or more straight annotations overlap each other then layout engine will 
     * add extra offset to them, so they will be drawn in parallel to each other.
     */
    Straight: 1
};

/**
 * @typedef {number} ConnectorShapeType
 **/


/**
 * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
 * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
 * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
 *
 * @enum {ConnectorShapeType}
 */
export const ConnectorShapeType = {
    /**
     * Single line with one arrow
     */
    OneWay: 0,
    /**
     * Two parallel lines with single arrows
     */
    TwoWay: 1,
    /**
     * Single line with 2 arrows.
     */
    BothWay: 2
};

export const ConnectorStyleType = {
    Extra: 0,
    Regular: 1,
    Highlight: 2
};

/**
 * @typedef {number} ConnectorType
 **/

/**
 * Connection lines style. This option is only applicable to nodes minimized to markers or lines.
 * Full size nodes are always connected with squared connection lines
 *  
 * @enum {ConnectorType}
 */
export const ConnectorType = {
    /**
     * Orthogonal connection lines
     */
    Squared: 0,
    /**
     * Angular direct node to node connection lines
     */
    Angular: 1,
    /**
     * Curved direct node to node connection lines
     */
    Curved: 2
};

/**
 * @typedef {number} ElbowType
 **/

/**
 * Elbow style of connection lines
 *  
 * @enum {ElbowType}
 */
export const ElbowType = {
    /**
     * No elbow
     */
    None: 0,
    /**
     * Dot marker at the intersection
     */
    Dot: 1,
    /**
     * Bevel elbow
     */
    Bevel: 2,
    /**
     * Round elbow
     */
    Round: 3
};
  
/**
 * Defines option state.
 * 
 * @readonly
 * @enum {number}
 */
export const Enabled = {
    /**
     * Option state is auto defined.
     */
    Auto: 0,
    /**
     * Enabled
     */
    True: 1,
    /**
     * Disabled
     */
    False: 2
};
  
/**
 * @typedef {number} GroupByType
 **/

/**
 * This enumeration defines objects gravity in the chart relative to parents and children.
 * For example connection lines can be drawn with arrows, so this enumeration controls
 * direction of arrows up towards parents or down towards children in the hierarchy.
 * The other example is nodes placement close to their immediate parents or immediate children 
 * in case when parents and children are offset from them by multiple levels in hierarchy.
 *  
 * @enum {GroupByType}
 */
export const GroupByType = {
    None: 0,
    Parents: 1,
    Children: 2
};

/**
 * @typedef {number} HorizontalAlignmentType
 **/

/**
 * Horizontal alignment
 *  
 * @enum {HorizontalAlignmentType}
 */
export const HorizontalAlignmentType = {
    Center: 0,
    Left: 1,
    Right: 2
};

/**
 * @typedef {number} ItemType
 **/

/**
 * This enumeration defines child node placement relative to its parent node. By default all children that belong 
 * to a parent node are of the same rank and status between each other and due to that, are always aligned below
 * the parent and are organized in the same way. However for special cases were the end user wishes to have a child
 * that is separate from the rest of it's siblings, we provide custom child types that the end user can use to
 * place different ranking nodes anywhere around the parent node. These placement options give a lot of space for
 * the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization.
 * Additionally, by default a node's regular children are always placed in a horizontal line below the parent node. See children
 * placement type options for regular children layout.
 *  
 * @enum {ItemType}
 */
export const ItemType = {
    /**
     * Regular node is a default placement of child nodes in form of horizontal row.
     */
    Regular: 0,
    /**
     * Adviser is drawn at the same row as parent node on the left or right side and connected horizontally to it. 
     */
    Adviser: 2,
    /**
     * Assistant node is drawn at row in between parent and child rows and connected horizontally
     * to connection line going from parent to the regular children
     */
    Assistant: 1,
    /**
     * Sub assistant is variation of assistant node type.
     * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
     */
    SubAssistant: 4,
    /**
     * Sub adviser is variation of adviser node type.
     * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
     */
    SubAdviser: 5,
    /**
     * General partner is imitation of multiple inheritance in the organizational chart hierarchy.
     * General partner node is drawn side by side with its parent and remaining regular children
     * are visually connected to both of them like they are their parents.
     * Another layout feature of the general partner is that it is connected to parents of its immediate logical parent as well,
     * so visually it becomes a child of its grand parent.
     */
    GeneralPartner: 6,
    /**
     * Limited partner is variation of general partner. The only difference is that is is not connected to its logical grand parent.
     */
    LimitedPartner: 7,
    /**
     * Adviser partner is a variation of limited partner. The only difference is that it has an extra connection line to its parent.
     */
    AdviserPartner: 8
};

export const LabelType =
{
  Regular: 0,
  Dummy: 1,
  Fixed: 2,
  None: 3
};

export const Layers =
{
  LevelAnnotation: 1,
  BackgroundAnnotation: 2,
  BackgroundAnnotations: 3,
  BackgroundConnectorAnnotation: 4,
  BackgroundHighlightPathAnnotations: 5,
  Connector: 6,
  ForegroundHighlightPathAnnotations: 7,
  Highlight: 8,
  Marker: 9,
  Label: 10,
  Cursor: 11,
  Item: 12,
  ForegroundAnnotations: 13,
  ForegroundConnectorAnnotation: 14,
  Annotation: 15,
  Controls: 16
};

/**
 * @typedef {number} LineType
 **/

/**
 * Line style of connection lines.
 *  
 * @enum {LineType}
 */
export const LineType = {
    Solid: 0,
    Dotted: 1,
    Dashed: 2
};

/**
 * @typedef {number} NavigationMode
 **/

/**
 * Interactivity mode. Control implements standard behavior of classic desktop UI controls. It supports single selected node - cursor.
 * It supports on mouse over node visual feedback - highlight. It supports selection of group of nodes - selected items. 
 * All that functionality can be disabled depending on your application requirements.
 *  
 * @enum {NavigationMode}
 */
export const NavigationMode = {
    /**
     * Everything is on.
     */
    Default: 0,
    /**
     * Cursor selection only without highlight. 
     */
    CursorOnly: 1,
    /**
     * Mouse over feedback only
     */
    HighlightOnly: 3,
    /**
     * No interactivity
     */
    Inactive: 2
};

/**
 * @typedef {number} NavigationMode
 **/

/**
 * Neighbors selection mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other as markers.
 *
 * This enumeration controls visibility of neighbors of the cursor node in the auto fit mode. It allows to draw 
 * them in full size regardless of available space.
 *
 * @enum {NavigationMode}
 */
export const NeighboursSelectionMode = {
    /**
     * Selects parents and children of the cursor item
     */
    ParentsAndChildren: 0,
    /**
     * Selects parents, children, and siblings of the cursor item.
     */
    ParentsChildrenSiblingsAndSpouses: 1
};
  
/**
 * @typedef {number} OrientationType
 **/

/**
 * Controls diagram layout orientation. The control can be rotated in any direction, this is needed for arabic support and various layout.
 *  
 * @enum {OrientationType}
 */
export const OrientationType = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3,
    None: 4
};

/**
 * @typedef {number} PageFitMode
 **/

/**
 * Fits diagram into available screen space. When diagram size significantly larger that available screen space, its scrolling and navigation
 * becomes problematic, so we support automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
 * Control supports several page fit mode options which can match your requirements depending on diagram layout, orientation and number of nodes.
 * 
 * Autosize - this option is opposite to auto fit. It lets you expand control size to fit all diagram nodes full size without scroll bars.
 *  
 * @enum {PageFitMode}
 */
export const PageFitMode = {
    /**
     * Disabled. All nodes are being rendered using their templates.
     */
    None: 0,
    /**
     * Fits diagram into the view width, so it has no horizontal scrollbar.
     */
    PageWidth: 1,
    /**
     * Fits diagram into the view hight, so it has no vertical scrollbar.
     */
    PageHeight: 2,
    /**
     * Fits diagram into the view so it has no scroll bars.
     */
    FitToPage: 3,
    /**
     * This is opposite mode to auto fit. In this mode diagram controls its size, it sets its size to fit all nodes and render them full size using templates.
     */
    AutoSize: 5,
    /**
     * Renders all nodes as markers regardless of available screen space. Control selects and renders full size cursor, its neighbours and selected nodes only.
     * Don't forget to disable selection path as well, so nodes from cursor up to the root are not selected.
     */
    SelectionOnly: 6
};

/**
 * @typedef {number} PlacementType
 **/


/**
 * Defines element placement relative to rectangular area it is bound to.
 *  
 * @enum {PlacementType}
 */
export const PlacementType = {
    /**
     * Defined by other control options.
     */
    Auto: 0,
    TopLeft: 8,
    Top: 1,
    TopRight: 2,
    RightTop: 11,
    Right: 3,
    RightBottom: 12,
    BottomRight: 4,
    Bottom: 5,
    BottomLeft: 6,
    LeftBottom: 10,
    Left: 7,
    LeftTop: 9
};

/**
 * @typedef {number} RenderingMode
 **/

/**
 * This enumeration is used to tell rendering callback functions current state of the template.
 * It is needed for proper events binding and content updates.
 *
 * @enum {RenderingMode}
 */
export const RenderingMode = {
    /**
     * Template is just created.
     */
    Create: 0,
    /**
     * Template is reused and update is needed.
     */
    Update: 1
};

export const SegmentType = {
  Line: 0,
  Move: 1,
  QuadraticArc: 2,
  CubicArc: 3,
  Dot: 4
};

/**
 * @typedef {number} SelectionPathMode
 **/

/**
 * Selection path mode. This enumeration controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw 
 * them in full size regardless of available space and auto fit mode.
 * 
 * The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other diagram nodes as markers.
 *
 * @enum {SelectionPathMode}
 */
export const SelectionPathMode = {
    /**
     * No selection path
     */
    None: 0,
    /**
     * Selects cursor node parents up to the root are renders them full size regardless of available space.
     */
    FullStack: 1
};

/**
 * @typedef {number} ShapeType
 **/

/**
 * Shapes
 *  
 * @enum {ShapeType}
 */
export const ShapeType = {
    Rectangle: 0,
    Oval: 1,
    Triangle: 2,
    CrossOut: 3,
    Circle: 4,
    Rhombus: 5,
    Wedge: 7,
    FramedOval: 8,
    FramedTriangle: 9,
    FramedWedge: 10,
    FramedRhombus: 11,
    None: 6
};

export const SideFlag = {
  Top: 1,
  Right: 2,
  Bottom: 4,
  Left: 8
};

/**
 * @typedef {number} TextOrientationType
 **/

/**
 * Text rotation
 *  
 * @enum {TextOrientationType}
 */
export const TextOrientationType = {
    /**
     * Regular horizontal text
     */
    Horizontal: 0,
    /**
     * Rotate text left for 90 degree.
     */
    RotateLeft: 1,
    /**
     * Rotate text right for 90 degree.
     */
    RotateRight: 2,
    /**
     * Depends on other options.
     */
    Auto: 3
};

/**
 * @typedef {number} UpdateMode
 **/

/**
 * Controls update of the diagram
 *
 * @enum {UpdateMode}
 */
export const UpdateMode = {
    /**
     * Forces control to make a full chart redraw. It is equivalent to initial chart creation. 
     * It removes everything from placeholder and renders all elements again.
     */
    Recreate: 0,
    /**
     * Optimized refresh. It only updates visual elements which needs to be updated.
     */
    Refresh: 1,
    /**
     * Updates highlight position only
     */
    PositonHighlight: 2
};

/**
 * @typedef {number} VectorRelationType
 **/

/**
 * Defines relation between two vectors
 *
 * @enum {VectorRelationType}
 */
export const VectorRelationType = {
    None: 0,
    Null: 1,
    Collinear: 2,
    Opposite: 3
};

/**
 * @typedef {number} VerticalAlignmentType
 **/

/**
 * Controls nodes vertical alignment inside row of nodes. If row of nodes contains nodes of
 * multiple sizes then small nodes are vertically aligned relative to their large neighbours.
 *  
 * @enum {VerticalAlignmentType}
 */
export const VerticalAlignmentType = {
    Top: 0,
    Middle: 1,
    Bottom: 2
};

/**
 * @typedef {number} Visibility
 **/


/**
 * Minimal nodes visibility in the diagram. If auto fit of diagram into current page size is enabled, then
 * this option controls minimum allowed size of diagram nodes.
 *  
 * @enum {Visibility}
 */
export const Visibility = {
    /**
     * Selects best visibility mode.
     */
    Auto: 0,
    /**
     * Regular template based diagram nodes
     */
    Normal: 1,
    /**
     * Diagram draws nodes in form of markers
     */
    Dot: 2,
    /**
     * Diagram only draws connection lines and hides actual nodes.
     */
    Line: 3,
    /**
     * Makes node invisible in layout. If node has no parents then 
     * its connection lines are hidden as well.
     * 
     * @ignore
     */
    Invisible: 4
};

/**
 * @typedef {number} ZOrderType
 **/

/**
 * Option to draw annotation in the foreground or in the background of diagram nodes.
 *  
 * @enum {ZOrderType}
 */
export const ZOrderType = {
    /**
     * Depends on annotation type.
     */
    Auto: 0,
    /**
     * Background
     */
    Background: 1,
    /**
     * Foreground
     */
    Foreground: 2
};
