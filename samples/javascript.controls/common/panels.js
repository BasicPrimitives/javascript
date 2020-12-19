import Render from './Render';
import PanelConfig from './PanelConfig';
import { CaptionConfig } from './Caption';
import { DropDownBoxConfig } from './DropDownBox'; 
import { RadioBoxConfig } from './RadioBox';
import { CheckBoxConfig } from './CheckBox';
import { SizeConfig } from './Size';
import { ColorConfig } from './Color';
import { RangeConfig } from './Range';

import { ValueType } from './enums';

import { NeighboursSelectionMode, GroupByType, ConnectorPlacementType, ConnectorShapeType, 
  ConnectorLabelPlacementType, LineType, Colors, ZOrderType, AdviserPlacementType, TextOrientationType, VerticalAlignmentType, HorizontalAlignmentType,
  ConnectorType, ElbowType, PageFitMode, OrientationType, ChildrenPlacementType, Visibility, SelectionPathMode, Enabled, ShapeType, PlacementType,
  NavigationMode, GraphicsType
 } from '../../../src/enums';

 import Size from '../../../src/graphics/structs/Size';

/* Demo Specific Functions */
export function getOrgEditorOptionsRender(extraPanels, defaultOptions) {
  var panels = extraPanels;
  panels = panels.concat(getCommonOptionsPanels(function () { }, false));

  return new Render(panels, defaultOptions);
};

export function getOrgDiagramOptionsRender(defaultOptions, onUpdate) {
  var commonOptionsPanels = getCommonOptionsPanels(onUpdate, true);
  return new Render(commonOptionsPanels, defaultOptions);
};

export function getFamDiagramOptionsRender(extraPanels, defaultOptions, onUpdate) {
  var panels = extraPanels;
  panels = panels.concat(getFamDiagramOptionsPanels(onUpdate));
  panels = panels.concat(getAnnotationsOptionsPanels(onUpdate));
  panels = panels.concat(getCommonOptionsPanels(onUpdate, true));

  return new Render(panels, defaultOptions);
};

function getFamDiagramOptionsPanels(onUpdate) {
  return [
    new PanelConfig("Family layout", [
      new RadioBoxConfig("neighboursSelectionMode", NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses, "Neighbours Selection Modes", NeighboursSelectionMode, ValueType.Integer, onUpdate),
      new RadioBoxConfig("groupByType", GroupByType.Children, "Group by option defines node placement in layout close to its parents or children when node is linked across multiple levels in hierarchy. See \"alignment\" data set.", { Children: 2, Parents: 1 }, ValueType.Integer, onUpdate),
      new CheckBoxConfig("alignBylevels", true, "Keep items at the same levels after connections bundling", onUpdate),
      new CheckBoxConfig("hideGrandParentsConnectors", true, "Hide direct relations to grand parents. It helps to reduce diagrams connectors layout complexity. This option should be used together with dynamic highlighting of connectors to grandparents via immediate parents, so information is not lost.", onUpdate),
      new CheckBoxConfig("enableMatrixLayout", false, "Enables matrix layout in family diagram. Nodes having the same set of parents and children are grouped into square shaped matrix in order to keep them visually together.", onUpdate),
      new RangeConfig("minimumMatrixSize", null, "Minimum number of nodes needed in order to be formed into matrix layout", 2, 10, 1, onUpdate),
      new RangeConfig("maximumColumnsInMatrix", null, "Maximum columns number in matrix nodes layout", 1, 20, 1, onUpdate)
    ])
  ];
};

function getAnnotationsOptionsPanels(onUpdate) {
  return [
    new PanelConfig("On-screen Annotations", [
      new RadioBoxConfig("connectorPlacementType", ConnectorPlacementType.Offbeat, "Placement type", ConnectorPlacementType, ValueType.Integer, onUpdate),
      new RadioBoxConfig("connectorShapeType", ConnectorShapeType.OneWay, "Connector shape type", ConnectorShapeType, ValueType.Integer, onUpdate),
      new RadioBoxConfig("labelPlacementType", ConnectorLabelPlacementType.Between, "Label Placement type", ConnectorLabelPlacementType, ValueType.Integer, onUpdate),
      new DropDownBoxConfig("lineWidth", 1, "Line width", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ValueType.Number, onUpdate),
      new RadioBoxConfig("lineType", LineType.Dashed, "Line type", LineType, ValueType.Integer, onUpdate),
      new ColorConfig("color", Colors.Red, "Color", false, onUpdate),
      new DropDownBoxConfig("offset", 5, "Offset", [-50, -20, -10, -5, 0, 5, 10, 20, 50], ValueType.Number, onUpdate),
      new RadioBoxConfig("zOrderType", ZOrderType.Auto, "Connector Z order type", ZOrderType, ValueType.Integer, onUpdate)
    ], "AnnotationOptions")
  ];
};

function getCommonOptionsPanels(onUpdate, showDefaultTemplateOptions) {
  var result = [];
  result.push(new PanelConfig("Auto Layout", [
    new CaptionConfig("Page Fit Mode defines rule of fitting chart into available screen space. Set it to None if you want to disable it.", false),
    new RadioBoxConfig("pageFitMode", PageFitMode.FitToPage, "Page Fit Mode", { None: 0, PageWidth: 1, PageHeight: 2, FitToPage: 3, SelectionOnly: 6 }, ValueType.Integer, onUpdate),
    new RadioBoxConfig("orientationType", OrientationType.Top, "Orientation Type", OrientationType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("verticalAlignment", VerticalAlignmentType.Middle, "Items Vertical Alignment", VerticalAlignmentType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("horizontalAlignment", HorizontalAlignmentType.Center, "Items Horizontal Alignment", HorizontalAlignmentType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("childrenPlacementType", ChildrenPlacementType.Horizontal, "Children placement", ChildrenPlacementType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("leavesPlacementType", ChildrenPlacementType.Horizontal, "Leaves placement defines layout shape for items having no children", ChildrenPlacementType, ValueType.Integer, onUpdate),
    new CheckBoxConfig("placeAdvisersAboveChildren", true, "Place children of advisers above their parent node children", onUpdate),
    new CheckBoxConfig("placeAssistantsAboveChildren", true, "Place children of assistants above their parent node children", onUpdate),
    new RangeConfig("maximumColumnsInMatrix", null, "Maximum columns number in matrix children layout", 1, 20, 1, onUpdate),
    new RadioBoxConfig("minimalVisibility", Visibility.Dot, "Minimal nodes visibility", Visibility, ValueType.Integer, onUpdate),
    new RadioBoxConfig("selectionPathMode", SelectionPathMode.FullStack, "Selection Path Mode sets visibility of items between cursor item and root", SelectionPathMode, ValueType.Integer, onUpdate)
  ]));

  result.push(new PanelConfig("Default Template", [
    new RadioBoxConfig("hasButtons", Enabled.Auto, "Show user buttons", Enabled, ValueType.Integer, onUpdate),
    new RadioBoxConfig("hasSelectorCheckbox", Enabled.True, "Show selection check box", Enabled, ValueType.Integer, onUpdate),
    new DropDownBoxConfig("selectCheckBoxLabel", "Selected", "Selection checkbox label", ["Selected", "Included", "Pinned", "Any label"], ValueType.String, onUpdate),
    new CaptionConfig("Default chart item template tries to select the best matching font color for current title background.", false),
    new ColorConfig("itemTitleFirstFontColor", Colors.White, "Title first font color", false, onUpdate),
    new ColorConfig("itemTitleSecondFontColor", Colors.White, "Title second font color", false, onUpdate),
    new RangeConfig("buttonsPanelSize", 28, "Buttons panel size", 10, 100, 2, onUpdate),
    new RangeConfig("checkBoxPanelSize", 24, "Checkbox panel size", 2, 100, 2, onUpdate)
  ]));
 
  result.push(new PanelConfig("Group Titles", [
    new RadioBoxConfig("groupTitlePlacementType", AdviserPlacementType.Left, "Placement", AdviserPlacementType, ValueType.Integer, onUpdate),
    new RangeConfig("groupTitlePanelSize", 24, "Group title panel width", 10, 72, 2, onUpdate),
    new RadioBoxConfig("groupTitleOrientation", TextOrientationType.RotateRight, "Orientation", TextOrientationType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("groupTitleVerticalAlignment", VerticalAlignmentType.Middle, "Vertical Alignment", VerticalAlignmentType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("groupTitleHorizontalAlignment", HorizontalAlignmentType.Center, "Horizontal Alignment", HorizontalAlignmentType, ValueType.Integer, onUpdate),
    new ColorConfig("groupTitleColor", Colors.Black, "Background Color", false, onUpdate),
    new CaptionConfig("For group title color, see title first and second font colors in default template options.", false),
    new DropDownBoxConfig("groupTitleFontSize", "12px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], ValueType.String, onUpdate),
    new RadioBoxConfig("groupTitleFontWeight", "normal", "Font Weight", ["normal", "bold"], ValueType.String, onUpdate),
    new RadioBoxConfig("groupTitleFontStyle", "normal", "Font Style", ["normal", "italic"], ValueType.String, onUpdate),
    new DropDownBoxConfig("groupTitleFontFamily", "Arial", "Font Style", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], ValueType.String, onUpdate)
  ]));

  if (showDefaultTemplateOptions) {
    result.push(new PanelConfig("Markers", [
      new CaptionConfig("These options are defined per item template. So if you need to show individual markers per item, you have to define template for every marker type and assign it to items. Template is some sort of named property bag.", false),
      new CaptionConfig("By default marker has color of itemTitleColor property, download demos and check samples source data. If item has no title color set, then be sure that you set border line width and color for markers having no fill, otherwise you are not going to see them.", false),
      new SizeConfig("minimizedItemSize", new Size(4, 4), "Marker size", 1, 40, 1, onUpdate),
      new DropDownBoxConfig("minimizedItemCornerRadius", null, "Corner Radius", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20], ValueType.Number, onUpdate),
      new DropDownBoxConfig("highlightPadding", 2, "Highlight border padding around marker", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ValueType.Thickness, onUpdate),
      new RadioBoxConfig("minimizedItemShapeType", ShapeType.None, "Marker Shape", ShapeType, ValueType.Integer, onUpdate),
      new RangeConfig("minimizedItemLineWidth", 1, "Marker border line width", 0, 10, 1, onUpdate),
      new RadioBoxConfig("minimizedItemLineType", LineType.Solid, "Marker border line type", LineType, ValueType.Integer, onUpdate),
      new CaptionConfig("Following Border and Fill colors properties work only for items having no title color property set. See Partners & Annotations Demo to try them.", false),
      new ColorConfig("minimizedItemBorderColor", null, "Marker border line color", true, onUpdate),
      new ColorConfig("minimizedItemFillColor", null, "Marker fill color", true, onUpdate),
      new RangeConfig("minimizedItemOpacity", 1.0, "Opacity", 0, 1, 0.1, onUpdate)
    ], "DefaultTemplateOptions"));
  }

  result.push(new PanelConfig("Intervals", [
    new CaptionConfig("Vertical Intervals Between Rows", true),
    new RangeConfig("normalLevelShift", 20, "Normal", 1, 40, 1, onUpdate),
    new CaptionConfig("If you enable labels for dots, use the following interval to fit them between levels.", false),
    new RangeConfig("dotLevelShift", 20, "Dotted", 1, 320, 1, onUpdate),
    new RangeConfig("lineLevelShift", 10, "Lined", 1, 320, 1, onUpdate),

    new CaptionConfig("Horizontal Intervals Between Items in Row", true),
    new RangeConfig("normalItemsInterval", 10, "Normal", 1, 40, 1, onUpdate),
    new RangeConfig("dotItemsInterval", 2, "Dotted", 1, 40, 1, onUpdate),
    new RangeConfig("lineItemsInterval", 2, "Lined", 1, 40, 1, onUpdate),

    new RangeConfig("cousinsIntervalMultiplier", 5, "Additional interval multiplier between cousins, it creates extra space between hierarchies", 1, 40, 1, onUpdate)
  ]));
  
  result.push(new PanelConfig("Connectors", [
    new RadioBoxConfig("arrowsDirection", GroupByType.None, "Arrows Direction", GroupByType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("connectorType", ConnectorType.Squared, "Connectors", ConnectorType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("elbowType", ElbowType.None, "Elbows Type", ElbowType, ValueType.Integer, onUpdate),
    new RangeConfig("bevelSize", 4, "Bevel Size", 1, 10, 1, onUpdate),
    new RangeConfig("elbowDotSize", 4, "Elbow dot Size", 1, 10, 1, onUpdate),
    new RadioBoxConfig("linesType", LineType.Solid, "Line type", LineType, ValueType.Integer, onUpdate),
    new ColorConfig("linesColor", Colors.Silver, "Color", false, onUpdate),
    new RangeConfig("linesWidth", 1, "Line width", 1, 10, 1, onUpdate),
    new CheckBoxConfig("showExtraArrows", true, "Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines", onUpdate),
    new RangeConfig("extraArrowsMinimumSpace", 30, "Available minimum space to show horizontal arrow", 1, 200, 1, onUpdate)
  ]));

  result.push(new PanelConfig("Labels", [
    new CaptionConfig("Label property should be defined for every item first, otherwise chart has nothing to show. Labels are visible only for markers. If you need to add labels to normal size items you have to modify default item template and place text outside item boundaries.", false),
    new RadioBoxConfig("showLabels", Enabled.Auto, "Show labels", Enabled, ValueType.Integer, onUpdate),
    new SizeConfig("labelSize", new Size(80, 24), "Size: Use this property to define labels bounding rectangle. Labels placed relative to markers(dots), so when they overlap in auto show mode one of them would be hidden. Set appropriate intervals between levels of markers in order to fit and make all labels visible.", 1, 400, 1, onUpdate),
    new RangeConfig("labelOffset", 1, "Offset", 0, 30, 1, onUpdate),
    new RadioBoxConfig("labelOrientation", TextOrientationType.Horizontal, "Label Orientation", TextOrientationType, ValueType.Integer, onUpdate),
    new RadioBoxConfig("labelPlacement", PlacementType.Top, "Label Placement", PlacementType, ValueType.Integer, onUpdate),
    new DropDownBoxConfig("labelFontSize", "10px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], ValueType.String, onUpdate),
    new DropDownBoxConfig("labelFontFamily", "Arial", "Font Name", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], ValueType.String, onUpdate),
    new ColorConfig("labelColor", Colors.Black, "Font Color", false, onUpdate),
    new RadioBoxConfig("labelFontWeight", "normal", "Font Weight", ["normal", "bold"], ValueType.String, onUpdate),
    new RadioBoxConfig("labelFontStyle", "normal", "Font Style", ["normal", "italic"], ValueType.String, onUpdate)
  ]));
  
  result.push(new PanelConfig("Callout", [
    new CaptionConfig("By default callout displays item content, but it can be redefined with custom callout template.", false),
    new RadioBoxConfig("calloutMaximumVisibility", Visibility.Dot, "Maximum node type visibility", { Normal: 1, Dot: 2, Line: 3 }, ValueType.Integer, onUpdate),
    new CheckBoxConfig("showCallout", true, "This option controls callout visibility for minimized items and it can be overwritten per item", onUpdate),
    new RangeConfig("calloutPlacementOffset", 100, "Call out placement offset", 10, 300, 10, onUpdate),
    new ColorConfig("calloutfillColor", "#000000", "Fill color", true, onUpdate),
    new ColorConfig("calloutBorderColor", "#000000", "Border line color", true, onUpdate),
    new RangeConfig("calloutOffset", 1, "Offset", 0, 30, 1, onUpdate),
    new DropDownBoxConfig("calloutCornerRadius", 4, "Corner Radius", ["0%", "5%", "10%", "20%", 0, 1, 2, 3, 4, 5, 10, 20, 30], ValueType.String, onUpdate),
    new DropDownBoxConfig("calloutPointerWidth", "10%", "Pointer Base Width", ["0%", "5%", "10%", "20%", 0, 5, 10, 20, 50], ValueType.String, onUpdate),
    new RangeConfig("calloutLineWidth", 1, "Line width", 0, 10, 1, onUpdate),
    new RangeConfig("calloutOpacity", 0.2, "Opacity", 0, 1, 0.1, onUpdate)
  ]));
  
  result.push(new PanelConfig("Interactivity", [
    new CaptionConfig("Use this option to disable mouse highlight on touch devices.", false),
    new RadioBoxConfig("navigationMode", NavigationMode.Default, "Navigation mode", NavigationMode, ValueType.Integer, onUpdate),
    new CaptionConfig("This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.", false),
    new RangeConfig("highlightGravityRadius", 40, "Gravity radius", 0, 100, 1, onUpdate),
    new CheckBoxConfig("enablePanning", true, "Enable Panning", onUpdate)
  ]));
  
  result.push(new PanelConfig("Rendering", [
    new CaptionConfig("By default control uses SVG graphics mode. Use this property to switch graphics mode programmatically into Canvas.", false),
    new RadioBoxConfig("graphicsType", GraphicsType.SVG, "Graphics", GraphicsType, ValueType.Integer, onUpdate),
    new CaptionConfig("In order to achieve better graceful degradation of your diagram use item templates of various sizes instead of CSS scale.", false),
    new DropDownBoxConfig("scale", 1.0, "CSS Scale", { "50%": 0.5, "60%": 0.6, "70%": 0.7, "80%": 0.8, "90%": 0.9, "100%": 1.0, "110%": 1.1, "120%": 1.2, "130%": 1.3, "140%": 1.4, "150%": 1.5, "160%": 1.6, "170%": 1.7, "180%": 1.8, "190%": 1.9, "200%": 2.0 }, ValueType.Number, onUpdate)
  ]));

  result.push(new PanelConfig("Frame", [
    new CaptionConfig("Displays selected items outside view port area.", false),
    new CheckBoxConfig("showFrame", true, "Show Frame", onUpdate),
    new RangeConfig("frameInnerPadding", 2, "Frame inner padding", 0, 10, 1, onUpdate),
    new RangeConfig("frameOuterPadding", 2, "Frame outer padding", 0, 10, 1, onUpdate)
  ]));
  return result;
};