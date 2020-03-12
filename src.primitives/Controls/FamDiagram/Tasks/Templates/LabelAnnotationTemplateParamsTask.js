primitives.famdiagram.LabelAnnotationTemplateParamsTask = function (itemsSizesOptionTask, labelAnnotationTemplateOptionTask, readTemplatesTask) {
  var _data = {
    items: {} // TemplateParams
  };

  function process() {
    var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      items = labelAnnotationTemplateOptionTask.getAnnotations(),
      index, len;

    _data.items = {};

    for (index = 0, len = items.length; index < len; index += 1) {
      var annotation = items[index],
        templateParams = new primitives.orgdiagram.TemplateParams(),
        template = readTemplatesTask.getTemplate(annotation.templateName, itemsSizesOptions.defaultLabelAnnotationTemplate, readTemplatesTask.DefaultWidgetLabelAnnotationTemplateName);

      templateParams.template = template;

      _data.items[annotation.id] = templateParams;
    }

    return true;
  }

  function getTemplateParams(itemId) {
    return _data.items[itemId];
  }

  return {
    process: process,
    getTemplateParams: getTemplateParams
  };
};