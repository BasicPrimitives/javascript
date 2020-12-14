import TemplateParams from '../../models/TemplateParams';
import { isNullOrEmpty } from '../../common';
import { Enabled } from '../../enums';

export default function ItemTemplateParamsTask(itemsSizesOptionTask, cursorItemOptionTask, readTemplatesTask) {
  var _data = {
    items: {} // TemplateParams
  };

  function process() {
    var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      hasButtonsRender = (itemsSizesOptions.onButtonsRender != null),
      cursorItem = cursorItemOptionTask.getCursorItem(),
      items = itemsSizesOptions.items,
      index, len;

    _data.items = {};

    for (index = 0, len = items.length; index < len; index += 1) {
      var itemConfig = items[index],
        templateParams = new TemplateParams(),
        isCursor = (cursorItem == itemConfig.id),
        template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
        templateConfig = template.templateConfig;

      templateParams.template = template;

      templateParams.isActive = itemConfig.isActive && templateConfig.isActive;
      if (templateParams.isActive) {
        templateParams.hasSelectorCheckbox = getSelectionVisibility(isCursor, itemConfig.hasSelectorCheckbox, itemsSizesOptions.hasSelectorCheckbox);
        templateParams.hasButtons = (templateConfig.hasButtons !== Enabled.Auto) ? (templateConfig.hasButtons == Enabled.True) : (hasButtonsRender && getSelectionVisibility(isCursor, itemConfig.hasButtons, itemsSizesOptions.hasButtons));
        if (templateParams.hasButtons) {
          templateParams.onButtonsRender = templateConfig.onButtonsRender || itemsSizesOptions.onButtonsRender;
        }
      }
      templateParams.hasGroupTitle = !isNullOrEmpty(itemConfig.groupTitle);
      _data.items[itemConfig.id] = templateParams;
    }
    return true;
  }

  function getSelectionVisibility(isCursor, itemState, widgetState) {
    var result = false;
    switch (itemState) {
      case Enabled.Auto:
        switch (widgetState) {
          case Enabled.Auto:
            result = isCursor;
            break;
          case Enabled.True:
            result = true;
            break;
          case Enabled.False:
            result = false;
            break;
        }
        break;
      case Enabled.True:
        result = true;
        break;
      case Enabled.False:
        result = false;
        break;
    }
    return result;
  }

  function getTemplateParams(orgItemId) {
    return _data.items[orgItemId];
  }

  return {
    process: process,
    getTemplateParams: getTemplateParams
  };
};