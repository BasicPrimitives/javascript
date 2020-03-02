primitives.orgdiagram.ReadTemplatesTask = function (templatesOptionTask, defaultTemplates) {
  var _data = {
    templates: {}
  },
    _defaultWidgetTemplateName = "DefaultWidgetTemplate",
    _defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

  function process() {
    var index, len,
      templateConfig,
      options = templatesOptionTask.getOptions(),
      templates = options.templates;


    _data.templates = {};

    templateConfig = new primitives.orgdiagram.TemplateConfig();

    _data.templates[_defaultWidgetTemplateName] = new primitives.orgdiagram.Template(
      templateConfig,
      new defaultTemplates.ItemTemplate(options, templateConfig),
      new defaultTemplates.HighlightTemplate(options, templateConfig),
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      new defaultTemplates.CursorTemplate(options, templateConfig)
    );

    templateConfig = getLabelAnnotationTemplateConfig(_defaultWidgetLabelAnnotationTemplateName);

    _data.templates[_defaultWidgetLabelAnnotationTemplateName] = new primitives.orgdiagram.Template(
      templateConfig,
      new defaultTemplates.LabelAnnotationTemplate(),
      null,
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      null
    );

    for (index = 0, len = templates.length; index < len; index += 1) {
      templateConfig = templates[index];

      _data.templates[templateConfig.name] = new primitives.orgdiagram.Template(
        templateConfig,
        primitives.common.isNullOrEmpty(templateConfig.itemTemplate) ?
          new defaultTemplates.ItemTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.itemTemplate, options.onItemRender),
        primitives.common.isNullOrEmpty(templateConfig.highlightTemplate) ?
          new defaultTemplates.HighlightTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.highlightTemplate, options.onHighlightRender),
        new defaultTemplates.DotHighlightTemplate(options, templateConfig),
        primitives.common.isNullOrEmpty(templateConfig.cursorTemplate) ?
          new defaultTemplates.CursorTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.cursorTemplate, options.onCursorRender)
      );
    }

    return true;
  }

  function getLabelAnnotationTemplateConfig(name) {
    var config = new primitives.orgdiagram.TemplateConfig();
    config.name = name;
    config.isActive = false;
    config.itemSize = new primitives.common.Size(100, 20);
    config.minimizedItemSize = new primitives.common.Size(0, 0);
    config.minimizedItemCornerRadius = config.minimizedItemSize.width / 2;
    return config;
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