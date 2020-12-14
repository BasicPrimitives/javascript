import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import FunctionReader from '../../readers/FunctionReader';
import { AdviserPlacementType, Enabled, PageFitMode, Visibility, SelectionPathMode, VerticalAlignmentType } from '../../enums';

export default function ItemsSizesOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    /*item template options*/
    defaultTemplateName: new ValueReader(["string"], true),
    defaultLabelAnnotationTemplate: new ValueReader(["string"], true),
    hasSelectorCheckbox: new EnumerationReader(Enabled, false, defaultConfig.hasSelectorCheckbox),
    hasButtons: new EnumerationReader(Enabled, false, defaultConfig.hasButtons),
    buttonsPanelSize: new ValueReader(["number"], false, defaultConfig.buttonsPanelSize),
    groupTitlePanelSize: new ValueReader(["number"], false, defaultConfig.groupTitlePanelSize),
    groupTitlePlacementType: new EnumerationReader(AdviserPlacementType, false, defaultConfig.groupTitlePlacementType),
    checkBoxPanelSize: new ValueReader(["number"], false, defaultConfig.checkBoxPanelSize),
    selectCheckBoxLabel: new ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    onButtonsRender: new FunctionReader(),
    /* items visibility */
    pageFitMode: new EnumerationReader(PageFitMode, false, defaultConfig.pageFitMode),
    minimalVisibility: new EnumerationReader(Visibility, false, defaultConfig.minimalVisibility),
    selectionPathMode: new EnumerationReader(SelectionPathMode, false, defaultConfig.selectionPathMode),
    autoSizeMinimum: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.autoSizeMinimum.width),
      height: new ValueReader(["number"], false, defaultConfig.autoSizeMinimum.height)
    }, false, defaultConfig.autoSizeMinimum),
    autoSizeMaximum: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.autoSizeMaximum.width),
      height: new ValueReader(["number"], false, defaultConfig.autoSizeMaximum.height)
    }, false, defaultConfig.autoSizeMaximum),
    /* scale */
    scale: new ValueReader(["number"], false, defaultConfig.scale),
    maximumScale: new ValueReader(["number"], false, defaultConfig.maximumScale),
    minimumScale: new ValueReader(["number"], false, defaultConfig.minimumScale),
    /*intervals*/
    normalLevelShift: new ValueReader(["number"], false, defaultConfig.normalLevelShift),
    dotLevelShift: new ValueReader(["number"], false, defaultConfig.dotLevelShift),
    lineLevelShift: new ValueReader(["number"], false, defaultConfig.lineLevelShift),
    normalItemsInterval: new ValueReader(["number"], false, defaultConfig.normalItemsInterval),
    dotItemsInterval: new ValueReader(["number"], false, defaultConfig.dotItemsInterval),
    lineItemsInterval: new ValueReader(["number"], false, defaultConfig.lineItemsInterval),
    /*cousiins branches interval multiplier*/
    cousinsIntervalMultiplier: new ValueReader(["number"], false, defaultConfig.cousinsIntervalMultiplier),

    verticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.verticalAlignment),

    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        groupTitle: new ValueReader(["string", "number"], true),
        isVisible: new ValueReader(["boolean", "number"], false, defaultItemConfig.isVisible),
        isActive: new ValueReader(["boolean", "number"], false, defaultItemConfig.isActive),
        hasSelectorCheckbox: new EnumerationReader(Enabled, false, defaultItemConfig.hasSelectorCheckbox),
        hasButtons: new EnumerationReader(Enabled, false, defaultItemConfig.hasButtons),
        templateName: new ValueReader(["string"], true)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks items size options."
  };
};