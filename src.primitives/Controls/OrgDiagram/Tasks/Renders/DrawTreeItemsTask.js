primitives.orgdiagram.DrawTreeItemsTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask, scaleOptionTask,
  itemsSizesOptionTask,
  combinedContextsTask,
  alignDiagramTask, centerOnCursorTask,
  itemTemplateParamsTask,
  cursorItemTask, selectedItemsTask,
  groupTitleTemplateTask, checkBoxTemplateTask, buttonsTemplateTask) {

  var _positions,
    _graphics,
    _transform,
    _itemsSizesOptions,

    _buttonsTemplate,
    _checkBoxTemplate,
    _groupTitleTemplate;

  function process() {
    _graphics = getGraphics();

    _itemsSizesOptions = itemsSizesOptionTask.getOptions();
    _positions = alignDiagramTask.getItemsPositions();
    _transform = createTranfromTask.getTransform();

    _buttonsTemplate = buttonsTemplateTask.getTemplate();
    _checkBoxTemplate = checkBoxTemplateTask.getTemplate();
    _groupTitleTemplate = groupTitleTemplateTask.getTemplate();

    _graphics.reset("placeholder", primitives.common.Layers.Item);
    _graphics.reset("placeholder", primitives.common.Layers.Controls);

    redrawTreeItems();

    return false;
  }

  function redrawTreeItems() {
    var uiHash,
      element,
      polyline,
      index,
      len,
      label,
      itemTitleColor,
      itemFillColor,
      cursorItemId = cursorItemTask.getCursorTreeItem(),
      treeItemPosition,
      actualPosition,
      viewPortPosition = getViewPortPosition();

    for (var treeItemId in _positions) {
      if (_positions.hasOwnProperty(treeItemId)) {
        treeItemPosition = _positions[treeItemId],
          actualPosition = treeItemPosition.actualPosition;
        if (treeItemPosition.actualVisibility == primitives.common.Visibility.Normal) {
          _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
            this, function (x, y, width, height) {
              var nodePosition = new primitives.common.Rect(x, y, width, height);
              if (viewPortPosition == null || viewPortPosition.overlaps(nodePosition)) {
                var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
                  template = templateParams.template;

                uiHash = new primitives.common.RenderEventArgs();
                uiHash.id = treeItemId;
                uiHash.context = combinedContextsTask.getConfig(treeItemId);
                uiHash.isCursor = (treeItemId == cursorItemId);
                uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
                uiHash.templateName = template.templateConfig.name;

                uiHash.template = templateParams.template;
                uiHash.isActive = templateParams.isActive;
                uiHash.hasSelectorCheckbox = templateParams.hasSelectorCheckbox;
                uiHash.hasButtons = templateParams.hasButtons;
                uiHash.hasGroupTitle = templateParams.hasGroupTitle;
                uiHash.buttons = templateParams.buttons;
                uiHash.onButtonsRender = templateParams.onButtonsRender;

                _graphics.activate("placeholder", primitives.common.Layers.Item);
                element = _graphics.template(
                  x
                  , y
                  , width
                  , height
                  , treeItemPosition.contentPosition.x
                  , treeItemPosition.contentPosition.y
                  , treeItemPosition.contentPosition.width
                  , treeItemPosition.contentPosition.height
                  , template.itemTemplate.template()
                  , template.itemTemplate.getHashCode()
                  , template.itemTemplate.render
                  , uiHash
                  , { "borderWidth": template.templateConfig.itemBorderWidth }
                );

                if (templateParams.hasGroupTitle) {
                  var groupTitlePosition = 0;
                  switch (_itemsSizesOptions.groupTitlePlacementType) {
                    case primitives.common.AdviserPlacementType.Left:
                    case primitives.common.AdviserPlacementType.Auto:
                      groupTitlePosition = 2;
                      break;
                    case primitives.common.AdviserPlacementType.Right:
                      groupTitlePosition = width - (_itemsSizesOptions.groupTitlePanelSize - 4);
                      break;
                    default:
                  }
                  element = _graphics.template(
                    x,
                    y,
                    width,
                    height,
                    groupTitlePosition,
                    treeItemPosition.contentPosition.y,
                    _itemsSizesOptions.groupTitlePanelSize - 4,
                    treeItemPosition.contentPosition.height + 2,
                    _groupTitleTemplate.template(),
                    _groupTitleTemplate.getHashCode(),
                    _groupTitleTemplate.render,
                    uiHash,
                    null
                  );
                }
                if (templateParams.hasSelectorCheckbox) {
                  _graphics.activate("placeholder", primitives.common.Layers.Controls);
                  element = _graphics.template(
                    x,
                    y,
                    width,
                    height,
                    treeItemPosition.contentPosition.x,
                    height - (_itemsSizesOptions.checkBoxPanelSize - 4),
                    treeItemPosition.contentPosition.width,
                    _itemsSizesOptions.checkBoxPanelSize - 4,
                    _checkBoxTemplate.template(),
                    _checkBoxTemplate.getHashCode(),
                    _checkBoxTemplate.render,
                    uiHash,
                    null
                  );
                }
                if (templateParams.hasButtons) {
                  _graphics.activate("placeholder", primitives.common.Layers.Controls);
                  var buttonsPanelPosition = 0;
                  switch (_itemsSizesOptions.groupTitlePlacementType) {
                    case primitives.common.AdviserPlacementType.Left:
                    case primitives.common.AdviserPlacementType.Auto:
                      buttonsPanelPosition = width - (_itemsSizesOptions.buttonsPanelSize - 4);
                      break;
                    case primitives.common.AdviserPlacementType.Right:
                      buttonsPanelPosition = 2;
                      break;
                    default:
                  }
                  element = _graphics.template(
                    x,
                    y,
                    width,
                    height,
                    buttonsPanelPosition,
                    treeItemPosition.contentPosition.y,
                    _itemsSizesOptions.buttonsPanelSize - 4,
                    Math.max(treeItemPosition.contentPosition.height, height - treeItemPosition.contentPosition.y),
                    _buttonsTemplate.template(),
                    template.templateConfig.name + _buttonsTemplate.getHashCode(),
                    _buttonsTemplate.render,
                    uiHash,
                    null
                  );
                }
              }
            });//ignore jslint
        }
      }
    }
  }

  function getViewPortPosition() {
    var result = null;
    if (centerOnCursorTask != null) {
      var scaleOptions = scaleOptionTask.getOptions(),
        scale = scaleOptions.scale,
        placeholderOffset = new primitives.common.Point(centerOnCursorTask.getPlaceholderOffset()),
        panelSize = new primitives.common.Rect(alignDiagramTask.getContentSize()),
        optimalPanelSize = new primitives.common.Size(applyLayoutChangesTask.getOptimalPanelSize());

      placeholderOffset.scale(1.0 / scale);
      optimalPanelSize.scale(1.0 / scale);

      result = new primitives.common.Rect(
        placeholderOffset.x,
        placeholderOffset.y,
        Math.min(optimalPanelSize.width, panelSize.width),
        Math.min(optimalPanelSize.height, panelSize.height)
      );
    }
    return result;
  }

  return {
    process: process
  };
};