primitives.pdf.Template = function (options, templateConfig) {
  this.templateConfig = null;
  this.itemTemplate = null;
  this.highlightTemplate = null;
  this.dotHighlightTemplate = null;
  this.cursorTemplate = null;

  if (templateConfig != null) {
    this.templateConfig = templateConfig;

    this.itemTemplate = primitives.common.isNullOrEmpty(templateConfig.itemTemplate) ?
      new primitives.pdf.ItemTemplate(options, templateConfig) :
      new primitives.pdf.UserTemplate(options, templateConfig, options.onItemRender);

    this.highlightTemplate = primitives.common.isNullOrEmpty(templateConfig.highlightTemplate) ?
      new primitives.pdf.HighlightTemplate(options, templateConfig) :
      new primitives.pdf.UserTemplate(options, templateConfig, options.onHighlightRender);

    this.dotHighlightTemplate = new primitives.pdf.DummyTemplate(options, templateConfig);

    this.cursorTemplate = primitives.common.isNullOrEmpty(templateConfig.cursorTemplate) ?
      new primitives.pdf.CursorTemplate(options, templateConfig) :
      new primitives.pdf.UserTemplate(options, templateConfig, options.onCursorRender);
  }
};
