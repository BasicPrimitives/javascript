primitives.pdf.famdiagram.Plugin = function (options) {
  var _data = {
    name: "famdiagram",
    doc: null,
    options: options,
    tasks: null,
    graphics: null
  },
    _scale,
    _debug = false;

  function getOptions() {
    return _data.options;
  }

  function getGraphics() {
    return _data.graphics;
  }

  function createTaskManager() {
    var tasks = new primitives.common.TaskManager();

    // Dependencies
    tasks.addDependency('options', getOptions);
    tasks.addDependency('graphics', getGraphics);

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
    tasks.addTask('SpousesOptionTask', ['OptionsTask', 'defaultItemConfig'], primitives.famdiagram.SpousesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('VisualTreeOptionTask', ['OptionsTask'], primitives.famdiagram.VisualTreeOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('HideGrandParentsConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.HideGrandParentsConnectorsOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('NormalizeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.famdiagram.NormalizeOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('OrderFamilyNodesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], primitives.famdiagram.OrderFamilyNodesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('LinePaletteOptionTask', ['OptionsTask', 'defaultPaletteItemConfig'], primitives.famdiagram.LinePaletteOptionTask, primitives.common.Colors.Navy);

    tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.CursorItemOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.HighlightItemOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], primitives.orgdiagram.SelectedItemsOptionTask, primitives.common.Colors.Navy);

    tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], primitives.orgdiagram.SplitAnnotationsOptionTask, primitives.common.Colors.Cyan);

    tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], primitives.orgdiagram.ShapeAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], primitives.orgdiagram.ShapeAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], primitives.orgdiagram.HighlightPathAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], primitives.orgdiagram.ConnectorAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], primitives.orgdiagram.ConnectorAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], primitives.orgdiagram.BackgroundAnnotationOptionTask, primitives.common.Colors.Navy);

    tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.ScaleOptionTask, primitives.common.Colors.Navy);

    // Transformations
    tasks.addTask('UserDefinedNodesOrderTask', ['OrderFamilyNodesOptionTask', 'defaultItemConfig'], primitives.famdiagram.UserDefinedNodesOrderTask, primitives.common.Colors.Red);

    tasks.addTask('LogicalFamilyTask', ['ItemsOptionTask'], primitives.famdiagram.LogicalFamilyTask, primitives.common.Colors.Cyan);

    tasks.addTask('LabelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'LogicalFamilyTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('LabelAnnotationTemplateOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationTemplateOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('LabelAnnotationPlacementOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], primitives.famdiagram.LabelAnnotationPlacementOptionTask, primitives.common.Colors.Navy);

    tasks.addTask('CombinedContextsTask', ['ItemsOptionTask', 'LabelAnnotationOptionTask'], primitives.orgdiagram.CombinedContextsTask, primitives.common.Colors.Cyan);

    tasks.addTask('AddLabelAnnotationsTask', ['LabelAnnotationPlacementOptionTask', 'LogicalFamilyTask'], primitives.famdiagram.AddLabelAnnotationsTask, primitives.common.Colors.Red);
    tasks.addTask('RemoveLoopsTask', ['ItemsOptionTask', 'AddLabelAnnotationsTask'], primitives.famdiagram.RemoveLoopsTask, primitives.common.Colors.Red);
    tasks.addTask('AddSpousesTask', ['SpousesOptionTask', 'RemoveLoopsTask'], primitives.famdiagram.AddSpousesTask, primitives.common.Colors.Red);
    tasks.addTask('HideGrandParentsConnectorsTask', ['HideGrandParentsConnectorsOptionTask', 'AddSpousesTask'], primitives.famdiagram.HideGrandParentsConnectorsTask, primitives.common.Colors.Red);
    tasks.addTask('NormalizeLogicalFamilyTask', ['NormalizeOptionTask', 'HideGrandParentsConnectorsTask'], primitives.famdiagram.NormalizeLogicalFamilyTask, primitives.common.Colors.Red);
    tasks.addTask('OrderFamilyNodesTask', ['OrderFamilyNodesOptionTask', 'UserDefinedNodesOrderTask', 'NormalizeLogicalFamilyTask', 'defaultItemConfig'], primitives.famdiagram.OrderFamilyNodesTask, primitives.common.Colors.Red);

    // Transformations / Templates
    tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.ReadTemplatesTask, primitives.common.Colors.Cyan);
    tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, primitives.common.Colors.Cyan);

    tasks.addTask('LabelAnnotationTemplateParamsTask', ['ItemsSizesOptionTask', 'LabelAnnotationTemplateOptionTask', 'ReadTemplatesTask'], primitives.famdiagram.LabelAnnotationTemplateParamsTask, primitives.common.Colors.Cyan);
    tasks.addTask('CombinedTemplateParamsTask', ['ItemTemplateParamsTask', 'LabelAnnotationTemplateParamsTask'], primitives.famdiagram.CombinedTemplateParamsTask, primitives.common.Colors.Cyan);

    tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.GroupTitleTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.CheckBoxTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.ButtonsTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.pdf.orgdiagram.AnnotationLabelTemplateTask, primitives.common.Colors.Cyan);

    tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'OrderFamilyNodesTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, primitives.common.Colors.Cyan);

    // Transformations/Selections
    tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], primitives.orgdiagram.HighlightItemTask, primitives.common.Colors.Cyan);

    tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], primitives.orgdiagram.CursorItemTask, primitives.common.Colors.Cyan);
    tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, primitives.common.Colors.Cyan);

    tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCombinedNormalVisibilityItemsTask, primitives.common.Colors.Cyan);
    tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCurrentControlSizeTask, primitives.common.Colors.Cyan);

    tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask',
      'OrderFamilyNodesOptionTask', 'OrderFamilyNodesTask',
      'CombinedTemplateParamsTask',
      'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.famdiagram.ItemsPositionsTask, primitives.common.Colors.Red);

    tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, primitives.common.Colors.Red);
    tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, primitives.common.Colors.Cyan);

    // Managers
    tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'LinePaletteOptionTask'], primitives.orgdiagram.PaletteManagerTask, primitives.common.Colors.Cyan);

    // Renders
    tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'AddLabelAnnotationsTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);

    tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawBackgroundConnectorAnnotationTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);
    tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawConnectorsTask, primitives.common.Colors.Green);
    tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);

    tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
      'ItemsSizesOptionTask',
      'CombinedContextsTask',
      'AlignDiagramTask', 'null',
      'CombinedTemplateParamsTask',
      'CursorItemTask', 'SelectedItemsTask',
      'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
      'DrawForegroundHighlightPathAnnotationTask'
    ], primitives.orgdiagram.DrawTreeItemsTask, primitives.common.Colors.Green);

    tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawTreeItemsTask'], primitives.orgdiagram.DrawCursorTask, primitives.common.Colors.Green);
    tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], primitives.orgdiagram.DrawHighlightTask, primitives.common.Colors.Green);

    tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawHighlightTask'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);

    return tasks;
  }

  function createEventArgs(data, oldTreeItemId, newTreeItemId, name) {
    var result = new primitives.famdiagram.EventArgs(),
      combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
      alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
      navigationFamilyTask = data.tasks.getTask("AddLabelAnnotationsTask"),
      oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
      newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
      navigationFamily = navigationFamilyTask.getNavigationFamily(),
      itemPosition;

    if (oldItemConfig && oldItemConfig.id != null) {
      result.oldContext = oldItemConfig;
    }

    if (newItemConfig && newItemConfig.id != null) {
      result.context = newItemConfig;

      navigationFamily.loopParents(this, newItemConfig.id, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
          return navigationFamily.BREAK;
        }
        result.parentItems.push(combinedContextsTask.getConfig(itemid));
      });

      itemPosition = alignDiagramTask.getItemPosition(newTreeItemId);
      result.position = new primitives.common.Rect(itemPosition.actualPosition);
    }

    if (name != null) {
      result.name = name;
    }

    return result;
  }

  function trigger(eventHandlerName, event, eventArgs) {
    var eventHandler = _data.options[eventHandlerName];
    if (eventHandler != null) {
      eventHandler(event, eventArgs);
    }
  }

  function _disableNotAvailableFunctionality() {
    /* disable functionality not available in PDF */
    _data.options.hasButtons = primitives.common.Enabled.False;
    _data.options.pageFitMode = primitives.common.PageFitMode.AutoSize;
    _data.options.autoSizeMaximum = new primitives.common.Size(100000, 100000);
  }

  function draw(doc, positionX, positionY) {
    _data.doc = doc;

    _data.tasks = createTaskManager(getOptions, getGraphics);
    _data.graphics = new primitives.pdf.graphics(_data.doc);
    _data.graphics.debug = _debug;

    _disableNotAvailableFunctionality();

    _data.doc.save();

    _data.doc.translate(positionX, positionY);

    _data.tasks.process('OptionsTask', null, _debug);

    _data.doc.restore();

    var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

    return new primitives.common.Size(alignDiagramTask.getContentSize());
  }

  function getSize() {
    _data.tasks = createTaskManager(getOptions, getGraphics);

    _disableNotAvailableFunctionality();

    _data.tasks.process('OptionsTask', 'AlignDiagramTask', _debug);

    var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

    return new primitives.common.Size(alignDiagramTask.getContentSize());
  }

  return {
    draw: draw,
    getSize: getSize
  };
};
