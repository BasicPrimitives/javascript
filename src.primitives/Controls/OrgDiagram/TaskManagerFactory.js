primitives.orgdiagram.TaskManagerFactory = function (getOptions, getGraphics, getLayout, setLayout, templates) {
  var tasks = new primitives.common.TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
  tasks.addDependency('getLayout', getLayout);
  tasks.addDependency('setLayout', setLayout);
  tasks.addDependency('templates', templates);

  tasks.addDependency('defaultConfig', new primitives.orgdiagram.Config());
  tasks.addDependency('defaultItemConfig', new primitives.orgdiagram.ItemConfig());
  tasks.addDependency('defaultTemplateConfig', new primitives.orgdiagram.TemplateConfig());
  tasks.addDependency('defaultButtonConfig', new primitives.orgdiagram.ButtonConfig());

  tasks.addDependency('defaultBackgroundAnnotationConfig', new primitives.orgdiagram.BackgroundAnnotationConfig());
  tasks.addDependency('defaultConnectorAnnotationConfig', new primitives.orgdiagram.ConnectorAnnotationConfig());
  tasks.addDependency('defaultHighlightPathAnnotationConfig', new primitives.orgdiagram.HighlightPathAnnotationConfig());
  tasks.addDependency('defaultShapeAnnotationConfig', new primitives.orgdiagram.ShapeAnnotationConfig());

  tasks.addDependency('isFamilyChartMode', false);
  tasks.addDependency('showElbowDots', false);
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', primitives.common.ZOrderType.Foreground);
  tasks.addDependency('background', primitives.common.ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], primitives.orgdiagram.OptionsTask, primitives.common.Colors.Black);
  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.CalloutOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ConnectorsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.orgdiagram.ItemsContentOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.orgdiagram.LabelsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.VisualTreeOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.MinimizedItemsOptionTask, primitives.common.Colors.Navy);

  tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, primitives.common.Colors.Navy);
  tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorSelectionPathModeOptionTask, primitives.common.Colors.Navy);

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
  tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask'], primitives.orgdiagram.CombinedContextsTask, primitives.common.Colors.Cyan);
  tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], primitives.orgdiagram.OrgTreeTask, primitives.common.Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], primitives.orgdiagram.ReadTemplatesTask, primitives.common.Colors.Cyan);
  tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ActiveItemsTask, primitives.common.Colors.Cyan);
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, primitives.common.Colors.Cyan);

  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], primitives.orgdiagram.GroupTitleTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.CheckBoxTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], primitives.orgdiagram.ButtonsTemplateTask, primitives.common.Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], primitives.orgdiagram.AnnotationLabelTemplateTask, primitives.common.Colors.Cyan);

  tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'ActiveItemsTask', 'VisualTreeOptionTask', 'isFamilyChartMode'], primitives.orgdiagram.VisualTreeTask, primitives.common.Colors.Red);
  tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], primitives.orgdiagram.VisualTreeLevelsTask, primitives.common.Colors.Red);

  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, primitives.common.Colors.Cyan);

  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.HighlightItemTask, primitives.common.Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], primitives.orgdiagram.CursorItemTask, primitives.common.Colors.Cyan);
  tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'VisualTreeTask'], primitives.orgdiagram.CursorNeighboursTask, primitives.common.Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, primitives.common.Colors.Cyan);
  tasks.addTask('SelectionPathItemsTask', ['VisualTreeTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], primitives.orgdiagram.SelectionPathItemsTask, primitives.common.Colors.Cyan);

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

  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
    'VisualTreeTask', 'VisualTreeLevelsTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.orgdiagram.ItemsPositionsTask, primitives.common.Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, primitives.common.Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, primitives.common.Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], primitives.orgdiagram.PaletteManagerTask, primitives.common.Colors.Cyan);

  // Apply Layout Changes
  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask'], primitives.orgdiagram.ApplyLayoutChangesTask, primitives.common.Colors.Green);
  tasks.addTask('CenterOnCursorTask', ['LayoutOptionsTask', 'ApplyLayoutChangesTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], primitives.orgdiagram.CenterOnCursorTask, primitives.common.Colors.Cyan);
  tasks.addTask('ProjectItemsToFrameTask', ['CreateTransformTask', 'FrameSizeTask',
    'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'SelectedItemsTask'], primitives.orgdiagram.ProjectItemsToFrameTask, primitives.common.Colors.Green);
  
  // Renders
  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, primitives.common.Colors.Green);

  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);

  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);

  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawCursorTask, primitives.common.Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], primitives.orgdiagram.DrawHighlightTask, primitives.common.Colors.Green);
  tasks.addTask('DrawHighlightAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'FrameSizeTask'], primitives.orgdiagram.DrawHighlightAnnotationTask, primitives.common.Colors.Green);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
  ], primitives.orgdiagram.DrawTreeItemsTask, primitives.common.Colors.Green);

  tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'ItemTemplateParamsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawMinimizedItemsTask, primitives.common.Colors.Green);
  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], primitives.orgdiagram.DrawConnectorsTask, primitives.common.Colors.Green);
  tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawItemLabelsTask, primitives.common.Colors.Green);

  tasks.addTask('DrawFrameItemsTask', ['graphics', 'ApplyLayoutChangesTask', 'ProjectItemsToFrameTask', 'ItemTemplateParamsTask', 'MinimizedItemsOptionTask'], primitives.orgdiagram.DrawFrameItemsTask, primitives.common.Colors.Green);
  tasks.addTask('DrawFrameHighlightTask', ['graphics', 'ProjectItemsToFrameTask', 'CombinedContextsTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask'], primitives.orgdiagram.DrawFrameHighlightTask, primitives.common.Colors.Green);

  return tasks;
};
