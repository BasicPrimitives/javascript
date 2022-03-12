/**
 * @typedef {number} AdviserPlacementType
 **/


/**
 * The adviser placement type controls assistants and advisers placement relative
 * to the parent node, on the left or the right side of the parent's hierarchy
 * in the organizational chart. In the case of the family diagram,
 * the position is defined relative to siblings. 
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
 * Annotation type defines the type of on-screen and in-layout annotation object.
 * Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.
 *
 * @enum {AnnotationType}
 */
export const AnnotationType = {
    /**
     * The connector annotation displays a spline between two nodes of the diagram.
     * They are drawn on top and across the existing diagram layout, and they don't affect nodes placement.
     * If available space between nodes is not enough to display connector annotation,
     * then control draws it outside on the side of them.
     */
    Connector: 0,
    /**
     * Shape annotation lets draw some geometrical figures over nodes of the diagram. 
     */
    Shape: 1,
    /**
     * Highlight path annotation traces a path between a given sequence of nodes over existing relation lines in the diagram.
     */
    HighlightPath: 2,
    /**
     * The in-layout label annotations display values over relation lines between nodes.
     * The control reserves space for labels in the diagram layout to not overlap nodes.
     * Label annotations are designed for auto-placement and bundling connection lines between nodes when needed.
     */
    Label: 3,
    /**
     * The background annotation highlights nodes via drawing the rectangular shape in the node's background.
     * If annotations of neighboring nodes overlap, control merges them into one continuous polygon geometry. 
     */
    Background: 4,
    /**
     * Level annotation highlights the row of nodes of the diagram by drawing a continuous rectangular shape
     * from side to side in their background. The level annotation has the optional title on the side of
     * the diagram view area. The level's title is optionally placed inside or outside of the diagram.
     * If placed inside, it is drawn in the background and does not occupy space. 
     */
    Level: 5
};

/**
 * @typedef {number} ChildrenPlacementType
 **/


/**
 * The children's placement type enumeration defines the shape of children's formation.
 * Control places children in a horizontal line below the parent node by default.
 * In the case of many child nodes, this may result in the end-user having to scroll screens to
 * view all of them. To compensate, we provide the option of placing all of the parent node's
 * children in a square/matrix formation. That will reduce sideways screen scrolling by compacting
 * the child nodes into a much smaller area on the screen.
 *  
 * @enum {ChildrenPlacementType}
 */
export const ChildrenPlacementType = {
    /**
     * Sets nodes layout at the component level
     */
    Auto: 0,
    /**
     * Vertical layout
     */
    Vertical: 1,
    /**
     * Horizontal layout
     */
    Horizontal: 2,
    /**
     * Matrix formation of the nodes
     */
    Matrix: 3
};

/**
 * @typedef {string} Colors
 **/

/**
 * List of named colors.
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
 * Connector label placement type defines label placement relative to connector annotation endpoints.
 * Connector annotation is bound and drawn between two nodes defined by the `fromItem` and the `toItem`
 * properties. The label can be placed close to the start, end, or between them along the connector line. 
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
 * Connector placement type defines style and shape of the connector line. 
 *
 * @enum {ConnectorPlacementType}
 */
export const ConnectorPlacementType = {
    /**
     * The offbeat connection line style places the connector line not to overlap or parallel
     * the underlying diagram connector lines. If nodes are close to each other and the gap
     * between them cannot fit annotation, it will be traced around the nodes to have enough space for arrows and labels.
     */
    Offbeat: 0,
    /**
     * The straight option is a classic direct line connecting two nodes. The component provides conflict
     * resolution between annotations overlapping each other. If two or more annotations overlap,
     * the layout engine will add offset to them to be drawn parallel.
     */
    Straight: 1
};

/**
 * @typedef {number} ConnectorShapeType
 **/


/**
 * Connector shape type defines the number of lines and arrows at their ends drawn between
 * nodes of the connector annotation. The possibility to draw single lines, combined with
 * conflict resolution, which places overlapping annotations in parallel when they overlap
 * each other, provides flexibility to create an infinite variety of parallel lines and
 * styles between nodes. 
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
 * The connector type option defines the base connection lines in the diagram.
 * It is only applicable to nodes minimized to markers or lines.
 * The templated nodes are always connected with squared connection lines
 *  
 * @enum {ConnectorType}
 */
export const ConnectorType = {
    /**
     * Orthogonal
     */
    Squared: 0,
    /**
     * Angular
     */
    Angular: 1,
    /**
     * Curved
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
 * The group by type enumeration defines direction towards parents or children.
 * For example, connection lines arrows direction can be towards parents or down
 * towards children in the hierarchy. The other example is the placement of nodes
 * close to their parents or children when we have multiple empty levels between
 * parents and children of the node.
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
 * The enumeration defines child nodes' placement relative to their parents. 
 * By default, all children of the same parent node are of the same rank and
 * status are aligned below the parent in a horizontal line. However,
 * for exceptional cases where the end-user wishes to have a child separate
 * from the rest of its siblings, we provide custom child types that
 * the end-user can use to place different ranking nodes anywhere around
 * the parent node. These placement options give a lot of space for creating
 * roles such as an Assistant, Adviser, various Partners,
 * and co-heads in the organization.
 * 
 * @enum {ItemType}
 */
export const ItemType = {
    /**
     * The regular type places node below the parent.
     */
    Regular: 0,
    /**
     * The assistant type places node at the row on the side of the connection line going from parent to its children.
     */
    Assistant: 1,
    /**
     * The sub-assistant node type is a variation of the assistant type. 
     * It is placed on the side of the connection line going from parent 
     * to regular children and attached to it with the connection 
     * line going from the top of the node.
     */
    SubAssistant: 4,
    /**
     * The adviser type places node on the right or left side of the parent
     * and attaches to it with a horizontal connection line.
     */
    Adviser: 2,
    /**
     * The sub-adviser type places node on the right or left side of the
     * parent and attaches to it with the connection line that goes out of
     * the top side of the sub-adviser node.
     */
    SubAdviser: 5,
    /**
     * The general partner type is an imitation of multiple inheritances in the organizational chart hierarchy.
     * The general-partner node is drawn side by side with its logical parent, and control places
     * regular children below them, so they visually look like parents. Another layout specifics
     * of the general partner is that it is connected to its logical parent's parent.
     * So visually, it becomes an immediate child of its grandparent.
     */
    GeneralPartner: 6,
    /**
     * The limited partner is a variation of the general partner.
     * The only difference is that it is not connected to its logical grandparent.
     */
    LimitedPartner: 7,
    /**
     * The adviser partner is a variation of the limited partner. 
     * The difference is that it has an extra connection line to its logical parent.
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
 * It is possible to disable control interactivity depending on application requirements.
 * The control implements the standard behavior of collection controls. It supports single
 * node selection, mouse over visual feedback, and multiple node selection. 
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
 * Neighbors selection method defines the neighbors of the cursor node in the autofit mode.
 * The auto-fit mode replaces nodes with small markers to fit the diagram into the screen view.
 * Small nodes fit the diagram into the screen space, but they have no details.
 * So our solution is to show the cursor, neighbors, and selected diagram items
 * with templates and draw all others as markers.
 *
 * @enum {NavigationMode}
 */
export const NeighboursSelectionMode = {
    /**
     * Parents and children of the cursor item
     */
    ParentsAndChildren: 0,
    /**
     * Parents, children, and siblings of the cursor item.
     */
    ParentsChildrenSiblingsAndSpouses: 1
};
  
/**
 * @typedef {number} OrientationType
 **/

/**
 * The orientation type defines diagram layout direction.
 * The control can rotate diagrams in any direction; this is needed for Arabic support and other layouts.
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
 * The page fit method defines how the control fits the diagram into available screen space.
 * When the diagram size is significantly larger than the screen space, its scrolling and navigation
 * become problematic, so the component automatically fits the diagram into the screen space via
 * rendering some of its nodes in the form of small markers. The control supports several page fit
 * method options which can match your requirements depending on the diagram layout, orientation,
 * and the number of nodes.
 *  
 * @enum {PageFitMode}
 */
export const PageFitMode = {
    /**
     * Disabled. All nodes are being rendered using their templates.
     */
    None: 0,
    /**
     * Fits the diagram into the view width, so it has no horizontal scrollbar.
     */
    PageWidth: 1,
    /**
     * fits the diagram into the view hight, so it has no vertical scrollbar.
     */
    PageHeight: 2,
    /**
     * Fits diagram into the view so it has no scroll bars.
     */
    FitToPage: 3,
    /**
     * The auto size option is opposite to the fit-to-page. It expands the control placeholder to fit the entire diagram without scrolling.
     */
    AutoSize: 5,
    /**
     * It renders all nodes as markers regardless of available screen space, and only the cursor node,
     * neighbors, and selected nodes are rendered with templates. Don't forget to disable the selection
     * path mode, which forces all nodes from the cursor up to the root to be shown with templates.
     */
    SelectionOnly: 6
};

/**
 * @typedef {number} PlacementType
 **/


/**
 * Defines element placement around the rectangular area it is bound to.
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
 * This enumeration is used to tell rendering callback functions the current state
 * of the template. It is needed for proper events binding and content updates.
 *
 * @enum {RenderingMode}
 */
export const RenderingMode = {
    Create: 0,
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
 * The selection path enumeration controls nodes visibility between the cursor node and
 * the root of the diagram in the auto-fit mode. It forces drawing of them with templates.
 *
 * @enum {SelectionPathMode}
 */
export const SelectionPathMode = {
    /**
     * Disabled
     */
    None: 0,
    /**
     * Snow all parent nodes with templates
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
     * Horizontal text
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
 * Defines update method of the diagram
 *
 * @enum {UpdateMode}
 */
export const UpdateMode = {
    /**
     * Forces control to make a full chart redraw. It is equivalent to initial chart creation.
     * It removes everything from the placeholder and renders all elements again.
     */
    Recreate: 0,
    /**
     * Optimized refresh. It only updates visual elements which need to be updated.
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
 * The vertical alignment defines nodes alignment inside row's vertical boundaries.
 * If a row of nodes contains nodes of multiple sizes, small nodes
 * are vertically aligned relative to their bigger siblings.
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
 * The enumeration defines nodes visibility in the diagram.
 * If the diagram's auto-fit is enabled, this option controls the minimum allowed size of diagram nodes.
 *  
 * @enum {Visibility}
 */
export const Visibility = {
    /**
     * Selects best visibility mode.
     */
    Auto: 0,
    /**
     * All nodes shown with templates
     */
    Normal: 1,
    /**
     * Nodes are allowed to be replaced with markers
     */
    Dot: 2,
    /**
     * The component displays only connection lines, no nodes or markers visible in layout
     */
    Line: 3,
    /**
     * It hides the node and shows only its connection lines.
     * If the node has no parents, its connection lines are hidden as well.
     * 
     * @ignore
     */
    Invisible: 4
};

/**
 * @typedef {number} ZOrderType
 **/

/**
 * Z-order type defines the annotation layer in the foreground or the background of diagram nodes.
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
