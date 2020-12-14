import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';

export default function ActiveItemsTask(itemsSizesOptionTask, readTemplatesTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      items = itemsSizesOptions.items;

    _data.items = _dataTemplate.read(_data.items, collectActiveItems(itemsSizesOptions, items), "items", context);

    return context.isChanged;
  }

  function collectActiveItems(itemsSizesOptions, items) {
    var result = [],
      index, len;
    for (index = 0, len = items.length; index < len; index += 1) {
      var itemConfig = items[index],
        template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
        templateConfig = template.templateConfig,
        isActive = itemConfig.isActive && templateConfig.isActive;

      if (isActive) {
        result.push(itemConfig.id);
      }
    }
    return result;
  }

  function getActiveItems() {
    return _hash.items;
  }

  return {
    process: process,
    getActiveItems: getActiveItems
  };
};