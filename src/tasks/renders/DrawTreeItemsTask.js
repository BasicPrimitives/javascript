import Point from '../../graphics/structs/Point';
import Size from '../../graphics/structs/Size';
import Rect from '../../graphics/structs/Rect';
import RenderEventArgs from '../../events/RenderEventArgs';
import { Layers, Visibility, AdviserPlacementType } from '../../enums';

export default function DrawTreeItemsTask(getGraphics, createTransformTask, applyLayoutChangesTask, scaleOptionTask,
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
    _transform = createTransformTask.getTransform();

    _buttonsTemplate = buttonsTemplateTask.getTemplate();
    _checkBoxTemplate = checkBoxTemplateTask.getTemplate();
    _groupTitleTemplate = groupTitleTemplateTask.getTemplate();

    _graphics.reset("placeholder", Layers.Item);
    _graphics.reset("placeholder", Layers.Controls);

    redrawTreeItems();

    return false;
  }

  function redrawTreeItems() {
    var uiHash,
      element,
      cursorItemId = cursorItemTask.getCursorTreeItem(),
      treeItemPosition,
      actualPosition,
      viewPortPosition = getViewPortPosition();

    for (var treeItemId in _positions) {
      if (_positions.hasOwnProperty(treeItemId)) {
        treeItemPosition = _positions[treeItemId],
        actualPosition = treeItemPosition.actualPosition;
        if (treeItemPosition.actualVisibility == Visibility.Normal) {
          _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
            this, function (x, y, width, height) {
              var nodePosition = new Rect(x, y, width, height);
              if (viewPortPosition == null || viewPortPosition.overlaps(nodePosition)) {
                var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
                  template = templateParams.template;

                uiHash = new RenderEventArgs();
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
                uiHash.onButtonsRender = templateParams.onButtonsRender;

                _graphics.activate("placeholder", Layers.Item);
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
                    case AdviserPlacementType.Left:
                    case AdviserPlacementType.Auto:
                      groupTitlePosition = 2;
                      break;
                    case AdviserPlacementType.Right:
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
                  _graphics.activate("placeholder", Layers.Controls);
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
                  _graphics.activate("placeholder", Layers.Controls);
                  var buttonsPanelPosition = 0;
                  switch (_itemsSizesOptions.groupTitlePlacementType) {
                    case AdviserPlacementType.Left:
                    case AdviserPlacementType.Auto:
                      buttonsPanelPosition = width - (_itemsSizesOptions.buttonsPanelSize - 4);
                      break;
                    case AdviserPlacementType.Right:
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
        placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
        panelSize = new Rect(alignDiagramTask.getContentSize()),
        optimalPanelSize = new Size(applyLayoutChangesTask.getOptimalPanelSize());

      placeholderOffset.scale(1.0 / scale);
      optimalPanelSize.scale(1.0 / scale);

      result = new Rect(
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