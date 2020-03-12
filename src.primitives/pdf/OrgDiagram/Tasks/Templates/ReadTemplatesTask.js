primitives.pdf.orgdiagram.ReadTemplatesTask = function (templatesOptionTask) {
  var _data = {
    templates: {}
  },
    _defaultWidgetTemplateName = "DefaultWidgetTemplate",
    _defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

  function process() {
    var index, len,
      templateConfig,
      templatesOptions = templatesOptionTask.getOptions(),
      templates = templatesOptions.templates;


    _data.templates = {};
    _data.templates[_defaultWidgetTemplateName] = new primitives.pdf.Template(templatesOptions, new primitives.orgdiagram.TemplateConfig());

    var labelAnnotationTemplateConfig = new primitives.orgdiagram.TemplateConfig();
    labelAnnotationTemplateConfig.name = _defaultWidgetLabelAnnotationTemplateName;
    labelAnnotationTemplateConfig.isActive = false;
    labelAnnotationTemplateConfig.itemSize = new primitives.common.Size(100, 20);
    labelAnnotationTemplateConfig.minimizedItemSize = new primitives.common.Size(0, 0);

    var labelAnnotationTemplate = new primitives.pdf.Template();
    labelAnnotationTemplate.templateConfig = labelAnnotationTemplateConfig;
    labelAnnotationTemplate.minimizedItemCornerRadius = labelAnnotationTemplateConfig.minimizedItemSize.width / 2;
    labelAnnotationTemplate.itemTemplate = new primitives.pdf.LabelAnnotationTemplate();
    labelAnnotationTemplate.dotHighlightTemplate = new primitives.pdf.DummyTemplate();

    _data.templates[_defaultWidgetLabelAnnotationTemplateName] = labelAnnotationTemplate;


    for (index = 0, len = templates.length; index < len; index += 1) {
      templateConfig = templates[index];
      _data.templates[templateConfig.name] = new primitives.pdf.Template(templatesOptions, templateConfig);
    }

    return true;
  }

  function getTemplate(templateName1, templateName2, templateName3) {
    var result = _data.templates[templateName1] || _data.templates[templateName2] || _data.templates[templateName3];
    return result;
  }

  return {
    process: process,
    getTemplate: getTemplate,
    DefaultWidgetTemplateName: _defaultWidgetTemplateName,
    DefaultWidgetLabelAnnotationTemplateName: _defaultWidgetLabelAnnotationTemplateName
  };
};