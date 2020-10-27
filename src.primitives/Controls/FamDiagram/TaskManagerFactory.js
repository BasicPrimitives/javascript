primitives.famdiagram.TaskManagerFactory = function (getOptions, getGraphics, getLayout, setLayout, templates) {
  var tasks = new primitives.common.TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
  tasks.addDependency('getLayout', getLayout);
  tasks.addDependency('setLayout', setLayout);
  tasks.addDependency('templates', templates);

  tasks.addDependency('defaultConfig', new primitives.famdiagram.Config());
  tasks.addDependency('defaultItemConfig', new primitives.famdiagram.ItemConfig());
  tasks.addDependency('defaultTemplateConfig', new primitives.famdiagram.TemplateConfig());
  tasks.addDependency('defaultButtonConfig', new primitives.famdiagram.ButtonConfig());
  tasks.addDependency('defaultPaletteItemConfig', new primitives.famdiagram.PaletteItemConfig());

  tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.famdiagram.BackgroundAnnotationConfig());
  tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.famdiagram.ConnectorAnnotationConfig());
  tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.famdiagram.HighlightPathAnnotationConfig());
  tasks.addDependency('defaultShapeAnnotationConfig', new primitives.famdiagram.ShapeAnnotationConfig());
  tasks.addDependency('defaultLabelAnnotationConfig', new primitives.famdiagram.LabelAnnotationConfig());

  tasks.addDependency('isFamilyChartMode', true);/* in regular org diagram we hide branch if it contains only invisible nodes, 
    in the family chart we use invisible items to draw connectors across multiple levels */
  tasks.addDependency('showElbowDots', true);/* in regular org chart we don;t have situations when connector lines cross, but we have such situations in 
    family tree so we need extra visual attribute to distinguish intersections betwen connectors */
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', primitives.common.ZOrderType.Foreground);
  tasks.addDependency('background', primitives.common.ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], primitives.famdiagram.OptionsTask, primitives.common.Colors.Black);

  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.ItemsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsContentOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('RemoveLoopsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.RemoveLoopsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('SpousesOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.SpousesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.LabelsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask'], primitives.famdiagram.VisualTreeOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.MinimizedItemsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('HideGrandParentsConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.HideGrandParentsConnectorsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('NormalizeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NormalizeOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('OrderFamilyNodesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.famdiagram.OrderFamilyNodesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('LinePaletteOptionTask', ['OptionsTask', 'defaultPaletteItemConfig'], primitives.famdiagram.LinePaletteOptionTask, primitives.common.Colors.Navy);

  tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorSelectionPathModeOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('NeighboursSelectionModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NeighboursSelectionModeOptionTask, primitives.common.Colors.Navy);

  tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, primitives.common.Colors.Cyan);

  tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, primitives.common.Colors.Navy);

  tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('FrameOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.FrameOptionTask, primitives.common.Colors.Navy);

  // Transformations
  tasks.addTask('UserDefinedNodesOrderTask', ['OrderFamilyNodesOptionTask', 'defaultItemConfig'], primitives.famdiagram.UserDefinedNodesOrderTask, primitives.common.Colors.Red);

  tasks.addTask('LogicalFamilyTask', ['ItemsOptionTask'], primitives.famdiagram.LogicalFamilyTask, primitives.common.Colors.Cyan);
  tasks.addTask('RemoveLoopsTask', ['ItemsOptionTask', 'RemoveLoopsOptionTask', 'LogicalFamilyTask'], primitives.famdiagram.RemoveLoopsTask, primitives.common.Colors.Red);

  tasks.addTask('LabelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'RemoveLoopsTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('LabelAnnotationTemplateOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationTemplateOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('LabelAnnotationPlacementOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationPlacementOptionTask, primitives.common.Colors.Navy);

  tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask', 'LabelAnnotationOptionTask'], primitives.orgdiagram.CombinedContextsTask, primitives.common.Colors.Cyan);

  tasks.addTask('AddLabelAnnotationsTask', ['LabelAnnotationPlacementOptionTask', 'RemoveLoopsTask'], primitives.famdiagram.AddLabelAnnotationsTask, primitives.common.Colors.Red);
  tasks.addTask('AddSpousesTask', ['SpousesOptionTask', 'AddLabelAnnotationsTask'], primitives.famdiagram.AddSpousesTask, primitives.common.Colors.Red);
  tasks.addTask('HideGrandParentsConnectorsTask', ['HideGrandParentsConnectorsOptionTask', 'AddSpousesTask'], primitives.famdiagram.HideGrandParentsConnectorsTask, primitives.common.Colors.Red);
  tasks.addTask('NormalizeLogicalFamilyTask', ['NormalizeOptionTask', 'HideGrandParentsConnectorsTask'], primitives.famdiagram.NormalizeLogicalFamilyTask, primitives.common.Colors.Red);
  tasks.addTask('OrderFamilyNodesTask', ['OrderFamilyNodesOptionTask', 'UserDefinedNodesOrderTask', 'NormalizeLogicalFamilyTask'], primitives.famdiagram.OrderFamilyNodesTask, primitives.common.Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], primitives.orgdiagram.ReadTemplatesTask, primitives.common.Colors.Cyan);
  tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ActiveItemsTask, primitives.common.Colors.Cyan);
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, primitives.common.Colors.Cyan);
  tasks.addTask('LabelAnnotationTemplateParamsTask', ['ItemsSizesOptionTask', 'LabelAnnotationTemplateOptionTask', 'ReadTemplatesTask'], primitives.famdiagram.LabelAnnotationTemplateParamsTask, primitives.common.Colors.Cyan);
  tasks.addTask('CombinedTemplateParamsTask', ['ItemTemplateParamsTask', 'LabelAnnotationTemplateParamsTask'], primitives.famdiagram.CombinedTemplateParamsTask, primitives.common.Colors.Cyan);

  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], primitives.orgdiagram.GroupTitleTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.CheckBoxTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.ButtonsTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], primitives.orgdiagram.AnnotationLabelTemplateTask, primitives.common.Colors.Cyan);

  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'OrderFamilyNodesTask', 'AlignDiagramTask', 'RemoveLoopsTask'], primitives.orgdiagram.ConnectionsGraphTask, primitives.common.Colors.Cyan);

  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.HighlightItemTask, primitives.common.Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.CursorItemTask, primitives.common.Colors.Cyan);
  tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'NeighboursSelectionModeOptionTask', 'AddSpousesTask', 'ActiveItemsTask'], primitives.famdiagram.CursorNeighboursTask, primitives.common.Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, primitives.common.Colors.Cyan);
  tasks.addTask('SelectionPathItemsTask', ['AddSpousesTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], primitives.famdiagram.SelectionPathItemsTask, primitives.common.Colors.Cyan);

  tasks.addTask('NormalVisibilityItemsByForegroundShapeAnnotationTask', ['ForegroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundShapeAnnotationTask', ['BackgroundShapeAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundAnnotationTask', ['BackgroundAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundHighlightPathAnnotationTask', ['ForegroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask', ['BackgroundHighlightPathAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundConnectorAnnotationTask', ['ForegroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundConnectorAnnotationTask', ['BackgroundConnectorAnnotationOptionTask'], primitives.orgdiagram.NormalVisibilityItemsByConnectorAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('CombinedNormalVisibilityItemsTask', [
    'ItemsSizesOptionTask',
    'CursorItemTask',
    'CursorNeighboursTask',
    'SelectedItemsTask',
    'SelectionPathItemsTask',
    'NormalVisibilityItemsByForegroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundAnnotationTask',
    'NormalVisibilityItemsByForegroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByForegroundConnectorAnnotationTask',
    'NormalVisibilityItemsByBackgroundConnectorAnnotationTask'], primitives.orgdiagram.CombinedNormalVisibilityItemsTask, primitives.common.Colors.Cyan);

  // Layout
  tasks.addTask('FrameSizeTask', ['FrameOptionTask', 'ReadTemplatesTask', 'ScaleOptionTask'], primitives.orgdiagram.FrameSizeTask, primitives.common.Colors.Navy);
  tasks.addTask('LayoutOptionsTask', ['getLayout', 'OptionsTask'], primitives.orgdiagram.LayoutOptionsTask, primitives.common.Colors.Black);
  tasks.addTask('CurrentControlSizeTask', ['LayoutOptionsTask', 'ItemsSizesOptionTask', 'FrameSizeTask'], primitives.orgdiagram.CurrentControlSizeTask, primitives.common.Colors.Black);
  tasks.addTask('CurrentScrollPositionTask', ['LayoutOptionsTask'], primitives.orgdiagram.CurrentScrollPositionTask, primitives.common.Colors.Black);

  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask',
    'OrderFamilyNodesOptionTask', 'OrderFamilyNodesTask',
    'CombinedTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.famdiagram.ItemsPositionsTask, primitives.common.Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, primitives.common.Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, primitives.common.Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'LinePaletteOptionTask'], primitives.orgdiagram.PaletteManagerTask, primitives.common.Colors.Cyan);

  // Apply Layout Changes
  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask'], primitives.orgdiagram.ApplyLayoutChangesTask, primitives.common.Colors.Cyan);
  tasks.addTask('CenterOnCursorTask', ['LayoutOptionsTask', 'ApplyLayoutChangesTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], primitives.orgdiagram.CenterOnCursorTask, primitives.common.Colors.Cyan);
  tasks.addTask('ProjectItemsToFrameTask', ['CreateTransformTask', 'FrameSizeTask',
    'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'SelectedItemsTask'], primitives.orgdiagram.ProjectItemsToFrameTask, primitives.common.Colors.Cyan);  

  // Renders
  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);

  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'LogicalFamilyTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);

  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawCursorTask, primitives.common.Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightTask, primitives.common.Colors.Green);
  tasks.addTask('DrawHighlightAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'FrameSizeTask'], primitives.orgdiagram.DrawHighlightAnnotationTask, primitives.common.Colors.Green);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'CombinedTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
  ], primitives.orgdiagram.DrawTreeItemsTask, primitives.common.Colors.Green);

  tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'CombinedTemplateParamsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawMinimizedItemsTask, primitives.common.Colors.Green);

  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], primitives.orgdiagram.DrawConnectorsTask, primitives.common.Colors.Green);
  tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawItemLabelsTask, primitives.common.Colors.Green);

  tasks.addTask('DrawFrameItemsTask', ['graphics', 'ApplyLayoutChangesTask', 'ProjectItemsToFrameTask', 'ItemTemplateParamsTask', 'MinimizedItemsOptionTask'], primitives.orgdiagram.DrawFrameItemsTask, primitives.common.Colors.Green);
  tasks.addTask('DrawFrameHighlightTask', ['graphics', 'ProjectItemsToFrameTask', 'CombinedContextsTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask'], primitives.orgdiagram.DrawFrameHighlightTask, primitives.common.Colors.Green);
  
  return tasks;
};
