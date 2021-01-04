#### Version 6.1.1
* Fixed levelOffset property to work regardless of empty levels
#### Version 6.1.0
* Added LevelAnnotationConfig
* Added level annotation options to OrgConfig and FamConfig
* Fixed frame auto hiding for small control size
* Fixed group title options in PDFKit plugins.
* Fixed shapes opacity in PDFKit plugins.
#### Version 6.0.0
**Warning**: Non-backward compatible API changes!
* Refactored library into [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
* Replaced custom `merge` tool with [Webpack](https://webpack.js.org/)
* Removed `common`, `orgdiagram` and `famdiagram` namespaces. 
* Added [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/) support
* Renamed `primitives.orgdiagram.Config` into `OrgConfig` 
* Renamed `primitives.orgdiagram.ItemConfig` into `OrgItemConfig` 
* Renamed `primitives.orgdiagram.Control` into `OrgDiagram` 
* Renamed `primitives.famdiagram.Config` into `FamConfig` 
* Renamed `primitives.famdiagram.ItemConfig` into `FamItemConfig` 
* Renamed `primitives.famdiagram.Control` into `FamDiagram` 
* Renamed `primitives.pdf.orgdiagram.Plugin` into `OrgDiagramPdfkit` 
* Renamed `primitives.pdf.famdiagram.Plugin` into `FamDiagramPdfkit` 
* Removed `ButtonConfig`, use `onButtonsRender` callback instead.
* Added `hasButtons` property to `TemplateConfig`
* Added `onButtonsRender` callback to `OrgConfig`, `FamConfig` and `TemplateConfig`.
* Removed `jQuery` widgets wrapping library and `jQuery` samples framework.
* Refactored `jUnit` tests into `Jest`.
* Refactored samples framework into [Bootstrap](https://getbootstrap.com/)
#### Version 5.9.1
* Fixed frame placeholder size
#### Version 5.9.0
* Added `showFrame`, `fameInnerPadding`, `frameOuterPadding` properties to `primitives.orgdiagram.Config` & `primitives.famdiagram.Config`
* Modified callout annotation placement for minimized nodes placed outside view port.
* Fixed exception when `selectedItems` collection contains non existing items.
* Fixed center on cursor in AutoSize mode
#### Version 5.8.2
* Fixed `selectionPathMode` in Family Diagram.
#### Version 5.8.1
* Fixed performance bug in loops layout optimization
#### Version 5.8.0
* Added `loopsLayoutMode` property to `primitives.famdiagram.Config`. Property sets loops layout optimization mode in Family Diagram. See `Loops Layout Optimization` use case.
* Added extra arrows to vertical segments of loops in family diagram
* Fixed spouses selection in family diagram
* Fixed background annotation `includeChildren` property in family diagram having loops between items.
#### Version 5.7.0
* Added `primaryParent` property to `primitives.famdiagram.ItemConfig`. Property defines user preference for item placement relative to its multiple parents in Family Diagram. See Technological Tree Demo.
#### Version 5.6.4
* Updated IntelliSense API annotations
#### Version 5.6.3
* Fixed initial callout placement
* Fixed neighbours selection in family diagram having inactive nodes
#### Version 5.6.2
* Fixed performance bug in the value reader.
#### Version 5.6.0
* Added `placeAssistantsAboveChildren` and `placeAdvisersAboveChildren` properties to `primitives.orgdiagram.Config` & `primitives.orgdiagram.ItemConfig`.
* Added `levelOffset` property to `primitives.orgdiagram.ItemConfig`.
#### Version 5.5.0
* Added IntelliSense API annotations to code
* Added API annotations conversion into markdown
#### Version 5.4.15
* Fixed minimized items highlight alignment in React
#### Version 5.4.14
* Fixed objects comparison for React JSX 
#### Version 5.4.12
* Removed CSS file from React component
#### Version 5.4.0
* Added OrgDiagram & FamDiagram React components and samples.
* Extracted platform specific functionality out of core.
* Added onButtonsRender event to TemplateConfig.
* Added support of cycles in objects definitions of labels.
* Fixed CSS scale bugs.
* Removed jQuery UI Widget Organizational Chart Editor.
* Removed PHP samples.
#### Version 5.3.1
* Fixed performance issue in react demo.
#### Version 5.3.0
* Added `relativeItem`, `placementType` and `position` properties to `primitives.famdiagram.ItemConfig`. Properties define user preferences for items order in Family Diagram. See "Family Members Order" data set in Family Chart & Annotations Demo.
#### Version 5.2.4
* Merged fix for straight connector annotations labels.
#### Version 5.2.2
* Fixed `update` method. In case when only nodes content properties changed like title, description, context, etc, chart will render only them. See Cursor item properties editor panel in Organizational Chart Editor Demo in React Demos.
* Fixed elbows of connection lines.
#### Version 5.2.1
* Fixed performance bug. JSONML Templates triggered layout on every update. See Dependencies Chart Demo in React Demos.
#### Version 5.2.0
* Added optional center on cursor parameter to update method. See React Demos for usage.
#### Version 5.1.1
* Fixed document undefined bug in NodeJS environment.
* Published React Demo & Tutorial to Github
#### Version 5.1.0

**Warning**: Extracted jQuery UI Widgets into separate `file primitives.jquery.latest.js` !
* Added npm package header and published library to [www.npmjs.com](https://www.npmjs.com/package/basicprimitives)
* Added pagination for nodes in page fit mode set to None.
#### Version 5.0.4
* Fixed cursor neighbours selection over template inactive items.
#### Version 5.0.3
* Fixed call out placement in auto size mode when control is placed in document layout and scrolled.
#### Version 5.0.2
* Fixed highlight path annotation tracing when famDiagram option hiding direct connections to grandparents is enabled.
* Fixed false layout invalidation on highlight changed event
#### Version 5.0.1
* Fixed fit to page mode in primitives.famdigram.Control.
#### Version 5.0.0
**Warning**: Non-backward compatible API changes!
* Removed dependency on jQuery.
* Added pure JavaScript Controls `primitives.orgdiagram.Control` and `primitives.famdiagram.Control`
* Added JSON ML support for HTML templates
* Removed support of VML and IE8
* Reworked Drag & Scroll to use native JavaScript draggable object
* Fixed highlight call-out placement in CSS Zoom scale mode.
* Fixed selection check-boxes to ignore mouse double click event
* Fixed controls rendering inside divs having computed width and height

*Version 4.3.0 archived. See primitives430.zip in downloads. Archive contains demos, "how to use" examples & reference. It is available only for registered users.*

#### Version 4.3.0
* Added option groupTitlePlacementType to primitives.famdiagram.Config and primitives.orgdiagram.Config. Property swaps positions of group title and buttons.
#### Version 4.2.3
* Reorganized samples.
#### Version 4.2.2
* Fixed selection/pin checkbox label click in IE
#### Version 4.2.1
* Updated demos and samples to use jQuery 3.3.1 & jQuery UI 1.12.1 libraries.
* Fixed bug in jQuery UI Layout library used in demos.
#### Version 4.2.0
* Added option enableMatrixLayout, minimumMatrixSize and maximumColumnsInMatrix to primitives.famdiagram.Config. See Family Chart & Annotations demo for usage.
* Reworked background annotations merge. Items backgrounds don't grow beyond padding area anymore.
* Reworked keyboard navigation. So it respects nodes crossing multiple layers of nodes.
* Reworked mouse highlight gravity. Nodes are no longer highlighted when cursor is out of nodes bounds.
* Removed PhantomJS support and page split rendering mode. Use PDFkit plugin for PDF generation and printing.
* Reworked labels conflicts resolution in labels visibility auto mode.
* Fixed inactive items usage in Family diagram.
* Improved layout update and rendering triggered by cursor change event. 
#### Version 4.1.0
* Added option hideGrandParentsConnectors for primitives.famdiagram.Config. See patents demo for usage.
#### Version 4.0.0
* Reworked horizontal alignment algorithm for Family chart
#### Version 3.7.10
* Fixed option showCallout for primitives.famdiagram.ItemConfig and primitives.orgdiagram.ItemConfig
#### Version 3.7.9
* Added option calloutMaximumVisibility to primitives.famdiagram.Config and primitives.orgdiagram.Config
#### Version 3.7.8
* Fixed panning in IE10 in Windows 7
#### Version 3.7.7
* Added group title font size option
#### Version 3.7.6
* Fixed refresh dependency on items order in items collection 
#### Version 3.7.5
* Added extra horizontal arrows over connection lines with following options showExtraArrows and extraArrowsMinimumSpace to primitives.famdiagram.Config and primitives.orgdiagram.Config.
#### Version 3.7.4
* Added options highlightGravityRadius and calloutPlacementOffset to primitives.famdiagram.Config and primitives.orgdiagram.Config
* Improved call-out placement, so it is placed across connectors and does not block neighbors of highlighted item anymore.
#### Version 3.7.3
* Named layers with CSS classes
#### Version 3.7.2
* Added alignByLevels options to primitives.famdiagram.Config, see Family Demo
#### Version 3.7.1
* Fixed highlighted item callout placement
* Fixed bugs in famDiagram layout algorithms
#### Version 3.7.0
* Improved highlight connection path annotations rendering time
* Added multiple rendering styles support for highlight connection path annotation
* Improved famDiagram horizontal alignment
#### Version 3.6.6
* Fixed straight line annotation rendering
#### Version 3.6.5
* Fixed organizational chart horizontal alignment
#### Version 3.6.4
* Fixed connection lines of children having vertical layout
#### Version 3.6.3
* Eliminated recursive calls.
#### Version 3.6.2
* Fixed exception on null image reference in default PDF item template.
#### Version 3.6.1
* Fixed user templates support in PDF plugins. See User Item template sample in Client Side PDF Generation Demo.
#### Version 3.6.0
* Added PDF generation support with PDFkit library for Node and in the browser. See Client Side PDF Generation Demo.
#### Version 3.5.0
* Added resolution of straight collinear connectors overlapping. See "Highlight Movement & Annotations" demo.
* Optimized connector annotations rendering.
* Improved cross diagram connection lines stacking.
* Disabled refresh on event handlers binding.
#### Version 3.4.1
* Fixed layout update on widget placeholder resize and forced update in refresh mode.
#### Version 3.4.0
* Added primitives.common.ConnectorShapeType.BothWay option to enumeration. See Connector and Family Chart Demos for Connector Annotation options. 
#### Version 3.3.1
* Fixed options updates within onCursorChanging and onHighlightChanging event handlers.
#### Version 3.3.0
* Added primitives.common.ConnectorPlacementType enumerations, having following options: Offbeat & Straight. 
* Added connectorPlacementType option to primitives.orgdiagram.Config & primitives.famdiagram.Config
#### Version 3.2.0
* Added primitives.common.NavigationMode.HighlightOnly option to navigationMode option.
* Fixed item position in mouse events. 
* Changed order of event handler invocation and cursor/highlight option assignment.
#### Version 3.1.2
* Fixed PositonHighlight update mode
#### Version 3.1.1
* Fixed enablePanning option.
#### Version 3.1.0
* Added enumeration `primitives.common.NavigationMode` and `navigationMode` option disabling control's highlight and cursor interactivity when needed. See Interactivity options for Large Hierarchy & Family Demos.
#### Version 3.0.0
* Optimized data processing and rendering. See Controls Processing Diagrams.
* Fixed CSS scale. See primitives.famdiagram.Config.scale and primitives.orgdiagram.Config.scale options
* Added `neighboursSelectionMode` option to `primitives.famdiagram.Config`. See `primitives.common.NeighboursSelectionMode` enumeration for ParentsAndChildren & ParentsChildrenSiblingsAndSpouses options of cursor related nodes selection.
*Version 2.1.10 archived. See primitives2110.zip in downloads. Archive contains demos, "how to use" examples & reference. It is available only for registered users.*

#### Version 2.1.10
* Fixed label annotations placement on loop connections in famDiagram.
#### Version 2.1.9
* Fixed label annotations placement on loop connections in famDiagram.
* Changed arrow size of 2 & 3 pixel wide lines.
#### Version 2.1.8
* Added PageFitMode.AutoSize, autoSizeMaximum and autoSizeMinimum options to Configs of orgDiagram & famDiagram widgets.
* Changed PageFitMode.PrintPreview mode to auto size widget to show all nodes of diagram. 
#### Version 2.1.7
* Fixed multiple spouses connection lines.
#### Version 2.1.6
* Added minimizedItemShapeType to Config, ItemConfig & TemplateConfig of orgDigram & famDiagram widgets.
* Added minimizedItemLineWidth, minimizedItemBorderColor, minimizedItemLineType, minimizedItemFillColor and minimizedItemOpacity to TemplateConfig of orgDigram & famDiagram widgets. 
* Fixed spouses connection lines.
* Fixed spouses navigation.
* Fixed annotation labels navigation.
#### Version 2.1.5
* Fixed exception on orphan invisible item.
* Enforced side alignment for SubAdviser and SubAssistant item types in orgDiagram.
#### Version 2.1.4
* Fixed keyboard navigation with arrow keys.
#### Version 2.1.3
* Fixed horizontal connector lines for vertically aligned items to the top or bottom.
#### Version 2.1.2
* Improved family diagram layout.
#### Version 2.1.1
* Fixed loops visualization in family diagram.
#### Version 2.1.0
* Added support of loops in family diagram. The item defined first in users items collection stays at the top of diagram.
* Added nodes grouping to children/parents. See groupByType option of  primitives.famdiagram.Config
* Fixed disconnected family fragments alignment to the top.
#### Version 2.0.24
* Added onItemDblClick event to famDiagram and orgDiagram widget configs.
#### Version 2.0.23
* Added elbowDotSize option to famDiagram and orgDiagram widget configs.
#### Version 2.0.22
* Added BackgroundAnnotationConfig to famDiagram and orgDiagram widgets. See Partners & Annotations Demo.
* Added includeChildren option to primitives.orgdiagram.BackgroundAnnotationConfig selecting all descendants of annotated items.
#### Version 2.0.21
* Added arrowsDirection option to primitives.orgdiagram.Config, primitives.famdiagram. Config. See "Arrows Direction" options in "Organizational Chart Navigation" demo.
#### Version 2.0.20
* Fixed connectors rendering.
* Fixed HighlightPathAnnotationConfig tracing. See financial ownership diagram demo.
#### Version 2.0.19
* Added spouses option to primitives.famdiagram.ItemConfig. See first family chart use case.
* Fixed group title alignment.
#### Version 2.0.18
* Added LabelAnotationConfig option class and defaultLabelAnnotationTemplate to primitives.famdiagram.Config. See financial ownership diagram demo.
* Fixed context buttons usage in templates.
#### Version 2.0.17
* Added isActive option to primitives.orgdiagram.ItemConfig, primitives.famdiagram.ItemConfig, primitives.orgdiagram.TemplateConfig and primitives.famdiagram.TemplateConfig. See inactive items example.
#### Version 2.0.16
* Fixed minor data validation bug. Ignores orphan parent references.
#### Version 2.0.15
* Added PrintPreview option to primitives.common.PageFitMode and printPreviewPageSize option to primitives.orgdiagram.Config and primitives.famdiagram.Config. See print preview example.
#### Version 2.0.14
* Added highlight path annotation support to famDiagram. See primitives.famdiagram.HighlightPathAnnotationConfig usage in PERT Chart & Critical Path visualization example. 
#### Version 2.0.13
* Disabled labels for regular items. Option primitives.orgdiagram.showLabels is only valid for minimized items now. For regular items see labels in item template example.
#### Version 2.0.12
* Added buttons option to primitives.orgdiagram.TemplateConfig and primitives.famdiagram.TemplateConfig.
* Fixed mouse events arguments.
#### Version 2.0.11
* Hid connectors for skipped/invisible root items.
#### Version 2.0.10
* Added elbowType option of type primitives.common.ElboyType to style squared connector lines.
#### Version 2.0.9
* Improved famDiagram layout. Added bundles for children and parents. Cross chart connectors length reduced by 20%.
#### Version 2.0.8
* Fixed primitives.common.luminosity.
* Removed overflow hidden from item style.
#### Version 2.0.7
* Added keyboard navigation with arrow keys and "Enter".
#### Version 2.0.6
* Added partners placement to Left/Right in famDigram Widget depending on cross hierarchy connections.
#### Version 2.0.5
* Added bp-highlight-dot-frame class to css.
* Fixed Bootstrap compatibility bug related to box-styling.
* Added labelPlacementType to Connector Annotation Config and to Connector helper Widget Config. See Family Chart & Connector Widget demos.
* Added minimizedItemCornerRadius to TemplateConfig. See Organizational Chart Navigation demo.
#### Version 2.0.4
* Improved famDiagram layout. Cross chart connectors length reduced by 5%.
#### Version 2.0.3
* Improved famDiagram layout.
#### Version 2.0.2
* Improved famDiagram layout.
#### Version 2.0.1
* Added support of orphan families and groups of families to famDigram Widget.
#### Version 2.0.0
* Added famDiagram Widget - Multi-parent hierarchical chart. It has similar API to orgDiagram widget except it supports multiple parents for items instead of one. Chart does not support loops in hierarchy and does not check for them. It has following set of configuration classes in primitives.famdiagram: Config, ItemConfig, ButtonConfig, TemplateConfig, PaletteItemConfig, ConnectorAnnotationConfig & ShapeAnnotationConfig.
* Fixed dashed line style for Canvas in IE11
* Fixed partners alignment in organizational chart.
#### Version 1.1.1
* Added extra constructors to HighlightPathAnnotationConfig, ShapeAnnotationConfig and ConnectorAnnotationConfig.
#### Version 1.1.0
**Warning**: **Non-backward compatible API changes!**
* Added Shape & Connector helper widgets: bpShape & bpConnector.
* Added Shape, Connector & Highlight path annotations to orgDiagram. Added ConnectorAnnotationConfig, ShapeAnnotationConfig & HighlightPathAnnotationConfig classes to orgDiagram. Added annotations collection property to orgdiagram.Config.
* Added connection lines styling options: linesType, highlightLinesColor, highlightLinesWidth, highlightLinesType to orgdiagram.Config.
* Changed API from hierarchical structure defined by rootItem to flat list of ItemConfig objects defined in items collection property. Added id & parent properties to ItemConfig. Changed type of cursorItem, highlightItem & selectedItems properties from object references to ItemConfig id-s. Now, in order to define root item, root item in items collection should have its parent property set to null. Chart supports multiple root items. Chart does not search for orphans and ignores looped items. It is Applications responsibility to provide consistent collection of items.
#### Version 1.0.39
* Fixed SVG blurred lines in IE for charts layouted without absolute positioning.
* Added tooltip option to ButtonConfig.
#### Version 1.0.38
* Added new ItemType options: GeneralPartner & LimitedPartner & AdviserPartner
#### Version 1.0.37
* Added enablePanning option to Config.
* ASP.NET 3.5: Added ShowButtons & Buttons properties to control.
* ASP.NET 3.5: Added ShowButtons property to Item class.
#### Version 1.0.36
* Added showCallout to Config & ItemConfig.
* Added defaultCalloutTemplateName to Config.
* Added calloutTemplateName to ItemConfig.
#### Version 1.0.35
* Fixed invisible cursor item bug.
#### Version 1.0.34
* Added showLabels, labelSize, labelOffset, labelOrientation, labelPlacement, labelFontSize, labelFontFamily, labelColor, labelFontWeight, labelFontStyle options to Config.
* Added label, showLabel, labelSize, labelOrientation, labelPlacement to ItemConfig.
* Fixed graphics & non-graphics elements alignment
* Improved curved connectors
#### Version 1.0.33
* Enabled native scroll for Mobile Safari.
* Made selection checkbox label clickable.
#### Version 1.0.32
* Added cousinsIntervalMultiplier option to Config options class.
#### Version 1.0.31
* Added CSS3 scale transform on zoom gesture for Mobile Safari. Added minimumScale & maximumScale options to primitives.orgdiagram.Config.
* Enabled annotation for highlight items outside of widget boundaries.
#### Version 1.0.30
* Added: Mouse panning/scrolling for desktop browsers.
* Changed siblings visibility for cursor item.
* ASP.NET 3.5: Updated to jQuery 1.9.1
* Joomla 1.5 & 2.5: Updated to jQuery 1.9.1
#### Version 1.0.29
* Added new ItemType options: SubAdviser & SubAssistant. Deprecated Invisible item type.
* Added isVisible option to ItemConfig.
* Joomla 1.5 & 2.5: Added Invisible template and ported new item types.
* ASP.NET 3.5 Moved templates customization from C# code to JavaScript.
* ASP.NET 3.5 Removed dependency on jquery.json-2.3.min.js and added json3.min.js instead.
* ASP.NET 3.5 Added HorizontalAlignmentType, ChildrenPlacementType, OrientationType to control options.
* ASP.NET 3.5 Added SubAssistant & SubAdviser to available item types.
* ASP.NET 3.5 Added IsVisible & ChildrenPlacementType options to Item class.

#### Version 1.0.28
* Disabled highlight for touch devices.
* Fixed rotated text in pure IE8. IE9's IE8 compatibility mode is not compatible with IE8.
* Joomla 2.5: plg_bporgdiagram plug-in added, {bporgdiagarm #} where # is chart id in management panel. Provides optimized support of multiple charts in one article.
* Joomla 1.5 & 2.5. Added chart orientationType option: Left, Right, Top, Bottom
#### Version 1.0.27
* Fixed performance issues.
#### Version 1.0.26
* Fixed visibility of hierarchy of invisible items.
#### Version 1.0.25
* Added chart orientationType option: Left, Right, Top, Bottom
#### Version 1.0.24
* Added ALT attribute to image of default template.
* Fixed blurred dots in VML mode.
#### Version 1.0.23
* Fixed performance issues.
#### Version 1.0.22
* Fixed selection check box functionality for diagram inside jQuery UI Dialog.
#### Version 1.0.21
* Added defaultTemplateName to Config options class.
* Added templateName to RenderEventArgs parameter class.
* Joomla 1.5, 2.5: com_bporgdiagram added, organizational charts management component wrapping BP jQuery orgEditor widget. 
* Joomla 2.5: mod_bp_orgdiagram_editor added, places organizational charts created in management panel in module position, it is compatible with {module [#]} plugin.
* Joomla 1.5, 2.5: com_bpwidgets added, rendering widgets component distributed under its own license.
* Joomla 1.5: plg_bporgdiagram plug-in added, {bporgdiagarm #} where # is chart id in management panel. Provides optimized support of multiple charts in one article.
#### Version 1.0.20
* Fixed connectors drawing for items having assistants, but no children.
* Fixed group title update for different heights.
#### Version 1.0.19
* Added childrenPlacementType to Config & ItemConfig options classes.
* Added horizontalAlignment in Config.
#### Version 1.0.18
* Fixed layout performance bug.
#### Version 1.0.17
* Added primitives.min.js.
* Added primitives.latest.css
* Fixed large canvas issue. When chart width is over 6000px it uses pure HTML graphics now.
* Fixed user jQuery UI buttons initialization.
#### Version 1.0.16
* Fixed Bootstrap compatibility bugs. http://twitter.github.com/bootstrap/  Added Bootstrap demo for registered users.
* Added onMouseClick event to Config.
#### Version 1.0.15
* Fixed narrow tree alignment to center instead of stretching it to available view port width.
* Fixed Assistants & Advisers children placement. Parent's regular children are shifted down in order to provide space for them inside of parent's hierarchy.
* Added maximumColumnsInMatrix option to org chart Config.
* ASP.NET 3.5 Fixed IE8 related bugs.
* ASP.NET 3.5 Fixed JSON serialization in IE6-IE7. Added dependency on jquery.json-2.3.min.js. http://code.google.com/p/jquery-json/
* ASP.NET 3.5 Added LeavesPlacementType & MaximumColumnsInMatrix properties to Control class.
* ASP.NET 3.5 Added GroupTitle, GroupTitleColor, ItemType, AdviserPlacementType properties to Item class.
#### Version 1.0.14
* Added leavesPlacementType option to Config. Vertical, Horizontal & Matrix layouts.
* Added adviserPlacementType option to ItemConfig. Left, Right placement.
* Added Adviser and Assistant item types to ItemType.  
#### Version 1.0.13
* Added explicit hasButtons option to orgDiagram Config.
* Added onSelectionChanging Event to orgDiagram Config.
* Added groupTitle, groupTitleColor, hasSelectorCheckbox and hasButtons to orgDiagram ItemConfig.
* Added isCursor & isSelected options to RenderEventArgs indicating current state of rendered item.
* ASP.NET 3.5 Custom control: Fixed Item's ShowCheckBox property.
#### Version 1.0.12
* Added call out shape to annotation.
* Joomla 152-256 menu module: Added verticalAlignment & connectorType properties.
* ASP.NET 3.5 Custom control: Added verticalAlignment & connectorType properties.
#### Version 1.0.11
* Fixed annotation placement.
#### Version 1.0.10
* Improved tree balancing. 
#### Version 1.0.9
* Added bpText widget. Displays vertical text using VML or CSS3.
* Added bpCallout widget. Draws call-out geometry in VML, SVG or Canvas formats.
* Added narrow hierarchy auto stretching up to available view port width.
* Added items verticalAlignment property. It defines relative items alignment within one row: Top, Middle, Bottom. It only affects rows containing items of different heights.
* Added connectorType options: Squared, Angular and Curved connector lines style for dots.
#### Version 1.0.8
* Fixed widget placement inside divs having non-absolute position.
* Joomla 152-256 menu module: Suppressed layout update before sending server post back.
* ASP.NET 3.5 Custom control: Fixed custom control placement inside panels having non-absolute position.
#### Version 1.0.7
* Added parentItem to EventArgs class. (See use case: "Adding new items at run time")
#### Version 1.0.6
* Added itemTitleFirstFontColor & itemTitleSecondFontColor options to orgDiagram Config class.
* Added common functions: highestContrast, luminosity, beforeOpacity, getColorHexValue, getRed, getBlue, getGreen.
* Fixed itemTitleColor option.
* ASP.NET custom control: Added TitleColor property to Item class.
* Removed BOM marks from file.
#### Version 1.0.5
* Added onHighlightChanging & onCursorChanging events to orgDiagram Config class.
* Named noname event arguments to named classes: primitives.orgdiagram.EventArgs & primitives.common.RenderEventArgs.
* Published ASP.NET 3.5 custom control BPOrgDiagram & Demo.
#### Version 1.0.4
* Fixed bugs blocking jQuery 1.6.2 compatibility.
#### Version 1.0.3
* Fixed bugs in page auto layout.
#### Version 1.0.2
* Joomla 1.5.2 and 2.5.6 compliant menu modules added.
* Added minimalVisibility option to Config options class.
* Fixed page sizing in PageFitMode.None mode.
#### Version 1.0.1
* Fixed mootools compatibility bug. 
#### Version 1.0.0
* Initial check-in.