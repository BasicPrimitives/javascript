import TemplateConfig from '../../../configs/TemplateConfig';
import Size from '../../../graphics/structs/Size';
import { isNullOrEmpty } from '../../../common';
import LabelAnnotationTemplate from '../../../templates/pdf/LabelAnnotationTemplate';
import DummyTemplate from '../../../templates/pdf/DummyTemplate';
import ItemTemplate from '../../../templates/pdf/ItemTemplate';
import UserTemplate from '../../../templates/pdf/UserTemplate';
import HighlightTemplate from '../../../templates/pdf/HighlightTemplate';
import CursorTemplate from '../../../templates/pdf/CursorTemplate';


function Template(options, templateConfig) {
  this.templateConfig = null;
  this.itemTemplate = null;
  this.highlightTemplate = null;
  this.dotHighlightTemplate = null;
  this.cursorTemplate = null;

  if (templateConfig != null) {
    this.templateConfig = templateConfig;

    this.itemTemplate = isNullOrEmpty(templateConfig.itemTemplate) ?
      new ItemTemplate(options, templateConfig) :
      new UserTemplate(options, templateConfig, options.onItemRender);

    this.highlightTemplate = isNullOrEmpty(templateConfig.highlightTemplate) ?
      new HighlightTemplate(options, templateConfig) :
      new UserTemplate(options, templateConfig, options.onHighlightRender);

    this.dotHighlightTemplate = new DummyTemplate(options, templateConfig);

    this.cursorTemplate = isNullOrEmpty(templateConfig.cursorTemplate) ?
      new CursorTemplate(options, templateConfig) :
      new UserTemplate(options, templateConfig, options.onCursorRender);
  }
};

export default function ReadTemplatesTask(templatesOptionTask) {
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
    _data.templates[_defaultWidgetTemplateName] = new Template(templatesOptions, new TemplateConfig());

    var labelAnnotationTemplateConfig = new TemplateConfig();
    labelAnnotationTemplateConfig.name = _defaultWidgetLabelAnnotationTemplateName;
    labelAnnotationTemplateConfig.isActive = false;
    labelAnnotationTemplateConfig.itemSize = new Size(100, 20);
    labelAnnotationTemplateConfig.minimizedItemSize = new Size(0, 0);

    var labelAnnotationTemplate = new Template();
    labelAnnotationTemplate.templateConfig = labelAnnotationTemplateConfig;
    labelAnnotationTemplate.minimizedItemCornerRadius = labelAnnotationTemplateConfig.minimizedItemSize.width / 2;
    labelAnnotationTemplate.itemTemplate = new LabelAnnotationTemplate();
    labelAnnotationTemplate.dotHighlightTemplate = new DummyTemplate();

    _data.templates[_defaultWidgetLabelAnnotationTemplateName] = labelAnnotationTemplate;


    for (index = 0, len = templates.length; index < len; index += 1) {
      templateConfig = templates[index];
      _data.templates[templateConfig.name] = new Template(templatesOptions, templateConfig);
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