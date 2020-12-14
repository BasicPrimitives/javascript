import Size from '../../graphics/structs/Size';
import TemplateConfig from '../../configs/TemplateConfig';
import Template from '../../models/Template';
import { isNullOrEmpty } from '../../common';

export default function ReadTemplatesTask(templatesOptionTask, defaultTemplates) {
  var _data = {
    templates: {},
    itemTemplates: []
  },
    _defaultWidgetTemplateName = "DefaultWidgetTemplate",
    _defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

  function process() {
    var index, len,
      templateConfig,
      options = templatesOptionTask.getOptions(),
      templates = options.templates;


    _data.templates = {};
    _data.itemTemplates = [];

    templateConfig = new TemplateConfig();

    _data.templates[_defaultWidgetTemplateName] = new Template(
      templateConfig,
      new defaultTemplates.ItemTemplate(options, templateConfig),
      new defaultTemplates.HighlightTemplate(options, templateConfig),
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      new defaultTemplates.CursorTemplate(options, templateConfig)
    );

    _data.itemTemplates.push(_data.templates[_defaultWidgetTemplateName]);

    templateConfig = getLabelAnnotationTemplateConfig(_defaultWidgetLabelAnnotationTemplateName);

    _data.templates[_defaultWidgetLabelAnnotationTemplateName] = new Template(
      templateConfig,
      new defaultTemplates.LabelAnnotationTemplate(),
      null,
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      null
    );

    for (index = 0, len = templates.length; index < len; index += 1) {
      templateConfig = templates[index];

      _data.templates[templateConfig.name] = new Template(
        templateConfig,
        isNullOrEmpty(templateConfig.itemTemplate) ?
          new defaultTemplates.ItemTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.itemTemplate, options.onItemRender),
        isNullOrEmpty(templateConfig.highlightTemplate) ?
          new defaultTemplates.HighlightTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.highlightTemplate, options.onHighlightRender),
        new defaultTemplates.DotHighlightTemplate(options, templateConfig),
        isNullOrEmpty(templateConfig.cursorTemplate) ?
          new defaultTemplates.CursorTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.cursorTemplate, options.onCursorRender)
      );

      _data.itemTemplates.push(_data.templates[templateConfig.name]);
    }

    return true;
  }

  function getLabelAnnotationTemplateConfig(name) {
    var config = new TemplateConfig();
    config.name = name;
    config.isActive = false;
    config.itemSize = new Size(100, 20);
    config.minimizedItemSize = new Size(0, 0);
    config.minimizedItemCornerRadius = config.minimizedItemSize.width / 2;
    return config;
  }

  function getTemplate(templateName1, templateName2, templateName3) {
    var result = _data.templates[templateName1] || _data.templates[templateName2] || _data.templates[templateName3];
    return result;
  }

  function getItemTemplates() {
    return _data.itemTemplates;
  }

  return {
    process: process,
    getTemplate: getTemplate,
    getItemTemplates: getItemTemplates,
    DefaultWidgetTemplateName: _defaultWidgetTemplateName,
    DefaultWidgetLabelAnnotationTemplateName: _defaultWidgetLabelAnnotationTemplateName
  };
};