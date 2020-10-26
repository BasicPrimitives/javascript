/**
 * Creates PDFKit Organizational Chart Plugin
 * @class Plugin
 * 
 * @param {Config} options Organizational Chart Configuration object
 * 
 * @returns {orgdiagram} Returns reference to organizational chart PDFKit renderer instance.
 */
primitives.pdf.orgdiagram.Plugin = function (options) {
  var _data = {
    name: "orgdiagram",
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
    tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig', 'defaultButtonConfig'], primitives.orgdiagram.ItemsSizesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultButtonConfig', 'defaultTemplateConfig'], primitives.orgdiagram.TemplatesOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.OrientationOptionTask, primitives.common.Colors.Navy);
    tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], primitives.orgdiagram.VisualTreeOptionTask, primitives.common.Colors.Navy);

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
    tasks.addTask('CombinedContextsTask', ['ItemsOptionTask'], primitives.orgdiagram.CombinedContextsTask, primitives.common.Colors.Cyan);
    tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], primitives.orgdiagram.OrgTreeTask, primitives.common.Colors.Red);

    // Transformations / Templates
    tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.ReadTemplatesTask, primitives.common.Colors.Cyan);
    // TODO: Add jsPDF templates
    tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], primitives.orgdiagram.ItemTemplateParamsTask, primitives.common.Colors.Cyan);
    tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask'], primitives.pdf.orgdiagram.GroupTitleTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.CheckBoxTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask'], primitives.pdf.orgdiagram.ButtonsTemplateTask, primitives.common.Colors.Cyan);
    tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask'], primitives.pdf.orgdiagram.AnnotationLabelTemplateTask, primitives.common.Colors.Cyan);

    tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'null', 'VisualTreeOptionTask', 'isFamilyChartMode'], primitives.orgdiagram.VisualTreeTask, primitives.common.Colors.Red);
    tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], primitives.orgdiagram.VisualTreeLevelsTask, primitives.common.Colors.Red);

    tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'AlignDiagramTask'], primitives.orgdiagram.ConnectionsGraphTask, primitives.common.Colors.Cyan);

    // Transformations/Selections
    tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], primitives.orgdiagram.HighlightItemTask, primitives.common.Colors.Cyan);

    tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], primitives.orgdiagram.CursorItemTask, primitives.common.Colors.Cyan);
    tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], primitives.orgdiagram.SelectedItemsTask, primitives.common.Colors.Cyan);
    tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCombinedNormalVisibilityItemsTask, primitives.common.Colors.Cyan);

    tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], primitives.pdf.orgdiagram.DummyCurrentControlSizeTask, primitives.common.Colors.Cyan);
    tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
      'VisualTreeTask', 'VisualTreeLevelsTask',
      'ItemTemplateParamsTask',
      'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], primitives.orgdiagram.ItemsPositionsTask, primitives.common.Colors.Red);

    tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask', 'isFamilyChartMode'], primitives.orgdiagram.AlignDiagramTask, primitives.common.Colors.Red);
    tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], primitives.orgdiagram.CreateTransformTask, primitives.common.Colors.Cyan);

    // Managers
    tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], primitives.orgdiagram.PaletteManagerTask, primitives.common.Colors.Cyan);

    // Renders
    tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], primitives.orgdiagram.DrawBackgroundAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask' /*dummy dependency enforeces drawing order */], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);

    tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
      'ItemsSizesOptionTask',
      'CombinedContextsTask',
      'AlignDiagramTask', 'null',
      'ItemTemplateParamsTask',
      'CursorItemTask', 'SelectedItemsTask',
      'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
      'DrawBackgroundConnectorAnnotationTask'
    ], primitives.orgdiagram.DrawTreeItemsTask, primitives.common.Colors.Green);

    tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawTreeItemsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);
    tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawConnectorsTask, primitives.common.Colors.Green);
    tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], primitives.orgdiagram.DrawHighlightPathAnnotationTask, primitives.common.Colors.Cyan);

    tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundHighlightPathAnnotationTask'], primitives.orgdiagram.DrawShapeAnnotationTask, primitives.common.Colors.Green);
    tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], primitives.orgdiagram.DrawConnectorAnnotationTask, primitives.common.Colors.Green);


    tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawForegroundConnectorAnnotationTask'], primitives.orgdiagram.DrawCursorTask, primitives.common.Colors.Green);
    tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], primitives.orgdiagram.DrawHighlightTask, primitives.common.Colors.Green);

    return tasks;
  }

  function createEventArgs(data, oldTreeItemId, newTreeItemId, name) {
    var result = new primitives.orgdiagram.EventArgs(),
      combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
      alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
      oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
      newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
      itemPosition,
      actualPosition;

    if (oldItemConfig && oldItemConfig.id != null) {
      result.oldContext = oldItemConfig;
    }

    if (newItemConfig && newItemConfig.id != null) {
      result.context = newItemConfig;

      if (newItemConfig.parent !== null) {
        result.parentItem = combinedContextsTask.getConfig(newItemConfig.parent);
      }

      itemPosition = alignDiagramTask.getItemPosition(newTreeItemId),
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

  /**
   * Calculates size of the diagram required to render all nodes without truncation.
   * 
   * @param {object} doc PDFKit document
   * @param {number} positionX Diagram placement X coordinate
   * @param {number} positionY Diagram placement Y coordinate
   * @returns {Size} Returns size of the diagram
   */
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

  /**
   * Calculates size of the diagram required to render all nodes without truncation.
   * 
   * @returns {Size} Returns size of the diagram
   */
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
